import {
  access,
  link,
  mkdir,
  open,
  readFile,
  realpath,
  rename,
  unlink,
} from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import { dirname, isAbsolute, join, normalize } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { ProjectIdentityProposal, StackFact } from "@contentmd/adapter-filesystem";
import {
  CONTENTMD_DIRECTORIES,
  defaultOpenQuestions,
  renderContentContract,
  renderOpenQuestions,
  renderStarterPolicy,
  type ExistingSource,
  type OpenQuestion,
} from "./content-contract.js";
import {
  planHostBridge,
  type HostBridgePreview,
  type HostKind,
} from "./host-bridge.js";
import { compileProjectModel } from "./model-workflow.js";

export interface ProposedFile {
  relative_path: string;
  content: string;
  content_digest: string;
}

export interface GovernanceBootstrap {
  policy_status: "proposed";
  local_drafting: "allowed";
  local_mutation: "review";
  external_publication: "denied";
  owner_status: "not_established";
}

export interface AdoptionPlan {
  status: "ready_for_local_approval" | "already_adopted";
  project_root: string;
  identity: ProjectIdentityProposal;
  stacks: StackFact[];
  existing_sources: ExistingSource[];
  creates: ProposedFile[];
  bridge_previews: HostBridgePreview[];
  unresolved_questions: OpenQuestion[];
  governance_bootstrap: GovernanceBootstrap;
  plan_digest: string;
}

export interface LocalWriteApproval {
  approval_id: string;
  plan_digest: string;
  approved_paths: string[];
  status: "current" | "revoked" | "expired";
}

export interface AdoptionReceipt {
  approval_id: string;
  plan_digest: string;
  created_paths: string[];
  bridged_paths: string[];
  receipt_digest: string;
}

const hostKindByPath: Record<string, HostKind> = {
  "AGENTS.md": "agents",
  "CLAUDE.md": "claude",
  "CODEX.md": "codex",
  "GEMINI.md": "gemini",
  "agents.md": "agents",
  "claude.md": "claude",
  "codex.md": "codex",
  "gemini.md": "gemini",
  ".github/copilot-instructions.md": "copilot",
};

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function proposedFile(relativePath: string, content: string): ProposedFile {
  return {
    relative_path: relativePath,
    content,
    content_digest: sha256Canonical({ relative_path: relativePath, content }),
  };
}

function adoptionPlanDigest(plan: Omit<AdoptionPlan, "plan_digest">): string {
  return sha256Canonical(plan);
}

export async function planAdoption(projectRoot: string): Promise<AdoptionPlan> {
  const root = await realpath(projectRoot);
  const model = await compileProjectModel({ project_root: root });
  const stacks = model.discovery.inventory.stacks;
  const sourceCandidates = model.discovery.source_candidates;
  const identity = model.identity;
  const existingSources: ExistingSource[] = sourceCandidates.map((source) => ({
    relative_path: source.relative_path,
    source_type: source.source_type,
    source_id: source.source_id,
    adapter_id: source.adapter_id,
    adapter_version: source.adapter_version,
    content_digest: source.content_digest,
    lifecycle: source.lifecycle,
    evidence_class: source.evidence_class,
    scope: source.scope,
    limitations: source.limitations,
    authority_effect: "none",
  }));

  const governanceBootstrap: GovernanceBootstrap = {
    policy_status: "proposed",
    local_drafting: "allowed",
    local_mutation: "review",
    external_publication: "denied",
    owner_status: "not_established",
  };
  const bridgePreviews: HostBridgePreview[] = [];
  for (const source of existingSources) {
    const host = hostKindByPath[source.relative_path];
    if (host !== undefined) {
      bridgePreviews.push(await planHostBridge(root, host, source.relative_path));
    }
  }
  const unresolvedQuestions = defaultOpenQuestions();
  const alreadyAdopted = await exists(join(root, "CONTENT.md"));
  const creates = alreadyAdopted
    ? []
    : [
        proposedFile(
          ".contentmd/governance/starter-policy.yaml",
          renderStarterPolicy(),
        ),
        proposedFile(
          ".contentmd/manifest.json",
          canonicalJson({
            schema_version: "contentmd.manifest/0.1.0",
            installer: "contentmd@0.1.0",
            managed_directories: [...CONTENTMD_DIRECTORIES],
            managed_files: [
              ".contentmd/governance/starter-policy.yaml",
              ".contentmd/manifest.json",
              ".contentmd/product/open-questions.json",
              ".contentmd/records/repository-model.json",
              "CONTENT.md",
            ],
            local_only: [
              ".contentmd/cache/",
              ".contentmd/local/",
              ".contentmd/runtime/",
            ],
            managed_host_bridges: bridgePreviews
              .filter((bridge) => bridge.status === "change_proposed")
              .map((bridge) => ({
                relative_path: bridge.relative_path,
                start_marker: "<!-- contentmd:bridge:start -->",
                end_marker: "<!-- contentmd:bridge:end -->",
                before_digest: bridge.before_digest,
              })),
            excluded: ["credentials", "raw_private_context", "model_secrets"],
          }),
        ),
        proposedFile(
          ".contentmd/product/open-questions.json",
          renderOpenQuestions(),
        ),
        proposedFile(
          ".contentmd/records/repository-model.json",
          canonicalJson({
            contract_version: "contentmd.repository-model-record/0.1.0",
            identity: model.identity,
            source_candidates: model.discovery.source_candidates,
            evidence_claims: model.discovery.evidence_claims,
            authority_assessments: model.assessments,
            graph: model.graph,
            proposed_interpretation: model.proposed_interpretation,
            decision_status: "proposed",
            authority_effect: "none",
          }),
        ),
        proposedFile("CONTENT.md", renderContentContract(model, existingSources)),
      ].sort((left, right) => left.relative_path.localeCompare(right.relative_path));

  const preimage: Omit<AdoptionPlan, "plan_digest"> = {
    status: alreadyAdopted ? "already_adopted" : "ready_for_local_approval",
    project_root: root,
    identity,
    stacks,
    existing_sources: existingSources,
    creates,
    bridge_previews: bridgePreviews,
    unresolved_questions: unresolvedQuestions,
    governance_bootstrap: governanceBootstrap,
  };
  return { ...preimage, plan_digest: adoptionPlanDigest(preimage) };
}

