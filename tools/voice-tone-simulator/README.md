# Voice and tone offline simulator candidate

This directory contains the bounded implementation candidate for the
`VT-MSP/design-0.1` synthetic measurement protocol.

Current scope is deliberately narrow:

- offline and single-process;
- validation and bounded one-scenario conformance only;
- canonical JSON Lines on standard output;
- no browser, network, model, account, credential, production data, participant
  data, persistent result store, telemetry, plugin, or full-grid command; and
- no claim of construct validity, calibration, product quality, approval, or
  completion of `P4-06c`.

The normative implementation design and sequence are:

- `research/09-experimental/voice-tone-offline-simulator-implementation-specification-2026-08-19.md`
- `research/09-experimental/voice-tone-offline-simulator-implementation-plan-2026-08-19.md`

The package is not a released simulator. Its bounded command is a synthetic
candidate self-test only. Dependency acquisition/build packaging, persistent
results, and a full simulation remain separately gated.

Implemented offline checks:

- `validate-protocol` verifies the content-addressed root manifest, four
  protocol profiles, 14 schema references, and all nine frozen paper sources;
- `verify-prng` reproduces the exact Philox coordinate, key, counter, output,
  and fingerprint vector;
- `verify-grid` compares the primary and independent expansions of all 33,012
  arm rows and 32,858 unique scenario identities; and
- the leakage module evaluates all 64 frozen split-overlap/label-leakage cases
  and rejects every injected case before generation or fitting.

The internal candidate library additionally implements and tests:

- the exact deterministic `G-NONE` baseline schedule (120 assignments for the
  `C10`/`CARD4`/`R3` baseline), exact/near/aliased side allocation, balanced or
  aliased order, split identities, and selection independence;
- all 1,032 finite-population draw slots, target-specific fixed/redrawn
  component selection, and the `D0`/`D1`/`D2` crossed-effect scales;
- sequential nonstart, nonlock, procedural-abstention, and invalidation risk
  sets with the frozen intercept solver and reason bins;
- separate raw `LEFT`/`RIGHT` response generation and post-lock canonical
  `A`/`B` mapping, with all nondecisive categories retained; and
- all four ordinal generators, raw-to-candidate band mapping, AS241 inverse
  normal, Wilson score intervals, and Hyndman–Fan type-7 quantiles; and
- observed-graph guards that distinguish scheduled connectivity from actual
  directed strong connectivity, recurrence, undefeated/winless entities, and
  whether an ordinary Bradley–Terry fit may even be attempted; and
- one exact in-memory baseline replicate assembly joining the 120-assignment
  deterministic schedule, frozen/redrawn finite-effect blocks, all reserved
  process/outcome/ordinal/evidence stream draws, sequential terminal states,
  raw display outcomes, post-lock canonical mappings, and ordinal bands. Its
  replicate-1 snapshot is frozen as a test vector; it writes nothing and is not
  yet exposed as a conformance command; and
- the separate Arm-F calibration-case path: exact 96-unit public-test cycling,
  `N100` through `N5000` case identities, deterministic inverse-beta oracle
  probabilities, all seven `K0`–`K6` prediction transforms, sealed truth,
  explicit prediction-before-event ordinals, MCAR prediction absence, and the
  K6 informative-missingness intercept solve. This is synthetic generator
  evidence only; calibration estimators and claims remain unavailable; and
- exact G0–G6 graph identity schedules, including the 44-vertex current-dyad
  negative control and all six recurring-treatment topologies; deterministic
  family/split/session/side assignments; the G1–G5 decisive-mass transform that
  cannot generate a reverse fixture arc; and an observed-outcome adapter that
  derives graph diagnostics only from valid submitted mappings. Scheduled
  connectivity is never treated as observed connectivity; and
- the exact Arm-K paired counterfactual generator: each 120-assignment ordinary
  schedule becomes 120 consecutive BASE/CF pairs and 240 member records;
  pair-level nonstart is shared while later process slots remain independent;
  BASE consumes only ordinary outcome/band streams and CF consumes exactly its
  three reserved counterfactual draws. `CF0`–`CF3` implement the frozen latent
  transforms, `CF4` rejects before generation while still consuming the full
  reservation, and the four mutually exclusive paired-denominator states stay
  explicit. The CF0 replicate-1 snapshot is frozen as a second test vector.
- closed-form category, nominal/ordinal reliability, calibration, selective-risk,
  and paired-counterfactual summaries with explicit denominators and null states;
- guard-first binary, calibration, side/order, Bradley–Terry, proportional-odds,
  and adjacent-category fits using the frozen binary64 Newton/QR contracts;
- target-aware interval dispatch, exact type-7 percentile and cluster-resampling
  primitives, the deliberately mismatched naive-Wald control, and preservation of
  the unmodeled fixed-message/fixed-panel interval gap;
- all 11 estimand terminal dispositions, arm/method dispatch, evaluation bands,
  bounded operating decisions, and Monte Carlo stopping rules without issuing an
  approval or product claim; and
- a stdout-only bounded runner for the exact baseline scenario and `1..1000`
  replicates. It emits immutable design/scenario/run, assignment, rating, mapping,
  replicate, metric, unsupported-interval, decision, and provenance records. A
  dry pass completes before any record is emitted, and the second deterministic
  pass streams RFC 8785 JSON Lines without a result store.

The primary CLI verifier and the standalone `verify_snapshot.py` independently
check canonical bytes and hashes, exact schema shapes, current implementation and
source locks, contiguous ordinals, reference closure, scenario membership from
the independent grid oracle, raw-to-canonical mappings, replicate and metric
denominators, the frozen replicate-1 vector, the fixed-target interval gap, and
the non-authoritative terminal boundary. The verifier does not import the primary
grid, schedule, generator, analysis, interval, decision, report, or runner code.

This is now an end-to-end **bounded conformance candidate**, not a completed
simulation study or product result. `conformance` accepts only
`SIM-99174ca8571c01f2deca`; `run`, `run-all`, and `full-run` remain prohibited.
The complete 32,858-scenario run, model/product evaluation, persistence, release,
and any P4-06c advancement remain unavailable. The PEP 517 backend also fails
closed until the separately governed `SIM-I1` dependency-artifact gate records
exact local files, hashes, and licenses.

The bounded stream can be verified without writing a result file:

```sh
python -m vt_simulator.cli conformance \
  --scenario-id SIM-99174ca8571c01f2deca --replicates 1 \
  | python -m vt_simulator.cli verify-records -
```
