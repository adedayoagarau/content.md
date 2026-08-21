import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import { verifySourceLockContract } from "../../../scripts/generate-unicode-17-artifacts.mjs";
import {
  areNearDuplicates,
  normalizeForLeakage,
  scalarTrigramSet,
  verifyUnicodeArtifactBundle,
  type UnicodeArtifactBundle,
} from "../src/unicode-normalization.js";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const GENERATOR_PATH = `${ROOT}scripts/generate-unicode-17-artifacts.mjs`;
const ACQUISITION_PATH = `${ROOT}scripts/acquire-unicode-17-sources.mjs`;

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function readWorkspaceText(path: string): string {
  return readFileSync(`${ROOT}${path}`, "utf8");
}

function rawArtifact(path: string) {
  const bytes_utf8 = readWorkspaceText(path);
  return { path, bytes_utf8, raw_bytes_digest: sha256Utf8(bytes_utf8) };
}

function frozenArtifact(path: string) {
  const bytes_utf8 = readWorkspaceText(path);
  const parsed = JSON.parse(bytes_utf8) as { artifact_id: string; artifact_version: string };
  const raw_bytes_digest = sha256Utf8(bytes_utf8);
  return {
    path,
    bytes_utf8,
    raw_bytes_digest,
    artifact_ref: {
      artifact_id: parsed.artifact_id,
      artifact_version: parsed.artifact_version,
      artifact_digest: raw_bytes_digest,
    },
  };
}

function loadBundle(): UnicodeArtifactBundle {
  const preimage = {
    contract_version: "contentmd.unicode-artifact-bundle/0.1.0" as const,
    source_lock: rawArtifact("fixtures/learning-ranking/unicode-17-source-lock.json"),
    acquisition_receipt: rawArtifact("fixtures/learning-ranking/unicode-17-acquisition-receipt.json"),
    generator: rawArtifact("scripts/generate-unicode-17-artifacts.mjs"),
    normalization: frozenArtifact("fixtures/learning-ranking/unicode-17-normalization.json"),
    casefold: frozenArtifact("fixtures/learning-ranking/unicode-17-casefold.json"),
    whitespace: frozenArtifact("fixtures/learning-ranking/unicode-17-whitespace.json"),
    word_break: frozenArtifact("fixtures/learning-ranking/unicode-17-word-break.json"),
    grapheme_break: frozenArtifact("fixtures/learning-ranking/unicode-17-grapheme-break.json"),
  };
  return { ...preimage, bundle_digest: sha256Canonical(preimage) };
}

function refreshBundleDigest(bundle: UnicodeArtifactBundle): void {
  const { bundle_digest: _oldDigest, ...preimage } = bundle;
  bundle.bundle_digest = sha256Canonical(preimage);
}

function rewriteGeneratedArtifact(
  bundle: UnicodeArtifactBundle,
  key: "normalization" | "casefold" | "whitespace" | "word_break" | "grapheme_break",
  mutate: (artifact: Record<string, unknown>) => void,
): void {
  const witness = bundle[key];
  const artifact = JSON.parse(witness.bytes_utf8) as Record<string, unknown>;
  mutate(artifact);
  artifact.tables_digest = sha256Canonical(artifact.tables);
  witness.bytes_utf8 = canonicalJson(artifact);
  witness.raw_bytes_digest = sha256Utf8(witness.bytes_utf8);
  witness.artifact_ref.artifact_digest = witness.raw_bytes_digest;
  refreshBundleDigest(bundle);
}

describe("Unicode 17 leakage primitives", () => {
  it("forms distinct trigrams over Unicode scalars rather than UTF-16 code units", () => {
    expect(scalarTrigramSet([0x61, 0x1f600, 0x62, 0x61, 0x1f600, 0x62])).toEqual([
      "000061.01f600.000062",
      "000062.000061.01f600",
      "01f600.000062.000061",
    ]);
  });

  it("uses exact short-sequence equality and the integer seventeen-twentieths boundary", () => {
    expect(areNearDuplicates([0x61, 0x62], [0x61, 0x62])).toBe(true);
    expect(areNearDuplicates([0x61, 0x62], [0x61, 0x63])).toBe(false);
    expect(areNearDuplicates([0x61, 0x62], [0x61, 0x62, 0x63])).toBe(false);

    const twentyTrigrams = Array.from({ length: 22 }, (_, index) => 0x100 + index);
    expect(areNearDuplicates(twentyTrigrams, twentyTrigrams.slice(0, 19))).toBe(true);
    expect(areNearDuplicates(twentyTrigrams, twentyTrigrams.slice(0, 18))).toBe(false);
  });

  it("rejects non-scalars before producing trigram or similarity evidence", () => {
    expect(() => scalarTrigramSet([0x61, 0xd800, 0x62])).toThrowError(
      "task3_contract_invalid:unicode_scalar",
    );
    expect(() => areNearDuplicates([0x61, -1, 0x62], [0x61, -1, 0x62])).toThrowError(
      "task3_contract_invalid:unicode_scalar",
    );
  });
});

