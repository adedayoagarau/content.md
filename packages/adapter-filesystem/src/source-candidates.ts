import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { basename, isAbsolute, relative, resolve, sep } from "node:path";
import { sha256Canonical, type ContextSourceDocument } from "@contentmd/core";
import type {
  InventoryArtifact,
  ProjectIdentityProposal,
  RepositoryInventory,
  SourceCandidate,
  SourceLifecycle,
} from "@contentmd/adapter-sdk";
import { inventoryRepository } from "./inventory.js";

const MAX_FILE_BYTES = 2 * 1024 * 1024;

function sha256Bytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function withinRoot(projectRoot: string, candidate: string): boolean {
  const fromRoot = relative(projectRoot, candidate);
  return fromRoot === "" || (!fromRoot.startsWith(`..${sep}`) && fromRoot !== ".." && !isAbsolute(fromRoot));
}

export async function readInventoryArtifactText(
  inventory: RepositoryInventory,
  artifact: InventoryArtifact,
): Promise<string> {
  const current = inventory.artifacts.find((candidate) => candidate.relative_path === artifact.relative_path);
  if (current === undefined || current.content_digest !== artifact.content_digest) {
    throw new Error(`source_candidate_changed:${artifact.relative_path}`);
  }
  const absolutePath = resolve(inventory.project_root, artifact.relative_path);
  const resolvedPath = await realpath(absolutePath);
  if (!withinRoot(inventory.project_root, resolvedPath)) {
    throw new Error(`source_candidate_changed:${artifact.relative_path}`);
  }
  const bytes = await readFile(resolvedPath);
  if (bytes.byteLength > MAX_FILE_BYTES || sha256Bytes(bytes) !== artifact.content_digest) {
    throw new Error(`source_candidate_changed:${artifact.relative_path}`);
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(`source_candidate_changed:${artifact.relative_path}`);
  }
}

