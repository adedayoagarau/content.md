import { sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type RuntimeCandidateProposal,
  type RuntimeDescriptor,
  type RuntimeDetectionEvidence,
  type RuntimeDetectionReport,
  type RuntimeDetector,
  type RuntimeProposalRecord,
} from "@contentmd/runtime-sdk";
import {
  lstat as nodeLstat,
  readFile as nodeReadFile,
  realpath as nodeRealpath,
} from "node:fs/promises";
import { dirname, isAbsolute, join, relative } from "node:path";

const LOCAL_NODE_REQUIREMENT = "node>=24.14.0 <25" as const;
const CONFIG_FILENAMES = Object.freeze([
  "Dockerfile",
  "compose.yaml",
  "compose.yml",
  "fly.toml",
  "railway.json",
  "vercel.json",
  "wrangler.json",
  "wrangler.jsonc",
  "wrangler.toml",
] as const);
const LOCK_FILENAMES = Object.freeze([
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
] as const);
const CLOUDFLARE_PACKAGES = new Set([
  "@cloudflare/agents",
  "@cloudflare/workers-types",
  "wrangler",
]);

export interface DetectionFileMetadata {
  isFile(): boolean;
}

export interface DetectionFileSystem {
  realpath(path: string): Promise<string>;
  lstat(path: string): Promise<DetectionFileMetadata>;
  readFile(path: string): Promise<string>;
}

export interface LocalRuntimeDetectorOptions {
  readonly filesystem?: DetectionFileSystem;
  readonly clock?: () => string;
  readonly node_version?: string;
}

interface SelectedPackageManifest {
  readonly name: string | null;
  readonly node_engine: string | null;
  readonly package_manager: string | null;
  readonly dependencies: readonly string[];
  readonly dev_dependencies: readonly string[];
  readonly script_names: readonly string[];
}

function sortText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function optionalString(value: unknown, field: string): string | null {
  if (value === undefined) return null;
  if (typeof value !== "string" || value.length === 0) {
    throw new RuntimeError("runtime_detection_inconclusive", `package_manifest_${field}_invalid`);
  }
  return value;
}

function selectedKeys(value: unknown, field: string): readonly string[] {
  if (value === undefined) return [];
  if (!isRecord(value)) {
    throw new RuntimeError("runtime_detection_inconclusive", `package_manifest_${field}_invalid`);
  }
  return Object.keys(value).sort(sortText);
}

function selectManifest(bytes: string): SelectedPackageManifest {
  let parsed: unknown;
  try {
    parsed = JSON.parse(bytes);
  } catch {
    throw new RuntimeError("runtime_detection_inconclusive", "package_manifest_invalid");
  }
  if (!isRecord(parsed)) {
    throw new RuntimeError("runtime_detection_inconclusive", "package_manifest_invalid");
  }
  const engines = parsed.engines;
  if (engines !== undefined && !isRecord(engines)) {
    throw new RuntimeError("runtime_detection_inconclusive", "package_manifest_engines_invalid");
  }
  return {
    name: optionalString(parsed.name, "name"),
    node_engine: optionalString(isRecord(engines) ? engines.node : undefined, "node_engine"),
    package_manager: optionalString(parsed.packageManager, "package_manager"),
    dependencies: selectedKeys(parsed.dependencies, "dependencies"),
    dev_dependencies: selectedKeys(parsed.devDependencies, "dev_dependencies"),
    script_names: selectedKeys(parsed.scripts, "scripts"),
  };
}

function withinRoot(root: string, candidate: string): boolean {
  const locator = relative(root, candidate);
  return locator === "" || (!locator.startsWith("..") && !isAbsolute(locator));
}

function isMissing(error: unknown): boolean {
  return isRecord(error) && error.code === "ENOENT";
}

async function presentFile(
  filesystem: DetectionFileSystem,
  root: string,
  filename: string,
): Promise<boolean> {
  const target = join(root, filename);
  if (!withinRoot(root, target)) {
    throw new RuntimeError("runtime_detection_inconclusive", "project_boundary_invalid");
  }
  try {
    return (await filesystem.lstat(target)).isFile();
  } catch (error) {
    if (isMissing(error)) return false;
    throw new RuntimeError("runtime_detection_inconclusive", "metadata_read_failed");
  }
}

