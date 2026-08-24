---
title: Voice and tone offline simulator implementation plan
status: proposed
created: 2026-08-19
updated: 2026-08-19
document_id: VT-SIM-IMPL-PLAN-2026-08-19
document_revision: plan-0.1
implementation_status: not-started
execution_status: not-run
authority_effect: none
authorization_scope: Documentation requested by the user; no code, dependency acquisition, test execution, persistence, full simulation, or release authority
phase_dependency: P4-06c
scope: Test-first implementation sequence for the bounded offline VT-MSP simulator candidate
source_documents:
  - voice-tone-offline-simulator-implementation-specification-2026-08-19.md
  - voice-tone-measurement-simulation-protocol.md
  - voice-tone-measurement-simulator-implementation-readiness-review-2026-08-19.md
  - voice-tone-measurement-estimand-and-coverage-specification.md
  - materials-and-access-register.md
---

# Voice and Tone Offline Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and independently verify a deterministic, offline `vt-sim/0.1.0-candidate` that projects the frozen VT-MSP paper protocol, validates its identities and controls, and runs only bounded one-scenario conformance cases.

**Architecture:** A single-process Python library and thin CLI use strict immutable records, RFC 8785/JCS plus SHA-256 identities, an explicit Philox-4x32-10 implementation, guarded numerical methods, stdout-only records, and a separately implemented verifier. The primary engine and verifier share approved manifests and canonicalization vectors but not grid, generator, analysis, decision, or reporting code.

**Tech Stack:** Python `3.12.13`; NumPy `2.3.5`; Pydantic `2.13.4` with `pydantic-core` `2.46.4`, `annotated-types` `0.7.0`, `typing-extensions` `4.16.0`, and `typing-inspection` `0.4.2`; `rfc8785` `0.1.4`; Python standard-library `unittest`, `argparse`, `hashlib`, `json`, `decimal`, `tempfile`, and `subprocess` only in the external test driver—not in simulator runtime code.

**Spec:** [Voice and tone offline simulator implementation specification](voice-tone-offline-simulator-implementation-specification-2026-08-19.md)

## Global constraints

- This plan is paper-only. Begin Task 1 only after an exact `SIM-I0` implementation authorization names `tools/voice-tone-simulator/` and its permitted files.
- Do not browse, use Chrome, call a network service, invoke a model/agent, use an account/credential, or ingest participant, customer, production, vendor or organization-profile data.
- Dependency acquisition is a separate approved build step. Runtime and tests execute with the network disabled.
- Do not expose a full-grid run command in `0.1.0-candidate`.
- Runtime output is canonical JSON Lines on stdout. There is no result store, cache, report file, telemetry or persistent log.
- Preserve every protocol `unsupported`, `undefined`, `not_attempted`, `invalid_run`, `estimator_failure`, `precision_unmet` and missing-interval state.
- Write a failing test before implementation in every task. Run that test, observe the intended failure, add the smallest implementation, rerun it, then run the accumulated suite.
- The current workspace is not a Git repository. Each task therefore ends with a deterministic package inventory/hash receipt. If a separately authorized future Git repository contains the package, the named checkpoint commit may replace that receipt.
- Do not mark a task complete from text searches alone. Completion requires the named executable assertion and all prior task tests.

## Common commands

These commands assume the future package has been authorized and materialized.

```bash
cd /Users/aagarau/Desktop/content.md/tools/voice-tone-simulator
PYTHON=/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3
$PYTHON -m unittest discover -s tests -p 'test_*.py' -v
```

The task receipt command is:

```bash
cd /Users/aagarau/Desktop/content.md/tools/voice-tone-simulator
find . -type f ! -path './.git/*' ! -name '.DS_Store' \
  ! -name 'package-inventory.sha256' -print0 \
  | LC_ALL=C sort -z \
  | xargs -0 shasum -a 256 \
  > package-inventory.sha256
shasum -a 256 package-inventory.sha256
```

`package-inventory.sha256` is a development receipt, not a release signature or approval. It must be regenerated after each task and is excluded from its own input list.

