import { readFile } from "node:fs/promises";
import {
  compileProjectModel,
  createRepositoryInterpretationPacket,
  ingestRepositoryInterpretation,
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

  model.command("packet").description("emit a bounded IDE interpretation packet")
    .action(async (_options, command) => {
      const options = command.optsWithGlobals() as RootOptions;
      return runCommand(options, async () => {
      const project = await compileProjectModel({ project_root: options.root });
      const packet = createRepositoryInterpretationPacket(project);
      return {
        command_id: "model.packet",
        record_refs: [packet.packet_digest],
        data: packet,
      };
      });
    });

  model.command("ingest").description("ingest a cited proposed IDE interpretation")
    .requiredOption("--input <file>", "interpretation response JSON")
    .action(async (_options, command) => {
      const options = command.optsWithGlobals() as RootOptions & { input: string };
      return runCommand(options, async () => {
      const response = JSON.parse(await readFile(options.input, "utf8")) as unknown;
      const receipt = await ingestRepositoryInterpretation(options.root, response);
      return {
        command_id: "model.ingest",
        record_refs: [receipt.record_digest, receipt.receipt_digest],
        audit_ref: localArtifactRef(options.root, "repository-interpretation-receipt.json"),
        data: receipt,
      };
      });
    });

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
