import { access, mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import {
  type FilesystemApplyReceipt,
  type PreparedChangeTransaction,
} from "@contentmd/adapter-filesystem";
import {
  canonicalJson,
  decodeCanonicalDag,
  encodeCanonicalDag,
  sha256Canonical,
  type CanonicalDag,
} from "@contentmd/core";
import {
  reviewContent,
  reviewUxWriting,
  reviewUxWritingRepairCandidate,
  type ReviewReport,
  type UxWritingReviewRequest,
  type UxWritingReviewResult,
  type UxWritingRulePack,
  type UxWritingRepairBrief,
} from "@contentmd/evaluation";
import type { AuthorizationInput } from "@contentmd/governance";
import {
  admitPairwiseRuntime,
  createSimulatedPromotionDecision,
  exportEvaluationSimulatorSnapshot,
  recordContentDecision,
  restoreEvaluationSimulatorVault,
  type ContentDecisionInput,
  type ContentDecisionRecord,
  type EvaluationRunResult,
  type EvaluationSimulatorSnapshot,
  type DriftDatasetReplay,
  type DriftObservation,
  type LearningDriftReport,
  type LearningDriftResult,
  type LearningDatasetTrainingReplay,
  type PairwiseCodeManifest,
  type PairwiseFeatureMatrixReplay,
  type PairwiseRuntimeProfile,
  type PairwiseTrainingResult,
  type SealedTestReplay,
  type ShadowOutcomeReplay,
  type SimulatedBindingProjection,
  type SimulatedPromotionDecision,
  type SimulatedBindingTransitionResult,
  type SimulatedCurrentnessWitness,
  type SimulatorFaultRule,
  type RollbackTargetReplay,
  type Task6ObjectRef,
  type VerifyPairwiseCandidateInput,
  type VerifiedRankingModel,
  trainPairwiseLogistic,
  verifyLearningDatasetForTraining,
  verifyPairwiseCodeManifest,
  verifyPairwiseFeatureMatrix,
  verifyPairwiseCandidate,
  verifyRankingModel,
  verifySealedTestReplay,
} from "@contentmd/learning";
import { RecordedModelProvider } from "@contentmd/model-provider-sdk";
import { ingestPatternPacket, type PatternIngestResult } from "@contentmd/research";
import {
  GovernedRuntimeAuthorizationResolver,
  LocalAuthorizedEventStoreFactory,
  LocalRuntimeOperationAuthority,
  LocalRuntimeSqliteLedger,
  type GovernedRuntimeAuthorizationRecord,
} from "@contentmd/runtime-local";
import {
  RuntimeError,
  type AuthorizedAppendOnlyEventStore,
  type BoundRuntimeRecordRef,
  type RuntimeBinding,
} from "@contentmd/runtime-sdk";
import {
  proposeContentDraft,
  proposeContentRewrite,
  proposeContentStrategy,
  type ContentDraftProposal,
  type ContentRewriteProposal,
  type ContentStrategyProposal,
  type ContentTaskPacket,
  type WriterModelExecutionContext,
} from "@contentmd/writer";
import { executeAdoption, planAdoption, previewUninstall, type AdoptionReceipt } from "./adoption.js";
import {
  assertGovernedTaskChangeBinding,
  executeGovernedChange,
  executeGovernedRollback,
  previewGovernedTaskChange,
  verifyGovernedTaskReadback,
  type GovernedChangeResult,
  type GovernedRollbackResult,
} from "./change-workflow.js";
import { runDoctor, type DoctorReport } from "./doctor.js";
import { FilesystemRuntimeArtifactStore } from "./local-artifacts.js";
import { compileProjectModel, type CompileProjectModelRequest, type ProjectModelResult } from "./model-workflow.js";
import {
  readPreparedContentTask,
  readReviewedIdeCandidate,
  type PreparedContentTask,
  type ReviewedIdeCandidate,
} from "./task-workflow.js";
import {
  selectGovernedDraftAlternative,
  type GovernedDraftSelection,
} from "./draft-selection.js";
import {
  runLearningDatasetPhase,
  runLearningDriftPhase,
  runLearningEvaluationPhase,
  runLearningExamplesPhase,
  runLearningPromotionPhase,
  runLearningRollbackPhase,
  runLearningShadowPhase,
  runLearningStatusPhase,
  runLearningTrainingPhase,
  type LearningDatasetPhaseData,
  type LearningEvaluationPhaseData,
  type LearningDriftPhaseData,
  type LearningExamplesPhaseData,
  type LearningPromotionPhaseData,
  type LearningRollbackPhaseData,
  type LearningShadowPhaseData,
  type LearningWorkflowAuthority,
  type LearningWorkflowPhaseResult,
  type LearningWorkflowStatusData,
  type RunLearningDatasetPhaseInput,
  type RunLearningEvaluationPhaseInput,
  type RunLearningDriftPhaseInput,
  type RunLearningExamplesPhaseInput,
  type RunLearningPromotionPhaseInput,
  type RunLearningRollbackPhaseInput,
  type RunLearningShadowPhaseInput,
  type RunLearningTrainingPhaseInput,
} from "./learning-workflow.js";

const RUNTIME_DIRECTORY = ".contentmd/runtime";
const LEARNING_TRAINING_ARTIFACT_PATH = "learning-training-result.dag.json";
const LEARNING_EVALUATION_ARTIFACT_PATH = "learning-evaluation-result.dag.json";
const LEARNING_SHADOW_ARTIFACT_PATH = "learning-shadow-result.dag.json";
const LEARNING_PROMOTION_ARTIFACT_PATH = "learning-promotion-result.dag.json";
const LEARNING_DRIFT_ARTIFACT_PATH = "learning-drift-result.dag.json";
const LEARNING_ROLLBACK_ARTIFACT_PATH = "learning-rollback-result.dag.json";
const LEARNING_VAULT_SNAPSHOT_PATH = "learning-vault-snapshot.json";
const DRAFT_SELECTION_ARTIFACT_PATH = "draft-selection.json";

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

export async function initializeLocalProject(root: string, approvedPlanDigest: string): Promise<AdoptionReceipt> {
  const plan = await planAdoption(root);
  if (plan.plan_digest !== approvedPlanDigest) throw new Error("adoption_approval_mismatch");
  const receipt = await executeAdoption(plan, {
    approval_id: `approval.local-adoption.${plan.plan_digest.slice(0, 16)}`,
    plan_digest: plan.plan_digest,
    approved_paths: [
      ...plan.creates.map((item) => item.relative_path),
      ...plan.bridge_previews
        .filter((bridge) => ["change_proposed", "outdated"].includes(bridge.status))
        .map((bridge) => bridge.relative_path),
    ],
    status: "current",
  });
  await mkdir(join(root, RUNTIME_DIRECTORY), { recursive: true });
  await writeJsonAtomic(runtimePath(root, "adoption-receipt.json"), receipt);
  return receipt;
}

export async function diagnoseLocalProject(root: string): Promise<DoctorReport> {
  return runDoctor(root);
}

export async function discoverLocalProject(
  root: string,
  options: {
    save?: boolean;
    signal?: AbortSignal;
    on_progress?: import("@contentmd/adapter-sdk").DiscoverRequest["on_progress"];
  } = {},
): Promise<ProjectModelResult["discovery"]> {
  const model = await compileProjectModel({
    project_root: root,
    ...(options.signal === undefined ? {} : { signal: options.signal }),
    ...(options.on_progress === undefined ? {} : { on_progress: options.on_progress }),
  });
  if (options.save === true) await writeJsonAtomic(runtimePath(root, "discovery.json"), model.discovery);
  return model.discovery;
}

export async function scanLocalProject(
  root: string,
  options: {
    signal?: CompileProjectModelRequest["signal"];
    on_progress?: CompileProjectModelRequest["on_progress"];
    repository_root?: CompileProjectModelRequest["repository_root"];
  } = {},
): Promise<Pick<ProjectModelResult, "project_id" | "identity" | "content_inventory" | "sources">> {
  const model = await compileProjectModel({
    project_root: root,
    ...(options.signal === undefined ? {} : { signal: options.signal }),
    ...(options.on_progress === undefined ? {} : { on_progress: options.on_progress }),
    ...(options.repository_root === undefined ? {} : { repository_root: options.repository_root }),
  });
  return {
    project_id: model.project_id,
    identity: model.identity,
    content_inventory: model.content_inventory,
    sources: model.sources,
  };
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

export async function reviewLocalUxWriting(
  root: string,
  contextPath: string,
): Promise<UxWritingReviewResult> {
  const request = await readJson<UxWritingReviewRequest>(contextPath);
  const overlayPath = join(root, ".contentmd/evaluations/ux-writing-rule-packs.json");
  const projectRulePacks = await exists(overlayPath)
    ? await readJson<UxWritingRulePack[]>(overlayPath)
    : [];
  const result = reviewUxWriting({ request, project_rule_packs: projectRulePacks });
  await writeJsonAtomic(runtimePath(root, "ux-writing-review-request.json"), request);
  await writeJsonAtomic(runtimePath(root, "ux-writing-review.json"), result.report);
  await writeJsonAtomic(runtimePath(root, "ux-writing-repair-brief.json"), result.repair_brief);
  return result;
}

export async function reviewLocalUxWritingRewrite(
  root: string,
  contextPath: string,
  repairBriefPath: string,
  rewrite: ContentRewriteProposal,
): Promise<UxWritingReviewResult[]> {
  const request = await readJson<UxWritingReviewRequest>(contextPath);
  const repairBrief = await readJson<UxWritingRepairBrief>(repairBriefPath);
  const overlayPath = join(root, ".contentmd/evaluations/ux-writing-rule-packs.json");
  const projectRulePacks = await exists(overlayPath)
    ? await readJson<UxWritingRulePack[]>(overlayPath)
    : [];
  const results = rewrite.diffs.map((diff) => reviewUxWritingRepairCandidate({
    request,
    repair_brief: repairBrief,
    candidate: {
      text: diff.after,
      semantic_invariant_refs: diff.semantic_invariant_refs ?? [],
    },
    project_rule_packs: projectRulePacks,
  }));
  await writeJsonAtomic(runtimePath(root, "ux-writing-rewrite-review.json"), results);
  return results;
}

async function repositoryTask(root: string): Promise<ContentTaskPacket> {
  return (await readPreparedContentTask(root)).task;
}

async function recordedProvider(root: string): Promise<RecordedModelProvider> {
  return RecordedModelProvider.fromFile(join(root, ".contentmd-test/recorded-model-responses.jsonl"));
}

async function writerExecutionContext(
  root: string,
  includeReviewFindings = true,
): Promise<WriterModelExecutionContext> {
  const execution = await readJson<WriterModelExecutionContext>(
    join(root, ".contentmd-test/writer-execution-context.json"),
  );
  return includeReviewFindings
    ? execution
    : {
        ...execution,
        context_items: execution.context_items.filter((item) => (
          item.data_class !== "review_finding"
        )),
      };
}

export async function createLocalStrategy(root: string, providerId: string): Promise<ContentStrategyProposal> {
  if (providerId !== "recorded") throw new Error(`unsupported_provider:${providerId}`);
  const execution = await writerExecutionContext(root);
  const strategy = await proposeContentStrategy(await recordedProvider(root), {
    task: await repositoryTask(root),
    review_finding_refs: execution.context_items
      .filter((item) => item.data_class === "review_finding")
      .map((item) => item.source_ref.record_id)
      .sort(),
    pattern_refs: ["pattern.recovery.unknown-outcome", "pattern.navigation.stable-destination-name"],
    execution,
  });
  await writeJsonAtomic(runtimePath(root, "strategy.json"), strategy);
  return strategy;
}

export async function createLocalDraft(root: string, providerId: string): Promise<ContentDraftProposal> {
  if (providerId !== "recorded") throw new Error(`unsupported_provider:${providerId}`);
  const strategy = await readJson<ContentStrategyProposal>(runtimePath(root, "strategy.json"));
  const draft = await proposeContentDraft(await recordedProvider(root), {
    task: await repositoryTask(root),
    strategy,
    execution: await writerExecutionContext(root, false),
  });
  await writeJsonAtomic(runtimePath(root, "draft.json"), draft);
  return draft;
}

interface LocalGovernedDraftSelectionReplay {
  readonly contract_version: "contentmd.local-governed-draft-selection-replay/0.1.0";
  readonly record_mode: "development_fixture";
  readonly proposal_id: string;
  readonly draft_digest: string;
  readonly fallback_baseline_ref: Task6ObjectRef;
  readonly binding_projection: SimulatedBindingProjection | null;
  readonly candidate_replays: readonly [VerifyPairwiseCandidateInput, ...VerifyPairwiseCandidateInput[]] | null;
}

function draftSelectionFailure(code: string): never {
  throw new Error(`governed_draft_selection_invalid:${code}`);
}

function exactKeys(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function selectionReplay(value: unknown): LocalGovernedDraftSelectionReplay {
  const keys = [
    "binding_projection",
    "candidate_replays",
    "contract_version",
    "draft_digest",
    "fallback_baseline_ref",
    "proposal_id",
    "record_mode",
  ] as const;
  if (!exactKeys(value, keys)
    || value.contract_version !== "contentmd.local-governed-draft-selection-replay/0.1.0"
    || value.record_mode !== "development_fixture"
    || typeof value.proposal_id !== "string" || value.proposal_id.length === 0
    || typeof value.draft_digest !== "string" || !/^[a-f0-9]{64}$/u.test(value.draft_digest)
    || (value.binding_projection !== null
      && (typeof value.binding_projection !== "object" || Array.isArray(value.binding_projection)))
    || (value.candidate_replays !== null
      && (!Array.isArray(value.candidate_replays) || value.candidate_replays.length === 0))) {
    draftSelectionFailure("input");
  }
  return value as unknown as LocalGovernedDraftSelectionReplay;
}

export async function selectLocalDraftAlternative(
  root: string,
  selectionInputPath: string,
): Promise<GovernedDraftSelection> {
  const input = selectionReplay(await readJson<unknown>(selectionInputPath));
  const draft = await readJson<ContentDraftProposal>(runtimePath(root, "draft.json"));
  if (draft.proposal_id !== input.proposal_id || sha256Canonical(draft) !== input.draft_digest) {
    draftSelectionFailure("draft_binding");
  }
  const activeCandidateBinding = input.binding_projection?.projection_stage === "verified"
    && input.binding_projection.state === "candidate";
  if (!activeCandidateBinding && input.candidate_replays !== null) {
    draftSelectionFailure("candidate_replays");
  }
  const verifiedModel = activeCandidateBinding
    ? (await loadLocalVerifiedTrainingModel(root)).model
    : null;
  const verifiedCandidates = activeCandidateBinding
    ? input.candidate_replays!.map((replay) => verifyPairwiseCandidate(replay)) as [
      ReturnType<typeof verifyPairwiseCandidate>,
      ...ReturnType<typeof verifyPairwiseCandidate>[],
    ]
    : null;
  const selection = selectGovernedDraftAlternative({
    record_mode: "development_fixture",
    draft,
    fallback_baseline_ref: input.fallback_baseline_ref,
    binding_projection: input.binding_projection,
    verified_model: verifiedModel,
    verified_candidates: verifiedCandidates,
  });
  await writeJsonAtomic(runtimePath(root, DRAFT_SELECTION_ARTIFACT_PATH), selection);
  return selection;
}

export async function createLocalRewrite(root: string, providerId: string, repairBriefPath?: string): Promise<ContentRewriteProposal> {
  if (providerId !== "recorded") throw new Error(`unsupported_provider:${providerId}`);
  const strategy = await readJson<ContentStrategyProposal>(runtimePath(root, "strategy.json"));
  const draft = await readJson<ContentDraftProposal>(runtimePath(root, "draft.json"));
  const repairBrief = repairBriefPath === undefined
    ? undefined
    : await readJson<UxWritingRepairBrief>(repairBriefPath);
  const rewrite = await proposeContentRewrite(await recordedProvider(root), {
    task: await repositoryTask(root),
    strategy,
    draft,
    execution: await writerExecutionContext(root, false),
    ...(repairBrief === undefined ? {} : { repair_brief: repairBrief }),
  });
  await writeJsonAtomic(runtimePath(root, "rewrite.json"), rewrite);
  return rewrite;
}

interface LocalDecisionRuntimeAuthorityBundle {
  readonly contract_version: "contentmd.local-decision-runtime-authority/0.1.0";
  readonly runtime_binding: RuntimeBinding;
  readonly authorization_records: readonly GovernedRuntimeAuthorizationRecord[];
}

interface LocalLearningRuntimeAuthorityBundle {
  readonly contract_version: "contentmd.local-learning-runtime-authority/0.1.0";
  readonly workflow_id: string;
  readonly project_id: string;
  readonly stream_id: string;
  readonly operation_id: string;
  readonly actor_ref: string;
  readonly occurred_at: string;
  readonly expected_head_digest: string | null;
  readonly runtime_binding: RuntimeBinding;
  readonly operation_authorization_refs: Readonly<Record<string, BoundRuntimeRecordRef>>;
  readonly authorization_records: readonly GovernedRuntimeAuthorizationRecord[];
}

export interface LocalDecisionRuntimeOptions {
  readonly clock?: () => string;
}

function runtimeAuthorizationFailure(detail: string): never {
  throw new RuntimeError("runtime_binding_not_authorized", detail);
}

export async function recordLocalDecision(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<unknown> {
  const decisionInput = await readJson<Omit<
    ContentDecisionInput,
    "store" | "operation" | "stream_id"
  >>(file);
  const clock = options.clock ?? (() => new Date().toISOString());
  let bundle: LocalDecisionRuntimeAuthorityBundle;
  try {
    bundle = await readJson<LocalDecisionRuntimeAuthorityBundle>(join(
      root,
      ".contentmd/governance/runtime-decision-authority.json",
    ));
  } catch {
    runtimeAuthorizationFailure("runtime_decision_authority_missing");
  }
  if (bundle.contract_version !== "contentmd.local-decision-runtime-authority/0.1.0"
    || bundle.runtime_binding.status !== "active"
    || bundle.runtime_binding.project_id !== decisionInput.project_id
    || !Array.isArray(bundle.authorization_records)) {
    runtimeAuthorizationFailure("runtime_decision_authority_invalid");
  }
  const recordsByAction = new Map<string, GovernedRuntimeAuthorizationRecord[]>();
  for (const record of bundle.authorization_records) {
    const records = recordsByAction.get(record.claims.action) ?? [];
    records.push(record);
    recordsByAction.set(record.claims.action, records);
  }
  const actionRecord = (action: string): GovernedRuntimeAuthorizationRecord => {
    const records = recordsByAction.get(action) ?? [];
    if (records.length !== 1) runtimeAuthorizationFailure(`runtime_operation_record_count:${action}`);
    return records[0]!;
  };
  const expectedActions = [
    "runtime.event-store.open",
    "runtime.event.head",
    "runtime.event.append",
    "runtime.event-store.close",
  ];
  if (bundle.authorization_records.length !== expectedActions.length
    || recordsByAction.size !== expectedActions.length) {
    runtimeAuthorizationFailure("runtime_operation_record_set");
  }
  await mkdir(join(root, RUNTIME_DIRECTORY), { recursive: true });
  const resolver = new GovernedRuntimeAuthorizationResolver({
    records: bundle.authorization_records,
    clock,
  });
  const ledger = new LocalRuntimeSqliteLedger(runtimePath(root, "authority.sqlite"));
  const authority = new LocalRuntimeOperationAuthority({
    ledger,
    authorization_resolver: resolver,
    clock,
    verifier_id: "runtime.local.operation-authority",
  });
  const operations = new Map<string, Awaited<ReturnType<LocalRuntimeOperationAuthority["issue"]>>>();
  try {
    for (const action of expectedActions) {
      const record = actionRecord(action);
      operations.set(action, await authority.issue(record.authorization_ref, record.claims));
    }
  } catch (error) {
    ledger.close();
    throw error;
  }
  const factory = new LocalAuthorizedEventStoreFactory({
    project_root: root,
    authority,
    permitted_data_classes: [decisionInput.data_class],
    clock,
  });
  let store: AuthorizedAppendOnlyEventStore | null = null;
  try {
    const streamId = `decision-stream.${decisionInput.project_id}`;
    store = await factory.open(
      bundle.runtime_binding,
      operations.get("runtime.event-store.open")!,
    );
    const head = await store.getHead(
      streamId,
      operations.get("runtime.event.head")!,
    );
    if ((head?.event_digest ?? null) !== decisionInput.expected_head_digest) {
      runtimeAuthorizationFailure("decision_stream_head_mismatch");
    }
    const decision = await recordContentDecision({
      ...decisionInput,
      store,
      operation: operations.get("runtime.event.append")!,
      stream_id: streamId,
    });
    await writeJsonAtomic(runtimePath(root, "latest-decision.json"), decision);
    return decision;
  } finally {
    if (store !== null) {
      await store.close(operations.get("runtime.event-store.close")!);
    }
    ledger.close();
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

export interface LocalWritingBenchmarkOfficialStatus {
  readonly benchmark_id: "LIL-WRITE-001";
  readonly official_attempt_status: "not_started";
  readonly official_attempt_effect: "none";
  readonly benchmark_claim_eligibility: false;
}

export async function verifyLocalWritingBenchmarkOfficialState(
  root: string,
): Promise<LocalWritingBenchmarkOfficialStatus> {
  if (root.trim().length === 0) {
    throw new Error("writing_benchmark_official_state_invalid:root");
  }
  const officialDirectory = join(root, "fixtures/learning-ranking/lil-write-001");
  const attemptPath = join(officialDirectory, "attempt.json");
  const reviewPath = join(officialDirectory, "reviews.jsonl");
  const resultPath = join(officialDirectory, "result.json");
  const [hasAttempt, hasReviews, hasResult] = await Promise.all([
    exists(attemptPath),
    exists(reviewPath),
    exists(resultPath),
  ]);
  if (hasAttempt) {
    let attempt: unknown;
    try {
      attempt = await readJson<unknown>(attemptPath);
    } catch {
      throw new Error("writing_benchmark_official_state_invalid:attempt");
    }
    if (attempt !== null && typeof attempt === "object" && !Array.isArray(attempt)
      && (attempt as { fixture_status?: unknown }).fixture_status === "synthetic_test_only") {
      throw new Error("writing_benchmark_official_state_invalid:synthetic_fixture");
    }
  }
  if (hasAttempt || hasReviews || hasResult) {
    throw new Error("writing_benchmark_official_state_invalid:unverified_artifacts");
  }
  return {
    benchmark_id: "LIL-WRITE-001",
    official_attempt_status: "not_started",
    official_attempt_effect: "none",
    benchmark_claim_eligibility: false,
  };
}

export async function assertLocalWritingBenchmarkOfficialActionAuthorized(
  root: string,
  action: "seal" | "ingest_review" | "open_result",
  inputPath: string,
): Promise<never> {
  if (root.trim().length === 0 || inputPath.trim().length === 0 || !(await exists(inputPath))) {
    throw new Error("writing_benchmark_official_state_invalid:input");
  }
  throw new Error(`change_not_authorized:writing_benchmark_${action}`);
}

const LEARNING_WORKFLOW_DATA_CLASS = "learning-workflow-audit";
const DIGEST = /^[a-f0-9]{64}$/u;

interface LocalLearningRuntimeContext {
  readonly authority: LearningWorkflowAuthority;
  readonly bundle: LocalLearningRuntimeAuthorityBundle;
  readonly operations: ReadonlyMap<string, Awaited<ReturnType<LocalRuntimeOperationAuthority["issue"]>>>;
}

async function withLocalLearningRuntime<T>(input: {
  readonly root: string;
  readonly expected_actions: Readonly<Record<string, string>>;
  readonly expected_project_id?: string;
  readonly options: LocalDecisionRuntimeOptions;
  readonly run: (context: LocalLearningRuntimeContext) => Promise<T>;
}): Promise<T> {
  const clock = input.options.clock ?? (() => new Date().toISOString());
  let parsed: unknown;
  try {
    parsed = await readJson<unknown>(join(
      input.root,
      ".contentmd/governance/learning-workflow-authority.json",
    ));
  } catch {
    runtimeAuthorizationFailure("learning_workflow_authority_missing");
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    runtimeAuthorizationFailure("learning_workflow_authority_invalid");
  }
  const rootKeys = Object.keys(parsed).sort();
  const expectedRootKeys = [
    "actor_ref",
    "authorization_records",
    "contract_version",
    "expected_head_digest",
    "occurred_at",
    "operation_authorization_refs",
    "operation_id",
    "project_id",
    "runtime_binding",
    "stream_id",
    "workflow_id",
  ];
  if (rootKeys.length !== expectedRootKeys.length
    || rootKeys.some((key, index) => key !== expectedRootKeys[index])) {
    runtimeAuthorizationFailure("learning_workflow_authority_invalid");
  }
  const bundle = parsed as LocalLearningRuntimeAuthorityBundle;
  if (bundle.runtime_binding === null
    || typeof bundle.runtime_binding !== "object"
    || Array.isArray(bundle.runtime_binding)
    || bundle.operation_authorization_refs === null
    || typeof bundle.operation_authorization_refs !== "object"
    || Array.isArray(bundle.operation_authorization_refs)
    || typeof bundle.project_id !== "string"
    || typeof bundle.workflow_id !== "string"
    || typeof bundle.stream_id !== "string"
    || typeof bundle.operation_id !== "string"
    || typeof bundle.actor_ref !== "string"
    || typeof bundle.occurred_at !== "string") {
    runtimeAuthorizationFailure("learning_workflow_authority_invalid");
  }
  const expectedStreamId = `learning-workflow-stream.${bundle.project_id}`;
  if (bundle.contract_version !== "contentmd.local-learning-runtime-authority/0.1.0"
    || bundle.runtime_binding.status !== "active"
    || bundle.runtime_binding.project_id !== bundle.project_id
    || (input.expected_project_id !== undefined
      && bundle.project_id !== input.expected_project_id)
    || bundle.stream_id !== expectedStreamId
    || bundle.workflow_id.trim().length === 0
    || bundle.operation_id.trim().length === 0
    || bundle.actor_ref.trim().length === 0
    || !Number.isFinite(Date.parse(bundle.occurred_at))
    || (bundle.expected_head_digest !== null && !DIGEST.test(bundle.expected_head_digest))
    || !Array.isArray(bundle.authorization_records)) {
    runtimeAuthorizationFailure("learning_workflow_authority_invalid");
  }
  const operationEntries = Object.entries(bundle.operation_authorization_refs);
  const expectedOperationKeys = Object.keys(input.expected_actions).sort();
  const operationKeys = operationEntries.map(([key]) => key).sort();
  if (operationKeys.length !== expectedOperationKeys.length
    || operationKeys.some((key, index) => key !== expectedOperationKeys[index])
    || bundle.authorization_records.length !== expectedOperationKeys.length) {
    runtimeAuthorizationFailure("learning_workflow_operation_ref_set");
  }
  const records = operationEntries.map(([key, ref]) => {
    const matches = bundle.authorization_records.filter((candidate) => {
      if (candidate === null || typeof candidate !== "object"
        || candidate.authorization_ref === undefined
        || candidate.claims === undefined) return false;
      return canonicalJson(candidate.authorization_ref) === canonicalJson(ref);
    });
    if (matches.length !== 1 || matches[0]!.claims.action !== input.expected_actions[key]) {
      runtimeAuthorizationFailure(`learning_workflow_operation_record:${key}`);
    }
    return [key, matches[0]!] as const;
  });
  if (new Set(records.map(([, record]) => record.authorization_ref.record_id)).size
    !== records.length) {
    runtimeAuthorizationFailure("learning_workflow_operation_record_duplicate");
  }
  const resolver = new GovernedRuntimeAuthorizationResolver({
    records: bundle.authorization_records,
    clock,
  });
  await mkdir(join(input.root, RUNTIME_DIRECTORY), { recursive: true });
  const ledger = new LocalRuntimeSqliteLedger(runtimePath(input.root, "authority.sqlite"));
  const operationAuthority = new LocalRuntimeOperationAuthority({
    ledger,
    authorization_resolver: resolver,
    clock,
    verifier_id: "runtime.local.learning-operation-authority",
  });
  const operations = new Map<string, Awaited<ReturnType<typeof operationAuthority.issue>>>();
  try {
    for (const [key, record] of records) {
      operations.set(key, await operationAuthority.issue(
        record.authorization_ref,
        record.claims,
      ));
    }
  } catch (error) {
    ledger.close();
    throw error;
  }
  const factory = new LocalAuthorizedEventStoreFactory({
    project_root: input.root,
    authority: operationAuthority,
    permitted_data_classes: [LEARNING_WORKFLOW_DATA_CLASS],
    clock,
  });
  let store: AuthorizedAppendOnlyEventStore | null = null;
  try {
    store = await factory.open(bundle.runtime_binding, operations.get("store_open")!);
    return await input.run({
      bundle,
      operations,
      authority: {
        store,
        read_operation: operations.get("audit_read")!,
        append_operation: operations.get("audit_append")!,
        stream_id: bundle.stream_id,
        expected_head_digest: bundle.expected_head_digest,
        workflow_id: bundle.workflow_id,
        project_id: bundle.project_id,
        operation_id: bundle.operation_id,
        actor_ref: bundle.actor_ref,
        occurred_at: bundle.occurred_at,
      },
    });
  } finally {
    try {
      if (store !== null) await store.close(operations.get("store_close")!);
    } finally {
      ledger.close();
    }
  }
}

export async function runLocalLearningExamples(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LearningWorkflowPhaseResult<LearningExamplesPhaseData>> {
  const request = await readJson<Omit<RunLearningExamplesPhaseInput, "authority">>(file);
  const projectId = request?.qualification_input?.decision?.scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: ({ authority }) => runLearningExamplesPhase({ authority, ...request }),
  });
}

export async function runLocalLearningDataset(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LearningWorkflowPhaseResult<LearningDatasetPhaseData>> {
  const request = await readJson<Omit<RunLearningDatasetPhaseInput, "authority">>(file);
  const projectId = request?.build_input?.leakage_evidence?.cohort_scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: ({ authority }) => runLearningDatasetPhase({ authority, ...request }),
  });
}

interface LocalPairwiseTrainingReplay {
  readonly contract_version: "contentmd.local-pairwise-training-replay/0.1.0";
  readonly record_mode: "development_fixture";
  readonly purpose: "golden_conformance" | "diagnostic" | "candidate";
  readonly dataset_replay: LearningDatasetTrainingReplay;
  readonly feature_matrix_replay: PairwiseFeatureMatrixReplay;
  readonly code_manifest: PairwiseCodeManifest;
  readonly runtime_profile: PairwiseRuntimeProfile;
}

interface LocalLearningTrainingArtifact {
  readonly contract_version: "contentmd.local-learning-training-artifact/0.1.0";
  readonly training_replay: LocalPairwiseTrainingReplay;
  readonly training: PairwiseTrainingResult;
}

export interface LocalLearningTrainingResult extends LearningWorkflowPhaseResult<
  PairwiseTrainingResult
> {
  readonly training_artifact_digest: string;
  readonly training_artifact_path: ".contentmd/runtime/learning-training-result.dag.json";
}

export interface LocalVerifiedTrainingModel {
  readonly training_artifact_digest: string;
  readonly model: VerifiedRankingModel;
}

function trainingArtifactFailure(code: string): never {
  throw new Error(`learning_training_artifact_invalid:${code}`);
}

function trainingProjectId(replay: LocalPairwiseTrainingReplay): string {
  const projectId = replay?.dataset_replay?.expected_dataset_record?.scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return projectId;
}

function verifiedTrainingRequest(
  replay: LocalPairwiseTrainingReplay,
): RunLearningTrainingPhaseInput["request"] {
  if (replay === null || typeof replay !== "object"
    || replay.contract_version !== "contentmd.local-pairwise-training-replay/0.1.0"
    || replay.record_mode !== "development_fixture") {
    throw new Error("learning_workflow_input_invalid:training_replay");
  }
  const dataset = verifyLearningDatasetForTraining({
    record_mode: replay.record_mode,
    replay: replay.dataset_replay,
  });
  return {
    contract_version: "contentmd.pairwise-training-request/0.1.0",
    record_mode: replay.record_mode,
    purpose: replay.purpose,
    dataset,
    feature_matrix: verifyPairwiseFeatureMatrix({
      record_mode: replay.record_mode,
      dataset,
      replay: replay.feature_matrix_replay,
    }),
    code_manifest: verifyPairwiseCodeManifest(replay.code_manifest),
    runtime_profile: admitPairwiseRuntime(replay.runtime_profile),
  };
}

async function readLocalLearningTrainingArtifact(root: string): Promise<{
  readonly artifact: LocalLearningTrainingArtifact;
  readonly dag: CanonicalDag;
}> {
  let bytes: string;
  try {
    bytes = await readFile(runtimePath(root, LEARNING_TRAINING_ARTIFACT_PATH), "utf8");
  } catch {
    trainingArtifactFailure("missing");
  }
  let dag: CanonicalDag;
  try {
    dag = JSON.parse(bytes) as CanonicalDag;
    if (canonicalJson(dag) !== bytes) trainingArtifactFailure("noncanonical");
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("learning_training_artifact_invalid:")) {
      throw error;
    }
    trainingArtifactFailure("parse");
  }
  let decoded: unknown;
  try {
    decoded = decodeCanonicalDag(dag);
    if (canonicalJson(encodeCanonicalDag(decoded)) !== bytes) {
      trainingArtifactFailure("dag_closure");
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("learning_training_artifact_invalid:")) {
      throw error;
    }
    trainingArtifactFailure("dag");
  }
  if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded)) {
    trainingArtifactFailure("shape");
  }
  const artifact = decoded as Partial<LocalLearningTrainingArtifact>;
  const keys = Object.keys(artifact).sort();
  const expectedKeys = ["contract_version", "training", "training_replay"];
  if (keys.length !== expectedKeys.length
    || keys.some((key, index) => key !== expectedKeys[index])
    || artifact.contract_version !== "contentmd.local-learning-training-artifact/0.1.0"
    || artifact.training === null || typeof artifact.training !== "object" || Array.isArray(artifact.training)
    || artifact.training_replay === null || typeof artifact.training_replay !== "object"
    || Array.isArray(artifact.training_replay)) {
    trainingArtifactFailure("shape");
  }
  return { artifact: artifact as LocalLearningTrainingArtifact, dag };
}

export async function runLocalLearningTraining(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LocalLearningTrainingResult> {
  const replay = await readJson<LocalPairwiseTrainingReplay>(file);
  const projectId = trainingProjectId(replay);
  const request = verifiedTrainingRequest(replay);
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: async ({ authority }) => {
      const result = await runLearningTrainingPhase({ authority, request });
      const trainingArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-training-artifact/0.1.0",
        training_replay: replay,
        training: result.data,
      } satisfies LocalLearningTrainingArtifact);
      await writeJsonAtomic(runtimePath(root, LEARNING_TRAINING_ARTIFACT_PATH), trainingArtifact);
      return {
        ...result,
        training_artifact_digest: trainingArtifact.root_digest,
        training_artifact_path: ".contentmd/runtime/learning-training-result.dag.json",
      };
    },
  });
}

