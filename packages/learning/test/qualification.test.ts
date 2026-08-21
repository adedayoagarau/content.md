import { sha256Canonical, verifyRecordDigest } from "@contentmd/core";
import {
  adaptContentDecisionEvent,
  qualifyFeedback,
  Task2ContractError,
  task2ReviewerIsQualified,
} from "@contentmd/learning";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import { describe, expect, it } from "vitest";
import {
  bareRef,
  canonicalSet,
  clone,
  buildVerifiedProducer,
  decisionAdapterInput,
  EXPRESSION_A,
  EXPRESSION_B,
  qualificationFixture,
  rehashSnapshot,
  resolverVerifiedSnapshot,
  snapshotRef,
} from "./task2-fixtures.js";

describe("Task 2 content-decision adapter", () => {
  it("keeps the event digest distinct and binds it to a verified durable decision", () => {
    const input = decisionAdapterInput();
    const result = adaptContentDecisionEvent(input);
    const { boundary_digest: receivedBoundaryDigest, ...boundaryPreimage } = result.boundary;

    expect(result.decision.payload).toEqual({
      proposal_ref: input.proposal.record_id,
      status: "accepted",
      actor_role: "content_designer",
      rationale: "The selected expression best satisfies the frozen rubric.",
      selected_expression: EXPRESSION_A,
      evidence_reviewed: ["evidence.task2.fixture", "review.task2.fixture"],
      decided_at: "2026-08-20T17:45:00.000Z",
    });
    expect(result.decision.content_digest).not.toBe(input.event.event_digest);
    expect(verifyRecordDigest(result.decision)).toEqual({ valid: true });
    expect(validateRecord(SCHEMA_IDS.contentDecision, result.decision)).toEqual({
      valid: true,
      errors: [],
    });
    expect(receivedBoundaryDigest).toBe(sha256Canonical(boundaryPreimage));
    expect(result.boundary.event_digest).toBe(input.event.event_digest);
    expect(result.boundary.decision_ref.content_digest).toBe(result.decision.content_digest);
  });

  it("maps edited decisions to the edit and preserves rejected/abstained null selections", () => {
    expect(
      adaptContentDecisionEvent(decisionAdapterInput({ status: "edited" })).decision.payload.selected_expression,
    ).toBe(EXPRESSION_A);
    expect(
      adaptContentDecisionEvent(decisionAdapterInput({ status: "rejected" })).decision.payload.selected_expression,
    ).toBeNull();
    expect(
      adaptContentDecisionEvent(decisionAdapterInput({ status: "abstained" })).decision.payload.selected_expression,
    ).toBeNull();
  });

  it("recomputes event, proposal, artifact, and boundary integrity", () => {
    const eventTamper = decisionAdapterInput();
    eventTamper.event.actor_ref = "actor.tampered";
    expect(() => adaptContentDecisionEvent(eventTamper)).toThrow(
      "task2_contract_invalid:event_digest",
    );

    const proposalTamper = decisionAdapterInput();
    proposalTamper.proposal.payload.tradeoffs[0] = "Tampered after finalization.";
    expect(() => adaptContentDecisionEvent(proposalTamper)).toThrow(
      "task2_contract_invalid:durable_record_digest",
    );

    const artifactTamper = decisionAdapterInput();
    artifactTamper.producer.source_artifacts[0]!.bytes_utf8 += "tamper";
    expect(() => adaptContentDecisionEvent(artifactTamper)).toThrow(
      "task2_contract_invalid:producer_artifact",
    );

    const shapeTamper = decisionAdapterInput() as ReturnType<typeof decisionAdapterInput> & {
      unexpected?: boolean;
    };
    shapeTamper.unexpected = true;
    expect(() => adaptContentDecisionEvent(shapeTamper)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("applies nested input_shape failures before stale event and proposal digests", () => {
    const invalidSequence = decisionAdapterInput();
    invalidSequence.event.sequence = 0;
    invalidSequence.event.actor_ref = "actor.stale-event-digest";
    expect(() => adaptContentDecisionEvent(invalidSequence)).toThrow(
      "task2_contract_invalid:input_shape",
    );

    const malformedProposal = decisionAdapterInput();
    (malformedProposal.proposal.payload as { operation: string }).operation = "invalid";
    expect(() => adaptContentDecisionEvent(malformedProposal)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("accepts a nonempty legacy stream identifier without treating it as a record ID", () => {
    const input = decisionAdapterInput();
    input.event.stream_id = "decision stream / checkout";
    const { event_digest: _eventDigest, ...eventPreimage } = input.event;
    input.event.event_digest = sha256Canonical(eventPreimage);

    expect(adaptContentDecisionEvent(input).decision.record_id).toBe(
      input.event.payload.decision_id,
    );
  });

  it("rejects a source artifact path that duplicates the schema artifact path", () => {
    const input = decisionAdapterInput();
    input.producer.source_artifacts[0]!.path = input.producer.schema_artifact.path;

    expect(() => adaptContentDecisionEvent(input)).toThrow(
      "task2_contract_invalid:producer_artifact",
    );
  });

  it("verifies build receipts and retains their provenance without self-reference", () => {
    const input = decisionAdapterInput();
    input.producer = buildVerifiedProducer("content-decision-adapter");
    const result = adaptContentDecisionEvent(input);
    expect(result.decision.provenance).toContainEqual(expect.objectContaining({
      relationship: "producer_verification",
      record_id: "receipt.producer.content-decision-adapter",
    }));

    input.producer.verification_receipt.payload.observed_digest = "0".repeat(64);
    expect(() => adaptContentDecisionEvent(input)).toThrow(
      "task2_contract_invalid:receipt_digest",
    );
  });

  it("rejects accessor, sparse, and extra-key array values as non-canonical", () => {
    const accessor = decisionAdapterInput();
    Object.defineProperty(accessor.event.payload, "actor_role", {
      enumerable: true,
      get: () => "content_designer",
    });
    expect(() => adaptContentDecisionEvent(accessor)).toThrow(
      "task2_contract_invalid:canonical_value",
    );

    const extraArrayKey = decisionAdapterInput();
    Object.defineProperty(extraArrayKey.event.payload.evidence_reviewed, "extra", {
      enumerable: true,
      value: "not an array element",
    });
    expect(() => adaptContentDecisionEvent(extraArrayKey)).toThrow(
      "task2_contract_invalid:canonical_value",
    );

    const sparse = decisionAdapterInput();
    delete sparse.event.payload.evidence_reviewed[0];
    expect(() => adaptContentDecisionEvent(sparse)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
  });
});

describe("feedback qualification", () => {
  it.each([
    ["A", 1],
    ["B", 0],
  ] as const)("qualifies a stable blinded randomized %s decision", (outcome) => {
    const fixture = qualificationFixture(adaptContentDecisionEvent, { outcome });
    const record = qualifyFeedback(fixture.input);

    expect(record.payload).toEqual(expect.objectContaining({
      outcome,
      blinded: true,
      randomized: true,
      facts_changed: false,
      requirements_changed: false,
      context_changed: false,
      qualification_state: "qualified",
      reason_codes: ["qualified_decisive_review"],
      authority_effect: "none",
    }));
    expect(record.record_id).toBe(`feedback-qualification.${record.payload.input_digest}`);
    expect(verifyRecordDigest(record)).toEqual({ valid: true });
    expect(validateRecord(SCHEMA_IDS.feedbackQualification, record)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("retains tie and abstention as distinct non-label states", () => {
    const tie = qualifyFeedback(
      qualificationFixture(adaptContentDecisionEvent, { outcome: "tie" }).input,
    );
    const abstain = qualifyFeedback(
      qualificationFixture(adaptContentDecisionEvent, { outcome: "abstain" }).input,
    );

    expect(tie.payload).toEqual(expect.objectContaining({
      outcome: "tie",
      qualification_state: "not_qualified",
      reason_codes: ["non_decisive_tie"],
    }));
    expect(abstain.payload).toEqual(expect.objectContaining({
      outcome: "abstain",
      qualification_state: "abstained",
      reason_codes: ["reviewer_abstained"],
    }));
  });

  it("accepts a nonempty artifact label that is not a record ID", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    const artifactRef = {
      ...fixture.input.rubric.payload.artifact_ref,
      artifact_id: "Rubric v1 / checkout",
    };
    fixture.input.rubric.payload.artifact_ref = artifactRef;
    fixture.input.rubric = rehashSnapshot(fixture.input.rubric);
    fixture.input.review.payload.rubric_ref = { ...artifactRef };
    fixture.input.review = rehashSnapshot(fixture.input.review);

    expect(qualifyFeedback(fixture.input).payload.qualification_state).toBe("qualified");
  });

  it("rejects reviewer entries duplicated by reviewer_ref", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    const duplicate = clone(fixture.input.reviewer_set.payload.entries[0]!);
    duplicate.role = "content_reviewer";
    duplicate.reviewer_ref = {
      ...duplicate.reviewer_ref,
      content_digest: sha256Canonical({ alternate_version_of_same_reviewer: true }),
    };
    const entries = canonicalSet([
      ...fixture.input.reviewer_set.payload.entries,
      duplicate,
    ]);
    fixture.input.reviewer_set.payload.entries = entries as typeof fixture.input.reviewer_set.payload.entries;
    fixture.input.reviewer_set.payload.set_digest = sha256Canonical({
      contract_version: "contentmd.task2-reviewer-set/0.1.0",
      entries,
    });
    fixture.input.reviewer_set = rehashSnapshot(fixture.input.reviewer_set);
    fixture.input.review.payload.reviewer_set_ref = snapshotRef(fixture.input.reviewer_set);
    fixture.input.review = rehashSnapshot(fixture.input.review);

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:set_uniqueness_or_order",
    );
  });

  it("keys reviewer authorship independence by stable record identity", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    const reviewer = fixture.input.reviewer_set.payload.entries[0]!;
    const alternateVersionOfReviewer = {
      ...reviewer.reviewer_ref,
      content_digest: sha256Canonical({ alternate_version_of_same_reviewer: true }),
    };

    expect(task2ReviewerIsQualified(
      reviewer,
      fixture.input.evaluation_at,
      "project",
      [alternateVersionOfReviewer],
    )).toBe(false);
  });

  it.each([
    [
      "arbitrary fractional precision",
      "2026-08-20T18:00:00.123456789123456789Z",
      "2026-08-20T18:00:00.123456789123456788Z",
      "2026-08-20T18:00:00.123456789123456790Z",
    ],
    [
      "a valid leap second",
      "2026-06-30T23:59:60.5Z",
      "2026-06-30T23:59:60.4Z",
      "2026-07-01T00:00:00.0Z",
    ],
  ])("compares reviewer validity using exact RFC3339 instants for %s", (
    _case,
    evaluationAt,
    effectiveAt,
    expiresAt,
  ) => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    fixture.input.evaluation_at = evaluationAt;
    const reviewer = fixture.input.reviewer_set.payload.entries[0]!;
    reviewer.effective_at = effectiveAt;
    reviewer.expires_at = expiresAt;
    fixture.input.reviewer_set.payload.set_digest = sha256Canonical({
      contract_version: "contentmd.task2-reviewer-set/0.1.0",
      entries: fixture.input.reviewer_set.payload.entries,
    });
    fixture.input.reviewer_set = rehashSnapshot(fixture.input.reviewer_set);
    fixture.input.review.payload.reviewer_set_ref = snapshotRef(fixture.input.reviewer_set);
    fixture.input.review = rehashSnapshot(fixture.input.review);

    expect(qualifyFeedback(fixture.input).payload).toEqual(expect.objectContaining({
      qualification_state: "qualified",
      reason_codes: ["qualified_decisive_review"],
    }));
  });

  it.each([
    [{ blindedStatus: "fail" as const }, false, true, "blinding_required"],
    [{ randomizedStatus: "fail" as const }, true, false, "randomization_required"],
    [{ rubricStatus: "superseded" as const }, true, true, "rubric_not_current_or_mismatched"],
    [{ reviewerQualification: "expired" as const }, true, true, "reviewer_set_not_qualified"],
    [{ lineageClass: "browser_observed" as const }, true, true, "candidate_lineage_not_learning_eligible"],
    [{ lineageClass: "competitor" as const }, true, true, "candidate_lineage_not_learning_eligible"],
    [{ lineageClass: "third_party" as const }, true, true, "candidate_lineage_not_learning_eligible"],
    [{ lineageClass: "nonconforming" as const }, true, true, "candidate_lineage_not_learning_eligible"],
    [{ transitiveComplete: false }, true, true, "candidate_lineage_not_learning_eligible"],
    [{ factState: "superseded" as const }, true, true, "fact_set_not_current"],
    [{ policyState: "revoked" as const }, true, true, "review_policy_not_current"],
  ])("records substantive nonqualification %#", (options, blinded, randomized, reason) => {
    const record = qualifyFeedback(
      qualificationFixture(adaptContentDecisionEvent, options).input,
    );
    expect(record.payload.qualification_state).toBe("not_qualified");
    expect(record.payload.blinded).toBe(blinded);
    expect(record.payload.randomized).toBe(randomized);
    expect(record.payload.reason_codes).toContain(reason);
  });

  it("accumulates invalid drift reasons before abstention precedence", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent, {
      outcome: "abstain",
      observedFactsChanged: true,
      observedRequirementsChanged: true,
      observedContextChanged: true,
    });
    const record = qualifyFeedback(fixture.input);

    expect(record.payload.qualification_state).toBe("invalid");
    expect(record.payload.facts_changed).toBe(true);
    expect(record.payload.requirements_changed).toBe(true);
    expect(record.payload.context_changed).toBe(true);
    expect(record.payload.reason_codes).toEqual([
      "context_changed",
      "facts_changed",
      "requirements_changed",
    ]);
    expect(record.payload.reason_codes).not.toContain("reviewer_abstained");
  });

  it("handles declared, unresolved, and acyclic adjudicated conflicts exactly", () => {
    const declared = qualifyFeedback(
      qualificationFixture(adaptContentDecisionEvent, { conflictState: "declared" }).input,
    );
    const unresolved = qualifyFeedback(
      qualificationFixture(adaptContentDecisionEvent, { conflictState: "unresolved" }).input,
    );
    const adjudicatedFixture = qualificationFixture(adaptContentDecisionEvent, {
      outcome: "B",
      conflictState: "declared",
      adjudicationDisposition: "A",
    });
    const adjudicated = qualifyFeedback(adjudicatedFixture.input);

    expect(declared.payload).toEqual(expect.objectContaining({
      conflict_state: "declared",
      qualification_state: "not_qualified",
      reason_codes: ["conflict_requires_adjudication"],
    }));
    expect(unresolved.payload).toEqual(expect.objectContaining({
      conflict_state: "unresolved",
      qualification_state: "invalid",
      reason_codes: ["conflict_unresolved"],
    }));
    expect(adjudicated.payload).toEqual(expect.objectContaining({
      outcome: "A",
      conflict_state: "adjudicated",
      qualification_state: "qualified",
      reason_codes: ["qualified_decisive_review"],
      adjudication_ref: expect.objectContaining({
        record_id: "snapshot.adjudication.task2",
      }),
    }));
  });

  it("makes invalid adjudication inspectable rather than granting a label", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent, {
      conflictState: "declared",
      adjudicationDisposition: "A",
      adjudicationStatus: "revoked",
    });
    const record = qualifyFeedback(fixture.input);
    expect(record.payload.qualification_state).toBe("invalid");
    expect(record.payload.reason_codes).toEqual(["adjudication_invalid"]);
  });

  it("rejects malformed snapshot, lineage graph, official mode, and post-finalization output mutation", () => {
    const digestFixture = qualificationFixture(adaptContentDecisionEvent);
    digestFixture.input.context.payload.locale = "fr-FR";
    expect(() => qualifyFeedback(digestFixture.input)).toThrow(
      "task2_contract_invalid:snapshot_digest",
    );

    const lineageFixture = qualificationFixture(adaptContentDecisionEvent);
    const root = lineageFixture.input.lineage_a.payload.nodes[0]!;
    root.parent_refs = [root.subject_ref];
    lineageFixture.input.lineage_a = rehashSnapshot(lineageFixture.input.lineage_a);
    expect(() => qualifyFeedback(lineageFixture.input)).toThrow(
      "task2_contract_invalid:lineage_graph",
    );

    const officialFixture = qualificationFixture(adaptContentDecisionEvent);
    (officialFixture.input as { record_mode: string }).record_mode = "official";
    expect(() => qualifyFeedback(officialFixture.input)).toThrow(
      "task2_contract_invalid:official_mode_not_supported",
    );

    const valid = qualifyFeedback(qualificationFixture(adaptContentDecisionEvent).input);
    const mutated = clone(valid);
    mutated.payload.outcome = "B";
    expect(verifyRecordDigest(mutated)).toEqual({
      valid: false,
      reason: "content_digest_mismatch",
    });
  });

  it("verifies resolver receipts and rejects dangling lineage", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    fixture.input.producer = buildVerifiedProducer("feedback-qualification");
    fixture.input.context = resolverVerifiedSnapshot(fixture.input.context);
    fixture.evidence.context = fixture.input.context;
    const qualified = qualifyFeedback(fixture.input);
    expect(qualified.provenance.map((entry) => entry.relationship)).toContain(
      "context_verification",
    );
    expect(qualified.provenance.map((entry) => entry.relationship)).toContain(
      "producer_verification",
    );

    const receiptTamper = qualificationFixture(adaptContentDecisionEvent);
    receiptTamper.input.context = resolverVerifiedSnapshot(receiptTamper.input.context);
    receiptTamper.input.context.verification_receipt.payload.status = "failed";
    expect(() => qualifyFeedback(receiptTamper.input)).toThrow(
      "task2_contract_invalid:receipt_digest",
    );

    const dangling = qualificationFixture(adaptContentDecisionEvent);
    dangling.input.lineage_a.payload.nodes[0]!.parent_refs = [{
      ...dangling.input.lineage_a.payload.nodes[0]!.subject_ref,
      record_id: "fixture.missing-parent",
    }];
    dangling.input.lineage_a = rehashSnapshot(dangling.input.lineage_a);
    expect(() => qualifyFeedback(dangling.input)).toThrow(
      "task2_contract_invalid:lineage_graph",
    );
  });

  it("classifies a valid lineage rooted at the wrong candidate as an invalid cross-record reference", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    const wrongRoot = {
      ...bareRef("candidate.wrong-root"),
      schema_id: "contentmd.task2-candidate-snapshot",
    };
    const originalNode = fixture.input.lineage_a.payload.nodes[0]!;
    fixture.input.lineage_a.payload.candidate_ref = wrongRoot;
    fixture.input.lineage_a.payload.nodes = [{
      ...originalNode,
      subject_ref: wrongRoot,
      parent_refs: [],
    }];
    fixture.input.lineage_a = rehashSnapshot(fixture.input.lineage_a);

    const record = qualifyFeedback(fixture.input);
    expect(record.payload.qualification_state).toBe("invalid");
    expect(record.payload.reason_codes).toEqual(["cross_record_reference_mismatch"]);
    expect(record.payload.reason_codes).not.toContain(
      "candidate_lineage_not_learning_eligible",
    );
  });

  it("applies input_shape before snapshot_digest when independent faults coexist", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    (fixture.input as { record_mode: string }).record_mode = "malformed";
    fixture.input.context.payload.locale = "fr-FR";

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("rejects malformed context payload shape before a stale snapshot digest", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    fixture.input.context.payload.locale = "";

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("preflights every nested shape before a stale snapshot digest", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    (fixture.input.review.payload as typeof fixture.input.review.payload & {
      unexpected?: boolean;
    }).unexpected = true;

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("uses interface order when an earlier digest and later shape both fail", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    fixture.input.review.payload.outcome = "B";
    (fixture.input.context.payload as typeof fixture.input.context.payload & {
      unexpected?: boolean;
    }).unexpected = true;

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:snapshot_digest",
    );
  });

  it("classifies a snapshot-kind discriminator mismatch as input_shape", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    (fixture.input.review as { snapshot_kind: string }).snapshot_kind = "context";

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("classifies a wrong schema on a typed snapshot reference as schema_id", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    fixture.input.review.payload.decision_ref.schema_id = "contentmd.wrong-record";
    fixture.input.review = rehashSnapshot(fixture.input.review);

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:schema_id",
    );
  });

  it("rejects a nested accessor without executing it", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    fixture.input.review.payload.outcome = "B";
    let accessorReads = 0;
    Object.defineProperty(fixture.input.presentation.payload.blinding_proof, "status", {
      enumerable: true,
      get() {
        accessorReads += 1;
        return "pass";
      },
    });

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
    expect(accessorReads).toBe(0);
  });

  it("never executes a record_mode accessor before canonical validation", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    let accessorReads = 0;
    Object.defineProperty(fixture.input, "record_mode", {
      enumerable: true,
      get() {
        accessorReads += 1;
        return "development_fixture";
      },
    });

    expect(() => qualifyFeedback(fixture.input)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
    expect(accessorReads).toBe(0);
  });

  it("exports a stable typed contract error", () => {
    const error = new Task2ContractError("task2_contract_invalid:digest");
    expect(error).toBeInstanceOf(TypeError);
    expect(error.name).toBe("Task2ContractError");
    expect(error.code).toBe("task2_contract_invalid:digest");
    expect(error.message).toBe(error.code);
  });
});
