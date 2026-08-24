import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

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

export async function runDoctor(projectRoot: string): Promise<DoctorReport> {
  const contractPresent = await exists(join(projectRoot, "CONTENT.md"));
  const manifestPresent = await exists(join(projectRoot, ".contentmd/manifest.json"));
  const policyPath = join(projectRoot, ".contentmd/governance/starter-policy.yaml");
  const policyPresent = await exists(policyPath);
  const policy = policyPresent ? await readFile(policyPath, "utf8") : "";
  const publicationDenied = policy.includes("external_publication: deny");

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
