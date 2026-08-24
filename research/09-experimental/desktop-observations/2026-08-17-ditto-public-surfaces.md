---
title: Ditto public-surface desktop observation
status: working-note
observed: 2026-08-17
observation_id: DS-2026-08-17-DITTO-01
product: Ditto
access_mode: public-read-only-desktop
operator: root
protocol_conformance: nonconforming-legacy-pilot
---

# Ditto public-surface desktop observation

## Evidence boundary

This record describes what was directly visible through the macOS Chrome interface on 17 August 2026. It is not evidence that the documented agent, MCP, CLI, audit, synchronization, or write behavior works as claimed. No account was created, no connector was authorized, no package was installed, no token was supplied, and no repository was changed.

This observation predates the experimental desktop protocol and does not conform to its comparative-run controls: the browser was shared and active, there was no dedicated profile, no persisted capture/hash, no recorded `verify.runtime` SEC-P0-G result or exact runtime-verification grant, and no recorded `research.external` SEC-P0-B result or exact public-research grant. It is retained as legacy pilot evidence for method design only. It is excluded from B0 and every comparative denominator and must be recollected under the current protocol before reuse.

The browser was operated through the Computer Use accessibility interface. The user was concurrently using Chrome, so the study stopped rather than competing for focus. No screenshot artifact was persisted in this batch; the observed accessibility tree, URLs, and task trace are summarized below.

## Surfaces opened

1. [Ditto Agent Setup Package overview](https://developer.dittowords.com/agent-setup-package/overview)
2. [Public `dittowords/ditto-agent-setup` repository](https://github.com/dittowords/ditto-agent-setup)

## Task trace

| Step | Intended task | Observed result | Evidence class |
| --- | --- | --- | --- |
| 1 | Open the agent-setup overview in a new browser tab | Page loaded without authentication and exposed navigation, setup instructions, skills, MCP links, and Ditto Specs links | Direct desktop observation of public documentation |
| 2 | Identify the package's declared components | The page visibly listed a preconfigured Ditto MCP server, always-on instructions, and named review/audit/spec skills | Desktop observation of a vendor-documentation source; any capability proposition remains a separate sourced-fact claim |
| 3 | Identify installation and authorization boundaries | Claude Code instructions visibly required plugin installation, restart, MCP approval, and authentication; Cursor instructions required plugin addition and MCP authentication | Desktop observation of a vendor-documentation source; any setup proposition remains a separate sourced-fact claim |
| 4 | Identify repository-local artifacts | The optional Specs section visibly named `*.ditto.md`, `dittospec.config.json`, and `workspace.ditto.md` and said the setup skill installs the Specs CLI when missing | Desktop observation of vendor-documented mutation behavior; behavior not executed |
| 5 | Open the linked public package repository | GitHub loaded without sign-in and exposed the main branch, file tree, README, commit history summary, and repository metadata | Direct desktop observation of public repository UI |
| 6 | Inspect current public maturity signals | GitHub visibly showed 58 commits, no published releases, zero stars, zero forks, two contributors, and a latest visible commit dated 10 August 2026 | Mutable public UI observation; must be rechecked before reuse |
| 7 | Identify the Specs credential boundary | The README visibly stated that the Specs CLI reads a Ditto API token and directs the user to create one under Developers > API Keys | Desktop observation of a vendor-documentation source; credential behavior not exercised |

## Vendor-documented mechanics observed

The public setup documentation named these skills:

- `/ditto-review` for current-diff strings;
- `/ditto-audit [path]` for path-scoped strings;
- `/ditto-spec-audit [component]` for instances of a specced component;
- `/ditto-spec-component <component>` for creating or updating component specs; and
- `/ditto-spec-gaps [component]` for proposing missing rules.

The page described review and audit results as fix-lists. The repository README described an example containing inconsistent casing, `Log in` versus `sign in`, and emphatic error copy. These are vendor-authored examples and promises, not independently measured behavior.

## Access and material dependencies

| Dependency | Why it is needed | Current status | Next evidence action |
| --- | --- | --- | --- |
| Disposable fixture repository | Prevents a third-party setup from touching a real product | Not yet built | Create an instrumented inherited-product fixture with seeded strings, states, and expected inventory |
| Ditto account/workspace | Required to observe platform rules, reuse, review, and decision behavior | Not supplied | Ask the user only when the public/read-only and fixture stages are ready |
| MCP authorization | Creates persistent connector access and is required for a true agent run | Not authorized | Define exact scopes, data boundary, disconnect path, and observation plan before requesting authorization |
| Ditto API token | Public README says Specs CLI reads it directly | Not supplied | Use only in a disposable environment after a credential-handling plan and user authorization |
| Plan/entitlement information | Needed to know whether Agent Setup, Specs, API, exports, and governance are available | Unknown | Capture from account or official pricing/plan material without inferring availability |
| Dedicated browser window/profile | Needed for uninterrupted reproducible desktop runs and clean screenshots | Not available in this batch | Use a dedicated research browser/profile or schedule a window where the active user session will not be displaced |

## What this observation can and cannot support

### Supported

- Ditto publicly documents a combined agent package rather than only a copy library.
- The documented package spans MCP, always-on instructions, task skills, repository-local spec artifacts, and authenticated platform access.
- A meaningful benchmark must test instruction loading, extraction, rule lookup, proposed changes, platform writes, repository writes, credential use, and uninstall separately.

### Not supported

- Extraction recall or precision.
- Quality or completeness of its content judgments.
- Whether every named command works in Claude Code, Claude Desktop, or Cursor.
- The actual connector scopes, retained data, network calls, failure behavior, rollback, or uninstall cleanliness.
- Whether a proposed style rule is created autonomously, requires approval, or becomes enforceable under all conditions.
- Comparative superiority or product-market differentiation.

## Next desktop test

First recollect Ditto's public surfaces as a conforming B0 run under the current dual `verify.runtime`/`research.external` controls, dedicated-profile, linked-record, capture, and audit-chain contract. Only after B0 closes and every B1 entry gate passes should the public example and shared controlled journey fixture run through Ditto. B1 additionally requires the disposable repository/workspace, credential plan, exact user authorizations, environment/effect capture, and cleanup path; it must preserve a screen/action trace and separately score discovery, grounding, content judgment, mutation scope, decision-state handling, and recovery.
