import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson, sha256Canonical } from "../packages/core/src/index.ts";
import { runWritingBenchmarkHierarchicalBootstrap } from "../packages/learning/src/writing-benchmark.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = join(root, "fixtures/learning-ranking/lil-write-001-development");
const fixtureMark = {
  fixture_status: "synthetic_test_only" as const,
  official_attempt_effect: "none" as const,
  benchmark_claim_eligibility: false as const,
};
const products = [
  ["commerce", "retail"],
  ["education", "learning"],
  ["finance", "payments"],
  ["health", "care"],
  ["public-service", "civic-services"],
  ["transport", "mobility"],
] as const;
const slots = [
  ["strategy", "web", "en-US", "value-proposition"],
  ["strategy", "web", "en-GB", "category-positioning"],
  ["contextual_microcopy", "web", "en-US", "first-run"],
  ["contextual_microcopy", "web", "en-GB", "validation-error"],
  ["contextual_microcopy", "web", "en-US", "destructive-confirmation"],
  ["contextual_microcopy", "web", "en-GB", "empty-state"],
  ["contextual_microcopy", "web", "en-US", "recovery"],
  ["contextual_microcopy", "web", "en-GB", "permission-request"],
  ["contextual_microcopy", "notification", "en-US", "status-notification"],
  ["contextual_microcopy", "notification", "en-GB", "reminder-notification"],
] as const;

const sha256 = (value: string): string =>
  createHash("sha256").update(value, "utf8").digest("hex");
const mark = <T extends object>(value: T): T & typeof fixtureMark => ({ ...fixtureMark, ...value });
const seal = <T extends object>(kind: string, value: T) => ({
  ...value,
  [`${kind}_digest`]: sha256Canonical({ contract: `contentmd.lil-write-001-${kind}/0.1.0`, ...value }),
});

const tasks = products.flatMap(([productId, domain]) =>
  slots.map(([taskType, channel, locale, familyId], slotIndex) => {
    const taskId = `writing-benchmark-task.${productId}.${String(slotIndex + 1).padStart(2, "0")}`;
    return mark(seal("task", {
      benchmark_id: "LIL-WRITE-001" as const,
      task_id: taskId,
      product_id: productId,
      domain,
      channel,
      locale,
      task_type: taskType,
      family_id: familyId,
      task_packet_ref: `synthetic-task-packet.${productId}.${slotIndex + 1}`,
      context_evidence_digest: sha256(`synthetic-context:${productId}:${slotIndex + 1}`),
      semantic_lineage_ids: [`synthetic-lineage.${productId}.${slotIndex + 1}`],
      template_ids: [`synthetic-template.${productId}.${slotIndex + 1}`],
      leakage_group_ids: [`synthetic-leakage.${productId}.${slotIndex + 1}`],
      ownership: "project_owned_synthetic" as const,
      task_state: "frozen" as const,
    }));
  }),
);

const count = (values: readonly string[]) => [...new Set(values)].sort().map((key) => ({
  key,
  count: values.filter((value) => value === key).length,
}));
const manifestBase = {
  benchmark_id: "LIL-WRITE-001" as const,
  project_id: "project.synthetic.lil-write-001",
  manifest_state: "draft" as const,
  task_refs: tasks.map(({ task_id, task_digest }) => ({ task_id, task_digest })),
  product_counts: count(tasks.map((task) => task.product_id)),
  domain_counts: count(tasks.map((task) => task.domain)),
  channel_counts: count(tasks.map((task) => task.channel)),
  locale_counts: count(tasks.map((task) => task.locale)),
  task_type_counts: count(tasks.map((task) => task.task_type)),
  family_counts: count(tasks.map((task) => task.family_id)),
  intersection_counts: tasks.map((task) => ({
    keys: [task.product_id, task.domain, task.channel, task.locale, task.task_type, task.family_id],
    count: 1,
  })),
  training_partition: {
    pattern_family_ids: [],
    semantic_lineage_ids: [],
    template_ids: [],
    leakage_group_ids: [],
  },
};
const manifest = mark(seal("manifest", manifestBase));

