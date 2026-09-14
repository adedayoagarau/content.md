# Open-source release candidate 0.1 verification

Status: `verified_local_release_candidate`; not published.

This record covers the repository-native `contentmd@0.1.0` CLI and local
workbench as verified on 2026-09-14 under Node `24.14.0` on `darwin` / `arm64`.
Compatible-runtime packaging was also replayed under Node `24.19.0`.
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
  creation, and the loopback-only independent-review workbench.
- Research candidates and the public-product corpus are excluded from the npm
  tarball and remain separately governed evidence assets.

## Verification evidence

| Gate | Outcome |
| --- | --- |
| Development runtime | Exact Node `24.14.0`, V8 `13.6.233.17-node.41`, ICU `78.2`, Unicode `17.0`; passed |
| Foundation verifier | 1,118/1,118 checks passed with pnpm `11.9.0` and an offline clean install |
| Governed learning verifier | passed; all three generators reproduced current fixtures; official attempt not started |
| Affected Task 4 complement | 613/613 tests passed across retrieval, features, and deterministic baseline |
| TypeScript project build | passed |
| Learning complement | 19 files; 1,470 tests passed |
| Non-learning complement | 28 files; 1,280 tests passed |
| Heavy learning workflows | pairwise replay, sealed evaluation, ranking, drift, binding, shadow, snapshot transfer, CLI lifecycle, and Task 6 golden replay passed in isolated exact-runtime runs |
| Shadow fault isolation | main file 6/6 passed; terminal fault file 1/1 passed |
| Distribution journey | passed from the packed tarball |
| Release dry-run | passed; no publish effect |
| Publish workflow supply chain | immutable action revisions and mandatory foundation/learning gates verified |
| Generated README parity | passed |
| Git whitespace check | passed |

The suites were partitioned after a monolithic run exposed test-only retention
of two complete sealed replay graphs. The terminal-fault scenario was moved to
its own worker, and redundant aliases were released before the independently
verified evaluation boundary. No behavioral assertion was removed. This is a
test-isolation correction, not a larger heap substituted for correctness.

## Packed artifact

The distribution journey verified `contentmd@0.1.0` with these observed values:

```text
tarball bytes: 2137514
unpacked bytes: 13097829
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
creation, and review-workbench rendering with generator labels absent.

The release dry-run admitted exactly:

```text
LICENSE
README.md
dist/contentmd.cjs
package.json
```

The package declares Node `>=24.14.0 <25`, public npm access, and repository
`git+https://github.com/adedayoagarau/content.md.git`. The expected source tag is
`v0.1.0`.

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
pnpm test:distribution
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

1. Review and commit the intended release-candidate worktree without absorbing
   unrelated local research files.
2. Create and inspect tag `v0.1.0` from that reviewed commit.
3. Perform the first authenticated npm publish with explicit publisher
   authority, then verify package provenance and bind trusted publishing.
4. Continue public-corpus observation as a separate governed workstream; do not
   treat candidate volume as product or model-readiness evidence.
