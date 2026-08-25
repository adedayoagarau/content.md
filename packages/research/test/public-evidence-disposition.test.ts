import { describe, expect, it } from "vitest";
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
  createPublicProductReviewReceipt,
  derivePublicEvidenceSubjectRef,
  sha256Bytes,
  verifyPublicEvidenceDispositionLedger,
  type EvidenceDispositionReason,
  type ProposedEvidenceTransition,
  type PublicEvidenceDispositionEvent,
  type PublicEvidenceDispositionLedgerHead,
  type PublicEvidenceDispositionSet,
  type PublicEvidenceSubjectRef,
  type PublicProductDigestRef,
  type PublicProductReviewGovernanceEvidence,
  type PublicProductReviewReceipt,
} from "@contentmd/research";

const asOf = "2026-08-24T20:00:00.000Z";
const reviewedAt = "2026-08-24T19:00:00.000Z";
const limits = {
  calls: 1, bytes: 16_384, duration_ms: 1_000, records: 1,
  model_tokens: 0, browser_actions: 0, retries: 0,
};
const checklistItems = [
  "subject_accuracy", "transition_legality", "reason_fit", "replacement_validity",
  "rights_or_projection_safety", "complete_set_review",
] as const;

function scalarCompare(left: string, right: string): number {
  const a = [...left].map((value) => value.codePointAt(0)!);
  const b = [...right].map((value) => value.codePointAt(0)!);
  for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
    const difference = a[index]! - b[index]!;
    if (difference !== 0) return difference;
  }
  return a.length - b.length;
}

function ref(objectId: string, objectDigest: string): PublicProductDigestRef {
  return { object_id: objectId, object_digest: objectDigest };
}

function subjectLine(recordId: string): Uint8Array {
  return new TextEncoder().encode(canonicalJson({ record_id: recordId, value: "immutable" }));
}

function subject(recordId: string): PublicEvidenceSubjectRef {
  return derivePublicEvidenceSubjectRef({
    batch_id: "batch-001",
    record_kind: "observation",
    record_id: recordId,
    exact_line_bytes: subjectLine(recordId),
  });
}

function policy(action: string): GovernancePolicy {
  return {
    policy_id: `policy.${action}`, policy_version: 1, status: "current",
    effective_at: "2026-08-24T00:00:00.000Z", expires_at: "2026-08-25T00:00:00.000Z",
    allowed_actions: [action], denied_actions: [], review_actions: [],
    allowed_adapters: ["adapter.governance.reviewer-qualification"], denied_adapters: [],
    permitted_data_classes: ["governance-metadata"], denied_data_classes: [],
    permitted_egress: ["none"], max_limits: { ...limits },
    human_approval_actions: [action],
    required_control_types: ["data_processing", "durable_memory", "telemetry"],
  };
}

function qualification(reviewerNumber: number, role: ReviewerRole) {
  const material: ReviewerQualificationMaterial = {
    record_mode: "governed",
    reviewer_ref: ref(`reviewer.disposition.${reviewerNumber}`, String(reviewerNumber).repeat(64)),
    eligible_roles: [role], qualified_objectives: ["public_product_review"],
    authorized_resource_scopes: ["public-product-corpus", "public-product-taxonomy"],
    effective_at: "2026-08-24T00:00:00.000Z", expires_at: "2026-08-25T00:00:00.000Z",
    issuer_principal_ref: "principal.public-product-governance",
  };
  const materialDigest = sha256Canonical(material);
  const action = "issue_reviewer_qualification";
  const operationId = `operation.${action}.${reviewerNumber}`;
  const input: AuthorizationInput = {
    now: reviewedAt,
    request: {
      operation_id: operationId, intent: "enforce", action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...material.authorized_resource_scopes],
      data_classes: ["governance-metadata"], egress: "none",
      requested_limits: { ...limits }, approval_class: "semantic_decision",
      requires_readback: false, subject_digest: materialDigest,
    },
    policies: [policy(action)],
    capability_grant: {
      grant_id: `grant.disposition.${reviewerNumber}`,
      principal_ref: material.issuer_principal_ref,
      workload_ref: "workload.contentmd.disposition-review", action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...material.authorized_resource_scopes],
      data_classes: ["governance-metadata"], egress: "none", max_limits: { ...limits },
      issued_at: "2026-08-24T18:00:00.000Z", expires_at: "2026-08-24T21:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: `approval.disposition.${reviewerNumber}`,
      approval_class: "semantic_decision", subject_ref: operationId,
      subject_digest: materialDigest, status: "issued",
      issued_at: "2026-08-24T18:30:00.000Z", expires_at: "2026-08-24T21:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Governance metadata." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Auditable review." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Minimized audit." },
    ],
    verification_plan_ref: null, reliability_evidence: null,
  };
  const issuance: AuthorizationReplay = { input, expected_decision: authorizeOperation(input) };
  return {
    record: issueReviewerQualification({ material, issuance, revocation: null, as_of: reviewedAt }),
    issuance,
  };
}

