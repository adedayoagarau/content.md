---
title: B0 desktop-study preflight
status: working-note
observed: 2026-08-17
observation_id: DS-2026-08-17-B0-PREFLIGHT-01
operator: root
access_mode: local-desktop-environment-reconnaissance
b0_task_state: not-started
reconnaissance_disposition: nonconforming-do-not-score
protocol_conformance: nonconforming-environment-reconnaissance
---

# B0 desktop-study preflight

## Result

The conforming B0 product study did **not** start. An environment-reconnaissance activity reached a signed-out incognito window but could not establish a stable, privacy-safe capture environment. The activity did not carry the protocol's exact SEC-P0-G/runtime and SEC-P0-B/external-research results and task grants, so it is explicitly nonconforming and is not assigned a B0 terminal task state. This record is operational evidence about the research environment, not evidence about any tested product's capability or quality. It is excluded from product comparisons and benchmark denominators.

## Declared boundary

- Protocol: [Product desktop study protocol](../product-desktop-study-protocol.md#first-batch-script-protocol-defined-execution-gated)
- Intended task: B0 public-surface and access reconnaissance
- Activity actually performed: local browser inspection and public-page navigation for environment diagnosis. This was not an authorized B0 operation and must not be reused as protocol evidence.
- Authorization disposition: the conforming B0 operation was not issued. Its first authorization check would deny execution because the exact current SEC-P0-G and SEC-P0-B result/grant bindings were absent.
- Prohibited and not performed: login, account creation, installation, download, upload, form submission, token or credential entry, connector authorization, payment, product mutation, or publication
- Persistence boundary: no raw screenshot, accessibility tree, local profile path, bookmark name, credential, or private browser data was written to the research corpus

## Direct desktop observations

1. Google Chrome was already running in a managed personal profile. That profile did not satisfy the protocol's dedicated signed-out-profile requirement.
2. A new incognito window opened successfully and showed no signed-in product account. Chrome still displayed the managed browser's bookmark bar, including private bookmark labels. Those labels are intentionally not reproduced here.
3. Browser version was directly observed as Google Chrome `151.0.7922.72` (Official Build, arm64) on macOS `26.6` build `25G72`. Local profile-path and variation details were visible but are intentionally omitted.
4. `https://developer.dittowords.com/introduction` rendered once in the incognito window. The visible page documented Ditto's product-text, API, CLI, MCP, Ditto Specs CLI, webhook, PR-review, componentization, localization, and distribution surfaces. These are vendor-documented claims only; this preflight did not exercise them.
5. Direct navigation to `https://developer.dittowords.com/agent-setup-package/overview` produced a page title and final URL but a blank rendered body and no usable page-content accessibility tree. Reloading did not recover the body.
6. Returning to the introduction route subsequently produced the same blank-body condition. The earlier successful render therefore cannot establish a repeatable desktop-capture condition.
7. Safari was running without an operable window. Computer Use returned `noWindowsAvailable`; opening a new Safari window through the available action path did not succeed.

## Evidence handling

The Computer Use state exposed browser chrome and private bookmark labels alongside the public page. Raw states and screenshots were inspected transiently to diagnose the environment but were not copied into this repository. This note contains only the minimum public product observations and non-sensitive environment facts needed to explain the block.

## Disposition

- B0 task state: `not-started`; no B0 terminal state is assigned to this nonconforming reconnaissance
- Authorization result: denied/not issued because the required composite operation envelope did not exist
- Environment finding: a conforming run would stop as `blocked-access` because no dedicated privacy-safe profile was available
- Reconnaissance disposition: `nonconforming-do-not-score`
- Product-capability inference: prohibited
- Product-quality score: not produced
- Claim-verification status: not started
- Cleanup observed: the incognito research window was closed. No form, account, download, upload, product mutation, screenshot, accessibility tree, profile path, or private bookmark label was persisted in this repository.
- Cleanup limitation: no protocol-governed runtime-retention or telemetry record existed for this nonconforming activity, so deletion from tool/provider runtime systems is not claimed or independently verified.

## Required next condition

Run B0 only from a dedicated local browser profile or other isolated browser window that:

1. contains no personal account, tabs, bookmarks, history, or extensions that can enter captures;
2. renders every allowlisted route reproducibly from two clean starts;
3. permits sanitized accessibility or screenshot evidence without collecting unrelated private data; and
4. carries the protocol's exact runtime, external-read, and separately governed evidence-append records.

Creating a persistent local Chrome research profile or changing browser privacy settings is outside this preflight's existing authorization and requires an explicit user decision at action time.
