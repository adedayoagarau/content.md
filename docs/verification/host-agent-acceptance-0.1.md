# Coding-agent host acceptance 0.1

Status: protocol verified; Codex and Claude Code live compatibility not yet
certified.

This gate answers a narrower question than the ordinary package suite:

> Can a real coding-agent host discover and operate the exact packed
> `contentmd` CLI in a clean repository without changing that repository?

The existing unit, integration, distribution, and 10,000-scenario audit tests
do not answer that question. Returned Claude or Cursor review files are model
review evidence, not proof that Claude Code, Cursor, or Codex installed and
invoked the product.

## Acceptance story

The runner builds and packs `contentmd`, installs that tarball without lifecycle
scripts into a new synthetic repository, and prepends an instrumented
`contentmd` shim to the selected host's `PATH`. The shim forwards to the
installed package and records only bounded command evidence. The host must run
exactly these commands, once each and in order:

```bash
contentmd scan --summary --root . --json
contentmd scan --inspect 1 --root . --json
contentmd scan --improve 1 --root . --json
```

The verifier requires all three installed-CLI exits to be zero, their command
IDs to be `scan.summary`, `scan.inspect`, and `scan.improve`, and every command's
write effect to remain `none`. It also requires the host itself to
exit zero and compares canonical SHA-256 snapshots of every synthetic
repository file except `.git`, `node_modules`, and the runner-owned evidence
directory. Any source, lockfile, configuration, or other repository change
fails the run.

The bundle binds:

- the host kind and observed version;
- the retained packed tarball plus its package name, version, byte count, and
  SHA-256 digest;
- the exact prompt and host command;
- host stdout and stderr;
- each observed `contentmd` invocation and normalized result;
- before and after repository manifests;
- every evidence file's byte count and raw-byte digest.

Credentials are inherited by the host CLI and are never copied into the
bundle. The verifier rejects credential-shaped manifest fields, unsafe bypass
flags, missing or reordered commands, transcript changes, digest drift,
non-zero exits, and repository mutation. Passing grants no content, approval,
release, publication, or organizational authority.

## Deterministic release gate

Run the credential-free protocol check:

```bash
pnpm verify:host-agents
```

It reports both hosts as `not_certified_without_verified_live_bundle`. CI and
the npm publication workflow run this check so the protocol, verifier, tests,
and documentation cannot silently disappear. CI deliberately does not log in
to model providers or spend model budget.

## Prepare without contacting a model

Preparation builds the package, makes a clean repository, records the detected
host version, and prints the exact proposed invocation. It exits with the
governance code `20` and makes no model request:

```bash
pnpm acceptance:host-agent -- \
  --host codex \
  --output /absolute/new/path/contentmd-codex-acceptance

pnpm acceptance:host-agent -- \
  --host claude-code \
  --output /absolute/new/path/contentmd-claude-acceptance
```

The output path must not exist and must be outside the content.md source
checkout. This avoids overwriting earlier evidence or dirtying the release
candidate with account-backed run artifacts.

## Explicit live runs

These commands contact the selected provider through the user's existing CLI
authentication and may consume paid usage. Run them only after inspecting the
prepared command and choosing a fresh output path:

```bash
pnpm acceptance:host-agent -- \
  --host codex \
  --output /absolute/new/path/contentmd-codex-live \
  --confirm-live-account-run

pnpm acceptance:host-agent -- \
  --host claude-code \
  --output /absolute/new/path/contentmd-claude-live \
  --max-budget-usd 2 \
  --confirm-live-account-run
```

Codex runs ephemerally with repository-scoped `workspace-write`, user config
and project rules disabled, and JSONL output. Claude Code runs in safe mode,
without session persistence, with only bounded read and shell tooling, and with
the caller-supplied dollar cap. Neither host uses a dangerous permission-bypass
flag. Workspace write access is needed only so the runner-owned shim can append
its invocation log; the before/after check fails if the product repository
changes.

Verify a retained bundle independently:

```bash
pnpm verify:host-agents -- \
  --bundle /absolute/path/to/live-bundle \
  --host codex
```

Review raw host output before committing a bundle. The fixture is synthetic,
but host output can still include local paths or provider metadata.

## Certification matrix

| Host | Local CLI detected while designing protocol | Verified live bundle | Compatibility claim |
| --- | --- | --- | --- |
| Codex | `codex-cli 0.144.6` | None | Not certified |
| Claude Code | `2.1.215` | None | Not certified |

The detected versions establish runner feasibility only. They are not live-run
results and can become stale. A future release record may change a row to
certified only by naming a bundle that passes the independent verifier against
the release tarball.
