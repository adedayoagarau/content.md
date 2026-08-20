import { createHash } from "node:crypto";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { ingestPatternPacket } from "@contentmd/research";

const packetRoot = fileURLToPath(
  new URL("../../../fixtures/frozen-pattern-packet/", import.meta.url),
);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

async function mutablePacket(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "contentmd-pattern-packet-"));
  temporaryDirectories.push(root);
  await cp(packetRoot, root, { recursive: true });
  return root;
}

async function refreshManifestDigest(root: string, path: string): Promise<void> {
  const manifestPath = join(root, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
    files: Array<{ path: string; sha256: string }>;
  };
  const file = manifest.files.find((item) => item.path === path);
  if (file === undefined) throw new Error(`missing manifest file ${path}`);
  file.sha256 = createHash("sha256").update(await readFile(join(root, path))).digest("hex");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

async function mutateFirstJsonLine(
  root: string,
  path: "patterns.jsonl" | "sources.jsonl",
  mutate: (record: Record<string, unknown>) => void,
): Promise<void> {
  const records = (await readFile(join(root, path), "utf8"))
    .trimEnd()
    .split("\n")
    .map((line) => JSON.parse(line) as Record<string, unknown>);
  mutate(records[0]!);
  await writeFile(join(root, path), `${records.map((record) => JSON.stringify(record)).join("\n")}\n`);
  await refreshManifestDigest(root, path);
}

describe("pattern packet ingestion", () => {
  it("ingests the frozen packet with complete source and transfer records", async () => {
    const result = await ingestPatternPacket(packetRoot);

    expect(result.packet_id).toBe("pattern-packet.synthetic-foundation.0.1");
    expect(result.sources).toHaveLength(4);
    expect(result.patterns).toHaveLength(4);
    expect(result.records).toHaveLength(4);
    expect(result.packet_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(result.patterns.every((pattern) => pattern.transfer_conditions.length > 0)).toBe(true);
    expect(result.records.every((record) => record.record_id.startsWith("pattern."))).toBe(true);
  });

  it("rejects a stale manifest digest", async () => {
    const root = await mutablePacket();
    await writeFile(join(root, "patterns.jsonl"), "\n", { flag: "a" });

    await expect(ingestPatternPacket(root)).rejects.toThrow("manifest_digest_mismatch:patterns.jsonl");
  });

  it("rejects missing provenance and unknown rights even with a refreshed digest", async () => {
    const missingLocator = await mutablePacket();
    await mutateFirstJsonLine(missingLocator, "sources.jsonl", (record) => {
      delete record.locator;
    });
    await expect(ingestPatternPacket(missingLocator)).rejects.toThrow("invalid_source_record:locator");

    const unknownRights = await mutablePacket();
    await mutateFirstJsonLine(unknownRights, "sources.jsonl", (record) => {
      record.rights_status = "unknown";
    });
    await expect(ingestPatternPacket(unknownRights)).rejects.toThrow("source_rights_status_not_permitted");
  });

  it("rejects a field that attempts to retain distinctive source expression", async () => {
    const root = await mutablePacket();
    await mutateFirstJsonLine(root, "patterns.jsonl", (record) => {
      record.distinctive_expression = "Copy this exact competitor tagline";
    });

    await expect(ingestPatternPacket(root)).rejects.toThrow("prohibited_distinctive_expression_field");
  });
});
