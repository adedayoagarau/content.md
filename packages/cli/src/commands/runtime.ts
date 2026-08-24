import {
  bindRuntime,
  inspectRuntime,
  proposeRuntime,
} from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface RuntimeBindOptions extends RootOptions {
  proposal: string;
  decision: string;
}

export function registerRuntime(program: Command): void {
  const runtime = program.command("runtime")
    .description("inspect, propose, or bind a governed portable runtime");

  withRoot(runtime.command("inspect").description("inspect runtime evidence without effects"))
    .action(async (options: RootOptions) => runCommand(options, async () => ({
      command_id: "runtime.inspect",
      data: await inspectRuntime(options.root),
    })));

  withRoot(runtime.command("propose").description("persist one authority-free runtime proposal"))
    .action(async (options: RootOptions) => runCommand(options, async () => ({
      command_id: "runtime.propose",
      data: await proposeRuntime(options.root),
    })));

  withRoot(runtime.command("bind").description("activate an independently approved runtime"))
    .requiredOption("--proposal <record-path>", "content-addressed runtime proposal record")
    .requiredOption("--decision <record-path>", "separately issued runtime binding decision")
    .action(async (options: RuntimeBindOptions) => runCommand(options, async () => {
      const receipt = await bindRuntime({
        project_root: options.root,
        proposal_path: options.proposal,
        decision_path: options.decision,
      });
      return {
        command_id: "runtime.bind",
        record_refs: [receipt.activation_event_ref],
        audit_ref: receipt.activation_event_ref,
        data: receipt,
      };
    }));
}
