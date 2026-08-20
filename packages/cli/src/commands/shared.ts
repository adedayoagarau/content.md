import type { Command } from "commander";
import { createCommandResult, emitCommandResult, type CommandResultInput } from "../output.js";

export interface RootOptions {
  root: string;
  json?: boolean;
}

export function withRoot(command: Command): Command {
  return command.requiredOption("--root <path>", "project root").option("--json", "emit the stable JSON envelope");
}

export async function runCommand(
  options: { json?: boolean },
  operation: () => Promise<CommandResultInput<unknown>>,
): Promise<void> {
  try {
    emitCommandResult(createCommandResult(await operation()), options.json === true);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message.startsWith("change_not_authorized") || message.startsWith("mutation_")
      ? "denied_by_governance"
      : message.startsWith("unsupported_provider") || message.startsWith("unsupported_capability")
        ? "unsupported_capability"
        : message.includes("ENOENT") || message.includes("not_found") || message.includes("not_supported") || message.includes("invalid")
          ? "invalid_input"
          : "internal_failure";
    emitCommandResult(createCommandResult({
      command_id: "command.error",
      status,
      findings: [{ code: message.split(":", 1)[0], message }],
      next_actions: status === "denied_by_governance"
        ? ["Provide a separate current authorization record bound to the exact transaction."]
        : [],
      data: null,
    }), options.json === true);
  }
}
