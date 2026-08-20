import { createLocalStrategy, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface ProviderOptions extends RootOptions { provider: string }

export function registerStrategy(program: Command): void {
  withRoot(program.command("strategy").description("propose content strategy"))
    .requiredOption("--provider <id>", "model provider")
    .action(async (options: ProviderOptions) => runCommand(options, async () => {
      const proposal = await createLocalStrategy(options.root, options.provider);
      return {
        command_id: "strategy",
        record_refs: [proposal.proposal_id],
        audit_ref: localArtifactRef(options.root, "strategy.json"),
        data: proposal,
      };
    }));
}