function subjectKey(value: PublicEvidenceSubjectRef): string {
  return `${value.batch_id}\u0000${value.record_kind}\u0000${value.record_id}\u0000${value.record_digest}`;
}

function ledgerHead(events: readonly PublicEvidenceDispositionEvent[]): PublicEvidenceDispositionLedgerHead {
  const eventDigests = events.map((event) => event.event_digest);
  const identity = {
    contract_version: "contentmd.public-product-evidence-ledger-head-identity/0.1.0",
    event_digests_in_append_order: eventDigests,
  };
  const preimage = {
    contract_version: "contentmd.public-product-evidence-ledger-head/0.1.0" as const,
    ledger_id: `public_product_evidence_ledger.${sha256Canonical(identity)}`,
    event_digests_in_append_order: eventDigests,
    event_count: eventDigests.length,
  };
  return { ...preimage, ledger_digest: sha256Canonical(preimage) };
}

function headRef(events: readonly PublicEvidenceDispositionEvent[]): PublicProductDigestRef | null {
  if (events.length === 0) return null;
  const head = ledgerHead(events);
  return ref(head.ledger_id, head.ledger_digest);
}

function transition(input: {
  subject: PublicEvidenceSubjectRef;
  state: ProposedEvidenceTransition["state"];
  reason: EvidenceDispositionReason;
  replacements?: readonly PublicEvidenceSubjectRef[];
  previous?: PublicEvidenceDispositionEvent | null;
}): ProposedEvidenceTransition {
  return {
    subject_ref: input.subject,
    expected_previous_event_digest: input.previous?.event_digest ?? null,
    expected_next_sequence: (input.previous?.sequence ?? 0) + 1,
    state: input.state,
    reason_code: input.reason,
    replacement_refs: [...(input.replacements ?? [])].sort(
      (left, right) => scalarCompare(subjectKey(left), subjectKey(right)),
    ),
    bounded_note: null,
    effective_at: "2026-08-24T19:30:00.000Z",
  };
}

function dispositionSet(
  proposedTransitions: readonly ProposedEvidenceTransition[],
  priorEvents: readonly PublicEvidenceDispositionEvent[],
): PublicEvidenceDispositionSet {
  const sorted = [...proposedTransitions]
    .sort((left, right) => scalarCompare(subjectKey(left.subject_ref), subjectKey(right.subject_ref)));
  const identity = {
    base_ledger_head: headRef(priorEvents),
    as_of: asOf,
    proposed_transitions: sorted,
  };
  const preimage = {
    contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0" as const,
    disposition_set_id: `public-product-evidence-disposition-set.${sha256Canonical(identity)}`,
    ...identity,
  };
  return { ...preimage, set_digest: sha256Canonical(preimage) };
}

function setRef(set: PublicEvidenceDispositionSet): PublicProductDigestRef {
  return ref(set.disposition_set_id, set.set_digest);
}

function receiptRef(receipt: PublicProductReviewReceipt): PublicProductDigestRef {
  return ref(receipt.receipt_id, receipt.receipt_digest);
}

function setReviews(
  set: PublicEvidenceDispositionSet,
  first: ReturnType<typeof qualification>,
  second: ReturnType<typeof qualification>,
  roles: readonly [ReviewerRole, ReviewerRole],
) {
  const receipts = [first, second].map((reviewer, index) => createPublicProductReviewReceipt({
    record_mode: "official",
    review_kind: "evidence_disposition_set",
    subject_ref: setRef(set),
    qualification: reviewer.record,
    reviewer_role: roles[index]!,
    checklist_version: "contentmd.public-product-review-checklist.evidence-disposition-set/0.1.0",
    checklist_results: checklistItems.map((item) => ({ item, status: "pass" as const })),
    decision: "pass",
    reviewed_at: reviewedAt,
  })) as [PublicProductReviewReceipt, PublicProductReviewReceipt];
  return receipts;
}