const candidateSets = tasks.map((task, index) => {
  const planBase = {
    task_id: task.task_id,
    provider_id: "provider.synthetic.recorded",
    returned_model_id: "model.synthetic.recorded-1",
    provider_profile_digest: sha256("synthetic-recorded-provider-profile"),
    prompt_template_version: "0.1.0",
    prompt_template_digest: sha256("synthetic-writing-benchmark-template"),
    context_evidence_digest: task.context_evidence_digest,
    alternatives_count: 4,
    output_token_budget: 512,
    nonce: `nonce.lil-write-001.${String(index).padStart(2, "0")}`,
  };
  const planDigest = sha256Canonical({
    contract: "contentmd.lil-write-001-provider-plan/0.1.0",
    ...planBase,
  });
  const planId = `provider-execution-plan.${planDigest.slice(0, 32)}`;
  const nonceClaimDigest = sha256Canonical({
    contract: "contentmd.lil-write-001-nonce-claim/0.1.0",
    plan_id: planId,
    nonce: planBase.nonce,
    disposition: "claimed",
  });
  const providerOutputDigest = sha256(`synthetic-provider-output:${task.task_id}`);
  const providerReceiptDigest = sha256Canonical({
    contract: "contentmd.lil-write-001-provider-receipt/0.1.0",
    plan_id: planId,
    nonce_claim_digest: nonceClaimDigest,
    provider_output_digest: providerOutputDigest,
    outcome_state: "completed",
  });
  const candidates = Array.from({ length: 4 }, (_, position) => {
    const expression = `Synthetic ${task.product_id} ${task.family_id} option ${position + 1}.`;
    return {
      position,
      candidate_id: `candidate.${task.task_id}.${position}`,
      expression,
      expression_digest: sha256(expression),
    };
  });
  return mark(seal("candidate_set", {
    task_id: task.task_id,
    plan: { ...planBase, plan_id: planId, plan_digest: planDigest },
    nonce_claim_digest: nonceClaimDigest,
    provider_receipt_digest: providerReceiptDigest,
    provider_output_digest: providerOutputDigest,
    candidates,
    candidate_set_state: "completed_verified_nonquarantined" as const,
  }));
});

const selections = candidateSets.flatMap((candidateSet) => {
  const scores = candidateSet.candidates.map((candidate, index) => ({
    candidate_id: candidate.candidate_id,
    expression_digest: candidate.expression_digest,
    hard_eligible: true,
    exclusions: [] as string[],
    baseline_score: [0.9, 0.8, 0.7, 0.6][index]!,
    learned_score: [0.8, 0.95, 0.7, 0.6][index]!,
  }));
  return (["baseline", "learned"] as const).map((selectionPath) => {
    const scoreKey = selectionPath === "baseline" ? "baseline_score" : "learned_score";
    const ordered = [...scores].sort((left, right) =>
      right[scoreKey] - left[scoreKey] || left.expression_digest.localeCompare(right.expression_digest));
    return mark(seal("selection", {
      task_id: candidateSet.task_id,
      candidate_set_digest: candidateSet.candidate_set_digest,
      selection_path: selectionPath,
      selected_candidate_id: ordered[0]!.candidate_id,
      selected_expression_digest: ordered[0]!.expression_digest,
      evaluations: scores.map((score) => ({
        candidate_id: score.candidate_id,
        expression_digest: score.expression_digest,
        score: score[scoreKey],
        hard_eligible: score.hard_eligible,
        exclusions: score.exclusions,
      })),
      ordered_candidate_ids: ordered.map((entry) => entry.candidate_id),
      tie_break_trace: { applied: false, tied_expression_digests: [] as string[] },
    }));
  });
});

const reviewerAllocations = mark(seal("reviewer_allocation", {
  benchmark_id: "LIL-WRITE-001" as const,
  reviewers: [
    { reviewer_id: "synthetic-reviewer.a", qualified: true },
    { reviewer_id: "synthetic-reviewer.b", qualified: true },
    { reviewer_id: "synthetic-reviewer.c", qualified: true },
  ],
  allocations: tasks.map((task) => ({
    task_id: task.task_id,
    original_reviewer_ids: ["synthetic-reviewer.a", "synthetic-reviewer.b"],
    adjudicator_id: "synthetic-reviewer.c",
    independent: true,
    blinded: true,
  })),
}));
const rubric = mark(seal("rubric", {
  benchmark_id: "LIL-WRITE-001" as const,
  hard_dimensions: [
    "truthfulness", "behavioral_accuracy", "deception", "consent",
    "accessibility", "autonomy", "safety", "copying",
  ],
  advisory_dimensions: [
    "recovery", "comprehension", "accessibility_quality", "voice_category_fit", "localization",
  ],
  advisory_scale: { minimum: 0, maximum: 4 },
}));
const randomization = mark(seal("randomization", {
  benchmark_id: "LIL-WRITE-001" as const,
  schedule: tasks.map((task, index) => ({
    task_id: task.task_id,
    pair_order: index % 2 === 0 ? ["A", "B"] : ["B", "A"],
    baseline_blind_label: index % 2 === 0 ? "A" : "B",
    learned_blind_label: index % 2 === 0 ? "B" : "A",
  })),
}));
const planSet = candidateSets.map((candidateSet) => ({
  task_id: candidateSet.task_id,
  plan_id: candidateSet.plan.plan_id,
  plan_digest: candidateSet.plan.plan_digest,
}));
const attempt = mark(seal("attempt", {
  benchmark_id: "LIL-WRITE-001" as const,
  attempt_id: "benchmark-attempt.synthetic-development.001",
  attempt_state: "consumed" as const,
  candidate_model_digest: sha256("synthetic-candidate-model"),
  manifest_digest: manifest.manifest_digest,
  reviewer_allocation_digest: reviewerAllocations.reviewer_allocation_digest,
  rubric_digest: rubric.rubric_digest,
  randomization_digest: randomization.randomization_digest,
  analysis_code_digest: sha256("synthetic-analysis-code-v1"),
  provider_operation_plan_set: planSet,
  provider_operation_plan_set_digest: sha256Canonical({
    contract: "contentmd.benchmark-provider-operation-plan-set/0.1.0",
    entries: planSet,
  }),
  sealed_at: "2026-08-23T21:00:00.000Z",
  consumed_at: "2026-08-23T22:00:00.000Z",
  consumption_reason: "synthetic_self_test_complete" as const,
}));

