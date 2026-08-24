import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { verifyRecordDigest } from "@contentmd/core";
import { createResearchAcquisitionManifest } from "@contentmd/research";
import {
  BrowserEvidenceNormalizer,
  type RecordedComputerUseCapture,
} from "../src/index.js";

const fixturePath = fileURLToPath(new URL(
  "../../../fixtures/voice-tone-research/govuk-passport-recorded-capture.json",
  import.meta.url,
));

async function capture(): Promise<RecordedComputerUseCapture> {
  return JSON.parse(await readFile(fixturePath, "utf8")) as RecordedComputerUseCapture;
}

function nonconformingManifest() {
  return createResearchAcquisitionManifest({
    record_id: "research_acquisition.vtm_01.synthetic_adapter",
    scope: {
      memory_scope: "project",
      project_id: "project.synthetic.research",
      resource_refs: ["research.batch.vtm_01"],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.research-acquisition-manifest/0.1.0",
      batch_id: "vtm_01",
      systems: ["govuk-passport-synthetic-normalization"],
      source_classes: ["official_ui"],
      state_slots: ["entry", "eligibility_question", "data_entry", "empty_submit_validation"],
      page_limit: 1,
      observation_limit: 4,
      allowed_origins: ["https://www.gov.uk"],
      allowed_routes: [
        "https://www.gov.uk/apply-renew-passport",
        "https://www.gov.uk/passport-advice"
      ],
      profile_isolation_state: "not_established",
      runtime_verification_ref: null,
      external_research_grant_ref: null,
      capture_plan: ["Retain bounded locators and spans only."],
      teardown_plan: ["Close the ephemeral profile and discard browser state."],
      no_login: true,
      no_account_creation: true,
      no_purchase: true,
      no_personal_data: true,
      no_submission: true,
      no_mutation: true,
      authority_effect: "none",
    },
  });
}

describe("BrowserEvidenceNormalizer", () => {
  it("separates source and observations while preserving exact routes and locators", async () => {
    const manifest = nonconformingManifest();
    const recorded = await capture();
    const original = structuredClone(recorded);

    const result = new BrowserEvidenceNormalizer().normalize(manifest, recorded);

    expect(recorded).toEqual(original);
    expect(result.source.payload).toMatchObject({
      requested_url: "https://www.gov.uk/passport-advice",
      canonical_url: "https://www.gov.uk/apply-renew-passport",
      effective_url: "https://www.gov.uk/apply-renew-passport",
      redirects: ["https://www.gov.uk/apply-renew-passport"],
      body_retention_state: "body_not_retained",
      retained_content_digest: null,
      authority_effect: "none",
    });
    expect(result.observations).toHaveLength(4);
    expect(result.observations.map((record) => record.payload.locator)).toEqual([
      "main a[data-synthetic-start]",
      "main fieldset[data-synthetic-residence]",
      "main input[data-synthetic-date]",
      "main [data-synthetic-error-summary]",
    ]);
    expect(result.batch_manifest.payload).toMatchObject({
      protocol_conformance: "nonconforming_profile",
      controlled_corpus_eligibility: false,
      authority_effect: "none",
      counts: { sources: 1, observations: 4, claims: 0, expressions: 0, patterns: 0 },
    });
  });

  it("produces byte-stable digest-valid records from identical inputs", async () => {
    const manifest = nonconformingManifest();
    const recorded = await capture();
    const normalizer = new BrowserEvidenceNormalizer();

    const first = normalizer.normalize(manifest, recorded);
    const second = normalizer.normalize(manifest, structuredClone(recorded));

    expect(second).toEqual(first);
    expect(verifyRecordDigest(first.source)).toEqual({ valid: true });
    for (const observation of first.observations) {
      expect(verifyRecordDigest(observation)).toEqual({ valid: true });
    }
    expect(verifyRecordDigest(first.batch_manifest)).toEqual({ valid: true });
  });

  it("rejects a capture that escapes the manifest route allowlist", async () => {
    const recorded = await capture();
    recorded.effective_url = "https://example.com/unapproved";

    expect(() => new BrowserEvidenceNormalizer().normalize(
      nonconformingManifest(),
      recorded,
    )).toThrow("recorded_capture_invalid:effective_url_not_allowed");
  });
});
