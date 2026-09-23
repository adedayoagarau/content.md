#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { verifyPublicProductCorpus } from "./verify-public-product-corpus.mjs";

function invalid(code) {
  throw new TypeError(`corpus_worker_batch_invalid:${code}`);
}

function compareUnicodeScalar(left, right) {
  const leftPoints = [...String(left)].map((value) => value.codePointAt(0));
  const rightPoints = [...String(right)].map((value) => value.codePointAt(0));
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
}

function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("canonical_value");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    invalid("canonical_value");
  }
  return `{${Object.keys(value)
    .sort(compareUnicodeScalar)
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function sha256Canonical(value) {
  return createHash("sha256").update(`${canonicalJson(value)}\n`, "utf8").digest("hex");
}

function deepFreeze(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function nonemptyText(value) {
  return typeof value === "string" && value.trim() !== "";
}

function productKey(value) {
  return `${value.company}\0${value.product_system}`;
}

const BLOCKED_ATTEMPT_KEYS = [
  "attempt_digest",
  "attempted_at",
  "authority_effect",
  "batch_name",
  "benchmark_eligibility",
  "block_class",
  "bypass_attempted",
  "company",
  "contract_version",
  "detail",
  "product_system",
  "prompt_eligibility",
  "retained_as_product_evidence",
  "source_url",
  "source_worker_plan_digest",
  "training_eligibility",
  "worker_id",
].sort(compareUnicodeScalar);

const BLOCK_CLASSES = new Set([
  "authentication_required",
  "geo_unavailable",
  "robots_policy",
  "site_access_block",
]);

const UNAVAILABLE_ATTEMPT_KEYS = [
  "attempt_digest", "attempted_at", "authority_effect", "batch_name",
  "benchmark_eligibility", "bypass_attempted", "company", "contract_version",
  "detail", "disposition_class", "observed_state", "product_system",
  "profile_isolation_status", "prompt_eligibility", "retained_as_product_evidence",
  "retry_count", "source_url", "source_worker_plan_digest", "training_eligibility",
  "worker_id",
].sort(compareUnicodeScalar);

const UNAVAILABLE_CLASSES = new Set([
  "not_found",
  "no_visible_public_ui",
  "non_https_destination",
  "render_failure",
]);

function hasExactKeys(value, expected) {
  return Object.keys(value).sort(compareUnicodeScalar).join("\0") === expected.join("\0");
}

function blockedAttemptPreimage(value) {
  const { attempt_digest: ignored, ...preimage } = value;
  return preimage;
}

export function finalizePublicProductBlockedAttempt(input) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) invalid("blocked_attempt_shape");
  const preimage = {
    contract_version: "contentmd.public-product-discovery-blocked-attempt/0.1.0",
    ...input,
  };
  if (Object.hasOwn(preimage, "attempt_digest")) delete preimage.attempt_digest;
  const finalized = { ...preimage, attempt_digest: sha256Canonical(preimage) };
  return deepFreeze(finalized);
}

export function finalizePublicProductUnavailableAttempt(input) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    invalid("unavailable_attempt_shape");
  }
  const preimage = {
    contract_version: "contentmd.public-product-discovery-unavailable-attempt/0.1.0",
    ...input,
  };
  if (Object.hasOwn(preimage, "attempt_digest")) delete preimage.attempt_digest;
  return deepFreeze({ ...preimage, attempt_digest: sha256Canonical(preimage) });
}

function verifyBlockedAttempt(attempt, { workerPlan, assignment, taskSet }) {
  if (typeof attempt !== "object" || attempt === null || Array.isArray(attempt)
    || !hasExactKeys(attempt, BLOCKED_ATTEMPT_KEYS)
    || attempt.contract_version !== "contentmd.public-product-discovery-blocked-attempt/0.1.0"
    || !/^[0-9a-f]{64}$/u.test(attempt.source_worker_plan_digest ?? "")
    || !/^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(attempt.batch_name ?? "")
    || !nonemptyText(attempt.worker_id)
    || !nonemptyText(attempt.company)
    || !nonemptyText(attempt.product_system)
    || !nonemptyText(attempt.source_url)
    || !/^https:\/\//u.test(attempt.source_url)
    || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(attempt.attempted_at ?? "")
    || !BLOCK_CLASSES.has(attempt.block_class)
    || !nonemptyText(attempt.detail)
    || !/^[0-9a-f]{64}$/u.test(attempt.attempt_digest ?? "")) {
    return { valid: false, code: "blocked_attempt_shape" };
  }
  if (attempt.source_worker_plan_digest !== workerPlan.plan_digest
    || attempt.batch_name !== assignment.batch_name
    || attempt.worker_id !== assignment.worker_id
    || !taskSet.has(productKey(attempt))) {
    return { valid: false, code: "blocked_attempt_outside_assignment" };
  }
  if (attempt.bypass_attempted !== false
    || attempt.retained_as_product_evidence !== false
    || attempt.authority_effect !== "none"
    || attempt.prompt_eligibility !== "never"
    || attempt.training_eligibility !== "never"
    || attempt.benchmark_eligibility !== false) {
    return { valid: false, code: "blocked_attempt_policy" };
  }
  if (sha256Canonical(blockedAttemptPreimage(attempt)) !== attempt.attempt_digest) {
    return { valid: false, code: "blocked_attempt_digest" };
  }
  return { valid: true };
}

function verifyUnavailableAttempt(attempt, { workerPlan, assignment, taskSet }) {
  if (typeof attempt !== "object" || attempt === null || Array.isArray(attempt)
    || !hasExactKeys(attempt, UNAVAILABLE_ATTEMPT_KEYS)
    || attempt.contract_version !== "contentmd.public-product-discovery-unavailable-attempt/0.1.0"
    || !/^[0-9a-f]{64}$/u.test(attempt.source_worker_plan_digest ?? "")
    || !/^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(attempt.batch_name ?? "")
    || !nonemptyText(attempt.worker_id)
    || !nonemptyText(attempt.company)
    || !nonemptyText(attempt.product_system)
    || !/^https:\/\//u.test(attempt.source_url ?? "")
    || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(attempt.attempted_at ?? "")
    || !UNAVAILABLE_CLASSES.has(attempt.disposition_class)
    || !nonemptyText(attempt.detail)
    || !/^[0-9a-f]{64}$/u.test(attempt.attempt_digest ?? "")) {
    return { valid: false, code: "unavailable_attempt_shape" };
  }
  if (attempt.source_worker_plan_digest !== workerPlan.plan_digest
    || attempt.batch_name !== assignment.batch_name
    || attempt.worker_id !== assignment.worker_id
    || !taskSet.has(productKey(attempt))) {
    return { valid: false, code: "unavailable_attempt_outside_assignment" };
  }
  if (!Number.isSafeInteger(attempt.retry_count) || attempt.retry_count < 2
    || attempt.profile_isolation_status !== "established_fresh_per_attempt"
    || attempt.observed_state !== "not_observed"
    || attempt.bypass_attempted !== false
    || attempt.retained_as_product_evidence !== false
    || attempt.authority_effect !== "none"
    || attempt.prompt_eligibility !== "never"
    || attempt.training_eligibility !== "never"
    || attempt.benchmark_eligibility !== false) {
    return { valid: false, code: "unavailable_attempt_policy" };
  }
  const { attempt_digest: ignored, ...preimage } = attempt;
  if (sha256Canonical(preimage) !== attempt.attempt_digest) {
    return { valid: false, code: "unavailable_attempt_digest" };
  }
  return { valid: true };
}

function verifyWorkerPlan(workerPlan) {
  const supportedContracts = new Set([
    "contentmd.public-product-corpus-worker-plan/0.1.0",
    "contentmd.public-product-discovery-worker-plan/0.1.0",
  ]);
  if (typeof workerPlan !== "object" || workerPlan === null || Array.isArray(workerPlan)
    || !supportedContracts.has(workerPlan.contract_version)
    || !Array.isArray(workerPlan.assignments)
    || workerPlan.assignments.length === 0
    || !/^[0-9a-f]{64}$/u.test(workerPlan.plan_digest ?? "")) {
    invalid("worker_plan_shape");
  }
  const { plan_digest: planDigest, ...preimage } = workerPlan;
  if (sha256Canonical(preimage) !== planDigest) invalid("worker_plan_digest");

  const workerIds = new Set();
  const batchNames = new Set();
  const companies = new Set();
  const products = new Set();
  for (const assignment of workerPlan.assignments) {
    if (typeof assignment !== "object" || assignment === null || Array.isArray(assignment)
      || !nonemptyText(assignment.worker_id)
      || !/^\d{4}-\d{2}-\d{2}-batch-\d+$/u.test(assignment.batch_name ?? "")
      || !nonemptyText(assignment.exclusive_write_root)
      || !Array.isArray(assignment.companies)
      || !Array.isArray(assignment.tasks)) {
      invalid("worker_plan_shape");
    }
    if (workerIds.has(assignment.worker_id) || batchNames.has(assignment.batch_name)) {
      invalid("worker_plan_shape");
    }
    workerIds.add(assignment.worker_id);
    batchNames.add(assignment.batch_name);
    const localCompanies = new Set();
    for (const company of assignment.companies) {
      if (!nonemptyText(company) || localCompanies.has(company) || companies.has(company)) {
        invalid("worker_plan_ownership");
      }
      localCompanies.add(company);
      companies.add(company);
    }
    for (const task of assignment.tasks) {
      if (typeof task !== "object" || task === null || Array.isArray(task)
        || !nonemptyText(task.company)
        || !nonemptyText(task.product_system)
        || !localCompanies.has(task.company)) {
        invalid("worker_plan_ownership");
      }
      const identity = productKey(task);
      if (products.has(identity)) invalid("worker_plan_ownership");
      products.add(identity);
    }
  }
}

function addError(errors, code, location, detail) {
  errors.push({ code, location, detail });
}

function compareErrors(left, right) {
  return compareUnicodeScalar(`${left.code}\0${left.location}\0${left.detail}`,
    `${right.code}\0${right.location}\0${right.detail}`);
}

function verifyAssignmentBatch(workerPlan, assignment, batch) {
  const errors = [];
  const taskSet = new Set(assignment.tasks.map(productKey));
  const companySet = new Set(assignment.companies);
  const completedTasks = new Set();
  const blockedTasks = new Set();
  const unavailableTasks = new Set();
  const sourceIds = new Set();
  const observationIds = new Set();
  const localSources = new Map();
  let sourceCount = 0;
  let observationCount = 0;

  if (typeof batch !== "object" || batch === null || Array.isArray(batch)
    || batch.batch_name !== assignment.batch_name
    || !Array.isArray(batch.sources)
    || !Array.isArray(batch.observations)
    || (batch.blocked_attempts !== undefined && !Array.isArray(batch.blocked_attempts))
    || (batch.unavailable_attempts !== undefined && !Array.isArray(batch.unavailable_attempts))) {
    addError(errors, "assignment_batch_shape", assignment.batch_name,
      "batch must have the exact reserved name plus sources, observations, and optional blocked attempts");
    return { errors, sourceCount, observationCount, completedTasks, blockedTasks, unavailableTasks };
  }

  for (const [index, source] of batch.sources.entries()) {
    const location = `${assignment.batch_name}/sources.jsonl:${index + 1}`;
    if (typeof source !== "object" || source === null || Array.isArray(source)
      || !nonemptyText(source.source_id)
      || !nonemptyText(source.company)
      || !nonemptyText(source.product_system)) {
      addError(errors, "source_shape", location, "source identity fields must be nonempty text");
      continue;
    }
    sourceCount += 1;
    if (sourceIds.has(source.source_id)) addError(errors, "duplicate_source_id", location, source.source_id);
    sourceIds.add(source.source_id);
    localSources.set(source.source_id, source);
    if (!companySet.has(source.company) || !taskSet.has(productKey(source))) {
      addError(errors, "source_outside_assignment", location,
        `${source.company} / ${source.product_system}`);
    }
  }

  for (const [index, observation] of batch.observations.entries()) {
    const location = `${assignment.batch_name}/observations.jsonl:${index + 1}`;
    if (typeof observation !== "object" || observation === null || Array.isArray(observation)
      || !nonemptyText(observation.observation_id)
      || !nonemptyText(observation.source_id)
      || !nonemptyText(observation.company)
      || !nonemptyText(observation.product_system)) {
      addError(errors, "observation_shape", location,
        "observation identity fields must be nonempty text");
      continue;
    }
    observationCount += 1;
    if (observationIds.has(observation.observation_id)) {
      addError(errors, "duplicate_observation_id", location, observation.observation_id);
    }
    observationIds.add(observation.observation_id);
    const identity = productKey(observation);
    if (!companySet.has(observation.company) || !taskSet.has(identity)) {
      addError(errors, "observation_outside_assignment", location,
        `${observation.company} / ${observation.product_system}`);
    }
    const source = localSources.get(observation.source_id);
    if (source === undefined) {
      addError(errors, "missing_source", location, observation.source_id);
    } else if (source.company !== observation.company
      || source.product_system !== observation.product_system) {
      addError(errors, "source_projection", location, observation.source_id);
    } else if (taskSet.has(identity)) {
      completedTasks.add(identity);
    }
  }

  for (const [index, attempt] of (batch.blocked_attempts ?? []).entries()) {
    const location = `${assignment.batch_name}/blocked-attempts.jsonl:${index + 1}`;
    const result = verifyBlockedAttempt(attempt, { workerPlan, assignment, taskSet });
    if (!result.valid) {
      addError(errors, result.code, location, "blocked attempt failed its closed contract");
      continue;
    }
    const identity = productKey(attempt);
    if (blockedTasks.has(identity)) {
      addError(errors, "duplicate_blocked_attempt", location,
        `${attempt.company} / ${attempt.product_system}`);
      continue;
    }
    if (completedTasks.has(identity)) {
      addError(errors, "blocked_attempt_conflict", location,
        "task has both retained evidence and a blocked-attempt disposition");
      continue;
    }
    blockedTasks.add(identity);
  }

  for (const [index, attempt] of (batch.unavailable_attempts ?? []).entries()) {
    const location = `${assignment.batch_name}/unavailable-attempts.jsonl:${index + 1}`;
    const result = verifyUnavailableAttempt(attempt, { workerPlan, assignment, taskSet });
    if (!result.valid) {
      addError(errors, result.code, location, "unavailable attempt failed its closed contract");
      continue;
    }
    const identity = productKey(attempt);
    if (unavailableTasks.has(identity)) {
      addError(errors, "duplicate_unavailable_attempt", location,
        `${attempt.company} / ${attempt.product_system}`);
      continue;
    }
    if (completedTasks.has(identity) || blockedTasks.has(identity)) {
      addError(errors, "unavailable_attempt_conflict", location,
        "task has evidence or a blocked disposition plus an unavailable disposition");
      continue;
    }
    unavailableTasks.add(identity);
  }

  for (const task of assignment.tasks) {
    const identity = productKey(task);
    if (!completedTasks.has(identity) && !blockedTasks.has(identity)
      && !unavailableTasks.has(identity)) {
      addError(errors, "incomplete_task", `${task.company} / ${task.product_system}`,
        "assigned product has no retained observation, blocked disposition, or unavailable disposition");
    }
  }
  errors.sort(compareErrors);
  return { errors, sourceCount, observationCount, completedTasks, blockedTasks, unavailableTasks };
}

export function verifyPublicProductCorpusWorkerAssignment({ workerPlan, assignmentId, batch }) {
  verifyWorkerPlan(workerPlan);
  if (!nonemptyText(assignmentId)) invalid("assignment_id");
  const assignment = workerPlan.assignments.find((item) => item.worker_id === assignmentId);
  if (assignment === undefined) invalid("assignment_id");

  const result = verifyAssignmentBatch(workerPlan, assignment, batch);
  const preimage = {
    contract_version: "contentmd.public-product-corpus-worker-assignment-report/0.1.0",
    source_worker_plan_digest: workerPlan.plan_digest,
    assignment: {
      worker_id: assignment.worker_id,
      batch_name: assignment.batch_name,
      exclusive_write_root: assignment.exclusive_write_root,
      product_count: assignment.product_count,
    },
    status: result.errors.length === 0 ? "pass" : "fail",
    counts: {
      sources: result.sourceCount,
      observations: result.observationCount,
      completed_tasks: result.completedTasks.size,
      blocked_tasks: result.blockedTasks.size,
      unavailable_tasks: result.unavailableTasks.size,
      incomplete_tasks: assignment.tasks.length - result.completedTasks.size
        - result.blockedTasks.size - result.unavailableTasks.size,
    },
    errors: result.errors,
    aggregate_corpus_verification_required: true,
    global_assignment_completion_required: true,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return deepFreeze({ ...preimage, report_digest: sha256Canonical(preimage) });
}

export function verifyPublicProductCorpusWorkerBatches({ workerPlan, batches }) {
  verifyWorkerPlan(workerPlan);
  if (!Array.isArray(batches)) invalid("input_shape");

  const errors = [];
  const batchesByName = new Map();
  for (const [index, batch] of batches.entries()) {
    if (typeof batch !== "object" || batch === null || Array.isArray(batch)
      || !nonemptyText(batch.batch_name)
      || !Array.isArray(batch.sources)
      || !Array.isArray(batch.observations)
      || (batch.blocked_attempts !== undefined && !Array.isArray(batch.blocked_attempts))
      || (batch.unavailable_attempts !== undefined && !Array.isArray(batch.unavailable_attempts))) {
      addError(errors, "batch_shape", `batches[${index}]`,
        "batch must contain a name, sources, observations, and optional blocked attempts");
      continue;
    }
    if (batchesByName.has(batch.batch_name)) {
      addError(errors, "duplicate_batch", batch.batch_name, "batch name appears more than once");
      continue;
    }
    batchesByName.set(batch.batch_name, batch);
  }

  const assignmentNames = new Set(workerPlan.assignments.map((item) => item.batch_name));
  for (const batchName of batchesByName.keys()) {
    if (!assignmentNames.has(batchName)) {
      addError(errors, "unexpected_batch", batchName, "batch is not reserved by the worker plan");
    }
  }

  const globalSourceIds = new Set();
  const globalObservationIds = new Set();
  const completedTasks = new Set();
  const blockedTasks = new Set();
  const unavailableTasks = new Set();
  let sourceCount = 0;
  let observationCount = 0;
  for (const assignment of workerPlan.assignments) {
    const batch = batchesByName.get(assignment.batch_name);
    const taskSet = new Set(assignment.tasks.map(productKey));
    const companySet = new Set(assignment.companies);
    if (batch === undefined) {
      addError(errors, "missing_batch", assignment.batch_name, "reserved worker batch is absent");
      continue;
    }
    const localSources = new Map();
    for (const [index, source] of batch.sources.entries()) {
      const location = `${assignment.batch_name}/sources.jsonl:${index + 1}`;
      if (typeof source !== "object" || source === null || Array.isArray(source)
        || !nonemptyText(source.source_id)
        || !nonemptyText(source.company)
        || !nonemptyText(source.product_system)) {
        addError(errors, "source_shape", location, "source identity fields must be nonempty text");
        continue;
      }
      sourceCount += 1;
      if (globalSourceIds.has(source.source_id)) {
        addError(errors, "duplicate_source_id", location, source.source_id);
      }
      globalSourceIds.add(source.source_id);
      localSources.set(source.source_id, source);
      if (!companySet.has(source.company) || !taskSet.has(productKey(source))) {
        addError(errors, "source_outside_assignment", location,
          `${source.company} / ${source.product_system}`);
      }
    }
    for (const [index, observation] of batch.observations.entries()) {
      const location = `${assignment.batch_name}/observations.jsonl:${index + 1}`;
      if (typeof observation !== "object" || observation === null || Array.isArray(observation)
        || !nonemptyText(observation.observation_id)
        || !nonemptyText(observation.source_id)
        || !nonemptyText(observation.company)
        || !nonemptyText(observation.product_system)) {
        addError(errors, "observation_shape", location,
          "observation identity fields must be nonempty text");
        continue;
      }
      observationCount += 1;
      if (globalObservationIds.has(observation.observation_id)) {
        addError(errors, "duplicate_observation_id", location, observation.observation_id);
      }
      globalObservationIds.add(observation.observation_id);
      const identity = productKey(observation);
      if (!companySet.has(observation.company) || !taskSet.has(identity)) {
        addError(errors, "observation_outside_assignment", location,
          `${observation.company} / ${observation.product_system}`);
      }
      const source = localSources.get(observation.source_id);
      if (source === undefined) {
        addError(errors, "missing_source", location, observation.source_id);
      } else if (source.company !== observation.company
        || source.product_system !== observation.product_system) {
        addError(errors, "source_projection", location, observation.source_id);
      } else if (taskSet.has(identity)) {
        completedTasks.add(identity);
      }
    }
    for (const [index, attempt] of (batch.blocked_attempts ?? []).entries()) {
      const location = `${assignment.batch_name}/blocked-attempts.jsonl:${index + 1}`;
      const result = verifyBlockedAttempt(attempt, { workerPlan, assignment, taskSet });
      if (!result.valid) {
        addError(errors, result.code, location, "blocked attempt failed its closed contract");
        continue;
      }
      const identity = productKey(attempt);
      if (blockedTasks.has(identity)) {
        addError(errors, "duplicate_blocked_attempt", location,
          `${attempt.company} / ${attempt.product_system}`);
        continue;
      }
      if (completedTasks.has(identity)) {
        addError(errors, "blocked_attempt_conflict", location,
          "task has both retained evidence and a blocked-attempt disposition");
        continue;
      }
      blockedTasks.add(identity);
    }
    for (const [index, attempt] of (batch.unavailable_attempts ?? []).entries()) {
      const location = `${assignment.batch_name}/unavailable-attempts.jsonl:${index + 1}`;
      const result = verifyUnavailableAttempt(attempt, { workerPlan, assignment, taskSet });
      if (!result.valid) {
        addError(errors, result.code, location, "unavailable attempt failed its closed contract");
        continue;
      }
      const identity = productKey(attempt);
      if (unavailableTasks.has(identity)) {
        addError(errors, "duplicate_unavailable_attempt", location,
          `${attempt.company} / ${attempt.product_system}`);
        continue;
      }
      if (completedTasks.has(identity) || blockedTasks.has(identity)) {
        addError(errors, "unavailable_attempt_conflict", location,
          "task has evidence or a blocked disposition plus an unavailable disposition");
        continue;
      }
      unavailableTasks.add(identity);
    }
  }

  const allTasks = workerPlan.assignments.flatMap((assignment) => assignment.tasks);
  for (const task of allTasks) {
    const identity = productKey(task);
    if (!completedTasks.has(identity) && !blockedTasks.has(identity)
      && !unavailableTasks.has(identity)) {
      addError(errors, "incomplete_task", `${task.company} / ${task.product_system}`,
        "assigned product has no retained observation, blocked disposition, or unavailable disposition");
    }
  }
  errors.sort(compareErrors);
  const preimage = {
    contract_version: "contentmd.public-product-corpus-worker-batch-report/0.1.0",
    source_worker_plan_digest: workerPlan.plan_digest,
    status: errors.length === 0 ? "pass" : "fail",
    counts: {
      assignments: workerPlan.assignments.length,
      batches_received: batchesByName.size,
      sources: sourceCount,
      observations: observationCount,
      completed_tasks: completedTasks.size,
      blocked_tasks: blockedTasks.size,
      unavailable_tasks: unavailableTasks.size,
      incomplete_tasks: allTasks.length - completedTasks.size - blockedTasks.size
        - unavailableTasks.size,
    },
    errors,
    aggregate_corpus_verification_required: true,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return deepFreeze({ ...preimage, report_digest: sha256Canonical(preimage) });
}

export async function readJsonLines(file, { allowEmpty = false } = {}) {
  const raw = await readFile(file, "utf8");
  if (raw === "") {
    if (allowEmpty) return [];
    invalid("batch_file");
  }
  if (!raw.endsWith("\n")) invalid("batch_file");
  return raw.trimEnd().split("\n").map((line) => JSON.parse(line));
}

async function readOptionalJsonLines(file) {
  try {
    return await readJsonLines(file, { allowEmpty: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

export function parseArguments(argv) {
  let root = "research/09-experimental/public-product-corpus";
  let asOf;
  let planFile;
  let assignmentId;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") root = argv[++index];
    else if (argument === "--as-of") asOf = argv[++index];
    else if (argument === "--plan") planFile = argv[++index];
    else if (argument === "--assignment") assignmentId = argv[++index];
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!nonemptyText(asOf)) throw new Error("--as-of is required");
  if (!nonemptyText(planFile)) throw new Error("--plan is required");
  if (assignmentId !== undefined && !nonemptyText(assignmentId)) {
    throw new Error("--assignment requires a worker ID");
  }
  return { root, asOf, planFile, assignmentId };
}

export function unwrapWorkerPlan(parsedPlan) {
  return parsedPlan?.worker_plan ?? parsedPlan?.discovery_worker_plan ?? parsedPlan;
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    const parsedPlan = JSON.parse(await readFile(options.planFile, "utf8"));
    const workerPlan = unwrapWorkerPlan(parsedPlan);
    verifyWorkerPlan(workerPlan);
    if (options.assignmentId !== undefined) {
      const assignment = workerPlan.assignments.find((item) => item.worker_id === options.assignmentId);
      if (assignment === undefined) throw new Error(`Unknown assignment: ${options.assignmentId}`);
      let batch = null;
      try {
        const batchRoot = path.join(options.root, assignment.batch_name);
        const [sources, observations, blockedAttempts, unavailableAttempts] = await Promise.all([
          readJsonLines(path.join(batchRoot, "sources.jsonl"), { allowEmpty: true }),
          readJsonLines(path.join(batchRoot, "observations.jsonl"), { allowEmpty: true }),
          readOptionalJsonLines(path.join(batchRoot, "blocked-attempts.jsonl")),
          readOptionalJsonLines(path.join(batchRoot, "unavailable-attempts.jsonl")),
        ]);
        batch = {
          batch_name: assignment.batch_name,
          sources,
          observations,
          blocked_attempts: blockedAttempts,
          unavailable_attempts: unavailableAttempts,
        };
      } catch {
        batch = { batch_name: assignment.batch_name, sources: [], observations: [] };
      }
      const workerAssignmentReport = verifyPublicProductCorpusWorkerAssignment({
        workerPlan,
        assignmentId: options.assignmentId,
        batch,
      });
      process.stdout.write(`${JSON.stringify({
        worker_assignment_report: workerAssignmentReport,
        aggregate_corpus_report: null,
      }, null, 2)}\n`);
      if (workerAssignmentReport.status !== "pass") process.exitCode = 1;
      return;
    }
    const batches = [];
    for (const assignment of workerPlan.assignments) {
      try {
        const batchRoot = path.join(options.root, assignment.batch_name);
        const [sources, observations, blockedAttempts, unavailableAttempts] = await Promise.all([
          readJsonLines(path.join(batchRoot, "sources.jsonl"), { allowEmpty: true }),
          readJsonLines(path.join(batchRoot, "observations.jsonl"), { allowEmpty: true }),
          readOptionalJsonLines(path.join(batchRoot, "blocked-attempts.jsonl")),
          readOptionalJsonLines(path.join(batchRoot, "unavailable-attempts.jsonl")),
        ]);
        batches.push({
          batch_name: assignment.batch_name,
          sources,
          observations,
          blocked_attempts: blockedAttempts,
          unavailable_attempts: unavailableAttempts,
        });
      } catch {
        // Missing or malformed batches are reported by the pure verifier as absent.
      }
    }
    const workerBatchReport = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
    let aggregateCorpusReport = null;
    if (workerBatchReport.status === "pass") {
      aggregateCorpusReport = await verifyPublicProductCorpus({
        root: options.root,
        asOf: options.asOf,
      });
    }
    process.stdout.write(`${JSON.stringify({
      worker_batch_report: workerBatchReport,
      aggregate_corpus_report: aggregateCorpusReport,
    }, null, 2)}\n`);
    if (workerBatchReport.status !== "pass" || aggregateCorpusReport?.status !== "pass") {
      process.exitCode = 1;
    }
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