export async function loadLocalVerifiedTrainingModel(
  root: string,
): Promise<LocalVerifiedTrainingModel> {
  const { artifact, dag } = await readLocalLearningTrainingArtifact(root);
  const request = verifiedTrainingRequest(artifact.training_replay);
  const replayed = trainPairwiseLogistic(request);
  if (replayed.state !== "trained" || artifact.training.state !== "trained"
    || canonicalJson(replayed) !== canonicalJson(artifact.training)) {
    trainingArtifactFailure("training_replay");
  }
  let model: VerifiedRankingModel;
  try {
    model = verifyRankingModel(artifact.training.model_record, { training_request: request });
  } catch {
    trainingArtifactFailure("model_verification");
  }
  return Object.freeze({ training_artifact_digest: dag.root_digest, model });
}

interface LocalLearningEvaluationReplay {
  readonly contract_version: "contentmd.local-learning-evaluation-replay/0.1.0";
  readonly record_mode: "development_fixture";
  readonly vault_snapshot: EvaluationSimulatorSnapshot;
  readonly fault_rules: readonly SimulatorFaultRule[];
  readonly replay_dag: CanonicalDag;
  readonly attempt_id: string;
  readonly opened_at: string;
  readonly actor_ref: string;
}

interface LocalLearningShadowReplay {
  readonly contract_version: "contentmd.local-learning-shadow-replay/0.1.0";
  readonly record_mode: "development_fixture";
  readonly fault_rules: readonly SimulatorFaultRule[];
  readonly replay_dag: CanonicalDag;
  readonly start_at: string;
  readonly earliest_end_at: string;
  readonly proposed_end_at: string;
  readonly shadow_run_id: string;
  readonly actor_ref: string;
  readonly ended_at: string;
}

