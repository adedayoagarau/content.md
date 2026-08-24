---
title: "content.md universal content-design agent architecture"
status: approved-for-implementation-planning
created: 2026-08-20
updated: 2026-08-20
approved: 2026-08-20
approval_basis: explicit-user-approval-in-task
design_id: CONTENTMD-UNIVERSAL-AGENT-DESIGN-0.2
supersedes_design_id: CONTENTMD-UNIVERSAL-AGENT-DESIGN-0.1
product_name: content.md
repository_contract_name: CONTENT.md
cli_name: contentmd
architecture_class: portable-local-first-with-adaptive-host-runtime
implementation_status: foundation-retained-live-intelligence-and-learning-not-started
authority_effect: implementation-planning-only
---

# content.md universal content-design agent architecture

## 1. Product definition

`content.md` is a portable content-design operating system for software products. It understands a product, researches its category, models its journeys and information architecture, creates and critiques product language, proposes governed changes, verifies implementation, and learns from human decisions and observed outcomes.

It is not a copy linter, prompt collection, brand-voice chatbot, CMS, or autonomous publisher. It is the content-design owner inside a product-building workflow.

The durable responsibility split is:

| Participant | Primary responsibility |
| --- | --- |
| Coding agent | Application behavior, components, APIs, tests, and implementation |
| Design system or `DESIGN.md` | Visual language, interaction structure, layout, and interface coherence |
| `content.md` | Product meaning, information architecture, messaging, terminology, UX writing, voice, content quality, provenance, and content decisions |
| Product and organization | Authoritative facts, governing policies, accountable ownership, approvals, release, and publication |

`content.md` owns the process and its structured memory. It does not acquire authority merely because it generated, stored, or recommended something.

This design supersedes the narrower idea that the product is primarily a static harness. The existing research, fixture, and simulator remain evidence and evaluation infrastructure. The product target is the complete content-design lifecycle described in the [end-to-end workflow](../../../research/02-workflow/end-to-end-workflow.md).

## 2. Outcomes

The system succeeds when a person or agent can adopt it in an unfamiliar product and use it to:

1. understand what the product does, for whom, and under which constraints;
2. inventory and model user-facing content across states, channels, locales, and implementations;
3. identify missing, contradictory, stale, inaccessible, misleading, generic, or poorly structured content;
4. design information architecture, message architecture, terminology, voice, patterns, journeys, and content strategy;
5. write and rewrite complete contextual experiences rather than isolated strings;
6. explain each proposal using product evidence, content principles, applicable patterns, and explicit uncertainty;
7. preview, approve, apply, verify, roll back, and audit changes through host-specific adapters;
8. learn from accepted edits, rejected edits, rationale, research, experiments, incidents, and product outcomes;
9. transfer patterns from other products without copying their expressions or treating category convention as universal truth; and
10. work locally without requiring a hosted service, while supporting an optional durable collaborative runtime.

## 3. Non-goals and prohibited claims

The system must not claim that it:

- proves who or what authored text from stylistic signals;
- derives an approved brand voice from competitors or existing strings alone;
- replaces product, legal, policy, accessibility, localization, research, security, or release authorities;
- converts repeated wording into canon without a scoped decision;
- treats implementation, approval, release, observation, and effectiveness as one state;
- makes one scalar score compensate for untruthfulness, deception, invalid consent, inaccessibility, unsafe action, or loss of autonomy;
- can safely publish or mutate a source merely because the requested operating mode is `apply` or `enforce`; or
- continuously retrains itself on private or organizational data without a declared data and learning policy.

It may detect observable qualities associated with weak or generic machine-generated writing—repetition, inflated abstraction, unsupported enthusiasm, vague value claims, uniform cadence, empty transitions, and low contextual specificity. It reports those qualities, not an authorship verdict.

## 4. Architectural principles

1. **Portable core, optional infrastructure.** The content model and workflows run locally and do not depend on Cloudflare, one model provider, one design tool, or one repository host.
2. **Context before generation.** The system builds a product, journey, state, audience, evidence, and authority model before it writes.
3. **Message before expression.** It separates the semantic content decision from each wording, locale, channel, surface, component, and occurrence.
4. **Deterministic facts, probabilistic advice.** Parsers, identity, policies, hard rules, references, hashes, and capability boundaries are deterministic. Models propose, classify, critique, and rank within those constraints.
5. **Research is evidence, not mimicry.** Competitor and category observations become bounded pattern records with provenance, transfer conditions, and counterexamples.
6. **Learning is promotion, not self-modification.** New knowledge or model behavior moves through candidate, evaluation, approval, version, release, monitoring, and rollback states.
7. **Local data ownership.** Project contracts and memory remain exportable, inspectable, and usable without a hosted account.
8. **Diff-first action.** Every change is previewable. Sensitive or source-of-truth writes require explicit approval and independent verification.
9. **Most restrictive policy wins.** Organization, project, surface, domain, locale, and task policies compose without a weaker layer widening a stronger one.
10. **Useful without ceremony.** Governance scales with consequence. Low-risk private drafting remains fast; high-risk publication remains controlled.

