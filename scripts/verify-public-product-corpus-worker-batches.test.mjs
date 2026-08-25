import assert from "node:assert/strict";
import test from "node:test";

import { planPublicProductCorpusExpansion } from "./plan-public-product-corpus-expansion.mjs";
import { partitionPublicProductCorpusWorkers } from "./partition-public-product-corpus-workers.mjs";
import {
  finalizePublicProductBlockedAttempt,
  parseArguments,
  verifyPublicProductCorpusWorkerAssignment,
  verifyPublicProductCorpusWorkerBatches,
} from "./verify-public-product-corpus-worker-batches.mjs";

function workerPlanFixture() {
  const sources = [
    ["source.alpha", "Alpha Org", "Alpha Product", "actual UI", "commerce"],
    ["source.beta", "Beta Org", "Beta Product", "actual UI", "education"],
    ["source.gamma", "Gamma Org", "Gamma Product", "official content guidance", "healthcare"],
  ].map(([source_id, company, product_system, source_class, normalized_industry_id]) => ({
    source_id,
    company,
    product_system,
    source_class,
    normalized_industry_id,
  }));
  const observations = sources.slice(0, 2).map((source, index) => ({
    observation_id: `observation.${index}`,
    source_id: source.source_id,
    company: source.company,
    product_system: source.product_system,
    normalized_industry_id: source.normalized_industry_id,
    journey: "entry",
    event_state: "landing",
    direct_ui: true,
  }));
  const sourcePlan = planPublicProductCorpusExpansion({
    sources,
    observations,
    targets: {
      companies: 10,
      products: 20,
      industries: 5,
      directStatesPerProduct: 5,
    },
  });
  return partitionPublicProductCorpusWorkers({
    sourcePlan,
    batchDate: "2026-08-24",
    startingBatch: 65,
    workerCount: 2,
  });
}

function completedBatches(workerPlan) {
  return workerPlan.assignments.map((assignment) => {
    const sources = assignment.tasks.map((task, index) => ({
      source_id: `${assignment.worker_id}.source.${index}`,
      company: task.company,
      product_system: task.product_system,
    }));
    const observations = assignment.tasks.map((task, index) => ({
      observation_id: `${assignment.worker_id}.observation.${index}`,
      source_id: sources[index].source_id,
      company: task.company,
      product_system: task.product_system,
    }));
    return { batch_name: assignment.batch_name, sources, observations, blocked_attempts: [] };
  });
}

function blockedAttempt(workerPlan, assignment, task) {
  return finalizePublicProductBlockedAttempt({
    source_worker_plan_digest: workerPlan.plan_digest,
    batch_name: assignment.batch_name,
    worker_id: assignment.worker_id,
    company: task.company,
    product_system: task.product_system,
    source_url: "https://blocked.example/",
    attempted_at: "2026-08-24T12:00:00Z",
    block_class: "site_access_block",
    detail: "Public site rejected automated access; no bypass attempted.",
    bypass_attempted: false,
    retained_as_product_evidence: false,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  });
}

test("accepts only complete evidence inside each worker's exclusive assignment", () => {
  const workerPlan = workerPlanFixture();
  const report = verifyPublicProductCorpusWorkerBatches({
    workerPlan,
    batches: completedBatches(workerPlan),
  });

  assert.equal(report.status, "pass");
  assert.deepEqual(report.errors, []);
  assert.equal(report.counts.assignments, 2);
  assert.equal(report.counts.completed_tasks, 3);
  assert.equal(report.counts.incomplete_tasks, 0);
  assert.equal(report.source_worker_plan_digest, workerPlan.plan_digest);
  assert.match(report.report_digest, /^[0-9a-f]{64}$/u);
  assert.equal(report.authority_effect, "none");
  assert.equal(report.prompt_eligibility, "never");
  assert.equal(report.training_eligibility, "never");
  assert.equal(report.benchmark_eligibility, false);
  assert.equal(Object.isFrozen(report), true);
});

test("validates a complete assigned batch without claiming aggregate corpus readiness", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  const assignment = workerPlan.assignments[0];
  const report = verifyPublicProductCorpusWorkerAssignment({
    workerPlan,
    assignmentId: assignment.worker_id,
    batch: batches[0],
  });

  assert.equal(report.status, "pass");
  assert.equal(report.assignment.worker_id, assignment.worker_id);
  assert.equal(report.assignment.batch_name, assignment.batch_name);
  assert.equal(report.counts.completed_tasks, assignment.tasks.length);
  assert.equal(report.aggregate_corpus_verification_required, true);
  assert.equal(report.global_assignment_completion_required, true);
  assert.equal(report.authority_effect, "none");
  assert.equal(report.prompt_eligibility, "never");
  assert.equal(report.training_eligibility, "never");
  assert.equal(report.benchmark_eligibility, false);

  const aggregate = verifyPublicProductCorpusWorkerBatches({
    workerPlan,
    batches: [batches[0]],
  });
  assert.equal(aggregate.status, "fail");
  assert.ok(aggregate.errors.some((error) => error.code === "missing_batch"));
});

