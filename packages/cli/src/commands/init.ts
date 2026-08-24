import { initializeLocalProject, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface InitOptions extends RootOptions { yes?: boolean }

export function registerInit(program: Command): void {
  withRoot(program.command("init").description("adopt content.md without overwriting host files"))
    .option("--yes", "approve the exact local adoption plan")
    .action(async (options: InitOptions) => runCommand(options, async () => {
      if (options.yes !== true) throw new Error("invalid_input:init_requires_yes");
      const receipt = await initializeLocalProject(options.root);
      return {
        command_id: "init",
        record_refs: [receipt.receipt_digest],
        audit_ref: localArtifactRef(options.root, "adoption-receipt.json"),
        data: receipt,
      };
    }));
}
