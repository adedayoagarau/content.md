import { sha256Canonical } from "@contentmd/core";

export type UxWritingRiskLevel = "low" | "medium" | "high" | "critical";
export type UxWritingHardStatus = "pass" | "fail" | "unknown";
export type UxWritingDisposition = "abstain" | "escalate" | "revise" | "human_review" | "bounded_approval" | "reject";

export interface UxWritingEvaluationRequest {
  request_id: string;
  risk_level: UxWritingRiskLevel;
  evidence_refs: string[];
  required_facts: string[];
  open_questions: string[];
  locale: {
    targets: string[];
    direction: "ltr" | "rtl" | "mixed" | "unknown";
    specialist_review_required: boolean;
  };
  action_contracts: Array<{
    action_id: string;
    reversibility: "reversible" | "partly_reversible" | "irreversible" | "unknown";
    recovery: string | null;
    outcome_evidence: "confirmed" | "unknown_possible" | "not_established";
  }>;
}

export interface UxWritingEvaluationCandidate {
  candidate_id: string;
  semantic_invariants: Array<{
    invariant_id: string;
    status: "preserved" | "violated" | "unknown";
  }>;
  expressions: Array<{
    expression_id: string;
    text: string;
    invariant_refs: string[];
  }>;
  unresolved_questions: string[];
}

export type UxWritingReasonCode =
  | "uxw.evidence.missing"
  | "uxw.state.outcome_unknown"
  | "uxw.recovery.missing"
  | "uxw.recovery.unsafe_retry"
  | "uxw.invariant.violated"
  | "uxw.invariant.unknown"
  | "uxw.invariant.unmapped"
  | "uxw.specialist.locale_required"
  | "uxw.question.material_open";

export interface UxWritingEvaluationFinding {
  finding_id: string;
  reason_code: UxWritingReasonCode;
  dimension: "evidence" | "state" | "recovery" | "semantic_fidelity" | "localization";
  status: "fail" | "unknown";
  review_type: "deterministic" | "specialist" | "human_judgment";
  rationale: string;
  evidence_refs: string[];
  automatic_rewrite_allowed: false;
}

export interface UxWritingEvaluationResult {
  contract_version: "contentmd.ux-writing-evaluation/0.1.0";
  evaluation_id: string;
  request_id: string;
  candidate_id: string;
  findings: UxWritingEvaluationFinding[];
  hard_plane_status: UxWritingHardStatus;
  voice_tone_status: "eligible" | "not_evaluated";
  recommended_disposition: UxWritingDisposition;
}

interface FindingDraft extends Omit<UxWritingEvaluationFinding, "finding_id" | "automatic_rewrite_allowed"> {}

const RETRY_PATTERN = /\b(?:try|retry|submit|pay|send)\s+again\b/iu;

function finding(draft: FindingDraft): UxWritingEvaluationFinding {
  return {
    ...draft,
    finding_id: `uxwfinding.${sha256Canonical(draft).slice(0, 32)}`,
    automatic_rewrite_allowed: false,
  };
}

