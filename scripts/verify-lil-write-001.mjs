import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const DIGEST = /^[a-f0-9]{64}$/u;
const PRODUCTS = ["commerce", "education", "finance", "health", "public-service", "transport"];
const FIXTURE_MARK = {
  fixture_status: "synthetic_test_only",
  official_attempt_effect: "none",
  benchmark_claim_eligibility: false,
};
const REQUIRED_FILES = [
  "attempt.json",
  "candidate-sets.jsonl",
  "manifest.json",
  "randomization.json",
  "result.json",
  "reviewer-allocations.json",
  "reviews.jsonl",
  "rubric.json",
  "selections.jsonl",
  "task-dispositions.jsonl",
  "tasks.jsonl",
];

function canonicalize(value, path = "$") {
  if (value === null || typeof value === "boolean" || typeof value === "string") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error(`noncanonical_number:${path}`);
    return Object.is(value, -0) ? 0 : value;
  }
  if (Array.isArray(value)) return value.map((entry, index) => canonicalize(entry, `${path}[${index}]`));
  if (typeof value !== "object") throw new Error(`noncanonical_value:${path}`);
  const result = {};
  for (const key of Object.keys(value).sort()) result[key] = canonicalize(value[key], `${path}.${key}`);
  return result;
}

const canonicalJson = (value) => JSON.stringify(canonicalize(value));
const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const sha256Canonical = (value) => sha256(`${canonicalJson(value)}\n`);

function assert(condition, code) {
  if (!condition) throw new Error(`lil_write_001_verification_failed:${code}`);
}

function fixtureMarked(value) {
  return value?.fixture_status === FIXTURE_MARK.fixture_status
    && value?.official_attempt_effect === FIXTURE_MARK.official_attempt_effect
    && value?.benchmark_claim_eligibility === FIXTURE_MARK.benchmark_claim_eligibility;
}

function verifySeal(kind, value) {
  assert(fixtureMarked(value), `${kind}_fixture_mark`);
  const digestKey = `${kind}_digest`;
  assert(DIGEST.test(value[digestKey] ?? ""), `${kind}_digest_shape`);
  const preimage = structuredClone(value);
  delete preimage[digestKey];
  delete preimage.fixture_status;
  delete preimage.official_attempt_effect;
  delete preimage.benchmark_claim_eligibility;
  assert(value[digestKey] === sha256Canonical({
    contract: `contentmd.lil-write-001-${kind}/0.1.0`,
    ...preimage,
  }), `${kind}_digest`);
}

async function readCanonicalJson(path) {
  const raw = await readFile(path, "utf8");
  assert(raw.endsWith("\n") && !raw.endsWith("\n\n"), `newline:${path}`);
  const value = JSON.parse(raw);
  assert(raw === `${canonicalJson(value)}\n`, `canonical_json:${path}`);
  return value;
}

async function readCanonicalJsonl(path) {
  const raw = await readFile(path, "utf8");
  assert(raw.endsWith("\n") && !raw.endsWith("\n\n"), `newline:${path}`);
  const values = raw.slice(0, -1).split("\n").map((line) => JSON.parse(line));
  assert(raw === `${values.map(canonicalJson).join("\n")}\n`, `canonical_jsonl:${path}`);
  return values;
}

function exactCount(entries, expected) {
  return entries.length === expected.length && entries.every((entry, index) =>
    entry.key === expected[index].key && entry.count === expected[index].count);
}

