import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { createHash } from "node:crypto";
import {
  Task6GovernanceError,
  type Task6RecordMode,
} from "./evaluation.js";
import { binary64ToHex, kahanSum } from "./numeric.js";

export interface Task6ObjectRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}

export interface PairedBootstrapSeedInput {
  record_mode: Task6RecordMode;
  dataset_ref: Task6ObjectRef;
  candidate_model_ref: Task6ObjectRef;
  baseline_ref: Task6ObjectRef;
  feature_profile_ref: Task6ObjectRef;
  evaluation_code_manifest_digest: string;
}

export interface Binary64Value {
  value: number;
  bits: string;
}

export type SliceDimension = "project" | "product_area" | "channel" | "locale" | "risk";

export interface EvaluationSliceDefinition {
  contract_version: "contentmd.evaluation-slice-definition/0.1.0";
  slice_id: string;
  key: { dimension: SliceDimension; value: string };
  required_for_promotion: boolean;
  slice_digest: string;
}

export interface EvaluationPopulationPair {
  ordinal: number;
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  label: 0 | 1;
  slice_ids: readonly [string, string, string, string, string];
  baseline_probability: Binary64Value;
  candidate_probability: Binary64Value;
  pair_digest: string;
}

export interface EvaluationPopulation {
  contract_version: "contentmd.evaluation-population/0.1.0";
  population_id: string;
  pair_order: readonly [EvaluationPopulationPair, ...EvaluationPopulationPair[]];
  decisive_pair_count: number;
  leakage_group_order: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  leakage_group_count: number;
  coverage: Binary64Value;
  qualification_denominator: number;
  tie_count: number;
  abstention_count: number;
  population_digest: string;
}

export interface PairedBootstrapInterval {
  lower: Binary64Value;
  upper: Binary64Value;
}

export interface SliceBootstrapResult {
  slice_ref: Task6ObjectRef;
  pair_count: number;
  leakage_group_count: number;
  accuracy_difference: PairedBootstrapInterval | null;
  log_loss_difference: PairedBootstrapInterval | null;
  support_state: "supported" | "insufficient" | "empty";
  replicate_vector_digest: string | null;
}

export interface PairedBootstrapResult {
  contract_version: "contentmd.paired-group-bootstrap-result/0.1.0";
  bootstrap_id: string;
  seed_digest: string;
  group_order: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  replicate_count: 10000;
  draw_algorithm: "sha256-counter-u64be-rejection-v1";
  interval_method: "nearest-rank-2.5-97.5";
  accuracy_difference: PairedBootstrapInterval;
  log_loss_difference: PairedBootstrapInterval;
  slice_results: readonly [SliceBootstrapResult, ...SliceBootstrapResult[]];
  overall_replicate_vector_digest: string;
  bootstrap_digest: string;
}

export interface PairedGroupBootstrapInput {
  record_mode: Task6RecordMode;
  seed_digest: string;
  population: EvaluationPopulation;
  declared_slices: readonly [EvaluationSliceDefinition, ...EvaluationSliceDefinition[]];
}

function fail(code: ConstructorParameters<typeof Task6GovernanceError>[0]): never {
  throw new Task6GovernanceError(code);
}

function topLevel(value: unknown): asserts value is Record<string, unknown> {
  const expected = [
    "record_mode", "dataset_ref", "candidate_model_ref", "baseline_ref",
    "feature_profile_ref", "evaluation_code_manifest_digest",
  ];
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || (Object.getPrototypeOf(value) !== Object.prototype
      && Object.getPrototypeOf(value) !== null)) fail("task6_input_shape_invalid");
  const keys = Reflect.ownKeys(value);
  if (keys.length !== expected.length || keys.some((key) => typeof key !== "string"
    || !expected.includes(key))) fail("task6_input_shape_invalid");
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      fail("task6_input_shape_invalid");
    }
  }
  const mode = Object.getOwnPropertyDescriptor(value, "record_mode")!.value;
  if (mode !== "development_fixture" && mode !== "official") fail("task6_input_shape_invalid");
  if (mode === "official") fail("task6_official_mode_not_supported");
}

const DIGEST = /^[a-f0-9]{64}$/;