---

## Task 1: Freeze the candidate package and runtime boundary

**Files:**

- Create: `tools/voice-tone-simulator/README.md`
- Create: `tools/voice-tone-simulator/pyproject.toml`
- Create: `tools/voice-tone-simulator/requirements-build.txt`
- Create: `tools/voice-tone-simulator/src/vt_simulator/__init__.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/cli.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/errors.py`
- Create: `tools/voice-tone-simulator/tests/test_cli.py`

**Interfaces:**

```python
def main(argv: list[str] | None = None) -> int: ...
def version_record() -> dict[str, object]: ...
class SimulatorError(Exception): ...
class ProhibitedCapabilityError(SimulatorError): ...
```

- [ ] **1.1 Write the failing CLI-boundary tests.** Assert `vt-sim --version` emits one JSON object with exact candidate, Python, protocol and execution-boundary IDs. Assert URLs, output paths, unknown commands and `run-all` return exit `2` or `7` and produce no files.

- [ ] **1.2 Run the focused test and confirm it fails because the package/CLI does not exist.**

```bash
$PYTHON -m unittest tests.test_cli -v
```

- [ ] **1.3 Add the smallest package metadata and CLI.** Pin Python `==3.12.13`, NumPy `==2.3.5`, Pydantic `==2.13.4`, `pydantic-core==2.46.4`, `annotated-types==0.7.0`, `typing-extensions==4.16.0`, `typing-inspection==0.4.2`, and `rfc8785==0.1.4`. Record every approved artifact filename and SHA-256; the expected `rfc8785` wheel SHA-256 is `520d690b448ecf0703691c76e1a34a24ddcd4fc5bc41d589cb7c58ec651bcd48`. If any other artifact hash is absent, stop Task 1 at `SIM-I1` rather than installing from the network. Expose only the five commands in the specification.

- [ ] **1.4 Add an import allowlist test.** Parse the runtime source AST and reject `socket`, HTTP clients, browser automation, model SDKs, `pickle`, `yaml`, dynamic import, `eval`, `exec`, runtime `subprocess`, and filesystem writes.

- [ ] **1.5 Run the focused and accumulated suites.**

```bash
$PYTHON -m unittest tests.test_cli -v
$PYTHON -m unittest discover -s tests -p 'test_*.py' -v
```

- [ ] **1.6 Regenerate the package receipt.** If a future approved Git repo exists, checkpoint message: `chore(vt-sim): freeze offline candidate boundary`.

## Task 2: Implement canonical bytes, hashing, and strict base models

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/canonical.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/models.py`
- Create: `tools/voice-tone-simulator/tests/test_canonical.py`
- Create: `tools/voice-tone-simulator/tests/test_models.py`
- Create: `tools/voice-tone-simulator/tests/fixtures/canonicalization-vectors.jsonl`

**Interfaces:**

```python
def load_json_strict(raw: bytes) -> object: ...
def canonical_bytes(value: object) -> bytes: ...
def content_hash(value: dict[str, object], omit: frozenset[str] = frozenset()) -> str: ...
def verify_record_hash(record: dict[str, object]) -> None: ...
class StrictRecord(BaseModel): ...
```

- [ ] **2.1 Write failing canonicalization tests.** Include the protocol baseline preimage, key ordering, array preservation, non-ASCII, duplicate keys, NaN/infinity, negative zero, invalid decimal strings, non-string keys and own-hash omission.

- [ ] **2.2 Run and observe the missing-module failure.**

```bash
$PYTHON -m unittest tests.test_canonical tests.test_models -v
```

- [ ] **2.3 Implement strict decoding and JCS hashing.** Use `rfc8785.dumps`; reject unsupported types before the dependency sees them. Do not serialize a Pydantic object until it has been converted with explicit aliases and no excluded unset fields.

- [ ] **2.4 Implement the closed base model.** Configure strict types, frozen instances, alias validation, and `extra='forbid'`. Add exact lowercase 64-hex digest validation.

- [ ] **2.5 Add negative record tests.** Prove a record with a coerced integer, unknown field, missing required member, uppercase digest, self-including digest or nonfinite value fails.

- [ ] **2.6 Run focused and accumulated suites, then regenerate the receipt.** Future checkpoint message: `feat(vt-sim): add canonical identity foundation`.

## Task 3: Materialize and validate the protocol projection

**Files:**

- Create: `tools/voice-tone-simulator/protocol/manifest.vt-msp-design-0.1.json`
- Create: `tools/voice-tone-simulator/protocol/factors.vt-msp-design-0.1.json`
- Create: `tools/voice-tone-simulator/protocol/methods.vt-msp-design-0.1.json`
- Create: `tools/voice-tone-simulator/protocol/statuses.vt-msp-design-0.1.json`
- Create: `tools/voice-tone-simulator/protocol/leakage.vt-msp-design-0.1.json`
- Create: `tools/voice-tone-simulator/src/vt_simulator/manifest.py`
- Create: `tools/voice-tone-simulator/tests/test_manifest.py`

**Interfaces:**

```python
@dataclass(frozen=True)
class ApprovedRoots:
    protocol_root: Path
    paper_source_root: Path

