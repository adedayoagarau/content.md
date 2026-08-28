import { mkdir, mkdtemp, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { compileProjectModel } from "@contentmd/agent";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("scoped workspace repository context", () => {
  it("inherits bounded root product documents without scanning sibling workspaces", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-workspace-context-"));
    temporaryDirectories.push(root);
    const web = join(root, "apps/web");
    const admin = join(root, "apps/admin");
    await mkdir(web, { recursive: true });
    await mkdir(admin, { recursive: true });
    await writeFile(join(root, "PRODUCT.md"), "# Atlas\n\nAtlas helps teams review content.\n");
    await writeFile(join(web, "package.json"), '{"name":"atlas-web"}\n');
    await writeFile(join(web, "Page.tsx"), "export const Page = () => <button>Review content</button>;\n");
    await writeFile(join(admin, "Secret.tsx"), "export const Secret = () => <p>Sibling admin content</p>;\n");

    const model = await compileProjectModel({
      project_root: web,
      repository_root: root,
    });

    expect(model.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({
        locator: "repository-root:PRODUCT.md",
        source_type: "inherited_repository_context",
      }),
    ]));
    expect(model.discovery.occurrences.map((item) => item.expression_payload)).toContain("Review content");
    expect(model.discovery.occurrences.map((item) => item.expression_payload)).not.toContain("Sibling admin content");
    expect(model.discovery.project_root).toBe(await realpath(web));
  });
});
