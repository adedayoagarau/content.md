import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import * as adapterFilesystem from "@contentmd/adapter-filesystem";

const root = fileURLToPath(
  new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url),
);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })
  ));
});

describe("repository stack and source detection", () => {
  it("detects a Python root, nested TypeScript app, and contextual sources", async () => {
    expect(typeof adapterFilesystem.detectStacks).toBe("function");
    expect(typeof adapterFilesystem.discoverSourceCandidates).toBe("function");

    const inventory = await adapterFilesystem.inventoryRepository({ project_root: root });
    const stacks = await adapterFilesystem.detectStacks(inventory);
    const sources = await adapterFilesystem.discoverSourceCandidates(inventory);
    const identity = await adapterFilesystem.proposeProjectIdentity(root, inventory);

    expect(stacks).toEqual(expect.arrayContaining([
      expect.objectContaining({
        kind: "python",
        workspace_root: "",
        manifest_ref: "pyproject.toml",
        framework_hints: ["fastapi"],
      }),
      expect.objectContaining({
        kind: "typescript",
        workspace_root: "studio",
        manifest_ref: "studio/package.json",
        framework_hints: ["next", "react"],
      }),
    ]));
    expect(sources.map((item) => item.relative_path)).toEqual(expect.arrayContaining([
      "CLAUDE.md",
      "PRD.md",
      "docs/context/PRODUCT-IDENTITY.md",
      "docs/adr/0001-current-product-shape.md",
    ]));
    expect(sources.find((item) => item.relative_path.endsWith("PRODUCT-IDENTITY.md"))).toMatchObject({
      source_type: "product_identity",
      adapter_id: "adapter.filesystem",
      adapter_version: "0.1.0",
      lifecycle: "canonical",
      evidence_class: "documented",
      declared_date: "2026-08-25",
      scope: {
        products: [],
        services: [],
        markets: [],
        locales: [],
        surfaces: [],
        versions: [],
      },
      authority_effect: "none",
    });
    expect(identity).toMatchObject({
      proposed_project_id: "project.synthetic-content-studio",
      proposed_name: "synthetic-content-studio",
      confidence: "high",
      authority_effect: "none",
    });
  });

  it("recognizes a documentation-first repository without inventing a manifest requirement", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-docs-first-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "docs"));
    await writeFile(join(repository, "README.md"), "# Atlas guide\n", "utf8");
    await writeFile(join(repository, "docs", "product.md"), "# Atlas product\n\n**Status:** Active\n", "utf8");

    const inventory = await adapterFilesystem.inventoryRepository({ project_root: repository });
    const stacks = await adapterFilesystem.detectStacks(inventory);
    const identity = await adapterFilesystem.proposeProjectIdentity(repository, inventory);

    expect(stacks).toEqual([
      expect.objectContaining({
        kind: "documentation",
        workspace_root: "",
        manifest_ref: "docs/product.md",
        confidence: "medium",
      }),
    ]);
    expect(identity).toMatchObject({
      proposed_project_id: expect.stringMatching(/^project\.contentmd-docs-first-/u),
      confidence: "low",
      authority_effect: "none",
    });
  });

  it("refuses a source document that was not discovered from the safe inventory", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-undiscovered-source-"));
    temporaryDirectories.push(repository);
    const content = "INTERNAL_SOURCE_CANARY\n";
    await writeFile(join(repository, "internal.txt"), content, "utf8");
    const digest = createHash("sha256").update(content, "utf8").digest("hex");

    await expect(adapterFilesystem.readSourceDocuments(repository, [{
      source_id: "source.forged",
      relative_path: "internal.txt",
      source_type: "product_identity",
      adapter_id: "adapter.filesystem",
      adapter_version: "0.1.0",
      content_digest: digest,
      lifecycle: "canonical",
      evidence_class: "documented",
      declared_date: null,
      declared_owner: null,
      scope: { products: [], services: [], markets: [], locales: [], surfaces: [], versions: [] },
      discovery_reason: "forged",
      limitations: [],
      authority_effect: "none",
    }])).rejects.toThrow("source_candidate_not_discovered:internal.txt");
  });

  it("does not infer a Python framework from manifest prose", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-python-prose-"));
    temporaryDirectories.push(repository);
    await writeFile(join(repository, "pyproject.toml"), [
      "[project]",
      "name = \"plain-python-tool\"",
      "description = \"Compares Flask and FastAPI documentation\"",
      "dependencies = []",
      "",
    ].join("\n"), "utf8");

    const inventory = await adapterFilesystem.inventoryRepository({ project_root: repository });
    const stacks = await adapterFilesystem.detectStacks(inventory);

    expect(stacks).toEqual([
      expect.objectContaining({ kind: "python", framework_hints: [] }),
    ]);
  });

  it("preserves an existing valid content.md project identity over a manifest name", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-existing-identity-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, ".contentmd"));
    await writeFile(join(repository, "package.json"), "{\"name\":\"replaceable-name\"}\n", "utf8");
    await writeFile(join(repository, ".contentmd", "project.json"), JSON.stringify({
      contract_version: "contentmd.project/0.1.0",
      project_id: "project.stable-identity",
      name: "Stable Identity",
      authority_effect: "none",
    }), "utf8");

    const inventory = await adapterFilesystem.inventoryRepository({ project_root: repository });
    const identity = await adapterFilesystem.proposeProjectIdentity(repository, inventory);

    expect(identity).toMatchObject({
      proposed_project_id: "project.stable-identity",
      proposed_name: "Stable Identity",
      confidence: "high",
      authority_effect: "none",
    });
  });

  it("uses an unambiguous nested workspace aggregate before the directory basename", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-workspace-aggregate-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "apps", "web"), { recursive: true });
    await mkdir(join(repository, "services", "api"), { recursive: true });
    await writeFile(join(repository, "apps", "web", "package.json"), "{\"name\":\"atlas-suite\"}\n", "utf8");
    await writeFile(join(repository, "services", "api", "pyproject.toml"), [
      "[project]",
      "name = \"atlas-suite\"",
      "dependencies = []",
      "",
    ].join("\n"), "utf8");

    const inventory = await adapterFilesystem.inventoryRepository({ project_root: repository });
    const identity = await adapterFilesystem.proposeProjectIdentity(repository, inventory);

    expect(identity).toMatchObject({
      proposed_project_id: "project.atlas-suite",
      proposed_name: "atlas-suite",
      confidence: "high",
    });
    expect(identity.evidence_refs).toHaveLength(2);
  });

  it("detects a Node-only TypeScript repository without requiring Python or product documents", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-node-only-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "src"));
    await writeFile(join(repository, "package.json"), JSON.stringify({
      name: "node-only-tool",
      dependencies: { react: "19.1.0" },
      devDependencies: { typescript: "5.9.3" },
    }), "utf8");
    await writeFile(join(repository, "src", "index.ts"), "export const label = \"Ready\";\n", "utf8");

    const inventory = await adapterFilesystem.inventoryRepository({ project_root: repository });
    const stacks = await adapterFilesystem.detectStacks(inventory);
    const sources = await adapterFilesystem.discoverSourceCandidates(inventory);
    const identity = await adapterFilesystem.proposeProjectIdentity(repository, inventory);

    expect(stacks).toEqual([
      expect.objectContaining({
        kind: "typescript",
        manifest_ref: "package.json",
        framework_hints: ["react"],
      }),
    ]);
    expect(sources).toEqual([]);
    expect(identity.proposed_project_id).toBe("project.node-only-tool");
  });

  it("fails closed when an existing project identity changes after inventory", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-changing-identity-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, ".contentmd"));
    const projectPath = join(repository, ".contentmd", "project.json");
    await writeFile(projectPath, JSON.stringify({
      contract_version: "contentmd.project/0.1.0",
      project_id: "project.original",
      name: "Original",
      authority_effect: "none",
    }), "utf8");
    const inventory = await adapterFilesystem.inventoryRepository({ project_root: repository });
    await writeFile(projectPath, JSON.stringify({
      contract_version: "contentmd.project/0.1.0",
      project_id: "project.changed",
      name: "Changed",
      authority_effect: "none",
    }), "utf8");

    await expect(adapterFilesystem.proposeProjectIdentity(repository, inventory))
      .rejects.toThrow("source_candidate_changed:.contentmd/project.json");
  });
});
import { createHash } from "node:crypto";