interface LocalLearningShadowObservationReplay {
  readonly observation_id: string;
  readonly observed_at: string;
  readonly outcome_replay: ShadowOutcomeReplay;
}

interface LocalLearningShadowObservationSet {
  readonly contract_version: "contentmd.local-learning-shadow-observations/0.1.0";
  readonly observations: readonly LocalLearningShadowObservationReplay[];
}

interface LocalLearningEvaluationArtifact {
  readonly contract_version: "contentmd.local-learning-evaluation-artifact/0.1.0";
  readonly sealed_test_replay: SealedTestReplay;
  readonly evaluation: EvaluationRunResult;
}

interface LocalLearningShadowArtifact {
  readonly contract_version: "contentmd.local-learning-shadow-artifact/0.1.0";
  readonly evaluation_artifact_digest: string;
  readonly shadow: LearningShadowPhaseData;
}

interface LocalLearningPromotionArtifact {
  readonly contract_version: "contentmd.local-learning-promotion-artifact/0.1.0";
  readonly shadow_artifact_digest: string;
  readonly promotion: LearningPromotionPhaseData;
}

interface LocalLearningDriftArtifact {
  readonly contract_version: "contentmd.local-learning-drift-artifact/0.1.0";
  readonly promotion_artifact_digest: string;
  readonly drift: LearningDriftPhaseData;
}

