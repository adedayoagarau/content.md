import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  type ProvenanceRef,
  type RecordScope,
} from "@contentmd/core";
import {
  task2AssertCanonicalValue,
  task2AssertDigestRef,
  task2AssertTimestamp,
  task2AssertTopLevelShape,
  task2DigestRef,
  task2FailAdmission,
  task2FailContract,
  task2PreflightDecision,
  task2PreflightDigestRef,
  task2PreflightProducer,
  task2PreflightText,
  task2ReceiptProvenance,
  task2RefsEqual,
  task2SortProvenance,
  task2VerifyDecisionRecord,
  task2VerifyProducer,
  type DurableContentDecisionRecord,
  type ProducerArtifactWitness,
  type Task2RecordMode,
} from "./feedback.js";
import {
  determineLearningEligibility,
  task2PreflightEligibilityRecord,
  task2PreflightLearningEligibilityInput,
  task2PreflightQualificationRecord,
  task2VerifyEligibilityRecord,
  task2VerifyQualificationRecord,
  type LearningEligibilityInput,
} from "./eligibility.js";
import {
  task2PreflightCandidatePayload,
  task2PreflightContextPayload,
  task2PreflightPresentationPayload,
  task2PreflightSnapshot,
  task2PreflightTaskPayload,
  task2SnapshotRef,
  task2ValidateCandidateSnapshot,
  task2ValidateContextSnapshot,
  task2ValidatePresentationSnapshot,
  task2ValidateTaskSnapshot,
  task2VerifySnapshotEnvelope,
  type CandidatePayload,
  type ContextPayload,
  type EvidenceSnapshot,
  type PresentationPayload,
  type TaskPayload,
} from "./qualification.js";
import {
  LEARNING_SCHEMA_IDS,
  type DigestRef,
  type FeedbackQualificationRecord,
  type LearningEligibilityRecord,
  type PreferenceExampleRecord,
} from "./records.js";

export interface PreferenceExampleInput {
  record_mode: Task2RecordMode;
  evaluation_at: string;
  producer: ProducerArtifactWitness;
  qualification: FeedbackQualificationRecord;
  eligibility: LearningEligibilityRecord;
  eligibility_input: LearningEligibilityInput;
  decision: DurableContentDecisionRecord;
  task: EvidenceSnapshot<"task", TaskPayload>;
  context: EvidenceSnapshot<"context", ContextPayload>;
  candidate_a: EvidenceSnapshot<"candidate", CandidatePayload>;
  candidate_b: EvidenceSnapshot<"candidate", CandidatePayload>;
  presentation: EvidenceSnapshot<"presentation", PresentationPayload>;
  feature_source_checkpoint_set_ref: DigestRef;
}

function snapshotProvenance<K extends string, P>(
  snapshot: EvidenceSnapshot<K, P>,
  relationship: string,
): ProvenanceRef[] {
  return [
    { record_id: snapshot.snapshot_id, relationship, content_digest: snapshot.snapshot_digest },
    ...task2ReceiptProvenance(snapshot.verification_receipt, `${relationship}_verification`),
  ];
}

function task2PreflightPreferenceInput(value: unknown): asserts value is PreferenceExampleInput {
  task2AssertCanonicalValue(value);
  task2AssertTopLevelShape(value, [
    "record_mode", "evaluation_at", "producer", "qualification", "eligibility", "eligibility_input",
    "decision", "task", "context", "candidate_a", "candidate_b", "presentation",
    "feature_source_checkpoint_set_ref",
  ]);
}