const reviews = tasks.flatMap((task) => ["synthetic-reviewer.a", "synthetic-reviewer.b"].map((reviewerId) =>
  mark(seal("review", {
    task_id: task.task_id,
    reviewer_id: reviewerId,
    qualified: true,
    blinded: true,
    independent_from: reviewerId.endsWith("a") ? ["synthetic-reviewer.b"] : ["synthetic-reviewer.a"],
    hard_results: Object.fromEntries(rubric.hard_dimensions.map((dimension) => [dimension, "pass"])),
    baseline_advisory_scores: Object.fromEntries(rubric.advisory_dimensions.map((dimension) => [dimension, 3])),
    learned_advisory_scores: Object.fromEntries(rubric.advisory_dimensions.map((dimension) => [dimension, 4])),
    preference: "learned" as const,
    baseline_accepted_edit_distance: 0.1,
    learned_accepted_edit_distance: 0,
    baseline_review_time_ms: 10_000,
    learned_review_time_ms: 9_000,
  }))));
const dispositions = tasks.map((task) => mark(seal("task_disposition", {
  task_id: task.task_id,
  disposition: "valid" as const,
  original_review_count: 2,
  adjudication_required: false,
  adjudication_review_count: 0,
})));
const bootstrapRef = (label: string) => ({
  record_id: `fixture.${label}`,
  schema_id: "contentmd.synthetic-reference-record",
  schema_version: "0.1.0" as const,
  content_digest: sha256(`synthetic-bootstrap-ref:${label}`),
});
const bootstrap = runWritingBenchmarkHierarchicalBootstrap({
  record_mode: "development_fixture",
  metric_id: "synthetic-positive-utility",
  seed_material: {
    manifest_ref: bootstrapRef("manifest"),
    attempt_ref: bootstrapRef("attempt"),
    candidate_model_ref: bootstrapRef("candidate-model"),
    baseline_ref: bootstrapRef("baseline"),
    selection_set_digest: sha256Canonical(selections),
    review_set_digest: sha256Canonical(reviews),
    metric_rule_digest: sha256("synthetic-metric-rule"),
    analysis_code_digest: sha256("synthetic-analysis-code-v1"),
  },
  pairs: tasks.map((task) => ({
    task_id: task.task_id,
    product_id: task.product_id,
    baseline_value: 0,
    learned_value: 0.25,
  })),
});
const result = mark(seal("result", {
  benchmark_id: "LIL-WRITE-001" as const,
  run_state: "passed" as const,
  valid_task_count: 60,
  invalid_task_count: 0,
  product_valid_counts: products.map(([product_id]) => ({ product_id, valid_count: 10 })),
  bootstrap,
  quality_gate: {
    quality_gate_passed: true,
    failed_predicate_ids: [] as string[],
    bounded_claim_status: "synthetic_noninferiority_plus_utility",
  },
  claim: "Synthetic pass-shaped engine self-test only; not an official writing-effectiveness result.",
}));

async function writeJson(name: string, value: unknown): Promise<void> {
  const path = join(outputDirectory, name);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, canonicalJson(value), "utf8");
}
async function writeJsonl(name: string, values: readonly unknown[]): Promise<void> {
  const path = join(outputDirectory, name);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, values.map((value) => canonicalJson(value).trimEnd()).join("\n") + "\n", "utf8");
}

await Promise.all([
  writeJson("manifest.json", manifest),
  writeJsonl("tasks.jsonl", tasks),
  writeJsonl("candidate-sets.jsonl", candidateSets),
  writeJsonl("selections.jsonl", selections),
  writeJson("rubric.json", rubric),
  writeJson("reviewer-allocations.json", reviewerAllocations),
  writeJson("randomization.json", randomization),
  writeJson("attempt.json", attempt),
  writeJsonl("reviews.jsonl", reviews),
  writeJsonl("task-dispositions.jsonl", dispositions),
  writeJson("result.json", result),
]);

process.stdout.write(`${canonicalJson({
  output_directory: outputDirectory,
  task_count: tasks.length,
  candidate_set_count: candidateSets.length,
  selection_count: selections.length,
  review_count: reviews.length,
  fixture_manifest_digest: manifest.manifest_digest,
})}\n`);
