import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  binary64ToHex,
  derivePairedBootstrapSeed,
  runPairedGroupBootstrap,
} from "../src/index.js";

const ref = (record_id: string) => ({
  record_id,
  schema_id: "contentmd.fixture",
  schema_version: "0.1.0" as const,
  content_digest: sha256Canonical({ record_id }),
});

const binary = (value: number) => ({ value, bits: binary64ToHex(value) });

function slice(dimension: "project" | "product_area" | "channel" | "locale" | "risk") {
  const key = { dimension, value: `${dimension}.task6` };
  const identity = {
    contract_version: "contentmd.evaluation-slice-definition/0.1.0" as const,
    key,
  };
  const slice_id = `evaluation_slice.${sha256Canonical(identity).slice(0, 32)}`;
  return {
    ...identity,
    slice_id,
    required_for_promotion: false,
    slice_digest: sha256Canonical({ ...identity, required_for_promotion: false }),
  };
}

function bootstrapPopulation() {
  const groups = [ref("leakage-group.task6.a"), ref("leakage-group.task6.b")];
  const slices = [
    slice("project"),
    slice("product_area"),
    slice("channel"),
    slice("locale"),
    slice("risk"),
  ] as const;
  const pair = (
    ordinal: number,
    label: 0 | 1,
    leakage_group_ref: ReturnType<typeof ref>,
    baselineProbability: number,
    candidateProbability: number,
  ) => {
    const preimage = {
      ordinal,
      example_ref: ref(`example.task6.${ordinal}`),
      leakage_group_ref,
      label,
      slice_ids: slices.map(({ slice_id }) => slice_id) as [string, string, string, string, string],
      baseline_probability: binary(baselineProbability),
      candidate_probability: binary(candidateProbability),
    };
    return { ...preimage, pair_digest: sha256Canonical(preimage) };
  };
  const pair_order = [
    pair(0, 1, groups[0]!, 0.2, 0.9),
    pair(1, 0, groups[1]!, 0.8, 0.6),
  ] as const;
  const populationPreimage = {
    contract_version: "contentmd.evaluation-population/0.1.0" as const,
    pair_order,
    decisive_pair_count: pair_order.length,
    leakage_group_order: groups as [ReturnType<typeof ref>, ReturnType<typeof ref>],
    leakage_group_count: groups.length,
    coverage: binary(1),
    qualification_denominator: pair_order.length,
    tie_count: 0,
    abstention_count: 0,
  };
  const population_digest = sha256Canonical(populationPreimage);
  return {
    groups,
    slices,
    population: {
      ...populationPreimage,
      population_id: `evaluation_population.${population_digest.slice(0, 32)}`,
      population_digest,
    },
  };
}

function kahanMean(values: readonly number[]): number {
  let sum = 0;
  let compensation = 0;
  for (const value of values) {
    const adjusted = value - compensation;
    const next = sum + adjusted;
    compensation = (next - sum) - adjusted;
    sum = next;
  }
  return sum / values.length;
}

function independentBootstrap(seedDigest: string) {
  const { groups, population } = bootstrapPopulation();
  const pairsByGroup = new Map(groups.map((group) => [
    canonicalJson(group),
    population.pair_order.filter((pair) => canonicalJson(pair.leakage_group_ref) === canonicalJson(group)),
  ]));
  const accuracy: number[] = [];
  const logLoss: number[] = [];
  const uint64be = (value: bigint) => {
    const bytes = Buffer.alloc(8);
    bytes.writeBigUInt64BE(value);
    return bytes;
  };
  const limit = ((1n << 64n) / BigInt(groups.length)) * BigInt(groups.length);
  for (let replicate = 0; replicate < 10_000; replicate += 1) {
    const selected: number[] = [];
    let counter = 0n;
    while (selected.length < groups.length) {
      const block = createHash("sha256").update(Buffer.concat([
        Buffer.from("contentmd.paired-bootstrap-counter/0.1.0", "utf8"),
        Buffer.from([0]),
        Buffer.from(seedDigest, "hex"),
        Buffer.from([0]),
        Buffer.from("overall", "utf8"),
        Buffer.from([0]),
        uint64be(BigInt(replicate)),
        uint64be(counter),
      ])).digest();
      counter += 1n;
      for (let offset = 0; offset < 32 && selected.length < groups.length; offset += 8) {
        const value = block.readBigUInt64BE(offset);
        if (value < limit) selected.push(Number(value % BigInt(groups.length)));
      }
    }
    const pairs = selected.flatMap((index) => pairsByGroup.get(canonicalJson(groups[index]!))!);
    const accuracyFor = (probability: number, label: 0 | 1) =>
      probability === 0.5 ? 0.5 : Number((probability > 0.5) === (label === 1));
    const lossFor = (probability: number, label: 0 | 1) =>
      label === 1 ? -Math.log(probability) : -Math.log1p(-probability);
    accuracy.push(kahanMean(pairs.map((pair) =>
      accuracyFor(pair.candidate_probability.value, pair.label))) - kahanMean(pairs.map((pair) =>
      accuracyFor(pair.baseline_probability.value, pair.label))));
    logLoss.push(kahanMean(pairs.map((pair) =>
      lossFor(pair.candidate_probability.value, pair.label))) - kahanMean(pairs.map((pair) =>
      lossFor(pair.baseline_probability.value, pair.label))));
  }
  const interval = (values: readonly number[]) => {
    const sorted = [...values].sort((left, right) => left - right);
    return { lower: binary(sorted[249]!), upper: binary(sorted[9749]!) };
  };
  const accuracyBits = accuracy.map(binary64ToHex);
  const logLossBits = logLoss.map(binary64ToHex);
  return {
    accuracyInterval: interval(accuracy),
    logLossInterval: interval(logLoss),
    vectorDigest: sha256Canonical({
      contract_version: "contentmd.bootstrap-replicate-vector/0.1.0",
      population_key: "overall",
      accuracy_difference_bits: accuracyBits,
      log_loss_difference_bits: logLossBits,
    }),
  };
}

