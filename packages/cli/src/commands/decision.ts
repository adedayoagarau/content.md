import { localArtifactRef, recordLocalDecision } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface DecisionOptions extends RootOptions { file: string }

export function registerDecision(program: Command): void {
  const decision = program.command("decision").description("record human content decisions");
  withRoot(decision.command("record").description("append one exact decision"))
    .requiredOption("--file <path>", "decision input JSON")
    .action(async (options: DecisionOptions) => runCommand(options, async () => {
      const record = await recordLocalDecision(options.root, options.file) as { decision_id?: string };
      return {
        command_id: "decision.record",
        record_refs: record.decision_id === undefined ? [] : [record.decision_id],
        audit_ref: localArtifactRef(options.root, "latest-decision.json"),
        data: record,
      };
    }));
}
