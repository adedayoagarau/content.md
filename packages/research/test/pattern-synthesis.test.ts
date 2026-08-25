import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { finalizeRecord, type DurableRecord } from "@contentmd/core";
import {
  assessThirdPartyExpressionSimilarity,
  createObservedExpressionEvidenceRecord,
  fingerprintDistinctiveExpression,
  synthesizeTransferablePattern,
  type ContentPatternPayload,
  type ContentPatternRecord,
  type ObservedExpressionEvidenceRecord,
  type PatternDispositionPayload,
  type PatternDispositionRecord,
} from "@contentmd/research";
import { SCHEMA_IDS } from "@contentmd/schemas";
import { researchRef, voiceToneFixture } from "./voice-tone-test-fixtures.js";

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function expressionEvidence(
  boundedSpan: string,
  parent: DurableRecord<unknown>,
): ObservedExpressionEvidenceRecord {
  const fingerprint = fingerprintDistinctiveExpression(boundedSpan);
  return createObservedExpressionEvidenceRecord({
    record_id: `observed_expression.${sha256Utf8(boundedSpan).slice(0, 24)}`,
    scope: parent.scope,
    provenance: [{
      record_id: parent.record_id,
      relationship: "observed_in",
      content_digest: parent.content_digest,
    }],
    lifecycle_state: "proposed",
    payload: {
      source_ref: {
        record_id: "research_source.synthetic.external",
        schema_id: SCHEMA_IDS.researchSource,
        schema_version: "0.1.0",
        content_digest: "1".repeat(64),
      },
      observation_ref: {
        record_id: "browser_observation.synthetic.external",
        schema_id: SCHEMA_IDS.browserObservation,
        schema_version: "0.1.0",
        content_digest: "2".repeat(64),
      },
      source_class: "other_product_public",
      bounded_span: boundedSpan,
      span_digest: sha256Utf8(boundedSpan),
      rights_review_state: "reviewed_evidence_only",
      distinctive_expression_fingerprint: fingerprint.fingerprint,
      limitations: ["Bounded synthetic third-party comparison."],
    },
  });
}

function patternFixture(options: { controlledCorpusEligible?: boolean } = {}): {
  lineage: ReturnType<typeof voiceToneFixture>;
  pattern: ContentPatternRecord;
  disposition: PatternDispositionRecord;
} {
  const lineage = voiceToneFixture({
    controlledCorpusEligible: options.controlledCorpusEligible,
  });
  const pattern = finalizeRecord<ContentPatternPayload>({
    record_id: "pattern.synthetic.recovery.summary",
    schema_id: SCHEMA_IDS.contentPattern,
    schema_version: "0.1.0",
    record_version: 1,
    scope: lineage.batch.scope,
    provenance: [{
      record_id: lineage.batch.record_id,
      relationship: "supported_by",
      content_digest: lineage.batch.content_digest,
    }],
    lifecycle_state: "proposed",
    payload: {
      evidence_strength: "project_owned_synthetic",
      problem: "A customer needs to understand and recover from several field errors.",
      contexts: [{
        journeys: ["checkout"],
        stages: ["review"],
        states: ["validation_error"],
        channels: ["web"],
        modalities: ["visual"],
        locales: ["en"],
        risk_levels: ["medium"],
      }],
      mechanism: "Summarize the recovery path before the affected fields and preserve field-level actions.",
      source_refs: [lineage.batch.record_id],
      counterexamples: ["A generic failure notice with no path to each affected field."],
      failure_modes: ["The summary and field messages disagree."],
      transfer_conditions: [{ field: "state", values: ["validation_error"] }],
      non_transferable_details: ["Do not reuse observed wording or organization-specific terminology."],
      rights_boundary: "Transfer the interaction mechanism only; never copy distinctive expression.",
    },
  });
  const disposition = finalizeRecord<PatternDispositionPayload>({
    record_id: "pattern_disposition.synthetic.recovery.summary",
    schema_id: SCHEMA_IDS.patternDisposition,
    schema_version: "0.1.0",
    record_version: 1,
    scope: lineage.batch.scope,
    provenance: [{
      record_id: lineage.batch.record_id,
      relationship: "governed_by",
      content_digest: lineage.batch.content_digest,
    }],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.pattern-disposition/0.1.0",
      pattern_ref: researchRef(pattern),
      evidence_refs: [researchRef(lineage.batch)],
      disposition: "candidate_abstraction",
      prompt_eligibility: "review_required",
      training_eligibility: "project_owned_application_only",
      benchmark_eligibility: false,
      rights_review_state: "reviewed",
      similarity_review_state: "passed",
      reviewer_refs: [researchRef(lineage.acquisition)],
      limitations: ["Candidate abstraction only; no approval or publication authority."],
      authority_effect: "none",
    },
  });
  return { lineage, pattern, disposition };
}

