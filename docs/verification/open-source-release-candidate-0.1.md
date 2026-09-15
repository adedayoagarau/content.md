# Open-source release candidate 0.1 verification

Status: `verified_local_release_candidate`; release tag must be recreated from
the reviewed release commit before publication; not published.

This record covers the repository-native `contentmd@0.1.0` CLI and local
workbench as locally verified on 2026-09-15 under Node `24.14.0` on `darwin` /
`arm64`. The latest source checkpoint directly exercised by the packed journey
and release dry-run is `a3dbcd21697d3218a023bf972f76259a6b0b3647`.
The exhaustive eight-phase learning workflow also passed after eliminating
duplicate construction of the same cryptographically verified replay fixture;
the workflow itself, authority handoffs, replay checks, and assertions remain
complete. The foundation, governed-learning, content-design benchmark,
distribution, security, and release gates had already passed locally against
the same product files before that test-only consolidation. The authored
English challenge verifier is a separate mandatory workflow gate; its
integrity checks pass for the four committed challenge folders, but external
model reviews remain pending and do not establish effectiveness. This record
does not represent the current pull request CI as passed until its complete run
reaches a successful conclusion.
Unrelated dirty public-product research remains outside this verification
scope.
It records a local release candidate, not an npm publication, production
deployment, organizational approval, or claim of general writing effectiveness.

## Demonstrated product surface

- The supported public surface is the dependency-free `contentmd` CLI and its
  loopback-only local workbench. Workspace package exports are private.
- A bare invocation performs a preview-only repository scan.
- The packed regular-user journey covers scan, inspect, improve, exact patch
  preview, digest-bound apply, and undo.
- Local adoption covers preview, explicit digest-bound initialization, doctor,
  and bounded uninstall preview.
- The packed historical content-design diagnostic covers extraction of the
  blinded 100-scenario sample, packet-bound prediction, reviewer-blank template
  creation, a non-authoritative packet-scoped steward handoff, two-reviewer
  comparison with an explicit disagreement queue, and the loopback-only
  independent-review workbench. The exposed locale-bearing packet is not the
  current formal English calibration or held-out benchmark.
- Research candidates and the public-product corpus are excluded from the npm
  tarball and remain separately governed evidence assets.

## Verification evidence

| Gate | Outcome |
| --- | --- |
| Development runtime | Exact Node `24.14.0`, V8 `13.6.233.17-node.41`, ICU `78.2`, Unicode `17.0`; passed |
| Clean committed checkout | commit `5fa0acb`; frozen offline install reused 78/78 packages with zero downloads; source build, 92/92 committed native tests, complete historical 10,000-scenario execution and coverage gates, packed journey including packet-bound scoring and two-reviewer comparison, package security, lint, and foundation verification passed |
| Recovery evaluator checkpoint | commit `4bc2849`; complete 10,000-scenario benchmark, focused agent and CLI tests, reviewer-qualification tests, and TypeScript build passed |
| Current packed checkpoint | commit `a3dbcd2`; four-file tarball journey and exact-commit release dry-run passed under Node `24.14.0` |
| Current foundation checkpoint | current product files; exact Node `24.14.0` and pnpm `11.9.0`; 1,118/1,118 checks passed; frozen offline install reused 78/78 packages with zero downloads |
| Current governed-learning checkpoint | current product files; all three fixture generators reproduced the committed profile, pairwise model, shadow plan, and Task 6 lifecycle; verifier passed with 120 development-fixture preferences, disjoint train/validation/test groups, no shadow influence, no official attempt, and `authority_effect: none`; affected retrieval and feature tests passed 376/376 |
| Foundation verifier | 1,118/1,118 checks passed with pnpm `11.9.0` and an offline clean install |
| Governed learning verifier | passed; all three generators reproduced current fixtures; official attempt not started |
| Affected Task 4 complement | 613/613 tests passed across retrieval, features, and deterministic baseline |
| Current Task 4 resolution witness | root `package.json` digest `0fdacb3da8967997ee2a3b88cea8e93ca5106fffd3fd849c5e421da3e5b0e461`; 139/139 retrieval and 474/474 feature/baseline checks passed after adding the challenge and external-audit operator commands |
| TypeScript project build | passed |
| Learning complement | 19 files; 1,470 tests passed |
| Non-learning complement | 28 files; 1,280 tests passed |
| Heavy learning workflows | pairwise replay, sealed evaluation, ranking, drift, binding, shadow, snapshot transfer, CLI lifecycle, and Task 6 golden replay passed in isolated exact-runtime runs |
| Shadow fault isolation | main file 6/6 passed; terminal fault file 1/1 passed |
| Package security verifier | 27/27 deterministic package, credential-pattern, loopback, origin, request-boundary, CSP, and reporting-policy checks passed |
| Authored English challenges | 4/4 integrity checks passed; all four content.md candidates remain unreviewed and both external reviews remain pending |
| Distribution journey | passed from the packed tarball |
| Release dry-run | passed; no publish effect |
| Publish workflow supply chain | immutable action revisions and mandatory source build, test, lint, foundation, learning, complete content-design benchmark, authored English challenge integrity, distribution, and release-identity gates verified |
| Pull-request verification | least-privilege CI runs the same complete non-publishing gate chain on pull requests and `main` pushes |
| Generated README parity | passed |
| Git whitespace check | passed |

