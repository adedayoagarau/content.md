# Public interface contract

Status: release candidate 0.1; not yet published.

## Supported interface

The supported public interface is the `contentmd` command-line executable in the
`contentmd` npm package. The workspace packages under `packages/` are private
implementation modules: their TypeScript exports are not a stable public SDK and
are not included in the npm tarball.

Running `contentmd` without arguments is equivalent to a compact, preview-only
`contentmd scan --summary` in the current repository.

The regular-user path is:

1. `contentmd` or `contentmd scan --summary` — inspect qualified content without writing.
2. `contentmd scan --inspect <number>` — inspect one source-bound finding.
3. `contentmd scan --improve <number>` — list missing facts and acceptance criteria.
4. `contentmd scan --improve <number> --context <file> --candidate <text> --preview-patch --json` — preview an exact change.
5. Repeat the command with `--apply-patch <transaction-digest> --yes` — apply only the reviewed transaction.
6. `contentmd undo --transaction <transaction-digest> --root <path> --yes --json` — restore captured prior bytes.

`contentmd init`, `bridge`, `doctor`, `discover`, `model`, `task`, and `serve`
form the advanced local adoption and workbench surface. Other commands shown by
`contentmd --help` are available development interfaces but are not yet promised
as stable automation APIs for 0.1.

### Historical content-design diagnostic workflow

`contentmd benchmark content-design` includes a blinded 100-scenario packet and
supports seven bounded operations:

- create-only extraction of the bundled packet with `--sample-out`, without requiring a repository checkout;
- default prediction with optional `--out`;
- independent response-template creation with `--review-template`;
- create-only, non-authoritative steward handoff with `--reviewer-id` and
  `--qualification-request-out`;
- a loopback-only one-scenario-at-a-time review desk with `--review-workbench`;
- completed-review qualification with `--submission` and `--gold-out`;
- independent-review calibration with `--gold`, `--compare-gold`, and
  `--report-out`;
- scoring with `--gold`, `--predictions`, and `--report-out`.

The packet is a reproducibility fixture from the historical locale-bearing
10,000-scenario matrix. That matrix was exposed to external models and is not
the current formal English-only calibration or held-out benchmark. The command
therefore demonstrates evaluator and reviewer-workflow mechanics only. A
reviewer must judge the supplied English expression without using target locale,
translation status, direction, or presumed in-market adequacy. Outputs cannot
establish current content-design effectiveness.

The bundled packet contains no hidden generator labels, and `--sample-out` is a
standalone operation. All output paths are create-only. Predictions remain
unscored until qualified gold exists. Qualification requires complete
independent review, a strict RFC 3339 review timestamp, and a current governed
reviewer-qualification bundle whose replay binds the reviewer, content-design
role, benchmark-review objective, and exact packet scope. A role string and
self-attestation alone fail closed. Qualified output remains benchmark-only,
with retrieval and training eligibility set to `never`.
The public CLI does not self-issue reviewer qualifications. Issuance belongs to
an external program steward and requires a current policy, capability grant,
human approval, control evidence, and an authorization replay bound to the
exact packet scope.
Calibration requires two valid gold sets for the exact same packet and rejects
reviewer reuse, record drift, mismatched coverage, or digest-invalid files. It reports
disposition and hard-dimension agreement, quality-score distance, per-ability
agreement, and every work unit requiring adjudication without replacing either
review.
Scoring reports exact disposition agreement, hard-dimension accuracy, and
quality-score error overall and by ability, risk, surface, historical
target-locale metadata, intended voice, and situational tone. The locale slice
is diagnostic metadata and must not change the English judgment. The report
also includes the complete disposition confusion
matrix, critical false acceptance, abstention and escalation recall, and
positive-case false rejection. None of these operations grants content
approval, benchmark claims, release, publication, or product authority.

The JSON contracts exposed by this command are:

- blinded review packet `contentmd.content-design-blind-review-packet/0.2.0`;
- prediction set `contentmd.content-design-predictions/0.3.0`, produced by
  evaluator `contentmd.deterministic-content-design-baseline/0.3.0` and carrying
  self-reported score coverage for every quality dimension plus pass, fail,
  unknown, and not-applicable distributions for every hard dimension;
- review submission and qualified gold set `0.2.0`;
- reviewer qualification request
  `contentmd.content-design-reviewer-qualification-request/0.1.0`;
- calibration report `contentmd.content-design-calibration-report/0.2.0`, with
  agreement and disagreement diagnostics by hard and quality dimension;
- evaluation report `contentmd.content-design-evaluation-report/0.5.0`, including
  explicit gold, prediction, comparable-score, and prediction-coverage counts
  overall, within every contextual slice, and by quality dimension so an
  evaluator cannot improve apparent error by omitting difficult judgments. It
  also reports decisive-gold, predicted, comparable, coverage, and accuracy
  counts separately for every hard dimension.

### Repository-only evaluation fixtures

The source repository additionally commits a historical 500-item calibration
cohort and a disjoint 500-item reservation. They are reproducible with
`pnpm prepare:content-design-calibration` and
`pnpm reserve:content-design-evaluation`. The reservation contains only scenario
IDs, digests, and sampling coordinates; it is not a reviewer packet. The full
source matrix was subsequently exposed to external models, so neither artifact
is a current formal calibration set or held-out effectiveness test despite its
retained historical state labels.

These commands, files, and their internal module exports are contributor
interfaces, not stable `contentmd@0.1.0` npm APIs. Neither cohort contains human
gold, and neither may enter retrieval or training. The remaining 9,000 scenarios
provide historical matrix coverage rather than automatic evaluation evidence.
A future formal benchmark must use newly authored English-only calibration and
held-out cases frozen before review and evaluator improvement.

Packet and output digests are opaque content identities. The CLI independently
checks required context, evidence, rubric, eligibility, state, label-blinding,
and completed-review invariants before evaluation. For scoring and calibration,
it also replays every gold record against the supplied immutable packet, so a
caller-recomputed digest cannot substitute changed scenario context. Qualified
gold is rechecked at score time, including review coverage and exact rubric
dimensions.

These content-addressed checks provide integrity and binding, not reviewer
identity authentication or a digital signature over each judgment. The
governed qualification replay proves internal policy, grant, approval, role,
objective, scope, currency, and revocation consistency. Authenticating the
external reviewer and issuer—and ensuring the submitted judgments are the
reviewer's authentic output—remains the adopting project's responsibility.

## Machine-readable output

Use `--json` where offered. Consumers must inspect `status`, `command_id`, and
the command-specific `data`; they must not infer success solely from process
output text. Current status exit codes are:

- `0` completed
- `10` findings present
- `20` blocked by evidence
- `21` denied by governance
- `22` invalid input
- `23` unsupported capability
- `30` internal failure
- `130` cancelled

Nonzero governance and evidence statuses are expected control outcomes, not
necessarily crashes.

## Compatibility and authority

The package supports Node `>=24.14.0 <25`. Preview commands do not authorize
writes. Model access does not authorize mutation. A local confirmation does not
grant organizational approval, release, or publication authority. Research
records and discovery candidates are not part of the published package or its
runtime API.

Any future JavaScript SDK requires a separately versioned package, documented
exports, compatibility policy, and release tests; internal workspace exports do
not become public merely because they are exported from a source module.
