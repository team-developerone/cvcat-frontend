import { Button } from "@/components/ui/button";
import { LucideCheck, LucideX, LucideAlertTriangle, LucideArrowRight } from "lucide-react";
import type { CVAssistantSuggestion } from "@/services/api";

interface SuggestionCardProps {
  suggestion: CVAssistantSuggestion;
  onConfirm: (suggestion: CVAssistantSuggestion) => void;
  onReject: (suggestion: CVAssistantSuggestion) => void;
  disabled?: boolean;
}

function formatPath(path: string): string {
  return path
    .replace("data.", "")
    .replace(/\[(\d+)\]/g, " #$1")
    .replace(/\./g, " > ")
    .replace("basics.summary", "Summary")
    .replace("basics.label", "Title")
    .replace(/^work/, "Experience")
    .replace(/^projects?/, "Project")
    .replace(/^skills/, "Skills")
    .replace("highlights", "bullet");
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
}

/**
 * Render a structured object (e.g. a work experience entry) as a compact readable string.
 */
function formatStructuredValue(value: Record<string, unknown>): string {
  const lines: string[] = [];
  const { position, name, startDate, endDate, summary, highlights, ...rest } = value;

  // Work experience header line
  if (position || name) {
    const parts = [position, name].filter(Boolean);
    lines.push(parts.join(" at "));
  }

  if (startDate || endDate) {
    lines.push(`${startDate ?? "?"} – ${endDate ?? "Present"}`);
  }

  if (typeof summary === "string" && summary) {
    lines.push(summary);
  }

  if (Array.isArray(highlights) && highlights.length > 0) {
    for (const h of highlights) {
      if (typeof h === "string") lines.push(`• ${h}`);
    }
  }

  // Any other string fields not yet shown
  for (const [key, val] of Object.entries(rest)) {
    if (typeof val === "string" && val) {
      lines.push(`${key}: ${val}`);
    }
  }

  return lines.join("\n");
}

/**
 * Convert a suggestion's newValue to a display string, handling structured objects.
 */
function newValueToText(newValue: CVAssistantSuggestion["newValue"]): string {
  if (typeof newValue === "string") return newValue;

  if (Array.isArray(newValue)) {
    // Array of strings
    if (newValue.length > 0 && typeof newValue[0] === "string") {
      return (newValue as string[]).join("\n• ");
    }
    // Array of objects (e.g. one or more work entries)
    return (newValue as Record<string, unknown>[])
      .map(formatStructuredValue)
      .join("\n---\n");
  }

  if (typeof newValue === "object" && newValue != null) {
    return formatStructuredValue(newValue as Record<string, unknown>);
  }

  return "";
}

export default function CVAssistantSuggestionCard({
  suggestion,
  onConfirm,
  onReject,
  disabled = false,
}: SuggestionCardProps) {
  // Improvement hint (from rule-based engine)
  if (suggestion.type === "improvement_hint") {
    const severityColor =
      suggestion.severity === "high"
        ? "border-red-200 bg-red-50"
        : suggestion.severity === "medium"
          ? "border-yellow-200 bg-yellow-50"
          : "border-blue-200 bg-blue-50";

    return (
      <div className={`rounded-lg border p-3 ${severityColor}`}>
        <div className="flex items-start gap-2">
          <LucideAlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 mb-1">
              {formatPath(suggestion.path)}
            </p>
            <p className="text-sm text-gray-700">{suggestion.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Replace or append suggestion
  const oldText =
    typeof suggestion.oldValue === "string" ? suggestion.oldValue : "";
  const newText = newValueToText(suggestion.newValue);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <p className="text-xs font-medium text-gray-400 mb-2">
        {formatPath(suggestion.path)}
        <span className="ml-2 text-xs text-gray-300">
          {suggestion.type === "append" ? "append" : "replace"}
        </span>
      </p>

      {oldText && (
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Current</p>
          <p className="text-sm text-gray-500 bg-red-50 rounded px-2 py-1 line-through">
            {truncate(oldText, 200)}
          </p>
        </div>
      )}

      <div className="mb-3">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
          {suggestion.type === "append" ? "New" : "Suggested"}
        </p>
        <p className="text-sm text-gray-800 bg-green-50 rounded px-2 py-1 whitespace-pre-line">
          {suggestion.type === "append" && typeof suggestion.newValue === "string" && "• "}
          {truncate(newText, 400)}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="default"
          className="flex-1 h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
          onClick={() => onConfirm(suggestion)}
          disabled={disabled}
        >
          <LucideCheck className="w-3 h-3 mr-1" />
          Apply
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 h-7 text-xs"
          onClick={() => onReject(suggestion)}
          disabled={disabled}
        >
          <LucideX className="w-3 h-3 mr-1" />
          Dismiss
        </Button>
      </div>
    </div>
  );
}
