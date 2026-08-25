import assert from "node:assert/strict";
import test from "node:test";

import { planPublicProductCorpusExpansion } from "./plan-public-product-corpus-expansion.mjs";
import {
  parseArguments,
  partitionPublicProductCorpusWorkers,
} from "./partition-public-product-corpus-workers.mjs";

function expansionFixture() {
  const sources = [
    ["source.alpha.one", "Alpha Org", "Alpha One", "actual UI", "commerce"],
    ["source.alpha.two", "Alpha Org", "Alpha Two", "official content guidance", "commerce"],
    ["source.beta", "Beta Org", "Beta Product", "actual UI", "education"],
    ["source.gamma", "Gamma Org", "Gamma Product", "actual UI", "healthcare"],
    ["source.delta", "Delta Org", "Delta Product", "official content guidance", "mobility"],
  ].map(([source_id, company, product_system, source_class, normalized_industry_id]) => ({
    source_id,
    company,
    product_system,
    source_class,
    normalized_industry_id,
  }));
  const stateCounts = new Map([
    ["source.alpha.one", 1],
    ["source.beta", 4],
    ["source.gamma", 2],
  ]);
  const observations = [];
  for (const source of sources) {
    for (let index = 0; index < (stateCounts.get(source.source_id) ?? 0); index += 1) {
      observations.push({
        observation_id: `observation.${source.source_id}.${index}`,
        source_id: source.source_id,
        company: source.company,
        product_system: source.product_system,
        normalized_industry_id: source.normalized_industry_id,
        journey: "journey",
        event_state: `state-${index}`,
        direct_ui: true,
      });
    }
  }
  return planPublicProductCorpusExpansion({
    sources,
    observations,
    targets: {
      companies: 20,
      products: 50,
      industries: 10,
      directStatesPerProduct: 5,
    },
  });
}

test("partitions every company into one exclusive worker batch", () => {
  const sourcePlan = expansionFixture();
  const plan = partitionPublicProductCorpusWorkers({
    sourcePlan,
    batchDate: "2026-08-24",
    startingBatch: 65,
    workerCount: 3,
  });

  assert.deepEqual(plan.assignments.map((assignment) => ({
    worker_id: assignment.worker_id,
    batch_name: assignment.batch_name,
    companies: assignment.companies,
    product_count: assignment.product_count,
  })), [
    {
      worker_id: "corpus-worker-01",
      batch_name: "2026-08-24-batch-65",
      companies: ["Beta Org", "Delta Org"],
      product_count: 2,
    },
    {
      worker_id: "corpus-worker-02",
      batch_name: "2026-08-24-batch-66",
      companies: ["Gamma Org"],
      product_count: 1,
    },
    {
      worker_id: "corpus-worker-03",
      batch_name: "2026-08-24-batch-67",
      companies: ["Alpha Org"],
      product_count: 2,
    },
  ]);

  const tasks = plan.assignments.flatMap((assignment) => assignment.tasks);
  assert.equal(tasks.length, 5);
  assert.equal(new Set(tasks.map((task) => `${task.company}\0${task.product_system}`)).size, 5);
  assert.equal(new Set(plan.assignments.flatMap((assignment) => assignment.companies)).size, 4);
  assert.equal(plan.source_expansion_plan_digest, sourcePlan.plan_digest);
  assert.match(plan.plan_digest, /^[0-9a-f]{64}$/u);
  assert.equal(plan.execution_model, "portable_assignment_manifest");
  assert.equal(plan.collection_operator_only, true);
  assert.equal(plan.authority_effect, "none");
  assert.equal(plan.prompt_eligibility, "never");
  assert.equal(plan.training_eligibility, "never");
  assert.equal(plan.benchmark_eligibility, false);
  assert.equal(Object.isFrozen(plan), true);
  assert.equal(Object.isFrozen(plan.assignments[0].tasks), true);
});

test("is deterministic and rejects a tampered source plan", () => {
  const sourcePlan = expansionFixture();
  const input = {
    sourcePlan,
    batchDate: "2026-08-24",
    startingBatch: 65,
    workerCount: 3,
  };
  assert.deepEqual(
    partitionPublicProductCorpusWorkers(input),
    partitionPublicProductCorpusWorkers(input),
  );

  const tampered = structuredClone(sourcePlan);
  tampered.state_completion_queue[0].company = "Tampered Org";
  assert.throws(
    () => partitionPublicProductCorpusWorkers({ ...input, sourcePlan: tampered }),
    /corpus_worker_partition_invalid:source_plan_digest/u,
  );
});

test("fails closed when workers exceed exclusive company partitions", () => {
  assert.throws(
    () => partitionPublicProductCorpusWorkers({
      sourcePlan: expansionFixture(),
      batchDate: "2026-08-24",
      startingBatch: 65,
      workerCount: 5,
    }),
    /corpus_worker_partition_invalid:worker_count/u,
  );
});

test("parses an explicit coordinator-owned batch range", () => {
  assert.deepEqual(parseArguments([
    "--as-of", "2026-08-24",
    "--workers", "4",
    "--start-batch", "65",
  ]), {
    root: "research/09-experimental/public-product-corpus",
    asOf: "2026-08-24",
    batchDate: "2026-08-24",
    startingBatch: 65,
    workerCount: 4,
  });
});
