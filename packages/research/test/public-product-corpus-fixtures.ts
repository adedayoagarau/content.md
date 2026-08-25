import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  authorizeOperation,
  issueReviewerQualification,
  type AuthorizationInput,
  type AuthorizationReplay,
  type GovernancePolicy,
  type ReviewerQualificationMaterial,
  type ReviewerRole,
} from "@contentmd/governance";
import {
  PUBLIC_PRODUCT_COVERAGE_SLOTS,
  createPublicProductReviewReceipt,
  sha256Bytes,
  type ExperienceMapping,
  type PublicEvidenceDispositionEvent,
  type PublicEvidenceDispositionSet,
  type PublicEvidenceSubjectRef,
  type NormalizedStructuralSignature,
  type PublicProductBatchBytes,
  type PublicProductDigestRef,
  type PublicProductExperienceTaxonomy,
  type PublicProductReviewGovernanceEvidence,
  type PublicProductReviewReceipt,
  type PublicProductTaxonomyDefinition,
  type RawStructuralSignature,
  type VerifyPublicProductCorpusV2Input,
} from "@contentmd/research";

export const projectionAsOf = "2026-08-24T20:00:00.000Z";
const reviewedAt = "2026-08-24T19:00:00.000Z";
const limits = { calls: 1, bytes: 16_384, duration_ms: 1_000, records: 1, model_tokens: 0, browser_actions: 0, retries: 0 };
const mappingItems = ["raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit", "content_slot_fit", "channel_fit", "counterexample_sufficiency", "industry_neutrality", "localization_transferability", "rights_safe_abstraction"] as const;
const taxonomyItems = ["definition_completeness", "semantic_id_stability", "mapping_set_completeness", "previous_version_compatibility", "effective_time_validity", "review_closure", "no_authority_or_learning_widening"] as const;

function scalar(left: string, right: string): number {
  const a = [...left].map((value) => value.codePointAt(0)!);
  const b = [...right].map((value) => value.codePointAt(0)!);
  for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
    const difference = a[index]! - b[index]!;
    if (difference !== 0) return difference;
  }
  return a.length - b.length;
}

function ref(object_id: string, object_digest: string): PublicProductDigestRef {
  return { object_id, object_digest };
}

function policy(action: string): GovernancePolicy {
  return {
    policy_id: `policy.${action}`, policy_version: 1, status: "current",
    effective_at: "2026-08-24T00:00:00.000Z", expires_at: "2026-08-25T00:00:00.000Z",
    allowed_actions: [action], denied_actions: [], review_actions: [],
    allowed_adapters: ["adapter.governance.reviewer-qualification"], denied_adapters: [],
    permitted_data_classes: ["governance-metadata"], denied_data_classes: [], permitted_egress: ["none"],
    max_limits: { ...limits }, human_approval_actions: [action],
    required_control_types: ["data_processing", "durable_memory", "telemetry"],
  };
}

function qualification(number: number, role: ReviewerRole) {
  const material: ReviewerQualificationMaterial = {
    record_mode: "governed", reviewer_ref: ref(`reviewer.projection.${number}`, String(number).repeat(64)),
    eligible_roles: [role], qualified_objectives: ["public_product_review"],
    authorized_resource_scopes: ["public-product-corpus", "public-product-taxonomy"],
    effective_at: "2026-08-24T00:00:00.000Z", expires_at: "2026-08-25T00:00:00.000Z",
    issuer_principal_ref: "principal.public-product-governance",
  };
  const materialDigest = sha256Canonical(material);
  const action = "issue_reviewer_qualification";
  const operationId = `operation.${action}.${number}`;
  const input: AuthorizationInput = {
    now: reviewedAt,
    request: { operation_id: operationId, intent: "enforce", action, adapter_id: "adapter.governance.reviewer-qualification", resource_scope: [...material.authorized_resource_scopes], data_classes: ["governance-metadata"], egress: "none", requested_limits: { ...limits }, approval_class: "semantic_decision", requires_readback: false, subject_digest: materialDigest },
    policies: [policy(action)],
    capability_grant: { grant_id: `grant.projection.${number}`, principal_ref: material.issuer_principal_ref, workload_ref: "workload.contentmd.projection-review", action, adapter_id: "adapter.governance.reviewer-qualification", resource_scope: [...material.authorized_resource_scopes], data_classes: ["governance-metadata"], egress: "none", max_limits: { ...limits }, issued_at: "2026-08-24T18:00:00.000Z", expires_at: "2026-08-24T21:00:00.000Z", revocation_state: "current" },
    approval: { approval_id: `approval.projection.${number}`, approval_class: "semantic_decision", subject_ref: operationId, subject_digest: materialDigest, status: "issued", issued_at: "2026-08-24T18:30:00.000Z", expires_at: "2026-08-24T21:00:00.000Z", revocation_state: "current" },
    control_dispositions: [
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Governance metadata." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Auditable review." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Minimized audit." },
    ],
    verification_plan_ref: null, reliability_evidence: null,
  };
  const issuance: AuthorizationReplay = { input, expected_decision: authorizeOperation(input) };
  return { record: issueReviewerQualification({ material, issuance, revocation: null, as_of: reviewedAt }), issuance };
}