test("rejects evidence written into another worker's batch", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  const foreignTask = workerPlan.assignments[1].tasks[0];
  batches[0].sources.push({
    source_id: "foreign.source",
    company: foreignTask.company,
    product_system: foreignTask.product_system,
  });
  batches[0].observations.push({
    observation_id: "foreign.observation",
    source_id: "foreign.source",
    company: foreignTask.company,
    product_system: foreignTask.product_system,
  });

  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
  assert.equal(report.status, "fail");
  assert.ok(report.errors.some((error) => error.code === "source_outside_assignment"));
  assert.ok(report.errors.some((error) => error.code === "observation_outside_assignment"));
});

test("fails closed on missing batches and incomplete tasks", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  batches[0].observations.pop();
  batches.pop();

  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
  assert.equal(report.status, "fail");
  assert.ok(report.errors.some((error) => error.code === "missing_batch"));
  assert.ok(report.errors.some((error) => error.code === "incomplete_task"));
});

test("accepts a digest-bound blocked attempt for ownership completion without evidence credit", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  const assignment = workerPlan.assignments[0];
  const task = assignment.tasks[0];
  batches[0].sources.shift();
  batches[0].observations.shift();
  batches[0].blocked_attempts.push(blockedAttempt(workerPlan, assignment, task));

  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
  assert.equal(report.status, "pass");
  assert.equal(report.counts.sources, 2);
  assert.equal(report.counts.observations, 2);
  assert.equal(report.counts.completed_tasks, 2);
  assert.equal(report.counts.blocked_tasks, 1);
  assert.equal(report.counts.incomplete_tasks, 0);
  assert.equal(report.aggregate_corpus_verification_required, true);
});

test("rejects a tampered or authority-enlarging blocked attempt and leaves its task incomplete", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  const assignment = workerPlan.assignments[0];
  const task = assignment.tasks[0];
  batches[0].sources.shift();
  batches[0].observations.shift();
  const attempt = structuredClone(blockedAttempt(workerPlan, assignment, task));
  attempt.bypass_attempted = true;
  batches[0].blocked_attempts.push(attempt);

  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
  assert.equal(report.status, "fail");
  assert.equal(report.counts.blocked_tasks, 0);
  assert.equal(report.counts.incomplete_tasks, 1);
  assert.ok(report.errors.some((error) => error.code === "blocked_attempt_policy"));
  assert.ok(report.errors.some((error) => error.code === "incomplete_task"));
});

test("rejects blocked attempts outside the reserved worker batch", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  const assignment = workerPlan.assignments[0];
  const foreignTask = workerPlan.assignments[1].tasks[0];
  batches[0].blocked_attempts.push(blockedAttempt(workerPlan, assignment, foreignTask));

  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
  assert.equal(report.status, "fail");
  assert.ok(report.errors.some((error) => error.code === "blocked_attempt_outside_assignment"));
});

test("rejects duplicate evidence identities across worker batches", () => {
  const workerPlan = workerPlanFixture();
  const batches = completedBatches(workerPlan);
  batches[0].sources[0].source_id = batches[1].sources[0].source_id;
  batches[0].observations[0].source_id = batches[0].sources[0].source_id;

  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan, batches });
  assert.equal(report.status, "fail");
  assert.ok(report.errors.some((error) => error.code === "duplicate_source_id"));
});

test("rejects a worker plan whose digest no longer matches its assignments", () => {
  const workerPlan = structuredClone(workerPlanFixture());
  workerPlan.assignments[0].companies[0] = "Tampered Org";
  assert.throws(
    () => verifyPublicProductCorpusWorkerBatches({ workerPlan, batches: [] }),
    /corpus_worker_batch_invalid:worker_plan_digest/u,
  );
});

test("parses a coordinator-owned single-assignment verification invocation", () => {
  assert.deepEqual(parseArguments([
    "--as-of", "2026-08-24",
    "--plan", "worker-plan.json",
    "--assignment", "corpus-worker-01",
  ]), {
    root: "research/09-experimental/public-product-corpus",
    asOf: "2026-08-24",
    planFile: "worker-plan.json",
    assignmentId: "corpus-worker-01",
  });
});
