---
title: Candidate content-decision system model
status: research-candidate
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
---

# Candidate content-decision system model

This is a candidate ontology derived from the foundational research. It exists to make assumptions testable against practitioner artifacts and repository fixtures. It is not yet a public schema.

## Design premise

The system should compile evidence and approved constraints into a content decision, then trace that decision into one or more implemented expressions and observed experiences.

```text
evidence + product behavior + user context + journey/state
           + governing instruments + accountable owners + authorized approvers/records
           + applicable connection/data-processing/memory/telemetry controls
           + risk + language systems
                              │
                              ▼
                     content decision ───── semantic-decision approval when required
                              │
                              ▼
       expressions → guarded change transaction → implementation occurrences
                              │                    → built experience/release
          phase eligibility + exact grant + mandatory mutation approval
                 + conditional release approval when policy requires
                              │
                              ▼
                 verification + outcome evidence
                              │
                    maintenance or revision
```

The compiler must be able to return **insufficient evidence**, **conflict**, or **human decision required**. A plausible string is not a required output.

## Core entities

### Experience context

| Entity | Meaning | Examples of relationships |
| --- | --- | --- |
| Organization | Accountable organization or brand system | owns products, voice profiles, policies |
| Product or service | User-recognizable offering or operational service | contains journeys, objects, channels |
| Actor | Person, group, staff role, partner, or automated system that acts or receives information | performs events, receives messages |
| Communication-participant role | The role an actor has in a particular communication or action | speaker/sender, addressee/recipient, subject, affected party, beneficiary, decision-maker, approver, delegate/agent; one actor may hold several roles |
| User need or job | Evidence-backed problem, goal, question, or capability needed in context | motivates a journey or message |
| Journey | End-to-end sequence across time, actors, and channels | contains experience events |
| Entry point | How an actor arrives or returns | initiates or resumes an event |
| Experience event | Triggered moment with preconditions, action, consequence, and recovery | transitions system or user state |
| State | Relevant condition before, during, or after an event | determines applicable message variants |
| Channel | Delivery setting and interruption relationship | contains surfaces; constrains expression |
| Communication attempt | A record for one scoped potential communication of a message expression through a channel to a declared recipient scope, retaining independent eligibility/suppression controls and repeatable dispatch/provider/client events | attempt ID; message/expression/channel IDs; recipient scope; independent eligibility, consent/preference, suppression/deduplication controls; schedule and expiry; repeatable provider/client event log with timestamps; failure/recovery/fallback; evaluation links |
| Recipient-engagement event | Optional observation that a recipient or client interacted with an attempted communication | attempt ID; event type and channel-native value; actor/device scope when legitimately known; timestamp; provenance and limitations; never proves comprehension or outcome |
| Surface | Concrete interaction or communication container | renders components, messages, documents |
| Component | Reusable behavior/layout unit with content-bearing slots | implements a pattern; renders expressions |
| Slot | Semantic role within a pattern or component | headline, body, action, hint, error, status |

### Meaning and language

| Entity | Meaning | Required distinction |
| --- | --- | --- |
| Concept | Domain or product meaning independent of one label | must not collapse into a current word |
| Content object | Structured, reusable information entity with fields and relationships | may render across many pages or channels |
| Taxonomy or ontology relation | Classification or semantic connection among concepts/objects | organizational hierarchy is not always a user navigation |
| Term | Controlled expression for a concept within a scope and language | preferred, protected, forbidden, deprecated, alias, confusable |
| Voice profile | Approved durable principles for how a product or organization relates and communicates | distinct from situational tone |
| Tone context | Modulation appropriate to state, consequence, emotion, urgency, relationship, channel, and locale | cannot be a single brand-wide score |
| Mechanics rule | Language- and locale-specific convention | capitalization, punctuation, dates, numbers, units, address |
| Interaction pattern | Coordinated content and behavior requirements for a recurring event | defines slot roles, states, actions, recovery, exceptions |
| Message | A semantic communication decision that supports a need or event in a defined product state | not identical to a stored literal or locale/channel realization |
| Expression | A locale-, channel-, and delivery-context-specific realization of a message | includes linguistic variants, variables, markup, and visible/assistive forms |

### Evidence and control

