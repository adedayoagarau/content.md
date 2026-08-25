import {
  canonicalJson,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
} from "@contentmd/core";
import {
  compileVoiceToneGraph,
  compileVoiceToneMap,
  type OrganizationVoiceProfileCandidate,
  type ResearchRecordRef,
  type TonePolicyRecord,
  type VoiceToneFeatureDefinition,
  type VoiceToneFeatureValue,
  type VoiceToneGraphEdge,
  type VoiceToneGraphSnapshot,
  type VoiceToneMapSnapshot,
} from "@contentmd/research";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";

export interface VoiceApprovalPayload {
  approval_class: "semantic_decision";
  subject_ref: string;
  subject_digest: string;
  scope: string[];
  status: "issued" | "revoked" | "expired" | "superseded";
  issued_at: string;
  expires_at: string | null;
  revocation_state: "current" | "revoked" | "unknown";
}

export type VoiceApprovalRecord = DurableRecord<VoiceApprovalPayload>;

export interface VoiceToneProfileReplay {
  profile_candidate: OrganizationVoiceProfileCandidate;
  feature_definitions: VoiceToneFeatureDefinition[];
  tone_policies: TonePolicyRecord[];
  lineage_records: DurableRecord<unknown>[];
  graph_nodes: DurableRecord<unknown>[];
  graph_edges: VoiceToneGraphEdge[];
}

export interface QualifyVoiceToneProfileInput {
  task_scope: {
    project_id: string;
    locale: string;
    channel: string;
    context: string;
    evaluation_at: string;
  };
  owner_ref: string;
  map_snapshot: VoiceToneMapSnapshot;
  graph_snapshot: VoiceToneGraphSnapshot;
  approval_record: VoiceApprovalRecord;
  replay: VoiceToneProfileReplay;
}

export interface EligibleVoiceToneProfile {
  contract_version: "contentmd.eligible-voice-tone-profile/0.1.0";
  project_id: string;
  owner_ref: string;
  locale: string;
  channel: string;
  context: string;
  evaluation_at: string;
  effective_from: string;
  effective_through: string | null;
  map_snapshot_ref: ResearchRecordRef;
  graph_snapshot_ref: ResearchRecordRef;
  approval_ref: ResearchRecordRef;
  feature_values: VoiceToneFeatureValue[];
  authority_effect: "none";
  profile_digest: string;
}

function invalid(reason: string): never {
  throw new TypeError(`voice_profile_not_eligible:${reason}`);
}

function text(value: string, field: string): void {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
}

function refFor(record: DurableRecord<unknown>): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function copyFeature(value: VoiceToneFeatureValue): VoiceToneFeatureValue {
  return {
    feature_name: value.feature_name,
    definition_ref: { ...value.definition_ref },
    lower_bound: value.lower_bound,
    upper_bound: value.upper_bound,
    uncertainty: value.uncertainty,
    applicability: value.applicability,
  };
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

export function verifyEligibleVoiceToneProfile(profile: EligibleVoiceToneProfile): boolean {
  if (profile.contract_version !== "contentmd.eligible-voice-tone-profile/0.1.0"
    || profile.authority_effect !== "none"
    || profile.feature_values.length !== 9) return false;
  const { profile_digest: received, ...preimage } = profile;
  return /^[a-f0-9]{64}$/u.test(received) && received === sha256Canonical(preimage);
}

function assertApproval(input: QualifyVoiceToneProfileInput): void {
  const approval = input.approval_record;
  if (!verifyRecordDigest(approval).valid
    || !validateRecord(SCHEMA_IDS.approval, approval).valid) invalid("approval_integrity");
  const evaluatedAt = Date.parse(input.task_scope.evaluation_at);
  const issuedAt = Date.parse(approval.payload.issued_at);
  const expiresAt = approval.payload.expires_at === null
    ? null
    : Date.parse(approval.payload.expires_at);
  if (!Number.isFinite(evaluatedAt) || !Number.isFinite(issuedAt)
    || (expiresAt !== null && !Number.isFinite(expiresAt))) invalid("time");
  if (approval.lifecycle_state !== "active"
    || approval.payload.approval_class !== "semantic_decision"
    || approval.payload.status !== "issued"
    || approval.payload.revocation_state !== "current"
    || approval.payload.subject_ref !== input.map_snapshot.record_id
    || approval.payload.subject_digest !== input.map_snapshot.content_digest
    || issuedAt > evaluatedAt
    || (expiresAt !== null && evaluatedAt >= expiresAt)) {
    invalid("approval_not_current");
  }
  const requiredScope = [
    `project:${input.task_scope.project_id}`,
    `owner:${input.owner_ref}`,
    `locale:${input.task_scope.locale}`,
    `channel:${input.task_scope.channel}`,
    `context:${input.task_scope.context}`,
  ];
  if (requiredScope.some((value) => !approval.payload.scope.includes(value))) {
    invalid("approval_scope");
  }
}

export function qualifyVoiceToneProfile(
  input: QualifyVoiceToneProfileInput,
): EligibleVoiceToneProfile {
  for (const [field, value] of Object.entries({
    ...input.task_scope,
    owner_ref: input.owner_ref,
  })) text(value, field);
  if (!verifyRecordDigest(input.map_snapshot).valid
    || !validateRecord(SCHEMA_IDS.voiceToneMapSnapshot, input.map_snapshot).valid
    || !verifyRecordDigest(input.graph_snapshot).valid
    || !validateRecord(SCHEMA_IDS.voiceToneGraphSnapshot, input.graph_snapshot).valid) {
    invalid("snapshot_integrity");
  }

  let replayedMap: VoiceToneMapSnapshot;
  let replayedGraph: VoiceToneGraphSnapshot;
  try {
    replayedMap = compileVoiceToneMap({
      profile_candidate: input.replay.profile_candidate,
      feature_definitions: input.replay.feature_definitions,
      tone_policies: input.replay.tone_policies,
      lineage_records: input.replay.lineage_records,
    });
    replayedGraph = compileVoiceToneGraph({
      root_profile: input.replay.profile_candidate,
      nodes: input.replay.graph_nodes,
      edges: input.replay.graph_edges,
    });
  } catch {
    invalid("lineage");
  }
  if (canonicalJson(replayedMap) !== canonicalJson(input.map_snapshot)
    || canonicalJson(replayedGraph) !== canonicalJson(input.graph_snapshot)) {
    invalid("snapshot_replay");
  }
  if (input.map_snapshot.scope.project_id !== input.task_scope.project_id
    || input.graph_snapshot.scope.project_id !== input.task_scope.project_id
    || canonicalJson(input.map_snapshot.payload.profile_candidate_ref)
      !== canonicalJson(input.graph_snapshot.payload.root_profile_ref)) {
    invalid("project_scope");
  }
  assertApproval(input);

  const preimage = {
    contract_version: "contentmd.eligible-voice-tone-profile/0.1.0" as const,
    project_id: input.task_scope.project_id,
    owner_ref: input.owner_ref,
    locale: input.task_scope.locale,
    channel: input.task_scope.channel,
    context: input.task_scope.context,
    evaluation_at: input.task_scope.evaluation_at,
    effective_from: input.approval_record.payload.issued_at,
    effective_through: input.approval_record.payload.expires_at,
    map_snapshot_ref: refFor(input.map_snapshot),
    graph_snapshot_ref: refFor(input.graph_snapshot),
    approval_ref: refFor(input.approval_record),
    feature_values: input.map_snapshot.payload.feature_values.map(copyFeature),
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, profile_digest: sha256Canonical(preimage) });
}
