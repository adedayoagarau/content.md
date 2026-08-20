---
title: Security, privacy, and trust boundaries
status: working-synthesis
started: 2026-08-17
updated: 2026-08-18
evidence_cutoff: 2026-08-17
scope: Repository-native content-design agent, local CLI, model calls, connectors, and future governed writes
legal_notice: Research and architecture material only; not a compliance certification or legal advice
---

# Security, privacy, and trust boundaries

Claim convention: **[Sourced fact]** paraphrases a named source; **[Inference]** is a product conclusion derived from evidence; **[Proposal]** is a candidate architecture requirement or decision. Unless a table, control, gate, or requirement is explicitly labeled otherwise, it is a **proposal**, not an approved or implemented control. Current-repository observations are stated only where they can be checked directly.

## Current release boundary

This repository currently contains research artifacts. It does **not** yet contain an executable agent, installer, connector, credential store, model gateway, or write path. No security or privacy control described below therefore has implementation evidence or a passing evaluation record.

The first released executable milestone should be a constrained, read-only research release. A separately authorized pre-release verification candidate may generate its gate evidence but is not itself that release. Future local or remote write capability is a different security product and must not inherit a safety claim from the read-only milestone.

The operational capability phases and pre-operational evidence route below are product-control boundaries, not a content-record lifecycle or a single `status` field.

| Capability phase | Permitted outcome | Explicitly absent |
|---|---|---|
| Research corpus, now | Human-readable research and candidate requirements | Repository reads, model egress, credentials, connectors, execution, mutation |
| Read-only local discovery | Inventory and evidence report from statically inspected, explicitly scoped files | Repository scripts, package installation, local writes, remote access |
| Read-only connected discovery | Evidence reports from separately authorized remote resources | Remote mutation, local mutation, wildcard scopes, token reuse across resources |
| Draft | A proposed patch or change set in an isolated artifact | Applying it to the source of truth |
| Local apply | Guarded changes to allowlisted repository paths on a reviewable branch | Direct protected-branch changes, remote publication, policy or permission changes |
| Remote apply | A specifically approved, scoped connector mutation with readback | Open-ended autonomous publishing or self-approval |
| Enforce | Deterministic checks against approved rules in CI or review | Letting the model invent, approve, or silently change policy |
| Verification candidate | Off-by-default, disposable isolated execution that emits exact conformance evidence for independent P0-A/P0-G evaluation | A gate result, operational task grant, supported-profile claim, product/comparative score, readiness, or production operation |
| Controlled runtime verification | Observe an exact build, route, state, browser, device, emulator, or process in a sandboxed, task-bounded executor | Static-discovery authority, arbitrary shell/browser use, package installation, source mutation, remote publication, personal browser sessions |

- **[Sourced fact]** OWASP describes excessive agency as excessive functionality, permissions, or autonomy and recommends minimizing tools, functions, and downstream permissions, executing in the user's context, requiring approval for high-impact actions, and enforcing authorization outside the model. Source: [OWASP LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).
- **[Inference]** Read access, draft generation, local mutation, and remote publication are separate authorities. A product that represents them as one `full access` switch makes least privilege and meaningful consent difficult.
- **[Proposal]** Ship each operational phase only when its own security P0 gates (`P0-A`–`P0-G`, referred to collectively as `SEC-P0`) in this document pass. The pre-operational `verify.candidate` route can generate independently evaluated gate evidence under its own candidate authorization and exact candidate-test grant, but it cannot issue a gate result or operational authority. `P0-G` is an independent runtime-verification phase rather than a step after enforcement: it may compose with applicable read or write phases, but it is never implied by them. A phase may reuse evidence from another phase but cannot inherit authorization or assurance. A passing gate establishes phase-release eligibility only; it never authorizes a task operation.

## Canonical control records and independent evidence/state dimensions

Security controls must preserve the system model's distinctions rather than collapse them into one generic control record or status field:

| Record or state system | Security-relevant meaning |
|---|---|
| Evidence source | Material that supports, challenges, or contextualizes a claim, with origin, scope, provenance, retrieval/effective dates, access mode, and limitations |
| Governing instrument | A separately identified law, regulation, standard, contract, or approved policy whose applicability is recorded for a defined claim and scope |
| Accountable owner | A person or organizational role responsible for a declared fact, behavior, instrument, language system, or decision class; responsibility is scoped and cannot be inferred from a document |
| Approver | A named person or authorized role able to accept an exact decision version for an exact scope, with conditions, date, and expiry; an approver is not implied by authorship or ownership |
| Connection authorization | Authenticated record for a named principal/client/workspace, connector, tenant/resource/audience, scopes/fields/operations, purpose/terms, issue date, expiry, current revocation state/check, and disconnect path; it permits the connection relationship but never a task operation |
| Data-processing authorization and record | Scoped decision plus inventory of purpose/prohibited uses, source systems, people/data classes/fields, provider/connectors/subprocessors, roles, regions, training use, retention/deletion/rights handling, separately applicable instruments, separate accountable-owner ID and authorized-approver/approval-record ID, conditions, effective date, expiry/review/revocation; it is not itself a legal determination or task grant |
| Persistence or durable-memory decision | Scoped decision for which records/fields may persist beyond a task, for what purpose, storage/region/isolation/access, retention/deletion/export, separate accountable-owner ID and authorized-approver/approval-record ID, conditions, effective date, expiry and revocation; it grants no source read/write capability |
| Telemetry decision | Scoped decision for which event/field schema may be emitted to which destination for what purpose, with data classes/redaction, processors/regions, access, retention/deletion, consent/policy route, separate accountable-owner ID and authorized-approver/approval-record ID, conditions, effective date, expiry and revocation; it does not authorize the observed task action |
| Semantic decision approval | An approval record that accepts the meaning, behavior, language, or rule represented by an exact decision version for a declared product, audience, locale, and release scope; only this record can move that decision to `approved` |
| Mutation/change approval | A separate approval record required for every source-of-truth mutation, bound to the exact diff or new value, target, base revision, environment, purpose, conditions, and expiry; it may authorize placing a `proposed` decision only in an explicitly draft/nonrelease target and never makes that decision semantically approved |
| Release approval | A separate residual-risk acceptance record, when required by release policy, bound to an exact build/artifact revision, audience, locale or market, environment, feature flags, release window, known residual risks, conditions, authorized release approver, date, and expiry; it does not approve content meaning or mutation and never grants publication capability |
| Evidence dimensions | Observation `unobserved`/`observed`/`corroborated`; challenge `undisputed`/`disputed`; freshness `current`/`stale`; lineage `active`/`superseded`; epistemic qualifier `none`/`inferred`/`assumed`. The dimensions coexist and do not progress toward approval |
| Decision state | One of `question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, or `retired`; rejection branches from a proposal rather than following approval |
| Delivery state | One of `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, or `removed`; rollback/removal can occur from more than one prior state |
| Evaluation record | A separate object containing the evaluated object, hypothesis or question, method, sample, result, and limitation; it may support or challenge a decision or delivery claim but is not another status axis |

These evidence dimensions and state systems have coexistence, constrained branches, and reversals—not one linear lifecycle. An observed source can support a proposed decision while an older expression remains observed-live. A proposal can be patched without **semantic decision approval** only when a separate mutation/change approval explicitly limits the exact patch to an isolated draft/nonrelease target; it remains `proposed` and cannot be released or enforced as an approved rule. A build can be verified but unreleased; a release can be observed-live without evidence that it achieved the intended user outcome. Security logs and UIs must preserve those combinations.

## Security objectives

The design must preserve:

1. **Repository integrity** — the agent cannot change code, content, configuration, policy, history, or remote systems outside an approved change.
2. **Confidentiality** — repository material, design files, customer content, credentials, personal data, and decisions do not cross a boundary without an explicit purpose and authorization.
3. **Control and decision integrity** — an untrusted document cannot appoint an accountable owner or approver, declare itself an applicable governing instrument, approve a decision, or widen system capability.
4. **User agency** — connection authorization, data-processing authorization, durable-memory decisions, telemetry decisions, semantic-decision approval, mutation/change approval, and release approval remain typed, scoped, distinguishable, and revocable or expiring as applicable.
5. **Tenant and workspace isolation** — data, memory, credentials, retrieval results, and logs cannot leak between repositories, organizations, users, or environments.
6. **Traceability** — a consequential action can be tied to an authenticated principal or workload, requested operating mode, declared capability phase, SEC-P0 result, independent task-grant ID and constraints, policy version, source evidence, exact target, base revision, applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs with current scope/expiry/revocation checks, separate mutation/change approval, semantic decision approval, and release-approval references where applicable, tool call, and observed result without unnecessarily retaining sensitive content. A verification-candidate action additionally preserves its distinct candidate authorization/test-grant IDs and exact candidate/toolchain/recipe/build/artifact/test/fixture/executor/evidence provenance. None of those control, evidence, or approval records authorizes another tool call.
7. **Reversibility and containment** — changes can be stopped, rolled back, and bounded; a compromised connector, dependency, model response, or repository cannot silently widen its reach.
8. **Availability and cost control** — file bombs, recursive links, adversarial content, connector loops, model loops, and unbounded generation cannot exhaust local or remote resources.
9. **Privacy by design** — collection, egress, storage, access, retention, deletion, and cross-border processing are defined before content is sent to a model or connector.

- **[Sourced fact]** NIST's AI RMF frames trustworthy AI as contextual and includes valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed. It organizes work into Govern, Map, Measure, and Manage. Source: [NIST AI RMF 1.0](https://airc.nist.gov/airmf-resources/airmf/0-ai-rmf-1-0/).
- **[Sourced fact]** NIST's Cybersecurity Framework 2.0 organizes cybersecurity outcomes across Govern, Identify, Protect, Detect, Respond, and Recover and does not prescribe one implementation. Source: [NIST CSF 2.0](https://csrc.nist.gov/pubs/cswp/29/the-nist-cybersecurity-framework-csf-20/final).
- **[Proposal]** Treat these objectives as properties to test, not adjectives to place in marketing.

