import {
  inspectLocalProviderConfiguration,
  proposeOpenAIProviderConfiguration,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface OpenAIProposalOptions extends RootOptions {
  model: string;
  operations: string;
  propose: boolean;
}

export function registerConnect(program: Command): void {
  const connect = program.command("connect")
    .description("inspect or propose governed model-provider configuration");

  withRoot(connect.command("inspect").description("inspect local provider configuration"))
    .action(async (options: RootOptions) => runCommand(options, async () => ({
      command_id: "connect.inspect",
      data: await inspectLocalProviderConfiguration(options.root),
    })));

  withRoot(connect.command("openai").description("propose governed OpenAI configuration"))
    .requiredOption("--propose", "emit a proposal without applying provider state")
    .requiredOption("--model <id>", "requested OpenAI model identifier")
    .option(
      "--operations <list>",
      "comma-separated model operations",
      "strategy,draft,rewrite",
    )
    .action(async (options: OpenAIProposalOptions) => runCommand(options, async () => ({
      command_id: "connect.openai.propose",
      warnings: ["store:false is not zero provider retention."],
      next_actions: [
        "Resolve the required records and obtain a separate current provider capability grant.",
      ],
      data: proposeOpenAIProviderConfiguration({
        project_root: options.root,
        requested_model_id: options.model,
        operations: options.operations.split(","),
      }),
    })));
}
