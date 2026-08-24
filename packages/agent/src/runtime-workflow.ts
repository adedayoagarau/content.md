import { randomUUID } from "node:crypto";
import {
  mkdir,
  open,
  readFile,
  realpath,
  rename,
  unlink,
} from "node:fs/promises";
import { dirname, isAbsolute, join, relative, sep } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  GovernedRuntimeAuthorizationResolver,
  LocalAuthorizedEventStoreFactory,
  LocalRuntimeOperationAuthority,
  LocalRuntimeSqliteLedger,
  LocalRuntimeDetector,
  eventStoreEffectClaims,
  resolveRuntimePath,
  verifyLocalRuntimeConformance,
  type GovernedRuntimeAuthorizationRecord,
} from "@contentmd/runtime-local";
import {
  RuntimeError,
  type AuthorizedAppendOnlyEventStore,
  type AuthorizedRuntimeOperation,
  type BoundRuntimeRecordRef,
  type BoundRuntimeResource,
  type RuntimeBinding,
  type RuntimeBindingDecision,
  type RuntimeConformanceReceipt,
  type RuntimeDescriptor,
  type RuntimeDetectionReport,
  type RuntimeEffectRequest,
  type RuntimeProposalRecord,
  type StoredEvent,
} from "@contentmd/runtime-sdk";

export interface RuntimeWorkflowOptions {
  readonly clock?: () => string;
  readonly node_version?: string;
}

export interface BindRuntimeInput {
  readonly project_root: string;
  readonly proposal_path: string;
  readonly decision_path: string;
}

export interface RuntimeBindingReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly binding_id: string;
  readonly binding_digest: string;
  readonly activation_event_ref: string;
  readonly activation_event_digest: string;
  readonly projection_digest: string;
  readonly status: "activated";
  readonly activated_at: string;
  readonly receipt_digest: string;
}

interface LocalRuntimeProfileSource {
  readonly contract_version: "contentmd.local-runtime-profile/0.1.0";
  readonly descriptors: readonly RuntimeDescriptor[];
}

interface RuntimeBindingAuthorityBundle {
  readonly contract_version: "contentmd.runtime-binding-authority/0.1.0";
  readonly conformance_receipts: readonly RuntimeConformanceReceipt[];
  readonly authorization_records: readonly GovernedRuntimeAuthorizationRecord[];
}

interface RuntimeBindingProjection {
  readonly contract_version: "contentmd.runtime-binding-projection/0.1.0";
  readonly binding: RuntimeBinding;
  readonly binding_digest: string;
  readonly activation_event_ref: string;
  readonly activation_event_digest: string;
  readonly activation_sequence: number;
  readonly projected_at: string;
  readonly projection_digest: string;
}

const BINDING_DATA_CLASSES = Object.freeze([
  "runtime_binding",
  "runtime_binding_decision",
] as const);

function sameCanonical(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function bindingStream(projectId: string): string {
  return `runtime-bindings.${projectId}`;
}

function decisionStream(projectId: string): string {
  return `runtime-binding-decisions.${projectId}`;
}

function failInput(detail: string): never {
  throw new Error(`runtime_binding_input_invalid:${detail}`);
}

function failAuthorization(detail: string): never {
  throw new RuntimeError("runtime_binding_not_authorized", detail);
}

function assertExactKeys(value: object, expected: readonly string[], detail: string): void {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    return failInput(detail);
  }
}

function isNonemptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isRecordRef(value: unknown): value is BoundRuntimeRecordRef {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  assertExactKeys(value, ["content_digest", "record_id", "record_version"], "decision_contract_invalid");
  const ref = value as BoundRuntimeRecordRef;
  return isNonemptyString(ref.record_id)
    && Number.isSafeInteger(ref.record_version)
    && ref.record_version >= 1
    && isDigest(ref.content_digest);
}

const DECISION_KEYS = Object.freeze([
  "schema_version",
  "decision_id",
  "project_id",
  "proposal_ref",
  "proposal_digest",
  "selected_descriptor_ref",
  "selected_descriptor_digest",
  "canonical_replica_runtime_id",
  "decision_status",
  "actor_ref",
  "principal_ref",
  "workload_ref",
  "rationale",
  "decided_at",
  "authorization_ref",
  "authorization_digest",
  "conformance_receipt_refs",
  "applicable_control_refs",
  "decision_digest",
] as const);

