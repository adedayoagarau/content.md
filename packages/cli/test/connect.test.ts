import { execFile } from "node:child_process";
import { access, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];

async function run(args: string[], acceptedCodes: number[] = [0]) {
  try {
    const result = await execute(process.execPath, ["--import", "tsx", cliSource, ...args], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    });
    return { envelope: JSON.parse(result.stdout), stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    const failed = error as Error & { code?: number; stdout?: string; stderr?: string };
    if (failed.code !== undefined && acceptedCodes.includes(failed.code) && failed.stdout !== undefined) {
      return {
        envelope: JSON.parse(failed.stdout),
        stdout: failed.stdout,
        stderr: failed.stderr ?? "",
      };
    }
    throw error;
  }
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("provider connection CLI", () => {
  it("inspects an unconfigured project without creating provider state", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-connect-"));
    temporaryDirectories.push(root);

    const { envelope } = await run(["connect", "inspect", "--root", root, "--json"]);

    expect(envelope).toMatchObject({
      command_id: "connect.inspect",
      status: "completed",
      data: { configured: false, authority_effect: "none" },
    });
    await expect(access(join(root, ".contentmd/runtime/provider"))).rejects.toThrow();
  });

  it("proposes OpenAI configuration without connection, grant, secret, or network effect", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-connect-"));
    temporaryDirectories.push(root);

    const { envelope, stdout } = await run([
      "connect", "openai", "--propose", "--model", "gpt-fixture",
      "--operations", "classify,evaluate", "--root", root, "--json",
    ]);

    expect(envelope).toMatchObject({
      command_id: "connect.openai.propose",
      status: "completed",
      data: {
        provider_id: "provider.openai",
        requested_model_id: "gpt-fixture",
        proposed_operations: ["classify", "evaluate"],
        connection_effect: "none",
        authority_effect: "none",
      },
    });
    expect(envelope.warnings).toContain("store:false is not zero provider retention.");
    expect(stdout).not.toContain("api_key");
    await expect(access(join(root, ".contentmd/runtime/provider"))).rejects.toThrow();
  });

  it("does not accept or echo credential values", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-connect-"));
    temporaryDirectories.push(root);
    const secret = "sk-must-never-be-accepted";

    const result = await run([
      "connect", "openai", "--propose", "--model", "gpt-fixture",
      "--api-key", secret, "--root", root, "--json",
    ], [22]);

    expect(result.envelope.status).toBe("invalid_input");
    expect(`${result.stdout}${result.stderr}`).not.toContain(secret);
  });

  it("proposes provider authorization without issuing a capability grant", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-connect-"));
    temporaryDirectories.push(root);

    const { envelope } = await run([
      "model", "authorize", "--provider", "openai",
      "--operations", "strategy,draft,rewrite", "--root", root, "--json",
    ]);

    expect(envelope).toMatchObject({
      command_id: "model.authorize.propose",
      status: "completed",
      data: {
        provider_id: "provider.openai",
        operations: ["strategy", "draft", "rewrite"],
        capability_grant_state: "none",
        grant_effect: "none",
        authority_effect: "none",
      },
    });
    await expect(access(join(root, ".contentmd/runtime/provider"))).rejects.toThrow();
  });

  it("denies live writing before any attempt when the exact grant is absent", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-connect-"));
    temporaryDirectories.push(root);

    const result = await run([
      "strategy", "--provider", "openai", "--root", root, "--json",
    ], [21]);

    expect(result.envelope).toMatchObject({
      status: "denied_by_governance",
      findings: [{ code: "provider_grant_required" }],
      data: null,
    });
    await expect(access(join(root, ".contentmd/runtime/provider"))).rejects.toThrow();
  });
});
