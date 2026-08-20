export type ReviewSeverity = "low" | "medium" | "high" | "critical";
export type ReviewOutcomeClass = "hard" | "advisory";

export type ContentRuleId =
  | "content.unsupported-superlative"
  | "content.vague-value-claim"
  | "content.generic-abstraction"
  | "content.state-mismatch"
  | "content.unsafe-retry"
  | "content.weak-accessible-name"
  | "content.terminology-inconsistency"
  | "content.duplicate-destination-labels"
  | "content.missing-recovery"
  | "content.locale-fallback"
  | "content.product-behavior-unknown";

export interface ContentRuleDefinition {
  rule_id: ContentRuleId;
  rule_version: "0.1.0";
  severity: ReviewSeverity;
  outcome_class: ReviewOutcomeClass;
  dimension: string;
}

export const CONTENT_RULES: readonly ContentRuleDefinition[] = [
  { rule_id: "content.unsupported-superlative", rule_version: "0.1.0", severity: "high", outcome_class: "hard", dimension: "truth_and_support" },
  { rule_id: "content.vague-value-claim", rule_version: "0.1.0", severity: "medium", outcome_class: "advisory", dimension: "value_specificity" },
  { rule_id: "content.generic-abstraction", rule_version: "0.1.0", severity: "medium", outcome_class: "advisory", dimension: "concreteness" },
  { rule_id: "content.state-mismatch", rule_version: "0.1.0", severity: "critical", outcome_class: "hard", dimension: "state_accuracy" },
  { rule_id: "content.unsafe-retry", rule_version: "0.1.0", severity: "critical", outcome_class: "hard", dimension: "recovery_safety" },
  { rule_id: "content.weak-accessible-name", rule_version: "0.1.0", severity: "high", outcome_class: "hard", dimension: "accessibility" },
  { rule_id: "content.terminology-inconsistency", rule_version: "0.1.0", severity: "medium", outcome_class: "advisory", dimension: "terminology" },
  { rule_id: "content.duplicate-destination-labels", rule_version: "0.1.0", severity: "medium", outcome_class: "advisory", dimension: "information_architecture" },
  { rule_id: "content.missing-recovery", rule_version: "0.1.0", severity: "high", outcome_class: "hard", dimension: "recovery_completeness" },
  { rule_id: "content.locale-fallback", rule_version: "0.1.0", severity: "high", outcome_class: "hard", dimension: "localization" },
  { rule_id: "content.product-behavior-unknown", rule_version: "0.1.0", severity: "high", outcome_class: "hard", dimension: "product_truth" },
] as const;

const rulesById = new Map(CONTENT_RULES.map((rule) => [rule.rule_id, rule]));

export function contentRule(ruleId: ContentRuleId): ContentRuleDefinition {
  const rule = rulesById.get(ruleId);
  if (rule === undefined) throw new Error(`unknown_content_rule:${ruleId}`);
  return rule;
}
