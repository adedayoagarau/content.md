import { localArtifactRef, verifyLocalTransaction } from "@contentmd/agent";
import type { Command } from "commander";
import { runCommand, withRoot, type RootOptions } from "./shared.js";

interface VerifyOptions extends RootOptions { transaction: string }

export function registerVerify(program: Command): void {
  withRoot(program.command("verify").description("read back an applied transaction"))
    .requiredOption("--transaction <id>", "transaction ID")
    .action(async (options: VerifyOptions) => runCommand(options, async () => {
      const verification = await verifyLocalTransaction(options.root, options.transaction);
      return {
        command_id: "verify",
        record_refs: [verification.verification_id],
        audit_ref: localArtifactRef(options.root, `receipts/${options.transaction}.verify.json`),
        data: verification,
      };
    }));
}
