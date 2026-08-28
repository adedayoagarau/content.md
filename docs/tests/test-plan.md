# content.md manual capability test plan

## Scope

Evaluate the installed CLI's deterministic UX-writing review behavior against realistic product scenarios. These tests validate diagnosis, evidence boundaries, repair-brief generation, and safe abstention. They do not claim model-generated copy quality.

## Environment

- Build from the repository root with `pnpm build` under supported Node 24.
- Execute the built CLI against a disposable copy of `fixtures/synthetic-web-app`.
- Use the scenario requests in `docs/tests/fixtures/ux-writing-scenarios/`.

## Cases

- `TC-UXW-001`: unknown payment outcome with unsafe retry
- `TC-UXW-002`: subscription consent without a material choice
- `TC-UXW-003`: generated assistant with undisclosed identity and limits
- `TC-UXW-004`: evidenced, semantically faithful confirmation

## Acceptance

- P0 cases must identify their expected hard-rule failure and emit a repair brief.
- The passing case must produce no findings and no repair brief.
- Every result must retain `authority_effect: "none"`.
