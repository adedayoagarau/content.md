import { createHash } from "node:crypto";
import { finalizeRecord, type DurableRecord } from "@contentmd/core";
import {
  type BrowserObservationPayload,
  type BrowserObservationRecord,
  type ResearchAcquisitionManifest,
  type ResearchBatchManifest,
  type ResearchBatchManifestPayload,
  type ResearchRecordRef,
  type ResearchSourcePayload,
  type ResearchSourceRecord,
} from "@contentmd/research";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import {
  verifyRecordedCaptureAcquisition,
  type RecordedCaptureAcquisitionDecision,
  type RecordedCaptureDenialReason,
} from "./acquisition-manifest.js";
import {
  validateRecordedComputerUseCapture,
  type RecordedComputerUseCapture,
} from "./computer-use-capture.js";

export interface NormalizedResearchBatch {
  acquisition_decision: RecordedCaptureAcquisitionDecision;
  source: ResearchSourceRecord;
  observations: BrowserObservationRecord[];
  batch_manifest: ResearchBatchManifest;
}

export interface BrowserEvidenceAdapter {
  normalize(
    manifest: ResearchAcquisitionManifest,
    capture: RecordedComputerUseCapture,
  ): NormalizedResearchBatch;
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function recordSegment(value: string): string {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");
  if (!/^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/.test(normalized)) {
    throw new TypeError("recorded_capture_invalid:capture_id_invalid");
  }
  return normalized;
}

function recordRef(record: DurableRecord<unknown>): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function validateOrThrow(schemaId: string, record: unknown): void {
  const validation = validateRecord(schemaId as Parameters<typeof validateRecord>[0], record);
  if (!validation.valid) {
    throw new TypeError(`normalized_research_record_invalid:${validation.errors.join("|")}`);
  }
}

function governanceLimitation(decision: RecordedCaptureAcquisitionDecision): string {
  return decision.allowed
    ? "Normalization does not grant controlled-corpus, prompt, training, benchmark, or publication authority."
    : `Nonconforming acquisition: ${decision.reason}.`;
}

function protocolConformance(
  decision: RecordedCaptureAcquisitionDecision,
): ResearchBatchManifestPayload["protocol_conformance"] {
  if (decision.allowed) return "conforming";
  return decision.reason === "profile_isolation_not_established"
    || decision.reason === "capture_profile_mismatch"
    ? "nonconforming_profile"
    : "nonconforming_authorization";
}

const NONCONFORMING_REASONS = new Set<RecordedCaptureDenialReason>([
  "profile_isolation_not_established",
  "runtime_verification_missing",
  "external_research_grant_missing",
  "capture_profile_mismatch",
]);

export class BrowserEvidenceNormalizer implements BrowserEvidenceAdapter {
  normalize(
    manifest: ResearchAcquisitionManifest,
    capture: RecordedComputerUseCapture,
  ): NormalizedResearchBatch {
    const validation = validateRecordedComputerUseCapture(capture);
    if (!validation.valid) {
      throw new TypeError(`recorded_capture_invalid:${validation.errors[0] ?? "unknown"}`);
    }
    const decision = verifyRecordedCaptureAcquisition(manifest, capture);
    if (!decision.allowed && !NONCONFORMING_REASONS.has(decision.reason)) {
      throw new TypeError(`recorded_capture_invalid:${decision.reason}`);
    }

    const segment = recordSegment(capture.capture_id);
    const provenance = [{
      record_id: manifest.record_id,
      relationship: "governed_by",
      content_digest: manifest.content_digest,
    }];
    const source = finalizeRecord<ResearchSourcePayload>({
      record_id: `research_source.${segment}`,
      schema_id: SCHEMA_IDS.researchSource,
      schema_version: "0.1.0",
      record_version: 1,
      scope: structuredClone(manifest.scope),
      provenance,
      lifecycle_state: "proposed",
      payload: {
        contract_version: "contentmd.research-source/0.1.0",
        requested_url: capture.requested_url,
        canonical_url: capture.canonical_url,
        effective_url: capture.effective_url,
        publisher: capture.publisher,
        title: capture.title,
        accessed_at: capture.captured_at,
        access_method: capture.access_method,
        body_retention_state: "body_not_retained",
        retained_content_digest: null,
        access_disposition: capture.access_disposition,
        rights_disposition: capture.rights_disposition,
        profile_isolation_state: capture.profile_isolation_state,
        privacy_class: "public_no_personal_data",
        redirects: [...capture.redirects],
        limitations: [...capture.limitations, governanceLimitation(decision)],
        authority_effect: "none",
      },
    });
    validateOrThrow(SCHEMA_IDS.researchSource, source);

    const sourceRef = recordRef(source);
    const observations = capture.observations.map((observation, index) => {
      const record = finalizeRecord<BrowserObservationPayload>({
        record_id: `browser_observation.${segment}.${String(index + 1).padStart(3, "0")}`,
        schema_id: SCHEMA_IDS.browserObservation,
        schema_version: "0.1.0",
        record_version: 1,
        scope: structuredClone(manifest.scope),
        provenance,
        lifecycle_state: "proposed",
        payload: {
          contract_version: "contentmd.browser-observation/0.1.0",
          source_ref: sourceRef,
          surface: observation.surface,
          journey: observation.journey,
          state: observation.state,
          channel: observation.channel,
          locale: observation.locale,
          locator: observation.locator,
          capture_ref: null,
          bounded_span: observation.bounded_span,
          bounded_span_digest: observation.bounded_span === null
            ? null
            : sha256Utf8(observation.bounded_span),
          availability: observation.availability,
          direct_exercise_state: observation.direct_exercise_state,
          observation_strength: observation.observation_strength,
          evidence_dimensions: structuredClone(observation.evidence_dimensions),
          taint_flags: [...observation.taint_flags],
          limitations: [...observation.limitations],
          authority_effect: "none",
        },
      });
      validateOrThrow(SCHEMA_IDS.browserObservation, record);
      return record;
    });

    const batchManifest = finalizeRecord<ResearchBatchManifestPayload>({
      record_id: `research_batch.${segment}`,
      schema_id: SCHEMA_IDS.researchBatchManifest,
      schema_version: "0.1.0",
      record_version: 1,
      scope: structuredClone(manifest.scope),
      provenance,
      lifecycle_state: "proposed",
      payload: {
        contract_version: "contentmd.research-batch-manifest/0.1.0",
        acquisition_manifest_ref: recordRef(manifest),
        source_refs: [sourceRef],
        observation_refs: observations.map(recordRef),
        claim_refs: [],
        expression_evidence_refs: [],
        pattern_disposition_refs: [],
        counts: {
          sources: 1,
          observations: observations.length,
          claims: 0,
          expressions: 0,
          patterns: 0,
        },
        protocol_conformance: protocolConformance(decision),
        controlled_corpus_eligibility: false,
        limitations: [
          governanceLimitation(decision),
          "Recorded capture normalization is evidence-only and cannot approve a pattern or voice.",
        ],
        authority_effect: "none",
      },
    });
    validateOrThrow(SCHEMA_IDS.researchBatchManifest, batchManifest);

    return {
      acquisition_decision: decision,
      source,
      observations,
      batch_manifest: batchManifest,
    };
  }
}
