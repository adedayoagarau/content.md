import { createHash } from "node:crypto";
import { lstat, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

export function sha256Bytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function isWithin(root: string, target: string): boolean {
  const fromRoot = relative(root, target);
  return fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`) && !isAbsolute(fromRoot);
}

export async function resolveGuardedTarget(
  projectRoot: string,
  targetPath: string,
): Promise<{ project_root: string; absolute_path: string }> {
  if (targetPath.length === 0 || isAbsolute(targetPath)) throw new Error("change_target_outside_project_root");
  const root = await realpath(projectRoot);
  const lexicalTarget = resolve(root, targetPath);
  if (!isWithin(root, lexicalTarget)) throw new Error("change_target_outside_project_root");
  const stats = await lstat(lexicalTarget);
  if (stats.isSymbolicLink()) throw new Error("change_target_symlink_not_allowed");
  if (!stats.isFile()) throw new Error("change_target_not_regular_file");
  const resolvedTarget = await realpath(lexicalTarget);
  if (!isWithin(root, resolvedTarget)) throw new Error("change_target_outside_project_root");
  return { project_root: root, absolute_path: resolvedTarget };
}