## 5. Product shape

The implementation is a TypeScript monorepo with an open repository contract, local CLI, adapter SDK, optional workbench, and host-adaptive runtime profiles. It fits the runtime a project already uses when a conforming adapter exists; otherwise it remains fully usable through the local runtime.

```text
packages/
  core/                 # ontology, identity, content graph, workflows
  schemas/              # canonical JSON Schema 2020-12 contracts
  cli/                  # local command-line application
  agent/                # orchestration and specialist-role runtime
  model-provider-sdk/   # provider-neutral model and embedding interfaces
  governance/           # policies, capabilities, approvals, audit
  memory/               # event log, projections, retrieval, provenance
  learning/             # candidates, datasets, ranking, promotion, rollback
  research/             # browser/source capture and pattern synthesis
  writer/               # strategy, drafting, rewriting, critique
  evaluation/           # deterministic and model/human evaluation harness
  adapter-sdk/          # stable read/write/verify adapter interfaces
  adapter-filesystem/   # repositories and local files
  adapter-web/          # public browser research
  adapter-mcp/          # MCP server/client surfaces
  adapter-hosts/        # AGENTS/Claude/Codex/Gemini/Copilot bridges
  runtime-sdk/          # portable durability, jobs, approval pause, progress, export interfaces
  runtime-local/        # default local Node and SQLite runtime
  runtime-cloudflare/   # optional Agents SDK and Workflows adapter
  workbench/            # optional local/hosted review interface
tools/
  voice-tone-simulator/ # existing bounded statistical subsystem
```

The canonical data contract is JSON Schema 2020-12. Runtime TypeScript types are generated from or checked against those schemas. Unknown fields, duplicate identifiers, invalid references, version mismatch, and ambiguous unions fail closed.

The protocol, canonical schemas, local core, CLI, and adapter SDK target Apache-2.0 distribution so an individual or organization can adopt, inspect, extend, self-host, and leave without a hosted-service dependency. Optional hosted or domain packages must not make the portable core unusable.

Package and runtime versions are frozen in the implementation plan after the local environment and current upstream releases are verified. This design does not silently pin an unverified version.

## 6. Repository adoption contract

The product name is `content.md`. The repository contract is uppercase `CONTENT.md` for filesystem consistency. The CLI is dot-free `contentmd`.

```text
CONTENT.md
.contentmd/
  manifest.json
  product/
  audiences/
  journeys/
  ia/
  messages/
  voice/
  terminology/
  patterns/
  research/
  evidence/
  decisions/
  evaluations/
  governance/
  adapters/
  records/
```

`CONTENT.md` stays concise and human-readable. It declares product scope, users, jobs, content principles, sources of truth, operating boundaries, known risks, review routes, and links to structured records. Generated inventories and model state do not enter its always-loaded body.

### 6.1 Existing-product adoption

`contentmd init` inspects only the authorized project scope for existing product context and agent instructions, including:

- `PRODUCT.md`, product briefs, architecture decisions, and service documentation;
- `DESIGN.md` and design-system artifacts;
- `AGENTS.md`, `CLAUDE.md`, `CODEX.md` when a project uses that name, native Codex instructions, Gemini context, Copilot instructions, and installed skills;
- code, routes, components, message catalogs, localization resources, schemas, tests, and content configuration; and
- declared Figma, CMS, support, analytics, policy, or research connectors.

Existing files are evidence sources. They do not become content authority merely because they are present. The installer proposes a minimal host bridge rather than replacing existing instructions.

### 6.2 No existing product contract

When no adequate product or governance contract exists, the initializer creates a proposed starter contract and a governance bootstrap:

- local product scope and excluded paths;
- detected surfaces and content sources;
- provisional product, audience, and journey questions;
- a default low-risk local-drafting policy;
- unresolved product facts and owner roles;
- preview and rollback rules;
- an explicit prohibition on external publication until authority is supplied; and
- a suggested first content audit.

This is how `content.md` takes operational ownership of content work without pretending to own organizational facts or publication rights.

### 6.3 Trigger reminders

Host bridges route relevant tasks to the installed content-design skill. When a user or another agent begins material content work without the content contract loaded, the bridge may issue one concise, dismissible reminder per task:

> Run `/contentmd` before changing user-facing content so the project context, content decisions, and review rules are applied.

The reminder must not interrupt unrelated engineering work or repeat after acknowledgement.

