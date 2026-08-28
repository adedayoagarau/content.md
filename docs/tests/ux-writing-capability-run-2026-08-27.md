# UX-writing capability run — 2026-08-27

Runtime: bundled Node 24

Build: passed

Test target: built `contentmd` CLI against a disposable copy of `fixtures/synthetic-web-app`

## Results

| Case | Expected capability | Result | Evidence |
|---|---|---|---|
| TC-UXW-001 | Reject unconditional retry when payment outcome is unknown | PASS | Found `uxw.recovery.safe-retry`; required an unknown-state message and verification path before retry |
| TC-UXW-002 | Preserve a material subscription choice | PASS | Found `uxw.agency.material-choice`; required renewal facts plus understandable refusal or exit |
| TC-UXW-003 | Disclose an automated assistant's identity and limits | PASS | Found `uxw.system.identity-clear`; required automation, limits, evidence boundary, and human handoff |
| TC-UXW-004 | Accept an evidenced, semantically faithful confirmation | PASS | Hard and advisory planes passed; no findings or repair brief |

Totals: 4 passed, 0 failed, 0 skipped.

Every result retained `authority_effect: "none"`. Findings cases produced deterministic repair briefs and did not edit product source. The positive control returned `completed`, `bounded_approval`, and no repair brief.

## Interpretation

The current UX-writing capability can evaluate declared facts against hard and advisory rules, distinguish unsafe copy from a supported expression, explain consequences, and create a bounded repair brief. It does not yet generate a replacement expression from that repair brief in the regular-user CLI. Product facts are currently supplied through a structured review request rather than elicited conversationally.

This is capability evidence for deterministic review, not proof of broad UX-writing quality. Future scenario coverage should add form labels and validation, navigation consistency, accessibility names, localization/RTL review, destructive actions, permissions, empty states, onboarding, notifications, and candidate-generation evaluation.
