# Open evaluator development records

These files expose provisional mappings and expected safe dispositions so the research team can inspect the proposed denominator, build future calibration materials, and find contradictions before any licensed fixture or executable harness exists.

They are not sealed gold. They have no independent annotations, adjudication, specialist review, qualified locale judgment, accessibility conformance result, security verification, or human baseline. Because the labels are openly available beside the operator-design records, this directory is permanently ineligible for private-holdout use.

## Files

- [denominator-ledger.json](denominator-ledger.json) preserves the rejected historical target and declares the current open-development counts without claiming a run result.
- [provisional-occurrence-annotations.jsonl](provisional-occurrence-annotations.jsonl) maps 90 candidates to 61 occurrences or 29 exclusions.
- [expression-message-links.jsonl](expression-message-links.jsonl) maps the 61 occurrences through 56 normalized expression slots/versions to 22 semantic messages.
- [expression-denominator-falsification-and-remap.json](expression-denominator-falsification-and-remap.json) records why the design-0.1 target of 34 is rejected, defines the full identity tuple, and crosswalks every old expression ID to the current normalized slot/version IDs.
- [conflicts-and-unknowns.json](conflicts-and-unknowns.json) preserves six conflicts and five unknowns.
- [accessibility-defects.json](accessibility-defects.json) describes six bounded deliberate defects.
- [critical-probes.json](critical-probes.json), [security-probes.json](security-probes.json), and [mutation-probes.json](mutation-probes.json) state expected containment/disposition only.

Every actual result is `null`; run, calibration, annotation, specialist-review, and adjudication statuses remain `not_run`. This remains an iterative, never-frozen design-0.1 open-development pressure test. A separate design-0.2 proposal now exists as `created_proposed_not_approved_not_for_use`; a future reviewed evaluator/release must use its own approved version and retain this exposed draft rather than silently treating it as canonical.