| Entity | Meaning | Required fields or relationships |
| --- | --- | --- |
| Claim | A material assertion in or behind a decision | type, scope, text/meaning, risk, supporting or conflicting evidence |
| Evidence source | Material used to establish, challenge, or contextualize a claim | source type, provenance, publisher/custodian, scope, retrieval date, effective date, access mode, limitations; source custody does not imply accountability or approval |
| Governing instrument | Law, regulation, standard, contract, approved policy, or other instrument that constrains a decision within defined applicability | issuer, jurisdiction, effective/version dates, controlled claim types, applicability decision |
| Accountable owner | Person or organizational role responsible for a fact, behavior, policy, language system, or decision class | responsibility type, product/domain, jurisdiction/locale, delegation and escalation path |
| Approver | Named person or authorized role that may accept a particular decision version for a defined scope | approval class, scope, conditions, date, expiry; never inferred from job title alone |
| Connection authorization | Authenticated control-plane record allowing a named principal/client/workspace to establish access to named connector resources and scopes | record ID/version, principal/client/workspace/tenant, connector and resource/audience, permitted scopes/fields/operations, purpose and terms, issued date, expiry, current revocation state/check, and disconnect/revocation path; it enables a connection but never authorizes a task operation |
| Data-processing authorization and record | Scoped organizational decision and processing inventory for whether and how declared data may be collected, transferred, analyzed, stored, supported, or deleted through a named path | record ID/version, purpose and prohibited secondary uses, sources/data subjects/data classes/fields, provider/connectors/subprocessors, roles, regions, training/improvement use, retention/deletion/rights handling, separately applicable governing instruments, separate accountable-owner ID and authorized-approver/approval-record ID, conditions, effective date, expiry/review/revocation; it is not by itself a legal determination or task capability |
| Persistence or durable-memory decision | Scoped decision permitting specified records or fields to persist beyond a task | record ID/version, principal/workspace/tenant, allowed record types and fields, purposes/uses, storage/region/isolation, access roles, retention/deletion/export, separate accountable-owner ID and authorized-approver/approval-record ID, conditions, effective date, expiry and revocation; it neither approves content meaning nor grants read/write capability |
| Telemetry decision | Scoped decision permitting specified operational events or fields to be emitted to named destinations | record ID/version, product/workspace/tenant and population scope, event/field schema, data classes and redaction, purpose, destination/processors/regions, access, retention/deletion, consent or policy route where applicable, separate accountable-owner ID and authorized-approver/approval-record ID, conditions, effective date, expiry and revocation; it never grants the observed task operation |
| Rule | Testable or reviewable constraint with typed evidence and applicability | deterministic/advisory type, default or maximum severity policy, evidence-source IDs and dimensions, applicable governing-instrument ID when present, scope, accountable owner, linked decision ID/version and independent decision state, exact semantic-decision approval record for an approved or enforced rule, current enforcement-eligibility result, waiver class (`nonwaivable` or explicitly `waiver-eligible-medium-low`), applicability exceptions, freshness; the actual finding severity is evaluated in context and waiver eligibility never lowers or overrides it |
| Assumption | Unconfirmed belief used for exploration | validation owner, consequence, validation plan, expiry; never an evidence or decision-state shortcut |
| Conflict | Incompatible claims, rules, sources, or implementations | parties, scopes, decision needed, resolution state |
| Risk | Foreseeable consequence and exposure | type, severity, reversibility, affected actors, required controls |
| Decision | Chosen meaning, structure, term, pattern, or expression and why | context, options, evidence, criteria, accountable owner, decision state |
| Semantic decision approval | Acceptance by an authorized approver for a specified portion of a semantic or content decision when that decision class requires approval | exact decision ID/version, scope, locale/jurisdiction, conditions, approver, date, expiry; does not approve a mutation or grant execution capability |
| Mutation/change approval | Mandatory acceptance of the exact proposed diff, target set, or publication transaction before any source-of-truth content/configuration mutation or publication governed by the change plane | change/transaction ID, exact diff or new value, exact targets, base revision, environment, purpose, authorized approver, scope, conditions, date, expiry; distinct from semantic-decision approval and capability grant. A capability-reducing control-plane disconnect/revocation uses its own authenticated control authorization and exact grant, not this content-change approval |
| Release approval | Acceptance of total residual release risk for an exact build and exposure scope when the release policy requires it | release-approval ID, exact build/artifact revision, audience, locale/market, environment, feature flags, release window, residual risks, evidence/evaluation links, authorized release approver, conditions, date, expiry; does not approve content meaning or mutation and never grants publication capability |
| Capability grant | Deterministic authorization for an authenticated actor or service to perform a defined system action | grant ID/version, issued-at, issuer, authenticated principal, exact operation/tool, exact resource/path, data-access boundary, model/network egress boundary, environment, conditions, expiry, current revocation state (`unrevoked` or `revoked`) and checked-at, revocation timestamp when present, and revocation path; distinct from decision or mutation approval and evidence |
| Phase-gate result | Evaluated disposition record for a declared capability-phase gate and defined implementation/profile | result-record ID, declared phase and gate, implementation/profile and version, evidence/evaluations, disposition (`pass`, `blocked`, or `not applicable`) and rationale, evaluation date, expiry or invalidation trigger; only a current `pass` establishes phase eligibility, while every disposition remains in history and none authorizes a task operation |
| Runtime-verification grant | Task-specific capability-grant subtype for controlled observation that launches or attaches to a process, browser, app, device, emulator, local server, build, test, or runtime instrumentation | grant ID/version, issued-at, issuer, principal/workload, exact executor/tool, executable and arguments or browser actions/origins/routes, build/environment/device, filesystem/network/data/credential boundaries, child-process policy, duration, cancellation, expiry, current revocation state (`unrevoked` or `revoked`) and checked-at, revocation timestamp when present, revocation path, and cleanup; never inherited from a static-read, model/connector, write, publication, or enforcement grant |
| Exception or waiver | Authorized departure only from an explicitly waiver-eligible deterministic rule whose actual finding severity is `Medium` or `Low` | eligible rule ID/version, actual severity, reason, authorized waiver approver, exact scope, expiry, mitigation, visibility, and review path; never applies to `High` or `Critical` findings, `SEC-P0`, control-plane failures, authorization/provenance failures, or other non-waiverable security, privacy, isolation, credential, supply-chain, or integrity controls; eligibility never changes severity |

