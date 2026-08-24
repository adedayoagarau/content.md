import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  executeAdoption,
  planAdoption,
  runDoctor,
} from "@contentmd/agent";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("contentmd doctor", () => {
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
