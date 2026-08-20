import { sha256Canonical } from "@contentmd/core";
import {
  contentRule,
  type ContentRuleId,
  type ReviewOutcomeClass,
  type ReviewSeverity,
} from "./rules.js";

export interface ReviewOccurrence {
  occurrence_id: string;
  source_artifact: string;
  line: number;
  column: number;
  syntax_kind: string;
  expression_payload: string;
  locale: string;
  channel: string;
  modality: string;
  component: string | null;
  route: string | null;
  semantic_context: string;
}

export interface ReviewProductFacts {
  payment_outcome_after_submission: "unknown_possible" | "failure_confirmed" | "not_established";
  workspace_delete_effect: "local_only" | "cancels_provider_attempt" | "not_established";
}

export interface ReviewInput {
  project_id: string;
  occurrences: ReviewOccurrence[];
  evidence_refs: string[];
  product_facts: ReviewProductFacts;
}

export interface ContentFinding {
  finding_id: string;
  rule_id: ContentRuleId;
  rule_version: "0.1.0";
  severity: ReviewSeverity;
  outcome_class: ReviewOutcomeClass;
  dimension: string;
  occurrence_refs: string[];
  evidence_refs: string[];
  rationale: string;
  uncertainty: "none" | "bounded" | "material";
  suggested_next_action: string;
  automatic_rewrite_allowed: boolean;
}

export interface ReviewReport {
  schema_version: "contentmd.review-report/0.1.0";
  report_id: string;
  project_id: string;
  input_digest: string;
  findings: ContentFinding[];
  hard_outcomes: {
    status: "pass" | "fail" | "unknown";
    blocking_finding_refs: string[];
  };
  advisory_dimensions: Array<{
    dimension: string;
    finding_refs: string[];
  }>;
}

interface FindingDraft {
  rule_id: ContentRuleId;
  occurrences: ReviewOccurrence[];
  rationale: string;
  uncertainty: ContentFinding["uncertainty"];
  suggested_next_action: string;
  automatic_rewrite_allowed: boolean;
}

function makeFinding(draft: FindingDraft, inputEvidence: string[]): ContentFinding {
  const rule = contentRule(draft.rule_id);
  const occurrenceRefs = [...new Set(draft.occurrences.map((item) => item.occurrence_id))].sort();
  const evidenceRefs = [...new Set([...inputEvidence, ...occurrenceRefs])].sort();
  const preimage = {
    rule_id: rule.rule_id,
    rule_version: rule.rule_version,
    occurrence_refs: occurrenceRefs,
    evidence_refs: evidenceRefs,
    rationale: draft.rationale,
    uncertainty: draft.uncertainty,
    suggested_next_action: draft.suggested_next_action,
    automatic_rewrite_allowed: draft.automatic_rewrite_allowed,
  };
  return {
    finding_id: `finding.${sha256Canonical(preimage).slice(0, 32)}`,
    rule_id: rule.rule_id,
    rule_version: rule.rule_version,
    severity: rule.severity,
    outcome_class: rule.outcome_class,
    dimension: rule.dimension,
    occurrence_refs: occurrenceRefs,
    evidence_refs: evidenceRefs,
    rationale: draft.rationale,
    uncertainty: draft.uncertainty,
    suggested_next_action: draft.suggested_next_action,
    automatic_rewrite_allowed: draft.automatic_rewrite_allowed,
  };
}

function matching(
  occurrences: ReviewOccurrence[],
  pattern: RegExp,
): ReviewOccurrence[] {
  return occurrences.filter((occurrence) => pattern.test(occurrence.expression_payload));
}

function pushFinding(
  drafts: FindingDraft[],
  draft: FindingDraft,
): void {
  if (draft.occurrences.length > 0) drafts.push(draft);
}

function localeFallbackOccurrences(occurrences: ReviewOccurrence[]): ReviewOccurrence[] {
  const catalog = occurrences.filter((item) => item.syntax_kind === "locale_message");
  const EnglishByContext = new Map(
    catalog
      .filter((item) => item.locale.toLowerCase() === "en-us")
      .map((item) => [item.semantic_context, item.expression_payload]),
  );
  return catalog.filter((item) =>
    item.locale.toLowerCase() !== "en-us" &&
    (EnglishByContext.get(item.semantic_context) === item.expression_payload ||
      /\b(?:delete workspace|payment failed|try again)\b/iu.test(item.expression_payload)),
  );
}

