import { readFile, realpath } from "node:fs/promises";
import { join } from "node:path";
import {
  FilesystemContentAdapter,
  proposeProjectIdentity,
  readSourceDocuments,
  type DiscoverResult,
  type ProjectIdentityProposal,
} from "@contentmd/adapter-filesystem";
import {
  compileContentContext,
  sha256Canonical,
  resolveAuthority,
  type AuthorityAssessment,
  type ContentGraph,
  type ContextSourceDocument,
} from "@contentmd/core";

export interface CompileProjectModelRequest {
  project_root: string;
}

export interface ProjectModelResult {
  project_id: string;
  identity: ProjectIdentityProposal;
  sources: ContextSourceDocument[];
  discovery: DiscoverResult;
  assessments: AuthorityAssessment[];
  proposed_interpretation: StoredRepositoryInterpretation | null;
  graph: ContentGraph;
}

interface StoredCitation {
  source_ref: string;
  source_digest: string;
  start_line: number;
  end_line: number;
  quoted_text: string;
}

export interface StoredRepositoryInterpretation {
  contract_version: "contentmd.repository-interpretation-record/0.1.0";
  project_id: string;
  packet_digest: string;
  decision_status: "proposed";
  proposed_claims: Array<{
    proposal_id: string;
    claim_kind: import("@contentmd/core").ClaimKind;
    subject: string;
    value: import("@contentmd/core").JsonValue;
    citations: StoredCitation[];
    confidence: "high" | "medium" | "low";
    limitations: string[];
    decision_status: "proposed";
    authority_effect: "none";
    proposal_digest: string;
  }>;
  persona_candidates: Array<{ citations: StoredCitation[]; [key: string]: unknown }>;
  voice_dimensions: Array<{ citations: StoredCitation[]; [key: string]: unknown }>;
  terminology_candidates: Array<{ citations: StoredCitation[]; [key: string]: unknown }>;
  conflicts: Array<{ citations: StoredCitation[]; [key: string]: unknown }>;
  open_questions: Array<{ citations: StoredCitation[]; [key: string]: unknown }>;
  authority_effect: "none";
  record_digest: string;
}

async function readStoredInterpretation(
  projectRoot: string,
  projectId: string,
  sources: ContextSourceDocument[],
): Promise<StoredRepositoryInterpretation | null> {
  let bytes: string;
  try {
    bytes = await readFile(join(projectRoot, ".contentmd/records/repository-interpretation.json"), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  let parsed: StoredRepositoryInterpretation;
  try {
    parsed = JSON.parse(bytes) as StoredRepositoryInterpretation;
  } catch {
    throw new Error("interpretation_record_invalid");
  }
  const { record_digest: recordDigest, ...preimage } = parsed;
  if (
    parsed.contract_version !== "contentmd.repository-interpretation-record/0.1.0" ||
    parsed.project_id !== projectId || parsed.decision_status !== "proposed" ||
    parsed.authority_effect !== "none" || sha256Canonical(preimage) !== recordDigest ||
    !Array.isArray(parsed.proposed_claims)
  ) throw new Error("interpretation_record_invalid");
  for (const proposal of parsed.proposed_claims) {
    const { proposal_digest: proposalDigest, ...proposalPreimage } = proposal;
    if (
      proposal.decision_status !== "proposed" || proposal.authority_effect !== "none" ||
      sha256Canonical(proposalPreimage) !== proposalDigest
    ) throw new Error("interpretation_record_invalid");
  }
  const sourcesById = new Map(sources.map((source) => [source.source_id, source]));
  const citedItems = [
    ...parsed.proposed_claims,
    ...parsed.persona_candidates,
    ...parsed.voice_dimensions,
    ...parsed.terminology_candidates,
    ...parsed.conflicts,
    ...parsed.open_questions,
  ];
  for (const item of citedItems) {
    if (!Array.isArray(item.citations)) throw new Error("interpretation_record_invalid");
    for (const citation of item.citations) {
      const source = sourcesById.get(citation.source_ref);
      const lines = source?.content.split(/\r?\n/u) ?? [];
      if (
        source === undefined || source.content_digest !== citation.source_digest ||
        citation.start_line < 1 || citation.end_line < citation.start_line || citation.end_line > lines.length ||
        lines.slice(citation.start_line - 1, citation.end_line).join("\n") !== citation.quoted_text
      ) throw new Error("interpretation_record_source_changed");
    }
  }
  return parsed;
}

export async function compileProjectModel(
  request: CompileProjectModelRequest,
): Promise<ProjectModelResult> {
  const projectRoot = await realpath(request.project_root);
  const discovery = await new FilesystemContentAdapter().discover({ project_root: projectRoot });
  const identity = await proposeProjectIdentity(projectRoot, discovery.inventory);
  const sources = await readSourceDocuments(projectRoot, discovery.source_candidates);
  const assessments = resolveAuthority(discovery.evidence_claims);
  const proposedInterpretation = await readStoredInterpretation(
    projectRoot,
    identity.proposed_project_id,
    sources,
  );
  const graph = compileContentContext({
    project_id: identity.proposed_project_id,
    sources,
    claims: discovery.evidence_claims,
    authority_assessments: assessments,
    ...(proposedInterpretation === null ? {} : { proposed_guidance: proposedInterpretation }),
    discovery: {
      scan_digest: discovery.scan_digest,
      occurrences: discovery.occurrences,
    },
  });
  return {
    project_id: identity.proposed_project_id,
    identity,
    sources,
    discovery,
    assessments,
    proposed_interpretation: proposedInterpretation,
    graph,
  };
}
