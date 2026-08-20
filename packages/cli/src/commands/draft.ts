import { createLocalDraft, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface ProviderOptions extends RootOptions { provider: string }

export function registerDraft(program: Command): void {
  withRoot(program.command("draft").description("propose content draft"))
    .requiredOption("--provider <id>", "model provider")
    .action(async (options: ProviderOptions) => runCommand(options, async () => {
      const proposal = await createLocalDraft(options.root, options.provider);
      return {
        command_id: "draft",
        record_refs: [proposal.proposal_id],
        audit_ref: localArtifactRef(options.root, "draft.json"),
        data: proposal,
      };
    }));
}
