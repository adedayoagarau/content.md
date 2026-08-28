import {
  qualifyContentOccurrence,
  type ContentOccurrenceForQualification,
  type ContentQualificationState,
  type ContentSourceLayer,
} from "./content-qualification.js";

export interface ContentQualificationEvaluationCase extends ContentOccurrenceForQualification {
  expected_qualification: ContentQualificationState;
}

export interface BinaryQualificationMetrics {
  sample_size: number;
  true_positive: number;
  false_positive: number;
  false_negative: number;
  true_negative: number;
  precision: number | null;
  recall: number | null;
}

export interface ContentQualificationEvaluation {
  sample_size: number;
  exact_disposition_matches: number;
  exact_disposition_accuracy: number | null;
  qualified: BinaryQualificationMetrics;
  by_source_layer: Partial<Record<ContentSourceLayer, BinaryQualificationMetrics>>;
  mismatches: Array<{
    occurrence_id: string;
    expected: ContentQualificationState;
    actual: ContentQualificationState;
    source_layer: ContentSourceLayer;
  }>;
}

function ratio(numerator: number, denominator: number): number | null {
  return denominator === 0 ? null : numerator / denominator;
}

function metrics(cases: Array<{ expected: ContentQualificationState; actual: ContentQualificationState }>): BinaryQualificationMetrics {
  const truePositive = cases.filter((item) => item.expected === "qualified" && item.actual === "qualified").length;
  const falsePositive = cases.filter((item) => item.expected !== "qualified" && item.actual === "qualified").length;
  const falseNegative = cases.filter((item) => item.expected === "qualified" && item.actual !== "qualified").length;
  const trueNegative = cases.filter((item) => item.expected !== "qualified" && item.actual !== "qualified").length;
  return {
    sample_size: cases.length,
    true_positive: truePositive,
    false_positive: falsePositive,
    false_negative: falseNegative,
    true_negative: trueNegative,
    precision: ratio(truePositive, truePositive + falsePositive),
    recall: ratio(truePositive, truePositive + falseNegative),
  };
}

export function evaluateContentQualification(
  cases: ContentQualificationEvaluationCase[],
): ContentQualificationEvaluation {
  const evaluated = cases.map((item) => {
    const unit = qualifyContentOccurrence(item);
    return {
      occurrence_id: item.occurrence_id,
      expected: item.expected_qualification,
      actual: unit.qualification,
      source_layer: unit.source_layer,
    };
  });
  const bySourceLayer: Partial<Record<ContentSourceLayer, BinaryQualificationMetrics>> = {};
  for (const layer of [...new Set(evaluated.map((item) => item.source_layer))].sort()) {
    bySourceLayer[layer] = metrics(evaluated.filter((item) => item.source_layer === layer));
  }
  const exactMatches = evaluated.filter((item) => item.expected === item.actual).length;
  return {
    sample_size: evaluated.length,
    exact_disposition_matches: exactMatches,
    exact_disposition_accuracy: ratio(exactMatches, evaluated.length),
    qualified: metrics(evaluated),
    by_source_layer: bySourceLayer,
    mismatches: evaluated.filter((item) => item.expected !== item.actual),
  };
}
