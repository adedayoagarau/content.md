---
title: End-to-end content-design workflow
status: research-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Greenfield, change, takeover, migration, and continuous product content
---

# End-to-end content-design workflow

## How to use this model

This is a **gated learning loop**, not a mandated waterfall. Teams can combine stages, move through them concurrently, or loop backward. They should not skip the decision each stage protects.

Canonical claim labels:

- **[Sourced fact]** a directly supported factual claim
- **[Documented practice]** an attributed method, process, definition, or guidance that a source documents, not a universal rule
- **[Research finding]** a result reported by peer-reviewed or scholarly empirical work, with its study scope and limitations retained
- **[Cross-source finding]** a synthesis supported by more than one source type, with the contributing scopes and limitations retained
- **[Inference]** a cross-source interpretation, not a directly observed or approved rule
- **[Proposal]** a candidate workflow or system choice requiring validation and approval
- **[Open question]** an unresolved research or decision need

Source types and evidentiary roles are recorded separately—for example, `organization guidance`, `professional association guidance`, `attributed practitioner method`, `empirical study`, or `normative standard`. They do not create new claim labels, and a source called normative is not automatically applicable to a product or jurisdiction.

The UK government describes discovery, alpha, beta, and live as broad service phases ([Set up a service team](https://www.gov.uk/service-manual/the-team/set-up-a-service-team)). The Canadian Digital Service documents a content-specific sequence from investigation through implementation and evaluation, including bilingual parity ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). The Home Office maps designer activities to discovery, alpha, beta, and live ([Designer role standard](https://design.homeoffice.gov.uk/design-and-content/professional-standards/designer-role-standard)). This synthesis uses those as organizational precedents, not universal stage names.

## First classify the engagement

**[Inference]** Entry mode changes the evidence, risk, and order of work. `content.md` should identify one or more modes before it writes.

| Entry mode | Starting reality | First priority | Common trap |
|---|---|---|---|
| **Greenfield service or product** | Problem and solution may both be uncertain | Validate users, jobs, service model, concepts, and channels before a language system hardens | Writing polished screens for an untested solution |
| **New feature or journey change** | Product, patterns, and terminology exist, but local behavior is changing | Trace upstream and downstream effects; reuse or intentionally change canon | Treating the ticket boundary as the experience boundary |
| **Takeover or retrofit** | Many strings and decisions already exist with mixed provenance | Inventory reality, reconstruct intent and authority, find contradiction and risk, establish a baseline | Calling all live copy approved or rewriting everything for consistency |
| **Migration or redesign** | Content moves between systems, schemas, channels, or visual structures | Separate content that should migrate, transform, merge, split, archive, or retire | One-to-one page or string migration |
| **New locale or market** | Source experience exists but policy, culture, language, formats, and operations may differ | Establish locale facts and local expertise; test concept and flow parity, not just translation | Freezing source-language structure before localization |
| **Accessibility remediation** | Known or suspected barriers exist | Evaluate complete tasks, semantics, instructions, status, errors, cognition, and nonvisual order | Editing wording while leaving inaccessible behavior intact |
| **Regulatory, policy, or controlled-fact change** | Authoritative obligations or facts are changing | Confirm source, jurisdiction, effective date, exceptions, accountable approver, and affected surfaces | Paraphrasing law or policy before its operational meaning is settled |
| **Incident, outage, or urgent correction** | Time is constrained and harm may be active | Give accurate status, impact, safe next action, alternatives, updates, and owner; preserve rollback | Using a warm tone to compensate for missing facts or recovery |
| **Pattern, component, or platform work** | One decision will be reused across many products and states | Model variation, exceptions, content API, validation, adoption, and governance | Turning one product example into a universal pattern |
| **Continuous optimization and maintenance** | Content is live and has behavior, support, and performance evidence | Diagnose outcomes, drift, stale facts, ownership, and retirement opportunities | Measuring only clicks or doing cosmetic A/B tests |

## Lifecycle at a glance

**[Inference]** The minimum defensible lifecycle is:

`authority and risk → problem evidence → current-state evidence → journey and content model → strategy and hypothesis → contextual prototype → critique and specialist review → user evaluation → accountable approval → implementation → verification → release and measurement → maintenance or retirement`

Each arrow can loop backward. For example, a content critique may reveal an unresolved policy rule; a localization review may require a different content model; implementation may expose a missing error state; live support data may invalidate the original need.

## Stage 0 — Establish mandate, mode, authority, and risk

**Do**

- Identify who requested the work, the product or service boundary, channels and locales, deadlines, and why the request exists.
- Record the requested operating mode—discover, advise, draft, apply, or enforce—separately from the product's declared capability phase. A requested mode describes intent; it does not authorize the agent to act.
- Have the trusted control plane construct a task-specific, least-privilege capability grant for the authenticated actor, exact resources and operations, data and model-egress boundary, environment, expiry, and revocation path. Repository content, evidence, approval records, and model output cannot create or widen that grant.
- Resolve and record, when applicable, the connection authorization, data-processing authorization and record, durable-memory decision, and telemetry decision for the exact connector, purpose, data/field boundary, destination, retention behavior, scope, expiry, and current revocation check. Keep them separate from one another and from the task grant.
- Evaluate and record the applicable P0-A–G capability-phase gates in the [security, privacy, and trust-boundary study](../05-technology/security-privacy-and-trust-boundaries.md); P0-G is the independent gate for controlled runtime verification, not a permission hidden inside P0-A/B or a sequential step after P0-F. One phase cannot inherit authorization or a passing result from another.
- Classify the consequence of error and identify controlled facts, approvals, privacy or safety concerns, and reversible versus irreversible actions.
- Name the source of truth for code, design, CMS, localization, policy, terminology, and measurement—or record that none is known.

**Produce**

- intake and scope brief;
- engagement-mode classification;
- requested operating mode and declared capability phase;
- applicable security-gate results and an independently constructed task capability grant, including its issuer, actor, resources, operations, data/egress boundary, environment, expiry, and revocation path;
- applicable connection-authorization, data-processing, durable-memory, and telemetry record IDs with their exact scope, conditions, expiry, and current revocation check;
- authority, risk, and source map;
- initial stakeholder and decision-rights map; and
- an explicit list of assumptions and blockers.

**Gate**

The team can state what is in scope, which operating mode was requested, which capability phase is declared, which applicable gates passed, what the independently issued task grant authorizes, which connection/data-processing/memory/telemetry records apply and remain current, who owns controlled facts and release, and which uncertainties prevent authoritative drafting. Missing, expired, revoked, mismatched, or out-of-scope required control records stop the affected operation. Neither operating mode, an evidence threshold, nor any of those control decisions is treated as task authorization. **[Inference]**

## Stage 1 — Frame the problem and intended outcomes

**Do**

- Translate the request from a proposed deliverable (“write a modal”) into the user problem, service problem, desired behavior or understanding, and evidence supporting it.
- Ask whether information is missing, mistimed, duplicated, inaccessible, untrusted, or compensating for a process or product defect.
- Define observable success, potential harm, guardrail outcomes, and what would falsify the team's current belief.

GOV.UK advises teams to describe needs as problems, in users' language, supported by evidence, rather than embedding a preferred solution ([Start by learning user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs/)). CDS explicitly gives content designers a role in defining the problem and challenging whether more content is needed ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). **[Documented practice]**

**Produce**

- problem statement and outcome map;
- evidence-backed user-need or job statements;
- content-necessity assessment; and
- initial success and harm measures.

**Gate**

There is a problem worth solving, content is a plausible part of the intervention, and assumptions are not presented as research findings. **[Inference]**

## Stage 2 — Learn users, domain, service, and product behavior

**Do**

- Review existing user research and analytics; involve actual or likely users and, where relevant, frontline, support, operational, and accessibility participants.
- Understand user vocabulary, prior knowledge, motivation, emotional and cognitive context, devices, environments, abilities, workarounds, and trust concerns.
- Learn the service operation, product behavior, domain concepts, policies, data, incentives, business rules, exceptions, and technical constraints.
- Trace each material factual claim to exact evidence sources and orthogonal evidence dimensions; determine any applicable governing instruments, jurisdiction, and effective date; and identify the accountable owner, authorized approver, and approval record separately.

The US government's plain-language guidance recommends learning audiences through questions, contact data, and metrics and warns that plain language is audience-specific rather than a fixed grade-level formula ([Write for your reader](https://digital.gov/guides/plain-language/principles/write-for-reader)). W3C recommends involving people with disabilities early and throughout design, alongside standards evaluation ([Involving users in evaluating web accessibility](https://www.w3.org/WAI/planning/involving-users/)). **[Cross-source finding]**

**Produce**

- research and domain evidence register;
- user, actor, and context profiles grounded in evidence;
- authoritative-fact and terminology register; and
- open research and policy questions.

**Gate**

The team can distinguish user evidence, operational evidence, authoritative facts, stakeholder opinions, and hypotheses. **[Inference]**

## Stage 3 — Inventory and audit the current experience

**Do**

- Inventory relevant pages, screens, components, states, messages, notifications, emails, support content, offline documents, scripts, design files, code strings, CMS entries, localization entries, and analytics.
- Record entry point, audience, task, locale, experience state, last update, traffic or use where available, duplication, contradiction, accessibility issue, and risk. For each relevant claim or content decision, link its evidence sources and orthogonal evidence dimensions, applicable governing instruments, accountable owner, authorized approvers and approval records, independent decision and delivery states, and evaluation records.
- Audit usefulness, accuracy, findability, consistency, reading burden, missing states, support demand, and content that should not exist.
- Separate observed implementation from inferred rationale and approved guidance.

GOV.UK transition guidance combines content audit with traffic, impact, staleness, duplication, research, and contact-center or forum evidence, then allows outcomes such as exclusion, gap-filling, different formats, or a non-content channel ([Transition guidance](https://www.gov.uk/guidance/govuk-transition-guidance-for-agencies)). The Scottish Government's content-design guidance includes discovery, content planning, fact checking, and archiving ([Guidance for content designers](https://servicemanual.gov.scot/browse/designing-your-service/content-standards/guidance-for-content-designers)). **[Documented practice]**

**Produce**

- content and state inventory;
- audit findings and evidence quality;
- duplication, contradiction, gap, and risk map; and
- keep, improve, merge, move, create, or retire recommendations.

**Gate**

The affected experience and its unknowns are visible enough that the team will not create avoidable duplication or silently inherit bad precedent. **[Inference]**

## Stage 4 — Model the journey, system states, and content objects

**Do**

- Map entry points, preconditions, sequence, decision points, alternate routes, interruptions, latency, errors, retries, reversals, exits, follow-up, and cross-channel or human handoffs.
- Model the concepts, entities, relationships, labels, metadata, hierarchy, navigation, and reusable content objects.
- Identify what information is needed at each point, what can be progressively disclosed, and what should be solved through behavior or non-text design.
- Include nonvisual reading and focus order, screen-reader announcements, offline touchpoints, and locale variation.

The IA Institute's professional overview describes information architecture as structuring, organizing, and labeling shared information environments for usability and findability ([What is IA?](https://www.iainstitute.org/sites/default/files/what_is_ia.pdf)). CDS includes content modeling, information architecture, flow documentation, and non-text interventions in content-design responsibility ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). **[Documented practice]**

**Produce**

- journey or service map;
- state and transition model;
- content object model, taxonomy, or IA appropriate to scale;
- content priority and message hierarchy; and
- entry-point and channel map.

**Gate**

Every proposed piece of content has a purpose, audience, trigger, state, place in the journey, and relationship to the underlying behavior or content object. **[Inference]**

## Stage 5 — Set content strategy, principles, and constraints

**Do**

- Decide what content will and will not do, which channels and formats are appropriate, how reuse and consistency should work, and how the experience serves both user and organizational outcomes.
- Select canonical concepts and terms; document definitions, aliases, prohibited ambiguity, owner, scope, locale, and exceptions.
- Apply or provisionally derive voice, tone, style, mechanics, accessibility, and localization rules, labeling inferred guidance as inferred.
- Agree content ownership, workflow, measurement, review triggers, and retirement policy.

Halvorson's foundational practitioner model frames strategy as the reason for content and connects user and business goals to substance, structure, workflow, and governance ([The discipline of content strategy](https://alistapart.com/article/thedisciplineofcontentstrategy/)). Brain Traffic's later “quad” similarly distinguishes substance, structure, workflow, and governance ([The Content Strategy Quad](https://www.braintraffic.com/blog/brain-traffic-lands-the-quad)). These are influential practitioner frameworks, not standards. **[Documented practice]**

**Produce**

- content strategy and content plan;
- terminology and concept model;
- voice, tone, and mechanics application rules;
- channel, reuse, and governance decisions; and
- review and maintenance plan.

**Gate**

The team has decision principles that can resolve tradeoffs, not merely adjectives or a list of preferred words. **[Inference]**

## Stage 6 — Form hypotheses and acceptance criteria

**Do**

- Convert material decisions into testable hypotheses: for this audience and context, this information, structure, language, or timing should support a named behavior or understanding.
- Define acceptance criteria for function, content completeness, authoritative accuracy, accessibility, localization, analytics, and operational readiness.
- Select qualitative and quantitative measures, baseline evidence, guardrails, and review timing.

Defra's content team documents using change hypotheses with expected effects and measures to improve its review process; that is one organizational operations experiment, not a universal template ([Using hypotheses to improve our content review process](https://defradigital.blog.gov.uk/2024/12/23/using-hypotheses-to-improve-our-content-review-process/)). **[Documented practice]**

**Produce**

- content hypothesis register;
- acceptance criteria and definition of done;
- test and measurement plan; and
- explicit decision thresholds or learning questions.

**Gate**

The team knows what evidence would support, challenge, or require changing the proposal. **[Inference]**

## Stage 7 — Co-design structure, behavior, and language in context

**Do**

- Explore multiple information and interaction approaches before converging on prose.
- Pair content design with interaction, product, service, research, engineering, and domain expertise as needed.
- Prototype the whole meaningful state: preceding trigger, layout, labels, actions, variables, error and recovery, follow-up, and nonvisual semantics.
- Draft the minimum useful content; remove content where behavior, hierarchy, or process can better meet the need.
- Include all variants and states, not only the happy-path static screen.

Portmann's research describes UX language work as distributed across copy documents, screenshots, versions, rationales, visual and technical constraints, code, and collaborators ([Portmann, 2025](https://doi.org/10.1017/9781009540605.004)). CDS prototypes structure and flow, critiques an early version, demos to the product team, and refines design and layout together ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). **[Cross-source finding]**

**Produce**

- contextual content prototype;
- state-complete content specification;
- options considered and rationale;
- variable, fallback, and localization notes; and
- updated decision and assumption log.

**Gate**

The proposal can be evaluated as an experience rather than a detached list of strings. **[Inference]**

## Stage 8 — Critique and specialist review

**Do**

- Hold a content or design critique while work is still changeable; give reviewers context, goals, constraints, evidence, options, and the specific feedback sought.
- Keep peer design critique, fresh-eyes editorial assurance, factual review, legal or compliance review, accessibility review, privacy and security review, localization review, and product or release approval distinct.
- Resolve comments against user need, product behavior, authoritative facts, and principles; do not accept rewrites solely because a reviewer prefers their own phrasing.
- Record conflicts, decisions, approvers, dates, scope, and unresolved risk.

UK government design notes describe content crits as early, psychologically safe peer feedback whose cadence depends on context ([Content crits: they're not scary](https://designnotes.blog.gov.uk/2022/08/09/content-crits-theyre-not-scary/)). DfE documents a separate final second-person review in a realistic preview, after subject-matter fact checking and with clearance and go-live planning ([Quality and assurance](https://design.education.gov.uk/content-design/quality-and-assurance)). CDS likewise distinguishes critique, fact check, inclusive review, translation feedback, and final fresh eyes ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). These are organizational methods whose exact sequence varies. **[Documented practice]**

**Produce**

- critique brief and decision record;
- peer assurance record;
- factual, legal, accessibility, localization, and other specialist findings; and
- revised prototype and open-risk register.

**Gate**

The relevant question has been reviewed by the relevant expertise, and neither a content critique nor a stakeholder sign-off is misrepresented as user validation. **[Inference]**

## Stage 9 — Evaluate with users and iterate

**Do**

- Test the content in representative tasks and contexts with actual or likely users, including people with disabilities and relevant language or locale groups.
- Choose a method appropriate to the question: observation-based usability, comprehension or paraphrase, findability, navigation, cloze, controlled comparison, longitudinal behavior, diary, interview, or support analysis.
- Observe whether people can find, understand, decide, act, recover, and accurately predict consequences; do not ask only whether they like the words.
- Analyze differences across audience, locale, access need, route, and risk; revise meaning, structure, behavior, or policy—not just phrasing.

US government plain-language guidance treats testing as integral, recommends starting early and using it more than once, and distinguishes focus groups for attitudes or expectations from comprehension evaluation ([Test](https://digital.gov/guides/plain-language/test)). W3C recommends combining standards review with evaluation involving disabled users ([Involving users](https://www.w3.org/WAI/planning/involving-users/)). **[Cross-source finding]**

**Produce**

- study plan and materials;
- findings with evidence strength and sample limitations;
- change decisions and updated hypothesis status; and
- residual risk and unanswered questions.

**Gate**

The team has proportionate evidence that the design meets the intended need, or has explicitly accepted and documented why further validation is not possible before release. **[Inference]**

## Stage 10 — Approve the right decisions

**Do**

- Route each decision through its accountable owner to the authorized approver for that exact scope: product or service behavior, domain facts, legal interpretation, policy, brand promises, privacy, accessibility assurance, locale language, and release risk.
- Require reviewers to approve the relevant scope rather than an undifferentiated document.
- Store semantic decision approval separately from its evidence sources and governing instruments, with decision version, authorized approver, product/audience/locale/release scope, date, conditions, expiration or review trigger, and linked evidence. Store any mutation/change approval as a different record bound to an exact diff, target, base revision, environment, purpose, conditions, and expiry.
- Keep content-design recommendation and accountable approval visible when they differ.

GOV.UK's service-team model assigns overall service and approval responsibility to a service owner while giving content designers responsibility for user-centered content and advocacy; quality is shared by the team ([What each role does](https://www.gov.uk/service-manual/the-team/what-each-role-does-in-service-team)). Scottish Government publishing guidance makes content owners responsible for accurate, current information and approval, while trained content designers handle writing, editing, style, and tone ([Publishing content about your service](https://servicemanual.gov.scot/publishing-content-about-your-service)). **[Documented practice]**

**Produce**

- scoped semantic decision approval record, or explicit `proposed` status;
- separate mutation/change approval requirements for any later source-of-truth patch;
- approved content and behavior version;
- accepted-risk and exception record; and
- exact release-approval record or explicit pending decision when release policy requires residual-risk acceptance.

**Gate**

No one is shown as approving facts or risks outside their authority, and semantic decision `approved` identifies exactly what meaning or behavior, by whom, for where, and for how long. Semantic decision approval, mutation/change approval, and release approval are separate records; none creates a system capability grant. **[Inference]**

## Stage 11 — Implement in the authoritative delivery system

**Do**

- Before any source-of-truth mutation, declare `local apply` or `remote apply`, record the result of P0-D or P0-E respectively, require a separately constructed task grant bound to the exact paths or objects, operations, base revision or current values, environment, expiry, and diff, and require a separate mutation/change approval bound to that exact diff, target, environment, and purpose. Record any P0-A–C gates used by the same task independently; if preparing or verifying the diff launches a formatter, compiler, test, local server, browser, app, device, emulator, or other process, also require P0-G and an exact runtime task grant. Run write-capable formatters/builds only on disposable scratch input; bring accepted output back through the typed P0-D/E transaction rather than letting the runtime process mutate the source of truth.
- A semantic decision may remain `proposed` while its exact patch is applied only to an isolated target explicitly constrained as draft/nonrelease by the mutation/change approval. Releasable or production targets require semantic decision approval where the content meaning, behavior, or rule is governed; enforcement additionally requires P0-F.
- Map every content item and state to its source file, component, key, schema field, CMS entry, notification template, design reference, and localization record as applicable.
- Preserve structure, variables, formats, plural and gender behavior, ordering, fallbacks, and nonvisual content—not only visible words.
- Update shared patterns or terminology sources when the decision is intentionally reusable.
- Keep one traceable decision record even when delivery is distributed; include rollback and migration paths.

CDS documents consolidating approved content for implementation, linking designs from a GitHub issue or editing code directly, then proofreading in code ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). That is evidence that code can be part of content practice, not a mandate that all organizations use GitHub or direct code edits. **[Documented practice]**

**Produce**

- implementation mapping or content manifest;
- declared capability phase, applicable gate results, and task-specific capability-grant/guarded-transaction record;
- source changes and migrations;
- localization package and notes;
- analytics instrumentation; and
- rollback or recovery plan.

**Gate**

For a releasable target, the implemented source represents the semantically approved meaning, states, variables, semantics, and locale behavior and can be traced back to the exact decision approval. A draft/nonrelease target may contain a `proposed` decision only under an explicit mutation/change approval and must preserve that proposed status. Every mutation also traces to a passing applicable phase gate, an independently issued task grant, and mutation/change approval; evidence strength, operating mode, and any applicable typed approval do not substitute for the gate or grant. **[Inference]**

## Stage 12 — Verify the built experience before release

**Do**

- Declare the capability phase used for each verification action. P0-A and an exact read grant cover only local static reads; P0-B and a separate grant cover model egress or connected reads. Any action that launches or attaches to a formatter, compiler, test, local server, browser, app, device, emulator, accessibility inspector, or runtime instrumentation requires an independently passing P0-G profile and a least-privilege runtime task grant bound to the exact executable/tool, arguments or actions, build/environment, origins/routes, filesystem/network/data/credential boundary, duration, cancellation, and cleanup. Any corrective mutation returns to Stage 11 and separately requires P0-D or P0-E, an exact write grant, and mutation/change approval.
- Review the implemented experience in representative devices, breakpoints, states, roles, permissions, data ranges, locales, and assistive technologies.
- Verify triggers, timing, hierarchy, focus and reading order, labels, status announcements, errors and recovery, link destinations, truncation, variables, fallbacks, analytics, and cross-channel follow-up.
- Run applicable standards and automated checks, then perform human evaluation for issues automation cannot decide.
- Compare the built version with the approved version; classify changes and re-route material differences.

WCAG 2.2 includes content-dependent success criteria for titles, headings and labels, link purpose, consistent identification and help, error identification and suggestion, redundant entry, accessible names, programmatic state, and error prevention for consequential actions ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)). Conformance scope and success level must be stated; meeting WCAG does not establish overall usability or inclusion. **[Sourced fact]**

The UK Government Functional Standard distinguishes validation—evidence that an intended use or need is met—from verification—evidence that specified requirements are fulfilled ([GovS 005: Digital](https://www.gov.uk/government/publications/government-functional-standard-govs-005-digital/government-functional-standard-govs-005-digital-html)). **[Documented practice]**

**Produce**

- implementation verification report;
- declared verification capability phases, applicable P0-A/B/G results, and task-specific static, connected, or runtime grants as used;
- accessibility, localization, and content QA results;
- defects and disposition;
- final release comparison; and
- verified build identifier.

**Gate**

The team has verified the actual built experience, not only the design artifact, and material deviations are resolved or explicitly accepted by the right authority. The verification record identifies the build/environment, route/state/role/locale/flags, actual process/browser/device trace, declared capability phases, passing applicable gates, exact grants, evidence captured, cleanup, and limitations. P0-G and runtime access do not authorize a corrective write, connected read, model egress, publication, or semantic approval. **[Inference]**

## Stage 13 — Release, observe, and evaluate outcomes

**Do**

- Separate semantic decision approval and release approval from execution authority and mutation/change approval. Before any remote publication, send, or production mutation, declare `remote apply`, record the P0-E result, require a task-specific grant bound to the exact object, operation, audience, environment, approved version, expiry, and recovery path, and require the exact mutation/change approval bound to that publication transaction plus semantic decision approval where applicable and the exact release-approval record when release policy requires residual-risk acceptance. Static local observation uses P0-A; API/connector observation uses P0-B; any browser, app, device, emulator, local server, or other executable observation additionally uses P0-G and its own runtime task grant.
- Confirm release state, effective date, locale and audience scope, communication and support readiness, monitoring owner, and rollback thresholds.
- Observe task completion, errors, abandonment, repeated attempts, comprehension, support contact, search behavior, accessibility feedback, complaints, and unintended outcomes as appropriate.
- Segment evidence carefully; a global average can hide harm to a locale, access group, edge route, or high-consequence state.
- Compare results with baseline, hypothesis, and guardrails; distinguish correlation from causal evidence.

**Produce**

- live release record;
- declared release/observation capability phase, applicable gate results, and task-specific capability-grant record;
- outcome and guardrail dashboard or report;
- support and feedback synthesis;
- follow-up decisions; and
- experiment or incident record where applicable.

**Gate**

The content is not merely marked “done”; it has a known live state, observable outcomes, an accountable owner, a recorded capability phase/gate/grant for release or observation actions, and a response path if harm or regression appears. Release approval and delivery state do not authorize publication by themselves. **[Inference]**

## Stage 14 — Maintain, learn, migrate, and retire

**Do**

- Monitor factual freshness, policy and product changes, broken routes, search demand, support signals, accessibility and localization defects, terminology drift, duplication, ownership changes, and performance.
- Review at risk-based intervals and on events such as policy updates, component changes, market launches, incidents, source changes, or expiring approval.
- Update, merge, move, archive, redirect, or retire content; preserve required records and avoid leaving stale entry points.
- Feed repeated issues into patterns, schemas, guidance, linting, training, team structure, or upstream product and policy changes.

GOV.UK's current publishing guidance treats existing content as something to audit, monitor, update, improve, and retire, including coordination among co-owning organizations ([Manage existing GOV.UK content](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/manage-existing-govuk-content/)). Scottish Government guidance explicitly includes web archiving in the content-design lifecycle ([Guidance for content designers](https://servicemanual.gov.scot/browse/designing-your-service/content-standards/guidance-for-content-designers)). **[Documented practice]**

**Produce**

- ownership and review schedule;
- freshness and drift report;
- maintenance decisions and changed-source record;
- migration, redirect, archive, or deprecation record; and
- reusable organizational learning.

**Gate**

Every live content object has an owner and review trigger, and retirement preserves necessary user routes, records, and provenance. **[Inference]**

## Takeover workflow: when `content.md` arrives after the product exists

**[Inference]** Takeover requires a different first promise: **understand before normalizing**.

1. **Declare read-only discovery.** Pass P0-A and issue a least-privilege task grant before statically reading exact enrolled repository roots; pass P0-B and issue a separate scoped grant before any model egress or connected read. Then locate only the authorized repositories, designs, CMSs, localization stores, notifications, support and policy sources, analytics, owners, release branches, and environments.
2. **Build an implementation inventory.** Capture exact content with surface, component, route, trigger, state, role, locale, variable, source location, and last change where recoverable.
3. **Reconstruct provenance.** Link decision records, research, approvals, tickets, experiments, style guidance, and owners. Mark absent evidence; do not invent it.
4. **Classify independent records.** Record evidence observation strength, challenge, freshness, lineage, and epistemic qualifier separately from decision and delivery states. One message can be approved but unmapped, implemented but unapproved, or observed live while its evidence is corroborated, disputed, and stale; preserve those combinations explicitly.
5. **Map journeys and concepts.** Find orphan entry points, missing recovery, duplicate concepts, divergent terms, source-language assumptions, and cross-channel contradictions.
6. **Risk-rank the backlog.** Prioritize harm, blocked tasks, controlled-fact errors, accessibility, security or privacy confusion, locale failure, and high-volume support burden before cosmetic consistency.
7. **Establish a baseline.** Record outcome, support, quality, and ownership evidence before broad changes so impact and regression can be assessed.
8. **Propose canonical systems.** Present terminology, voice, patterns, model, workflow, and ownership as `proposed`; obtain semantic decision approval under Stage 10 for any version that will govern releasable content or enforcement.
9. **Remediate in traceable slices.** Change a coherent journey or risk class only under the Stage 11 transaction: mandatory mutation/change approval for the exact diff/target/environment/purpose, a passing P0-D or P0-E result, and an exact write grant. A proposed semantic decision may enter only an isolated draft/nonrelease target; a releasable target requires applicable semantic decision approval. Verify the built product under Stage 12, adding P0-G and an exact runtime grant whenever verification launches or attaches to a process, browser, app, device, emulator, server, or runtime instrumentation; preserve rollback.
10. **Add continuous controls.** Introduce advisory static linting only for objective, applicable rules. Autonomous blocking additionally requires semantically approved deterministic rules, P0-F, and an exact enforcement grant; if enforcement launches or attaches to a build, test, browser, device, emulator, server, or other process, it also requires P0-G and an exact runtime grant. Use human review for context, truth, tone, ethics, and unresolved exceptions. Follow the approval, implementation, verification, and release boundaries in Stages 10–13.

## Risk-scaled paths

**[Inference]** The lifecycle should scale evidence and assurance, not apply the same ceremony to every string.

| Risk profile | Example | Minimum proportionate assurance |
|---|---|---|
| **Low consequence, reversible** | Optional preference label with easy reversal | Pattern and context review, basic accessibility and implementation verification; lightweight observation after release |
| **Moderate task or trust impact** | Account onboarding, recurring notification, destructive-but-recoverable action | User/problem evidence, journey and state review, content critique, factual review, accessibility and locale checks, built verification, outcome monitoring |
| **High consequence or controlled** | Consent, eligibility, money movement, medical direction, safety action, rights, irreversible deletion | Fit evidence-source mapping; explicit governing-instrument applicability; separate accountable owners, authorized approvers, and approval records by claim and scope; representative research including edge cases; explicit confirmation or error-prevention design where applicable; accessibility and localization specialists; scoped semantic decision and release approvals plus mandatory mutation/change approval for writes; audit trail; rollback/incident plan; closer monitoring |

WCAG 2.2 requires additional error-prevention behavior for web interactions that create legal commitments, financial transactions, data changes, or test responses, within the criterion's precise conformance scope ([WCAG 2.2, 3.3.4](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data)). **[Sourced fact]** This does not by itself define every non-web or domain-specific control.

## Emergency path

**[Inference]** Urgency compresses exploration; it does not authorize invented facts.

1. Confirm the incident owner, current status, affected people and locales, known impact, safe action, alternative channel, update cadence, and next decision time.
2. State uncertainty explicitly and avoid promises without operational support.
3. Prioritize safety, task continuity, and recovery over brand flourish.
4. Obtain the minimum fit factual evidence and scoped semantic decision approval, plus an exact release-approval record when release policy requires residual-risk acceptance; preserve each exact approved version and rollback. Separately require mutation/change approval plus the applicable P0-D or P0-E result and a task-specific capability grant before any local write, send, or publication; require P0-G and an exact runtime grant for any executable verification. Urgency and approval do not create execution authority.
5. Verify display, delivery, links, variables, timestamps, timezone, and accessibility in the actual channel.
6. After stabilization, perform a fuller journey audit and post-incident content review; convert repeated failure into system controls.

## Definition of done needs independent evidence and state records

**[Inference]** “Final” is not one state. Evidence condition, decisions, and delivery change independently:

| Record/system | Dimensions or states | Definition-of-done question |
|---|---|---|
| **Evidence** | observation: unobserved/observed/corroborated; challenge: undisputed/disputed; freshness: current/stale; lineage: active/superseded; epistemic qualifier: none/inferred/assumed | What was actually found, how well is it supported, is it challenged or current, and what lineage/qualification applies? |
| **Decision** | question, option, proposed, approved, rejected, superseded, deprecated, retired | What version was decided, by whom, for which scope, and with what conditions? |
| **Delivery** | unmapped, mapped, patched, built, verified, released, observed-live, rolled-back, removed | Where is the expression, what was checked, and who can actually encounter it? |
| **Evaluation record** | test or measure tied to an object/version | What outcome was examined, by what method, for whom, and with what limitations? |

The work's definition of done names the required values on each applicable dimension or state system; it does not infer approval from implementation, live delivery from verification, or effectiveness from release. None of these evidence dimensions or states grants system capability: the applicable security gate result and independently issued task grant remain separate control records. See the canonical candidate definitions in [candidate-system-model.md](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records).

## Workflow failure patterns

- Writing before the system behavior, factual authority, or user problem is understood.
- Reviewing isolated strings instead of triggers, states, actions, recovery, and follow-up.
- Treating a content critique, stakeholder preference, legal review, user test, and release approval as the same kind of evidence.
- Testing only the source language or happy path.
- Localizing after layout, variable construction, and content model are frozen.
- Handoffs that remove rationale, variants, open questions, or implementation mapping.
- Calling content “accessible” from automated checks alone.
- Shipping without verifying the built experience.
- Using conversion as the only outcome in a trust- or rights-sensitive journey.
- Treating current implementation as canonical guidance.
- Creating governance without an owner, exception path, review trigger, or retirement mechanism.
- Claiming deterministic detection of AI-authored content instead of checking provenance and observable quality defects.

## Gaps and research still needed

- **[Open question]** Validate stage and gate usefulness with practitioners in different industries, locales, team sizes, and delivery models.
- **[Open question]** Develop domain-specific risk paths for health, finance, insurance, public benefits, identity, safety, employment, education, and child-directed products.
- **[Open question]** Research conversational, voice, multimodal, notification, and agent-mediated evaluation methods beyond web page and form guidance.
- **[Open question]** Define evidence thresholds for recommendation confidence, refusal, and escalation separately from authorization; then validate which P0-A–G gate evidence and independently issued task capability grants are required to statically read, use a model or connector, draft an isolated artifact, change a source, run controlled runtime verification, open a review, enforce an approved deterministic rule, or block a release.
- **[Open question]** Establish practical methods for linking one content decision across design, code, CMS, translation memory, experimentation, support, and analytics without forcing one tool.
- **[Open question]** Compare lifecycle practices in editorial newsrooms, technical documentation, marketing operations, customer support, and decentralized open-source projects.
- **[Open question]** Gather evidence on content debt, maintenance cost, and which health indicators predict user harm or operational burden.
