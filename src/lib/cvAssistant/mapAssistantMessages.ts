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
 * Populates confirmedIds/rejectedIds from the persisted suggestion status.
 */
export function mapBackendMessages(records: AssistantMessageRecord[]): AssistantMessage[] {
  return records.map((r) => {
    const confirmedIds = new Set<string>();
    const rejectedIds = new Set<string>();

    if (r.suggestions) {
      for (const s of r.suggestions) {
        if (s.status === "confirmed") confirmedIds.add(s.id);
        else if (s.status === "dismissed") rejectedIds.add(s.id);
      }
    }

    return {
      id: r._id,
      role: r.role,
      text: r.text,
      suggestions: r.suggestions && r.suggestions.length > 0 ? r.suggestions : undefined,
      insights: r.insights && r.insights.length > 0 ? r.insights : undefined,
      confirmedIds,
      rejectedIds,
    };
  });
}
