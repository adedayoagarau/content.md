export const EXIT_CODES = {
  completed: 0,
  findings_present: 10,
  blocked_by_evidence: 20,
  denied_by_governance: 21,
  invalid_input: 22,
  unsupported_capability: 23,
  cancelled: 130,
  internal_failure: 30,
} as const;

export type CommandStatus = keyof typeof EXIT_CODES;

export function exitCodeForStatus(status: CommandStatus): number {
  return EXIT_CODES[status];
}