function evidence(input: Omit<RuntimeDetectionEvidence, "evidence_id" | "authority_effect">): RuntimeDetectionEvidence {
  return {
    evidence_id: `runtime.evidence.${sha256Canonical({
      kind: input.kind,
      relative_locator: input.relative_locator,
      content_digest: input.content_digest,
      observation: input.observation,
      confidence: input.confidence,
      conflict_state: input.conflict_state,
    })}`,
    ...input,
    authority_effect: "none",
  };
}

function currentNodeSupported(version: string): boolean {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (match === null) return false;
  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);
  return major === 24 && (minor > 14 || (minor === 14 && patch >= 0));
}

function declaredNodeSupportsEmbedded(range: string | null): boolean {
  if (range === null) return false;
  const normalized = range.replace(/\s+/g, " ").trim();
  return /(?:^|\s)>=24\.14\.0(?:\s|$)/.test(normalized)
    && /(?:^|\s)<25(?:\.0\.0)?(?:\s|$)/.test(normalized);
}

function declaredNodeExcludesLocalProfile(range: string | null): boolean {
  if (range === null) return false;
  const normalized = range.replace(/\s+/g, " ").trim();
  if (/(?:^|\s)>=25(?:\.0\.0)?(?:\s|$)/.test(normalized)) return true;
  const upper = /(?:^|\s)(<|<=)(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\s|$)/.exec(normalized);
  if (upper !== null) {
    const operator = upper[1];
    const major = Number(upper[2]);
    const minor = Number(upper[3] ?? 0);
    const patch = Number(upper[4] ?? 0);
    if (major < 24
      || (major === 24 && minor < 14)
      || (major === 24 && minor === 14 && patch === 0 && operator === "<")) {
      return true;
    }
  }
  return /^(?:1[0-9]|2[0-3])(?:\.\d+){0,2}$/.test(normalized);
}

function reportPreimage(report: Omit<RuntimeDetectionReport, "report_digest">): Omit<RuntimeDetectionReport, "report_digest"> {
  return report;
}

function assertReport(report: RuntimeDetectionReport): void {
  if (report.schema_version !== "0.1.0"
    || report.authority_effect !== "none"
    || report.report_digest !== sha256Canonical(reportPreimage({
      schema_version: report.schema_version,
      report_id: report.report_id,
      project_root_digest: report.project_root_digest,
      evidence: report.evidence,
      conflicts: report.conflicts,
      unknowns: report.unknowns,
      inspected_at: report.inspected_at,
      authority_effect: report.authority_effect,
    }))) {
    throw new RuntimeError("runtime_detection_inconclusive", "report_digest_invalid");
  }
}

function sorted(values: readonly string[]): readonly string[] {
  return [...new Set(values)].sort(sortText);
}

function proposalCandidate(input: RuntimeCandidateProposal): RuntimeCandidateProposal {
  return {
    ...input,
    requirements: sorted(input.requirements),
    trade_offs: sorted(input.trade_offs),
    conflicts: sorted(input.conflicts),
    unknowns: sorted(input.unknowns),
  };
}

const defaultFileSystem: DetectionFileSystem = {
  realpath: nodeRealpath,
  lstat: nodeLstat,
  readFile: (path) => nodeReadFile(path, "utf8"),
};

export class LocalRuntimeDetector implements RuntimeDetector {
  readonly #filesystem: DetectionFileSystem;
  readonly #clock: () => string;
  readonly #nodeVersion: string;

  constructor(options: LocalRuntimeDetectorOptions = {}) {
    this.#filesystem = options.filesystem ?? defaultFileSystem;
    this.#clock = options.clock ?? (() => new Date().toISOString());
    this.#nodeVersion = options.node_version ?? process.versions.node;
  }

