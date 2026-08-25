import { lstat, mkdir, open, readFile, realpath, rename, unlink } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { dirname, isAbsolute, join, normalize, relative, sep } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { reviewContent, type ContentFinding } from "@contentmd/evaluation";
import {
  createContentTaskPacket,
  type ContentTaskPacket,
  type ContentTaskPacketInput,
} from "@contentmd/writer";
import { compileProjectModel } from "./model-workflow.js";

const PREPARED_TASK_PATH = ".contentmd/runtime/prepared-task.json";
const TASK_REVIEW_PATH = ".contentmd/runtime/task-review.json";

export interface PrepareContentTaskRequest {
  request: string;
  target: string;
}

export interface TaskContextItem {
  source_ref: {
    record_id: string;
    schema_id: string;
    schema_version: "0.1.0";
    content_digest: string;
  };
  data_class: "repository_source" | "implementation_occurrence";
  content: string;
}

export interface PreparedContentTask {
  contract_version: "contentmd.prepared-content-task/0.1.0";
  project_id: string;
  request: string;
  target: string;
  target_occurrence: {
    occurrence_id: string;
    source_artifact: string;
    line: number;
    column: number;
    expression_payload: string;
  };
  task: ContentTaskPacket;
  context_items: TaskContextItem[];
  conflicts: string[];
  uncertainty: string[];
  decision_status: "proposed";
  authority_effect: "none";
  prepared_digest: string;
}

export interface IdeWritingCandidate {
  contract_version: "contentmd.ide-writing-candidate/0.1.0";
  task_digest: string;
  alternatives: Array<{
    candidate_id: string;
    text: string;
    rationale: string;
    evidence_refs: string[];
  }>;
  recommended_candidate_id: string | null;
  claimed_authority_effect: "none";
}