### Delivery and assurance

| Entity | Meaning | Required fields or relationships |
| --- | --- | --- |
| Implementation occurrence | Exact code, resource, CMS, design, template, or platform location that realizes an expression | coordinates, runtime condition, connector, observed value |
| Build or artifact | Versioned implemented output | revision, environment, generated sources, delivery state, linked verification evaluation records |
| Release | Exposure of a build to an audience | exact build/artifact revision, environment, audience, locale, feature flags, effective time, release-approval ID where required, publication transaction ID, readback, rollback/compensation record |
| Evaluation | Method and evidence used to answer a quality or outcome question | object, hypothesis, method, sample, result, limitation |
| Finding | Observed defect, risk, or opportunity | evidence-source ID and five evidence dimensions, applicable rule ID, separately applicable governing-instrument ID when present, severity, uncertainty and limitations, disposition |
| Metric | Operationalized outcome or health signal | definition, denominator, segment, baseline, guardrail |
| Review trigger | Event or date that requires reconsideration | policy/product/source change, incident, locale launch, expiry |
| Change transaction | Scope-locked set of proposed or executed operations whose execution controls remain independent from semantic/content decisions and release-risk acceptance | requested operating mode; declared composite capability phases; operation records that each bind one exact operation/resource to all applicable `SEC-P0` result-record IDs and matching current per-action capability-grant IDs; applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs with exact scope, conditions, expiry, and current revocation check, or an explicit not-applicable rationale; separate scoped mutation/change-approval ID bound to every source-of-truth write/publication operation; release-approval ID when a publication target requires one; exact targets; base revision and expected-current values; preview; result; rollback; readback; semantic/content decision and semantic-decision-approval IDs only when applicable |
| Controlled runtime-verification transaction | Task-bounded observation of an exact build, route, state, browser, device, emulator, server, process, test, or runtime instrumentation | requested operating mode; declared `verify.runtime` phase; passing `SEC-P0-G` result-record ID; exact runtime-verification-grant ID; immutable runtime plan; isolated executor/profile; build/environment/state; allowed executable/arguments or browser origins/routes/actions; filesystem/network/data/credential and child-process boundaries; captures and trace; cancellation; teardown/cleanup result; linked verification evaluation; no mutation/change approval unless a separately gated write also occurs |

## Essential relationships

At minimum, the model should express these relationships:

