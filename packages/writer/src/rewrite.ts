import { sha256Canonical } from "@contentmd/core";
import type {
  GovernedModelResponse,
  ModelExecutionPort,
} from "@contentmd/model-provider-sdk";
import type { ContentDraftProposal } from "./draft.js";
import {
  executeCompiledWriterPrompt,
  type WriterModelExecutionContext,
} from "./prompt-compiler.js";
import { compileRewritePrompt } from "./prompts/rewrite.js";
import type { ContentStrategyProposal, ModelTrace } from "./strategy.js";
import type { ContentTaskPacket } from "./task-packet.js";

export interface RewriteRequest {
  task: ContentTaskPacket;
  strategy: ContentStrategyProposal;
  draft: ContentDraftProposal;
  execution: WriterModelExecutionContext;
}

export interface ProposedContentDiff {
  source_artifact: string;
  line: number;
  column: number;
  before: string;
  after: string;
  rationale: string;
  evidence_refs: string[];
  pattern_refs: string[];
  acceptance_criteria: string[];
  mutation_status: "not_applied";
}

export interface ContentRewriteProposal {
  schema_version: "contentmd.rewrite-proposal/0.1.0";
  proposal_id: string;
  lifecycle_state: "proposed";
  authority_effect: "none";
  approval_status: "not_requested";
  diffs: ProposedContentDiff[];
  evidence_refs: string[];
  pattern_refs: string[];
  uncertainty: string[];
  tradeoffs: string[];
  verification_plan: string[];
  rollback_plan: string;
  model_trace: ModelTrace;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`invalid_rewrite_output:${field}`);
  }
  return value as string[];
}

function trace(response: GovernedModelResponse): ModelTrace {
  return {
    request_id: response.request_id,
    input_digest: response.input_digest,
    output_digest: response.output_digest,
    provider_id: response.provider_id,
    model_id: response.model_id,
    deterministic_status: response.deterministic_status,
  };
}

function parseRewriteOutput(value: unknown): Omit<ContentRewriteProposal, "schema_version" | "proposal_id" | "lifecycle_state" | "authority_effect" | "approval_status" | "model_trace"> {
  if (!isRecord(value) || !Array.isArray(value.diffs) || typeof value.rollback_plan !== "string") {
    throw new Error("invalid_rewrite_output");
  }
  const diffs = value.diffs.map((item, index): ProposedContentDiff => {
    if (
      !isRecord(item) ||
      typeof item.source_artifact !== "string" ||
      typeof item.line !== "number" ||
      typeof item.column !== "number" ||
      typeof item.before !== "string" ||
      typeof item.after !== "string" ||
      typeof item.rationale !== "string"
    ) {
      throw new Error(`invalid_rewrite_output:diff:${index}`);
    }
    return {
      source_artifact: item.source_artifact,
      line: item.line,
      column: item.column,
      before: item.before,
      after: item.after,
      rationale: item.rationale,
      evidence_refs: stringArray(item.evidence_refs, `diff_evidence_refs:${index}`),
      pattern_refs: stringArray(item.pattern_refs, `diff_pattern_refs:${index}`),
      acceptance_criteria: stringArray(item.acceptance_criteria, `diff_acceptance_criteria:${index}`),
      mutation_status: "not_applied",
    };
  });
  return {
    diffs,
    evidence_refs: stringArray(value.evidence_refs, "evidence_refs"),
    pattern_refs: stringArray(value.pattern_refs, "pattern_refs"),
    uncertainty: stringArray(value.uncertainty, "uncertainty"),
    tradeoffs: stringArray(value.tradeoffs, "tradeoffs"),
    verification_plan: stringArray(value.verification_plan, "verification_plan"),
    rollback_plan: value.rollback_plan,
  };
}

export async function proposeContentRewrite(
  provider: ModelExecutionPort,
  input: RewriteRequest,
): Promise<ContentRewriteProposal> {
  const prompt = compileRewritePrompt({
    project_id: input.execution.project_id,
    task: input.task,
    strategy: input.strategy,
    draft: input.draft,
    context_packet_ref: input.execution.context_packet_ref,
    retrieval_snapshot_ref: input.execution.retrieval_snapshot_ref,
    context_items: input.execution.context_items,
  });
  const executed = await executeCompiledWriterPrompt(provider, {
    operation: "rewrite",
    output_schema_id: "contentmd.rewrite-model-output/0.1.0",
    task: input.task,
    prompt,
    execution: input.execution,
  });
  const output = parseRewriteOutput(executed.output);
  return {
    schema_version: "contentmd.rewrite-proposal/0.1.0",
    proposal_id: `proposal.rewrite.${sha256Canonical({ request: executed.request, output }).slice(0, 24)}`,
    lifecycle_state: "proposed",
    authority_effect: "none",
    approval_status: "not_requested",
    ...output,
    model_trace: trace(executed.response),
  };
}
