# TC-UXW-004 — Sound confirmation

Priority: High (P1)

Design ref: `docs/superpowers/plans/2026-08-27-contentmd-regular-user-productization.md`, Phase 7

## Preconditions

- [ ] The workspace build passes.
- [ ] A disposable project directory exists.

## Steps

1. Run `contentmd review --ux-context docs/tests/fixtures/ux-writing-scenarios/profile-saved.json --root <project> --json`.
2. Inspect the returned report.

## Checkpoints

1. Status is `completed`.
2. Findings are empty.
3. No repair brief is created.
4. `authority_effect` remains `none`.

## Cleanup

Remove the disposable project directory.