function validateCryptographicInputs(input: PreferenceExampleInput): ReturnType<typeof task2VerifyProducer> {
  task2PreflightPreferenceInput(input);
  task2PreflightText(input.record_mode);
  if (input.record_mode !== "development_fixture" && input.record_mode !== "official") {
    task2FailContract("input_shape");
  }
  task2PreflightText(input.evaluation_at);
  task2AssertTimestamp(input.evaluation_at);

  task2PreflightProducer(input.producer);
  const producer = task2VerifyProducer(input.producer, "preference-example");

  task2PreflightQualificationRecord(input.qualification);
  task2VerifyQualificationRecord(input.qualification);

  task2PreflightEligibilityRecord(input.eligibility);
  task2VerifyEligibilityRecord(input.eligibility);

  task2PreflightLearningEligibilityInput(input.eligibility_input);
  const replayedEligibility = determineLearningEligibility(input.eligibility_input);
  if (canonicalJson(replayedEligibility) !== canonicalJson(input.eligibility)
    || canonicalJson(input.eligibility_input.qualification) !== canonicalJson(input.qualification)
    || input.eligibility_input.record_mode !== input.record_mode) {
    task2FailContract("reference_integrity");
  }

  task2PreflightDecision(input.decision);
  task2VerifyDecisionRecord(input.decision);
  if (canonicalJson(input.eligibility_input.decision) !== canonicalJson(input.decision)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.task, "task", task2PreflightTaskPayload);
  task2VerifySnapshotEnvelope(input.task, "task");
  task2ValidateTaskSnapshot(input.task);
  if (canonicalJson(input.eligibility_input.qualification_input.task) !== canonicalJson(input.task)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.context, "context", task2PreflightContextPayload);
  task2VerifySnapshotEnvelope(input.context, "context");
  task2ValidateContextSnapshot(input.context);
  if (canonicalJson(input.eligibility_input.qualification_input.context) !== canonicalJson(input.context)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.candidate_a, "candidate", task2PreflightCandidatePayload);
  task2VerifySnapshotEnvelope(input.candidate_a, "candidate");
  task2ValidateCandidateSnapshot(input.candidate_a);
  if (canonicalJson(input.eligibility_input.qualification_input.candidate_a) !== canonicalJson(input.candidate_a)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.candidate_b, "candidate", task2PreflightCandidatePayload);
  task2VerifySnapshotEnvelope(input.candidate_b, "candidate");
  task2ValidateCandidateSnapshot(input.candidate_b);
  if (canonicalJson(input.eligibility_input.qualification_input.candidate_b) !== canonicalJson(input.candidate_b)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.presentation, "presentation", task2PreflightPresentationPayload);
  task2VerifySnapshotEnvelope(input.presentation, "presentation");
  task2ValidatePresentationSnapshot(input.presentation);
  if (canonicalJson(input.eligibility_input.qualification_input.presentation) !== canonicalJson(input.presentation)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightDigestRef(input.feature_source_checkpoint_set_ref);
  if (input.record_mode === "official") task2FailContract("official_mode_not_supported");
  return producer;
}

export function createPreferenceExample(
  input: PreferenceExampleInput,
): PreferenceExampleRecord {
  const producer = validateCryptographicInputs(input);
  const qualification = input.qualification.payload;
  const eligibility = input.eligibility.payload;
  if (qualification.qualification_state !== "qualified") task2FailAdmission("qualification_state");
  if (eligibility.eligibility_state !== "eligible") task2FailAdmission("eligibility_state");
  if (qualification.outcome !== "A" && qualification.outcome !== "B") {
    task2FailAdmission("non_decisive_outcome");
  }
  if (qualification.record_mode !== input.record_mode || eligibility.record_mode !== input.record_mode) {
    task2FailAdmission("record_mode");
  }

  const qualificationRef = task2DigestRef(input.qualification);
  const eligibilityRef = task2DigestRef(input.eligibility);
  const decisionRef = task2DigestRef(input.decision);
  const taskRef = task2SnapshotRef(input.task);
  const contextRef = task2SnapshotRef(input.context);
  const candidateARef = task2SnapshotRef(input.candidate_a);
  const candidateBRef = task2SnapshotRef(input.candidate_b);
  const presentationRef = task2SnapshotRef(input.presentation);
  if (!task2RefsEqual(eligibility.qualification_ref, qualificationRef)
    || !task2RefsEqual(qualification.decision_ref, decisionRef)
    || !task2RefsEqual(eligibility.decision_ref, decisionRef)
    || input.qualification.scope.memory_scope !== input.decision.scope.memory_scope
    || input.qualification.scope.project_id !== input.decision.scope.project_id
    || sha256Canonical(input.qualification.scope.resource_refs) !== sha256Canonical(input.decision.scope.resource_refs)
    || sha256Canonical(input.qualification.scope.data_classes) !== sha256Canonical(input.decision.scope.data_classes)
    || input.qualification.scope.project_id !== input.eligibility.scope.project_id
    || sha256Canonical(input.qualification.scope.resource_refs) !== sha256Canonical(input.eligibility.scope.resource_refs)
    || sha256Canonical(input.qualification.scope.data_classes) !== sha256Canonical(input.eligibility.scope.data_classes)) {
    task2FailAdmission("cross_record_reference_mismatch");
  }
  if (!task2RefsEqual(qualification.candidate_a_ref, candidateARef)
    || !task2RefsEqual(qualification.candidate_b_ref, candidateBRef)
    || task2RefsEqual(candidateARef, candidateBRef)
    || input.candidate_a.payload.expression_digest === input.candidate_b.payload.expression_digest) {
    task2FailAdmission("candidate_identity");
  }
  if (!task2RefsEqual(qualification.task_ref, taskRef)
    || !task2RefsEqual(qualification.context_ref, contextRef)
    || !task2RefsEqual(qualification.presentation_ref, presentationRef)
    || !task2RefsEqual(input.task.payload.context_ref, contextRef)
    || !task2RefsEqual(input.candidate_a.payload.task_ref, taskRef)
    || !task2RefsEqual(input.candidate_b.payload.task_ref, taskRef)
    || !task2RefsEqual(input.candidate_a.payload.context_ref, contextRef)
    || !task2RefsEqual(input.candidate_b.payload.context_ref, contextRef)
    || !task2RefsEqual(input.presentation.payload.task_ref, taskRef)
    || !task2RefsEqual(input.presentation.payload.context_ref, contextRef)
    || !task2RefsEqual(input.presentation.payload.candidate_a_ref, candidateARef)
    || !task2RefsEqual(input.presentation.payload.candidate_b_ref, candidateBRef)
    || input.task.payload.content_slot !== input.context.payload.content_slot
    || input.task.payload.content_slot !== input.candidate_a.payload.content_slot
    || input.task.payload.content_slot !== input.candidate_b.payload.content_slot) {
    task2FailAdmission("task_context_or_slot_mismatch");
  }
  const selected = qualification.outcome === "A" ? input.candidate_a.payload : input.candidate_b.payload;
  if ((input.decision.payload.status !== "accepted" && input.decision.payload.status !== "edited")
    || input.decision.payload.selected_expression !== selected.expression) {
    task2FailAdmission("decision_selection_mismatch");
  }
  const presentation = input.presentation.payload;
  const expectedAssignmentDigest = sha256Canonical({
    contract_version: "contentmd.task2-presentation-assignment/0.1.0",
    task_ref: presentation.task_ref,
    context_ref: presentation.context_ref,
    candidate_a_ref: presentation.candidate_a_ref,
    candidate_b_ref: presentation.candidate_b_ref,
    canonical_order: presentation.canonical_order,
    presented_order: presentation.presented_order,
    seed_commitment_digest: presentation.randomization_proof.seed_commitment_digest,
  });
  if (!qualification.blinded || !qualification.randomized
    || presentation.blinding_proof.status !== "pass"
    || presentation.randomization_proof.status !== "pass"
    || presentation.randomization_proof.assignment_digest !== expectedAssignmentDigest) {
    task2FailAdmission("presentation_proof");
  }
  try {
    task2AssertDigestRef(input.feature_source_checkpoint_set_ref);
  } catch {
    task2FailAdmission("checkpoint_ref_malformed");
  }

  const derivedOutputScope: RecordScope = {
    memory_scope: input.eligibility.scope.memory_scope,
    project_id: input.eligibility.scope.project_id,
    resource_refs: [...input.eligibility.scope.resource_refs],
    data_classes: [...input.eligibility.scope.data_classes],
  };
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.preference-example-input/0.1.0",
    record_mode: input.record_mode,
    evaluation_at: input.evaluation_at,
    derived_output_scope: derivedOutputScope,
    producer: input.producer,
    qualification: input.qualification,
    eligibility: input.eligibility,
    eligibility_input: input.eligibility_input,
    decision: input.decision,
    evidence: {
      task: input.task,
      context: input.context,
      candidate_a: input.candidate_a,
      candidate_b: input.candidate_b,
      presentation: input.presentation,
    },
    feature_source_checkpoint_set_ref: input.feature_source_checkpoint_set_ref,
  });
  const presentationDigest = sha256Canonical({
    contract_version: "contentmd.preference-presentation/0.1.0",
    presentation_ref: presentationRef,
    task_ref: taskRef,
    context_ref: contextRef,
    candidate_a_ref: candidateARef,
    candidate_b_ref: candidateBRef,
    canonical_order: ["A", "B"],
    presented_order: presentation.presented_order,
    blinded: true,
    randomized: true,
  });
  const provenance = task2SortProvenance([
    { record_id: input.qualification.record_id, relationship: "qualification", content_digest: input.qualification.content_digest },
    { record_id: input.eligibility.record_id, relationship: "eligibility", content_digest: input.eligibility.content_digest },
    { record_id: input.decision.record_id, relationship: "decision", content_digest: input.decision.content_digest },
    ...snapshotProvenance(input.task, "task"),
    ...snapshotProvenance(input.context, "context"),
    ...snapshotProvenance(input.candidate_a, "candidate_a"),
    ...snapshotProvenance(input.candidate_b, "candidate_b"),
    ...snapshotProvenance(input.presentation, "presentation"),
    {
      record_id: input.feature_source_checkpoint_set_ref.record_id,
      relationship: "feature_source_checkpoint_set",
      content_digest: input.feature_source_checkpoint_set_ref.content_digest,
    },
    ...task2ReceiptProvenance(producer.verification_receipt, "producer_verification"),
  ]);
  return finalizeRecord({
    record_id: `preference-example.${inputDigest}`,
    schema_id: LEARNING_SCHEMA_IDS.preferenceExample,
    schema_version: "0.1.0",
    record_version: 1,
    scope: derivedOutputScope,
    provenance,
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: input.record_mode,
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: producer.schema_digest,
      code_digest: producer.code_digest,
      input_digest: inputDigest,
      authority_effect: "none",
      qualification_ref: qualificationRef,
      eligibility_ref: eligibilityRef,
      task_ref: taskRef,
      context_ref: contextRef,
      candidate_a_ref: candidateARef,
      candidate_b_ref: candidateBRef,
      presented_order: [...presentation.presented_order] as ["A", "B"] | ["B", "A"],
      preferred_side: qualification.outcome,
      label: qualification.outcome === "A" ? 1 : 0,
      presentation_digest: presentationDigest,
      feature_source_checkpoint_set_ref: input.feature_source_checkpoint_set_ref,
      preference_state: "admitted",
    },
  }) as PreferenceExampleRecord;
}