## Non-negotiable invariants

These are candidate invariants for every implementation:

1. Repository files, design nodes, CMS records, tickets, web pages, messages, images, OCR, tool descriptions, connector responses, and model output are untrusted data. Evidence role, governing applicability, accountable ownership, approval scope, and system capability must be resolved separately.
2. No text encountered during discovery can grant a new tool, scope, credential, network route, writable path, or approval.
3. The model never decides whether its own action is authorized. A deterministic policy layer mediates every tool call and every argument.
4. A read-only session never possesses a write credential or write-capable tool.
5. Delegation can preserve or narrow authority; it cannot widen it.
6. Connection authorization does not approve content meaning or a mutation. Mutation/change approval does not semantically approve a decision and does not authorize unrelated future changes.
7. Semantic decision approval, mutation/change approval, and release approval are different records. Every source-of-truth mutation requires mutation/change approval bound to the exact target, operation, diff, base revision, environment, purpose, locale or market scope, and expiry. A proposed semantic decision may be patched only to an explicitly draft/nonrelease target when that mutation record says so; release or deterministic enforcement requires the applicable semantic decision to be `approved`. When release policy requires residual-risk acceptance, the release approval binds the exact build, audience, locale, environment, window, and residual risks. None creates, widens, or substitutes for a task capability grant.
8. Model output is a proposal. It is parsed, schema-validated, context-encoded, policy-checked, and reviewed before any downstream interpreter sees it.
9. Secrets are not content context. Discovery may report that a probable secret exists, but must not reproduce or send it to a model.
10. Failure to load policy, verify identity, validate a token, resolve a path, check the base revision, or write an audit event fails closed.
11. A package or content-rule update cannot silently add permissions, connectors, executable code, telemetry, or new data destinations.
12. The agent cannot approve its own work, alter the audit record, or lower its own controls. A decision remains `proposed` without semantic decision approval; mutation/change approval alone does not change that state. Delivery state advances only from observed delivery evidence; evaluation results remain separate records.
13. Evidence sources, governing instruments, accountable owners, and approvers are separate records with claim-specific scope. A repository's implemented string is evidence of behavior, not proof that an instrument applies or a decision was approved.
14. A prompt-injection classifier, secret scanner, or PII detector is a defense-in-depth signal, not the security boundary.
15. Requested operating mode expresses intent and expected scope only. It is recorded separately from the declared capability phase, applicable SEC-P0 result, independently constructed per-action task grant, mutation/change approval, semantic decision approval, and release approval where required.
16. Verification-candidate authorization, a candidate-test grant, candidate evidence, a SEC-P0 result, an operational task grant, and every approval/control record are separate. Candidate execution cannot evaluate or authorize itself, and only an independent gate authority can issue `pass` or `blocked` for the exact artifact/profile.

- **[Sourced fact]** OWASP says prompt injection may be indirect through external files or websites, that retrieval or fine-tuning do not fully mitigate it, and that foolproof prevention is unclear. It recommends least privilege, external-content separation, deterministic output validation, approval for high-risk actions, and adversarial testing. Source: [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/).
- **[Sourced fact]** OWASP recommends treating model output like untrusted user input before it is passed to shells, paths, browsers, databases, or other systems. Source: [OWASP LLM05:2025 Improper Output Handling](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/).
- **[Inference]** Prompt wording cannot be the root of trust. The enforceable boundary must exist below the model in capability construction, authorization, validation, sandboxing, and transaction controls.

## System and trust-boundary model

```text
                    authenticated user / CI principal
                                  │
       intent + requested operating mode + capability request
                                  │
                                  ▼
                   deterministic policy decision point
                       │          │             │
              task capability  phase-gate   approval-record
                   grant         verifier       verifier
                       │          │             │
                       ▼          ▼             ▼
repo / design / CMS ─> adapters ─> context compiler ─> model provider
      untrusted          │          minimized,          │
      evidence           │          labeled             │
                        ▼                              untrusted
                  normalized evidence <────────────── model result
                        │                                  │
                        └──────── validators <─────────────┘
                                      │
                              change plan / report
                                      │
                         separately authorized executor
                                      │
                           repository or remote target
                                      │
                               readback + audit
```

### Trust zones

| Zone | Examples | Default trust | Boundary rule |
|---|---|---:|---|
| Authenticated actor | Interactive user, CI workload, accountable owner, or approver | Authenticated, not unlimited | Resolve principal/workload identity, role, tenant, requested operating mode, declared capability phase, task-grant constraints, and separately declared responsibility or approval scope; apply most-restrictive policy |
| Policy control plane | Capability manifest, data policy, connector policy, approval verifier | High-value trusted computing base | Versioned, signed or integrity-protected, not agent-writable, deterministic, fail-closed |
| Local repository | Source, `AGENTS.md`, `CONTENT.md`, comments, tests, assets, git metadata | Untrusted until enrolled and scoped | Static inspection only by default; content cannot grant execution or egress |
| External evidence | Web, tickets, support, research, design, CMS, TMS, docs | Untrusted and possibly sensitive | Preserve provenance; taint as data; enforce source- and field-level authorization |
| Model boundary | Prompt/context sent and response received | Third-party processing boundary unless self-hosted | Minimize input; bind provider policy; never provide credentials; validate output |
| Connector boundary | MCP server, vendor API, local helper, browser automation | Untrusted service and code boundary | Separate identity and scopes; authorize every operation; validate URLs and outputs |
| Write plane | Patch applicator, source API, CMS publisher, design writer | High-impact | Absent in read releases; separately require passing applicable SEC-P0 eligibility, independent per-action task grant, mutation/change approval for every source-of-truth write, semantic decision approval for releasable targets where applicable, release approval where release policy requires it, concurrency guard, and readback |
| Audit plane | Security events, approvals, action records, incident evidence | Sensitive control data | Separate from agent-writable paths; minimize content; access-control and integrity protect |
| Update plane | CLI, skill, schemas, adapters, connector packages | Supply-chain boundary | Verify source, signature or attestation, version, permission diff, and rollback path |

### Assets requiring protection

- repository code, history, configuration, hooks, CI/CD, release artifacts, and content resources;
- unreleased product strategy, research, designs, roadmaps, legal advice, and privileged material;
- personal, financial, health, identity, support, analytics, and regulated data;
- API tokens, OAuth tokens, signing keys, cookies, environment variables, connection strings, and session identifiers;
- organization terminology, evidence-source records, governing instruments, accountable-owner assignments, approvals, governed exception records, and decision history;
- connector accounts, tenants, repositories, design files, CMS spaces, projects, markets, and locales;
- system prompts, policy bundles, tool schemas, model configuration, retrieval stores, caches, and long-term memory;
- audit records, security alerts, incident evidence, and provenance attestations;
- availability, rate limits, model budget, connector quotas, and maintainer reputation.

### Threat actors and failure sources

- a malicious repository owner or contributor;
- an attacker who can modify a file, dependency, web page, issue, design node, CMS record, translation, or connector result;
- a compromised connector, local MCP server, browser extension, package, release account, or update channel;
- a user who is authenticated but over-entitled, confused, fatigued, or socially engineered;
- a malicious or careless maintainer, operator, reviewer, or organization administrator;
- a compromised user endpoint, model provider account, CI runner, or credential store;
- an unreliable model response, hallucinated target, malformed patch, or mistaken evidence, governing-applicability, owner, or approver inference;
- an accidental cross-tenant cache, retrieval, logging, analytics, backup, or support export;
- resource-exhaustion content, recursive repositories, oversized histories, archives, or agent loops.

## Threat register

This is a design-stage threat register, not a measured risk assessment. Likelihood and impact must be recalibrated for an actual deployment, data class, and capability phase.