function definition(id: string): PublicProductTaxonomyDefinition {
  const preimage = { definition_id: id, display_name: id, description: `Definition ${id}.`, inclusion_rule: `Include direct ${id}.`, exclusion_rule: `Exclude inferred ${id}.`, counterexample_refs: [] as PublicProductDigestRef[] };
  return { ...preimage, definition_digest: sha256Canonical(preimage) };
}

export function rawSignature(index = 0): RawStructuralSignature {
  return { journey: `journey-${index}`, event_state: `state-${index}`, content_slot_type: `slot-${index}`, surface_channel: "web" };
}

function normalized(index: number): NormalizedStructuralSignature {
  return { coverage_slot_id: PUBLIC_PRODUCT_COVERAGE_SLOTS[index % PUBLIC_PRODUCT_COVERAGE_SLOTS.length]!, journey_family_id: "journey.generic", state_class_id: "state.generic", content_slot_class_id: "content.generic", surface_channel_id: "channel.web" };
}

function receiptRef(receipt: PublicProductReviewReceipt): PublicProductDigestRef {
  return ref(receipt.receipt_id, receipt.receipt_digest);
}

function governance(qualifications: readonly ReturnType<typeof qualification>[], receipts: readonly PublicProductReviewReceipt[]): PublicProductReviewGovernanceEvidence {
  const records = qualifications.map((item) => item.record).sort((a, b) => scalar(a.qualification_id, b.qualification_id));
  const replays = qualifications.map((item) => ({ qualification_id: item.record.qualification_id, issuance: item.issuance, revocation: null })).sort((a, b) => scalar(a.qualification_id, b.qualification_id));
  const sortedReceipts = [...receipts].sort((a, b) => scalar(a.receipt_id, b.receipt_id));
  const preimage = { contract_version: "contentmd.public-product-review-governance/0.1.0" as const, as_of: projectionAsOf, qualifications: records, qualification_replays: replays, receipts: sortedReceipts };
  return { ...preimage, governance_digest: sha256Canonical(preimage) };
}

