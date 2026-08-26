import { execFile } from "node:child_process";
import { cp, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const fixture = join(workspaceRoot, "fixtures/synthetic-mixed-stack");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
let root = "";
let inputDirectory = "";

interface Envelope {
  command_id: string;
  status: string;
  exit_code: number;
  record_refs: string[];
  data: any;
}

async function run(args: string[]): Promise<Envelope> {
  const { stdout } = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
    cwd: workspaceRoot,
    env: { ...process.env, NO_COLOR: "1" },
  });
  return JSON.parse(stdout) as Envelope;
}

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "contentmd-cli-interpretation-"));
  inputDirectory = await mkdtemp(join(tmpdir(), "contentmd-cli-interpretation-input-"));
  await cp(fixture, root, { recursive: true });
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
  await rm(inputDirectory, { recursive: true, force: true });
});

describe("provider-neutral model interpretation CLI", () => {
  it("emits a bounded packet and ingests a cited proposed response", async () => {
    const packetResult = await run(["model", "packet", "--root", root, "--json"]);
    expect(packetResult).toMatchObject({ command_id: "model.packet", status: "completed" });
    const packet = packetResult.data as any;
    const source = packet.context_items.find((item: any) => item.locator === "docs/context/PRODUCT-IDENTITY.md");
    const line = source.bounded_text.split("\n").findIndex((value: string) => value === "checkout content designers") + 1;
    const responsePath = join(inputDirectory, "interpretation-response.json");
    await writeFile(responsePath, `${JSON.stringify({
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
    }, null, 2)}\n`, "utf8");

    const ingest = await run(["model", "ingest", "--root", root, "--input", responsePath, "--json"]);
    expect(ingest).toMatchObject({
      command_id: "model.ingest",
      status: "completed",
      data: { accepted_proposed_claims: 1, authority_effect: "none" },
    });
  });
});
