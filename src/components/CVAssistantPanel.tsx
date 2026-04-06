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
import { cvAssistant } from "@/services/api";
import type {
  CVAssistantIntent,
  CVAssistantSuggestion,
  CVAssistantResponse,
} from "@/services/api";
import CVAssistantSuggestionCard from "./CVAssistantSuggestionCard";
import { applySuggestion } from "@/lib/cvAssistant/applySuggestion";
import { toast } from "@/hooks/use-toast";

interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  suggestions?: CVAssistantSuggestion[];
  confirmedIds?: Set<string>;
  rejectedIds?: Set<string>;
}

const QUICK_ACTIONS: { label: string; intent: CVAssistantIntent; message: string }[] = [
  { label: "Improve summary", intent: "rewrite_summary", message: "Improve my professional summary to be more impactful" },
  { label: "Suggest improvements", intent: "suggest_improvements", message: "What should I improve in my CV?" },
  { label: "Generate bullets from note", intent: "generate_bullets_from_note", message: "Generate bullet points from my notes" },
  { label: "Make ATS-friendly", intent: "rewrite_summary", message: "Make my summary more ATS-friendly with relevant keywords" },
];

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

  // Bullet-oriented intents → target work/project highlights
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
    // Fallback: first work entry regardless of section
    if (cv.experience?.length) {
      const entry = cv.experience[0];
      return {
        path: "data.work[0].highlights[0]",
        section: "work",
        selectedText: entry.highlights?.[0] || entry.description || "",
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
    // personal / default → summary
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
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "I can suggest changes to your CV \u2014 you review each one and confirm or reject it. Try improving your summary, rewriting bullets, or tailoring a section to a job description.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null);
  const [quotaResetAt, setQuotaResetAt] = useState<string | null>(null);
  const [showJDInput, setShowJDInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
          confirmedIds: new Set(),
          rejectedIds: new Set(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";

        // Parse quota info from error if available
        if (errorMessage.includes("quota exceeded")) {
          setQuotaRemaining(0);
        }

        const errorMsg: AssistantMessage = {
          id: `error_${Date.now()}`,
          role: "assistant",
          text: `Sorry, I couldn't process that. ${errorMessage}`,
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

      // Mark as confirmed
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== msgId) return m;
          const newConfirmed = new Set(m.confirmedIds);
          newConfirmed.add(suggestion.id);
          return { ...m, confirmedIds: newConfirmed };
        })
      );

      toast({
        title: "Suggestion applied",
        description: "Change applied to your draft. Save to persist.",
      });
    },
    [mainCV, setMainCV]
  );

  const handleReject = useCallback((msgId: string, suggestion: CVAssistantSuggestion) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId) return m;
        const newRejected = new Set(m.rejectedIds);
        newRejected.add(suggestion.id);
        return { ...m, rejectedIds: newRejected };
      })
    );
  }, []);

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
        {messages.map((msg) => (
          <div key={msg.id}>
            {/* Message bubble */}
            <div
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>

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
                key={action.intent + action.label}
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
            placeholder="Paste the target job description here for tailoring..."
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
                : "Describe a change \u2014 I\u2019ll suggest edits for you to review..."
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