function validateRecordRefs(value: unknown): value is readonly BoundRuntimeRecordRef[] {
  if (!Array.isArray(value) || value.length === 0 || !value.every(isRecordRef)) return false;
  const identities = value.map((ref) => `${ref.record_id}:${ref.record_version}:${ref.content_digest}`);
  return new Set(identities).size === identities.length;
}

function validateDecision(value: unknown): RuntimeBindingDecision {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return failInput("decision_contract_invalid");
  }
  assertExactKeys(value, DECISION_KEYS, "decision_contract_invalid");
  const decision = value as RuntimeBindingDecision;
  if (decision.schema_version !== "0.1.0"
    || !isNonemptyString(decision.decision_id)
    || decision.decision_id.includes("/")
    || decision.decision_id.includes("\\")
    || !isNonemptyString(decision.project_id)
    || !isRecordRef(decision.proposal_ref)
    || !isDigest(decision.proposal_digest)
    || !isNonemptyString(decision.selected_descriptor_ref)
    || !isDigest(decision.selected_descriptor_digest)
    || !isNonemptyString(decision.canonical_replica_runtime_id)
    || !["approved", "rejected", "superseded"].includes(decision.decision_status)
    || !isNonemptyString(decision.actor_ref)
    || !isNonemptyString(decision.principal_ref)
    || !isNonemptyString(decision.workload_ref)
    || !isNonemptyString(decision.rationale)
    || !isNonemptyString(decision.decided_at)
    || !Number.isFinite(Date.parse(decision.decided_at))
    || !isRecordRef(decision.authorization_ref)
    || !isDigest(decision.authorization_digest)
    || !validateRecordRefs(decision.conformance_receipt_refs)
    || !validateRecordRefs(decision.applicable_control_refs)
    || !isDigest(decision.decision_digest)) {
    return failInput("decision_contract_invalid");
  }
  const { decision_digest: suppliedDigest, ...preimage } = decision;
  if (suppliedDigest !== sha256Canonical(preimage)) {
    return failInput("decision_digest_invalid");
  }
  return decision;
}

function descriptorPreimage(descriptor: RuntimeDescriptor): Omit<RuntimeDescriptor, "descriptor_digest"> {
  const { descriptor_digest: _digest, ...preimage } = descriptor;
  return preimage;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}

function validateProposal(value: unknown): RuntimeProposalRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return failInput("proposal_contract_invalid");
  }
  const proposal = value as RuntimeProposalRecord;
  if (proposal.schema_version !== "0.1.0"
    || typeof proposal.proposal_id !== "string"
    || proposal.proposal_id.length === 0
    || proposal.detection_report_ref === null
    || typeof proposal.detection_report_ref !== "object"
    || !Array.isArray(proposal.candidates)
    || proposal.candidates.length === 0
    || typeof proposal.recommended_runtime_id !== "string"
    || proposal.recommended_runtime_id.length === 0
    || proposal.authority_effect !== "none"
    || !isDigest(proposal.proposal_digest)) {
    return failInput("proposal_contract_invalid");
  }
  const { proposal_digest: suppliedDigest, ...preimage } = proposal;
  if (suppliedDigest !== sha256Canonical(preimage)) {
    return failInput("proposal_digest_invalid");
  }
  return proposal;
}

async function readProposal(input: BindRuntimeInput): Promise<RuntimeProposalRecord> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(input.proposal_path, "utf8"));
  } catch {
    return failInput("proposal_file_missing_or_malformed");
  }
  const proposal = validateProposal(parsed);
  let root: string;
  let actualPath: string;
  try {
    [root, actualPath] = await Promise.all([
      realpath(input.project_root),
      realpath(input.proposal_path),
    ]);
  } catch {
    return failInput("proposal_path_invalid");
  }
  const locator = relative(root, actualPath);
  const expected = join(".contentmd/runtime/proposals", `${proposal.proposal_id}.json`);
  if (locator !== expected
    || locator.startsWith(`..${sep}`)
    || locator === ".."
    || isAbsolute(locator)) {
    return failInput("proposal_path_invalid");
  }
  return proposal;
}

