# npm distribution candidate 0.1

Status: locally packable and clean-install verified; not published.

## Proven boundary

The repository builds a public-package candidate at
`distribution/contentmd`. The package is named `contentmd`, exposes the
`contentmd` binary, requires Node `>=24.14.0 <25`, and bundles the private
workspace packages into one CommonJS executable. Internal workspace packages,
research files, and source trees are not shipped in the tarball.

The verifier runs these operations in a fresh temporary consumer project:

1. Build the executable bundle from the TypeScript CLI entry.
2. Run `npm pack` and inspect the exact package file list.
3. Install the generated tarball without lifecycle scripts.
4. Execute the installed CLI help and confirm the core commands.
5. Run the installed binary with no arguments and confirm the compact, preview-only regular-user scan.
6. Run the locally installed package through `npx --no-install contentmd scan --summary` and verify raw and qualified counts remain separate.
7. Run `contentmd init --json` against a new React/TypeScript fixture.
8. Confirm a digest-bound `ready_for_local_approval` preview is returned with
   the intentional governance exit code 20.
9. Confirm neither scan nor init preview changes the target repository or persists discovery state.
10. Create and evaluate a source-bound qualification-review packet.
11. Extract the bundled blinded 100-scenario content-design packet and verify
    its immutable digest and absence of generator labels.
12. Produce packet-bound unscored predictions and a reviewer-blank response template.
13. Start the packed content-design review workbench and verify its rendered
    review shell and blinded data endpoint.
14. Preview, explicitly apply, readback-verify, undo, and byte-verify one regular-user source change.
15. Uninstall the package and confirm its installed entry is removed.

Run the proof with the supported Node 24 runtime:

```bash
pnpm test:distribution
```

The verifier reports the exact current tarball size and file count on each run;
the package has no runtime package dependencies.

`pnpm verify:release` separately verifies the package identity, exact
`v<version>` tag expectation, supported npm CLI, repository URL, public access,
Node engine, executable, and the exact four-file `npm publish --dry-run`
payload. It never publishes.

## Not yet proven

- npm account ownership and authenticated publication
- a completed registry trusted-publisher binding and registry provenance
- installation through the public `npx contentmd` name
- Windows execution and path behavior
- Node versions outside the declared Node 24 range
- hosted workbench deployment or public connectors
- production authority for mutation, release, or publication

The first complete `pnpm test` release-gate run on 2026-08-27 exposed three
harness/integrity issues rather than a regular-user failure: stale Task 4 raw
digests for the changed root package, lockfile, and TypeScript configuration;
Vitest collecting native `node:test` files as empty suites; and a five-second
timeout that was too short only under full-suite concurrency. The runner now
separates TypeScript suites from native Node-test files and uses a 15-second
Vitest timeout.

Bounded verification on 2026-08-27 proves 111 foundational core/evaluation/
schema tests, 88 adapter/workbench/writer tests, 191 governance/runtime/provider
tests, 91 research tests, and all 69 native tests. Typecheck, lint, all 18 package
boundaries, clean-install distribution testing, and the release dry run pass.
Four live-listener tests skip only when the managed host returns the exact
`listen EPERM` loopback prohibition; they remain mandatory on normal hosts and
CI. The sealed pairwise learning and Task 6 goldens remain bound to the exact
Node 24.14.0/V8/ICU runtime-profile digests, while this host provides Node
24.19.0 and 25.5.0. Those exact-runtime goldens therefore remain unproven here
and the publish workflow must stay fail-closed until CI supplies the sealed
runtime or the governed release profiles are deliberately requalified.

The npm registry returned no public `contentmd` package on 2026-08-27, but name
availability is not reserved until an authenticated publish succeeds.

## Release gate

The repository now includes `.github/workflows/publish-npm.yml`. A published
GitHub release invokes a GitHub-hosted Node 24 job with only `contents: read` and
`id-token: write`, installs pinned pnpm 11.9.0, runs the complete test, lint,
distribution, and release-verification gates, then calls `npm publish` from the
four-file distribution directory. The `npm-production` GitHub environment is
intentional so repository owners can require a human deployment approval.

The first publication is a distinct bootstrap step because npm trusted
publishing is configured from an existing package's settings. For 0.1.0:

1. Confirm `npm view contentmd` still returns 404 immediately before release.
2. Authenticate the owning npm account with current 2FA and explicitly publish
   the verified `distribution/contentmd` package once.
3. In the new npm package settings, configure GitHub Actions trusted publishing
   for repository `adedayoagarau/content.md`, workflow filename
   `publish-npm.yml`, environment `npm-production`, and allow `npm publish`.
4. Protect the GitHub `npm-production` environment and release tags.
5. Use the workflow for subsequent versions; do not add a long-lived npm write
   token. Trusted publishing supplies automatic provenance for a public package
   built from the public repository.

Official references: [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/),
[npm provenance](https://docs.npmjs.com/generating-provenance-statements/), and
[npm publish](https://docs.npmjs.com/commands/npm-publish/).

Publication remains an external, irreversible version allocation: npm does not
permit reusing the same package name/version after publication. It therefore
still requires explicit release authority, current npm authentication for the
bootstrap, passing repository gates, and an exact release tag.