function equalPathSets(left: readonly string[], right: readonly string[]): boolean {
  const normalize = (items: readonly string[]) => [...new Set(items)].sort();
  return canonicalJson(normalize(left)) === canonicalJson(normalize(right));
}

function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

async function readTextIfPresent(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function writeAtomic(target: string, content: string, replace: boolean): Promise<void> {
  await mkdir(dirname(target), { recursive: true });
  const temporary = join(dirname(target), `.${randomUUID()}.tmp`);
  const handle = await open(temporary, "wx", 0o600);
  try {
    await handle.writeFile(content, "utf8");
    await handle.sync();
    await handle.close();
    if (replace) await rename(temporary, target);
    else {
      await link(temporary, target);
      await unlink(temporary);
    }
  } catch (error) {
    await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

export async function executeAdoption(
  plan: AdoptionPlan,
  approval: LocalWriteApproval,
): Promise<AdoptionReceipt> {
  const expectedPlanDigest = adoptionPlanDigest({
    status: plan.status,
    project_root: plan.project_root,
    identity: plan.identity,
    stacks: plan.stacks,
    existing_sources: plan.existing_sources,
    creates: plan.creates,
    bridge_previews: plan.bridge_previews,
    unresolved_questions: plan.unresolved_questions,
    governance_bootstrap: plan.governance_bootstrap,
  });
  const changedBridges = plan.bridge_previews.filter((bridge) => bridge.status === "change_proposed");
  const plannedPaths = [
    ...plan.creates.map((file) => file.relative_path),
    ...changedBridges.map((bridge) => bridge.relative_path),
  ];
  if (
    approval.status !== "current" ||
    approval.plan_digest !== plan.plan_digest ||
    expectedPlanDigest !== plan.plan_digest ||
    !equalPathSets(approval.approved_paths, plannedPaths)
  ) {
    throw new Error("adoption_approval_mismatch");
  }

  for (const file of plan.creates) {
    if (await exists(join(plan.project_root, file.relative_path))) {
      throw new Error(`adoption_target_exists:${file.relative_path}`);
    }
  }
  const bridgeOriginals = new Map<string, string | null>();
  for (const bridge of changedBridges) {
    const target = join(plan.project_root, bridge.relative_path);
    const current = await readTextIfPresent(target);
    const digest = current === null ? null : sha256Text(current);
    if (digest !== bridge.before_digest || sha256Text(bridge.after_content) !== bridge.after_digest) {
      throw new Error(`adoption_source_changed:${bridge.relative_path}`);
    }
    bridgeOriginals.set(bridge.relative_path, current);
  }

  for (const relativeDirectory of CONTENTMD_DIRECTORIES) {
    await mkdir(join(plan.project_root, relativeDirectory), { recursive: true });
  }

  const createdPaths: string[] = [];
  const bridgedPaths: string[] = [];
  try {
    for (const file of plan.creates) {
      const target = join(plan.project_root, file.relative_path);
      if (await exists(target)) throw new Error(`adoption_target_exists:${file.relative_path}`);
      await writeAtomic(target, file.content, false);
      createdPaths.push(file.relative_path);
    }
    for (const bridge of changedBridges) {
      const target = join(plan.project_root, bridge.relative_path);
      const current = await readTextIfPresent(target);
      const digest = current === null ? null : sha256Text(current);
      if (digest !== bridge.before_digest) throw new Error(`adoption_source_changed:${bridge.relative_path}`);
      await writeAtomic(target, bridge.after_content, true);
      bridgedPaths.push(bridge.relative_path);
    }
  } catch (error) {
    await Promise.all(createdPaths.map((path) => unlink(join(plan.project_root, path)).catch(() => undefined)));
    await Promise.all(bridgedPaths.map(async (path) => {
      const original = bridgeOriginals.get(path) ?? null;
      const target = join(plan.project_root, path);
      if (original === null) await unlink(target).catch(() => undefined);
      else await writeAtomic(target, original, true);
    }));
    throw error;
  }

  const receiptPreimage = {
    approval_id: approval.approval_id,
    plan_digest: plan.plan_digest,
    created_paths: createdPaths,
    bridged_paths: bridgedPaths,
  };
  return {
    ...receiptPreimage,
    receipt_digest: sha256Canonical(receiptPreimage),
  };
}

export async function readInstalledManifest(projectRoot: string): Promise<unknown> {
  return JSON.parse(
    await readFile(join(projectRoot, ".contentmd/manifest.json"), "utf8"),
  ) as unknown;
}

export interface UninstallPreview {
  schema_version: "contentmd.uninstall-preview/0.1.0";
  installer_id: "contentmd@0.1.0";
  owned_files: string[];
  removed: false;
  host_files_affected: Array<{
    relative_path: string;
    operation: "remove_exact_marker_block";
    start_marker: "<!-- contentmd:bridge:start -->";
    end_marker: "<!-- contentmd:bridge:end -->";
  }>;
}

function assertOwnedRelativePath(path: string): void {
  const normalized = normalize(path);
  if (isAbsolute(path) || normalized === ".." || normalized.startsWith("../")) {
    throw new Error(`invalid_installer_owned_path:${path}`);
  }
}

export async function previewUninstall(projectRoot: string): Promise<UninstallPreview> {
  const root = await realpath(projectRoot);
  const manifest = JSON.parse(await readFile(join(root, ".contentmd/manifest.json"), "utf8")) as {
    installer?: unknown;
    managed_files?: unknown;
    managed_host_bridges?: unknown;
  };
  if (manifest.installer !== "contentmd@0.1.0" || !Array.isArray(manifest.managed_files)) {
    throw new Error("invalid_installed_manifest");
  }
  const ownedFiles = manifest.managed_files.map((value) => {
    if (typeof value !== "string") throw new Error("invalid_installer_owned_path");
    assertOwnedRelativePath(value);
    return value;
  });
  if (new Set(ownedFiles).size !== ownedFiles.length) throw new Error("duplicate_installer_owned_path");
  const hostFilesAffected = Array.isArray(manifest.managed_host_bridges)
    ? manifest.managed_host_bridges.map((value) => {
        if (value === null || typeof value !== "object" || Array.isArray(value)) {
          throw new Error("invalid_installed_manifest");
        }
        const bridge = value as Record<string, unknown>;
        if (
          typeof bridge.relative_path !== "string" ||
          bridge.start_marker !== "<!-- contentmd:bridge:start -->" ||
          bridge.end_marker !== "<!-- contentmd:bridge:end -->"
        ) throw new Error("invalid_installed_manifest");
        assertOwnedRelativePath(bridge.relative_path);
        return {
          relative_path: bridge.relative_path,
          operation: "remove_exact_marker_block" as const,
          start_marker: "<!-- contentmd:bridge:start -->" as const,
          end_marker: "<!-- contentmd:bridge:end -->" as const,
        };
      })
    : [];
  return {
    schema_version: "contentmd.uninstall-preview/0.1.0",
    installer_id: "contentmd@0.1.0",
    owned_files: ownedFiles,
    removed: false,
    host_files_affected: hostFilesAffected,
  };
}
