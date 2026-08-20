import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  executeAdoption,
  planAdoption,
} from "@contentmd/agent";

const temporaryDirectories: string[] = [];

async function projectDirectory(name: string): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), `${name}-`));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("repository adoption", () => {
  it("bootstraps a proposed content contract without publication authority", async () => {
    const root = await projectDirectory("contentmd-empty-project");
    const plan = await planAdoption(root);

    expect(plan.status).toBe("ready_for_local_approval");
    expect(plan.creates.map((file) => file.relative_path)).toEqual([
      ".contentmd/governance/starter-policy.yaml",
      ".contentmd/manifest.json",
      ".contentmd/product/open-questions.json",
      "CONTENT.md",
    ]);
    expect(plan.governance_bootstrap.external_publication).toBe("denied");
    expect(plan.unresolved_questions.map((question) => question.question_id)).toContain(
      "question.product-owner",
    );

    const receipt = await executeAdoption(plan, {
      approval_id: "approval.fixture.adoption.001",
      plan_digest: plan.plan_digest,
      approved_paths: plan.creates.map((file) => file.relative_path),
      status: "current",
    });

    expect(receipt.created_paths).toEqual(plan.creates.map((file) => file.relative_path));
    expect(await readFile(join(root, "CONTENT.md"), "utf8")).toContain(
      "External publication is prohibited until a current project authority record exists.",
    );
    expect(
      await readFile(join(root, ".contentmd/governance/starter-policy.yaml"), "utf8"),
    ).toContain("external_publication: deny");

    const secondPlan = await planAdoption(root);
    expect(secondPlan.status).toBe("already_adopted");
    expect(secondPlan.creates).toEqual([]);
  });

  it("treats existing product and host files as evidence without overwriting them", async () => {
    const root = await projectDirectory("contentmd-existing-project");
    const existingFiles = {
      "PRODUCT.md": "# Existing product\nAuthoritative facts require owner review.\n",
      "DESIGN.md": "# Existing design\nDo not replace this file.\n",
      "AGENTS.md": "# Existing agent instructions\nKeep this exact text.\n",
    };
    await Promise.all(
      Object.entries(existingFiles).map(([path, content]) =>
        writeFile(join(root, path), content, "utf8"),
      ),
    );

    const plan = await planAdoption(root);

    expect(plan.existing_sources.map((source) => source.relative_path)).toEqual([
      "AGENTS.md",
      "DESIGN.md",
      "PRODUCT.md",
    ]);
    expect(plan.existing_sources.every((source) => source.authority_effect === "none")).toBe(true);

    await executeAdoption(plan, {
      approval_id: "approval.fixture.adoption.002",
      plan_digest: plan.plan_digest,
      approved_paths: plan.creates.map((file) => file.relative_path),
      status: "current",
    });

    for (const [path, content] of Object.entries(existingFiles)) {
      expect(await readFile(join(root, path), "utf8")).toBe(content);
    }
  });

  it("rejects stale or widened local write approvals", async () => {
    const root = await projectDirectory("contentmd-stale-approval");
    const plan = await planAdoption(root);

    await expect(
      executeAdoption(plan, {
        approval_id: "approval.fixture.adoption.003",
        plan_digest: "0".repeat(64),
        approved_paths: [...plan.creates.map((file) => file.relative_path), "PRODUCT.md"],
        status: "current",
      }),
    ).rejects.toThrow("adoption_approval_mismatch");
    await expect(readFile(join(root, "CONTENT.md"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });
});
