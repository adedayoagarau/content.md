import { finalizeRecord, type DurableRecord } from "@contentmd/core";
import {
  compileVoiceToneGraph,
  compileVoiceToneMap,
  type VoiceToneGraphEdge,
} from "@contentmd/research";
import { SCHEMA_IDS } from "@contentmd/schemas";
import {
  researchRef,
  voiceToneFixture,
} from "../../research/test/voice-tone-test-fixtures.js";

interface ApprovalPayload {
  approval_class: "semantic_decision";
  subject_ref: string;
  subject_digest: string;
  scope: string[];
  status: "issued" | "revoked" | "expired" | "superseded";
  issued_at: string;
  expires_at: string | null;
  revocation_state: "current" | "revoked" | "unknown";
}

export function eligibleVoiceFixture() {
  const fixture = voiceToneFixture();
  const edges: VoiceToneGraphEdge[] = [
    {
      from_ref: researchRef(fixture.profile),
      relationship: "constrained_by",
      to_ref: researchRef(fixture.policy),
    },
    {
      from_ref: researchRef(fixture.profile),
      relationship: "supported_by",
      to_ref: researchRef(fixture.batch),
    },
    {
      from_ref: researchRef(fixture.policy),
      relationship: "supported_by",
      to_ref: researchRef(fixture.batch),
    },
    {
      from_ref: researchRef(fixture.batch),
      relationship: "qualified_by",
      to_ref: researchRef(fixture.acquisition),
    },
  ];
  const map = compileVoiceToneMap({
    profile_candidate: fixture.profile,
    feature_definitions: fixture.definitions,
    tone_policies: [fixture.policy],
    lineage_records: fixture.lineage_records,
  });
  const graph = compileVoiceToneGraph({
    root_profile: fixture.profile,
    nodes: [fixture.profile, fixture.policy, fixture.batch, fixture.acquisition],
    edges,
  });
  const approval = finalizeRecord<ApprovalPayload>({
    record_id: "approval.voice.synthetic.current",
    schema_id: SCHEMA_IDS.approval,
    schema_version: "0.1.0",
    record_version: 1,
    scope: fixture.profile.scope,
    provenance: [],
    lifecycle_state: "active",
    payload: {
      approval_class: "semantic_decision",
      subject_ref: map.record_id,
      subject_digest: map.content_digest,
      scope: [
        "channel:web",
        "context:synthetic_recovery",
        "locale:en-US",
        "owner:content_owner.synthetic",
        "project:project.synthetic.voice",
      ],
      status: "issued",
      issued_at: "2026-08-01T00:00:00Z",
      expires_at: "2026-12-31T23:59:59Z",
      revocation_state: "current",
    },
  });
  return {
    fixture,
    map,
    graph,
    approval,
    qualify_input: {
      task_scope: {
        project_id: "project.synthetic.voice",
        locale: "en-US",
        channel: "web",
        context: "synthetic_recovery",
        evaluation_at: "2026-08-22T12:00:00Z",
      },
      owner_ref: "content_owner.synthetic",
      map_snapshot: map,
      graph_snapshot: graph,
      approval_record: approval,
      replay: {
        profile_candidate: fixture.profile,
        feature_definitions: fixture.definitions,
        tone_policies: [fixture.policy],
        lineage_records: fixture.lineage_records,
        graph_nodes: [fixture.profile, fixture.policy, fixture.batch, fixture.acquisition] as DurableRecord<unknown>[],
        graph_edges: edges,
      },
    },
  };
}
