import { realpath } from "node:fs/promises";
import {
  FilesystemContentAdapter,
  proposeProjectIdentity,
  readSourceDocuments,
  type DiscoverResult,
  type ProjectIdentityProposal,
} from "@contentmd/adapter-filesystem";
import {
  compileContentContext,
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
  graph: ContentGraph;
}

export async function compileProjectModel(
  request: CompileProjectModelRequest,
): Promise<ProjectModelResult> {
  const projectRoot = await realpath(request.project_root);
  const discovery = await new FilesystemContentAdapter().discover({ project_root: projectRoot });
  const identity = await proposeProjectIdentity(projectRoot, discovery.inventory);
  const sources = await readSourceDocuments(projectRoot, discovery.source_candidates);
  const assessments = resolveAuthority(discovery.evidence_claims);
  const graph = compileContentContext({
    project_id: identity.proposed_project_id,
    sources,
    claims: discovery.evidence_claims,
    authority_assessments: assessments,
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
    graph,
  };
}
