import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const FIXTURES = join(ROOT, "fixtures/learning-ranking");
const HEX64 = /^[a-f0-9]{64}$/u;
const PAIRWISE_RUNTIME_COMMON = {
  contract_version: "contentmd.pairwise-runtime-profile/0.1.0",
  node_version: "24.20.0",
  v8_version: "13.6.233.17-node.53",
  icu_version: "78.3",
  unicode_version: "17.0",
  endianness: "LE",
};
const DARWIN_PAIRWISE_RUNTIME = {
  ...PAIRWISE_RUNTIME_COMMON,
  platform: "darwin",
  architecture: "arm64",
  profile_digest: "dd9d25f4943345f872b5d4c1f13aea12d1b87bcd1f4d2bc39edb3920ad86b08c",
};
const LINUX_PAIRWISE_RUNTIME = {
  ...PAIRWISE_RUNTIME_COMMON,
  platform: "linux",
  architecture: "x64",
  profile_digest: "7cfc66ff0829849d1c71a52ec49b4fe0807f60f40c82ade52eebd17b88dc86f8",
};
const DARWIN_TASK6_RUNTIME_DIGEST = "e08c1f54731db0ade599ad63b97edbbf06caae7c84e5f5160a5e154ab4428fb7";
const LINUX_TASK6_RUNTIME_DIGEST = "9e6043132165513ea090e92540f5d3f4c4aa4c0f98a23784f6ed683f2b4c9656";

function invariant(condition, code) {
  if (!condition) throw new Error(`learning_verification_failed:${code}`);
}

