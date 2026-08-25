import { execFile } from "node:child_process";
import { mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];

async function run(args: string[], acceptedCodes: number[] = [0, 20]) {
  try {
    const { stdout } = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    });
    return JSON.parse(stdout) as Record<string, unknown>;
  } catch (error) {
    const failed = error as Error & { code?: number; stdout?: string; stderr?: string };
    if (failed.code !== undefined && acceptedCodes.includes(failed.code) && failed.stdout !== undefined) {
      return JSON.parse(failed.stdout) as Record<string, unknown>;
    }
    throw new Error(`CLI failed: ${args.join(" ")}\n${failed.stdout ?? ""}\n${failed.stderr ?? failed.message}`);
  }
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("contentmd start", () => {
  it("returns a non-mutating adoption packet for a project without CONTENT.md", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-start-cli-"));
    temporaryDirectories.push(root);
    const product = "# Product context\nFacts retain product ownership.\n";
    await writeFile(join(root, "product.md"), product, "utf8");
    await writeFile(join(root, "claude.md"), "# Claude guidance\n", "utf8");

    const envelope = await run(["start", "--root", root, "--json"]);

    expect(envelope).toMatchObject({
      command_id: "start",
      status: "blocked_by_evidence",
      data: {
        doctor: { overall_status: "not_adopted" },
        adoption: {
          status: "ready_for_local_approval",
          existing_sources: [
            { relative_path: "claude.md", authority_effect: "none" },
            { relative_path: "product.md", authority_effect: "none" },
          ],
          creates: [
            { relative_path: ".contentmd/governance/starter-policy.yaml" },
            { relative_path: ".contentmd/manifest.json" },
            { relative_path: ".contentmd/product/open-questions.json" },
            { relative_path: ".contentmd/records/repository-model.json" },
            { relative_path: "CONTENT.md" },
          ],
        },
      },
    });
    const digest = (envelope.data as any).adoption.plan_digest as string;
    expect(envelope.next_actions).toEqual([
      `Review the adoption plan, then run contentmd init --yes --plan-digest ${digest} --root ${await realpath(root)} --json to approve that exact transaction.`,
    ]);
    expect(await readFile(join(root, "product.md"), "utf8")).toBe(product);
    await expect(readFile(join(root, "CONTENT.md"), "utf8")).rejects.toThrow();
  });
});