function verifyRef(value: Task6ObjectRef): void {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || Object.getPrototypeOf(value) !== Object.prototype
    || Reflect.ownKeys(value).some((key) => typeof key !== "string")) {
    fail("task6_input_shape_invalid");
  }
  const expected = ["record_id", "schema_id", "schema_version", "content_digest"];
  const keys = Object.keys(value);
  if (keys.length !== expected.length || keys.some((key) => !expected.includes(key))) {
    fail("task6_input_shape_invalid");
  }
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      fail("task6_input_shape_invalid");
    }
  }
  if (typeof value.record_id !== "string" || value.record_id.length === 0
    || typeof value.schema_id !== "string" || value.schema_id.length === 0
    || value.schema_version !== "0.1.0") fail("task6_input_shape_invalid");
  if (!DIGEST.test(value.content_digest)) fail("task6_digest_invalid");
}

export function derivePairedBootstrapSeed(input: PairedBootstrapSeedInput): string {
  try {
    topLevel(input);
    verifyRef(input.dataset_ref);
    verifyRef(input.candidate_model_ref);
    verifyRef(input.baseline_ref);
    verifyRef(input.feature_profile_ref);
    if (!DIGEST.test(input.evaluation_code_manifest_digest)) fail("task6_digest_invalid");
    return sha256Canonical({
      contract_version: "contentmd.paired-bootstrap/0.1.0",
      dataset_ref: input.dataset_ref,
      candidate_model_ref: input.candidate_model_ref,
      baseline_ref: input.baseline_ref,
      feature_profile_ref: input.feature_profile_ref,
      evaluation_code_manifest_digest: input.evaluation_code_manifest_digest,
    });
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

const SLICE_DIMENSIONS: readonly SliceDimension[] = [
  "project", "product_area", "channel", "locale", "risk",
];

function compareText(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function compareRef(left: Task6ObjectRef, right: Task6ObjectRef): number {
  return compareText(left.record_id, right.record_id)
    || compareText(left.schema_id, right.schema_id)
    || compareText(left.schema_version, right.schema_version)
    || compareText(left.content_digest, right.content_digest);
}

function exactObject(value: unknown, keys: readonly string[]): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || Object.getPrototypeOf(value) !== Object.prototype) fail("task6_input_shape_invalid");
  const actual = Reflect.ownKeys(value);
  if (actual.length !== keys.length || actual.some((key) => typeof key !== "string"
    || !keys.includes(key))) fail("task6_input_shape_invalid");
  for (const key of actual) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      fail("task6_input_shape_invalid");
    }
  }
}

function bootstrapTopLevel(input: unknown): asserts input is Record<string, unknown> {
  exactObject(input, ["record_mode", "seed_digest", "population", "declared_slices"]);
  const mode = Object.getOwnPropertyDescriptor(input, "record_mode")!.value;
  if (mode !== "development_fixture" && mode !== "official") fail("task6_input_shape_invalid");
  if (mode === "official") fail("task6_official_mode_not_supported");
}

function binary(value: number): Binary64Value {
  const canonical = value === 0 ? 0 : value;
  if (!Number.isFinite(canonical)) fail("task6_bootstrap_invalid");
  return { value: canonical, bits: binary64ToHex(canonical) };
}

function verifyBinary(value: Binary64Value): void {
  exactObject(value, ["value", "bits"]);
  if (typeof value.value !== "number" || !Number.isFinite(value.value) || Object.is(value.value, -0)
    || typeof value.bits !== "string" || !/^[a-f0-9]{16}$/.test(value.bits)
    || binary64ToHex(value.value) !== value.bits) fail("task6_test_population_invalid");
}

function verifySlice(slice: EvaluationSliceDefinition): void {
  exactObject(slice, [
    "contract_version", "slice_id", "key", "required_for_promotion", "slice_digest",
  ]);
  exactObject(slice.key, ["dimension", "value"]);
  if (slice.contract_version !== "contentmd.evaluation-slice-definition/0.1.0"
    || !SLICE_DIMENSIONS.includes(slice.key.dimension)
    || typeof slice.key.value !== "string" || slice.key.value.length === 0
    || typeof slice.required_for_promotion !== "boolean"
    || !DIGEST.test(slice.slice_digest)) fail("task6_slice_invalid");
  const identity = { contract_version: slice.contract_version, key: slice.key };
  if (slice.slice_id !== `evaluation_slice.${sha256Canonical(identity).slice(0, 32)}`
    || slice.slice_digest !== sha256Canonical({
      ...identity,
      required_for_promotion: slice.required_for_promotion,
    })) fail("task6_slice_invalid");
}

