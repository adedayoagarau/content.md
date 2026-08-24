import { diagnoseLocalProject } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerDoctor(program: Command): void {
  withRoot(program.command("doctor").description("report local readiness and non-authority"))
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const report = await diagnoseLocalProject(options.root);
      return {
        command_id: "doctor",
        status: report.overall_status === "not_adopted" ? "blocked_by_evidence" as const : "completed" as const,
        findings: report.checks.filter((check) => check.status !== "pass"),
        data: report,
      };
    }));
}
