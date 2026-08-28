import { localArtifactRef, reviewLocalProject, reviewLocalUxWriting } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerReview(program: Command): void {
  withRoot(program.command("review").description("run deterministic content review"))
    .option("--ux-context <path>", "structured UX-writing review request")
    .action(async (options: RootOptions & { uxContext?: string }) => runCommand(options, async () => {
      if (options.uxContext !== undefined) {
        const result = await reviewLocalUxWriting(options.root, options.uxContext);
        return {
          command_id: "review",
          status: result.report.findings.length > 0 ? "findings_present" as const : "completed" as const,
          record_refs: [result.report.report_id, ...(result.repair_brief === null ? [] : [result.repair_brief.brief_id])],
          findings: result.report.findings,
          audit_ref: localArtifactRef(options.root, "ux-writing-review.json"),
          data: result,
        };
      }
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
