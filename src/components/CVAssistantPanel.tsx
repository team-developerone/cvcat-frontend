import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LucideSend,
  LucideZap,
  LucideLoader2,
  LucideChevronDown,
  LucideChevronUp,
  LucideFileText,
} from "lucide-react";
import { useCV } from "@/lib/context";
import { cvAssistant, getAssistantMessages, updateSuggestionStatus } from "@/services/api";
import type {
  CVAssistantIntent,
  CVAssistantSuggestion,
  CVAssistantInsight,
  CVAssistantResponse,
} from "@/services/api";
import CVAssistantSuggestionCard from "./CVAssistantSuggestionCard";
import { applySuggestion } from "@/lib/cvAssistant/applySuggestion";
import { mapBackendMessages } from "@/lib/cvAssistant/mapAssistantMessages";
import type { AssistantMessage } from "@/lib/cvAssistant/mapAssistantMessages";
import { toast } from "@/hooks/use-toast";

const WELCOME_MESSAGE: AssistantMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I'm your CV assistant. I can read, improve, update, transform, and evaluate your CV. Try asking me things like \"what skills do I have?\", \"improve my summary\", \"add Docker to my skills\", or \"is my CV good for a staff engineer role?\"",
};

const QUICK_ACTIONS: { label: string; intent?: CVAssistantIntent; message: string }[] = [
  { label: "What's in my CV?", intent: "read_section", message: "Give me an overview of my CV" },
  { label: "Read my experience", intent: "read_section", message: "What experience is listed in my CV?" },
  { label: "What skills do I have?", intent: "read_section", message: "What skills do I have?" },
  { label: "Improve summary", intent: "rewrite_summary", message: "Improve my professional summary to be more impactful" },
  { label: "Suggest improvements", intent: "suggest_improvements", message: "What should I improve in my CV?" },
  { label: "Evaluate for a role", intent: "evaluate_for_role", message: "Is my CV good for a senior backend engineer role?" },
];

const MESSAGES_PER_PAGE = 20;

/**
 * Derive a sensible target from the active section and intent so the
 * backend gets field-aware context instead of always defaulting to summary.
 */
function buildTargetFromContext(
  cv: NonNullable<ReturnType<typeof useCV>["mainCV"]>,
  activeSection: string | undefined,
  intent: CVAssistantIntent | undefined,
): { path: string; section: string; selectedText: string } {
  const section = activeSection || "personal";

  // Bullet-oriented intents -> target work/project highlights
  if (intent === "rewrite_bullet" || intent === "generate_bullets_from_note") {
    if (section === "experience" && cv.experience?.length > 0) {
      const entry = cv.experience[0];
      return {
        path: "data.work[0].highlights[0]",
        section: "work",
        selectedText: entry.highlights?.[0] || entry.description || "",
      };
    }
    if (section === "projects" && cv.projects?.length) {
      const entry = cv.projects[0];
      return {
        path: "data.projects[0].highlights[0]",
        section: "projects",
        selectedText: entry.highlights?.[0] || entry.description || "",
      };
    }
    if (section === "volunteer" && cv.volunteer?.length) {
      const entry = cv.volunteer[0];
      return {
        path: "data.volunteer[0].highlights[0]",
        section: "volunteer",
        selectedText: entry.highlights?.[0] || "",
      };
    }
    // Fallback: first work entry
    if (cv.experience?.length) {
      const entry = cv.experience[0];
      return {
        path: "data.work[0].highlights[0]",
        section: "work",
        selectedText: entry.highlights?.[0] || entry.description || "",
      };
    }
  }

  // Transform intents -> target whole section
  if (intent === "transform_content") {
    if (section === "experience" && cv.experience?.length) {
      return {
        path: "data.work[0]",
        section: "work",
        selectedText: cv.experience[0].description || "",
      };
    }
    if (section === "projects" && cv.projects?.length) {
      return {
        path: "data.projects[0]",
        section: "projects",
        selectedText: cv.projects[0].description || "",
      };
    }
  }

  // Section-aware defaults for other intents
  switch (section) {
    case "experience":
      if (cv.experience?.length) {
        const entry = cv.experience[0];
        return {
          path: "data.work[0].highlights[0]",
          section: "work",
          selectedText: entry.highlights?.[0] || entry.description || "",
        };
      }
      break;
    case "projects":
      if (cv.projects?.length) {
        const entry = cv.projects[0];
        return {
          path: "data.projects[0].description",
          section: "projects",
          selectedText: entry.description || "",
        };
      }
      break;
    case "skills":
      if (cv.skills?.length) {
        return {
          path: "data.skills[0].name",
          section: "skills",
          selectedText: cv.skills[0].name || "",
        };
      }
      break;
    case "volunteer":
      if (cv.volunteer?.length) {
        const entry = cv.volunteer[0];
        return {
          path: "data.volunteer[0].highlights[0]",
          section: "volunteer",
          selectedText: entry.highlights?.[0] || "",
        };
      }
      break;
    case "education":
      if (cv.education?.length) {
        return {
          path: "data.education[0].area",
          section: "education",
          selectedText: cv.education[0].area || "",
        };
      }
      break;
  }

  // Default: summary
  return {
    path: "data.basics.summary",
    section: "basics",
    selectedText: cv.personalInfo?.summary || "",
  };
}