function taxonomy(mappingCount: number, singleSlot: boolean) {
  const designer = qualification(1, "qualified_content_designer");
  const steward = qualification(2, "taxonomy_steward");
  const receipts: PublicProductReviewReceipt[] = [];
  const mappings: ExperienceMapping[] = [];
  for (let index = 0; index < mappingCount; index += 1) {
    const material = { raw_signature: rawSignature(index), normalized_signature: normalized(singleSlot ? 0 : index), rationale: `Reviewed mapping ${index}.`, counterexample_refs: [] as PublicProductDigestRef[] };
    const materialDigest = sha256Canonical(material);
    const subject = ref(`mapping-material.${materialDigest}`, materialDigest);
    const pair = ([designer, steward] as const).map((reviewer, reviewerIndex) => createPublicProductReviewReceipt({
      record_mode: "official", review_kind: "taxonomy_mapping", subject_ref: subject,
      qualification: reviewer.record, reviewer_role: reviewerIndex === 0 ? "qualified_content_designer" : "taxonomy_steward",
      checklist_version: "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0",
      checklist_results: mappingItems.map((item) => ({ item, status: "pass" as const })), decision: "pass", reviewed_at: reviewedAt,
    })) as [PublicProductReviewReceipt, PublicProductReviewReceipt];
    receipts.push(...pair);
    const refs = pair.map(receiptRef) as [PublicProductDigestRef, PublicProductDigestRef];
    const identity = { mapping_material_digest: materialDigest, review_receipt_refs: refs };
    const preimage = { mapping_id: `experience-mapping.${sha256Canonical(identity)}`, ...material, mapping_material_digest: materialDigest, review_receipt_refs: refs };
    mappings.push({ ...preimage, mapping_digest: sha256Canonical(preimage) });
  }
  mappings.sort((a, b) => scalar(a.mapping_id, b.mapping_id));
  const coverage = PUBLIC_PRODUCT_COVERAGE_SLOTS.map(definition);
  const material = { contract_version: "contentmd.public-product-experience-taxonomy/0.1.0" as const, taxonomy_version: "2026-08-24.1", previous_taxonomy_ref: null, effective_at: reviewedAt, coverage_slots: coverage, journey_families: [definition("journey.generic")], state_classes: [definition("state.generic")], content_slot_classes: [definition("content.generic")], surface_channels: [definition("channel.web")], mappings };
  const materialDigest = sha256Canonical(material);
  const subject = ref(`taxonomy-material.${materialDigest}`, materialDigest);
  const taxonomyPair = ([designer, steward] as const).map((reviewer, reviewerIndex) => createPublicProductReviewReceipt({
    record_mode: "official", review_kind: "taxonomy_version", subject_ref: subject,
    qualification: reviewer.record, reviewer_role: reviewerIndex === 0 ? "qualified_content_designer" : "taxonomy_steward",
    checklist_version: "contentmd.public-product-review-checklist.taxonomy-version/0.1.0",
    checklist_results: taxonomyItems.map((item) => ({ item, status: "pass" as const })), decision: "pass", reviewed_at: reviewedAt,
  })) as [PublicProductReviewReceipt, PublicProductReviewReceipt];
  receipts.push(...taxonomyPair);
  const mappingRefs = mappings.flatMap((mapping) => [...mapping.review_receipt_refs]).sort((a, b) => scalar(`${a.object_id}\0${a.object_digest}`, `${b.object_id}\0${b.object_digest}`));
  const taxonomyRefs = taxonomyPair.map(receiptRef) as [PublicProductDigestRef, PublicProductDigestRef];
  const identity = { taxonomy_material_digest: materialDigest, mapping_review_receipt_refs: mappingRefs, taxonomy_review_receipt_refs: taxonomyRefs };
  const preimage = { contract_version: material.contract_version, taxonomy_id: `public-product-experience-taxonomy.${sha256Canonical(identity)}`, taxonomy_version: material.taxonomy_version, previous_taxonomy_ref: null, effective_at: material.effective_at, coverage_slots: coverage, journey_families: material.journey_families, state_classes: material.state_classes, content_slot_classes: material.content_slot_classes, surface_channels: material.surface_channels, mappings, mapping_review_receipt_refs: mappingRefs, taxonomy_review_receipt_refs: taxonomyRefs, taxonomy_material_digest: materialDigest, classification_effect: "corpus_projection_only" as const, authority_effect: "none" as const, prompt_eligibility: "never" as const, training_eligibility: "never" as const, benchmark_eligibility: false as const };
  return { taxonomy: { ...preimage, taxonomy_digest: sha256Canonical(preimage) } satisfies PublicProductExperienceTaxonomy, governance: governance([designer, steward], receipts) };
}

function line(value: unknown): Uint8Array {
  return new TextEncoder().encode(canonicalJson(value));
}

function source(index: number, sourceClass = "actual UI") {
  return { source_id: `source-${index}`, company: "Example Co", product_system: "Example Product", industry: "test industry", source_url: `https://example.com/source-${index}`, canonical_url: `https://example.com/canonical-${index}`, accessed_at: "2026-08-24T18:00:00.000Z", source_class: sourceClass, title: `Source ${index}`, publisher: "Example Co", access_method: "Signed-out public read-only observation", rights_boundary: "public page; evidence only", freshness: "observed 2026-08-24" };
}

