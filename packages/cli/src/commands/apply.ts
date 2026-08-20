import { applyLocalTransaction, localArtifactRef, previewLocalTransaction } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface ApplyOptions extends RootOptions {
  transaction: string;
  approval?: string;
  preview?: boolean;
}

export function registerApply(program: Command): void {
  withRoot(program.command("apply").description("preview or apply an exact governed transaction"))
    .requiredOption("--transaction <id>", "transaction ID")
    .option("--approval <id>", "separately issued approval ID")
    .option("--preview", "prepare only; do not mutate product source")
    .action(async (options: ApplyOptions) => runCommand(options, async () => {
      if (options.preview === true) {
        const transaction = await previewLocalTransaction(options.root, options.transaction);
        return {
          command_id: "apply.preview",
          record_refs: [transaction.transaction_id, transaction.transaction_digest],
          audit_ref: localArtifactRef(options.root, `transactions/${options.transaction}.json`),
          data: transaction,
        };
      }
      if (options.approval === undefined) throw new Error("change_not_authorized:approval_missing");
      const result = await applyLocalTransaction(options.root, options.transaction, options.approval);
      return {
        command_id: "apply",
        record_refs: [result.apply_receipt.receipt_digest, result.verification_receipt.verification_id],
        audit_ref: localArtifactRef(options.root, `receipts/${options.transaction}.verify.json`),
        data: result,
      };
    }));
}
