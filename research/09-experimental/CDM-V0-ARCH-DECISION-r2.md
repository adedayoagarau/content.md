---
title: CDM v0 architecture decision successor r2
status: proposed
created: 2026-08-18
updated: 2026-08-18
decision_packet_id: CDM-V0-ARCH-DECISION-r2
predecessor_decision_packet_id: CDM-V0-ARCH-DECISION-r1
proposal_authority: user-authorized-draft-only
architecture_approval_status: not-approved
fixture_binding_status: blocked-awaiting-exact-approved-track-b-release
fixture_binding_id: not-established
fixture_design_contract_id: SIBF-CHK-DESIGN-CONTRACT-0.2
fixture_design_contract_status: proposed-not-for-use
planning_authority: none
implementation_authority: none
execution_authority: none
schema_status: experimental-proposed
canonical_claim_labels:
  - research_finding
  - inference
  - proposal
scope: Single-process deterministic modular static harness for one exact approved Track B evaluation release
---

# CDM v0 architecture decision successor r2

Claim convention: **[Research finding]** records a conclusion already supported by the linked repository research; **[Inference]** is a bounded conclusion derived from that research; **[Proposal]** is a revision-ready architecture choice or gate in this packet. These labels follow the [canonical claim vocabulary](../00-method/research-protocol.md#canonical-claim-and-source-vocabulary). No unlabeled architecture statement in this document is approved or implemented.

## Authority and disposition

**[Research finding]** The user approved creating this proposal document. That approval is drafting permission only. It is not formal fixture approval, architecture approval, implementation-plan approval, scaffolding or build approval, execution authority, a capability grant, a security or privacy decision, a product-study authorization, or release approval.

**[Research finding]** `CDM-V0-ARCH-DECISION-r1` is revision-required because it was bound to the falsified `SIBF-CHK-001/design-0.1` expression denominator. The current open-development material is a non-executable pressure test, not an approved Track B release, runnable operator package, sealed evaluator, private holdout, or implementation input. See the [r1 disposition](v0-architecture-and-build-decision-packet.md#decision-requested), [fixture materialization finding](shared-benchmark-fixture-specification.md#18-august-2026-materialization-finding), and [Phase 4 register](materials-and-access-register.md#phase-4--static-read-only-harness).

**[Research finding]** A proposed successor design contract now exists as [`SIBF-CHK-DESIGN-CONTRACT-0.2`](SIBF-CHK-DESIGN-CONTRACT-0.2.md#result-and-authority-boundary). Its status is `proposed` and `not-for-use`. It proposes a public development Track A release, `SIBF-CHK-001-DEV-0.2.0`, and a separately authored future Track B whose release remains `not-established`; it creates and approves neither release. The design contract is source input for this r2 proposal, not a fixture approval record or a valid binding.

**[Proposal]** This `r2` packet defines the architecture that could be submitted for formal decision after one exact Track B evaluation release is separately approved. It remains `proposed`, revision-ready, and non-executable. It authorizes no implementation plan, repository or package scaffolding, dependency installation, build, test execution, harness run, product study, external research, account use, or release.

**[Proposal]** Gate: no implementation plan may start until both conditions are true:

1. an exact Track B release has a formal approval record that names its fixture ID, release/design version, task-packet versions, manifest version and digest, denominators, rights disposition, review scope, approvers, conditions, effective date, expiry or review trigger, and revocation route; and
2. this packet has been revised to bind those exact values and has then received the formal architecture decision described in [the approval ladder](#approval-ladder).

Until then, `fixture_binding_id` remains `not-established`, `architecture_approval_status` remains `not-approved`, and every planning, build, and execution request must be refused.

**[Proposal]** Gate: approval of `SIBF-CHK-DESIGN-CONTRACT-0.2` as a design would still not satisfy the binding gate. The bound input must be an actually minted and separately approved `SIBF-CHK-002` Track B release/package whose record permits this exact static-harness role. Track A remains public development/calibration material and is not an r2 binding candidate. The future r2 revision must not infer Track B eligibility from a proposed release name, family membership, exposure state, seal state, or B1 role.

## Decision proposed for later formal review

**[Proposal]** After the binding gate is satisfied, approve **implementation planning only** for a single-process, deterministic, modular, local static harness bound to exactly one approved Track B evaluation release. The planned dataflow is:

```text
trusted run envelope and current authority checks
  -> exact-path one-file manifest bootstrap reader
  -> raw-manifest digest verifier
  -> strict manifest parser and read-plan verifier
  -> exact-root allowlisted inert payload reader
  -> payload, aggregate, version and denominator verifier
  -> semantic identity normalizer
  -> typed graph compiler
  -> four-valued hard-rule engine
  -> blank human-evaluation packet builder
  -> ephemeral canonical result and human-readable report
  -> bounded in-memory observability and cleanup result
```

The later architecture approval, if granted, would authorize only an implementation plan for this boundary. It would not authorize scaffolding, dependency acquisition, compilation, execution, persistence, product comparison, or a study.

## Proposed system boundary

**[Inference]** The research supports testing deterministic representation and refusal behavior before introducing models, judge agents, connectors, mutation, or production repositories. The candidate model separates semantic messages, expressions, occurrences, evidence, decisions, delivery, and evaluation; the security model requires a current phase result and an independent exact task grant; and the evaluation model requires fixture validity before quality claims. See [message and expression identity](../08-synthesis/candidate-system-model.md#message-and-expression-identity), [capability and authorization architecture](../05-technology/security-privacy-and-trust-boundaries.md#capability-and-authorization-architecture), and [Layer 0 fixture validity](../06-evaluation/evaluation-and-benchmarks.md#layer-0-fixture-and-environment-validity).

| Boundary | Proposed r2 choice | Explicit exclusion |
| --- | --- | --- |
| Process | One operating-system process; deterministic modules communicate through immutable in-memory values | Worker processes, subprocesses, shells, browser/app/device control, local servers, plugins, dynamic fixture imports |
| Fixture | One exact, formally approved Track B release ID/version/operator-manifest digest; binding currently `not-established` | Track A, `SIBF-CHK-001/design-0.1`, the open-development pressure test as runnable input, an unreleased Track B candidate, arbitrary repositories, production sources |
| Read | First the exact manifest path from the trusted approved binding, then only regular payload files in its verified read plan beneath one enrolled canonical root | Root discovery, parent/sibling reads, home/workspace scans, symlinks, hard-link ambiguity, devices, sockets, archives, or payload reads before manifest verification |
| Compute | Parsing, verification, normalization, graph construction, deterministic four-valued rules, blank packet construction, canonical serialization | Generation, translation, embeddings, probabilistic inference, model or judge-agent evaluation, human-score synthesis |
| Write | No file, repository, fixture, cache, database, log, account, remote, or source-of-truth write path | Patch/apply, CI enforcement, publication, telemetry, durable memory, result append, temp-file spill |
| Network | No network API or socket capability and no HTTP service | Web research, loopback service, DNS, MCP, connector, model/API, update check, remote logging |
| Identity and secrets | No account, credential, token, cookie, keychain, environment-secret, or personal-data requirement | Authentication, OAuth, credential discovery, secret ingestion or reporting |
| Output lifetime | Canonical result, report, and diagnostic events exist only in bounded process memory and the immediate caller return value | Harness-owned persistence, caches, crash uploads, raw-content logs, automatic evidence append |

**[Proposal]** The harness must expose no HTTP surface. The broader research proposal's optional HTTP adapter is explicitly deferred; the first slice is an in-process operation contract only. See the [broader minimum harness API](voice-tone-graph-and-measurement.md#47-harness-properties) and its [minimal HTTP surface](voice-tone-graph-and-measurement.md#49-minimal-http-surface).

## Immutable operation envelope

**[Proposal]** Every attempted run is described by an immutable `StaticRunEnvelope` assembled outside untrusted fixture content. All keys use UTF-8 JSON `snake_case`. Duplicate keys, unknown required-control classes, missing fields, synthesized defaults, non-canonical encodings, and version conflicts are rejected before any fixture byte is read.

| Field group | Required content |
| --- | --- |
| Operation identity | `request_id`, proposed operation `fixture.validate_and_evaluate`, harness version, envelope schema ID/version, policy version |
| Fixture binding | Approved Track B fixture/release ID and design version, release-approval record, task-packet IDs/versions, exact operator-manifest relative path, expected raw-manifest digest, manifest schema ID/version, and manifest-bootstrap byte ceiling |
| Root | Caller-supplied absolute enrolled root, canonical root resolved by the trusted boundary, platform/filesystem profile |
| Phase eligibility | Canonical phase `discover.local`; current `SEC-P0-A` result-record ID/version, disposition `pass`, evaluated scope, evidence digest, expiry and invalidation state |
| Exact task grant | Grant ID/version, issuer, authenticated principal/workload, exact operation, exact canonical root and fixture version, data boundary, no-egress/no-write constraints, issued time, expiry, revocation state/check and cancellation route |
| Control dispositions | Exact typed dispositions for connection authorization, data processing, durable memory, persistence, and telemetry; each must be `not_applicable` with policy evidence for this no-connector/no-egress/no-persistence slice |
| Determinism | Approved fixture clock/seed values when fixture semantics require them, canonicalization contract, hash contract, rule-profile versions, graph schema version, result/report schema versions |
| Resource policy | Exact limits from [resource limits](#resource-limits-and-cancellation), cancellation signal, output ceiling |

**[Proposal]** Gate: a proposed architecture decision, a fixture approval, a `SEC-P0-A` pass, and a task grant are four different records. None implies or widens another. Missing, mismatched, expired, revoked, unverifiable, or out-of-scope authority data returns `denied_control` and performs no fixture read.

## Module interfaces

**[Proposal]** Modules are pure or capability-minimized transformations. They receive immutable inputs and return immutable outputs or a typed refusal. No module may acquire a new capability, read environment state not present in the envelope, mutate an earlier value, repair fixture input silently, or persist data.

| Module | Immutable input | Immutable output | Denied behavior |
| --- | --- | --- | --- |
| `boundary_guard` | `StaticRunEnvelope`, trusted policy snapshot, current revocation result | `AuthorizedStaticRun` containing the exact root and restrictions, or `HarnessRefusal` | Reading fixture content before authority is proven; treating mode, approval, or gate pass as a grant |
| `manifest_bootstrap_reader` | `AuthorizedStaticRun` carrying the exact manifest path and bootstrap byte ceiling | `RawManifestBytes` from that one regular file, plus byte count and exact path | Discovery, directory enumeration, sibling/parent reads, link following, decoding, parsing, payload opens, or reading beyond the bootstrap ceiling |
| `raw_manifest_digest_verifier` | `RawManifestBytes`, expected raw-manifest digest from the trusted approved binding | `DigestVerifiedRawManifest` or typed refusal | Decoding or parsing before the raw-byte digest matches; accepting a changed, missing, oversized, linked, or non-regular manifest |
| `strict_manifest_parser` | `DigestVerifiedRawManifest`, approved manifest schema ID/version and canonical-root profile | `VerifiedManifestReadPlan` containing normalized unique payload paths, declared media classes, per-file and aggregate size ceilings, expected raw digests, and safe decoding constraints | Unknown/duplicate keys or paths, traversal/absolute paths, unsupported media/encoding, parser hooks, executable imports, ambiguous normalization, or any payload open on failure |
| `exact_root_allowlisted_payload_reader` | `AuthorizedStaticRun`, `VerifiedManifestReadPlan` | Ordered inert `RawPayloadSet` with path, byte length, declared media class and raw bytes/digest | Discovery or directory enumeration; following links; parent/sibling or non-plan reads; escaping exact-root containment; decoding, parsing, executing or interpreting payload instructions |
| `payload_integrity_verifier` | `RawPayloadSet`, `VerifiedManifestReadPlan`, approved fixture binding | `VerifiedFixtureSnapshot` with payload and aggregate digests, verified versions and recomputed denominators | Accepting missing/duplicate payloads, digest/size/media/version/aggregate/denominator mismatch, unsafe decoding, or favorable repair; claiming rejection of unmanifested objects without a separately specified metadata-only package-shape check |
| `semantic_identity_normalizer` | `VerifiedFixtureSnapshot`, experimental identity profile | `NormalizedIdentitySet` plus explicit conflicts/unknowns | Literal-only identity, lossy deduplication, inferred behavior/approval/applicability, favorable repair |
| `typed_graph_compiler` | `NormalizedIdentitySet`, graph schema/profile | `TypedGraphSnapshot` with nodes, edges, provenance, unresolved states and content digest | Collapsing evidence, decision, delivery, or evaluation states; dangling references; untyped fallback edges |
| `hard_rule_engine` | `TypedGraphSnapshot`, immutable approved-for-fixture hard-rule profile | Ordered `HardRuleResultSet` and aggregate gate | Soft scoring, learned rules, external lookup, waiver invention, averaging away failure or unknown |
| `human_packet_builder` | Graph snapshot, rule results, blank packet schema, reviewer routing metadata | `BlankHumanEvaluationPacket` with evidence slots and no judgments | Prefilling scores, gold answers, adjudication, recommendations, model output, inferred reviewer authority |
| `canonical_result_builder` | All prior content-addressed outputs | `EphemeralRunResult` and `EphemeralHumanReport` | File/database/log writes, HTTP response handling, hidden caches, timestamps or host noise inside canonical payload |
| `ephemeral_observer` | Bounded metadata-only events | In-memory ordered event ring and terminal counters | Raw fixture text, secrets, stack dumps, persistent telemetry, remote emission |
| `cleanup_coordinator` | Authorized run, allocated-buffer registry, terminal state | `CleanupResult` with released-resource counts and residual status | Deleting fixture/source files, claiming secure memory erasure, concealing incomplete cleanup |

### Interface invariants

**[Proposal]** Every module output carries `schema_id`, `schema_version`, `producer_module`, `producer_version`, sorted `input_digest_refs`, and its own `content_digest`. A module verifies all inbound schema/version/digest references before work. No output may claim approval, implementation, build, release, live observation, linguistic quality, accessibility conformance, localization quality, legal compliance, or user outcome.

**[Proposal]** Manifest bootstrap is fail-closed and non-circular. The trusted approved binding—not fixture-controlled content—supplies the exact manifest path, expected raw digest, schema/version, and bootstrap byte ceiling. The boundary opens only that exact regular file, verifies its raw bytes before any decode or parse, and opens zero payload files on any path, size, digest, schema, decoding, normalization, uniqueness, media-class, or read-plan failure. The payload reader accepts only normalized unique paths in `VerifiedManifestReadPlan`, preserves exact-root containment, follows no links, and performs no discovery or directory enumeration.

**[Proposal]** The base harness does not inspect directory membership, so it makes no claim that unmanifested sibling objects were rejected. A future package-shape check could enumerate metadata only if a separately reviewed contract specifies the exact root, enumeration method, object classes, limits, result schema, and authority; it would remain outside this reader and cannot open unmanifested payload content.

**[Proposal]** Canonical machine records use duplicate-key-rejecting UTF-8 JSON, `snake_case`, lexicographically ordered unordered collections, explicit `null` only where the schema permits it, and RFC 8785 canonicalization before SHA-256 hashing. Digests use `sha256:` followed by lowercase hexadecimal. Human-readable Markdown is derived from the canonical result and never parsed back as authority.

## Experimental schema family

**[Proposal]** The r2 architecture refers to the following proposed schema family. These identifiers describe a reviewable contract; they are not packaged schemas and do not imply implementation.

| Record | Proposed schema ID | Required invariants |
| --- | --- | --- |
| Run envelope | `cdm.experimental.v0.r2/static_run_envelope@0.2.0-proposed.1` | Complete authority, fixture, control, determinism and resource envelope; closed object |
| Raw manifest | `cdm.experimental.v0.r2/raw_manifest_bytes@0.2.0-proposed.1` | One exact-path regular-file read bounded by the approved bootstrap ceiling; no decode, parse, enumeration or payload open |
| Verified manifest read plan | `cdm.experimental.v0.r2/verified_manifest_read_plan@0.2.0-proposed.1` | Raw digest verified before strict parse; normalized unique payload paths, media classes, size ceilings, expected digests and safe decoding constraints |
| Verified fixture | `cdm.experimental.v0.r2/verified_fixture_snapshot@0.2.0-proposed.1` | Exact approved Track B release binding, sorted allowlisted operator payloads, raw-byte and aggregate digests, verified versions, declared and recomputed denominators |
| Semantic identity | `cdm.experimental.v0.r2/semantic_identity@0.2.0-proposed.1` | Distinct semantic message, expression slot/version and occurrence identities; no literal-only key |
| Typed graph | `cdm.experimental.v0.r2/typed_graph_snapshot@0.2.0-proposed.1` | Typed nodes/edges, provenance, scope, explicit unknown/conflict, referential integrity |
| Hard-rule result | `cdm.experimental.v0.r2/hard_rule_result@0.2.0-proposed.1` | One exact rule/profile/context binding and one of four values |
| Human packet | `cdm.experimental.v0.r2/blank_human_evaluation_packet@0.2.0-proposed.1` | Context/evidence routing with all judgment fields structurally blank |
| Run result | `cdm.experimental.v0.r2/ephemeral_run_result@0.2.0-proposed.1` | Full input/output digest chain, limitations, refusals/findings, no persisted-record reference |
| Human report | `cdm.experimental.v0.r2/ephemeral_human_report@0.2.0-proposed.1` | Deterministic projection of run result, explicit non-claims and unsupported planes |
| Error/refusal | `cdm.experimental.v0.r2/harness_refusal@0.2.0-proposed.1` | Stable code, stage, safe detail, affected digest refs, no raw sensitive content |

**[Proposal]** Gate: the exact schema versions to implement are not approved by this packet. The future planning decision must either freeze these proposed identifiers or record explicit replacements. No public `CONTENT.md`, compatibility promise, migration contract, production adapter, or canonical field authority may inherit from this experimental family. This follows the [candidate-model validation boundary](../08-synthesis/candidate-system-model.md#validation-tasks).

## Semantic identity normalization

**[Proposal]** The normalizer must preserve at least two identities:

```text
semantic_message_id =
  product + journey + experience_event + actor_or_need + semantic_state
  + intended_outcome_or_content_job + represented_concept_or_action

expression_identity =
  semantic_message_id + locale + channel + surface + component_or_pattern
  + slot + visible_or_assistive_modality + variant_or_experiment
  + runtime_condition + scoped_applicability

occurrence_identity =
  expression_identity + source_artifact_id + exact_source_coordinate
```

**[Proposal]** Jurisdiction remains an explicit applicability dimension. A jurisdiction change that alters controlled meaning, rights, consequence, or required action creates a distinct or scoped semantic decision; a permissible realization-only difference scopes the expression. Missing axes remain `unknown` or `absent` as declared by the fixture profile. They must never be replaced with plausible values.

**[Proposal]** Gate: the exact Track B release approval must state the candidate, included-occurrence, exclusion, semantic-message, expression-slot and expression-version denominators and must provide independently reviewed new-sibling lineage, originality/material-difference evidence, and independently recomputed counts. It must not invent a one-to-one crosswalk to Track A. No number from the open-development pressure test becomes authoritative through repetition in this packet.

**[Proposal]** Gate: the proposed dual-track contract keeps Track A development evidence and Track B evaluation material non-interchangeable. The r2 harness binding must name one exact approved Track B operator-package role and manifest. It must not expose evaluator/gold material, bind Track A, convert public development material into a private holdout, or carry Track A counts into Track B as targets. See the [dual-track binding design](SIBF-CHK-DESIGN-CONTRACT-0.2.md#binding-design-outcome-if-separately-approved).

## Typed graph contract

**[Proposal]** The graph is a disposable, experiment-scoped snapshot, not a graph database or durable memory. Minimum node families are fixture artifact, evidence source, behavior fact, unknown, conflict, semantic message, expression slot, expression version, occurrence, locale, channel, surface, component/pattern, rule, finding and evaluation-packet reference. Minimum edge families include `supported_by`, `disputed_by`, `realizes`, `occurs_at`, `scoped_to`, `variant_of`, `governed_by`, `checked_by`, `conflicts_with`, and `routed_for_review`.

**[Proposal]** Evidence dimensions, decision state, delivery state, and evaluation result remain orthogonal. The graph compiler must preserve `unobserved/observed/corroborated`, `undisputed/disputed`, `current/stale`, `active/superseded`, and `none/inferred/assumed` evidence dimensions without converting any of them into approval. See [independent evidence, decision, and delivery records](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records).

**[Proposal]** Node and edge IDs are fixture-owned stable IDs or deterministic content-addressed IDs under a frozen preimage contract. ID collisions, dangling references, illegal edge types, version disagreement, or a graph digest mismatch fail closed; no repair record is synthesized.

## Four-valued hard-rule engine

**[Proposal]** Each applicable hard rule returns exactly one value:

```text
PASS | FAIL | UNKNOWN | NOT_APPLICABLE
```

The aggregate gate is `FAIL` if any applicable rule fails; `UNKNOWN` if none fails and any required applicable rule is unknown; `PASS` only when every required applicable rule passes; and `NOT_APPLICABLE` only when the fixture declares no applicable hard rules. `UNKNOWN` is not partial success. This adopts the [four-valued hard-constraint contract](voice-tone-graph-and-measurement.md#12-hard-constraints-use-four-valued-results-not-scores).

**[Proposal]** Every result binds the exact rule ID/version, rule-profile digest, graph digest, semantic/expression/occurrence scope, applicability evidence, outcome, safe evidence references, and deterministic reason code. The engine has no waiver mechanism in this slice. A `FAIL` or required `UNKNOWN` stops progression to any later soft evaluator; the blank packet may still expose the unresolved item for human routing without scoring it.

**[Proposal]** Hard-rule outcomes are evaluation records only. They never approve meaning, mutate a source, establish accessibility or localization quality, grant execution, or authorize enforcement.

## Blank human-evaluation packet

**[Proposal]** The packet builder produces a schema-valid but judgment-empty review packet. It may include fixture identity, task and context, evidence references, graph/rule versions, candidate text where allowed by the exact Track B release approval, declared voice/tone dimensions, accessibility and locale routing, conflict/unknown prompts, and abstention options.

**[Proposal]** The following fields must be present and blank by contract: reviewer identity, qualification assertion, ratings, pairwise preference, evidence-span selection, confidence or support state, rationale, abstention reason, disagreement, adjudication and approval. Blank means the schema's explicit unfilled state, not zero, `PASS`, an empty-string opinion, or a default judgment.

**[Proposal]** Gate: filling, storing, comparing, calibrating, or adjudicating these packets is outside r2. It requires a separately approved human-evaluation protocol, qualified reviewers, blinded materials, persistence decisions and grants where records are retained. No model or judge agent is present. See [model-judge controls](../06-evaluation/evaluation-and-benchmarks.md#model-judge-controls) and the broader [judge-agent contracts](product-study-and-judge-agent-system.md#agent-contracts).

## Ephemeral result, report and observability

**[Proposal]** On a valid run, the harness returns one canonical machine result and one deterministic human-readable report to the immediate caller. The harness contains no append adapter, filesystem output, database client, cache, network logger, crash uploader, telemetry exporter or HTTP transport. A caller that wishes to persist output would require a different architecture revision and separately approved `draft.patch`/`SEC-P0-C` append path; this packet provides none.

**[Proposal]** The canonical result excludes wall-clock time, hostnames, absolute paths, process IDs, random IDs, memory addresses and stack traces. It uses the fixture-provided frozen clock/seed only when semantically required. Identical approved input bytes, versions, policy values and limits must produce byte-identical canonical results and reports.

**[Proposal]** Nonpersistent observability is a bounded in-memory ring containing monotonic sequence, module ID/version, event code, input/output digest references, byte/record counters, resource-limit counters, refusal code and terminal state. It excludes raw source text, credentials, personal data, complete manifests, prompts, reviewer data and stack dumps. Diagnostic events are cleared during cleanup and are not part of the canonical result unless represented as aggregate counters and stable reason codes.

## Data, egress and persistence controls

**[Proposal]** The allowed data is fictional synthetic content classified by the exact approved Track B release record. Real customer, account, participant, proprietary vendor, credential, secret, regulated, production, or personal-browser data is prohibited. A seeded-secret probe is allowed only as inert synthetic test data and must never appear verbatim in results, reports, diagnostics or errors.

**[Proposal]** Network and model egress are structurally absent, not merely disabled by prompt instruction. The future implementation plan must identify the operating-system containment that denies sockets and all filesystem paths outside the enrolled root and runtime code. The harness may not inspect environment variables, keychains, browser profiles, shell configuration or credential stores.

**[Proposal]** Persistence, durable memory, telemetry, connection authorization and data processing are each explicitly `not_applicable` for the run, with a current policy rationale in the envelope. Any request to change one disposition to applicable is an architecture expansion and must be refused as `unsupported_capability`.

## Resource limits and cancellation

**[Proposal]** The following are r2 review ceilings, not measured performance claims. A later approved plan may lower them but may not raise them without an architecture revision and renewed threat/resource review.

| Resource | Proposed hard ceiling |
| --- | ---: |
| Manifested regular files | 256 |
| Root depth from enrolled root | 12 path segments |
| One file | 4 MiB |
| All fixture bytes | 32 MiB |
| Parsed records | 20,000 |
| Graph nodes | 25,000 |
| Graph edges | 100,000 |
| Hard-rule evaluations | 250,000 |
| Canonical result plus report | 16 MiB |
| In-memory diagnostic events | 4,096 |
| Resident memory attributable to run | 512 MiB |
| CPU time | 10 seconds |
| Wall time | 30 seconds |
| Threads | 1 |
| Child processes and network requests | 0 |

**[Proposal]** A ceiling breach, cancellation signal, allocation failure, parser nontermination guard, or output overflow terminates the run, returns a typed refusal if a bounded safe refusal can be constructed, marks all partial products noncanonical, and enters cleanup. No retry, limit increase, file skipping or partial-success result occurs automatically.

## Fail-closed states

**[Proposal]** Control denial occurs before fixture read. Content and integrity refusals occur at the earliest detecting module. `FAIL` and `UNKNOWN` hard-rule outcomes are valid bounded evaluation results, not process errors; they still prevent any downstream claim of hard eligibility.

| Code | Meaning | Terminal disposition |
| --- | --- | --- |
| `denied_control` | Missing, mismatched, expired, revoked or unverifiable gate/grant/control envelope | No fixture read; refusal |
| `refused_unapproved_fixture` | Fixture/release ID, operator manifest, or approval record is not the exact formally approved Track B binding | No fixture read; refusal |
| `root_boundary_violation` | Noncanonical root, traversal, symlink, alias, hard-link ambiguity, special file or escape attempt | Refusal; no affected content returned |
| `manifest_invalid` | Missing/oversized/non-regular manifest; duplicate or unknown key/path; ambiguous normalization; unsafe decoding constraint; unsupported schema/media class; malformed read-plan entry | Refusal; zero payload opens |
| `integrity_mismatch` | Raw-manifest, payload-byte, aggregate, version or declared-denominator mismatch | Refusal; zero payload opens on manifest mismatch and no silent repair |
| `schema_invalid` | Duplicate/unknown key, illegal encoding/type, version mismatch or unsupported schema | Refusal |
| `identity_collision` | Distinct semantic contexts collapse to one identity or a required identity axis is unresolved contrary to schema | Refusal with safe coordinates |
| `graph_invariant_failure` | Dangling reference, illegal edge, cycle where prohibited or content-digest mismatch | Refusal |
| `unsupported_source_class` | Manifested source class has no approved inert parser/profile | Refusal or explicit unsupported result only as fixture contract specifies |
| `resource_limit_exceeded` | Any hard resource ceiling is reached | Cancel, discard partial outputs, cleanup |
| `cancelled` | Authorized caller cancellation is observed | Discard partial outputs, cleanup |
| `unsupported_capability` | Model, judge, network, browser, credential, write, persistence, telemetry, service, install or process capability is requested | Refusal |
| `internal_invariant_failure` | Unexpected program state without a safe domain result | Minimal redacted refusal, cleanup, no success claim |
| `cleanup_incomplete` | Allocations or transient runtime resources cannot be accounted for | Terminal invalid result; blocks readiness claim |

## Deterministic test and evaluation matrix

**[Proposal]** The matrix below defines evidence a future plan must specify. It is not permission to create tests or run them.

| Plane | Positive case | Negative/adversarial case | Required result |
| --- | --- | --- | --- |
| Authority | Current exact `SEC-P0-A` pass and unrevoked exact grant | Missing/expired/revoked/mismatched gate, grant or N/A disposition | Valid case enters reader; every negative returns `denied_control` before read |
| Fixture binding | Exact approved Track B release ID/version/operator-manifest digest | Track A, `design-0.1`, open-development path, stale/alternate/unapproved Track B candidate | Exact binding only; others `refused_unapproved_fixture` |
| Root containment | Manifested regular file under canonical root | `..`, absolute path, Unicode alias, case collision, symlink, hard-link ambiguity, FIFO/device/socket | No escape/read; stable typed refusal |
| Manifest bootstrap | Exact regular manifest path, raw digest, schema/version and byte ceiling supplied by the trusted binding | Discovery, directory enumeration, sibling/parent read, symlink, oversize, raw-digest mismatch, decode/parse before digest verification | One bounded raw manifest open only; every failure refuses with zero payload opens |
| Manifest read plan | Normalized unique payload paths, declared media classes, size ceilings, expected digests and safe decoding constraints | Duplicate/absolute/traversing/ambiguous path, unknown key, executable parser hook, unsupported media/encoding | Strict fail-closed plan verification; no payload open and no inferred defaults |
| Payload integrity | Only plan-listed regular payloads; exact raw-byte, aggregate, version and denominator checks | Missing/duplicate payload, digest/size/media/version/aggregate/denominator mismatch | Fail closed; no repair or discovery; no claim about unmanifested siblings unless a separate metadata-only package-shape check ran |
| Parser inertness | Supported JSON/JSONL/text fixture records | Executable-looking comments/instructions, malformed data, archive/file bomb, deep nesting | No process/network/write; bounded refusal |
| Semantic identity | Exact approved Track B new-sibling lineage, material-difference evidence, independently recomputed denominator, and all required axes | Track A/crosswalk input, same literal in distinct context, locale/modality/slot collision, missing required axis | No lossy merge; exact Track B identities or refusal |
| Typed graph | All node/edge references resolve | Dangling refs, illegal edge types, evidence/decision/delivery collapse | Exact graph or `graph_invariant_failure` |
| Hard rules | Fixtures for all four values | Soft score presented beside `FAIL`; missing evidence beside required rule | Exact `PASS/FAIL/UNKNOWN/NOT_APPLICABLE`; no compensation |
| Human packet | Schema-valid blank judgments | Prefilled score, gold answer, model opinion, inferred reviewer/approval | Only blank packet accepted |
| Determinism | Two clean starts with identical immutable inputs | Permuted input enumeration, locale/host/time changes outside envelope | Byte-identical canonical results or explicit mismatch failure |
| Data protection | Allowed synthetic content and redacted seed probe | Secret-like seed, personal-data pattern, raw-content error path | Prohibited value absent from result/report/diagnostics |
| Capability absence | Normal in-process call | Socket, HTTP, model, browser, subprocess, env/keychain read, file/temp/cache/log write request | Zero effect and `unsupported_capability` or containment denial |
| Resources/cancel | Below every ceiling | Each ceiling at boundary and over boundary; cancellation at every module | Bounded stop, noncanonical partials discarded, cleanup accounted |
| Cleanup | Successful and refused run | Parser failure, allocation failure, cancellation, report overflow | No harness-created persistent artifact; terminal cleanup record complete |

**[Proposal]** Gate: readiness later requires two clean-start deterministic reproductions and independent verification by someone other than the implementation author. Passing would validate only the exact static successor-fixture condition; it would not validate linguistic quality, user outcomes, a model agent, real repositories, production use, mutation, publication or a study. This aligns with the [evaluation layers](../06-evaluation/evaluation-and-benchmarks.md#evaluation-layers) and [SEC-P0-A evidence](../05-technology/security-privacy-and-trust-boundaries.md#p0-a--before-shipping-static-read-only-local-discovery).

## Supply chain, licensing and SBOM planning boundary

**[Proposal]** A future implementation plan must choose the smallest existing approved runtime and standard-library surface that can satisfy the contracts. It may propose third-party dependencies only with a documented necessity, exact version and content hash, upstream source/publisher, transitive dependency inventory, license and notice disposition, vulnerability status, maintainer/security contact, update/rollback rule, reproducible-build or provenance evidence, and removal path.

**[Proposal]** The plan must produce an SBOM covering the harness, runtime, direct and transitive dependencies, parsers, rule/profile assets and bundled schemas; a license bill of materials for code and fixture assets; checksum verification that fails closed; and a capability-manifest diff. Install hooks, post-install scripts, dynamic plugins, runtime downloads, unpinned packages and network update checks are prohibited.

**[Proposal]** Gate: this proposal authorizes neither dependency installation nor SBOM generation. The approved Track B release must separately carry a rights/provenance/license disposition. Track B release approval does not approve harness dependencies, and dependency approval does not approve fixture use. See [supply chain, installation, and updates](../05-technology/security-privacy-and-trust-boundaries.md#supply-chain-installation-and-updates).

## Cleanup contract

**[Proposal]** Every terminal path—success, hard-rule failure, refusal, cancellation, internal failure—must:

1. stop accepting new work;
2. release raw-manifest, read-plan, raw-payload, parser, normalized, graph, rule, packet, report and diagnostic buffers;
3. close only the exact manifest handle and allowlisted payload handles actually opened; on manifest failure, verify that the payload-handle count is zero;
4. verify that no child process, socket, temporary file, cache, log, database, lockfile or remote object was created;
5. return allocation/handle/event counters and a residual status; and
6. mark the run invalid if cleanup is incomplete.

**[Proposal]** The harness must not delete or alter fixture/source files during cleanup. It may report buffer release but must not claim cryptographic memory erasure that the runtime and operating system cannot prove.

## Approval ladder

**[Proposal]** Progress is non-transitive. A higher rung requires its own authenticated record and never retroactively changes the meaning of a lower record.

| Rung | Required record | What it permits | What it does not permit |
| --- | --- | --- | --- |
| L0 — Proposal draft | This document plus user drafting permission | Review, comment and revision of r2 | Fixture approval, planning, scaffolding, build, execution, study |
| L1 — Track B release approval | Exact Track B release/task/manifest/denominator/rights/review approval | Bind a future architecture packet to those exact immutable values | Architecture approval or implementation planning |
| L2 — Architecture decision | Repository/product-owner decision; research/system-architecture-owner decision; security/privacy consultation record; exact r2 revision and fixture binding | `approved_for_implementation_planning` for the declared static boundary only | Scaffolding, dependency install, build, test/run, persistence or study |
| L3 — Implementation-plan decision | Reviewed plan with file/package scope, schemas, threat/resource model, tests, supply chain, cleanup and independent-verification route | Handoff to a separately governed build-authorization decision | Repository mutation or execution |
| L4 — Build/scaffolding authorization | Exact target/diff or workspace scope, current applicable gate evidence, exact mutation/build grants and approvals | Only the explicitly granted creation/build actions | Integrated harness run, fixture study, publication or release |
| L4-V — Verification-candidate evidence authorization | Authenticated expiring candidate authorization plus exact candidate-test grant and immutable candidate/test/evidence bindings described below | One disposable isolated `verify.candidate` execution that emits evidence for independent P0-A/P0-G evaluation | A P0 result, operational task grant, supported-profile claim, readiness, product/comparative score, or L5 run authority |
| L5 — Static execution authorization | Current `SEC-P0-A` pass for the exact implementation/profile; current `SEC-P0-G` pass whenever the exact operational task launches or attaches to a process/runtime covered by P0-G; separate exact unrevoked operational task grant; approved immutable Track B release binding and resource envelope | One bounded operational static run and its in-memory result | Persistence, model/agent, network, browser, real repository, write, enforcement or product study |
| L6 — Study authorization | Separate B1 protocol, preregistration, qualified reviewers, storage/retention decisions, condition access and cleanup approvals | Only the exact approved study condition | Product ranking or broader claims beyond observed evidence |

**[Proposal]** Gate: the current state is L0. L1 is absent, so L2 cannot be decided as `approved_for_implementation_planning`, and L3 must not start. No text in this packet may be interpreted as satisfying any rung.

### L4-V verification-candidate evidence contract

**[Proposal]** `verify.candidate` is an off-by-default, disposable, isolated, evidence-only route between build and operational execution. It exists so a newly built candidate can be tested without circularly claiming the P0-A or P0-G result that the test evidence is intended to support. Before any candidate execution, the trusted control plane must verify both (1) an authenticated, expiring and revocable verification-candidate authorization and (2) a separate exact candidate-test grant. Neither may be issued by the candidate, repository, fixture, implementer acting as evaluator, or test output.

**[Proposal]** Together those records bind the exact candidate identity/version and artifact digest; toolchain versions and digests; immutable build recipe and resulting build digest; gates under test; immutable test-plan, fixture-package/manifest digests, and executor-profile digest; synthetic-data-only boundary; exact tools, executables, immutable arguments and actions; filesystem, network, process, child-process, credential and writable-scratch bounds; evidence sink, schema, integrity/provenance, access and retention; deterministic resource ceilings, cancellation, incident handling and cleanup; issue time, expiry and revocation checks; and an independent evaluator identity/role that cannot be the implementation author or candidate runtime.

**[Proposal]** A candidate run may establish or falsify evidence relevant to `P0-A` and, when executable observation is in scope, `P0-G`. Its evidence record must preserve the authorization/grant IDs, candidate/toolchain/build/recipe/artifact digests, test/fixture/executor-profile versions, actual tool/process/filesystem/network/credential trace, resource/cancellation/cleanup result, evidence-sink receipt/digest, deviations, incidents and limitations. Candidate evidence is excluded from product-quality and comparative scores.

**[Proposal]** `verify.candidate` cannot self-issue or imply a P0 result, operational eligibility, a supported-profile claim, readiness, an operational task grant, L5 authority, semantic decision approval, mutation/change approval, or release approval. Only the independent gate authority may evaluate the immutable evidence and issue `pass` or `blocked` for the exact artifact/profile. Any candidate, artifact, recipe, toolchain, test plan, fixture, executor profile, evidence schema/sink, bound permission, expiry or revocation change invalidates reuse and requires a newly authorized candidate test.

## Cross-document contract map

| r2 contract | Governing research source | r2 treatment |
| --- | --- | --- |
| Semantic/message/expression separation | [Candidate system model](../08-synthesis/candidate-system-model.md#message-and-expression-identity) | Preserved as distinct normalized identities and graph nodes |
| Evidence, decision and delivery independence | [Candidate system model](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records) | Orthogonal dimensions; no status or approval inference |
| Repository root and adapter caution | [Repository integration](../05-technology/repository-and-agent-integration.md#repository-discovery-and-extraction) | Exact approved fixture root; inert fixture-specific parsers only |
| Capability, gate and grant separation | [Security architecture](../05-technology/security-privacy-and-trust-boundaries.md#capability-and-authorization-architecture) | Pre-read boundary guard; current P0-A plus exact grant required |
| No-model/static minimization | [Security data minimization](../05-technology/security-privacy-and-trust-boundaries.md#data-minimization-defaults) | No egress, connector, credential, durable memory or telemetry path |
| Fixture-first evaluation | [Evaluation layers](../06-evaluation/evaluation-and-benchmarks.md#evaluation-layers) | Integrity and deterministic checks precede any human packet |
| Verification-candidate evidence route | [Security verification-candidate contract](../05-technology/security-privacy-and-trust-boundaries.md#verification-candidate-evidence-route-not-a-p0-gate-or-operational-phase) and [evaluation separation](../06-evaluation/evaluation-and-benchmarks.md#verification-candidate-evidence-versus-operational-evaluation) | Off-by-default L4-V evidence only; independent gate result before separately granted L5 operation |
| Four-valued hard rules | [Voice/tone measurement](voice-tone-graph-and-measurement.md#12-hard-constraints-use-four-valued-results-not-scores) | Exact `PASS/FAIL/UNKNOWN/NOT_APPLICABLE`; no scalar compensation |
| Human/model authority separation | [Judge system](product-study-and-judge-agent-system.md#deterministic-checks-model-judgments-and-human-authority) | Blank human packet only; no model/judge agent |
| Track B release prerequisite | [Materials register](materials-and-access-register.md#request-order-and-no-credential-rule) | Binding and planning remain blocked until an exact Track B release is separately approved |
| Proposed successor family separation | [Successor design contract](SIBF-CHK-DESIGN-CONTRACT-0.2.md#binding-design-outcome-if-separately-approved) | Treats Track A and Track B as non-interchangeable; excludes Track A and any unreleased Track B candidate from r2 binding |

## Formal decision record required later

**[Proposal]** If L1 is completed, the packet must first be revised so the frontmatter and a binding section contain the exact approved fixture values rather than `not-established`. A valid L2 record must then include:

| Field | Required value |
| --- | --- |
| Decision packet | Exact content digest and revision of `CDM-V0-ARCH-DECISION-r2` |
| Decision | `approved_for_implementation_planning`, `returned_for_revision`, or `rejected` |
| Fixture binding | Exact approved Track B fixture/release ID and design version, task packets, manifest schema/version/digest, denominators and release-approval-record ID |
| Scope | Single-process deterministic static harness and the exact operations in this packet |
| Conditions and exclusions | Any changes to boundaries, ceilings, schemas, review or expiry |
| Repository/product owner | Authenticated identity, capacity, authority basis, scope, decision and timestamp |
| Research/system architecture owner | Authenticated identity, capacity, authority basis, scope, decision and timestamp |
| Security/privacy consultation | Reviewer identities or controlled roles, record IDs/versions, reviewed boundary, concerns, conditions, disposition and date |
| Effective period | Effective date, expiry/review date, invalidation triggers and revocation route |

**[Proposal]** Gate: chat participation, authorship, file custody, a user request, fixture approval, job title, a source citation, a passing test, or an architecture proposal is not a substitute for this formal decision record.

## Closure

**[Research finding]** At the time this r2 proposal was finalized, `SIBF-CHK-DESIGN-CONTRACT-0.2` was present only as a `proposed/not-for-use` design contract. No approved Track B release/package or formal Track B release-approval record was present. The only valid current disposition is therefore:

```text
proposal_status: proposed
fixture_binding_status: blocked-awaiting-exact-approved-track-b-release
architecture_approval_status: not-approved
planning_authority: none
implementation_authority: none
execution_authority: none
product_study_authority: none
```

**[Proposal]** Review may return this packet for revision or reject it. Formal architecture approval cannot be requested as complete until the exact approved Track B release binding is inserted and independently verified. Even after that binding, only the authenticated L2 decision can authorize implementation planning, and every later action remains separately gated.
