#!/usr/bin/env node

import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import { planPublicProductCorpusExpansion } from "./plan-public-product-corpus-expansion.mjs";
import { verifyPublicProductCorpus } from "./verify-public-product-corpus.mjs";

function invalid(code) {
  throw new TypeError(`corpus_worker_partition_invalid:${code}`);
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

function nonemptyScalarText(value, code) {
  if (typeof value !== "string" || value.trim() === "") invalid(code);
  for (const point of value) {
    const scalar = point.codePointAt(0);
    if (scalar >= 0xD800 && scalar <= 0xDFFF) invalid(code);
  }
  return value;
}

function positiveInteger(value, code) {
  if (!Number.isSafeInteger(value) || value < 1) invalid(code);
  return value;
}

function verifySourcePlan(sourcePlan) {
  if (typeof sourcePlan !== "object" || sourcePlan === null || Array.isArray(sourcePlan)) {
    invalid("source_plan_shape");
  }
  if (sourcePlan.contract_version !== "contentmd.public-product-corpus-expansion-plan/0.1.0"
    || !Array.isArray(sourcePlan.state_completion_queue)
    || !Array.isArray(sourcePlan.direct_ui_start_queue)
    || !/^[0-9a-f]{64}$/u.test(sourcePlan.plan_digest ?? "")) {
    invalid("source_plan_shape");
  }
  const { plan_digest: planDigest, ...preimage } = sourcePlan;
  if (sha256Canonical(preimage) !== planDigest) invalid("source_plan_digest");
}

function normalizeTask(task, queue) {
  if (typeof task !== "object" || task === null || Array.isArray(task)) {
    invalid("task_shape");
  }
  for (const field of ["company", "product_system", "normalized_industry_id", "collection_action"]) {
    nonemptyScalarText(task[field], "task_shape");
  }
  positiveInteger(task.missing_state_count, "task_shape");
  if (!Number.isSafeInteger(task.observed_state_count) || task.observed_state_count < 0
    || !Number.isSafeInteger(task.priority_rank) || task.priority_rank < 0
    || !Array.isArray(task.source_ids)
    || task.source_ids.some((value) => typeof value !== "string" || value.trim() === "")
    || !Array.isArray(task.observed_states)) {
    invalid("task_shape");
  }
  return {
    queue,
    priority_rank: task.priority_rank,
    company: task.company,
    product_system: task.product_system,
    normalized_industry_id: task.normalized_industry_id,
    source_ids: [...task.source_ids],
    observed_state_count: task.observed_state_count,
    missing_state_count: task.missing_state_count,
    observed_states: task.observed_states.map((state) => ({ ...state })),
    collection_action: task.collection_action,
  };
}

function taskOrder(left, right) {
  const queueDifference = (left.queue === "state_completion" ? 0 : 1)
    - (right.queue === "state_completion" ? 0 : 1);
  return queueDifference
    || left.priority_rank - right.priority_rank
    || compareUnicodeScalar(left.normalized_industry_id, right.normalized_industry_id)
    || compareUnicodeScalar(left.company, right.company)
    || compareUnicodeScalar(left.product_system, right.product_system);
}

export function partitionPublicProductCorpusWorkers({
  sourcePlan,
  batchDate,
  startingBatch,
  workerCount,
}) {
  verifySourcePlan(sourcePlan);
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(batchDate ?? "")
    || !Number.isFinite(Date.parse(`${batchDate}T00:00:00Z`))) {
    invalid("batch_date");
  }
  positiveInteger(startingBatch, "starting_batch");
  positiveInteger(workerCount, "worker_count");
  if (!Number.isSafeInteger(startingBatch + workerCount - 1)) invalid("starting_batch");

  const tasks = [
    ...sourcePlan.state_completion_queue.map((task) => normalizeTask(task, "state_completion")),
    ...sourcePlan.direct_ui_start_queue.map((task) => normalizeTask(task, "direct_ui_start")),
  ];
  const taskIdentities = new Set();
  const companyGroups = new Map();
  for (const task of tasks) {
    const identity = `${task.company}\0${task.product_system}`;
    if (taskIdentities.has(identity)) invalid("duplicate_task");
    taskIdentities.add(identity);
    const group = companyGroups.get(task.company) ?? [];
    group.push(task);
    companyGroups.set(task.company, group);
  }
  if (tasks.length === 0 || workerCount > companyGroups.size) invalid("worker_count");

  const groups = [...companyGroups]
    .map(([company, companyTasks]) => ({
      company,
      tasks: companyTasks.sort(taskOrder),
    }))
    .sort((left, right) => (
      taskOrder(left.tasks[0], right.tasks[0])
        || compareUnicodeScalar(left.company, right.company)
    ));
  const workers = Array.from({ length: workerCount }, (_, index) => ({
    index,
    companies: [],
    tasks: [],
  }));
  for (const group of groups) {
    const worker = [...workers].sort((left, right) => (
      left.tasks.length - right.tasks.length
        || left.companies.length - right.companies.length
        || left.index - right.index
    ))[0];
    worker.companies.push(group.company);
    worker.tasks.push(...group.tasks);
  }

  const assignments = workers.map((worker) => ({
    worker_id: `corpus-worker-${String(worker.index + 1).padStart(2, "0")}`,
    batch_name: `${batchDate}-batch-${startingBatch + worker.index}`,
    exclusive_write_root:
      `research/09-experimental/public-product-corpus/${batchDate}-batch-${startingBatch + worker.index}`,
    companies: worker.companies.sort(compareUnicodeScalar),
    company_count: worker.companies.length,
    product_count: worker.tasks.length,
    tasks: worker.tasks.sort(taskOrder),
  }));
  const preimage = {
    contract_version: "contentmd.public-product-corpus-worker-plan/0.1.0",
    source_expansion_plan_digest: sourcePlan.plan_digest,
    batch_date: batchDate,
    starting_batch: startingBatch,
    worker_count: workerCount,
    assignments,
    execution_model: "portable_assignment_manifest",
    collection_policy: {
      browser: "chrome",
      access_boundary: "signed-out public pages only",
      append_only: true,
      one_company_owner: true,
      no_login_or_transaction: true,
      evidence_only: true,
    },
    collection_operator_only: true,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return deepFreeze({ ...preimage, plan_digest: sha256Canonical(preimage) });
}

function readPositiveInteger(argument, value) {
  if (!/^\d+$/u.test(value ?? "")) throw new Error(`${argument} requires a positive integer`);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new Error(`${argument} requires a positive integer`);
  }
  return parsed;
}