- an actor has a need or job in a context;
- actors are assigned explicit communication-participant roles so the sender, addressee, subject, affected party, beneficiary, and delegated agent are not assumed to be the same person;
- a journey contains or links experience events across channels;
- an entry point begins or resumes an event;
- an event has preconditions, triggers, actions, state transitions, consequences, and recovery;
- a content object represents one or more concepts;
- a term names a concept for a defined audience, language, and scope;
- a message supports a need or event in a specific state;
- an interaction pattern defines the coordinated roles of messages and actions;
- an expression realizes a message for a locale, channel, state, and slot;
- a communication attempt links one message expression and channel to a declared recipient scope and retains eligibility, suppression, dispatch/provider/client events, expiry, failure, fallback, and recovery independently from product delivery;
- optional recipient-engagement events link to an attempt but remain observations with provenance and limitations, never proof of attention, comprehension, or outcome;
- an implementation occurrence realizes an expression under a runtime condition;
- a claim is supported, disputed, or invalidated by evidence sources and may be constrained by governing instruments;
- an accountable owner is responsible only for declared fact or decision classes and scopes;
- an approver may approve only specified decision types, versions, and scopes;
- a connection authorization, data-processing authorization/record, durable-memory decision, and telemetry decision each retain their own subject, resource/data, purpose, terms, expiry, and revocation boundaries; none grants a task operation or substitutes for another;
- a decision selects among alternatives against criteria and evidence;
- a semantic-decision approval applies only to a particular semantic/content decision version and scope when that decision class requires approval;
- every source-of-truth content/configuration mutation or publication transaction governed by the change plane has a separate scoped mutation/change approval for the exact diff, targets, or transaction, whether or not a semantic-decision approval is applicable; capability-reducing control-plane disconnect/revocation remains separately authorized and granted;
- every release that requires residual-risk acceptance links a separate release-approval record for the exact build, audience, locale, environment, and window; that record never authorizes the publication operation;
- a capability grant authorizes only a specified operation on specified resources within its data, egress, environment, expiry, and revocation boundaries and never proves that semantic-decision, mutation/change, or release approval exists;
- a composite change transaction decomposes into operation records; each record independently links one exact operation/resource to every applicable `SEC-P0` result-record ID and matching current per-action grant, plus every applicable current connection-authorization, data-processing, durable-memory, and telemetry record or an explicit not-applicable rationale; every source-of-truth write/publication operation links the separate mutation/change approval bound to its exact target and diff and any separately required release approval; the transaction links a semantic/content decision and semantic-decision approval only when applicable;
- a waiver can affect only a deterministic rule explicitly predeclared waiver-eligible whose actual finding severity is `Medium` or `Low`; it never changes the actual severity and can never waive a `High` or `Critical` finding, `SEC-P0`, or a control-plane, authorization, provenance, security, privacy, isolation, credential, supply-chain, or integrity failure;
- a controlled runtime-verification transaction requires both a passing `SEC-P0-G` result-record ID and an exact, current, unrevoked runtime-verification grant; neither static-read nor write eligibility or grants supply browser, device, emulator, build, server, test, shell, process, or runtime-instrumentation capability;
- a finding points to observed evidence and an applicable rule or evaluation;
- a build contains implementation occurrences, a release exposes a build, and verification observes the built experience;
- outcome evidence can support, challenge, or supersede a decision; and
- a newer decision supersedes rather than erases history.

## Message and expression identity

`message-in-context` is a working aggregate, not yet a stable identifier. It links a semantic content decision to the expressions and implementation occurrences that realize it. The model needs at least two identities.

### Semantic message or decision identity

One candidate tuple is:

```text
product + journey + experience event + actor or need + semantic state
+ intended outcome or content job + represented concept/action
```

This identifies the meaning and job of the communication before choosing a locale, channel, component, or literal. A change in product consequence, available action, or required meaning creates a new or revised decision rather than a cosmetic expression variant.

### Expression and occurrence identity

One candidate tuple is:

```text
message_id + locale + channel + surface + component/pattern + slot
+ visible/assistive modality + variant/experiment + runtime condition
```

Jurisdiction is always part of applicability scope. When jurisdiction changes the controlled meaning, rights, consequence, or required action, it requires a distinct decision or explicitly scoped decision variant; when it changes only a permissible realization, it can scope the expression. Not every field belongs in a human-facing identifier, and validation must determine the minimum stable keys.

### Why literals cannot be the identifier

