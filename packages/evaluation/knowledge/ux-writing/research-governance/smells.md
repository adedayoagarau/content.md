# UX-Writing Research and Governance Smells

These smells prompt investigation. They become hard findings only when an approved governance contract makes the condition enforceable.

## RG-S01: Evidence Laundering

**What it is:** A weak source gains apparent authority through repeated summaries or citations.

**Detect:** Book advice becomes “industry standard”; a generated synthesis cites itself; source scope disappears.

**Impact:** Policy, product facts, or rules rest on authority the source never had.

**Repair:** Trace to the original source, restore classification and scope, and obtain controlling evidence.

## RG-S02: Preference Escalation

**What it is:** A style choice is enforced as a truth, safety, or accessibility requirement.

**Detect:** Universal word counts, tone, casing, humor, or reading levels without governing evidence.

**Impact:** Expression preferences can erase material information or exclude valid contexts.

**Repair:** Reclassify as scoped preference or research hypothesis; retain hard-plane precedence.

## RG-S03: Metric Myopia

**What it is:** One convenient metric stands in for the intended outcome.

**Detect:** Click, conversion, retention, satisfaction, or completion reported without countermetrics, segments, or downstream state.

**Impact:** Coercion, errors, regret, exclusion, and transferred operational cost remain invisible.

**Repair:** Define outcome, denominator, window, segments, countermetrics, and decision threshold.

## RG-S04: Method Drift

**What it is:** A method's result is generalized beyond what its design can support.

**Detect:** Interviews used for prevalence, usability tests for production causality, aggregate analytics for comprehension, or preference polls for safety.

**Impact:** The conclusion is stronger than the evidence.

**Repair:** Narrow the claim or add a method capable of testing it.

## RG-S05: Happy-Path Promotion

**What it is:** A rule is approved after only ordinary passing cases.

**Detect:** No adverse, boundary, unknown, conflict, or not-applicable fixtures; no false-positive analysis.

**Impact:** The rule fails silently where consequence is greatest.

**Repair:** Add original adverse fixtures and contradiction review before approval.

## RG-S06: Approval by Osmosis

**What it is:** Use, merge, silence, popularity, or model output is treated as formal approval.

**Detect:** Missing approver, artifact digest, scope, conditions, date, or authority.

**Impact:** No accountable person accepted the decision or residual risk.

**Repair:** Record an explicit, scoped approval or keep the artifact inactive.

## RG-S07: Mutable Release

**What it is:** A released rule changes without a new version or digest.

**Detect:** Same identifier produces different results; fixtures and migration are absent.

**Impact:** Reviews cannot be replayed and prior decisions lose meaning.

**Repair:** Restore immutable release, create a successor version, and document migration and rollback.

## RG-S08: Zombie Rule

**What it is:** A rule remains active after its source, product state, or authority expires.

**Detect:** Missing review date, dead owner, stale dependency, unexplained runtime drift, or ignored adverse findings.

**Impact:** Deterministic execution reproduces obsolete decisions reliably.

**Repair:** Suspend, review, replace, or retire; preserve affected releases and remediation.

## RG-S09: Aggregate Camouflage

**What it is:** Healthy totals conceal harm to a smaller or low-frequency population.

**Detect:** No locale, disability, channel, risk, or affected-party segmentation; only average task success.

**Impact:** High-consequence exclusion is treated as statistical noise.

**Repair:** Predefine meaningful segments and examine adverse outcomes without unsafe deanonymization.

## RG-S10: Reviewer Monoculture

**What it is:** Authors approve their own rule without required domain, affected-population, implementation, or independent evaluation perspectives.

**Detect:** One role owns evidence, rule, test, approval, release, and audit with no conflict record.

**Impact:** Assumptions and incentives survive every gate.

**Repair:** Apply approved separation of duties and document unavoidable conflicts.

## RG-S11: Training Creep

**What it is:** Operational content or research data silently becomes model training, retrieval, examples, or preference data.

**Detect:** “Accepted” equals “safe to learn”; missing dataset digest, purpose, rights, consent basis, deletion, or nonuse behavior.

**Impact:** Data is reused outside its governed context and errors become self-reinforcing.

**Repair:** Block use pending a distinct training-governance decision and immutable dataset approval.

## RG-S12: Audit Narrative

**What it is:** A prose explanation exists, but exact inputs, rules, versions, evidence, and outcomes cannot be reconstructed.

**Detect:** No canonical digest, rule order, reason codes, or evaluator version.

**Impact:** The decision cannot be independently reproduced or challenged.

**Repair:** Store structured lineage and replay metadata alongside rationale.

## Quick Detection Table

| Signal | Investigate |
|---|---|
| “Best practice says” | Evidence laundering |
| Conversion rose, no countermetrics | Metric myopia |
| Same rule ID, changed result | Mutable release |
| No expiry or current owner | Zombie rule |
| Accepted copy enters training | Training creep |
| Explanation but no digests | Audit narrative |

## Lineage

Derived from lifecycle, evidence classification, hard-before-soft ordering, competency/method mapping, research criteria, gaps, and promotion boundaries in the cross-book synthesis. Proposal-only; no runtime authority.
