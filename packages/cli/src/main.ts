#!/usr/bin/env node
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command, CommanderError } from "commander";
import { registerApply } from "./commands/apply.js";
import { registerBridge } from "./commands/bridge.js";
import { registerBenchmark } from "./commands/benchmark.js";
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
import { registerScan } from "./commands/scan.js";
import { registerReview } from "./commands/review.js";
import { registerRuntime } from "./commands/runtime.js";
import { registerRewrite } from "./commands/rewrite.js";
import { registerServe } from "./commands/serve.js";
import { registerStart } from "./commands/start.js";
import { registerStrategy } from "./commands/strategy.js";
import { registerTask } from "./commands/task.js";
import { registerVerify } from "./commands/verify.js";
import { registerUninstall } from "./commands/uninstall.js";
import { registerUndo } from "./commands/undo.js";
import { registerUsecase } from "./commands/usecase.js";
import { createCommandResult, emitCommandResult } from "./output.js";

export function buildProgram(): Command {
  const program = new Command()
    .name("contentmd")
    .description("portable governed content-design agent")
    .version("0.1.0")
    .showHelpAfterError()
    .exitOverride();
  registerStart(program);
  registerInit(program);
  registerBridge(program);
  registerBenchmark(program);
  registerConnect(program);
  registerDoctor(program);
  registerDiscover(program);
  registerScan(program);
  registerModel(program);
  registerResearch(program);
  registerReview(program);
  registerUsecase(program);
  registerRuntime(program);
  registerTask(program);
  registerServe(program);
  registerStrategy(program);
  registerDraft(program);
  registerRewrite(program);
  registerDecision(program);
  registerLearn(program);
  registerDiff(program);
  registerApply(program);
  registerVerify(program);
  registerRollback(program);
  registerUndo(program);
  registerUninstall(program);
  return program;
}

export async function main(argv: string[]): Promise<void> {
  const effectiveArgv = argv.length <= 2 ? [...argv, "scan", "--summary"] : argv;
  try {
    await buildProgram().parseAsync(effectiveArgv);
  } catch (error) {
    if (!(error instanceof CommanderError)) throw error;
    if (error.code === "commander.helpDisplayed" || error.code === "commander.version") return;
    const wantsJson = effectiveArgv.includes("--json");
    emitCommandResult(createCommandResult({
      command_id: "command.parse",
      status: "invalid_input",
      findings: [{ code: error.code, message: error.message }],
      data: null,
    }), wantsJson);
  }
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined
  && import.meta.url !== undefined
  && fileURLToPath(import.meta.url) === resolve(invokedPath)) {
  void main(process.argv).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