- The same literal can express different decisions: `Continue` before review versus before commitment.
- One decision can have many expressions: locale realizations, accessibility labels, plural branches, and mobile or voice adaptations.
- A literal can be reused accidentally across unrelated contexts.
- A message can be missing entirely for a required state; literal-only inventory cannot identify absence.

## Independent evidence, decision, and delivery records

Do not place evidence condition, decision state, and delivery state in one `status` enum. Evidence itself also needs orthogonal dimensions rather than one mutually exclusive value.

### Evidence dimensions

| Dimension | Allowed values | Meaning |
| --- | --- | --- |
| Observation strength | `unobserved`, `observed`, `corroborated` | Whether the item was directly encountered and whether independent support was added |
| Challenge | `undisputed`, `disputed` | Whether credible conflicting evidence currently exists |
| Freshness | `current`, `stale` | Whether the evidence is current enough for its declared use and review trigger |
| Lineage | `active`, `superseded` | Whether a newer evidence record replaces it for a declared scope while history remains available |
| Epistemic qualifier | `none`, `inferred`, `assumed` | Whether the record includes an interpretation or unconfirmed belief rather than direct observation |

These dimensions can coexist: evidence can be `corroborated`, `disputed`, `stale`, and `superseded` at the same time. Corroboration does not erase conflict; freshness does not establish truth; supersession does not erase history; and no evidence dimension is a step toward approval.

### Decision state

Allowed states: `question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, `retired`.

These states branch. A proposal may be approved, rejected, or returned for revision; rejection is not a state after approval. An approved decision may later be superseded, deprecated, or retired. Approval must name the authorized approver and exact scope. A proposal does not become approved because it was implemented.

### Delivery state

Allowed states: `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, `removed`.

The usual forward path is mapping, patching, building, verification, release, and live observation, but it is not mandatory or irreversible: a patch or build can be rolled back before release; a released occurrence can be removed or rolled back; and verification can recur across environments and locales. A released expression can still lack user-outcome evidence. A verified build can remain unreleased.

### Communication-attempt and recipient-engagement records

Communication delivery is event-based and channel-specific, not one universal linear status enum. A communication-attempt record may normalize at least:

- eligibility and suppression categories: `eligible`, `ineligible`, `suppressed`, `deduplicated`;
- dispatch/provider/client event categories: `scheduled`, `queued`, `sent`, `provider-accepted`, `delivered`, `presented`, `failed`, `expired`; and
- channel-specific extensions such as `bounced` or `escalated`, mapped to a normalized category while preserving the raw provider value, timestamp, provenance, and limitation.

Recipient engagement is a separate repeatable event stream such as `opened`, `acknowledged`, or canonical `acted` (`actioned` may be retained as a source alias). An attempt can fail, expire, retry, fall back, or escalate from channel-specific points; events do not have to occur in the listed order. Neither provider/client events nor engagement prove attention, comprehension, consent, product-state transition, or user outcome. Communication attempts, product delivery state, semantic-decision state, and evaluation records remain independent.

## Agent operating modes

These modes classify the requested work and its action/risk ceiling; they never authorize an operation. Higher-action work requires explicit scope, a passing applicable phase gate, and an independently constructed task-specific capability grant, and it never inherits a decision or approval right over controlled facts.

| Mode | Agent may | Agent may not |
| --- | --- | --- |
| Discover | Inventory, map, compare, and identify gaps or conflicts | Change content or promote observations to approved rules |
| Advise | Explain options, evidence, tradeoffs, risk, and a recommendation | Decide unsettled product, policy, legal, clinical, brand, locale, or other controlled meaning |
| Draft | Produce proposed content, models, and specifications with provenance and open questions | Present proposals as approved, implemented, or live |
| Apply | After mandatory separate scoped mutation/change approval, a passing applicable `SEC-P0-D` or `SEC-P0-E` result, and an exact task grant, change only the granted targets through a scope-locked, previewed, reversible plan; additionally require semantic-decision approval for releasable governed meaning and release approval when release policy requires residual-risk acceptance | Treat semantic-decision, mutation/change, or release approval, a gate result, or mode as a capability grant; change behavior, controlled facts, or out-of-scope files silently |
| Enforce | Run deterministic checks against current approved rules within their declared scope | Convert model inference, frequency, or preference into a blocking rule |

