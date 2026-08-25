import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { FilesystemContentAdapter } from "@contentmd/adapter-filesystem";

const root = fileURLToPath(
  new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url),
);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })
  ));
});

describe("mixed-stack parser federation", () => {
  it("discovers nested Next content and structured document claims from the safe inventory", async () => {
    const result = await new FilesystemContentAdapter().discover({ project_root: root });

    expect(result.scanned_artifacts).toContain("studio/app/analyze/page.tsx");
    expect(result.occurrences).toEqual(expect.arrayContaining([
      expect.objectContaining({
        source_artifact: "studio/app/analyze/page.tsx",
        route: "/analyze",
        expression_payload: "Nothing to analyze yet",
      }),
      expect.objectContaining({
        source_artifact: "studio/app/analyze/page.tsx",
        route: "/analyze",
        modality: "assistive",
        expression_payload: "Open analysis help",
      }),
    ]));
    expect(result.source_candidates).toEqual(expect.arrayContaining([
      expect.objectContaining({ relative_path: "docs/context/PRODUCT-IDENTITY.md" }),
    ]));
    expect(result.parser_claims).toEqual(expect.arrayContaining([
      expect.objectContaining({
        claim_kind: "workflow_stage",
        value: ["Explore", "Analyze", "Review", "Deliver", "Track"],
      }),
    ]));
    expect(result.coverage.failed).toBe(0);
    expect(result.inventory.inventory_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("emits a terminology table row as its own line-bound claim", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-document-table-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "docs"));
    await writeFile(join(repository, "docs", "terminology.md"), [
      "# Terminology guidance",
      "",
      "**Status:** Active",
      "",
      "## Terminology",
      "",
      "| Term | Use |",
      "| --- | --- |",
      "| refund | Return funds |",
      "",
    ].join("\n"), "utf8");

    const result = await new FilesystemContentAdapter().discover({ project_root: repository });

    expect(result.parser_claims).toContainEqual(expect.objectContaining({
      claim_kind: "terminology_guidance",
      subject: "refund",
      value: "Return funds",
      source_span: { start_line: 9, end_line: 9 },
    }));
  });

  it("parses a structured YAML workflow without granting authority", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-document-yaml-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "docs"));
    await writeFile(join(repository, "docs", "journey.yaml"), [
      "workflow:",
      "  - Explore",
      "  - Review",
      "",
    ].join("\n"), "utf8");

    const result = await new FilesystemContentAdapter().discover({ project_root: repository });

    expect(result.parser_claims).toContainEqual(expect.objectContaining({
      claim_kind: "workflow_stage",
      value: ["Explore", "Review"],
      source_ref: "docs/journey.yaml",
    }));
    expect(result.source_candidates[0]).toMatchObject({ authority_effect: "none" });
  });

  it("fails one malformed YAML artifact without marking it scanned", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-document-invalid-yaml-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "docs"));
    await writeFile(join(repository, "docs", "journey.yaml"), [
      "workflow: Explore",
      "workflow: Review",
      "",
    ].join("\n"), "utf8");

    const result = await new FilesystemContentAdapter().discover({ project_root: repository });

    expect(result.coverage.failed).toBe(1);
    expect(result.scanned_artifacts).not.toContain("docs/journey.yaml");
    expect(result.warnings).toContain(
      "parser_failed:parser.filesystem.documents:docs/journey.yaml",
    );
  });

  it("retains an explicit Markdown scope link with its exact source line", async () => {
    const repository = await mkdtemp(join(tmpdir(), "contentmd-document-link-"));
    temporaryDirectories.push(repository);
    await mkdir(join(repository, "docs"));
    await writeFile(join(repository, "docs", "scope.md"), [
      "# Scope",
      "",
      "## Product scope",
      "",
      "[US checkout](./us-checkout.md)",
      "",
    ].join("\n"), "utf8");

    const result = await new FilesystemContentAdapter().discover({ project_root: repository });

    expect(result.parser_claims).toContainEqual(expect.objectContaining({
      claim_kind: "product_scope",
      value: "US checkout",
      source_links: [{ label: "US checkout", target: "./us-checkout.md", line: 5 }],
      authority_effect: "none",
    }));
  });
});