## 7. Core content model

The core retains the distinctions established in the [candidate system model](../../../research/08-synthesis/candidate-system-model.md):

- product, service, audience, actor, job, journey, stage, event, state, behavior, consequence, recovery, channel, surface, route, component, locale, market, jurisdiction, and risk;
- semantic message, expression slot, expression version, implementation occurrence, variable, term, content pattern, information object, navigation relation, and content API;
- evidence source, evidence record, governing instrument, research finding, pattern observation, decision, approval, delivery, evaluation, outcome, incident, and learning candidate; and
- tool, adapter, capability, policy, grant, change transaction, release, verification, and audit event.

Every durable object has a stable identifier, schema version, object version, content digest, scope, provenance, and lifecycle state. Evidence condition, semantic decision, approval, delivery, and evaluation remain independent.

The graph is a projection over records, not the only storage representation. It supports relationships such as `realizes`, `occurs_at`, `scoped_to`, `supported_by`, `disputed_by`, `governed_by`, `approved_by`, `implemented_by`, `verified_by`, `evaluated_by`, `supersedes`, `derived_from`, `contrasts_with`, and `learned_from`.

## 8. Content-design lifecycle

The orchestrator implements the existing fifteen-stage lifecycle as a resumable workflow:

```text
mandate and risk
  -> problem and outcomes
  -> users, domain, and behavior
  -> inventory and audit
  -> journey, IA, and content model
  -> strategy and constraints
  -> hypotheses and acceptance criteria
  -> contextual design and writing
  -> critique and specialist review
  -> user evaluation
  -> semantic decision and approval
  -> implementation
  -> built verification
  -> release and outcome evaluation
  -> maintenance, learning, migration, or retirement
```

Each task can enter at the appropriate stage, but the orchestrator records skipped prerequisites and their consequences. A microcopy request can remain lightweight; it cannot silently bypass missing product facts or high-consequence controls.

## 9. Agent roles

The first implementation uses logical specialist roles behind one orchestrator. Deployment may later map them to local functions, model calls, Cloudflare sub-agents, or external MCP tools without changing their record contracts.

| Role | Responsibility | Prohibited shortcut |
| --- | --- | --- |
| Orchestrator | Classify engagement, compile context, plan stages, route work, preserve state | Treat a model plan as authorization |
| Product interpreter | Reconstruct product behavior, users, jobs, states, constraints, and unknowns | Invent undocumented behavior |
| Researcher | Collect primary, product, competitor, category, user, and domain evidence | Convert search results or competitors into canon |
| Information architect | Model concepts, objects, hierarchy, navigation, findability, and content relationships | Treat labels as the whole IA |
| Content strategist | Define outcomes, message architecture, principles, patterns, channel strategy, and measurement | Optimize wording before strategy |
| UX writer | Produce contextual value propositions, naming, taglines, interface copy, errors, recovery, notifications, and channel expressions | Write isolated strings without state or consequence |
| Voice and tone critic | Evaluate voice dimensions, situational tone, terminology, mechanics, distinctiveness, and category fit | Claim one universal industry voice |
| Accessibility and cognition critic | Review comprehension, cognitive load, sequencing, nonvisual meaning, autonomy, and influence risk | Diagnose an individual or use vulnerability for persuasion |
| Localization critic | Review message structure, variables, locale, culture, directionality, and translatability | Translate source structure blindly |
| Evidence critic | Verify claims, sources, freshness, scope, conflict, and uncertainty | Approve content because a source exists |
| Governance steward | Compose policy, evaluate capabilities, route approvals, create audit events, and fail closed | Let trust or success history grant authority |
| Evaluator | Run deterministic, model, expert, user, outcome, drift, and regression evaluation | Collapse quality into one score |
| Memory curator | Deduplicate, scope, supersede, expire, retrieve, and export durable knowledge | Store hidden unreviewable memory |
| Learning steward | Create, evaluate, promote, monitor, and roll back learning candidates | Deploy self-modification without evidence |

## 10. Research and category learning

The research subsystem supports public web, automated browser, separately user-authorized desktop Computer Use, repository, document, design, and connected-source adapters. Every acquisition states the access mode, scope, time, source, locator, rights boundary, capture method, and limitations.

Competitor research produces a pattern corpus, not a swipe file. Each `ContentPatternRecord` contains:

- the user or product problem;
- journey, state, channel, surface, audience, locale, market, industry, and risk context;
- observed structural pattern and mechanism;
- minimal cited examples and counterexamples;
- evidence quality and freshness;
- adoption prevalence without treating prevalence as quality;
- observed or claimed outcomes, kept distinct;
- failure modes, dark-pattern or manipulation risks;
- transfer conditions and non-transferable details;
- similarity and rights controls; and
- candidate implications for the current product.