| ID | Threat and attack path | Primary assets / impact | Required control direction | Verification evidence |
|---|---|---|---|---|
| T01 | Direct user prompt tries to bypass scope, task authorization, mutation/change approval, or semantic decision approval | Integrity, credentials, remote systems | Deterministic tool policy; fixed phase envelope; independent per-action task grant; mandatory authenticated mutation/change approval for source-of-truth writes; semantic decision approval for releasable targets where applicable | Denied-call tests; policy-bypass, proposed-to-release, and approval-confusion adversarial suite |
| T02 | Instruction hidden in source, README, comment, translation, test, image, or design layer | Goal hijack, exfiltration, unauthorized changes | Treat repository material as data; provenance labels; no instruction execution; no write credential in read mode | Malicious-repository fixtures across text, Unicode, image metadata, and nested files |
| T03 | Web, ticket, support message, CMS record, or connector output carries indirect injection | Cross-system actions and disclosure | Taint external data; isolate connectors; allowlisted operations; no automatic following of embedded instructions or links | Connector injection fixtures and canary-exfiltration tests |
| T04 | A file claims to be canonical policy or approved copy without enrollment | Governance or decision corruption and unsafe content | Keep evidence source, governing instrument, accountable owner, approver, and independent state records separate; require scoped onboarding | Conflicting-source and instrument-applicability tests; unapproved file cannot alter policy or record an approval |
| T05 | Secret in source or environment enters prompt, output, log, cache, or diff | Credential theft and lateral movement | Prohibited-path rules; pre-egress detection and redaction; no environment dump; secret store; rotation plan | Seeded-secret tests; zero plaintext secret in captures and logs |
| T06 | Personal or regulated data is over-collected or retained | Privacy harm, breach, contractual or regulatory exposure | Data inventory; purpose and field minimization; default exclusions; retention and deletion; provider review | Data-flow review; deletion exercise; sample log and cache inspection |
| T07 | Data or credentials cross repository, user, tenant, market, or environment | Cross-tenant disclosure or mutation | Namespace isolation; per-tenant keys and caches; subject/resource authorization at action time | Tenant-isolation tests and authorization-negative tests |
| T08 | Broad, stolen, replayed, or passed-through connector token | Confused deputy, impersonation, broad blast radius | Audience binding; short-lived tokens; PKCE; exact redirects; resource indicators; no token passthrough; revocation | OAuth conformance tests; replay, wrong-audience, and token-leak tests |
| T09 | Agent has unnecessary tools, functions, permissions, or autonomy | Destructive or unauthorized action | Phase-specific capability sets; granular tools; read/write identity split; independent per-action task grants; mandatory mutation/change approval for writes and semantic decision approval for releasable targets where applicable | Capability enumeration; forbidden-tool absence; grant-boundary and policy-matrix tests |
| T10 | Path traversal, symlink, hard link, mount, or case-normalization escape | Reads or writes outside workspace | Canonical path resolution; root containment; no-follow policy; allowlisted targets; filesystem race defenses | Escape corpus on supported operating systems and filesystems |
| T11 | Repository scripts, build hooks, macros, package lifecycle scripts, or local servers execute during discovery | Code execution, exfiltration, persistence | Static parsers; no install/build under P0-A; any exact build/test hook or server requires a P0-G-eligible profile and runtime grant; package lifecycle installation remains outside P0-G | Fixtures proving no child process or network call during static scan; P0-G execution-boundary negatives |
| T12 | Model output becomes shell, URL, Markdown/HTML, query, path, or template code | Injection, XSS, SSRF, RCE | Typed tool schemas; context-specific encoding; parser and AST validation; no shell interpolation | Output-fuzzing and injection tests per sink |
| T13 | Stale or mis-targeted patch overwrites concurrent work | Data loss and integrity failure | Base revision and expected-current-value guards; narrow diff; transactional apply; rollback | Concurrency test; stale plan fails without partial mutation |
| T14 | Semantic decision, mutation/change, or release approval is spoofed, vague, conflated, reused, or produced through fatigue | Unapproved meaning, unauthorized write, or unaccepted release risk with apparent consent | Typed authenticated approvals with distinct scope and expiry; risk summary; no batching unrelated actions; re-prompt on decision, diff, target, build, audience, base, environment, purpose, residual risk, or release-window change | Approval-type, binding, replay, proposed-to-release, release-scope, and usability tests |
| T15 | CLI, skill, adapter, dependency, or connector package is compromised | Code execution across adopters | Signed/provenance-linked releases; SBOM; pinned dependencies; minimal dependency graph; isolated install | Provenance verification, SBOM, dependency review, compromised-package exercise |
| T16 | Update channel serves rollback, freeze, fast-forward, or permission-expanding update | Persistent compromise or loss of control | Trusted update metadata; version monotonicity; expiry; permission diff; staged update; emergency block and rollback | Update-framework adversarial tests and rollback drill |
| T17 | Retrieval index, content memory, decision history, or baseline is poisoned | False governing precedence or repeated unsafe output | Source provenance; separate record roles and state axes; append/supersede rather than silent overwrite; trust and freshness fields; rebuildable indexes | Poison and supersession tests; origin trace for every retrieved item |
| T18 | Logs leak content or are altered, flooded, or deleted | Secondary breach and loss of accountability | Metadata-first logs; redaction; quotas; access control; integrity protection; separate storage and retention | Log-injection, secret, PII, tamper, and exhaustion tests |
| T19 | Malicious connector metadata or authorization URL targets local/internal resources or dangerous schemes | SSRF, credential theft, local code execution | Strict URL parser; HTTPS; safe loopback exception; redirect validation; egress control; no shell URL opener | Private-IP, DNS-rebinding, redirect-chain, and scheme tests |
| T20 | Huge files, archives, generated trees, histories, retries, or agent loops exhaust resources | Availability loss and cost | File/type/size/depth/token/time/call budgets; cancellation; rate limits; circuit breaker | Resource-exhaustion fixtures and cost-ceiling tests |
| T21 | Provider stores, trains on, exposes, or moves submitted content incompatibly with policy | Confidentiality, IP, privacy, residency | Provider contract and setting review; approved regions; no-training/retention configuration where required; minimization | Contract/config evidence and controlled egress capture |
| T22 | Subagent or tool delegation widens authority or loses actor attribution | Privilege escalation and audit gaps | Delegation tokens that only narrow; authenticated workload identities; depth and fan-out limits | Parent-child scope proof and delegation-negative tests |
| T23 | Cache, embedding, analytics, or support artifact is reused across contexts | Latent cross-project leakage | Per-workspace storage and encryption domain; no global semantic memory of private content; deletion propagation | Cross-workspace canary tests and cache purge exercise |
| T24 | Security incident occurs without detection, owner, containment, or evidence | Extended impact and unreliable disclosure | Monitored audit events; alert ownership; kill switches; rehearsed response and notification decision tree | Tabletop and technical revocation/containment drill |
| T25 | Human trusts fluent content or a reassuring approval screen despite missing evidence | Incorrect consequential content or manipulated approval | Evidence-visible UI; uncertainty and risk; independent reviewers; usability tests; protected decisions remain human-owned | Red-team social-engineering study and high-risk content review |
| T26 | Runtime verification launches repository code, a local server, browser, app, emulator, build hook, or child process with ambient user authority | Code execution, secret theft, data egress, persistence, unsafe browser actions, local/remote mutation | Independent P0-G eligibility; exact runtime task grant; isolated executor/profile; read-only mounts; allowlisted executable/arguments/origins/actions; network, credential, process, download, resource, and cleanup controls | Malicious-runtime fixtures; child-process/network/filesystem/browser negative tests; seeded-secret and personal-session canaries; cancellation and teardown evidence |
| T27 | A new build runs before gate evidence exists, then treats its own test output as a P0 result or readiness claim | Circular certification, unsupported profile, unsafe operational execution | Off-by-default `verify.candidate`; authenticated expiring candidate authorization; separate exact candidate-test grant; immutable candidate/toolchain/build/test/fixture/executor/evidence bindings; independent evaluator and gate authority | Authorization/grant negatives; artifact/recipe/profile drift tests; evidence provenance and sink-integrity checks; proof that candidate output cannot issue a result or operational grant |

