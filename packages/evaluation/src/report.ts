import type { ReviewReport } from "./review.js";

export interface HumanReviewSummary {
  report_id: string;
  hard_status: ReviewReport["hard_outcomes"]["status"];
  hard_findings: string[];
  advisory_findings: string[];
  observable_writing_qualities: string[];
  note: string;
}

export function summarizeReview(report: ReviewReport): HumanReviewSummary {
  const hardFindings = report.findings
    .filter((finding) => finding.outcome_class === "hard")
    .map((finding) => `${finding.rule_id}: ${finding.rationale}`);
  const advisoryFindings = report.findings
    .filter((finding) => finding.outcome_class === "advisory")
    .map((finding) => `${finding.rule_id}: ${finding.rationale}`);
  const qualities: string[] = [];
  if (report.findings.some((finding) => finding.rule_id === "content.generic-abstraction")) {
    qualities.push("generic abstraction obscures the product action and user outcome");
  }
  if (report.findings.some((finding) => finding.rule_id === "content.vague-value-claim")) {
    qualities.push("vague benefit language lacks a concrete, evidenced value proposition");
  }
  return {
    report_id: report.report_id,
    hard_status: report.hard_outcomes.status,
    hard_findings: hardFindings,
    advisory_findings: advisoryFindings,
    observable_writing_qualities: qualities,
    note: "These are content qualities and evidence gaps; they do not establish who or what authored the text.",
  };
}
