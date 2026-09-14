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
