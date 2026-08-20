import { localArtifactRef, reviewLocalProject } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerReview(program: Command): void {
  withRoot(program.command("review").description("run deterministic content review"))
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const report = await reviewLocalProject(options.root);
      return {
        command_id: "review",
        status: report.findings.length > 0 ? "findings_present" as const : "completed" as const,
        record_refs: report.findings.map((finding) => finding.finding_id),
        findings: report.findings,
        audit_ref: localArtifactRef(options.root, "review.json"),
        data: report,
      };
    }));
}
