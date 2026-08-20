import { localArtifactRef, modelLocalProject } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerModel(program: Command): void {
  withRoot(program.command("model").description("compile the content context graph"))
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const result = await modelLocalProject(options.root);
      return {
        command_id: "model",
        record_refs: result.graph.nodes.map((node) => node.node_id),
        audit_ref: localArtifactRef(options.root, "model.json"),
        data: result,
      };
    }));
}