def load_validated_protocol(roots: ApprovedRoots) -> ValidatedProtocol: ...
def verify_source_locks(protocol: ValidatedProtocol, roots: ApprovedRoots) -> SourceLockReport: ...
```

- [ ] **3.1 Write failing manifest tests.** Require nine source locks, 26 exact factor keys, four targets, 11 estimands, exact profile IDs, all arm rules, exact counts, method/interval IDs, status/reason vocabularies, 64 leakage cases and the interpretation boundary.

- [ ] **3.2 Add drift and path-negative tests.** Reject wrong bytes, missing source, extra manifest member, implicit factor default, symlink, `..`, absolute undeclared path, duplicate ID and digest mismatch.

- [ ] **3.3 Run the focused test and confirm failure.**

```bash
$PYTHON -m unittest tests.test_manifest -v
```

- [ ] **3.4 Transcribe the paper protocol into the five projection files.** Use exact strings and types; do not parse Markdown at runtime. Each file gets a schema version, content hash and source-clause references.

- [ ] **3.5 Implement raw-byte source verification before semantic loading.** Realpath-resolve and symlink-reject every allowed source. Hash before parsing any projection that depends on it.

- [ ] **3.6 Run tests and compare all nine current source hashes with the spec.** Regenerate the receipt. Future checkpoint message: `feat(vt-sim): project frozen measurement protocol`.

## Task 4: Define all standalone record schemas and cross-record unions

**Files:**

- Create: the 14 files under `tools/voice-tone-simulator/protocol/schemas/` named in the specification
- Extend: `tools/voice-tone-simulator/src/vt_simulator/models.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/records.py`
- Create: `tools/voice-tone-simulator/tests/test_records.py`
- Create: `tools/voice-tone-simulator/tests/fixtures/null-status-cases.jsonl`

**Interfaces:**

```python
def validate_record(record: dict[str, object]) -> StrictRecord: ...
def validate_record_set(records: Iterable[StrictRecord]) -> RecordSetReport: ...
def hash_record(record: StrictRecord) -> str: ...
```

- [ ] **4.1 Write failing table-driven tests for every successful and null union.** Cover design, scenario, run, assignment, rating, mapping, calibration, replicate, metric, probability, interval, decision, provenance and review records.

- [ ] **4.2 Prove contradictory records fail.** Examples: `unsupported` with a number; success with a reason; failed interval with bounds; probability missing but `0.5`; undefined alpha called estimator failure; missing fixed-target interval omitted instead of recorded.

- [ ] **4.3 Run the focused test and confirm missing schemas/models fail.**

```bash
$PYTHON -m unittest tests.test_records -v
```

- [ ] **4.4 Implement closed Pydantic models and JSON Schema exports.** Schema files are generated in a deterministic key order, then independently reviewed against the paper field inventories.

- [ ] **4.5 Implement cross-record validation.** Enforce exact references, scenario/replicate uniqueness, profile compatibility, target/method applicability, denominator membership and record-hash correctness.

- [ ] **4.6 Run all schema positive/negative cases and accumulated tests.** Regenerate the receipt. Future checkpoint message: `feat(vt-sim): add closed scientific record contracts`.

## Task 5: Build the primary scenario grid and independent oracle

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/grid.py`
- Create: `tools/voice-tone-simulator/tests/test_grid.py`
- Create: `tools/voice-tone-simulator/tests/fixtures/grid-counts.json`
- Create: `tools/voice-tone-simulator/verify_snapshot.py`

