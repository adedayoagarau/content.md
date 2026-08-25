import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { buildProgram } from "../src/main.js";

const execute = promisify(execFile);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => (
    rm(directory, { recursive: true, force: true })
  )));
});

async function executeBenchmark(root: string, action: string, input?: string): Promise<{
  readonly envelope: Record<string, unknown>;
  readonly stdout: string;
}> {
  const args = ["--import", "tsx", cliSource, "learn", "benchmark", action];
  if (input !== undefined) args.push("--input", input);
  args.push("--root", root, "--json");
  let stdout = "";
  try {
    ({ stdout } = await execute(process.execPath, args, {
      cwd: workspaceRoot,
      env: { ...process.env, NO_COLOR: "1" },
    }));
  } catch (error) {
    stdout = (error as { stdout?: string }).stdout ?? "";
  }
  return { envelope: JSON.parse(stdout) as Record<string, unknown>, stdout };
}

describe("sealed writing benchmark CLI", () => {
  it("registers the exact benchmark transitions without inferred approval flags", () => {
    const program = buildProgram();
    const learn = program.commands.find((command) => command.name() === "learn")!;
    const benchmark = learn.commands.find((command) => command.name() === "benchmark")!;

    expect(benchmark.commands.map((command) => command.name())).toEqual([
      "seal",
      "ingest-review",
      "open-result",
      "verify",
    ]);
    for (const command of benchmark.commands) {
      expect(command.options.map((option) => option.long)).not.toContain("--yes");
      expect(command.options.map((option) => option.long)).not.toContain("--approve");
      expect(command.options.map((option) => option.long)).not.toContain("--force");
    }
  });

  it("proves the official benchmark attempt has not started", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-writing-benchmark-"));
    temporaryDirectories.push(root);

    const { envelope, stdout } = await executeBenchmark(root, "verify");

    expect(envelope).toMatchObject({
      command_id: "learn.benchmark.verify",
      status: "completed",
      findings: [],
      data: {
        benchmark_id: "LIL-WRITE-001",
        official_attempt_status: "not_started",
        official_attempt_effect: "none",
        benchmark_claim_eligibility: false,
      },
    });
    expect(stdout).not.toContain("passed");
    expect(stdout).not.toContain("writing_effectiveness");
  });

  it("rejects synthetic development artifacts in the official directory", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-writing-benchmark-"));
    temporaryDirectories.push(root);
    const officialDirectory = join(root, "fixtures/learning-ranking/lil-write-001");
    await mkdir(officialDirectory, { recursive: true });
    await writeFile(join(officialDirectory, "attempt.json"), JSON.stringify({
      fixture_status: "synthetic_test_only",
      official_attempt_effect: "none",
      benchmark_claim_eligibility: false,
    }));

    const { envelope } = await executeBenchmark(root, "verify");

    expect(envelope).toMatchObject({
      command_id: "command.error",
      status: "invalid_input",
      findings: [{
        code: "writing_benchmark_official_state_invalid",
        message: "writing_benchmark_official_state_invalid:synthetic_fixture",
      }],
    });
  });

  it.each(["seal", "ingest-review", "open-result"] as const)(
    "denies %s without separate action-time authority",
    async (action) => {
      const root = await mkdtemp(join(tmpdir(), "contentmd-writing-benchmark-"));
      temporaryDirectories.push(root);
      const input = join(root, `${action}.json`);
      await writeFile(input, "{}\n");

      const { envelope } = await executeBenchmark(root, action, input);

      expect(envelope).toMatchObject({
        command_id: "command.error",
        status: "denied_by_governance",
        findings: [{
          code: "change_not_authorized",
          message: `change_not_authorized:writing_benchmark_${action.replace("-", "_")}`,
        }],
      });
    },
  );
});
