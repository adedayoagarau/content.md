---
title: A2 Chrome Guest non-navigating rehearsal
status: working-note
observed: 2026-08-19
observation_id: DS-2026-08-19-A2-01
operator: root
access_mode: local-desktop-non-navigating-rehearsal
candidate: A2-chrome-guest
a2_state: blocked-access
start_state_checks: passed-two
cleanup_boundary: failed-closed-on-profile-picker
revised_cycle_1: failed-wrong-window-targeting
targeting_boundary: app-target-not-guest-window-specific
user_followup: do-not-retry-move-on
b0_task_state: not-started
disposition: blocked-wrong-window-and-cleanup-boundaries
---

# A2 Chrome Guest non-navigating rehearsal

## Result

**[Documented practice]** The user confirmed that a Chrome Guest window was open and that every personal Chrome window was closed. Computer Use inspected two separately user-prepared Guest starts. Both inspections showed a single Chrome Guest `New Tab` window at `chrome://newtab/`, the visible statement `You're browsing as a Guest`, and no external website, personal tab, bookmark, history entry, or signed-in product surface.

The start-state portion passed twice. The full A2 rehearsal did **not** pass: closing each Guest window returned Chrome to its profile picker. After the first exit, the Computer Use state exposed local profile labels. Those labels are intentionally not reproduced or persisted here. The operator stopped without selecting, opening, editing, or otherwise inspecting a profile. For the second exit, the check emitted only the fact that the profile picker appeared; it did not emit the picker contents.

The defensible A2 disposition is therefore `blocked-access`: Chrome Guest can begin cleanly, but the observed exit path crosses a personal-profile surface and app-level Computer Use targeting does not reliably select the Guest window when another Chrome window exists. B0 remains `not-started`.

### Revised detach-before-close attempt

**[Documented practice]** A later attempt used the revised procedure. The user stated that the Guest window was open but did not freshly state that every personal Chrome window remained closed. The operator incorrectly treated the earlier confirmation as still current and requested Chrome state. Computer Use attached to a non-Guest managed Chrome window containing unrelated private work content rather than the Guest window.

The operator stopped immediately. No click, navigation, text entry, scroll, capture emission, profile action, or browser change occurred. No page title, URL, content, profile label, screenshot, or raw accessibility state from that window is reproduced or persisted in this research corpus. This failed attempt establishes that the app-level Chrome target is not a Guest-window selector and that the fresh no-personal-window precondition cannot be inferred from an earlier confirmation.

## User disposition

**[User-provided evidence]** On 19 August 2026, after the wrong-window stop, the user chose to move on rather than retry A2. This closes the current Chrome Guest branch as `do-not-retry` and moves the program to offline/synthetic work. It does not authorize A3, the in-app Browser, another desktop/browser action, B0, or any fallback access path. B0 remains `not-started`.

## Evidence and limits

| Field | Recorded value |
| --- | --- |
| User-selected candidate | `A2` — Chrome Guest |
| User preparation | User confirmed Guest mode and closure of personal Chrome windows before the first check; user separately opened the second Guest start |
| Start-state count | Two separately prepared starts |
| Start-state result | Both passed: Chrome Guest, `chrome://newtab/`, no external route loaded |
| Computer Use targeting | Guest was selected in the two original checks; the revised attempt attached to a non-Guest Chrome window. App-level Chrome targeting is not window-specific |
| Browser-management indicator | `Managed by paypal.com` was visible; no policy surface was opened and no policy, telemetry, or background-traffic conclusion is made |
| External navigation or search | None |
| Account, credential, history, bookmark, form, or product access | None intentionally opened or inspected |
| Download, upload, extension, Developer mode, CDP, clipboard, or setting action | None |
| First Guest exit | Guest window closed; Chrome returned to the profile picker; local profile labels appeared in the transient Computer Use state; operator stopped |
| Second Guest exit | Guest window closed; a filtered state check confirmed return to the profile picker; no profile content was emitted or selected |
| Revised attempt | Failed before Guest inspection: a fresh no-personal-window confirmation was absent and Computer Use attached to a non-Guest window with unrelated private content; stopped with no UI action |
| Screenshot persistence | No screenshot was emitted or written to the research corpus |
| Accessibility-state persistence | No raw accessibility tree was written to the research corpus; personal profile labels are omitted |
| Local Guest cleanup | Both Guest windows were closed |
| Deletion/retention verification | Not established. No independent proof of cookie/history deletion, platform telemetry disposition, or Computer Use/provider-runtime deletion exists |
| A2 disposition | `blocked-access` at both the window-selection and cleanup/capture boundaries despite two earlier clean Guest start-state checks |
| B0 disposition | Remains `not-started`; no terminal B0 task state |

This record is environment evidence only. It is excluded from product evidence, judge inputs, product comparisons, benchmark denominators, and any claim that Chrome Guest is approved for B0, that managed-browser background traffic is bounded, or that cleanup is independently verified.

## Control boundary

The user's approval covered only the [A2 non-navigating rehearsal](../desktop-research-browser-isolation-options-2026-08-17.md#action-time-approval-packet). It did not authorize an external route, B0, a login, persistent capture, a browser/profile change, an install, or fallback to A3.

No SEC-P0-G, SEC-P0-B, or SEC-P0-C result or task grant was issued or inferred. No connection-authorization, data-processing, durable-memory, telemetry, persistence, or release record was created by this attempt. The managed-browser label is an observed environment fact, not evidence of a suitable policy or grant.

## Next admissible decision

**[Proposal]** Do not retry A2 merely because a Guest window is visible. A future attempt requires an immediate, explicit user confirmation that every personal Chrome window is closed and must still fail closed if the runtime cannot bind to the exact Guest window without first reading another Chrome window. The detach-before-user-close rule remains necessary but is not sufficient. If exact Guest-window selection cannot be proven, choose a separately authorized environment with a uniquely targetable app/process/window and a close path that cannot expose personal profiles.

Even if that boundary is closed, B0 still requires the separate action-time runtime and external-research results/grants, the exact route manifest, capture/redaction/retention controls, an independently governed evidence-append path, and current revocation checks. This rehearsal supplies none of those authorities.
