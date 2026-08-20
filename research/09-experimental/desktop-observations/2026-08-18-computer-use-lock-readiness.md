---
title: Computer Use lock-state readiness check
status: working-note
observed: 2026-08-18
observation_id: DS-2026-08-18-COMPUTER-LOCK-01
operator: root
access_mode: local-desktop-readiness-check
b0_task_state: not-started
disposition: blocked-before-app-enumeration-nonconforming-do-not-score
---

# Computer Use lock-state readiness check

## Result

The conforming B0 product study did **not** start. During the active `@Computer` research task, the operator invoked the Computer Use app-list readiness check. The tool returned: “The Mac is locked and automatic unlock could not unlock it. Ask the user to unlock the Mac manually before continuing.”

The check stopped before application enumeration. It opened no browser surface, navigated to no page, inspected no product, captured no screenshot or accessibility tree, and persisted no desktop-derived evidence. This record is operational evidence about current desktop availability only. It is excluded from product comparison, judge inputs, benchmark denominators, and claims about any browser or product.

## Authorization and conformance boundary

- Requested activity: determine whether a candidate isolation rehearsal could begin through Computer Use.
- Activity completed: lock-state readiness check only.
- Conforming B0 state: `not-started`.
- B0 terminal state: none; this was not a B0 operation.
- SEC-P0-G, SEC-P0-B, and SEC-P0-C results or grants: none issued or inferred.
- Browser-profile candidate: not selected or inspected.
- External navigation, account access, credentials, installation, download, upload, form submission, product mutation, or publication: none.
- Persistence: this bounded textual record only; no raw desktop state was retained.

User authorization to use Computer Use does not manufacture the protocol's independent implementation evidence, phase-gate results, task grants, persistence decision, or evidence sink. Unlocking the Mac is necessary for another readiness check but is not sufficient for a conforming B0 run.

## Next admissible desktop step

After the user manually unlocks the Mac, select exactly one candidate from the [browser-isolation approval packet](../desktop-research-browser-isolation-options-2026-08-17.md#action-time-approval-packet) and run only its non-navigating blank/start-state rehearsal. The rehearsal must stop if it exposes unrelated data, selects the wrong window, encounters an unexpected permission or managed restriction, or cannot prove candidate-specific cleanup. A successful rehearsal still does not authorize B0; it supplies evidence for a later, versioned B0 environment and control decision.

