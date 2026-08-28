import type { Command } from "commander";
import { createCommandResult, emitCommandResult, type CommandResultInput } from "../output.js";

export interface RootOptions {
  root: string;
  json?: boolean;
}

export function withRoot(command: Command): Command {
  return command.requiredOption("--root <path>", "project root").option("--json", "emit the stable JSON envelope");
}

export function requireProviderGrant(provider: string, grant: string | undefined): void {
  if (provider === "openai" && (grant === undefined || grant.length === 0)) {
    throw new Error("provider_grant_required:openai");
  }
}

export async function runCommand(
  options: { json?: boolean },
  operation: () => Promise<CommandResultInput<unknown>>,
): Promise<void> {
  try {
    emitCommandResult(createCommandResult(await operation()), options.json === true);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message === "discovery_cancelled"
      ? "cancelled"
      : message.startsWith("runtime_binding_not_authorized")
      || message.startsWith("runtime_operation_nonce_replayed")
      ? "denied_by_governance"
      : message.startsWith("runtime_capability_unsupported")
        ? "unsupported_capability"
        : message.startsWith("runtime_detection_inconclusive")
          || message.startsWith("runtime_canonical_commit_unavailable")
          || message.startsWith("runtime_replica_acknowledgement_missing")
          || message.startsWith("runtime_replica_fork_detected")
          || message.startsWith("qualification_review_incomplete")
          ? "blocked_by_evidence"
          : message.startsWith("runtime_binding_input_invalid")
            ? "invalid_input"
            : message.startsWith("change_not_authorized") || message.startsWith("mutation_")
              || message === "regular_user_change_confirmation_required"
              || message === "regular_user_undo_confirmation_required"
      || message.startsWith("provider_grant_required")
      ? "denied_by_governance"
      : message.startsWith("unsupported_provider") || message.startsWith("unsupported_capability")
        ? "unsupported_capability"
        : message.startsWith("workspace_") || message.startsWith("qualification_review_")
          || message.startsWith("regular_user_change_") || message.startsWith("regular_user_undo_")
          || message.includes("ENOENT") || message.includes("not_found") || message.includes("not_supported") || message.includes("invalid")
          ? "invalid_input"
          : "internal_failure";
    emitCommandResult(createCommandResult({
      command_id: "command.error",
      status,
      findings: [{ code: message.split(":", 1)[0], message }],
      next_actions: message.startsWith("workspace_selection_required:")
        ? [`Rerun with --workspace <path>. Available application workspaces: ${message.slice("workspace_selection_required:".length)}.`]
        : status === "denied_by_governance"
        ? ["Provide a separate current authorization record bound to the exact transaction."]
        : [],
      data: null,
    }), options.json === true);
  }
}
