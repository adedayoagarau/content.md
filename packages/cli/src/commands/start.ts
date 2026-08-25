import { planAdoption, runDoctor } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

export function registerStart(program: Command): void {
  withRoot(program.command("start").description("plan governed adoption and report readiness without writing files"))
    .action(async (options: RootOptions) => runCommand(options, async () => {
      const [doctor, adoption] = await Promise.all([
        runDoctor(options.root),
        planAdoption(options.root),
      ]);
      const needsAdoption = doctor.overall_status === "not_adopted";
      return {
        command_id: "start",
        status: needsAdoption ? "blocked_by_evidence" as const : "completed" as const,
        record_refs: [adoption.plan_digest],
        next_actions: needsAdoption
          ? [
              `Review the adoption plan, then run contentmd init --yes --root ${adoption.project_root} --json to approve those exact local files.`,
            ]
          : ["The project contract is present. Run contentmd doctor before material content work if governance status is unclear."],
        data: { doctor, adoption },
      };
    }));
}
