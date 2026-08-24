#!/usr/bin/env node
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command, CommanderError } from "commander";
import { registerApply } from "./commands/apply.js";
import { registerBridge } from "./commands/bridge.js";
import { registerConnect } from "./commands/connect.js";
import { registerDecision } from "./commands/decision.js";
import { registerDiff } from "./commands/diff.js";
import { registerDiscover } from "./commands/discover.js";
import { registerDoctor } from "./commands/doctor.js";
import { registerDraft } from "./commands/draft.js";
import { registerInit } from "./commands/init.js";
import { registerLearn } from "./commands/learn.js";
import { registerModel } from "./commands/model.js";
import { registerResearch } from "./commands/research.js";
import { registerRollback } from "./commands/rollback.js";
import { registerReview } from "./commands/review.js";
import { registerRuntime } from "./commands/runtime.js";
import { registerRewrite } from "./commands/rewrite.js";
import { registerStrategy } from "./commands/strategy.js";
import { registerVerify } from "./commands/verify.js";
import { registerUninstall } from "./commands/uninstall.js";
import { createCommandResult, emitCommandResult } from "./output.js";

export function buildProgram(): Command {
  const program = new Command()
    .name("contentmd")
    .description("portable governed content-design agent")
    .version("0.1.0")
    .showHelpAfterError()
    .exitOverride();
  registerInit(program);
  registerBridge(program);
  registerConnect(program);
  registerDoctor(program);
  registerDiscover(program);
  registerModel(program);
  registerResearch(program);
  registerReview(program);
  registerRuntime(program);
  registerStrategy(program);
  registerDraft(program);
  registerRewrite(program);
  registerDecision(program);
  registerLearn(program);
  registerDiff(program);
  registerApply(program);
  registerVerify(program);
  registerRollback(program);
  registerUninstall(program);
  return program;
}

export async function main(argv: string[]): Promise<void> {
  try {
    await buildProgram().parseAsync(argv);
  } catch (error) {
    if (!(error instanceof CommanderError)) throw error;
    if (error.code === "commander.helpDisplayed" || error.code === "commander.version") return;
    const wantsJson = argv.includes("--json");
    emitCommandResult(createCommandResult({
      command_id: "command.parse",
      status: "invalid_input",
      findings: [{ code: error.code, message: error.message }],
      data: null,
    }), wantsJson);
  }
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && fileURLToPath(import.meta.url) === resolve(invokedPath)) {
  await main(process.argv);
}
