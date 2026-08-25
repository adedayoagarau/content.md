import {
  createLocalDraft,
  localArtifactRef,
  selectLocalDraftAlternative,
} from "@contentmd/agent";
import type { Command } from "commander";
import { requireProviderGrant, runCommand, withRoot, type RootOptions } from "./shared.js";

interface ProviderOptions extends RootOptions { provider: string; grant?: string }
interface SelectionOptions extends RootOptions { input: string }

export function registerDraft(program: Command): void {
  withRoot(program.command("draft").description("propose content draft"))
    .requiredOption("--provider <id>", "model provider")
    .option("--grant <record>", "exact provider capability grant record")
    .action(async (options: ProviderOptions) => runCommand(options, async () => {
      requireProviderGrant(options.provider, options.grant);
      const proposal = await createLocalDraft(options.root, options.provider);
      return {
        command_id: "draft",
        record_refs: [proposal.proposal_id],
        audit_ref: localArtifactRef(options.root, "draft.json"),
        data: proposal,
      };
    }));

  withRoot(program.command("draft-select").description("select a draft alternative from a complete governed replay"))
    .requiredOption("--input <path>", "complete governed draft-selection replay")
    .action(async (options: SelectionOptions) => runCommand(options, async () => {
      const selection = await selectLocalDraftAlternative(options.root, options.input);
      return {
        command_id: "draft-select",
        record_refs: [selection.proposal_id],
        audit_ref: localArtifactRef(options.root, "draft-selection.json"),
        data: selection,
      };
    }));
}