The writer may retrieve and abstract patterns. It must not reproduce a competitor's protected expression, distinctive campaign line, or unsupported product claim.

## 11. Writing and critique

Writing begins from a `ContentTaskPacket` containing product behavior, audience/job, journey/state, intended outcome, semantic message, required facts, prohibited claims, interaction consequence, recovery, channel, locale, voice profile, terminology, risk, evidence, decision status, and acceptance criteria.

The writer generates alternatives across the necessary level:

- product narrative, positioning, value proposition, naming, and tagline;
- information architecture, navigation, taxonomy, and labels;
- journey and screen-level message architecture;
- components, microcopy, instructions, errors, confirmations, status, recovery, notifications, email, SMS, support, and accessibility expressions; and
- maintenance, migration, retirement, and incident language.

Critique returns a multi-dimensional result rather than one magic score. Hard outcomes include truthfulness, non-deception, material comprehension, valid consent, accessibility, autonomy, and safety. Advisory dimensions include relevance, clarity, usefulness, concision, coherence, voice, situational tone, distinctiveness, trust, scannability, actionability, localization readiness, and category fit.

The response contains evidence, rationale, uncertainty, alternatives, expected trade-offs, and a previewable diff. The system can say `unknown`, `unsupported`, `needs evidence`, or `needs specialist review` instead of manufacturing a polished answer.

## 12. Governance and capability architecture

Governance is separate from agent reasoning and model output.

Policies are serializable, composable, versioned, and scoped to organization, project, domain, surface, locale, task, adapter, data, model, and action. Composition uses most-restrictive-wins behavior. A policy decision is `allow`, `deny`, or `review` with reason codes and exact conditions.

Every external or mutating operation passes:

```text
request
  -> semantic intent and risk classification
  -> policy composition
  -> current capability and scope check
  -> data, connector, memory, and telemetry dispositions
  -> human approval when required
  -> tool execution
  -> independent readback or verification
  -> append-only audit event
```

Operating modes remain `discover`, `advise`, `draft`, `apply`, and `enforce`. Modes describe intent; they do not grant capabilities.

The policy engine defines tool allowlists, denylists, resource ceilings, rate limits, input/output data classes, egress, retention, expiry, revocation, approval requirements, and rollback. Errors fail closed.

Historical reliability can help select a model, critic, or review depth. It cannot authorize a tool, waive a rule, approve a claim, publish content, or reduce a control by itself.

Audit records are append-only, content-addressed, scoped, exportable, and privacy-minimized. Raw private content is excluded unless the exact evidence purpose requires it.

### 12.1 Governance-pattern disposition

| Governance pattern | Design disposition |
| --- | --- |
| Policy as configuration | Required. Policies are typed, versioned project artifacts rather than prompt prose or hard-coded exceptions. |
| Most-restrictive composition | Required across organization, project, domain, surface, locale, task, adapter, model, and action scopes. |
| Semantic intent and risk classification | Required before tool selection; it routes policy and review but cannot authorize execution. |
| Tool-level enforcement | Required at the adapter boundary as well as the orchestrator boundary so a model cannot bypass policy by selecting a lower-level tool. |
| Rate and resource limits | Required per task and adapter, including calls, bytes, time, records, model tokens, browser actions, and retry ceilings. |
| Human approval | Required according to consequence and action; approval is typed, scoped, current, and distinct from the agent's recommendation. |
| Historical trust or reliability | Advisory routing evidence only. No score grants authority or bypasses current policy. |
| Append-only audit | Required for policy decisions, tool attempts, approvals, writes, verification, learning promotion, model changes, and rollback. |
| Fail-closed errors | Required whenever policy, identity, scope, freshness, revocation, data disposition, or required verification cannot be established. |

## 13. Recursive learning and machine learning

### 13.1 Memory planes

Learning uses four independent memory planes:

1. **Evidence memory** — observations, sources, scope, freshness, conflicts, and uncertainty.
2. **Decision memory** — proposals, alternatives, rationales, approvals, rejections, edits, supersession, and responsible roles.
3. **Pattern memory** — reusable mechanisms, applicability, examples, counterexamples, and transfer limits.
4. **Outcome memory** — implementation verification, user evidence, product outcomes, regressions, incidents, and confounders.

Memory scopes are `task`, `personal`, `project`, `organization`, and `public`. Promotion never widens scope automatically. Private material cannot train a broader model without an explicit learning-data decision.

### 13.2 Learning loop

```text
observation
  -> structured candidate
  -> deduplication and provenance check
  -> hypothesis and expected benefit
  -> offline or shadow evaluation
  -> human review
  -> scoped promotion decision
  -> immutable version
  -> monitored use
  -> confirm, narrow, supersede, or roll back
```

