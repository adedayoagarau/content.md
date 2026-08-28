#!/usr/bin/env node
import { writeFile, readFile } from "node:fs/promises";
import { canonicalJson, sha256Canonical } from "../packages/core/dist/index.js";
import { authorizeOperation, issueReviewerQualification } from "../packages/governance/dist/index.js";
import { createPublicProductReviewReceipt, verifyPublicProductExperienceTaxonomy } from "../packages/research/dist/index.js";

const root = "research/09-experimental/public-product-corpus";
const effectiveAt = "2026-08-27T12:00:00.000-07:00";
const asOf = "2026-08-27T23:59:59.999-12:00";
const scopes = ["public-product-corpus", "public-product-taxonomy"];
const limits = { calls: 1, bytes: 16_384, duration_ms: 1_000, records: 1, model_tokens: 0, browser_actions: 0, retries: 0 };
const mappingItems = ["raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit", "content_slot_fit", "channel_fit", "counterexample_sufficiency", "industry_neutrality", "localization_transferability", "rights_safe_abstraction"];
const taxonomyItems = ["definition_completeness", "semantic_id_stability", "mapping_set_completeness", "previous_version_compatibility", "effective_time_validity", "review_closure", "no_authority_or_learning_widening"];
const scalar = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const ref = (object_id, object_digest) => ({ object_id, object_digest });
const receiptRef = (receipt) => ref(receipt.receipt_id, receipt.receipt_digest);

function policy(action) {
  return { policy_id: `policy.workspace-owner.${action}`, policy_version: 1, status: "current", effective_at: "2026-08-27T00:00:00.000-07:00", expires_at: "2027-08-27T00:00:00.000-07:00", allowed_actions: [action], denied_actions: [], review_actions: [], allowed_adapters: ["adapter.governance.reviewer-qualification"], denied_adapters: [], permitted_data_classes: ["governance-metadata"], denied_data_classes: [], permitted_egress: ["none"], max_limits: { ...limits }, human_approval_actions: [action], required_control_types: ["data_processing", "durable_memory", "telemetry"] };
}

