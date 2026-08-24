import { localArtifactRef, rollbackLocalTransaction } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface RollbackOptions extends RootOptions { transaction: string; approval: string }

export function registerRollback(program: Command): void {
  withRoot(program.command("rollback").description("restore exact captured bytes under separate authority"))
    .requiredOption("--transaction <id>", "transaction ID")
    .requiredOption("--approval <id>", "separately issued rollback approval ID")
    .action(async (options: RollbackOptions) => runCommand(options, async () => {
      const result = await rollbackLocalTransaction(options.root, options.transaction, options.approval);
      return {
        command_id: "rollback",
        record_refs: [result.rollback_receipt.receipt_digest],
        audit_ref: localArtifactRef(options.root, `receipts/${options.transaction}.rollback.json`),
        data: result,
      };
    }));
}