Every action also needs a separately constructed task-specific capability grant with grant ID/version, issued-at, issuer, exact operation/resource, data and egress boundaries, environment, expiry, current revocation state/check, and revocation path; evidence provenance; an exact target; the applicable phase-gate result; every applicable current connection-authorization, data-processing, durable-memory, and telemetry record (or explicit not-applicable rationale); an audit record; and verification proportionate to risk. Missing, mismatched, expired, revoked, or out-of-scope required control records fail closed. Every source-of-truth content/configuration mutation or publication governed by the change plane additionally requires separate scoped mutation/change approval plus expected-current guards, rollback, and readback; control-plane disconnect/revocation has its own authenticated authorization and exact grant. Link a semantic/content decision approval only when that decision class and scope require it, and a release approval only when release policy requires residual-risk acceptance; do not manufacture either merely because a transaction exists. Operating mode, any control decision, gate result, semantic-decision approval, mutation/change approval, and release approval never create or widen the capability grant.

`SEC-P0-F` establishes eligibility for autonomous deterministic enforcement; it does not authorize execution. If an enforcement check launches or attaches to a process, browser, app, device, emulator, server, build, test, shell, child process, or runtime instrumentation, it additionally requires a current passing `SEC-P0-G` result-record ID and exact runtime-verification grant. Any static/connected reads or local/remote mutations also retain their separate applicable phase results, per-action grants, and approvals.

Operating mode describes what kind of work the agent is asked to perform; it does not itself grant a tool, credential, path, network boundary, model-egress permission, or publication right. Static discovery, model analysis, connected reads, draft artifacts, local apply, remote apply, enforcement, and controlled runtime verification are separate capability phases with their own release gates. Controlled runtime verification requires a separate passing `SEC-P0-G` result-record ID and an exact runtime-verification grant before launching or attaching to any browser, app, device, emulator, local server, build, test, shell, child process, or runtime instrumentation. It never inherits static or connected-read capability from `SEC-P0-A`/`B` or write capability from `SEC-P0-D`/`E`, and `SEC-P0-G` supplies none of those capabilities; compose phases only when each applicable result and matching task grant exists. The proposed security architecture is defined in [security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md).

## Scope model

Rules and decisions may be scoped by:

- organization, brand, product, service, feature, or repository;
- journey, event, state, route, channel, surface, component, pattern, or slot;
- actor, audience, role, permission, plan, or lifecycle cohort;
- concept, content object, claim type, or term;
- language, locale, script, market, or jurisdiction;
- risk class, regulatory class, or data sensitivity;
- environment, version, experiment, feature flag, or effective date.

### Resolution cannot be only “nearest file wins”

File-system proximity is a useful loading rule, but evidence, governing applicability, ownership, and approval are multidimensional.

**Candidate resolution process:**

1. Identify the message-in-context and requested decision type.
2. Gather rules, evidence sources, governing instruments, accountable owners, and approvals whose declared scopes intersect that context.
3. Remove expired, inapplicable, or unverified mirrored rules while preserving them as evidence.
4. Partition evidence and constraints by claim type, governing instrument, accountable owner, and authorized approver.
5. Apply deterministic structural constraints that are current and unambiguous.
6. Detect collisions among protected facts, terms, voice, tone, locale, pattern, and surface constraints.
7. Resolve only where an approved precedence rule exists for that decision type and scope.
8. Otherwise return the conflict, affected outputs, and the missing typed control: evidence source, applicable governing instrument, accountable owner, or authorized approver.
9. Record the resulting decision and exact approvals; never rewrite source history.

An explicit user request can change a draft preference. It cannot make an unlawful, inaccessible, false, or technically impossible claim safe without changing the governing facts or product.

## Content context compiler

Before drafting, the system should produce a structured context packet.

### Required inputs when applicable

- task, request, scope, and requested agent operating mode;
- declared capability phases, all applicable `SEC-P0` gate result-record IDs, authenticated actor or workload, and independently issued per-action capability-grant IDs, versions, current revocation states/checks, and constraints; controlled runtime verification separately includes its `SEC-P0-G` result-record ID and exact runtime-verification-grant record rather than replacing any read or write controls;
- applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs with exact scope, terms, expiry, and revocation state; none substitutes for the phase result or task grant;
- user need, actors, journey, entry point, event, and state;
- product behavior, preconditions, transitions, consequences, recovery, and unknowns;
- concepts, content objects, terminology, patterns, and information hierarchy;
- claims; evidence sources with observation-strength, challenge, freshness, lineage, and epistemic dimensions; governing instruments with recorded applicability; accountable owners; authorized approvers and approval records; and separate conflict records;
- voice, tone context, mechanics, accessibility, locale, and channel constraints;
- current expressions and implementation occurrences;
- risk classification, required reviewers, and prohibited autonomous actions;
- success hypothesis, baseline, evaluation method, and review trigger.

