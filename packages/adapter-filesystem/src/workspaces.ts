import { readFile, realpath } from "node:fs/promises";
import { basename, relative, resolve, sep } from "node:path";
import fastGlob from "fast-glob";
import { parse as parseYaml } from "yaml";

export interface RepositoryWorkspaceChoice {
  relative_path: string;
  package_name: string;
  kind: "application" | "library" | "unknown";
  manifest_ref: string;
}

async function optionalText(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function workspacePatterns(packageJson: unknown, pnpmWorkspace: unknown): string[] {
  const patterns: string[] = [];
  if (typeof packageJson === "object" && packageJson !== null) {
    const workspaces = (packageJson as { workspaces?: unknown }).workspaces;
    if (Array.isArray(workspaces)) patterns.push(...workspaces.filter((item): item is string => typeof item === "string"));
    if (typeof workspaces === "object" && workspaces !== null) {
      const packages = (workspaces as { packages?: unknown }).packages;
      if (Array.isArray(packages)) patterns.push(...packages.filter((item): item is string => typeof item === "string"));
    }
  }
  if (typeof pnpmWorkspace === "object" && pnpmWorkspace !== null) {
    const packages = (pnpmWorkspace as { packages?: unknown }).packages;
    if (Array.isArray(packages)) patterns.push(...packages.filter((item): item is string => typeof item === "string"));
  }
  return [...new Set(patterns.filter((pattern) => !pattern.startsWith("!")))].sort();
}

function workspaceKind(path: string, manifest: Record<string, unknown>): RepositoryWorkspaceChoice["kind"] {
  if (path === "apps" || path.startsWith("apps/")) return "application";
  if (path === "packages" || path.startsWith("packages/")) return "library";
  const scripts = typeof manifest.scripts === "object" && manifest.scripts !== null
    ? manifest.scripts as Record<string, unknown>
    : {};
  if (["dev", "start", "serve"].some((name) => typeof scripts[name] === "string")) return "application";
  return "unknown";
}

export async function detectRepositoryWorkspaces(repositoryRoot: string): Promise<RepositoryWorkspaceChoice[]> {
  const root = await realpath(resolve(repositoryRoot));
  const packageBytes = await optionalText(resolve(root, "package.json"));
  const pnpmBytes = await optionalText(resolve(root, "pnpm-workspace.yaml"));
  const packageJson = packageBytes === null ? null : JSON.parse(packageBytes) as unknown;
  const pnpmWorkspace = pnpmBytes === null ? null : parseYaml(pnpmBytes) as unknown;
  const patterns = workspacePatterns(packageJson, pnpmWorkspace);
  if (patterns.length === 0) return [];
  const manifestPatterns = patterns.map((pattern) => `${pattern.replace(/\/$/u, "")}/package.json`);
  const manifests = await fastGlob(manifestPatterns, {
    cwd: root,
    onlyFiles: true,
    unique: true,
    followSymbolicLinks: false,
    ignore: ["**/node_modules/**", "**/.git/**"],
  });
  const choices: RepositoryWorkspaceChoice[] = [];
  for (const manifestRef of manifests.sort()) {
    const workspacePath = manifestRef.slice(0, -"/package.json".length);
    const manifest = JSON.parse(await readFile(resolve(root, manifestRef), "utf8")) as Record<string, unknown>;
    choices.push({
      relative_path: workspacePath,
      package_name: typeof manifest.name === "string" ? manifest.name : basename(workspacePath),
      kind: workspaceKind(workspacePath, manifest),
      manifest_ref: manifestRef,
    });
  }
  return choices.sort((left, right) => left.relative_path.localeCompare(right.relative_path));
}

export async function resolveRepositoryWorkspace(
  repositoryRoot: string,
  requestedWorkspace?: string,
): Promise<{
  repository_root: string;
  project_root: string;
  selection: "repository_root" | "automatic_single_application" | "explicit";
  choices: RepositoryWorkspaceChoice[];
}> {
  const root = await realpath(resolve(repositoryRoot));
  const choices = await detectRepositoryWorkspaces(root);
  if (requestedWorkspace !== undefined) {
    const requestedPath = await realpath(resolve(root, requestedWorkspace));
    const fromRoot = relative(root, requestedPath);
    if (fromRoot.startsWith(`..${sep}`) || fromRoot === "..") throw new Error("workspace_outside_repository");
    if (fromRoot !== "" && !choices.some((choice) => choice.relative_path === fromRoot.split(sep).join("/"))) {
      throw new Error(`workspace_not_declared:${requestedWorkspace}`);
    }
    return { repository_root: root, project_root: requestedPath, selection: "explicit", choices };
  }
  const applications = choices.filter((choice) => choice.kind === "application");
  if (applications.length === 1) {
    return {
      repository_root: root,
      project_root: await realpath(resolve(root, applications[0]!.relative_path)),
      selection: "automatic_single_application",
      choices,
    };
  }
  if (applications.length > 1) {
    throw new Error(`workspace_selection_required:${applications.map((choice) => choice.relative_path).join(",")}`);
  }
  return { repository_root: root, project_root: root, selection: "repository_root", choices };
}
