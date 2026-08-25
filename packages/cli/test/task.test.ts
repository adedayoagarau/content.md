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
let inputRoot = "";

async function run(args: string[]): Promise<any> {
  const { stdout } = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
    cwd: workspaceRoot,
    env: { ...process.env, NO_COLOR: "1" },
  });
  return JSON.parse(stdout);
}

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "contentmd-cli-task-"));
  inputRoot = await mkdtemp(join(tmpdir(), "contentmd-cli-task-input-"));
  await cp(fixture, root, { recursive: true });
});

afterAll(async () => {
  await Promise.all([root, inputRoot].map((path) => rm(path, { recursive: true, force: true })));
});

describe("provider-neutral IDE task CLI", () => {
  it("prepares repository context and reviews a proposed candidate without applying it", async () => {
    const prepared = await run([
      "task", "prepare", "--root", root,
      "--request", "Improve the Analyze empty state",
      "--target", "studio/app/analyze/page.tsx:8", "--json",
    ]);
    expect(prepared).toMatchObject({ command_id: "task.prepare", status: "completed" });
    const candidatePath = join(inputRoot, "candidate.json");
    await writeFile(candidatePath, `${JSON.stringify({
      contract_version: "contentmd.ide-writing-candidate/0.1.0",
      task_digest: prepared.data.task.task_digest,
      alternatives: [{
        candidate_id: "candidate.empty-state.001",
        text: "Choose a product and stage to begin analysis.",
        rationale: "Names the inputs needed to continue.",
        evidence_refs: prepared.data.task.evidence_refs,
      }],
      recommended_candidate_id: "candidate.empty-state.001",
      claimed_authority_effect: "none",
    }, null, 2)}\n`, "utf8");

    const reviewed = await run([
      "task", "review", "--root", root, "--input", candidatePath, "--json",
    ]);
    expect(reviewed).toMatchObject({
      command_id: "task.review",
      status: "completed",
      data: { decision_status: "proposed", authority_effect: "none" },
    });
  });
});
