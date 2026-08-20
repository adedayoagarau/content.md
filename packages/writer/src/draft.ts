import { sha256Canonical } from "@contentmd/core";
import { createModelRequest, type ModelProvider, type ModelResponse } from "@contentmd/model-provider-sdk";
import type { ContentStrategyProposal, ModelTrace } from "./strategy.js";
import type { ContentTaskPacket } from "./task-packet.js";

export interface DraftRequest {
  task: ContentTaskPacket;
  strategy: ContentStrategyProposal;
}

export interface ContentAlternative {
  purpose: string;
  original_text: string | null;
  proposed_text: string;
  rationale: string;
  occurrence_refs: string[];
  evidence_refs: string[];
  pattern_refs: string[];
  uncertainty: string;
}

export interface ContentDraftProposal {
  schema_version: "contentmd.draft-proposal/0.1.0";
  proposal_id: string;
  lifecycle_state: "proposed";
  authority_effect: "none";
  alternatives: ContentAlternative[];
  message_hierarchy: string[];
  evidence_refs: string[];
  pattern_refs: string[];
  prohibited_claims_omitted: string[];
  uncertainty: string[];
  tradeoffs: string[];
  model_trace: ModelTrace;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`invalid_draft_output:${field}`);
  }
  return value as string[];
}

function trace(response: ModelResponse): ModelTrace {
  return {
    request_id: response.request_id,
    input_digest: response.input_digest,
    output_digest: response.output_digest,
    provider_id: response.provider_id,
    model_id: response.model_id,
    deterministic_status: response.deterministic_status,
  };
}

function parseDraftOutput(value: unknown): Omit<ContentDraftProposal, "schema_version" | "proposal_id" | "lifecycle_state" | "authority_effect" | "model_trace"> {
  if (!isRecord(value) || !Array.isArray(value.alternatives)) throw new Error("invalid_draft_output");
  const alternatives = value.alternatives.map((item, index): ContentAlternative => {
    if (!isRecord(item) || typeof item.purpose !== "string" || typeof item.proposed_text !== "string" || typeof item.rationale !== "string" || typeof item.uncertainty !== "string") {
      throw new Error(`invalid_draft_output:alternative:${index}`);
    }
    if (item.original_text !== null && typeof item.original_text !== "string") {
      throw new Error(`invalid_draft_output:alternative_original:${index}`);
    }
    return {
      purpose: item.purpose,
      original_text: item.original_text,
      proposed_text: item.proposed_text,
      rationale: item.rationale,
      occurrence_refs: stringArray(item.occurrence_refs, `alternative_occurrence_refs:${index}`),
      evidence_refs: stringArray(item.evidence_refs, `alternative_evidence_refs:${index}`),
      pattern_refs: stringArray(item.pattern_refs, `alternative_pattern_refs:${index}`),
      uncertainty: item.uncertainty,
    };
  });
  return {
    alternatives,
    message_hierarchy: stringArray(value.message_hierarchy, "message_hierarchy"),
    evidence_refs: stringArray(value.evidence_refs, "evidence_refs"),
    pattern_refs: stringArray(value.pattern_refs, "pattern_refs"),
    prohibited_claims_omitted: stringArray(value.prohibited_claims_omitted, "prohibited_claims_omitted"),
    uncertainty: stringArray(value.uncertainty, "uncertainty"),
    tradeoffs: stringArray(value.tradeoffs, "tradeoffs"),
  };
}

export async function proposeContentDraft(
  provider: ModelProvider,
  input: DraftRequest,
): Promise<ContentDraftProposal> {
  const request = createModelRequest({
    operation: "draft",
    output_schema_id: "contentmd.draft-model-output/0.1.0",
    input: {
      task: input.task,
      strategy: input.strategy,
      constraints: {
        proposal_only: true,
        preserve_required_facts: true,
        omit_prohibited_claims: true,
        may_apply_change: false,
      },
    },
  });
  const response = await provider.generate(request);
  const output = parseDraftOutput(response.output);
  return {
    schema_version: "contentmd.draft-proposal/0.1.0",
    proposal_id: `proposal.draft.${sha256Canonical({ request, output }).slice(0, 24)}`,
    lifecycle_state: "proposed",
    authority_effect: "none",
    ...output,
    model_trace: trace(response),
  };
}
