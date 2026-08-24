---
title: Content modeling and information architecture for a repository-native content-design agent
status: research-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Content models, IA, taxonomy, ontology, navigation, search, structured content, and AI-mediated retrieval across greenfield and existing products
source_notes: ../sources/ia-source-notes.md
---

# Content modeling and information architecture

## Purpose, scope, and claim language

This workstream answers a foundational question for `content.md`: how should a full-stack content-design agent understand and shape the information system behind the words, not merely edit the words it can find?

The study covers:

- semantic content models and structured content;
- information architecture, navigation, labeling, and findability;
- taxonomies, controlled vocabularies, and formal ontologies;
- relationships among product meaning, repositories, UI components, CMS records, databases, APIs, search indexes, and rendered experiences;
- internal search, external web discovery, and agent-mediated retrieval;
- greenfield modeling and takeover of an existing product;
- decision rights, governance, evaluation, and failure recovery; and
- product implications for a repository-native content-design agent.

It does **not** propose that every product needs a formal ontology, graph database, headless CMS, vector store, or new navigation. Those are implementation choices whose value depends on the problem.

Claim labels follow the project protocol:

- **[Sourced fact]** — directly stated by a cited standard, specification, organization, or other primary source within its scope.
- **[Documented practice]** — a named organization's or practitioner's described way of working.
- **[Research finding]** — a result reported by peer-reviewed or scholarly research within its study conditions.
- **[Cross-source finding]** — a conclusion supported by several sources but not stated verbatim by one source.
- **[Inference]** — a conclusion drawn for this research problem.
- **[Proposal]** — a recommended operating rule or artifact for `content.md`.
- **[Product hypothesis]** — a product behavior that must be tested before it becomes a stable requirement.
- **[Open question]** — unresolved by the available evidence.

Detailed records, access modes, dates, and limitations are in [ia-source-notes.md](../sources/ia-source-notes.md).

## Executive answer

**[Cross-source finding]** Content modeling and information architecture are not preparatory documentation around the “real” work of writing. They are how a content designer decides:

- what things the product recognizes;
- what those things mean and how they relate;
- what information exists, who needs it, and at what moment;
- which structures, labels, paths, and retrieval methods help people act;
- what can be reused, localized, transformed, generated, or retired;
- where facts come from and which governing instrument applies;
- how intended meaning maps into software and publishing systems; and
- how the system will remain findable, coherent, and correct as it changes.

