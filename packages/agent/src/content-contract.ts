import { canonicalJson } from "@contentmd/core";
import type { ProjectModelResult } from "./model-workflow.js";

export const CONTENTMD_DIRECTORIES = [
  ".contentmd",
  ".contentmd/adapters",
  ".contentmd/audiences",
  ".contentmd/decisions",
  ".contentmd/evaluations",
  ".contentmd/evidence",
  ".contentmd/governance",
  ".contentmd/ia",
  ".contentmd/journeys",
  ".contentmd/messages",
  ".contentmd/patterns",
  ".contentmd/product",
  ".contentmd/records",
  ".contentmd/research",
  ".contentmd/terminology",
  ".contentmd/voice",
] as const;

export interface ExistingSource {
  relative_path: string;
  source_type: string;
  source_id?: string;
  adapter_id?: string;
  adapter_version?: string;
  content_digest?: string;
  lifecycle?: string;
  evidence_class?: string;
  scope?: {
    products: string[];
    services: string[];
    markets: string[];
    locales: string[];
    surfaces: string[];
    versions: string[];
  };
  limitations?: string[];
  authority_effect: "none";
}

export interface OpenQuestion {
  question_id: string;
  question: string;
  status: "not_established";
}

export function renderContentContract(
  model: ProjectModelResult,
  sources: readonly ExistingSource[],
): string {
  const claimsById = new Map(model.discovery.evidence_claims.map((claim) => [claim.claim_id, claim]));
  const selected = model.assessments.flatMap((assessment) => {
    if (assessment.selected_claim_ref === null) return [];
    const claim = claimsById.get(assessment.selected_claim_ref);
    return claim === undefined ? [] : [claim];
  });
  const values = (kind: string, subject?: RegExp): string[] => selected
    .filter((claim) => claim.claim_kind === kind && (subject === undefined || subject.test(claim.subject)))
    .map((claim) => Array.isArray(claim.value) ? claim.value.join(" → ") : String(claim.value));
  const list = (items: string[], empty: string): string => items.length === 0
    ? `- ${empty}`
    : items.map((item) => `- ${item.replace(/\s+/gu, " ").trim()}`).join("\n");
  const sourceLines =
    sources.length === 0
      ? "- No existing product or agent instruction source was detected."
      : sources
          .map(
            (source) =>
              `- \`${source.relative_path}\` — detected evidence source; authority is not inferred.`,
          )
          .join("\n");
  const conflictLines = model.assessments
    .filter((assessment) => assessment.conflicting_claim_refs.length > 0)
    .map((assessment) => `${assessment.claim_kind} / ${assessment.subject}: ${assessment.selected_claim_ref === null ? "unresolved" : "resolved provisionally"}; ${assessment.conflicting_claim_refs.length} conflicting claim(s).`);
  const proposedVoice = model.proposed_interpretation?.voice_dimensions.map((item) =>
    `${String(item.dimension)}: ${String(item.position)} — ${String(item.rationale)}`
  ) ?? [];
  const proposedTerms = model.proposed_interpretation?.terminology_candidates.map((item) =>
    `${String(item.term)} — ${String(item.guidance)}`
  ) ?? [];
  return `# CONTENT.md

> Guidance status: provisional. Review structured records before treating a proposal as approved.

## Product and scope

Project: ${model.identity.proposed_name}

${list([
  ...values("product_identity", /^product name$/iu),
  ...values("product_identity", /one sentence|product identity/iu),
  ...values("product_scope"),
], "Product identity and scope are not established; review the open questions.")}

## Users and jobs

${list(values("audience_job"), "Users, jobs, and affected parties are not established.")}

## Journeys and content principles

${list(values("workflow_stage"), "The primary journey is not established.")}

- Preserve factual and behavioral accuracy.
- Keep message intent separate from expression.
- Provide understandable action, consequence, status, and recovery.
- Treat accessibility, localization, cognition, autonomy, and safety as first-class constraints.

## Voice and terminology

${list([...values("voice_guidance"), ...proposedVoice], "Voice dimensions are provisional or not established.")}

${list([...values("terminology_guidance"), ...proposedTerms], "Approved terminology is not established.")}

## Sources, evidence, and conflicts

${sourceLines}

Source presence is evidence, not automatic authority. Conflicts and missing facts remain explicit.

${list(conflictLines, "No deterministic source conflicts were detected.")}

## Operating boundaries

- Local discovery, proposed records, deterministic review, and previewable drafts are allowed by the starter policy.
- External publication is prohibited until a current project authority record exists.
- Mutation, release, connector access, durable private memory, telemetry, and learning promotion require separate current controls.

## Review and approval routes

No organizational content owner or release approver is established. content.md must stop at a proposed result whenever missing authority or evidence could change meaning, consequence, or scope.

## Structured records

See \`.contentmd/records/repository-model.json\` for the evidence-linked provisional model, \`.contentmd/product/open-questions.json\` for unresolved decisions, and \`.contentmd/manifest.json\` for ownership boundaries.
`;
}

export function renderStarterPolicy(): string {
  return `schema_version: contentmd.governance-policy/0.1.0\npolicy_id: policy.contentmd.starter-local\npolicy_version: 1\nstatus: proposed\ngovernance_level: strict\nallowed:\n  local_discovery: true\n  local_proposed_records: true\n  deterministic_review: true\n  patch_preview: true\nrequires_review:\n  local_product_mutation: true\n  learning_promotion: true\ndenied:\n  network_access: true\n  credential_access: true\n  external_publication: deny\n  remote_write: true\n  arbitrary_command_execution: true\nlimits:\n  files: project_root_only\n  egress: none\n  learning_scope_widening: denied\nauthority_status:\n  content_owner: not_established\n  release_approver: not_established\n`;
}

export function renderOpenQuestions(): string {
  return canonicalJson({
    schema_version: "contentmd.open-questions/0.1.0",
    questions: defaultOpenQuestions(),
  });
}

export function defaultOpenQuestions(): OpenQuestion[] {
  return [
    {
      question_id: "question.product-owner",
      question: "Who is accountable for product-content facts and semantic decisions?",
      status: "not_established",
    },
    {
      question_id: "question.release-approver",
      question: "Who may approve content mutation and publication for each surface?",
      status: "not_established",
    },
    {
      question_id: "question.product-behavior",
      question: "Which documented product behaviors and states govern current content?",
      status: "not_established",
    },
    {
      question_id: "question.voice-authority",
      question: "Which voice, terminology, locale, accessibility, and risk records are approved?",
      status: "not_established",
    },
  ];
}