function canonicalValue(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalValue).join(",")}]`;
  return `{${Object.keys(value).sort((a, b) => a.localeCompare(b, "en"))
    .map((key) => `${JSON.stringify(key)}:${canonicalValue(value[key])}`).join(",")}}`;
}

function canonical(value) {
  return `${canonicalValue(value)}\n`;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function shaCanonical(value) {
  return sha256(canonical(value));
}

function readCanonicalJson(name) {
  const raw = readFileSync(join(FIXTURES, name), "utf8");
  const value = JSON.parse(raw);
  invariant(raw === canonical(value), `canonical_json:${name}`);
  return value;
}

function readCanonicalJsonl(name) {
  const raw = readFileSync(join(FIXTURES, name), "utf8");
  invariant(raw.endsWith("\n") && !raw.endsWith("\n\n"), `jsonl_final_lf:${name}`);
  const values = raw.trimEnd().split("\n").map((line) => JSON.parse(line));
  invariant(raw === `${values.map((value) => canonical(value).trimEnd()).join("\n")}\n`, `canonical_jsonl:${name}`);
  return values;
}

function verifyRecord(record, expectedSchema) {
  invariant(record.schema_id === expectedSchema, `record_schema:${expectedSchema}`);
  invariant(HEX64.test(record.content_digest), `record_digest_syntax:${record.record_id}`);
  const { content_digest, ...preimage } = record;
  invariant(content_digest === shaCanonical(preimage), `record_digest:${record.record_id}`);
}

function refKey(ref) {
  return canonical(ref).trimEnd();
}

function exactSet(actual, expected, code) {
  const left = [...actual].map(refKey).sort();
  const right = [...expected].map(refKey).sort();
  invariant(canonical(left) === canonical(right), code);
}

function deriveSplit(groupId) {
  const hash = createHash("sha256")
    .update("contentmd.learning-split/0.1.0", "utf8")
    .update(Buffer.from([0]))
    .update(groupId, "utf8")
    .digest("hex");
  const bucket = Number((BigInt(`0x${hash}`) * 100n) / (1n << 256n));
  return { bucket, split: bucket < 80 ? "train" : bucket < 90 ? "validation" : "test" };
}

function verifyLock(name, lockName) {
  const raw = readFileSync(join(FIXTURES, name));
  const expected = `${sha256(raw)}  fixtures/learning-ranking/${name}\n`;
  invariant(readFileSync(join(FIXTURES, lockName), "utf8") === expected, `lock:${name}`);
}

function verifyResultDigest(result, code) {
  const { result_digest, ...preimage } = result;
  invariant(HEX64.test(result_digest) && result_digest === shaCanonical(preimage), code);
}

function verifyFixtureDigest(fixture, contractVersion, code) {
  const { fixture_semantic_digest, ...preimage } = fixture;
  invariant(fixture_semantic_digest === shaCanonical({ contract_version: contractVersion, fixture: preimage }), code);
}

const preferences = readCanonicalJsonl("preferences.jsonl");
const groups = readCanonicalJsonl("leakage-groups.jsonl");
const dataset = readCanonicalJson("dataset-manifest.json");
const profile = readCanonicalJson("feature-profile.json");
const shadowPlan = readCanonicalJson("shadow-plan.json");
const golden = readCanonicalJson("golden-model.json");
const task6 = readCanonicalJson("task6-simulator-golden.json");
const linuxGolden = readCanonicalJson("golden-model.linux-x64.json");
const linuxTask6 = readCanonicalJson("task6-simulator-golden.linux-x64.json");

invariant(preferences.length === 120, "preference_count");
invariant(groups.length === 30, "group_count");
for (const preference of preferences) {
  verifyRecord(preference, "contentmd.preference-example-record");
  invariant(preference.payload.record_mode === "development_fixture", `preference_mode:${preference.record_id}`);
  invariant(preference.payload.authority_effect === "none", `preference_authority:${preference.record_id}`);
  invariant(preference.scope.memory_scope === "project", `preference_scope:${preference.record_id}`);
}
invariant(!/(?:browser|competitor)/iu.test(JSON.stringify(preferences)), "training_observation_leakage");
invariant(new Set(preferences.map((value) => value.record_id)).size === preferences.length, "preference_unique_ids");

const preferenceRefs = preferences.map((record) => ({
  record_id: record.record_id,
  schema_id: record.schema_id,
  schema_version: record.schema_version,
  content_digest: record.content_digest,
}));
const memberOwners = new Map();
const groupCounts = { train: 0, validation: 0, test: 0 };
const exampleCounts = { train: 0, validation: 0, test: 0 };
for (const group of groups) {
  verifyRecord(group, "contentmd.leakage-group-record");
  const derived = deriveSplit(group.record_id);
  invariant(group.payload.bucket === derived.bucket && group.payload.split === derived.split, `group_split:${group.record_id}`);
  invariant(group.payload.member_refs.length === 4, `group_cardinality:${group.record_id}`);
  groupCounts[derived.split] += 1;
  exampleCounts[derived.split] += group.payload.member_refs.length;
  for (const ref of group.payload.member_refs) {
    const key = refKey(ref);
    invariant(!memberOwners.has(key), `cross_group_leakage:${ref.record_id}`);
    memberOwners.set(key, group.record_id);
  }
}
exactSet([...memberOwners.keys()].map((key) => JSON.parse(key)), preferenceRefs, "complete_group_closure");
invariant(canonical(groupCounts) === canonical({ train: 20, validation: 5, test: 5 }), "split_group_counts");
invariant(canonical(exampleCounts) === canonical({ train: 80, validation: 20, test: 20 }), "split_example_counts");

verifyRecord(dataset, "contentmd.learning-dataset-manifest");
invariant(dataset.payload.dataset_state === "sealed", "dataset_sealed");
invariant(dataset.payload.test_open_state === "sealed", "test_not_opened");
invariant(dataset.payload.authority_effect === "none", "dataset_authority");
exactSet(dataset.payload.example_refs, preferenceRefs, "dataset_examples");
exactSet(dataset.payload.leakage_group_refs, groups.map((record) => ({
  record_id: record.record_id,
  schema_id: record.schema_id,
  schema_version: record.schema_version,
  content_digest: record.content_digest,
})), "dataset_groups");
invariant(canonical(dataset.payload.counts) === canonical({
  examples: 120, groups: 30,
  train_examples: 80, train_groups: 20,
  validation_examples: 20, validation_groups: 5,
  test_examples: 20, test_groups: 5,
}), "dataset_counts");

verifyRecord(profile, "contentmd.feature-profile");
invariant(profile.payload.features.length === 21, "feature_count");
invariant(profile.payload.features.every((feature, index) => feature.position === index), "feature_positions");
invariant(profile.payload.profile_state === "frozen" && profile.payload.authority_effect === "none", "feature_profile_state");

verifyRecord(shadowPlan, "contentmd.shadow-evaluation-plan");
invariant(shadowPlan.payload.no_influence === true, "shadow_plan_no_influence");
invariant(shadowPlan.payload.plan_state === "ready" && shadowPlan.payload.authority_effect === "none", "shadow_plan_state");

verifyLock("golden-model.json", "golden-model.sha256");
verifyFixtureDigest(golden, "contentmd.pairwise-golden-model-preimage/0.1.0", "golden_fixture_digest");
verifyLock("golden-model.linux-x64.json", "golden-model.linux-x64.sha256");
verifyFixtureDigest(linuxGolden, "contentmd.pairwise-golden-model-preimage/0.1.0", "linux_golden_fixture_digest");
invariant(canonical(golden.runtime_profile) === canonical(DARWIN_PAIRWISE_RUNTIME), "golden_runtime_profile");
invariant(canonical(linuxGolden.runtime_profile) === canonical(LINUX_PAIRWISE_RUNTIME), "linux_golden_runtime_profile");
invariant(golden.expected_model_record.payload.runtime_profile_ref.artifact_digest === DARWIN_PAIRWISE_RUNTIME.profile_digest,
  "golden_model_runtime_binding");
invariant(linuxGolden.expected_model_record.payload.runtime_profile_ref.artifact_digest === LINUX_PAIRWISE_RUNTIME.profile_digest,
  "linux_golden_model_runtime_binding");
verifyRecord(golden.expected_statistics_record, "contentmd.model-training-statistics-record");
verifyRecord(golden.expected_model_record, "contentmd.ranking-model-record");
invariant(golden.expected_model_record.payload.model_state === "trained", "model_trained");
invariant(golden.expected_model_record.payload.coefficient_bits.length === 21, "coefficient_count");
invariant(golden.expected_model_record.payload.coefficient_bits.every((value) => /^[a-f0-9]{16}$/u.test(value)), "coefficient_bits");
invariant(golden.prediction_cases.length === 4 && golden.rank_case.expected_result !== null, "prediction_rank_cases");
invariant(golden.expected_model_record.payload.dataset_ref.content_digest === dataset.content_digest, "model_dataset_binding");
invariant(golden.expected_model_record.payload.feature_profile_ref.content_digest === profile.content_digest, "model_profile_binding");

verifyLock("task6-simulator-golden.json", "task6-simulator-golden.sha256");
verifyFixtureDigest(task6, "contentmd.task6-simulator-golden-preimage/0.1.0", "task6_fixture_digest");
verifyLock("task6-simulator-golden.linux-x64.json", "task6-simulator-golden.linux-x64.sha256");
verifyFixtureDigest(linuxTask6, "contentmd.task6-simulator-golden-preimage/0.1.0", "linux_task6_fixture_digest");
invariant(task6.runtime_profile_digest === DARWIN_TASK6_RUNTIME_DIGEST, "task6_runtime_profile");
invariant(linuxTask6.runtime_profile_digest === LINUX_TASK6_RUNTIME_DIGEST, "linux_task6_runtime_profile");
verifyRecord(task6.shadow.plan, "contentmd.shadow-evaluation-plan");
invariant(canonical(task6.shadow.plan) === canonical(shadowPlan), "shadow_plan_projection");
verifyResultDigest(task6.evaluation, "evaluation_result_digest");
verifyResultDigest(task6.promotion, "promotion_result_digest");
verifyResultDigest(task6.drift, "drift_result_digest");
verifyResultDigest(task6.rollback, "rollback_result_digest");
verifyResultDigest(task6.suspension, "suspension_result_digest");
verifyResultDigest(task6.fallback, "fallback_result_digest");
invariant(task6.evaluation.bootstrap.replicate_count === 10_000, "evaluation_bootstrap_count");
invariant(task6.shadow.result.no_influence_verified === true, "shadow_no_influence");
invariant(task6.promotion.projection.state === "candidate", "promotion_candidate");
invariant(task6.drift.disposition === "review", "drift_review");
invariant(task6.suspension.projection.state === "suspended", "revocation_suspension");
invariant(task6.rollback.projection.state === "candidate", "rollback_candidate");
invariant(task6.fallback.projection.state === "baseline", "fallback_baseline");

const generatedChecks = [
  ["scripts/generate-learning-fixtures.mts", ["--import", "tsx", "scripts/generate-learning-fixtures.mts", "--check"]],
  ["scripts/generate-pairwise-golden.mts", ["--import", "tsx", "scripts/generate-pairwise-golden.mts", "--check"]],
  ["scripts/generate-task6-simulator-golden.mts", [
    "--max-old-space-size=8192",
    "--import",
    "tsx",
    "scripts/generate-task6-simulator-golden.mts",
    "--check",
  ]],
];
for (const [name, args] of generatedChecks) {
  execFileSync(process.execPath, args, { cwd: ROOT, stdio: "pipe", timeout: 60 * 60_000 });
  invariant(true, `generator_check:${name}`);
}

const summary = {
  authority_effect: "none",
  browser_competitor_training_examples: 0,
  dataset_digest: dataset.content_digest,
  feature_count: 21,
  fixture_mode: "development_fixture",
  groups: groupCounts,
  official_attempt_status: "not_started",
  preferences: preferences.length,
  shadow_no_influence_verified: true,
  splits: exampleCounts,
  status: "pass",
};
process.stdout.write(`${canonical(summary)}`);