function verifyManifest(manifest, tasks) {
  verifySeal("manifest", manifest);
  assert(manifest.benchmark_id === "LIL-WRITE-001" && tasks.length === 60, "manifest_identity");
  assert(tasks.every((task) => {
    verifySeal("task", task);
    return task.benchmark_id === "LIL-WRITE-001" && task.ownership === "project_owned_synthetic";
  }), "task_identity");
  const taskIds = new Set(tasks.map((task) => task.task_id));
  assert(taskIds.size === 60 && manifest.task_refs.length === 60, "task_bijection");
  assert(manifest.task_refs.every((ref, index) => ref.task_id === tasks[index].task_id
    && ref.task_digest === tasks[index].task_digest), "task_refs");
  const products = PRODUCTS.map((key) => ({ key, count: 10 }));
  assert(exactCount(manifest.product_counts, products), "product_counts");
  assert(exactCount(manifest.channel_counts, [{ key: "notification", count: 12 }, { key: "web", count: 48 }]), "channel_counts");
  assert(exactCount(manifest.locale_counts, [{ key: "en-GB", count: 30 }, { key: "en-US", count: 30 }]), "locale_counts");
  assert(exactCount(manifest.task_type_counts, [{ key: "contextual_microcopy", count: 48 }, { key: "strategy", count: 12 }]), "task_type_counts");
  assert(manifest.family_counts.length === 10 && manifest.family_counts.every((entry) => entry.count === 6), "family_counts");
  assert(manifest.intersection_counts.length === 60
    && manifest.intersection_counts.every((entry) => entry.keys.length === 6 && entry.count === 1), "intersection_counts");
  const heldOutFamilies = new Set(tasks.map((task) => task.family_id));
  const heldOutLineages = new Set(tasks.flatMap((task) => task.semantic_lineage_ids));
  const heldOutTemplates = new Set(tasks.flatMap((task) => task.template_ids));
  const heldOutLeakage = new Set(tasks.flatMap((task) => task.leakage_group_ids));
  for (const [values, heldOut, name] of [
    [manifest.training_partition.pattern_family_ids, heldOutFamilies, "family"],
    [manifest.training_partition.semantic_lineage_ids, heldOutLineages, "lineage"],
    [manifest.training_partition.template_ids, heldOutTemplates, "template"],
    [manifest.training_partition.leakage_group_ids, heldOutLeakage, "leakage"],
  ]) assert(values.every((value) => !heldOut.has(value)), `training_overlap:${name}`);
}

function verifyCandidateSets(tasks, candidateSets) {
  assert(candidateSets.length === 60, "candidate_set_count");
  const tasksById = new Map(tasks.map((task) => [task.task_id, task]));
  const taskIds = new Set();
  const planIds = new Set();
  const nonces = new Set();
  const receiptDigests = new Set();
  for (const candidateSet of candidateSets) {
    verifySeal("candidate_set", candidateSet);
    const task = tasksById.get(candidateSet.task_id);
    assert(task !== undefined && !taskIds.has(candidateSet.task_id), "candidate_task_bijection");
    taskIds.add(candidateSet.task_id);
    const plan = candidateSet.plan;
    const { plan_id: planId, plan_digest: planDigest, ...planBase } = plan;
    const expectedPlanDigest = sha256Canonical({
      contract: "contentmd.lil-write-001-provider-plan/0.1.0",
      ...planBase,
    });
    assert(planDigest === expectedPlanDigest
      && planId === `provider-execution-plan.${planDigest.slice(0, 32)}`
      && plan.task_id === task.task_id
      && plan.context_evidence_digest === task.context_evidence_digest
      && plan.provider_id === "provider.synthetic.recorded"
      && plan.returned_model_id === "model.synthetic.recorded-1"
      && plan.alternatives_count === 4
      && plan.output_token_budget === 512, "provider_plan");
    assert(!planIds.has(planId) && !nonces.has(plan.nonce), "provider_plan_unique");
    planIds.add(planId);
    nonces.add(plan.nonce);
    assert(candidateSet.nonce_claim_digest === sha256Canonical({
      contract: "contentmd.lil-write-001-nonce-claim/0.1.0",
      plan_id: planId,
      nonce: plan.nonce,
      disposition: "claimed",
    }), "nonce_claim");
    assert(candidateSet.provider_receipt_digest === sha256Canonical({
      contract: "contentmd.lil-write-001-provider-receipt/0.1.0",
      plan_id: planId,
      nonce_claim_digest: candidateSet.nonce_claim_digest,
      provider_output_digest: candidateSet.provider_output_digest,
      outcome_state: "completed",
    }) && !receiptDigests.has(candidateSet.provider_receipt_digest), "provider_receipt");
    receiptDigests.add(candidateSet.provider_receipt_digest);
    assert(candidateSet.candidates.length === 4
      && candidateSet.candidates.every((candidate, index) => candidate.position === index
        && candidate.expression_digest === sha256(candidate.expression)), "candidate_set_members");
  }
  return new Map(candidateSets.map((candidateSet) => [candidateSet.task_id, candidateSet]));
}

