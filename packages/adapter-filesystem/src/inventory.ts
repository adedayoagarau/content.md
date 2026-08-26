import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import fastGlob from "fast-glob";
import { sha256Canonical } from "@contentmd/core";
import type {
  DiscoverRequest,
  InventoryArtifact,
  InventoryExclusion,
  InventoryExclusionReason,
  RepositoryInventory,
} from "@contentmd/adapter-sdk";

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const EXCLUDED_DIRECTORY_PATTERNS = [
  "**/.git",
  "**/.contentmd-test",
  "**/.next",
  "**/.venv",
  "**/.worktrees",
  "**/build",
  "**/coverage",
  "**/content-repos",
  "**/data",
  "**/dist",
  "**/node_modules",
  "**/outputs",
  "**/venv",
  "**/.contentmd/cache",
  "**/.contentmd/local",
  "**/.contentmd/records",
  "**/.contentmd/runtime",
];
const IGNORED_DIRECTORY_PATTERNS = EXCLUDED_DIRECTORY_PATTERNS.map((pattern) => `${pattern}/**`);

function comparePath(left: { relative_path: string }, right: { relative_path: string }): number {
  return left.relative_path.localeCompare(right.relative_path, "en");
}

function withinRoot(projectRoot: string, candidate: string): boolean {
  const fromRoot = relative(projectRoot, candidate);
  return fromRoot === "" || (!fromRoot.startsWith(`..${sep}`) && fromRoot !== ".." && !isAbsolute(fromRoot));
}

function directoryReason(relativePath: string): InventoryExclusionReason {
  const name = relativePath.split("/").at(-1)?.toLowerCase() ?? "";
  if (name === "data" || name === "content-repos") return "private_or_bulk_data";
  if (name === "outputs" || name === "build" || name === "coverage" || name === "dist" || name === ".next") {
    return "generated_output";
  }
  return "dependency_or_cache";
}

function credentialReason(relativePath: string): InventoryExclusionReason | null {
  const name = relativePath.split("/").at(-1)?.toLowerCase() ?? "";
  if (name === ".env" || name.startsWith(".env.")) return "credential_or_environment";
  if (/(credential|private[-_.]?key|secret|token)/u.test(name)) return "credential_or_environment";
  if (/^(id_rsa|id_ed25519)(\.|$)/u.test(name)) return "credential_or_environment";
  return null;
}

function temporaryReason(relativePath: string): InventoryExclusionReason | null {
  const name = relativePath.split("/").at(-1)?.toLowerCase() ?? "";
  if (name === ".ds_store" || /\.(swp|temp|tmp)$/u.test(name) || name.endsWith("~")) {
    return "dependency_or_cache";
  }
  return null;
}

function sha256Bytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function isUtf8Text(bytes: Uint8Array): boolean {
  if (bytes.includes(0)) return false;
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
}

function addExclusion(
  exclusions: Map<string, InventoryExclusionReason>,
  relativePath: string,
  reason: InventoryExclusionReason,
): void {
  if (!exclusions.has(relativePath)) exclusions.set(relativePath, reason);
}

export async function inventoryRepository(request: DiscoverRequest): Promise<RepositoryInventory> {
  const projectRoot = await realpath(resolve(request.project_root));
  const exclusions = new Map<string, InventoryExclusionReason>();

  const excludedDirectories = await fastGlob(EXCLUDED_DIRECTORY_PATTERNS, {
    cwd: projectRoot,
    dot: true,
    onlyDirectories: true,
    unique: true,
    followSymbolicLinks: false,
  });
  for (const relativePath of excludedDirectories) {
    addExclusion(exclusions, relativePath, directoryReason(relativePath));
  }

  const repositoryEntries = await fastGlob("**/*", {
    cwd: projectRoot,
    dot: true,
    onlyFiles: false,
    unique: true,
    followSymbolicLinks: false,
    ignore: IGNORED_DIRECTORY_PATTERNS,
  });
  for (const relativePath of repositoryEntries) {
    const absolutePath = resolve(projectRoot, relativePath);
    const metadata = await lstat(absolutePath);
    if (!metadata.isSymbolicLink()) continue;
    let resolvedPath: string;
    try {
      resolvedPath = await realpath(absolutePath);
    } catch {
      addExclusion(exclusions, relativePath, "unavailable_symlink");
      continue;
    }
    if (!withinRoot(projectRoot, resolvedPath)) {
      addExclusion(exclusions, relativePath, "outside_project_root");
    }
  }

  const relativePaths = await fastGlob("**/*", {
    cwd: projectRoot,
    dot: true,
    onlyFiles: true,
    unique: true,
    followSymbolicLinks: false,
    ignore: IGNORED_DIRECTORY_PATTERNS,
  });
  relativePaths.sort((left, right) => left.localeCompare(right, "en"));

  const artifacts: InventoryArtifact[] = [];
  let bytesRead = 0;
  let unsupported = 0;

  for (const relativePath of relativePaths) {
    const excludedFileReason = credentialReason(relativePath) ?? temporaryReason(relativePath);
    if (excludedFileReason !== null) {
      addExclusion(exclusions, relativePath, excludedFileReason);
      continue;
    }

    const absolutePath = resolve(projectRoot, relativePath);
    const metadata = await lstat(absolutePath);
    let resolvedPath: string;
    try {
      resolvedPath = await realpath(absolutePath);
    } catch {
      addExclusion(exclusions, relativePath, "unavailable_symlink");
      continue;
    }
    if (!withinRoot(projectRoot, resolvedPath)) {
      addExclusion(exclusions, relativePath, "outside_project_root");
      continue;
    }
    if (metadata.size > MAX_FILE_BYTES) {
      addExclusion(exclusions, relativePath, "binary_or_oversize");
      unsupported += 1;
      continue;
    }

    const bytes = await readFile(resolvedPath);
    bytesRead += bytes.byteLength;
    if (!isUtf8Text(bytes)) {
      addExclusion(exclusions, relativePath, "binary_or_oversize");
      unsupported += 1;
      continue;
    }
    artifacts.push({
      relative_path: relativePath,
      content_digest: sha256Bytes(bytes),
      byte_length: bytes.byteLength,
      extension: extname(relativePath).toLowerCase(),
    });
  }

  artifacts.sort(comparePath);
  const exclusionRecords: InventoryExclusion[] = [...exclusions].map(([relative_path, reason]) => ({
    relative_path,
    reason,
  })).sort(comparePath);
  const preimage = {
    contract_version: "contentmd.repository-inventory/0.2.0" as const,
    project_root: projectRoot,
    artifacts,
    exclusions: exclusionRecords,
    stacks: [],
    coverage: {
      inventoried: artifacts.length,
      scanned: 0,
      skipped: exclusionRecords.length,
      unsupported,
      failed: 0,
    },
    bytes_read: bytesRead,
    resource_ceiling: { max_file_bytes: MAX_FILE_BYTES },
    authority_effect: "none" as const,
  };
  return { ...preimage, inventory_digest: sha256Canonical(preimage) };
}
