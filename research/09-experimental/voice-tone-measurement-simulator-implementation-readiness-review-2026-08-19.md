---
title: Voice and tone measurement simulator implementation-readiness review
status: working-note
created: 2026-08-19
updated: 2026-08-19
review_id: VT-MSP-IMPL-READINESS-2026-08-19-01
review_class: local-read-only-preimplementation
protocol_id: VT-MSP
protocol_revision: design-0.1
protocol_sha256: 9c7d0ecd64b5f32543fc2a16b69c65fa1ad97c9c3f209cd15a866e5c8dd7bcb8
implementation_status: not-built
run_status: not-run
authority: none
scope: Readiness and missing-contract review for a future deterministic synthetic simulator; no implementation plan, code, execution, or approval
source_documents:
  - voice-tone-measurement-simulation-protocol.md
  - voice-tone-measurement-estimand-and-coverage-specification.md
  - voice-tone-construct-cognitive-validation-protocol.md
  - CDM-V0-ARCH-DECISION-r2.md
  - materials-and-access-register.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
---

# Voice and tone measurement simulator implementation-readiness review

## Result and authority boundary

**[Research finding]** The current [measurement simulation protocol](voice-tone-measurement-simulation-protocol.md) is detailed enough to define the intended mathematics, identities, random streams, scenario population, failure behavior, reporting boundaries, and future evidence requirements. Its nine-source frozen manifest matches the current local files at protocol SHA-256 `9c7d0ecd64b5f32543fc2a16b69c65fa1ad97c9c3f209cd15a866e5c8dd7bcb8`.

**[Research finding]** The repository is not executable. It contains research documents and inert JSON/JSONL data, but no simulator source, package/runtime manifest, dependency lock, standalone record schemas, command surface, test suite, result store, implementation manifest, or run evidence. A bundled local Node.js and Python runtime are available to the workspace, but neither runtime nor any numerical library has been selected, pinned, approved, or tested for this simulator.

**[Inference]** The next responsible implementation artifact is not a mathematical redesign. It is a machine-readable projection of the reviewed paper protocol plus a narrowly bounded module/test architecture. That projection must remain subordinate to the paper protocol and fail closed when any identity, hash, count, status union, or source binding differs.

This review has `authority: none`. It does not approve an implementation plan, create code, select dependencies, authorize execution or persistence, close `P4-01` or `P4-06c`, or advance any study phase.

## Verified paper-contract coverage

| Contract area | Present paper evidence | Readiness finding |
| --- | --- | --- |
| Source identity | Nine exact local inputs with SHA-256 values | Current and reproducible; future run must reject drift |
| Scenario identity | Exact eight-key preimage, 26 factor keys, RFC 8785/JCS hashing, full hash and shortened ID rule | Sufficient to project into a strict schema and identity verifier |
| Scenario population | Exact arm definitions, `33,012` prededup rows, `32,858` unique scenarios, `154` duplicate memberships and `133` multi-arm bundles | Sufficient to build an independent grid oracle; no executable oracle exists |
| Randomness | Philox-4x32-10 derivation, counter interpretation, stream ownership and conformance vector | Sufficient to implement; future runtime must reproduce the exact vector before generating scenarios |
| Synthetic data model | Target-specific finite/redrawn effects, five submitted outcomes, process hazards, ordinal, calibration, graph and counterfactual branches | Substantively specified; implementation must keep modules and random streams independent |
| Estimands and analyses | Eleven estimands, exact target scopes, estimator and interval IDs, null/unsupported behavior | Sufficient for explicit dispatch; no library or numerical-tolerance implementation is selected |
| Status and failure behavior | Separate run, estimate, truth, probability, interval, terminal and disposition states with closed reason codes | Sufficient for generated validators; standalone schemas do not exist |
| Leakage controls | Exact 64-case leakage matrix, eligible universes, deterministic injected transforms and fail-closed result | Sufficient for a mandatory input-guard test suite |
| Output families | Design, scenario, run, assignment, rating, mapping, calibration, replicate, metric, probability, interval, decision, provenance and review records | Field inventories exist; machine-valid schemas and cross-record constraints do not |
| Interpretation boundary | Synthetic-only, no construct validity, no product quality, no organization fidelity, no universal scalar | Clear and must be copied into every future report |

## Missing implementation contracts

The following are required before any simulator execution can be called conforming.