function verifySelections(candidateSetsByTask, selections) {
  assert(selections.length === 120, "selection_count");
  const keys = new Set();
  for (const selection of selections) {
    verifySeal("selection", selection);
    const key = `${selection.task_id}:${selection.selection_path}`;
    assert(!keys.has(key), "selection_unique");
    keys.add(key);
    const candidateSet = candidateSetsByTask.get(selection.task_id);
    assert(candidateSet !== undefined && selection.candidate_set_digest === candidateSet.candidate_set_digest
      && selection.evaluations.length === 4, "selection_candidate_set");
    const candidates = new Map(candidateSet.candidates.map((candidate) => [candidate.candidate_id, candidate]));
    for (const evaluation of selection.evaluations) {
      const candidate = candidates.get(evaluation.candidate_id);
      assert(candidate?.expression_digest === evaluation.expression_digest, "selection_candidate_member");
    }
    const eligible = selection.evaluations.filter((entry) => entry.hard_eligible).sort((left, right) =>
      right.score - left.score || left.expression_digest.localeCompare(right.expression_digest));
    assert(eligible.length > 0
      && selection.selected_candidate_id === eligible[0].candidate_id
      && selection.selected_expression_digest === eligible[0].expression_digest
      && canonicalJson(selection.ordered_candidate_ids) === canonicalJson(eligible.map((entry) => entry.candidate_id)), "selection_determinism");
  }
  assert([...candidateSetsByTask.keys()].every((taskId) => keys.has(`${taskId}:baseline`) && keys.has(`${taskId}:learned`)), "selection_bijection");
}

function verifyAttempt(attempt, candidateSets) {
  verifySeal("attempt", attempt);
  assert(attempt.benchmark_id === "LIL-WRITE-001" && attempt.attempt_state === "consumed"
    && attempt.provider_operation_plan_set.length === 60, "attempt_shape");
  const expected = candidateSets.map((candidateSet) => ({
    task_id: candidateSet.task_id,
    plan_id: candidateSet.plan.plan_id,
    plan_digest: candidateSet.plan.plan_digest,
  }));
  assert(canonicalJson(attempt.provider_operation_plan_set) === canonicalJson(expected), "attempt_plan_set");
  assert(attempt.provider_operation_plan_set_digest === sha256Canonical({
    contract: "contentmd.benchmark-provider-operation-plan-set/0.1.0",
    entries: expected,
  }), "attempt_plan_set_digest");
}

function verifyReviews(tasks, rubric, allocation, randomization, reviews, dispositions) {
  verifySeal("rubric", rubric);
  verifySeal("reviewer_allocation", allocation);
  verifySeal("randomization", randomization);
  assert(allocation.allocations.length === 60 && randomization.schedule.length === 60
    && reviews.length === 120 && dispositions.length === 60, "review_counts");
  const allocations = new Map(allocation.allocations.map((entry) => [entry.task_id, entry]));
  const reviewsByTask = new Map();
  for (const review of reviews) {
    verifySeal("review", review);
    const entries = reviewsByTask.get(review.task_id) ?? [];
    entries.push(review);
    reviewsByTask.set(review.task_id, entries);
  }
  for (const task of tasks) {
    const taskReviews = reviewsByTask.get(task.task_id) ?? [];
    const taskAllocation = allocations.get(task.task_id);
    assert(taskReviews.length === 2 && taskAllocation?.independent === true && taskAllocation.blinded === true
      && new Set(taskReviews.map((review) => review.reviewer_id)).size === 2
      && taskReviews.every((review) => review.qualified && review.blinded && review.preference === "learned")
      && taskReviews.every((review) => Object.values(review.hard_results).every((value) => value === "pass")), "review_validity");
  }
  for (const disposition of dispositions) {
    verifySeal("task_disposition", disposition);
    assert(disposition.disposition === "valid" && disposition.original_review_count === 2
      && disposition.adjudication_required === false, "task_disposition");
  }
}

function uint64be(value) {
  const bytes = Buffer.alloc(8);
  bytes.writeBigUInt64BE(value);
  return bytes;
}

