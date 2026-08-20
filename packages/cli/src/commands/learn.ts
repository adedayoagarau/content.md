import { evaluateLocalLearning } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerLearn(program: Command): void {
  withRoot(program.command("learn").description("evaluate, but never auto-promote, learning candidates"))
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const result = await evaluateLocalLearning(options.root);
      return {
        command_id: "learn",
        status: "blocked_by_evidence" as const,
        findings: [{ code: result.reason, disposition: result.disposition }],
        next_actions: result.disposition === "not_authorized"
          ? ["Establish a separate scoped learning-data permission before evaluation."]
          : ["Collect additional accepted decisions before proposing a candidate."],
        data: result,
      };
    }));
}
