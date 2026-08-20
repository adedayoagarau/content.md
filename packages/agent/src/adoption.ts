import {
  access,
  mkdir,
  readFile,
  realpath,
  unlink,
  writeFile,
} from "node:fs/promises";
import { dirname, isAbsolute, join, normalize } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  CONTENTMD_DIRECTORIES,
  defaultOpenQuestions,
  renderContentContract,
  renderOpenQuestions,
  renderStarterPolicy,
  type ExistingSource,
  type OpenQuestion,
} from "./content-contract.js";

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
  existing_sources: ExistingSource[];
  creates: ProposedFile[];
  bridge_previews: [];
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
  receipt_digest: string;
}

const detectedSourceTypes: Record<string, string> = {
  "AGENTS.md": "agent_instructions",
  "CLAUDE.md": "agent_instructions",
  "CODEX.md": "agent_instructions",
  "DESIGN.md": "design_document",
  "GEMINI.md": "agent_instructions",
  "PRODUCT.md": "product_document",
  "package.json": "package_manifest",
  ".github/copilot-instructions.md": "agent_instructions",
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
  const existingSources: ExistingSource[] = [];
  for (const relativePath of Object.keys(detectedSourceTypes).sort()) {
    if (await exists(join(root, relativePath))) {
      existingSources.push({
        relative_path: relativePath,
        source_type: detectedSourceTypes[relativePath] ?? "unknown",
        authority_effect: "none",
      });
    }
  }

  const governanceBootstrap: GovernanceBootstrap = {
    policy_status: "proposed",
    local_drafting: "allowed",
    local_mutation: "review",
    external_publication: "denied",
    owner_status: "not_established",
  };
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
              "CONTENT.md",
            ],
            local_only: [
              ".contentmd/cache/",
              ".contentmd/local/",
              ".contentmd/runtime/",
            ],
            excluded: ["credentials", "raw_private_context", "model_secrets"],
          }),
        ),
        proposedFile(
          ".contentmd/product/open-questions.json",
          renderOpenQuestions(),
        ),
        proposedFile("CONTENT.md", renderContentContract(root, existingSources)),
      ].sort((left, right) => left.relative_path.localeCompare(right.relative_path));

  const preimage: Omit<AdoptionPlan, "plan_digest"> = {
    status: alreadyAdopted ? "already_adopted" : "ready_for_local_approval",
    project_root: root,
    existing_sources: existingSources,
    creates,
    bridge_previews: [],
    unresolved_questions: unresolvedQuestions,
    governance_bootstrap: governanceBootstrap,
  };
  return { ...preimage, plan_digest: adoptionPlanDigest(preimage) };
}

function equalPathSets(left: readonly string[], right: readonly string[]): boolean {
  const normalize = (items: readonly string[]) => [...new Set(items)].sort();
  return canonicalJson(normalize(left)) === canonicalJson(normalize(right));
}

export async function executeAdoption(
  plan: AdoptionPlan,
  approval: LocalWriteApproval,
): Promise<AdoptionReceipt> {
  const expectedPlanDigest = adoptionPlanDigest({
    status: plan.status,
    project_root: plan.project_root,
    existing_sources: plan.existing_sources,
    creates: plan.creates,
    bridge_previews: plan.bridge_previews,
    unresolved_questions: plan.unresolved_questions,
    governance_bootstrap: plan.governance_bootstrap,
  });
  const plannedPaths = plan.creates.map((file) => file.relative_path);
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

  for (const relativeDirectory of CONTENTMD_DIRECTORIES) {
    await mkdir(join(plan.project_root, relativeDirectory), { recursive: true });
  }

  const createdPaths: string[] = [];
  try {
    for (const file of plan.creates) {
      const target = join(plan.project_root, file.relative_path);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, file.content, { encoding: "utf8", flag: "wx" });
      createdPaths.push(file.relative_path);
    }
  } catch (error) {
    await Promise.all(createdPaths.map((path) => unlink(join(plan.project_root, path))));
    throw error;
  }

  const receiptPreimage = {
    approval_id: approval.approval_id,
    plan_digest: plan.plan_digest,
    created_paths: createdPaths,
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
  host_files_affected: [];
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
  return {
    schema_version: "contentmd.uninstall-preview/0.1.0",
    installer_id: "contentmd@0.1.0",
    owned_files: ownedFiles,
    removed: false,
    host_files_affected: [],
  };
}
