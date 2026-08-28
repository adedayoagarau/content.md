import { undoRegularUserImprovement } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface UndoOptions extends RootOptions {
  transaction: string;
  yes?: boolean;
}

export function registerUndo(program: Command): void {
  withRoot(program.command("undo").description("restore the exact bytes from a confirmed regular-user change"))
    .requiredOption("--transaction <digest>", "regular-user transaction digest")
    .option("--yes", "confirm the exact local rollback")
    .action(async (options: UndoOptions) => runCommand(options, async () => {
      const result = await undoRegularUserImprovement({
        project_root: options.root,
        transaction_digest: options.transaction,
        confirmed: options.yes === true,
      });
      return {
        command_id: "undo.regular-user-improvement",
        record_refs: [result.record.apply_receipt.receipt_digest, result.record.transaction.transaction_digest],
        audit_ref: result.record_path,
        next_actions: ["Rerun contentmd to confirm the restored content inventory."],
        data: {
          target_path: result.record.transaction.target_path,
          transaction_digest: result.record.transaction.transaction_digest,
          restored: true,
          readback_verified: true,
          undo_status: result.record.undo_status,
          authority_effect: "local_source_mutation_only",
        },
      };
    }));
}
