import { sha256Canonical } from "@contentmd/core";
import { CORE_UX_WRITING_RULE_PACKS } from "./core-ux-writing-rule-packs.js";
import {
  evaluateUxWritingRules,
  type UxWritingFacts,
  type UxWritingRuleFinding,
  type UxWritingRulePack,
} from "./ux-writing-rule-engine.js";

export interface UxWritingReviewRequest {
  contract_version: "contentmd.ux-writing-review-request/0.1.0";
  request_id: string;
  target: {
    source_artifact: string;
    line: number;
    column: number;
    text: string;
  };
  facts: UxWritingFacts;
  evidence_refs: string[];
  preserve: string[];
  must_not_claim: string[];
  required_facts: string[];
  consequence: string | null;
  recovery: string | null;
  channel: string;
  locale: string;
  acceptance_criteria: string[];
  unresolved_questions: string[];
  authority_effect: "none";
}

export interface UxWritingRepairBrief {
  contract_version: "contentmd.ux-writing-repair-brief/0.1.0";
  brief_id: string;
  request_ref: string;
  review_report_ref: string;
  preserve: string[];
  must_change: string[];
  must_not_claim: string[];
  required_facts: string[];
  consequence: string | null;
  recovery: string | null;
  channel: string;
  locale: string;
  acceptance_criteria: string[];
  unresolved_questions: string[];
  authority_effect: "none";
  brief_digest: string;
}

export interface UxWritingReviewReport {
  contract_version: "contentmd.ux-writing-review-report/0.1.0";
  report_id: string;
  request_ref: string;
  target: UxWritingReviewRequest["target"];
  input_digest: string;
  rule_pack_digests: string[];
  findings: UxWritingRuleFinding[];
  hard_plane_status: "pass" | "fail" | "unknown";
  advisory_status: "pass" | "findings_present" | "not_evaluated";
  recommended_disposition: "abstain" | "escalate" | "revise" | "human_review" | "bounded_approval" | "reject";
  repair_brief_ref: string | null;
  authority_effect: "none";
  report_digest: string;
}

export interface UxWritingReviewResult {
  report: UxWritingReviewReport;
  repair_brief: UxWritingRepairBrief | null;
}

export function assertUxWritingRepairBrief(value: UxWritingRepairBrief): UxWritingRepairBrief {
  if (value === null || typeof value !== "object") throw new TypeError("ux_writing_repair_brief_invalid:record");
  const { brief_id: briefId, brief_digest: briefDigest, ...preimage } = value;
  const replayedDigest = sha256Canonical(preimage);
  if (value.contract_version !== "contentmd.ux-writing-repair-brief/0.1.0"
    || value.authority_effect !== "none"
    || briefDigest !== replayedDigest
    || briefId !== `uxwrepair.${replayedDigest.slice(0, 32)}`) {
    throw new TypeError("ux_writing_repair_brief_invalid:integrity");
  }
  sorted(value.preserve, "preserve", false);
  sorted(value.must_change, "must_change", false);
  sorted(value.must_not_claim, "must_not_claim");
  sorted(value.required_facts, "required_facts", false);
  sorted(value.acceptance_criteria, "acceptance_criteria", false);
  sorted(value.unresolved_questions, "unresolved_questions");
  return value;
}

function sorted(values: string[], field: string, allowEmpty = true): string[] {
  if (!Array.isArray(values) || (!allowEmpty && values.length === 0)
    || values.some((value) => typeof value !== "string" || value.trim().length === 0)) {
    throw new TypeError(`ux_writing_review_invalid:${field}`);
  }
  return [...new Set(values)].sort();
}

function validateRequest(request: UxWritingReviewRequest): UxWritingReviewRequest {
  if (request.contract_version !== "contentmd.ux-writing-review-request/0.1.0"
    || request.authority_effect !== "none"
    || typeof request.request_id !== "string" || request.request_id.length === 0
    || typeof request.target.source_artifact !== "string" || request.target.source_artifact.length === 0
    || !Number.isSafeInteger(request.target.line) || request.target.line < 1
    || !Number.isSafeInteger(request.target.column) || request.target.column < 1
    || typeof request.target.text !== "string" || request.target.text.length === 0
    || typeof request.channel !== "string" || request.channel.length === 0
    || typeof request.locale !== "string" || request.locale.length === 0
    || request.consequence !== null && (typeof request.consequence !== "string" || request.consequence.length === 0)
    || request.recovery !== null && (typeof request.recovery !== "string" || request.recovery.length === 0)) {
    throw new TypeError("ux_writing_review_invalid:request");
  }
  sorted(request.evidence_refs, "evidence_refs");
  sorted(request.preserve, "preserve", false);
  sorted(request.must_not_claim, "must_not_claim");
  sorted(request.required_facts, "required_facts", false);
  sorted(request.acceptance_criteria, "acceptance_criteria", false);
  sorted(request.unresolved_questions, "unresolved_questions");
  return request;
}

