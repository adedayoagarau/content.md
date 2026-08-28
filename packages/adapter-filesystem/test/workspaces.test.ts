import { mkdir, mkdtemp, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { detectRepositoryWorkspaces, resolveRepositoryWorkspace } from "@contentmd/adapter-filesystem";

const temporaryDirectories: string[] = [];

async function monorepo(appNames: string[]): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "contentmd-workspaces-"));
  temporaryDirectories.push(root);
  await writeFile(join(root, "package.json"), JSON.stringify({ name: "repo", workspaces: ["apps/*", "packages/*"] }));
  for (const app of appNames) {
    const path = join(root, "apps", app);
    await mkdir(path, { recursive: true });
    await writeFile(join(path, "package.json"), JSON.stringify({ name: app, scripts: { dev: "next dev" } }));
  }
  const library = join(root, "packages", "tokens");
  await mkdir(library, { recursive: true });
  await writeFile(join(library, "package.json"), JSON.stringify({ name: "tokens", scripts: { build: "tsc" } }));
  return root;
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("repository workspace selection", () => {
  it("detects declared applications and libraries and selects one application automatically", async () => {
    const root = await monorepo(["web"]);
    const canonicalRoot = await realpath(root);
    expect(await detectRepositoryWorkspaces(root)).toEqual([
      expect.objectContaining({ relative_path: "apps/web", kind: "application", package_name: "web" }),
      expect.objectContaining({ relative_path: "packages/tokens", kind: "library", package_name: "tokens" }),
    ]);
    expect(await resolveRepositoryWorkspace(root)).toMatchObject({
      project_root: join(canonicalRoot, "apps/web"),
      selection: "automatic_single_application",
    });
  });

  it("requires an explicit choice for multiple applications", async () => {
    const root = await monorepo(["admin", "web"]);
    const canonicalRoot = await realpath(root);
    await expect(resolveRepositoryWorkspace(root)).rejects.toThrow("workspace_selection_required:apps/admin,apps/web");
    await expect(resolveRepositoryWorkspace(root, "apps/web")).resolves.toMatchObject({
      project_root: join(canonicalRoot, "apps/web"),
      selection: "explicit",
    });
  });

  it("rejects paths outside the declared repository workspaces", async () => {
    const root = await monorepo(["web"]);
    await expect(resolveRepositoryWorkspace(root, "packages/missing")).rejects.toThrow();
    await expect(resolveRepositoryWorkspace(root, "..")).rejects.toThrow("workspace_outside_repository");
  });
});
