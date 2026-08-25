import { execFile, spawn } from "node:child_process";
import { cp, mkdtemp, rm } from "node:fs/promises";
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

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("contentmd serve", () => {
  it("blocks with an exact next action when no compiled model exists", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-cli-serve-"));
    temporaryDirectories.push(root);
    await cp(fixture, root, { recursive: true });

    try {
      await execute(process.execPath, ["--import", "tsx", cliSource, "serve", "--root", root, "--json"], {
        cwd: workspaceRoot,
        env: { ...process.env, NO_COLOR: "1" },
      });
      throw new Error("serve should have been blocked");
    } catch (error) {
      const failed = error as Error & { code?: number; stdout?: string };
      expect(failed.code).toBe(20);
      expect(JSON.parse(failed.stdout ?? "{}")).toMatchObject({
        status: "blocked_by_evidence",
        next_actions: ["Run contentmd model first."],
      });
    }
  });

  it("prints a fetchable loopback URL after running doctor", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-cli-serve-"));
    temporaryDirectories.push(root);
    await cp(fixture, root, { recursive: true });
    await execute(process.execPath, ["--import", "tsx", cliSource, "model", "--root", root, "--json"], {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    });

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
      expect(result).toMatchObject({
        command_id: "serve",
        status: "completed",
        data: { url: expect.stringMatching(/^http:\/\/127\.0\.0\.1:\d+\/$/u) },
      });
      expect((await fetch(result.data.url)).status).toBe(200);
    } finally {
      child.kill("SIGTERM");
      if (child.exitCode === null) await new Promise<void>((resolve) => child.once("exit", () => resolve()));
    }
  });
});
