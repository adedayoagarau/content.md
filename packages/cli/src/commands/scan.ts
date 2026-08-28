import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import {
  applyRegularUserImprovement,
  previewRegularUserImprovement,
  resolveRepositoryWorkspace,
  scanLocalProject,
} from "@contentmd/agent";
import {
  createContentImprovementBrief,
  createContentQualificationReviewPacket,
  evaluateCompletedContentQualificationReview,
  rankContentReviewFindings,
  canonicalJson,
  type ContentQualificationReviewPacket,
  type UserSuppliedImprovementContext,
} from "@contentmd/core";
import type { Command } from "commander";
import { runCommand } from "./shared.js";

interface ScanOptions {
  root: string;
  json?: boolean;
  summary?: boolean;
  workspace?: string;
  inspect?: string;
  improve?: string;
  context?: string;
  candidate?: string;
  previewPatch?: boolean;
  applyPatch?: string;
  yes?: boolean;
  reviewSample?: number;
  reviewOutput?: string;
  evaluateReview?: string;
}

function sampleSize(value: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 500) throw new Error("qualification_review_sample_size_invalid");
  return parsed;
}

function selectedFinding<T extends { finding_id: string }>(findings: T[], selector: string): T {
  const index = Number(selector);
  const selected = Number.isInteger(index) && index >= 1
    ? findings[index - 1]
    : findings.find((finding) => finding.finding_id === selector);
  if (selected === undefined) throw new Error(`finding_not_found:${selector}`);
  return selected;
}

async function readImprovementContext(path: string): Promise<UserSuppliedImprovementContext> {
  const parsed = JSON.parse(await readFile(path, "utf8")) as unknown;
  if (typeof parsed !== "object" || parsed === null) throw new Error("improvement_context_invalid");
  const record = parsed as Record<string, unknown>;
  if (
    typeof record.finding_ref !== "string" || record.provenance !== "user_supplied"
    || record.authority_effect !== "none" || typeof record.facts !== "object" || record.facts === null
    || Array.isArray(record.facts)
  ) throw new Error("improvement_context_invalid");
  if (!Object.values(record.facts as Record<string, unknown>).every((value) => typeof value === "string")) {
    throw new Error("improvement_context_invalid");
  }
  return record as unknown as UserSuppliedImprovementContext;
}

async function readCompletedReview(path: string): Promise<ContentQualificationReviewPacket> {
  try {
    const parsed = JSON.parse(await readFile(path, "utf8")) as unknown;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("qualification_review_packet_invalid");
    }
    return parsed as ContentQualificationReviewPacket;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("qualification_review_")) throw error;
    if ((error as NodeJS.ErrnoException).code === "ENOENT") throw error;
    throw new Error("qualification_review_packet_invalid");
  }
}