interface LocalLearningRollbackArtifact {
  readonly contract_version: "contentmd.local-learning-rollback-artifact/0.1.0";
  readonly source_artifact_kind: "promotion" | "drift";
  readonly source_artifact_digest: string;
  readonly rollback: LearningRollbackPhaseData;
}

interface LocalLearningPromotionDecisionReplay {
  readonly contract_version: "contentmd.local-learning-promotion-decision/0.1.0";
  readonly record_mode: "development_fixture";
  readonly fault_rules: readonly SimulatorFaultRule[];
  readonly decision: SimulatedPromotionDecision;
  readonly actor_ref: string;
  readonly occurred_at: string;
}

interface LocalLearningDriftReplay {
  readonly contract_version: "contentmd.local-learning-drift-replay/0.1.0";
  readonly record_mode: "development_fixture";
  readonly fault_rules: readonly SimulatorFaultRule[];
  readonly previous_report: LearningDriftReport | null;
  readonly dataset_replay: DriftDatasetReplay;
  readonly currentness: SimulatedCurrentnessWitness;
  readonly observations: readonly DriftObservation[];
  readonly evaluation_at: string;
  readonly actor_ref: string;
}

interface LocalLearningRollbackReplay {
  readonly contract_version: "contentmd.local-learning-rollback-replay/0.1.0";
  readonly record_mode: "development_fixture";
  readonly fault_rules: readonly SimulatorFaultRule[];
  readonly binding_stream_id: string;
  readonly expected_head_digest: string;
  readonly requested_target_event_digest: string | null;
  readonly ordered_target_replays: readonly RollbackTargetReplay[];
  readonly fallback_baseline_ref: Task6ObjectRef;
  readonly reason_code:
    | "operator_simulation"
    | "drift_suspension"
    | "lineage_revocation"
    | "currentness_failure"
    | "incident_recovery";
  readonly actor_ref: string;
  readonly occurred_at: string;
}

