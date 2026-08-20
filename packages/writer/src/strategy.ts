import { sha256Canonical } from "@contentmd/core";
import { createModelRequest, type ModelProvider, type ModelResponse } from "@contentmd/model-provider-sdk";
import type { ContentTaskPacket } from "./task-packet.js";

export interface StrategyRequest {
  task: ContentTaskPacket;
  review_finding_refs: string[];
  pattern_refs: string[];
}

export interface ContentStrategyProposal {
  schema_version: "contentmd.strategy-proposal/0.1.0";
  proposal_id: string;
  lifecycle_state: "proposed";
  authority_effect: "none";
  value_proposition: {
    headline: string;
    explanation: string;
    fact_refs: string[];
  };
  message_hierarchy: Array<{ priority: number; purpose: string; guidance: string }>;
  navigation_recommendations: Array<{ destination: string; preferred_label: string; rationale: string }>;
  prohibited_claim_handling: Array<{ claim: string; disposition: "remove" | "hold_for_evidence"; rationale: string }>;
  evidence_refs: string[];
  pattern_refs: string[];
  uncertainty: string[];
  tradeoffs: string[];
  model_trace: ModelTrace;
}

export interface ModelTrace {
  request_id: string;
  input_digest: string;
  output_digest: string;
  provider_id: string;
  model_id: string;
  deterministic_status: ModelResponse["deterministic_status"];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`invalid_strategy_output:${field}`);
  }
  return value as string[];
}

function modelTrace(response: ModelResponse): ModelTrace {
  return {
    request_id: response.request_id,
    input_digest: response.input_digest,
    output_digest: response.output_digest,
    provider_id: response.provider_id,
    model_id: response.model_id,
    deterministic_status: response.deterministic_status,
  };
}

function parseStrategyOutput(value: unknown): Omit<ContentStrategyProposal, "schema_version" | "proposal_id" | "lifecycle_state" | "authority_effect" | "model_trace"> {
  if (!isRecord(value) || !isRecord(value.value_proposition)) throw new Error("invalid_strategy_output");
  const valueProposition = value.value_proposition;
  if (typeof valueProposition.headline !== "string" || typeof valueProposition.explanation !== "string") {
    throw new Error("invalid_strategy_output:value_proposition");
  }
  if (!Array.isArray(value.message_hierarchy) || !Array.isArray(value.navigation_recommendations) || !Array.isArray(value.prohibited_claim_handling)) {
    throw new Error("invalid_strategy_output:collections");
  }
  return {
    value_proposition: {
      headline: valueProposition.headline,
      explanation: valueProposition.explanation,
      fact_refs: stringArray(valueProposition.fact_refs, "fact_refs"),
    },
    message_hierarchy: value.message_hierarchy as ContentStrategyProposal["message_hierarchy"],
    navigation_recommendations: value.navigation_recommendations as ContentStrategyProposal["navigation_recommendations"],
    prohibited_claim_handling: value.prohibited_claim_handling as ContentStrategyProposal["prohibited_claim_handling"],
    evidence_refs: stringArray(value.evidence_refs, "evidence_refs"),
    pattern_refs: stringArray(value.pattern_refs, "pattern_refs"),
    uncertainty: stringArray(value.uncertainty, "uncertainty"),
    tradeoffs: stringArray(value.tradeoffs, "tradeoffs"),
  };
}

export async function proposeContentStrategy(
  provider: ModelProvider,
  input: StrategyRequest,
): Promise<ContentStrategyProposal> {
  const request = createModelRequest({
    operation: "strategy",
    output_schema_id: "contentmd.strategy-model-output/0.1.0",
    input: {
      task: input.task,
      review_finding_refs: [...new Set(input.review_finding_refs)].sort(),
      pattern_refs: [...new Set(input.pattern_refs)].sort(),
      constraints: {
        proposal_only: true,
        may_create_decision: false,
        may_create_approval: false,
        may_apply_change: false,
      },
    },
  });
  const response = await provider.generate(request);
  const output = parseStrategyOutput(response.output);
  return {
    schema_version: "contentmd.strategy-proposal/0.1.0",
    proposal_id: `proposal.strategy.${sha256Canonical({ request, output }).slice(0, 24)}`,
    lifecycle_state: "proposed",
    authority_effect: "none",
    ...output,
    model_trace: modelTrace(response),
  };
}