  async inspect(projectRoot: string): Promise<RuntimeDetectionReport> {
    if (projectRoot.length === 0) {
      throw new RuntimeError("runtime_detection_inconclusive", "project_root_invalid");
    }
    let root: string;
    try {
      root = await this.#filesystem.realpath(projectRoot);
    } catch {
      throw new RuntimeError("runtime_detection_inconclusive", "project_root_unavailable");
    }
    const manifestPath = join(root, "package.json");
    if (dirname(manifestPath) !== root || !(await presentFile(this.#filesystem, root, "package.json"))) {
      throw new RuntimeError("runtime_detection_inconclusive", "package_manifest_missing");
    }
    const manifest = selectManifest(await this.#filesystem.readFile(manifestPath));
    const manifestDigest = sha256Canonical(manifest);
    const items: RuntimeDetectionEvidence[] = [evidence({
      kind: "package_manifest",
      relative_locator: "package.json",
      content_digest: manifestDigest,
      observation: manifest.name === null ? "package:unnamed" : `package:${manifest.name}`,
      confidence: "high",
      conflict_state: "none",
    })];

    if (manifest.node_engine !== null) {
      items.push(evidence({
        kind: "host_version_declaration",
        relative_locator: "package.json#engines.node",
        content_digest: sha256Canonical({ node: manifest.node_engine }),
        observation: `node_engine:${manifest.node_engine}`,
        confidence: "high",
        conflict_state: declaredNodeSupportsEmbedded(manifest.node_engine) ? "none" : "conflicting",
      }));
    }
    if (manifest.package_manager !== null) {
      items.push(evidence({
        kind: "package_manager_declaration",
        relative_locator: "package.json#packageManager",
        content_digest: sha256Canonical({ package_manager: manifest.package_manager }),
        observation: `package_manager:${manifest.package_manager}`,
        confidence: "high",
        conflict_state: "none",
      }));
    }
    for (const packageName of sorted([...manifest.dependencies, ...manifest.dev_dependencies])) {
      items.push(evidence({
        kind: "package_declaration",
        relative_locator: "package.json",
        content_digest: sha256Canonical({ package_name: packageName }),
        observation: `package:${packageName}`,
        confidence: "medium",
        conflict_state: "none",
      }));
    }
    for (const scriptName of manifest.script_names) {
      items.push(evidence({
        kind: "script_name_declaration",
        relative_locator: "package.json#scripts",
        content_digest: sha256Canonical({ script_name: scriptName }),
        observation: `script:${scriptName}`,
        confidence: "low",
        conflict_state: "unknown",
      }));
    }
    for (const filename of LOCK_FILENAMES) {
      if (await presentFile(this.#filesystem, root, filename)) {
        items.push(evidence({
          kind: "lockfile_presence",
          relative_locator: filename,
          content_digest: null,
          observation: `present:${filename}`,
          confidence: "high",
          conflict_state: "none",
        }));
      }
    }
    for (const filename of CONFIG_FILENAMES) {
      if (await presentFile(this.#filesystem, root, filename)) {
        items.push(evidence({
          kind: "runtime_config_presence",
          relative_locator: filename,
          content_digest: null,
          observation: `present:${filename}`,
          confidence: "medium",
          conflict_state: "unknown",
        }));
      }
    }

    const hasCloudflare = items.some((item) => item.relative_locator.startsWith("wrangler.")
      || (item.kind === "package_declaration"
        && CLOUDFLARE_PACKAGES.has(item.observation.slice("package:".length))));
    const declaredCompatible = declaredNodeSupportsEmbedded(manifest.node_engine);
    const conflicts = declaredNodeExcludesLocalProfile(manifest.node_engine)
      ? ["runtime_detection_inconclusive"]
      : [];
    const unknowns = ["live_deployment_status"];
    if (!declaredCompatible) unknowns.push("declared_node_runtime_compatibility");
    if (hasCloudflare) unknowns.push("cloudflare_live_deployment_status");
    const sortedEvidence = [...items].sort((left, right) => sortText(left.evidence_id, right.evidence_id));
    const projectRootDigest = sha256Canonical({
      contract_version: "contentmd.runtime-project-evidence/0.1.0",
      evidence: sortedEvidence.map((item) => ({
        evidence_id: item.evidence_id,
        relative_locator: item.relative_locator,
        content_digest: item.content_digest,
      })),
    });
    const inspectedAt = this.#clock();
    const reportId = `runtime.detection.${sha256Canonical({
      contract_version: "contentmd.runtime-detection-report-identity/0.1.0",
      project_root_digest: projectRootDigest,
      evidence_ids: sortedEvidence.map((item) => item.evidence_id),
      inspected_at: inspectedAt,
    })}`;
    const preimage: Omit<RuntimeDetectionReport, "report_digest"> = {
      schema_version: "0.1.0",
      report_id: reportId,
      project_root_digest: projectRootDigest,
      evidence: sortedEvidence,
      conflicts: sorted(conflicts),
      unknowns: sorted(unknowns),
      inspected_at: inspectedAt,
      authority_effect: "none",
    };
    return { ...preimage, report_digest: sha256Canonical(preimage) };
  }

  async propose(
    report: RuntimeDetectionReport,
    descriptors: readonly RuntimeDescriptor[],
  ): Promise<RuntimeProposalRecord> {
    assertReport(report);
    if (!currentNodeSupported(this.#nodeVersion)) {
      throw new RuntimeError("runtime_capability_unsupported", "node_runtime_unsupported");
    }
    const observations = new Set(report.evidence.map((item) => item.observation));
    const embeddedDeclared = report.evidence.some((item) => item.kind === "host_version_declaration"
      && item.conflict_state === "none");
    const desiredMode = embeddedDeclared ? "embedded" : "sidecar";
    const localDescriptors = descriptors
      .filter((descriptor) => descriptor.runtime_id === "runtime.local")
      .sort((left, right) => sortText(left.descriptor_id, right.descriptor_id));
    const local = localDescriptors.find((descriptor) => descriptor.integration_mode === desiredMode)
      ?? localDescriptors.find((descriptor) => descriptor.integration_mode === "sidecar")
      ?? localDescriptors[0];
    if (local === undefined) {
      throw new RuntimeError("runtime_capability_unsupported", "local_descriptor_missing");
    }
    const candidates: RuntimeCandidateProposal[] = [proposalCandidate({
      runtime_id: "runtime.local",
      descriptor_ref: local.descriptor_id,
      descriptor_digest: local.descriptor_digest,
      availability: "available",
      bindable: true,
      failure_code: null,
      requirements: [LOCAL_NODE_REQUIREMENT],
      trade_offs: local.integration_mode === "embedded"
        ? ["runs_in_adopter_node_process", "adopter_controlled_storage"]
        : ["requires_local_sidecar_process", "adopter_controlled_storage"],
      conflicts: report.conflicts,
      unknowns: report.unknowns,
    })];
    const cloudflareObserved = [...observations].some((observation) => observation === "present:wrangler.json"
      || observation === "present:wrangler.jsonc"
      || observation === "present:wrangler.toml"
      || (observation.startsWith("package:")
        && CLOUDFLARE_PACKAGES.has(observation.slice("package:".length))));
    if (cloudflareObserved) {
      candidates.push(proposalCandidate({
        runtime_id: "runtime.cloudflare-agents",
        descriptor_ref: "runtime.descriptor.cloudflare-agents.unavailable",
        descriptor_digest: sha256Canonical({
          contract_version: "contentmd.runtime-unavailable-descriptor/0.1.0",
          runtime_id: "runtime.cloudflare-agents",
          availability: "adapter_unavailable_pending_plan_4",
        }),
        availability: "adapter_unavailable_pending_plan_4",
        bindable: false,
        failure_code: "runtime_capability_unsupported",
        requirements: ["approved_plan_4_adapter", "runtime_conformance_receipt"],
        trade_offs: ["repository_evidence_does_not_prove_live_deployment"],
        conflicts: report.conflicts,
        unknowns: report.unknowns,
      }));
    }
    candidates.sort((left, right) => sortText(left.runtime_id, right.runtime_id));
    const proposalId = `runtime.proposal.${sha256Canonical({
      contract_version: "contentmd.runtime-proposal-identity/0.1.0",
      detection_report_digest: report.report_digest,
      candidate_digests: candidates.map((candidate) => sha256Canonical(candidate)),
      recommended_runtime_id: "runtime.local",
    })}`;
    const preimage: Omit<RuntimeProposalRecord, "proposal_digest"> = {
      schema_version: "0.1.0",
      proposal_id: proposalId,
      detection_report_ref: {
        record_id: report.report_id,
        record_version: 1,
        content_digest: report.report_digest,
      },
      detection_report_digest: report.report_digest,
      candidates,
      recommended_runtime_id: "runtime.local",
      authority_effect: "none",
    };
    return { ...preimage, proposal_digest: sha256Canonical(preimage) };
  }
}
