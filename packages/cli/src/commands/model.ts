import {
  localArtifactRef,
  modelLocalProject,
  proposeProviderAuthorization,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerModel(program: Command): void {
  const model = program.command("model").description("compile the content context graph");
  withRoot(model)
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const result = await modelLocalProject(options.root);
      return {
        command_id: "model",
        record_refs: result.graph.nodes.map((node) => node.node_id),
        audit_ref: localArtifactRef(options.root, "model.json"),
        data: result,
      };
    }));

  model.command("authorize").description("propose provider authorization")
    .requiredOption("--provider <id>", "model provider")
    .requiredOption("--operations <list>", "comma-separated writer operations")
    .action(async (_options, command) => {
      const options = command.optsWithGlobals() as RootOptions & {
        provider: string;
        operations: string;
      };
      return runCommand(options, async () => {
        if (options.provider !== "openai") throw new Error(`unsupported_provider:${options.provider}`);
        const proposal = proposeProviderAuthorization({
          project_root: options.root,
          provider_id: "openai",
          operations: options.operations.split(","),
        });
        return {
          command_id: "model.authorize.propose",
          record_refs: [proposal.proposal_id],
          data: proposal,
        };
      });
    });
}