describe("frozen Unicode 17 artifact bundle", () => {
  it("verifies source locks, raw bytes, generated tables, and both conformance suites offline", () => {
    const verified = verifyUnicodeArtifactBundle(loadBundle());
    expect(verified.unicode_version).toBe("17.0.0");
    expect(verified.artifact_refs.map((ref) => ref.artifact_id)).toEqual([
      "unicode-normalization",
      "unicode-casefold",
      "unicode-whitespace",
      "unicode-word-break",
      "unicode-grapheme-break",
    ]);

    const result = spawnSync(process.execPath, [GENERATOR_PATH, "--check"], {
      cwd: ROOT,
      encoding: "utf8",
      env: { ...process.env, HTTPS_PROXY: "http://127.0.0.1:1", HTTP_PROXY: "http://127.0.0.1:1" },
      timeout: 120_000,
    });
    expect({ status: result.status, signal: result.signal, stderr: result.stderr }).toEqual({
      status: 0,
      signal: null,
      stderr: "",
    });
  }, 130_000);

  it("rejects one changed artifact byte even when the caller keeps the old digest", () => {
    const bundle = structuredClone(loadBundle());
    bundle.casefold.bytes_utf8 = `${bundle.casefold.bytes_utf8} `;
    expect(() => verifyUnicodeArtifactBundle(bundle)).toThrowError(
      "task3_contract_invalid:unicode_artifact",
    );
  });

  it("rejects reordered normalization data even when every caller-controlled digest is refreshed", () => {
    const bundle = loadBundle();
    rewriteGeneratedArtifact(bundle, "normalization", (artifact) => {
      const tables = artifact.tables as { composition_pairs: unknown[] };
      [tables.composition_pairs[0], tables.composition_pairs[1]] = [
        tables.composition_pairs[1],
        tables.composition_pairs[0],
      ];
    });
    expect(() => verifyUnicodeArtifactBundle(bundle)).toThrowError(
      "task3_contract_invalid:unicode_artifact",
    );
  });

  it.each([
    {
      label: "composition pair",
      key: "normalization" as const,
      mutate(artifact: Record<string, unknown>) {
        const tables = artifact.tables as { composition_pairs: Array<{ composite: number }> };
        tables.composition_pairs = tables.composition_pairs.filter((entry) => entry.composite !== 0x00c5);
      },
    },
    {
      label: "case-fold mapping",
      key: "casefold" as const,
      mutate(artifact: Record<string, unknown>) {
        const tables = artifact.tables as { mappings: unknown[] };
        tables.mappings.shift();
      },
    },
    {
      label: "whitespace range",
      key: "whitespace" as const,
      mutate(artifact: Record<string, unknown>) {
        const tables = artifact.tables as { ranges: unknown[] };
        tables.ranges.shift();
      },
    },
    {
      label: "word property",
      key: "word_break" as const,
      mutate(artifact: Record<string, unknown>) {
        const tables = artifact.tables as { property_ranges: Array<{ property: string }> };
        tables.property_ranges[0]!.property = "CR";
      },
    },
    {
      label: "grapheme property",
      key: "grapheme_break" as const,
      mutate(artifact: Record<string, unknown>) {
        const tables = artifact.tables as { property_ranges: Array<{ property: string }> };
        tables.property_ranges[0]!.property = "Other";
      },
    },
  ])("rejects a caller-rehashed removed or changed $label", ({ key, mutate }) => {
    const bundle = loadBundle();
    rewriteGeneratedArtifact(bundle, key, mutate);
    expect(() => verifyUnicodeArtifactBundle(bundle)).toThrowError(
      "task3_contract_invalid:unicode_artifact",
    );
  });

  it("makes the bounded acquisition immutable after its first successful run", () => {
    const beforeLock = sha256Utf8(readWorkspaceText("fixtures/learning-ranking/unicode-17-source-lock.json"));
    const beforeReceipt = sha256Utf8(readWorkspaceText("fixtures/learning-ranking/unicode-17-acquisition-receipt.json"));
    const result = spawnSync(process.execPath, [ACQUISITION_PATH], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 10_000,
    });
    expect(result.status).not.toBe(0);
    expect(sha256Utf8(readWorkspaceText("fixtures/learning-ranking/unicode-17-source-lock.json"))).toBe(beforeLock);
    expect(sha256Utf8(readWorkspaceText("fixtures/learning-ranking/unicode-17-acquisition-receipt.json"))).toBe(beforeReceipt);
  });
});

