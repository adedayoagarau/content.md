import type { MemoryScope } from "@contentmd/core";
import type { AppendOnlyEventStore } from "@contentmd/memory";

export type ContentDecisionStatus = "accepted" | "edited" | "rejected" | "abstained";

export interface ContentDecisionInput {
  store: AppendOnlyEventStore;
  stream_id: string;
  expected_head_digest: string | null;
  decision_id: string;
  status: ContentDecisionStatus;
  actor_ref: string;
  actor_role: string;
  rationale: string;
  proposal_ref: string;
  selected_expression: string | null;
  edited_expression: string | null;
  evidence_reviewed: string[];
  scope: MemoryScope;
  project_id: string;
  occurred_at: string;
  data_class: string;
}

export interface ContentDecisionRecord {
  schema_version: "contentmd.content-decision/0.1.0";
  decision_id: string;
  status: ContentDecisionStatus;
  actor_ref: string;
  actor_role: string;
  rationale: string;
  proposal_ref: string;
  selected_expression: string | null;
  edited_expression: string | null;
  evidence_reviewed: string[];
  scope: MemoryScope;
  project_id: string;
  occurred_at: string;
  mutation_approval_effect: "none";
  sequence: number;
  event_digest: string;
}

const DECISION_STATUSES = new Set<ContentDecisionStatus>([
  "accepted",
  "edited",
  "rejected",
  "abstained",
]);

function requireText(value: string, field: string): void {
  if (value.trim().length === 0) throw new TypeError(`invalid_content_decision:${field}`);
}

export async function recordContentDecision(
  input: ContentDecisionInput,
): Promise<ContentDecisionRecord> {
  if (!DECISION_STATUSES.has(input.status)) throw new TypeError("invalid_content_decision:status");
  for (const field of [
    "stream_id",
    "decision_id",
    "actor_ref",
    "actor_role",
    "rationale",
    "proposal_ref",
    "project_id",
    "data_class",
  ] as const) {
    requireText(input[field], field);
  }
  if (input.status === "accepted" && (input.selected_expression === null || input.selected_expression.trim().length === 0)) {
    throw new Error("accepted_decision_requires_selected_expression");
  }
  if (input.status === "edited" && (input.edited_expression === null || input.edited_expression.trim().length === 0)) {
    throw new Error("edited_decision_requires_edited_expression");
  }
  if (
    (input.status === "rejected" || input.status === "abstained") &&
    (input.selected_expression !== null || input.edited_expression !== null)
  ) {
    throw new Error(`${input.status}_decision_cannot_select_expression`);
  }
  if (Number.isNaN(Date.parse(input.occurred_at))) throw new TypeError("invalid_content_decision:occurred_at");
  if (input.evidence_reviewed.length === 0) throw new TypeError("invalid_content_decision:evidence_reviewed");
  const payload = {
    schema_version: "contentmd.content-decision/0.1.0" as const,
    decision_id: input.decision_id,
    status: input.status,
    actor_ref: input.actor_ref,
    actor_role: input.actor_role,
    rationale: input.rationale,
    proposal_ref: input.proposal_ref,
    selected_expression: input.selected_expression,
    edited_expression: input.edited_expression,
    evidence_reviewed: [...new Set(input.evidence_reviewed)].sort(),
    scope: input.scope,
    project_id: input.project_id,
    occurred_at: input.occurred_at,
    mutation_approval_effect: "none" as const,
  };
  const event = await input.store.append({
    event_id: `event.${input.decision_id}`,
    stream_id: input.stream_id,
    event_type: "content_decision_recorded",
    occurred_at: input.occurred_at,
    actor_ref: input.actor_ref,
    data_class: input.data_class,
    payload,
    expected_head_digest: input.expected_head_digest,
  });
  return { ...payload, sequence: event.sequence, event_digest: event.event_digest };
}