| ID | Missing contract | Minimum acceptable evidence |
| --- | --- | --- |
| `IR-01` | Implementation authorization | Exact approved scope for creating the simulator, its permitted files, runtime, dependencies, tests and non-network boundary |
| `IR-02` | Runtime and dependency manifest | Language/runtime, numerical and schema libraries, operating system, build method and immutable versions/hashes; no unreviewed install-time execution |
| `IR-03` | Machine-readable protocol manifest | Exact IDs, factor types/values, arms, targets, counts, profiles, methods, status vocabularies and source hashes represented without inferred defaults |
| `IR-04` | Standalone record schemas | Closed schemas for every record family, including value/status unions, exact reason vocabularies, hashes, provenance and cross-record references |
| `IR-05` | Independent grid oracle | Separately implemented count/dedup/membership verifier reproducing `33,012` to `32,858`, `154` duplicate memberships and `133` multi-arm bundles |
| `IR-06` | PRNG conformance implementation | Exact Philox vector, key/counter parsing, stream partitioning, consumption ledger and cross-stream-reuse rejection |
| `IR-07` | Numerical method profile | Exact solvers, optimization constraints, tolerances, convergence/failure mapping, bootstrap behavior and deterministic ordering for every method ID |
| `IR-08` | Append/persistence disposition | Ephemeral default or a separately authorized append-only output path with exact scope, record locks, receipts, retention and cleanup |
| `IR-09` | Test and negative-control suite | Schema, hash, source drift, count, seed, stream, null-union, graph, leakage, nonfinite-value, overwrite and prohibited-input tests |
| `IR-10` | Independent method and implementation review | Review bound to exact protocol and implementation hashes, with all required checklist areas and no blocking finding |

## Proposed module boundary for later approval

This decomposition is a review recommendation, not an implementation plan or permission to create files.

1. `protocol-manifest` — loads one immutable machine-readable protocol projection and verifies all source/profile hashes.
2. `identity-grid` — generates complete factor/target preimages, deduplicates them, derives scenario hashes/IDs and retains sorted arm membership.
3. `random-streams` — supplies Philox streams only through named coordinates and emits a consumption audit.
4. `synthetic-process` — generates target effects, schedules, process states, responses, bands, calibration cases, graph fixtures and counterfactual pairs without sharing unowned streams.
5. `analysis` — dispatches only named estimators/intervals after domain guards; unsupported and undefined remain null with exact reasons.
6. `decision-rules` — applies the locked metric applicability, Monte Carlo stopping, prohibited-output and paper-disposition rules.
7. `records` — validates, canonicalizes and hashes immutable record families; it never repairs or fills an invalid record.
8. `report` — renders counts, failures, uncertainty and limitations from validated records while preserving the protocol's non-authority statement.
9. `independent-verifier` — recomputes hashes, scenario/grid totals, seed vectors, reference relations, null unions and output denominators without trusting the primary engine's summary.

No module may access a browser, network, account, credential, participant data, production content, external model, arbitrary repository path, subprocess, plugin, dynamic fixture import or unapproved writable location.

## Required proof sequence

| Sequence | Evidence | What it can establish |
| ---: | --- | --- |
| 1 | Approved implementation scope plus frozen runtime/dependency manifest | Permission and identity for a candidate build only |
| 2 | Machine-readable protocol/record schemas and an independent schema review | Executable representation of the paper contract, not mathematical correctness |
| 3 | PRNG vector, source/hash, grid/count and negative-control tests | Deterministic input and identity conformance |
| 4 | Unit/property tests for each synthetic and analytic module | Local module behavior under synthetic inputs |
| 5 | Independent verifier agreement on a bounded conformance run | Candidate implementation consistency; not a valid full simulation result |
| 6 | Independent method review of the exact implementation hash | Methodological permission to consider a separately authorized full run |
| 7 | One complete authorized run and immutable evidence packet | Synthetic operating-characteristic evidence in the protocol's exact scope only |

No later sequence item repairs a failed earlier item. A complete synthetic run cannot establish cognitive validity, pilot outcomes, organization voice, product quality, user benefit or a universal threshold.

## Current disposition

| Item | Current state |
| --- | --- |
| Paper simulation design | `design_supported` within its stated proposal-only scope |
| Machine-readable implementation contract | `not-materialized` |
| Simulator source and tests | `not-built` |
| Independent method review | `missing` |
| Simulation run/results | `not-run` |
| Construct validation | `requires_cognitive_validation` |
| Human pilot evidence | `requires_pilot_data` |
| Implementation/build/execution authority | `none` |

**[Recommendation]** After explicit approval of the offline synthetic simulator design, materialize `IR-02` through `IR-09` as one bounded implementation package, validate a small conformance path first, and keep the full `32,858`-scenario run separately gated. Do not combine the future simulator with browser research, product agents, external judges or Track B fixture execution in its first build.
