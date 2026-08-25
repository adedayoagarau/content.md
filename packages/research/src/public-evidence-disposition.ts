import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  PublicProductContractError,
  assertClosedPlainRecord,
  compareUnicodeScalar,
  immutableClone,
  sha256Bytes,
  type PublicProductDigestRef,
} from "./public-product-contracts.js";
import {
  verifyPublicProductReviewPair,
  type PublicProductReviewGovernanceEvidence,
  type PublicProductReviewReceipt,
} from "./public-product-review.js";

export interface PublicEvidenceSubjectRef {
  batch_id: string;
  record_kind: "source" | "observation";
  record_id: string;
  record_digest: string;
}

export interface PublicEvidenceDispositionSet {
  contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0";
  disposition_set_id: string;
  base_ledger_head: PublicProductDigestRef | null;
  as_of: string;
  proposed_transitions: readonly ProposedEvidenceTransition[];
  set_digest: string;
}

export type EvidenceDispositionReason =
  | "duplicate_record_id"
  | "duplicate_canonical_url"
  | "source_projection_mismatch"
  | "rights_boundary_invalid"
  | "quotation_limit_exceeded"
  | "industry_unmapped"
  | "record_shape_invalid"
  | "record_content_incorrect"
  | "superseded_by_corrected_evidence"
  | "review_pending"
  | "review_cleared";

export interface ProposedEvidenceTransition {
  subject_ref: PublicEvidenceSubjectRef;
  expected_previous_event_digest: string | null;
  expected_next_sequence: number;
  state: "active" | "held" | "rejected" | "superseded";
  reason_code: EvidenceDispositionReason;
  replacement_refs: readonly PublicEvidenceSubjectRef[];
  bounded_note: string | null;
  effective_at: string;
}

export interface PublicEvidenceDispositionEvent {
  contract_version: "contentmd.public-product-evidence-disposition/0.1.0";
  disposition_event_id: string;
  disposition_set_ref: PublicProductDigestRef;
  subject_ref: PublicEvidenceSubjectRef;
  previous_event_digest: string | null;
  sequence: number;
  state: "active" | "held" | "rejected" | "superseded";
  reason_code: EvidenceDispositionReason;
  replacement_refs: readonly PublicEvidenceSubjectRef[];
  bounded_note: string | null;
  decided_at: string;
  effective_at: string;
  review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  disposition_effect: "corpus_projection_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  event_digest: string;
}

export interface PublicEvidenceDispositionLedgerHead {
  contract_version: "contentmd.public-product-evidence-ledger-head/0.1.0";
  ledger_id: string;
  event_digests_in_append_order: readonly string[];
  event_count: number;
  ledger_digest: string;
}

export interface ResolvedEvidenceDisposition {
  subject_ref: PublicEvidenceSubjectRef;
  state: "active" | "held" | "rejected" | "superseded";
  head_event_ref: PublicProductDigestRef | null;
  terminal_replacement_refs: readonly PublicEvidenceSubjectRef[];
}

export interface VerifiedDispositionLedger {
  head: PublicEvidenceDispositionLedgerHead;
  state_by_subject: ReadonlyMap<string, ResolvedEvidenceDisposition>;
}

const SUBJECT_KEYS = Object.freeze(["batch_id", "record_kind", "record_id", "record_digest"]);
const TRANSITION_KEYS = Object.freeze([
  "subject_ref", "expected_previous_event_digest", "expected_next_sequence", "state",
  "reason_code", "replacement_refs", "bounded_note", "effective_at",
]);
const SET_KEYS = Object.freeze([
  "contract_version", "disposition_set_id", "base_ledger_head", "as_of",
  "proposed_transitions", "set_digest",
]);
const EVENT_KEYS = Object.freeze([
  "contract_version", "disposition_event_id", "disposition_set_ref", "subject_ref",
  "previous_event_digest", "sequence", "state", "reason_code", "replacement_refs",
  "bounded_note", "decided_at", "effective_at", "review_receipt_refs",
  "disposition_effect", "authority_effect", "prompt_eligibility", "training_eligibility",
  "benchmark_eligibility", "event_digest",
]);
const REASONS = new Set<EvidenceDispositionReason>([
  "duplicate_record_id", "duplicate_canonical_url", "source_projection_mismatch",
  "rights_boundary_invalid", "quotation_limit_exceeded", "industry_unmapped",
  "record_shape_invalid", "record_content_incorrect", "superseded_by_corrected_evidence",
  "review_pending", "review_cleared",
]);
const STATES = new Set(["active", "held", "rejected", "superseded"]);

