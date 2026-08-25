import { existsSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

function isWithin(root: string, candidate: string): boolean {
  const path = relative(root, candidate);
  return path === "" || (!path.startsWith(`..${sep}`) && path !== ".." && !isAbsolute(path));
}

export function resolveRuntimePath(projectRoot: string, relativePath: string): string {
  if (relativePath.length === 0
    || relativePath.includes("\0")
    || isAbsolute(relativePath)
    || relativePath.split(/[\\/]/u).includes("..")) {
    throw new Error("runtime_binding_not_authorized:invalid_runtime_path");
  }
  const root = realpathSync(projectRoot);
  const candidate = resolve(root, relativePath);
  if (!isWithin(root, candidate)) {
    throw new Error("runtime_binding_not_authorized:runtime_path_escape");
  }
  let ancestor = candidate;
  while (!existsSync(ancestor)) {
    const parent = dirname(ancestor);
    if (parent === ancestor) break;
    ancestor = parent;
  }
  const realAncestor = realpathSync(ancestor);
  if (!isWithin(root, realAncestor)) {
    throw new Error("runtime_binding_not_authorized:runtime_symlink_escape");
  }
  if (existsSync(candidate) && !isWithin(root, realpathSync(candidate))) {
    throw new Error("runtime_binding_not_authorized:runtime_symlink_escape");
  }
  return candidate;
}