export function reviewUxWriting(input: {
  request: UxWritingReviewRequest;
  project_rule_packs?: UxWritingRulePack[];
}): UxWritingReviewResult {
  const request = validateRequest(input.request);
  const evaluation = evaluateUxWritingRules({
    facts: request.facts,
    evidence_refs: request.evidence_refs,
    core_packs: CORE_UX_WRITING_RULE_PACKS,
    ...(input.project_rule_packs === undefined ? {} : { project_packs: input.project_rule_packs }),
  });
  const needsRepair = evaluation.findings.length > 0;
  const reportId = `uxwreview.${sha256Canonical({ request, evaluation }).slice(0, 32)}`;
  let repairBrief: UxWritingRepairBrief | null = null;
  if (needsRepair) {
    const briefPreimage = {
      contract_version: "contentmd.ux-writing-repair-brief/0.1.0" as const,
      request_ref: request.request_id,
      review_report_ref: reportId,
      preserve: sorted(request.preserve, "preserve", false),
      must_change: sorted(evaluation.findings.map((item) => item.repair), "must_change", false),
      must_not_claim: sorted(request.must_not_claim, "must_not_claim"),
      required_facts: sorted(request.required_facts, "required_facts", false),
      consequence: request.consequence,
      recovery: request.recovery,
      channel: request.channel,
      locale: request.locale,
      acceptance_criteria: sorted(request.acceptance_criteria, "acceptance_criteria", false),
      unresolved_questions: sorted(request.unresolved_questions, "unresolved_questions"),
      authority_effect: "none" as const,
    };
    const briefDigest = sha256Canonical(briefPreimage);
    repairBrief = {
      ...briefPreimage,
      brief_id: `uxwrepair.${briefDigest.slice(0, 32)}`,
      brief_digest: briefDigest,
    };
  }
  const reportPreimage = {
    contract_version: "contentmd.ux-writing-review-report/0.1.0" as const,
    report_id: reportId,
    request_ref: request.request_id,
    target: { ...request.target },
    input_digest: evaluation.input_digest,
    rule_pack_digests: evaluation.rule_pack_digests,
    findings: evaluation.findings,
    hard_plane_status: evaluation.hard_plane_status,
    advisory_status: evaluation.advisory_status,
    recommended_disposition: evaluation.recommended_disposition,
    repair_brief_ref: repairBrief?.brief_id ?? null,
    authority_effect: "none" as const,
  };
  return {
    report: { ...reportPreimage, report_digest: sha256Canonical(reportPreimage) },
    repair_brief: repairBrief,
  };
}

export function reviewUxWritingRepairCandidate(input: {
  request: UxWritingReviewRequest;
  repair_brief: UxWritingRepairBrief;
  candidate: {
    text: string;
    semantic_invariant_refs: string[];
  };
  project_rule_packs?: UxWritingRulePack[];
}): UxWritingReviewResult {
  const brief = assertUxWritingRepairBrief(input.repair_brief);
  if (brief.request_ref !== input.request.request_id) {
    throw new TypeError("ux_writing_repair_candidate_invalid:request_binding");
  }
  const invariantRefs = new Set(sorted(input.candidate.semantic_invariant_refs, "semantic_invariant_refs", false));
  const mapped = brief.preserve.every((invariant) => invariantRefs.has(invariant));
  const forbidden = brief.must_not_claim.some((claim) => input.candidate.text.toLocaleLowerCase("en-US").includes(claim.toLocaleLowerCase("en-US")));
  const outcomeEvidence = input.request.facts["state.outcome_evidence"];
  const retrySafe = outcomeEvidence === "confirmed" || !/\b(?:try|retry|submit|pay|send)\s+again\b/iu.test(input.candidate.text);
  const candidateRequest: UxWritingReviewRequest = {
    ...input.request,
    request_id: `${input.request.request_id}.candidate.${sha256Canonical(input.candidate).slice(0, 16)}`,
    target: { ...input.request.target, text: input.candidate.text },
    facts: {
      ...input.request.facts,
      "recovery.retry_safe": retrySafe,
      "expression.invariants_mapped": mapped,
      "expression.invariants_preserved": forbidden ? false : null,
    },
  };
  return reviewUxWriting({
    request: candidateRequest,
    ...(input.project_rule_packs === undefined ? {} : { project_rule_packs: input.project_rule_packs }),
  });
}
