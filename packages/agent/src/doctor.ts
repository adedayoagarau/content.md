import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { planHostBridge, type HostKind } from "./host-bridge.js";

export interface DoctorCheck {
  check_id: string;
  status: "pass" | "warning" | "fail";
  detail: string;
}

export interface DoctorReport {
  overall_status: "not_adopted" | "ready_with_governance_warnings" | "ready";
  ready_for: string[];
  not_authorized_for: string[];
  checks: DoctorCheck[];
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function jsonIfPresent(path: string): Promise<Record<string, unknown> | null> {
  try {
    const value = JSON.parse(await readFile(path, "utf8")) as unknown;
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? value as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

async function writable(path: string): Promise<boolean> {
  try {
    await access(path, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

export async function runDoctor(projectRoot: string): Promise<DoctorReport> {
  const contractPresent = await exists(join(projectRoot, "CONTENT.md"));
  const manifestPresent = await exists(join(projectRoot, ".contentmd/manifest.json"));
  const policyPath = join(projectRoot, ".contentmd/governance/starter-policy.yaml");
  const policyPresent = await exists(policyPath);
  const policy = policyPresent ? await readFile(policyPath, "utf8") : "";
  const publicationDenied = policy.includes("external_publication: deny");
  const discovery = await jsonIfPresent(join(projectRoot, ".contentmd/runtime/discovery.json"));
  const model = await jsonIfPresent(join(projectRoot, ".contentmd/runtime/model.json"));
  const coverage = record(discovery?.coverage);
  const failed = typeof coverage.failed === "number" ? coverage.failed : null;
  const inventoried = typeof coverage.inventoried === "number" ? coverage.inventoried : null;
  const scanned = typeof coverage.scanned === "number" ? coverage.scanned : null;
  const modelGraph = record(model?.graph);
  const modelNodes = Array.isArray(modelGraph.nodes) ? modelGraph.nodes.length : 0;
  const assessments = Array.isArray(model?.assessments) ? model.assessments : [];
  const conflictCount = assessments.filter((assessment) => (
    Array.isArray(record(assessment).conflicting_claim_refs) &&
    (record(assessment).conflicting_claim_refs as unknown[]).length > 0
  )).length;
  const manifest = await jsonIfPresent(join(projectRoot, ".contentmd/manifest.json"));
  const bridgeEntries = Array.isArray(manifest?.managed_host_bridges) ? manifest.managed_host_bridges : [];
  const bridgeStates = await Promise.all(bridgeEntries.map(async (entry) => {
    const bridge = record(entry);
    const path = bridge.relative_path;
    const host = bridge.host;
    if (typeof path !== "string" || typeof host !== "string") return false;
    try {
      return (await planHostBridge(projectRoot, host as HostKind, path)).status === "current";
    } catch {
      return false;
    }
  }));
  const repositoryWritable = await writable(projectRoot);

  const checks: DoctorCheck[] = [
    {
      check_id: "contract.content-md",
      status: contractPresent ? "pass" : "fail",
      detail: contractPresent ? "CONTENT.md is present." : "CONTENT.md is missing.",
    },
    {
      check_id: "contract.manifest",
      status: manifestPresent ? "pass" : "fail",
      detail: manifestPresent
        ? ".contentmd/manifest.json is present."
        : ".contentmd/manifest.json is missing.",
    },
    {
      check_id: "governance.starter-policy",
      status: policyPresent && publicationDenied ? "pass" : "fail",
      detail:
        policyPresent && publicationDenied
          ? "Starter policy is present and denies external publication."
          : "Fail-closed starter policy is missing or invalid.",
    },
    {
      check_id: "governance.owner",
      status: "warning",
      detail: "Project content owner is not established.",
    },
    {
      check_id: "repository.inventory",
      status: discovery === null ? "warning" : failed === 0 ? "pass" : "fail",
      detail: discovery === null
        ? "Repository inventory has not been persisted; run contentmd discover."
        : `Repository coverage: inventoried=${inventoried ?? "unknown"}, scanned=${scanned ?? "unknown"}, failed=${failed ?? "unknown"}.`,
    },
    {
      check_id: "repository.model",
      status: model !== null && modelNodes > 0 ? "pass" : "warning",
      detail: model !== null && modelNodes > 0
        ? `Compiled model contains ${modelNodes} proposed nodes.`
        : "Compiled repository model is unavailable; run contentmd model.",
    },
    {
      check_id: "repository.source-conflicts",
      status: model === null ? "warning" : conflictCount > 0 ? "warning" : "pass",
      detail: model === null
        ? "Source conflicts cannot be assessed until the repository model is compiled."
        : conflictCount > 0
          ? `${conflictCount} source conflict(s) remain explicit and unresolved by authority.`
          : "No source conflicts are present in the compiled model.",
    },
    {
      check_id: "host.bridges",
      status: bridgeEntries.length === 0 ? "warning" : bridgeStates.every(Boolean) ? "pass" : "fail",
      detail: bridgeEntries.length === 0
        ? "No managed host bridge is recorded."
        : bridgeStates.every(Boolean)
          ? `${bridgeEntries.length} managed host bridge(s) contain the current versioned contentmd block.`
          : "A managed host bridge is missing, outdated, malformed, or changed.",
    },
    {
      check_id: "permissions.repository-write",
      status: repositoryWritable ? "pass" : "warning",
      detail: repositoryWritable
        ? "Repository write permission is available; mutation still requires exact approval."
        : "Repository write permission is unavailable.",
    },
  ];

  if (checks.some((check) => check.status === "fail")) {
    return {
      overall_status: "not_adopted",
      ready_for: [],
      not_authorized_for: [
        "local_discovery",
        "local_drafting",
        "local_review",
        "external_publication",
      ],
      checks,
    };
  }

  return {
    overall_status: "ready_with_governance_warnings",
    ready_for: ["local_discovery", "local_drafting", "local_review"],
    not_authorized_for: [
      "external_publication",
      "remote_write",
      "release",
      "learning_promotion",
    ],
    checks,
  };
}