**Interfaces:**

```python
def expand_prededup_rows(protocol: ValidatedProtocol) -> Iterator[ScenarioMembership]: ...
def deduplicate_scenarios(rows: Iterable[ScenarioMembership]) -> GridResult: ...
def verify_grid_independently(protocol_path: Path) -> IndependentGridReport: ...
```

- [ ] **5.1 Write failing count and identity tests.** Require `33,012` prededup rows, `32,858` unique scenarios, `154` duplicate memberships, `133` multi-arm bundles, full-hash set equality and zero short-ID collisions.

- [ ] **5.2 Add identity-negative tests.** Arm membership, timestamps, derived fields, defaults and result data must change or invalidate the preimage contract rather than silently enter identity. Reordered object members must not change JCS; reordered arrays must.

- [ ] **5.3 Run and confirm the missing-grid failures.**

```bash
$PYTHON -m unittest tests.test_grid -v
```

- [ ] **5.4 Implement the primary generator.** Expand arms in declared order, build complete eight-key preimages, compute full hashes/short IDs, deduplicate, union/sort memberships, and emit the five count/diff reports.

- [ ] **5.5 Implement the separate oracle in `verify_snapshot.py`.** Use independent loops and collections; do not import `vt_simulator.grid`.

- [ ] **5.6 Compare exact scenario sets and membership maps from both paths.** Run twice and assert byte-identical reports. Regenerate the receipt. Future checkpoint message: `feat(vt-sim): materialize independently verified scenario grid`.

## Task 6: Implement Philox and owned random-stream ledgers

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/philox.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/streams.py`
- Create: `tools/voice-tone-simulator/tests/test_philox.py`
- Create: `tools/voice-tone-simulator/tests/test_streams.py`
- Create: `tools/voice-tone-simulator/tests/fixtures/philox-vector.json`

**Interfaces:**

```python
def philox4x32_10(counter: tuple[int, int, int, int], key: tuple[int, int]) -> tuple[int, int, int, int]: ...
def derive_stream(coordinates: StreamCoordinates) -> OwnedStream: ...
class OwnedStream:
    def uniform(self, purpose: str) -> float: ...
    def close(self) -> ConsumptionRecord: ...
```

- [ ] **6.1 Write the failing frozen-vector test.** Assert the exact derived key/counter/fingerprint and first block from the protocol.

- [ ] **6.2 Add arithmetic and counter tests.** Cover 32-bit wrap, round count, big-endian 128-bit increment, output word order and `(word + 0.5) / 2^32` mapping.

- [ ] **6.3 Add stream misuse tests.** Reject malformed replicate indices, duplicate coordinate ownership, cross-target reuse, adaptive reseeding, early close with missing draws, excess draws and population-block misuse.

- [ ] **6.4 Run and confirm failures.**

```bash
$PYTHON -m unittest tests.test_philox tests.test_streams -v
```

- [ ] **6.5 Implement Philox directly and the coordinate derivation adapter.** Do not call NumPy random APIs.

- [ ] **6.6 Implement full-allotment ledgers and verify two repeated runs are byte-identical.** Regenerate the receipt. Future checkpoint message: `feat(vt-sim): add frozen Philox stream ownership`.

## Task 7: Build schedule and finite-population generation

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/schedule.py`
- Extend: `tools/voice-tone-simulator/src/vt_simulator/process.py`
- Create: `tools/voice-tone-simulator/tests/test_schedule.py`
- Extend: `tools/voice-tone-simulator/tests/test_process.py`