export interface ReviewedIdeCandidate {
  contract_version: "contentmd.ide-candidate-review/0.1.0";
  project_id: string;
  task_digest: string;
  candidate_digest: string;
  recommended_candidate_id: string | null;
  findings: ContentFinding[];
  explanation: string;
  uncertainty: string[];
  trade_offs: string[];
  preview_diff: {
    source_artifact: string;
    line: number;
    column: number;
    before: string;
    after: string;
  } | null;
  decision_status: "proposed";
  authority_effect: "none";
  review_digest: string;
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function missing(error: unknown): boolean {
  return error !== null && typeof error === "object" && "code" in error && error.code === "ENOENT";
}

async function safeArtifactPath(root: string, relativePath: string, createParent: boolean): Promise<string> {
  const resolvedRoot = await realpath(root);
  let current = resolvedRoot;
  for (const part of dirname(relativePath).split("/")) {
    current = join(current, part);
    try {
      const stat = await lstat(current);
      if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error("content_task_write_path_invalid");
    } catch (error) {
      if (!missing(error) || !createParent) {
        if (error instanceof Error && error.message === "content_task_write_path_invalid") throw error;
        throw new Error("content_task_write_path_invalid");
      }
      await mkdir(current, { mode: 0o700 });
    }
    const actual = await realpath(current);
    const fromRoot = relative(resolvedRoot, actual);
    if (isAbsolute(fromRoot) || fromRoot === ".." || fromRoot.startsWith(`..${sep}`)) {
      throw new Error("content_task_write_path_invalid");
    }
  }
  const target = join(current, relativePath.slice(dirname(relativePath).length + 1));
  try {
    if ((await lstat(target)).isSymbolicLink()) throw new Error("content_task_write_path_invalid");
  } catch (error) {
    if (!missing(error)) throw error;
  }
  return target;
}

async function writeCanonicalAtomic(root: string, relativePath: string, value: unknown): Promise<void> {
  const target = await safeArtifactPath(root, relativePath, true);
  const temporary = join(dirname(target), `.${randomUUID()}.tmp`);
  const handle = await open(temporary, "wx", 0o600);
  try {
    await handle.writeFile(canonicalJson(value), "utf8");
    await handle.sync();
    await handle.close();
    await rename(temporary, target);
  } catch (error) {
    await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

function validatePrepared(value: unknown): PreparedContentTask {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("ide_candidate_task_stale");
  }
  const prepared = value as PreparedContentTask;
  const { prepared_digest: preparedDigest, ...preimage } = prepared;
  if (!nonempty(preparedDigest) || sha256Canonical(preimage) !== preparedDigest) {
    throw new Error("ide_candidate_task_stale");
  }
  if (prepared.task === null || typeof prepared.task !== "object" || Array.isArray(prepared.task)) {
    throw new Error("ide_candidate_task_stale");
  }
  const {
    schema_version: _schemaVersion,
    task_digest: _taskDigest,
    authority_effect: _authorityEffect,
    ...taskInput
  } = prepared.task;
  let replayed: ContentTaskPacket;
  try {
    replayed = createContentTaskPacket(taskInput as ContentTaskPacketInput);
  } catch {
    throw new Error("ide_candidate_task_stale");
  }
  if (canonicalJson(replayed) !== canonicalJson(prepared.task)) {
    throw new Error("ide_candidate_task_stale");
  }
  return prepared;
}

function parseTarget(value: string): { path: string; line: number } {
  const match = /^(.*):(\d+)$/u.exec(value);
  if (match === null || !nonempty(match[1])) throw new Error("content_task_target_invalid");
  const path = normalize(match[1]);
  if (isAbsolute(path) || path === ".." || path.startsWith("../")) throw new Error("content_task_target_invalid");
  const line = Number(match[2]);
  if (!Number.isSafeInteger(line) || line < 1) throw new Error("content_task_target_invalid");
  return { path, line };
}

export async function prepareContentTask(
  root: string,
  request: PrepareContentTaskRequest,
): Promise<PreparedContentTask> {
  if (!nonempty(request.request)) throw new Error("content_task_request_invalid");
  const target = parseTarget(request.target);
  const model = await compileProjectModel({ project_root: root });
  const candidates = model.discovery.occurrences
    .filter((occurrence) => occurrence.source_artifact === target.path)
    .map((occurrence) => ({ occurrence, distance: Math.abs(occurrence.line - target.line) }))
    .filter((entry) => entry.distance <= 1)
    .sort((left, right) => left.distance - right.distance || left.occurrence.occurrence_id.localeCompare(right.occurrence.occurrence_id, "en"));
  const occurrence = candidates[0]?.occurrence;
  if (occurrence === undefined || (candidates[1]?.distance === candidates[0]?.distance)) {
    throw new Error("content_task_target_not_resolved");
  }

  const behaviorSensitive = /\b(payment|refund|delete|submit|cancel|legal|price|fee)\b/iu.test(request.request);
  const behaviorClaims = model.discovery.evidence_claims.filter((claim) =>
    claim.claim_kind === "implemented_behavior" || claim.claim_kind === "live_behavior"
  );
  if (behaviorSensitive && behaviorClaims.length === 0) {
    throw new Error("product_behavior_unknown:implemented_behavior");
  }

  const claimsById = new Map(model.discovery.evidence_claims.map((claim) => [claim.claim_id, claim]));
  const selectedClaims = model.assessments.flatMap((assessment) => {
    const claim = assessment.selected_claim_ref === null ? undefined : claimsById.get(assessment.selected_claim_ref);
    return claim === undefined ? [] : [claim];
  });
  const productRefs = selectedClaims.filter((claim) => claim.claim_kind === "product_identity" || claim.claim_kind === "product_scope").map((claim) => claim.claim_id);
  const audienceRefs = selectedClaims.filter((claim) => claim.claim_kind === "audience_job").map((claim) => claim.claim_id);
  const journeyRefs = selectedClaims.filter((claim) => claim.claim_kind === "workflow_stage").map((claim) => claim.claim_id);
  const voiceRefs = selectedClaims.filter((claim) => claim.claim_kind === "voice_guidance").map((claim) => claim.claim_id);
  const terminologyRefs = selectedClaims.filter((claim) => claim.claim_kind === "terminology_guidance").map((claim) => claim.claim_id);
  const semanticMessage = model.graph.nodes.find((node) =>
    node.node_type === "semantic_message" && node.evidence_refs.includes(occurrence.occurrence_id)
  );
  const sourceRefs = model.sources.map((source) => source.source_id);
  const evidenceRefs = unique([
    occurrence.occurrence_id,
    model.discovery.scan_digest,
    model.identity.proposal_digest,
    ...sourceRefs,
    ...selectedClaims.flatMap((claim) => [claim.claim_id, claim.source_ref]),
  ]);
  const task = createContentTaskPacket({
    task_id: `task.${sha256Canonical({ request: request.request, target: request.target, scan: model.discovery.scan_digest }).slice(0, 24)}`,
    target_occurrence_refs: [occurrence.occurrence_id],
    voice_profile_refs: unique(voiceRefs),
    terminology_refs: unique(terminologyRefs),
    decision_status: "proposed",
    product_context_refs: unique(productRefs.length > 0 ? productRefs : [model.identity.proposal_digest]),
    audience_job_refs: unique(audienceRefs.length > 0 ? audienceRefs : ["coverage.primary-audience-not-established"]),
    journey_state_refs: unique(journeyRefs.length > 0 ? journeyRefs : [`route.${occurrence.route ?? "unknown"}`]),
    semantic_message_ref: semanticMessage?.node_id ?? `message.${occurrence.occurrence_id}`,
    required_fact_refs: unique([...productRefs, ...journeyRefs].length > 0 ? [...productRefs, ...journeyRefs] : [model.identity.proposal_digest]),
    prohibited_claims: ["claimed approval", "external publication authority", "invented product behavior"],
    consequence: `This proposal changes the user-facing meaning at ${occurrence.source_artifact}:${occurrence.line}.`,
    recovery: /nothing|empty|no /iu.test(occurrence.expression_payload) ? "Explain the next available action without inventing product behavior." : null,
    channel: occurrence.channel,
    locale: occurrence.locale,
    risk: behaviorSensitive ? "high" : "medium",
    evidence_refs: evidenceRefs,
    acceptance_criteria: [
      "Preserve established product behavior and uncertainty.",
      "Use only evidence linked in this task packet.",
      "Return alternatives as proposals; do not claim approval or publication authority.",
    ],
  });
  const contextItems: TaskContextItem[] = [
    ...model.sources.map((source) => ({
      source_ref: {
        record_id: source.source_id,
        schema_id: "contentmd.source-record",
        schema_version: "0.1.0" as const,
        content_digest: source.content_digest,
      },
      data_class: "repository_source" as const,
      content: source.content.slice(0, 12_000),
    })),
    {
      source_ref: {
        record_id: occurrence.occurrence_id,
        schema_id: "contentmd.implementation-occurrence",
        schema_version: "0.1.0",
        content_digest: sha256Canonical(occurrence),
      },
      data_class: "implementation_occurrence",
      content: canonicalJson(occurrence),
    },
  ];
  const preimage = {
    contract_version: "contentmd.prepared-content-task/0.1.0" as const,
    project_id: model.project_id,
    request: request.request,
    target: request.target,
    target_occurrence: {
      occurrence_id: occurrence.occurrence_id,
      source_artifact: occurrence.source_artifact,
      line: occurrence.line,
      column: occurrence.column,
      expression_payload: occurrence.expression_payload,
    },
    task,
    context_items: contextItems,
    conflicts: model.assessments.filter((assessment) => assessment.conflicting_claim_refs.length > 0).map((assessment) => assessment.assessment_id),
    uncertainty: [
      ...(voiceRefs.length === 0 ? ["voice_guidance_not_established"] : []),
      ...(terminologyRefs.length === 0 ? ["terminology_guidance_not_established"] : []),
    ],
    decision_status: "proposed" as const,
    authority_effect: "none" as const,
  };
  const prepared = { ...preimage, prepared_digest: sha256Canonical(preimage) };
  await writeCanonicalAtomic(root, PREPARED_TASK_PATH, prepared);
  return prepared;
}

function strictCandidate(value: unknown): IdeWritingCandidate {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("ide_candidate_invalid");
  const record = value as Record<string, unknown>;
  const expected = ["contract_version", "task_digest", "alternatives", "recommended_candidate_id", "claimed_authority_effect"].sort();
  if (canonicalJson(Object.keys(record).sort()) !== canonicalJson(expected)) throw new Error("ide_candidate_invalid");
  if (
    record.contract_version !== "contentmd.ide-writing-candidate/0.1.0" ||
    !nonempty(record.task_digest) || record.claimed_authority_effect !== "none" ||
    !Array.isArray(record.alternatives) || record.alternatives.length === 0 ||
    !(record.recommended_candidate_id === null || nonempty(record.recommended_candidate_id))
  ) throw new Error("ide_candidate_invalid");
  const ids = new Set<string>();
  for (const raw of record.alternatives) {
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) throw new Error("ide_candidate_invalid");
    const alternative = raw as Record<string, unknown>;
    if (canonicalJson(Object.keys(alternative).sort()) !== canonicalJson(["candidate_id", "evidence_refs", "rationale", "text"])) {
      throw new Error("ide_candidate_invalid");
    }
    if (
      !nonempty(alternative.candidate_id) || !nonempty(alternative.text) || !nonempty(alternative.rationale) ||
      !Array.isArray(alternative.evidence_refs) || alternative.evidence_refs.length === 0 ||
      !alternative.evidence_refs.every(nonempty) || ids.has(alternative.candidate_id)
    ) throw new Error("ide_candidate_invalid");
    ids.add(alternative.candidate_id);
  }
  if (record.recommended_candidate_id !== null && !ids.has(record.recommended_candidate_id as string)) {
    throw new Error("ide_candidate_invalid");
  }
  return record as unknown as IdeWritingCandidate;
}

export async function reviewIdeCandidate(root: string, rawCandidate: unknown): Promise<ReviewedIdeCandidate> {
  const candidate = strictCandidate(rawCandidate);
  let prepared: PreparedContentTask;
  try {
    const preparedPath = await safeArtifactPath(root, PREPARED_TASK_PATH, false);
    prepared = validatePrepared(JSON.parse(await readFile(preparedPath, "utf8")));
  } catch (error) {
    if (error instanceof Error && error.message === "ide_candidate_task_stale") throw error;
    throw new Error("ide_candidate_task_stale");
  }
  if (candidate.task_digest !== prepared.task.task_digest) throw new Error("ide_candidate_task_stale");
  const allowedEvidence = new Set(prepared.task.evidence_refs);
  if (candidate.alternatives.some((alternative) => alternative.evidence_refs.some((ref) => !allowedEvidence.has(ref)))) {
    throw new Error("ide_candidate_evidence_invalid");
  }
  const prohibited = /\b(approved|guaranteed|live behavior|publishes? automatically|will always)\b/iu;
  if (candidate.alternatives.some((alternative) => prohibited.test(alternative.text))) {
    throw new Error("ide_candidate_invented_behavior");
  }
  const model = await compileProjectModel({ project_root: root });
  const occurrence = model.discovery.occurrences.find((item) =>
    item.occurrence_id === prepared.target_occurrence.occurrence_id &&
    item.expression_payload === prepared.target_occurrence.expression_payload
  );
  if (occurrence === undefined) throw new Error("ide_candidate_task_stale");
  const recommended = candidate.recommended_candidate_id === null
    ? null
    : candidate.alternatives.find((alternative) => alternative.candidate_id === candidate.recommended_candidate_id) ?? null;
  const selected = recommended ?? candidate.alternatives[0] ?? null;
  const findings = candidate.alternatives.flatMap((alternative) => reviewContent({
    project_id: model.project_id,
    occurrences: [{ ...occurrence, expression_payload: alternative.text }],
    evidence_refs: alternative.evidence_refs,
    product_facts: {
      payment_outcome_after_submission: "not_established",
      workspace_delete_effect: "not_established",
    },
  }).findings);
  const candidateDigest = sha256Canonical(candidate);
  const reviewPreimage = {
    contract_version: "contentmd.ide-candidate-review/0.1.0" as const,
    project_id: model.project_id,
    task_digest: prepared.task.task_digest,
    candidate_digest: candidateDigest,
    recommended_candidate_id: candidate.recommended_candidate_id,
    findings,
    explanation: findings.length === 0
      ? "The candidate passed deterministic checks and remains a proposal for user review."
      : "The candidate remains proposed and has deterministic findings to resolve before approval.",
    uncertainty: prepared.uncertainty,
    trade_offs: candidate.alternatives.map((alternative) => `${alternative.candidate_id}: ${alternative.rationale}`),
    preview_diff: selected === null ? null : {
      source_artifact: occurrence.source_artifact,
      line: occurrence.line,
      column: occurrence.column,
      before: occurrence.expression_payload,
      after: selected.text,
    },
    decision_status: "proposed" as const,
    authority_effect: "none" as const,
  };
  const review = { ...reviewPreimage, review_digest: sha256Canonical(reviewPreimage) };
  await writeCanonicalAtomic(root, TASK_REVIEW_PATH, review);
  return review;
}