describe("distinctive expression similarity", () => {
  it("blocks normalized exact and bounded fuzzy overlap without returning source wording", () => {
    const lineage = voiceToneFixture();
    const evidence = expressionEvidence(
      "Review the highlighted fields and try again",
      lineage.batch,
    );

    const exact = assessThirdPartyExpressionSimilarity({
      candidate_expression: "  Review the highlighted fields and try again. ",
      evidence: [evidence],
    });
    const fuzzy = assessThirdPartyExpressionSimilarity({
      candidate_expression: "Review the highlighted fields, then try again",
      evidence: [evidence],
    });
    const distinct = assessThirdPartyExpressionSimilarity({
      candidate_expression: "Correct each field before continuing.",
      evidence: [evidence],
    });

    expect(exact).toMatchObject({ blocked: true, exact_match: true, maximum_score: 1 });
    expect(fuzzy.blocked).toBe(true);
    expect(fuzzy.maximum_score).toBeGreaterThanOrEqual(fuzzy.threshold);
    expect(distinct.blocked).toBe(false);
    expect(JSON.stringify(exact)).not.toContain("Review the highlighted fields");
  });
});

describe("transferable pattern synthesis", () => {
  it("emits only a reviewed mechanism and imitation boundary with no authority", () => {
    const fixture = patternFixture();

    const projection = synthesizeTransferablePattern({
      pattern: fixture.pattern,
      disposition: fixture.disposition,
      expression_evidence: [],
      lineage_records: [fixture.lineage.acquisition, fixture.lineage.batch],
    });

    expect(projection).toMatchObject({
      contract_version: "contentmd.transferable-pattern-projection/0.1.0",
      transferable_mechanism: fixture.pattern.payload.mechanism,
      prohibited_imitation_boundary: fixture.pattern.payload.rights_boundary,
      decision_state: "candidate_abstraction",
      authority_effect: "none",
    });
    expect(Object.keys(projection).sort()).toEqual([
      "authority_effect",
      "contract_version",
      "decision_state",
      "evidence_refs",
      "maximum_similarity",
      "pattern_ref",
      "prohibited_imitation_boundary",
      "projection_digest",
      "similarity_threshold",
      "transferable_mechanism",
    ]);
  });

  it("fails closed on similarity, missing rights review, or quarantined ancestry", () => {
    const fixture = patternFixture();
    const evidence = expressionEvidence(fixture.pattern.payload.mechanism, fixture.lineage.batch);
    expect(() => synthesizeTransferablePattern({
      pattern: fixture.pattern,
      disposition: fixture.disposition,
      expression_evidence: [evidence],
      lineage_records: [fixture.lineage.acquisition, fixture.lineage.batch],
    })).toThrow("third_party_expression_similarity_blocked");

    const { content_digest: _oldDispositionDigest, ...dispositionPreimage } = fixture.disposition;
    const unreviewed = finalizeRecord<PatternDispositionPayload>({
      ...dispositionPreimage,
      payload: {
        ...fixture.disposition.payload,
        rights_review_state: "not_established",
        similarity_review_state: "not_run",
      },
    });
    expect(() => synthesizeTransferablePattern({
      pattern: fixture.pattern,
      disposition: unreviewed,
      expression_evidence: [],
      lineage_records: [fixture.lineage.acquisition, fixture.lineage.batch],
    })).toThrow("pattern_transfer_blocked:rights_review");

    const quarantined = patternFixture({ controlledCorpusEligible: false });
    expect(() => synthesizeTransferablePattern({
      pattern: quarantined.pattern,
      disposition: quarantined.disposition,
      expression_evidence: [],
      lineage_records: [quarantined.lineage.acquisition, quarantined.lineage.batch],
    })).toThrow("nonconforming_evidence_lineage_blocked");
  });
});
