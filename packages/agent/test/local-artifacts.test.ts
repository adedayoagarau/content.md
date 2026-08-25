import { mkdtemp, readFile, rm, stat, symlink, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { canonicalJson } from "@contentmd/core";
import {
  FilesystemLocalArtifactStore,
  LocalArtifactError,
} from "../src/local-artifacts.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("filesystem local artifacts", () => {
  it("writes one canonical private artifact atomically and reads it exactly", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-local-artifacts-"));
    temporaryDirectories.push(root);
    const artifacts = new FilesystemLocalArtifactStore(root);
    const value = { schema_version: "fixture/0.1.0", status: "current" };

    await artifacts.writeCanonical("provider-configuration.json", value);

    expect(await artifacts.readCanonical("provider-configuration.json")).toEqual(value);
    const path = join(root, ".contentmd/runtime/provider/provider-configuration.json");
    expect(await readFile(path, "utf8")).toBe(canonicalJson(value));
    expect((await stat(path)).mode & 0o777).toBe(0o600);
  });

  it("rejects traversal and noncanonical artifact bytes", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-local-artifacts-"));
    temporaryDirectories.push(root);
    const artifacts = new FilesystemLocalArtifactStore(root);

    await expect(artifacts.writeCanonical("../escape.json", { ok: false }))
      .rejects.toBeInstanceOf(LocalArtifactError);
    await artifacts.writeCanonical("provider-configuration.json", { ok: true });
    const path = join(root, ".contentmd/runtime/provider/provider-configuration.json");
    await writeFile(path, '{\n  "ok": true\n}', "utf8");
    await expect(artifacts.readCanonical("provider-configuration.json"))
      .rejects.toMatchObject({ code: "local_artifact_noncanonical" });
  });

  it("does not follow an artifact symlink outside the private provider directory", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-local-artifacts-"));
    temporaryDirectories.push(root);
    const artifacts = new FilesystemLocalArtifactStore(root);
    await artifacts.writeCanonical("provider-configuration.json", { safe: true });
    const path = join(root, ".contentmd/runtime/provider/provider-configuration.json");
    const outside = join(root, "outside.json");
    await writeFile(outside, canonicalJson({ secret: "must-not-be-read" }), "utf8");
    await unlink(path);
    await symlink(outside, path);

    await expect(artifacts.readCanonical("provider-configuration.json"))
      .rejects.toMatchObject({ code: "local_artifact_path_invalid" });
  });
});
