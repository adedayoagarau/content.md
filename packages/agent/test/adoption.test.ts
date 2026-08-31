import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  executeAdoption,
  planAdoption,
  previewUninstall,
} from "@contentmd/agent";

const temporaryDirectories: string[] = [];
const mixedStackFixture = fileURLToPath(
  new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url),
);

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
  it("previews adoption from detected mixed-stack identity and contextual sources", async () => {
    const plan = await planAdoption(mixedStackFixture);

    expect(plan.identity).toMatchObject({
      proposed_project_id: "project.synthetic-content-studio",
      confidence: "high",
      authority_effect: "none",
    });
    expect(plan.stacks).toEqual(expect.arrayContaining([
      expect.objectContaining({ kind: "python", manifest_ref: "pyproject.toml" }),
      expect.objectContaining({ kind: "typescript", manifest_ref: "studio/package.json" }),
    ]));
    expect(plan.existing_sources.map((source) => source.relative_path)).toEqual(expect.arrayContaining([
      "CLAUDE.md",
      "PRD.md",
      "docs/context/PRODUCT-IDENTITY.md",
      "docs/adr/0001-current-product-shape.md",
    ]));
    expect(plan.existing_sources.every((source) => source.authority_effect === "none")).toBe(true);
    expect(plan.existing_sources.find((source) => source.relative_path.endsWith("PRODUCT-IDENTITY.md")))
      .toMatchObject({
        adapter_id: "adapter.filesystem",
        adapter_version: "0.1.0",
        lifecycle: "canonical",
        scope: { products: [], markets: [], locales: [], surfaces: [] },
      });
  });

  it("applies owned records and every detected host bridge in one digest-bound transaction", async () => {
    const root = await projectDirectory("contentmd-combined-adoption");
    await cp(mixedStackFixture, root, { recursive: true });
    const originalClaude = await readFile(join(root, "CLAUDE.md"), "utf8");
    const plan = await planAdoption(root);
    const approvedPaths = [
      ...plan.creates.map((file) => file.relative_path),
      ...plan.bridge_previews.filter((bridge) => bridge.status === "change_proposed").map((bridge) => bridge.relative_path),
    ];

    const receipt = await executeAdoption(plan, {
      approval_id: "approval.fixture.combined.001",
      plan_digest: plan.plan_digest,
      approved_paths: approvedPaths,
      status: "current",
    });

    expect(receipt.bridged_paths).toEqual(["CLAUDE.md"]);
    expect(await readFile(join(root, "CLAUDE.md"), "utf8")).toContain(originalClaude);
    expect(await readFile(join(root, "CLAUDE.md"), "utf8")).toContain("<!-- contentmd:bridge:start version=\"0.2.0\"");
    expect(await readFile(join(root, ".contentmd/records/repository-model.json"), "utf8"))
      .toContain('"authority_effect":"none"');
    const contract = await readFile(join(root, "CONTENT.md"), "utf8");
    for (const heading of [
      "## Product and scope", "## Users and jobs", "## Journeys and content principles",
      "## Voice and terminology", "## Sources, evidence, and conflicts", "## Operating boundaries",
      "## Review and approval routes", "## Structured records",
    ]) expect(contract).toContain(heading);
    const uninstall = await previewUninstall(root);
    expect(uninstall.host_files_affected).toEqual([
      expect.objectContaining({
        relative_path: "CLAUDE.md",
        operation: "remove_exact_marker_block",
      }),
    ]);
  });

  it("bootstraps a proposed content contract without publication authority", async () => {
    const root = await projectDirectory("contentmd-empty-project");
    const plan = await planAdoption(root);

    expect(plan.status).toBe("ready_for_local_approval");
    expect(plan.creates.map((file) => file.relative_path)).toEqual([
      ".contentmd/governance/starter-policy.yaml",
      ".contentmd/manifest.json",
      ".contentmd/product/open-questions.json",
      ".contentmd/records/repository-model.json",
      "CONTENT.md",
    ]);
    expect(plan.governance_bootstrap.external_publication).toBe("denied");
    expect(plan.bridge_previews).toEqual([
      expect.objectContaining({ host: "agents", relative_path: "AGENTS.md", status: "change_proposed" }),
    ]);
    expect(plan.unresolved_questions.map((question) => question.question_id)).toContain(
      "question.product-owner",
    );

    const receipt = await executeAdoption(plan, {
      approval_id: "approval.fixture.adoption.001",
      plan_digest: plan.plan_digest,
      approved_paths: [
        ...plan.creates.map((file) => file.relative_path),
        ...plan.bridge_previews.map((bridge) => bridge.relative_path),
      ],
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
      "CLAUDE.md": "# Existing Claude instructions\nKeep this exact text.\n",
      "CODEX.md": "# Existing Codex instructions\nKeep this exact text.\n",
    };
    await Promise.all(
      Object.entries(existingFiles).map(([path, content]) =>
        writeFile(join(root, path), content, "utf8"),
      ),
    );

    const plan = await planAdoption(root);

    expect(plan.existing_sources.map((source) => source.relative_path)).toEqual([
      "AGENTS.md",
      "CLAUDE.md",
      "CODEX.md",
      "DESIGN.md",
      "PRODUCT.md",
    ]);
    expect(plan.existing_sources.every((source) => source.authority_effect === "none")).toBe(true);
    expect(plan.bridge_previews.map((preview) => preview.host)).toEqual([
      "agents",
      "claude",
      "codex",
    ]);
    expect(plan.bridge_previews.every((preview) => preview.status === "change_proposed")).toBe(true);
    for (const preview of plan.bridge_previews) {
      expect(preview.after_content).toContain(existingFiles[preview.relative_path as keyof typeof existingFiles]);
      expect(preview.after_content).toContain("<!-- contentmd:bridge:start version=\"0.2.0\"");
    }

    await executeAdoption(plan, {
      approval_id: "approval.fixture.adoption.002",
      plan_digest: plan.plan_digest,
      approved_paths: [
        ...plan.creates.map((file) => file.relative_path),
        ...plan.bridge_previews.map((bridge) => bridge.relative_path),
      ],
      status: "current",
    });

    for (const [path, content] of Object.entries(existingFiles)) {
      const installed = await readFile(join(root, path), "utf8");
      expect(installed).toContain(content);
      if (["AGENTS.md", "CLAUDE.md", "CODEX.md"].includes(path)) {
        expect(installed).toContain("<!-- contentmd:bridge:start version=\"0.2.0\"");
      } else {
        expect(installed).toBe(content);
      }
    }
  });

  it("discovers lower-case product and host contracts and previews bridges at their real paths", async () => {
    const root = await projectDirectory("contentmd-lower-case-host-contracts");
    const existingFiles = {
      "product.md": "# Product context\nFacts retain product ownership.\n",
      "claude.md": "# Claude guidance\nKeep this exact text.\n",
      "codex.md": "# Codex guidance\nKeep this exact text.\n",
    };
    await Promise.all(
      Object.entries(existingFiles).map(([path, content]) =>
        writeFile(join(root, path), content, "utf8"),
      ),
    );

    const plan = await planAdoption(root);

    expect(plan.existing_sources.map((source) => source.relative_path)).toEqual([
      "claude.md",
      "codex.md",
      "product.md",
    ]);
    expect(plan.bridge_previews.map((preview) => ({
      host: preview.host,
      relative_path: preview.relative_path,
    }))).toEqual([
      { host: "claude", relative_path: "claude.md" },
      { host: "codex", relative_path: "codex.md" },
    ]);
    for (const preview of plan.bridge_previews) {
      expect(preview.after_content).toContain(
        existingFiles[preview.relative_path as keyof typeof existingFiles],
      );
      expect(preview.after_content).toContain("ask the user to run `contentmd doctor`");
    }
    expect(plan.governance_bootstrap.external_publication).toBe("denied");
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

  it("rechecks every host digest before writing any part of the transaction", async () => {
    const root = await projectDirectory("contentmd-stale-host");
    await writeFile(join(root, "CLAUDE.md"), "# Initial host guidance\n", "utf8");
    const plan = await planAdoption(root);
    await writeFile(join(root, "CLAUDE.md"), "# User changed this after preview\n", "utf8");

    await expect(executeAdoption(plan, {
      approval_id: "approval.fixture.stale-host.001",
      plan_digest: plan.plan_digest,
      approved_paths: [
        ...plan.creates.map((file) => file.relative_path),
        ...plan.bridge_previews.map((bridge) => bridge.relative_path),
      ],
      status: "current",
    })).rejects.toThrow("adoption_source_changed:CLAUDE.md");
    await expect(readFile(join(root, "CONTENT.md"), "utf8")).rejects.toMatchObject({ code: "ENOENT" });
    expect(await readFile(join(root, "CLAUDE.md"), "utf8")).toBe("# User changed this after preview\n");
  });

  it("previews only installer-owned files and does not delete them", async () => {
    const root = await projectDirectory("contentmd-uninstall-preview");
    await writeFile(join(root, "PRODUCT.md"), "# Keep this host file\n", "utf8");
    const plan = await planAdoption(root);
    await executeAdoption(plan, {
      approval_id: "approval.fixture.adoption.004",
      plan_digest: plan.plan_digest,
      approved_paths: [
        ...plan.creates.map((file) => file.relative_path),
        ...plan.bridge_previews.map((bridge) => bridge.relative_path),
      ],
      status: "current",
    });

    const preview = await previewUninstall(root);
    expect(preview.installer_id).toBe("contentmd@0.1.0");
    expect(preview.owned_files).toEqual([
      ".contentmd/governance/starter-policy.yaml",
      ".contentmd/manifest.json",
      ".contentmd/product/open-questions.json",
      ".contentmd/records/repository-model.json",
      "CONTENT.md",
    ]);
    expect(preview.owned_files).not.toContain("PRODUCT.md");
    expect(preview.removed).toBe(false);
    expect(await readFile(join(root, "CONTENT.md"), "utf8")).toContain("# CONTENT.md");
    expect(await readFile(join(root, "PRODUCT.md"), "utf8")).toBe("# Keep this host file\n");
  });
});
