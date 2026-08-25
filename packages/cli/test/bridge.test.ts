import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];

async function run(args: string[]) {
  const result = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
    cwd: workspaceRoot,
    env: { ...process.env, NO_COLOR: "1" },
  });
  return JSON.parse(result.stdout) as {
    command_id: string;
    status: string;
    next_actions: string[];
    data: Record<string, unknown>;
  };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("host bridge CLI", () => {
  it("previews a CODEX.md bridge without mutating the host file", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-bridge-cli-"));
    temporaryDirectories.push(root);
    const original = "# Existing Codex instructions\nPreserve this text.\n";
    await writeFile(join(root, "CODEX.md"), original, "utf8");

    const envelope = await run(["bridge", "--host", "codex", "--root", root, "--json"]);

    expect(envelope).toMatchObject({
      command_id: "bridge.preview",
      status: "completed",
      data: {
        host: "codex",
        relative_path: "CODEX.md",
        status: "change_proposed",
        authority_effect: "none",
      },
    });
    expect(envelope.next_actions).toEqual([
      "Review the preview, then rerun with --yes to install this exact bridge.",
    ]);
    expect(await readFile(join(root, "CODEX.md"), "utf8")).toBe(original);
  });

  it("installs only the digest-bound bridge after explicit --yes and is idempotent", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-bridge-cli-"));
    temporaryDirectories.push(root);
    const original = "# Existing Claude instructions\nPreserve this text.\n";
    await writeFile(join(root, "CLAUDE.md"), original, "utf8");

    const installed = await run([
      "bridge", "--host", "claude", "--yes", "--root", root, "--json",
    ]);

    expect(installed).toMatchObject({
      command_id: "bridge.install",
      status: "completed",
      data: {
        host: "claude",
        relative_path: "CLAUDE.md",
        authority_effect: "none",
      },
    });
    const content = await readFile(join(root, "CLAUDE.md"), "utf8");
    expect(content).toContain(original);
    expect(content.match(/<!-- contentmd:bridge:start -->/g)).toHaveLength(1);

    const repeated = await run([
      "bridge", "--host", "claude", "--yes", "--root", root, "--json",
    ]);
    expect(repeated).toMatchObject({
      command_id: "bridge.install",
      status: "completed",
      data: { status: "already_installed", authority_effect: "none" },
    });
    expect(await readFile(join(root, "CLAUDE.md"), "utf8")).toBe(content);
  });
});
