import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { FilesystemContentAdapter } from "@contentmd/adapter-filesystem";

const mixedRoot = fileURLToPath(
  new URL("../../../fixtures/synthetic-mixed-stack/", import.meta.url),
);

describe("conservative Python and template discovery", () => {
  it("extracts only recognized user-facing Python literals without executing Python", async () => {
    const result = await new FilesystemContentAdapter().discover({ project_root: mixedRoot });

    expect(result.occurrences).toEqual(expect.arrayContaining([
      expect.objectContaining({
        source_artifact: "api/main.py",
        route: "/api/analysis",
        syntax_kind: "route_declaration",
        expression_payload: "/api/analysis",
      }),
      expect.objectContaining({
        source_artifact: "api/main.py",
        route: "/api/analysis",
        syntax_kind: "route_metadata",
        expression_payload: "Analyze product content",
      }),
      expect.objectContaining({
        source_artifact: "api/main.py",
        syntax_kind: "user_facing_literal",
        expression_payload: "Product name",
      }),
      expect.objectContaining({
        source_artifact: "api/main.py",
        route: "/api/analysis",
        syntax_kind: "user_facing_literal",
        expression_payload: "Analysis is ready.",
      }),
    ]));
    const payloads = result.occurrences.map((item) => item.expression_payload);
    expect(payloads).not.toContain("database connection failed");
    expect(payloads).not.toContain("SELECT message FROM analyses");
    expect(payloads).not.toContain("retry worker after timeout");
    expect(payloads).not.toContain("analysis requested");
    expect(result.warnings).toEqual(expect.arrayContaining([
      expect.stringMatching(/^unsupported_dynamic_python_expression:api\/main\.py:\d+$/u),
    ]));
  });

  it("extracts visible template text and preserves template variables", async () => {
    const result = await new FilesystemContentAdapter().discover({ project_root: mixedRoot });

    expect(result.occurrences).toEqual(expect.arrayContaining([
      expect.objectContaining({
        source_artifact: "templates/recovery.html",
        syntax_kind: "html_text",
        expression_payload: "Try another product or stage.",
      }),
      expect.objectContaining({
        source_artifact: "templates/recovery.html",
        syntax_kind: "html_text",
        expression_payload: "Review {{ product_name }} before submitting.",
      }),
    ]));
    expect(result.occurrences.map((item) => item.expression_payload)).not.toEqual(
      expect.arrayContaining([expect.stringContaining("{%")]),
    );
  });
});
