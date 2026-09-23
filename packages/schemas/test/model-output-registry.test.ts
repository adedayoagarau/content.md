import { describe, expect, it } from "vitest";
import {
  MODEL_OUTPUT_SCHEMA_IDS,
  ModelOutputSchemaError,
  projectModelOutputSchemaDocument,
  resolveModelOutputSchema,
  type ModelOutputSchemaId,
} from "@contentmd/schemas";

const STRATEGY_ID = "contentmd.strategy-model-output/0.1.0" as const;
const DRAFT_ID = "contentmd.draft-model-output/0.1.0" as const;
const REWRITE_ID = "contentmd.rewrite-model-output/0.1.0" as const;
const UX_REPAIR_REWRITE_ID = "contentmd.ux-repair-rewrite-model-output/0.1.0" as const;
const CLASSIFICATION_ID = "contentmd.classification-model-output/0.1.0" as const;
const EVALUATION_ID = "contentmd.evaluation-model-output/0.1.0" as const;
const RANKING_ID = "contentmd.candidate-ranking-model-output/0.1.0" as const;
const UX_COORDINATE_CLASSIFICATION_ID = "contentmd.ux-coordinate-classification-model-output/0.1.0" as const;
const UX_COORDINATE_EVALUATION_ID = "contentmd.ux-coordinate-evaluation-model-output/0.1.0" as const;

