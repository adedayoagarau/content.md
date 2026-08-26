import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  compileProjectModel,
  createRepositoryInterpretationPacket,
  ingestRepositoryInterpretation,
  type RepositoryInterpretationResponse,
} from "@contentmd/agent";

const fixture = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

async function setup(): Promise<{ root: string; response: RepositoryInterpretationResponse }> {
  const root = await mkdtemp(join(tmpdir(), "contentmd-interpretation-"));
  temporaryDirectories.push(root);
  await cp(fixture, root, { recursive: true });
  const packet = createRepositoryInterpretationPacket(await compileProjectModel({ project_root: root }));
  const source = packet.context_items.find((item) => item.locator === "docs/context/PRODUCT-IDENTITY.md");
  if (source === undefined) throw new Error("fixture source missing");
  const lines = source.bounded_text.split("\n");
  const line = lines.findIndex((value) => value === "checkout content designers") + 1;
  return {
    root,
    response: {
      contract_version: "contentmd.repository-interpretation-response/0.1.0",
      packet_digest: packet.packet_digest,
      project_id: packet.project_id,
      proposed_claims: [{
        claim_kind: "audience_job",
        subject: "Primary audience interpretation",
        value: "checkout content designers",
        citations: [{
          source_ref: source.source_ref,
          source_digest: source.content_digest,
          start_line: line,
          end_line: line,
          quoted_text: "checkout content designers",
        }],
        confidence: "high",
        limitations: ["Requires user review"],
        decision_status: "proposed",
        authority_effect: "none",
      }],
      persona_candidates: [],
      voice_dimensions: [],
      terminology_candidates: [],
      conflicts: [],
      open_questions: [],
    },
  };
}

describe("bounded repository interpretation", () => {
  it("creates a safe, source-bounded packet for an IDE model", async () => {
    const { root } = await setup();
    const model = await compileProjectModel({ project_root: root });
    const packet = createRepositoryInterpretationPacket(model);

    expect(packet.context_items.every((item) => model.sources.some((source) => source.source_id === item.source_ref))).toBe(true);
    expect(JSON.stringify(packet)).not.toContain("PRIVATE_DATA_CANARY");
    expect(packet.requested_claim_kinds).toEqual([
      "product_identity",
      "audience_job",
      "workflow_stage",
      "voice_guidance",
      "terminology_guidance",
    ]);
    expect(packet.authority_effect).toBe("none");
  });

  it("replays citations and stores accepted output only as proposed guidance", async () => {
    const { root, response } = await setup();
    const receipt = await ingestRepositoryInterpretation(root, response);
    const record = JSON.parse(await readFile(join(root, ".contentmd/records/repository-interpretation.json"), "utf8")) as Record<string, unknown>;

    expect(receipt).toMatchObject({ accepted_proposed_claims: 1, authority_effect: "none" });
    expect(record).toMatchObject({ decision_status: "proposed", authority_effect: "none" });
    expect(JSON.stringify(record)).not.toContain('"approved"');
    const updated = await compileProjectModel({ project_root: root });
    expect(updated.proposed_interpretation).toMatchObject({
      decision_status: "proposed",
      record_digest: receipt.record_digest,
    });
    expect(updated.graph.nodes).toContainEqual(expect.objectContaining({
      node_type: "evidence_claim",
      label: "checkout content designers",
      attributes: expect.objectContaining({ decision_status: "proposed" }),
    }));
    expect(updated.discovery.occurrences.some((item) => item.source_artifact.startsWith(".contentmd/"))).toBe(false);
  });

  it("rejects nonexistent refs, invalid spans, approvals, unknown claims, extra keys, and stale sources", async () => {
    const invalidRef = await setup();
    invalidRef.response.proposed_claims[0]!.citations[0]!.source_ref = "source.missing";
    await expect(ingestRepositoryInterpretation(invalidRef.root, invalidRef.response))
      .rejects.toThrow("interpretation_source_ref_invalid");

    const invalidSpan = await setup();
    invalidSpan.response.proposed_claims[0]!.citations[0]!.end_line = 9999;
    await expect(ingestRepositoryInterpretation(invalidSpan.root, invalidSpan.response))
      .rejects.toThrow("interpretation_source_span_invalid");

    const approved = await setup();
    Object.assign(approved.response.proposed_claims[0]!, { decision_status: "approved" });
    await expect(ingestRepositoryInterpretation(approved.root, approved.response))
      .rejects.toThrow("interpretation_response_invalid");

    const unknown = await setup();
    Object.assign(unknown.response.proposed_claims[0]!, { claim_kind: "organizational_approval" });
    await expect(ingestRepositoryInterpretation(unknown.root, unknown.response))
      .rejects.toThrow("interpretation_claim_kind_invalid");

    const extra = await setup();
    Object.assign(extra.response, { publication_authority: "granted" });
    await expect(ingestRepositoryInterpretation(extra.root, extra.response))
      .rejects.toThrow("interpretation_response_invalid");

    const stale = await setup();
    await writeFile(join(stale.root, "docs/context/PRODUCT-IDENTITY.md"), "# Changed\n", "utf8");
    await expect(ingestRepositoryInterpretation(stale.root, stale.response))
      .rejects.toThrow("interpretation_source_changed");
  });
});