**Interfaces:**

```python
def build_schedule(scenario: ScenarioRecord, streams: StreamRegistry) -> ScheduleRecordSet: ...
def build_population_block(scenario: ScenarioRecord, streams: StreamRegistry) -> PopulationBlock: ...
```

- [ ] **7.1 Write failing schedule tests.** Assert exact family/card/rater counts, side and order balance, counterfactual pairing, alias-design behavior and canonical assignment order.

- [ ] **7.2 Write failing target tests.** For `T-FIXED-FIXED`, effects are identical across replicate indices; for new-message/new-rater targets, only the named components redraw. Cross-cell fixed panels use population-block seeds, not full-scenario hashes.

- [ ] **7.3 Add selection-independence tests.** The schedule must be identical when outcome/missingness/calibration inputs change while allocation factors remain constant.

- [ ] **7.4 Implement the schedule and crossed finite effects with exact stream ownership.**

- [ ] **7.5 Run focused and accumulated tests; regenerate the receipt.** Future checkpoint message: `feat(vt-sim): add frozen schedules and target populations`.

## Task 8: Implement process, outcome, ordinal, calibration, graph, and counterfactual generators

**Files:**

- Extend: `tools/voice-tone-simulator/src/vt_simulator/process.py`
- Extend: `tools/voice-tone-simulator/tests/test_process.py`

**Interfaces:**

```python
def generate_replicate(context: ReplicateContext) -> SyntheticReplicateRecords: ...
def solve_intercept(target_rate: float, covariates: NDArray, slopes: NDArray) -> SolverResult: ...
```

- [ ] **8.1 Write failing intercept-solver vectors.** Require bracket `[-40,40]`, tolerance `1e-12`, at most `200` iterations, deterministic midpoint, exact at-risk denominator and typed no-root failure.

- [ ] **8.2 Write failing sequential-process tests.** Nonstart is evaluated first; nonlock uses only started assignments; procedural abstention uses only locked assignments; invalidation has its exact eligible set. Validate MCAR, MAR and MNAR covariates and rates.

- [ ] **8.3 Write failing response-mapping tests.** Raw `LEFT`/`RIGHT` persists unchanged; A/B derives only after the immutable side map; three nondecisive outcomes remain distinct.

- [ ] **8.4 Write failing ordinal/calibration tests.** Raw bands stay `0..4`, graph bands are `1..5`, normalized values are `0..1`; calibration uses only observed events with nonmissing predictions and records the oracle would-be probability for K6 diagnostics.

- [ ] **8.5 Write failing graph/counterfactual tests.** Frozen graph arcs override ordinary latent draws only by the specified transform. Counterfactual pairs share the declared nonstart event, use owned counterfactual streams, preserve operation validity and retain paired missingness.

- [ ] **8.6 Implement the generator in the exact protocol order and emit immutable intermediate records.**

- [ ] **8.7 Run repeated-replicate byte-identity and accumulated tests.** Regenerate the receipt. Future checkpoint message: `feat(vt-sim): implement synthetic measurement process`.