describe("exact Unicode 17 source-lock provenance", () => {
  function loadSourceLock(): Record<string, unknown> {
    return JSON.parse(readWorkspaceText("fixtures/learning-ranking/unicode-17-source-lock.json")) as Record<string, unknown>;
  }

  it("accepts only the complete exact frozen path universe", () => {
    expect(() => verifySourceLockContract(loadSourceLock())).not.toThrow();

    const omitted = loadSourceLock();
    (omitted.sources as unknown[]).pop();
    expect(() => verifySourceLockContract(omitted)).toThrow("unicode_artifact_generation_failed");

    const added = loadSourceLock();
    (added.sources as unknown[]).push({
      byte_count: 1,
      path: "arbitrary.txt",
      public_url: "https://www.unicode.org/Public/17.0.0/ucd/arbitrary.txt",
      raw_bytes_digest: "0".repeat(64),
    });
    expect(() => verifySourceLockContract(added)).toThrow("unicode_artifact_generation_failed");
  });

  it("rejects a substituted origin even when the rest of the entry is unchanged", () => {
    const substituted = loadSourceLock();
    const sources = substituted.sources as Array<Record<string, unknown>>;
    sources[0]!.public_url = "https://example.com/Public/17.0.0/ucd/CaseFolding.txt";
    expect(() => verifySourceLockContract(substituted)).toThrow("unicode_artifact_generation_failed");
  });
});

describe("Unicode 17 leakage normalization", () => {
  it("applies frozen NFKC, full default case folding, whitespace collapse, and trim", () => {
    const verified = verifyUnicodeArtifactBundle(loadBundle());
    const scalars = normalizeForLeakage("\u2003\u2163 Straße\u0085\ud835\udd38\u2003", verified);
    expect(String.fromCodePoint(...scalars)).toBe("iv strasse a");
  });

  it("orders and composes combining marks and composes Hangul without host normalization", () => {
    const verified = verifyUnicodeArtifactBundle(loadBundle());
    const originalNormalize = String.prototype.normalize;
    Object.defineProperty(String.prototype, "normalize", {
      configurable: true,
      value() {
        throw new Error("host normalization must not run");
      },
    });
    try {
      expect(String.fromCodePoint(...normalizeForLeakage("A\u030a", verified))).toBe("å");
      expect(normalizeForLeakage("\u1100\u1161", verified)).toEqual([0xac00]);
    } finally {
      Object.defineProperty(String.prototype, "normalize", {
        configurable: true,
        value: originalNormalize,
      });
    }
  });

  it("uses the default non-Turkic full fold and no implicit post-fold normalization", () => {
    const verified = verifyUnicodeArtifactBundle(loadBundle());
    expect(normalizeForLeakage("\u0130", verified)).toEqual([0x69, 0x307]);
  });

  it("collapses every frozen White_Space range", () => {
    const bundle = loadBundle();
    const verified = verifyUnicodeArtifactBundle(bundle);
    const whitespace = JSON.parse(bundle.whitespace.bytes_utf8) as {
      tables: { ranges: Array<{ start: number; end: number }> };
    };
    for (const range of whitespace.tables.ranges) {
      expect(String.fromCodePoint(...normalizeForLeakage(`a${String.fromCodePoint(range.start)}b`, verified))).toBe("a b");
      expect(String.fromCodePoint(...normalizeForLeakage(`a${String.fromCodePoint(range.end)}b`, verified))).toBe("a b");
    }
  });

  it("rejects lone UTF-16 surrogates rather than replacing them", () => {
    const verified = verifyUnicodeArtifactBundle(loadBundle());
    expect(() => normalizeForLeakage("a\ud800b", verified)).toThrowError(
      "task3_contract_invalid:unicode_scalar",
    );
    expect(() => normalizeForLeakage("a\udc00b", verified)).toThrowError(
      "task3_contract_invalid:unicode_scalar",
    );
  });
});

describe("canonical fixture bytes", () => {
  it("serializes every generated artifact as canonical JSON with one trailing LF", () => {
    for (const path of [
      "fixtures/learning-ranking/unicode-17-source-lock.json",
      "fixtures/learning-ranking/unicode-17-acquisition-receipt.json",
      "fixtures/learning-ranking/unicode-17-normalization.json",
      "fixtures/learning-ranking/unicode-17-casefold.json",
      "fixtures/learning-ranking/unicode-17-whitespace.json",
      "fixtures/learning-ranking/unicode-17-word-break.json",
      "fixtures/learning-ranking/unicode-17-grapheme-break.json",
    ]) {
      const bytes = readWorkspaceText(path);
      expect(bytes).toBe(canonicalJson(JSON.parse(bytes)));
    }
  });
});
