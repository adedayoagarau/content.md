---
title: CDM v0 architecture r2 L0 contract-coverage review
status: working-note
created: 2026-08-18
updated: 2026-08-18
review_id: CDM-V0-r2-L0-CCR-2026-08-18
review_level: L0-paper-review-only
subject_packet_id: CDM-V0-ARCH-DECISION-r2
subject_sha256: 407f0bff20f8f108e15b8cffb4d18a7f35d8fec989fe251752b4994c873df597
subject_status: proposed-not-approved
fixture_binding_status: not-established
review_disposition: four-contract-risks-open
authority_effect: none
planning_authority: none
implementation_authority: none
execution_authority: none
source_documents:
  - CDM-V0-ARCH-DECISION-r2.md
  - SIBF-CHK-DESIGN-CONTRACT-0.2.md
  - materials-and-access-register.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
  - ../06-evaluation/evaluation-and-benchmarks.md
  - ../08-synthesis/candidate-system-model.md
---

# CDM v0 architecture r2 L0 contract-coverage review

## Result

**[Research finding]** The current [`CDM-V0-ARCH-DECISION-r2`](CDM-V0-ARCH-DECISION-r2.md#authority-and-disposition) is a coherent proposal for a deterministic, local, static harness. It correctly keeps fixture release, architecture approval, planning, build, verification-candidate execution, operational execution, persistence, and study authority separate. It also now places raw-manifest verification before parsing and payload reads, and it provides a non-operational L4-V route for producing candidate evidence without self-issuing a P0 result.

**[Research finding]** Four material contract-coverage risks remain before a future hash-bound r2 revision can be decided for implementation planning. They do not justify editing the current proposed packet by implication, inventing Track B values, creating schemas/tests, or starting implementation. Each risk has an earliest legitimate resolution gate and a future evidence class below.

Current decision state:

```text
review_level: L0-paper-review-only
r2_status: proposed-not-approved
track_b_release_binding: not-established
architecture_decision: not-issued
planning_authority: none
implementation_authority: none
execution_authority: none
```

## Snapshot reviewed

| Source | SHA-256 | Role in this review |
| --- | --- | --- |
| [`CDM-V0-ARCH-DECISION-r2.md`](CDM-V0-ARCH-DECISION-r2.md) | `407f0bff20f8f108e15b8cffb4d18a7f35d8fec989fe251752b4994c873df597` | Exact architecture proposal under review |
| [`SIBF-CHK-DESIGN-CONTRACT-0.2.md`](SIBF-CHK-DESIGN-CONTRACT-0.2.md) | `b4f2aa0f67efe73e44c0eb5be5fce69c8838f6982c1492a8cef348e6c73a9c6b` | Proposed fixture-family, manifest, integrity, and release contract |
| [`materials-and-access-register.md`](materials-and-access-register.md) | `0851fe20a955c1516dd2c0b48d5e16a49dae2099e83b8927cf010c385849c62d` | Current P3-04/P4-01 sequencing and authority state |
| [`security-privacy-and-trust-boundaries.md`](../05-technology/security-privacy-and-trust-boundaries.md) | `7841c183b42c0cbb9c921b93644e68e9120b9b8f1fef3e8820257458057c6da6` | Capability, P0, grant, verification-candidate, and fail-closed boundaries |
| [`evaluation-and-benchmarks.md`](../06-evaluation/evaluation-and-benchmarks.md) | `da53a7465f794d4aa6de5388c87c6cc02de718657e35806f24f1f9dedb012721` | Fixture validity and candidate-versus-operational evidence separation |
| [`candidate-system-model.md`](../08-synthesis/candidate-system-model.md) | `1c1de3427ca442035703a4bb9b91014d794d23f5afc1317269ca9ec6062fd5ae` | Typed identity, record, evidence, decision, and control separation |

These are local byte snapshots, not authenticated approvals, signed releases, or implementation inputs.

## Contract-coverage findings

| Review ID | Source clauses | Exact open risk | Why it matters | Earliest legitimate resolution gate | Future evidence class required |
| --- | --- | --- | --- | --- | --- |
| `L0-CCR-01` | r2 [immutable operation envelope](CDM-V0-ARCH-DECISION-r2.md#immutable-operation-envelope), [approval ladder](CDM-V0-ARCH-DECISION-r2.md#approval-ladder), and [formal decision record](CDM-V0-ARCH-DECISION-r2.md#formal-decision-record-required-later); fixture [manifest fields](SIBF-CHK-DESIGN-CONTRACT-0.2.md#artifact-and-field-contracts) | The run envelope requires the exact operator-manifest relative path and a manifest-bootstrap byte ceiling, but the L1/L2 binding summaries and formal decision fields name the manifest version/digest without explicitly carrying both bootstrap values as part of the exact approved binding. | A correct digest is insufficient if the harness can open a different path or apply an unfrozen read ceiling. The trusted bootstrap boundary must not learn either value from fixture-controlled content. | Track B `G08`/`G08b` must freeze them in the exact release and release decision; the later L2 r2 revision must copy that binding before architecture decision. | Hash-bound release dossier and architecture-binding reconciliation showing exact equality of release, operator manifest path, raw digest, schema/version, and bootstrap ceiling. |
| `L0-CCR-02` | fixture [integrity fields](SIBF-CHK-DESIGN-CONTRACT-0.2.md#artifact-and-field-contracts) and [G08 seal gate](SIBF-CHK-DESIGN-CONTRACT-0.2.md#validation-and-release-gates); r2 [interface invariants](CDM-V0-ARCH-DECISION-r2.md#interface-invariants) | `manifest_hash` is required, but the proposed fixture contract does not yet define whether it is the digest of raw manifest bytes or a canonical projection, the exact preimage and exclusions, or detached signature coverage. r2 separately requires an expected raw-manifest digest before any decode or parse. | Without one subordinate integrity contract, a release can appear hash-bound while producer and harness recompute different objects or create a self-referential digest. | Resolve before Track B `G08` can pass and preserve the resulting raw-byte digest semantics through `G08b`, L1 binding, and the future L2 revision. | Approved content-addressing/signature contract plus independent recomputation evidence for the exact sealed manifest and release decision. |
| `L0-CCR-03` | r2 [module interfaces](CDM-V0-ARCH-DECISION-r2.md#module-interfaces), [interface invariants](CDM-V0-ARCH-DECISION-r2.md#interface-invariants), and [experimental schema family](CDM-V0-ARCH-DECISION-r2.md#experimental-schema-family) | r2 says every module output is schema-bearing, but the listed schema family has no separately named contract for several outputs used at module boundaries: `AuthorizedStaticRun`, `DigestVerifiedRawManifest`, `RawPayloadSet`, the normalized-set wrapper, the hard-rule set/aggregate, the in-memory event ring, and `CleanupResult`. | An implementation plan cannot prove closed interfaces, digest lineage, refusal behavior, or cleanup completeness if important handoff objects exist only as prose names. | The future L2 revision must enumerate every decision-relevant boundary; the separately reviewed L3 plan may then freeze exact schema artifacts after L2 permits planning. | Architecture-level schema inventory/coverage record, followed only after L2 by versioned closed schemas and positive/negative conformance evidence. |
| `L0-CCR-04` | r2 [fail-closed states](CDM-V0-ARCH-DECISION-r2.md#fail-closed-states), [test matrix](CDM-V0-ARCH-DECISION-r2.md#deterministic-test-and-evaluation-matrix), and [L4-V contract](CDM-V0-ARCH-DECISION-r2.md#l4-v-verification-candidate-evidence-contract) | The L4-V prose and sixteen-plane matrix define strong behavior, but they do not yet provide stable requirement/record identifiers or an exact trace from each clause to failure code, evidence plane, independent acceptance result, and candidate authorization scope. | A future candidate run could produce a large evidence bundle without proving that every required denial, limit, cleanup, and independence condition was actually tested and accepted. | L2 may require this closure as a condition of planning; L3 must supply and independently review the trace before any L4-V authorization is issued. | Versioned requirement-to-evidence coverage matrix, candidate evidence manifest, and independent acceptance record; none may be issued by the candidate or implementation author acting as evaluator. |

## What is already sufficiently separated

**[Research finding]** The following architectural separations are present and should be preserved in any successor revision:

- Track A is excluded from r2 binding; only an exact separately approved Track B release can become L1 input.
- The exact manifest path and digest originate outside untrusted fixture content.
- Raw manifest bytes are verified before decoding, parsing, or payload access.
- The payload reader consumes only a verified read plan and performs no root discovery.
- `PASS`, `FAIL`, `UNKNOWN`, and `NOT_APPLICABLE` remain distinct hard-rule results.
- Blank human packets contain no model or inferred human judgment.
- Verification-candidate evidence cannot self-issue P0 results, operational grants, or readiness.
- Operational execution, persistence, product study, and publication remain separate authorities.

This review does not reopen or weaken those controls.

## Resolution order

**[Inference]** The four findings fit the existing non-transitive ladder; they do not require a shortcut around it:

1. Issue no architecture or build decision from this review.
2. Complete the separately governed Track B authoring, integrity, independent review, seal, and exact release decision. Resolve `L0-CCR-01` and `L0-CCR-02` there.
3. Revise r2 to bind the exact approved Track B release and close the architecture-level inventory portion of `L0-CCR-03`.
4. Decide that exact r2 revision. Only an authenticated L2 approval may permit implementation planning.
5. In the separately reviewed L3 plan, materialize the approved schema inventory and the traceability evidence required by `L0-CCR-03` and `L0-CCR-04`.
6. Keep L4/L4-V/L5 unavailable until their own exact records and current controls exist.

## Non-authority and nonclaims

This file is review evidence only. It does not:

- approve the fixture design, Track A release, Track B authoring, Track B release, architecture, implementation plan, build, test, verification candidate, operational run, persistence, or study;
- create an operator manifest, manifest hash contract, schema, test case, package layout, implementation task, authorization record, gate result, grant, or acceptance result;
- establish any Track B ID, path, count, locale, channel, role, gold set, denominator, digest, byte ceiling, reviewer, or release value;
- authorize account, credential, network, model, browser, Computer Use, product, repository mutation, installation, dependency, subprocess, file-write, telemetry, durable-memory, publication, or release capability; or
- advance r2 beyond L0 or change any current register state.

The current permitted use is to review these four findings alongside the exact source hashes and decide later—through the existing controlled sequence—whether and how a future r2 revision should close them.
