import { access, mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import {
  previewFilesystemChange,
  verifyFilesystemChange,
  type FilesystemApplyReceipt,
  type PreparedChangeTransaction,
} from "@contentmd/adapter-filesystem";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { reviewContent, type ReviewReport } from "@contentmd/evaluation";
import type { AuthorizationInput } from "@contentmd/governance";
import { recordContentDecision, type ContentDecisionInput } from "@contentmd/learning";
import { SqliteEventStore } from "@contentmd/memory";
import { RecordedModelProvider } from "@contentmd/model-provider-sdk";
import { ingestPatternPacket, type PatternIngestResult } from "@contentmd/research";
import {
  createContentTaskPacket,
  proposeContentDraft,
  proposeContentRewrite,
  proposeContentStrategy,
  type ContentDraftProposal,
  type ContentRewriteProposal,
  type ContentStrategyProposal,
} from "@contentmd/writer";
import { executeAdoption, planAdoption, previewUninstall, type AdoptionReceipt } from "./adoption.js";
import {
  executeGovernedChange,
  executeGovernedRollback,
  type GovernedChangeResult,
  type GovernedRollbackResult,
} from "./change-workflow.js";
import { runDoctor, type DoctorReport } from "./doctor.js";
import { compileProjectModel, type ProjectModelResult } from "./model-workflow.js";

const RUNTIME_DIRECTORY = ".contentmd/runtime";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function writeJsonAtomic(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${randomUUID()}.tmp`;
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  try {
    handle = await open(temporary, "wx", 0o600);
    await handle.writeFile(canonicalJson(value), "utf8");
    await handle.sync();
    await handle.close();
    handle = null;
    await rename(temporary, path);
  } catch (error) {
    if (handle !== null) await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function runtimePath(root: string, name: string): string {
  return join(root, RUNTIME_DIRECTORY, name);
}

export async function initializeLocalProject(root: string): Promise<AdoptionReceipt> {
  const plan = await planAdoption(root);
  const receipt = await executeAdoption(plan, {
    approval_id: `approval.local-adoption.${plan.plan_digest.slice(0, 16)}`,
    plan_digest: plan.plan_digest,
    approved_paths: plan.creates.map((item) => item.relative_path),
    status: "current",
  });
  await mkdir(join(root, RUNTIME_DIRECTORY), { recursive: true });
  await writeJsonAtomic(runtimePath(root, "adoption-receipt.json"), receipt);
  return receipt;
}

export async function diagnoseLocalProject(root: string): Promise<DoctorReport> {
  return runDoctor(root);
}

export async function discoverLocalProject(root: string): Promise<ProjectModelResult["discovery"]> {
  const model = await compileProjectModel({ project_root: root });
  await writeJsonAtomic(runtimePath(root, "discovery.json"), model.discovery);
  return model.discovery;
}

export async function modelLocalProject(root: string): Promise<ProjectModelResult> {
  const model = await compileProjectModel({ project_root: root });
  await writeJsonAtomic(runtimePath(root, "model.json"), model);
  return model;
}

export async function ingestLocalResearch(root: string, packet: string): Promise<PatternIngestResult> {
  const result = await ingestPatternPacket(packet);
  await writeJsonAtomic(runtimePath(root, "research.json"), result);
  return result;
}

function productFactsFromSources(model: ProjectModelResult): {
  payment_outcome_after_submission: "unknown_possible" | "failure_confirmed" | "not_established";
  workspace_delete_effect: "local_only" | "cancels_provider_attempt" | "not_established";
} {
  const text = model.sources.map((source) => source.content).join("\n").toLowerCase();
  return {
    payment_outcome_after_submission: text.includes("result can be unknown")
      ? "unknown_possible"
      : text.includes("payment failure is confirmed")
        ? "failure_confirmed"
        : "not_established",
    workspace_delete_effect: text.includes("does not cancel or reverse a provider attempt")
      ? "local_only"
      : text.includes("cancels the provider attempt")
        ? "cancels_provider_attempt"
        : "not_established",
  };
}

export async function reviewLocalProject(root: string): Promise<ReviewReport> {
  const model = await modelLocalProject(root);
  const report = reviewContent({
    project_id: model.project_id,
    occurrences: model.discovery.occurrences,
    evidence_refs: [...model.sources.map((source) => source.source_id), model.discovery.scan_digest],
    product_facts: productFactsFromSources(model),
  });
  await writeJsonAtomic(runtimePath(root, "review.json"), report);
  return report;
}

function fixtureTask() {
  return createContentTaskPacket({
    task_id: "task.fixture.checkout-content",
    product_context_refs: ["product.beacon"],
    audience_job_refs: ["audience.merchant-content-designer", "job.inspect-payment-states"],
    journey_state_refs: ["journey.checkout", "state.payment-outcome-unknown"],
    semantic_message_ref: "message.safe-payment-recovery",
    required_fact_refs: ["fact.payment-outcome-can-be-unknown", "fact.workspace-delete-local-only"],
    prohibited_claims: ["smartest", "guaranteed outcome", "external publication authority"],
    consequence: "A second payment attempt may duplicate a still-processing attempt.",
    recovery: "Check the submitted payment status before another attempt.",
    channel: "web",
    locale: "en-US",
    risk: "high",
    evidence_refs: ["source.product", "source.design", "review.fixture"],
    acceptance_criteria: [
      "Do not declare failure when the outcome is unknown.",
      "Do not invite another payment before status verification.",
      "Name destructive actions and their affected object.",
    ],
  });
}

async function recordedProvider(root: string): Promise<RecordedModelProvider> {
  return RecordedModelProvider.fromFile(join(root, ".contentmd-test/recorded-model-responses.jsonl"));
}

export async function createLocalStrategy(root: string, providerId: string): Promise<ContentStrategyProposal> {
  if (providerId !== "recorded") throw new Error(`unsupported_provider:${providerId}`);
  const strategy = await proposeContentStrategy(await recordedProvider(root), {
    task: fixtureTask(),
    review_finding_refs: ["finding.unsupported-claim", "finding.state-mismatch", "finding.unsafe-retry"],
    pattern_refs: ["pattern.recovery.unknown-outcome", "pattern.navigation.stable-destination-name"],
  });
  await writeJsonAtomic(runtimePath(root, "strategy.json"), strategy);
  return strategy;
}

export async function createLocalDraft(root: string, providerId: string): Promise<ContentDraftProposal> {
  if (providerId !== "recorded") throw new Error(`unsupported_provider:${providerId}`);
  const strategy = await readJson<ContentStrategyProposal>(runtimePath(root, "strategy.json"));
  const draft = await proposeContentDraft(await recordedProvider(root), { task: fixtureTask(), strategy });
  await writeJsonAtomic(runtimePath(root, "draft.json"), draft);
  return draft;
}

export async function createLocalRewrite(root: string, providerId: string): Promise<ContentRewriteProposal> {
  if (providerId !== "recorded") throw new Error(`unsupported_provider:${providerId}`);
  const strategy = await readJson<ContentStrategyProposal>(runtimePath(root, "strategy.json"));
  const draft = await readJson<ContentDraftProposal>(runtimePath(root, "draft.json"));
  const rewrite = await proposeContentRewrite(await recordedProvider(root), { task: fixtureTask(), strategy, draft });
  await writeJsonAtomic(runtimePath(root, "rewrite.json"), rewrite);
  return rewrite;
}

export async function recordLocalDecision(root: string, file: string): Promise<unknown> {
  const decisionInput = await readJson<Omit<ContentDecisionInput, "store" | "stream_id" | "expected_head_digest">>(file);
  const store = new SqliteEventStore(runtimePath(root, "events.sqlite"), {
    permitted_data_classes: [decisionInput.data_class],
  });
  try {
    const streamId = `decision-stream.${decisionInput.project_id}`;
    const head = await store.getHead(streamId);
    const decision = await recordContentDecision({
      ...decisionInput,
      store,
      stream_id: streamId,
      expected_head_digest: head?.event_digest ?? null,
    });
    await writeJsonAtomic(runtimePath(root, "latest-decision.json"), decision);
    return decision;
  } finally {
    store.close();
  }
}

export async function evaluateLocalLearning(root: string): Promise<{
  disposition: "not_ready" | "not_authorized";
  reason: string;
}> {
  const permissionPath = join(root, ".contentmd/governance/learning-permission.json");
  if (!(await exists(permissionPath))) {
    return { disposition: "not_authorized", reason: "learning_data_not_authorized" };
  }
  return { disposition: "not_ready", reason: "insufficient_supporting_decisions" };
}

export async function localDiff(root: string, proposalId: string): Promise<{
  proposal_id: string;
  diffs: ContentRewriteProposal["diffs"];
  source_proposal_ref: string;
}> {
  const rewrite = await readJson<ContentRewriteProposal>(runtimePath(root, "rewrite.json"));
  if (proposalId !== "prop_fixture_delete_workspace_v1") throw new Error(`proposal_not_found:${proposalId}`);
  return { proposal_id: proposalId, diffs: rewrite.diffs, source_proposal_ref: rewrite.proposal_id };
}

export async function previewLocalTransaction(root: string, transactionId: string): Promise<PreparedChangeTransaction> {
  if (transactionId !== "txn_fixture_delete_workspace_v1") throw new Error(`transaction_not_supported:${transactionId}`);
  const rewrite = await readJson<ContentRewriteProposal>(runtimePath(root, "rewrite.json"));
  const diff = rewrite.diffs[0];
  if (diff === undefined) throw new Error("rewrite_has_no_diff");
  const transaction = await previewFilesystemChange({
    project_root: root,
    operation_id: "operation.fixture.apply",
    transaction_id: transactionId,
    proposal_id: "prop_fixture_delete_workspace_v1",
    decision_id: "dec_fixture_delete_workspace_v1",
    approval_id: "apr_fixture_delete_workspace_v1",
    verification_id: "verify_fixture_delete_workspace_v1",
    target_path: diff.source_artifact,
    additional_target_paths: [],
    line: diff.line,
    column: diff.column,
    before: diff.before,
    after: diff.after,
  });
  await writeJsonAtomic(runtimePath(root, `transactions/${transactionId}.json`), transaction);
  return transaction;
}

export async function applyLocalTransaction(
  root: string,
  transactionId: string,
  approvalId: string,
): Promise<GovernedChangeResult> {
  const transaction = await readJson<PreparedChangeTransaction>(runtimePath(root, `transactions/${transactionId}.json`));
  const authorization = await readJson<AuthorizationInput>(join(root, `.contentmd/governance/approvals/${approvalId}.json`));
  const result = await executeGovernedChange({ project_root: root, transaction, authorization_input: authorization });
  await writeJsonAtomic(runtimePath(root, `receipts/${transactionId}.apply.json`), result.apply_receipt);
  await writeJsonAtomic(runtimePath(root, `receipts/${transactionId}.verify.json`), result.verification_receipt);
  return result;
}

export async function verifyLocalTransaction(root: string, transactionId: string) {
  const transaction = await readJson<PreparedChangeTransaction>(runtimePath(root, `transactions/${transactionId}.json`));
  const receipt = await readJson<FilesystemApplyReceipt>(runtimePath(root, `receipts/${transactionId}.apply.json`));
  const verification = await verifyFilesystemChange({ project_root: root, transaction, apply_receipt: receipt });
  await writeJsonAtomic(runtimePath(root, `receipts/${transactionId}.verify.json`), verification);
  return verification;
}

export async function rollbackLocalTransaction(
  root: string,
  transactionId: string,
  approvalId: string,
): Promise<GovernedRollbackResult> {
  const transaction = await readJson<PreparedChangeTransaction>(runtimePath(root, `transactions/${transactionId}.json`));
  const applyReceipt = await readJson<FilesystemApplyReceipt>(runtimePath(root, `receipts/${transactionId}.apply.json`));
  const authorization = await readJson<AuthorizationInput>(join(root, `.contentmd/governance/approvals/${approvalId}.json`));
  const result = await executeGovernedRollback({
    project_root: root,
    transaction,
    apply_receipt: applyReceipt,
    authorization_input: authorization,
  });
  await writeJsonAtomic(runtimePath(root, `receipts/${transactionId}.rollback.json`), result.rollback_receipt);
  return result;
}

export async function previewLocalUninstall(root: string) {
  return previewUninstall(root);
}

export function localArtifactRef(root: string, name: string): string {
  return runtimePath(root, name);
}

export function localArtifactDigest(value: unknown): string {
  return sha256Canonical(value);
}