export interface LocalLearningShadowResult extends LearningWorkflowPhaseResult<
  LearningShadowPhaseData
> {
  readonly shadow_artifact_digest: string;
  readonly shadow_artifact_path: ".contentmd/runtime/learning-shadow-result.dag.json";
  readonly vault_snapshot: EvaluationSimulatorSnapshot;
  readonly vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json";
}

export interface LocalLearningPromotionResult extends LearningWorkflowPhaseResult<
  LearningPromotionPhaseData
> {
  readonly promotion_artifact_digest: string;
  readonly promotion_artifact_path: ".contentmd/runtime/learning-promotion-result.dag.json";
  readonly vault_snapshot: EvaluationSimulatorSnapshot;
  readonly vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json";
}

export interface LocalLearningDriftResult extends LearningWorkflowPhaseResult<
  LearningDriftPhaseData
> {
  readonly drift_artifact_digest: string;
  readonly drift_artifact_path: ".contentmd/runtime/learning-drift-result.dag.json";
  readonly vault_snapshot: EvaluationSimulatorSnapshot;
  readonly vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json";
}

export interface LocalLearningRollbackResult extends LearningWorkflowPhaseResult<
  LearningRollbackPhaseData
> {
  readonly rollback_artifact_digest: string;
  readonly rollback_artifact_path: ".contentmd/runtime/learning-rollback-result.dag.json";
  readonly vault_snapshot: EvaluationSimulatorSnapshot;
  readonly vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json";
}

function readLocalLearningShadowReplay(value: unknown): {
  readonly request: LocalLearningShadowReplay;
  readonly observation_set: LocalLearningShadowObservationSet;
} {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("learning_workflow_input_invalid:shadow_replay");
  }
  const expectedKeys = [
    "actor_ref",
    "contract_version",
    "earliest_end_at",
    "ended_at",
    "fault_rules",
    "proposed_end_at",
    "record_mode",
    "replay_dag",
    "shadow_run_id",
    "start_at",
  ];
  const keys = Object.keys(value).sort();
  if (keys.length !== expectedKeys.length
    || keys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error("learning_workflow_input_invalid:shadow_replay");
  }
  const request = value as LocalLearningShadowReplay;
  if (request.contract_version !== "contentmd.local-learning-shadow-replay/0.1.0"
    || request.record_mode !== "development_fixture"
    || !Array.isArray(request.fault_rules)
    || typeof request.shadow_run_id !== "string"
    || request.shadow_run_id.trim().length === 0
    || typeof request.actor_ref !== "string"
    || request.actor_ref.trim().length === 0
    || [request.start_at, request.earliest_end_at, request.proposed_end_at, request.ended_at]
      .some((instant) => typeof instant !== "string" || !Number.isFinite(Date.parse(instant)))) {
    throw new Error("learning_workflow_input_invalid:shadow_replay");
  }
  let decoded: unknown;
  try {
    decoded = decodeCanonicalDag(request.replay_dag);
  } catch {
    throw new Error("learning_workflow_input_invalid:shadow_replay_dag");
  }
  if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded)) {
    throw new Error("learning_workflow_input_invalid:shadow_replay_dag");
  }
  const decodedKeys = Object.keys(decoded).sort();
  if (decodedKeys.length !== 2
    || decodedKeys[0] !== "contract_version"
    || decodedKeys[1] !== "observations") {
    throw new Error("learning_workflow_input_invalid:shadow_replay_dag");
  }
  const observationSet = decoded as LocalLearningShadowObservationSet;
  if (observationSet.contract_version
      !== "contentmd.local-learning-shadow-observations/0.1.0"
    || !Array.isArray(observationSet.observations)) {
    throw new Error("learning_workflow_input_invalid:shadow_replay_dag");
  }
  for (const observation of observationSet.observations) {
    if (observation === null || typeof observation !== "object" || Array.isArray(observation)) {
      throw new Error("learning_workflow_input_invalid:shadow_replay_dag");
    }
    const observationKeys = Object.keys(observation).sort();
    if (observationKeys.length !== 3
      || observationKeys[0] !== "observation_id"
      || observationKeys[1] !== "observed_at"
      || observationKeys[2] !== "outcome_replay"
      || typeof observation.observation_id !== "string"
      || observation.observation_id.trim().length === 0
      || typeof observation.observed_at !== "string"
      || !Number.isFinite(Date.parse(observation.observed_at))
      || observation.outcome_replay === null
      || typeof observation.outcome_replay !== "object"
      || Array.isArray(observation.outcome_replay)) {
      throw new Error("learning_workflow_input_invalid:shadow_replay_dag");
    }
  }
  return { request, observation_set: observationSet };
}

function readLocalLearningEvaluationArtifact(value: unknown): LocalLearningEvaluationArtifact {
  let decoded: unknown;
  try {
    decoded = decodeCanonicalDag(value as CanonicalDag);
  } catch {
    throw new Error("learning_workflow_input_invalid:evaluation_artifact");
  }
  if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded)) {
    throw new Error("learning_workflow_input_invalid:evaluation_artifact");
  }
  const keys = Object.keys(decoded).sort();
  if (keys.length !== 3
    || keys[0] !== "contract_version"
    || keys[1] !== "evaluation"
    || keys[2] !== "sealed_test_replay") {
    throw new Error("learning_workflow_input_invalid:evaluation_artifact");
  }
  const artifact = decoded as LocalLearningEvaluationArtifact;
  if (artifact.contract_version !== "contentmd.local-learning-evaluation-artifact/0.1.0"
    || artifact.evaluation === null
    || typeof artifact.evaluation !== "object"
    || Array.isArray(artifact.evaluation)
    || artifact.sealed_test_replay === null
    || typeof artifact.sealed_test_replay !== "object"
    || Array.isArray(artifact.sealed_test_replay)) {
    throw new Error("learning_workflow_input_invalid:evaluation_artifact");
  }
  return artifact;
}

function readLocalLearningShadowArtifact(value: unknown): LocalLearningShadowArtifact {
  let decoded: unknown;
  try {
    decoded = decodeCanonicalDag(value as CanonicalDag);
  } catch {
    throw new Error("learning_workflow_input_invalid:shadow_artifact");
  }
  if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded)) {
    throw new Error("learning_workflow_input_invalid:shadow_artifact");
  }
  const keys = Object.keys(decoded).sort();
  if (keys.length !== 3
    || keys[0] !== "contract_version"
    || keys[1] !== "evaluation_artifact_digest"
    || keys[2] !== "shadow") {
    throw new Error("learning_workflow_input_invalid:shadow_artifact");
  }
  const artifact = decoded as LocalLearningShadowArtifact;
  if (artifact.contract_version !== "contentmd.local-learning-shadow-artifact/0.1.0"
    || !DIGEST.test(artifact.evaluation_artifact_digest)
    || artifact.shadow === null
    || typeof artifact.shadow !== "object"
    || Array.isArray(artifact.shadow)) {
    throw new Error("learning_workflow_input_invalid:shadow_artifact");
  }
  return artifact;
}

function readLocalLearningPromotionDecision(
  value: unknown,
): LocalLearningPromotionDecisionReplay {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("learning_workflow_input_invalid:promotion_decision");
  }
  const expectedKeys = [
    "actor_ref",
    "contract_version",
    "decision",
    "fault_rules",
    "occurred_at",
    "record_mode",
  ];
  const keys = Object.keys(value).sort();
  if (keys.length !== expectedKeys.length
    || keys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error("learning_workflow_input_invalid:promotion_decision");
  }
  const request = value as LocalLearningPromotionDecisionReplay;
  if (request.contract_version !== "contentmd.local-learning-promotion-decision/0.1.0"
    || request.record_mode !== "development_fixture"
    || !Array.isArray(request.fault_rules)
    || request.decision === null
    || typeof request.decision !== "object"
    || Array.isArray(request.decision)
    || typeof request.actor_ref !== "string"
    || request.actor_ref.trim().length === 0
    || typeof request.occurred_at !== "string"
    || !Number.isFinite(Date.parse(request.occurred_at))) {
    throw new Error("learning_workflow_input_invalid:promotion_decision");
  }
  return request;
}