Recursive learning updates retrievers, rankings, pattern applicability, critique calibration, and model adapters. It never rewrites the immutable event history or directly edits its governing policy.

### 13.3 ML progression

| Stage | Capability | Entry evidence |
| --- | --- | --- |
| L0 | Deterministic rules and explicit project records | Schema and rule tests |
| L1 | Retrieval over approved evidence, decisions, patterns, and examples | Provenance, scope, freshness, and retrieval evaluation |
| L2 | Learned ranking from accepted, edited, rejected, and pairwise choices | Sufficient scoped labels, held-out evaluation, bias and leakage checks |
| L3 | Project or organization preference model | Data permission, stable rubric, qualified review, rollback, drift monitoring |
| L4 | Optional fine-tuned writer or critic adapter | Independent benchmark improvement, privacy/rights review, safety evaluation, release decision |
| L5 | Outcome-aware policy recommendations | Causal or appropriately bounded outcome evidence; never automatic policy promotion |

Initial learning is retrieval-first. The first vertical slice records feedback needed for later ranking but does not pretend a small number of accepted edits is a trained voice model.

### 13.4 Better-writer objective

The explicit goal is to become a better writer over time. The system improves when it becomes more contextually correct and useful, not merely more similar to prior copy. Evaluation tracks:

- hard-rule pass and refusal correctness;
- factual and behavioral accuracy;
- task completion and recovery support;
- comprehension and accessibility;
- human preference with reasons and abstentions;
- edit distance between proposal and accepted expression;
- novelty without category alienation;
- voice fit without stereotype or imitation;
- localization and cross-channel integrity;
- support burden, error, abandonment, trust, and other scoped outcomes; and
- regression, incident, and rollback rates.

## 14. Storage and synchronization

The canonical local store combines:

- repository-tracked contracts and approved records under `.contentmd/`;
- a local SQLite event store for working state, indexes, and materialized graph views;
- content-addressed blobs for explicitly retained evidence; and
- exportable canonical JSON Lines for audit, migration, and independent verification.

The repository never needs to commit raw private memory, credentials, transient model context, or large captures. `.contentmd/manifest.json` declares which paths are tracked, local-only, ignored, encrypted, or externally managed.

The optional hosted runtime synchronizes immutable events and approved projections, not an opaque model memory blob. Conflicts are resolved through versioned records, not last-write-wins replacement of decisions.

## 15. Host-adaptive runtime boundary

`content.md` does not require a project to adopt a new application runtime. Read-only detection may identify the project's existing execution environment, state store, job system, real-time channel, deployment platform, and package constraints. Detection produces evidence and an integration proposal; it never installs dependencies, creates infrastructure, deploys, or migrates state.

Every runtime profile implements the same portable contracts for event persistence, jobs, scheduling, approval pauses, progress, synchronization, export, health, and cleanup. A profile declares unsupported capabilities explicitly, and core workflows fail closed or use a declared local fallback rather than simulating durability. The local Node and SQLite profile is always available and remains the reference implementation.

Runtime bindings declare exact consistency, transaction, idempotency, identity, authentication, secret, retry, retention, telemetry, replica, export, and cleanup semantics. Durable project memory is canonical-first: bytes produced in a hosted profile remain an ephemeral uncommitted preview until an adopter-controlled canonical replica stores and acknowledges the event plus its complete referenced-artifact closure. Only then may the hosted profile persist a replaceable durable replica. Synchronization uses idempotent content-addressed events, ordered checkpoints, receipts, fork detection, explicit conflict records, and independent verification; it never relies on last-write-wins for decisions or authority.

Supported projects may embed `content.md` in their existing runtime, run it as a local sidecar, or connect to a separately deployed service. Selection belongs to the adopter and is recorded in a versioned runtime-binding decision. Organization and project policy may forbid an otherwise compatible profile. No runtime adapter may widen model, data, connector, write, publication, or learning authority.

### 15.1 Cloudflare Agents SDK profile

Cloudflare is one optional high-capability deployment profile, not a core dependency or preferred migration target.

The hosted profile uses:

- one durable Agent instance/shard per enrolled workspace or project, kept separate from authenticated principal and workload identity;
- Durable Object SQLite for synchronized working state and indexes;
- callable RPC for typed workbench actions;
- WebSockets for live progress and review updates;
- Workflows for research, audits, migrations, evaluation, and approval-paused change operations;
- scheduling for freshness, drift, and review reminders;
- React hooks for the workbench client; and
- MCP clients or a stateless MCP server for tool and host integration.

Long-running or effectful work uses Workflows because steps can retry, persist progress, wait for external events, and pause for approval. The Agent handles shard routing, bounded conversation state, replicated current-project projections, and client communication; authenticated human and workload identity remain separate inputs to authorization.

