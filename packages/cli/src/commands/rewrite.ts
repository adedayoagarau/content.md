import { createLocalRewrite, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface ProviderOptions extends RootOptions { provider: string }

export function registerRewrite(program: Command): void {
  withRoot(program.command("rewrite").description("propose source-linked rewrites"))
    .requiredOption("--provider <id>", "model provider")
    .action(async (options: ProviderOptions) => runCommand(options, async () => {
      const proposal = await createLocalRewrite(options.root, options.provider);
      return {
        command_id: "rewrite",
        record_refs: [proposal.proposal_id],
        audit_ref: localArtifactRef(options.root, "rewrite.json"),
        data: proposal,
      };
    }));
}