export function evaluateUxWritingCandidate(
  request: UxWritingEvaluationRequest,
  candidate: UxWritingEvaluationCandidate,
): UxWritingEvaluationResult {
  const drafts: FindingDraft[] = [];
  const evidenceRefs = [...new Set(request.evidence_refs)].sort();
  const highRisk = request.risk_level === "high" || request.risk_level === "critical";

  if (evidenceRefs.length === 0 || request.required_facts.length === 0) {
    drafts.push({
      reason_code: "uxw.evidence.missing",
      dimension: "evidence",
      status: "unknown",
      review_type: "human_judgment",
      rationale: "The request does not provide the evidence needed to ground its required product facts.",
      evidence_refs: evidenceRefs,
    });
  }

  if (highRisk && (request.open_questions.length > 0 || candidate.unresolved_questions.length > 0)) {
    drafts.push({
      reason_code: "uxw.question.material_open",
      dimension: "evidence",
      status: "unknown",
      review_type: "human_judgment",
      rationale: "A high-risk request still has material questions that must be resolved before expression approval.",
      evidence_refs: evidenceRefs,
    });
  }

  const expressionText = candidate.expressions.map((item) => item.text).join("\n");
  for (const action of [...request.action_contracts].sort((a, b) => a.action_id.localeCompare(b.action_id))) {
    if (action.outcome_evidence !== "confirmed") {
      drafts.push({
        reason_code: "uxw.state.outcome_unknown",
        dimension: "state",
        status: "unknown",
        review_type: "deterministic",
        rationale: `Action ${action.action_id} does not have a confirmed outcome contract.`,
        evidence_refs: evidenceRefs,
      });
      if (RETRY_PATTERN.test(expressionText)) {
        drafts.push({
          reason_code: "uxw.recovery.unsafe_retry",
          dimension: "recovery",
          status: "fail",
          review_type: "deterministic",
          rationale: `Candidate invites another attempt while action ${action.action_id} may already have taken effect.`,
          evidence_refs: evidenceRefs,
        });
      }
    }
    if ((action.reversibility === "irreversible" || action.outcome_evidence !== "confirmed") && action.recovery === null) {
      drafts.push({
        reason_code: "uxw.recovery.missing",
        dimension: "recovery",
        status: "fail",
        review_type: "deterministic",
        rationale: `Action ${action.action_id} requires an explicit recovery or verification path.`,
        evidence_refs: evidenceRefs,
      });
    }
  }

  const invariantIds = new Set(candidate.semantic_invariants.map((item) => item.invariant_id));
  for (const invariant of candidate.semantic_invariants) {
    if (invariant.status === "violated") {
      drafts.push({
        reason_code: "uxw.invariant.violated",
        dimension: "semantic_fidelity",
        status: "fail",
        review_type: "deterministic",
        rationale: `Semantic invariant ${invariant.invariant_id} is not preserved.`,
        evidence_refs: evidenceRefs,
      });
    } else if (invariant.status === "unknown") {
      drafts.push({
        reason_code: "uxw.invariant.unknown",
        dimension: "semantic_fidelity",
        status: "unknown",
        review_type: "human_judgment",
        rationale: `Semantic invariant ${invariant.invariant_id} has not been verified.`,
        evidence_refs: evidenceRefs,
      });
    }
  }
  for (const expression of candidate.expressions) {
    if (expression.invariant_refs.length === 0 || expression.invariant_refs.some((ref) => !invariantIds.has(ref))) {
      drafts.push({
        reason_code: "uxw.invariant.unmapped",
        dimension: "semantic_fidelity",
        status: "fail",
        review_type: "deterministic",
        rationale: `Expression ${expression.expression_id} is not fully mapped to declared semantic invariants.`,
        evidence_refs: evidenceRefs,
      });
    }
  }

  if (request.locale.specialist_review_required || request.locale.direction === "rtl" || request.locale.direction === "mixed") {
    drafts.push({
      reason_code: "uxw.specialist.locale_required",
      dimension: "localization",
      status: "unknown",
      review_type: "specialist",
      rationale: "The requested locale or writing direction requires recorded specialist review for semantic parity.",
      evidence_refs: evidenceRefs,
    });
  }

  const findings = drafts
    .map(finding)
    .sort((a, b) => a.reason_code.localeCompare(b.reason_code) || a.finding_id.localeCompare(b.finding_id));
  const hardPlaneStatus: UxWritingHardStatus = findings.some((item) => item.status === "fail")
    ? "fail"
    : findings.some((item) => item.status === "unknown")
      ? "unknown"
      : "pass";
  const specialistRequired = findings.some((item) => item.review_type === "specialist");
  const disposition: UxWritingDisposition = hardPlaneStatus === "fail"
    ? "revise"
    : specialistRequired
      ? "escalate"
      : hardPlaneStatus === "unknown"
        ? "abstain"
        : "bounded_approval";
  const preimage = {
    request_id: request.request_id,
    candidate_id: candidate.candidate_id,
    findings,
    hard_plane_status: hardPlaneStatus,
    recommended_disposition: disposition,
  };

  return {
    contract_version: "contentmd.ux-writing-evaluation/0.1.0",
    evaluation_id: `uxweval.${sha256Canonical(preimage).slice(0, 32)}`,
    request_id: request.request_id,
    candidate_id: candidate.candidate_id,
    findings,
    hard_plane_status: hardPlaneStatus,
    voice_tone_status: hardPlaneStatus === "pass" ? "eligible" : "not_evaluated",
    recommended_disposition: disposition,
  };
}
