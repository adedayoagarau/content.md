---
title: Content-design artifacts, collaboration, and decision rights
status: research-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Operating model for human and agent-supported product content work
---

# Content-design artifacts, collaboration, and decision rights

## Claim language

- **[Sourced fact]** — a factual statement directly supported by the cited source within its scope
- **[Documented practice]** — what a named organization or practitioner says it does; not a universal rule
- **[Research finding]** — a study result within its stated method, sample, and limitations
- **[Cross-source finding]** — a pattern supported by more than one independent source
- **[Inference]** — this research's interpretation of evidence, not directly asserted by one source
- **[Proposal]** or **[Product hypothesis]** — a candidate design choice to validate; product hypothesis is a proposal subtype
- **[Open question]** — an unresolved uncertainty with a method or accountable function needed to resolve it

`Documented organizational practice`, `professional-body guidance`, and `practitioner account` are separate source types or evidentiary roles, not additional claim labels. Each may support a bounded documented-practice claim, but the material's source type remains separate from the claim the synthesis makes and from governing applicability or approval.

Detailed citations and source limitations are recorded in [foundations-source-notes.md](../sources/foundations-source-notes.md).

## Artifacts exist to carry decisions, not create bureaucracy

**[Inference]** An artifact is warranted when it helps a team make, test, authorize, implement, trace, or maintain a decision. The same decision may be represented in a design tool, repository, CMS, ticket, or structured database. The required content matters more than the file format.

A trustworthy artifact states:

- the question or decision it supports;
- audience, journey, state, surface, channel, locale, and product scope;
- evidence sources, governing instruments, applicability, and source limitations;
- orthogonal evidence observation, challenge, freshness, lineage, and epistemic dimensions; assumptions remain an epistemic qualifier rather than one blended score;
- accountable owner for each declared fact or decision class, contributors and custodians, authorized approver, and exact approval record;
- independent decision and delivery states, exact approval/release records, and separate evaluation records plus version;
- typed links among evidence sources, governing instruments, decisions, approvals, expressions, implementation occurrences, releases, and evaluations; and
- review, expiration, measurement, or retirement trigger.

Portmann's interview research found UX writers using copy documents containing context, screenshots, versions, open questions, and rationale while coordinating work across tools and people ([Portmann, 2025](https://doi.org/10.1017/9781009540605.004)). This supports the need for contextual decision records, but not a mandatory copy-document format. **[Research finding]**

## Artifact map

### Framing and evidence

| Artifact | Decision supported | Minimum useful fields | Typical accountable or custodial role |
|---|---|---|---|
| **Intake and scope brief** | Is this the right problem and what is the mandate? | Request, trigger, affected experience, desired outcomes, deadlines, channels/locales, dependencies, exclusions, agent operating mode, requester | Product or service lead with content design **[Inference]** |
| **User-need or job model** | Whose need is being served and in what context? | Evidence-backed user/job statement, context, prior knowledge, barriers, frequency, consequence, evidence links, unknowns | User research and product/content team **[Inference]** ([GOV.UK](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)) |
| **Evidence register** | What is known, by what method, and with what strength? | Claim, source, method, date, scope, sample, evidentiary role/fitness, and separate observation-strength, challenge, freshness, lineage, and epistemic dimensions | Accountable research or discipline role; shared contributors and custodians **[Inference]** |
| **Control, decision-rights, and risk map** | Which instruments apply, who is accountable for or may approve which facts and decisions, and what happens if wrong? | Claim/decision class, consequence, jurisdiction, evidence source, governing instrument and applicability, accountable owner, authorized approver and exact approval record, independent decision state, escalation, expiration | Accountable product/service role with domain, legal, risk, and content **[Inference]** |
| **Hypothesis and measure register** | What outcome should a change cause, and how will the team learn? | Audience/context, intervention, expected behavior or understanding, rationale, baseline, method, guardrail, decision threshold | Product, research, analytics, and content **[Inference]** |

### Current-state understanding