function event(
  set: PublicEvidenceDispositionSet,
  proposed: ProposedEvidenceTransition,
  reviews: readonly [PublicProductReviewReceipt, PublicProductReviewReceipt],
): PublicEvidenceDispositionEvent {
  const identityMaterial = {
    contract_version: "contentmd.public-product-evidence-disposition/0.1.0" as const,
    disposition_set_ref: setRef(set),
    subject_ref: proposed.subject_ref,
    previous_event_digest: proposed.expected_previous_event_digest,
    sequence: proposed.expected_next_sequence,
    state: proposed.state,
    reason_code: proposed.reason_code,
    replacement_refs: proposed.replacement_refs,
    bounded_note: proposed.bounded_note,
    decided_at: reviews.map((receipt) => receipt.reviewed_at).sort().at(-1)!,
    effective_at: proposed.effective_at,
    review_receipt_refs: reviews.map(receiptRef) as [PublicProductDigestRef, PublicProductDigestRef],
    disposition_effect: "corpus_projection_only" as const,
    authority_effect: "none" as const,
    prompt_eligibility: "never" as const,
    training_eligibility: "never" as const,
    benchmark_eligibility: false as const,
  };
  const preimage = {
    contract_version: identityMaterial.contract_version,
    disposition_event_id: `public-product-evidence-disposition.${sha256Canonical(identityMaterial)}`,
    disposition_set_ref: identityMaterial.disposition_set_ref,
    subject_ref: identityMaterial.subject_ref,
    previous_event_digest: identityMaterial.previous_event_digest,
    sequence: identityMaterial.sequence,
    state: identityMaterial.state,
    reason_code: identityMaterial.reason_code,
    replacement_refs: identityMaterial.replacement_refs,
    bounded_note: identityMaterial.bounded_note,
    decided_at: identityMaterial.decided_at,
    effective_at: identityMaterial.effective_at,
    review_receipt_refs: identityMaterial.review_receipt_refs,
    disposition_effect: identityMaterial.disposition_effect,
    authority_effect: identityMaterial.authority_effect,
    prompt_eligibility: identityMaterial.prompt_eligibility,
    training_eligibility: identityMaterial.training_eligibility,
    benchmark_eligibility: identityMaterial.benchmark_eligibility,
  };
  return { ...preimage, event_digest: sha256Canonical(preimage) };
}

function governance(input: {
  reviewers?: readonly ReturnType<typeof qualification>[];
  receipts?: readonly PublicProductReviewReceipt[];
} = {}): PublicProductReviewGovernanceEvidence {
  const reviewers = input.reviewers ?? [];
  const qualifications = reviewers.map((item) => item.record)
    .sort((left, right) => scalarCompare(left.qualification_id, right.qualification_id));
  const replays = reviewers.map((item) => ({
    qualification_id: item.record.qualification_id, issuance: item.issuance, revocation: null,
  })).sort((left, right) => scalarCompare(left.qualification_id, right.qualification_id));
  const receipts = [...(input.receipts ?? [])]
    .sort((left, right) => scalarCompare(left.receipt_id, right.receipt_id));
  const preimage = {
    contract_version: "contentmd.public-product-review-governance/0.1.0" as const,
    as_of: asOf, qualifications, qualification_replays: replays, receipts,
  };
  return { ...preimage, governance_digest: sha256Canonical(preimage) };
}

function reviewTeam() {
  return {
    steward: qualification(1, "corpus_steward"),
    independent: qualification(2, "independent_corpus_reviewer"),
    rights: qualification(3, "rights_reviewer"),
  };
}