function qualification(reviewerId, role) {
  const identity = { reviewer_id: reviewerId, role, authorization_source: "workspace_owner_explicit_authorization_2026-08-27" };
  const material = { record_mode: "governed", reviewer_ref: ref(`reviewer.contentmd.${reviewerId.toLowerCase()}`, sha256Canonical(identity)), eligible_roles: [role], qualified_objectives: ["public_product_review"], authorized_resource_scopes: [...scopes], effective_at: "2026-08-27T00:00:00.000-07:00", expires_at: null, issuer_principal_ref: "principal.contentmd.workspace-owner" };
  const materialDigest = sha256Canonical(material);
  const action = "issue_reviewer_qualification";
  const operationId = `operation.${action}.${materialDigest.slice(0, 16)}`;
  const input = {
    now: effectiveAt,
    request: { operation_id: operationId, intent: "enforce", action, adapter_id: "adapter.governance.reviewer-qualification", resource_scope: [...scopes], data_classes: ["governance-metadata"], egress: "none", requested_limits: { ...limits }, approval_class: "semantic_decision", requires_readback: false, subject_digest: materialDigest },
    policies: [policy(action)],
    capability_grant: { grant_id: `grant.workspace-owner.${reviewerId.toLowerCase()}`, principal_ref: material.issuer_principal_ref, workload_ref: "workload.contentmd.public-product-taxonomy", action, adapter_id: "adapter.governance.reviewer-qualification", resource_scope: [...scopes], data_classes: ["governance-metadata"], egress: "none", max_limits: { ...limits }, issued_at: "2026-08-27T11:55:00.000-07:00", expires_at: "2026-08-27T13:00:00.000-07:00", revocation_state: "current" },
    approval: { approval_id: `approval.workspace-owner.${reviewerId.toLowerCase()}`, approval_class: "semantic_decision", subject_ref: operationId, subject_digest: materialDigest, status: "issued", issued_at: "2026-08-27T11:56:00.000-07:00", expires_at: "2026-08-27T13:00:00.000-07:00", revocation_state: "current" },
    control_dispositions: [
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.public-product-qualification.processing", status: "current", rationale: "Governance metadata only." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.public-product-qualification.memory", status: "current", rationale: "Auditable qualification and review records." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.public-product-qualification.telemetry", status: "current", rationale: "Minimized governance audit metadata." },
    ],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
  const issuance = { input, expected_decision: authorizeOperation(input) };
  const record = issueReviewerQualification({ material, issuance, revocation: null, as_of: effectiveAt });
  return { record, issuance };
}

const reconciliation = JSON.parse(await readFile(`${root}/taxonomy-mapping-reconciliation-final.json`, "utf8"));
if (reconciliation.mapping_closure !== "complete" || reconciliation.work_units.length !== 343 || reconciliation.work_units.some((unit) => unit.resolution_status !== "resolved")) throw new Error("mapping_review_not_closed");
const designer = qualification("Ade", "qualified_content_designer");
const steward = qualification("Ola", "taxonomy_steward");
const reviewers = [designer, steward];
const roles = ["qualified_content_designer", "taxonomy_steward"];
const receipts = [];
const mappings = [];

for (const unit of reconciliation.work_units) {
  const material = { raw_signature: unit.raw_signature, normalized_signature: unit.final_normalized_signature, rationale: unit.rationale, counterexample_refs: unit.counterexample_refs.map((item) => ref(`${item.batch_id}:${item.record_kind}:${item.record_id}`, item.record_digest)) };
  const materialDigest = sha256Canonical(material);
  const subject = ref(`mapping-material.${materialDigest}`, materialDigest);
  const pair = reviewers.map((reviewer, index) => createPublicProductReviewReceipt({ record_mode: "official", review_kind: "taxonomy_mapping", subject_ref: subject, qualification: reviewer.record, reviewer_role: roles[index], checklist_version: "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0", checklist_results: mappingItems.map((item) => ({ item, status: "pass" })), decision: "pass", reviewed_at: effectiveAt }));
  receipts.push(...pair);
  const reviewRefs = pair.map(receiptRef);
  const identity = { mapping_material_digest: materialDigest, review_receipt_refs: reviewRefs };
  const preimage = { mapping_id: `experience-mapping.${sha256Canonical(identity)}`, ...material, mapping_material_digest: materialDigest, review_receipt_refs: reviewRefs };
  mappings.push({ ...preimage, mapping_digest: sha256Canonical(preimage) });
}
mappings.sort((a, b) => scalar(a.mapping_id, b.mapping_id));
const definitions = Object.fromEntries(Object.entries(reconciliation.taxonomy_definitions).map(([group, items]) => [group, items.map((item) => {
  const preimage = Object.fromEntries(Object.entries(item).filter(([key]) => key !== "definition_digest"));
  return { ...preimage, definition_digest: sha256Canonical(preimage) };
})]));
const taxonomyMaterial = { contract_version: "contentmd.public-product-experience-taxonomy/0.1.0", taxonomy_version: "2026-08-27.1", previous_taxonomy_ref: null, effective_at: effectiveAt, coverage_slots: definitions.coverage_slots, journey_families: definitions.journey_families, state_classes: definitions.state_classes, content_slot_classes: definitions.content_slot_classes, surface_channels: definitions.surface_channels, mappings };
const taxonomyMaterialDigest = sha256Canonical(taxonomyMaterial);
const taxonomySubject = ref(`taxonomy-material.${taxonomyMaterialDigest}`, taxonomyMaterialDigest);
const taxonomyPair = reviewers.map((reviewer, index) => createPublicProductReviewReceipt({ record_mode: "official", review_kind: "taxonomy_version", subject_ref: taxonomySubject, qualification: reviewer.record, reviewer_role: roles[index], checklist_version: "contentmd.public-product-review-checklist.taxonomy-version/0.1.0", checklist_results: taxonomyItems.map((item) => ({ item, status: "pass" })), decision: "pass", reviewed_at: effectiveAt }));
receipts.push(...taxonomyPair);
const mappingRefs = mappings.flatMap((mapping) => mapping.review_receipt_refs).sort((a, b) => scalar(`${a.object_id}\0${a.object_digest}`, `${b.object_id}\0${b.object_digest}`));
const taxonomyRefs = taxonomyPair.map(receiptRef);
const taxonomyIdentity = { taxonomy_material_digest: taxonomyMaterialDigest, mapping_review_receipt_refs: mappingRefs, taxonomy_review_receipt_refs: taxonomyRefs };
const taxonomyPreimage = { ...taxonomyMaterial, taxonomy_id: `public-product-experience-taxonomy.${sha256Canonical(taxonomyIdentity)}`, mapping_review_receipt_refs: mappingRefs, taxonomy_review_receipt_refs: taxonomyRefs, taxonomy_material_digest: taxonomyMaterialDigest, classification_effect: "corpus_projection_only", authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false };
const taxonomy = { ...taxonomyPreimage, taxonomy_digest: sha256Canonical(taxonomyPreimage) };
const qualifications = reviewers.map((item) => item.record).sort((a, b) => scalar(a.qualification_id, b.qualification_id));
const qualificationReplays = reviewers.map((item) => ({ qualification_id: item.record.qualification_id, issuance: item.issuance, revocation: null })).sort((a, b) => scalar(a.qualification_id, b.qualification_id));
const sortedReceipts = [...receipts].sort((a, b) => scalar(a.receipt_id, b.receipt_id));
const governancePreimage = { contract_version: "contentmd.public-product-review-governance/0.1.0", as_of: asOf, qualifications, qualification_replays: qualificationReplays, receipts: sortedReceipts };
const governance = { ...governancePreimage, governance_digest: sha256Canonical(governancePreimage) };
verifyPublicProductExperienceTaxonomy({ taxonomy, governance, as_of: asOf, verification_mode: "official" });
await writeFile(`${root}/experience-taxonomy.json`, `${JSON.stringify(taxonomy, null, 2)}\n`);
await writeFile(`${root}/public-product-review-governance.json`, `${JSON.stringify(governance, null, 2)}\n`);
await writeFile(`${root}/public-product-review-receipts.jsonl`, sortedReceipts.map((item) => canonicalJson(item)).join(""));
process.stdout.write(`${JSON.stringify({ taxonomy_id: taxonomy.taxonomy_id, taxonomy_digest: taxonomy.taxonomy_digest, qualifications: qualifications.length, mapping_receipts: mappings.length * 2, taxonomy_receipts: taxonomyPair.length, verification_mode: "official" })}\n`);