## Task 9: Implement numerical primitives with explicit failure behavior

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/numerics.py`
- Create: `tools/voice-tone-simulator/tests/test_numerics.py`

**Interfaces:**

```python
def bisect_monotone(spec: BisectionSpec) -> SolverResult: ...
def fit_binary_irls(spec: BinaryModelSpec) -> FitResult: ...
def fit_multinomial_newton(spec: MultinomialModelSpec) -> FitResult: ...
def fit_proportional_odds(spec: OrdinalModelSpec) -> FitResult: ...
def fit_bradley_terry(spec: BradleyTerrySpec) -> FitResult: ...
def krippendorff_alpha(spec: AlphaSpec) -> MetricResult: ...
def wilson_interval(successes: int, trials: int, level: float) -> IntervalResult: ...
```

- [ ] **9.1 Write failing hand-checkable vectors.** Include balanced binary data, complete separation, rank deficiency, constant predictor, proportional-odds threshold ordering, strongly connected BT graph, disconnected graph, nominal alpha, ordinal alpha, zero denominator and Wilson endpoints.

- [ ] **9.2 Write deterministic convergence tests.** Assert initialization, parameter order, iteration counts, step-halving sequence, condition/rank guard and exact failure reason.

- [ ] **9.3 Run and confirm missing-method failures.**

```bash
$PYTHON -m unittest tests.test_numerics -v
```

- [ ] **9.4 Implement only methods named in the locked methods manifest.** Do not substitute a library default or a generic interval.

- [ ] **9.5 Add cross-platform tolerance tests.** Compare values within frozen numeric tolerances while requiring exact statuses, reasons, iteration boundaries and record hashes for deterministic nonnumeric fields.

- [ ] **9.6 Run all tests and regenerate the receipt.** Future checkpoint message: `feat(vt-sim): add explicit guarded numerical methods`.

## Task 10: Implement estimand dispatch, analyses, intervals, and null maps

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/estimands.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/analysis.py`
- Create: `tools/voice-tone-simulator/tests/test_estimands.py`
- Create: `tools/voice-tone-simulator/tests/test_analysis.py`

**Interfaces:**

```python
def dispatch_estimand(request: EstimandRequest, records: RecordSet) -> AnalysisRequest | NullMetricRecord: ...
def analyze(request: AnalysisRequest) -> AnalysisRecordSet: ...
```

- [ ] **10.1 Write a failing exact 11-estimand mapping test.** Assert target kinds, data units, denominators, point methods, interval methods, prerequisite state, output family and prohibited claims for `EST-01` through `EST-11`.

- [ ] **10.2 Write guard-order tests.** Recurring identity precedes graph topology; topology precedes separation; event/prediction availability precedes calibration fitting; interval availability precedes coverage. A failed earlier guard prevents fitter invocation.

- [ ] **10.3 Write the complete null/failure table tests.** Include nonrecurring identity, non-strong connectivity, separation, zero/insufficient events, constant predictor, aliased card/order or rater/side, nonpositive alpha denominator, undefined synthetic truth, missing fixed-target interval, estimator nonconvergence and invalid input.

- [ ] **10.4 Implement closed dispatch and analyses.** The mapping is data, not chained conditionals with fallback behavior.

- [ ] **10.5 Prove fixed-target unsupported intervals remain explicit records and cannot disappear from coverage/applicability denominators.**

- [ ] **10.6 Run focused and accumulated suites; regenerate the receipt.** Future checkpoint message: `feat(vt-sim): implement guarded estimand analysis`.

