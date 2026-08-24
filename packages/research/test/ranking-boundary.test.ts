import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  createProjectOwnedComparisonCorpus,
  verifyVoiceToneComparisonCorpus,
} from "@contentmd/research";

function jsonl<T>(path: string): T[] {
  return readFileSync(resolve(path), "utf8")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as T);
}

describe("project-owned voice comparison corpus", () => {
  it("builds 100 blind pairs across 30 leakage groups with no external authority", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const verification = verifyVoiceToneComparisonCorpus(corpus, []);

    expect(corpus.comparisons).toHaveLength(100);
    expect(corpus.leakage_groups).toHaveLength(30);
    expect(corpus.rights_records).toHaveLength(200);
    expect(verification).toEqual({
      valid: true,
      pair_count: 100,
      leakage_group_count: 30,
      candidate_count: 200,
      authority_effect: "none",
    });
    for (const comparison of corpus.comparisons) {
      expect(comparison.candidate_a.candidate_kind).toBe("project_owned_synthetic");
      expect(comparison.candidate_b.candidate_kind).toBe("project_owned_synthetic");
      expect(comparison.candidate_a.voice_tone_features).toHaveLength(9);
      expect(comparison.candidate_b.voice_tone_features).toHaveLength(9);
      expect(comparison.third_party_evidence_refs).toEqual([]);
    }
  });

  it("is byte-deterministic and matches the checked-in fixture packet", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    expect(createProjectOwnedComparisonCorpus()).toEqual(corpus);

    expect(jsonl("fixtures/voice-tone-research/project-owned-comparisons.jsonl"))
      .toEqual(corpus.comparisons);
    expect(jsonl("fixtures/voice-tone-research/leakage-groups.jsonl"))
      .toEqual(corpus.leakage_groups);
    expect(jsonl("fixtures/voice-tone-research/rights-register.jsonl"))
      .toEqual(corpus.rights_records);
    expect(JSON.parse(readFileSync(
      resolve("fixtures/voice-tone-research/comparison-manifest.json"),
      "utf8",
    ))).toEqual(corpus.manifest);
  });

  it("rejects non-project candidates, stale digests, and incomplete leakage groups", () => {
    const nonProject = structuredClone(createProjectOwnedComparisonCorpus());
    nonProject.comparisons[0]!.candidate_a.candidate_kind = "browser_observed" as "project_owned_synthetic";
    expect(() => verifyVoiceToneComparisonCorpus(nonProject, []))
      .toThrow("voice_comparison_not_project_owned");

    const stale = structuredClone(createProjectOwnedComparisonCorpus());
    stale.comparisons[0]!.candidate_a.expression += " changed";
    expect(() => verifyVoiceToneComparisonCorpus(stale, []))
      .toThrow("voice_comparison_digest_invalid");

    const incomplete = structuredClone(createProjectOwnedComparisonCorpus());
    incomplete.leakage_groups.pop();
    const { manifest_digest: _digest, ...manifestPreimage } = incomplete.manifest;
    incomplete.manifest = {
      ...manifestPreimage,
      leakage_group_count: 29,
      files: {
        ...manifestPreimage.files,
        leakage_groups: {
          ...manifestPreimage.files.leakage_groups,
          raw_bytes_digest: sha256Canonical(incomplete.leakage_groups),
        },
      },
      manifest_digest: "0".repeat(64),
    };
    incomplete.manifest.manifest_digest = sha256Canonical((({ manifest_digest: _drop, ...rest }) => rest)(
      incomplete.manifest,
    ));
    expect(() => verifyVoiceToneComparisonCorpus(incomplete, []))
      .toThrow(/voice_comparison_(manifest|leakage)_invalid/);
  });

  it("uses canonical JSONL bytes for every artifact digest", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    expect(canonicalJson(corpus.manifest)).toBe(readFileSync(
      resolve("fixtures/voice-tone-research/comparison-manifest.json"),
      "utf8",
    ));
  });
});
