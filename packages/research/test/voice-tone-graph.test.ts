import { describe, expect, it } from "vitest";
import { verifyRecordDigest } from "@contentmd/core";
import { compileVoiceToneGraph, type VoiceToneGraphEdge } from "@contentmd/research";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import { researchRef, voiceToneFixture } from "./voice-tone-test-fixtures.js";

function graphInput() {
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
  return {
    fixture,
    input: {
      root_profile: fixture.profile,
      nodes: [fixture.profile, fixture.policy, fixture.batch, fixture.acquisition],
      edges,
    },
  };
}

describe("voice and tone evidence graph", () => {
  it("creates a deterministic acyclic evidence graph with no authority effect", () => {
    const { input } = graphInput();

    const graph = compileVoiceToneGraph(input);

    expect(graph.payload.node_refs).toHaveLength(4);
    expect(graph.payload.edges).toHaveLength(4);
    expect(graph.payload.authority_effect).toBe("none");
    expect(verifyRecordDigest(graph)).toEqual({ valid: true });
    expect(validateRecord(SCHEMA_IDS.voiceToneGraphSnapshot, graph)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("rejects dangling, duplicate, and cyclic dependency edges", () => {
    const dangling = graphInput();
    dangling.input.edges[0]!.to_ref.record_id = "tone_policy.missing";
    expect(() => compileVoiceToneGraph(dangling.input)).toThrow("dangling_record_graph_edge");

    const duplicate = graphInput();
    duplicate.input.edges.push(structuredClone(duplicate.input.edges[0]!));
    expect(() => compileVoiceToneGraph(duplicate.input)).toThrow("duplicate_record_graph_edge");

    const cyclic = graphInput();
    cyclic.input.edges.push({
      from_ref: researchRef(cyclic.fixture.acquisition),
      relationship: "supported_by",
      to_ref: researchRef(cyclic.fixture.profile),
    });
    expect(() => compileVoiceToneGraph(cyclic.input)).toThrow("cyclic_record_graph_dependency");
  });

  it("rejects public-source approval shortcuts and quarantined ancestry", () => {
    const collapsed = graphInput();
    collapsed.input.edges.push({
      from_ref: researchRef(collapsed.fixture.batch),
      relationship: "approves" as VoiceToneGraphEdge["relationship"],
      to_ref: researchRef(collapsed.fixture.profile),
    });
    expect(() => compileVoiceToneGraph(collapsed.input)).toThrow("voice_graph_authority_collapse");

    const fixture = voiceToneFixture({ protocolConformance: "nonconforming_profile" });
    expect(() => compileVoiceToneGraph({
      root_profile: fixture.profile,
      nodes: [fixture.profile, fixture.policy, fixture.batch, fixture.acquisition],
      edges: [
        {
          from_ref: researchRef(fixture.profile),
          relationship: "supported_by",
          to_ref: researchRef(fixture.batch),
        },
      ],
    })).toThrow("voice_lineage_quarantined:research_batch.voice.synthetic");
  });
});
