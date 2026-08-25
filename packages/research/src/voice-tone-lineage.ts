import { verifyRecordDigest, type DurableRecord } from "@contentmd/core";
import {
  SCHEMA_IDS,
  isSchemaId,
  validateRecord,
} from "@contentmd/schemas";
import {
  evaluateResearchAcquisition,
  type ResearchAcquisitionManifest,
  type ResearchBatchManifest,
} from "./research-batch.js";
import type { ResearchSourceRecord } from "./source-record.js";

type UnknownRecord = DurableRecord<unknown>;

function fail(recordId: string): never {
  throw new TypeError(`voice_lineage_quarantined:${recordId}`);
}

function payloadOf(record: UnknownRecord): Record<string, unknown> {
  if (typeof record.payload !== "object" || record.payload === null || Array.isArray(record.payload)) {
    fail(record.record_id);
  }
  return record.payload as Record<string, unknown>;
}

export function verifyVoiceLineage(records: readonly UnknownRecord[]): Map<string, UnknownRecord> {
  const byId = new Map<string, UnknownRecord>();
  for (const record of records) {
    if (byId.has(record.record_id)) {
      throw new TypeError(`duplicate_voice_lineage_record:${record.record_id}`);
    }
    if (!verifyRecordDigest(record).valid || !isSchemaId(record.schema_id)) fail(record.record_id);
    if (!validateRecord(record.schema_id, record).valid) fail(record.record_id);
    if (["superseded", "retired", "rejected"].includes(record.lifecycle_state)) fail(record.record_id);
    const payload = payloadOf(record);
    if ("authority_effect" in payload && payload.authority_effect !== "none") fail(record.record_id);
    byId.set(record.record_id, record);
  }

  for (const record of records) {
    for (const provenance of record.provenance) {
      const parent = byId.get(provenance.record_id);
      if (parent === undefined || parent.content_digest !== provenance.content_digest) {
        fail(record.record_id);
      }
    }

    if (record.schema_id === SCHEMA_IDS.researchBatchManifest) {
      const batch = record as ResearchBatchManifest;
      if (batch.payload.protocol_conformance !== "conforming"
        || batch.payload.controlled_corpus_eligibility !== true) {
        fail(batch.record_id);
      }
      const acquisition = byId.get(batch.payload.acquisition_manifest_ref.record_id);
      if (acquisition === undefined
        || acquisition.schema_id !== SCHEMA_IDS.researchAcquisitionManifest
        || acquisition.content_digest !== batch.payload.acquisition_manifest_ref.content_digest) {
        fail(batch.record_id);
      }
    }

    if (record.schema_id === SCHEMA_IDS.researchAcquisitionManifest) {
      const decision = evaluateResearchAcquisition(record as ResearchAcquisitionManifest);
      if (!decision.allowed) fail(record.record_id);
    }

    if (record.schema_id === SCHEMA_IDS.researchSource) {
      const source = record as ResearchSourceRecord;
      if (source.payload.profile_isolation_state !== "established_signed_out_ephemeral") {
        fail(source.record_id);
      }
    }
  }

  return byId;
}