function replicateDraws(seedDigest, metricId, replicate, requested) {
  const values = [];
  let counter = 0n;
  let block = Buffer.alloc(0);
  let offset = 0;
  for (const upper of requested) {
    const bigUpper = BigInt(upper);
    const limit = ((1n << 64n) / bigUpper) * bigUpper;
    while (true) {
      if (offset + 8 > block.length) {
        block = createHash("sha256").update(Buffer.concat([
          Buffer.from("contentmd.writing-benchmark-bootstrap-counter/0.1.0", "utf8"),
          Buffer.from([0]), Buffer.from(seedDigest, "hex"), Buffer.from([0]),
          Buffer.from(metricId, "utf8"), Buffer.from([0]),
          uint64be(BigInt(replicate)), uint64be(counter),
        ])).digest();
        counter += 1n;
        offset = 0;
      }
      const raw = block.readBigUInt64BE(offset);
      offset += 8;
      if (raw < limit) {
        values.push(Number(raw % bigUpper));
        break;
      }
    }
  }
  return values;
}

function binary64(value) {
  const bytes = Buffer.alloc(8);
  bytes.writeDoubleBE(value === 0 ? 0 : value);
  return bytes.toString("hex");
}

function reproduceBootstrap(manifest, attempt, selections, reviews, tasks) {
  const ref = (label) => ({
    record_id: `fixture.${label}`,
    schema_id: "contentmd.synthetic-reference-record",
    schema_version: "0.1.0",
    content_digest: sha256(`synthetic-bootstrap-ref:${label}`),
  });
  const metricId = "synthetic-positive-utility";
  const seedMaterial = {
    manifest_ref: ref("manifest"),
    attempt_ref: ref("attempt"),
    candidate_model_ref: ref("candidate-model"),
    baseline_ref: ref("baseline"),
    selection_set_digest: sha256Canonical(selections),
    review_set_digest: sha256Canonical(reviews),
    metric_rule_digest: sha256("synthetic-metric-rule"),
    analysis_code_digest: sha256("synthetic-analysis-code-v1"),
  };
  const seedDigest = sha256Canonical({
    contract: "contentmd.writing-benchmark-bootstrap-seed/0.1.0",
    metric_id: metricId,
    ...seedMaterial,
  });
  const byProduct = new Map(PRODUCTS.map((product) => [product, tasks.filter((task) => task.product_id === product)
    .sort((left, right) => left.task_id.localeCompare(right.task_id, "en"))]));
  const requested = [...Array.from({ length: 6 }, () => 6), ...Array.from({ length: 60 }, () => 10)];
  const differenceBits = [];
  for (let replicate = 0; replicate < 10_000; replicate += 1) {
    const draws = replicateDraws(seedDigest, metricId, replicate, requested);
    let sum = 0;
    let compensation = 0;
    for (let productDraw = 0; productDraw < 6; productDraw += 1) {
      const productTasks = byProduct.get(PRODUCTS[draws[productDraw]]);
      for (let taskDraw = 0; taskDraw < 10; taskDraw += 1) {
        assert(productTasks[draws[6 + productDraw * 10 + taskDraw]] !== undefined, "bootstrap_draw");
        const difference = 0.25;
        const adjusted = difference - compensation;
        const next = sum + adjusted;
        compensation = next - sum - adjusted;
        sum = next;
      }
    }
    differenceBits.push(binary64(sum / 60));
  }
  return {
    seed_digest: seedDigest,
    replicate_vector_digest: sha256Canonical({
      contract: "contentmd.writing-benchmark-bootstrap-replicate-vector/0.1.0",
      metric_id: metricId,
      difference_bits: differenceBits,
    }),
  };
}

function verifyResult(result, manifest, attempt, selections, reviews, tasks) {
  verifySeal("result", result);
  assert(result.run_state === "passed" && result.valid_task_count === 60
    && result.invalid_task_count === 0 && result.product_valid_counts.length === 6
    && result.product_valid_counts.every((entry) => entry.valid_count === 10), "synthetic_result_population");
  assert(result.quality_gate.quality_gate_passed === true
    && result.quality_gate.failed_predicate_ids.length === 0
    && result.claim.includes("Synthetic pass-shaped engine self-test only"), "synthetic_result_claim");
  const reproduced = reproduceBootstrap(manifest, attempt, selections, reviews, tasks);
  assert(result.bootstrap.replicate_count === 10_000
    && result.bootstrap.seed_digest === reproduced.seed_digest
    && result.bootstrap.replicate_vector_digest === reproduced.replicate_vector_digest, "bootstrap_reproduction");
}

