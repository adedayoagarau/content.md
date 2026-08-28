# TC-UXW-003 — Generated assistant identity

Priority: Critical (P0)

Design ref: `docs/superpowers/plans/2026-08-27-contentmd-regular-user-productization.md`, Phase 7

## Preconditions

- [ ] The workspace build passes.
- [ ] A disposable project directory exists.

## Steps

1. Run `contentmd review --ux-context docs/tests/fixtures/ux-writing-scenarios/assistant-identity.json --root <project> --json`.
2. Inspect the returned report and repair brief.

## Checkpoints

1. Status is `findings_present`.
2. Findings include `uxw.system.identity-clear`.
3. The repair brief requires identity, limits, evidence boundary, and handoff.
4. `authority_effect` remains `none`.

## Cleanup

Remove the disposable project directory.
