import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const requestPath = join(workspaceRoot, "packages/cli/test/fixtures/ux-writing-review-request.json");
let root = "";

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "contentmd-cli-ux-writing-"));
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

describe("deterministic UX-writing CLI review", () => {
  it("returns governed findings and persists the review and repair brief", async () => {
    let stdout = "";
    try {
      ({ stdout } = await execute(process.execPath, [
        "--import", "tsx", cliSource,
        "review", "--root", root, "--ux-context", requestPath, "--json",
      ], { cwd: workspaceRoot, env: { ...process.env, NO_COLOR: "1" } }));
    } catch (error) {
      const failure = error as Error & { code?: number; stdout?: string };
      expect(failure.code).toBe(10);
      stdout = failure.stdout ?? "";
    }

    const result = JSON.parse(stdout) as any;
    expect(result).toMatchObject({
      command_id: "review",
      status: "findings_present",
      exit_code: 10,
      data: { report: { hard_plane_status: "fail", authority_effect: "none" } },
    });
    expect(result.data.report.findings.map((finding: { rule_id: string }) => finding.rule_id))
      .toContain("uxw.recovery.safe-retry");
    expect(result.data.repair_brief.preserve).toEqual([
      "A payment was submitted",
      "The outcome is not confirmed",
    ]);

    const persisted = JSON.parse(await readFile(join(root, ".contentmd/runtime/ux-writing-review.json"), "utf8"));
    expect(persisted.report_digest).toBe(result.data.report.report_digest);
  });
});