describe("immutable public-evidence disposition ledger", () => {
  it("derives subject identity from exact canonical line bytes including LF", () => {
    const line = subjectLine("observation.001");
    const first = derivePublicEvidenceSubjectRef({
      batch_id: "batch-001", record_kind: "observation", record_id: "observation.001",
      exact_line_bytes: line,
    });
    const otherBatch = derivePublicEvidenceSubjectRef({
      batch_id: "batch-002", record_kind: "observation", record_id: "observation.001",
      exact_line_bytes: line,
    });

    expect(first.record_digest).toBe(sha256Bytes(line));
    expect(otherBatch).not.toEqual(first);
    expect(() => derivePublicEvidenceSubjectRef({
      batch_id: "batch-001", record_kind: "observation", record_id: "observation.001",
      exact_line_bytes: line.slice(0, -1),
    })).toThrow("public_evidence_disposition_invalid:line_termination");
  });

  it("binds the native source_id and observation_id fields used by corpus JSONL", () => {
    const sourceBytes = new TextEncoder().encode(canonicalJson({
      source_id: "source.native.001",
      value: "immutable",
    }));
    const observationBytes = new TextEncoder().encode(canonicalJson({
      observation_id: "observation.native.001",
      value: "immutable",
    }));

    expect(derivePublicEvidenceSubjectRef({
      batch_id: "batch-001",
      record_kind: "source",
      record_id: "source.native.001",
      exact_line_bytes: sourceBytes,
    }).record_id).toBe("source.native.001");
    expect(derivePublicEvidenceSubjectRef({
      batch_id: "batch-001",
      record_kind: "observation",
      record_id: "observation.native.001",
      exact_line_bytes: observationBytes,
    }).record_id).toBe("observation.native.001");
  });

  it("hashes valid immutable JSONL bytes without requiring canonical key order", () => {
    const exactBytes = new TextEncoder().encode(
      '{"value":"kept in acquisition order","source_id":"source.native.002"}\n',
    );

    expect(derivePublicEvidenceSubjectRef({
      batch_id: "batch-001",
      record_kind: "source",
      record_id: "source.native.002",
      exact_line_bytes: exactBytes,
    }).record_digest).toBe(sha256Bytes(exactBytes));
  });

  it("defaults undisposed subjects to an immutable active state", () => {
    const known = subject("observation.001");
    const verified = verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [], events_in_append_order: [], governance: governance(),
      as_of: asOf, verification_mode: "official",
    });

    expect(verified.state_by_subject.get(subjectKey(known))?.state).toBe("active");
    expect(() => (verified.state_by_subject as Map<string, unknown>).set("forged", {})).toThrow();
  });

  it("verifies an independently reviewed supersession to an active replacement", () => {
    const original = subject("observation.original");
    const replacement = subject("observation.replacement");
    const team = reviewTeam();
    const proposed = transition({
      subject: original, state: "superseded", reason: "source_projection_mismatch",
      replacements: [replacement],
    });
    const set = dispositionSet([proposed], []);
    const reviews = setReviews(set, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const issued = event(set, proposed, reviews);
    const verified = verifyPublicEvidenceDispositionLedger({
      known_subjects: [original, replacement].sort((left, right) => scalarCompare(subjectKey(left), subjectKey(right))),
      sets: [set], events_in_append_order: [issued],
      governance: governance({ reviewers: [team.steward, team.independent], receipts: reviews }),
      as_of: asOf, verification_mode: "official",
    });

    expect(verified.state_by_subject.get(subjectKey(original))).toMatchObject({
      state: "superseded",
      terminal_replacement_refs: [replacement],
    });
    expect(verified.head).toEqual(ledgerHead([issued]));
  });

  it("allows explicit active only as held to active with review_cleared", () => {
    const known = subject("observation.held");
    const team = reviewTeam();
    const held = transition({ subject: known, state: "held", reason: "review_pending" });
    const heldSet = dispositionSet([held], []);
    const heldReviews = setReviews(heldSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const heldEvent = event(heldSet, held, heldReviews);
    const active = transition({
      subject: known, state: "active", reason: "review_cleared", previous: heldEvent,
    });
    const activeSet = dispositionSet([active], [heldEvent]);
    const activeReviews = setReviews(activeSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const activeEvent = event(activeSet, active, activeReviews);
    const allReceipts = [...heldReviews, ...activeReviews];
    const verified = verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [heldSet, activeSet],
      events_in_append_order: [heldEvent, activeEvent],
      governance: governance({ reviewers: [team.steward, team.independent], receipts: allReceipts }),
      as_of: asOf, verification_mode: "official",
    });
    expect(verified.state_by_subject.get(subjectKey(known))?.state).toBe("active");

    const illegal = transition({ subject: known, state: "active", reason: "review_cleared" });
    const illegalSet = dispositionSet([illegal], []);
    const illegalReviews = setReviews(illegalSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    expect(() => verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [illegalSet],
      events_in_append_order: [event(illegalSet, illegal, illegalReviews)],
      governance: governance({ reviewers: [team.steward, team.independent], receipts: illegalReviews }),
      as_of: asOf, verification_mode: "official",
    })).toThrow("public_evidence_disposition_invalid:transition");
  });

  it("rejects stale event identity before ledger-chain evaluation", () => {
    const known = subject("observation.chain");
    const team = reviewTeam();
    const rejected = transition({ subject: known, state: "rejected", reason: "record_shape_invalid" });
    const set = dispositionSet([rejected], []);
    const reviews = setReviews(set, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const issued = event(set, rejected, reviews);
    const gap = { ...issued, sequence: 2 };
    expect(() => verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [set], events_in_append_order: [gap],
      governance: governance({ reviewers: [team.steward, team.independent], receipts: reviews }),
      as_of: asOf, verification_mode: "official",
    })).toThrow("public_product_contract_invalid:digest");
  });

  it("rejects a self-consistent sequence gap and a transition after terminal rejection", () => {
    const known = subject("observation.chain-closure");
    const team = reviewTeam();
    const gapTransition = {
      ...transition({ subject: known, state: "held", reason: "review_pending" }),
      expected_next_sequence: 2,
    };
    const gapSet = dispositionSet([gapTransition], []);
    const gapReviews = setReviews(gapSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    expect(() => verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [gapSet],
      events_in_append_order: [event(gapSet, gapTransition, gapReviews)],
      governance: governance({ reviewers: [team.steward, team.independent], receipts: gapReviews }),
      as_of: asOf, verification_mode: "official",
    })).toThrow("public_evidence_disposition_invalid:chain");

    const rejected = transition({ subject: known, state: "rejected", reason: "record_shape_invalid" });
    const rejectedSet = dispositionSet([rejected], []);
    const rejectedReviews = setReviews(rejectedSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const rejectedEvent = event(rejectedSet, rejected, rejectedReviews);
    const later = transition({
      subject: known, state: "held", reason: "review_pending", previous: rejectedEvent,
    });
    const laterSet = dispositionSet([later], [rejectedEvent]);
    const laterReviews = setReviews(laterSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    expect(() => verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [rejectedSet, laterSet],
      events_in_append_order: [rejectedEvent, event(laterSet, later, laterReviews)],
      governance: governance({
        reviewers: [team.steward, team.independent],
        receipts: [...rejectedReviews, ...laterReviews],
      }),
      as_of: asOf, verification_mode: "official",
    })).toThrow("public_evidence_disposition_invalid:transition");
  });

  it("rejects replacement cycles", () => {
    const first = subject("observation.first");
    const second = subject("observation.second");
    const team = reviewTeam();
    const firstTransition = transition({
      subject: first, state: "superseded", reason: "source_projection_mismatch", replacements: [second],
    });
    const firstSet = dispositionSet([firstTransition], []);
    const firstReviews = setReviews(firstSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const firstEvent = event(firstSet, firstTransition, firstReviews);
    const secondTransition = transition({
      subject: second, state: "superseded", reason: "source_projection_mismatch", replacements: [first],
    });
    const secondSet = dispositionSet([secondTransition], [firstEvent]);
    const secondReviews = setReviews(secondSet, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);
    const secondEvent = event(secondSet, secondTransition, secondReviews);

    expect(() => verifyPublicEvidenceDispositionLedger({
      known_subjects: [first, second].sort((left, right) => scalarCompare(subjectKey(left), subjectKey(right))),
      sets: [firstSet, secondSet], events_in_append_order: [firstEvent, secondEvent],
      governance: governance({
        reviewers: [team.steward, team.independent],
        receipts: [...firstReviews, ...secondReviews],
      }),
      as_of: asOf, verification_mode: "official",
    })).toThrow("public_evidence_disposition_invalid:cycle");
  });

  it("requires rights review for rights and content-correctness reasons", () => {
    const known = subject("observation.rights");
    const team = reviewTeam();
    const proposed = transition({ subject: known, state: "rejected", reason: "rights_boundary_invalid" });
    const set = dispositionSet([proposed], []);
    const wrongReviews = setReviews(set, team.steward, team.independent, [
      "corpus_steward", "independent_corpus_reviewer",
    ]);

    expect(() => verifyPublicEvidenceDispositionLedger({
      known_subjects: [known], sets: [set], events_in_append_order: [event(set, proposed, wrongReviews)],
      governance: governance({ reviewers: [team.steward, team.independent], receipts: wrongReviews }),
      as_of: asOf, verification_mode: "official",
    })).toThrow("public_product_review_invalid:role_order");
  });
});
