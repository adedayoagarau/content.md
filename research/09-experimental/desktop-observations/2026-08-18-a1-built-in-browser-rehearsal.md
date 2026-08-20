---
title: A1 built-in Browser non-navigating rehearsal
status: working-note
observed: 2026-08-18
observation_id: DS-2026-08-18-A1-01
operator: root
access_mode: local-desktop-non-navigating-rehearsal
candidate: A1-chatgpt-desktop-built-in-browser
a1_state: blocked-access
b0_task_state: not-started
disposition: blocked-before-window-inspection-conforming-stop
---

# A1 built-in Browser non-navigating rehearsal

## Result

**[Documented practice]** The user explicitly selected `A1` and confirmed that the Mac was unlocked. Computer Use successfully enumerated applications, establishing that the lock-state blocker recorded in [DS-2026-08-18-COMPUTER-LOCK-01](2026-08-18-computer-use-lock-readiness.md) had cleared for this attempt.

The selected candidate could not be inspected. Computer Use rejected the ChatGPT/Codex desktop application as a prohibited target for safety, and no separately targetable application named `Browser` was available. The rehearsal therefore stopped as `blocked-access` before opening or reading a window.

No fallback candidate was attempted. In particular, this operation did not inspect or control Chrome, Safari, or any other application.

## Evidence and limits

| Field | Recorded value |
| --- | --- |
| User-selected candidate | `A1` — ChatGPT desktop built-in Browser |
| Desktop availability | Unlocked; application enumeration succeeded |
| Candidate target result | ChatGPT/Codex target rejected by the Computer Use safety boundary |
| Separate Browser target | Not available to Computer Use |
| Window or start-state inspection | Not performed |
| Accessibility-tree capture | None |
| Screenshot capture | None retained or emitted |
| External navigation or network request | None initiated |
| Browser setting or permission change | None |
| Account, credential, history, import, or private-data access | None |
| Download, upload, form, clipboard, extension, Developer mode, or CDP action | None |
| Cleanup | No candidate surface opened and no study data created; no cleanup action required |
| A1 disposition | `blocked-access` |
| B0 disposition | Remains `not-started`; no terminal B0 task state |

This record is operational evidence about candidate controllability only. It is excluded from product evidence, comparison, judge inputs, benchmark denominators, browser-privacy claims, and any claim that the built-in Browser is empty, isolated, resettable, or safe for B0.

## Control boundary

The user's A1 selection authorized only the non-navigating rehearsal described in the [action-time approval packet](../desktop-research-browser-isolation-options-2026-08-17.md#action-time-approval-packet). It did not authorize automatic fallback to `A2` or `A3`, external navigation, B0, persistent capture, settings changes, or creation of a browser profile.

No SEC-P0-G, SEC-P0-B, or SEC-P0-C result or task grant was issued or inferred. No connection-authorization, data-processing, durable-memory, telemetry, or persistence record was created by this attempt.

## Next admissible decision

**[Open question]** A future A1 attempt requires a Computer Use capability that can target the built-in Browser without targeting the prohibited ChatGPT/Codex application or exposing unrelated application state.

**[Proposal]** If that capability remains unavailable, select and separately authorize exactly one fallback from the approval packet. Do not fall through automatically. `A2` would be a Chrome Guest blank/start-state rehearsal only and would still not authorize B0.