function readLocalLearningPromotionArtifact(value: unknown): LocalLearningPromotionArtifact {
  let decoded: unknown;
  try {
    decoded = decodeCanonicalDag(value as CanonicalDag);
  } catch {
    throw new Error("learning_workflow_input_invalid:promotion_artifact");
  }
  if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded)) {
    throw new Error("learning_workflow_input_invalid:promotion_artifact");
  }
  const keys = Object.keys(decoded).sort();
  if (keys.length !== 3
    || keys[0] !== "contract_version"
    || keys[1] !== "promotion"
    || keys[2] !== "shadow_artifact_digest") {
    throw new Error("learning_workflow_input_invalid:promotion_artifact");
  }
  const artifact = decoded as LocalLearningPromotionArtifact;
  if (artifact.contract_version !== "contentmd.local-learning-promotion-artifact/0.1.0"
    || !DIGEST.test(artifact.shadow_artifact_digest)
    || artifact.promotion === null
    || typeof artifact.promotion !== "object"
    || Array.isArray(artifact.promotion)) {
    throw new Error("learning_workflow_input_invalid:promotion_artifact");
  }
  return artifact;
}

function readLocalLearningDriftArtifact(value: unknown): LocalLearningDriftArtifact {
  let decoded: unknown;
  try {
    decoded = decodeCanonicalDag(value as CanonicalDag);
  } catch {
    throw new Error("learning_workflow_input_invalid:drift_artifact");
  }
  if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded)) {
    throw new Error("learning_workflow_input_invalid:drift_artifact");
  }
  const keys = Object.keys(decoded).sort();
  if (keys.length !== 3
    || keys[0] !== "contract_version"
    || keys[1] !== "drift"
    || keys[2] !== "promotion_artifact_digest") {
    throw new Error("learning_workflow_input_invalid:drift_artifact");
  }
  const artifact = decoded as LocalLearningDriftArtifact;
  if (artifact.contract_version !== "contentmd.local-learning-drift-artifact/0.1.0"
    || !DIGEST.test(artifact.promotion_artifact_digest)
    || artifact.drift === null
    || typeof artifact.drift !== "object"
    || Array.isArray(artifact.drift)) {
    throw new Error("learning_workflow_input_invalid:drift_artifact");
  }
  return artifact;
}

function readLocalLearningDriftReplay(value: unknown): LocalLearningDriftReplay {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("learning_workflow_input_invalid:drift_replay");
  }
  const expectedKeys = [
    "actor_ref",
    "contract_version",
    "currentness",
    "dataset_replay",
    "evaluation_at",
    "fault_rules",
    "observations",
    "previous_report",
    "record_mode",
  ];
  const keys = Object.keys(value).sort();
  if (keys.length !== expectedKeys.length
    || keys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error("learning_workflow_input_invalid:drift_replay");
  }
  const request = value as LocalLearningDriftReplay;
  if (request.contract_version !== "contentmd.local-learning-drift-replay/0.1.0"
    || request.record_mode !== "development_fixture"
    || !Array.isArray(request.fault_rules)
    || !Array.isArray(request.observations)
    || request.dataset_replay === null
    || typeof request.dataset_replay !== "object"
    || Array.isArray(request.dataset_replay)
    || request.currentness === null
    || typeof request.currentness !== "object"
    || Array.isArray(request.currentness)
    || (request.previous_report !== null
      && (typeof request.previous_report !== "object"
        || Array.isArray(request.previous_report)))
    || typeof request.evaluation_at !== "string"
    || !Number.isFinite(Date.parse(request.evaluation_at))
    || typeof request.actor_ref !== "string"
    || request.actor_ref.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:drift_replay");
  }
  return request;
}

function readLocalLearningRollbackReplay(value: unknown): LocalLearningRollbackReplay {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("learning_workflow_input_invalid:rollback_replay");
  }
  const expectedKeys = [
    "actor_ref",
    "binding_stream_id",
    "contract_version",
    "expected_head_digest",
    "fallback_baseline_ref",
    "fault_rules",
    "occurred_at",
    "ordered_target_replays",
    "reason_code",
    "record_mode",
    "requested_target_event_digest",
  ];
  const keys = Object.keys(value).sort();
  if (keys.length !== expectedKeys.length
    || keys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error("learning_workflow_input_invalid:rollback_replay");
  }
  const request = value as LocalLearningRollbackReplay;
  if (request.contract_version !== "contentmd.local-learning-rollback-replay/0.1.0"
    || request.record_mode !== "development_fixture"
    || !Array.isArray(request.fault_rules)
    || typeof request.binding_stream_id !== "string"
    || request.binding_stream_id.trim().length === 0
    || typeof request.expected_head_digest !== "string"
    || !DIGEST.test(request.expected_head_digest)
    || (request.requested_target_event_digest !== null
      && (typeof request.requested_target_event_digest !== "string"
        || !DIGEST.test(request.requested_target_event_digest)))
    || !Array.isArray(request.ordered_target_replays)
    || request.fallback_baseline_ref === null
    || typeof request.fallback_baseline_ref !== "object"
    || Array.isArray(request.fallback_baseline_ref)
    || ![
      "operator_simulation",
      "drift_suspension",
      "lineage_revocation",
      "currentness_failure",
      "incident_recovery",
    ].includes(request.reason_code)
    || typeof request.actor_ref !== "string"
    || request.actor_ref.trim().length === 0
    || typeof request.occurred_at !== "string"
    || !Number.isFinite(Date.parse(request.occurred_at))) {
    throw new Error("learning_workflow_input_invalid:rollback_replay");
  }
  return request;
}

export interface LocalLearningEvaluationResult extends LearningWorkflowPhaseResult<
  LearningEvaluationPhaseData
> {
  readonly evaluation_artifact_digest: string;
  readonly evaluation_artifact_path: ".contentmd/runtime/learning-evaluation-result.dag.json";
  readonly vault_snapshot: EvaluationSimulatorSnapshot;
  readonly vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json";
}

function readLocalLearningEvaluationReplay(value: unknown): {
  readonly request: LocalLearningEvaluationReplay;
  readonly replay: SealedTestReplay;
} {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("learning_workflow_input_invalid:evaluation_replay");
  }
  const expectedKeys = [
    "actor_ref",
    "attempt_id",
    "contract_version",
    "fault_rules",
    "opened_at",
    "record_mode",
    "replay_dag",
    "vault_snapshot",
  ];
  const keys = Object.keys(value).sort();
  if (keys.length !== expectedKeys.length
    || keys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error("learning_workflow_input_invalid:evaluation_replay");
  }
  const request = value as LocalLearningEvaluationReplay;
  if (request.contract_version !== "contentmd.local-learning-evaluation-replay/0.1.0"
    || request.record_mode !== "development_fixture"
    || !Array.isArray(request.fault_rules)
    || typeof request.attempt_id !== "string"
    || request.attempt_id.trim().length === 0
    || typeof request.opened_at !== "string"
    || !Number.isFinite(Date.parse(request.opened_at))
    || typeof request.actor_ref !== "string"
    || request.actor_ref.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:evaluation_replay");
  }
  let replay: SealedTestReplay;
  try {
    replay = decodeCanonicalDag(request.replay_dag) as unknown as SealedTestReplay;
  } catch {
    throw new Error("learning_workflow_input_invalid:evaluation_replay_dag");
  }
  return { request, replay };
}

export async function runLocalLearningEvaluation(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LocalLearningEvaluationResult> {
  const { request, replay } = readLocalLearningEvaluationReplay(await readJson<unknown>(file));
  const projectId = replay?.proposed_scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: async ({ authority, bundle }) => {
      if (request.actor_ref !== bundle.actor_ref) {
        runtimeAuthorizationFailure("learning_workflow_actor_mismatch");
      }
      const vault = restoreEvaluationSimulatorVault({
        record_mode: request.record_mode,
        snapshot: request.vault_snapshot,
        fault_rules: request.fault_rules,
      });
      const result = await runLearningEvaluationPhase({
        authority,
        vault,
        replay,
        attempt_id: request.attempt_id,
        opened_at: request.opened_at,
        actor_ref: request.actor_ref,
      } satisfies RunLearningEvaluationPhaseInput);
      const evaluationArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-evaluation-artifact/0.1.0",
        sealed_test_replay: replay,
        evaluation: result.data.result,
      });
      const vaultSnapshot = exportEvaluationSimulatorSnapshot(vault);
      await writeJsonAtomic(
        runtimePath(root, LEARNING_EVALUATION_ARTIFACT_PATH),
        evaluationArtifact,
      );
      await writeJsonAtomic(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH), vaultSnapshot);
      return {
        ...result,
        evaluation_artifact_digest: evaluationArtifact.root_digest,
        evaluation_artifact_path: ".contentmd/runtime/learning-evaluation-result.dag.json",
        vault_snapshot: vaultSnapshot,
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      };
    },
  });
}