const VALID_OUTPUTS: Readonly<Record<ModelOutputSchemaId, unknown>> = {
  [STRATEGY_ID]: {
    authority_effect: "none",
    value_proposition: {
      headline: "Know whether your payment completed",
      explanation: "Keep an unknown payment outcome distinct from a confirmed failure.",
      fact_refs: ["fact.payment.outcome"],
    },
    message_hierarchy: [{ priority: 1, purpose: "status", guidance: "State what is known before offering recovery." }],
    navigation_recommendations: [{ destination: "payment-status", preferred_label: "Check payment status", rationale: "The next step verifies the outcome." }],
    prohibited_claim_handling: [{ claim: "Your payment failed", disposition: "hold_for_evidence", rationale: "Failure is not established." }],
    evidence_refs: ["evidence.payment.state"],
    pattern_refs: ["pattern.unknown.outcome"],
    uncertainty: ["The provider outcome may still be pending."],
    tradeoffs: ["Status-first copy is longer but prevents an unsafe retry."],
  },
  [DRAFT_ID]: {
    authority_effect: "none",
    alternatives: [{
      purpose: "status_and_recovery",
      original_text: null,
      proposed_text: "We couldn't confirm your payment. Check its status before trying again.",
      rationale: "Separates an unknown outcome from a confirmed failure.",
      occurrence_refs: ["occurrence.checkout.status"],
      evidence_refs: ["evidence.payment.state"],
      pattern_refs: ["pattern.unknown.outcome"],
      uncertainty: "The final support route is not established.",
    }],
    message_hierarchy: ["status", "safe next step"],
    evidence_refs: ["evidence.payment.state"],
    pattern_refs: ["pattern.unknown.outcome"],
    prohibited_claims_omitted: ["Your payment failed"],
    uncertainty: ["The final support route is not established."],
    tradeoffs: ["The copy avoids a direct retry instruction."],
  },
  [REWRITE_ID]: {
    authority_effect: "none",
    approval_status: "not_requested",
    diffs: [{
      source_artifact: "src/checkout.tsx",
      line: 42,
      column: 7,
      before: "Payment failed. Try again.",
      after: "We couldn't confirm your payment. Check its status before trying again.",
      rationale: "Avoids declaring failure without evidence.",
      evidence_refs: ["evidence.payment.state"],
      pattern_refs: ["pattern.unknown.outcome"],
      acceptance_criteria: ["Outcome remains explicitly unknown."],
      mutation_status: "not_applied",
    }],
    evidence_refs: ["evidence.payment.state"],
    pattern_refs: ["pattern.unknown.outcome"],
    uncertainty: ["The final support route is not established."],
    tradeoffs: ["The replacement is longer than the current copy."],
    verification_plan: ["Verify the rendered state after an ambiguous provider response."],
    rollback_plan: "Restore the prior expression version through an authorized change transaction.",
  },
  [UX_REPAIR_REWRITE_ID]: {
    authority_effect: "none",
    approval_status: "not_requested",
    diffs: [{
      source_artifact: "src/checkout.tsx",
      line: 42,
      column: 7,
      before: "Payment failed. Try again.",
      after: "We couldn't confirm your payment. Check its status before trying again.",
      rationale: "Avoids declaring failure without evidence.",
      evidence_refs: ["evidence.payment.state"],
      pattern_refs: ["pattern.unknown.outcome"],
      acceptance_criteria: ["Outcome remains explicitly unknown."],
      semantic_invariant_refs: ["Payment was submitted", "Outcome is not confirmed"],
      mutation_status: "not_applied",
    }],
    evidence_refs: ["evidence.payment.state"],
    pattern_refs: ["pattern.unknown.outcome"],
    uncertainty: ["Semantic preservation requires independent review."],
    tradeoffs: ["The replacement is longer than the current copy."],
    verification_plan: ["Re-run deterministic UX-writing review."],
    rollback_plan: "Restore the prior expression version through an authorized change transaction.",
  },
  [CLASSIFICATION_ID]: {
    authority_effect: "none",
    intent: "draft",
    risk_level: "high",
    risk_signals: [{
      category: "financial_consequence",
      rationale: "A retry can create a duplicate payment attempt.",
      evidence_refs: ["evidence.payment.state"],
    }],
    review_requirements: ["product_owner", "content_owner"],
    uncertainty: ["The provider outcome is not established."],
  },
  [EVALUATION_ID]: {
    authority_effect: "none",
    verdict: "fail",
    findings: [{
      rule_id: "content.unsafe-retry",
      severity: "critical",
      outcome_class: "hard",
      dimension: "recovery_safety",
      rationale: "The retry instruction is unsafe while the outcome is unknown.",
      evidence_refs: ["evidence.payment.state"],
      uncertainty: "none",
      suggested_next_action: "Verify status before offering another attempt.",
      automatic_rewrite_allowed: false,
    }],
    strengths: ["The message is concise."],
    risks: ["A duplicate payment attempt could be created."],
    recommendation: "hold_for_evidence",
  },
  [RANKING_ID]: {
    authority_effect: "none",
    ordered_candidates: [{
      candidate_ref: "candidate.safe-status",
      rank: 0,
      rationale: "It preserves the unknown outcome and gives a safe next step.",
      evidence_refs: ["evidence.payment.state"],
      pattern_refs: ["pattern.unknown.outcome"],
      uncertainty: "none",
    }],
    preferred_candidate_ref: "candidate.safe-status",
    tie_break_required: false,
    uncertainty: [],
  },
  [UX_COORDINATE_CLASSIFICATION_ID]: {
    authority_effect: "none",
    decision_state: "model_proposed",
    model_processing_purpose: "classification_only",
    labels: [{
      axis: "journey",
      status: "exact",
      values: ["commitment"],
      rationale: "The source describes the point where a user commits to payment.",
      evidence_refs: ["evidence.checkout.commitment"],
      uncertainty: "none",
    }],
    uncertainties: [],
  },
  [UX_COORDINATE_EVALUATION_ID]: {
    authority_effect: "none",
    model_processing_purpose: "evaluation_only",
    verdict: "pass",
    criteria: [
      { criterion: "evidence_relation", status: "pass", rationale: "The label cites the source.", evidence_refs: ["evidence.checkout.commitment"] },
      { criterion: "requested_axis_coverage", status: "pass", rationale: "Every requested axis is present.", evidence_refs: [] },
      { criterion: "source_label_compatibility", status: "pass", rationale: "No source label conflicts with the result.", evidence_refs: ["evidence.checkout.commitment"] },
      { criterion: "ontology_conformance", status: "pass", rationale: "The value belongs to the journey vocabulary.", evidence_refs: [] },
      { criterion: "internal_consistency", status: "pass", rationale: "The label and rationale agree.", evidence_refs: ["evidence.checkout.commitment"] },
      { criterion: "uncertainty_is_honest", status: "pass", rationale: "The evidence supports an exact result.", evidence_refs: ["evidence.checkout.commitment"] },
    ],
    corrections: [],
    unresolved: [],
    authority_escalation_reasons: [],
  },
};

