import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  discoverLocalProject,
  executeAdoption,
  modelLocalProject,
  planAdoption,
  runDoctor,
} from "@contentmd/agent";

const mixedFixture = fileURLToPath(new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url));

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("contentmd doctor", () => {
  it("reports repository coverage, conflicts, bridges, ownership, and permission separately", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-doctor-mixed-"));
    temporaryDirectories.push(root);
    await cp(mixedFixture, root, { recursive: true });
    const plan = await planAdoption(root);
    await executeAdoption(plan, {
      approval_id: "approval.fixture.doctor.mixed",
      plan_digest: plan.plan_digest,
      approved_paths: [
        ...plan.creates.map((file) => file.relative_path),
        ...plan.bridge_previews.filter((bridge) => bridge.status === "change_proposed").map((bridge) => bridge.relative_path),
      ],
      status: "current",
    });
    await discoverLocalProject(root);
    await modelLocalProject(root);

    const report = await runDoctor(root);

    expect(report.checks).toEqual(expect.arrayContaining([
      expect.objectContaining({ check_id: "repository.inventory", status: "pass", detail: expect.stringContaining("failed=0") }),
      expect.objectContaining({ check_id: "repository.model", status: "pass" }),
      expect.objectContaining({ check_id: "repository.source-conflicts", status: "warning" }),
      expect.objectContaining({ check_id: "host.bridges", status: "pass" }),
      expect.objectContaining({ check_id: "governance.owner", status: "warning" }),
      expect.objectContaining({ check_id: "permissions.repository-write", status: "pass" }),
    ]));
  });

  it("distinguishes local drafting readiness from publication authority", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-doctor-"));
    temporaryDirectories.push(root);
    const plan = await planAdoption(root);
    await executeAdoption(plan, {
      approval_id: "approval.fixture.doctor.001",
      plan_digest: plan.plan_digest,
      approved_paths: plan.creates.map((file) => file.relative_path),
      status: "current",
    });

    const report = await runDoctor(root);

    expect(report.overall_status).toBe("ready_with_governance_warnings");
    expect(report.ready_for).toEqual(["local_discovery", "local_drafting", "local_review"]);
    expect(report.not_authorized_for).toContain("external_publication");
    expect(report.checks).toContainEqual({
      check_id: "governance.owner",
      status: "warning",
      detail: "Project content owner is not established.",
    });
  });
});