New MCP server work uses `createMcpHandler()` rather than the legacy stateful `McpAgent` path. Current upstream contracts are rechecked and pinned during implementation.

No Cloudflare state is the sole copy of a project contract, approval, or learning dataset. Every durable hosted record remains exportable and verifiable locally.

### 15.2 Agents SDK capability disposition

| Current SDK capability | content.md use |
| --- | --- |
| Persistent Agent instance and SQLite state | Adopt for optional hosted workspace state and projections; instance names are routing identities, not authentication, and the exportable event contract remains portable. |
| Callable RPC | Adopt for typed workbench commands after policy and identity checks. |
| Scheduling | Adopt for freshness, drift, review, evaluation, and approved research reminders. |
| Workflows | Adopt for durable multi-step research, migration, evaluation, and change operations with explicit approval pauses. |
| HTTP and WebSockets | Adopt for authenticated API access, live progress, collaboration, and resumable workbench sessions. |
| React client hooks | Adopt in the optional workbench; not required by the CLI or core. |
| Human-in-the-loop APIs | Required for effectful or review-gated workflow steps; timeout and rejection fail closed. |
| Resumable streaming | Adopt for long agent responses and reconnecting clients without making partial text a decision record. |
| MCP client | Adopt as a governed connected-tool adapter. Each server receives its own connection, data, tool, and action scope. |
| Stateless MCP server | Adopt to expose stable content.md operations to compatible hosts through the current `createMcpHandler()` path. |
| Sub-agents and agent tools | Supported in hosted deployments after the one-orchestrator contracts are proven; parent policy gates every child and child tool. |
| Browser agents and WebMCP | Candidate adapters for authorized public research and browser-side product evidence; not a core dependency. |
| Observability | Adopt with metadata minimization, typed events, retention limits, and no raw content by default. |
| Email and voice | Not core v1 capabilities. They may later become content-channel adapters under the same evidence and governance contracts. |
| Payments and x402 | Excluded from the content-design core. Any future commercial integration remains outside content authority. |
| Code Mode and sandboxed generated execution | Excluded from v1. Generated code execution requires a separate threat model, capability profile, evaluation, and release decision. |

## 16. Adapter SDK

Every adapter declares:

- adapter ID, version, supported operations, host versions, and data classes;
- discovery roots and exact resource scopes;
- authentication and connection requirements;
- read, draft, write, publish, verify, rollback, and cleanup capabilities;
- canonical input and output schemas;
- idempotency and conflict behavior;
- provenance, capture, retention, and telemetry behavior;
- deterministic and model-assisted behavior boundaries; and
- conformance fixtures and failure codes.

Initial adapters are:

1. filesystem and common web-application source files;
2. common JavaScript/TypeScript UI strings and localization catalogs;
3. host-instruction bridges for Codex, Claude, AGENTS-compatible tools, Gemini, and Copilot;
4. public browser research with evidence receipts;
5. MCP server and client surfaces; and
6. generic patch preview and independent readback.

Figma, CMS, localization platform, analytics, support, experiment, and publication adapters follow the same contract and are separate packages.

## 17. Command-line experience

```text
contentmd init                adopt or bootstrap a project
contentmd doctor              verify contract, host bridges, adapters, and permissions
contentmd discover            inventory content and implementation occurrences
contentmd model               build or update journeys, IA, messages, and graph projections
contentmd research            collect scoped product, user, competitor, and domain evidence
contentmd strategy            create or revise content strategy and message architecture
contentmd draft               create contextual content alternatives
contentmd review              run hard rules and specialist critiques
contentmd rewrite             propose contextual rewrites for selected findings
contentmd diff                show content and decision changes
contentmd apply               execute only an approved change transaction
contentmd verify              compare intended and implemented content in context
contentmd learn               inspect learning candidates and promotion status
contentmd memory              search, explain, export, expire, or supersede memory
contentmd eval                run deterministic, model, human, or benchmark evaluation
contentmd serve               start the optional local workbench
contentmd connect             configure an adapter without embedding secrets in the contract
contentmd uninstall           preview and remove only installer-owned artifacts
```

Commands support human-readable output and versioned JSON output. Mutation commands default to preview. Exit statuses distinguish completed, findings present, blocked by evidence, denied by governance, invalid input, unsupported capability, and internal failure.

## 18. Workbench

The optional workbench makes the same contracts visible rather than inventing a second product model. Primary views are:

- project understanding and open questions;
- journey, IA, message, expression, and occurrence graph;
- inventory and content health by context;
- research and category-pattern library;
- strategy and writing studio;
- finding, rewrite, and contextual diff review;
- decision, approval, implementation, verification, and outcome history;
- learning candidates, model versions, evaluation, and rollback; and
- adapters, permissions, active operations, and audit events.

