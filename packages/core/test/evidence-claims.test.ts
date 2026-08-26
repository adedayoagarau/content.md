import { describe, expect, it } from "vitest";
import {
  resolveAuthority,
  sha256Canonical,
  type ClaimKind,
  type EvidenceClaim,
  type EvidenceClass,
  type JsonValue,
  type SourceLifecycle,
} from "@contentmd/core";

function claim(input: {
  id: string;
  kind: ClaimKind;
  lifecycle?: SourceLifecycle;
  value?: JsonValue;
  date?: string | null;
  evidence_class?: EvidenceClass;
  source_ref?: string;
}): EvidenceClaim {
  const preimage = {
    claim_id: input.id,
    claim_kind: input.kind,
    subject: "synthetic-subject",
    value: input.value ?? "synthetic-value",
    evidence_class: input.evidence_class ?? "documented",
    source_ref: input.source_ref ?? `source.${input.id}`,
    source_span: { start_line: 1, end_line: 1 },
    lifecycle: input.lifecycle ?? "unknown",
    effective_date: input.date ?? null,
    scope: ["synthetic-fixture"],
    confidence: "high" as const,
    limitations: [],
    authority_effect: "none" as const,
  };
  return { ...preimage, claim_digest: sha256Canonical(preimage) };
}

describe("contextual repository evidence authority", () => {
  it("selects explicit canonical product identity and retains the conflicting draft", () => {
    const assessments = resolveAuthority([
      claim({ id: "current", kind: "product_identity", lifecycle: "canonical", value: "Evidence-first studio", date: "2026-08-25" }),
      claim({ id: "draft", kind: "product_identity", lifecycle: "draft", value: "Generic chatbot", date: "2026-01-10" }),
    ]);

    expect(assessments).toContainEqual(expect.objectContaining({
      claim_kind: "product_identity",
      selected_claim_ref: "current",
      conflicting_claim_refs: ["draft"],
      resolution: "explicit_lifecycle_and_scope",
      authority_effect: "none",
    }));
  });

  it("never treats implementation evidence as organizational approval", () => {
    const assessments = resolveAuthority([
      claim({ id: "implemented", kind: "organizational_approval", evidence_class: "implemented" }),
    ]);

    expect(assessments[0]).toMatchObject({
      resolution: "unresolved",
      selected_claim_ref: null,
      conflicting_claim_refs: ["implemented"],
    });
  });

  it("requires an approved claim from a configured authority source", () => {
    const approved = claim({
      id: "approval",
      kind: "organizational_approval",
      evidence_class: "approved",
      source_ref: "source.content-council",
    });

    expect(resolveAuthority([approved])[0]?.selected_claim_ref).toBeNull();
    expect(resolveAuthority([approved], { authority_source_refs: ["source.content-council"] })[0])
      .toMatchObject({ selected_claim_ref: "approval", resolution: "configured_authority_source" });
  });

  it("leaves equally applicable conflicting claims unresolved", () => {
    const assessments = resolveAuthority([
      claim({ id: "a", kind: "architecture_decision", lifecycle: "active", value: "A", date: "2026-08-25" }),
      claim({ id: "b", kind: "architecture_decision", lifecycle: "active", value: "B", date: "2026-08-25" }),
    ]);

    expect(assessments[0]).toMatchObject({
      selected_claim_ref: null,
      conflicting_claim_refs: ["a", "b"],
      resolution: "unresolved",
    });
  });

  it("only selects observed evidence for live behavior", () => {
    const assessments = resolveAuthority([
      claim({ id: "code", kind: "live_behavior", lifecycle: "active", evidence_class: "implemented" }),
      claim({ id: "observation", kind: "live_behavior", lifecycle: "active", evidence_class: "observed" }),
    ]);

    expect(assessments[0]).toMatchObject({ selected_claim_ref: "observation" });
  });

  it("records superseded evidence without mutating or selecting it", () => {
    const assessments = resolveAuthority([
      claim({ id: "active", kind: "voice_guidance", lifecycle: "active", value: "Direct" }),
      claim({ id: "old", kind: "voice_guidance", lifecycle: "superseded", value: "Playful" }),
    ]);

    expect(assessments[0]).toMatchObject({
      selected_claim_ref: "active",
      conflicting_claim_refs: ["old"],
      superseded_claim_refs: ["old"],
    });
  });

  it("rejects a claim changed after its immutable digest was issued", () => {
    const changed = claim({ id: "changed", kind: "product_identity", lifecycle: "canonical" });
    changed.value = "silently changed";

    expect(() => resolveAuthority([changed])).toThrowError(
      "evidence_claim_digest_mismatch:changed",
    );
  });
});
