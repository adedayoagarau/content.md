import { basename } from "node:path";
import { canonicalJson } from "@contentmd/core";

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
  authority_effect: "none";
}

export interface OpenQuestion {
  question_id: string;
  question: string;
  status: "not_established";
}

export function renderContentContract(
  projectRoot: string,
  sources: readonly ExistingSource[],
): string {
  const sourceLines =
    sources.length === 0
      ? "- No existing product or agent instruction source was detected."
      : sources
          .map(
            (source) =>
              `- \`${source.relative_path}\` — detected evidence source; authority is not inferred.`,
          )
          .join("\n");
  return `# CONTENT.md\n\n## Product scope\n\nProject: ${basename(projectRoot)}\n\ncontent.md may discover, model, review, and draft content inside this repository. Product facts, policy, approvals, and publication authority remain with the product and organization.\n\n## Users and jobs\n\nUsers, jobs, journeys, and affected parties are not yet established. See \`.contentmd/product/open-questions.json\`.\n\n## Content principles\n\n- Preserve factual and behavioral accuracy.\n- Keep message intent separate from expression.\n- Provide understandable action, consequence, status, and recovery.\n- Treat accessibility, localization, cognition, autonomy, and safety as first-class constraints.\n\n## Sources of truth and evidence\n\n${sourceLines}\n\nSource presence is evidence, not automatic authority. Conflicts and missing facts remain explicit.\n\n## Operating boundaries\n\n- Local discovery, proposed records, deterministic review, and previewable drafts are allowed by the starter policy.\n- External publication is prohibited until a current project authority record exists.\n- Mutation, release, connector access, durable private memory, telemetry, and learning promotion require separate current controls.\n\n## Known risks\n\nProduct behavior, content ownership, approval routes, voice authority, locale coverage, and high-risk review requirements are not established.\n\n## Review routes\n\nNo organizational content owner or release approver is established. content.md must stop at a proposed result whenever missing authority or evidence could change meaning, consequence, or scope.\n\n## Structured records\n\nSee \`.contentmd/manifest.json\` for tracked, local-only, and excluded paths.\n`;
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