The workbench must expose why the system believes something, which source or decision supports it, what remains uncertain, what it proposes to do, and what authority is missing.

## 19. Failure and refusal behavior

The system returns typed, actionable failure states. It does not continue with plausible defaults when a missing value would change meaning, risk, scope, or authority.

Examples include:

- `product_behavior_unknown`;
- `authoritative_fact_missing`;
- `message_context_incomplete`;
- `source_conflict`;
- `pattern_transfer_unsupported`;
- `voice_profile_unapproved`;
- `locale_review_required`;
- `high_risk_specialist_review_required`;
- `learning_data_not_authorized`;
- `model_output_not_admissible`;
- `change_approval_missing`;
- `adapter_capability_denied`;
- `verification_incomplete`; and
- `rollback_required`.

Refusals preserve completed safe evidence and provide the smallest next action that can resolve the blocker.

## 20. Evaluation strategy

Evaluation is layered:

1. schema, identity, reference, hash, and policy conformance;
2. deterministic discovery, hard-rule, diff, and adapter tests;
3. synthetic adversarial and state/channel/locale fixtures;
4. model-output quality, refusal, provenance, leakage, and prompt-injection evaluation;
5. qualified content-designer review;
6. representative-user comprehension, task, accessibility, and trust evaluation;
7. implementation and release verification; and
8. longitudinal product outcomes, drift, incidents, and maintenance.

The existing voice/tone simulator remains available for measurement-design evaluation. It does not substitute for product content, expert, user, or outcome evidence.

Every agent role has a capability-specific evaluation set. A system-wide scorecard preserves hard failures, individual dimensions, uncertainty, abstentions, denominators, and scope. Release decisions do not depend on a universal scalar.

## 21. First end-to-end vertical slice

The first retained implementation proves the complete local value loop on an ordinary synthetic web application:

1. `contentmd init` creates a valid `CONTENT.md` and `.contentmd/` contract without overwriting host files;
2. a host bridge is previewed and installed only after confirmation;
3. `discover` extracts representative React/HTML strings, accessibility labels, metadata, routes, and localization entries with exact coordinates;
4. `model` constructs product questions, journey/state context, IA, messages, expressions, and occurrences;
5. `research` ingests a small frozen public pattern packet through the same provenance contract used by browser research;
6. `review` detects factual, state, terminology, accessibility, voice, generic-writing, IA, and recovery issues;
7. `strategy`, `draft`, and `rewrite` create a value proposition, message hierarchy, navigation/content recommendations, and contextual microcopy alternatives;
8. the workbench or CLI presents evidence, rationale, uncertainty, and diffs;
9. accepted, edited, rejected, and abstained decisions are recorded;
10. `apply` changes only an approved fixture target and `verify` independently reads back the result;
11. `learn` creates scoped retrieval and ranking candidates from feedback without promoting them automatically; and
12. a clean rerun is deterministic for all non-model planes and shows no unauthorized network, file, or publication effect.

The slice is not complete if it only scans strings, produces prose, or demonstrates chat. It must close the context-to-learning loop.

## 22. Delivery decomposition

The program is divided into independently reviewable subprojects:

1. **Foundation:** monorepo, schemas, event store, content graph, CLI shell, fixtures, and test harness.
2. **Adoption:** `CONTENT.md`, initializer, doctor, host bridges, trigger reminder, uninstall, and compatibility tests.
3. **Content intelligence:** discovery adapters, context compiler, IA/message graph, deterministic review, and reports.
4. **Content creation:** strategy, drafting, rewriting, critique, diff, decision capture, and model-provider abstraction.
5. **Governed action:** policy composition, capability checks, approvals, patch apply, readback, rollback, and audit.
6. **Research:** browser/public-source acquisition, product-pattern records, rights controls, category synthesis, and transfer evaluation.
7. **Memory and learning:** event memory, retrieval, feedback, learning candidates, evaluation, promotion, monitoring, and rollback.
8. **Workbench:** local UI, live progress, graph, writing, review, decisions, learning, and adapter control.
9. **Adaptive runtimes:** portable runtime SDK, local reference profile, host detection, conformance, and optional Cloudflare Agents SDK, Workflows, sync, scheduling, MCP, identity, and hosted operations.
10. **Ecosystem:** Figma, CMS, localization, analytics, support, experiments, domain packs, and external model adapters.

Each subproject receives its own implementation plan and acceptance evidence. No subproject may redefine the shared identities, authority boundaries, or learning lifecycle privately.

## 23. Design acceptance criteria

This design is ready for implementation planning when the user confirms that:

