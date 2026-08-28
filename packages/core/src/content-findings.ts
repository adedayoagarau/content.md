import { sha256Canonical } from "./canonical-json.js";
import type { QualifiedContentUnit } from "./content-qualification.js";

export type ContentFindingSeverity = "high" | "medium" | "low";

export interface ContentReviewFinding {
  finding_id: string;
  rule_id:
    | "content.error_missing_recovery"
    | "content.warning_missing_recovery"
    | "content.ambiguous_action"
    | "content.candidate_needs_context";
  severity: ContentFindingSeverity;
  score: number;
  title: string;
  rationale: string;
  suggested_next_action: string;
  qualification_ref: string;
  occurrence_ref: string;
  expression: string;
  source_artifact: string;
  component: string | null;
  route: string | null;
  authority_effect: "none";
}

export interface ContentImprovementBrief {
  brief_id: string;
  finding_ref: string;
  qualification_ref: string;
  current_expression: string;
  source_artifact: string;
  component: string | null;
  route: string | null;
  problem: string;
  required_facts: string[];
  acceptance_criteria: string[];
  proposal_status: "context_required";
  mutation_effect: "none";
  authority_effect: "none";
}

export interface UserSuppliedImprovementContext {
  finding_ref: string;
  facts: Record<string, string>;
  provenance: "user_supplied";
  authority_effect: "none";
}

export interface ContentImprovementComparison {
  comparison_id: string;
  finding_ref: string;
  current_expression: string;
  candidate_expression: string;
  context_provenance: "user_supplied";
  missing_facts: string[];
  checks: Array<{ check: string; passed: boolean; rationale: string }>;
  status: "ready_for_patch_preview" | "needs_revision";
  mutation_effect: "none";
  authority_effect: "none";
}

const AMBIGUOUS_ACTION = /^(click here|continue|done|go|next|no|ok|submit|yes)$/iu;

function finding(
  unit: QualifiedContentUnit,
  input: Omit<ContentReviewFinding, "finding_id" | "qualification_ref" | "occurrence_ref" | "expression" | "source_artifact" | "component" | "route" | "authority_effect">,
): ContentReviewFinding {
  const preimage = {
    ...input,
    qualification_ref: unit.qualification_id,
    occurrence_ref: unit.occurrence_id,
    expression: unit.expression,
    source_artifact: unit.source_artifact,
    component: unit.component,
    route: unit.route,
    authority_effect: "none" as const,
  };
  return {
    finding_id: `content-finding.${sha256Canonical(preimage).slice(0, 32)}`,
    ...preimage,
  };
}

function findingsForUnit(unit: QualifiedContentUnit): ContentReviewFinding[] {
  if (unit.qualification === "uncertain") {
    return [finding(unit, {
      rule_id: "content.candidate_needs_context",
      severity: "low",
      score: 40,
      title: "Content fragment needs surrounding context",
      rationale: `“${unit.expression}” cannot yet be established as an independently meaningful content unit.`,
      suggested_next_action: "Inspect the surrounding component and bind adjacent text or interpolation before review.",
    })];
  }
  if (unit.qualification !== "qualified") return [];
  const findings: ContentReviewFinding[] = [];
  if (unit.formats.includes("error") && !unit.functions.includes("enable_recovery")) {
    findings.push(finding(unit, {
      rule_id: "content.error_missing_recovery",
      severity: "high",
      score: 100,
      title: "Error does not expose a recovery action",
      rationale: "The expression identifies an error but no safe next action is evident in the same qualified unit.",
      suggested_next_action: "Inspect the complete error composition and add or bind an evidence-backed recovery action when one exists.",
    }));
  }
  if (unit.formats.includes("warning") && !unit.functions.some((item) => item === "enable_recovery" || item === "prompt_action")) {
    findings.push(finding(unit, {
      rule_id: "content.warning_missing_recovery",
      severity: "high",
      score: 90,
      title: "Warning does not expose a next action",
      rationale: "The warning communicates risk without an evident response or recovery path in the same qualified unit.",
      suggested_next_action: "Check the surrounding interaction for a safe response and bind it to the warning composition.",
    }));
  }
  if (unit.formats.includes("button") && AMBIGUOUS_ACTION.test(unit.expression)) {
    findings.push(finding(unit, {
      rule_id: "content.ambiguous_action",
      severity: "medium",
      score: 70,
      title: "Action label may not identify its outcome",
      rationale: `“${unit.expression}” names a generic action without identifying the affected object or outcome.`,
      suggested_next_action: "Inspect the action contract and replace the label only if a more specific evidence-backed action is available.",
    }));
  }
  return findings;
}

