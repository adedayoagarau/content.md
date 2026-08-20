import { sha256Canonical } from "@contentmd/core";

export interface ContentTaskPacketInput {
  task_id: string;
  product_context_refs: string[];
  audience_job_refs: string[];
  journey_state_refs: string[];
  semantic_message_ref: string;
  required_fact_refs: string[];
  prohibited_claims: string[];
  consequence: string;
  recovery: string | null;
  channel: string;
  locale: string;
  risk: string;
  evidence_refs: string[];
  acceptance_criteria: string[];
}

export interface ContentTaskPacket extends ContentTaskPacketInput {
  schema_version: "contentmd.task-packet/0.1.0";
  task_digest: string;
  authority_effect: "none";
}

function assertString(value: string, field: string): void {
  if (value.trim().length === 0) throw new TypeError(`invalid_task_packet:${field}`);
}

function uniqueStrings(values: string[], field: string): string[] {
  if (values.length === 0) throw new TypeError(`invalid_task_packet:${field}`);
  for (const value of values) assertString(value, field);
  return [...new Set(values)].sort();
}

export function createContentTaskPacket(input: ContentTaskPacketInput): ContentTaskPacket {
  for (const field of [
    "task_id",
    "semantic_message_ref",
    "consequence",
    "channel",
    "locale",
    "risk",
  ] as const) {
    assertString(input[field], field);
  }
  if (input.recovery !== null) assertString(input.recovery, "recovery");
  const preimage = {
    schema_version: "contentmd.task-packet/0.1.0" as const,
    task_id: input.task_id,
    product_context_refs: uniqueStrings(input.product_context_refs, "product_context_refs"),
    audience_job_refs: uniqueStrings(input.audience_job_refs, "audience_job_refs"),
    journey_state_refs: uniqueStrings(input.journey_state_refs, "journey_state_refs"),
    semantic_message_ref: input.semantic_message_ref,
    required_fact_refs: uniqueStrings(input.required_fact_refs, "required_fact_refs"),
    prohibited_claims: uniqueStrings(input.prohibited_claims, "prohibited_claims"),
    consequence: input.consequence,
    recovery: input.recovery,
    channel: input.channel,
    locale: input.locale,
    risk: input.risk,
    evidence_refs: uniqueStrings(input.evidence_refs, "evidence_refs"),
    acceptance_criteria: uniqueStrings(input.acceptance_criteria, "acceptance_criteria"),
    authority_effect: "none" as const,
  };
  return { ...preimage, task_digest: sha256Canonical(preimage) };
}
