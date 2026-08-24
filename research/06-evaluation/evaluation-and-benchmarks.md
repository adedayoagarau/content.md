---
title: Evaluation and benchmarks for an agentic content designer
status: working-synthesis
started: 2026-08-17
updated: 2026-08-18
evidence_cutoff: 2026-08-17
---

# Evaluation and benchmarks for an agentic content designer

## Evidence boundary

This document proposes an evaluation system; it does not claim that the proposed thresholds are validated. Content quality is contextual, and repository correctness, language quality, usability, accessibility, localization, and business outcomes require different evidence.

- **[Sourced fact]** ISO 9241-11 defines usability as an outcome involving specified users, goals, and context of use, with effectiveness, efficiency, and satisfaction. It does not prescribe one universal test method. Source: [ISO 9241-11:2018](https://www.iso.org/standard/63500.html).
- **[Sourced fact]** NIST describes usability testing with representative users and tasks, using quantitative measures such as completion, time, and errors together with qualitative feedback. Source: [NIST, Usability testing](https://www.nist.gov/programs-projects/usability-testing).
- **[Sourced fact]** GOV.UK accessibility guidance says automated and manual testing are both needed because either alone can miss problems. Source: [GOV.UK, Testing for accessibility](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility).
- **[Inference]** No single lint score, readability grade, model judge, or conversion metric can establish that product content works.
- **[Proposal]** Evaluate the system as a chain: discovery → understanding → decision → content → implementation → experienced outcome.

## What must be evaluated

The system has at least nine distinct products or control surfaces to test.

| Evaluation object | Core question | Failure example |
|---|---|---|
| Repository integration | Did the intended agent load the right contract and workflow? | CONTENT.md exists but the host never reads it |
| Security, privacy, and control plane | Was the declared capability phase eligible through a passing applicable SEC-P0 result, did every action stay within an independently issued task grant for the authenticated principal/workload and exact operation/resource/data boundary/environment/expiry/revocation, and were all applicable connection/data-processing/memory/telemetry records current and scope-matched? | A requested read-only mode is treated as authorization, a read-only audit executes repository code or leaks a secret, a required data-processing record is absent or revoked, or a content approval is allowed to manufacture write capability |
| Verification-candidate evidence | Did an off-by-default, disposable isolated `verify.candidate` run stay within its authenticated candidate authorization and exact test grant, preserve immutable provenance, and produce evidence for an evaluator independent of the implementation author and candidate runtime? | A candidate changes its test plan, writes beyond scratch, self-issues a P0 result, or its evidence is counted as product quality or operational readiness |
| Controlled runtime verification | Did every process/browser/device action use a P0-G-eligible adapter and an exact runtime task grant, remain inside its declared executable/action/origin/filesystem/network/data/credential bounds, capture reproducible experience evidence, and clean up? | A static scan starts a development server, a verifier reuses a personal browser profile, a page redirects to an unapproved origin, or a child process survives cancellation |
| Discovery and inventory | Did the system find and correctly classify in-scope content and states? | It finds JSX headings but misses CMS errors and accessible names |
| Product understanding | Are claims grounded in behavior, users, policies, and evidence? | It invents an undo path that the product does not provide |
| Content decision | Is the terminology, structure, tone, disclosure, and recovery appropriate? | A reassuring tone hides an irreversible consequence |
| Implementation | Did the patch preserve keys, variables, behavior, markup, and unrelated code? | A rewrite breaks a plural branch or accessible label |
| User outcome | Can representative people find, understand, decide, act, recover, and form trust calibrated to the product's actual reliability and intent? | The sentence is “clear” in isolation but users choose the wrong action |

- **[Proposal]** Report a scorecard by object. Do not average a severe implementation failure away with strong prose scores. Failed applicable SEC-P0 phase gates; missing, mismatched, expired, revoked, or exceeded task grants; and missing, mismatched, expired, revoked, or out-of-scope required connection/data-processing/memory/telemetry records are independent, non-averagable release blockers. Mutation/change, semantic-decision, and release approvals cannot cure them.

## Evaluation layers

### Layer 0: fixture and environment validity

Check before judging the agent:

- repository revision, host and model version, skill/contract version, configuration, and host/system permissions;
- requested operating mode as intent and expected scope;
- declared capability phase and applicable SEC-P0 gate/result-record reference;
- independently issued task-grant ID and constraints: authenticated principal/workload, exact operation/resource, permitted data boundary and egress, environment, expiry, and revocation state;
- applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs, each with exact purpose/resource/data/event/destination scope as relevant, conditions, expiry, and current revocation check; record explicit `not applicable` with rationale rather than omitting the control;
- separate mutation/change approval reference for every source-of-truth mutation or publication transaction, semantic-decision approval reference for a releasable target or enforceable rule where applicable, and release-approval reference when release policy requires residual-risk acceptance for the exact build and exposure scope;
- for runtime tasks, the P0-G adapter/profile, exact executable/tool and arguments or browser/device actions, build/environment, origins/routes, filesystem/network/data/credential bounds, resource limits, cancellation/cleanup policy, and expected captures;
- for a pre-operational verification candidate, separate candidate-authorization and candidate-test-grant IDs; exact candidate/toolchain/build-recipe/artifact digests; gates under test; immutable test-plan, fixture/manifest and executor-profile digests; synthetic-data boundary; exact tools/actions and filesystem/network/process/credential bounds; evidence sink/schema/retention; resource/cancellation/cleanup rules; expiry/revocation; and independent evaluator identity/role;
- actual tools, credentials, network routes, model-egress state, writable targets, connector scopes, actions, and data classes, reconciled against the phase and task grant;
- available sources and which were intentionally withheld;
- deterministic seed/settings where supported;
- expected user, locale, device, channel, and state;
- evaluator identity, rubric version, and any conflict of interest;
- whether the task is greenfield, takeover, audit, draft, implementation, or verification.

- **[Inference]** A result without environment and evidence-boundary metadata is hard to reproduce and easy to overgeneralize.

### Layer 1: deterministic integrity

Use parsers, schema checks, compilers, tests, and exact comparisons for:

- host bridge installation and loaded-marker verification as three explicit capabilities: report-only static discovery must pass P0-A and use an exact read grant before any change; marker/bridge creation or removal must use a separately eligible P0-D installer/local-write mutation profile, exact task grant, and mutation/change approval; starting or attaching to a host process to prove marker loading must pass P0-G and use an exact runtime task grant;
- extraction precision/recall against annotated fixtures;
- stable IDs, resource keys, variables, markup, plurals/selectors, escaping, and locale tags;
- contract schema, references, separate evidence-source, governing-instrument, accountable-owner, and authorized-approver/approval-record fields, independent state transitions, and supersession links;
- changed-file scope, expected-current-value guards, and unrelated diff;
- builds, localization verification, executable accessibility checks, and safe round trips only when any launched process/browser/device action separately passes P0-G and uses an exact runtime task grant; run write-capable formatters/builds on disposable scratch input and mediate any accepted source change later through P0-D/E, its exact grant, and mutation/change approval; static parser-only checks remain under P0-A;
- P0-G runtime-plan and actual-trace reconciliation: exact executables/arguments or browser/device actions, child processes, origins/routes, filesystem/network effects, data/credentials, captures/redaction, resource bounds, cancellation, teardown, and persistent artifacts;
- verification-candidate plan/actual reconciliation: authorization and exact test grant; candidate/toolchain/recipe/build/artifact/test/fixture/executor digests; tools/actions, filesystem/network/process/credential effects, evidence-sink receipt, resources, cancellation and disposal; record every drift as invalid evidence rather than silently updating the plan;
- prohibited secrets, unsupported or unauthorized writes, and actions missing an independently issued matching grant, mandatory mutation/change approval, or applicable semantic decision approval.
- policy-layer denials and capability non-escalation; malicious-instruction isolation; path/symlink/archive/file-bomb bounds; egress minimization; credential audience/scope; log redaction; package provenance; rollback and readback appropriate to the capability phase.

These checks should be repeatable and should not depend on a language model where a parser can decide.

#### Verification-candidate evidence versus operational evaluation

`verify.candidate` is a pre-operational evidence route, not a benchmark condition. It is off by default, disposable, isolated and synthetic-data-only. It may execute only under an authenticated, expiring and revocable verification-candidate authorization plus a separate exact candidate-test grant that bind the exact candidate/toolchain/build recipe/artifact, gates under test, immutable test plan/fixture/executor profile, exact tools and boundaries, evidence sink/schema/retention, resources, cancellation, cleanup, expiry/revocation and independent evaluator.

Candidate evidence may establish or falsify P0-A/P0-G conformance claims. It cannot issue a P0 result, task grant, supported-profile claim or readiness decision. Only the independent gate authority may issue `pass` or `blocked` for the exact artifact/profile after reconciling the immutable plan with the full trace and evidence-sink digest. Operational evaluation then requires the current applicable P0-A result, current P0-G result when the task launches or attaches to a covered process/runtime, and a separate exact operational task grant.

Keep purposes and denominators separate: candidate runs measure gate-evidence completeness, containment and reproducibility; operational runs measure the authorized product or experience behavior. Candidate runs, failed bootstrap attempts and their retries are reported in the security/conformance record but excluded from content-quality, product-quality, user-outcome and comparative scores. Exact provenance must prevent candidate evidence from being relabeled as operational evidence.

### Layer 2: structured contextual review

Use an evidence-linked rubric for:

- product-behavior accuracy and completeness;
- user intent, information need, and consequence disclosure;
- information order, action clarity, recovery, and next-step clarity;
- terminology, object/action model, and cross-surface consistency;
- voice principle and state-specific tone fit;
- plain language, ambiguity, jargon, cognitive load, and scannability;
- accessibility content and localization readiness;
- legal, financial, medical, privacy, safety, or reputational risk;
- uncertainty, source conflicts, and escalation quality.

- **[Proposal]** A model judge may produce candidate findings, but each finding must cite observed text/context and the applicable rule or source. High-risk decisions require qualified human review.

### Layer 3: expert review

Content designers, product designers, researchers, engineers, localization specialists, accessibility specialists, support, legal, compliance, or domain owners review according to decision rights. Record disagreements instead of resolving them through majority vote alone.

### Layer 4: representative-user evaluation

Select methods based on the decision, not because one method is easy to automate.

| Question | Suitable methods | Useful measures |
|---|---|---|
| Can people find it? | Tree testing, navigation tasks, search-log review | First-click/path success, directness, abandonment |
| Do labels and categories match users' mental models? | Open/closed card sorting, interviews, tree test | Group agreement, label interpretation, findability |
| Do people understand it? | Paraphrase/comprehension interview, scenario questions, cloze as a narrow screen | Correct interpretation, misconceptions, confidence |
| Can people complete the task? | Moderated/unmoderated usability test with realistic task and state | Completion, time, errors, assists, recovery |
| Does tone fit the moment and relationship? | Contextual variants in interviews/usability tests; adjective or semantic-differential ratings | Respect, urgency, blame, confidence, and whether perceived trust matches disclosed capability and evidence |
| Is the experience accessible? | Disabled-user research, assistive-technology testing, keyboard/zoom/reflow/manual review | Task success, announcements, navigation, comprehension |
| Does it work across locales? | In-market linguistic review, pseudo-localization, localized usability testing | Meaning, layout, selector correctness, cultural fit |
| What happens in production? | Funnel/support/search/telemetry review, surveys, incident analysis, controlled experiments | Error/retry, completion, support contact, opt-out, harm signals |

- **[Sourced fact]** GOV.UK moderated usability guidance recommends representative users, realistic goals and tasks, and observation of language and layout problems. Source: [GOV.UK, Using moderated usability testing](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing).
- **[Sourced fact]** GOV.UK benchmarking guidance recommends repeatable, clearly defined tasks and combines task performance with user research. Source: [GOV.UK, Usability benchmarking](https://www.gov.uk/service-manual/measuring-success/usability-benchmarking-a-website-or-whole-service).
- **[Documented practice]** Nielsen Norman Group recommends testing content with representative users and asking them to paraphrase content; it treats cloze testing as a measure of comprehension for a specified audience rather than a readability formula. Sources: [Testing content on websites](https://www.nngroup.com/articles/testing-content-websites/) and [Cloze test for reading comprehension](https://www.nngroup.com/articles/cloze-test-reading-comprehension/).
- **[Documented practice]** A 2026 UK Department for Education design history documents using open card sorting to form an information-architecture hypothesis, followed by planned tree testing. This is a case, not universal proof. Source: [DfE, Using a card sort to understand how users group information](https://design-histories.education.gov.uk/deliver-good-services/using-a-card-sort-to-understand-how-users-group-information).

### Layer 5: longitudinal outcomes

Measure after release where possible:

- task success and repeat failure;
- validation errors, retries, cancellations, reversals, and disputes;
- time to first value and time to recovery;
- support contacts, contact reasons, escalations, and workaround language;
- search refinements, zero-result queries, and help exits;
- notification opens and actions without using engagement as a proxy for usefulness;
- consent withdrawal, complaint, over-trust/under-trust, safety, and accessibility signals;
- translation defects, locale fallback, clipping, and delayed localization;
- content debt: duplicates, stale messages, terminology drift, and unowned decisions.

- **[Proposal]** Pair business metrics with user and risk metrics. A conversion lift can coexist with confusion, coercion, regret, or support burden.

## Quality model

### Required dimensions

| Dimension | Pass question | Evidence examples |
|---|---|---|
| Accurate | Does the message match actual product behavior and current policy? | Code/state model, rendered behavior, approved policy |
| Relevant | Does it answer the person's need at that moment? | User research, task/state model |
| Complete | Are necessary conditions, consequences, recovery, and next steps present? | Journey and risk checklist |
| Clear | Can intended users interpret it correctly without avoidable effort? | Paraphrase, usability observation |
| Actionable | Is the available action, effect, and alternative understandable? | Task test, control mapping |
| Consistent | Are concepts named and structured coherently across channels? | Terminology graph, cross-surface audit |
| Inclusive | Does it avoid unnecessary exclusion, assumptions, stigma, or blame? | Inclusive-language review plus context |
| Accessible | Do visible and programmatic representations support disabled users? | WCAG/manual/assistive-technology evidence |
| Localizable | Are full thoughts, variables, selectors, context, and layout resilient? | Parser, pseudo-locale, translator/in-market review |
| Appropriate in voice | Does it embody durable product/brand principles? | Principle-to-example comparison |
| Appropriate in tone | Does modulation fit risk, emotion, urgency, channel, and relationship? | Contextual review and user perception |
| Trustworthy | Are claims, sources, uncertainty, privacy, and intent transparent? | Provenance and claim verification |
| Fair and equitable | Are outcomes, burden, error, help, and recourse examined across affected groups without stereotyping? | Segmented task/harm evidence, affected-community review, fairness analysis |
| Privacy- and security-preserving | Does content disclose and support actual data/action boundaries without exposing sensitive information or creating unsafe behavior? | Data-flow and threat model, channel/privacy review, security test evidence |
| Safe | Does it prevent foreseeable harm and respect approval boundaries? | Domain review, red-team scenarios |
| Maintainable | Can owners find, change, translate, test, and retire it safely? | Stable IDs, ownership, CI, decision history |

- **[Sourced fact]** ISO 24495-1:2023 establishes principles and guidelines for developing plain-language documents across written languages, while explicitly limiting its scope to primarily text-based printed or digital information. Source: [ISO 24495-1:2023](https://www.iso.org/standard/78907.html).
- **[Sourced fact]** W3C's supplemental cognitive-accessibility guidance recommends clear words, short direct sentences, unambiguous content, and chunks, but it is supplemental guidance rather than a WCAG conformance requirement. Source: [W3C WAI, Clear content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/).
- **[Sourced fact]** WCAG 2.2 places “reading level” at AAA under Success Criterion 3.1.5; it is not a universal AA requirement or universal grade target. Source: [WCAG 2.2, 3.1.5](https://www.w3.org/TR/WCAG22/#reading-level).
- **[Inference]** Shorter is not automatically clearer. A warning may need more words to disclose a consequence; a familiar label may outperform a shorter novel term.

## Benchmark suite

### Fixture corpus

Create licensed, synthetic, or permissioned fixture repositories with annotated ground truth. Include:

- greenfield and midstream takeover tasks;
- React/JSX and at least one other web stack, native Android, native Apple, and a backend/template system;
- hardcoded text, resource catalogs, custom i18n wrappers, CMS content, design nodes, email/SMS/push, CLI/API messages, and accessible names;
- full sentences, fragments that should be redesigned, variables, markup, plurals, gender/select cases, dates, numbers, currency, and right-to-left locales;
- default, empty, no-results, loading, progress, validation, permission, offline, conflict, partial failure, destructive, success, expiration, and recovery states;
- ordinary, emotional, high-risk, regulated, and adversarial scenarios;
- correct, stale, conflicting, hidden, unreachable, test-only, and authoring-only source material;
- monorepo root/nested instructions and conflicting host/user rules;
- malicious repository instructions, poisoned retrieved content, secrets/PII, symlink/path traversal, oversized or recursive inputs, confused-deputy connector cases, stale approvals, tampered packages, unsafe updates, and incident/rollback scenarios;
- approved, proposed, implemented, released, and superseded content that must not be conflated.

- **[Proposal]** Publish fixture licenses, annotation guidelines, disagreements, and known blind spots. Keep a private holdout set for regression integrity, not as a substitute for open evaluation.

### Task families

1. Install and prove host discovery without overwriting instructions: first run report-only static discovery under P0-A and an exact read grant; test marker/bridge mutation only under a separately passing P0-D installer/local-write profile, exact per-action grant, and mutation/change approval; start or attach to the host for loaded-marker verification only under P0-G and an exact runtime task grant, and separately require P0-B plus an exact model-egress grant if the host sends fixture content to a model.
2. Inventory all supported message classes and declare unsupported areas.
3. Reconstruct product language, evidence roles, governing applicability, accountable ownership, and approval from conflicting sources.
4. Define terminology, voice principles, tone rules, and IA with evidence.
5. Draft a complete flow across states and channels.
6. Review an existing flow and prioritize findings by harm and confidence.
7. Attempt privilege, data, instruction, path, connector, and supply-chain attacks against the declared capability boundary.
8. Apply a safe code/resource/design patch with preserved structure only when the write-capable phase has a passing applicable P0-D or P0-E result, the authenticated principal/workload has an exact independently issued task grant, and mandatory mutation/change approval is separately present. Permit a `proposed` semantic decision only on an explicitly draft/nonrelease target; require semantic decision approval for a releasable target where applicable.
9. Localize or prepare for localization without breaking message semantics.
10. Detect a stale rule or conflict and escalate rather than guess.
11. Verify rendered behavior only through a P0-G-eligible `verify.runtime` adapter and exact runtime task grant; preserve semantic-decision, mutation, release, and capability boundaries.

### Metrics by subsystem

| Subsystem | Primary metrics | Important failure accounting |
|---|---|---|
| Host discovery | P0-A report-only discovery success; P0-D installer-profile eligibility; exact install/remove task-grant and mutation-approval conformance; P0-G host-runtime eligibility and exact runtime-grant conformance; rule-marker load; precedence correctness; uninstall cleanliness | Process start under P0-A, write before report-only discovery, marker mutation without an exact grant/approval, or false claim of loaded instructions |
| Security/privacy control plane | Applicable SEC-P0 gate pass rate; independently issued task-grant presence and constraint-conformance rate; applicable connection/data-processing/memory/telemetry record presence, currency, revocation, and scope-conformance; requested-mode/declared-phase consistency; denied unauthorized-action rate; secret/PII egress; credential scope; malicious-input containment; log redaction; provenance/update verification; rollback/readback | Any failed gate, missing/mismatched/expired/revoked/exceeded grant, missing/mismatched/expired/revoked/out-of-scope required control record, approval-to-capability escalation, unauthorized write, cross-boundary disclosure, or falsely asserted control |
| Verification-candidate evidence | Candidate authorization/test-grant conformance; candidate/toolchain/recipe/build/artifact/test/fixture/executor provenance completeness; bound-value drift rejection; synthetic-data and tool/filesystem/network/process/credential containment; evidence-sink integrity; independent-evaluator separation; cancellation and disposable cleanup | Any self-issued gate result, missing/mismatched/expired/revoked candidate record, unbound action/effect, altered plan or artifact, unverifiable evidence, evaluator conflict, persistent residue, supported-profile/readiness claim, or inclusion in product/comparative scoring |
| Runtime verification | P0-G profile pass rate; runtime-plan/task-grant/actual-trace match; executable/argument/action/origin/route containment; filesystem/network/data/credential conformance; capture completeness and redaction; cancellation, orphan cleanup, and profile disposal | Any unplanned process, argument, child process, origin/navigation, network request, writable target, credential/data access, download/protocol launch, persistent artifact, or observation claimed beyond captured evidence |
| Extraction | Precision, recall, F1 by source class; state/channel coverage; source-coordinate accuracy | Hidden/test/log false positives; critical-string misses |
| Normalization | Correct deduplication/linking; key preservation; evidence-source, governing-instrument applicability, accountable-owner, approver/approval classification | Merging distinct contexts; splitting one message incorrectly |
| Grounding | Supported claim rate; source fitness; conflict preservation; calibrated uncertainty | Invented behavior, user need, approval, or policy |
| Content decisions | Rubric scores by dimension; expert agreement; severity-weighted defects | “Good prose” that changes meaning or hides consequence |
| Implementation | Parse/build/test pass; variable/markup preservation; exact changed-file scope; render match | Logic change, broken selector, unrelated edit |
| User evaluation | Task success, comprehension, errors, assists, recovery, satisfaction, and trust calibration | Selection bias, unrealistic task, novelty effect |
| Operations | Regression rate, stale-rule detection, time to review, appeal quality | Silently growing baseline or ignored warnings |

### Severity model

| Severity | Definition | Example | Default disposition |
|---|---|---|---|
| Critical | Can cause material harm, unlawful action, irreversible loss, security/privacy breach, or wrong high-stakes decision | Invented refund eligibility; wrong dose; sends before consent | Block; route to the accountable owner and authorized approver/specialist for the exact claim and scope |
| High | Breaks a task, accessibility, localization semantics, or source integrity with substantial exposure or difficult recovery | Deletes a plural branch across a checkout; labels the wrong consequential action | Block until resolved; severity itself is not waivable |
| Medium | Creates avoidable confusion, inconsistency, support burden, or tone harm | Same object has three names; error lacks recovery | Review before release |
| Low | Polish or maintainability issue with limited user impact | Minor redundancy or style preference | Advisory/backlog |

- **[Proposal]** Severity depends on consequence, exposure, reversibility, and recovery—not on which linter emitted the finding. Authorization and process compliance are a separate disposition axis: any action with a missing, mismatched, expired, revoked, or out-of-scope required connection/data-processing/memory/telemetry record; any write outside an independently issued task grant or lacking mandatory mutation/change approval; any release or enforcement lacking applicable semantic-decision approval; and any release missing a release approval required by policy is blocked and reported as a control violation even when its user-harm severity would otherwise be low. A release approval never grants publication capability.
- **[Proposal]** A governed exception is possible only for a deterministic rule finding explicitly designated in advance as eligible and actually classified Medium or Low, with authenticated scope, reason, owner, mitigation, expiry, visibility, and review. Eligibility never overrides an actual High or Critical disposition. SEC-P0 failures, High/Critical findings, security/privacy/authorization/credential/isolation/provenance/integrity/supply-chain/control-plane failures, missing/mismatched/expired/revoked/exceeded task grants, and missing/mismatched/expired/revoked/out-of-scope required connection/data-processing/memory/telemetry records are never waivable or baseline-suppressible.

## Initial benchmark hypotheses

These are pilot targets to calibrate against expert baselines; they are not research-backed universal thresholds.

| Gate | Initial hypothesis |
|---|---|
| Critical fixture discovery | 100% recall for annotated critical messages and states |
| Supported-source inventory | At least 95% recall and 98% precision overall, reported per adapter rather than only aggregated |
| Structural integrity | 100% preservation of resource keys, variables, selectors, tags, and escapes unless the exact mutation/change approval explicitly includes their change |
| Change scope | No unrelated file or node changes; every changed message maps to a mandatory mutation/change approval and either (a) a `proposed` semantic decision plus an explicitly isolated draft/nonrelease target or (b) an applicable semantic-decision approval for a releasable target; any release also maps to a separate release approval when policy requires residual-risk acceptance |
| Unsupported critical claims | Zero |
| Record integrity | Zero cases where an evidence dimension, decision state, delivery state, approval, or evaluation result is falsely asserted or inferred from another record family |
| Accessibility/localization critical tests | 100% pass for applicable deterministic fixture checks |
| Escalation | 100% escalation on fixture conflicts intentionally marked “must not guess” |
| Capability-phase eligibility and task authorization | 100% pass for every applicable SEC-P0 gate in the declared phase, plus an independently issued, current, exact task grant for every attempted action; otherwise the phase or action is blocked, and neither aggregate content quality nor mutation/change, semantic-decision, or release approval can override it |
| Candidate-first conformance evidence | Before any first operational claim for a new artifact/profile, 100% candidate-authorization and exact-test-grant conformance, immutable provenance/trace/evidence reconciliation, independent evaluation, and an independently issued exact P0 `pass` or `blocked` result; candidate runs contribute no product/comparative score |
| Controlled runtime verification | 100% P0-G pass for every claimed adapter/profile and exact runtime-grant conformance; zero unplanned executable, argument, child process, origin/navigation, network request, writable target, credential/data access, download/protocol launch, or persistent artifact; every observation tied to exact build/state/capture evidence |

- **[Proposal]** The phase-specific gates in [security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md#p0-release-gates) are mandatory eligibility inputs and should be reported as `pass`, `blocked`, or `not applicable` with evidence. Separately verify each task-grant ID and its principal/workload, exact operation/resource/data boundary/environment/expiry/revocation constraints against actual execution; requested operating mode is only an intent/scope consistency check, and mutation/change, semantic-decision, and release approvals do not substitute for the gate or grant. Calibrate other metrics with a labeled development set, lock thresholds before running the holdout set, and publish confidence intervals. Retire metrics that teams learn to game.

## Comparative evaluation protocol

Compare at least:

1. base agent with repository code only;
2. base agent plus the repository contract;
3. base agent plus contract and skill/workflow;
4. the full system with connectors, controlled runtime verification, and deterministic validation, only after every applicable connected-read, write, or P0-G runtime phase has passed its own gate and each test action has an independently issued matching task grant;
5. qualified human content-design output or review as a reference, not an assumption of perfect ground truth.

The `verify.candidate` route is not a sixth comparative condition. Use it before operational evaluation to establish or falsify conformance evidence, report it in a separate security/gate-evidence denominator, and exclude its outputs, retries and failures from product-quality and comparative scores.

Protocol:

- randomize or counterbalance task order;
- blind evaluators to system condition where practical;
- use at least two qualified raters for contextual dimensions;
- define adjudication but retain original disagreement and inter-rater agreement;
- test multiple runs because agent outputs vary;
- separate pass@1 reliability from “best of many” capability;
- measure cost, elapsed time, tokens, tool calls, and human review effort;
- run ablations for contract, skill, retrieval, validators, and connector evidence;
- test adversarial repository content and conflicting instructions;
- publish failures and excluded runs.

- **[Inference]** A demo can establish possibility; repeated holdout performance and production observation establish reliability more credibly.

## Voice and tone evaluation

Avoid judging against adjectives alone (“friendly,” “bold,” “human”).

### Voice

Evaluate whether the output consistently enacts named principles through observable choices: vocabulary, directness, explanation, evidence, agency, specificity, point of view, and relationship to the user. Require paired positive and negative examples and allow justified exceptions.

### Tone

Evaluate modulation by:

- evidenced event context, possible vulnerability, and cognitive/emotional load without claiming to know an individual's emotion;
- consequence and reversibility;
- urgency and time pressure;
- success, progress, uncertainty, warning, failure, or recovery;
- channel privacy, interruption level, and length;
- relationship, culture, locale, and domain expectations.

- **[Inference]** A single “brand tone score” rewards uniformity where appropriate content should change. Tone fit is conditional; voice consistency is constrained, not identical wording.
- **[Proposal]** Include scenarios where the correct output is intentionally less playful, less promotional, more explicit, or silent.

## Information-architecture evaluation

Use separate evidence for generation and validation:

- interviews, search terms, support language, and open card sorting can generate structure and labels;
- closed card sorts can compare a proposed grouping;
- tree testing and findability tasks can test navigation independent of visual presentation;
- full usability testing evaluates navigation within the product, with content, layout, and interaction together;
- production search/navigation evidence can identify recurring failure but needs interpretation.

- **[Proposal]** Benchmark whether the agent chooses an appropriate method and preserves uncertainty, not whether it manufactures a definitive taxonomy from sparse repository nouns.

## AI-authorship detection is not a content-quality method

- **[Sourced fact]** OpenAI withdrew its 2023 AI-text classifier because of low accuracy. Its published evaluation reported identifying 26% of AI-written challenge-set text as likely AI-written while incorrectly labeling 9% of human-written text. Source: [OpenAI, New AI classifier for indicating AI-written text](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/).
- **[Sourced fact]** Sadasivan et al. stress-tested watermarking, neural, zero-shot, and retrieval detectors and found recursive paraphrasing could substantially reduce detection rates with limited quality loss; they also demonstrated spoofing risks. Source: [Sadasivan et al., Can AI-Generated Text be Reliably Detected?](https://arxiv.org/abs/2303.11156).
- **[Inference]** Text-only classification cannot reliably prove who or what authored product copy, especially after editing, paraphrase, translation, short strings, or domain shift. A detector score must not be used to accuse a contributor or reject copy as “AI content.”

### What the system can responsibly detect

It can flag observable quality and grounding patterns without attributing authorship:

- unsupported product, policy, user, or performance claims;
- vague actors, actions, objects, consequences, or next steps;
- generic superlatives, filler introductions, and benefit claims that fit any product;
- terminology drift, inconsistent capitalization, and synonym churn;
- repetitive sentence frames, headings, or mirrored list structures;
- overconfident certainty where evidence is incomplete;
- invented affordances, recovery paths, personalization, or approvals;
- state-insensitive cheerfulness, apology, urgency, humor, or marketing language;
- duplicated copy that ignores local context;
- citations that do not support the claim or sources that were never accessed;
- lack of concrete user need, state, channel, locale, or product behavior.

Every report should say what is observed—for example, “unsupported claim” or “generic wording”—not “written by AI.”

### Provenance policy

- **[Proposal]** If provenance matters, collect it from authenticated workflow metadata, version history, signed attestations, tool logs, and contributor declarations with an explicit retention/privacy policy.
- **[Proposal]** Use provenance states such as `attested human-authored`, `model-assisted`, `generated`, `mixed`, and `unknown`; do not infer them from style.
- **[Inference]** Provenance metadata can show what a recorded workflow says happened. It still does not by itself prove originality, accuracy, quality, or absence of unrecorded editing.

## Model-judge controls

If models help evaluate outputs:

- provide the complete applicable context and rubric, not just the final string;
- require evidence spans and rule/source IDs;
- randomize candidate order and test position bias;
- use independent judges or human adjudication for high-impact findings;
- maintain judge-specific calibration sets and measure false positives/negatives;
- prevent the candidate from changing its own benchmark or accepted baseline;
- isolate untrusted content from evaluator instructions;
- record model/version, prompt, tools, and temperature where possible;
- allow “insufficient evidence” and reward correct abstention.

- **[Proposal]** Never let the same unverified model critique authorize its own external write or publication.

## Reporting template

Every evaluation report should include:

- scope and exclusions;
- repository/experience revision and evaluation date;
- system, host, model, contract, skill, adapter, and rubric versions;
- requested operating mode as intent and expected-scope metadata;
- declared capability phase and source availability;
- applicable SEC-P0 gate/result-record ID, evidence, blocked conditions, incidents, and residual risks; a failed gate is never waivable and establishes neither phase eligibility nor task authorization, while a passing gate establishes phase eligibility only and still grants no task authorization;
- for every `verify.candidate` attempt, candidate-authorization and exact-test-grant IDs/status/expiry/revocation; exact candidate/toolchain/build-recipe/build/artifact/test-plan/fixture/manifest/executor-profile digests; gates under test; synthetic-data and exact tool/action/filesystem/network/process/credential bounds; planned/actual trace; evidence sink/schema/retention and receipt digest; resource/cancellation/cleanup outcome; deviations/incidents/limitations; independent evaluator; and separately issued gate-authority disposition for the exact artifact/profile, if one exists;
- each independently issued task-grant ID and constraints—authenticated principal/workload, exact operation/resource/data boundary/environment/expiry/revocation—plus the actual authorized tools, credentials, network/model egress, connector scopes, actions, and data classes reconciled against it;
- each applicable connection-authorization, data-processing, durable-memory, and telemetry record ID with exact scope, conditions, expiry, current revocation check, and reconciliation against actual connector/data/persistence/telemetry behavior; explicit `not applicable` dispositions include a rationale, and none is reported as a task grant;
- separate mutation/change approval references for every source-of-truth mutation or publication transaction, semantic-decision approval references for releasable content or enforceable rules where applicable, and release-approval references when release policy requires residual-risk acceptance; no approval is recorded as a tool or action grant, and a proposed decision patched to a draft/nonrelease target remains `proposed`;
- for each runtime task, the P0-G profile/result, `verify.runtime` adapter version, exact runtime grant, planned and actual executable/tool/arguments/actions/build/environment/origins/routes/filesystem/network/data/credential bounds, process/browser/network trace, captures and redactions, cancellation/cleanup result, persistent-artifact check, incidents, and limitations;
- separate candidate, operational and product/comparative denominators; candidate evidence is never represented as a P0 result, supported-profile/readiness claim, operational task grant or product-quality score;
- metrics demonstrating both phase-gate eligibility and per-action task-grant conformance; any scoped exception for an explicitly eligible deterministic finding actually classified Medium or Low is reported separately and is permitted only when the applicable exception-governance gate itself passes;
- task corpus and sampling method;
- deterministic results by adapter and severity;
- contextual scores with rater agreement and disagreements;
- user-test participants, tasks, context, and limitations;
- critical examples and failure analysis;
- cost, latency, and human-review burden;
- regression against the previous version;
- unresolved risks and next evidence needed.

## Gaps to research

- **[Open question]** What open, legally usable corpus can represent realistic product states, content systems, and regulated risks?
- **[Open question]** Which rubric dimensions show reliable agreement among experienced content designers, and which require contextual discussion rather than scoring?
- **[Open question]** What benchmark targets are achievable by each adapter without rewarding conservative under-discovery?
- **[Open question]** How should production outcome evaluation handle selection bias, novelty effects, dark-pattern incentives, and low-frequency harms?
- **[Open question]** What privacy-preserving provenance is acceptable for open source, enterprise, and regulated environments?
- **[Open question]** How should multilingual evaluation recruit and compensate in-market content experts and disabled participants?