describe("Task 6 deterministic bootstrap", () => {
  it("derives the closed evaluation seed preimage", () => {
    const input = {
      record_mode: "development_fixture" as const,
      dataset_ref: ref("dataset.task6"),
      candidate_model_ref: ref("model.task6"),
      baseline_ref: ref("baseline.task6"),
      feature_profile_ref: ref("feature-profile.task6"),
      evaluation_code_manifest_digest: sha256Canonical({ code: "task6" }),
    };
    expect(derivePairedBootstrapSeed(input)).toBe(sha256Canonical({
      contract_version: "contentmd.paired-bootstrap/0.1.0",
      dataset_ref: input.dataset_ref,
      candidate_model_ref: input.candidate_model_ref,
      baseline_ref: input.baseline_ref,
      feature_profile_ref: input.feature_profile_ref,
      evaluation_code_manifest_digest: input.evaluation_code_manifest_digest,
    }));
  });

  it("rejects official mode before nested reference access", () => {
    let reads = 0;
    const dataset = new Proxy(ref("dataset.official"), {
      get() {
        reads += 1;
        throw new Error("nested read");
      },
    });
    expect(() => derivePairedBootstrapSeed({
      record_mode: "official",
      dataset_ref: dataset,
      candidate_model_ref: ref("model.official"),
      baseline_ref: ref("baseline.official"),
      feature_profile_ref: ref("profile.official"),
      evaluation_code_manifest_digest: "0".repeat(64),
    })).toThrow("task6_contract_invalid:task6_official_mode_not_supported");
    expect(reads).toBe(0);
  });

  it("runs the exact 10,000-replicate SHA-256 paired group bootstrap", () => {
    const { groups, slices, population } = bootstrapPopulation();
    const seed_digest = sha256Canonical({ task6: "bootstrap-seed" });
    const expected = independentBootstrap(seed_digest);

    const result = runPairedGroupBootstrap({
      record_mode: "development_fixture",
      seed_digest,
      population,
      declared_slices: slices,
    });

    expect(result.group_order).toEqual(groups);
    expect(result.replicate_count).toBe(10_000);
    expect(result.accuracy_difference).toEqual(expected.accuracyInterval);
    expect(result.log_loss_difference).toEqual(expected.logLossInterval);
    expect(result.overall_replicate_vector_digest).toBe(expected.vectorDigest);
    expect(result.slice_results).toHaveLength(5);
    expect(result.slice_results.every((sliceResult) =>
      sliceResult.support_state === "insufficient"
      && sliceResult.accuracy_difference === null
      && sliceResult.log_loss_difference === null
      && sliceResult.replicate_vector_digest === null)).toBe(true);
    const { bootstrap_id, bootstrap_digest, ...preimage } = result;
    expect(bootstrap_digest).toBe(sha256Canonical(preimage));
    expect(bootstrap_id).toBe(`paired_bootstrap.${bootstrap_digest.slice(0, 32)}`);
    expect(Object.isFrozen(result)).toBe(true);
  }, 120_000);
});
