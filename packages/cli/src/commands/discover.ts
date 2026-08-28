import { discoverLocalProject, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerDiscover(program: Command): void {
  withRoot(program.command("discover").description("discover content occurrences"))
    .option("--save", "persist discovery under .contentmd/runtime")
    .action(async (options: RootOptions & { save?: boolean }) => runCommand(options, async () => {
      const discovery = await discoverLocalProject(options.root, { save: options.save === true });
      return {
        command_id: "discover",
        record_refs: discovery.occurrences.map((item) => item.occurrence_id),
        audit_ref: options.save === true ? localArtifactRef(options.root, "discovery.json") : null,
        next_actions: options.save === true
          ? ["Run contentmd scan --summary to inspect qualified product content."]
          : ["Review the preview, then rerun with --save to persist this discovery."],
        data: discovery,
      };
    }));
}