function observation(index: number, observed = "observed_ui") {
  const raw = rawSignature(index);
  return { observation_id: `observation-${index}`, source_id: `source-${index}`, company: "Example Co", product_system: "Example Product", industry_stratum: "test industry", product_area: "account", journey: raw.journey, event_state: raw.event_state, trigger: "public entry", user_goal: "complete a task", system_status: "ready", consequence_risk: "wrong route", surface_channel: raw.surface_channel, locale_market: "US English", content_slot_type: raw.content_slot_type, exact_wording_span: "Continue", visible_action_recovery: "leave", terminology_entities: ["Account"], content_object_schema_hypothesis: "entry state", accessibility_localization_evidence: "heading", provenance_freshness: "observed 2026-08-24", access_rights_boundary: "public page; evidence only", observed_vs_inferred: observed, evidence_strength: "high", authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false };
}

export function projectionFixture(
  count = 5,
  singleSlot = false,
  options: { source_class?: string; observed_vs_inferred?: string } = {},
): VerifyPublicProductCorpusV2Input {
  const reviewed = taxonomy(count, singleSlot);
  const batches: PublicProductBatchBytes[] = [
    { batch_id: "batch-a", source_lines: [], observation_lines: [] },
    { batch_id: "batch-b", source_lines: [], observation_lines: [] },
  ];
  for (let index = 0; index < count; index += 1) {
    const batch = batches[index % 2]!;
    (batch.source_lines as Uint8Array[]).push(line(source(index, options.source_class)));
    (batch.observation_lines as Uint8Array[]).push(line(observation(index, options.observed_vs_inferred)));
  }
  return {
    batches, industry_taxonomy_bytes: line({ contract_version: "contentmd.public-product-industry-taxonomy/0.1.0", industries: [{ industry_id: "test_industry", name: "Test industry", aliases: ["test industry"] }], authority_effect: "none" }),
    taxonomy: reviewed.taxonomy, disposition_sets: [], disposition_events: [], review_governance: reviewed.governance,
    as_of: projectionAsOf, targets: { companies: 1, products: 1, industries: 1, direct_states_per_product: count }, verification_mode: "official",
  };
}

function subjectIdentity(refValue: PublicEvidenceSubjectRef): string {
  return `${refValue.batch_id}\0${refValue.record_kind}\0${refValue.record_id}\0${refValue.record_digest}`;
}

