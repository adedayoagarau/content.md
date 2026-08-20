import { localDiff } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface DiffOptions extends RootOptions { proposal: string }

export function registerDiff(program: Command): void {
  withRoot(program.command("diff").description("show the exact proposal diff"))
    .requiredOption("--proposal <id>", "proposal ID")
    .action(async (options: DiffOptions) => runCommand(options, async () => {
      const result = await localDiff(options.root, options.proposal);
      return { command_id: "diff", record_refs: [result.proposal_id], data: result };
    }));
}