export function reviewContent(input: ReviewInput): ReviewReport {
  const occurrences = [...input.occurrences].sort((left, right) => left.occurrence_id.localeCompare(right.occurrence_id));
  const drafts: FindingDraft[] = [];

  pushFinding(drafts, {
    rule_id: "content.unsupported-superlative",
    occurrences: matching(occurrences, /\b(?:smartest|best|first|only|leading|guaranteed)\b/iu),
    rationale: "The expression makes a comparative or absolute claim without a linked, current substantiation record.",
    uncertainty: "none",
    suggested_next_action: "Remove the unsupported claim or link an approved substantiation record scoped to this exact expression.",
    automatic_rewrite_allowed: false,
  });
  pushFinding(drafts, {
    rule_id: "content.vague-value-claim",
    occurrences: matching(occurrences, /\b(?:seamless|empower(?:s|ed|ing)?|unlock|journey|experience)\b/iu),
    rationale: "The value language names an abstract benefit without saying what the product changes for the user.",
    uncertainty: "bounded",
    suggested_next_action: "Replace the abstraction with a verified user outcome and the concrete capability that produces it.",
    automatic_rewrite_allowed: false,
  });
  pushFinding(drafts, {
    rule_id: "content.generic-abstraction",
    occurrences: occurrences.filter((item) => {
      const text = item.expression_payload.toLowerCase();
      return (text.includes("seamless") && text.includes("experience")) ||
        (text.includes("empower") && text.includes("journey"));
    }),
    rationale: "The sentence stacks generic abstractions and promotional verbs while leaving the product action and user outcome unstated.",
    uncertainty: "bounded",
    suggested_next_action: "Ground the sentence in one audience, one task, and one evidenced outcome.",
    automatic_rewrite_allowed: false,
  });

  const paymentOccurrences = matching(occurrences, /\b(?:payment failed|try again)\b/iu);
  if (paymentOccurrences.length > 0 && input.product_facts.payment_outcome_after_submission === "not_established") {
    pushFinding(drafts, {
      rule_id: "content.product-behavior-unknown",
      occurrences: paymentOccurrences,
      rationale: "The product record does not establish whether a submitted payment is failed, pending, successful, or unknown.",
      uncertainty: "material",
      suggested_next_action: "Establish the post-submission payment-state contract before proposing recovery copy.",
      automatic_rewrite_allowed: false,
    });
  } else if (paymentOccurrences.length > 0 && input.product_facts.payment_outcome_after_submission === "unknown_possible") {
    pushFinding(drafts, {
      rule_id: "content.state-mismatch",
      occurrences: matching(paymentOccurrences, /\bpayment failed\b/iu),
      rationale: "The content declares failure even though the documented post-submission outcome can remain unknown.",
      uncertainty: "none",
      suggested_next_action: "Represent the outcome as unknown and preserve the distinction between submission and confirmed result.",
      automatic_rewrite_allowed: false,
    });
    pushFinding(drafts, {
      rule_id: "content.unsafe-retry",
      occurrences: matching(paymentOccurrences, /\btry again\b/iu),
      rationale: "A retry invitation can create a duplicate attempt while the submitted payment outcome remains unknown.",
      uncertainty: "none",
      suggested_next_action: "Direct the user to verify status before any new attempt and require review of the final recovery flow.",
      automatic_rewrite_allowed: false,
    });
    pushFinding(drafts, {
      rule_id: "content.missing-recovery",
      occurrences: paymentOccurrences.filter((item) => !/\b(?:check|status|reference|support)\b/iu.test(item.expression_payload)),
      rationale: "The unknown-outcome message does not provide the safe status-checking recovery required by the product-state evidence.",
      uncertainty: "none",
      suggested_next_action: "Add a status-check path and explain when another attempt is safe.",
      automatic_rewrite_allowed: false,
    });
  }

  pushFinding(drafts, {
    rule_id: "content.weak-accessible-name",
    occurrences: occurrences.filter((item) =>
      item.modality === "assistive" && /^(?:action|button|icon|control)$/iu.test(item.expression_payload.trim()),
    ),
    rationale: "The accessible name identifies only the control type and not the action, object, or consequence.",
    uncertainty: "none",
    suggested_next_action: "Name the exact action and affected object, then verify the rendered accessible name.",
    automatic_rewrite_allowed: false,
  });

  const terminologyOccurrences = occurrences.filter((item) => /\b(?:cart|bag|basket)\b/iu.test(item.expression_payload));
  const terminology = new Set<string>();
  for (const item of terminologyOccurrences) {
    for (const match of item.expression_payload.toLowerCase().matchAll(/\b(cart|bag|basket)\b/gu)) {
      if (match[1] !== undefined) terminology.add(match[1]);
    }
  }
  if (terminology.size > 1) {
    pushFinding(drafts, {
      rule_id: "content.terminology-inconsistency",
      occurrences: terminologyOccurrences,
      rationale: `One checkout concept is named with multiple terms: ${[...terminology].sort().join(", ")}.`,
      uncertainty: "bounded",
      suggested_next_action: "Select the governed concept term from product and audience evidence, then document scoped exceptions.",
      automatic_rewrite_allowed: false,
    });
  }

  const labelsByRoute = new Map<string, ReviewOccurrence[]>();
  for (const item of occurrences.filter((occurrence) => occurrence.route !== null)) {
    const route = item.route!;
    labelsByRoute.set(route, [...(labelsByRoute.get(route) ?? []), item]);
  }
  const duplicateDestinationLabels = [...labelsByRoute.values()].flatMap((items) =>
    new Set(items.map((item) => item.expression_payload)).size > 1 ? items : [],
  );
  pushFinding(drafts, {
    rule_id: "content.duplicate-destination-labels",
    occurrences: duplicateDestinationLabels,
    rationale: "The same destination is exposed under multiple labels, weakening recognition and information-architecture consistency.",
    uncertainty: "none",
    suggested_next_action: "Choose one evidence-backed concept label per destination and preserve it across entry points.",
    automatic_rewrite_allowed: false,
  });

  pushFinding(drafts, {
    rule_id: "content.locale-fallback",
    occurrences: localeFallbackOccurrences(occurrences),
    rationale: "A non-English locale contains an unchanged English expression where a localized expression is expected.",
    uncertainty: "bounded",
    suggested_next_action: "Send the expression through the locale workflow and record translation, review, and fallback status separately.",
    automatic_rewrite_allowed: false,
  });

  const findings = drafts
    .map((draft) => makeFinding(draft, input.evidence_refs))
    .sort((left, right) => left.rule_id.localeCompare(right.rule_id) || left.finding_id.localeCompare(right.finding_id));
  const blocking = findings.filter((finding) => finding.outcome_class === "hard");
  const unknownOnly = blocking.length > 0 && blocking.every((finding) => finding.rule_id === "content.product-behavior-unknown");
  const advisoryGroups = new Map<string, string[]>();
  for (const finding of findings.filter((item) => item.outcome_class === "advisory")) {
    advisoryGroups.set(finding.dimension, [...(advisoryGroups.get(finding.dimension) ?? []), finding.finding_id]);
  }
  const inputDigest = sha256Canonical({
    project_id: input.project_id,
    occurrences,
    evidence_refs: [...new Set(input.evidence_refs)].sort(),
    product_facts: input.product_facts,
  });
  return {
    schema_version: "contentmd.review-report/0.1.0",
    report_id: `review.${sha256Canonical({ input_digest: inputDigest, findings }).slice(0, 32)}`,
    project_id: input.project_id,
    input_digest: inputDigest,
    findings,
    hard_outcomes: {
      status: blocking.length === 0 ? "pass" : unknownOnly ? "unknown" : "fail",
      blocking_finding_refs: blocking.map((finding) => finding.finding_id).sort(),
    },
    advisory_dimensions: [...advisoryGroups.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([dimension, findingRefs]) => ({ dimension, finding_refs: findingRefs.sort() })),
  };
}
