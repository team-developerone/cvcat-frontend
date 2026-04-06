import type { AssistantMessageRecord, CVAssistantSuggestion, CVAssistantInsight } from "@/services/api";

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  suggestions?: CVAssistantSuggestion[];
  insights?: CVAssistantInsight[];
  confirmedIds?: Set<string>;
  rejectedIds?: Set<string>;
}

/**
 * Map backend message records to the UI AssistantMessage shape.
 * Historical suggestions are shown read-only (no confirmed/rejected tracking
 * for old messages — those Sets start empty).
 */
export function mapBackendMessages(records: AssistantMessageRecord[]): AssistantMessage[] {
  return records.map((r) => ({
    id: r._id,
    role: r.role,
    text: r.text,
    suggestions: r.suggestions && r.suggestions.length > 0 ? r.suggestions : undefined,
    insights: r.insights && r.insights.length > 0 ? r.insights : undefined,
    confirmedIds: new Set<string>(),
    rejectedIds: new Set<string>(),
  }));
}
