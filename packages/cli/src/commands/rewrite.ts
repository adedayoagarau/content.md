import { createLocalRewrite, localArtifactRef, reviewLocalUxWritingRewrite } from "@contentmd/agent";
import type { Command } from "commander";
import { requireProviderGrant, runCommand, withRoot, type RootOptions } from "./shared.js";

interface ProviderOptions extends RootOptions { provider: string; grant?: string; repairBrief?: string; uxContext?: string }

export function registerRewrite(program: Command): void {
  withRoot(program.command("rewrite").description("propose source-linked rewrites"))
    .requiredOption("--provider <id>", "model provider")
    .option("--grant <record>", "exact provider capability grant record")
    .option("--repair-brief <path>", "deterministic UX-writing repair brief")
    .option("--ux-context <path>", "original structured UX-writing review request")
    .action(async (options: ProviderOptions) => runCommand(options, async () => {
      requireProviderGrant(options.provider, options.grant);
      if ((options.repairBrief === undefined) !== (options.uxContext === undefined)) {
        throw new Error("ux_writing_rewrite_context_incomplete");
      }
      const proposal = await createLocalRewrite(options.root, options.provider, options.repairBrief);
      const uxReviews = options.repairBrief === undefined || options.uxContext === undefined
        ? null
        : await reviewLocalUxWritingRewrite(options.root, options.uxContext, options.repairBrief, proposal);
      const hasUxFindings = uxReviews?.some((review) => review.report.findings.length > 0) ?? false;
      return {
        command_id: "rewrite",
        status: hasUxFindings ? "findings_present" as const : "completed" as const,
        record_refs: [proposal.proposal_id, ...(uxReviews ?? []).map((review) => review.report.report_id)],
        audit_ref: localArtifactRef(options.root, "rewrite.json"),
        data: uxReviews === null ? proposal : { proposal, ux_writing_reviews: uxReviews },
      };
    }));
}
