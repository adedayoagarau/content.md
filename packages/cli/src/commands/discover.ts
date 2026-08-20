import { discoverLocalProject, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerDiscover(program: Command): void {
  withRoot(program.command("discover").description("discover content occurrences"))
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const discovery = await discoverLocalProject(options.root);
      return {
        command_id: "discover",
        record_refs: discovery.occurrences.map((item) => item.occurrence_id),
        audit_ref: localArtifactRef(options.root, "discovery.json"),
        data: discovery,
      };
    }));
}
