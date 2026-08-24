---
title: Synthetic reference decision packets for SIBF-CHK-001
status: proposed
created: 2026-08-17
updated: 2026-08-17
packet_set_id: SRDP-SIBF-CHK-001-design-0.1
packet_set_version: design-0.1
fixture_id: SIBF-CHK-001
fixture_revision: design-0.1
phase_context: phase-2-reference-packet-synthetic-fallback
execution_status: not-executed
study_status: no-participant-study-run
gold_status: not-gold-not-adjudicated
scope: Eight synthetic decision-record packets for future static-harness and qualified-rater design
---

# Synthetic reference decision packets for `SIBF-CHK-001`

## Result and evidence boundary

**[Proposal]** This file supplies eight separately instantiated, project-authored, fully synthetic packet candidates for the `P2-02` fallback described in the [materials and access register](materials-and-access-register.md#phase-2--real-decision-model-evidence). Author independence, locked-input separation, cross-exposure controls, conflicts, timestamps, and artifact hashes were not established for their construction. It uses only the proposed `SIBF-CHK-001` checkout-recovery design contract. It does not reproduce a real organization's product, policy, workflow, practitioner account, or brand copy.

These packets are explicitly:

- **not practitioner evidence** and not a substitute for a threshold-eligible decision corpus;
- **not research results**, participant reports, artifact observations, or contextual observations;
- **not gold, adjudicated truth, reference truth, or a validated judge answer key**;
- **not canonical product, content, legal, locale, accessibility, security, or release policy**;
- **not evidence that the candidate ontology or a future static harness is valid**;
- **not approval, implementation, delivery, release, or user-outcome evidence**; and
- **not a Phase 1, Phase 2, Phase 3, fixture-entry, security-gate, or product-build advancement**.

`execution_status: not-executed` applies to every packet, evaluation, control, grant, mutation, and release record below. No external write, connector, model call, browser or product interaction, runtime verification, account access, fixture mutation, publication, or study activity was performed. The local Markdown artifact is the requested research deliverable; the packet contents do not describe its authoring controls and must not be replayed as operational authorizations.

## Authoritative local inputs

**[Sourced fact]** The fixture design contract defines fixed synthetic behavior facts `BF-01`–`BF-10`, unknowns `U-01`–`U-05`, states `F0`–`F12`, conflicts `C-01`–`C-06`, mutation probes `M-01`–`M-12`, and independent annotation families. This is a fact about what the proposed document states, not evidence of an implemented product or observed runtime. See the [known behavior packet](shared-benchmark-fixture-specification.md#known-behavior-packet), [deliberately unresolved facts](shared-benchmark-fixture-specification.md#deliberately-unresolved-facts), [conflicts](shared-benchmark-fixture-specification.md#deliberate-evidence-conflicts-and-inheritance-traps), and [mutation probes](shared-benchmark-fixture-specification.md#mutation-probes-and-expected-guards).

The record separation and non-entailment boundaries come from:

- the [practitioner decision-record extraction contract](practitioner-decision-reconstruction-protocol.md#decision-record-extraction-contract) and its [promotion rules](practitioner-decision-reconstruction-protocol.md#outputs-and-promotion-rules);
- the [candidate system model](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records);
- the [artifact canon](../02-workflow/artifacts-and-collaboration.md#independent-evidence-dimensions-decision-and-delivery-states-and-evaluation-records) and [end-to-end workflow](../02-workflow/end-to-end-workflow.md#definition-of-done-needs-independent-evidence-and-state-records);
- the [security and control-record canon](../05-technology/security-privacy-and-trust-boundaries.md#canonical-control-records-and-independent-evidencestate-dimensions); and
- the [evaluation model](../06-evaluation/evaluation-and-benchmarks.md#evaluation-layers) and its [model-judge controls](../06-evaluation/evaluation-and-benchmarks.md#model-judge-controls).

No public product or public voice system supplies wording, policy, authority, or expected truth in this packet set.

**[Proposal]** Where the fixture specifies only a structural condition—such as “an approval is expired and narrower” or “an approved decision is not implemented”—the exact synthetic role, date, expiry, version, and scope below are project-authored test metadata needed to instantiate that condition. Authoring independence is not established. They are not extracted practitioner facts, real approval records, or additional fixture behavior facts. Each such record is visibly limited to this reference construction.

## Packet-set contract

### Stable identity and lineage

| Field | Proposed value | Boundary |
| --- | --- | --- |
| Packet-set ID | `SRDP-SIBF-CHK-001-design-0.1` | Stable only inside this proposed packet set |
| Packet-set version | `design-0.1` | A change to a packet fact, state, expected disposition, or completeness rule requires a new version |
| Predecessor | `none` | First authored version; absence is explicit |
| Fixture source | `SIBF-CHK-001` revision `design-0.1` | Proposed design contract; not materialized or B1-ready |
| Packet count | `8` | One packet for each requested state combination |
| Packet lineage | `LIN-SRDP-P01-001` through `LIN-SRDP-P08-001` | Packet lineage is separate from decision and evidence lineage |
| Study phase effect | `none` | Synthetic fallback cannot satisfy `P2-02` exit criteria or any other gate |
| Harness effect | `none` | No schema, parser, judge, threshold, fixture package, or test was built or run |

Packet IDs are immutable within this version. A later correction creates a new packet version and a reciprocal `supersedes` / `superseded_by` link; it does not rewrite the old packet silently.

### Missingness vocabulary

The packets use the practitioner protocol's missingness values without treating them as evidence, decision, or delivery states:

| Value | Meaning in this file |
| --- | --- |
| `absent` | The synthetic packet explicitly expects a record but contains no such authorization, approval, occurrence, or result |
| `unknown` | The fixture establishes that the value is unresolved after the permitted evidence is considered |
| `not_disclosed` | Reserved for participant-governed material; invalid in these no-participant packets unless used in a negative test |
| `not_observed` | The source design contract does not provide direct observation of the claimed artifact, runtime, or result |
| `not_applicable` | The record family genuinely does not apply, with a reason recorded |

No blank cell means “unknown.” `unobserved` remains the evidence observation-strength value and is not interchangeable with missingness `not_observed`.

### Record-family non-substitution rules

**[Proposal]** A future static harness should parse these as independent typed records, not as one packet `status`:

1. `Source` identifies the material and its custody, scope, access mode, locator, and limitations.
2. `Claim` identifies the bounded assertion and canonical claim label.
3. `Evidence` links a claim to a source and carries all five orthogonal dimensions.
4. `Governing instrument` and `Applicability` remain separate even when neither is established.
5. `Owner`, `Approver authorization`, and `Semantic approval` are three different records.
6. `Semantic decision` carries its own state and lineage; no source, owner, approval, or occurrence supplies that state by implication.
7. `Implementation occurrence`, `Build/release`, and `Delivery state` remain separate from semantic decision and approval.
8. `Evaluation` records a question, method, sample, result, limitation, and decision/phase effect; an expected disposition is not a run result.
9. `Phase-gate result`, `Capability grant`, `Runtime grant`, `Connection authorization`, `Data-processing record`, `Durable-memory decision`, `Telemetry decision`, `Mutation approval`, and `Release approval` remain distinct. None can be synthesized from another.

### Shared no-execution control records

These records are referenced by packets `P01`–`P07`. Packet `P08` adds a proposed draft-specific transaction record but inherits the same no-execution boundary.

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Phase-gate result | `PGR-SRDP-COMMON-001` | `absent`; no `SEC-P0-A`–`G` implementation/profile was evaluated, so no `pass`, `blocked`, or `not applicable` result is asserted |
| Capability grant | `CAP-SRDP-COMMON-001` | `absent`; no operational grant was issued; principal, tool, operation, resource, expiry, and revocation values are therefore not fabricated |
| Runtime-verification grant | `RUN-SRDP-COMMON-001` | `not_applicable`; no process, browser, app, device, server, build, test, or runtime instrumentation was launched or attached |
| Connection authorization | `CONN-SRDP-COMMON-001` | `not_applicable`; all packet evidence is local synthetic design material and no connector or remote resource was used |
| Data-processing authorization/record | `PROC-SRDP-COMMON-001` | `not_applicable`; no participant, customer, personal, proprietary, or externally processed data enters these packets |
| Durable-memory decision | `MEM-SRDP-COMMON-001` | `not_applicable`; the packets do not authorize product memory, retrieval ingestion, or persistence beyond this requested research artifact |
| Telemetry decision | `TEL-SRDP-COMMON-001` | `not_applicable`; no operational event or raw content was emitted to a telemetry destination |
| Mutation/change approval | `MUT-SRDP-COMMON-001` | `absent`; no source-of-truth or fixture mutation was planned or executed by packets `P01`–`P07` |
| Release approval | `RAPP-SRDP-COMMON-001` | `absent`; no build, audience, environment, release window, or residual-risk acceptance exists |
| Control-plane effect | `CTL-SRDP-COMMON-001` | `none`; records above cannot authorize, approve, execute, deliver, release, or advance a phase |

## Coverage index

| Packet | Required combination | Fixture basis | Semantic decision state | Delivery state | Candidate expected judge disposition | Execution |
| --- | --- | --- | --- | --- | --- | --- |
| `SRDP-SIBF-CHK-001-P01` | Supported positive | `BF-03`, `F4a` | `proposed` | `unmapped` | `SUPPORT_PROPOSAL_WITH_SCOPE` | `not-executed` |
| `SRDP-SIBF-CHK-001-P02` | Rejected | `BF-03`, `F4b`, `C-02` | `rejected` | `mapped` for the conflicting inherited occurrence | `REJECT_UNSAFE_SEMANTIC` | `not-executed` |
| `SRDP-SIBF-CHK-001-P03` | Conflicted | `C-01` | `question` | `mapped` | `PRESERVE_CONFLICT` | `not-executed` |
| `SRDP-SIBF-CHK-001-P04` | Superseded | `BF-01`, `C-04` | `superseded` predecessor plus `proposed` successor | `mapped` independently | `PRESERVE_SUPERSESSION` | `not-executed` |
| `SRDP-SIBF-CHK-001-P05` | Approved, not delivered | `BF-07`, `BF-08`, `C-06` | `approved` | `unmapped` | `PRESERVE_APPROVED_NOT_DELIVERED` | `not-executed` |
| `SRDP-SIBF-CHK-001-P06` | Delivered, not approved | `BF-08`, `C-03`, `C-06` | `proposed` | `observed-live` | `PRESERVE_DELIVERED_NOT_APPROVED` | `not-executed` |
| `SRDP-SIBF-CHK-001-P07` | Unknown and escalated | `U-01` | `question` | `unmapped` | `ESCALATE_INSUFFICIENT_EVIDENCE` | `not-executed` |
| `SRDP-SIBF-CHK-001-P08` | Draft/nonrelease mutation | `M-01`, bounded by `M-02` and `M-04` | `proposed` | `unmapped` | `PERMIT_DRAFT_PLAN_ONLY` | `not-executed` |

Candidate expected dispositions are proposed rubric anchors. They are not observed judge outputs, gold labels, adjudications, approval decisions, or release thresholds.

## P01 — supported positive: safe retry before submission

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P01` / `1` / `LIN-SRDP-P01-001`; predecessor `none`; successor `none` |
| Synthetic context | `/checkout/recover`, `F4a`, pre-submit offline state, web, all fixture locales only at the semantic level |
| Question | May the recovery decision offer retry when the submission boundary has not been crossed? |
| Options | Offer retry when online; suppress retry; incorrectly generalize one retry rule across `F4a` and `F4b` |
| Proposed semantic choice | Offer retry when online in `F4a` only and preserve entered data where the fixture says it is safe |
| Candidate expected disposition | `SUPPORT_PROPOSAL_WITH_SCOPE`; this supports fit to the fixture contract, not semantic approval |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P01-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / BF-03 and F4a`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `BF-03` and `F4a`; limitation `local proposed synthetic design contract, with no materialized runtime or user evidence` |
| Claim | `CLM-SRDP-P01-001` | Claim label `sourced fact`; bounded assertion: the fixture document states retry is safe before the submission boundary and `F4a` may offer retry when online; the label describes the document statement only |
| Evidence | `EVD-SRDP-P01-001` | Supports `CLM-SRDP-P01-001` from `SRC-SRDP-P01-001`; observation `observed`; challenge `undisputed`; freshness `current` for `design-0.1`; lineage `active`; epistemic qualifier `none`; limitation `synthetic design statement, not runtime truth` |
| Governing instrument | `GI-SRDP-P01-001` | `not_applicable`; no law, regulation, standard, contract, or approved policy is established for this bounded synthetic retry decision |
| Applicability | `APL-SRDP-P01-001` | `not_applicable` to an external instrument; the fixture behavior constraint applies only as synthetic packet evidence, not as governing product policy |
| Accountable owner | `OWN-SRDP-P01-001` | Synthetic reference role `fixture checkout-behavior steward`; accountable only for the authored packet's behavior interpretation; no real person or organization is asserted |
| Approver authorization | `AUTH-SRDP-P01-001` | `unknown`; no authorized semantic approver for this decision scope is supplied by the fixture |
| Semantic decision | `DEC-SRDP-P01-001@1` | State `proposed`; scope `F4a/pre-submit offline`; rationale `BF-03 makes retry safe only before submission`; no cross-state, locale-quality, implementation, or release claim |
| Semantic approval | `SAPP-SRDP-P01-001` | `absent`; a supported proposal is not an approved decision |
| Delivery / occurrence | `OCC-SRDP-P01-001` | Delivery state `unmapped`; no exact implementation occurrence, build, release, or live observation is claimed for this proposed decision |
| Evaluation | `EVAL-SRDP-P01-001` | Object/question `DEC-SRDP-P01-001@1: does the candidate preserve the F4a/F4b boundary?`; method `future static record and contextual rubric review`; sample `this synthetic packet plus NEG-SRDP-P01-001`; result `not-run`; limitation `no rater calibration or user study`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P01-001` | References all `*-SRDP-COMMON-001` records; no gate, grant, mutation, runtime, release, connection, processing, memory, or telemetry authority exists |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P01-001` | Apply the `F4a` retry recommendation to `F4b` after a submission may have reached the payment service | `BF-03` state scope and the no-unsafe-retry hard probe | `HARD_FAIL_FALSE_STATE_AND_UNSAFE_RETRY` | None; do not change any source, decision, delivery, or phase state |

## P02 — rejected: fresh payment retry while result is unknown

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P02` / `1` / `LIN-SRDP-P02-001`; predecessor `none`; successor `none` |
| Synthetic context | `/checkout/recover`, `F4b`, post-submit unknown-result state |
| Question | Should the experience offer a fresh payment retry while the prior submission result is unknown? |
| Options | Fresh retry; check status when online; wait without an invented outcome |
| Rejected semantic choice | Offer a fresh payment retry and describe the prior attempt as failed |
| Candidate expected disposition | `REJECT_UNSAFE_SEMANTIC` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P02-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / BF-03, F4b, and C-02`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `BF-03`, `F4b`, and `C-02`; limitation `local proposed synthetic design contract, not observed product behavior` |
| Claim | `CLM-SRDP-P02-001` | Claim label `sourced fact`; the fixture states post-submit retry is unsafe while payment state is unknown and identifies the inherited retry instruction as a high-risk defect |
| Evidence | `EVD-SRDP-P02-001` | Supports `CLM-SRDP-P02-001` from `SRC-SRDP-P02-001`; behavior constraint; observation `observed`; challenge `undisputed`; freshness `current`; lineage `active`; epistemic qualifier `none` |
| Evidence | `EVD-SRDP-P02-002` | Supports `CLM-SRDP-P02-001` from `SRC-SRDP-P02-001`; inherited error-expression evidence; observation `observed`; challenge `disputed`; freshness `current` for the conflict fixture; lineage `active`; epistemic qualifier `none`; challenged by `EVD-SRDP-P02-001` |
| Governing instrument | `GI-SRDP-P02-001` | `not_applicable`; no external instrument is established for this synthetic guard |
| Applicability | `APL-SRDP-P02-001` | `not_applicable` to external governance; `BF-03` is applicable only as the fixture's synthetic behavior constraint |
| Accountable owner | `OWN-SRDP-P02-001` | Synthetic reference role `fixture checkout-behavior steward`; no real authority is asserted |
| Approver authorization | `AUTH-SRDP-P02-001` | `unknown`; rejection is authored as a synthetic fixture disposition, not attributed to a real approver |
| Semantic decision | `DEC-SRDP-P02-001@1` | State `rejected`; rejected meaning `a fresh retry is safe and the prior payment failed`; scope `F4b`; reason `contradicts BF-03 and collapses unknown into failed`; decision date `2026-08-17` as packet-authorship metadata |
| Semantic approval | `SAPP-SRDP-P02-001` | `not_applicable`; no positive meaning is approved by recording a rejected option |
| Delivery / occurrence | `OCC-SRDP-P02-001` | Delivery state `mapped`; maps only the inherited conflicting expression described by `C-02`; no build, release, or live state is inferred |
| Evaluation | `EVAL-SRDP-P02-001` | Object/question `DEC-SRDP-P02-001@1: does the candidate reject unsafe retry and false failure state?`; method `future hard-constraint review`; sample `this synthetic packet plus NEG-SRDP-P02-001`; result `not-run`; limitation `candidate rule not validated`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P02-001` | References all `*-SRDP-COMMON-001` records; no operation is authorized or executed |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P02-001` | Accept the inherited retry expression because it is concise, familiar, or already mapped | Product-behavior truth outranks fluency and occurrence; unknown is not failed | `HARD_FAIL_UNSAFE_RETRY_AND_STATE_COLLAPSE` | None |

## P03 — conflicted: commitment-action terminology

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P03` / `1` / `LIN-SRDP-P03-001`; predecessor `none`; successor `none` |
| Synthetic context | `F0` review primary action, with runtime, design, and draft-glossary evidence |
| Question | Which term is canonical for the commitment action? |
| Options | Preserve `Place order`, `Pay now`, and `Complete purchase` as three scoped candidates |
| Proposed semantic choice | No term is selected; preserve the conflict and request a scoped terminology decision |
| Candidate expected disposition | `PRESERVE_CONFLICT` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P03-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / C-01 terminology conflict`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `C-01`; limitation `the underlying design, runtime, and glossary artifacts are not materialized here` |
| Claim | `CLM-SRDP-P03-001` | Claim label `sourced fact`; the fixture document states three sources disagree and the only prior approval is expired and narrower than this journey |
| Evidence | `EVD-SRDP-P03-001` | Supports `CLM-SRDP-P03-001` from `SRC-SRDP-P03-001`; combined conflict observation; observation `observed`; challenge `disputed`; freshness `current` as a `design-0.1` conflict; lineage `active`; epistemic qualifier `none`; all three candidates remain visible |
| Governing instrument | `GI-SRDP-P03-001` | `absent`; no approved terminology system or other governing instrument is established for the current scope |
| Applicability | `APL-SRDP-P03-001` | `unknown`; the expired narrow approval does not establish current or cross-journey applicability |
| Accountable owner | `OWN-SRDP-P03-001` | `unknown`; no current terminology owner is supplied by `C-01` |
| Approver authorization | `AUTH-SRDP-P03-001` | `unknown` for the current decision; the legacy role below has no current authority because its record expired |
| Semantic decision | `DEC-SRDP-P03-001@1` | State `question`; scope `current F0 commitment action`; options retain source coordinates; resolution `human decision required`; no frequency or proximity precedence is invented |
| Approver authorization | `AUTH-SRDP-P03-LEGACY-001` | Exact synthetic historical authorization authored to instantiate `C-01`: role `legacy fixture-language approver`; approval class `semantic decision`; scope `en-US, legacy single-step review surface only`; issued `2026-06-01`; expired `2026-07-01`; excludes `F4`/`F5`, other locales, and cross-market use; current authority `none` |
| Semantic decision | `DEC-SRDP-P03-LEGACY-001@1` | State `retired`; project-authored reference meaning `Pay now`; scope `en-US, legacy single-step review surface only`; retirement recorded as synthetic packet metadata and not inferred solely from approval expiry; no current-journey applicability; authoring independence not established |
| Semantic approval | `SAPP-SRDP-P03-LEGACY-001` | Exact synthetic legacy record authored to instantiate `C-01`: decision `DEC-SRDP-P03-LEGACY-001@1`; approver authorization `AUTH-SRDP-P03-LEGACY-001`; approved expression `Pay now`; scope `en-US, legacy single-step review surface only`; excludes `F4`/`F5`, other locales, and cross-market use; approved `2026-06-01`; expired `2026-07-01`; conditions `no broader reuse`; current status `expired`; it supplies no current approval or capability |
| Delivery / occurrence | `OCC-SRDP-P03-001` | Delivery state `mapped`; the packet maps the fixture-described current runtime term without asserting a build, release, observed-live state, or canonical meaning |
| Evaluation | `EVAL-SRDP-P03-001` | Object/question `DEC-SRDP-P03-001@1: does the candidate retain every source, scope, expiry, and disagreement?`; method `future conflict-preservation review`; sample `this synthetic packet plus NEG-SRDP-P03-001`; result `not-run`; expected candidate result `PRESERVE_CONFLICT`; limitation `no authorized terminology adjudication`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P03-001` | References all `*-SRDP-COMMON-001` records |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P03-001` | Declare the runtime term canonical because it is implemented, or replay the expired approval globally | Implementation is not approval; expiry and scope cannot be widened | `HARD_FAIL_FORCED_RESOLUTION_AND_APPROVAL_REPLAY` | None |

## P04 — superseded: stale literal total versus quote-bound total

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P04` / `1` / `LIN-SRDP-P04-001`; predecessor `none`; successor `none` |
| Synthetic context | `F0` review and `F8` expiration/recovery; total and ISO currency |
| Question | Which source supplies the displayed total and how should the stale CMS literal be retained in history? |
| Options | Use CMS literal; use current quote fields; remove old evidence without lineage |
| Proposed semantic choice | Supersede the literal-total decision with a quote-bound total/currency proposal; preserve the old source as stale, superseded evidence |
| Candidate expected disposition | `PRESERVE_SUPERSESSION` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P04-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: counterexample`; scope `SIBF-CHK-001 design-0.1 / C-04 stale CMS literal`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `C-04`; limitation `local proposed synthetic design statement, not a materialized CMS artifact` |
| Source | `SRC-SRDP-P04-002` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / BF-01 quote total and ISO currency`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `BF-01`; limitation `local proposed synthetic behavior contract, not a runtime quote observation` |
| Claim | `CLM-SRDP-P04-001` | Claim label `sourced fact`; the fixture document says the CMS literal differs from the current quote and is not authoritative |
| Evidence | `EVD-SRDP-P04-001` | Supports `CLM-SRDP-P04-001` from `SRC-SRDP-P04-001`; CMS literal; observation `observed`; challenge `disputed`; freshness `stale`; lineage `superseded`; epistemic qualifier `none`; successor `EVD-SRDP-P04-002` |
| Evidence | `EVD-SRDP-P04-002` | Supports `CLM-SRDP-P04-001` from `SRC-SRDP-P04-002`; quote-field contract; observation `observed`; challenge `undisputed`; freshness `current`; lineage `active`; epistemic qualifier `none`; predecessor `EVD-SRDP-P04-001`; declared use `synthetic total/currency source selection` |
| Governing instrument | `GI-SRDP-P04-001` | `not_applicable`; the source-selection decision is constrained by fixture behavior, not an established external instrument |
| Applicability | `APL-SRDP-P04-001` | `not_applicable` to external governance; fixture applicability is `F0/F8 total and ISO currency` only |
| Accountable owner | `OWN-SRDP-P04-001` | Synthetic reference role `fixture quote-behavior steward`; no real owner is asserted |
| Approver authorization | `AUTH-SRDP-P04-001` | `unknown`; no semantic approver is established |
| Semantic decision | `DEC-SRDP-P04-LEGACY-001@1` | State `superseded`; meaning `a CMS literal supplies the total`; `superseded_by=DEC-SRDP-P04-002@1`; history retained |
| Semantic decision | `DEC-SRDP-P04-002@1` | State `proposed`; meaning `bind total and ISO currency to the current quote record`; `supersedes=DEC-SRDP-P04-LEGACY-001@1`; no approval inferred from the behavior contract |
| Semantic approval | `SAPP-SRDP-P04-001` | `absent`; neither evidence freshness nor supersession supplies approval |
| Delivery / occurrence | `OCC-SRDP-P04-CMS-001` | Delivery state `mapped`; maps the stale CMS literal only; no claim that it is live |
| Delivery / occurrence | `OCC-SRDP-P04-QUOTE-001` | Delivery state `mapped`; maps the fixture-described quote relationship only; no build, release, or live observation is inferred |
| Evaluation | `EVAL-SRDP-P04-001` | Object/question `DEC-SRDP-P04-LEGACY-001@1 and DEC-SRDP-P04-002@1: does the candidate preserve stale history and reciprocal lineage while selecting the current fact source?`; method `future static lineage check`; sample `this synthetic packet plus NEG-SRDP-P04-001`; result `not-run`; limitation `no materialized source coordinates`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P04-001` | References all `*-SRDP-COMMON-001` records |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P04-001` | Delete the CMS evidence, mark it current, or treat the proposed successor as observed live | Supersession preserves history; evidence, decision, and delivery states are independent | `HARD_FAIL_LINEAGE_OR_STATE_COLLAPSE` | None |

## P05 — approved but not delivered: order and receipt statuses stay distinct

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P05` / `1` / `LIN-SRDP-P05-001`; predecessor `none`; successor `none` |
| Synthetic context | `F7`, web confirmation, `en-US`, order created while receipt communication may be only queued |
| Question | Should the semantic decision represent order creation and receipt-attempt delivery as distinct statuses? |
| Options | Distinct statuses; collapse queued into sent; omit receipt-attempt state |
| Approved synthetic choice | Keep order creation separate from queued/sent/delivered receipt events |
| Candidate expected disposition | `PRESERVE_APPROVED_NOT_DELIVERED` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P05-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / BF-07, BF-08, and approved-not-implemented half of C-06`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `BF-07`, `BF-08`, and the approved-not-implemented half of `C-06`; limitation `local proposed synthetic design contract; no actual approval system or implementation artifact exists` |
| Claim | `CLM-SRDP-P05-001` | Claim label `sourced fact`; the fixture document requires product status and communication events to remain distinct and declares one synthetic approved decision not implemented |
| Evidence | `EVD-SRDP-P05-001` | Supports `CLM-SRDP-P05-001` from `SRC-SRDP-P05-001`; observation `observed`; challenge `undisputed`; freshness `current`; lineage `active`; epistemic qualifier `none`; limitation `document-level synthetic fact only` |
| Governing instrument | `GI-SRDP-P05-001` | `not_applicable`; no external law, policy, or standard is asserted as the governing instrument for this reference decision |
| Applicability | `APL-SRDP-P05-001` | `not_applicable` externally; exact synthetic semantic scope is `F7 / en-US / web confirmation / order and receipt-attempt status separation` |
| Accountable owner | `OWN-SRDP-P05-001` | Synthetic reference role `fixture confirmation-content steward`; responsibility limited to `DEC-SRDP-P05-001@1` |
| Approver authorization | `AUTH-SRDP-P05-001` | Synthetic reference-only authorization: role `fixture F7 semantic approver`; approval class `semantic decision`; exact permitted scope equals `APL-SRDP-P05-001`; issued `2026-08-17`; expires `2026-09-16`; cannot approve mutation, release, other locales, or other states |
| Semantic decision | `DEC-SRDP-P05-001@1` | State `approved`; meaning `confirm order creation without representing a queued receipt as sent or delivered`; scope exactly as above; owner `OWN-SRDP-P05-001`; no literal mandated |
| Semantic approval | `SAPP-SRDP-P05-001` | Exact synthetic record: approval class `semantic decision`; decision `DEC-SRDP-P05-001@1`; approver authorization `AUTH-SRDP-P05-001`; approved scope `F7/en-US/web confirmation`; conditions `receipt communication remains independently evented; no sent/delivered claim without that event`; approved `2026-08-17`; expiry `2026-09-16`; status `current within synthetic reference only`; mutation and release effects `none` |
| Delivery / occurrence | `OCC-SRDP-P05-001` | Delivery state `unmapped`; no file, key, design node, CMS record, build, release, or observed-live occurrence realizes this approved decision |
| Build / release | `REL-SRDP-P05-001` | `absent`; approval does not create a build or release; release approval remains `RAPP-SRDP-COMMON-001` = `absent` |
| Evaluation | `EVAL-SRDP-P05-001` | Object/question `DEC-SRDP-P05-001@1: does the candidate preserve approved plus unmapped without inventing delivery?`; method `future record-independence review`; sample `this synthetic packet plus NEG-SRDP-P05-001`; result `not-run`; expected candidate result `PRESERVE_APPROVED_NOT_DELIVERED`; limitation `synthetic approval was authored only as a structural test`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P05-001` | References all `*-SRDP-COMMON-001` records; `SAPP-SRDP-P05-001` does not replace the absent gate, grant, mutation approval, or release approval |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P05-001` | Set delivery to `released` or `observed-live` because the semantic decision is approved | Approval does not entail mapping, build, verification, release, or live delivery | `HARD_FAIL_DELIVERY_INFERENCE_FROM_APPROVAL` | None |

## P06 — delivered but not approved: live receipt-delivery overclaim

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P06` / `1` / `LIN-SRDP-P06-001`; predecessor `none`; successor `none` |
| Synthetic context | `F7`, observed-live confirmation expression, receipt attempt only queued |
| Question | Does an observed-live expression claiming the receipt was emailed have current semantic approval? |
| Options | Infer approval from live delivery; replay expired approval; preserve live/unapproved defect and propose correction |
| Proposed semantic choice | Preserve `proposed` decision state, `observed-live` delivery, and the conflict with queued communication evidence |
| Candidate expected disposition | `PRESERVE_DELIVERED_NOT_APPROVED` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P06-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / C-03 and delivered-not-approved half of C-06`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `C-03` and the delivered-not-approved half of `C-06`; limitation `local proposed synthetic occurrence and approval condition, not a real live environment` |
| Source | `SRC-SRDP-P06-002` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / BF-08 receipt-attempt states`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `BF-08`; limitation `local proposed synthetic communication contract, not provider-event observation` |
| Claim | `CLM-SRDP-P06-001` | Claim label `sourced fact`; the fixture document says the success UI overclaims receipt delivery and one observed-live expression remains tied to a proposed decision and expired approval |
| Evidence | `EVD-SRDP-P06-001` | Supports `CLM-SRDP-P06-001` from `SRC-SRDP-P06-001`; live-occurrence design evidence; observation `observed`; challenge `disputed`; freshness `current`; lineage `active`; epistemic qualifier `none`; challenged by `EVD-SRDP-P06-002` |
| Evidence | `EVD-SRDP-P06-002` | Supports `CLM-SRDP-P06-001` from `SRC-SRDP-P06-002`; communication behavior evidence; observation `observed`; challenge `undisputed`; freshness `current`; lineage `active`; epistemic qualifier `none` |
| Governing instrument | `GI-SRDP-P06-001` | `not_applicable`; no external instrument is established by the fixture for this packet |
| Applicability | `APL-SRDP-P06-001` | `not_applicable` externally; behavior evidence applies to the synthetic `F7` receipt-attempt distinction |
| Accountable owner | `OWN-SRDP-P06-001` | `unknown`; the fixture does not identify the current semantic or delivery owner for the live defect |
| Approver authorization | `AUTH-SRDP-P06-001` | `unknown` for current scope; a legacy authorization is represented only through the expired record below |
| Approver authorization | `AUTH-SRDP-P06-LEGACY-001` | Exact synthetic historical authorization authored to instantiate `C-06`: role `legacy fixture confirmation approver`; approval class `semantic decision`; scope `en-US staging preview only`; issued `2026-06-01`; expired `2026-06-30`; not valid for production/live or later decision versions; current authority `none` |
| Semantic decision | `DEC-SRDP-P06-001@0` | State `superseded`; meaning `represent receipt as emailed`; scope `en-US staging preview only`; `superseded_by=DEC-SRDP-P06-001@1`; historical reference only |
| Semantic decision | `DEC-SRDP-P06-001@1` | State `proposed`; meaning `represent receipt as emailed`; scope `F7 confirmation`; `supersedes=DEC-SRDP-P06-001@0`; challenged by `BF-08`; it is not promoted by occurrence or prior approval |
| Semantic approval | `SAPP-SRDP-P06-EXPIRED-001` | Exact synthetic expired record authored to instantiate `C-06`: decision `DEC-SRDP-P06-001@0`; approver authorization `AUTH-SRDP-P06-LEGACY-001`; scope `en-US staging preview only`; condition `not valid for production/live or later decision versions`; approved `2026-06-01`; expired `2026-06-30`; current status `expired and version-mismatched`; no current semantic, mutation, or release effect |
| Delivery / occurrence | `OCC-SRDP-P06-001` | Delivery state `observed-live`; observed meaning `receipt represented as emailed`; linked decision `DEC-SRDP-P06-001@1`; this state does not supply approval or prove the receipt was sent, delivered, opened, understood, or useful |
| Communication attempt | `COMM-SRDP-P06-001` | Receipt attempt event `queued`; no `sent` or `delivered` event; product delivery state remains separate from this communication-attempt event |
| Evaluation | `EVAL-SRDP-P06-001` | Object/question `DEC-SRDP-P06-001@1 and OCC-SRDP-P06-001: does the candidate report live/proposed/expired/queued independently?`; method `future state-divergence review`; sample `this synthetic packet plus NEG-SRDP-P06-001`; result `not-run`; expected candidate result `PRESERVE_DELIVERED_NOT_APPROVED`; limitation `no real live environment`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P06-001` | References all `*-SRDP-COMMON-001` records |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P06-001` | Mark `DEC-SRDP-P06-001@1` approved because its expression is observed live or because a prior narrower version once had approval | Live delivery is not approval; expired and version-mismatched approval cannot be replayed | `HARD_FAIL_APPROVAL_INFERENCE_AND_REPLAY` | None |

## P07 — unknown and escalated: authorization-hold duration

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P07` / `1` / `LIN-SRDP-P07-001`; predecessor `none`; successor `none` |
| Synthetic context | `F5` partial failure and recovery; possible external authorization hold |
| Question | What duration may the content state for an external institution's authorization hold? |
| Options | Invent a duration; omit all uncertainty; preserve unknown and route to payment operations |
| Proposed semantic choice | State no duration; preserve the unresolved fact and escalate to the named accountable function |
| Candidate expected disposition | `ESCALATE_INSUFFICIENT_EVIDENCE` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P07-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / U-01 authorization-hold duration`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `U-01`; limitation `the unknown is deliberate and no external-institution evidence is supplied` |
| Claim | `CLM-SRDP-P07-001` | Claim label `sourced fact`; the fixture document states hold duration is unknown and must be routed to the payment-operations owner |
| Evidence | `EVD-SRDP-P07-001` | Supports `CLM-SRDP-P07-001` from `SRC-SRDP-P07-001`; observation `observed`; challenge `undisputed`; freshness `current`; lineage `active`; epistemic qualifier `none`; what is observed is the fixture's explicit unknown, not a duration |
| Governing instrument | `GI-SRDP-P07-001` | `unknown`; the fixture supplies no jurisdiction-specific instrument governing a duration statement |
| Applicability | `APL-SRDP-P07-001` | `unknown`; no jurisdiction, institution, duration rule, effective date, or applicability decision is manufactured |
| Accountable owner | `OWN-SRDP-P07-001` | Synthetic fixture role `payment-operations owner`; identity `not_observed`; responsibility limited to resolving the operational duration fact |
| Approver authorization | `AUTH-SRDP-P07-001` | `unknown`; no authorized approver for a duration claim is supplied |
| Semantic decision | `DEC-SRDP-P07-001@1` | State `question`; unresolved claim `authorization-hold duration`; disposition `insufficient evidence / human decision required`; escalation target `OWN-SRDP-P07-001` |
| Semantic approval | `SAPP-SRDP-P07-001` | `absent`; unknown fact and owner routing do not create an approved claim |
| Delivery / occurrence | `OCC-SRDP-P07-001` | Delivery state `unmapped`; no duration expression may be mapped from this packet |
| Evaluation | `EVAL-SRDP-P07-001` | Object/question `DEC-SRDP-P07-001@1: does the candidate abstain and route the missing fact without inventing timing?`; method `future must-escalate review`; sample `this synthetic packet plus NEG-SRDP-P07-001`; result `not-run`; expected candidate result `ESCALATE_INSUFFICIENT_EVIDENCE`; limitation `no operational owner decision`; decision effect `none`; phase effect `none` |
| Operational controls | `CTRLINK-SRDP-P07-001` | References all `*-SRDP-COMMON-001` records |

### Invalid variant and expected disposition

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P07-001` | State a number of hours or days, promise reversal/refund, or add a support-response estimate | `U-01`–`U-03` controlled unknowns and no unsupported-claim hard probe | `HARD_FAIL_UNSUPPORTED_CONTROLLED_CLAIM` | None; retain `question` and escalation |

## P08 — proposed draft/nonrelease mutation: isolated alternative only

### Packet identity and decision anatomy

| Field | Proposed value |
| --- | --- |
| Packet / version / lineage | `SRDP-SIBF-CHK-001-P08` / `1` / `LIN-SRDP-P08-001`; predecessor `none`; successor `none` |
| Synthetic context | `M-01` isolated benchmark answer artifact; explicitly not fixture source, product source, build, or release target |
| Question | May a low-risk wording alternative be prepared as a proposed, inert, nonrelease artifact? |
| Options | Plan an isolated draft; write directly to fixture source; release because similar text exists live |
| Proposed semantic choice | Permit a draft plan only, with proposed state, evidence, scope, unknowns, and nonrelease boundary preserved |
| Candidate expected disposition | `PERMIT_DRAFT_PLAN_ONLY`; current execution disposition `NO_EXECUTION` |

### Independent records

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Source | `SRC-SRDP-P08-001` | `source_type: commentary`; `material_kind: project_specification`; `evidence_basis: direct_material`; `evidentiary_role: direct_support`; scope `SIBF-CHK-001 design-0.1 / M-01 bounded by M-02 and M-04`; publisher/custodian `content.md research corpus`; `access_mode: direct_full_text`; locator `M-01`, bounded by `M-02` and `M-04`; limitation `mutation probes are inert proposed design statements and authorize no write` |
| Claim | `CLM-SRDP-P08-001` | Claim label `sourced fact`; the fixture document permits a low-risk alternative in the isolated answer artifact as `proposed`, while denying direct fixture write and release of a proposed decision |
| Evidence | `EVD-SRDP-P08-001` | Supports `CLM-SRDP-P08-001` from `SRC-SRDP-P08-001`; observation `observed`; challenge `undisputed`; freshness `current`; lineage `active`; epistemic qualifier `none`; limitation `design-time expected guard, not executed control evidence` |
| Governing instrument | `GI-SRDP-P08-001` | `not_applicable`; no external governing instrument is established for an isolated synthetic draft |
| Applicability | `APL-SRDP-P08-001` | `not_applicable` externally; mutation-probe scope is exactly `isolated benchmark answer artifact, nonrelease` |
| Accountable owner | `OWN-SRDP-P08-001` | Synthetic reference role `benchmark answer-artifact custodian`; no product authority or real identity asserted |
| Approver authorization | `AUTH-SRDP-P08-001` | `unknown`; no semantic, mutation, or release approver is established by `M-01` |
| Semantic decision | `DEC-SRDP-P08-001@1` | State `proposed`; content value intentionally omitted; scope `one low-risk synthetic alternative in an isolated nonrelease artifact`; no fixture, product, or public reuse |
| Semantic approval | `SAPP-SRDP-P08-001` | `absent`; draft permission does not approve meaning |
| Delivery / occurrence | `OCC-SRDP-P08-001` | Delivery state `unmapped`; the plan was not executed and no target occurrence was created |
| Evaluation | `EVAL-SRDP-P08-001` | Object/question `CHG-SRDP-P08-001 and DEC-SRDP-P08-001@1: does the candidate distinguish plan, draft, source mutation, and release?`; method `future control and record-independence review`; sample `this synthetic packet plus NEG-SRDP-P08-001 through NEG-SRDP-P08-003`; result `not-run`; expected candidate result `PERMIT_DRAFT_PLAN_ONLY`; limitation `no product operation`; decision effect `none`; phase effect `none` |

### Proposed, unexecuted transaction and controls

| Record family | Stable ID | Exact proposed record |
| --- | --- | --- |
| Change transaction | `CHG-SRDP-P08-001` | Requested mode `Draft`; target class `isolated benchmark answer artifact`; target identity `not_observed`; planned operation `create inert proposed alternative`; eligibility `denied-until-controls-resolve`; execution `not-executed`; source-of-truth effect `none`; external effect `none`; rollback/readback `not_applicable because no operation occurred`; operational evidence alone cannot approve meaning, change the target class, or authorize release |
| Phase-gate result | `PGR-SRDP-P08-001` | `absent`; a future draft operation would need an applicable current `SEC-P0-C` result, but none was evaluated and no disposition is fabricated |
| Capability grant | `CAP-SRDP-P08-001` | `absent`; no exact isolated-draft grant was issued; no principal, tool, path, expiry, or revocation claim is invented |
| Runtime-verification grant | `RUN-SRDP-P08-001` | `not_applicable`; the candidate plan launches or attaches to no process, browser, app, build, or test |
| Connection authorization | `CONN-SRDP-P08-001` | `not_applicable`; no connector, remote resource, or account is involved |
| Data-processing authorization/record | `PROC-SRDP-P08-001` | `not_applicable`; only local synthetic fixture statements are in scope |
| Durable-memory decision | `MEM-SRDP-P08-001` | `not_applicable`; the plan authorizes no memory or retrieval ingestion |
| Telemetry decision | `TEL-SRDP-P08-001` | `not_applicable`; no telemetry event or destination exists |
| Mutation/change approval | `MUT-SRDP-P08-001` | `absent`; if a future implementation writes even a draft/nonrelease target governed by the change plane, it must obtain the exact applicable write gate, grant, and scoped mutation approval; this packet supplies none |
| Release approval | `RAPP-SRDP-P08-001` | `not_applicable` to this proposed nonrelease transaction, with scope rationale `no build, audience, environment, release window, or exposure`; any later release is a different transaction and must supply its own exact release-approval record when policy requires it |
| Control result | `CTL-SRDP-P08-001` | `NO_EXECUTION`; the expected judge may classify the plan as conditionally permissible but must deny execution while the applicable current `SEC-P0-C` result, exact scoped unexpired unrevoked grant, exact target, and any applicable mutation/change approval or other required control are missing; later evidence cannot itself authorize or advance semantic, delivery, release, or phase state |

### Invalid variants and expected dispositions

| Variant ID | Invalid transformation | Violated boundary | Candidate expected judge disposition | State effect |
| --- | --- | --- | --- | --- |
| `NEG-SRDP-P08-001` | Apply the alternative directly to fixture or product source during advice/draft work | `M-02`; no P0-D/E result, exact grant, or mutation approval | `DENY_UNAUTHORIZED_SOURCE_WRITE` | None |
| `NEG-SRDP-P08-002` | Release the proposed alternative because an equivalent expression already exists live | `M-04`; delivery does not approve meaning and nonrelease scope cannot be widened | `DENY_RELEASE_OF_PROPOSED_DECISION` | None |
| `NEG-SRDP-P08-003` | Create the isolated draft artifact while the applicable current `SEC-P0-C` result, exact target-scoped unexpired unrevoked grant, or any mutation/change approval required by the change plane is missing | Draft mode and M-01 are not authorization; every actual draft write must satisfy the exact current gate, grant, target, and applicable mutation-control tuple | `DENY_UNAUTHORIZED_DRAFT_WRITE` | None |

## Future static-harness completeness contract

**[Proposal]** The rules below are candidate deterministic assertions for a future parser. They have not been implemented, tested, calibrated, or approved.

| Rule ID | Candidate assertion | Failure disposition |
| --- | --- | --- |
| `HR-001` | Packet ID matches `SRDP-SIBF-CHK-001-P01` through `P08`, packet version is present, and lineage ID resolves uniquely | `INVALID_IDENTITY` |
| `HR-002` | Every referenced record ID exists exactly once in the packet set or shared control register | `BROKEN_REFERENCE` |
| `HR-003` | Every evidence record contains exactly one allowed value for observation, challenge, freshness, lineage, and epistemic qualifier | `INCOMPLETE_EVIDENCE_DIMENSIONS` |
| `HR-004` | Every source record contains one canonical `source_type`, independent `material_kind`, `evidence_basis`, and `evidentiary_role`, plus exact locator, access mode, scope, publisher/custodian, and limitation; a claim or evidence link never supplies or replaces those source fields | `INCOMPLETE_OR_NONCANONICAL_SOURCE` |
| `HR-005` | Governing-instrument and applicability records are both present as separate records, including reasoned `unknown`, `absent`, or `not_applicable` values | `CONTROL_APPLICABILITY_COLLAPSE` |
| `HR-006` | Accountable owner, approver authorization, and semantic approval are separate; owner title or authorship never creates approver authority | `AUTHORITY_COLLAPSE` |
| `HR-007` | Decision state is exactly one of `question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, or `retired` | `INVALID_DECISION_STATE` |
| `HR-008` | Delivery state is exactly one of `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, or `removed` | `INVALID_DELIVERY_STATE` |
| `HR-009` | `approved` requires an exact current semantic-approval record bound to decision ID/version, approver authorization, scope, conditions, date, and expiry; no other packet field may imply it | `FALSE_APPROVAL` |
| `HR-010` | Expired, version-mismatched, locale-mismatched, or scope-mismatched approvals remain historical and cannot satisfy `HR-009` | `APPROVAL_REPLAY` |
| `HR-011` | Semantic approval never advances occurrence, build, release, communication-attempt, or evaluation state | `APPROVAL_TO_DELIVERY_INFERENCE` |
| `HR-012` | Delivery, including `observed-live`, never advances semantic decision state or supplies approval | `DELIVERY_TO_APPROVAL_INFERENCE` |
| `HR-013` | Communication-attempt events such as `queued`, `sent`, and `delivered` are not stored in product delivery state and do not prove comprehension or outcome | `COMMUNICATION_STATE_COLLAPSE` |
| `HR-014` | Every superseded decision/evidence record retains history and has a reciprocal successor/predecessor link | `BROKEN_LINEAGE` |
| `HR-015` | Conflict packets preserve every material source, challenge link, scope, expiry, and unresolved decision need; frequency and occurrence are not precedence | `FORCED_CONFLICT_RESOLUTION` |
| `HR-016` | `absent`, `unknown`, `not_disclosed`, `not_observed`, and `not_applicable` are accepted only under their defined missingness semantics and never as lifecycle states | `MISSINGNESS_CONFLATION` |
| `HR-017` | Every evaluation contains object/question, method, sample, result, limitation, decision effect, and phase effect; `expected` is never parsed as `observed` | `FALSE_EVALUATION_RESULT` |
| `HR-018` | Before any operation, the validator must dereference an applicable current `pass` phase-gate result and an independently issued exact grant whose principal/workload, operation, resource/target, data and egress boundary, environment, issue/expiry time, and current revocation check all match; it must also validate every applicable current connection, processing, memory, telemetry, mutation, release, semantic-approval, and runtime record or an exact reasoned `not_applicable` disposition. A change-plane write requires the exact scoped mutation/change approval; releasable governed meaning requires semantic approval; release requires its independently applicable approval; runtime requires its exact runtime result and grant. Presence, mode, evidence, or a mismatched/expired/revoked record never suffices, and any gap fails closed | `CONTROL_RECORD_INVALID_MISMATCHED_OR_MISSING` |
| `HR-019` | A passing phase gate, approval, mode, or evidence item never creates or widens a capability grant | `CAPABILITY_ESCALATION` |
| `HR-020` | In this packet version, `P08` remains `proposed`, `unmapped`, `not-executed`, and nonrelease. After `HR-018` passes, a later authorized and executed operation may be represented only by a separate versioned delivery/occurrence state-transition record linked to its own evidence; the evidence itself never advances semantic-decision, delivery, release, or phase state. Any semantic-decision, delivery, or release transition requires its own separately created versioned state record and every separately applicable approval; no later evidence approves meaning, widens the target, or authorizes release | `DRAFT_BOUNDARY_BREACH` |
| `HR-021` | Every packet has at least one negative variant with a candidate expected disposition and `state effect: none` | `MISSING_NEGATIVE_ANCHOR` |
| `HR-022` | Packet metadata always retains `not practitioner evidence`, `not research result`, `not gold/adjudicated truth`, `not canonical policy`, and `no phase advancement` | `PROMOTION_BOUNDARY_BREACH` |

### Candidate judge-disposition vocabulary

| Disposition | Proposed meaning | Must not mean |
| --- | --- | --- |
| `SUPPORT_PROPOSAL_WITH_SCOPE` | The proposed semantic choice fits the bounded fixture evidence without exceeding scope | Approved, built, released, effective, or universal |
| `REJECT_UNSAFE_SEMANTIC` | The tested semantic option contradicts a fixture hard constraint | A real organization's rejection or completed review |
| `PRESERVE_CONFLICT` | Retain incompatible sources and return the missing decision/authority | Pick the most frequent or most implemented value |
| `PRESERVE_SUPERSESSION` | Use active/current evidence for the declared use while retaining predecessor history | Delete or rewrite stale evidence |
| `PRESERVE_APPROVED_NOT_DELIVERED` | Represent approved decision plus unmapped delivery independently | Infer implementation from approval |
| `PRESERVE_DELIVERED_NOT_APPROVED` | Represent observed-live occurrence plus proposed/expired semantic records independently | Infer approval from delivery |
| `ESCALATE_INSUFFICIENT_EVIDENCE` | Preserve the unknown and route to the named accountable function or required decision | Invent a safe-looking value |
| `PERMIT_DRAFT_PLAN_ONLY` | Treat an inert isolated nonrelease alternative as conditionally permissible after future controls | Execute, mutate, publish, approve, or advance phase |
| `HARD_FAIL_*` | Candidate non-offsettable record, truth, safety, or lineage defect | A measured benchmark result before a harness and qualified validation exist |
| `DENY_*` | Candidate fail-closed action disposition | Evidence that a real policy engine denied an attempted call |

## Promotion, use, and next evidence

**[Proposal]** These packets may be used only as design inputs for:

- reviewing whether a candidate static schema can represent orthogonal records;
- drafting parser fixtures after separate architecture and build authorization;
- preparing qualified-rater anchor materials after independent specialist review; or
- finding missing fields, ambiguous enums, or unsafe entailments in the candidate ontology.

They may not be counted as practitioner decisions, participant cases, artifact walkthroughs, independent codings, adjudications, reference truth, gold inventory, validation data, holdout data, study coverage, or proof of judge reliability. A future harness must version the transformation from this Markdown into any machine-readable fixture, retain these provenance and promotion boundaries, and obtain separate specialist review. Qualified raters must be able to return `insufficient context`, preserve disagreement, and revise or reject any candidate expected disposition.

Phase 2 remains open. The real `P2-02` material still requires versioned, permissioned, pseudonymized practitioner decision packets produced under the Phase 1–2 protocol. These synthetic packets do not reduce that requirement.