function verifyNegativePlanCases(attempt, candidateSets) {
  const cases = [
    (value) => value.provider_operation_plan_set.pop(),
    (value) => value.provider_operation_plan_set.push(structuredClone(value.provider_operation_plan_set[0])),
    (value) => { value.provider_operation_plan_set[0].task_id = "writing-benchmark-task.wrong"; },
    (value) => { value.provider_operation_plan_set[0].plan_digest = "f".repeat(64); },
    (value) => value.provider_operation_plan_set.push({
      task_id: "writing-benchmark-task.extra",
      plan_id: "provider-execution-plan.extra",
      plan_digest: "e".repeat(64),
    }),
  ];
  for (const mutate of cases) {
    const changed = structuredClone(attempt);
    mutate(changed);
    let rejected = false;
    try { verifyAttempt(changed, candidateSets); } catch { rejected = true; }
    assert(rejected, "negative_plan_case");
  }
}

async function selfTest(directory) {
  const actualFiles = (await readdir(directory)).sort();
  assert(canonicalJson(actualFiles) === canonicalJson(REQUIRED_FILES), "fixture_file_set");
  const [manifest, tasks, candidateSets, selections, rubric, allocation, randomization, attempt, reviews, dispositions, result] = await Promise.all([
    readCanonicalJson(join(directory, "manifest.json")),
    readCanonicalJsonl(join(directory, "tasks.jsonl")),
    readCanonicalJsonl(join(directory, "candidate-sets.jsonl")),
    readCanonicalJsonl(join(directory, "selections.jsonl")),
    readCanonicalJson(join(directory, "rubric.json")),
    readCanonicalJson(join(directory, "reviewer-allocations.json")),
    readCanonicalJson(join(directory, "randomization.json")),
    readCanonicalJson(join(directory, "attempt.json")),
    readCanonicalJsonl(join(directory, "reviews.jsonl")),
    readCanonicalJsonl(join(directory, "task-dispositions.jsonl")),
    readCanonicalJson(join(directory, "result.json")),
  ]);
  verifyManifest(manifest, tasks);
  const candidateSetsByTask = verifyCandidateSets(tasks, candidateSets);
  verifySelections(candidateSetsByTask, selections);
  verifyAttempt(attempt, candidateSets);
  verifyReviews(tasks, rubric, allocation, randomization, reviews, dispositions);
  verifyResult(result, manifest, attempt, selections, reviews, tasks);
  verifyNegativePlanCases(attempt, candidateSets);
  return {
    mode: "self_test",
    benchmark_id: "LIL-WRITE-001",
    fixture_status: "synthetic_test_only",
    official_attempt_effect: "none",
    benchmark_claim_eligibility: false,
    task_count: 60,
    candidate_set_count: 60,
    selection_count: 120,
    review_count: 120,
    bootstrap_replicate_count: 10_000,
    negative_plan_cases: 5,
    manifest_digest: manifest.manifest_digest,
    result_digest: result.result_digest,
  };
}

async function officialNotStarted(directory) {
  for (const name of ["attempt.json", "reviews.jsonl", "result.json"]) {
    try {
      await access(join(directory, name));
      throw new Error(`lil_write_001_official_state_invalid:${name}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  return {
    mode: "official_pre_run",
    benchmark_id: "LIL-WRITE-001",
    official_attempt_status: "not_started",
    official_attempt_effect: "none",
    benchmark_claim_eligibility: false,
  };
}

const args = process.argv.slice(2);
let output;
if (args[0] === "--self-test" && args[1] !== undefined && args.length === 2) {
  output = await selfTest(resolve(args[1]));
} else if (args[0] === "--assert-official-not-started" && args[1] !== undefined && args.length === 2) {
  output = await officialNotStarted(resolve(args[1]));
} else {
  throw new Error("usage: verify-lil-write-001.mjs --self-test <development-fixture> | --assert-official-not-started <official-directory>");
}
process.stdout.write(`${canonicalJson(output)}\n`);
