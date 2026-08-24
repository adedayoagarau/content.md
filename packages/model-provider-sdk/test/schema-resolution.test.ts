import { describe, expect, it } from "vitest";
import {
  ModelProviderContractError,
  canonicalizeModelOutput,
  resolveRequestOutputSchema,
} from "@contentmd/model-provider-sdk";

const validDraftOutput = {
  authority_effect: "none",
  alternatives: [{
    purpose: "status",
    original_text: null,
    proposed_text: "Check your payment status before trying again.",
    rationale: "The outcome is not established.",
    occurrence_refs: [],
    evidence_refs: ["evidence.payment.state"],
    pattern_refs: ["pattern.unknown.outcome"],
    uncertainty: "The support route is not established.",
  }],
  message_hierarchy: ["status", "safe recovery"],
  evidence_refs: ["evidence.payment.state"],
  pattern_refs: ["pattern.unknown.outcome"],
  prohibited_claims_omitted: ["Payment failed"],
  uncertainty: ["The support route is not established."],
  tradeoffs: [],
};

describe("model output schema resolution", () => {
  it("resolves exact canonical and provider-projection identities", () => {
    const resolved = resolveRequestOutputSchema("contentmd.draft-model-output/0.1.0");

    expect(resolved.schema_id).toBe("contentmd.draft-model-output/0.1.0");
    expect(resolved.schema_version).toBe("0.1.0");
    expect(resolved.schema_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(resolved.provider_projection.strict).toBe(true);
    expect(resolved.provider_projection.source_schema_digest).toBe(resolved.schema_digest);
  });

  it("locally validates and canonicalizes completed output", () => {
    const result = canonicalizeModelOutput(
      "contentmd.draft-model-output/0.1.0",
      validDraftOutput,
    );

    expect(result.canonical_output).toBe(result.canonical_output_bytes);
    expect(result.canonical_output_bytes.endsWith("\n")).toBe(true);
    expect(result.canonical_output_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.output_schema_digest).toBe(
      resolveRequestOutputSchema("contentmd.draft-model-output/0.1.0").schema_digest,
    );
  });

  it("rejects malformed or authority-widening output before execution can consume it", () => {
    const invalid = structuredClone(validDraftOutput) as Record<string, unknown>;
    invalid.authority_effect = "publish";

    expect(() => canonicalizeModelOutput(
      "contentmd.draft-model-output/0.1.0",
      invalid,
    )).toThrowError(expect.objectContaining<ModelProviderContractError>({
      code: "model_output_invalid",
    }));
  });
});