async function readDecision(input: BindRuntimeInput): Promise<RuntimeBindingDecision> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(input.decision_path, "utf8"));
  } catch {
    return failInput("decision_file_missing_or_malformed");
  }
  const decision = validateDecision(parsed);
  let root: string;
  let actualPath: string;
  try {
    [root, actualPath] = await Promise.all([
      realpath(input.project_root),
      realpath(input.decision_path),
    ]);
  } catch {
    return failInput("decision_path_invalid");
  }
  const locator = relative(root, actualPath);
  const expected = join(
    ".contentmd/governance/runtime-binding-decisions",
    `${decision.decision_id}.json`,
  );
  if (locator !== expected
    || locator.startsWith(`..${sep}`)
    || locator === ".."
    || isAbsolute(locator)) {
    return failInput("decision_path_invalid");
  }
  return decision;
}

function validateProfile(value: unknown): readonly RuntimeDescriptor[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return failInput("local_runtime_profile_invalid");
  }
  const profile = value as Partial<LocalRuntimeProfileSource>;
  if (profile.contract_version !== "contentmd.local-runtime-profile/0.1.0"
    || !Array.isArray(profile.descriptors)
    || profile.descriptors.length === 0) {
    return failInput("local_runtime_profile_invalid");
  }
  const ids = new Set<string>();
  for (const candidate of profile.descriptors) {
    if (candidate === null || typeof candidate !== "object" || Array.isArray(candidate)) {
      return failInput("local_runtime_descriptor_invalid");
    }
    const descriptor = candidate as RuntimeDescriptor;
    if (descriptor.runtime_id !== "runtime.local"
      || descriptor.descriptor_id.length === 0
      || ids.has(descriptor.descriptor_id)
      || descriptor.descriptor_digest !== sha256Canonical(descriptorPreimage(descriptor))) {
      return failInput("local_runtime_descriptor_invalid");
    }
    ids.add(descriptor.descriptor_id);
  }
  return profile.descriptors;
}

async function readProfile(projectRoot: string): Promise<readonly RuntimeDescriptor[]> {
  const path = resolveRuntimePath(projectRoot, ".contentmd/runtime/local-runtime-profile.json");
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(path, "utf8"));
  } catch {
    return failInput("local_runtime_profile_missing_or_malformed");
  }
  return validateProfile(parsed);
}

async function readBindingAuthority(projectRoot: string): Promise<RuntimeBindingAuthorityBundle> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(resolveRuntimePath(
      projectRoot,
      ".contentmd/governance/runtime-binding-authority.json",
    ), "utf8"));
  } catch {
    return failAuthorization("runtime_binding_authority_missing");
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return failAuthorization("runtime_binding_authority_invalid");
  }
  const actualKeys = Object.keys(parsed).sort();
  const expectedKeys = ["authorization_records", "conformance_receipts", "contract_version"];
  if (actualKeys.length !== expectedKeys.length
    || actualKeys.some((key, index) => key !== expectedKeys[index])) {
    return failAuthorization("runtime_binding_authority_invalid");
  }
  const bundle = parsed as RuntimeBindingAuthorityBundle;
  if (bundle.contract_version !== "contentmd.runtime-binding-authority/0.1.0"
    || !Array.isArray(bundle.conformance_receipts)
    || !Array.isArray(bundle.authorization_records)) {
    return failAuthorization("runtime_binding_authority_invalid");
  }
  return bundle;
}

async function writeAtomicExclusive(path: string, value: unknown): Promise<void> {
  const bytes = canonicalJson(value);
  try {
    const existing = await readFile(path, "utf8");
    if (existing !== bytes) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "proposal_id_digest_conflict");
    }
    return;
  } catch (error) {
    if (error instanceof RuntimeError) throw error;
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const temporary = `${path}.${randomUUID()}.tmp`;
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  try {
    handle = await open(temporary, "wx", 0o600);
    await handle.writeFile(bytes, "utf8");
    await handle.sync();
    await handle.close();
    handle = null;
    await rename(temporary, path);
  } catch (error) {
    if (handle !== null) await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

function projectionPreimage(
  projection: RuntimeBindingProjection,
): Omit<RuntimeBindingProjection, "projection_digest"> {
  const { projection_digest: _digest, ...preimage } = projection;
  return preimage;
}

function validateCurrentProjection(value: unknown): RuntimeBindingProjection {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "current_binding_projection_invalid");
  }
  const projection = value as RuntimeBindingProjection;
  if (projection.contract_version !== "contentmd.runtime-binding-projection/0.1.0"
    || projection.binding.contract_version !== "contentmd.runtime-binding/0.1.0"
    || projection.binding.status !== "active"
    || projection.binding_digest !== sha256Canonical(projection.binding)
    || !isNonemptyString(projection.activation_event_ref)
    || !isDigest(projection.activation_event_digest)
    || !Number.isSafeInteger(projection.activation_sequence)
    || projection.activation_sequence < 1
    || !isNonemptyString(projection.projected_at)
    || !isDigest(projection.projection_digest)
    || projection.projection_digest !== sha256Canonical(projectionPreimage(projection))) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "current_binding_projection_invalid");
  }
  return projection;
}

