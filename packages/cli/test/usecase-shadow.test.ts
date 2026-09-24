import { execFile } from "node:child_process";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execute = promisify(execFile);
const require = createRequire(import.meta.url);
const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));
const tsxLoader = require.resolve("tsx");
const cliSource = join(workspaceRoot, "packages/cli/src/main.ts");
const requestPath = join(workspaceRoot, "packages/cli/test/fixtures/usecase-classify-request.json");
const benchmarkPath = join(workspaceRoot, "fixtures/ux-writing-usecases/benchmark-v0.1.jsonl");
const adjudicationPath = join(workspaceRoot, "fixtures/ux-writing-usecases/adjudication-v0.1.jsonl");
let emptyWorkingDirectory = "";

beforeAll(async () => {
  emptyWorkingDirectory = await mkdtemp(join(tmpdir(), "contentmd-usecase-shadow-"));
});

afterAll(async () => {
  await rm(emptyWorkingDirectory, { recursive: true, force: true });
});

describe("UX-writing use-case shadow CLI", () => {
  it("classifies one request without project writes or authority effects", async () => {
    const { stdout } = await execute(process.execPath, [
      "--import", tsxLoader, cliSource,
      "usecase", "classify", "--input", requestPath, "--json",
    ], { cwd: emptyWorkingDirectory, env: { ...process.env, NO_COLOR: "1" }, maxBuffer: 8 * 1024 * 1024 });
    const result = JSON.parse(stdout) as any;
    expect(result).toMatchObject({
      command_id: "usecase.classify",
      status: "completed",
      exit_code: 0,
      data: {
        mode: "shadow",
        authority_effect: "none",
        write_effect: "none",
        resolution: {
          status: "resolved",
          route: { route_id: "commitment.payment.outcome_unknown" },
        },
      },
    });
    expect(await readdir(emptyWorkingDirectory)).toEqual([]);
  });

  it("reports provisional success while blocking release pending qualified adjudication", async () => {
    let stdout = "";
    try {
      ({ stdout } = await execute(process.execPath, [
        "--import", tsxLoader, cliSource,
        "usecase", "evaluate", "--benchmark", benchmarkPath,
        "--adjudications", adjudicationPath, "--json",
      ], { cwd: emptyWorkingDirectory, env: { ...process.env, NO_COLOR: "1" }, maxBuffer: 16 * 1024 * 1024 }));
    } catch (error) {
      const failure = error as Error & { code?: number; stdout?: string };
      expect(failure.code).toBe(20);
      stdout = failure.stdout ?? "";
    }
    const result = JSON.parse(stdout) as any;
    expect(result).toMatchObject({
      command_id: "usecase.evaluate",
      status: "blocked_by_evidence",
      exit_code: 20,
      data: {
        release_disposition: "hold_for_qualified_review",
        counts: { total: 200, pending_qualified_review: 200, qualified: 0 },
        provisional_metrics: { cases_passing_all_criteria: 200, cases_failing_any_criterion: 0 },
        qualified_metrics: null,
        authority_effect: "none",
      },
    });
    expect(await readdir(emptyWorkingDirectory)).toEqual([]);
  });

  it("builds the complete read-only domain by taxonomy corpus pilot plan", async () => {
    const { stdout } = await execute(process.execPath, [
      "--import", tsxLoader, cliSource,
      "usecase", "adjudicate-corpus", "--root", workspaceRoot,
      "--mode", "plan", "--json",
    ], { cwd: emptyWorkingDirectory, env: { ...process.env, NO_COLOR: "1" }, maxBuffer: 32 * 1024 * 1024 });
    const result = JSON.parse(stdout) as any;
    expect(result).toMatchObject({
      command_id: "usecase.adjudicate-corpus",
      status: "completed",
      exit_code: 0,
      data: {
        mode: "plan",
        plan: {
          contract_version: "contentmd.corpus-adjudication-plan/0.1.0",
          split: "discovery",
          sample_matrix: ["domain", "taxonomy"],
          counts: {
            selected_unit_count: 140,
            matrix_cell_count: 140,
            unique_product_count: 136,
            verified_source_section_count: 140,
          },
          authority_effect: "none",
        },
      },
    });
    expect(result.data.plan.units).toHaveLength(140);
    expect(result.warnings).toContain("Planning made no model call and wrote no adjudication state.");
    expect(await readdir(emptyWorkingDirectory)).toEqual([]);
  });
});