function fail(code: ConstructorParameters<typeof PublicProductContractError>[0], detail?: string): never {
  throw new PublicProductContractError(code, detail);
}

function dispositionFail(detail: string): never {
  throw new TypeError(`public_evidence_disposition_invalid:${detail}`);
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function digest(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function time(value: unknown): number | null {
  if (!text(value)) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function same(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function without<T extends object>(value: T, key: string): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
}

function assertRef(value: unknown, path: string): asserts value is PublicProductDigestRef {
  assertClosedPlainRecord(value, ["object_id", "object_digest"], path);
  if (!text(value.object_id) || !digest(value.object_digest)) fail("canonical_value", path);
}

function subjectIdentity(value: PublicEvidenceSubjectRef): string {
  return `${value.batch_id}\u0000${value.record_kind}\u0000${value.record_id}\u0000${value.record_digest}`;
}

function assertSubject(value: unknown): asserts value is PublicEvidenceSubjectRef {
  assertClosedPlainRecord(value, SUBJECT_KEYS, "subject_ref");
  if (!text(value.batch_id) || !text(value.record_id)
    || (value.record_kind !== "source" && value.record_kind !== "observation")
    || !digest(value.record_digest)) fail("canonical_value", "subject_ref");
}

function assertSubjectSet(
  values: unknown,
  path: string,
  allowEmpty = true,
): asserts values is readonly PublicEvidenceSubjectRef[] {
  if (!Array.isArray(values) || (!allowEmpty && values.length === 0)) fail("canonical_value", path);
  for (const value of values) assertSubject(value);
  const identities = values.map(subjectIdentity);
  const sorted = [...identities].sort(compareUnicodeScalar);
  if (new Set(identities).size !== identities.length || !same(identities, sorted)) {
    fail("canonical_value", path);
  }
}

function assertTransition(value: unknown): asserts value is ProposedEvidenceTransition {
  assertClosedPlainRecord(value, TRANSITION_KEYS, "transition");
  assertSubject(value.subject_ref);
  if ((value.expected_previous_event_digest !== null && !digest(value.expected_previous_event_digest))
    || typeof value.expected_next_sequence !== "number"
    || !Number.isSafeInteger(value.expected_next_sequence) || value.expected_next_sequence < 1
    || !STATES.has(value.state as string)
    || !REASONS.has(value.reason_code as EvidenceDispositionReason)
    || (value.bounded_note !== null && !text(value.bounded_note))
    || time(value.effective_at) === null) fail("canonical_value", "transition");
  assertSubjectSet(value.replacement_refs, "replacement_refs");
  const replacementCount = value.replacement_refs.length;
  if ((value.state === "superseded" && replacementCount === 0)
    || (value.state !== "superseded" && replacementCount !== 0)
    || (value.state === "active" && value.reason_code !== "review_cleared")
    || (value.state === "held" && value.reason_code !== "review_pending")) {
    fail("canonical_value", "transition");
  }
}

function assertSet(value: unknown): asserts value is PublicEvidenceDispositionSet {
  assertClosedPlainRecord(value, SET_KEYS, "disposition_set");
  if (value.contract_version !== "contentmd.public-product-evidence-disposition-set/0.1.0"
    || !text(value.disposition_set_id) || time(value.as_of) === null
    || !Array.isArray(value.proposed_transitions) || value.proposed_transitions.length === 0
    || !digest(value.set_digest)) fail("canonical_value", "disposition_set");
  if (value.base_ledger_head !== null) assertRef(value.base_ledger_head, "base_ledger_head");
  for (const transition of value.proposed_transitions) assertTransition(transition);
  const identities = value.proposed_transitions.map((item) => subjectIdentity(item.subject_ref));
  if (new Set(identities).size !== identities.length
    || !same(identities, [...identities].sort(compareUnicodeScalar))) {
    fail("canonical_value", "proposed_transitions");
  }
}

function assertEvent(value: unknown): asserts value is PublicEvidenceDispositionEvent {
  assertClosedPlainRecord(value, EVENT_KEYS, "event");
  if (value.contract_version !== "contentmd.public-product-evidence-disposition/0.1.0"
    || !text(value.disposition_event_id)
    || (value.previous_event_digest !== null && !digest(value.previous_event_digest))
    || typeof value.sequence !== "number"
    || !Number.isSafeInteger(value.sequence) || value.sequence < 1
    || !STATES.has(value.state as string) || !REASONS.has(value.reason_code as EvidenceDispositionReason)
    || (value.bounded_note !== null && !text(value.bounded_note))
    || time(value.decided_at) === null || time(value.effective_at) === null
    || !Array.isArray(value.review_receipt_refs) || value.review_receipt_refs.length !== 2
    || value.disposition_effect !== "corpus_projection_only" || value.authority_effect !== "none"
    || value.prompt_eligibility !== "never" || value.training_eligibility !== "never"
    || value.benchmark_eligibility !== false || !digest(value.event_digest)) {
    fail("canonical_value", "event");
  }
  assertRef(value.disposition_set_ref, "disposition_set_ref");
  assertSubject(value.subject_ref);
  assertSubjectSet(value.replacement_refs, "replacement_refs");
  for (const receiptRef of value.review_receipt_refs) assertRef(receiptRef, "review_receipt_ref");
}

function setRef(value: PublicEvidenceDispositionSet): PublicProductDigestRef {
  return { object_id: value.disposition_set_id, object_digest: value.set_digest };
}

function eventRef(value: PublicEvidenceDispositionEvent): PublicProductDigestRef {
  return { object_id: value.disposition_event_id, object_digest: value.event_digest };
}

function createLedgerHead(
  events: readonly PublicEvidenceDispositionEvent[],
): PublicEvidenceDispositionLedgerHead {
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
  return immutableClone({ ...preimage, ledger_digest: sha256Canonical(preimage) }) as PublicEvidenceDispositionLedgerHead;
}

function ledgerHeadRef(events: readonly PublicEvidenceDispositionEvent[]): PublicProductDigestRef | null {
  if (events.length === 0) return null;
  const head = createLedgerHead(events);
  return { object_id: head.ledger_id, object_digest: head.ledger_digest };
}

function readonlyMap<K, V>(source: Map<K, V>): ReadonlyMap<K, V> {
  let view: ReadonlyMap<K, V>;
  view = Object.freeze({
    get size() { return source.size; },
    get: (key: K) => source.get(key),
    has: (key: K) => source.has(key),
    entries: () => source.entries(),
    keys: () => source.keys(),
    values: () => source.values(),
    forEach: (callback: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: unknown) =>
      source.forEach((value, key) => callback.call(thisArg, value, key, view)),
    [Symbol.iterator]: () => source[Symbol.iterator](),
  });
  return view;
}

function requiredRoles(reason: EvidenceDispositionReason): readonly [
  "corpus_steward",
  "rights_reviewer" | "independent_corpus_reviewer",
] {
  if (["rights_boundary_invalid", "quotation_limit_exceeded", "record_content_incorrect"]
    .includes(reason)) return ["corpus_steward", "rights_reviewer"];
  return ["corpus_steward", "independent_corpus_reviewer"];
}

function latestReviewTime(receipts: readonly PublicProductReviewReceipt[]): string {
  return [...receipts].map((receipt) => receipt.reviewed_at).sort(compareUnicodeScalar).at(-1)!;
}

export function derivePublicEvidenceSubjectRef(input: {
  batch_id: string;
  record_kind: "source" | "observation";
  record_id: string;
  exact_line_bytes: Uint8Array;
}): PublicEvidenceSubjectRef {
  const keys = Reflect.ownKeys(input);
  const expected = ["batch_id", "record_kind", "record_id", "exact_line_bytes"];
  if (keys.length !== expected.length || expected.some((key) => !keys.includes(key))) {
    fail("input_shape");
  }
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(input, key);
    if (typeof key !== "string" || descriptor === undefined || !descriptor.enumerable
      || !("value" in descriptor)) fail("input_shape");
  }
  if (!text(input.batch_id) || !text(input.record_id)
    || (input.record_kind !== "source" && input.record_kind !== "observation")
    || !(input.exact_line_bytes instanceof Uint8Array)) fail("canonical_value");
  if (input.exact_line_bytes.at(-1) !== 0x0a) dispositionFail("line_termination");
  let decoded: string;
  try {
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(input.exact_line_bytes);
  } catch {
    fail("canonical_value", "utf8");
  }
  try {
    const parsed = JSON.parse(decoded) as unknown;
    const identityKey = input.record_kind === "source" ? "source_id" : "observation_id";
    const record = parsed as Record<string, unknown>;
    if (parsed === null || typeof parsed !== "object"
      || Array.isArray(parsed)
      || (record[identityKey] !== input.record_id && record.record_id !== input.record_id)) {
      fail("canonical_value", "line");
    }
  } catch (error) {
    if (error instanceof PublicProductContractError) throw error;
    fail("canonical_value", "line");
  }
  return immutableClone({
    batch_id: input.batch_id,
    record_kind: input.record_kind,
    record_id: input.record_id,
    record_digest: sha256Bytes(input.exact_line_bytes),
  }) as PublicEvidenceSubjectRef;
}

export function verifyPublicEvidenceDispositionLedger(input: {
  known_subjects: readonly PublicEvidenceSubjectRef[];
  sets: readonly PublicEvidenceDispositionSet[];
  events_in_append_order: readonly PublicEvidenceDispositionEvent[];
  governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): VerifiedDispositionLedger {
  assertClosedPlainRecord(
    input,
    ["known_subjects", "sets", "events_in_append_order", "governance", "as_of", "verification_mode"],
    "input",
  );
  if (time(input.as_of) === null || input.governance.as_of !== input.as_of
    || (input.verification_mode !== "development_fixture" && input.verification_mode !== "official")
    || !Array.isArray(input.sets) || !Array.isArray(input.events_in_append_order)) {
    fail("canonical_value");
  }
  assertSubjectSet(input.known_subjects, "known_subjects");
  for (const set of input.sets) assertSet(set);
  for (const event of input.events_in_append_order) assertEvent(event);
  const setIds = input.sets.map((set) => set.disposition_set_id);
  const eventDigests = input.events_in_append_order.map((event) => event.event_digest);
  if (new Set(setIds).size !== setIds.length || new Set(eventDigests).size !== eventDigests.length) {
    fail("canonical_value", "duplicate");
  }
  for (const set of input.sets) {
    const identity = {
      base_ledger_head: set.base_ledger_head,
      as_of: set.as_of,
      proposed_transitions: set.proposed_transitions,
    };
    const expectedId = `public-product-evidence-disposition-set.${sha256Canonical(identity)}`;
    if (set.disposition_set_id !== expectedId
      || set.set_digest !== sha256Canonical(without(set, "set_digest"))) fail("digest");
  }
  for (const event of input.events_in_append_order) {
    const identityMaterial = without(event, "event_digest");
    delete identityMaterial.disposition_event_id;
    if (event.disposition_event_id !== `public-product-evidence-disposition.${sha256Canonical(identityMaterial)}`
      || event.event_digest !== sha256Canonical(without(event, "event_digest"))) fail("digest");
  }
  const known = new Map(input.known_subjects.map((item) => [subjectIdentity(item), item]));
  const sets = new Map<string, PublicEvidenceDispositionSet>(
    input.sets.map((item) => [item.disposition_set_id, item]),
  );
  const heads = new Map<string, PublicEvidenceDispositionEvent>();
  const eventsBySet = new Map<string, PublicEvidenceDispositionEvent[]>();
  const setFirstIndex = new Map<string, number>();
  for (let index = 0; index < input.events_in_append_order.length; index += 1) {
    const event = input.events_in_append_order[index]!;
    const key = subjectIdentity(event.subject_ref);
    if (!known.has(key)) dispositionFail("unknown_subject");
    const set = sets.get(event.disposition_set_ref.object_id);
    if (set === undefined || !same(setRef(set), event.disposition_set_ref)) fail("reference_binding");
    const proposed = set.proposed_transitions.filter(
      (item) => subjectIdentity(item.subject_ref) === key,
    );
    if (proposed.length !== 1) fail("reference_binding", "transition");
    const transition = proposed[0]!;
    if (event.previous_event_digest !== transition.expected_previous_event_digest
      || event.sequence !== transition.expected_next_sequence
      || event.state !== transition.state || event.reason_code !== transition.reason_code
      || !same(event.replacement_refs, transition.replacement_refs)
      || event.bounded_note !== transition.bounded_note || event.effective_at !== transition.effective_at) {
      fail("reference_binding", "transition");
    }
    const previous = heads.get(key);
    if (event.previous_event_digest !== (previous?.event_digest ?? null)
      || event.sequence !== (previous?.sequence ?? 0) + 1) dispositionFail("chain");
    const previousState = previous?.state ?? "active";
    if ((previousState === "rejected" || previousState === "superseded")
      || (event.state === "active" && (previousState !== "held" || event.reason_code !== "review_cleared"))
      || (previousState === "held" && event.state === "held")
      || (previousState === "active" && event.state === "active")) dispositionFail("transition");
    if (time(event.effective_at)! > time(input.as_of)!) dispositionFail("future_effective_time");
    for (const replacement of event.replacement_refs) {
      const replacementKey = subjectIdentity(replacement);
      if (!known.has(replacementKey)) dispositionFail("unknown_replacement");
      if (replacementKey === key) dispositionFail("cycle");
    }
    const roles = requiredRoles(event.reason_code);
    const receipts = verifyPublicProductReviewPair({
      kind: "evidence_disposition_set",
      subject_ref: setRef(set),
      receipt_refs: event.review_receipt_refs,
      required_roles: roles,
      governance: input.governance,
      verification_mode: input.verification_mode,
    });
    if (event.decided_at !== latestReviewTime(receipts)) fail("reference_binding", "decided_at");
    heads.set(key, event);
    const setEvents = eventsBySet.get(set.disposition_set_id) ?? [];
    setEvents.push(event);
    eventsBySet.set(set.disposition_set_id, setEvents);
    if (!setFirstIndex.has(set.disposition_set_id)) setFirstIndex.set(set.disposition_set_id, index);
  }
  for (const [setId, issuedEvents] of eventsBySet) {
    const set = sets.get(setId)!;
    if (issuedEvents.length !== set.proposed_transitions.length) dispositionFail("partial_set");
    const firstIndex = setFirstIndex.get(setId)!;
    if (!same(set.base_ledger_head, ledgerHeadRef(input.events_in_append_order.slice(0, firstIndex)))) {
      dispositionFail("base_ledger_head");
    }
  }
  const resolving = new Set<string>();
  const resolved = new Map<string, PublicEvidenceSubjectRef[]>();
  const resolve = (key: string): PublicEvidenceSubjectRef[] => {
    const cached = resolved.get(key);
    if (cached !== undefined) return cached;
    if (resolving.has(key)) dispositionFail("cycle");
    resolving.add(key);
    const event = heads.get(key);
    let result: PublicEvidenceSubjectRef[];
    if (event === undefined || event.state === "active") {
      result = [known.get(key)!];
    } else if (event.state === "superseded") {
      result = event.replacement_refs.flatMap((replacement) => resolve(subjectIdentity(replacement)));
    } else {
      result = [];
    }
    resolving.delete(key);
    const unique = [...new Map(result.map((item) => [subjectIdentity(item), item])).values()]
      .sort((left, right) => compareUnicodeScalar(subjectIdentity(left), subjectIdentity(right)));
    if (event?.state === "superseded" && unique.length === 0) dispositionFail("replacement_invalid");
    resolved.set(key, unique);
    return unique;
  };
  const state = new Map<string, ResolvedEvidenceDisposition>();
  for (const [key, subject] of known) {
    const event = heads.get(key);
    const currentState = event?.state ?? "active";
    const terminalReplacements = currentState === "superseded" ? resolve(key) : [];
    state.set(key, immutableClone({
      subject_ref: subject,
      state: currentState,
      head_event_ref: event === undefined ? null : eventRef(event),
      terminal_replacement_refs: terminalReplacements,
    }) as ResolvedEvidenceDisposition);
  }
  return Object.freeze({
    head: createLedgerHead(input.events_in_append_order),
    state_by_subject: readonlyMap(state),
  });
}