export function parseArguments(argv) {
  let root = "research/09-experimental/public-product-corpus";
  let asOf;
  let workerCount;
  let startingBatch;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") root = argv[++index];
    else if (argument === "--as-of") asOf = argv[++index];
    else if (argument === "--workers") {
      workerCount = readPositiveInteger(argument, argv[++index]);
    } else if (argument === "--start-batch") {
      startingBatch = readPositiveInteger(argument, argv[++index]);
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (typeof asOf !== "string" || asOf.trim() === "") throw new Error("--as-of is required");
  if (workerCount === undefined) throw new Error("--workers is required");
  if (startingBatch === undefined) throw new Error("--start-batch is required");
  const batchDate = asOf.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(batchDate)) throw new Error("--as-of must start with a date");
  return { root, asOf, batchDate, startingBatch, workerCount };
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    const corpus = await verifyPublicProductCorpus({
      root: options.root,
      asOf: options.asOf,
      includeQualifiedEvidence: true,
    });
    const sourcePlan = planPublicProductCorpusExpansion({
      ...corpus.qualified_evidence,
    });
    const workerPlan = partitionPublicProductCorpusWorkers({
      sourcePlan,
      batchDate: options.batchDate,
      startingBatch: options.startingBatch,
      workerCount: options.workerCount,
    });
    process.stdout.write(`${JSON.stringify({
      source_corpus_status: corpus.status,
      source_corpus_error_count: corpus.errors.length,
      worker_plan: workerPlan,
    }, null, 2)}\n`);
    if (corpus.status !== "pass") process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