interface CVAssistantPanelProps {
  activeSection?: string;
}

export default function CVAssistantPanel({ activeSection }: CVAssistantPanelProps) {
  const { mainCV, setMainCV, saveCV } = useCV();
  const [messages, setMessages] = useState<AssistantMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null);
  const [quotaResetAt, setQuotaResetAt] = useState<string | null>(null);
  const [showJDInput, setShowJDInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesTopRef = useRef<HTMLDivElement>(null);

  // Pagination state for loading older messages
  const [hasOlderMessages, setHasOlderMessages] = useState(false);
  const [nextOlderPage, setNextOlderPage] = useState(2);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Load recent history from backend on mount
  useEffect(() => {
    if (!mainCV?.id || historyLoaded) return;

    let cancelled = false;

    async function loadHistory() {
      try {
        const res = await getAssistantMessages(mainCV!.id, 1, MESSAGES_PER_PAGE);
        if (cancelled) return;

        if (res.data && res.data.length > 0) {
          const mapped = mapBackendMessages(res.data);
          // Prepend welcome message, then DB messages
          setMessages([WELCOME_MESSAGE, ...mapped]);
          setHasOlderMessages(res.pagination.hasNextPage);
          setNextOlderPage(2);
        }
        // If no history, keep just the welcome message
      } catch {
        // Silently fail — first time or no history yet
      } finally {
        if (!cancelled) setHistoryLoaded(true);
      }
    }

    loadHistory();
    return () => { cancelled = true; };
  }, [mainCV?.id, historyLoaded]);

  const loadOlderMessages = useCallback(async () => {
    if (!mainCV?.id || loadingOlder || !hasOlderMessages) return;

    setLoadingOlder(true);
    try {
      const res = await getAssistantMessages(mainCV.id, nextOlderPage, MESSAGES_PER_PAGE);
      if (res.data && res.data.length > 0) {
        const mapped = mapBackendMessages(res.data);
        // Prepend older messages after the welcome message
        setMessages((prev) => {
          const welcome = prev[0]?.id === "welcome" ? [prev[0]] : [];
          const rest = prev[0]?.id === "welcome" ? prev.slice(1) : prev;
          return [...welcome, ...mapped, ...rest];
        });
        setHasOlderMessages(res.pagination.hasNextPage);
        setNextOlderPage((p) => p + 1);
      } else {
        setHasOlderMessages(false);
      }
    } catch {
      toast({
        title: "Could not load older messages",
        variant: "destructive",
      });
    } finally {
      setLoadingOlder(false);
    }
  }, [mainCV?.id, loadingOlder, hasOlderMessages, nextOlderPage]);

  const isQuotaExhausted = quotaRemaining !== null && quotaRemaining <= 0;

  const sendMessage = useCallback(
    async (text: string, intent?: CVAssistantIntent) => {
      if (!mainCV || !text.trim() || loading) return;

      const userMsg: AssistantMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        text: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const target = buildTargetFromContext(mainCV, activeSection, intent);

        const payload: Parameters<typeof cvAssistant>[0] = {
          cvId: mainCV.id,
          message: text.trim(),
          intent,
          target,
          jobDescription: jobDescription || undefined,
        };

        const response: CVAssistantResponse = await cvAssistant(payload);

        setQuotaRemaining(response.quotaRemaining);
        setQuotaResetAt(response.quotaResetAt);

        const assistantMsg: AssistantMessage = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          text: response.data.reply,
          suggestions: response.data.suggestions,
          insights: response.data.insights,
          confirmedIds: new Set(),
          rejectedIds: new Set(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";

        if (errorMessage.includes("quota exceeded")) {
          setQuotaRemaining(0);
        }

        let displayMessage = errorMessage;
        if (errorMessage.includes("not sure what")) {
          displayMessage = errorMessage;
        } else if (errorMessage.includes("intent")) {
          displayMessage = "I'm not sure what you'd like me to do. Try asking about a section of your CV, improving content, adding a skill, or evaluating your CV for a role.";
        } else if (errorMessage.includes("job description") || errorMessage.includes("jd_required")) {
          displayMessage = "This request needs a job description. Paste one in the job description field below and try again.";
        }

        const errorMsg: AssistantMessage = {
          id: `error_${Date.now()}`,
          role: "assistant",
          text: displayMessage,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    },
    [mainCV, loading, jobDescription, activeSection]
  );

  const handleConfirm = useCallback(
    (msgId: string, suggestion: CVAssistantSuggestion) => {
      if (!mainCV) return;

      const result = applySuggestion(mainCV, suggestion);
      if (!result) {
        toast({
          title: "Could not apply suggestion",
          description: "The suggestion path is invalid or unsupported.",
          variant: "destructive",
        });
        return;
      }

      setMainCV(result);

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== msgId) return m;
          const newConfirmed = new Set(m.confirmedIds);
          newConfirmed.add(suggestion.id);
          return { ...m, confirmedIds: newConfirmed };
        })
      );

      // Persist status to backend (fire-and-forget)
      updateSuggestionStatus(mainCV.id, msgId, suggestion.id, "confirmed").catch(
        () => {} // UI already updated optimistically
      );

      toast({
        title: "Suggestion applied",
        description: "Change applied to your draft. Save to persist.",
      });
    },
    [mainCV, setMainCV]
  );

  const handleReject = useCallback(
    (msgId: string, suggestion: CVAssistantSuggestion) => {
      if (!mainCV) return;

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== msgId) return m;
          const newRejected = new Set(m.rejectedIds);
          newRejected.add(suggestion.id);
          return { ...m, rejectedIds: newRejected };
        })
      );

      // Persist status to backend (fire-and-forget)
      updateSuggestionStatus(mainCV.id, msgId, suggestion.id, "dismissed").catch(
        () => {} // UI already updated optimistically
      );
    },
    [mainCV]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quota indicator */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100 rounded-t-xl">
        <div className="flex items-center gap-2">
          <LucideZap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs text-gray-500">
            {quotaRemaining !== null
              ? isQuotaExhausted
                ? `Limit reached${quotaResetAt ? `. Resets ${new Date(quotaResetAt).toLocaleDateString()}` : ""}`
                : `${quotaRemaining} AI assist${quotaRemaining !== 1 ? "s" : ""} left this week`
              : "AI CV Assistant"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div ref={messagesTopRef} />

        {/* Load older messages button */}
        {hasOlderMessages && (
          <div className="flex justify-center">
            <button
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
              onClick={loadOlderMessages}
              disabled={loadingOlder}
            >
              {loadingOlder ? (
                <span className="flex items-center gap-1.5">
                  <LucideLoader2 className="w-3 h-3 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Load older messages"
              )}
            </button>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            {/* Message bubble */}
            <div
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>

            {/* Insights (for evaluation responses) */}
            {msg.insights && msg.insights.length > 0 && (
              <div className="mt-2 ml-1 space-y-1">
                {msg.insights.map((insight, idx) => (
                  <div
                    key={`insight_${idx}`}
                    className={`rounded-lg px-3 py-1.5 text-xs ${
                      insight.type === "strength" || insight.type === "match"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : insight.type === "gap"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    <span className="font-medium capitalize">{insight.type}:</span>{" "}
                    {insight.text}
                  </div>
                ))}
              </div>
            )}

            {/* Suggestion cards */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="mt-2 space-y-2 ml-1">
                {msg.suggestions.map((s) => {
                  const isConfirmed = msg.confirmedIds?.has(s.id);
                  const isRejected = msg.rejectedIds?.has(s.id);

                  if (isConfirmed) {
                    return (
                      <div
                        key={s.id}
                        className="rounded-lg border border-green-200 bg-green-50 p-2 text-xs text-green-700"
                      >
                        Applied to draft
                      </div>
                    );
                  }
                  if (isRejected) {
                    return (
                      <div
                        key={s.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-xs text-gray-400"
                      >
                        Dismissed
                      </div>
                    );
                  }

                  return (
                    <CVAssistantSuggestionCard
                      key={s.id}
                      suggestion={s}
                      onConfirm={(sug) => handleConfirm(msg.id, sug)}
                      onReject={(sug) => handleReject(msg.id, sug)}
                      disabled={loading}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
              <LucideLoader2 className="w-3.5 h-3.5 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      {messages.length <= 2 && (
        <div className="px-3 pb-2">
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.message}
                className="text-xs px-2.5 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
                onClick={() => sendMessage(action.message, action.intent)}
                disabled={loading || isQuotaExhausted}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Job description toggle */}
      <div className="px-3 pb-1">
        <button
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
          onClick={() => setShowJDInput(!showJDInput)}
        >
          <LucideFileText className="w-3 h-3" />
          {showJDInput ? "Hide" : "Add"} job description
          {showJDInput ? <LucideChevronUp className="w-3 h-3" /> : <LucideChevronDown className="w-3 h-3" />}
        </button>
        {showJDInput && (
          <Textarea
            className="mt-1 text-xs h-20 resize-none"
            placeholder="Paste the target job description here for tailoring or evaluation..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={3000}
          />
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 pt-1 border-t border-gray-100">
        <div className="flex gap-2">
          <Input
            className="flex-1 text-sm h-9"
            placeholder={
              isQuotaExhausted
                ? "Weekly limit reached"
                : "Ask about your CV or describe a change..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || isQuotaExhausted}
            maxLength={2000}
          />
          <Button
            type="submit"
            size="sm"
            className="h-9 w-9 p-0 bg-black hover:bg-black/90"
            disabled={loading || !input.trim() || isQuotaExhausted}
          >
            {loading ? (
              <LucideLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LucideSend className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