### Outputs

- known facts with provenance;
- assumptions and unknowns;
- source conflicts and stale evidence;
- applicable rules, their governing instruments, accountable owners, authorized approvers and approval records, plus each rule's independent decision and delivery state;
- missing states, channels, messages, or recovery;
- proposed content decisions and alternatives;
- coordinated expressions and implementation targets;
- required approvals and tests;
- the requested operating mode, declared capability phases, all applicable `SEC-P0` result-record IDs, exact current per-action grant boundaries, and all applicable connection-authorization/data-processing/durable-memory/telemetry record IDs with scope/expiry/current revocation checks (or explicit not-applicable dispositions) carried into every proposed operation; runtime plans include the `SEC-P0-G` result and runtime-verification grant in addition to any independently applicable read or write results and grants;
- a safe action plan, or a refusal/escalation result when the phase gate, task grant, evidence, control, approval, or target requirements are missing or fail.

## Deterministic, model-assisted, and human work

| Work type | Strong default |
| --- | --- |
| Parse files, resources, variables, tags, locale syntax, schemas, keys, and diffs | Deterministic tooling |
| Discover routes, states, runtime conditions, and design/CMS nodes | Tooling plus explicit coverage, evidence dimensions, and uncertainty |
| Retrieve sources and match declared scope | Tooling; model may help rank but must not invent applicability, ownership, or approval |
| Diagnose ambiguity, hierarchy, terminology drift, tone fit, or missing recovery | Model-assisted critique with evidence |
| Generate options and rationale | Model-assisted, marked proposed |
| Decide product behavior, policy, price, eligibility, consent, legal meaning, clinical/safety fact, brand canon, or local-language acceptance | Accountable human or qualified external decision process, constrained by any separately applicable governing instrument |
| Approve, publish, send, or enforce high-consequence changes | Explicit authorized action with deterministic controls |
| Validate actual comprehension, inclusion, trust, and task success | Appropriate user research and expert review |

## Candidate root contract boundary

The always-loaded repository contract should contain or route to:

- scope and exclusions;
- product and content-system overview;
- local accountable-responsibility, governing-instrument, authorized-approver, and approval-record model;
- concise approved voice principles and terminology entry points;
- content workflow and required pre-writing gates;
- risk, accessibility, localization, and controlled-claim boundaries;
- supported source systems and where current evidence, governing instruments, accountable ownership, and approvals reside;
- how to run discovery, planning, validation, and verification;
- rules for proposal, approval, apply, enforcement, and escalation;
- schema version, last verified date, accountable contract steward, and known gaps.

It should not contain:

- secrets or credentials;
- a complete generated inventory;
- copied legal or policy corpora without freshness, applicability, ownership, and approval handling;
- hidden reasoning or model memory;
- every research source or domain pack inline;
- unapproved inferred voice or terms presented as canon;
- temporary task instructions or one-off implementation plans.

## Product claims this model would prohibit

Until independently proven, the product should not claim:

- that installation of one Markdown file works natively in every agent;
- that it has found every user-facing message without a coverage denominator;
- that existing content is approved or intentional;
- that it can determine brand voice from an industry category;
- that it can replace legal, compliance, policy, clinical, security, accessibility, localization, or research expertise;
- that it can detect AI authorship from writing style;
- that a lint score proves content quality or user success;
- that a proposed patch is implemented, released, or effective;
- that repeated accepted wording becomes a universal rule automatically.

## Validation tasks

Before turning this model into a schema:

1. Map at least 50 recent real content decisions into it and record missing, redundant, or ambiguous fields.
2. Include low- and high-risk work, multiple channels, at least six domains, and non-English-first decisions.
3. Test whether practitioners can reconstruct a decision and implementation from the record without oral context.
4. Test whether engineers can map it to real source/resources without changing application logic.
5. Test whether accessibility and localization specialists can represent the information they need without an English-visible-string bias.
6. Test conflict resolution with deliberately inconsistent policy, design, code, localization, and live evidence.
7. Test what can be omitted for a low-risk task without breaking later maintenance.