- `content.md` is an independent, universally adoptable product;
- the portable TypeScript core is authoritative, runtime selection adapts to the adopter's codebase, and Cloudflare is optional;
- the repository artifact is `CONTENT.md` with structured `.contentmd/` data;
- the system covers research, IA, strategy, writing, critique, governance, application, verification, maintenance, and learning;
- content governance bootstraps when absent but remains proposed until the project supplies actual authority;
- browser and computer-use research are adapters with evidence and privacy boundaries;
- recursive learning uses scoped memory, candidate evaluation, promotion, monitoring, and rollback rather than uncontrolled self-modification;
- the first vertical slice closes the full context-to-learning loop; and
- later integrations, including Carter, are consumers rather than architectural dependencies.

## 24. Decisions carried into implementation planning

The following are fixed by this design if approved:

1. Product name `content.md`, repository contract `CONTENT.md`, CLI `contentmd`.
2. TypeScript portable core and adapter SDK.
3. Canonical JSON Schema 2020-12 data contracts.
4. Local-first execution and exportable memory.
5. A host-adaptive runtime SDK with a local reference profile and optional Cloudflare Agents SDK and Workflows adapter.
6. One orchestrator with logical specialist roles before any distributed-agent optimization.
7. Retrieval-first learning, with preference ranking and fine-tuning gated by evidence.
8. Policy and authority independent from model reasoning and historical reliability.
9. Diff-first, approval-aware, independently verified writes.
10. The complete content-design lifecycle as product scope.

Implementation planning must still verify and pin runtime versions, dependencies, licensing, package distribution, model-provider contracts, storage libraries, browser tooling, supported host versions, and the exact first synthetic application. Those are implementation inputs, not unresolved product semantics.

## 25. Objective traceability and completion evidence

| User objective | Design contract | Evidence required before the objective is complete |
| --- | --- | --- |
| Durable and usable by anyone | Portable local core, Apache-2.0 target, open schemas, exportable memory, adapter SDK | Clean installation on supported platforms; independent adoption in unrelated repositories; export/import and uninstall tests |
| Own every content-design activity | Full lifecycle, content model, specialist roles, writing and critique, workbench | End-to-end tasks proving research, IA, strategy, value proposition, naming, microcopy, review, change, verification, and maintenance |
| Integrate with product and agent instruction files | Adoption discovery and host bridges for `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, Codex, Gemini, and Copilot | Versioned host conformance tests showing the contract is loaded and reminders route relevant work without overwriting existing instructions |
| Bootstrap governance when none exists | Proposed starter contract, low-risk drafting policy, unresolved owner map, publication prohibition | Empty-repository adoption test proving useful content work can start while unknown authority remains explicit |
| Remind the user to trigger content.md | One-per-task dismissible `/contentmd` reminder contract | Host tests for relevant, irrelevant, acknowledged, nested, and conflicting instruction cases |
| Agents SDK integration without runtime lock-in | Host-adaptive runtime SDK, local reference profile, optional Cloudflare adapter, and explicit capability-disposition table | Detection and no-auto-install tests; local conformance; hosted conformance for state, RPC, scheduling, Workflows, approvals, reconnect, MCP, export, and local equivalence |
| Agent governance | Independent policy plane and governance-pattern disposition | Negative tests for bypass, denial, approval, expiry, revocation, rate/resource limits, audit, readback, and rollback |
| Learn good patterns from other products | Research corpus and `ContentPatternRecord` with transfer and rights controls | Multi-product source set, expert pattern review, held-out transfer tasks, similarity/copying checks, and provenance audit |
| Use learned patterns to write | Context packet, retrieval, writer, critic, alternatives, decision feedback | Blind comparisons against non-pattern and generic baselines with reasons, abstentions, scope, and qualified review |
| Recursive learning and ML | Four memory planes, learning candidates, staged ML progression, promotion and rollback | Dataset permission, leakage controls, held-out evaluation, model/version registry, shadow run, approved promotion, drift test, and demonstrated rollback |
| Become a better writer over time | Multi-dimensional better-writer objective and outcome memory | Longitudinal evidence that later versions improve scoped quality without increasing hard failures, copying, unsupported claims, or review burden |
| Local, CLI, browser, and desktop research | CLI, adapter SDK, automated browser and separately authorized Computer Use | Exact read/write/network scopes, capture provenance, privacy tests, deterministic local fallback, and controlled desktop research evidence |
| Products retain facts, policy, approvals, and publication authority | Independent evidence, decision, approval, capability, delivery, and evaluation records | Tests proving generation, historical reliability, prior acceptance, and learned preference cannot authorize controlled claims or publication |

Passing one row does not imply another. Completion of the overall goal requires inspectable evidence for every row against the same released product version and declared supported environments.
