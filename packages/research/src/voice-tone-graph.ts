import {
  compileRecordGraph,
  finalizeRecord,
  sha256Canonical,
  type DurableRecord,
  type RecordGraphEdge,
  type RecordScope,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ResearchRecordRef } from "./source-record.js";
import { verifyVoiceLineage } from "./voice-tone-lineage.js";
import type {
  OrganizationVoiceProfileCandidate,
  VoiceToneGraphEdge,
  VoiceToneGraphSnapshot,
  VoiceToneGraphSnapshotPayload,
} from "./voice-tone-records.js";

export interface CompileVoiceToneGraphInput {
  root_profile: OrganizationVoiceProfileCandidate;
  nodes: DurableRecord<unknown>[];
  edges: VoiceToneGraphEdge[];
}

const RELATIONSHIPS = new Set([
  "supported_by",
  "constrained_by",
  "qualified_by",
  "challenges",
]);

function copyScope(scope: RecordScope): RecordScope {
  return {
    memory_scope: scope.memory_scope,
    project_id: scope.project_id,
    resource_refs: [...scope.resource_refs],
    data_classes: [...scope.data_classes],
  };
}

function refFor(record: DurableRecord<unknown>): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

export function compileVoiceToneGraph(input: CompileVoiceToneGraphInput): VoiceToneGraphSnapshot {
  if (!validateRecord(SCHEMA_IDS.organizationVoiceProfileCandidate, input.root_profile).valid) {
    throw new TypeError("voice_graph_invalid:root_profile");
  }
  for (const edge of input.edges as RecordGraphEdge<string>[]) {
    if (["approves", "returns", "rejects"].includes(edge.relationship)) {
      throw new TypeError("voice_graph_authority_collapse");
    }
    if (!RELATIONSHIPS.has(edge.relationship)) {
      throw new TypeError(`voice_graph_invalid:relationship:${edge.relationship}`);
    }
  }

  const lineageById = verifyVoiceLineage(input.nodes);
  const root = lineageById.get(input.root_profile.record_id);
  if (root === undefined
    || root.schema_id !== SCHEMA_IDS.organizationVoiceProfileCandidate
    || root.content_digest !== input.root_profile.content_digest) {
    throw new TypeError("voice_graph_invalid:root_profile_binding");
  }

  const compiled = compileRecordGraph({
    nodes: input.nodes,
    edges: input.edges,
    acyclic_relationships: "all",
  });
  const projection = {
    contract_version: "contentmd.voice-tone-graph-projection/0.1.0" as const,
    root_profile_ref: refFor(input.root_profile),
    node_refs: compiled.node_refs,
    edges: compiled.edges,
  };
  const projectionDigest = sha256Canonical(projection);
  const record = finalizeRecord<VoiceToneGraphSnapshotPayload>({
    record_id: `voice_tone_graph.${projectionDigest.slice(0, 32)}`,
    schema_id: SCHEMA_IDS.voiceToneGraphSnapshot,
    schema_version: "0.1.0",
    record_version: 1,
    scope: copyScope(input.root_profile.scope),
    provenance: [{
      record_id: input.root_profile.record_id,
      relationship: "projected_from",
      content_digest: input.root_profile.content_digest,
    }],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.voice-tone-graph-snapshot/0.1.0",
      root_profile_ref: refFor(input.root_profile),
      node_refs: compiled.node_refs,
      edges: compiled.edges as VoiceToneGraphEdge[],
      projection_digest: projectionDigest,
      decision_state: "proposed",
      authority_effect: "none",
    },
  });
  if (!validateRecord(SCHEMA_IDS.voiceToneGraphSnapshot, record).valid) {
    throw new TypeError("voice_graph_invalid:output_schema");
  }
  return record;
}
