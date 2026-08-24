import { ingestLocalResearch, localArtifactRef } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface ResearchOptions extends RootOptions { packet: string }

export function registerResearch(program: Command): void {
  const research = program.command("research").description("manage governed pattern research");
  withRoot(research.command("ingest").description("ingest a frozen pattern packet"))
    .requiredOption("--packet <path>", "frozen packet path")
    .action(async (options: ResearchOptions) => runCommand(options, async () => {
      const result = await ingestLocalResearch(options.root, options.packet);
      return {
        command_id: "research.ingest",
        record_refs: result.records.map((record) => record.record_id),
        audit_ref: localArtifactRef(options.root, "research.json"),
        data: result,
      };
    }));
}
