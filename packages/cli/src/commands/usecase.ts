import {
  classifyLocalUxWritingUseCase,
  evaluateLocalUxWritingUseCaseBenchmark,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

interface JsonOptions {
  json?: boolean;
}

export function registerUsecase(program: Command): void {
  const usecase = program.command("usecase")
    .description("classify and evaluate deterministic English UX-writing use cases");

  usecase.command("classify")
    .description("classify one structured request in authority-free shadow mode")
    .requiredOption("--input <path>", "structured use-case request JSON")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: JsonOptions & { input: string }) => runCommand(options, async () => {
      const result = await classifyLocalUxWritingUseCase(options.input);
      return {
        command_id: "usecase.classify",
        status: "completed" as const,
        record_refs: [result.classification.classification_id, result.resolution.resolution_id],
        warnings: result.resolution.status === "abstain"
          ? [`Policy resolution abstained: ${result.resolution.reason ?? "unspecified"}.`]
          : [],
        data: result,
      };
    }));

  usecase.command("evaluate")
    .description("evaluate a frozen use-case benchmark without writing project state")
    .requiredOption("--benchmark <path>", "benchmark JSONL")
    .requiredOption("--adjudications <path>", "adjudication JSONL")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: JsonOptions & { benchmark: string; adjudications: string }) => runCommand(options, async () => {
      const report = await evaluateLocalUxWritingUseCaseBenchmark(options.benchmark, options.adjudications);
      const blocked = report.release_disposition === "hold_for_qualified_review";
      return {
        command_id: "usecase.evaluate",
        status: blocked ? "blocked_by_evidence" as const : report.release_disposition === "qualified_regression_fail"
          ? "findings_present" as const : "completed" as const,
        record_refs: [report.report_digest],
        next_actions: blocked
          ? ["Run qualified AI classifier-evaluator adjudication; use a person only for an explicit authority or failure exception."]
          : [],
        data: report,
      };
    }));
}