| Artifact | Decision supported | Minimum useful fields | Typical accountable or custodial role |
|---|---|---|---|
| **Content inventory** | What content exists and where? | Exact item/reference and source location, page/screen/channel, content type, locale, observation date, orthogonal evidence dimensions, implementation occurrence and delivery state, publisher/custodian, accountable owner if known, traffic/use evidence | Content operations or local content custodian **[Inference]** ([GOV.UK transition guidance](https://www.gov.uk/guidance/govuk-transition-guidance-for-agencies)) |
| **String and state inventory** | Which product language appears under which behavior? | Stable ID/key, exact text, trigger, state, role/permission, variables, component, route, locale, source, build/live evidence | Content design with engineering and QA **[Inference]** |
| **Content audit** | What should be kept, changed, merged, moved, created, or retired? | User need, accuracy, usefulness, findability, duplication, gap, contradiction, accessibility, performance, risk, recommendation, evidence | Content design/strategy with accountable and custodial roles **[Inference]** |
| **Entry-point and channel map** | Where do expectations begin and how do people move between channels? | Source/referrer, promise or search intent, audience, device/channel, destination, handoff, dead end, accountable/custodial roles | Service, marketing, content, support, and analytics **[Inference]** |
| **Contradiction and debt register** | Which inconsistencies create harm or maintenance risk? | Conflicting claims/terms and exact locations, evidence sources and challenge dimension, governing applicability, impact, reach, root cause, priority, accountable owner, authorized approver and exact approval record where required, linked resolution decision and independent decision state | Content operations or accountable service role **[Inference]** |

### Modeling and strategy

| Artifact | Decision supported | Minimum useful fields | Typical accountable or custodial role |
|---|---|---|---|
| **Journey map or service blueprint** | When and where is information needed across the service? | Actors, stages, goals, touchpoints, frontstage/backstage processes, emotions/barriers, evidence, opportunities, accountable/custodial roles | Service design with research, content, product, operations **[Documented practice]** ([CDS service design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/)) |
| **State and transition model** | What can happen, including alternatives and recovery? | States, events/triggers, conditions, system behavior, user action, output, error, retry/reversal, terminal states | Product/interaction design and engineering with content **[Inference]** |
| **Content model or schema** | What reusable content objects and relationships should the system support? | Object, field, type, purpose, relationship, required/optional, validation, source, locale behavior, permissions, lifecycle | Content strategy/design and content engineering **[Inference]** ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)) |
| **Taxonomy, ontology, and navigation model** | How are concepts classified, related, labeled, found, and traversed? | Concepts, definitions, preferred labels, synonyms, broader/narrower/related relations, facets, evidence, governance | IA/content strategy with domain and search/data experts **[Inference]** ([IA Institute](https://www.iainstitute.org/sites/default/files/what_is_ia.pdf)) |
| **Terminology and concept register** | Which term represents which concept for which audience and locale? | Concept definition, decision-state-qualified preferred term, aliases, prohibited/ambiguous terms, audience, surface, locale, evidence sources, governing instruments, rationale, exceptions, accountable owner, approval records | Content design with domain, localization, legal/brand as applicable **[Inference]** |
| **Content strategy** | Why content exists and how the system will achieve user and organizational outcomes | User and organizational goals, principles, substance, structure, channels, governance, workflow, measures, exclusions | Content strategy/design with product/service leadership **[Inference]** ([Halvorson](https://alistapart.com/article/thedisciplineofcontentstrategy/)) |
| **Content plan** | What content will be created, changed, reused, moved, or retired and in what sequence? | Need, item/object, format/channel, accountable owner, dependencies, evidence sources, decision state, delivery target, required reviews/evaluation, measure, target date | Content design/operations with delivery lead **[Documented practice]** ([Scottish Government](https://servicemanual.gov.scot/browse/designing-your-service/content-standards/guidance-for-content-designers)) |
| **Voice, tone, style, and mechanics system** | How should the organization express itself consistently and appropriately? | Voice principles with behavior, tone factors, terminology, grammar/mechanics, examples/counterexamples, channel/locale/risk exceptions, evidence sources, governing instruments if any, accountable owner, required approvers, decision state | Content/brand governance with locale and domain partners **[Inference]** |

### Designing and evaluating

| Artifact | Decision supported | Minimum useful fields | Typical accountable or custodial role |
|---|---|---|---|
| **Message hierarchy or content priority guide** | What must people notice, understand, and do first? | User goal, essential facts, sequence, progressive disclosure, action, risk, evidence, omitted content | Content and interaction design **[Inference]** ([CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)) |
| **Content pattern** | When should a reusable content-behavior solution apply? | Problem, context, applicability, anatomy, behavior, content rules, variants, examples, non-examples, accessibility, locale, evidence sources, exceptions, accountable owner, decision state and approval records | Design-system team with adopting product teams **[Inference]** |
| **Content specification or copy deck** | What exact content and behavior should be built? | See the minimum schema below | Content design with product, design, and engineering **[Inference]** |
| **Contextual prototype** | Can the proposed meaning, flow, behavior, and language work together? | Representative data, all material states and routes, content hierarchy, interactions, semantics, locale variants, version, hypothesis | Product/design/content team **[Documented practice]** ([Home Office](https://design.homeoffice.gov.uk/design-and-content/professional-standards/designer-role-standard)) |
| **Critique brief and record** | What peer design question is being explored and what changed? | Context, user goal, evidence, maturity, constraints, options, feedback sought, participants, feedback, decision and rationale | Presenting designer; discipline facilitator **[Documented practice]** ([UK design notes](https://designnotes.blog.gov.uk/2022/08/09/content-crits-theyre-not-scary/)) |
| **Evaluation plan and report** | Does the design help representative users understand and act? | Question, method, participants/context, access/locale coverage, tasks, materials/version, observations, limitations, findings, decisions | User research with content/design/product **[Inference]** ([Digital.gov](https://digital.gov/guides/plain-language/test), [W3C](https://www.w3.org/WAI/planning/involving-users/)) |

### Assurance, delivery, and lifecycle

| Artifact | Decision supported | Minimum useful fields | Typical accountable or custodial role |
|---|---|---|---|
| **Factual-source and approval record** | Which claims are supported, governed, and approved for this exact scope? | Exact claim/content version, evidence sources, governing instruments and applicability, jurisdiction, effective date, exceptions, accountable factual owner, authorized approver, decision state, approval conditions, expiry/review trigger | Accountable domain/policy role; authorized legal/compliance approver where required **[Inference]** |
| **Accessibility content specification and review** | Are meaning, labels, instructions, status messages, errors, and alternatives usable across access needs? | Applicable criteria, semantic requirement, nonvisual text/order, error/recovery, accountable implementation/review roles, and separate evaluation records with method, participants/tools, findings, and limits | Shared team responsibility with accessibility expertise **[Inference]** ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)) |
| **Localization brief and locale decision record** | Can each locale preserve meaning, function, culture, and legal accuracy? | Purpose/context, audience, concept definitions, variables, screenshots/flow, character/design constraints, formats, terminology, accountable locale owner, required approver, queries, decision state, delivery state, linguistic evaluation record | Localization and locale content expertise with content/engineering **[Inference]** ([W3C quick tips](https://www.w3.org/International/quicktips/index)) |
| **Implementation manifest** | Where and how is each applicable decision or expression delivered? | Content decision/expression IDs and versions, semantic-decision-approval link when required, route/state, component/key/schema/CMS reference, variables, locale records, design link, source commit/build, implementation custodian, independent delivery state, fallback, and conditional links to communication-attempt/provider-client-event and recipient-engagement records | Engineering/content engineering with content design **[Inference]** ([CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)) |
| **Decision log or design history** | Why was a decision made, changed, rejected, or excepted? | Decision, context, options, evidence, rationale, participants, governing applicability, accountable owner, authorized approver and approval record, decision state, date, affected sources, supersedes/superseded-by | Product/design/content team **[Inference]** ([Home Office](https://design.homeoffice.gov.uk/design-and-content/professional-standards/designer-role-standard)) |
| **Release and built-verification record** | Does the released implementation match the applicable decision and change requirements? | Requested operating mode; declared capability phases; operation records linking each exact operation/resource to all passing applicable `SEC-P0` result-record IDs and matching current per-action grants; applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs with exact scope, expiry, and current revocation check, or explicit not-applicable rationale; explicitly include separate `SEC-P0-G` result and runtime-verification grant when a process, browser, app, device, emulator, server, build, test, or runtime instrumentation is launched or attached, and `SEC-P0-E` plus its publication grant for publication; separate scoped mutation/change-approval ID bound to each write or publication transaction; semantic decision-approval ID only when applicable; release-approval ID when policy requires residual-risk acceptance; build/environment; expected-current and observed readback; scenario/state/role/locale/device; criteria; defects; rollback; independent delivery state; release record; verification evaluation | Quality is shared; the authorized release approver and exact release-approval record are organization-specific **[Cross-source finding]** |
| **Outcome and content-health report** | Is live content effective, safe, current, findable, and maintainable? | Evaluated object/version, baseline, task and guardrail measures, segments, support/search evidence, freshness, accountable owner, interpretation, limits, resulting decision/action | Product, analytics, research, content operations **[Inference]** |
| **Ownership and review schedule** | Who keeps content accurate and when is it reconsidered? | Object/scope, accountable maintenance owner, evidence sources and governing instruments, last review, risk tier, scheduled/event triggers, escalation, successor | Accountable content-maintenance role with content operations **[Inference]** ([GOV.UK maintenance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/manage-existing-govuk-content/)) |
| **Migration, archive, or retirement record** | How does content leave use without broken journeys or lost obligations? | Reason, dependencies, replacement, redirects, affected keys/URLs/locales, retention/archive duty, scoped mutation/change approval, applicable phase-gate result and exact task grant, expected-current value, rollback, readback, date, verifier | Accountable service/content role with engineering, records, legal as needed **[Inference]** |

## Minimum schema for a product content specification

**[Inference]** A list of `old copy → new copy` is insufficient for nontrivial product work. A reusable content specification should support these fields, while allowing small teams to omit irrelevant ones explicitly:

| Field group | Required information |
|---|---|
| **Identity** | Stable content decision ID; title; version; accountable owner; created/updated dates |
| **Record references** | Orthogonal evidence dimensions, independent decision and delivery states, and evaluation records; never one mixed lifecycle flag |
| **Context** | Product/service; audience or role; journey; entry point; surface/channel; route; component; trigger; state; precondition |
| **Intent** | User goal; content job; desired understanding or action; service outcome; content hypothesis |
| **Behavior** | System behavior; available actions; consequences; delay; retry, reversal, escalation, and recovery behavior |
| **Content** | Exact source-language content; hierarchy/anatomy; variants; conditional branches; errors; empty/loading/success/failure/follow-up states |
| **Dynamic data** | Variable names; semantic type; example and boundary values; source; formatting; plural/gender behavior; privacy; missing/invalid fallback; whether variables can be reordered |
| **Accessibility** | Accessible name and description; heading/label relationships; link purpose; nonvisual order; status announcement; error association and recovery; alternative text where relevant |
| **Language and locale** | Locale scope; concept and terminology guidance; translation context; cultural/legal variation; format/direction needs; expansion or layout risks; locale-parity finding and evaluation link |
| **Communication delivery, when applicable** | Attempt ID; message/expression/channel and recipient scope; eligibility, consent/preference, suppression/deduplication, schedule and expiry; timestamped provider/client events with raw and normalized values; failure, retry, fallback, escalation, and recovery; separate recipient-engagement event and evaluation links; never reuse product delivery state for these signals |
| **Constraints** | Genuine technical, component, legal, channel, timing, or delivery constraints; distinguish hard limit from design preference |
| **Evidence and rationale** | User/domain evidence; controlled facts; evidence sources with observation-strength, challenge, freshness, lineage, and epistemic dimensions; governing instruments and applicability; accountable owners; options considered; decision rationale; limitations and conflicts |
| **Assurance** | Peer critique; factual, legal, accessibility, privacy, localization and other reviews; authorized approver and exact approval record, date, version, scope, conditions, expiry |
| **Evaluation** | Research question; prototype or build tested; method; findings; measure; baseline; guardrail; limitations |
| **Implementation** | Design reference; code file/key/component or CMS record; translation record; ticket; requested operating mode; declared capability phases; operation records linking exact operations/resources to all applicable `SEC-P0` result-record IDs and current per-action grants; applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs with exact scope/expiry/current revocation check, or explicit not-applicable rationale; separate `SEC-P0-G` result and runtime-verification-grant IDs when executable verification occurs; separate scoped mutation/change-approval ID for each write or publication transaction; semantic-decision-approval ID only when applicable; release-approval ID when release policy requires it; expected-current value; build/release; readback; analytics event; rollback |
| **Maintenance and supersession** | Review triggers; accountable maintenance owner; supersedes/superseded-by; waiver record only for an explicitly waiver-eligible deterministic rule whose actual severity is `Medium` or `Low`; deprecation or retirement plan |

## Independent evidence dimensions, decision and delivery states, and evaluation records

**[Inference]** Do not place all of these in one mixed lifecycle field. The independent-record model in [candidate-system-model.md](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records) is the canonical candidate for this research release.

| Record or independent state system | Candidate values | Required evidence | Must not be interpreted as |
|---|---|---|---|
| **Evidence** | observation: unobserved/observed/corroborated; challenge: undisputed/disputed; freshness: current/stale; lineage: active/superseded; epistemic qualifier: none/inferred/assumed | Exact source, location, provenance, scope, environment, observation date, support/conflict, freshness check, and lineage | Approval, organizational rule, correctness, or live delivery |
| **Decision** | question, option, proposed, approved, rejected, superseded, deprecated, retired | Rationale, version, accountable owner, authorized approver where applicable, scope, locale/jurisdiction, date, conditions | Implementation, current delivery, or effectiveness |
| **Delivery** | unmapped, mapped, patched, built, verified, released, observed-live, rolled-back, removed | Exact delivery source, build, scenario check, release/environment/audience evidence, and timestamps as applicable | Approval, user success, or global availability |
| **Evaluation record** | study or measurement attached to a specific object/version | Method, time window, population/sample/segment, result, limitation, evaluator | Universal validity or causal proof without a suitable design |

A deprecated decision may still have a live occurrence awaiting migration. A verified build may be unreleased. A live implementation may never have been approved. Those combinations are defects or work states the system must be able to represent, not impossible enum values.

## Collaborators and decision seams

**[Inference]** Responsibilities below are a starting contract. Titles, accountable scopes, decision rights, and approval routes differ. Every implementation must discover the local model.

| Collaborator | Evidence or expertise they contribute | Decisions they commonly lead or own | Content-design seam |
|---|---|---|---|
| **People who use or are affected by the service** | Goals, behavior, vocabulary, context, barriers, consequences, workarounds | They do not “approve copy,” but their experience is necessary evidence | Involve representative and affected people early and throughout, including disabled and locale-specific participants **[Sourced fact]** ([W3C](https://www.w3.org/WAI/planning/involving-users/)) |
| **Content designer / UX writer** | Content-design evidence, structure, interaction language, terminology, patterns, critique, content quality | Leads content intent and expression within mandate; recommends changes to behavior and system | Must not claim factual accountability, controlled-fact approval, release approval, or execution capability by default |
| **Product manager** | Product goals, priorities, scope, outcomes, constraints | Commonly leads prioritization, roadmap, and acceptance of product work | Content surfaces ambiguity and outcome risk; product decisions must be recorded, not hidden in copy |
| **Service owner / accountable product owner** | End-to-end accountability, risk appetite, and organizational mandate | Commonly owns service outcome, approvals, risk, and release | Distinguish service approval from factual, legal, and content-professional review **[Documented practice]** ([GOV.UK roles](https://www.gov.uk/service-manual/the-team/what-each-role-does-in-service-team)) |
| **User researcher** | Research design, sampling, field evidence, interpretation, limitations | Leads research integrity and participant practice | Content helps frame hypotheses, supplies stimuli, observes, and acts on findings without inventing evidence |
| **Interaction or product designer** | Behavior, sequence, controls, hierarchy, visual and interaction system | Leads interaction and layout decisions in many teams | Meaning, hierarchy, action labels, states, and behavior should be co-designed rather than handed off |
| **Service designer** | Cross-channel journey, operations, actors, backstage processes, ecosystem | Leads end-to-end service orchestration in many organizations | Content owns the information layer only where agreed; both trace touchpoints and operational handoffs |
| **Engineer / content engineer** | Executable behavior, architecture, data and variable constraints, delivery and observability | Leads technical implementation and integrity | Pair on state models, schemas, keys, fallbacks, semantics, internationalization, instrumentation, and verification |
| **Subject-matter, policy, or operational expert** | Domain facts, exceptions, policy intent, real operating process | Owns or recommends factual interpretation according to local governance | Content tests whether facts are sufficient and usable; the expert fact-checks, not necessarily rewrites for style |
| **Legal, compliance, risk, privacy, or security** | Obligations, interpretations, risk controls, jurisdiction, prohibited claims | Approves or advises only within its assigned decision class and scope | Bring the question and context early; distinguish required meaning from one proposed wording |
| **Accessibility specialist** | Standards interpretation, assistive-technology expertise, disabled-user evidence | Leads specialist assurance where assigned; product accessibility remains shared | Content covers semantic and cognitive dimensions but cannot certify the whole product alone |
| **Localization, translator, or locale content expert** | Locale language, culture, law, terminology, translation feasibility, quality | Leads locale-language decisions and flags concept or design non-parity | Involve before source freeze; allow restructuring, not just word substitution |
| **Data or performance analyst** | Measurement design, instrumentation, behavior data, statistical interpretation | Leads measurement integrity and analysis | Content connects hypotheses and versions to measures and avoids treating clicks as the only outcome |
| **Customer support, sales, and operations** | Recurrent questions, failures, objections, language, workarounds, operational change | Own operational processes and channel practices | Use as evidence and delivery partners; do not treat support anecdotes as a representative user sample |
| **Marketing, communications, and brand** | Audience strategy, acquisition promises, campaign and brand systems | Leads campaign/brand communications according to organization | Reconcile entry-point promises and shared terms; preserve informed choice and product truth |
| **Quality or test specialist** | Scenario coverage, regression practice, environment and release evidence | Leads testing practice where the role exists | Content supplies content/state acceptance criteria and participates in built verification |

Peer-reviewed survey research across US software UX practitioners found collaboration throughout development, with designers and product managers often the closest partners, but also persistent handoffs and team-size differences. It is general UX evidence, not a content-specific global norm ([Feng, Li, and Zhang, CHI 2023](https://doi.org/10.1145/3544548.3581273)). **[Research finding]**

## Decision rights: separate accountability, approval, and delivery functions

**[Inference]** A single RACI table often hides the core issue. At minimum, distinguish:

1. **Problem decision right** — who decides which outcome or problem the team will pursue.
2. **Behavior decision right** — who decides what the product or service does.
3. **Factual accountability and approval** — who is accountable for, and who is authorized to approve, domain, policy, price, eligibility, safety, legal, or operational claims for a declared scope.
4. **Content-design decision right** — who decides information hierarchy, interaction language, terminology application, voice, tone, and content pattern within the mandate.
5. **Research accountability** — who is accountable for study integrity and interpretation.
6. **Accessibility assurance and residual-risk acceptance** — who interprets applicable standards and who accepts residual accessibility risk; accessibility delivery remains multidisciplinary.
7. **Locale decision and approval right** — who decides and, where required, approves whether meaning and experience are appropriate in a language, culture, and jurisdiction.
8. **Technical decision right** — who decides implementation architecture and confirms executable integrity.
9. **Release approval** — who accepts the total residual risk for an exact build, audience, locale, environment, and release window.
10. **Governance decision and waiver right** — who may approve an exact term, pattern, or deterministic rule version and who may issue a waiver only when that deterministic rule is explicitly waiver-eligible and the actual finding severity is `Medium` or `Low`.

One person may hold several functions in a small team. The artifact must still record the exact accountable role, authorized approver, decision or approval class, version, scope, and approval record. “Stakeholder approved” is not a sufficiently precise state. Waiver eligibility never changes actual severity. No waiver may apply to a `High` or `Critical` finding or bypass an applicable `SEC-P0` result, control-plane failure, task grant, or security, privacy, authorization, provenance, isolation, credential, supply-chain, or integrity control.

### Default decision contract for a content agent

Every operation row below also requires all applicable connection-authorization, data-processing, durable-memory, and telemetry records to be current and matched to the exact purpose, resource/data/event/destination scope, conditions, expiry, and revocation check. An explicit `not applicable` disposition needs a rationale. Missing, mismatched, expired, revoked, or out-of-scope required records fail closed; none substitutes for the applicable `SEC-P0` result or independently constructed task grant.

| Decision or operation | Agent action after the listed controls pass | Prohibited inference or action |
|---|---|---|
| Local static discovery | After a passing applicable `SEC-P0-A` result-record ID and an independently constructed exact local-read grant, observe and classify the granted repository resources with provenance | Must not execute repository code, launch a process/browser/build/server, use a connector or model, mutate a source, or mark implementation as approved or canonical |
| Connected or model-assisted discovery and advice | After a passing applicable `SEC-P0-B` result-record ID and an exact model/connector/read grant with principal, resource, operation, data/egress, environment, expiry, and current revocation boundaries, retrieve and analyze only the granted material; also require `SEC-P0-A` and its exact grant if static local discovery is used | Must not invent research, governing applicability, accountable ownership, approval, or intent; connected/model access supplies no write or runtime capability |
| Draft or revise language and structure | After a passing applicable `SEC-P0-C` result-record ID and exact isolated-draft grant, produce an inert proposed artifact with provenance and rationale | Must not treat drafting as semantic approval or source-write capability; moving a proposal into even a draft/nonrelease target requires its own applicable write gate, exact write grant, and separate scoped mutation/change approval |
| Apply a local change | After a passing applicable `SEC-P0-D` result-record ID, independently constructed exact local-write grant, and mandatory separate scoped mutation/change approval, execute the exact guarded transaction with preview, expected-current value, rollback, and readback | Must not infer a semantic decision approval from mutation approval or apply outside the granted operation, resource, data/egress, environment, expiry, and current revocation boundaries |
| Apply remotely or publish | After a passing applicable `SEC-P0-E` result-record ID, independently constructed exact remote-operation/publication grant, and mandatory separate scoped mutation/change approval bound to the publication transaction, execute the exact guarded transaction with expected-current value, rollback or compensation, and readback; also require semantic decision approval for releasable governed meaning and release approval when release policy requires it | Must not infer content meaning, semantic approval, or release approval from the gate, task grant, or mutation/change approval; link those approvals separately when applicable |
| Enforce style, terminology, and patterns | After the applicable read result/grant, a passing `SEC-P0-F` result-record ID, an exact enforcement grant, and an approved current deterministic rule with exact decision-approval record, run only the granted deterministic check; if the check launches or attaches to a process, browser, device, emulator, server, build, test, or runtime instrumentation, separately require `SEC-P0-G` and its exact runtime-verification grant | Must not treat `SEC-P0-F` as execution capability or enforce inference/advisory judgment; waive only an explicitly waiver-eligible deterministic rule whose actual finding severity is `Medium` or `Low`, and never waive a `High`/`Critical` finding, gate, control failure, or missing/exceeded grant |
| Controlled runtime verification | After a passing `SEC-P0-G` result-record ID and an exact, current runtime-verification grant, run the allowlisted executable/arguments or browser/device/emulator actions in the declared isolated build/environment and record traces, captures, cancellation, and cleanup | Must not inherit runtime capability from `SEC-P0-A`/`B` reads or `SEC-P0-D`/`E` writes; `SEC-P0-G` grants no model, connector, mutation, publication, or enforcement capability, so compose each additional phase separately |
| Fact, legal, policy, price, eligibility, medical, safety, privacy, or compliance content | Trace exact evidence, frame questions, and preserve approved meaning within the decision scope | Must not resolve, soften, broaden, or narrow a controlled claim without the fit evidence, applicable governing instrument, accountable owner, authorized approver, and exact decision/approval records required for that scope |
| Accessibility | Identify content-relevant criteria and design/test needs | Must not certify the complete product from text or automation alone |
| Localization | Prepare structured, contextual, localizable source and route locale review | Must not claim cultural or linguistic parity without locale evidence and evaluation |
| Release decision and publication | Under the applicable read and runtime-verification controls, assemble and report release evidence; publish only after the independent `SEC-P0-E` controls above pass | Must not accept residual release risk without an exact release-approval record or treat publication as proof of semantic approval, correct delivery, or user outcome; retain release, readback, rollback/compensation, and verification records |

The phase gates are defined in [Security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md). A semantic/content decision approval accepts an exact meaning or expression only when that decision class requires it. A separate scoped mutation/change approval is mandatory for every source-of-truth content/configuration mutation or publication transaction governed by the change plane, including a mechanical change that has no semantic decision approval. Capability-reducing control-plane revocation and ephemeral or audit output outside that change plane retain their own exact authorization and grant requirements rather than inheriting content-change approval. Release approval separately accepts residual risk when release policy requires it. None of these approvals, a passing gate result, or the requested operating mode creates or widens the exact task grant. Controlled runtime verification is independently gated by `SEC-P0-G`; process, browser, app, device, emulator, server, build, test, shell, or runtime-instrumentation execution can never inherit static-read, model/connector, write, publication, or enforcement capability.

## Review types are not interchangeable

| Review | Core question | Best timing | Evidence/output | Common misuse |
|---|---|---|---|---|
| **Content or design critique** | Is this a strong design response to the framed need, and what options should be explored? | Early and while change is cheap | Peer feedback, alternatives, rationale, learning | Treating critique as final approval or proofreading **[Documented practice]** ([UK design notes](https://designnotes.blog.gov.uk/2022/08/09/content-crits-theyre-not-scary/)) |
| **Peer assurance / fresh eyes / “2i”** | Is the near-final content coherent, complete, consistent, and professionally sound in context? | After major design decisions, before release | Issues, corrections, checked version | Asking the reviewer to redesign without context; confusing it with factual accountability or an authorized fact-approval route **[Documented practice]** ([DfE](https://design.education.gov.uk/content-design/quality-and-assurance)) |
| **Subject-matter fact check** | Are facts, conditions, exceptions, process, and terminology accurate? | Before user evaluation if facts affect the test; again after material changes | Claim-specific corrections; linked evidence sources and evidence dimensions; applicable governing instruments; accountable fact owner; authorized approver and approval record where required | Letting preference-based rewriting replace professional content decisions |
| **Legal/compliance/risk review** | Does meaning satisfy applicable obligations and risk controls? | Early on the concept and before release on the scoped version | Interpretation, required meaning, conditions, approval or unresolved risk | Sending isolated final prose with no behavior, jurisdiction, or user context |
| **Accessibility review** | Does the full experience meet applicable requirements and work across access needs? | Throughout modeling/prototyping and on the build | Criteria mapping, expert/user findings, defects and residual risk | Treating readability, automated scans, or WCAG conformance as complete inclusion |
| **Localization/locale review** | Is meaning, function, tone, culture, and regulation appropriate in this locale? | During modeling, in prototypes, after translation, and on the build | Locale decisions, queries, adaptations, parity finding, and QA result | Translating frozen fragments without context or rearrangement rights |
| **User evaluation** | Can representative people find, understand, decide, act, and recover? | Early enough to change direction and again at material risk points | Observations, limitations, findings, decisions | Asking for preference or approval; generalizing beyond the sample |
| **Engineering review** | Can the designed states, variables, semantics, and delivery behavior be implemented safely? | During modeling and before source integration | Feasibility decisions, schema/API changes, implementation plan | Reducing content to character count after architecture is fixed |
| **Built verification / QA** | Does the actual implementation satisfy specified content and behavior requirements? | In representative environments before release | Scenario results, defects, verified build | Reviewing only the design or source file |
| **Release approval** | Is the total residual risk acceptable for this audience, locale, and release? | After required evidence and verification | Named authorization, scope, conditions, date | Using one approver to stand in for every specialist decision |

## Organizational models

**[Inference]** No model is inherently mature. Fit depends on product architecture, organizational structure, regulation, scale, locale, and whether content decisions are shared or product-specific.

| Model | Strengths | Risks | Necessary controls and signals |
|---|---|---|---|
| **Lone generalist or first content hire** | Deep local context, fast decisions, low coordination overhead | Isolation, overload, no peer review, invisible system work, single point of failure | Executive mandate, prioritized remit, external/community peer critique, documented decisions, explicit escalation, realistic coverage |
| **Centralized content team** | Strong craft community, consistent governance, flexible allocation, easier pattern stewardship | Queue and handoff behavior, weak product context, central bottleneck | Embedded discovery time, service agreements, product pairing, transparent prioritization, federated contribution path |
| **Embedded content designers** | Continuous product context, close collaboration, early influence | Divergence, discipline isolation, repeated solutions, product priority crowding out system health | Discipline leadership, regular peer critique, shared systems and terminology, protected system/learning time |
| **Hub-and-spoke or federated** | Combines shared standards and embedded context; scales domain ownership | Ambiguous decision and approval rights, uneven adoption, duplicated governance | Clear center versus local decision rights, contribution and exception process, shared tooling, community of practice, health measures |
| **Distributed content responsibility** | Enables teams where specialist headcount is limited; broad ownership | Unqualified decisions, fragmented voice and terminology, hidden maintenance burden | Guardrails, templates, training, consultation thresholds, named content accountability, audits, escalation for high risk |
| **Platform or design-system content function** | Reusable patterns, shared schemas, tooling, quality controls | Over-generalization; platform examples become rules; adoption gap | Product evidence, variation model, exceptions, contribution governance, versioning, migration support, adoption measurement |
| **Agency, consultancy, or rotating specialist** | External perspective, concentrated expertise, surge capacity | Context loss, handoff, temporary governance, unclear post-engagement accountability | Access to real evidence and systems, joint decisions, capability transfer, source mapping, named accountable maintenance role |
| **Content operations function** | Improves workflow, tooling, governance, health, and scale | Process detached from craft and product outcomes | Practitioner partnership, outcome measures, exception paths, workflow-as-hypothesis, regular friction review |

Spotify's design organization has documented both centralized-to-federated operations and content/UX writing that is centralized in some respects and embedded in product contexts; its later design-system work emphasizes a system of systems rather than one central bottleneck ([Scaling Design Ops](https://spotify.design/article/scaling-design-ops), [The paradox of design systems](https://spotify.design/article/the-paradox-of-design-systems), [Reimagining design systems at Spotify](https://spotify.design/article/reimagining-design-systems-at-spotify)). These are first-party case studies from one large technology company. **[Documented practice]**

The Home Office separately describes not-integrated, semi-integrated, and integrated designer involvement, making organizational access itself part of the quality model ([Designer role standard](https://design.homeoffice.gov.uk/design-and-content/professional-standards/designer-role-standard)). **[Documented practice]**

## Collaboration operating principles

**[Inference]**

1. **Bring content into problem framing.** A finished-layout review is not multidisciplinary design.
2. **Pair on shared seams.** Content and interaction design pair on hierarchy and behavior; content and engineering pair on state and data; content and research pair on hypotheses and stimuli; content and locale expertise pair on concepts and parity.
3. **Share unfinished work with a question.** Critique needs user context, evidence, constraints, maturity, and the feedback sought.
4. **Review the experience, not the file.** Use realistic content, states, routes, devices, roles, locales, and assistive technology.
5. **Separate contribution from decision and approval rights.** Everyone can offer evidence or options; not everyone can approve every claim.
6. **Prefer asynchronous traceability and synchronous uncertainty resolution.** Record evidence, independent decision and delivery states, approvals, releases, and evaluations; meet when ambiguity, conflict, or co-creation benefits from live work.
7. **Preserve dissent and unresolved risk.** Consensus language must not hide a decision-rights or approval conflict or missing evidence.
8. **Keep critique safe and specific.** Evaluate against user need and principles, not authorship or personal taste.
9. **Avoid handoff cliffs.** Each handoff should carry intent, state, rationale, variables, accessibility, localization, open questions, and verification criteria.
10. **Improve the system after repeated defects.** Recurrent terminology, state, review, or implementation failures should change models, patterns, workflows, tooling, or ownership—not only strings.

## Representation, control, and synchronization model

**[Inference]** Different systems can hold evidence, governing instruments, decisions, expressions, implementations, approvals, and evaluation records for one content decision. Storage alone does not make a tool's contents fit evidence, an applicable governing instrument, an approved decision, or a verified implementation. `content.md` should route to typed records and declared decision rights rather than falsely appoint one global canonical record.

| Concern | Typical evidence, representation, or system | Applicable governing instrument, if any | Accountable owner and approval route | Required linkage |
|---|---|---|---|---|
| Product and service intent | Product brief, behavior evidence, accepted decision record | Approved product, service, or policy specification for the scoped claim | Accountable product/service owner and declared decision approver | Decision ID, version, evidence dimensions, approval record |
| User evidence | Research repository, report, behavior, support, or analytics | Research ethics, consent, and organizational research policy where applicable | Accountable research role; approval of the resulting product/content decision remains separate | Study, date, population, method, limitation, provenance |
| Controlled fact | Primary instrument, domain evidence, operational record, approved fact record | Applicable law, regulation, contract, policy, standard, or domain rule | Accountable domain/policy/product owner and authorized claim approver | Claim ID, jurisdiction/scope, effective date, evidence dimensions, approval record |
| Content pattern or terminology | Content system, design-system guidance, research, taxonomy, observed use | Approved content rule, glossary, taxonomy, or product-language system | Accountable content/product-language owner and scoped approver | Rule/term ID and version, scope, exceptions, decision state |
| Interaction and visual behavior | Design artifact, component implementation, runtime observation | Approved component, interaction, accessibility, or product-state contract | Accountable design/product/engineering roles and declared approver | Component, state, version, implementation occurrence, delivery state |
| Executable content and behavior | Code, configuration, CMS, notification platform | Approved product/state contract and release controls where applicable | Accountable engineering/content-operations role; content decision approval remains separate | File/key/record/build, decision ID, delivery state |
| Locale language | Translation-management record, locale-owned source, in-market evidence | Applicable local requirements, approved locale terminology, and internationalization contract | Accountable locale/language owner and authorized local/specialist approver | Source version, locale, expression ID, approval record, evaluation |
| Live behavior | Deployed environment, configuration, and release record | Release policy and environment controls | Accountable engineering/release role; runtime observation itself supplies no content approval | Release/build, audience, time, occurrence ID, observed-live evidence |
| Outcome | Analytics, research, support, incident, and feedback systems | Measurement, privacy, research, or incident policy where applicable | Accountable research/analytics/safety role; resulting change follows its own decision route | Evaluation ID, version, segment, method, period, limitations |

The agent should maintain a **content decision ID** across these systems, detect divergence, and report orthogonal evidence dimensions, independent decision and delivery states, and evaluation records for each representation.

## Gaps and research still needed

- **[Open question] Decision rights in practice:** Interview teams to learn which accountable functions, authorized approval routes, and delivery responsibilities exist, where they conflict, and which typed records teams rely on for each claim.
- **[Open question] Artifact cost:** Test which minimum artifact fields prevent rework and harm at different risk levels without creating unsustainable maintenance.
- **[Open question] Small organizations and open source:** Public evidence is weighted toward governments and large technology companies; lighter-weight models need direct research.
- **[Open question] Global and multilingual operating models:** Research which locale decision and approval rights teams hold, how source-language dominance is challenged, and how culturally distinct experiences are governed.
- **[Open question] Content operations metrics:** Compare throughput, rework, freshness, quality, adoption, support burden, and user outcomes; avoid rewarding output volume alone.
- **[Open question] Machine-readable contracts:** Prototype interoperable schemas for content decision IDs, state coverage, variables, evidence sources and orthogonal evidence dimensions, governing instruments, accountable owners, authorized approvers and approval records, localization, independent decision and delivery states, and separate evaluation records.
- **[Open question] Agent participation:** Define which reviews an agent may prepare, perform, or enforce; how humans attest decisions; and what logs, diffs, rollback, and privacy controls are required.
- **[Open question] External publication and records:** Add stronger standards and professional guidance for editorial archiving, records retention, regulated communications, and public correction workflows.
