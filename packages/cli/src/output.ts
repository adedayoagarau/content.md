import { canonicalJson } from "@contentmd/core";
import { exitCodeForStatus, type CommandStatus } from "./exit-codes.js";

export interface CommandResult<T = unknown> {
  schema_version: "contentmd.command-result/0.1.0";
  command_id: string;
  status: CommandStatus;
  exit_code: number;
  record_refs: string[];
  findings: unknown[];
  warnings: string[];
  next_actions: string[];
  audit_ref: string | null;
  data: T;
}

export interface CommandResultInput<T> {
  command_id: string;
  status?: CommandStatus;
  record_refs?: string[];
  findings?: unknown[];
  warnings?: string[];
  next_actions?: string[];
  audit_ref?: string | null;
  data: T;
}

export function createCommandResult<T>(input: CommandResultInput<T>): CommandResult<T> {
  const status = input.status ?? "completed";
  return {
    schema_version: "contentmd.command-result/0.1.0",
    command_id: input.command_id,
    status,
    exit_code: exitCodeForStatus(status),
    record_refs: input.record_refs ?? [],
    findings: input.findings ?? [],
    warnings: input.warnings ?? [],
    next_actions: input.next_actions ?? [],
    audit_ref: input.audit_ref ?? null,
    data: input.data,
  };
}

export function emitCommandResult(result: CommandResult, json: boolean): void {
  process.exitCode = result.exit_code;
  if (json) {
    process.stdout.write(canonicalJson(result));
    return;
  }

  process.stdout.write(`${result.command_id}: ${result.status}\n`);
  for (const warning of result.warnings) process.stdout.write(`warning: ${warning}\n`);
  for (const nextAction of result.next_actions) process.stdout.write(`next: ${nextAction}\n`);
}
