import {
  mkdir,
  lstat,
  open,
  readFile,
  realpath,
  rename,
  unlink,
} from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { canonicalJson } from "@contentmd/core";

export type LocalArtifactErrorCode =
  | "local_artifact_path_invalid"
  | "local_artifact_write_failed"
  | "local_artifact_read_failed"
  | "local_artifact_noncanonical";

export class LocalArtifactError extends Error {
  readonly code: LocalArtifactErrorCode;

  constructor(code: LocalArtifactErrorCode) {
    super(code);
    this.name = "LocalArtifactError";
    this.code = code;
  }
}

export interface LocalArtifactStore {
  writeCanonical(relativePath: string, value: unknown): Promise<void>;
  readCanonical<T = unknown>(relativePath: string): Promise<T>;
}

function allowedRelativePath(value: string): boolean {
  if (value.length === 0 || isAbsolute(value) || value.includes("\0")) return false;
  const normalized = value.split(/[\\/]/u);
  return normalized.every((part) => part.length > 0 && part !== "." && part !== "..");
}

function within(root: string, candidate: string): boolean {
  const path = relative(root, candidate);
  return path.length > 0 && path !== ".." && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

export class FilesystemLocalArtifactStore implements LocalArtifactStore {
  readonly #basePath: string;

  constructor(projectRoot: string) {
    if (typeof projectRoot !== "string" || projectRoot.length === 0) {
      throw new LocalArtifactError("local_artifact_path_invalid");
    }
    this.#basePath = resolve(projectRoot, ".contentmd/runtime/provider");
  }

  async #target(relativePath: string, createParent: boolean): Promise<string> {
    if (!allowedRelativePath(relativePath)) {
      throw new LocalArtifactError("local_artifact_path_invalid");
    }
    if (createParent) await mkdir(this.#basePath, { recursive: true, mode: 0o700 });
    let base: string;
    try {
      base = await realpath(this.#basePath);
    } catch {
      throw new LocalArtifactError(createParent
        ? "local_artifact_write_failed"
        : "local_artifact_read_failed");
    }
    const target = join(base, ...relativePath.split(/[\\/]/u));
    if (!within(base, target)) throw new LocalArtifactError("local_artifact_path_invalid");
    const parent = resolve(target, "..");
    if (createParent) await mkdir(parent, { recursive: true, mode: 0o700 });
    let actualParent: string;
    try {
      actualParent = await realpath(parent);
    } catch {
      throw new LocalArtifactError(createParent
        ? "local_artifact_write_failed"
        : "local_artifact_read_failed");
    }
    if (actualParent !== base && !within(base, actualParent)) {
      throw new LocalArtifactError("local_artifact_path_invalid");
    }
    return join(actualParent, target.slice(parent.length + 1));
  }

  async writeCanonical(relativePath: string, value: unknown): Promise<void> {
    let bytes: string;
    try {
      bytes = canonicalJson(value);
    } catch {
      throw new LocalArtifactError("local_artifact_noncanonical");
    }
    const target = await this.#target(relativePath, true);
    const temporary = `${target}.${randomUUID()}.tmp`;
    let handle: Awaited<ReturnType<typeof open>> | null = null;
    try {
      handle = await open(temporary, "wx", 0o600);
      await handle.writeFile(bytes, "utf8");
      await handle.sync();
      await handle.close();
      handle = null;
      await rename(temporary, target);
      const directory = await open(resolve(target, ".."), "r");
      try { await directory.sync(); } finally { await directory.close(); }
    } catch {
      if (handle !== null) await handle.close().catch(() => undefined);
      await unlink(temporary).catch(() => undefined);
      throw new LocalArtifactError("local_artifact_write_failed");
    }
  }

  async readCanonical<T = unknown>(relativePath: string): Promise<T> {
    const target = await this.#target(relativePath, false);
    try {
      if ((await lstat(target)).isSymbolicLink()) {
        throw new LocalArtifactError("local_artifact_path_invalid");
      }
    } catch (error) {
      if (error instanceof LocalArtifactError) throw error;
      throw new LocalArtifactError("local_artifact_read_failed");
    }
    let bytes: string;
    try {
      bytes = await readFile(target, "utf8");
    } catch {
      throw new LocalArtifactError("local_artifact_read_failed");
    }
    let value: unknown;
    try {
      value = JSON.parse(bytes);
    } catch {
      throw new LocalArtifactError("local_artifact_noncanonical");
    }
    try {
      if (canonicalJson(value) !== bytes) throw new Error("noncanonical");
    } catch {
      throw new LocalArtifactError("local_artifact_noncanonical");
    }
    return value as T;
  }
}
