import type { PairwiseTrainingRow } from "../src/pairwise-logistic.js";

const FEATURE_COUNT = 21;
const LAMBDA = 1;
const LEARNING_RATE = 0.05;
const MAXIMUM_ITERATIONS = 2000;
const CONVERGENCE_DELTA = 1e-9;
const CONVERGENCE_PATIENCE = 10;

function finite(value: number): number {
  if (!Number.isFinite(value)) throw new Error("pairwise_oracle_nonfinite");
  return value === 0 ? 0 : value;
}

export function oracleBinary64(value: number): string {
  const buffer = new ArrayBuffer(8);
  new DataView(buffer).setFloat64(0, finite(value), false);
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function oracleBinary64FromHex(value: string): number {
  if (!/^[0-9a-f]{16}$/.test(value)) throw new Error("pairwise_oracle_binary64");
  const bytes = Uint8Array.from(value.match(/../g)!.map((pair) => Number.parseInt(pair, 16)));
  return finite(new DataView(bytes.buffer).getFloat64(0, false));
}

function oracleKahan(values: readonly number[]): number {
  let sum = 0;
  let compensation = 0;
  for (const value of values) {
    const adjusted = finite(value - compensation);
    const next = finite(sum + adjusted);
    compensation = finite(finite(next - sum) - adjusted);
    sum = next;
  }
  return finite(sum);
}

function oracleSigmoid(value: number): number {
  const z = finite(value);
  if (z >= 0) {
    const exponential = finite(Math.exp(-z));
    return finite(1 / finite(1 + exponential));
  }
  const exponential = finite(Math.exp(z));
  return finite(exponential / finite(1 + exponential));
}

function oracleSoftplus(value: number): number {
  const z = finite(value);
  if (z > 0) return finite(z + finite(Math.log1p(finite(Math.exp(-z)))));
  return finite(Math.log1p(finite(Math.exp(z))));
}

function loss(
  coefficients: readonly number[],
  deltas: readonly (readonly number[])[],
  labels: readonly (0 | 1)[],
): number {
  const rowLosses = deltas.map((delta, rowIndex) => {
    const score = oracleKahan(delta.map((value, featureIndex) =>
      finite(coefficients[featureIndex]! * value)));
    return finite(oracleSoftplus(score) - finite(labels[rowIndex]! * score));
  });
  const mean = finite(oracleKahan(rowLosses) / rowLosses.length);
  const regularizer = finite((LAMBDA / 2) * oracleKahan(
    coefficients.map((coefficient) => finite(coefficient * coefficient)),
  ));
  return finite(mean + regularizer);
}

export interface IndependentPairwiseFit {
  population_value_bits_by_feature: readonly (readonly string[])[];
  mean_bits: readonly string[];
  population_standard_deviation_bits: readonly string[];
  first_row_delta_bits: readonly string[];
  initial_coefficient_bits: readonly string[];
  initial_loss_bits: string;
  first_gradient_bits: readonly string[];
  first_updated_coefficient_bits: readonly string[];
  first_updated_loss_bits: string;
  final_coefficient_bits: readonly string[];
  final_loss_bits: string;
  iterations_completed: number;
  convergence_streak: number;
}

export interface IndependentPairwisePrediction {
  score_delta_bits: string;
  unclipped_probability_bits: string;
  probability_bits: string;
  probability: number;
}

export function independentPairwisePrediction(
  fit: IndependentPairwiseFit,
  row: PairwiseTrainingRow,
  reverse = false,
): IndependentPairwisePrediction {
  const coefficients = fit.final_coefficient_bits.map(oracleBinary64FromHex);
  const means = fit.mean_bits.map(oracleBinary64FromHex);
  const deviations = fit.population_standard_deviation_bits.map(oracleBinary64FromHex);
  const left = reverse ? row.candidate_b_values : row.candidate_a_values;
  const right = reverse ? row.candidate_a_values : row.candidate_b_values;
  const delta = left.map((value, index) => {
    const deviation = deviations[index]!;
    const standardize = (candidate: number): number => deviation === 0
      ? 0
      : finite(Math.min(10, Math.max(-10, finite(finite(candidate - means[index]!) / deviation))));
    return finite(standardize(value) - standardize(right[index]!));
  });
  const score = oracleKahan(delta.map((value, index) => finite(value * coefficients[index]!)));
  const unclipped = score === 0 ? 0.5 : oracleSigmoid(score);
  const probability = finite(Math.min(1 - 1e-6, Math.max(1e-6, unclipped)));
  return {
    score_delta_bits: oracleBinary64(score),
    unclipped_probability_bits: oracleBinary64(unclipped),
    probability_bits: oracleBinary64(probability),
    probability,
  };
}

export function independentPairwiseFit(
  rows: readonly PairwiseTrainingRow[],
): IndependentPairwiseFit {
  if (rows.length === 0) throw new Error("pairwise_oracle_empty");
  const populationByFeature: number[][] = [];
  const means: number[] = [];
  const deviations: number[] = [];
  const standardizedA = rows.map((): number[] => []);
  const standardizedB = rows.map((): number[] => []);
  for (let featureIndex = 0; featureIndex < FEATURE_COUNT; featureIndex += 1) {
    const population = rows.flatMap((row) => [
      finite(row.candidate_a_values[featureIndex]!),
      finite(row.candidate_b_values[featureIndex]!),
    ]);
    populationByFeature.push(population);
    const mean = finite(oracleKahan(population) / population.length);
    const variance = finite(oracleKahan(population.map((value) => {
      const difference = finite(value - mean);
      return finite(difference * difference);
    })) / population.length);
    const deviation = finite(Math.sqrt(variance));
    means.push(mean);
    deviations.push(deviation);
    const standardize = (value: number): number => deviation === 0
      ? 0
      : finite(Math.min(10, Math.max(-10, finite(finite(value - mean) / deviation))));
    for (const [rowIndex, row] of rows.entries()) {
      standardizedA[rowIndex]!.push(standardize(row.candidate_a_values[featureIndex]!));
      standardizedB[rowIndex]!.push(standardize(row.candidate_b_values[featureIndex]!));
    }
  }
  const deltas = standardizedA.map((values, rowIndex) => values.map((value, featureIndex) =>
    finite(value - standardizedB[rowIndex]![featureIndex]!)));
  const labels = rows.map((row) => row.label);
  let coefficients = Array.from({ length: FEATURE_COUNT }, () => 0);
  const initialLoss = loss(coefficients, deltas, labels);
  let previousLoss = initialLoss;
  let finalLoss = initialLoss;
  let convergenceStreak = 0;
  let iterationsCompleted = 0;
  let firstGradients: number[] | null = null;
  let firstUpdated: number[] | null = null;
  let firstUpdatedLoss: number | null = null;
  for (let iteration = 1; iteration <= MAXIMUM_ITERATIONS; iteration += 1) {
    const scores = deltas.map((delta) => oracleKahan(delta.map((value, featureIndex) =>
      finite(coefficients[featureIndex]! * value))));
    const gradients = Array.from({ length: FEATURE_COUNT }, (_, featureIndex) => {
      const contributions = deltas.map((delta, rowIndex) => finite(
        finite(oracleSigmoid(scores[rowIndex]!) - labels[rowIndex]!) * delta[featureIndex]!,
      ));
      return finite(finite(oracleKahan(contributions) / rows.length)
        + finite(LAMBDA * coefficients[featureIndex]!));
    });
    const next = coefficients.map((coefficient, featureIndex) => finite(
      coefficient - finite(LEARNING_RATE * gradients[featureIndex]!),
    ));
    finalLoss = loss(next, deltas, labels);
    if (iteration === 1) {
      firstGradients = gradients;
      firstUpdated = next;
      firstUpdatedLoss = finalLoss;
    }
    convergenceStreak = finite(Math.abs(finite(finalLoss - previousLoss))) < CONVERGENCE_DELTA
      ? convergenceStreak + 1
      : 0;
    coefficients = next;
    previousLoss = finalLoss;
    iterationsCompleted = iteration;
    if (convergenceStreak === CONVERGENCE_PATIENCE) break;
  }
  if (firstGradients === null || firstUpdated === null || firstUpdatedLoss === null) {
    throw new Error("pairwise_oracle_first_update_missing");
  }
  return {
    population_value_bits_by_feature: populationByFeature.map((values) => values.map(oracleBinary64)),
    mean_bits: means.map(oracleBinary64),
    population_standard_deviation_bits: deviations.map(oracleBinary64),
    first_row_delta_bits: deltas[0]!.map(oracleBinary64),
    initial_coefficient_bits: Array.from({ length: FEATURE_COUNT }, () => "0000000000000000"),
    initial_loss_bits: oracleBinary64(initialLoss),
    first_gradient_bits: firstGradients.map(oracleBinary64),
    first_updated_coefficient_bits: firstUpdated.map(oracleBinary64),
    first_updated_loss_bits: oracleBinary64(firstUpdatedLoss),
    final_coefficient_bits: coefficients.map(oracleBinary64),
    final_loss_bits: oracleBinary64(finalLoss),
    iterations_completed: iterationsCompleted,
    convergence_streak: convergenceStreak,
  };
}