The TypeScript release gate keeps agent, CLI, and learning files in fresh
Vitest processes after a monolithic run exposed test-only retention of complete
sealed replay graphs. Lighter tests share one fresh process per package. The
eight-phase learning journey is additionally isolated from the other tests in
its source file and has a one-hour phase-specific ceiling beneath the workflow
job's independent six-hour ceiling. After duplicate replay-fixture construction
was removed, its observed exact-runtime cost was 21 minutes 18 seconds on
Darwin/arm64. No phase, test, or assertion is removed, and the heap limit
remains unchanged. This is bounded process isolation and a measured
cross-runtime bound, not extra memory substituted for correctness.

## Packed artifact

The distribution journey verified `contentmd@0.1.0` with these observed values:

```text
package content digest: 64d7dc8784a81fa11a4ab446c5a9e28c31aee54355f2ab0ce1cf6b059a7896ac
LICENSE sha256: bed00720d421033f802d0d69ff19987f174ca760c4f072002542bae11c832d7f
README.md sha256: 7e0c6f854f2e660981b2a6c4a1544263bd74c9381750045e3de1e668044ec081
dist/contentmd.cjs sha256: 039d3a8ebf55d6b8e2bd88930764e0eb7eba992628b35d1fc6bdddca5262d75c
package.json sha256: 16d21c2e68e232d069f857c78ff7bb912f9e6fccccc65cb1d639b74cdb3bea17
observed tarball bytes: 2146096
unpacked bytes: 13144839
file count: 4
qualified synthetic content items: 1
blinded content-design sample: 100
content-design packet digest: 7ad0e6b6625861830f532ce87bad57034fabf8b1c6049bbc6182ca6e2f9294f7
doctor after adoption: ready_with_governance_warnings
```

The journey demonstrated a clean installation, installed binary, bare scan,
offline local `npx` scan, packed loopback workbench, qualification sample and
evaluation, regular-user patch apply and undo, fresh digest-bound adoption,
bounded uninstall preview, npm uninstall, source-fixture preservation, and
`authority_effect: none` for scanning. It also demonstrated installed-package
content-design sample extraction, blind prediction, reviewer-blank template
creation, two-reviewer diagnostic comparison, and review-workbench rendering with
generator labels absent. Calibration reports remain non-authorizing and retain
disagreements for adjudication; because the packet is exposed and locale-bearing,
they cannot establish the current English content-design capability.

Before packing, the verifier rebuilt the distribution twice and required
byte-identical SHA-256 values for all four shipped files. The canonical
package-content digest above is the reproducibility identity; compressed
tarball size is observational because gzip container bytes may vary while the
unpacked package remains identical.

The release dry-run admitted exactly:

```text
LICENSE
README.md
dist/contentmd.cjs
package.json
```

The package declares Node `>=24.14.0 <25`, public npm access, and repository
`git+https://github.com/adedayoagarau/content.md.git`. The expected source tag is
`v0.1.0`. The release verifier requires a supplied release tag to resolve to
the exact checked-out commit. The current local `v0.1.0` tag predates the
benchmark hardening work and therefore fails that gate; it must not be moved
without explicit release authority.

## Reproduction

Use the repository-pinned Node and pnpm versions. The commands below are
non-publishing; the release verifier performs an npm dry-run only.

```bash
nvm use
corepack prepare pnpm@11.9.0 --activate
pnpm verify:toolchain
pnpm build
pnpm test
pnpm verify:foundation
pnpm verify:learning
pnpm verify:content-design-benchmark
pnpm verify:content-design-challenges
pnpm test:distribution
pnpm verify:security
pnpm verify:release
git diff --check
```

The deterministic learning suite is intentionally expensive. Run it serially
and do not overlap it with packaging or another learning verifier.

## Authority and evidence boundaries

- The first authenticated npm publish is not performed by local verification.
  It requires a separately authorized publisher and precedes trusted-publisher
  binding.
- The workbench binds only to loopback and does not establish a hosted service.
- Preview, model access, and local confirmation do not grant organizational
  approval, publication, release, or product-policy authority.
- Discovery candidates are not observations. Only directly observed,
  provenance-bound, rights-bounded, approved records may become retrieval,
  ranking, evaluation, or gold-set inputs.
- Fine-tuning is not part of this release candidate. It remains contingent on
  measured evidence that approved retrieval and ranking cannot meet the agreed
  evaluation target.

## Remaining external gates

The latest directly exercised source checkpoint is `a3dbcd2`; this
evidence-only documentation update does not alter the packaged implementation.
Unrelated local public-product research remains outside both commits.
Pull-request verification must still complete for the final documented
candidate. The remaining gates require external authority or evidence:

1. Complete review of the final release commit. With explicit release authority,
   replace the stale local `v0.1.0` candidate tag from that reviewed commit and
   inspect its target before any push.
2. Perform the first authenticated npm publish with explicit publisher
   authority, then verify package provenance and bind trusted publishing.
3. Continue public-corpus observation as a separate governed workstream; do not
   treat candidate volume as product or model-readiness evidence.
4. Complete independent qualified content-design review before making accuracy
   or writing-effectiveness claims from the synthetic benchmark.