export function rankContentReviewFindings(
  units: QualifiedContentUnit[],
  limit = 10,
): ContentReviewFinding[] {
  if (!Number.isInteger(limit) || limit < 0) throw new TypeError("content_finding_limit_invalid");
  return units.flatMap(findingsForUnit).sort((left, right) =>
    right.score - left.score
    || left.source_artifact.localeCompare(right.source_artifact)
    || left.occurrence_ref.localeCompare(right.occurrence_ref)
    || left.finding_id.localeCompare(right.finding_id)
  ).slice(0, limit);
}

export function createContentImprovementBrief(
  findingRecord: ContentReviewFinding,
  unit: QualifiedContentUnit,
): ContentImprovementBrief {
  if (findingRecord.qualification_ref !== unit.qualification_id) {
    throw new TypeError("content_finding_qualification_mismatch");
  }
  const requiredFacts = findingRecord.rule_id === "content.error_missing_recovery"
    ? ["actual system state", "safe available actions", "whether retry is safe", "how the user can verify the outcome"]
    : findingRecord.rule_id === "content.warning_missing_recovery"
      ? ["risk being communicated", "available response", "consequence of continuing", "recovery path"]
      : findingRecord.rule_id === "content.ambiguous_action"
        ? ["action being performed", "affected object", "resulting state", "material consequence"]
        : ["adjacent content", "interpolation meaning", "interaction state", "intended user outcome"];
  const preimage = {
    finding_ref: findingRecord.finding_id,
    qualification_ref: unit.qualification_id,
    current_expression: unit.expression,
    source_artifact: unit.source_artifact,
    component: unit.component,
    route: unit.route,
    problem: findingRecord.rationale,
    required_facts: requiredFacts,
    acceptance_criteria: [
      "Preserve established product behavior and factual meaning.",
      "Make the intended action, state, or recovery understandable in context.",
      "Do not introduce an unsupported promise, consequence, or recovery path.",
      "Retain accessibility and localization requirements for the expression slot.",
    ],
    proposal_status: "context_required" as const,
    mutation_effect: "none" as const,
    authority_effect: "none" as const,
  };
  return { brief_id: `content-brief.${sha256Canonical(preimage).slice(0, 32)}`, ...preimage };
}

export function compareContentImprovement(
  brief: ContentImprovementBrief,
  findingRecord: ContentReviewFinding,
  context: UserSuppliedImprovementContext,
  candidateExpression: string,
): ContentImprovementComparison {
  if (brief.finding_ref !== findingRecord.finding_id || context.finding_ref !== findingRecord.finding_id) {
    throw new TypeError("content_improvement_finding_mismatch");
  }
  if (context.provenance !== "user_supplied" || context.authority_effect !== "none") {
    throw new TypeError("content_improvement_context_invalid");
  }
  const candidate = candidateExpression.trim();
  if (candidate.length === 0 || candidate.length > 2_000) throw new TypeError("content_improvement_candidate_invalid");
  const missingFacts = brief.required_facts.filter((fact) => {
    const value = context.facts[fact];
    return typeof value !== "string" || value.trim().length === 0;
  });
  const checks = [
    {
      check: "candidate_changed",
      passed: candidate !== brief.current_expression,
      rationale: candidate === brief.current_expression ? "The candidate is identical to the current expression." : "The candidate changes the expression.",
    },
    {
      check: "required_context_present",
      passed: missingFacts.length === 0,
      rationale: missingFacts.length === 0 ? "Every required fact has a user-supplied value." : `Missing facts: ${missingFacts.join(", ")}.`,
    },
  ];
  if (findingRecord.rule_id === "content.error_missing_recovery") {
    const passed = /\b(try again|retry|check|go back|contact|return|reset|restore|review|verify)\b/iu.test(candidate);
    checks.push({
      check: "recovery_evident",
      passed,
      rationale: passed ? "The candidate exposes a potential recovery or verification action." : "No recovery or verification action is evident.",
    });
  }
  if (findingRecord.rule_id === "content.ambiguous_action") {
    const passed = !AMBIGUOUS_ACTION.test(candidate);
    checks.push({
      check: "action_specific",
      passed,
      rationale: passed ? "The candidate is more specific than the generic action label." : "The candidate remains a generic action label.",
    });
  }
  const preimage = {
    finding_ref: findingRecord.finding_id,
    current_expression: brief.current_expression,
    candidate_expression: candidate,
    context_provenance: context.provenance,
    missing_facts: missingFacts,
    checks,
    status: checks.every((check) => check.passed) ? "ready_for_patch_preview" as const : "needs_revision" as const,
    mutation_effect: "none" as const,
    authority_effect: "none" as const,
  };
  return { comparison_id: `content-comparison.${sha256Canonical(preimage).slice(0, 32)}`, ...preimage };
}
