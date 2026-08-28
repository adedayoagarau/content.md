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
  if (result.command_id.startsWith("scan.") && typeof result.data === "object" && result.data !== null) {
    const data = result.data as Record<string, unknown>;
    process.stdout.write(`product: ${String(data.proposed_product_name ?? data.project_id ?? "unknown")}\n`);
    process.stdout.write(`occurrences: ${String(data.occurrence_count ?? 0)}\n`);
    process.stdout.write(`qualified content: ${String(data.qualified_count ?? 0)}\n`);
    process.stdout.write(`microcopy: ${String(data.microcopy_count ?? 0)}\n`);
    process.stdout.write(`needs context: ${String(data.uncertain_count ?? 0)}\n`);
    process.stdout.write(`excluded noise: ${String(data.rejected_count ?? 0)}\n`);
    process.stdout.write("write effect: none (preview only)\n");
    if (Array.isArray(data.top_findings) && data.top_findings.length > 0) {
      process.stdout.write("top findings:\n");
      for (const [index, rawFinding] of data.top_findings.entries()) {
        const finding = rawFinding as Record<string, unknown>;
        process.stdout.write(`${index + 1}. [${String(finding.severity)}] ${String(finding.title)} — ${String(finding.source_artifact)}\n`);
      }
    }
    const inspection = typeof data.inspection === "object" && data.inspection !== null
      ? data.inspection as Record<string, unknown>
      : null;
    if (inspection !== null) {
      const finding = inspection.finding as Record<string, unknown>;
      const unit = inspection.content_unit as Record<string, unknown>;
      const safe = (value: unknown): string => String(value).replace(/[\u0000-\u001f\u007f-\u009f]/gu, " ").slice(0, 500);
      process.stdout.write("inspection:\n");
      process.stdout.write(`current: ${safe(unit.expression)}\n`);
      process.stdout.write(`source: ${safe(unit.source_artifact)}\n`);
      process.stdout.write(`why: ${safe(finding.rationale)}\n`);
    }
    const brief = typeof data.improvement_brief === "object" && data.improvement_brief !== null
      ? data.improvement_brief as Record<string, unknown>
      : null;
    if (brief !== null) {
      process.stdout.write("improvement brief:\n");
      for (const fact of Array.isArray(brief.required_facts) ? brief.required_facts : []) {
        process.stdout.write(`required fact: ${String(fact)}\n`);
      }
      process.stdout.write("mutation effect: none\n");
    }
    const comparison = typeof data.improvement_comparison === "object" && data.improvement_comparison !== null
      ? data.improvement_comparison as Record<string, unknown>
      : null;
    if (comparison !== null) {
      process.stdout.write(`comparison: ${String(comparison.status)}\n`);
      for (const rawCheck of Array.isArray(comparison.checks) ? comparison.checks : []) {
        const check = rawCheck as Record<string, unknown>;
        process.stdout.write(`${check.passed === true ? "pass" : "needs revision"}: ${String(check.check)}\n`);
      }
    }
    const patch = typeof data.patch_preview === "object" && data.patch_preview !== null
      ? data.patch_preview as Record<string, unknown>
      : null;
    if (patch !== null) {
      process.stdout.write("patch preview (not applied):\n");
      process.stdout.write(String(patch.unified_diff).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/gu, " ").slice(0, 10_000));
    }
    const reviewPacket = typeof data.review_packet === "object" && data.review_packet !== null
      ? data.review_packet as Record<string, unknown>
      : null;
    if (reviewPacket !== null) {
      process.stdout.write(`review sample: ${String(reviewPacket.sample_size)} items across ${String(reviewPacket.strata_count)} strata\n`);
      process.stdout.write("review status: awaiting independent review\n");
    }
    const evaluation = typeof data.review_evaluation === "object" && data.review_evaluation !== null
      ? data.review_evaluation as Record<string, unknown>
      : null;
    if (evaluation !== null) {
      const qualified = evaluation.evaluation as Record<string, unknown>;
      const binary = qualified.qualified as Record<string, unknown>;
      process.stdout.write(`reviewed items: ${String(evaluation.completed_item_count)}\n`);
      process.stdout.write(`qualification precision: ${String(binary.precision)}\n`);
      process.stdout.write(`qualification recall: ${String(binary.recall)}\n`);
    }
  }
  for (const warning of result.warnings) process.stdout.write(`warning: ${warning}\n`);
  for (const nextAction of result.next_actions) process.stdout.write(`next: ${nextAction}\n`);
}