describe("model output schema registry", () => {
  it("registers the nine exact governed model-output schema IDs", () => {
    expect(MODEL_OUTPUT_SCHEMA_IDS).toEqual([
      STRATEGY_ID,
      DRAFT_ID,
      REWRITE_ID,
      UX_REPAIR_REWRITE_ID,
      CLASSIFICATION_ID,
      EVALUATION_ID,
      RANKING_ID,
      UX_COORDINATE_CLASSIFICATION_ID,
      UX_COORDINATE_EVALUATION_ID,
    ]);

    for (const schemaId of MODEL_OUTPUT_SCHEMA_IDS) {
      const definition = resolveModelOutputSchema(schemaId);
      expect(definition.schema_id).toBe(schemaId);
      expect(definition.schema_version).toBe("0.1.0");
      expect(definition.schema_digest).toMatch(/^[a-f0-9]{64}$/u);
      expect(definition.maximum_output_bytes).toBeGreaterThan(0);
      expect(definition.projection_compatibility).toEqual({ status: "compatible", reason_codes: [] });
    }
  });

  it("validates each closed proposal-only output without coercion", () => {
    for (const schemaId of MODEL_OUTPUT_SCHEMA_IDS) {
      const definition = resolveModelOutputSchema(schemaId);
      expect(definition.validate(VALID_OUTPUTS[schemaId])).toEqual({ valid: true, findings: [] });

      const withUnknownField = { ...(VALID_OUTPUTS[schemaId] as Record<string, unknown>), unauthorized: true };
      const invalid = definition.validate(withUnknownField);
      expect(invalid.valid).toBe(false);
      expect(invalid.findings.some((finding) => finding.keyword === "additionalProperties")).toBe(true);
    }

    const rewrite = structuredClone(VALID_OUTPUTS[REWRITE_ID]) as { diffs: Array<{ line: number | string }> };
    rewrite.diffs[0]!.line = "42";
    expect(resolveModelOutputSchema(REWRITE_ID).validate(rewrite).valid).toBe(false);
    expect(rewrite.diffs[0]!.line).toBe("42");
  });

  it("enforces required fields, enum literals, explicit nullability, and array bounds", () => {
    const strategy = structuredClone(VALID_OUTPUTS[STRATEGY_ID]) as Record<string, unknown>;
    delete strategy.authority_effect;
    expect(resolveModelOutputSchema(STRATEGY_ID).validate(strategy).valid).toBe(false);

    const classification = structuredClone(VALID_OUTPUTS[CLASSIFICATION_ID]) as { risk_level: string };
    classification.risk_level = "unbounded";
    expect(resolveModelOutputSchema(CLASSIFICATION_ID).validate(classification).valid).toBe(false);

    const draft = structuredClone(VALID_OUTPUTS[DRAFT_ID]) as { alternatives: Array<{ original_text: unknown }> };
    draft.alternatives[0]!.original_text = 7;
    expect(resolveModelOutputSchema(DRAFT_ID).validate(draft).valid).toBe(false);
    draft.alternatives = [];
    expect(resolveModelOutputSchema(DRAFT_ID).validate(draft).valid).toBe(false);

    const ranking = structuredClone(VALID_OUTPUTS[RANKING_ID]) as { preferred_candidate_ref: unknown };
    ranking.preferred_candidate_ref = null;
    expect(resolveModelOutputSchema(RANKING_ID).validate(ranking)).toEqual({ valid: true, findings: [] });
  });

  it("rejects unknown fields inside nested objects", () => {
    const evaluation = structuredClone(VALID_OUTPUTS[EVALUATION_ID]) as { findings: Array<Record<string, unknown>> };
    evaluation.findings[0]!.decision_authority = "approved";

    const result = resolveModelOutputSchema(EVALUATION_ID).validate(evaluation);

    expect(result.valid).toBe(false);
    expect(result.findings.some((finding) =>
      finding.instance_path === "/findings/0" && finding.keyword === "additionalProperties"
    )).toBe(true);
  });

  it("canonicalizes equivalent valid outputs to identical bytes", () => {
    const definition = resolveModelOutputSchema(DRAFT_ID);
    const left = VALID_OUTPUTS[DRAFT_ID];
    const right = Object.fromEntries(Object.entries(left as Record<string, unknown>).reverse());

    expect(definition.canonicalize(left)).toBe(definition.canonicalize(right));
    expect(definition.canonicalize(left).endsWith("\n")).toBe(true);
  });

  it("projects strict provider schemas without weakening closed objects or required fields", () => {
    for (const schemaId of MODEL_OUTPUT_SCHEMA_IDS) {
      const definition = resolveModelOutputSchema(schemaId);
      const projection = definition.provider_projection;
      const schema = projection.schema as {
        $id?: string;
        $schema?: string;
        type: string;
        properties: Record<string, unknown>;
        required: string[];
        additionalProperties: boolean;
      };

      expect(projection.strict).toBe(true);
      expect(projection.projection_digest).toMatch(/^[a-f0-9]{64}$/u);
      expect(schema.$id).toBeUndefined();
      expect(schema.$schema).toBeUndefined();
      expect(schema.type).toBe("object");
      expect(schema.additionalProperties).toBe(false);
      expect(schema.required).toEqual(Object.keys(schema.properties));
    }
  });

  it("fails closed when a provider projection would weaken the canonical schema", () => {
    expect(() => projectModelOutputSchemaDocument({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: { value: { type: "string", pattern: "^safe$" } },
      required: ["value"],
      additionalProperties: false,
    })).toThrowError(expect.objectContaining<ModelOutputSchemaError>({
      code: "model_schema_not_projectable",
    }));
  });
});