function metadataValue(source: string, label: string): string | null {
  const match = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+?)\\s*$`, "imu").exec(source);
  return match?.[1]?.trim() ?? null;
}

function lifecycle(source: string): SourceLifecycle {
  const status = metadataValue(source, "Status")?.toLowerCase();
  if (
    status === "canonical" || status === "active" || status === "draft" ||
    status === "historical" || status === "superseded" || status === "rejected"
  ) return status;
  return "unknown";
}

function sourceType(relativePath: string): string | null {
  const name = basename(relativePath).toLowerCase();
  if (["agents.md", "claude.md", "codex.md", "gemini.md", "copilot-instructions.md"].includes(name)) {
    return "agent_instructions";
  }
  if (/^\d{4}-.+\.md$/u.test(name) && relativePath.includes("/adr/")) return "architecture_decision";
  if (name === "prd.md" || name.includes("requirements")) return "product_requirements";
  if (name.includes("product-identity") || name === "product.md") return "product_identity";
  if (name === "design.md" || name.includes("design")) return "design_document";
  if ([".md", ".mdx", ".yaml", ".yml"].some((extension) => name.endsWith(extension))) {
    return relativePath.startsWith("docs/") ? "project_documentation" : null;
  }
  return null;
}

export async function discoverSourceCandidates(inventory: RepositoryInventory): Promise<SourceCandidate[]> {
  const candidates: SourceCandidate[] = [];
  for (const artifact of inventory.artifacts) {
    const type = sourceType(artifact.relative_path);
    if (type === null) continue;
    const source = await readInventoryArtifactText(inventory, artifact);
    const sourceIdentity = {
      relative_path: artifact.relative_path,
      source_type: type,
      content_digest: artifact.content_digest,
    };
    candidates.push({
      source_id: `source.${sha256Canonical(sourceIdentity).slice(0, 24)}`,
      relative_path: artifact.relative_path,
      source_type: type,
      adapter_id: "adapter.filesystem",
      adapter_version: "0.1.0",
      content_digest: artifact.content_digest,
      lifecycle: lifecycle(source),
      evidence_class: "documented",
      declared_date: metadataValue(source, "Date"),
      declared_owner: metadataValue(source, "Owner"),
      scope: {
        products: [],
        services: [],
        markets: [],
        locales: [],
        surfaces: [],
        versions: [],
      },
      discovery_reason: `classified_path:${type}`,
      limitations: ["source_presence_does_not_establish_authority"],
      authority_effect: "none",
    });
  }
  return candidates.sort((left, right) => left.relative_path.localeCompare(right.relative_path, "en"));
}

export async function readSourceDocuments(
  root: string,
  candidates: SourceCandidate[],
): Promise<ContextSourceDocument[]> {
  const projectRoot = await realpath(resolve(root));
  const inventory = await inventoryRepository({ project_root: projectRoot });
  const discovered = await discoverSourceCandidates(inventory);
  const discoveredByPath = new Map(discovered.map((candidate) => [candidate.relative_path, candidate]));
  const documents: ContextSourceDocument[] = [];
  for (const candidate of candidates) {
    const currentCandidate = discoveredByPath.get(candidate.relative_path);
    if (currentCandidate === undefined) {
      throw new Error(`source_candidate_not_discovered:${candidate.relative_path}`);
    }
    if (
      currentCandidate.source_id !== candidate.source_id ||
      currentCandidate.source_type !== candidate.source_type ||
      currentCandidate.content_digest !== candidate.content_digest
    ) {
      throw new Error(`source_candidate_changed:${candidate.relative_path}`);
    }
    const artifact = inventory.artifacts.find((item) => item.relative_path === candidate.relative_path);
    if (artifact === undefined) throw new Error(`source_candidate_changed:${candidate.relative_path}`);
    documents.push({
      source_id: currentCandidate.source_id,
      source_type: currentCandidate.source_type,
      locator: currentCandidate.relative_path,
      content_digest: currentCandidate.content_digest,
      content: await readInventoryArtifactText(inventory, artifact),
    });
  }
  return documents;
}

function manifestName(source: string, relativePath: string): string | null {
  if (relativePath.endsWith("package.json")) {
    try {
      const parsed = JSON.parse(source) as { name?: unknown };
      return typeof parsed.name === "string" && parsed.name.trim().length > 0 ? parsed.name.trim() : null;
    } catch {
      return null;
    }
  }
  const section = /^\[project\]\s*$(?<body>[\s\S]*?)(?=^\[[^\]]+\]\s*$|(?![\s\S]))/mu.exec(source)?.groups?.body ?? "";
  return /^name\s*=\s*["']([^"']+)["']\s*$/mu.exec(section)?.[1]?.trim() ?? null;
}

function projectSlug(name: string): string {
  const unscoped = name.includes("/") ? name.slice(name.lastIndexOf("/") + 1) : name;
  const slug = unscoped.toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "");
  return slug.length > 0 ? slug : "unnamed-project";
}

export async function proposeProjectIdentity(
  root: string,
  inventory: RepositoryInventory,
): Promise<ProjectIdentityProposal> {
  const existingProject = inventory.artifacts.find((artifact) => artifact.relative_path === ".contentmd/project.json");
  if (existingProject !== undefined) {
    const source = await readInventoryArtifactText(inventory, existingProject);
    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = JSON.parse(source) as Record<string, unknown>;
    } catch {
      // An invalid local record cannot override manifest or basename evidence.
    }
    if (
      parsed !== null &&
      parsed.contract_version === "contentmd.project/0.1.0" &&
      typeof parsed.project_id === "string" && /^project\.[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(parsed.project_id) &&
      typeof parsed.name === "string" && parsed.name.trim().length > 0 &&
      parsed.authority_effect === "none"
    ) {
      const preimage = {
        contract_version: "contentmd.project-identity-proposal/0.2.0" as const,
        proposed_project_id: parsed.project_id,
        proposed_name: parsed.name.trim(),
        evidence_refs: [`artifact.${sha256Canonical({
          path: existingProject.relative_path,
          digest: existingProject.content_digest,
        }).slice(0, 24)}`],
        confidence: "high" as const,
        authority_effect: "none" as const,
      };
      return { ...preimage, proposal_digest: sha256Canonical(preimage) };
    }
  }
  const rootManifest = inventory.artifacts.find((artifact) =>
    artifact.relative_path === "pyproject.toml" || artifact.relative_path === "package.json"
  );
  const allManifests = inventory.artifacts.filter((artifact) =>
    artifact.relative_path === "pyproject.toml" || artifact.relative_path === "package.json" ||
    artifact.relative_path.endsWith("/pyproject.toml") || artifact.relative_path.endsWith("/package.json")
  );
  let identityArtifacts: InventoryArtifact[] = [];
  let selectedName: string | null = null;
  if (rootManifest !== undefined) {
    identityArtifacts = [rootManifest];
    selectedName = manifestName(
      await readInventoryArtifactText(inventory, rootManifest),
      rootManifest.relative_path,
    );
  } else if (allManifests.length > 0) {
    const namedManifests = await Promise.all(allManifests.map(async (artifact) => ({
      artifact,
      name: manifestName(await readInventoryArtifactText(inventory, artifact), artifact.relative_path),
    })));
    const names = [...new Set(namedManifests.map((entry) => entry.name).filter((name): name is string => name !== null))];
    if (names.length === 1 && namedManifests.every((entry) => entry.name === names[0])) {
      identityArtifacts = allManifests;
      selectedName = names[0] ?? null;
    }
  }
  const proposedName = selectedName ?? basename(await realpath(resolve(root)));
  const evidenceRefs = identityArtifacts.map((artifact) =>
    `artifact.${sha256Canonical({ path: artifact.relative_path, digest: artifact.content_digest }).slice(0, 24)}`
  ).sort((left, right) => left.localeCompare(right, "en"));
  const preimage = {
    contract_version: "contentmd.project-identity-proposal/0.2.0" as const,
    proposed_project_id: `project.${projectSlug(proposedName)}`,
    proposed_name: proposedName,
    evidence_refs: evidenceRefs,
    confidence: selectedName === null ? "low" as const : "high" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, proposal_digest: sha256Canonical(preimage) };
}