export async function runLocalLearningShadow(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LocalLearningShadowResult> {
  const { request, observation_set: observationSet } = readLocalLearningShadowReplay(
    await readJson<unknown>(file),
  );
  const [evaluationDag, vaultSnapshot] = await Promise.all([
    readJson<CanonicalDag>(runtimePath(root, LEARNING_EVALUATION_ARTIFACT_PATH)),
    readJson<EvaluationSimulatorSnapshot>(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH)),
  ]);
  const evaluationArtifact = readLocalLearningEvaluationArtifact(evaluationDag);
  const replay = evaluationArtifact.sealed_test_replay;
  const projectId = replay?.proposed_scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: async ({ authority, bundle }) => {
      if (request.actor_ref !== bundle.actor_ref) {
        runtimeAuthorizationFailure("learning_workflow_actor_mismatch");
      }
      const vault = restoreEvaluationSimulatorVault({
        record_mode: request.record_mode,
        snapshot: vaultSnapshot,
        fault_rules: request.fault_rules,
      });
      const sealedTest = verifySealedTestReplay(vault, {
        record_mode: request.record_mode,
        replay,
      });
      const verifiedCandidates = new Map<string, ReturnType<typeof verifyPairwiseCandidate>>();
      const candidate = (
        candidateReplay: ShadowOutcomeReplay["pair"]["candidate_a"],
      ) => {
        const key = canonicalJson(candidateReplay);
        const existing = verifiedCandidates.get(key);
        if (existing !== undefined) return existing;
        const verified = verifyPairwiseCandidate({
          record_mode: request.record_mode,
          profile: replay.feature_profile,
          replay: candidateReplay,
        });
        verifiedCandidates.set(key, verified);
        return verified;
      };
      const observations = observationSet.observations.map((observation) => ({
        observation_id: observation.observation_id,
        observed_at: observation.observed_at,
        outcome_replay: observation.outcome_replay,
        candidates: [
          candidate(observation.outcome_replay.pair.candidate_a),
          candidate(observation.outcome_replay.pair.candidate_b),
        ] as const,
      }));
      const result = await runLearningShadowPhase({
        authority,
        vault,
        sealed_test: sealedTest,
        evaluation: evaluationArtifact.evaluation,
        start_at: request.start_at,
        earliest_end_at: request.earliest_end_at,
        proposed_end_at: request.proposed_end_at,
        input_selection_ref: sealedTest.test_population_ref,
        shadow_run_id: request.shadow_run_id,
        start_actor_ref: request.actor_ref,
        observations,
        ended_at: request.ended_at,
        completion_actor_ref: request.actor_ref,
      } satisfies RunLearningShadowPhaseInput);
      const shadowArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-shadow-artifact/0.1.0",
        evaluation_artifact_digest: evaluationDag.root_digest,
        shadow: result.data,
      } satisfies LocalLearningShadowArtifact);
      const successor = exportEvaluationSimulatorSnapshot(vault);
      await writeJsonAtomic(
        runtimePath(root, LEARNING_SHADOW_ARTIFACT_PATH),
        shadowArtifact,
      );
      await writeJsonAtomic(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH), successor);
      return {
        ...result,
        shadow_artifact_digest: shadowArtifact.root_digest,
        shadow_artifact_path: ".contentmd/runtime/learning-shadow-result.dag.json",
        vault_snapshot: successor,
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      };
    },
  });
}

export async function runLocalLearningPromotion(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LocalLearningPromotionResult> {
  const request = readLocalLearningPromotionDecision(await readJson<unknown>(file));
  const [evaluationDag, shadowDag, vaultSnapshot] = await Promise.all([
    readJson<CanonicalDag>(runtimePath(root, LEARNING_EVALUATION_ARTIFACT_PATH)),
    readJson<CanonicalDag>(runtimePath(root, LEARNING_SHADOW_ARTIFACT_PATH)),
    readJson<EvaluationSimulatorSnapshot>(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH)),
  ]);
  const evaluationArtifact = readLocalLearningEvaluationArtifact(evaluationDag);
  const shadowArtifact = readLocalLearningShadowArtifact(shadowDag);
  if (shadowArtifact.evaluation_artifact_digest !== evaluationDag.root_digest) {
    throw new Error("learning_workflow_input_invalid:shadow_evaluation_binding");
  }
  const replay = evaluationArtifact.sealed_test_replay;
  const projectId = replay?.proposed_scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  const verifiedDecision = createSimulatedPromotionDecision({
    record_mode: request.record_mode,
    evaluation: evaluationArtifact.evaluation,
    shadow_result: shadowArtifact.shadow.result,
    proposed_scope: replay.proposed_scope,
    actor_fixture_ref: request.decision.actor_fixture_ref,
    rationale: request.decision.rationale,
    decision: request.decision.decision,
    expected_head_digest: request.decision.expected_head_digest,
  });
  if (canonicalJson(verifiedDecision) !== canonicalJson(request.decision)) {
    throw new Error("learning_workflow_input_invalid:promotion_decision");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: async ({ authority, bundle }) => {
      if (request.actor_ref !== bundle.actor_ref) {
        runtimeAuthorizationFailure("learning_workflow_actor_mismatch");
      }
      const vault = restoreEvaluationSimulatorVault({
        record_mode: request.record_mode,
        snapshot: vaultSnapshot,
        fault_rules: request.fault_rules,
      });
      const sealedTest = verifySealedTestReplay(vault, {
        record_mode: request.record_mode,
        replay,
      });
      const result = await runLearningPromotionPhase({
        authority,
        vault,
        sealed_test: sealedTest,
        project_id: projectId,
        proposed_scope: replay.proposed_scope,
        baseline_ref: shadowArtifact.shadow.plan.payload.active_baseline_ref,
        evaluation: evaluationArtifact.evaluation,
        shadow: shadowArtifact.shadow,
        decision: verifiedDecision,
        actor_ref: request.actor_ref,
        occurred_at: request.occurred_at,
      } satisfies RunLearningPromotionPhaseInput);
      const promotionArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-promotion-artifact/0.1.0",
        shadow_artifact_digest: shadowDag.root_digest,
        promotion: result.data,
      } satisfies LocalLearningPromotionArtifact);
      const successor = exportEvaluationSimulatorSnapshot(vault);
      await writeJsonAtomic(
        runtimePath(root, LEARNING_PROMOTION_ARTIFACT_PATH),
        promotionArtifact,
      );
      await writeJsonAtomic(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH), successor);
      return {
        ...result,
        promotion_artifact_digest: promotionArtifact.root_digest,
        promotion_artifact_path: ".contentmd/runtime/learning-promotion-result.dag.json",
        vault_snapshot: successor,
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      };
    },
  });
}

export async function runLocalLearningDrift(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LocalLearningDriftResult> {
  const request = readLocalLearningDriftReplay(await readJson<unknown>(file));
  const [evaluationDag, shadowDag, promotionDag, vaultSnapshot] = await Promise.all([
    readJson<CanonicalDag>(runtimePath(root, LEARNING_EVALUATION_ARTIFACT_PATH)),
    readJson<CanonicalDag>(runtimePath(root, LEARNING_SHADOW_ARTIFACT_PATH)),
    readJson<CanonicalDag>(runtimePath(root, LEARNING_PROMOTION_ARTIFACT_PATH)),
    readJson<EvaluationSimulatorSnapshot>(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH)),
  ]);
  const evaluationArtifact = readLocalLearningEvaluationArtifact(evaluationDag);
  const shadowArtifact = readLocalLearningShadowArtifact(shadowDag);
  const promotionArtifact = readLocalLearningPromotionArtifact(promotionDag);
  if (shadowArtifact.evaluation_artifact_digest !== evaluationDag.root_digest
    || promotionArtifact.shadow_artifact_digest !== shadowDag.root_digest) {
    throw new Error("learning_workflow_input_invalid:learning_artifact_binding");
  }
  const promotionTransition = promotionArtifact.promotion.transition;
  const promotionHead = promotionTransition?.projection.verified_head_digest ?? null;
  if (promotionTransition === null || promotionHead === null) {
    throw new Error("learning_workflow_input_invalid:active_promotion_required");
  }
  const projectId = evaluationArtifact.sealed_test_replay?.proposed_scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: async ({ authority, bundle }) => {
      if (request.actor_ref !== bundle.actor_ref) {
        runtimeAuthorizationFailure("learning_workflow_actor_mismatch");
      }
      const vault = restoreEvaluationSimulatorVault({
        record_mode: request.record_mode,
        snapshot: vaultSnapshot,
        fault_rules: request.fault_rules,
      });
      const result = await runLearningDriftPhase({
        authority,
        promotion: promotionArtifact.promotion,
        request: {
          record_mode: request.record_mode,
          vault,
          binding_stream_id: promotionTransition.projection.stream_id,
          expected_head_digest: promotionHead,
          actor_ref: request.actor_ref,
          previous_report: request.previous_report,
          promotion_evaluation: evaluationArtifact.evaluation,
          dataset_replay: request.dataset_replay,
          currentness: request.currentness,
          observations: request.observations,
          evaluation_at: request.evaluation_at,
        },
      } satisfies RunLearningDriftPhaseInput);
      const driftArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-drift-artifact/0.1.0",
        promotion_artifact_digest: promotionDag.root_digest,
        drift: result.data,
      } satisfies LocalLearningDriftArtifact);
      const successor = exportEvaluationSimulatorSnapshot(vault);
      await writeJsonAtomic(runtimePath(root, LEARNING_DRIFT_ARTIFACT_PATH), driftArtifact);
      await writeJsonAtomic(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH), successor);
      return {
        ...result,
        drift_artifact_digest: driftArtifact.root_digest,
        drift_artifact_path: ".contentmd/runtime/learning-drift-result.dag.json",
        vault_snapshot: successor,
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      };
    },
  });
}