function verifyPopulation(
  population: EvaluationPopulation,
  slices: readonly EvaluationSliceDefinition[],
): void {
  exactObject(population, [
    "contract_version", "population_id", "pair_order", "decisive_pair_count",
    "leakage_group_order", "leakage_group_count", "coverage", "qualification_denominator",
    "tie_count", "abstention_count", "population_digest",
  ]);
  if (population.contract_version !== "contentmd.evaluation-population/0.1.0"
    || !Array.isArray(population.pair_order) || population.pair_order.length === 0
    || !Array.isArray(population.leakage_group_order)
    || population.leakage_group_order.length === 0
    || !Number.isSafeInteger(population.decisive_pair_count)
    || population.decisive_pair_count !== population.pair_order.length
    || !Number.isSafeInteger(population.leakage_group_count)
    || population.leakage_group_count !== population.leakage_group_order.length
    || !Number.isSafeInteger(population.qualification_denominator)
    || population.qualification_denominator < 1
    || !Number.isSafeInteger(population.tie_count) || population.tie_count < 0
    || !Number.isSafeInteger(population.abstention_count) || population.abstention_count < 0
    || population.tie_count + population.abstention_count > population.qualification_denominator
    || !DIGEST.test(population.population_digest)) fail("task6_test_population_invalid");
  verifyBinary(population.coverage);
  if (population.coverage.value !== 1 || population.coverage.bits !== "3ff0000000000000") {
    fail("task6_metric_invalid");
  }
  const sliceById = new Map(slices.map((slice) => [slice.slice_id, slice]));
  for (const [index, pair] of population.pair_order.entries()) {
    exactObject(pair, [
      "ordinal", "example_ref", "leakage_group_ref", "label", "slice_ids",
      "baseline_probability", "candidate_probability", "pair_digest",
    ]);
    if (pair.ordinal !== index || (pair.label !== 0 && pair.label !== 1)
      || !Array.isArray(pair.slice_ids) || pair.slice_ids.length !== 5
      || !DIGEST.test(pair.pair_digest)) fail("task6_test_population_invalid");
    verifyRef(pair.example_ref);
    verifyRef(pair.leakage_group_ref);
    verifyBinary(pair.baseline_probability);
    verifyBinary(pair.candidate_probability);
    if (pair.baseline_probability.value <= 0 || pair.baseline_probability.value >= 1
      || pair.candidate_probability.value <= 0 || pair.candidate_probability.value >= 1) {
      fail("task6_metric_invalid");
    }
    for (const [sliceIndex, sliceId] of pair.slice_ids.entries()) {
      const definition = sliceById.get(sliceId);
      if (definition === undefined
        || definition.key.dimension !== SLICE_DIMENSIONS[sliceIndex]) fail("task6_slice_invalid");
    }
    const { pair_digest: _pairDigest, ...pairPreimage } = pair;
    if (pair.pair_digest !== sha256Canonical(pairPreimage)) fail("task6_digest_invalid");
  }
  for (const group of population.leakage_group_order) verifyRef(group);
  const expectedGroups = [...new Map(population.pair_order.map((pair) => [
    canonicalJson(pair.leakage_group_ref), pair.leakage_group_ref,
  ])).values()].sort(compareRef);
  if (canonicalJson(expectedGroups) !== canonicalJson(population.leakage_group_order)) {
    fail("task6_test_population_invalid");
  }
  const { population_id: _populationId, population_digest: _populationDigest, ...preimage } = population;
  const digest = sha256Canonical(preimage);
  if (population.population_digest !== digest
    || population.population_id !== `evaluation_population.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
}

function immutable<T>(value: T): T {
  const clone = structuredClone(value);
  const freeze = (current: unknown, seen = new Set<object>()): void => {
    if (current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor !== undefined && "value" in descriptor) freeze(descriptor.value, seen);
    }
    Object.freeze(current);
  };
  freeze(clone);
  return clone;
}

function uint64be(value: bigint): Buffer {
  if (value < 0n || value > ((1n << 64n) - 1n)) fail("task6_bootstrap_invalid");
  const bytes = Buffer.alloc(8);
  bytes.writeBigUInt64BE(value);
  return bytes;
}

function selectedGroupIndices(
  seedDigest: string,
  populationKey: string,
  replicate: number,
  groupCount: number,
): number[] {
  const selected: number[] = [];
  const bigGroupCount = BigInt(groupCount);
  const limit = ((1n << 64n) / bigGroupCount) * bigGroupCount;
  let counter = 0n;
  while (selected.length < groupCount) {
    const block = createHash("sha256").update(Buffer.concat([
      Buffer.from("contentmd.paired-bootstrap-counter/0.1.0", "utf8"),
      Buffer.from([0]),
      Buffer.from(seedDigest, "hex"),
      Buffer.from([0]),
      Buffer.from(populationKey, "utf8"),
      Buffer.from([0]),
      uint64be(BigInt(replicate)),
      uint64be(counter),
    ])).digest();
    if (counter === ((1n << 64n) - 1n) && selected.length < groupCount) {
      fail("task6_bootstrap_invalid");
    }
    counter += 1n;
    for (let offset = 0; offset < block.length && selected.length < groupCount; offset += 8) {
      const value = block.readBigUInt64BE(offset);
      if (value < limit) selected.push(Number(value % bigGroupCount));
    }
  }
  return selected;
}

function metricDifferences(pairs: readonly EvaluationPopulationPair[]): [number, number] {
  if (pairs.length === 0) fail("task6_bootstrap_invalid");
  const accuracy = (probability: number, label: 0 | 1): number =>
    probability === 0.5 ? 0.5 : Number((probability > 0.5) === (label === 1));
  const loss = (probability: number, label: 0 | 1): number =>
    label === 1 ? -Math.log(probability) : -Math.log1p(-probability);
  const baselineAccuracy = kahanSum(pairs.map((pair) =>
    accuracy(pair.baseline_probability.value, pair.label))) / pairs.length;
  const candidateAccuracy = kahanSum(pairs.map((pair) =>
    accuracy(pair.candidate_probability.value, pair.label))) / pairs.length;
  const baselineLoss = kahanSum(pairs.map((pair) =>
    loss(pair.baseline_probability.value, pair.label))) / pairs.length;
  const candidateLoss = kahanSum(pairs.map((pair) =>
    loss(pair.candidate_probability.value, pair.label))) / pairs.length;
  const accuracyDifference = candidateAccuracy - baselineAccuracy;
  const logLossDifference = candidateLoss - baselineLoss;
  if (!Number.isFinite(accuracyDifference) || !Number.isFinite(logLossDifference)) {
    fail("task6_bootstrap_invalid");
  }
  return [accuracyDifference === 0 ? 0 : accuracyDifference, logLossDifference === 0 ? 0 : logLossDifference];
}

function runReplicates(
  seedDigest: string,
  populationKey: string,
  groupOrder: readonly Task6ObjectRef[],
  pairs: readonly EvaluationPopulationPair[],
): { accuracy: number[]; logLoss: number[]; vectorDigest: string } {
  const pairsByGroup = new Map(groupOrder.map((group) => [
    canonicalJson(group),
    pairs.filter((pair) => canonicalJson(pair.leakage_group_ref) === canonicalJson(group)),
  ]));
  const accuracy: number[] = [];
  const logLoss: number[] = [];
  for (let replicate = 0; replicate < 10_000; replicate += 1) {
    const sampled = selectedGroupIndices(seedDigest, populationKey, replicate, groupOrder.length)
      .flatMap((index) => pairsByGroup.get(canonicalJson(groupOrder[index]!))!);
    const [accuracyDifference, logLossDifference] = metricDifferences(sampled);
    accuracy.push(accuracyDifference);
    logLoss.push(logLossDifference);
  }
  return {
    accuracy,
    logLoss,
    vectorDigest: sha256Canonical({
      contract_version: "contentmd.bootstrap-replicate-vector/0.1.0",
      population_key: populationKey,
      accuracy_difference_bits: accuracy.map((value) => binary(value).bits),
      log_loss_difference_bits: logLoss.map((value) => binary(value).bits),
    }),
  };
}

function interval(values: readonly number[]): PairedBootstrapInterval {
  const sorted = [...values].sort((left, right) => left - right);
  if (sorted.length !== 10_000) fail("task6_bootstrap_invalid");
  return { lower: binary(sorted[249]!), upper: binary(sorted[9749]!) };
}

function sliceRef(slice: EvaluationSliceDefinition): Task6ObjectRef {
  return {
    record_id: slice.slice_id,
    schema_id: "contentmd.evaluation-slice-definition",
    schema_version: "0.1.0",
    content_digest: slice.slice_digest,
  };
}

export function runPairedGroupBootstrap(input: PairedGroupBootstrapInput): PairedBootstrapResult {
  try {
    bootstrapTopLevel(input);
    if (!DIGEST.test(input.seed_digest)) fail("task6_digest_invalid");
    if (!Array.isArray(input.declared_slices) || input.declared_slices.length === 0) {
      fail("task6_slice_invalid");
    }
    for (const slice of input.declared_slices) verifySlice(slice);
    const sortedSlices = [...input.declared_slices].sort((left, right) =>
      SLICE_DIMENSIONS.indexOf(left.key.dimension) - SLICE_DIMENSIONS.indexOf(right.key.dimension)
      || compareText(left.key.value, right.key.value));
    if (canonicalJson(sortedSlices) !== canonicalJson(input.declared_slices)
      || new Set(input.declared_slices.map(({ slice_id }) => slice_id)).size
        !== input.declared_slices.length) fail("task6_slice_invalid");
    verifyPopulation(input.population, input.declared_slices);
    const overall = runReplicates(
      input.seed_digest,
      "overall",
      input.population.leakage_group_order,
      input.population.pair_order,
    );
    const sliceResults = input.declared_slices.map((slice): SliceBootstrapResult => {
      const pairs = input.population.pair_order.filter((pair) => pair.slice_ids.includes(slice.slice_id));
      const groups = input.population.leakage_group_order.filter((group) => pairs.some((pair) =>
        canonicalJson(pair.leakage_group_ref) === canonicalJson(group)));
      if (pairs.length === 0) {
        return {
          slice_ref: sliceRef(slice), pair_count: 0, leakage_group_count: 0,
          accuracy_difference: null, log_loss_difference: null,
          support_state: "empty", replicate_vector_digest: null,
        };
      }
      if (pairs.length < 20 || groups.length < 5) {
        return {
          slice_ref: sliceRef(slice), pair_count: pairs.length, leakage_group_count: groups.length,
          accuracy_difference: null, log_loss_difference: null,
          support_state: "insufficient", replicate_vector_digest: null,
        };
      }
      const replicated = runReplicates(input.seed_digest, slice.slice_id, groups, pairs);
      return {
        slice_ref: sliceRef(slice), pair_count: pairs.length, leakage_group_count: groups.length,
        accuracy_difference: interval(replicated.accuracy),
        log_loss_difference: interval(replicated.logLoss),
        support_state: "supported", replicate_vector_digest: replicated.vectorDigest,
      };
    }) as [SliceBootstrapResult, ...SliceBootstrapResult[]];
    const preimage = {
      contract_version: "contentmd.paired-group-bootstrap-result/0.1.0" as const,
      seed_digest: input.seed_digest,
      group_order: input.population.leakage_group_order,
      replicate_count: 10_000 as const,
      draw_algorithm: "sha256-counter-u64be-rejection-v1" as const,
      interval_method: "nearest-rank-2.5-97.5" as const,
      accuracy_difference: interval(overall.accuracy),
      log_loss_difference: interval(overall.logLoss),
      slice_results: sliceResults,
      overall_replicate_vector_digest: overall.vectorDigest,
    };
    const bootstrapDigest = sha256Canonical(preimage);
    return immutable({
      ...preimage,
      bootstrap_id: `paired_bootstrap.${bootstrapDigest.slice(0, 32)}`,
      bootstrap_digest: bootstrapDigest,
    });
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_bootstrap_invalid");
  }
}
