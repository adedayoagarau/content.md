import { initializeLocalProject, localArtifactRef, planAdoption } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface InitOptions extends RootOptions { yes?: boolean; planDigest?: string }

export function registerInit(program: Command): void {
  withRoot(program.command("init").description("adopt content.md without overwriting host files"))
    .option("--yes", "approve the exact local adoption plan")
    .option("--plan-digest <digest>", "digest from the reviewed adoption preview")
    .action(async (options: InitOptions) => runCommand(options, async () => {
      const adoption = await planAdoption(options.root);
      if (options.yes !== true) {
        return {
          command_id: "init.preview",
          status: "blocked_by_evidence" as const,
          record_refs: [adoption.plan_digest],
          next_actions: [
            `Review the plan, then rerun with --yes --plan-digest ${adoption.plan_digest}.`,
          ],
          data: { adoption },
        };
      }
      if (options.planDigest === undefined) throw new Error("invalid_input:init_plan_digest_required");
      const receipt = await initializeLocalProject(options.root, options.planDigest);
      return {
        command_id: "init.apply",
        record_refs: [receipt.receipt_digest],
        audit_ref: localArtifactRef(options.root, "adoption-receipt.json"),
        data: receipt,
      };
    }));
}
