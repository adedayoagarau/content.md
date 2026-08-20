import type { ContentPatternRecord, PatternMatch, PatternQuery } from "./pattern-record.js";

const CONTEXT_FIELDS = [
  ["journey", "journeys", 4],
  ["stage", "stages", 3],
  ["state", "states", 5],
  ["channel", "channels", 2],
  ["modality", "modalities", 1],
  ["locale", "locales", 1],
  ["risk_level", "risk_levels", 3],
] as const;

export function retrievePatterns(
  query: PatternQuery,
  corpus: ContentPatternRecord[],
): PatternMatch[] {
  const results = corpus.map((pattern): PatternMatch => {
    const reasons: string[] = [];
    const nonmatchReasons: string[] = [];
    let score = 0;

    for (const [queryField, contextField, weight] of CONTEXT_FIELDS) {
      const accepted = pattern.context[contextField];
      const value = query[queryField];
      if (accepted.includes(value)) {
        score += weight;
        reasons.push(`context:${queryField}=${value}`);
      } else if (accepted.includes("any")) {
        reasons.push(`context:${queryField}=any`);
      } else {
        nonmatchReasons.push(`context_mismatch:${queryField}`);
      }
    }

    for (const condition of pattern.transfer_conditions) {
      const value = query[condition.field];
      if (condition.values.includes(value) || condition.values.includes("any")) {
        reasons.push(`transfer:${condition.field}=${value}`);
      } else {
        nonmatchReasons.push(`transfer_mismatch:${condition.field}`);
      }
    }
    const eligible = !nonmatchReasons.some((reason) => reason.startsWith("transfer_mismatch:"));
    return {
      pattern_id: pattern.pattern_id,
      eligible,
      score,
      reasons: reasons.sort(),
      nonmatch_reasons: nonmatchReasons.sort(),
      pattern,
    };
  });

  return results.sort((left, right) =>
    Number(right.eligible) - Number(left.eligible) ||
    right.score - left.score ||
    left.pattern_id.localeCompare(right.pattern_id),
  );
}
