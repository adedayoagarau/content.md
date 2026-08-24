import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { finalizeRecord, type DurableRecord } from "@contentmd/core";
import {
  createObservedExpressionEvidenceRecord,
  fingerprintDistinctiveExpression,
  type ContentPatternPayload,
  type ObservedExpressionEvidenceRecord,
  type PatternDispositionPayload,
} from "@contentmd/research";
import {
  compileVersionedPrompt,
  createPatternPromptContext,
} from "@contentmd/writer";
import {
  researchRef,
  voiceToneFixture,
} from "../../research/test/voice-tone-test-fixtures.js";

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
        schema_id: "contentmd.research-source-record",
        schema_version: "0.1.0",
        content_digest: "1".repeat(64),
      },
      observation_ref: {
        record_id: "browser_observation.synthetic.external",
        schema_id: "contentmd.browser-observation-record",
        schema_version: "0.1.0",
        content_digest: "2".repeat(64),
      },
      source_class: "other_product_public",
      bounded_span: boundedSpan,
      span_digest: sha256Utf8(boundedSpan),
      rights_review_state: "reviewed_evidence_only",
      distinctive_expression_fingerprint: fingerprint.fingerprint,
      limitations: ["Synthetic third-party comparison for the egress boundary."],
    },
  });
}

function fixture() {
  const lineage = voiceToneFixture();
  const pattern = finalizeRecord<ContentPatternPayload>({
    record_id: "pattern.synthetic.recovery.summary",
    schema_id: "contentmd.content-pattern-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: lineage.batch.scope,
    provenance: [{
      record_id: lineage.batch.record_id,
      relationship: "supported_by",
      content_digest: lineage.batch.content_digest,
    }],
    lifecycle_state: "active",
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
    schema_id: "contentmd.pattern-disposition-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: lineage.batch.scope,
    provenance: [{
      record_id: lineage.batch.record_id,
      relationship: "governed_by",
      content_digest: lineage.batch.content_digest,
    }],
    lifecycle_state: "active",
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
      limitations: ["Candidate abstraction only; product approval remains external."],
      authority_effect: "none",
    },
  });
  const approval = finalizeRecord({
    record_id: "approval.pattern.synthetic.recovery.summary",
    schema_id: "contentmd.approval-record",
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: lineage.batch.scope,
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      approval_class: "semantic_decision" as const,
      subject_ref: pattern.record_id,
      subject_digest: pattern.content_digest,
      scope: [
        "channel:web",
        "journey:checkout",
        "locale:en",
        "modality:visual",
        "project:project.synthetic.voice",
        "risk:medium",
        "stage:review",
        "state:validation_error",
      ],
      status: "issued" as const,
      issued_at: "2026-08-20T12:00:00Z",
      expires_at: null,
      revocation_state: "current" as const,
    },
  });
  const observed = expressionEvidence(
    "Review the highlighted fields and try again",
    lineage.batch,
  );
  const qualificationInput = {
    task_scope: {
      project_id: "project.synthetic.voice",
      journey: "checkout",
      stage: "review",
      state: "validation_error",
      channel: "web",
      modality: "visual",
      locale: "en",
      risk: "medium",
      evaluation_at: "2026-08-22T12:00:00Z",
    },
    pattern,
    disposition,
    approval_record: approval,
    expression_evidence: [observed],
    lineage_records: [lineage.acquisition, lineage.batch],
  };
  return { qualificationInput, observed };
}

const contextPacketRef = {
  record_id: "context.pattern.fixture",
  schema_id: "contentmd.fixture-record",
  schema_version: "0.1.0" as const,
  content_digest: "a".repeat(64),
};

describe("approved pattern prompt context", () => {
  it("replays product approval and emits only the reviewed mechanism", () => {
    const { qualificationInput, observed } = fixture();
    const context = createPatternPromptContext(qualificationInput);
    const prompt = compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.pattern-fixture",
        template_version: "0.1.0",
        instructions: "Use approved mechanisms only. Produce a proposal, never a decision.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [context],
      payload: { task: "synthetic recovery" },
    });

    expect(context.data_class).toBe("approved_pattern");
    expect(JSON.stringify(context.verification)).toContain(observed.payload.bounded_span);
    expect(context.content.verification_digest).toBe(context.verification.verification_digest);
    expect(prompt.input).toContain(qualificationInput.pattern.payload.mechanism);
    expect(prompt.input).toContain(qualificationInput.approval_record.record_id);
    expect(prompt.input).toContain(context.verification.verification_digest);
    expect(prompt.input).not.toContain(observed.payload.bounded_span);
    expect(prompt.input).not.toContain("bounded_span");
    expect(prompt.authority_effect).toBe("none");
  });

  it("rejects content tampering, expired approval, and task-scope drift", () => {
    const { qualificationInput } = fixture();
    const context = createPatternPromptContext(qualificationInput);
    const tampered = structuredClone(context);
    tampered.content.transferable_mechanism = "Unreviewed replacement mechanism.";
    expect(() => compileVersionedPrompt({
      template: {
        template_id: "contentmd.prompt.pattern-fixture",
        template_version: "0.1.0",
        instructions: "Produce a proposal.",
      },
      output_schema_id: "contentmd.strategy-model-output/0.1.0",
      context_packet_ref: contextPacketRef,
      retrieval_snapshot_ref: null,
      context_items: [tampered],
      payload: { task: "synthetic recovery" },
    })).toThrow("prompt_context_forbidden:approved_pattern_replay_mismatch");

    expect(() => createPatternPromptContext({
      ...qualificationInput,
      task_scope: { ...qualificationInput.task_scope, evaluation_at: "2026-08-19T12:00:00Z" },
    })).toThrow("pattern_prompt_context_invalid:approval_not_current");
    expect(() => createPatternPromptContext({
      ...qualificationInput,
      task_scope: { ...qualificationInput.task_scope, locale: "fr" },
    })).toThrow("pattern_prompt_context_invalid:pattern_scope");
  });
});