function dispositionFirstObservation(
  input: VerifyPublicProductCorpusV2Input,
  state: "held" | "superseded",
): VerifyPublicProductCorpusV2Input {
  const result = structuredClone(input);
  const batch = result.batches.find((item) => item.observation_lines.length > 0)!;
  const bytes = batch.observation_lines[0]!;
  const record = JSON.parse(new TextDecoder().decode(bytes)) as { observation_id: string };
  const subject: PublicEvidenceSubjectRef = {
    batch_id: batch.batch_id, record_kind: "observation", record_id: record.observation_id,
    record_digest: sha256Bytes(bytes),
  };
  const replacementRefs: PublicEvidenceSubjectRef[] = [];
  if (state === "superseded") {
    const replacementBatch = result.batches.find((item) => item.observation_lines.some((lineBytes) => {
      const parsed = JSON.parse(new TextDecoder().decode(lineBytes)) as { observation_id: string };
      return parsed.observation_id !== record.observation_id;
    }))!;
    const replacementBytes = replacementBatch.observation_lines.find((lineBytes) => {
      const parsed = JSON.parse(new TextDecoder().decode(lineBytes)) as { observation_id: string };
      return parsed.observation_id !== record.observation_id;
    })!;
    const replacement = JSON.parse(new TextDecoder().decode(replacementBytes)) as { observation_id: string };
    replacementRefs.push({ batch_id: replacementBatch.batch_id, record_kind: "observation", record_id: replacement.observation_id, record_digest: sha256Bytes(replacementBytes) });
  }
  const steward = qualification(3, "corpus_steward");
  const independent = qualification(4, "independent_corpus_reviewer");
  const transition = {
    subject_ref: subject, expected_previous_event_digest: null, expected_next_sequence: 1,
    state, reason_code: state === "held" ? "review_pending" as const : "superseded_by_corrected_evidence" as const,
    replacement_refs: replacementRefs, bounded_note: null,
    effective_at: "2026-08-24T19:30:00.000Z",
  };
  const setIdentity = { base_ledger_head: null, as_of: projectionAsOf, proposed_transitions: [transition] };
  const setPreimage = { contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0" as const, disposition_set_id: `public-product-evidence-disposition-set.${sha256Canonical(setIdentity)}`, ...setIdentity };
  const set: PublicEvidenceDispositionSet = { ...setPreimage, set_digest: sha256Canonical(setPreimage) };
  const setRef = ref(set.disposition_set_id, set.set_digest);
  const checklist = ["subject_accuracy", "transition_legality", "reason_fit", "replacement_validity", "rights_or_projection_safety", "complete_set_review"] as const;
  const pair = ([steward, independent] as const).map((reviewer, index) => createPublicProductReviewReceipt({
    record_mode: "official", review_kind: "evidence_disposition_set", subject_ref: setRef,
    qualification: reviewer.record, reviewer_role: index === 0 ? "corpus_steward" : "independent_corpus_reviewer",
    checklist_version: "contentmd.public-product-review-checklist.evidence-disposition-set/0.1.0",
    checklist_results: checklist.map((item) => ({ item, status: "pass" as const })), decision: "pass", reviewed_at: reviewedAt,
  })) as [PublicProductReviewReceipt, PublicProductReviewReceipt];
  const eventMaterial = {
    contract_version: "contentmd.public-product-evidence-disposition/0.1.0" as const,
    disposition_set_ref: setRef, subject_ref: subject, previous_event_digest: null, sequence: 1,
    state: transition.state, reason_code: transition.reason_code, replacement_refs: transition.replacement_refs,
    bounded_note: null, decided_at: reviewedAt, effective_at: transition.effective_at,
    review_receipt_refs: pair.map(receiptRef) as [PublicProductDigestRef, PublicProductDigestRef],
    disposition_effect: "corpus_projection_only" as const, authority_effect: "none" as const,
    prompt_eligibility: "never" as const, training_eligibility: "never" as const, benchmark_eligibility: false as const,
  };
  const eventPreimage = { ...eventMaterial, disposition_event_id: `public-product-evidence-disposition.${sha256Canonical(eventMaterial)}` };
  const event: PublicEvidenceDispositionEvent = { ...eventPreimage, event_digest: sha256Canonical(eventPreimage) };
  const qualifications = [...result.review_governance.qualifications, steward.record, independent.record].sort((a, b) => scalar(a.qualification_id, b.qualification_id));
  const replays = [...result.review_governance.qualification_replays,
    { qualification_id: steward.record.qualification_id, issuance: steward.issuance, revocation: null },
    { qualification_id: independent.record.qualification_id, issuance: independent.issuance, revocation: null },
  ].sort((a, b) => scalar(a.qualification_id, b.qualification_id));
  const receipts = [...result.review_governance.receipts, ...pair].sort((a, b) => scalar(a.receipt_id, b.receipt_id));
  const governancePreimage = { contract_version: "contentmd.public-product-review-governance/0.1.0" as const, as_of: projectionAsOf, qualifications, qualification_replays: replays, receipts };
  result.review_governance = { ...governancePreimage, governance_digest: sha256Canonical(governancePreimage) };
  result.disposition_sets = [set];
  result.disposition_events = [event];
  if (subjectIdentity(subject) === "") throw new Error("unreachable");
  return result;
}

export function holdFirstObservation(input: VerifyPublicProductCorpusV2Input): VerifyPublicProductCorpusV2Input {
  return dispositionFirstObservation(input, "held");
}

export function supersedeFirstObservation(input: VerifyPublicProductCorpusV2Input): VerifyPublicProductCorpusV2Input {
  return dispositionFirstObservation(input, "superseded");
}

export function changeSecondProductIdentity(input: VerifyPublicProductCorpusV2Input): VerifyPublicProductCorpusV2Input {
  const result = structuredClone(input);
  for (const batch of result.batches) {
    for (let index = 0; index < batch.source_lines.length; index += 1) {
      const value = JSON.parse(new TextDecoder().decode(batch.source_lines[index]!)) as Record<string, unknown>;
      if (value.source_id === "source-1") {
        value.company = "Other Co";
        value.product_system = "Other Product";
        (batch.source_lines as Uint8Array[])[index] = line(value);
      }
    }
    for (let index = 0; index < batch.observation_lines.length; index += 1) {
      const value = JSON.parse(new TextDecoder().decode(batch.observation_lines[index]!)) as Record<string, unknown>;
      if (value.observation_id === "observation-1") {
        value.company = "Other Co";
        value.product_system = "Other Product";
        (batch.observation_lines as Uint8Array[])[index] = line(value);
      }
    }
  }
  return result;
}