export function registerScan(program: Command): void {
  program.command("scan")
    .description("preview a compact inventory of qualified product content")
    .option("--root <path>", "project root", process.cwd())
    .option("--summary", "show the compact regular-user summary")
    .option("--workspace <path>", "scan one declared monorepo workspace")
    .option("--inspect <number-or-id>", "inspect one ranked finding and its qualified content")
    .option("--improve <number-or-id>", "prepare a non-mutating improvement brief for one ranked finding")
    .option("--context <json-file>", "user-supplied facts for the selected improvement")
    .option("--candidate <text>", "candidate expression to compare with the current content")
    .option("--preview-patch", "verify and preview an exact source patch without writing")
    .option("--apply-patch <transaction-digest>", "apply the exact previously previewed patch")
    .option("--yes", "confirm the exact local source mutation")
    .option("--review-sample <count>", "create a deterministic stratified qualification review packet", sampleSize)
    .option("--review-output <json-file>", "write the explicitly requested review packet file")
    .option("--evaluate-review <json-file>", "evaluate a completed qualification review packet")
    .option("--json", "emit the stable JSON envelope")
    .action(async (options: ScanOptions) => runCommand(options, async () => {
      const root = resolve(options.root);
      const controller = new AbortController();
      const cancel = (): void => controller.abort();
      process.once("SIGINT", cancel);
      let lastStage = "";
      let lastReported = 0;
      let result: Awaited<ReturnType<typeof scanLocalProject>>;
      let scope: Awaited<ReturnType<typeof resolveRepositoryWorkspace>>;
      try {
        if (options.json !== true) process.stderr.write("contentmd: selecting workspace\n");
        scope = await resolveRepositoryWorkspace(root, options.workspace);
        if (controller.signal.aborted) throw new Error("discovery_cancelled");
        result = await scanLocalProject(scope.project_root, {
          signal: controller.signal,
          repository_root: scope.repository_root,
          on_progress: (event) => {
            if (options.json === true) return;
            const stageChanged = event.stage !== lastStage;
            const enoughProgress = event.completed - lastReported >= 100;
            const finishedStage = event.total !== null && event.completed === event.total;
            if (!stageChanged && !enoughProgress && !finishedStage) return;
            lastStage = event.stage;
            lastReported = event.completed;
            const count = event.total === null ? "" : ` ${event.completed}/${event.total}`;
            process.stderr.write(`contentmd: ${event.stage.replaceAll("_", " ")}${count}\n`);
          },
        });
      } finally {
        process.removeListener("SIGINT", cancel);
      }
      const summary = result.content_inventory.summary;
      const topFindings = rankContentReviewFindings(result.content_inventory.units, 10);
      if (options.inspect !== undefined && options.improve !== undefined) {
        throw new Error("scan_action_invalid:choose_inspect_or_improve");
      }
      const selector = options.inspect ?? options.improve;
      const selected = selector === undefined ? null : selectedFinding(topFindings, selector);
      const selectedUnit = selected === null
        ? null
        : result.content_inventory.units.find((unit) => unit.qualification_id === selected.qualification_ref) ?? null;
      if (selected !== null && selectedUnit === null) throw new Error("finding_qualification_not_found");
      const improvementBrief = options.improve === undefined || selected === null || selectedUnit === null
        ? null
        : createContentImprovementBrief(selected, selectedUnit);
      if ((options.context === undefined) !== (options.candidate === undefined)) {
        throw new Error("improvement_input_invalid:context_and_candidate_required_together");
      }
      if ((options.context !== undefined || options.previewPatch === true || options.applyPatch !== undefined) && options.improve === undefined) {
        throw new Error("improvement_input_invalid:improve_selector_required");
      }
      if (options.previewPatch === true && options.context === undefined) {
        throw new Error("improvement_input_invalid:context_required_for_patch_preview");
      }
      if (options.applyPatch !== undefined && (options.context === undefined || options.candidate === undefined)) {
        throw new Error("improvement_input_invalid:context_and_candidate_required_for_apply");
      }
      if (options.applyPatch !== undefined && options.yes !== true) {
        throw new Error("regular_user_change_confirmation_required");
      }
      const improvement = improvementBrief === null || selected === null || selectedUnit === null
        || options.context === undefined || options.candidate === undefined
        ? null
        : await previewRegularUserImprovement({
          project_root: scope.project_root,
          finding: selected,
          unit: selectedUnit,
          brief: improvementBrief,
          context: await readImprovementContext(options.context),
          candidate_expression: options.candidate,
          include_patch: options.previewPatch === true || options.applyPatch !== undefined,
        });
      const applied = options.applyPatch === undefined || improvementBrief === null || selected === null
        || selectedUnit === null || options.context === undefined || options.candidate === undefined
        ? null
        : await applyRegularUserImprovement({
          project_root: scope.project_root,
          finding: selected,
          unit: selectedUnit,
          brief: improvementBrief,
          context: await readImprovementContext(options.context),
          candidate_expression: options.candidate,
          expected_transaction_digest: options.applyPatch,
          confirmed: options.yes === true,
        });
      if (options.reviewOutput !== undefined && options.reviewSample === undefined) {
        throw new Error("qualification_review_output_without_sample");
      }
      if ((options.reviewSample !== undefined || options.evaluateReview !== undefined) && selector !== undefined) {
        throw new Error("scan_action_invalid:review_or_finding_action_required");
      }
      if (options.reviewSample !== undefined && options.evaluateReview !== undefined) {
        throw new Error("scan_action_invalid:choose_review_sample_or_evaluation");
      }
      const reviewPacket = options.reviewSample === undefined
        ? null
        : createContentQualificationReviewPacket(result.content_inventory.units, options.reviewSample);
      if (reviewPacket !== null && options.reviewOutput !== undefined) {
        try {
          await writeFile(resolve(options.reviewOutput), `${canonicalJson(reviewPacket)}\n`, { flag: "wx" });
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === "EEXIST") {
            throw new Error("qualification_review_output_exists");
          }
          throw error;
        }
      }
      const completedPacket = options.evaluateReview === undefined
        ? null
        : await readCompletedReview(options.evaluateReview);
      const reviewEvaluation = completedPacket === null
        ? null
        : evaluateCompletedContentQualificationReview(completedPacket, result.content_inventory.units);
      return {
        command_id: applied !== null
          ? "scan.apply-improvement"
          : reviewEvaluation !== null
          ? "scan.review-evaluation"
          : reviewPacket !== null ? "scan.review-sample"
          : options.improve !== undefined
          ? "scan.improve"
          : options.inspect !== undefined ? "scan.inspect" : "scan.summary",
        record_refs: [
          ...(selected === null ? [] : [selected.finding_id]),
          ...(improvement === null ? [] : [improvement.comparison.comparison_id]),
          ...(improvement?.patch_preview === null || improvement?.patch_preview === undefined
            ? [] : [improvement.patch_preview.transaction_digest]),
          ...(reviewPacket === null ? [] : [reviewPacket.packet_digest]),
          ...(reviewEvaluation === null ? [] : [reviewEvaluation.review_digest]),
          ...(applied === null ? [] : [applied.record.apply_receipt.receipt_digest]),
        ],
        audit_ref: applied?.record_path ?? null,
        warnings: summary.uncertain_count > 0
          ? [`${summary.uncertain_count} content candidates need more context before qualification.`]
          : [],
        next_actions: applied !== null
          ? [`Run contentmd undo --transaction ${applied.record.transaction.transaction_digest} --root ${scope.project_root} --yes to restore the exact previous bytes.`]
          : reviewEvaluation !== null
          ? ["Inspect precision, recall, source-layer results, and every mismatch before changing qualification rules."]
          : reviewPacket !== null
            ? ["Have an independent reviewer fill reviewer_qualification, reviewer_role, and reviewer_notes, then run --evaluate-review <file>."]
          : improvement?.patch_preview !== null && improvement?.patch_preview !== undefined
          ? ["Review the exact diff. Applying it remains a separate authorized action."]
          : improvement !== null && improvement.comparison.status === "needs_revision"
            ? ["Revise the candidate or supply missing facts before requesting a patch preview."]
          : improvement !== null
            ? [`Rerun with --preview-patch to verify the exact source diff; no file will be changed.`]
          : improvementBrief !== null
          ? ["Establish the required facts, then draft and compare a proposed expression before applying any change."]
          : selected !== null
            ? [`Run contentmd scan --improve ${selected.finding_id} to prepare its evidence-bound improvement brief.`]
            : [
              "Run contentmd scan --inspect <number> to inspect a finding.",
              "Run contentmd discover --save only when you want to persist the raw discovery artifact.",
            ],
        data: {
          project_id: result.project_id,
          proposed_product_name: result.identity.proposed_name,
          repository_root: scope.repository_root,
          scanned_root: scope.project_root,
          workspace_selection: scope.selection,
          workspace_choices: scope.choices,
          inherited_context_sources: result.sources
            .filter((source) => source.source_type === "inherited_repository_context")
            .map((source) => source.locator),
          write_effect: applied === null ? "none" : "local_source_mutation",
          ...summary,
          top_findings: topFindings,
          inspection: selected === null ? null : { finding: selected, content_unit: selectedUnit },
          improvement_brief: improvementBrief,
          improvement_comparison: improvement?.comparison ?? null,
          patch_preview: improvement?.patch_preview ?? null,
          applied_change: applied === null ? null : {
            target_path: applied.record.transaction.target_path,
            transaction_digest: applied.record.transaction.transaction_digest,
            changed: applied.record.apply_receipt.changed,
            readback_verified: applied.record.apply_receipt.readback_verified,
            undo_status: applied.record.undo_status,
            record_path: applied.record_path,
            authority_effect: applied.record.authority_effect,
          },
          review_packet: reviewPacket,
          review_packet_output: options.reviewOutput === undefined ? null : resolve(options.reviewOutput),
          review_evaluation: reviewEvaluation,
        },
      };
    }));
}
