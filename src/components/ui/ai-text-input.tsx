import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { writingAssistant, type WritingAction } from "@/services/api";
import {
  Sparkles,
  Check,
  X,
  Loader2,
  SpellCheck,
  Zap,
  Minus,
  Plus,
  Palette,
} from "lucide-react";
import SparklesGradient from "./sparkles-gradient";

const ACTIONS: {
  action: WritingAction;
  label: string;
  icon: React.ReactElement;
}[] = [
  { action: "fix", label: "Fix Grammar", icon: <SpellCheck className="w-3.5 h-3.5" /> },
  { action: "simplify", label: "Simplify", icon: <Zap className="w-3.5 h-3.5" /> },
  { action: "short", label: "Shorten", icon: <Minus className="w-3.5 h-3.5" /> },
  { action: "long", label: "Lengthen", icon: <Plus className="w-3.5 h-3.5" /> },
];

const TONES = ["formal", "friendly", "confident", "professional"];

interface AITextInputProps {
  variant?: "input" | "textarea";
  value: string;
  onValueChange: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  disabled?: boolean;
  name?: string;
  type?: string;
  placeholder?: string;
}

export default function AITextInput({
  variant = "input",
  value,
  onValueChange,
  onChange,
  onKeyDown,
  className = "",
  disabled,
  name,
  type,
  placeholder,
}: AITextInputProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [showTones, setShowTones] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (showToolbar && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const toolbarWidth = 320;
      let left = rect.right - toolbarWidth;
      if (left < 8) left = 8;
      if (left + toolbarWidth > window.innerWidth - 8) {
        left = window.innerWidth - toolbarWidth - 8;
      }
      setToolbarPos({
        top: rect.bottom + 6,
        left,
      });
    }
  }, [showToolbar]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  useEffect(() => {
    if (!showToolbar) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showToolbar, updatePosition]);

  useEffect(() => {
    if (!showToolbar) return;
    const handleClick = (e: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeToolbar();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showToolbar]);

  const closeToolbar = () => {
    setShowToolbar(false);
    setSuggestion(null);
    setShowTones(false);
    setError(null);
    setLoading(false);
  };

  const handleAction = async (action: WritingAction, tone?: string) => {
    if (!value.trim()) return;
    setLoading(true);
    setError(null);
    setSuggestion(null);
    setShowTones(false);
    try {
      const payload: { action: WritingAction; text: string; tone?: string } = {
        action,
        text: value,
      };
      if (tone) payload.tone = tone;
      const res = await writingAssistant(payload);
      setSuggestion(res.data.alteredText);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to improve text");
    } finally {
      setLoading(false);
    }
  };

  const acceptSuggestion = () => {
    if (suggestion) {
      onValueChange(suggestion);
    }
    closeToolbar();
  };

  const hasText = value && value.trim().length > 0;

  const inputClassName = `${className} ${!disabled ? "pr-8" : ""}`;

  return (
    <div className="relative">
      {variant === "textarea" ? (
        <Textarea
              value={value}
              onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
              onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLTextAreaElement>}
              className={inputClassName}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
            />
          ) : (
            <Input
              value={value}
              onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
              onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLInputElement>}
              className={inputClassName}
              name={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}

      {!disabled && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (showToolbar) {
              closeToolbar();
            } else {
              setShowToolbar(true);
            }
          }}
          className={`absolute ai-btn-glow ${variant === "textarea" ? "top-2" : "top-1/2 -translate-y-1/2"} right-2 p-1 rounded-md transition-colors ${
            showToolbar
              ? "text-[#DAA520] bg-[#DAA520]/10"
              : "text-gray-400 hover:text-[#DAA520] hover:bg-[#DAA520]/10"
          }`}
          title={hasText ? "Improve with AI" : "Add text to improve with AI"}
        >
          <span className="ai-icon-gradient inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </button>
      )}

      {showToolbar &&
        createPortal(
          <div
            ref={toolbarRef}
            style={{
              position: "fixed",
              top: toolbarPos.top,
              left: toolbarPos.left,
              zIndex: 9999,
            }}
            className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#DAA520]/10 to-transparent border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#DAA520]" />
                <span className="text-xs font-medium text-gray-700">
                  Improve with AI
                </span>
              </div>
              <button
                type="button"
                onClick={closeToolbar}
                className="p-0.5 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Actions */}
            {!suggestion && !loading && !error && (
              <div className="p-2">
                <div className="grid grid-cols-2 gap-1">
                  {ACTIONS.map((a) => (
                    <button
                      key={a.action}
                      type="button"
                      onClick={() => handleAction(a.action)}
                      className="flex items-center gap-1.5 px-2.5 py-2 text-xs text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#DAA520] transition-colors text-left"
                    >
                      {a.icon}
                      {a.label}
                    </button>
                  ))}
                </div>

                {/* Tone section */}
                <div className="mt-1 border-t border-gray-100 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowTones(!showTones)}
                    className="flex items-center gap-1.5 w-full px-2.5 py-2 text-xs text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#DAA520] transition-colors text-left"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    Change Tone
                    <span className="ml-auto text-gray-400 text-[10px]">
                      {showTones ? "▴" : "▾"}
                    </span>
                  </button>
                  {showTones && (
                    <div className="ml-6 flex flex-wrap gap-1.5 mt-1 mb-1">
                      {TONES.map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => handleAction("tone", tone)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-[#DAA520]/15 hover:text-[#DAA520] transition-colors capitalize"
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="px-4 py-5 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 text-[#DAA520] animate-spin" />
                <span className="text-xs text-gray-500">
                  Improving your text…
                </span>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="p-3">
                <p className="text-xs text-red-500 mb-2">{error}</p>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Suggestion */}
            {suggestion && !loading && (
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                  Suggestion
                </p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 text-xs text-gray-800 leading-relaxed max-h-40 overflow-y-auto">
                  {suggestion}
                </div>
                <div className="flex justify-end gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={() => setSuggestion(null)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-3 h-3" /> Reject
                  </button>
                  <button
                    type="button"
                    onClick={acceptSuggestion}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-[#DAA520] hover:bg-[#B8860B] rounded-md transition-colors font-medium"
                  >
                    <Check className="w-3 h-3" /> Accept
                  </button>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
