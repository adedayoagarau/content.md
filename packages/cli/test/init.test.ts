import { execFile } from "node:child_process";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const fixture = join(workspaceRoot, "fixtures/synthetic-mixed-stack");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];

async function run(args: string[], accepted = [0, 20, 22]): Promise<any> {
  try {
    const { stdout } = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    });
    return JSON.parse(stdout);
  } catch (error) {
    const failed = error as Error & { code?: number; stdout?: string; stderr?: string };
    if (failed.code !== undefined && accepted.includes(failed.code) && failed.stdout !== undefined) {
      return JSON.parse(failed.stdout);
    }
    throw new Error(`${failed.stdout ?? ""}\n${failed.stderr ?? failed.message}`);
  }
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("preview-first one-command adoption", () => {
  it("requires the reviewed plan digest and applies CONTENT.md plus detected host bridges together", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-init-"));
    temporaryDirectories.push(root);
    await cp(fixture, root, { recursive: true });

    const preview = await run(["init", "--root", root, "--json"]);
    expect(preview).toMatchObject({
      command_id: "init.preview",
      status: "blocked_by_evidence",
      data: {
        adoption: {
          identity: { proposed_project_id: "project.synthetic-content-studio" },
          bridge_previews: [expect.objectContaining({ host: "claude", relative_path: "CLAUDE.md" })],
        },
      },
    });
    expect(await run(["init", "--root", root, "--yes", "--json"])).toMatchObject({ status: "invalid_input" });

    const digest = preview.data.adoption.plan_digest as string;
    const applied = await run([
      "init", "--root", root, "--yes", "--plan-digest", digest, "--json",
    ]);
    expect(applied).toMatchObject({ command_id: "init.apply", status: "completed" });
    expect(await readFile(join(root, "CLAUDE.md"), "utf8")).toContain("<!-- contentmd:bridge:start version=\"0.2.0\"");
    const contract = await readFile(join(root, "CONTENT.md"), "utf8");
    expect(contract).toContain("> Guidance status: provisional.");
    expect(contract.split("\n").length).toBeLessThan(250);
  });
});
