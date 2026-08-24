import { describe, expect, it } from "vitest";
import { createResearchAcquisitionManifest } from "@contentmd/research";
import { SCHEMA_IDS } from "@contentmd/schemas";
import {
  verifyRecordedCaptureAcquisition,
  type RecordedComputerUseCapture,
} from "../src/index.js";

const digest = "0".repeat(64);

function verificationRef(recordId: string) {
  return {
    record_id: recordId,
    schema_id: SCHEMA_IDS.verificationReceipt,
    schema_version: "0.1.0" as const,
    content_digest: digest,
  };
}

function manifest(profileIsolationState: "established_signed_out_ephemeral" | "not_established") {
  return createResearchAcquisitionManifest({
    record_id: "research_acquisition.vtm_01.synthetic",
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
      profile_isolation_state: profileIsolationState,
      runtime_verification_ref: profileIsolationState === "established_signed_out_ephemeral"
        ? verificationRef("verification.runtime.synthetic.current")
        : null,
      external_research_grant_ref: profileIsolationState === "established_signed_out_ephemeral"
        ? verificationRef("verification.research_external.synthetic.current")
        : null,
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

function capture(profileIsolationState: "established_signed_out_ephemeral" | "not_established") {
  return {
    contract_version: "contentmd.recorded-computer-use-capture/0.1.0",
    capture_id: "govuk-passport-synthetic-normalization",
    captured_at: "2026-08-20T19:00:00.000Z",
    requested_url: "https://www.gov.uk/passport-advice",
    canonical_url: "https://www.gov.uk/apply-renew-passport",
    effective_url: "https://www.gov.uk/apply-renew-passport",
    redirects: ["https://www.gov.uk/apply-renew-passport"],
    publisher: "GOV.UK synthetic normalization fixture",
    title: "Synthetic passport journey validation fixture",
    access_method: "recorded_fixture",
    access_disposition: "public_unauthenticated",
    rights_disposition: "rights_unknown_evidence_only",
    profile_isolation_state: profileIsolationState,
    privacy_class: "public_no_personal_data",
    body_retained: false,
    capture_disposition: {
      controlled_corpus_eligibility: false,
      benchmark_eligibility: false,
      source_evidence_effect: "none",
    },
    observations: [],
    limitations: ["Synthetic fixture."],
  } satisfies RecordedComputerUseCapture;
}

describe("recorded capture acquisition gate", () => {
  it("accepts only a capture matching a passing signed-out ephemeral manifest", () => {
    expect(verifyRecordedCaptureAcquisition(
      manifest("established_signed_out_ephemeral"),
      capture("established_signed_out_ephemeral"),
    )).toEqual({ allowed: true, reason: null, authority_effect: "none" });
  });

  it("downgrades a personal-profile capture without converting it into controlled evidence", () => {
    expect(verifyRecordedCaptureAcquisition(
      manifest("not_established"),
      capture("not_established"),
    )).toEqual({
      allowed: false,
      reason: "profile_isolation_not_established",
      authority_effect: "none",
    });
  });
});