async function readCurrentProjection(projectRoot: string): Promise<RuntimeBindingProjection | null> {
  const path = resolveRuntimePath(projectRoot, ".contentmd/runtime/current-runtime-binding.json");
  try {
    return validateCurrentProjection(JSON.parse(await readFile(path, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    if (error instanceof RuntimeError) throw error;
    throw new RuntimeError("runtime_canonical_commit_unavailable", "current_binding_projection_invalid");
  }
}

async function writeCurrentProjection(
  projectRoot: string,
  projection: RuntimeBindingProjection,
  expectedCurrent: RuntimeBindingProjection | null,
): Promise<void> {
  const path = resolveRuntimePath(projectRoot, ".contentmd/runtime/current-runtime-binding.json");
  const expectedBytes = expectedCurrent === null ? null : canonicalJson(expectedCurrent);
  const readCurrentBytes = async (): Promise<string | null> => {
    try {
      return await readFile(path, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  };
  if (await readCurrentBytes() !== expectedBytes) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "binding_projection_compare_and_swap_failed");
  }
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const temporary = `${path}.${randomUUID()}.tmp`;
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  try {
    handle = await open(temporary, "wx", 0o600);
    await handle.writeFile(canonicalJson(projection), "utf8");
    await handle.sync();
    await handle.close();
    handle = null;
    if (await readCurrentBytes() !== expectedBytes) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "binding_projection_compare_and_swap_failed");
    }
    await rename(temporary, path);
  } catch (error) {
    if (handle !== null) await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

function deriveBinding(input: {
  readonly proposal: RuntimeProposalRecord;
  readonly decision: RuntimeBindingDecision;
  readonly descriptor: RuntimeDescriptor;
  readonly current: RuntimeBindingProjection | null;
}): RuntimeBinding {
  const bindingVersion = (input.current?.binding.binding_version ?? 0) + 1;
  const predecessorBindingDigest = input.current?.binding_digest ?? null;
  const identity = {
    contract_version: "contentmd.runtime-binding-identity/0.1.0",
    project_id: input.decision.project_id,
    proposal_digest: input.proposal.proposal_digest,
    decision_digest: input.decision.decision_digest,
    descriptor_digest: input.descriptor.descriptor_digest,
    binding_version: bindingVersion,
    predecessor_binding_digest: predecessorBindingDigest,
  };
  const conformanceReceipts = input.descriptor.interface_bindings.map((binding) => {
    if (binding.status !== "supported") {
      throw new RuntimeError("runtime_capability_unsupported", `interface_unsupported:${binding.interface_id}`);
    }
    return binding.conformance_receipt_ref;
  });
  return {
    contract_version: "contentmd.runtime-binding/0.1.0",
    binding_id: `runtime.binding.${sha256Canonical(identity)}`,
    binding_version: bindingVersion,
    project_id: input.decision.project_id,
    status: "active",
    proposal_ref: input.proposal.proposal_id,
    proposal_digest: input.proposal.proposal_digest,
    decision_ref: input.decision.decision_id,
    decision_digest: input.decision.decision_digest,
    descriptor_ref: input.descriptor.descriptor_id,
    descriptor_digest: input.descriptor.descriptor_digest,
    integration_mode: input.descriptor.integration_mode,
    canonical_replica: {
      runtime_id: "runtime.local",
      data_location_id: "runtime.local.canonical",
    },
    interface_bindings: input.descriptor.interface_bindings,
    consistency_model: input.descriptor.consistency_model,
    transaction_boundary: "sqlite_immediate_transaction",
    idempotency_behavior: "event_id_plus_digest",
    retry_behavior: input.descriptor.retry_semantics,
    ambiguous_outcome_behavior: "read_before_retry",
    identity_provider: input.descriptor.identity_provider,
    authentication_provider: input.descriptor.authentication_provider,
    secret_resolver: "runtime.local.environment",
    data_locations: [{
      location_id: "runtime.local.canonical",
      data_class: "runtime-metadata",
      role: "canonical_replica",
    }],
    retention: { mode: "policy_bound", policy_ref: "policy.runtime.retention" },
    encryption: { at_rest: input.descriptor.encryption_behavior, in_transit: "not_applicable" },
    telemetry: { mode: "minimized", data_classes: ["runtime-metadata"] },
    health_checks: ["runtime.node", "runtime.sqlite"],
    cleanup: { mode: "explicit_authorized" },
    export: { mode: "canonical_verified" },
    adapter_digests: [{
      adapter_id: "runtime.local",
      adapter_digest: input.descriptor.descriptor_digest,
    }],
    conformance_receipts: conformanceReceipts,
    issued_at: input.decision.decided_at,
    predecessor_binding_digest: predecessorBindingDigest,
  };
}

function expectedStoredEvent(
  command: {
    readonly event_id: string;
    readonly stream_id: string;
    readonly event_type: string;
    readonly occurred_at: string;
    readonly actor_ref: string;
    readonly data_class: string;
    readonly payload: unknown;
    readonly expected_head_digest: string | null;
  },
  sequence: number,
): StoredEvent {
  const preimage = {
    event_id: command.event_id,
    stream_id: command.stream_id,
    sequence,
    schema_version: "0.1.0" as const,
    event_type: command.event_type,
    occurred_at: command.occurred_at,
    actor_ref: command.actor_ref,
    data_class: command.data_class,
    payload: command.payload,
    predecessor_digest: command.expected_head_digest,
  };
  return {
    ...preimage,
    payload_digest: sha256Canonical(command.payload),
    event_digest: sha256Canonical(preimage),
  };
}

function runtimeEffect(input: {
  readonly interface_id: string;
  readonly method: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_classes: readonly string[];
  readonly effect_input: unknown;
  readonly records: number;
  readonly runtime_binding_digest: string;
}): RuntimeEffectRequest {
  const preimage = {
    interface_id: input.interface_id,
    method: input.method,
    action: input.action,
    resources: input.resources,
    data_classes: input.data_classes,
    requested_limits: eventStoreEffectClaims(
      input.action,
      input.resources,
      input.data_classes,
      input.effect_input,
      input.records,
    ),
    runtime_binding_digest: input.runtime_binding_digest,
  };
  return { ...preimage, effect_digest: sha256Canonical(preimage) };
}

function recordFor(
  records: readonly GovernedRuntimeAuthorizationRecord[],
  action: string,
  resources: readonly BoundRuntimeResource[],
): GovernedRuntimeAuthorizationRecord {
  const matches = records.filter((record) => (
    record.claims.action === action && sameCanonical(record.claims.resources, resources)
  ));
  if (matches.length !== 1) {
    return failAuthorization(`runtime_operation_record_count:${action}`);
  }
  return matches[0]!;
}

function activationArtifacts(input: {
  readonly binding: RuntimeBinding;
  readonly decision: RuntimeBindingDecision;
  readonly decision_event: StoredEvent;
  readonly current: RuntimeBindingProjection | null;
}) {
  const bindingDigest = sha256Canonical(input.binding);
  const payload = {
    contract_version: "contentmd.runtime-binding-activation/0.1.0" as const,
    binding: input.binding,
    binding_digest: bindingDigest,
    decision_event_ref: input.decision_event.event_id,
    decision_event_digest: input.decision_event.event_digest,
    activated_at: input.decision.decided_at,
  };
  const command = {
    event_id: `event.runtime-binding-activated.${sha256Canonical(payload)}`,
    stream_id: bindingStream(input.decision.project_id),
    event_type: "runtime_binding_activated",
    occurred_at: input.decision.decided_at,
    actor_ref: input.decision.actor_ref,
    data_class: "runtime_binding",
    payload,
    expected_head_digest: input.current?.activation_event_digest ?? null,
  } as const;
  const expectedEvent = expectedStoredEvent(
    command,
    (input.current?.activation_sequence ?? 0) + 1,
  );
  const projectionPreimageValue = {
    contract_version: "contentmd.runtime-binding-projection/0.1.0" as const,
    binding: input.binding,
    binding_digest: bindingDigest,
    activation_event_ref: command.event_id,
    activation_event_digest: expectedEvent.event_digest,
    activation_sequence: expectedEvent.sequence,
    projected_at: input.decision.decided_at,
  };
  const projection: RuntimeBindingProjection = {
    ...projectionPreimageValue,
    projection_digest: sha256Canonical(projectionPreimageValue),
  };
  return { bindingDigest, command, expectedEvent, projection };
}

function detector(options: RuntimeWorkflowOptions): LocalRuntimeDetector {
  return new LocalRuntimeDetector({
    ...(options.clock === undefined ? {} : { clock: options.clock }),
    ...(options.node_version === undefined ? {} : { node_version: options.node_version }),
  });
}

export async function inspectRuntime(
  projectRoot: string,
  options: RuntimeWorkflowOptions = {},
): Promise<RuntimeDetectionReport> {
  return detector(options).inspect(projectRoot);
}

export async function proposeRuntime(
  projectRoot: string,
  options: RuntimeWorkflowOptions = {},
): Promise<RuntimeProposalRecord> {
  const descriptors = await readProfile(projectRoot);
  const runtimeDetector = detector(options);
  const report = await runtimeDetector.inspect(projectRoot);
  const proposal = await runtimeDetector.propose(report, descriptors);
  if (proposal.proposal_id.includes("/") || proposal.proposal_id.includes("\\")) {
    throw new RuntimeError("runtime_detection_inconclusive", "proposal_id_invalid");
  }
  const path = resolveRuntimePath(
    projectRoot,
    join(".contentmd/runtime/proposals", `${proposal.proposal_id}.json`),
  );
  await writeAtomicExclusive(path, proposal);
  return proposal;
}

export async function bindRuntime(input: BindRuntimeInput): Promise<RuntimeBindingReceipt> {
  const proposal = await readProposal(input);
  const decision = await readDecision(input);
  if (decision.decision_status !== "approved") {
    return failAuthorization("decision_not_approved");
  }
  if (decision.proposal_ref.record_id !== proposal.proposal_id
    || decision.proposal_ref.record_version !== 1
    || decision.proposal_ref.content_digest !== proposal.proposal_digest
    || decision.proposal_digest !== proposal.proposal_digest) {
    return failAuthorization("decision_proposal_mismatch");
  }
  const selectedCandidate = proposal.candidates.find((candidate) => (
    candidate.runtime_id === decision.canonical_replica_runtime_id
      && candidate.descriptor_ref === decision.selected_descriptor_ref
      && candidate.descriptor_digest === decision.selected_descriptor_digest
  ));
  if (selectedCandidate === undefined) {
    return failAuthorization("decision_candidate_mismatch");
  }
  if (!selectedCandidate.bindable || selectedCandidate.availability !== "available") {
    throw new RuntimeError("runtime_capability_unsupported", selectedCandidate.runtime_id);
  }
  if (selectedCandidate.runtime_id !== "runtime.local") {
    throw new RuntimeError("runtime_capability_unsupported", selectedCandidate.runtime_id);
  }
  const descriptors = await readProfile(input.project_root);
  const descriptor = descriptors.find((item) => (
    item.descriptor_id === selectedCandidate.descriptor_ref
      && item.descriptor_digest === selectedCandidate.descriptor_digest
      && item.runtime_id === selectedCandidate.runtime_id
  ));
  if (descriptor === undefined) {
    throw new RuntimeError("runtime_capability_unsupported", "selected_descriptor_missing");
  }
  const bundle = await readBindingAuthority(input.project_root);
  verifyLocalRuntimeConformance({
    descriptor,
    conformance_receipts: bundle.conformance_receipts,
    now: decision.decided_at,
  });
  const expectedConformanceRefs = descriptor.interface_bindings.map((binding) => {
    if (binding.status !== "supported") {
      throw new RuntimeError("runtime_capability_unsupported", `interface_unsupported:${binding.interface_id}`);
    }
    return binding.conformance_receipt_ref;
  });
  const suppliedConformanceRefs = bundle.conformance_receipts.map((receipt) => ({
    record_id: receipt.receipt_id,
    record_version: 1,
    content_digest: receipt.receipt_digest,
  }));
  if (!sameCanonical(decision.conformance_receipt_refs, expectedConformanceRefs)
    || !sameCanonical(suppliedConformanceRefs, expectedConformanceRefs)) {
    throw new RuntimeError("runtime_capability_unsupported", "decision_conformance_evidence_mismatch");
  }
  if (bundle.authorization_records.length !== 7) {
    return failAuthorization("runtime_binding_authority_record_set");
  }
  const resolver = new GovernedRuntimeAuthorizationResolver({
    records: bundle.authorization_records,
    clock: () => decision.decided_at,
  });
  const decisionRecords = bundle.authorization_records.filter((record) => (
    sameCanonical(record.authorization_ref, decision.authorization_ref)
  ));
  if (decisionRecords.length !== 1) {
    return failAuthorization("decision_authorization_missing");
  }
  const decisionRecord = decisionRecords[0]!;
  if (decision.authorization_digest !== decision.authorization_ref.content_digest
    || decisionRecord.authorization.request.action !== "runtime.binding.decide"
    || decisionRecord.authorization.request.subject_digest !== proposal.proposal_digest
    || decisionRecord.authorization.approval?.approval_class !== "release"
    || decisionRecord.authorization.approval.subject_ref !== decisionRecord.claims.capability_id
    || decisionRecord.authorization.approval.subject_digest !== proposal.proposal_digest
    || decisionRecord.claims.project_ref !== decision.project_id
    || decisionRecord.claims.principal_ref !== decision.principal_ref
    || decisionRecord.claims.workload_ref !== decision.workload_ref
    || !sameCanonical(decisionRecord.claims.control_refs, decision.applicable_control_refs)) {
    return failAuthorization("decision_authorization_mismatch");
  }
  const decisionAuthorization = await resolver.resolve(decision.authorization_ref);
  if (decisionAuthorization.disposition !== "allow"
    || decisionAuthorization.authorization_digest !== decision.authorization_digest) {
    return failAuthorization("decision_authorization_not_current");
  }
  const current = await readCurrentProjection(input.project_root);
  if (current !== null && current.binding.project_id !== decision.project_id) {
    return failAuthorization("predecessor_binding_project_mismatch");
  }
  const binding = deriveBinding({ proposal, decision, descriptor, current });
  const bindingDigest = sha256Canonical(binding);
  if (current !== null) {
    const openRecords = bundle.authorization_records.filter((record) => (
      record.claims.action === "runtime.event-store.open"
    ));
    const appendRecords = bundle.authorization_records.filter((record) => (
      record.claims.action === "runtime.event.append"
    ));
    const projectionRecords = bundle.authorization_records.filter((record) => (
      record.claims.action === "runtime.binding.project"
    ));
    if (openRecords.length !== 1
      || appendRecords.length !== 1
      || projectionRecords.length !== 1
      || openRecords[0]!.claims.resources[0]?.resource_id !== binding.binding_id
      || appendRecords[0]!.claims.resources[0]?.content_digest !== current.activation_event_digest
      || projectionRecords[0]!.claims.resources[0]?.content_digest !== current.projection_digest) {
      return failAuthorization("stale_predecessor_binding_digest");
    }
  }
  await mkdir(resolveRuntimePath(input.project_root, ".contentmd/runtime"), {
    recursive: true,
    mode: 0o700,
  });
  const ledger = new LocalRuntimeSqliteLedger(resolveRuntimePath(
    input.project_root,
    ".contentmd/runtime/binding-authority.sqlite",
  ));
  const authority = new LocalRuntimeOperationAuthority({
    ledger,
    authorization_resolver: resolver,
    clock: () => decision.decided_at,
    verifier_id: "runtime.local.binding-operation-authority",
  });
  const openResources = [{ resource_id: binding.binding_id, content_digest: null }];
  const decisionResources = [{ resource_id: decisionStream(decision.project_id), content_digest: null }];
  const closeResources = openResources;
  let store: AuthorizedAppendOnlyEventStore | null = null;
  let closeOperation: AuthorizedRuntimeOperation | null = null;
  try {
    const openRecord = recordFor(bundle.authorization_records, "runtime.event-store.open", openResources);
    const decisionReadRecord = recordFor(
      bundle.authorization_records,
      "runtime.event.read",
      decisionResources,
    );
    const closeRecord = recordFor(bundle.authorization_records, "runtime.event-store.close", closeResources);
    const [openOperation, decisionReadOperation, issuedCloseOperation] = await Promise.all([
      authority.issue(openRecord.authorization_ref, openRecord.claims),
      authority.issue(decisionReadRecord.authorization_ref, decisionReadRecord.claims),
      authority.issue(closeRecord.authorization_ref, closeRecord.claims),
    ]);
    closeOperation = issuedCloseOperation;
    const factory = new LocalAuthorizedEventStoreFactory({
      project_root: input.project_root,
      authority,
      permitted_data_classes: BINDING_DATA_CLASSES,
      clock: () => decision.decided_at,
    });
    store = await factory.open(binding, openOperation);
    const decisionEvents = await store.readStream({
      stream_id: decisionStream(decision.project_id),
      after_sequence: 0,
      maximum_records: 1024,
    }, decisionReadOperation);
    if (decisionEvents.length === 0) {
      return failAuthorization("decision_missing_from_canonical_events");
    }
    const decisionEvent = decisionEvents.at(-1)!;
    if (decisionEvent.event_id !== `event.${decision.decision_id}`) {
      return failAuthorization("decision_not_current");
    }
    if (decisionEvent.event_type !== "runtime_binding_decided"
      || decisionEvent.data_class !== "runtime_binding_decision"
      || decisionEvent.actor_ref !== decision.actor_ref
      || !sameCanonical(decisionEvent.payload, decision)
      || decisionEvent.payload_digest !== sha256Canonical(decision)) {
      return failAuthorization("canonical_decision_event_mismatch");
    }
    const activation = activationArtifacts({ binding, decision, decision_event: decisionEvent, current });
    const appendResources = [{
      resource_id: activation.command.stream_id,
      content_digest: activation.command.expected_head_digest,
    }];
    const readbackResources = [{
      resource_id: activation.command.stream_id,
      content_digest: null,
    }];
    const projectionResources = [{
      resource_id: ".contentmd/runtime/current-runtime-binding.json",
      content_digest: current?.projection_digest ?? null,
    }];
    const appendRecord = recordFor(bundle.authorization_records, "runtime.event.append", appendResources);
    const readbackRecord = recordFor(bundle.authorization_records, "runtime.event.read", readbackResources);
    const projectionRecord = recordFor(
      bundle.authorization_records,
      "runtime.binding.project",
      projectionResources,
    );
    const [appendOperation, readbackOperation, projectionOperation] = await Promise.all([
      authority.issue(appendRecord.authorization_ref, appendRecord.claims),
      authority.issue(readbackRecord.authorization_ref, readbackRecord.claims),
      authority.issue(projectionRecord.authorization_ref, projectionRecord.claims),
    ]);
    const appended = await store.append(activation.command, appendOperation);
    let readback: readonly StoredEvent[];
    try {
      readback = await store.readStream({
        stream_id: activation.command.stream_id,
        after_sequence: current?.activation_sequence ?? 0,
        maximum_records: 1,
      }, readbackOperation);
    } catch {
      throw new RuntimeError(
        "runtime_replica_acknowledgement_missing",
        "binding_activation_readback_mismatch",
      );
    }
    if (!sameCanonical(appended, activation.expectedEvent)
      || readback.length !== 1
      || !sameCanonical(readback[0], activation.expectedEvent)) {
      throw new RuntimeError("runtime_replica_acknowledgement_missing", "binding_activation_readback_mismatch");
    }
    const projectionEffect = runtimeEffect({
      interface_id: "runtime.binding-projection",
      method: "writeCurrent",
      action: "runtime.binding.project",
      resources: projectionResources,
      data_classes: ["runtime_binding"],
      effect_input: activation.projection,
      records: 1,
      runtime_binding_digest: descriptor.descriptor_digest,
    });
    await authority.resolveAndClaim(projectionOperation, projectionEffect);
    await writeCurrentProjection(input.project_root, activation.projection, current);
    const receiptPreimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `runtime.binding-receipt.${activation.expectedEvent.event_digest}`,
      binding_id: binding.binding_id,
      binding_digest: activation.bindingDigest,
      activation_event_ref: activation.expectedEvent.event_id,
      activation_event_digest: activation.expectedEvent.event_digest,
      projection_digest: activation.projection.projection_digest,
      status: "activated" as const,
      activated_at: decision.decided_at,
    };
    return { ...receiptPreimage, receipt_digest: sha256Canonical(receiptPreimage) };
  } finally {
    if (store !== null && closeOperation !== null) {
      await store.close(closeOperation);
    }
    ledger.close();
  }
}
