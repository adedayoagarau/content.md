import { spawn } from "node:child_process";
import { access, cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const fixture = join(workspaceRoot, "fixtures/synthetic-mixed-stack");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("contentmd serve", () => {
  it("compiles in memory and prints a fetchable loopback URL without setup writes", async (context) => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-cli-serve-"));
    temporaryDirectories.push(root);
    await cp(fixture, root, { recursive: true });
    const child = spawn(process.execPath, [
      "--import", "tsx", cliSource, "serve", "--root", root, "--port", "0", "--json",
    ], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    try {
      const result = await new Promise<any>((resolve, reject) => {
        let stdout = "";
        let stderr = "";
        const timeout = setTimeout(() => reject(new Error(`serve timeout: ${stderr}`)), 10_000);
        child.stdout.on("data", (chunk) => {
          stdout += String(chunk);
          try {
            const parsed = JSON.parse(stdout);
            clearTimeout(timeout);
            resolve(parsed);
          } catch {
            // Wait for the complete canonical JSON envelope.
          }
        });
        child.stderr.on("data", (chunk) => { stderr += String(chunk); });
        child.once("error", (error) => {
          clearTimeout(timeout);
          reject(error);
        });
      });
      const loopbackIsForbidden = result.command_id === "command.error"
        && result.findings?.some((finding: { code?: string; message?: string }) =>
          finding.code === "listen EPERM"
          && finding.message?.includes("operation not permitted 127.0.0.1"));
      if (loopbackIsForbidden) {
        context.skip("This managed test host forbids opening loopback listeners.");
        return;
      }
      expect(result).toMatchObject({
        command_id: "serve",
        status: "completed",
        data: {
          url: expect.stringMatching(/^http:\/\/127\.0\.0\.1:\d+\/$/u),
          write_effect: "none",
        },
      });
      expect((await fetch(result.data.url)).status).toBe(200);
      await expect(access(join(root, ".contentmd/runtime/model.json"))).rejects.toThrow();
    } finally {
      child.kill("SIGTERM");
      if (child.exitCode === null) await new Promise<void>((resolve) => child.once("exit", () => resolve()));
    }
  });
});
