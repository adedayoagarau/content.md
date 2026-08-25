import { sha256Canonical } from "@contentmd/core";
import type {
  DiscoverRequest,
  DiscoverResult,
  DiscoveredContentOccurrence,
  DiscoveryCoverage,
  RepositoryClaimDraft,
  RepositoryInventory,
} from "@contentmd/adapter-sdk";
import { inventoryRepository } from "./inventory.js";
import { documentArtifactParser } from "./parsers/documents.js";
import { typescriptArtifactParser } from "./parsers/typescript.js";
import type { ArtifactParser, OccurrenceDraft } from "./parsers/types.js";
import { readInventoryArtifactText, discoverSourceCandidates } from "./source-candidates.js";
import { detectStacks } from "./stack-detection.js";

const ADAPTER_ID = "adapter.filesystem";
const ADAPTER_VERSION = "0.1.0";
const PARSERS: ArtifactParser[] = [typescriptArtifactParser, documentArtifactParser];

function inventoryWithStacks(inventory: RepositoryInventory, stacks: RepositoryInventory["stacks"]): RepositoryInventory {
  const preimage = {
    contract_version: inventory.contract_version,
    project_root: inventory.project_root,
    artifacts: inventory.artifacts,
    exclusions: inventory.exclusions,
    stacks,
    coverage: inventory.coverage,
    bytes_read: inventory.bytes_read,
    resource_ceiling: inventory.resource_ceiling,
    authority_effect: inventory.authority_effect,
  };
  return { ...preimage, inventory_digest: sha256Canonical(preimage) };
}

function finalizeDraft(draft: OccurrenceDraft): DiscoveredContentOccurrence {
  const identity = {
    adapter_id: ADAPTER_ID,
    source_artifact: draft.source_artifact,
    line: draft.line,
    column: draft.column,
    syntax_kind: draft.syntax_kind,
    expression_payload: draft.expression_payload,
    locale: draft.locale,
    modality: draft.modality,
    component: draft.component,
    route: draft.route,
    semantic_context: draft.semantic_context,
  };
  const occurrenceDigest = sha256Canonical(identity);
  const candidateDigest = sha256Canonical({
    expression_payload: draft.expression_payload,
    locale: draft.locale,
    modality: draft.modality,
    semantic_context: draft.semantic_context,
  });
  return {
    occurrence_id: `occurrence.${occurrenceDigest.slice(0, 24)}`,
    candidate_id: `candidate.${candidateDigest.slice(0, 24)}`,
    ...draft,
  };
}

function compareOccurrence(left: DiscoveredContentOccurrence, right: DiscoveredContentOccurrence): number {
  return left.source_artifact.localeCompare(right.source_artifact, "en") ||
    left.line - right.line ||
    left.column - right.column ||
    left.expression_payload.localeCompare(right.expression_payload, "en");
}

function compareClaim(left: RepositoryClaimDraft, right: RepositoryClaimDraft): number {
  return left.source_ref.localeCompare(right.source_ref, "en") ||
    left.source_span.start_line - right.source_span.start_line ||
    left.claim_kind.localeCompare(right.claim_kind, "en") ||
    left.subject.localeCompare(right.subject, "en");
}

export async function discoverFilesystemContent(request: DiscoverRequest): Promise<DiscoverResult> {
  const baseInventory = await inventoryRepository(request);
  const stacks = await detectStacks(baseInventory);
  const inventory = inventoryWithStacks(baseInventory, stacks);
  const sourceCandidates = await discoverSourceCandidates(inventory);
  const occurrences: DiscoveredContentOccurrence[] = [];
  const parserClaims: RepositoryClaimDraft[] = [];
  const scannedArtifacts: Array<{ path: string; digest: string }> = [];
  const warnings: string[] = [];
  let unsupported = inventory.coverage.unsupported;
  let failed = inventory.coverage.failed;

  for (const artifact of inventory.artifacts) {
    const inputBase = {
      project_root: inventory.project_root,
      artifact,
      stack_facts: stacks,
    };
    const parsers = PARSERS.filter((parser) => parser.supports({ ...inputBase, source: "" }));
    if (parsers.length === 0) {
      unsupported += 1;
      continue;
    }

    let source: string;
    try {
      source = await readInventoryArtifactText(inventory, artifact);
    } catch {
      failed += 1;
      warnings.push(`artifact_read_failed:${artifact.relative_path}`);
      continue;
    }

    let artifactFailed = false;
    for (const parser of parsers) {
      try {
        const result = parser.parse({ ...inputBase, source });
        occurrences.push(...result.occurrences.map(finalizeDraft));
        parserClaims.push(...result.claims);
        warnings.push(...result.warnings);
        unsupported += result.unsupported.length;
      } catch {
        artifactFailed = true;
        failed += 1;
        warnings.push(`parser_failed:${parser.parser_id}:${artifact.relative_path}`);
      }
    }
    if (!artifactFailed) scannedArtifacts.push({ path: artifact.relative_path, digest: artifact.content_digest });
  }

  occurrences.sort(compareOccurrence);
  parserClaims.sort(compareClaim);
  scannedArtifacts.sort((left, right) => left.path.localeCompare(right.path, "en"));
  warnings.sort((left, right) => left.localeCompare(right, "en"));
  const coverage: DiscoveryCoverage = {
    inventoried: inventory.artifacts.length,
    scanned: scannedArtifacts.length,
    skipped: inventory.exclusions.length,
    unsupported,
    failed,
  };
  const scanPreimage = {
    inventory_digest: inventory.inventory_digest,
    scanned_artifacts: scannedArtifacts,
    occurrence_refs: occurrences.map((occurrence) => occurrence.occurrence_id),
    parser_claims: parserClaims,
    coverage,
    warnings,
  };

  return {
    adapter_id: ADAPTER_ID,
    adapter_version: ADAPTER_VERSION,
    project_root: inventory.project_root,
    scan_digest: sha256Canonical(scanPreimage),
    inventory,
    source_candidates: sourceCandidates,
    parser_claims: parserClaims,
    coverage,
    scanned_artifacts: scannedArtifacts.map((artifact) => artifact.path),
    occurrences,
    warnings,
  };
}