## Task 11: Implement metrics, Monte Carlo rules, and paper dispositions

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/decisions.py`
- Create: `tools/voice-tone-simulator/tests/test_decisions.py`

**Interfaces:**

```python
def summarize_replicates(records: Iterable[ReplicateRecord], profile: AnalysisProfile) -> MetricRecordSet: ...
def next_batch(metrics: MetricRecordSet, valid_replicates: int) -> StoppingDecision: ...
def apply_paper_disposition(metrics: MetricRecordSet) -> DecisionRecordSet: ...
```

- [ ] **11.1 Write failing denominator tests.** Coverage uses only truth-eligible, successfully estimated intervals while retaining every undefined/unsupported/failure count separately. Probability MCSE uses the scored eligible population; bias/RMSE use exact truth-defined replicates.

- [ ] **11.2 Write failing stopping tests.** Start `5,000`, add `1,000`, cap `20,000`, Wilson probability MCSE at most `0.0025`, exact batch relative-MCSE formula, no replacement of invalid replicates and precision-unmet retention.

- [ ] **11.3 Write failing precedence tests.** `unsupported` dominates cognitive, simulation and pilot needs; cognitive validation dominates simulation; simulation dominates pilot; success cannot emit approval or skip prerequisites.

- [ ] **11.4 Implement metric summaries, stopping and the exact operating-decision table.** A bounded conformance run may evaluate logic but labels output `candidate_conformance_only`.

- [ ] **11.5 Add prohibited-language tests.** Reject output keys or values claiming accepted threshold, validated construct, calibrated real probability, organization voice, product winner, universal score, pilot support or release approval.

- [ ] **11.6 Run all tests and regenerate the receipt.** Future checkpoint message: `feat(vt-sim): add scoped operating-characteristic decisions`.

## Task 12: Implement the 64-case leakage and capability-negative suite

**Files:**

- Populate: `tools/voice-tone-simulator/tests/fixtures/leakage-matrix.jsonl`
- Create: `tools/voice-tone-simulator/tests/test_leakage.py`
- Extend: `tools/voice-tone-simulator/tests/test_cli.py`
- Extend: `tools/voice-tone-simulator/tests/test_manifest.py`

- [ ] **12.1 Write one failing test per frozen leakage case.** Bind eligible universe, injected transform, expected reason and expected terminal status.

- [ ] **12.2 Add capability negatives.** Attempt a URL, socket import, browser token, external model key, environment path override, symlink escape, output file, arbitrary manifest root, plugin, dynamic import, runtime subprocess and full-grid command.

- [ ] **12.3 Run and confirm the unimplemented guard failures.**

```bash
$PYTHON -m unittest tests.test_leakage tests.test_cli tests.test_manifest -v
```

- [ ] **12.4 Implement only the missing fail-closed guards.** Do not add a general policy engine or new capability abstraction.

- [ ] **12.5 Assert all 64 cases are enumerated exactly once and every prohibited capability exits before source or scenario processing.**

- [ ] **12.6 Run the complete suite and regenerate the receipt.** Future checkpoint message: `test(vt-sim): enforce leakage and capability boundaries`.

## Task 13: Implement deterministic reporting, bounded runner, and independent verification

**Files:**

- Create: `tools/voice-tone-simulator/src/vt_simulator/report.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/runner.py`
- Create: `tools/voice-tone-simulator/src/vt_simulator/verify.py`
- Create: `tools/voice-tone-simulator/tests/test_report.py`
- Extend: `tools/voice-tone-simulator/tests/test_cli.py`
- Create: `tools/voice-tone-simulator/tests/test_end_to_end.py`

**Interfaces:**

```python
def run_conformance(envelope: ConformanceEnvelope) -> Iterator[StrictRecord]: ...
def render_jsonl(records: Iterable[StrictRecord], sink: BinaryIO) -> None: ...
def verify_stream(source: BinaryIO, protocol: ValidatedProtocol) -> VerificationRecord: ...
```

- [ ] **13.1 Write failing stdout-only tests.** Capture stdout/stderr and a clean temporary filesystem. Assert canonical JSON Lines, stable record order, no payload on stderr, no created output/cache/log files and exact exit codes.

- [ ] **13.2 Write failing command tests.** `validate-protocol`, `verify-prng` and `verify-grid` return their exact records. `conformance` accepts one allowlisted full scenario ID and `1..1000` replicates; zero, `1001`, a prefix, unknown ID, multiple IDs and all-scenario requests fail.

- [ ] **13.3 Write an independent verifier disagreement test.** Corrupt one source digest, scenario membership, stream count, status union, denominator, metric value or record hash and assert a precise failure.

- [ ] **13.4 Implement runner/report with no result-store abstraction.** Stream records as they are finalized; keep summaries derivable from records.

- [ ] **13.5 Implement `verify.py` and complete `verify_snapshot.py` without importing primary grid/process/analysis/decision/report code.**

- [ ] **13.6 Run the same bounded case twice and require byte-identical stdout.** Pipe it to `vt-sim verify-records -` and the standalone verifier.

- [ ] **13.7 Run all tests and regenerate the receipt.** Future checkpoint message: `feat(vt-sim): add bounded runner and independent verifier`.

## Task 14: Perform clean-room candidate verification and prepare the review packet

**Files:**

- Update: `tools/voice-tone-simulator/README.md`
- Create after authorized verification: `research/09-experimental/voice-tone-offline-simulator-candidate-verification-record.md`
- Create after authorized verification: `tools/voice-tone-simulator/implementation-manifest.json`
- Regenerate: `tools/voice-tone-simulator/package-inventory.sha256`

The dated verification record does not exist during planning. Its creation requires the implementation/test authorization to permit that exact evidence output.

- [ ] **14.1 Build from only the approved local dependency artifacts in a clean environment with network disabled.** Record interpreter, OS/architecture, dependency files/hashes/licenses, source inventory hash and build command.

- [ ] **14.2 Run the complete suite twice.** Require identical test counts, statuses and golden outputs.

```bash
$PYTHON -m unittest discover -s tests -p 'test_*.py' -v
$PYTHON -m unittest discover -s tests -p 'test_*.py' -v
```

- [ ] **14.3 Run the five allowed CLI surfaces.** Use one predeclared conformance scenario and `1,000` replicates. Do not run the full scenario grid.

```bash
$PYTHON -m vt_simulator.cli --version
$PYTHON -m vt_simulator.cli validate-protocol
$PYTHON -m vt_simulator.cli verify-prng
$PYTHON -m vt_simulator.cli verify-grid
$PYTHON -m vt_simulator.cli conformance --scenario-id SIM-99174ca8571c01f2deca --replicates 1000 \
  | $PYTHON -m vt_simulator.cli verify-records -
