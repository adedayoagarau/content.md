import assert from "node:assert/strict";
import test from "node:test";

import {
  parseArguments,
  partitionPublicProductDiscoveryWorkers,
} from "./partition-public-product-discovery-workers.mjs";
import { verifyPublicProductDiscoverySeeds } from "./verify-public-product-discovery-seeds.mjs";
import { verifyPublicProductCorpusWorkerBatches } from "./verify-public-product-corpus-worker-batches.mjs";

const TAXONOMY = {
  contract_version: "contentmd.public-product-industry-taxonomy/0.1.0",
  industries: [
    { industry_id: "commerce", name: "Commerce", aliases: ["commerce"] },
    { industry_id: "education", name: "Education", aliases: ["education"] },
  ],
  authority_effect: "none",
};

function discoveryReportFixture() {
  const seeds = [
    ["alpha", "Alpha Org", "Alpha Product", "commerce", "Americas"],
    ["beta", "Beta Org", "Beta Product", "education", "Africa"],
    ["gamma", "Gamma Org", "Gamma Product", "commerce", "Europe"],
    ["delta", "Delta Org", "Delta Product", "education", "Asia"],
  ].map(([suffix, company, product_system, industry_alias, region]) => ({
    seed_id: `seed.${suffix}`,
    company,
    product_system,
    industry_alias,
    entry_url: `https://${suffix}.example/`,
    region,
    priority_reason: `expand ${region} coverage`,
    discovered_at: "2026-08-24T00:00:00-07:00",
    status: "unverified_candidate",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  }));
  return verifyPublicProductDiscoverySeeds({
    seeds,
    existingSources: [],
    industryTaxonomy: TAXONOMY,
    asOf: "2026-08-24",
  });
}

test("partitions verified discovery candidates into exclusive worker batches", () => {
  const discoveryReport = discoveryReportFixture();
  const plan = partitionPublicProductDiscoveryWorkers({
    discoveryReport,
    batchDate: "2026-08-24",
    startingBatch: 69,
    workerCount: 2,
  });

  assert.equal(plan.contract_version, "contentmd.public-product-discovery-worker-plan/0.1.0");
  assert.equal(plan.source_discovery_report_digest, discoveryReport.report_digest);
  assert.deepEqual(plan.assignments.map((assignment) => ({
    worker_id: assignment.worker_id,
    batch_name: assignment.batch_name,
    company_count: assignment.company_count,
    product_count: assignment.product_count,
  })), [
    {
      worker_id: "discovery-worker-01",
      batch_name: "2026-08-24-batch-69",
      company_count: 2,
      product_count: 2,
    },
    {
      worker_id: "discovery-worker-02",
      batch_name: "2026-08-24-batch-70",
      company_count: 2,
      product_count: 2,
    },
  ]);
  const tasks = plan.assignments.flatMap((assignment) => assignment.tasks);
  assert.equal(tasks.length, 4);
  assert.equal(new Set(tasks.map((task) => task.company)).size, 4);
  assert.ok(tasks.every((task) => task.queue === "new_company_discovery"));
  assert.ok(tasks.every((task) => task.collection_action === "establish_direct_ui_evidence"));
  assert.equal(plan.authority_effect, "none");
  assert.equal(plan.prompt_eligibility, "never");
  assert.equal(plan.training_eligibility, "never");
  assert.equal(plan.benchmark_eligibility, false);
  assert.match(plan.plan_digest, /^[0-9a-f]{64}$/u);
  assert.equal(Object.isFrozen(plan), true);
});

test("produces a worker plan accepted by the shared ownership verifier", () => {
  const plan = partitionPublicProductDiscoveryWorkers({
    discoveryReport: discoveryReportFixture(),
    batchDate: "2026-08-24",
    startingBatch: 69,
    workerCount: 2,
  });
  const batches = plan.assignments.map((assignment) => {
    const sources = assignment.tasks.map((task, index) => ({
      source_id: `${assignment.worker_id}.source.${index}`,
      company: task.company,
      product_system: task.product_system,
    }));
    return {
      batch_name: assignment.batch_name,
      sources,
      observations: assignment.tasks.map((task, index) => ({
        observation_id: `${assignment.worker_id}.observation.${index}`,
        source_id: sources[index].source_id,
        company: task.company,
        product_system: task.product_system,
      })),
    };
  });
  const report = verifyPublicProductCorpusWorkerBatches({ workerPlan: plan, batches });
  assert.equal(report.status, "pass");
  assert.equal(report.counts.completed_tasks, 4);
});

test("rejects tampered or unschedulable discovery reports", () => {
  const tampered = structuredClone(discoveryReportFixture());
  tampered.discovery_queue[0].company = "Tampered Org";
  assert.throws(
    () => partitionPublicProductDiscoveryWorkers({
      discoveryReport: tampered,
      batchDate: "2026-08-24",
      startingBatch: 69,
      workerCount: 2,
    }),
    /public_product_discovery_partition_invalid:source_report_digest/u,
  );

  const failed = structuredClone(discoveryReportFixture());
  failed.status = "fail";
  failed.scheduling_eligible = false;
  assert.throws(
    () => partitionPublicProductDiscoveryWorkers({
      discoveryReport: failed,
      batchDate: "2026-08-24",
      startingBatch: 69,
      workerCount: 2,
    }),
    /public_product_discovery_partition_invalid:source_report_digest/u,
  );
});

test("fails closed when workers exceed available company owners", () => {
  assert.throws(
    () => partitionPublicProductDiscoveryWorkers({
      discoveryReport: discoveryReportFixture(),
      batchDate: "2026-08-24",
      startingBatch: 69,
      workerCount: 5,
    }),
    /public_product_discovery_partition_invalid:worker_count/u,
  );
});

test("parses coordinator-owned discovery batch arguments", () => {
  assert.deepEqual(parseArguments([
    "--root", "research/corpus",
    "--seeds", "research/seeds.jsonl",
    "--as-of", "2026-08-24",
    "--workers", "4",
    "--start-batch", "69",
  ]), {
    root: "research/corpus",
    seedsFile: "research/seeds.jsonl",
    asOf: "2026-08-24",
    batchDate: "2026-08-24",
    startingBatch: 69,
    workerCount: 4,
  });
});