The Canadian Digital Service explicitly includes content modeling, information architecture, flows, interaction concepts, writing, implementation, and evaluation in content-design practice ([CDS](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). Lovinger's practitioner model treats assembly, content types, and attributes as a bridge among UX, editorial, and technical work ([A List Apart](https://alistapart.com/article/content-modelling-a-master-skill/)). The Information Architecture Institute's overview centers organization and labeling for usability and findability ([IA Institute](https://www.iainstitute.org/sites/default/files/what_is_ia.pdf)).

**[Proposal]** The minimum auditable aggregate for `content.md` should therefore not be a string, page, or delivery occurrence. Use the candidate **message-in-context** aggregate to link a semantic message or content-decision identity to one or more expressions and exact implementation occurrences. The semantic identity describes:

- the product, user or actor, task, journey point, event, and semantic state;
- the claim, action, represented concept, consequence, or decision the message enables; and
- the intended outcome or content job before locale, channel, component, or literal is chosen.

Each linked expression or implementation occurrence keeps its own identity and records:

- surface, channel, presentation role, locale, and visible or assistive modality;
- variables, runtime conditions, permissions, experiments, and component or pattern slots;
- exact source and delivery coordinates; and
- applicable evidence sources and governing instruments, accountable owners, authorized approvers and approval records, orthogonal evidence dimensions, independent decision and delivery states, and separate evaluation records.

An interface string is one rendered projection of that system. An occurrence-centered inventory remains useful for discovery, but **content occurrence in context is an alternative inventory hypothesis, not the aggregate's semantic identity**: it cannot by itself join one stable decision to multiple expressions and implementations.

## Terms that must not collapse into one another

Many failures begin when teams use “content model,” “data model,” “taxonomy,” “IA,” and “schema” as if they were synonyms. They overlap, but they answer different questions.

| Term | Working meaning in this corpus | Primary question | What it is not |
|---|---|---|---|
| **Domain model** | Product-relevant objects, actors, events, rules, and relations in the problem space | What exists or happens in this domain? | A menu or database table list |
| **Semantic content model** | Meaningful content objects, attributes, relations, variants, and lifecycle rules | What information does the experience need to represent and maintain? | The current CMS configuration |
| **Assembly model** | Rules for combining content objects into experiences | What may be composed, repeated, ordered, conditional, or reused? | A fixed page wireframe |
| **Content type** | A distinguishable semantic or operational kind of content with defined fields and behavior | Which instances share purpose, structure, lifecycle, or processing? | Any component that happens to have fields |
| **Content instance** | One occurrence of a type, such as a specific fee disclosure or plan | What actual values and relations exist for this item? | The type definition itself |
| **Metadata** | Descriptive, structural, administrative, technical, or governance information about an item | How is this item described, managed, related, found, transformed, or controlled? | Automatically “less important” data |
| **Controlled vocabulary** | Governed set of concepts or allowed terms | Which concepts or values may be used and how are they defined? | A list of fashionable words |
| **Taxonomy** | A classification scheme, often hierarchical, used to organize concepts or content | How is content classified for a bounded use? | The only possible user navigation |
| **Ontology** | Formalized domain concepts and relations with defined semantics | What can systems infer or validate about the domain? | A bigger taxonomy or a synonym for IA |
| **Information architecture** | Organization, labeling, navigation, and retrieval of information across an environment | How will people understand where they are, what exists, and how to reach it? | A sitemap alone |
| **Navigation model** | User-facing and programmatic paths through an experience | What routes, links, menus, breadcrumbs, steps, and escapes are available? | The underlying taxonomy itself |
| **Search index** | Technical representation optimized for query-time retrieval | What can a search system retrieve and rank? | The canonical content or concept model |
| **Repository schema** | Machine-readable contract for files or structured artifacts | What shape must repo data have to validate and interoperate? | Proof that the content is useful or correct |
| **CMS schema** | Platform implementation of content types, fields, validations, relations, locales, and workflow | How does this CMS store and operate on content? | The entire product model |
| **API contract** | Machine-facing operations and data representations | What may clients send, receive, and depend on? | The intended user journey |
| **UI component contract** | Props, slots, states, and behavior supported by a presentation component | What can this interface render and how does it behave? | A semantic reason the content exists |
| **Retrieval corpus** | Versioned set of resources eligible for machine or agent retrieval | What evidence can the system discover for a task? | A trusted instruction set by default |

### Three especially important boundaries

#### A concept is not its label

**[Sourced fact]** SKOS distinguishes a concept from preferred, alternative, and hidden labels, and lets labels carry language tags. It separately represents broader, narrower, related, and cross-scheme mapping relations ([SKOS Reference](https://www.w3.org/TR/skos-reference/), [SKOS Primer](https://www.w3.org/TR/skos-primer/)).

**[Inference]** Renaming a product concept should not require inventing a new semantic object. Conversely, identical words can denote different concepts. Stable concept identity enables:

- display-name changes without breaking analytics, APIs, or relationships;
- market- or locale-specific labels;
- aliases, abbreviations, old names, misspellings, and search language;
- migration from deprecated terminology; and
- detection of false equivalence when two teams use the same word differently.

#### A taxonomy is not navigation

**[Documented practice]** GOV.UK describes its topic taxonomy as a bounded classification of existing or imminent GOV.UK content. It uses the taxonomy to support users and machines, topic pages, and finders, while its earlier design history explicitly distinguishes the underlying taxonomy from how it is surfaced in navigation ([taxonomy principles](https://www.gov.uk/government/publications/govuk-topic-taxonomy-principles/govuk-taxonomy-principles), [design history](https://insidegovuk.blog.gov.uk/2015/11/02/developing-a-subject-based-taxonomy-for-gov-uk/)).

**[Inference]** A product can need several classifications—by object, topic, task, audience, journey, risk, entitlement, or lifecycle—while presenting a task-based navigation that mirrors none of them exactly.

#### A semantic model is not its storage implementation

**[Sourced fact]** JSON Schema describes and validates JSON instances; OpenAPI describes HTTP API operations and data; Contentful exposes content types, fields, links, validations, entries, environments, and locales; DITA provides typed topic and composition mechanisms for structured documentation ([JSON Schema](https://json-schema.org/specification), [OpenAPI 3.2.0](https://spec.openapis.org/oas/latest.html), [Contentful](https://www.contentful.com/developers/docs/concepts/data-model/), [DITA 1.3](https://docs.oasis-open.org/dita/dita/v1.3/os/part0-overview/dita-v1.3-os-part0-overview.html)).

**[Cross-source finding]** These are valuable executable representations, but none determines the correct user or semantic model by itself. The intended meaning may be implemented across several of them, and each implementation can omit or distort it.

## What a content designer needs to know before writing

The questions below are a discovery instrument, not a requirement to produce 12 documents before every button label. Depth should scale with novelty, consequence, reuse, and uncertainty.

### 1. Outcome, user, and task

- Who is trying to do what, under which circumstances?
- What event brought them here, and what do they believe has already happened?
- What decision, action, or understanding should the content enable?
- What evidence supports the task model, and whose needs are missing from that evidence?
- What other people, organizations, or non-users are affected by the action?
- What happens before and after this point across digital, assisted, and offline channels?

### 2. Domain objects and meaning

- What people, accounts, products, services, plans, transactions, documents, permissions, places, events, and states exist?
- Which are types, instances, attributes, relations, events, or computed views?
- Which distinctions change behavior, eligibility, price, safety, or consequence?
- Which apparent distinctions are only labels, presentation variants, or implementation accidents?
- What questions must the model be able to answer?
- What is explicitly outside the model's domain?

The questions about domain, purpose, competency questions, scope, and iteration align with the Stanford ontology guide's bounded method, while its authors also warn that no single model is correct for every application ([Noy and McGuinness](https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html)). **[Documented practice]**

### 3. Facts, claims, and governing applicability

- Which content elements are controlled facts rather than discretionary language?
- What evidence source supports each claim, when was it retrieved, and what are its limitations?
- Is there a governing instrument, jurisdiction, market, product, audience, or effective period?
- Who is accountable for the fact, who can approve its expression, and who can release the implementation?
- Where do sources conflict, and which conflict needs an accountable decision rather than model averaging?
- What uncertainty, exception, or unknown must remain visible?

### 4. Lifecycle, events, and states

- What creates, updates, approves, publishes, suspends, expires, archives, or deletes each object?
- Which state transitions are user-initiated, system-initiated, scheduled, or externally triggered?
- Which states are observable in code, APIs, or interfaces but undocumented?
- What partial, delayed, duplicate, stale, interrupted, and recovery states exist?
- Which transitions require a notice, confirmation, explanation, consent, or audit record?
- What happens when the user's view, the system's state, and an external provider's state disagree?

### 5. Structure, granularity, assembly, and reuse

- Which content needs uniquely identifiable fields for sorting, filtering, validation, reuse, or transformation?
- What is the smallest unit that retains enough meaning and context to reuse safely?
- Which units may repeat, reorder, inherit, or vary conditionally?
- Which units must stay together because splitting them would change meaning or compliance?
- Is a proposed field useful to a user, author, system, or control process—or is it needless fragmentation?
- What fallback occurs when an optional or referenced unit is absent?
- What authoring effort, cognitive load, or exclusion will the model create?

Lovinger's documented practice asks how structured, flexible, reusable, and tolerable to authors a model needs to be, and distinguishes assembly, types, and attributes ([content-modeling method](https://alistapart.com/article/content-modelling-a-master-skill/)). Inclusive-modeling guidance adds that required fields and allowed structures determine who can participate and what the system permits people to represent ([So](https://alistapart.com/article/designing-inclusive-content-models/)).

### 6. Language, terminology, and classification

- Which stable concepts need preferred labels, alternatives, hidden search labels, deprecated labels, definitions, examples, and non-examples?
- In which languages, scripts, locales, markets, and registers do labels vary?
- Which relationships are truly broader/narrower, part/whole, sequential, causal, associative, equivalent, or merely co-occurring?
- Which concepts belong in one bounded scheme, and which require mapping across schemes?
- Which user terms conflict with legal, clinical, technical, or organizational terms?
- When should the interface translate or explain a controlled term rather than replace it?
- Who can create, merge, split, rename, map, or deprecate a concept?

### 7. Information architecture and orientation

- What information environment is the user navigating: site, application, transaction, knowledge base, conversation, notification trail, or service ecosystem?
- What does the user need to know about location, progress, scope, and available actions?
- Which paths support known-item finding, exploration, comparison, recovery, and return visits?
- Should the primary structure follow task, object, lifecycle, topic, audience, or another organizing principle?
- Which labels provide enough information scent without requiring internal organizational knowledge?
- What belongs in global, local, contextual, sequential, utility, and escape navigation?
- What related information helps without distracting or creating loops?
- What content should not exist, should be merged, or should be reachable through another channel?

### 8. Search and machine discovery

- What do people search for, in their own words, and which queries fail, reformulate, or lead to support?
- Which exact identifiers, error codes, names, acronyms, rare entities, and quoted strings require lexical matching?
- Which conceptual questions need semantic retrieval or graph traversal?
- What filters, facets, synonyms, boosts, exclusions, and permission rules are justified by evidence?
- What should be discoverable through internal search, external search engines, support tools, and agents?
- What must never be indexed or exposed because of permissions, privacy, embargo, or security?
- What is the expected “no answer” or low-confidence behavior?

### 9. Surface, presentation, accessibility, and localization

- Where can each content object render: UI, web page, email, push, SMS, voice, PDF, support, API, metadata, search result, or agent response?
- Which presentation roles exist—title, label, instruction, status, error, link, action, value, help, disclosure, or accessible name?
- What heading, region, link, menu, and focus semantics must be programmatically available?
- Are there multiple usable ways to locate information where applicable?
- What changes in right-to-left layouts, non-Latin scripts, inflection, plurals, gender, dates, numbers, names, addresses, or reading order?
- Can variables and markup move safely across languages?
- Does a compact source string expand into a usable localized experience?

WCAG 2.2 includes requirements relevant to programmatic structure, link purpose, multiple ways, headings and labels, consistent navigation and identification, and error/recovery behavior; applicability and conformance levels must be checked criterion by criterion ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)). **[Sourced fact]**

### 10. System representations and delivery

- Where is the current source: code literal, localization catalog, design node, CMS entry, API field, database value, vendor template, or generated response?
- Which representation is evidence of intended meaning, executable behavior, approved expression, or live observation?
- What stable identifier joins semantic objects to implementation occurrences?
- What UI component, route, state condition, feature flag, permission, and locale controls the occurrence?
- What API request, response, status, event, or webhook supplies its values?
- What schema versions and consumer contracts will a change affect?
- Can the system round-trip the source without corrupting variables, markup, references, formatting, or unrelated data?

### 11. Operations, decisions, and change

- Which evidence sources exist, and what are their independent observation-strength, challenge, freshness, lineage, and epistemic dimensions?
- Which independent decision state applies: `question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, or `retired`?
- Which independent delivery state applies: `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, or `removed`?
- Which planning artifacts, review events, exact approval records, implementation transactions, release records, and build-verification evaluations link to those states? These are records or events, not alternate decision or delivery states.
- Which evaluation records exist, and what object, question or hypothesis, method, sample, result, and limitation does each record contain?
- What review is event-triggered versus calendar-triggered?
- What downstream content, code, API clients, search indexes, translations, analytics, and documentation depend on this item?
- What redirect, alias, migration, fallback, or rollback is required?

### 12. Measurement and sufficiency

- What would show that the model, structure, label, path, or retrieval behavior works?
- Does the question require card sorting, tree testing, usability testing, comprehension testing, search-log analysis, retrieval judgments, accessibility review, or live outcome data?
- Which populations, locales, permissions, devices, and assistive technologies must be represented?
- What baseline and counterfactual exist?
- What failure rate and consequence are acceptable, and who decides?
- What result would reopen the model rather than prompt another wording pass?

## A full content-modeling and IA workflow

The workflow is iterative. A taxonomy test can reveal a faulty domain model; implementation can reveal a missing state; production search can reveal language absent from research; a governing change can invalidate approved content.

### 1. Frame the use and decision

**[Documented practice]** The Stanford ontology guide starts with domain, scope, intended use, and competency questions. GOV.UK limits its topic taxonomy to its actual publishing domain rather than trying to model the world ([Stanford](https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html), [GOV.UK](https://www.gov.uk/government/publications/govuk-topic-taxonomy-principles/govuk-taxonomy-principles)).

**Output:** decision brief containing the user/task, intended use, scope and exclusions, consequence of error, evidence plan, collaborators, and questions the model must answer.

**Gate:** the team can explain why a model or IA change is needed and what evidence could disprove the initial framing.

### 2. Build an evidence inventory

Gather, without treating any one source as automatically canonical:

- user research, language, journeys, and accessibility evidence;
- current pages, screens, messages, notifications, support and offline artifacts;
- domain policies, laws, clinical/technical guidance, contracts, and product requirements;
- code, routes, components, state machines, feature flags, schemas, API descriptions, and tests;
- CMS models, entries, relations, workflow, locales, and publishing environments;
- analytics, search queries, zero-result logs, support contacts, defects, and experiments;
- terminology lists, taxonomies, data dictionaries, ontologies, and prior decisions; and
- external-search, partner, localization, and agent-context representations.

**[Proposal]** Record each evidence source and its provenance, scope, retrieval or observation date, evidence fitness, limitations, and five orthogonal evidence dimensions: observation strength, challenge, freshness, lineage, and epistemic qualifier. Separately record any governing instrument and its applicability, accountable owner, authorized approver and exact approval record, independent decision state, implementer and independent delivery state, release record, and evaluation links. Implemented or live content is evidence of behavior, not proof of approval or quality.

### 3. Reconstruct or propose the domain model

Identify:

- actors and affected parties;
- objects and distinguishable subtypes;
- events and state transitions;
- attributes and derived values;
- relations and cardinalities;
- rules, constraints, exceptions, and permissions; and
- questions the model must answer.

**[Proposal]** Use real examples and counterexamples before abstracting. Label each relation's meaning; do not use an unlabeled “related to” edge for everything.

**Gate:** domain specialists can identify incorrect assumptions, and representative product scenarios can be expressed without forced or contradictory categories.

### 4. Define the semantic content model

For each content type or reusable semantic object, define:

- stable identifier and human explanation;
- purpose and user need;
- attributes, relations, cardinality, order, and conditions;
- translatability, locale behavior, and fallback;
- source and claim constraints;
- lifecycle and change triggers;
- reuse boundary and prohibited reuse;
- authoring guidance and accessibility semantics; and
- examples, counterexamples, and fixtures.

**[Proposal]** Model meaning before choosing a CMS component or JSON layout. Then test the model against author workflows and system constraints. This preserves intent while allowing implementation feedback to reopen the model.

### 5. Design vocabulary, taxonomy, and ontology only to the needed depth

Choose the lightest sufficient representation:

1. glossary or term record;
2. controlled vocabulary with stable concept IDs;
3. taxonomy with explicitly typed hierarchy;
4. faceted or polyhierarchical classification;
5. graph of typed relations; or
6. formal ontology with inference and constraint semantics.

**[Sourced fact]** SKOS supports semi-formal knowledge organization with multilingual preferred/alternative/hidden labels, semantic relations, and cross-scheme mappings. OWL 2 adds formally defined class, property, individual, and inference semantics ([SKOS](https://www.w3.org/TR/skos-reference/), [OWL 2](https://www.w3.org/TR/owl2-overview/)).

**[Inference]** Most product teams should not begin with OWL. Formal ontology is justified only when the questions, integrations, inference, interoperability, scale, or risk require it.

### 6. Design findability as a system of paths

Work across:

- task and journey flows;
- global, local, contextual, utility, and sequential navigation;
- hierarchy, facets, filters, related links, and breadcrumbs;
- internal search and query language;
- external discovery, crawlability, and structured data where in scope;
- support, documentation, and assisted channels; and
- conversational or agent-mediated retrieval.

Do not assume that every task begins at the home page, that every user can understand the hierarchy, or that search compensates for missing content.

### 7. Map meaning to code, CMS, data, APIs, and components

Create explicit mappings rather than relying on identical names:

| Semantic element | Repository/CMS representation | API/runtime representation | Experience occurrence | Required trace |
|---|---|---|---|---|
| Concept | stable ID, glossary/taxonomy record | enum, URI, identifier, or reference | label, filter, help, search alias | concept ID + scheme version |
| Content type | schema file or CMS type | request/response schema or event | page, card, message, document, answer | semantic type ID + implementation version |
| Attribute | typed field and validation | property, parameter, or computed value | displayed value, condition, input, accessible name | field mapping + transformation |
| Relation | reference, join, link, or edge | linked resource, embedded object, graph edge | navigation, sequence, related item, source | typed relation + direction/cardinality |
| State | state machine, workflow, or publishing stage | status, event, error code, timestamp | status message, action availability, recovery | state transition + observation |
| Variant | locale/market/permission/experiment record | negotiated or conditional representation | localized or personalized occurrence | variant conditions + fallback |

**Gate:** a reviewer can trace intended meaning into every affected implementation and back from a live occurrence to the relevant evidence and decision without guessing from a field name.

### 8. Prototype the structure in context

Prototype enough of the system to expose:

- navigation and orientation;
- object, state, and relationship understanding;
- long and short data;
- empty, error, stale, partial, delayed, and permission-limited cases;
- screen-reader and keyboard semantics;
- localization and variable behavior;
- internal and agent search results; and
- authoring and governance workflow.

### 9. Evaluate the question, not the artifact category

Use methods aligned to the uncertainty:

- interviews/contextual work for tasks, concepts, and language;
- open card sorting for possible groupings and labels;
- closed card sorting for an existing classification hypothesis;
- tree testing for findability in a proposed hierarchy;
- usability testing for navigation, orientation, and action in context;
- comprehension and paraphrase for meaning and consequences;
- query-log and support analysis for real retrieval language and failure;
- accessibility evaluation with disabled people plus standards review;
- offline retrieval evaluation with judged queries and corpora; and
- live measurement for real behavior and unintended effects.

**[Documented practice]** A 2026 Department for Education design history used a card sort to produce a draft IA, then planned tree testing instead of treating the sort as final proof ([DfE](https://design-histories.education.gov.uk/deliver-good-services/using-a-card-sort-to-understand-how-users-group-information)).

### 10. Govern, release, observe, and evolve

- preserve the approved decision separately from its implementation;
- use schema and referential checks for deterministic constraints;
- test migrations, redirects, aliases, fallback, and client compatibility;
- rebuild and evaluate search/retrieval indexes after material changes;
- verify source, preview, build, release, and observed-live representations independently;
- monitor queries, support, task outcomes, accessibility defects, drift, and incidents; and
- supersede rather than silently overwrite decisions and concepts.

## Artifact set

These artifacts can be combined or stored as structured views. The point is the decision coverage, not a mandatory document count.

| Artifact | Decision it supports | Minimum useful fields | Common failure |
|---|---|---|---|
| **Domain and scope brief** | What world and use are being modeled? | purpose, audience, tasks, boundaries, questions, consequences, evidence | models the whole world or mirrors the org chart |
| **Domain concept map** | What objects, actors, events, and relations exist? | stable IDs, definitions, types, examples, relations, constraints, open conflicts | nouns copied from code become “truth” |
| **Semantic content model** | What information objects and structures are needed? | types, attributes, relations, cardinality, lifecycle, reuse, locale, sources | CMS fields masquerade as user meaning |
| **Assembly model** | How can units be combined and ordered? | components/slots, sequence, repeatability, conditions, fallback, prohibited combinations | page builder permits incoherent experiences |
| **Content-type specification** | What makes one type distinct? | purpose, fields, rules, behavior, authors, consumers, examples | type per page/template or one universal blob |
| **Controlled-term record** | What does a concept mean and how may it be named? | concept ID, definition, preferred/alternate/hidden/deprecated labels by locale, examples, scheme | one global “approved word” ignores context and language |
| **Taxonomy or ontology** | How are concepts classified or related? | scheme scope, typed relations, mappings, constraints, change history | hierarchy confuses part-of, kind-of, task, and ownership |
| **IA/navigation model** | How do people orient and move? | organizing principles, paths, labels, entry points, escape/recovery, permissions | sitemap assumes the home page and happy path |
| **Search behavior model** | How should queries retrieve and rank? | query intents, aliases, exact tokens, filters, facets, no-result behavior, evidence | “semantic search” replaces query research |
| **Content-to-system mapping** | Where and how is meaning implemented? | semantic ID, repo/CMS/API/component references, transforms, conditions, consumers | names are joined heuristically and drift silently |
| **Source and control map** | Which evidence and governing controls apply? | evidence source and five dimensions, fitness and scope, governing instrument and applicability, accountable owner, authorized approver and exact approval record, independent decision/delivery references, evaluation links | one precedence list treats every claim alike |
| **Decision record** | What was decided and why? | question, options, criteria, evidence, accountable owner, authorized approver and exact approval record, independent decision state, supersession | approval is inferred from implementation |
| **Migration and redirect map** | How does the old model become the new one? | old/new IDs, mapping type, transform, redirects/aliases, exceptions, rollback | rename breaks history, links, analytics, or locale |
| **Retrieval corpus manifest** | What can an agent or search system use? | resource ID/URI, source type and evidentiary role, scope, access-control policy, checksum/version, evidence dimensions, indexing policy, decision/delivery/evaluation links | every document is embedded with equal trust and access |
| **Evaluation set** | Does the system work for real questions? | representative tasks/queries, expected evidence, relevance grades, locales/roles, outcome rubric | synthetic happy-path questions create false confidence |

## Decision rights and collaboration

Role titles differ, and one person can hold several responsibilities. The table is a proposed separation of decisions, not a universal staffing model.

| Decision | Accountable decision function | Required consultation | Agent role absent a passing applicable phase-gate result and independently constructed task-specific capability grant |
|---|---|---|---|
| Domain facts and rules | Domain/product function; legal, policy, clinical, financial, or safety function where applicable | content design, research, engineering | discover conflicts, trace evidence, ask; do not invent or approve |
| User/task model | Product and research functions | content, service, design, support, affected users | synthesize evidence and uncertainty; do not declare unsupported needs |
| Semantic content model | Content design/strategy or IA function with product and engineering | domain specialists, accessibility, localization, operations | propose typed objects/relations and counterexamples |
| Controlled vocabulary/taxonomy | Named taxonomy or content steward | users/research, domain specialists, search/data, localization | propose concepts, mappings, and aliases; do not silently merge meanings |
| Formal ontology | Knowledge/domain modeling function | domain specialists, data/platform, consuming applications | generate candidates and checks; human review required for semantics |
| Navigation and findability | Product/design/content collaboration | research, accessibility, analytics/search, support | propose and prototype; evidence required before enforcement |
| CMS/storage schema | Platform/engineering function | content authors, content design, localization, operations | generate mappings and migration plan; executable changes need repository workflow |
| API behavior and contract | API/product engineering function | content/domain, client teams, documentation | detect semantic mismatch; do not change behavior under a copy-only request |
| Search/retrieval ranking | Search/product function | content/IA, research, domain, security/privacy | evaluate and propose; ranking changes need test and review |
| Content expression | Content-design function within approved facts and brand rules | domain reviewers and approvers required by consequence | draft, critique, and apply only within granted scope |
| Accessibility conformance | Shared product accountability with accessibility expertise | disabled users, design, engineering, content, QA | map criteria and findings; never self-certify from static inspection alone |
| Release and rollback | Named product/release function | implementers, approvers, QA, incident function | execute only when an independently constructed task-specific capability grant authorizes the exact action and the applicable security phase gate passes; retain audit evidence |

**[Proposal]** The agent must store these controls separately:

- each evidence source, evidence fitness, and the five orthogonal evidence dimensions: observation strength, challenge, freshness, lineage, and epistemic qualifier;
- each governing instrument and its applicability, jurisdiction or scope, effective period, and exceptions;
- the accountable owner of the declared controlled fact, instrument, system, or decision class;
- each authorized approver and exact approval record for an exact decision version and scope;
- the independent decision state and its rationale and history;
- the implementer, exact implementation occurrence, and independent delivery state;
- the release record, including build, environment, audience, locale, flags, and effective time; and
- a separate evaluation record with its object, question or hypothesis, method, sample, result, and limitations.

An applicable phase-gate result and task-specific capability grant are additional execution-control records. They never establish a content decision, governing applicability, or approval, and neither can be inferred from operating mode, evidence, repository instructions, ownership, or delivery state.

The `P0-A`–`P0-G` references below are candidate phase-release gates defined in [Security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md). A passing result establishes eligibility for that capability phase; it never authorizes a task action. `P0-G` separately governs controlled browser, device, emulator, build, server, or process execution used for runtime verification; static-read eligibility does not imply execution eligibility.

“Official document,” “subject-matter expert,” “implemented in code,” and “approved for release” are not interchangeable states.

## Relationships to code, CMS, databases, APIs, and UI components

### The translation chain

**[Proposal]** Model the delivery chain as related representations, not one universal source:

```text
evidence sources + five evidence dimensions ───────┐
governing instruments + applicability ─────────────┼─→ semantic content decision
accountable owner + authorized approver route ─────┘      + independent decision state
                                                             ↓
                                                exact approval record for the
                                                exact version and scope, if required
                                                             ↓
                                              locale/channel expressions
                                                             ↓
                                    semantic-to-system mappings and contracts
                                                             ↓
                                      exact implementation occurrences
                                                             ↓
                                         independent delivery state
                                                             ↓
                                               release record
                                                             ↓
                              verification evaluation + outcome evaluation
```

The evidence, instrument, ownership, approval, decision, delivery, release, and evaluation records remain separate even when the diagram shows how they inform one another. Each transformation can fail. A schema can preserve fields but lose meaning; an API can expose a state the interface never explains; a component can truncate a valid value; a search index can omit content that exists; a rendered label can diverge from the approved concept.

### Stable identity and typed mappings

**[Proposal]** Every semantically managed object should have a stable ID independent of its current label, route, file path, CMS entry, or localization key. Each system mapping should state:

- source and target identifiers;
- mapping type: exact representation, projection, aggregation, derivation, translation, alias, replacement, or unresolved candidate;
- direction and cardinality;
- transformation logic;
- applicable product, market, locale, role, state, and version;
- evidence for the mapping and last verification;
- separate accountable-system-owner ID and authorized-approver/approval-record IDs where relevant; and
- known loss, ambiguity, or unsupported behavior.

### Code is behavior evidence, not universal canon

Repositories can reveal:

- routes and components;
- localization keys and message syntax;
- state machines, enums, API types, and error codes;
- feature flags, roles, permissions, and experiments;
- content-management clients and generated schemas;
- analytics names and event transitions;
- tests, fixtures, snapshots, and build constraints; and
- dead, hidden, unreachable, or developer-only content.

**[Inference]** None of these alone proves product intent, approval, governing applicability, visibility, or user value. The agent should use code to reconstruct behavior and identify contradictions, then preserve uncertainty.

### CMS schema is an operational contract

**[Sourced fact]** Contentful's documented model includes content types, typed fields, references, arrays, validations, entries, assets, environments, locales, roles, workflow-related apps, releases, APIs, and webhooks ([data model](https://www.contentful.com/developers/docs/concepts/data-model/), [domain model](https://www.contentful.com/developers/docs/concepts/domain-model/)).

**[Inference]** A CMS connector must understand not only fields, but also:

- draft, preview, scheduled, published, archived, and environment-specific states;
- field- versus entry-level localization;
- references and reverse dependencies;
- author permissions and workflow gates;
- validation and editorial-help text;
- releases and webhooks; and
- API projections that omit author-only control fields.

### API contracts can expose semantic drift

**[Sourced fact]** OpenAPI 3.2.0 describes operations, parameters, request bodies, responses, schemas, examples, links, security, and external documentation, and can support documentation, code generation, and testing tools ([specification](https://spec.openapis.org/oas/latest.html)).

**[Proposal]** The agent should compare the semantic model against:

- enum and discriminator meanings;
- optional versus required fields;
- null, absent, unknown, and redacted values;
- status and error representations;
- pagination and partial results;
- deprecations and version changes;
- permission-dependent fields;
- timestamps and freshness;
- human-readable descriptions and examples; and
- client behavior when new values appear.

It should raise a behavior/content seam when a requested wording change actually requires an API or state-machine change.

### Schema validation is necessary but insufficient

**[Sourced fact]** JSON Schema provides structural validation vocabularies; SHACL validates RDF graphs against shapes and produces structured validation results ([JSON Schema](https://json-schema.org/specification), [SHACL](https://www.w3.org/TR/shacl/)).

**[Proposal]** Use deterministic validation for properties that are actually deterministic:

- required fields and types;
- IDs, references, and cardinality;
- enumerated values and patterns;
- lifecycle invariants;
- language tags and locale presence;
- variable and selector structure;
- provenance and decision-record completeness; and
- forbidden dependency cycles where the model disallows them.

Use research and accountable review for meaning, inclusion, factual fitness, tone, information scent, and usefulness. A passing schema is not an approved experience.

## Taxonomy, ontology, and terminology governance

### Model a bounded scheme, not “the truth”

**[Cross-source finding]** GOV.UK scopes its topic taxonomy to its publishing domain; the Stanford guide ties ontology choices to intended application and anticipated extensions; SKOS supports multiple schemes and explicit mappings. These sources converge on bounded, use-oriented modeling rather than one universal classification.

For every scheme, record:

- purpose and questions it supports;
- included and excluded domains;
- consumers and interfaces;
- allowed relation types;
- granularity and stopping rules;
- locale/language behavior;
- governing instruments and accountable stewardship;
- change, review, mapping, and deprecation policy; and
- evaluation evidence.

### Do not hide relation semantics

Use explicit relations where their meaning matters:

- `kind_of` / broader-narrower;
- `part_of` / contains;
- `instance_of`;
- `precedes` / follows;
- `requires` / enables;
- `causes` / results_in;
- `applies_to`;
- `available_in`;
- `owned_by` only when it means accountable organizational control, not classification;
- `displayed_as`;
- `implemented_by`;
- `derived_from`;
- `replaces` / supersedes;
- `exact_match`, `close_match`, and explicitly non-equivalent associations; and
- `related` only when a more precise relation is unjustified.

**[Sourced fact]** SKOS distinguishes direct hierarchical and associative relations and warns through its mapping semantics that exact and close matches are not interchangeable ([SKOS Reference](https://www.w3.org/TR/skos-reference/)).

### Term records need lifecycle and locale

**[Proposal]** A term record should include:

- stable concept ID and scheme;
- definition and boundaries;
- preferred, alternative, hidden, and deprecated labels per language/market;
- homographs and confusable concepts;
- grammatical or inflection notes;
- product/surface restrictions;
- source evidence and governing applicability;
- accountable steward and required approver;
- effective and review dates;
- replacements and migration instructions; and
- positive, negative, and ambiguous examples.

Do not use one “do not use” field to represent obsolete, offensive, legally prohibited, technically inaccurate, brand-inconsistent, or context-inappropriate language; those reasons have different consequences and reviewers.

### Taxonomy change is a migration

Renaming, moving, splitting, merging, or deleting concepts can affect:

- user labels and navigation;
- URLs, redirects, breadcrumbs, and structured data;
- CMS tags and saved filters;
- search synonyms, facets, boosts, and analytics;
- API enums and client logic;
- reports and historical comparisons;
- localization memory and translated labels;
- accessibility names and help content;
- agent retrieval metadata; and
- external partners and exports.

**[Proposal]** Require an impact report and reversible migration for material taxonomy changes, not just an edited tree.

## Navigation, findability, and search

### Findability is plural

People can reach information through:

- direct task flow;
- global, local, utility, contextual, and sequential navigation;
- links from related objects or events;
- breadcrumbs, tables of contents, indexes, and maps;
- internal search, filters, facets, and saved views;
- external search, deep links, referrals, and notifications;
- browser history, bookmarks, recents, and resume points;
- support agents, documentation, and offline channels; and
- conversational or agent-mediated answers.

**[Sourced fact]** WCAG 2.2 Success Criterion 2.4.5 requires more than one way to locate a page within a set of pages, with defined exceptions, at Level AA. WAI explains that people differ in whether hierarchy, search, overview, or sequential navigation works best ([Understanding Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways)).

**[Inference]** A repository agent should inventory entry routes and recovery paths, not infer the experience from a route tree or sitemap alone.

### Navigation labels are promises

A label should let the user predict:

- what is behind the link or control;
- whether it is a place, object, task, state, or action;
- what scope it covers;
- whether following it changes state; and
- how it differs from neighboring options.

**[Sourced fact]** WCAG 2.2 requires link purpose to be determinable from link text or programmatically determined context under Success Criterion 2.4.4, with an ambiguity exception; it also covers descriptive headings/labels and consistent navigation/identification ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).

**[Proposal]** Test labels in their siblings and destinations. A label that is clear in a glossary can still provide poor information scent in a menu.

### Card sorting and tree testing answer different questions

- Card sorting can reveal possible groupings, language, and mental models.
- Tree testing can test whether people can find targets in a proposed hierarchy without visual-design effects.
- Neither alone proves the full navigation, because routes, page content, interaction, permissions, and recovery also matter.

**[Documented practice]** GOV.UK used card sorting alongside interviews and planned tree testing for taxonomy work; current Defra guidance lists card sorting, tree testing, usability testing, contextual inquiry, and support-data analysis as distinct methods ([GOV.UK case study](https://userresearch.blog.gov.uk/2018/03/23/how-we-refined-our-approach-to-card-sorting/), [Defra methods](https://digital.defra.gov.uk/user-research/research-methods)).

### Internal search is a product, not a box

**[Proposal]** Model and test:

- query intents and task consequences;
- exact names, IDs, codes, quoted strings, and rare entities;
- synonyms, abbreviations, misspellings, old terms, and locale variants;
- facets, filters, sort, scope, and permission boundaries;
- freshness, publication state, and governing applicability;
- ranking, snippets, highlights, and result labels;
- no-result, low-confidence, and too-many-result behavior;
- query reformulation and recovery;
- result-to-destination continuity; and
- privacy, retention, and access for query logs.

**[Research finding]** BEIR found substantial variation across domains and approaches; BM25 was a robust baseline in its 18-dataset study, while strong reranking/late-interaction averages carried higher cost and dense/sparse learned systems showed generalization limitations ([BEIR](https://arxiv.org/abs/2104.08663)). Dense Passage Retrieval reported strong gains over its BM25 baseline on its own open-domain QA datasets, but other research has shown entity-rich questions can challenge dense retrievers ([DPR](https://aclanthology.org/2020.emnlp-main.550/), [EntityQuestions](https://aclanthology.org/2021.emnlp-main.496/)).

**[Inference]** The agent should not label one retrieval family universally superior. Exact lexical, structural, graph, and semantic signals should be benchmarked on the repository's actual tasks.

### External search adds another representation

**[Sourced fact]** Google says structured data can provide explicit machine-readable clues about page meaning, but correct markup does not guarantee rich-result display. Structured data must match visible page content and platform-specific guidance, then be validated and monitored after release ([introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)). Google also says crawlable internal links and contextual anchor text help discovery and interpretation ([link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)).

**[Proposal]** Treat external-search markup, sitemaps, canonical URLs, redirects, page titles, snippets, and internal links as content-system projections with their own verification. Do not promise ranking or rich-result appearance.

## AI-mediated retrieval for content design

### Retrieval changes the IA boundary

Traditional IA designs what people can browse and search. An agent also needs to discover evidence, governing controls, prior decisions, models, implementation occurrences, and evaluation results at task time.

**[Inference]** That makes repository structure and retrieval metadata part of the agent's information architecture. It does not make the model's prompt or vector store the content system of record.

### What the evidence establishes—and does not

- **[Research finding]** The original RAG paper combined generated language with retrieved non-parametric memory and framed updateability and provenance as important problems; its reported gains were on specified knowledge-intensive NLP tasks ([Lewis et al.](https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html)). It did not prove that retrieval guarantees factuality or correct citations.
- **[Research finding]** Long-context experiments found that model performance can depend on where relevant information appears and often worsens for evidence in the middle of long inputs ([Liu et al.](https://aclanthology.org/2024.tacl-1.9/)). A large context window is not proof that dumping the repository works.
- **[Research finding]** ARES separates context relevance, answer faithfulness, and answer relevance and calibrates automated evaluation with human-labeled examples ([ARES](https://aclanthology.org/2024.naacl-long.20/)). Automated judging remains a measurement method, not approval.
- **[Sourced fact]** NIST's Generative AI Profile describes confident false or inconsistent content, including fabricated citations, as confabulation risk and recommends lifecycle risk management and testing ([NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1)).
- **[Sourced fact]** MCP's 2026-07-28 Resources specification provides URI-addressed resources, lists, reads, templates, subscriptions, authorization-dependent resource sets, and cache hints, while leaving context inclusion to the host application ([resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources), [release](https://blog.modelcontextprotocol.io/posts/2026-07-28/)). Cache lifetime is not evidence freshness.

### Proposed retrieval pipeline

**[Product hypothesis]** A useful content-design context compiler should be explicit and inspectable:

```text
task + target scope + risk + requested operating mode
        ↓
declared capability phase + applicable phase-gate result
        ↓
independently constructed task grant for the exact read/model/action scope
        ↓
applicable connection-authorization, data-processing, durable-memory, and
telemetry records with current scope, expiry, and revocation checks—or an
explicit not-applicable disposition with rationale
        ↓
query decomposition and exact-term expansion
        ↓
authenticated-principal, resource, operation, product, market, locale, time,
data/egress-boundary, and governing-applicability filters
        ↓
lexical + structural + graph + semantic candidate retrieval
        ↓
deduplication, conflict detection, evidence-fitness scoring, and reranking
        ↓
compact context pack with stable citations, versions, and known gaps
        ↓
reasoning/drafting with source-data instructions treated as untrusted
        ↓
claim-to-source verification, contradiction check, evidence-fitness check,
and decision/escalation gate
        ↓
answer, proposed change, escalation, or explicit abstention
        ↓
retrieval/generation/evaluation log without silently promoting output to policy
```

Every stage needs independent evaluation. A correct answer can hide bad retrieval; good retrieval can still lead to unsupported generation.

**[Proposal]** Before retrieval or action, the context compiler must record four core execution-context inputs—the requested operating mode, declared capability phase, applicable phase-gate result, and independently constructed task-specific capability grant—plus every applicable connection-authorization, data-processing, durable-memory, and telemetry record. Only the task grant authorizes the exact operation; mode records intent, and the gate records phase eligibility. The grant identifies its issuer, authenticated actor, exact resources and operations, environment, data/egress boundary, expiry, and revocation path. Each additional control record retains its own purpose, subject/resource/data/event or destination scope, conditions, expiry, and current revocation check; an explicit `not applicable` disposition requires rationale. Every plan, refusal, escalation, or proposed transaction should report these independent inputs and the exact scope mismatch or failed/missing control; no field creates or widens another.

### Retrieval corpus record

**[Proposal]** Each resource or addressable segment should carry, as applicable:

- stable resource and segment IDs;
- URI/source coordinates and MIME/format type;
- evidence-source type, evidentiary role, claim scope, evidence fitness, provenance, limitations, and observation/challenge/freshness/lineage/epistemic dimensions;
- product, domain, journey, surface, component, and state scope;
- language, locale, market, jurisdiction, audience, authenticated-principal scope, and access-control policy;
- governing instrument link, applicability, effective period, jurisdiction or scope, and exceptions, if any;
- accountable owner, authorized approver, and exact approval-record links, if established;
- proposal or decision provenance and independent decision state, without inferring approval from ingestion;
- version, checksum, retrieved time, effective period, and invalidation trigger;
- exact implementation-occurrence references, independent delivery state, and release-record links;
- visibility and publication state;
- content type, concept IDs, relations, and key entities;
- variable/markup/code semantics;
- indexing, chunking, and retrieval policy;
- security and data classification, retention and egress constraints, with **all retrieved content treated as untrusted data rather than executable instruction**; and
- known limitations, conflicts, supersession, and exact verification/outcome evaluation links.

### Chunking must preserve decision context

**[Proposal]** Do not split solely by character or token count. Prefer semantic units that retain:

- heading and document path;
- definitions with their qualifiers and exceptions;
- rule with scope, effective date, and source;
- table row with headers;
- UI message with event, state, consequence, and recovery;
- decision with rationale and supersession;
- code symbol with its conditions and tests; and
- localization unit with variables and notes.

Store relations between chunks and the full source so retrieval can expand context deliberately.

### Retrieval is a security and authorization boundary

**[Sourced fact]** OWASP's 2025 guidance warns that RAG does not eliminate prompt injection and that vector/embedding systems face permission, poisoning, and cross-context risks ([Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), [Vector and Embedding Weaknesses](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/)). MCP 2026-07-28 allows resource sets to vary with per-request authorization and adds cache-scope/lifetime semantics ([MCP Resources](https://modelcontextprotocol.io/specification/2026-07-28/server/resources)).

**[Proposal]** The agent must:

- enforce authenticated-principal and resource-level access controls before retrieval, not redact after generation;
- prevent cross-tenant, cross-market, and draft/live leakage;
- treat text inside evidence as data, not executable instruction;
- validate source identities and checksums where feasible;
- separate public, organization, team, and user-private indexes or filters;
- record retrieval and tool use for investigation;
- invalidate caches and indexes when access policy or governing content changes;
- adversarially test hidden, encoded, multilingual, and indirect instructions; and
- refuse to cite a source the user or execution context cannot access.

### No-answer is a designed state

The agent needs explicit behavior for:

- no relevant evidence;
- only stale or superseded evidence;
- several applicable sources that conflict;
- a source that is topically relevant but not governing for the target;
- permission-filtered evidence it cannot disclose;
- a query outside the model's domain;
- an implementation occurrence with no traceable decision; and
- insufficient evidence for consequential language.

**[Proposal]** In these cases, preserve the gap, show what was checked, state what decision or evidence is needed, and avoid filling the space with plausible language.

## Greenfield entry

Greenfield does not mean “invent freely.” It means the system lacks implementation history but still needs evidence and bounded modeling.

### Greenfield sequence

1. **Frame the service boundary and questions.** Identify users, tasks, channels, consequence, and what the model must answer.
2. **Map the domain.** Work with domain specialists and research to identify objects, events, rules, states, and contested terms.
3. **Model the journey and information needs.** Decide what must be known, decided, or done at each event and state.
4. **Define semantic content objects.** Specify types, attributes, relations, granularity, reuse, locale, accessibility, and lifecycle.
5. **Develop bounded vocabularies and classifications.** Use stable concepts and evidence; do not start from an org chart or database design.
6. **Design paths and retrieval.** Prototype task flows, navigation, search, support, and agent access together.
7. **Choose implementation mappings.** Plan how code, CMS, APIs, components, analytics, localization, and indexes will realize the tested semantic model. Planning does not authorize a configuration or source mutation.
8. **Test both user and author experiences.** Include content creators, editors, approvers, translators, support, and people represented by the model.
9. **Create baselines and governance.** Store evidence sources and dimensions, governing instruments and applicability, accountable owners, independent decision state, authorized approvers and exact semantic-decision approval records, implementation plans, independent delivery state, release plans and any required release-approval records, evaluation records, fixtures, migrations, and review triggers before scale.
10. **Apply and release a coherent vertical slice only through independent controls.** Before any local configuration or source mutation, require a passing applicable `P0-D` result, an independently constructed task-specific grant for the exact write, and mandatory mutation/change approval bound to the exact transaction. Before any remote mutation or publication, require the corresponding `P0-E` result, exact remote-write/publication grant, and mandatory mutation/change approval bound to the publication transaction. Releasable governed meaning additionally requires applicable semantic-decision approval; release requires a separate release-approval record when policy requires residual-risk acceptance. Any browser, device, emulator, build, server, or process execution used to verify the result also requires a passing `P0-G` result and its own exact runtime-verification grant. Use expected-current-value guards, preview, rollback, readback, and isolated verification; record every gate result, grant, approval, change transaction, delivery/release, and verification/outcome evaluation separately.

### Greenfield anti-patterns

- deriving the content model from a chosen CMS's demo templates;
- turning every visible design layer into a field;
- using the navigation tree as the product ontology;
- choosing one label before concept and user-language research;
- deferring errors, empty states, permissions, and recovery;
- creating one English structure and asking localization to fit it later;
- generating synthetic taxonomy “evidence” without users or domain specialists; and
- embedding all documents before defining scopes, permissions, or evaluation queries.

## Takeover entry for an existing product

Takeover is a forensic and migration problem. Existing code and content show what happens now, including contradictions and accidents; they do not automatically show what should happen.

### Takeover sequence

1. **Declare observation scope and read/write boundaries.** Identify repositories, products, markets, locales, environments, surfaces, and excluded systems. Before local-only repository discovery, require a passing applicable `P0-A` result and an independently constructed task-specific read grant for the exact authenticated actor, resources, operations, environment, and expiry. Any model egress or connected read requires its own applicable `P0-B` result plus an exact scoped read/model grant and declared data/egress boundary; if the task also executes a local reader, both phase controls apply. A passing gate does not create the grant, and a grant does not establish gate eligibility.
2. **Inventory representations.** Extract code/localization resources, routes, components, CMS models/entries, APIs, design artifacts, search/index configurations, notifications, documents, and external metadata.
3. **Sample rendered reality.** Observe representative roles, states, permissions, locales, devices, channels, flags, and failure paths.
4. **Reconstruct the observed model.** Infer candidate objects, attributes, relations, concepts, navigation, states, and content types; attach exact evidence sources and orthogonal evidence dimensions, and keep inference explicit.
5. **Map controls and gaps.** Locate governing instruments, evidence sources, accountable owners, approvers, prior decisions, release records, and evaluation; do not guess absent controls.
6. **Measure duplication and divergence.** Find synonyms used as different concepts, concepts sharing one label, orphan content, inconsistent states, dead paths, model/schema mismatches, and conflicting sources.
7. **Study real finding behavior.** Analyze research, query logs, result clicks, zero results, reformulations, support contacts, and external discovery with privacy controls.
8. **Propose the target semantic model.** Preserve unknowns and exceptions. Compare it to the observed model rather than overwriting history.
9. **Design a migration.** Provide old-to-new mappings, redirects, aliases, taxonomy changes, schema/API compatibility, locale transition, index rebuilding, rollback, and communication.
10. **Pilot one bounded journey through a guarded transaction.** Before any mutation, require the applicable `P0-D` local-apply or `P0-E` remote-apply/publication result, an independently constructed task-specific grant for the exact write, and mandatory mutation/change approval bound to the exact transaction. Releasable governed meaning additionally requires applicable semantic-decision approval; release requires a separate release-approval record when policy requires residual-risk acceptance. Any browser, device, emulator, build, server, or process execution used for verification separately requires a passing `P0-G` result and an exact runtime-verification grant. Use expected-current-value guards, preview, rollback, readback, and isolated verification; keep gate, grant, each approval, transaction, delivery, release, verification, and outcome-evaluation records separate. Test downstream consumers, compare before/after outcomes, and expand only after verified learning.
11. **Maintain dual trace during transition.** Keep old identifiers and deprecated terms mapped until consumers, history, links, and analytics are safely migrated.
12. **Retire with evidence and guarded removal.** Remove old paths only after traffic, dependencies, access-control policy, redirects, support, and required retention have been checked. The removal still requires the applicable `P0-D` or `P0-E` result, an exact task-specific write grant, and mandatory mutation/change approval; require semantic-decision approval or release approval separately when the retirement changes governed meaning or carries release risk under applicable policy. Use expected-current-value guards, rollback, and readback, with independent control, approval, transaction, delivery, release, and evaluation records.

### Orthogonal classification of reconstructed takeover evidence

**[Proposal]** Do not turn `observed-live`, `build-verified`, `implemented`, `reachable`, `declared`, `inferred`, `historical`, and `conflict` into one confidence class. They answer different questions and can coexist. Record them in the canonical fields below.

| Question | Record or field | Candidate values or data | Interpretation rule |
|---|---|---|---|
| Was the evidence encountered and independently supported? | Evidence observation strength | `unobserved`, `observed`, `corroborated` | Corroboration increases support; it does not approve a decision. |
| Is credible counterevidence present? | Evidence challenge | `undisputed`, `disputed` | Conflict sets `disputed` and links the conflicting records; it does not erase either source. |
| Is the evidence current enough for this use? | Evidence freshness | `current`, `stale`, with observation and review dates | Freshness is use- and scope-specific; cache lifetime is not evidence freshness. |
| Has a newer evidence record replaced it for the declared scope? | Evidence lineage | `active`, `superseded` | Supersession preserves history and can coexist with stale, disputed, or corroborated evidence. |
| Does the record include interpretation or an unconfirmed belief? | Evidence epistemic qualifier | `none`, `inferred`, `assumed` | Repository patterns or names normally produce `inferred`, not canon. |
| Under what conditions can the occurrence be reached? | Implementation-occurrence reachability | exact role, route, state, flag, permission, locale, environment, and reproduction path | Reachability is a predicate and observation attached to an occurrence, not an evidence or approval state. |
| Where is the occurrence in product delivery? | Independent delivery state | `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, `removed` | A build can be verified but unreleased; live observation does not prove approval or user success. |
| What kind of material is the source, and what claim can it support? | Evidence-source type and evidentiary role | source type, claim scope, evidence fitness, origin, limitations | A requirement, model, archive, or runtime observation has a distinct evidentiary role; source role does not establish governing applicability or approval. |

For example, a current released occurrence may have delivery state `observed-live`, a reproducible runtime observation, and evidence observation `observed`; independent corroboration is a separate evidence change. A reproduced build is delivery state `verified` for a named environment and should link a verification evaluation record. “Implemented” must be resolved to exact occurrence coordinates and the applicable delivery state rather than stored as a generic flag. Historical material may be `superseded`, while a retired occurrence may be `removed`; neither mapping should be assumed without evidence.

## Evaluation framework

### Evaluate four distinct systems

| System | Core question | Representative methods and measures |
|---|---|---|
| **Semantic/model quality** | Does the model represent the needed domain and content without contradiction or exclusion? | competency-question coverage, expert review, scenario fixtures, constraint checks, author workflow, counterexamples, locale/inclusion review |
| **IA and human findability** | Can people orient, predict, find, understand, and recover? | card sorting, tree testing, first-click, task success, time/path, wrong turns, comprehension, accessibility/user research |
| **Retrieval quality** | Does the system retrieve the right evidence for real queries and scopes? | Recall@k, Precision@k, MRR, MAP, nDCG, facet/filter accuracy, permission leakage, freshness/applicability accuracy |
| **Generated decision/output quality** | Does the agent use evidence faithfully and make an appropriate decision? | context relevance, claim support, citation correctness/completeness, answer relevance, factual/behavioral correctness, abstention and escalation quality, human adjudication |

**[Sourced fact]** TREC provides reusable evaluation infrastructure using corpora, topics, judgments, runs, and multiple ranking measures; different metrics capture different retrieval properties ([NIST TREC 2025](https://www.nist.gov/publications/34th-text-retrieval-conference-trec-2025), [TREC CAR](https://trec.nist.gov/pubs/trec27/papers/Overview-CAR.pdf)).

**[Proposal]** Never combine these systems into one unexplained “content score.” A model can validate while excluding a population; a tree can test well while search fails; retrieval can score well while generation invents a claim.

### Minimum fixture dimensions

Evaluation sets should vary:

- greenfield versus takeover;
- exact string/identifier versus conceptual question;
- common versus rare object;
- happy, error, partial, delayed, stale, and recovery states;
- page, UI, notification, support, documentation, API, and agent surfaces;
- product, market, jurisdiction, role, permission, locale, and language;
- current, superseded, conflicting, and missing evidence;
- public, internal, restricted, and malicious resources;
- short versus long context and evidence position;
- single versus multi-hop relationship questions;
- taxonomy rename, split, merge, and cross-scheme mapping;
- API/CMS/component drift; and
- decisions that require abstention or accountable approval.

### Human evaluation remains necessary

**[Research finding]** ARES uses a small human-annotated set to calibrate automated judges rather than treating generated judgments as unquestioned truth ([ARES](https://aclanthology.org/2024.naacl-long.20/)).

**[Proposal]** Human review samples should:

- include content design, domain, engineering, research, accessibility, localization, and security expertise as the task warrants;
- record disagreements and reasons;
- conceal system variant where possible;
- include users for findability, comprehension, and action questions;
- use real source bundles rather than only synthetic prompts; and
- evaluate whether the agent chose the right workflow and escalation, not just whether prose sounds good.

## Failure modes and recovery

| Failure mode | What it looks like | Why it matters | Recovery or control |
|---|---|---|---|
| **String-first design** | Agent rewrites literals without modeling task, state, or source | polished copy can preserve a broken flow or false claim | require context record and behavior check before drafting |
| **CMS-as-model** | Existing fields define the semantic world | platform accidents and migration debt become policy | reconstruct semantic model independently, then map |
| **Component-as-type** | Every visual component becomes a content type | content cannot move across presentations; duplication grows | type by meaning/behavior and map to components |
| **Page/blob model** | Meaning is stored in large rich-text pages | weak reuse, filtering, localization, and retrieval | structure only functional semantic units; avoid needless atomization |
| **Over-modeling** | Dozens of fields/relations have no consumer or user value | author burden, exclusion, brittle migrations | trace each field to a use; remove speculative structure |
| **One universal hierarchy** | topic, task, object, audience, org, and lifecycle are forced into one tree | unstable categories and poor paths | separate bounded schemes and map explicitly |
| **Relation laundering** | everything is “related” | graph looks rich but cannot support decisions | use typed relations or record ambiguity |
| **Label/concept collapse** | renaming creates a new object or synonyms become separate concepts | breaks history, analytics, localization, and search | stable IDs plus label lifecycle and mappings |
| **Internal-language IA** | menus mirror teams, systems, or policy names | users need organizational knowledge to find tasks | user/task research, card sorting, tree testing, labels in context |
| **Navigation/taxonomy collapse** | taxonomy tree is rendered directly as navigation | classification may not match tasks or permissions | design paths separately and test them |
| **Search as cleanup** | weak IA and missing content are delegated to search | results cannot retrieve nonexistent or ambiguous information | model content and paths; search is one route |
| **Vector-only retrieval** | embeddings replace exact names, IDs, codes, and structure | rare or exact evidence is missed | benchmark lexical, structural, graph, dense, and hybrid approaches |
| **Context dump** | whole repository is loaded because the model accepts it | relevant evidence can be diluted or position-biased | compact, ranked context with ablation and position tests |
| **Topical relevance as governing applicability** | relevant-looking policy from wrong market/product is used | plausible but inapplicable decisions | scope filters and explicit applicability checks |
| **Provenance as truth** | traceable source is assumed correct/current | stale or conflicting documents become false confidence | record evidence source plus observation, challenge, freshness, lineage, and epistemic dimensions; check governing applicability and approval separately |
| **Permission-after-generation** | system retrieves secrets then tries to redact output | leakage can occur in model context or logs | enforce access before retrieval and cache/index separation |
| **Retrieved instruction injection** | source text tells the model to ignore workflow or call tools | corpus becomes an execution channel | treat source as data, isolate instructions, adversarial testing |
| **Stale cache mistaken for fresh evidence** | protocol cache TTL is read as fact validity | fast retrieval returns superseded rules | separate transport caching from evidence effective/review dates |
| **Schema-pass theater** | valid JSON or graph is declared high quality | validation cannot prove meaning or usefulness | separate structural, semantic, user, and governance gates |
| **Approval/delivery collapse** | implemented or live text is called approved | audits and migrations inherit false claims | keep exact approval records, independent decision and delivery states, and separate evaluation records |
| **Takeover overwrite** | inferred model is written back as canon | unknowns and historical meaning are destroyed | read-only discovery, explicit evidence dimensions and epistemic qualifiers, reviewed migration |
| **Unmigrated rename** | label changes without redirects, aliases, locale, or client review | broken links, queries, analytics, and integrations | dependency graph and reversible migration |
| **Artificially clean benchmark** | only synthetic happy paths and one locale are tested | high score hides real ambiguity and access failures | representative, adversarial, conflicting, and no-answer fixtures |

## Proposed implications for `content.md`

### 1. The root file should route; structured artifacts should carry the model

**[Proposal]** Keep the always-loaded repository contract concise, and route to versioned files such as:

```text
CONTENT.md
.content/
  manifest.yaml
  model/
    concepts.yaml
    content-types.yaml
    relations.yaml
    states.yaml
    mappings.yaml
  terminology/
    scheme.yaml
    labels/
  ia/
    navigation.yaml
    entry-points.yaml
    redirects.yaml
  retrieval/
    corpus.yaml
    policies.yaml
    queries/
    judgments/
  evidence/
  decisions/
  deliveries/
  evaluations/
  migrations/
```

This is a proposed logical layout, not a frozen public filename or schema.

### 2. Preserve independent control planes

**[Proposal]** Do not use one generic `status` or `owner`. Store independently:

- each evidence source's provenance, exact coordinates, scope, retrieval or observation date, evidentiary role, fitness, and limitations;
- orthogonal evidence dimensions: observation strength (`unobserved`/`observed`/`corroborated`), challenge (`undisputed`/`disputed`), freshness (`current`/`stale`), lineage (`active`/`superseded`), and epistemic qualifier (`none`/`inferred`/`assumed`);
- each governing instrument's applicability, jurisdiction or scope, effective period, exceptions, and review trigger;
- the accountable owner for a declared fact, instrument, system, or decision class;
- every authorized approver and exact approval record, including decision version, scope, conditions, date, and expiry;
- an independent decision state (`question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, or `retired`) plus rationale and history;
- an independent delivery state (`unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, or `removed`) plus exact occurrence, implementer, environment, and release data; and
- a separate evaluation record containing the evaluated object, question or hypothesis, method, population or fixture, result, limitations, evaluator, and uncertainty.

This prevents an implemented string, approved model, released build, and successful evaluation from becoming the same claim.

### 3. Discover first; infer with labels; never silently canonize

**[Proposal]** In takeover mode, the agent should emit:

- observed objects, states, relations, and occurrences;
- candidate concepts and duplicates;
- mappings with exact evidence links, orthogonal evidence dimensions, rationale, and unresolved uncertainty;
- conflicts and missing controls;
- proposed target model and alternatives; and
- migration impact.

Only a decision in canonical `approved` state with an exact authorized semantic-decision approval record for the exact version and scope may enter approved policy. Enforcement additionally requires a current deterministic rule eligible for enforcement, passing applicable `P0-A` or `P0-B` read-gate and `P0-F` enforcement results, and an independently constructed task-specific grant for the exact check. If the check launches or attaches to a build, test, browser, device, emulator, server, or process, it also requires a passing `P0-G` result and a separate exact runtime-execution grant. If enforcement mutates a local source or remotely applies or publishes a change, it also requires the applicable `P0-D` or `P0-E` result, exact write grant, mandatory mutation/change approval, and a separate release approval when a publication is subject to release-risk acceptance, plus expected-current guards, rollback, and readback.

### 4. Compile task-specific context

**[Product hypothesis]** Given a content task, the agent should retrieve only the relevant:

- product/journey/state model;
- controlled facts and governing instruments;
- concept and terminology records;
- surface/component and implementation mapping;
- locale/accessibility requirements;
- prior decisions and evaluation results; and
- exact current occurrences.

It should show why each item was selected, what was excluded by authenticated-principal or resource-level access controls, and what remains unknown.

### 5. Support semantic diff and impact analysis

**[Proposal]** A content change request should identify whether it changes:

- label only;
- concept definition;
- classification or relation;
- content-type field or validation;
- lifecycle/state semantics;
- navigation or search behavior;
- governing claim;
- API/client contract;
- locale behavior;
- component capability; or
- only one rendered occurrence.

Then list affected occurrences, references, clients, routes, locales, indexes, decisions, tests, and migrations before applying it.

### 6. Use the lightest sufficient semantic technology

**[Proposal]** The internal model should support stable IDs, typed relations, multilingual labels, provenance, versions, mappings, and validation without requiring every adopter to deploy RDF/OWL. Provide interoperability adapters for SKOS, JSON Schema, OpenAPI, CMS models, and other standards when the repository uses them.

### 7. Make findability and retrieval testable contracts

**[Proposal]** Each material IA or retrieval change should carry:

- target users/tasks or query set;
- baseline;
- proposed structure/ranking;
- expected outcomes and known tradeoffs;
- human and machine evaluation method;
- accessibility and locale coverage;
- authenticated-principal, resource-level access-control, and security tests;
- release observation; and
- rollback trigger.

### 8. Enforce only approved deterministic constraints

**[Proposal]** Eligibility for enforcement requires all of the following independently: a current deterministic rule; a linked decision in `approved` state; an exact authorized semantic-decision approval record for the rule version and scope; passing applicable `P0-A` or `P0-B` read-gate and `P0-F` enforcement results; and an independently constructed task-specific capability grant for the exact actor, operation, resources, environment, data/egress boundary, and expiry. An enforcement check that launches or attaches to a build, test, browser, device, emulator, server, or process also requires `P0-G` plus a separate exact runtime-execution grant. An enforcement action that mutates local content additionally requires `P0-D`; remote mutation or publication requires `P0-E`. Each write also needs mandatory mutation/change approval, expected-current-value guards, rollback, and readback; publication additionally needs release approval when release policy requires residual-risk acceptance. None of these records can be inferred from the others.

Safe candidates for automated enforcement include:

- schema validity;
- stable/referential IDs;
- prohibited broken mappings;
- required source/control metadata for high-consequence claims;
- locale/message structural parity;
- required accessible names or content roles where statically knowable;
- stale/superseded resource warnings;
- missing redirects/aliases in declared migrations; and
- retrieval access-control violations.

Research-dependent judgments—mental model, information scent, inclusion, helpfulness, tone, and context fit—should remain findings or proposals until fit evidence supports a decision in canonical `approved` state with an exact authorized approval record. That approval alone still does not make the judgment deterministic or eligible for automated enforcement.

### 9. Treat agent retrieval as a product surface

**[Proposal]** The system should expose:

- what corpus and version it used;
- which resources and segments were retrieved;
- why they were in scope;
- authenticated-principal/resource access-control and evidence-freshness decisions;
- conflicts and omitted evidence;
- claim-to-source links;
- whether the output is an observation, inference, proposal, approved decision, or implementation; and
- evaluation/incident history for the retrieval path.

### 10. Fail closed on consequential ambiguity

**[Proposal]** The agent should stop autonomous drafting or application when:

- the relevant fact lacks fit evidence;
- governing applicability is unresolved;
- sources conflict materially;
- a concept merge/split would change product or legal meaning;
- a content-only request implies behavior/API change;
- the authenticated actor, exact resource or target, allowed operation, environment, expiry, or data/egress boundary is unclear;
- safe source round-trip is unproven;
- any applicable `P0-A`–`P0-G` phase-gate result, including `P0-C` for autonomous draft-artifact production, is missing or failed;
- the independently constructed task-specific capability grant is missing, expired, revoked, or does not match the exact action scope;
- a required exact semantic-decision approval, mutation/change approval, or release-approval record for its respective version and scope is absent; or
- the system cannot distinguish current from stale or historical content.

## Research gaps

### RG-P0 — blocks a stable public model

- **[Open question] Practitioner reality:** Artifact walkthroughs and observation are needed with content designers, information architects, content strategists, taxonomists, content engineers, search practitioners, localization experts, and CMS operators. Desk sources cannot show tacit sequencing and negotiation.
- **[Open question] Representative repository corpus:** We need instrumented fixtures spanning code-first, CMS-first, design-first, documentation-heavy, monorepo, mobile, localized, regulated, and agentic products.
- **[Open question] Semantic unit:** Test the candidate `message-in-context` aggregate and its two-level identity across UI, long-form, notifications, APIs, support, and generated experiences. Compare it with the alternative occurrence-centered inventory hypothesis without collapsing semantic message/decision identity into expression or implementation-occurrence identity.
- **[Open question] Claim/control model:** Validate that evidence sources and orthogonal evidence dimensions, governing instruments and applicability, accountable owners, authorized approvers and approval records, independent decision and delivery states, and separate evaluation records can remain distinct without becoming unusably heavy.
- **[Open question] Retrieval benchmark:** Build judged tasks for exact strings, behavior/state questions, terminology, navigation, controlled claims, locale, and cross-source conflicts. Public QA benchmarks are not adequate proxies.
- **[Open question] Takeover safety:** Determine task-specific evidence-fitness and review thresholds for reconstructing models from incomplete repositories and rendered products without using a mixed confidence class.

### RG-P1 — needed before broad interoperability

- compare content models and lifecycle semantics across multiple CMSs, design tools, TMSs, documentation systems, and code frameworks;
- test SKOS-like semantics in a lightweight YAML/JSON schema and round-trip exports;
- study ontology and taxonomy governance in healthcare, finance, public services, commerce, education, safety, and multilingual products;
- research non-English-first IA, search, and classification practices, including scripts without whitespace and morphologically rich languages;
- test graph, lexical, dense, reranked, and hybrid retrieval on repository tasks and costs;
- define permission-preserving indexes, cache invalidation, deletion, retention, and audit behavior;
- study how users interpret agent citations, uncertainty, conflict, and abstention; and
- evaluate authoring burden and exclusion created by structured models.

### RG-P2 — longer-range inquiry

- agent-mediated navigation that changes with user goals without becoming unpredictable;
- adaptive IA and personalization with accessibility, fairness, privacy, and explainability controls;
- cross-organization concept mapping and federated content governance;
- automatic model drift detection from code/API/CMS changes without false canonization;
- durable identifiers across mergers, rebrands, acquisitions, and product retirement;
- causal evidence connecting better content models to task, trust, support, and maintenance outcomes; and
- interoperability with future agent-context, provenance, semantic, and localization standards.

## Source and inference limits

- The strongest direct practice evidence is weighted toward English-language UK/Canadian public service and technology-oriented web/CMS work.
- Formal W3C/OASIS/OpenAPI/JSON standards describe representations and conformance, not whether a particular product should adopt them.
- The Contentful records document one commercial platform and are not independent capability tests or a CMS market comparison.
- Search and RAG research is dominated by document/passage retrieval and question answering; product-content decisions have different units, consequences, and review requirements.
- GOV.UK's taxonomy implementation documentation warns that it may be stale; it is used as a versioned implementation example, not a current architecture assertion.
- MCP, search-platform, security, and agent documentation are fast-moving. The current MCP record uses the final 2026-07-28 revision and must be rechecked before implementation.
- Card sorts, tree tests, relevance metrics, schema checks, and model judges each answer bounded questions. None alone certifies an IA or agent.
- Practitioner articles are valuable accounts and frameworks, not representative empirical evidence.
- The proposed repository layout, unit model, retrieval pipeline, decision separation, and enforcement boundary are research-derived hypotheses that require real-product validation.

## Bottom line

**[Cross-source finding]** Full-stack content design begins before words, at the level of meaning, objects, events, states, relationships, evidence, structure, and paths. It continues through implementation, retrieval, release, and maintenance.

**[Proposal]** `content.md` should become the agentic layer that can reconstruct and govern that chain without pretending one string file, CMS schema, taxonomy tree, vector index, or model output is the whole truth. Its core capability is not “write all the copy.” It is to make the information system explicit, traceable, testable, and safely changeable—then write the right content within it.