```

The bounded test authorization must name the protocol baseline scenario `SIM-99174ca8571c01f2deca`; otherwise the conformance command must not run.

- [ ] **14.4 Run residual and capability checks.** Confirm no network connection, browser process, credential read, undeclared source read or persistent result file occurred.

- [ ] **14.5 Independently recompute the package inventory, protocol/source hashes, grid sets, PRNG samples, record references, status unions and bounded output hashes.** The reviewer must not rely on the engine summary.

- [ ] **14.6 Write the hash-bound verification record.** Record every failure and limitation, including the fixed-target interval gap. Do not call the candidate approved, validated, calibrated or P4-06c-complete.

- [ ] **14.7 Obtain independent implementation and statistical/method reviews on the exact hashes.** A blocking finding returns to the earliest affected task.

- [ ] **14.8 Stop.** The next possible artifact is a separate full-run authorization request. Do not add or invoke a full-run command under this plan.

## Plan-wide acceptance matrix

| Requirement | Primary proof | Independent proof |
| --- | --- | --- |
| Paper-source integrity | Raw-byte source gate tests | Recomputed nine-file hashes |
| Lossless protocol projection | Manifest/schema tests | Clause-to-field review |
| Scenario population | Primary grid tests | Separate oracle set equality |
| Randomness | Philox/stream tests | Frozen and sampled vector recomputation |
| Generator behavior | Unit and target tests | Bounded record-level review |
| Numerical behavior | Hand vectors and failure tests | Method-code review and independent spot calculations |
| Null/failure semantics | Complete table-driven cases | Cross-record verifier |
| Leakage/capabilities | 64 cases plus path/import negatives | Static import and runtime boundary review |
| Determinism | Two byte-identical runs | Independent digest comparison |
| Persistence boundary | Clean filesystem and stdout tests | Residual inspection |
| Interpretation boundary | Prohibited-output tests | Human review of exact report bytes |

## Stop and escalation rules

Stop the task immediately when:

- a required source hash differs;
- the protocol projection conflicts with paper wording;
- a dependency or runtime artifact is missing, unpinned or has an unexpected hash;
- primary and independent grid results differ;
- a PRNG or stream vector differs;
- a numeric method needs an unfrozen assumption or tolerance;
- an unsupported/undefined state cannot be represented without coercion;
- a test requires browser, network, model, real data or persistent output;
- a result could be misread as construct, pilot, product or approval evidence; or
- implementation scope would need to expand beyond the exact package manifest.

The resolution is a versioned contract/review change, not a runtime fallback.

## Handoff after plan approval

The safest execution order is sequential Tasks 1 through 14 with review at Tasks 3, 5, 9, 13 and 14. Because modules share strict identity, status and stream contracts, parallel coding should begin only after Task 4 locks the protocol and record shapes. The full simulation remains outside this plan.