export async function runLocalLearningRollback(
  root: string,
  file: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LocalLearningRollbackResult> {
  const request = readLocalLearningRollbackReplay(await readJson<unknown>(file));
  const driftArtifactExists = await exists(runtimePath(root, LEARNING_DRIFT_ARTIFACT_PATH));
  const [evaluationDag, shadowDag, promotionDag, driftDag, vaultSnapshot] = await Promise.all([
    readJson<CanonicalDag>(runtimePath(root, LEARNING_EVALUATION_ARTIFACT_PATH)),
    readJson<CanonicalDag>(runtimePath(root, LEARNING_SHADOW_ARTIFACT_PATH)),
    readJson<CanonicalDag>(runtimePath(root, LEARNING_PROMOTION_ARTIFACT_PATH)),
    driftArtifactExists
      ? readJson<CanonicalDag>(runtimePath(root, LEARNING_DRIFT_ARTIFACT_PATH))
      : Promise.resolve(null),
    readJson<EvaluationSimulatorSnapshot>(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH)),
  ]);
  const evaluationArtifact = readLocalLearningEvaluationArtifact(evaluationDag);
  const shadowArtifact = readLocalLearningShadowArtifact(shadowDag);
  const promotionArtifact = readLocalLearningPromotionArtifact(promotionDag);
  const driftArtifact = driftDag === null ? null : readLocalLearningDriftArtifact(driftDag);
  if (shadowArtifact.evaluation_artifact_digest !== evaluationDag.root_digest
    || promotionArtifact.shadow_artifact_digest !== shadowDag.root_digest
    || (driftArtifact !== null
      && driftArtifact.promotion_artifact_digest !== promotionDag.root_digest)) {
    throw new Error("learning_workflow_input_invalid:learning_artifact_binding");
  }
  const promotionTransition = promotionArtifact.promotion.transition;
  if (promotionTransition === null
    || request.binding_stream_id !== promotionTransition.projection.stream_id) {
    throw new Error("learning_workflow_input_invalid:active_promotion_required");
  }
  const projectId = evaluationArtifact.sealed_test_replay?.proposed_scope?.project_id;
  if (typeof projectId !== "string" || projectId.trim().length === 0) {
    throw new Error("learning_workflow_input_invalid:project_id");
  }
  return withLocalLearningRuntime({
    root,
    options,
    expected_project_id: projectId,
    expected_actions: {
      store_open: "runtime.event-store.open",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: async ({ authority, bundle }) => {
      if (request.actor_ref !== bundle.actor_ref) {
        runtimeAuthorizationFailure("learning_workflow_actor_mismatch");
      }
      const vault = restoreEvaluationSimulatorVault({
        record_mode: request.record_mode,
        snapshot: vaultSnapshot,
        fault_rules: request.fault_rules,
      });
      const result = await runLearningRollbackPhase({
        authority,
        promotion: promotionArtifact.promotion,
        drift: driftArtifact?.drift ?? null,
        request: {
          record_mode: request.record_mode,
          vault,
          binding_stream_id: request.binding_stream_id,
          expected_head_digest: request.expected_head_digest,
          requested_target_event_digest: request.requested_target_event_digest,
          ordered_target_replays: request.ordered_target_replays,
          fallback_baseline_ref: request.fallback_baseline_ref,
          reason_code: request.reason_code,
          actor_ref: request.actor_ref,
          occurred_at: request.occurred_at,
        },
      } satisfies RunLearningRollbackPhaseInput);
      const rollbackArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-rollback-artifact/0.1.0",
        source_artifact_kind: driftDag === null ? "promotion" : "drift",
        source_artifact_digest: driftDag?.root_digest ?? promotionDag.root_digest,
        rollback: result.data,
      } satisfies LocalLearningRollbackArtifact);
      const successor = exportEvaluationSimulatorSnapshot(vault);
      await writeJsonAtomic(runtimePath(root, LEARNING_ROLLBACK_ARTIFACT_PATH), rollbackArtifact);
      await writeJsonAtomic(runtimePath(root, LEARNING_VAULT_SNAPSHOT_PATH), successor);
      return {
        ...result,
        rollback_artifact_digest: rollbackArtifact.root_digest,
        rollback_artifact_path: ".contentmd/runtime/learning-rollback-result.dag.json",
        vault_snapshot: successor,
        vault_snapshot_path: ".contentmd/runtime/learning-vault-snapshot.json",
      };
    },
  });
}

export async function statusLocalLearning(
  root: string,
  options: LocalDecisionRuntimeOptions = {},
): Promise<LearningWorkflowPhaseResult<LearningWorkflowStatusData>> {
  return withLocalLearningRuntime({
    root,
    options,
    expected_actions: {
      store_open: "runtime.event-store.open",
      inspection_read: "runtime.event.read",
      audit_read: "runtime.event.read",
      audit_append: "runtime.event.append",
      store_close: "runtime.event-store.close",
    },
    run: ({ authority, operations }) => runLearningStatusPhase({
      authority,
      inspection_operation: operations.get("inspection_read")!,
    }),
  });
}

export async function localDiff(root: string, proposalId: string): Promise<{
  proposal_id: string;
  diffs: Array<{
    source_artifact: string;
    line: number;
    column: number;
    before: string;
    after: string;
    rationale: string;
    mutation_status: "not_applied";
  }>;
  source_proposal_ref: string;
}> {
  const review = await readReviewedIdeCandidate(root);
  if (proposalId !== review.candidate_digest && proposalId !== `candidate.${review.candidate_digest}`) {
    throw new Error(`proposal_not_found:${proposalId}`);
  }
  const diff = review.preview_diff;
  return {
    proposal_id: proposalId,
    diffs: diff === null ? [] : [{
      ...diff,
      rationale: review.explanation,
      mutation_status: "not_applied",
    }],
    source_proposal_ref: review.review_digest,
  };
}

async function taskChangeArtifacts(root: string): Promise<{
  prepared: PreparedContentTask;
  review: ReviewedIdeCandidate;
  decision: ContentDecisionRecord;
}> {
  const artifacts = new FilesystemRuntimeArtifactStore(root);
  const [prepared, review, decision] = await Promise.all([
    readPreparedContentTask(root),
    readReviewedIdeCandidate(root),
    artifacts.readCanonical<ContentDecisionRecord>("latest-decision.json"),
  ]);
  assertGovernedTaskChangeBinding(prepared, review, decision);
  return { prepared, review, decision };
}

function governedLocalId(value: string): string {
  if (!/^[A-Za-z0-9._-]+$/u.test(value)) throw new Error("change_identifier_invalid");
  return value;
}

export async function previewLocalTransaction(root: string, transactionId: string): Promise<PreparedChangeTransaction> {
  governedLocalId(transactionId);
  const context = await taskChangeArtifacts(root);
  const transaction = await previewGovernedTaskChange({
    project_root: root,
    transaction_id: transactionId,
    ...context,
  });
  await new FilesystemRuntimeArtifactStore(root).writeCanonical(`transactions/${transactionId}.json`, transaction);
  return transaction;
}

export async function applyLocalTransaction(
  root: string,
  transactionId: string,
  approvalId: string,
): Promise<GovernedChangeResult> {
  governedLocalId(transactionId);
  governedLocalId(approvalId);
  const artifacts = new FilesystemRuntimeArtifactStore(root);
  const transaction = await artifacts.readCanonical<PreparedChangeTransaction>(`transactions/${transactionId}.json`);
  const context = await taskChangeArtifacts(root);
  assertGovernedTaskChangeBinding(context.prepared, context.review, context.decision, transaction);
  const authorization = await readJson<AuthorizationInput>(join(root, `.contentmd/governance/approvals/${approvalId}.json`));
  const result = await executeGovernedChange({ project_root: root, transaction, authorization_input: authorization });
  await artifacts.writeCanonical(`receipts/${transactionId}.apply.json`, result.apply_receipt);
  await artifacts.writeCanonical(`receipts/${transactionId}.verify.json`, result.verification_receipt);
  return result;
}

export async function verifyLocalTransaction(root: string, transactionId: string) {
  governedLocalId(transactionId);
  const artifacts = new FilesystemRuntimeArtifactStore(root);
  const transaction = await artifacts.readCanonical<PreparedChangeTransaction>(`transactions/${transactionId}.json`);
  const receipt = await artifacts.readCanonical<FilesystemApplyReceipt>(`receipts/${transactionId}.apply.json`);
  const context = await taskChangeArtifacts(root);
  const verification = await verifyGovernedTaskReadback({
    project_root: root,
    transaction_id: transactionId,
    transaction,
    apply_receipt: receipt,
    ...context,
  });
  await artifacts.writeCanonical(`receipts/${transactionId}.verify.json`, verification);
  return verification;
}

export async function rollbackLocalTransaction(
  root: string,
  transactionId: string,
  approvalId: string,
): Promise<GovernedRollbackResult> {
  governedLocalId(transactionId);
  governedLocalId(approvalId);
  const artifacts = new FilesystemRuntimeArtifactStore(root);
  const transaction = await artifacts.readCanonical<PreparedChangeTransaction>(`transactions/${transactionId}.json`);
  const context = await taskChangeArtifacts(root);
  assertGovernedTaskChangeBinding(context.prepared, context.review, context.decision, transaction);
  const applyReceipt = await artifacts.readCanonical<FilesystemApplyReceipt>(`receipts/${transactionId}.apply.json`);
  const authorization = await readJson<AuthorizationInput>(join(root, `.contentmd/governance/approvals/${approvalId}.json`));
  const result = await executeGovernedRollback({
    project_root: root,
    transaction,
    apply_receipt: applyReceipt,
    authorization_input: authorization,
  });
  await artifacts.writeCanonical(`receipts/${transactionId}.rollback.json`, result.rollback_receipt);
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
