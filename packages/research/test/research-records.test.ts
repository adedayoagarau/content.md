import { describe, expect, it } from "vitest";
import {
  createObservedExpressionEvidenceRecord,
  createResearchAcquisitionManifest,
  evaluateResearchAcquisition,
} from "@contentmd/research";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";

const digest = "0".repeat(64);

function ref(recordId: string, schemaId: string) {
  return {
    record_id: recordId,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function record(schemaId: string, recordId: string, payload: unknown) {
  return {
    record_id: recordId,
    schema_id: schemaId,
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: digest,
    scope: {
      memory_scope: "project",
      project_id: "project.synthetic.research",
      resource_refs: ["research.batch.synthetic"],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [],
    lifecycle_state: "proposed",
    payload,
  };
}

function validResearchSourceRecord() {
  return record(
    SCHEMA_IDS.researchSource,
    "research_source.synthetic.public-system",
    {
      contract_version: "contentmd.research-source/0.1.0",
      requested_url: "https://example.invalid/start",
      canonical_url: "https://example.invalid/start",
      effective_url: "https://example.invalid/start",
      publisher: "Synthetic public-system fixture",
      title: "Synthetic task entry",
      accessed_at: "2026-08-22T19:00:00.000Z",
      access_method: "operator_directed_computer_use_public_web",
      body_retention_state: "body_not_retained",
      retained_content_digest: null,
      access_disposition: "public_unauthenticated",
      rights_disposition: "rights_unknown_evidence_only",
      profile_isolation_state: "established_signed_out_ephemeral",
      privacy_class: "public_no_personal_data",
      redirects: [],
      limitations: ["Synthetic fixture; no quality or approval claim."],
      authority_effect: "none",
    },
  );
}

function validBrowserObservationRecord() {
  return record(
    SCHEMA_IDS.browserObservation,
    "browser_observation.synthetic.validation",
    {
      contract_version: "contentmd.browser-observation/0.1.0",
      source_ref: ref("research_source.synthetic.public-system", SCHEMA_IDS.researchSource),
      surface: "public_web_form",
      journey: "application",
      state: "validation_error",
      channel: "web",
      locale: "en-GB",
      locator: "form > [data-synthetic-field]",
      capture_ref: null,
      bounded_span: "Synthetic validation message.",
      bounded_span_digest: digest,
      availability: "observed",
      direct_exercise_state: "directly_exercised_synthetic_input",
      observation_strength: "direct_visible_observation",
      evidence_dimensions: {
        behavior: "observed_direct",
        meaning: "inferred_from_visible_context",
        accessibility: "not_observed",
        localization: "not_observed",
        outcome: "not_observed",
      },
      taint_flags: [],
      limitations: ["No accessibility tree or product-outcome evidence."],
      authority_effect: "none",
    },
  );
}

function validObservedExpressionEvidenceRecord() {
  return record(
    SCHEMA_IDS.observedExpressionEvidence,
    "observed_expression.synthetic.validation",
    {
      contract_version: "contentmd.observed-expression-evidence/0.1.0",
      source_ref: ref("research_source.synthetic.public-system", SCHEMA_IDS.researchSource),
      observation_ref: ref(
        "browser_observation.synthetic.validation",
        SCHEMA_IDS.browserObservation,
      ),
      source_class: "other_product_public",
      bounded_span: "Synthetic validation message.",
      span_digest: digest,
      reuse_disposition: "evidence_only",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
      authority_effect: "none",
      rights_review_state: "not_established",
      distinctive_expression_fingerprint: digest,
      limitations: ["Public visibility does not establish reuse rights."],
    },
  );
}

describe("research record schemas", () => {
  it("accepts closed source and browser-observation records without conferring authority", () => {
    expect(validateRecord(
      SCHEMA_IDS.researchSource,
      validResearchSourceRecord(),
    )).toEqual({ valid: true, errors: [] });
    expect(validateRecord(
      SCHEMA_IDS.browserObservation,
      validBrowserObservationRecord(),
    )).toEqual({ valid: true, errors: [] });
  });

  it("rejects unknown browser fields instead of treating capture as approval", () => {
    const invalid = validBrowserObservationRecord();
    Object.assign(invalid.payload, { approved_for_reuse: true });

    const result = validateRecord(SCHEMA_IDS.browserObservation, invalid);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/additional properties/i);
  });

  it("locks other-product expressions to evidence-only, never-prompt, never-training use", () => {
    expect(validateRecord(
      SCHEMA_IDS.observedExpressionEvidence,
      validObservedExpressionEvidenceRecord(),
    )).toEqual({ valid: true, errors: [] });

    for (const mutation of [
      { reuse_disposition: "reusable" },
      { prompt_eligibility: "allowed" },
      { training_eligibility: "allowed" },
      { benchmark_eligibility: true },
      { authority_effect: "approved" },
    ]) {
      const invalid = validObservedExpressionEvidenceRecord();
      Object.assign(invalid.payload, mutation);
      expect(validateRecord(
        SCHEMA_IDS.observedExpressionEvidence,
        invalid,
      ).valid).toBe(false);
    }
  });

  it("rejects public visibility as a substitute for a rights disposition", () => {
    const invalid = validResearchSourceRecord();
    delete (invalid.payload as Record<string, unknown>).rights_disposition;

    const result = validateRecord(SCHEMA_IDS.researchSource, invalid);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/rights_disposition|required/i);
  });

  it("mints third-party expression evidence with non-overridable evidence-only defaults", () => {
    const attemptedOverride = {
      record_id: "observed_expression.synthetic.created",
      scope: validObservedExpressionEvidenceRecord().scope,
      provenance: [],
      lifecycle_state: "proposed",
      payload: {
        source_ref: ref("research_source.synthetic.public-system", SCHEMA_IDS.researchSource),
        observation_ref: ref(
          "browser_observation.synthetic.validation",
          SCHEMA_IDS.browserObservation,
        ),
        source_class: "other_product_public",
        bounded_span: "Synthetic validation message.",
        span_digest: digest,
        rights_review_state: "not_established",
        distinctive_expression_fingerprint: digest,
        limitations: ["Public visibility does not establish reuse rights."],
        prompt_eligibility: "allowed",
        training_eligibility: "allowed",
        benchmark_eligibility: true,
        authority_effect: "approved",
      },
    };
    const created = createObservedExpressionEvidenceRecord(
      attemptedOverride as unknown as Parameters<
        typeof createObservedExpressionEvidenceRecord
      >[0],
    );

    expect(created.payload).toMatchObject({
      reuse_disposition: "evidence_only",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
      authority_effect: "none",
    });
    expect(created.content_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(validateRecord(SCHEMA_IDS.observedExpressionEvidence, created)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("fails closed before Computer Use when isolation or current grants are missing", () => {
    const manifest = createResearchAcquisitionManifest({
      record_id: "research_acquisition.synthetic.blocked",
      scope: validResearchSourceRecord().scope,
      provenance: [],
      lifecycle_state: "proposed",
      payload: {
        contract_version: "contentmd.research-acquisition-manifest/0.1.0",
        batch_id: "VTM-01-synthetic",
        systems: ["Synthetic public system"],
        source_classes: ["official_ui"],
        state_slots: ["entry"],
        page_limit: 1,
        observation_limit: 1,
        allowed_origins: ["https://example.invalid"],
        allowed_routes: ["https://example.invalid/start"],
        profile_isolation_state: "not_established",
        runtime_verification_ref: null,
        external_research_grant_ref: null,
        capture_plan: ["Retain locators and digests only."],
        teardown_plan: ["Close the ephemeral profile."],
        no_login: true,
        no_account_creation: true,
        no_purchase: true,
        no_personal_data: true,
        no_submission: true,
        no_mutation: true,
        authority_effect: "none",
      },
    });

    expect(evaluateResearchAcquisition(manifest)).toEqual({
      allowed: false,
      reason: "profile_isolation_not_established",
      authority_effect: "none",
    });

    const isolated = createResearchAcquisitionManifest({
      record_id: manifest.record_id,
      scope: manifest.scope,
      provenance: manifest.provenance,
      lifecycle_state: manifest.lifecycle_state,
      payload: {
        ...manifest.payload,
        profile_isolation_state: "established_signed_out_ephemeral",
      },
    });
    expect(evaluateResearchAcquisition(isolated)).toEqual({
      allowed: false,
      reason: "runtime_verification_missing",
      authority_effect: "none",
    });

    const runtimeVerified = createResearchAcquisitionManifest({
      ...isolated,
      payload: {
        ...isolated.payload,
        runtime_verification_ref: ref(
          "verification.runtime.synthetic.current",
          SCHEMA_IDS.verificationReceipt,
        ),
      },
    });
    expect(evaluateResearchAcquisition(runtimeVerified)).toEqual({
      allowed: false,
      reason: "external_research_grant_missing",
      authority_effect: "none",
    });

    const authorized = createResearchAcquisitionManifest({
      ...runtimeVerified,
      payload: {
        ...runtimeVerified.payload,
        external_research_grant_ref: ref(
          "verification.research_external.synthetic.current",
          SCHEMA_IDS.verificationReceipt,
        ),
      },
    });
    expect(evaluateResearchAcquisition(authorized)).toEqual({
      allowed: true,
      reason: null,
      authority_effect: "none",
    });
  });

  it("rejects a digest-valid-looking manifest after any unsealed mutation", () => {
    const manifest = createResearchAcquisitionManifest({
      record_id: "research_acquisition.synthetic.tamper",
      scope: validResearchSourceRecord().scope,
      provenance: [],
      lifecycle_state: "proposed",
      payload: {
        contract_version: "contentmd.research-acquisition-manifest/0.1.0",
        batch_id: "VTM-01-synthetic-tamper",
        systems: ["Synthetic public system"],
        source_classes: ["official_ui"],
        state_slots: ["entry"],
        page_limit: 1,
        observation_limit: 1,
        allowed_origins: ["https://example.invalid"],
        allowed_routes: ["https://example.invalid/start"],
        profile_isolation_state: "established_signed_out_ephemeral",
        runtime_verification_ref: ref(
          "verification.runtime.synthetic.current",
          SCHEMA_IDS.verificationReceipt,
        ),
        external_research_grant_ref: ref(
          "verification.research_external.synthetic.current",
          SCHEMA_IDS.verificationReceipt,
        ),
        capture_plan: ["Retain locators and digests only."],
        teardown_plan: ["Close the ephemeral profile."],
        no_login: true,
        no_account_creation: true,
        no_purchase: true,
        no_personal_data: true,
        no_submission: true,
        no_mutation: true,
        authority_effect: "none",
      },
    });
    manifest.payload.page_limit = 2;

    expect(evaluateResearchAcquisition(manifest)).toEqual({
      allowed: false,
      reason: "manifest_digest_invalid",
      authority_effect: "none",
    });
  });
});