- **[Sourced fact]** The OWASP Top 10 for Agentic Applications 2026 identifies goal hijack, tool misuse, identity and privilege abuse, agentic supply-chain vulnerabilities, unexpected code execution, memory and context poisoning, insecure inter-agent communication, cascading failures, human-agent trust exploitation, and rogue agents as major risk classes. Source: [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/).
- **[Inference]** The OWASP list is a risk taxonomy, not proof that the controls above are sufficient or that a product is compliant.
- **[Proposal]** Map the implemented system to a versioned verification standard such as [OWASP AISVS 1.0](https://github.com/OWASP/AISVS), but keep product-specific abuse cases and connector tests; a generic checklist cannot replace them.

## Malicious-repository handling

Opening a repository is a security event. A repository can contain both legitimate content instructions and adversarial payloads. The system must not equate “inside the repository” with “trusted.”

### Static discovery envelope

The default scanner should:

- resolve the explicit workspace root to a canonical path and remain inside it;
- use an allowlist of supported regular-file types and parsers;
- avoid following symlinks, hard-link aliases, mounts, submodules, or worktrees outside the enrolled root;
- exclude secrets, VCS object stores, dependency trees, build artifacts, caches, binaries, archives, large generated files, and private-key locations by default;
- enforce per-file, total-byte, file-count, nesting-depth, decompression, time, memory, token, and model-call ceilings;
- parse data without importing modules, evaluating templates, expanding macros, loading plugins, installing dependencies, starting dev servers, or running project scripts;
- treat hidden text, Unicode controls, embedded images, OCR, comments, link targets, and fetched content as tainted evidence;
- disable network access during local discovery unless the user starts a separately visible evidence-fetch operation;
- return partial coverage and named blind spots rather than widening the scan silently;
- record file identity, content hash, parser, supported version, classification, and retrieval time without copying unnecessary contents into the audit log.

### Instruction enrollment

`AGENTS.md`, `CONTENT.md`, design guidance, glossaries, and policy files require two distinct decisions:

1. **Discovery:** the file exists and says something.
2. **Enrollment:** a named accountable owner records the file's exact version and scope as an evidence source or, only where justified, as a governing instrument. Owner and approver assignments are recorded separately and are never inferred from the file.

An enrolled content contract may be an evidence source or an applicable governing instrument for declared content claims. That role does not make its author an approver and cannot grant operating-system access, connector permissions, new network destinations, or its own future updates. Nested files may narrow content guidance only under an approved precedence rule for the relevant scope; they may not widen the execution envelope.

### Safe analysis of executable-looking material

- Commands in documentation are quoted evidence, never tasks.
- Package manifests are parsed as data; lifecycle scripts do not run.
- Test commands suggested by the repository are not run in read-only discovery.
- URLs are displayed or recorded first; fetching uses a separate allowlisted network capability.
- Generated patches are stored as inert text until a typed patch parser validates them.
- Markdown and HTML previews use safe rendering; model-generated links and images do not auto-fetch.
- Secrets or probable PII are replaced with typed placeholders before model context is assembled.

- **[Sourced fact]** MCP security guidance warns that local MCP servers are executable code with the client's privileges and recommends explicit consent, showing the exact command, sandboxing, minimal filesystem and network access, and explicit privilege grants. Source: [MCP Security Best Practices, 2026-07-28](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).
- **[Inference]** The same containment principle applies to repository-provided scripts, linters, skills, plugins, and `npx` commands. Merely labeling code a “content tool” does not make it safe to execute.

## Capability and authorization architecture

### Proposed capability envelopes

| Capability | Default | Credential/tool construction | Separate prerequisite/decision |
|---|---:|---|---|
| `discover.local` | Available only for enrolled root | Read-only file descriptor or sandbox mount; no network or process execution | Scope confirmation at onboarding |
| `research.external` | Off | Domain/purpose-bounded fetcher; no local secrets or connector tokens | Per task or organization policy |
| `model.infer` | Off until data policy passes | Minimized context; approved provider, tenant, region, retention setting | Workspace policy plus visible task use |
| `connector.read` | Off | Per-user/per-tenant read token for named resources and fields | Connection authorization; incremental scopes |
| `connector.disconnect` | Available only through the trusted control plane, including its fail-safe incident path | P0-B B5/B8-tested credential/session revoker bound to a named connector, tenant, account, and credential set; no content-write operation | Authenticated owner/admin request or pre-authorized incident action; no P0-E, mutation/change approval, or release approval |
| `draft.patch` | Off | Writes only to isolated temporary/change-artifact store | Task intent; no source mutation |
| `apply.local` | Off | Separate process with allowlisted paths and operations | Mutation/change approval bound to exact diff, base revision, target, environment, and purpose |
| `connector.write` | Absent from read session | Separate short-lived write token and granular operation | Authenticated, expiring mutation/change approval bound to the publication transaction; separate release approval when required by release policy |
| `verify.candidate` | Off | Disposable isolated executor with only the exact tools/actions and synthetic data bound by an authenticated expiring verification-candidate authorization and separate candidate-test grant | Independent evaluator assignment, immutable test/fixture/executor/evidence contract; generates evidence only |
| `verify.runtime` | Off | P0-G-governed isolated executor or controlled browser/device profile for an exact build/environment | Environment-specific authorization; exact runtime task grant |
| `enforce.ci` | Off | Deterministic checks only; read source, emit status | Repository owner installation and policy review |
| `admin.policy` | Never available to content agent | Human/admin control plane only | Out-of-band organization governance |

The final column records a separate prerequisite or human/organizational decision; it is not authorization for a tool call. For an operational capability, no prerequisite, connection authorization, data-processing authorization, policy enrollment, mutation/change approval, semantic decision approval, release approval, operating mode, candidate record, or evidence threshold substitutes for both (1) a passing applicable SEC-P0 gate/result record and (2) an independently constructed per-action operational task grant. The pre-operational candidate route instead requires its two exact records and can emit evidence only. The trusted control plane binds each grant to its declared purpose, authenticated principal or workload, exact operation and resource, permitted data boundary and egress, environment, expiry, and revocation path; the model, repository, candidate, and approver cannot issue or widen it.

### Policy evaluation tuple

Every attempted operation should be decided over at least:

```text
authenticated_principal + workload_identity + tenant + workspace + session
+ requested_operating_mode
+ declared_capability_phase
+ verification_candidate_authorization_reference + candidate_test_grant_reference
+ applicable_sec_p0_gate + sec_p0_result_record
+ task_grant_id + task_grant_constraints {
    exact_operation, exact_resource, permitted_data_boundary,
    environment, expiry, revocation
  }
+ applicable_connection_authorization_reference { scope, expiry, revocation_checked_at }
+ applicable_data_processing_record_reference { purpose, data_scope, expiry, revocation_checked_at }
+ applicable_durable_memory_decision_reference { record_field_scope, expiry, revocation_checked_at }
+ applicable_telemetry_decision_reference { event_field_scope, destination, expiry, revocation_checked_at }
+ tool + operation + exact_arguments + target_resource + data_class
+ policy_version + source_trust + mutation_approval_reference
+ semantic_decision_approval_reference + release_approval_reference
+ time + base_revision
```

The requested operating mode is evaluated only for intent and scope consistency. Verification-candidate authorization and its candidate-test grant are used only for the pre-operational `verify.candidate` route; SEC-P0 eligibility records and operational task grants are required for operational routes. The candidate records, declared capability phase, SEC-P0 eligibility record, operational task grant, applicable connection authorization, data-processing record, durable-memory decision, telemetry decision, mutation/change approval, semantic decision approval, and release approval are separate inputs and cannot be inferred from one another. The decision returns `allow`, `deny`, or `require_review`, plus reason code, effective restrictions, expiry, and audit fields. Unknown tools or fields, missing policy, missing/inapplicable/expired/revoked control records, missing or mismatched authorization/grant/gate records, and evaluation errors deny.

### Connector rules

For every connector:

- publish a versioned capability manifest down to operation, resource type, field, and read/write effect;
- use a distinct user or workload identity; do not share an organization-wide omnipotent token;
- request the smallest initial scope and step up only for the current operation;
- bind tokens to the intended resource/audience and validate issuer, audience, expiry, signature, and scopes server-side;
- use authorization code flow protections, including PKCE and exact redirect matching, where applicable;
- keep downstream service tokens separate from client-to-connector tokens; do not pass tokens through;
- store tokens in an OS or managed secret store, never repository configuration, prompt context, URL, model output, or logs;
- prefer short-lived credentials, refresh rotation, explicit disconnect, and immediate revocation;
- pin the authorized organization, tenant, repository, file, CMS space, project, locale, and environment where the service supports it;
- treat tool descriptions, schemas, resources, errors, and returned content as untrusted input;
- validate URLs and redirects and constrain egress to prevent SSRF and local-resource discovery;
- authorize again at execution time; discovery of a tool or prior consent is not authorization for a call;
- rate-limit, budget, time out, and circuit-break calls; make retries idempotent and bounded;
- expose the P0-B B5/B8-tested control-plane disconnect and credential/session revocation path even when remote publication has never been enabled: routine disconnect requires an authenticated, exact `connector.disconnect` task grant, while an emergency revocation uses a separately governed pre-authorized incident grant that can only reduce existing authority; neither requires P0-E, mutation/change approval, or release approval, neither may mutate product content, and both produce an audit record;
- display the actor, connector, target, data leaving the boundary, requested scopes, action, and revocation path in consent UI.

- **[Sourced fact]** The MCP 2026-07-28 authorization specification requires resource indicators and audience validation, forbids accepting or transiting unrelated tokens, requires authorization-response issuer validation under its RFC 9207 rules, and prefers Client ID Metadata Documents while retaining deprecated Dynamic Client Registration for compatibility. Source: [MCP Authorization, 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).
- **[Sourced fact]** MCP's 2026-07-28 security guidance recommends progressive least-privilege scopes and identifies token passthrough, confused-deputy, SSRF, local-server compromise, unsafe URL handling, mix-up attacks, CIMD trust-policy failures, and broad scopes as concrete risks. Source: [MCP Security Best Practices, 2026-07-28](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).
- **[Sourced fact]** MCP 2026-07-28 is a breaking final protocol revision with a stateless core, authorization hardening, cache hints, and a deprecation framework. Treat 2025-11-25 links and behavior only as versioned compatibility evidence, and test each supported protocol era separately. Source: [MCP 2026-07-28 release](https://blog.modelcontextprotocol.io/posts/2026-07-28/).
- **[Sourced fact]** RFC 9700 is the IETF Best Current Practice for OAuth 2.0 security as of January 2025. Source: [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).

### Consent is not one event

The interface must distinguish:

- **connect** — allow this client to access specified resources with stated scopes;
- **disconnect or revoke** — end future connector access or invalidate a named credential/session through the trusted control plane, independently of content publication capability;
- **process** — allow specified data classes to be analyzed by the local system or named model/provider under stated retention and region terms;
- **propose** — let the agent create a review artifact;
- **apply** — authorize this exact change to this exact target and base revision;
- **publish or release** — expose an already approved artifact to a specified audience;
- **remember** — persist selected evidence or decisions beyond the task;
- **telemetry** — send defined operational data to the product operator.

Bundling these into “Allow access” is not meaningful authorization.

## Data security and privacy architecture

### Candidate data classes

| Class | Examples | Baseline handling |
|---|---|---|
| Public | Published style guide, public docs, open-source UI text | May be processed within documented task scope; provenance retained |
| Internal | Unreleased strings, roadmaps, tickets, research, design | Local-only until an approved provider and organizational policy allow egress |
| Confidential | Legal review, security findings, proprietary strategy, customer support records | Exclude by default; named owner and purpose required |
| Personal data | Names, emails, account identifiers, behavioral data, transcripts | Minimize or pseudonymize; lawful/contractual basis and rights process are deployment-specific |
| Sensitive or regulated | Health, financial, government ID, children's data, authentication data, privileged material | Prohibited in baseline; dedicated domain/privacy/security approval and controls required |
| Secret | Tokens, passwords, keys, cookies, credentials, connection strings | Never model context or content corpus; detect, redact, revoke if exposed |
| Security telemetry | Actor IDs, tool calls, denials, hashes, alerts | Separate access, purpose, retention, and integrity controls; no raw content by default |

Classification is contextual. A product label may be public in production but confidential before launch; a harmless-looking error string may reveal eligibility, account existence, security posture, or health status.

### Data-processing record required before model or connector use

For each processing path, record:

- purpose and prohibited secondary uses;
- organization, controller/processor roles where applicable, accountable owner, and incident contact;
- source systems, data subjects, data classes, fields, and volume;
- model, connector, subprocessors, support-access path, and training or improvement use;
- transit, processing, storage, backup, and support regions;
- access roles, authentication, encryption, tenant isolation, and key ownership;
- retention trigger and duration, deletion method, cache and backup propagation, and export capability;
- applicable legal, contractual, sector, customer, and residency constraints;
- rights-request and dispute handling where applicable;
- risks to people, not only organizational breach risk;
- verification evidence and last review date.

### Data-minimization defaults

- Keep extraction and deterministic classification local where possible.
- Send only the fragments required for the current decision, with neighboring context deliberately selected rather than whole-repository dumps.
- Replace user records, identifiers, credentials, and irrelevant literals with typed placeholders before egress.
- Prefer structural metadata, hashes, counts, and stable internal references over raw source in telemetry.
- Do not create global embeddings or model memory from private repositories by default.
- Separate ephemeral task context, approved durable evidence, audit metadata, and product analytics.
- Do not write raw customer examples, secrets, or personal data into `CONTENT.md`, decisions, fixtures, or git history.
- Provide a no-model/static discovery mode and make incomplete coverage explicit.
- Make telemetry off by default for raw repository, design, CMS, prompt, response, and diff content.
- Do not claim a detector finds all secrets or personal data; blocked paths and minimization remain necessary.

### Retention, deletion, and residency

- Retention must be purpose- and data-class-specific; there is no universal safe number of days.
- Source extracts, model prompts/responses, connector caches, approval artifacts, security logs, analytics, backups, and support exports need separate schedules.
- Expiry should be enforceable and testable. Deletion must cover derived indexes and caches, with backup limitations disclosed.
- Residency is a property of the entire data path—connector, gateway, model, logging, analytics, support, subprocessors, and backups—not a UI region label.
- Cross-border transfer requirements are jurisdiction- and role-specific. Deployment owners must establish applicability before enabling a provider or region.
- Disconnecting a connector revokes future access; it does not by itself prove deletion of already processed data. The product must show both states.

- **[Sourced fact]** NIST SP 800-122 recommends context-based identification and protection of PII and includes response planning; its scope is US federal agencies, so it is guidance rather than a universal privacy law. Source: [NIST SP 800-122](https://csrc.nist.gov/pubs/sp/800/122/final).
- **[Sourced fact]** The NIST Privacy Framework is a voluntary risk-management tool. The NIST site currently presents Privacy Framework 1.1 as an Initial Public Draft, so it must not be cited as a final standard. Sources: [NIST Privacy Framework](https://www.nist.gov/privacy-framework) and [using Privacy Framework 1.1](https://www.nist.gov/privacy-framework/using-privacy-framework-11).
- **[Sourced fact]** Where the EU GDPR applies, Article 5 includes purpose limitation, data minimization, storage limitation, integrity/confidentiality, and accountability; Article 25 addresses data protection by design/default; Articles 28 and 30 address processors and records; Chapter V governs international transfers. Source: [Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj).
- **[Inference]** A provider's “zero retention” or regional-processing claim is not enough on its own. The product needs a verified end-to-end data-flow record and contract/configuration evidence for the exact deployment.

## Secret handling

The agent must never need plaintext repository or connector secrets in model context.

### Required design

- Retrieve secrets through a platform credential broker or secret store only at the execution boundary.
- Issue a scoped token to the connector or executor, not to the model.
- Prefer workload identity and short-lived credentials over long-lived API keys.
- Keep read and write credentials separate and make write credentials unavailable until the executor independently verifies passing applicable SEC-P0 eligibility, the exact task grant, mutation/change approval, any applicable semantic decision approval, and any release approval required by the target's release policy.
- Never accept secrets in `CONTENT.md`, agent instructions, command-line flags that enter shell history, URLs, logs, error reports, generated patches, or support bundles.
- Redact before serialization and before logging, not only in the user interface.
- Detect repository secrets locally as a safety signal; report type, location, and fingerprint rather than value.
- Rate-limit and alert on secret access, failed authorization, unusual export, and use after revocation.
- Maintain ownership, purpose, scope, creation, expiry, rotation, revocation, and incident metadata.
- If exposure is suspected, revoke/rotate first; deleting the visible string is not containment.

- **[Sourced fact]** OWASP's Secrets Management guidance describes centralized lifecycle management, fine-grained least privilege, rotation, revocation, expiration, and auditing, and says plaintext secrets should not be logged. Source: [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).
- **[Proposal]** Make seeded-secret non-egress tests a release blocker for every parser, connector, model path, error path, and support export.

## Model-context and retrieval security

### Provenance and taint

Every context fragment should carry:

```text
origin + tenant/workspace + source locator + retrieved_at + content_hash
+ data_class + record_role + evidence_dimensions {
  observation_strength, challenge, freshness, lineage, epistemic_qualifier
} + governing_instrument_ids
+ accountable_owner_ids + approver_ids + linked_decision_ids + linked_occurrence_ids
+ trust_state + allowed_uses
+ transformation/redaction history + parent fragment + conflict state
```

The model may use a fragment as evidence only within its allowed purpose. It may not treat embedded instructions as policy. Transformations must not erase origin or trust state.

### Context compiler responsibilities

- resolve the requested task and minimum evidence set;
- filter by actor, workspace, purpose, data class, source authorization, and freshness;
- preserve evidence observation, challenge, freshness, lineage, and epistemic dimensions independently from linked decision and delivery states;
- retain `inferred` and `assumed` as epistemic evidence qualifiers and never translate them into decision approval;
- delimit and label untrusted evidence consistently;
- exclude secrets and prohibited fields before provider serialization;
- cap fragments, source contribution, token budget, and repeated content;
- avoid cross-tenant semantic caches and retrieve only from the active workspace;
- record source IDs and hashes used, without logging raw content by default;
- reject or constrain the task if required evidence, governing applicability, accountable ownership, semantic decision approval, mutation/change approval, or release approval is missing rather than inventing it.

### Durable memory

Long-term memory is off by default for raw private content. Durable records should be explicit, reviewable artifacts with scope, evidence source and orthogonal evidence dimensions, applicable governing instruments, accountable owner, authorized approver links, separate decision and delivery states where relevant, evaluation records, retention, and deletion behavior. Retrieval indexes are rebuildable derivatives, never the sole source of truth.

Changes to an enrolled rule or decision create a new version and supersession link. An agent may propose a memory update; it cannot silently convert a conversation, model output, or observed string into approved policy.

## Safe write architecture

Write capability is not part of the read-only milestone. When introduced, use a separate write plane.

### Change transaction

```text
evidence snapshot
  → typed change plan
  → deterministic validation
  → content and implementation diff
  → risk + governing-instrument + accountable-owner + approver routing
  → semantic decision approval when releasable governed meaning is involved or the decision will govern enforcement
  → mutation/change approval bound to diff + base revision + target + environment + purpose
  → release approval bound to exact build + audience + locale + environment + window + residual risk when required
  → executor input verification {
      passing SEC-P0-D or SEC-P0-E result record
      + independently constructed task grant bound to authenticated principal/workload,
        exact operation/resource/data boundary/environment/expiry/revocation
      + applicable current connection-authorization, data-processing, durable-memory,
        and telemetry record references with exact scope/expiry/revocation checks,
        or explicit not-applicable dispositions with rationale
      + mutation/change approval reference
      + semantic decision approval reference when applicable
      + release approval reference when required by release policy
    }
  → short-lived write credential constrained by the verified task grant
  → atomic or compensatable execution
  → immediate readback
  → static readback/validation
  → optional controlled runtime verification {
      passing SEC-P0-G result record
      + independently constructed runtime task grant
      + read-only source or disposable scratch target
    }
  → delivery-state update + evaluation record + audit event
```

The gate result, task grant, applicable connection-authorization/data-processing/durable-memory/telemetry records, mutation/change approval, semantic decision approval when applicable, and release approval when required are independent. A passing SEC-P0-D/E result establishes phase eligibility; the task grant authorizes the exact system action; the additional control records constrain connection, data use, persistence, and observability; mutation/change approval accepts the exact diff, target, environment, and purpose; semantic decision approval accepts content meaning for its declared scope; release approval accepts residual risk for an exact build and exposure scope. A proposed semantic decision may be patched only to a target explicitly constrained as draft/nonrelease by the mutation approval and must remain `proposed`. No approval or control decision generates or widens the task grant, and the grant never implies approval of content meaning or release risk.

### Local-write controls

- operate on a new or explicitly selected branch, never silently on a protected branch;
- restrict writes to canonical allowlisted paths and file types;
- reject symlinks and resolved targets outside the workspace;
- compare file and repository base revisions immediately before apply;
- preserve resource keys, variables, markup, locale branches, encoding, line endings, and unrelated formatting;
- use parsers and structured editors rather than generated shell commands;
- present content-only and implementation diffs;
- never change CI, hooks, authorization policy, dependency manifests, lockfiles, generated code, or runtime logic under a task grant scoped only to content changes;
- stop on partial failure, preserve recoverable state, and provide a rollback or inverse patch;
- run verification commands, browsers, apps, devices, emulators, or local servers only after P0-G passes and an exact runtime task grant authorizes the executable/tool, arguments or actions, build/environment, filesystem and network boundary, data/credentials, duration, and cleanup; P0-D alone, reviewer preference, and any applicable typed approval do not grant execution.

### Remote-write controls

- use a connector operation narrower than generic update or shell access;
- issue an expiring write token only after the executor separately verifies a passing SEC-P0-E result, an independently constructed task grant for the exact remote operation, all applicable current connection-authorization/data-processing/durable-memory/telemetry records (or explicit not-applicable dispositions), the required mutation/change approval bound to the publication transaction, semantic decision approval when releasable governed meaning is involved, and release approval when the release policy requires it;
- bind the task grant to the authenticated principal/workload, connector, tenant, exact operation/resource/data boundary, environment, expiry, and revocation; separately bind mutation/change approval to the resource, field, locale, base version/ETag, exact new value or patch, target environment, and purpose; bind semantic decision approval to the exact decision version and scope; bind release approval to the exact build, audience, locale, environment, release window, and residual risks;
- use idempotency keys and optimistic concurrency controls;
- re-prompt if the target, base, diff, policy, or approver scope changes;
- prevent the proposing agent from satisfying its own review requirement;
- read the exact target back through an independent read call and distinguish API success from correct rendering or release;
- never infer decision approval, a delivery advance to `released` or `observed-live`, or a passing outcome evaluation from a successful write.

### High-risk prohibited autonomous actions

Until separately governed and validated, the agent must not autonomously:

- change legal, financial, medical, safety, eligibility, consent, privacy, pricing, security, or contractual claims;
- publish to production, send customer communications, change store listings, or alter public support guidance;
- modify authentication, authorization, permission, incident, security-warning, or account-recovery content without the designated owners;
- delete content, translations, design history, CMS records, branches, decisions, logs, or evidence;
- change its own policy, capabilities, approvers, evidence-source register, governing-instrument register, accountable-owner assignments, audit configuration, or update channel;
- resolve a source conflict by guessing which owner is authoritative.

## Logging, audit, and observability

### Minimum security event

Store structured fields such as:

- event and correlation ID;
- timestamp and monotonic sequence where available;
- authenticated user or workload identity and tenant/workspace;
- agent, host, model, policy, schema, adapter, connector, and package versions;
- requested operating mode as intent/scope metadata;
- declared capability phase and applicable SEC-P0 gate/result-record reference;
- task-grant ID and constraints, including authenticated principal/workload, exact operation/resource/data boundary, environment, expiry, and revocation state;
- requested tool, operation, target type, and target identifier;
- data classifications and source identifiers or hashes, not raw source by default;
- scopes requested, granted, denied, stepped up, expired, or revoked;
- policy result and reason code;
- typed, separate connection-authorization, data-processing, durable-memory, telemetry, semantic-decision-approval, mutation/change-approval, and release-approval record references, classes, scopes, conditions, expiries, and current revocation states when applicable; none substitutes for another, the SEC-P0 result, or the task grant;
- change-plan and diff hash;
- start, success, failure, partial, cancel, rollback, and readback result;
- security signals, rate/cost counters, and incident linkage.

### Data excluded by default

- access and refresh tokens, authorization codes, cookies, passwords, keys, connection strings, and secret values;
- raw repository, design, CMS, support, ticket, or customer content;
- complete prompts and model responses;
- sensitive personal data, regulated data, and privileged material;
- environment dumps, request bodies, headers, or stack traces containing the above.

Debug capture containing content must be a separate, time-bound, access-controlled mode with an explicit purpose, visible warning, region/retention policy, and deletion path.

### Log protection

- write logs to a service or location outside the agent's writable workspace;
- restrict and review read access; log access to logs;
- integrity-protect or use append-only/tamper-evident storage appropriate to risk;
- sanitize line breaks and control characters to resist log injection;
- bound event size and rate so an attacker cannot fill storage;
- encrypt in transit and at rest where the deployment requires it;
- monitor denials, unexpected tools, write attempts in read mode, scope escalation, export volume, cross-tenant access, signature failures, and revocation failures;
- set separate retention for security evidence and content-bearing debug artifacts;
- test disposal at the end of the approved retention period.

- **[Sourced fact]** OWASP's logging guidance says access tokens, passwords, keys, connection strings, and sensitive personal data should usually not be recorded directly and recommends sanitization, access restriction, tamper detection, monitoring, and retention-bound disposal. Source: [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html).
- **[Inference]** Full prompt-and-response logging can conflict with data minimization and secret handling. Reproducibility should use source IDs, hashes, versioned artifacts, and selectively protected evidence rather than indiscriminate content capture.

## Supply chain, installation, and updates

### Release artifacts

The distribution should provide:

- a versioned source repository and security policy;
- immutable release tags and release notes;
- signed or provenance-attested packages tied to the source and build workflow;
- checksums and a verification command that fails closed on mismatch;
- an SBOM for the CLI, bundled adapters, native dependencies, and shipped model or rule assets;
- pinned direct and transitive dependencies through lockfiles and reproducible or hermetic build goals;
- documented publisher and CI identities, protected release environments, and short-lived publishing credentials;
- a permissions/capabilities manifest whose diff is prominent in every update;
- vulnerability-reporting, patch, support, end-of-life, rollback, and compromised-release procedures.

- **[Sourced fact]** SLSA 1.2 is an approved supply-chain specification with source and build tracks, provenance, verification, and increasing assurance levels. Source: [SLSA 1.2](https://slsa.dev/spec/v1.2/).
- **[Sourced fact]** npm provenance links a package to its source and build instructions and uses Sigstore; npm explicitly says provenance does not prove that a package contains no malicious code. Source: [npm provenance](https://docs.npmjs.com/generating-provenance-statements/).
- **[Sourced fact]** SPDX 3.0 is the current published SPDX specification family on the project site and can represent BOM, provenance, integrity, licensing, and security information. Source: [SPDX specifications](https://spdx.dev/use/specifications/).
- **[Inference]** Signatures and provenance answer origin and integrity questions. They do not replace source review, behavior tests, dependency analysis, publisher security, or runtime containment.

### Installer constraints

- Explain every file, host adapter, hook, connector, executable, telemetry setting, and permission before installation.
- Default to no connectors, no write capability, no automatic repository command execution, and no raw-content telemetry.
- Merge or bridge existing agent instructions without overwriting them; show and record the diff.
- Do not modify global agent configuration when repository-scoped configuration is sufficient.
- Do not install arbitrary repo-specified packages, skills, or MCP servers as a side effect of opening the repository.
- Refuse installation from an unverified package when verification was promised; offer a documented source-build path.
- Provide a dry run and a complete uninstall that identifies retained data and credentials separately.

### Update policy

- Never execute `latest` or an unpinned remote installer for unattended production use.
- Verify update metadata, package integrity, provenance/signature, expected publisher identity, and supported schema migration.
- Show capability, connector, data-use, telemetry, and policy changes before update.
- Do not let a repository instruction change the CLI's update source or trusted publisher.
- Support pinned versions, staged rollout, compatibility checks, health monitoring, rollback, and emergency version or connector blocks.
- Protect against rollback and freeze attacks; metadata and signing keys need expiry, rotation, revocation, and recovery.
- Treat policy/rule-pack updates as security-sensitive even when they contain only Markdown or data.

- **[Sourced fact]** The Update Framework documents defenses against rollback, fast-forward, freeze, mix-and-match, and related software-update attacks. Source: [TUF security](https://theupdateframework.io/docs/security/).
- **[Sourced fact]** OpenSSF's source-control guidance recommends controls including protected branches, required review and checks, restricted workflow permissions, trusted actions, signed commits, audit review, and incident planning. Source: [OpenSSF SCM Platform Configuration Best Practices](https://best.openssf.org/SCM-BestPractices/).

## Incident response and recovery

### Incident classes

- suspected secret or token exposure;
- unauthorized local or remote read/write;
- prompt-injection success or data exfiltration attempt;
- cross-tenant or cross-workspace data exposure;
- compromised package, release identity, dependency, rule pack, connector, or model provider;
- policy bypass, approval replay, audit loss, or unexplained capability expansion;
- corrupted content decision, retrieval index, memory, evidence-source record, or governing-instrument record;
- destructive or materially incorrect content change;
- uncontrolled cost, loop, or availability failure.

### Required response capabilities

1. Disable all remote writes without waiting for a software update.
2. Revoke connector and provider credentials and invalidate active sessions.
3. Block a package version, connector, model, rule pack, or update key.
4. Stop model egress while retaining local diagnostic capability.
5. Quarantine affected caches, indexes, change plans, and artifacts by workspace.
6. Identify affected users, tenants, repositories, resources, data classes, operations, and time window from metadata-first logs.
7. Preserve necessary evidence under privacy and legal-hold rules without broadly copying sensitive content.
8. Restore repository or remote content from a known revision or compensating operation.
9. Notify the accountable security, privacy, legal, product, connector, and customer teams according to applicable obligations.
10. Rotate or recover signing and update trust when the release chain is affected.
11. Publish a clear advisory and fixed version where appropriate, including scope, indicators, containment, and upgrade/rollback instructions.
12. Record root cause, control failure, user impact, remediation, tests, and recurrence prevention.

- **[Sourced fact]** NIST SP 800-61 Revision 3, finalized in April 2025, integrates incident response across CSF 2.0 risk-management activities rather than treating response as an isolated end-stage playbook. Source: [NIST SP 800-61r3](https://csrc.nist.gov/pubs/sp/800/61/r3/final).
- **[Sourced fact]** NIST's Generative AI Profile recommends defined ownership, rehearsed incident-response plans for third-party generative AI, continuous monitoring, retrospective improvement, and alignment with applicable privacy, data-protection, and breach obligations. Source: [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1).
- **[Proposal]** Run a tabletop and a technical kill-switch/revocation drill before any connected beta and at a defined cadence thereafter.

## P0 release gates

`P0` here means a security phase-release gate (`SEC-P0`). The phase does not ship when the gate fails. A passing result establishes eligibility to offer that capability phase; it is never task authorization. Every operational action still requires an independently constructed task grant bound to the authenticated principal or workload, exact operation/resource/data boundary/environment/expiry/revocation; every applicable current connection-authorization, data-processing, durable-memory, and telemetry record or an explicit not-applicable rationale; a separate mutation/change approval for every source-of-truth content/configuration mutation or publication transaction governed by the change plane; semantic decision approval when release or enforcement depends on an approved meaning or rule; and release approval when the release policy requires residual-risk acceptance for an exact build and exposure scope. A document, design, approval, operating mode, control decision, candidate authorization, candidate-test grant, candidate evidence record, or claim of intent is not a passing gate result, and none can issue an operational task grant. `P0-G` is independent rather than sequential after `P0-F`: any operational action that launches or attaches to a process, browser, app, device, emulator, local server, build, test, or runtime instrumentation requires current P0-G for that exact profile, while model egress, connected reads, local writes, remote writes, and enforcement additionally require their own applicable gates.

### Verification-candidate evidence route (not a P0 gate or operational phase)

`verify.candidate` resolves the bootstrap problem for a new build whose P0-A/P0-G conformance evidence does not yet exist. It is off by default, disposable, isolated and synthetic-data-only. It may run only when the trusted control plane verifies both an authenticated, expiring and revocable verification-candidate authorization and a separate exact candidate-test grant; neither record is a SEC-P0 result or operational task grant.

The two candidate records must bind the exact candidate identity/version and artifact digest; toolchain versions/digests, immutable build recipe and build digest; gates under test; immutable test plan, fixture/manifest digests and executor-profile digest; exact tools, executables, immutable arguments/actions; filesystem, writable scratch, network, process/child-process and credential bounds; evidence sink, schema, integrity, access and retention; deterministic resource/cost ceilings, cancellation, incident and cleanup behavior; issue time, expiry and revocation; and an independent evaluator identity/role. Any bound-value drift denies execution or invalidates reuse.

Candidate execution emits evidence only. Its record preserves exact candidate/toolchain/recipe/build/artifact/test/fixture/executor provenance; authorization and grant IDs; planned and actual tool/process/filesystem/network/credential trace; resources; cancellation; cleanup; deviations; incidents; evidence-sink receipt/digest; and limitations. It may establish or falsify evidence relevant to P0-A and P0-G, but it is excluded from product-quality and comparative scores and cannot claim a supported profile or operational readiness.

Only a gate authority independent of the candidate runtime and implementation author may evaluate that immutable evidence and issue `pass` or `blocked` for the exact artifact/profile. Operational use then separately requires the current applicable P0 result or results and an exact operational task grant. No candidate authorization, grant, evidence, result, approval or requested mode substitutes for any connection, privacy, persistence, telemetry, semantic, mutation/change, release or operational-control record.

### P0-A — Before shipping static read-only local discovery

| Gate | Required evidence |
|---|---|
| A1. Owned threat model | Named security/privacy owners; assets, actors, boundaries, abuse cases, residual risks, and review trigger approved |
| A2. No mutation surface | Capability enumeration proves there is no file-write, shell, process, package-install, browser, connector, or remote-write tool in the runtime |
| A3. Sandboxed static discovery | Supported-platform tests show repository scripts do not execute, network is denied, resources are bounded, and the scanner remains inside the enrolled root |
| A4. Malicious-repository suite | Direct/indirect injection, Unicode, hidden text, symlink/path escape, archive/file bomb, generated-tree, malformed parser, and sensitive-file fixtures fail safely |
| A5. Data classification | User-visible data-flow disclosure, default exclusions, local-only behavior, and per-field classification are implemented and tested |
| A6. Secret safety | Seeded credentials do not appear in reports, model context, logs, errors, crash data, or support bundles; incident rotation guidance exists |
| A7. Resource bounds | File, byte, depth, time, memory, output, and cancellation limits are deterministic and tested |
| A8. Supply-chain baseline | Verified release source, integrity/provenance, SBOM, pinned lockfile, vulnerability policy, security contact, and uninstall path exist |
| A9. Truthful product claims | Documentation says exactly what is read, excluded, stored, sent, and unsupported; no claim of prompt-injection-proof, compliance, or safe writes |
| A10. Candidate-first conformance evidence | For a new artifact/profile, independently evaluated `verify.candidate` records bind and reconcile the exact candidate/toolchain/recipe/build/artifact/test/fixture/executor/evidence provenance and full trace; the candidate does not issue its own result, and gate authority records `pass` or `blocked` for only that exact artifact/profile |

### P0-B — Before any model egress or read connector

| Gate | Required evidence |
|---|---|
| B1. Processing inventory | Purpose, fields, data classes, provider/connectors/subprocessors, regions, retention, training/secondary use, deletion, and accountable owner documented |
| B2. Provider and contract decision | Deployment-specific security, privacy, IP, confidentiality, residency, support-access, and incident terms approved by appropriate owners |
| B3. Egress minimization | Capture-based tests show only selected, classified, redacted fragments leave the workspace |
| B4. Tenant isolation | Cross-workspace canaries, cache boundaries, deletion, and authorization-negative tests pass |
| B5. Connector conformance | Granular scopes, audience/resource binding, PKCE where applicable, exact redirects, no token passthrough, safe storage, revocation, SSRF defense, and retry limits tested |
| B6. Prompt-injection containment | Repo and connector injections cannot add tools/scopes, expose canaries, alter policy, or cause network/write actions; residual risk is disclosed |
| B7. Logging privacy | Event schema, redaction, access, integrity, retention, and deletion tests pass; raw content telemetry remains off by default |
| B8. Incident readiness | Write/model/connector kill switches, token revocation, affected-scope query, contacts, and tabletop evidence exist |

### P0-C — Before draft artifacts

| Gate | Required evidence |
|---|---|
| C1. Inert output | A model result cannot execute, fetch, render active content, or address an arbitrary path merely by being generated or viewed |
| C2. Typed plan schema | Strict parsing rejects unknown operations, fields, targets, variables, markup, and unsupported formats |
| C3. Provenance | Every change links to evidence-source coordinates and orthogonal observation-strength, challenge, freshness, lineage, and epistemic dimensions; current implementation occurrence where known; governing instruments; accountable owners; assumptions; model/policy versions; and uncertainty |
| C4. Output security | Context-specific validation and encoding tests cover paths, shell, URLs, Markdown/HTML, templates, localization syntax, and structured formats |
| C5. Independent state integrity | A draft remains a proposed decision until semantic decision approval; no decision state implies a delivery state; no delivery state implies an evaluation result or user outcome; moving a proposed decision into an isolated draft/nonrelease target requires separate mutation/change approval and does not approve its meaning |

### P0-D — Before local apply

| Gate | Required evidence |
|---|---|
| D1. Separate write plane | Write capability is absent until the trusted control plane independently issues a per-action task grant, and the write process remains narrower than the read process |
| D2. Independent task grant and mutation approval | Executor tests require both an independently issued task grant bound to authenticated principal/workload, exact operation, paths/resources, data boundary, environment, expiry, revocation, and policy version, and a separate authenticated mutation/change approval bound to the exact diff, base revision, target environment, and purpose; a `proposed` semantic decision may be patched only when the approval constrains it to a draft/nonrelease target, while release requires the applicable semantic decision approval; neither approval can issue or widen the grant, and replay, changed-diff, wrong-principal, wrong-resource, wrong-environment, release-of-proposed, and expired/revoked-grant tests fail |
| D3. Path and scope safety | Canonical containment, symlink/race handling, allowlists, prohibited files, and unrelated-diff checks pass on supported platforms |
| D4. Concurrency and atomicity | Expected-current-value and revision guards prevent stale or partial writes; rollback is tested |
| D5. Repository governance | Protected-branch, review, CODEOWNERS or equivalent, CI checks, and no self-approval behavior documented and verified |
| D6. Format integrity | Parser round-trip and representative framework fixtures preserve variables, branches, IDs, markup, encoding, and unrelated formatting |
| D7. Independent readback | The result is re-read and compared; write success is not conflated with build, release, or live status |

### P0-E — Before remote apply or publication

| Gate | Required evidence |
|---|---|
| E1. Operation-specific connector | No generic shell, browser, or omnibus write token where a field/resource-specific API can work |
| E2. Just-in-time task authorization | Before a short-lived write credential is issued, the executor separately verifies a passing P0-E result; an independent per-action task grant; every applicable current connection-authorization, data-processing, durable-memory, and telemetry policy-tuple record or explicit not-applicable rationale; required mutation/change approval bound to the publication transaction; semantic decision approval when releasable governed meaning is involved; and release approval when required by release policy. A proposed decision is limited to an explicitly draft/nonrelease target; the credential is constrained by the grant and revoked or expired after the transaction |
| E3. Server-side complete mediation | Downstream service validates actor, resource, tenant, operation, and scope on every call; model decision is irrelevant to authorization |
| E4. Transaction safety | Base version/ETag, idempotency, retry, partial-failure, compensation, and rate limits are tested |
| E5. Human factors | Approval UI clearly communicates target, audience, consequence, data movement, diff, uncertainty, and recovery; fatigue risks tested with people |
| E6. High-risk routing | Applicable governing instruments, accountable legal/privacy/security/accessibility/localization/medical/financial/safety/product owners, and scoped approvers are resolved separately by claim and scope |
| E7. Readback and experience verification | API result and readback are evaluation evidence; `patched`, `built`, `verified`, `released`, and `observed-live` remain distinct delivery states; locale/state checks retain method, sample, result, and limitations |
| E8. Remote incident drill | Unauthorized-write containment, token revocation, rollback/compensation, notification path, and connector disable have been rehearsed |

### P0-F — Before autonomous enforcement

| Gate | Required evidence |
|---|---|
| F1. Deterministic rule boundary | Only semantically approved, versioned, current, machine-testable rules block CI; model findings and proposed decisions remain advisory unless separately reviewed and approved for the exact enforcement scope |
| F2. No self-modification | Agent cannot change policy, rules, exceptions, baselines, approvers, severity, or its own release |
| F3. Exception governance | Exceptions exist only for deterministic rule findings explicitly designated as eligible and actually classified Medium or Low; they are authenticated, scoped, reasoned, mitigated, expiring, visible, and reviewable. Eligibility never overrides an actual High or Critical disposition. SEC-P0 failures, High/Critical findings, security/privacy/authorization/credential/isolation/provenance/integrity/supply-chain/control-plane failures, and missing or exceeded task grants are never waivable or baseline-suppressible |
| F4. False-positive evidence | Representative repository benchmark shows blocking precision acceptable to named owners and a safe appeal route exists |
| F5. Availability controls | Time/cost budgets, circuit breakers, degraded mode, and emergency bypass owned by humans are tested |

### P0-G — Before controlled runtime verification

`P0-G` governs executable observation. Static parsing and file inspection remain under `P0-A`; model egress or a read connector remains under `P0-B`. Passing either does not allow a process or browser to start. Likewise, passing `P0-G` does not allow model egress, connector access, file mutation, remote publication, or enforcement; compose it with `P0-B`, `P0-D`, `P0-E`, or `P0-F` only when the exact runtime task also needs those capabilities.

| Gate | Required evidence |
|---|---|
| G1. Exact runtime plan | The supported adapter declares the named build/environment, executable or browser/device tool, immutable command and arguments or route/action allowlist, working directory, role/locale/flags/start state, filesystem and network boundaries, data classes, credentials, captures, resource limits, teardown, and prohibited effects before execution |
| G2. Isolated executor and profile | Supported-platform tests prove unprivileged sandboxing, an ephemeral workspace/browser profile or dedicated test device, read-only source mounts by default, no ambient personal cookies/password manager/SSH agent/clipboard, no package installation under P0-G, and no arbitrary shell, browsing, download, external-protocol launch, or persistence. An exact build/test hook or fixed shell wrapper may run only when enumerated as the profiled executable with immutable arguments; any future package-install capability requires a separately defined phase/gate and grant |
| G3. Independent runtime task grant | The trusted control plane verifies an exact, current grant bound to principal/workload, executor/tool, executable and arguments or browser actions/origins/routes, build/environment/device, filesystem/network/data/credential boundary, child-process policy, expiry, cancellation, and revocation; wrong-actor, argument drift, new-origin, redirect, child-process, expired, and revoked cases deny |
| G4. Untrusted-runtime containment | Malicious repository scripts, application content, pages, service workers, downloads, links, dialogs, tool output, and child processes cannot add capabilities, reach unapproved origins/resources, expose seeded canaries, invoke OS handlers, or mutate source/remote systems. A formatter/build that can write runs against disposable scratch input; any resulting source change becomes a separate typed P0-D/E transaction rather than an incidental runtime side effect |
| G5. Credential and test-data safety | Runtime verification uses dedicated least-privilege test identities and synthetic/minimized data where possible; any necessary secret is brokered only to the exact process/origin, is absent from prompts/captures/logs, and is revoked or expires after use |
| G6. Observation integrity | Each result records build/revision, environment, tool/runtime version, route/state/role/locale/flags, start conditions, actions, timestamps, captured DOM/accessibility tree or equivalent evidence, redactions, observed failures, and limitations; runtime success cannot infer semantic approval, release, production reachability, or user outcome |
| G7. Bounds, cancellation, and cleanup | Time, CPU/memory, child-process, action, navigation, request, response, download, capture, and cost limits are deterministic; kill switch, cancellation, orphan cleanup, profile/workspace disposal, and incident evidence are tested |
| G8. Composite-capability enforcement | Tests prove that P0-G never supplies model, connector, write, publication, or enforcement authority; model/connected access requires P0-B, local mutation P0-D, remote mutation P0-E, enforcement P0-F, and every actual operation its own matching grant and applicable approvals. Runtime output may feed a later typed mutation plan, but the runtime process itself cannot perform the source-of-truth write |
| G9. Candidate-first conformance evidence | For a new executable adapter/profile, the independently evaluated candidate record reconciles immutable authorization/test-plan bindings with the actual process/browser/network/filesystem/credential trace, evidence-sink digest, cancellation and disposal; only gate authority records `pass` or `blocked` for the exact artifact/profile |

**Exit criterion:** every gate above passes on each claimed operating-system, browser, device/emulator, and runtime-adapter profile using benign and malicious fixtures. The evaluation record must reconcile the declared runtime plan, actual process/browser/network/filesystem trace, P0-G result, exact runtime task grant, captured evidence, cleanup, incidents, and residual limits. Any unenumerated executable, argument, child process, origin/navigation, network request, data or credential access, writable target, download/external-protocol launch, or persistent artifact blocks the profile.

## Verification program

### Deterministic tests

- capability/tool/credential enumeration by declared capability phase and per-action task grant; requested operating mode is checked only for intent and scope consistency;
- policy deny/allow/review tables, unknown-input failure, and policy-version rollback;
- path, symlink, race, archive, parser, encoding, and resource-limit tests;
- seeded secrets, PII canaries, cross-tenant canaries, cache purge, and log inspection;
- OAuth wrong-audience, wrong-issuer, expired, replayed, over-scoped, passed-through, redirect, state, and PKCE tests;
- SSRF, DNS rebinding, redirect chain, dangerous URL scheme, and local service probes;
- structured-output schema, sink encoding, patch parsing, base-revision, idempotency, and rollback tests;
- P0-G runtime-plan/grant reconciliation, sandbox and ephemeral-profile containment, exact executable/argument/origin/action allowlists, child-process and network negatives, personal-session/seeded-secret canaries, capture redaction, cancellation, and teardown tests;
- `verify.candidate` authorization/grant denial tests; exact candidate/toolchain/recipe/build/artifact/test/fixture/executor/evidence provenance; drift invalidation; synthetic-data containment; evidence-sink integrity; independent-evaluator separation; and proof that candidate output cannot issue P0 or operational-authority records;
- signature, provenance, SBOM, dependency, updater rollback/freeze, publisher-recovery, and uninstall tests;
- kill switch, revocation, incident query, and recovery exercises.

### Adversarial evaluation

Build malicious fixtures in at least:

- root and nested agent/content instruction files;
- source comments, UI strings, translation files, issue text, design text, CMS rich text, alt text, and accessibility labels;
- invisible Unicode, bidirectional controls, homoglyphs, encoded payloads, split instructions, and multilingual instructions;
- images, OCR, SVG, Markdown links/images, HTML, template syntax, and tool descriptions;
- model outputs that propose hidden unrelated edits, new dependencies, URLs, commands, or policy changes;
- approval screens that obscure targets, bundle actions, understate consequences, or change after approval;
- connector errors and asynchronous events that attempt to alter the tool list or session context.

### Human and organizational validation

- security architecture review before each capability phase;
- privacy impact assessment when processing can create high risk or where required;
- domain-owner review for consequential content and controlled claims;
- approval-usability research with realistic diffs and time pressure;
- independent penetration testing before connected write beta;
- incident tabletop including security, privacy, product, engineering, legal, communications, support, and connector owners;
- periodic access, scope, provider, subprocessor, retention, data-flow, dependency, and threat-model review.

- **[Sourced fact]** OWASP AISVS 1.0 describes itself as a catalogue of testable AI-security requirements, not a governance or risk-management framework, and uses risk-based verification levels. Source: [OWASP AISVS](https://github.com/OWASP/AISVS).
- **[Proposal]** Use explicit, version-qualified control mappings such as `v1.0-C…`; never say “OWASP compliant” from a self-scored Top 10 checklist.

## Metrics without unsafe incentives

Track separate signals rather than one security score:

- prohibited tool availability by declared capability phase and task grant, with requested-mode/actual-scope mismatch reported separately;
- unauthorized calls blocked and false-positive disposition;
- credential scope, lifetime, resource binding, and unused-scope rate;
- amount and classes of source data scanned, excluded, redacted, sent, cached, and deleted;
- cross-tenant and seeded-secret test escape rate;
- change-plan validation, stale-plan rejection, partial-write, rollback, and readback rates;
- P0-G runtime-plan/grant conformance; unplanned process, argument, child-process, origin, navigation, network, filesystem-write, credential, download, and persistent-artifact rates; cancellation and teardown success;
- verification-candidate authorization/grant conformance, provenance completeness, bound-value drift rejection, evidence-sink integrity, independent-evaluator separation, cancellation and disposable cleanup; reported as gate-evidence quality only and excluded from product/comparative scores;
- signed/provenance-verified release and dependency coverage;
- time to detect, disable writes, revoke credentials, identify scope, recover, and notify;
- policy, threat-model, access, connector, and provider review freshness;
- approval comprehension and error rate, not just approval completion time.

Do not optimize for number of autonomous writes, scope granted, content ingested, or approvals completed. Those metrics reward excessive agency and data collection.

## Residual risks and claims the product must not make

Even after these controls:

- prompt injection can remain possible;
- static discovery can miss runtime, generated, remote, hidden, or unsupported content;
- secret and PII detection can miss novel or context-dependent material;
- signed software can still be malicious or vulnerable;
- approval can still be mistaken or manipulated;
- source owners and legal applicability can remain ambiguous;
- model and connector providers remain external dependencies;
- a compromised endpoint with the user's privileges can undermine local controls;
- an API write and successful readback do not prove correct user experience or live release.

Therefore the product must not claim:

- “prompt-injection proof,” “safe by AI,” or “zero data risk”;
- universal legal, regulatory, privacy, security, or accessibility compliance;
- that read-only research validates future writes;
- that an authenticated user is authorized for every connected resource;
- that a model's confidence, rationale, or refusal is an authorization decision;
- that signatures or provenance prove code is benign;
- that redaction or detection guarantees no sensitive data leaves the system;
- that connector success establishes decision approval, advances delivery beyond the observed write/readback evidence, or proves a user outcome.

## Decisions this research supports

1. The initial executable wedge should be **local, static, read-only discovery** with no connectors, process execution, or automatic model egress.
2. Model use should be a visible, separately governed boundary after classification and minimization.
3. Read and write must use different capability sets and credentials; write tools must be absent from read sessions.
4. Repository and connector material must be provenance-labeled untrusted data. Agent instruction files remain evidence sources until a named accountable owner separately records any applicable governing-instrument role; neither role grants system capability or approval.
5. The deterministic policy layer, approval verifier, credential broker, patch validator, and audit sink form a trusted control plane outside the model.
6. Connection authorization, connector disconnect/revocation, data-processing authorization and record, semantic decision approval, mutation/change approval, release approval, publication execution, durable-memory decision, and telemetry decision require separate decisions or control records; none substitutes for another.
7. The public CLI/skill release needs verifiable provenance, an SBOM, permission manifests, safe updates, and a security response process.
8. Security and privacy tests belong in the product benchmark from the first executable release, not after content-quality evaluation.
9. Runtime verification must remain unavailable until P0-G passes for the exact supported adapter profile; it is not a hidden extension of static discovery or write capability.
10. Before that operational result exists, `verify.candidate` may generate candidate-first P0-A/P0-G evidence only under its separate authenticated authorization and exact test grant; independent gate authority alone issues the result, and operational use still requires a separate exact task grant.

## Open research and owner decisions

- Which first operating systems, filesystems, package manager, and sandbox primitives will be supported?
- Will inference be local, remote, or selectable, and which provider data terms and regions are acceptable?
- Which repository file types and frameworks are in the first static-parser allowlist?
- Which exact connector is first, and can it issue field/resource-scoped read and write tokens?
- What organization and workspace identity model exists for personal, team, enterprise, and CI use?
- Which content and security materials are evidence sources, which are governing instruments for each claim and scope, who is accountable for each class, and which named roles may approve exact decision versions?
- Which data classes are prohibited versus supported under stricter deployment profiles?
- What storage, analytics, crash reporting, support bundle, and durable-memory features exist?
- What signing, provenance, SBOM, updater, vulnerability-disclosure, and maintenance infrastructure will the open project operate?
- Which external security review, penetration test, privacy review, and incident-response partners are needed before connected or write-capable releases?

Detailed source records and limitations are in [security-source-notes.md](../sources/security-source-notes.md).
