---
title: Content design discipline and competency model
status: research-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Cross-sector foundation for a repository-native content-design agent
---

# Content design discipline and competency model

## Purpose and evidence language

This document defines a broad working model for `content.md`. It is deliberately not a universal job description. Role names, remits, decision rights, and review practices vary by organization, sector, language, product maturity, and risk.

Claims use the canonical labels in the [research protocol](../00-method/research-protocol.md): **[Sourced fact]**, **[Documented practice]**, **[Research finding]**, **[Cross-source finding]**, **[Inference]**, **[Proposal]**, and **[Open question]**. Organization, professional association, practitioner, normative standard, and scholarly research describe source type or evidentiary role separately; they do not determine product applicability, ownership, approval, or universality.

The detailed evidence records, access notes, and limitations are in [foundations-source-notes.md](../sources/foundations-source-notes.md).

## Working definition

**[Inference]** Content design is the evidence-led practice of deciding what information and interaction people need, then shaping its meaning, structure, sequence, format, and language so they can understand, decide, and act across an end-to-end experience. It connects user needs with product behavior, organizational goals, authoritative facts, and technical constraints, and it treats content as a maintained system rather than a one-time writing deliverable.

This definition combines, without treating as identical:

- the UK government's view of one coherent body of content across an end-to-end journey, including digital and offline channels ([Government Digital and Data capability framework](https://ddat-capability-framework.service.gov.uk/role/content-designer));
- the Canadian Digital Service emphasis on meaning, mental models, structure, bilingual parity, and all five layers of a designed experience ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/));
- Sarah Winters' practitioner process of research, user needs, channel and journey mapping, creation, and iteration ([Content Design London](https://contentdesign.london/blog/what-is-content-design)); and
- research showing that UX language work is distributed across people, tools, time, code, and organizational constraints rather than reducible to isolated strings ([Portmann, 2025](https://doi.org/10.1017/9781009540605.004)).

### What the definition does not grant

**[Inference]** A content-design remit does not automatically make its holder:

- the authority for legal, policy, medical, financial, eligibility, pricing, safety, privacy, or technical facts;
- the product owner for behavior, scope, or release priority;
- the sole owner of accessibility, localization, research, brand, information architecture, or service design;
- entitled to rewrite specialist technical documentation, editorial publishing, support, or marketing work without the relevant expertise and authority; or
- able to infer that implemented copy is approved, correct, effective, or current.

The discipline can identify, frame, model, propose, test, and govern decisions across these seams. Controlled facts and release decisions still need their accountable owners.

## The field does not have one stable boundary

**[Research finding]** In interviews with UX writers at medium-to-large international companies, Portmann found fuzzy boundaries among UX writing, content design, and information architecture, as well as work that extended beyond interface copy into research, voice, flows, and systems. The study is qualitative and geographically concentrated, so it demonstrates variation rather than a global taxonomy ([Portmann, 2025](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/BD1FF1E1A0AEE632108443160A56C4B7/9781009540582c2_29-54.pdf/designing-words.pdf)).

**[Documented practice]** The UK government separates content designer, content strategist, and technical writer capability profiles. It gives content strategy explicit responsibility for governance, workflow, and taxonomy, while technical writing centers specialist technical audiences and documentation ([content designer](https://ddat-capability-framework.service.gov.uk/role/content-designer), [content strategist](https://ddat-capability-framework.service.gov.uk/role/content-strategist), [technical writer](https://ddat-capability-framework.service.gov.uk/role/technical-writer)). CDS gives content designers responsibilities spanning strategy through surface and explicitly notes overlap with service and interaction design. These models are compatible in some teams and contradictory in others.

**[Documented practice]** A Brain Traffic interview about Atlassian describes content design, strategy, engineering, and operations as overlapping capabilities that may be separate roles, combined jobs, or distributed work. That account is useful organizational evidence, not a standard ([Brain Traffic interview with John Collins](https://www.braintraffic.com/podcast/episode-37-john-collins-atlassian-maturing-content-disciplines)).

The operating rule for `content.md` should therefore be: **role label is evidence, not authority**. Discover the local responsibility model before taking over work.

## Adjacent disciplines: centers of gravity, not walls

| Practice | Primary question or center of gravity | Typical outputs | Important seam with content design |
|---|---|---|---|
| **Content design** | What information or interaction will help a person complete a goal in this context? | User needs, journeys, content structures, flows, prototypes, interface content, patterns, test evidence, lifecycle decisions | Integrates meaning, structure, behavior, and language; remit varies from interface copy to service-wide content. **[Inference]** |
| **UX writing** | What language helps someone understand and operate a digital interface? | Labels, instructions, actions, messages, onboarding, notifications, conversational turns, voice guidance | Often used interchangeably with content design; in some organizations it is interface-centered, while practitioners may also work on research, flows, and systems. Do not enforce a universal hierarchy. **[Research finding]** ([Portmann](https://doi.org/10.1017/9781009540605.004)) |
| **Microcopy or UI copy** | What words appear in a bounded interface element or moment? | Button labels, field labels, helper text, confirmations, errors, empty states | An output class, not necessarily the full profession. A string cannot be judged safely without trigger, state, behavior, and journey context. **[Inference]** ([Kinneret Yifrah interview](https://uxcontent.com/interview-kinneret-yifrah/)) |
| **Content strategy** | Why should content exist, how will it meet user and organizational goals, and how will it be governed? | Audits, themes, messaging, channel strategy, governance, workflow, taxonomy, lifecycle and measurement plans | In some teams this is a senior content-design competence; in others it is a distinct role. **[Documented practice]** ([Halvorson](https://alistapart.com/article/thedisciplineofcontentstrategy/), [UK capability framework](https://ddat-capability-framework.service.gov.uk/role/content-strategist)) |
| **Information architecture** | How should information be organized, labeled, related, navigated, and retrieved? | Sitemaps, navigation, taxonomies, ontologies, labeling systems, search and findability models | Content designers may lead local structures and labels or partner with an IA specialist on larger ecosystems. **[Documented practice]** ([IA Institute](https://www.iainstitute.org/sites/default/files/what_is_ia.pdf), [UK digital outcomes capabilities](https://www.gov.uk/guidance/digital-outcomes-team-capabilities)) |
| **Content modeling and content engineering** | What reusable content objects, fields, relationships, rules, and delivery mechanisms are needed? | Schemas, structured content models, validation rules, APIs, CMS configuration, content pipelines | Content design owns semantic intent only where authorized; engineering owns executable integrity. Both must agree on variables, fallbacks, reuse, and localization behavior. **[Inference]** |
| **Content operations** | How can people, processes, tools, and governance sustain content quality and throughput? | Intake, workflow, roles, calendars, tooling, review cadences, governance, service levels, health reporting | Operationalizes strategy and maintenance; may sit in a central team, design operations, or be distributed. The term is not standardized. **[Documented practice]** ([Brain Traffic](https://www.braintraffic.com/podcast/episode-37-john-collins-atlassian-maturing-content-disciplines)) |
| **Technical writing** | How can a specialist audience correctly use, integrate, operate, or maintain a technical system? | API and developer documentation, procedures, concepts, references, release and operational documentation | User-centered and lifecycle-aware, but often requires deeper technical-domain expertise and different information structures than product UI. **[Documented practice]** ([UK technical-writer profile](https://ddat-capability-framework.service.gov.uk/role/technical-writer)) |
| **Editorial practice** | Is a publication accurate, coherent, useful, consistent, and ready for its audience and channel? | Commissioning, developmental and copy editing, fact checking, publication schedules, house style, archives | Overlaps in clarity, style, quality assurance, and lifecycle; editorial work often centers authored publications rather than interactive behavior. **[Inference]** |
| **Marketing, brand, and copywriting** | How will communication build awareness, preference, demand, or action for a defined audience and organizational goal? | Campaign concepts, acquisition pages, ads, email programs, brand narratives, conversion copy | Product and marketing journeys meet at entry points, promises, consent, and expectation setting. Product content must not silently change a controlled brand or campaign claim. **[Inference]** Content marketing's commercial center is stated explicitly by the [Content Marketing Institute](https://contentmarketinginstitute.com/what-is-content-marketing). |
| **Service design** | How should people, processes, infrastructure, and touchpoints work together as an end-to-end service? | Service blueprints, ecosystem maps, operating models, cross-channel journeys | Content design shapes the information layer within and across those touchpoints; neither discipline subsumes the other. **[Documented practice]** ([CDS service design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/service-design-at-cds/)) |
| **Interaction and product design** | What behavior, sequence, control, layout, and feedback should enable the task? | Flows, wireframes, prototypes, components, interaction specifications | Hierarchy, behavior, and language are interdependent and should be designed together. **[Documented practice]** ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)) |
| **User research** | What do people do, need, understand, and experience, and how can the team know? | Research plans, studies, observations, findings, evidence repositories | Content designers participate in framing and observing research but should not fabricate user evidence or displace research expertise. **[Documented practice]** ([GOV.UK user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)) |
| **Localization and internationalization** | Can an experience work linguistically, culturally, and technically across locales? | Locale requirements, translations, terminology, transcreation, language QA, bidirectional and format specifications | Localization is not downstream word substitution. Content, design, data, and code all affect parity. **[Cross-source finding]** ([W3C internationalization quick tips](https://www.w3.org/International/quicktips/index), [CDS bilingual workflow](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)) |

## Responsibility layers

**[Inference]** A full-stack content-design capability needs to reason through five coupled layers. These are decision layers, not a promise that one person owns every decision.

1. **Purpose and outcome** — define whose problem is being solved, the desired user and service outcomes, and whether content is needed at all.
2. **Meaning and structure** — model concepts, objects, relationships, hierarchy, sequence, entry points, channels, and states.
3. **Interaction and expression** — design behavior-supporting language, voice, tone, terminology, mechanics, and non-text alternatives in context.
4. **System and delivery** — specify reusable patterns, structured fields, variables, source locations, localization behavior, implementation mapping, workflow, and ownership.
5. **Assurance and lifecycle** — test, approve, verify, measure, maintain, migrate, and retire content with provenance and decision memory.

CDS documents a related strategy-to-surface model as its own practice; it should be treated as a useful comparison, not the origin of every layer above ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)).

## Competency model

| Competency | Observable capability | Failure signal |
|---|---|---|
| **Problem framing and content necessity** | Separates a user problem from a requested solution; can recommend changing a process, interaction, or policy instead of adding words. **[Inference]** | Starts drafting from a ticket title; treats every request as a page or string. |
| **User, task, and context evidence** | Identifies actual or likely users, goals, prior knowledge, vocabulary, environment, emotional state, barriers, and cross-channel behavior; distinguishes research from stakeholder opinion. **[Documented practice]** ([GOV.UK](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)) | Invents needs or personas; substitutes readability scores for audience understanding. |
| **Product, service, and domain reasoning** | Understands intended behavior, business rules, service operations, policy, data, failure modes, and consequences of error; exposes contradictions and unknowns. **[Inference]** | Writes around unclear behavior; turns an assumption into a factual claim. |
| **Journey and state modeling** | Maps entry, preconditions, happy path, alternatives, errors, recovery, exits, follow-up, offline touchpoints, and operational handoffs. **[Inference]** | Optimizes one screen while creating a contradiction or dead end elsewhere. |
| **Information architecture and content modeling** | Organizes and labels information; defines reusable objects, relationships, metadata, hierarchy, navigation, and retrieval behavior appropriate to the scale. **[Documented practice]** | Produces prose blobs, duplicate concepts, unstable labels, or a taxonomy without user or operational evidence. |
| **Interaction and UX writing** | Designs concise, usable labels, instructions, actions, disclosures, confirmations, notifications, errors, and recovery language in a functioning prototype. **[Inference]** | Reviews strings out of state or after behavior and layout are frozen. |
| **Voice, tone, terminology, and mechanics** | Derives or applies controlled terminology and voice principles; varies tone by task, risk, emotion, relationship, channel, and locale while protecting meaning. **[Inference]** | Uses adjectives as a complete voice system; changes a controlled term for stylistic variety. |
| **Accessibility and inclusive content** | Designs meaningful titles, headings, labels, link purpose, instructions, status, error identification and recovery; involves disabled people in evaluation; checks content beyond the visual layer. **[Sourced fact]** ([WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C involving users](https://www.w3.org/WAI/planning/involving-users/)) | Treats accessibility as a final spellcheck or claims a screen is accessible from prose alone. |
| **Localization, internationalization, and culture** | Plans for language expansion, grammar, direction, formats, pluralization, variables, cultural meaning, and locale-specific facts; works with local experts early. **[Inference]** | Concatenates fragments, uses source-language word order as logic, or treats machine translation as parity. |
| **Risk, ethics, and authority** | Classifies consequence and factual authority; escalates controlled claims; identifies manipulative, coercive, discriminatory, or misleading content and interaction. **[Inference]** | Optimizes conversion over informed choice; implies certainty the source cannot support. |
| **Prototyping, research, and evaluation** | States a content hypothesis, builds enough context to test it, selects an appropriate method, observes behavior and comprehension, and distinguishes validation from implementation verification. **[Inference]** | Asks whether participants “like the copy”; treats stakeholder approval as user evidence. |
| **Technical and production fluency** | Reads design and code context; understands components, content keys, CMS schemas, APIs, variables, analytics, notifications, assistive-technology semantics, and release mechanics enough to specify and verify behavior. **[Inference]** ([Portmann](https://doi.org/10.1017/9781009540605.004)) | Hands off a document with no state, key, variable, fallback, source, or implementation mapping. |
| **Collaboration and facilitation** | Pairs across disciplines, frames critique, negotiates constraints, records decisions, and routes factual, legal, accessibility, localization, and release decisions to accountable owners. **[Cross-source finding]** ([Feng, Li, and Zhang](https://doi.org/10.1145/3544548.3581273)) | Equates collaboration with approval meetings; cannot say who decides what. |
| **Strategy, governance, and operations** | Connects individual choices to patterns, systems, workflows, ownership, reuse, maintenance, and measurable outcomes. **[Documented practice]** | Ships isolated strings without source of truth, owner, review trigger, or retirement path. |
| **Evidence communication and leadership** | Explains rationale and uncertainty, documents risks and unresolved decisions, improves team capability, and changes the system when repeated defects expose a systemic cause. **[Inference]** | Presents taste as fact; hides conflict; repeatedly patches symptoms. |

### Competence is contextual, not a single ladder

**[Inference]** A person or agent can be strong at interface language and weak at taxonomy, or strong in public-service guidance and unqualified for clinical consent. Seniority should not be modeled only as “writes harder content.” Useful progression dimensions are:

- **scope:** element → flow → journey → service → portfolio or platform;
- **uncertainty:** known pattern → ambiguous problem → contested or novel domain;
- **risk:** reversible inconvenience → material financial, legal, health, safety, or rights impact;
- **system influence:** follows guidance → improves patterns → governs ecosystems and operating models;
- **collaboration:** contributes → facilitates → aligns decision-makers and develops others; and
- **evidence:** applies findings → designs evaluation → establishes measurement and learning systems.

The UK capability framework provides one detailed public progression model, but its civil-service grades and skill names should not be copied as a universal ladder ([content designer profile](https://ddat-capability-framework.service.gov.uk/role/content-designer)).

## What must be known before writing

**[Inference]** Drafting can begin with partial knowledge when the work is explicitly exploratory. Publication-quality content cannot. Before writing, create a knowledge contract that records each material claim through separate fields: evidence source and observation/challenge/freshness/lineage/epistemic dimensions; governing-instrument applicability and control class; accountable owner and authorized approver; decision state; conflict record; delivery state; and evaluation evidence. Human-facing summaries such as `known`, `assumed`, `proposed`, `controlled`, or `unresolved` may be derived views, never one mixed canonical classification.

| Area | Minimum questions | If missing |
|---|---|---|
| **Request and outcome** | What prompted the work? What user and service outcome should change? Why is content believed to be the intervention? | Reframe the request; do not silently accept the proposed solution. |
| **People and context** | Who is affected, including non-primary and excluded users? What are they trying to do, what do they already know, and under what time, emotion, device, ability, and environmental constraints? | Mark audience claims as assumptions; plan or request research. |
| **Journey and entry points** | Where can people arrive from? What happened before? What must happen next? Which channels, actors, and operational handoffs are involved? | Map the smallest defensible end-to-end slice before optimizing a screen. |
| **Behavior and states** | What does the system actually do? What are the preconditions, branches, delays, errors, retries, limits, reversals, and recovery routes? | Block final or controlled copy; expose product ambiguity. |
| **Evidence, control, and approval** | Which claims are controlled? Which evidence sources support or dispute them? Which governing instruments apply? Who is the accountable owner and authorized approver? What jurisdiction, effective date, exceptions, and approval record apply? | Use placeholders or questions, not plausible-sounding facts. |
| **Information model** | What concepts, objects, relationships, hierarchy, labels, metadata, and reuse already exist? Which decision version is approved/current for this scope? | Inventory and model before adding duplicate terminology or content. |
| **Existing experience** | What content is live, in code, design, CMS, support, notifications, or policy? What are its evidence dimensions, decision state, delivery state, evaluation evidence, conflicts, and orphaned records? | Treat it as observed evidence, never automatic precedent. |
| **Voice and terminology** | Which documented voice, tone, style, terminology, mechanics, and prohibited terms apply? Which governing system, accountable owner, and authorized approval route apply? | Infer only provisionally and label the inference; do not invent canon. |
| **Surface and constraints** | Which component, channel, layout, device, interaction pattern, and nonvisual experience? What length, ordering, and timing constraints are real rather than cosmetic? | Draft in a representative prototype and record unresolved constraints. |
| **Accessibility and inclusion** | What headings, labels, descriptions, announcements, errors, instructions, and cognitive demands exist? Who may be excluded? | Bring accessibility into the design and test plan, not a post-draft check. |
| **Locale and culture** | Which languages, regions, scripts, formats, legal regimes, and cultural expectations apply? Is source-language primacy acceptable? | Involve locale expertise and design for parity before freezing structure. |
| **Data and variables** | Which values are dynamic? What are their types, ranges, units, formatting, privacy sensitivity, missing states, plural behavior, and fallbacks? | Do not approve a single static string as the complete content. |
| **Measurement and maintenance** | What would success, harm, or regression look like? Who is accountable after release? What event triggers review or retirement? | Add an accountable owner, baseline, evaluation plan, and review trigger before release. |

CDS's documented “Investigate” step independently names purpose, users, subject-matter facts, legal and technical constraints, terminology, content audit, and bilingual context as preconditions to drafting ([Content design at CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). GOV.UK similarly requires evidence-backed user needs stated as problems rather than solutions ([Start by learning user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)). These are strong organizational examples, not proof that every project uses the same checklist.

## Operating model for a content agent

**[Inference]** “Take over content” should mean **take responsibility for the completeness and coherence of content-design decisions**, not seize every adjacent decision. The canonical candidate defines five bounded modes—Discover, Advise, Draft, Apply, and Enforce—with progressively higher action scope, risk, traceability, and verification requirements. A mode never grants capability: each action requires a separately constructed least-privilege grant and the applicable phase gate. See [Agent operating modes](../08-synthesis/candidate-system-model.md#agent-operating-modes).

The agent must never convert an inference into organizational guidance simply because it is repeated. It should record orthogonal evidence dimensions, independent decision and delivery states, and evaluation records attached to exact versions; see [Independent evidence, decision, and delivery records](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records).

## Implications for `content.md`

**[Inference]** A credible repository-native content agent needs more than a prose style guide. Its foundation should encode:

1. a local evidence-source, governing-instrument, accountable-ownership, approval, and decision-rights contract;
2. a structured product, journey, state, and content-object model;
3. a registry of evidence sources, governing instruments, controlled facts, terminology, voice, patterns, owners, approvers, and exceptions;
4. risk- and locale-aware workflows and approval gates;
5. source mappings from decisions to code, design, CMS, localization, support, and analytics;
6. methods for critique, user evaluation, implementation verification, and measurement;
7. orthogonal evidence dimensions; independent decision and delivery states; accountable ownership and approvals; evaluation records; review triggers; deprecation; and decision history; and
8. explicit uncertainty, conflict, and escalation behavior.

Natural-sounding prose is an output quality. It is not proof that the product meaning, interaction, evidence/control routing, accessibility, or maintenance model is sound.

## Gaps and research still needed

- **[Open question] Global terminology:** Most detailed public role frameworks found are Anglophone and disproportionately government or large technology organizations. Research is needed in more regions, languages, company sizes, and non-digital services.
- **[Open question] Adjacent-profession standards:** Current professional standards for editorial practice, technical communication, localization, and content operations need direct comparison; public job descriptions are not sufficient.
- **[Open question] Domain competence:** The competency model must be stress-tested against health, finance, insurance, education, public benefits, enterprise administration, marketplaces, creator tools, games, and safety-critical systems.
- **[Open question] Marketing/product seam:** Research should test how organizations govern promises and terminology across acquisition, product, lifecycle messaging, support, and legal disclosures.
- **[Open question] Agent authority:** Practitioner and organizational research is needed on when teams would allow an agent to advise, draft, edit sources, or enforce checks, and what audit evidence they require.
- **[Open question] AI-origin claims:** There is no reliable basis here for deterministic “AI content detection.” Future work should focus on observable defects, unsupported claims, provenance, and review history rather than authorship guesses.
- **[Open question] Outcomes:** More evidence is needed linking particular content-design competencies and operating models to task success, comprehension, trust, error reduction, inclusion, and maintenance cost.
