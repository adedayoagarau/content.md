import { previewLocalUninstall } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface UninstallOptions extends RootOptions { preview?: boolean }

export function registerUninstall(program: Command): void {
  withRoot(program.command("uninstall").description("preview installer-owned artifacts only"))
    .option("--preview", "list owned files without removing them")
    .action(async (options: UninstallOptions) => runCommand(options, async () => {
      if (options.preview !== true) throw new Error("unsupported_capability:uninstall_requires_preview");
      const preview = await previewLocalUninstall(options.root);
      return { command_id: "uninstall.preview", record_refs: preview.owned_files, data: preview };
    }));
}
