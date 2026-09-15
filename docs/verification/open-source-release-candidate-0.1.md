# Open-source release candidate 0.1 verification

Status: `verified_local_release_candidate`; release tag must be recreated from
the reviewed release commit before publication; not published.

This record covers the repository-native `contentmd@0.1.0` CLI and local
workbench as verified on 2026-09-14 under Node `24.14.0` on `darwin` / `arm64`.
Compatible-runtime packaging was also replayed under Node `24.19.0`.
The clean replay source commit is
`5fa0acb4cc0fbbd9707da2a7cdb3c331bcc1cb87`; this record update changes only
the verification documentation, not the packed artifact.
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
- The packed content-design benchmark covers extraction of the blinded
  100-scenario sample, packet-bound prediction, reviewer-blank template
  creation, a non-authoritative packet-scoped steward handoff, two-reviewer
  calibration with an explicit disagreement queue, and the loopback-only
  independent-review workbench.
- Research candidates and the public-product corpus are excluded from the npm
  tarball and remain separately governed evidence assets.

## Verification evidence

| Gate | Outcome |
| --- | --- |
| Development runtime | Exact Node `24.14.0`, V8 `13.6.233.17-node.41`, ICU `78.2`, Unicode `17.0`; passed |
| Clean committed checkout | commit `5fa0acb`; frozen offline install reused 78/78 packages with zero downloads; source build, 92/92 committed native tests, complete 10,000-scenario benchmark with cross-dimensional coverage gates, packed journey including packet-bound scoring and two-reviewer calibration, package security, lint, and foundation verification passed |
| Foundation verifier | 1,118/1,118 checks passed with pnpm `11.9.0` and an offline clean install |
| Governed learning verifier | passed; all three generators reproduced current fixtures; official attempt not started |
| Affected Task 4 complement | 613/613 tests passed across retrieval, features, and deterministic baseline |
| TypeScript project build | passed |
| Learning complement | 19 files; 1,470 tests passed |
| Non-learning complement | 28 files; 1,280 tests passed |
| Heavy learning workflows | pairwise replay, sealed evaluation, ranking, drift, binding, shadow, snapshot transfer, CLI lifecycle, and Task 6 golden replay passed in isolated exact-runtime runs |
| Shadow fault isolation | main file 6/6 passed; terminal fault file 1/1 passed |
| Package security verifier | 27/27 deterministic package, credential-pattern, loopback, origin, request-boundary, CSP, and reporting-policy checks passed |
| Distribution journey | passed from the packed tarball |
| Release dry-run | passed; no publish effect |
| Publish workflow supply chain | immutable action revisions and mandatory source build, test, lint, foundation, learning, complete content-design benchmark, distribution, and release-identity gates verified |
| Pull-request verification | least-privilege CI runs the same complete non-publishing gate chain on pull requests and `main` pushes |
| Generated README parity | passed |
| Git whitespace check | passed |

The TypeScript release gate runs each test file in a fresh Vitest process after
a monolithic run exposed test-only retention of complete sealed replay graphs.
The eight-phase learning journey is additionally isolated from the other tests
in its source file and has a 25-minute ceiling; its observed exact-runtime cost
was 21 minutes 56 seconds. No assertion is removed, and the heap limit remains
unchanged. This is process isolation and a measured timeout, not extra memory
substituted for correctness.

## Packed artifact

The distribution journey verified `contentmd@0.1.0` with these observed values:

```text
tarball bytes: 2145628
unpacked bytes: 13143090
file count: 4
qualified synthetic content items: 1
blinded content-design sample: 100
content-design packet digest: 99810c8924715b8e10aa04e3f49e3e804b59e4154c538f4a2da15c825f4a3d2b
doctor after adoption: ready_with_governance_warnings
```

The journey demonstrated a clean installation, installed binary, bare scan,
offline local `npx` scan, packed loopback workbench, qualification sample and
evaluation, regular-user patch apply and undo, fresh digest-bound adoption,
bounded uninstall preview, npm uninstall, source-fixture preservation, and
`authority_effect: none` for scanning. It also demonstrated installed-package
content-design sample extraction, blind prediction, reviewer-blank template
creation, two-reviewer calibration, and review-workbench rendering with
generator labels absent. Calibration reports remain non-authorizing and retain
disagreements for adjudication.

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

The replayed product and release-candidate files are committed through
`5fa0acb`; unrelated local public-product research remains outside that commit.
The remaining gates require external authority or evidence:

1. With explicit release authority, replace the stale local `v0.1.0` candidate
   tag from that reviewed commit and inspect its target before any push.
2. Perform the first authenticated npm publish with explicit publisher
   authority, then verify package provenance and bind trusted publishing.
3. Continue public-corpus observation as a separate governed workstream; do not
   treat candidate volume as product or model-readiness evidence.
4. Complete independent qualified content-design review before making accuracy
   or writing-effectiveness claims from the synthetic benchmark.
