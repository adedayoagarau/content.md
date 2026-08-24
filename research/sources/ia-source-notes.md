---
title: Content modeling and information architecture source notes
status: research-notes
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
scope: Content models, information architecture, taxonomy, ontology, navigation, search, structured content, and AI-mediated retrieval
---

# Content modeling and information architecture source notes

## Method and evidence boundaries

These notes support [content-modeling-and-information-architecture.md](../01-discipline/content-modeling-and-information-architecture.md). They follow the project [research protocol](../00-method/research-protocol.md): standards and official specifications first, then primary organizational practice, peer-reviewed research, established professional guidance, and vendor documentation where a concrete platform example is useful.

All sources were accessed on **2026-08-17**. Dates below are publication or update dates exposed by the source where available. A source describing one organization, product, benchmark, or technical vocabulary does not establish a universal content-design rule.

Access labels:

- **`direct/read`** — the relevant full page, specification section, paper, or official abstract was reviewed.
- **`abstract/metadata`** — only authoritative metadata and abstract-level claims were used.
- **`cross-reference`** — the source was already recorded elsewhere in this corpus; this note points to the canonical record instead of pretending it is new evidence.

`Source type / evidentiary role` records why a source can support a bounded claim. It does not identify a governing instrument, establish that instrument's applicability, appoint an accountable owner, authorize an approver, record approval, or prove implementation, release, or evaluation.

## Discipline, content modeling, and IA practice

### IA-01 — Information Architecture Institute: What is IA?

- **Citation:** Information Architecture Institute, *What is IA?*, copyright 2013.
- **URL:** https://www.iainstitute.org/sites/default/files/what_is_ia.pdf
- **Source type / evidentiary role:** Established professional-body overview.
- **Access:** `cross-reference`; canonical record is [F26 in foundations-source-notes.md](foundations-source-notes.md#f26-information-architecture-institute-overview).
- **Scope:** Shared information environments including websites, intranets, and software.
- **Supports:** IA concerns structural design and organization and labeling systems in service of usability and findability; it is interdisciplinary.
- **Practices/artifacts:** Organization, labeling, navigation, and structural systems.
- **Limits:** Short, English-language, and old; it does not cover contemporary content APIs, agent retrieval, or current professional decision rights.
- **Questions:** Which parts of this definition remain useful across conversational, generated, and agent-mediated environments?

### IA-02 — Content design at the Canadian Digital Service

- **Citation:** Canadian Digital Service, *Content design at CDS*; published 2025-01-08 according to page metadata.
- **URL:** https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/
- **Source type / evidentiary role:** Primary organizational practice.
- **Access:** `direct/read`
- **Scope:** Bilingual Canadian public-service product and service design; historical CDS onboarding documentation, explicitly not a complete universal account.
- **Supports:** Content design spans meaning, content modeling, information architecture, flow documentation, interaction concepts, writing, implementation, and evaluation; designers work with policy, research, design, and development rather than treating text as an isolated layer.
- **Practices/artifacts:** Context and fact gathering, audits, terminology, journey and flow work, content models, IA, bilingual parity, prototypes, implementation review.
- **Limits:** One public-service organization and two official languages; documented practice may not equal every team's actual practice.
- **Questions:** How do small product teams divide these responsibilities when they lack dedicated IA, content strategy, or content engineering roles?

### IA-03 — Content Modelling: A Master Skill

- **Citation:** Rachel Lovinger, *Content Modelling: A Master Skill*, A List Apart, 2012-04-24.
- **URL:** https://alistapart.com/article/content-modelling-a-master-skill/
- **Source type / evidentiary role:** Foundational practitioner guidance.
- **Access:** `direct/read`
- **Scope:** Web and CMS projects as practiced in the early 2010s.
- **Supports:** A content model can align UX intent, editorial needs, and technical implementation; the proposed method distinguishes assembly model, content types, and attributes, and asks about structure, flexibility, reuse, functional behavior, organizational needs, and author effort.
- **Practices/artifacts:** Living content model, type/attribute definitions, relationship and assembly decisions, stakeholder-specific decision extracts, author guidance.
- **Limits:** Old, practitioner-authored, and CMS-era examples are platform-specific. It is not an empirical study or normative standard.
- **Questions:** Which fields and workflow states are needed for product UI, generated content, localization, and agent retrieval beyond page-oriented CMS work?

### IA-04 — Designing Inclusive Content Models

- **Citation:** Preston So, *Designing Inclusive Content Models*, A List Apart, 2021-02-04.
- **URL:** https://alistapart.com/article/designing-inclusive-content-models/
- **Source type / evidentiary role:** Practitioner argument.
- **Access:** `direct/read`
- **Scope:** Participation and representation in web content creation and content models.
- **Supports:** Modeling choices determine which objects, attributes, relations, and contributor inputs a system permits; apparently neutral structures can encode exclusion and impose unequal authoring burdens.
- **Practices/artifacts:** Inclusion review of objects, attributes, relations, required fields, length limits, and authoring workflows.
- **Limits:** Normative practitioner essay, not controlled empirical evidence; examples do not supply a complete accessibility or equity method.
- **Questions:** How should model reviews include people represented by the model as well as people who author and consume its content?

### IA-05 — Ontology Development 101

- **Citation:** Natalya F. Noy and Deborah L. McGuinness, *Ontology Development 101: A Guide to Creating Your First Ontology*, Stanford Knowledge Systems Laboratory Technical Report KSL-01-05, 2001.
- **URL:** https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html
- **Source type / evidentiary role:** Academic technical guide from ontology practitioners.
- **Access:** `direct/read`
- **Scope:** Declarative, frame-based ontology development; examples use a wine domain and early Protégé tooling.
- **Supports:** Ontology design depends on intended application and competency questions, has viable alternatives, and is iterative; domain knowledge should be separated from operational knowledge; classes, instances, properties, and synonyms require distinct treatment.
- **Practices/artifacts:** Domain and scope statement, competency questions, term inventory, reused ontology review, class hierarchy, properties, constraints, instances, application-based evaluation.
- **Limits:** Old, tool-influenced, and not a current UX/content-design method. Formal ontology is unnecessary for many product-content problems.
- **Questions:** What threshold of semantic complexity justifies an ontology instead of a glossary, taxonomy, or typed content model?

## Taxonomy, ontology, metadata, and provenance standards

### IA-06 — SKOS Reference and Primer

- **Citation:** W3C, *SKOS Simple Knowledge Organization System Reference* and *SKOS Primer*, W3C Recommendations, 2009-08-18.
- **URLs:** https://www.w3.org/TR/skos-reference/ and https://www.w3.org/TR/skos-primer/
- **Source type / evidentiary role:** W3C Recommendations.
- **Access:** `direct/read`
- **Scope:** Representing thesauri, classification schemes, subject headings, taxonomies, and other semi-formal knowledge organization systems on the Semantic Web.
- **Supports:** Concepts are distinct from their labels; preferred, alternative, and hidden labels can be language-tagged; broader, narrower, and related relations differ; mapping relations across schemes carry different semantics; hidden labels can support lookup.
- **Practices/artifacts:** Concept scheme, stable concept identifier, multilingual labels, definitions and notes, semantic relations, scheme mappings, integrity checks.
- **Limits:** SKOS does not design a useful taxonomy, choose user-facing navigation, prove term comprehension, determine governing applicability, or appoint accountable product-content owners and approvers.
- **Questions:** Which SKOS semantics should be adopted directly in a lightweight repository schema without requiring RDF tooling?

### IA-07 — OWL 2 overview

- **Citation:** W3C OWL Working Group, *OWL 2 Web Ontology Language Document Overview (Second Edition)*, W3C Recommendation, 2012-12-11.
- **URL:** https://www.w3.org/TR/owl2-overview/
- **Source type / evidentiary role:** W3C Recommendation and informative overview of the normative OWL 2 suite.
- **Access:** `direct/read`
- **Scope:** Formal ontologies for the Semantic Web.
- **Supports:** OWL ontologies represent classes, properties, individuals, and data values with formally defined meaning; profiles trade expressive power for computational and implementation properties.
- **Practices/artifacts:** Formal vocabulary, axioms, class/property relationships, RDF exchange, profile selection, conformance testing.
- **Limits:** A formal ontology language is more expressive and operationally costly than most navigation taxonomies or content models. The overview does not recommend OWL for product content.
- **Questions:** What product use cases truly require inference or formal consistency rather than stable IDs and explicit relations?

### IA-08 — SHACL

- **Citation:** W3C RDF Data Shapes Working Group, *Shapes Constraint Language (SHACL)*, W3C Recommendation, 2017-07-20.
- **URL:** https://www.w3.org/TR/shacl/
- **Source type / evidentiary role:** W3C Recommendation.
- **Access:** `direct/read`
- **Scope:** Describing and validating constraints over RDF graphs.
- **Supports:** A shapes graph can validate a data graph and return structured conformance results; constraints can cover types, counts, patterns, classes, paths, allowed values, and compound conditions.
- **Practices/artifacts:** Machine-validatable graph shapes, immutable validation inputs, conformance report, result severity and paths.
- **Limits:** The stable Recommendation leaves recursive-shape handling undefined. A 2026 SHACL 1.2 draft exists but is not used here as a stable requirement. Structural conformance does not establish semantic, editorial, or user quality.
- **Questions:** Should a repository-native schema use JSON Schema by default and expose SHACL only as an interoperability adapter?

### IA-09 — PROV-O

- **Citation:** W3C Provenance Working Group, *PROV-O: The PROV Ontology*, W3C Recommendation, 2013-04-30.
- **URL:** https://www.w3.org/TR/prov-o/
- **Source type / evidentiary role:** W3C Recommendation.
- **Access:** `direct/read`
- **Scope:** Interoperable provenance descriptions.
- **Supports:** Provenance can relate entities, activities, and agents through generation, use, derivation, attribution, association, revision, invalidation, plans, and roles.
- **Practices/artifacts:** Derivation chain, accountable agent, activity record, source/revision relations, generated and invalidated times.
- **Limits:** PROV-O provides a vocabulary, not proof that a source is truthful, approved, current, or sufficient. Full adoption may be unnecessarily heavy.
- **Questions:** What minimal subset captures content sources, decisions, generated proposals, implementations, and observations?

### IA-10 — DCAT 3

- **Citation:** W3C Dataset Exchange Working Group, *Data Catalog Vocabulary (DCAT) Version 3*, W3C Recommendation, 2024-08-22.
- **URL:** https://www.w3.org/TR/vocab-dcat-3/
- **Source type / evidentiary role:** W3C Recommendation.
- **Access:** `direct/read`
- **Scope:** Interoperable catalogs of datasets, data services, and other resources.
- **Supports:** Catalog records can describe resources, services, distributions, identifiers, access endpoints, versions, and metadata; `dcat:Resource` is an extension point.
- **Practices/artifacts:** Resource catalog, distribution/access metadata, identifiers, version relations, machine-readable discovery.
- **Limits:** Designed for data catalogs, not product-content inventory or UX IA. It is an analogy and possible interoperability source, not a direct schema prescription.
- **Questions:** Would a content corpus manifest benefit from a small DCAT-aligned export without adopting DCAT internally?

## Organizational taxonomy and findability practice

### IA-11 — GOV.UK taxonomy principles

- **Citation:** Government Digital Service, *GOV.UK taxonomy principles*, published 2019-06-13.
- **URL:** https://www.gov.uk/government/publications/govuk-topic-taxonomy-principles/govuk-taxonomy-principles
- **Source type / evidentiary role:** Primary organizational taxonomy guidance.
- **Access:** `direct/read`
- **Scope:** GOV.UK's subject-based topic taxonomy and publishing workflow.
- **Supports:** The taxonomy is scoped to content in the GOV.UK domain rather than the whole world; it supports users and machines, management, topic pages, and finders; topics use a hierarchy and naming rules; tagging accuracy is a publisher responsibility; GDS manages changes using publisher, domain, behavioral, machine, and research input.
- **Practices/artifacts:** Scope rule, parent-child structure, naming principles, lowest-appropriate-level tagging, spot checks, distribution review, change proposals, tree testing.
- **Limits:** One large government publisher; topic taxonomy is not a general product ontology, task architecture, or global naming standard. The principles were published in 2019.
- **Questions:** How should a product maintain several orthogonal schemes—topic, task, object, audience, risk, and journey—without collapsing them into one tree?

### IA-12 — GOV.UK taxonomy implementation and Content API

- **Citations:** GOV.UK Developer Documentation, *How the topic taxonomy works*, last updated 2022-05-04; GOV.UK, *Content API*.
- **URLs:** https://docs.publishing.service.gov.uk/manual/taxonomy.html and https://content-api.publishing.service.gov.uk/
- **Source type / evidentiary role:** Primary technical documentation.
- **Access:** `direct/read`
- **Scope:** GOV.UK publishing architecture; the taxonomy page explicitly warns it may be out of date.
- **Supports:** Taxons are persisted as content items, can have draft or published states, and use link types for parent/child and content tagging; the Content API exposes rendered content and metadata in predictable JSON and supports traversal through links.
- **Practices/artifacts:** Stable content items, typed links, publication state, API representation, reverse links, technical/user-facing mapping.
- **Limits:** The taxonomy implementation note is stale-risk and platform-specific. It proves one implementation pattern, not current internal architecture or universal design.
- **Questions:** How should an agent compare human concept intent with current API and storage representations without treating either as automatically canonical?

### IA-13 — Defra research methods

- **Citation:** UK Department for Environment, Food & Rural Affairs, *Research methods*, live digital service manual accessed 2026-08-17.
- **URL:** https://digital.defra.gov.uk/user-research/research-methods
- **Source type / evidentiary role:** Primary organizational research guidance.
- **Access:** `direct/read`
- **Scope:** Defra user-research practice.
- **Supports:** Research methods should match goals, service phase, users, and constraints; the method set explicitly includes card sorting, tree testing, usability testing, contextual enquiry, surveys, and support-ticket analysis.
- **Practices/artifacts:** Research question, method selection, discussion guide, question bank, accessibility adaptation, support-data analysis.
- **Limits:** Index-level guidance; detailed method quality and thresholds are not established by this page. Government context may not generalize.
- **Questions:** What evidence minimums should block autonomous IA recommendations at different risk and traffic levels?

### IA-14 — DfE card-sort case study

- **Citation:** UK Department for Education, *Using a card sort to understand how users group information*, last updated 2026-06-18.
- **URL:** https://design-histories.education.gov.uk/deliver-good-services/using-a-card-sort-to-understand-how-users-group-information
- **Source type / evidentiary role:** Primary organizational design history.
- **Access:** `direct/read`
- **Scope:** One information architecture for consolidating 16 delivery-guidance manuals; nine participants in the reported card sort.
- **Supports:** The team used a card sort to counter internal-structure bias, create a draft structure, identify related links and missing/unclear content, then planned a tree test rather than treating the sort as final validation.
- **Practices/artifacts:** Problem statement, card set, participant evidence, draft IA, related links, follow-up tree test.
- **Limits:** Small, single-organization case study with no completed tree-test results or causal outcome data.
- **Questions:** How should the agent represent disagreement and weak clusters instead of forcing a clean hierarchy?

## Accessibility and navigation standards

### IA-15 — WCAG 2.2 navigation-related criteria and WAI page structure

- **Citations:** W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*, W3C Recommendation dated 2024-12-12; WAI, *Page Structure Tutorial*, updated 2026-04-08.
- **URLs:** https://www.w3.org/TR/WCAG22/ and https://www.w3.org/WAI/tutorials/page-structure/
- **Source type / evidentiary role:** Normative W3C Recommendation plus informative implementation guidance.
- **Access:** `direct/read`
- **Scope:** Web content accessibility and page/application structure.
- **Supports:** Relevant requirements include programmatically determinable structure, bypass mechanisms, link purpose, multiple ways to locate pages, descriptive headings and labels, consistent navigation and identification, and location information at AAA; WAI guidance connects regions, headings, semantic structure, navigation, and orientation.
- **Practices/artifacts:** Accessibility applicability map, heading/region outline, link and navigation inventory, semantic implementation and assistive-technology review.
- **Limits:** WCAG conformance does not prove general findability, information scent, comprehension, or task success. Some criteria have exceptions and different conformance levels.
- **Questions:** How should the agent test both semantic structure and the experience of people with varied disabilities without making conformance claims from static text alone?

## Structured content and implementation contracts

### IA-16 — JSON Schema 2020-12

- **Citation:** JSON Schema project, *JSON Schema specification, Draft 2020-12*; current version page accessed 2026-08-17.
- **URL:** https://json-schema.org/specification
- **Source type / evidentiary role:** Open technical specification maintained by the JSON Schema project.
- **Access:** `direct/read`
- **Scope:** Describing, annotating, and validating JSON instances.
- **Supports:** Core and validation are separate specification parts; schemas can use validation, applicator, unevaluated, format, content, and metadata vocabularies; meta-schemas support schema validation.
- **Practices/artifacts:** Versioned schema, machine validation, reusable definitions, structured validation output.
- **Limits:** JSON conformance says nothing about user meaning, evidence fitness, governing applicability, accountable ownership, approval, reuse value, findability, or whether fields burden authors unfairly. Implementations vary in vocabulary support.
- **Questions:** What semantic annotations must sit above JSON Schema to prevent an executable storage contract from becoming the only content model?

### IA-17 — OpenAPI 3.2.0

- **Citation:** OpenAPI Initiative, *OpenAPI Specification v3.2.0*, 2025-09-19.
- **URL:** https://spec.openapis.org/oas/latest.html
- **Source type / evidentiary role:** Linux Foundation-hosted open specification.
- **Access:** `direct/read`
- **Scope:** Language-agnostic description of HTTP APIs.
- **Supports:** OpenAPI descriptions let humans and computers discover service capabilities; they describe operations, parameters, requests, responses, schemas, examples, links, security, and external documentation; documentation, code generation, and testing tools can consume the description.
- **Practices/artifacts:** API contract, request/response schema, operation and state evidence, generated documentation/tests, version and deprecation handling.
- **Limits:** An API description can be incomplete or stale and is not the product's semantic content model, editorial policy, or user journey. The normative prose outranks the informational JSON Schema when they differ.
- **Questions:** How should changes in content semantics propagate into API descriptions and client types without accidental breaking changes?

### IA-18 — DITA 1.3

- **Citation:** OASIS, *Darwin Information Typing Architecture (DITA) Version 1.3 Part 0: Overview*, OASIS Standard, 2015-12-17.
- **URL:** https://docs.oasis-open.org/dita/dita/v1.3/os/part0-overview/dita-v1.3-os-part0-overview.html
- **Source type / evidentiary role:** OASIS Standard.
- **Access:** `direct/read`
- **Scope:** Topic-oriented technical, learning, and training content.
- **Supports:** DITA defines document types for authoring and organizing topic-oriented information and mechanisms for combining, extending, and constraining those types.
- **Practices/artifacts:** Typed topics, maps, modular reuse, specialization, document-type constraints.
- **Limits:** Old, XML-centered, and optimized for documentation rather than all product UI or content operations. It is evidence that mature structured-content standards exist, not a default format recommendation.
- **Questions:** Which topic/reuse concepts transfer to repository-native product content without importing DITA's full authoring architecture?

### IA-19 — Contentful data and domain models

- **Citations:** Contentful, *Data model* and *Domain model*, live documentation accessed 2026-08-17.
- **URLs:** https://www.contentful.com/developers/docs/concepts/data-model/ and https://www.contentful.com/developers/docs/concepts/domain-model/
- **Source type / evidentiary role:** Official vendor documentation.
- **Access:** `direct/read`
- **Scope:** One headless CMS/content platform.
- **Supports:** A platform model can include spaces, environments, content types, typed fields, entries, assets, references, arrays, validations, locale versions, roles, tags, workflows, preview, releases, APIs, and webhooks.
- **Practices/artifacts:** CMS schema and JSON representation, field validation, references, environments, permissions, localization, workflow and publishing state.
- **Limits:** Commercial platform vocabulary and constraints are not universal. Product documentation demonstrates capability, not independent usability or operational quality.
- **Questions:** What connector contract can map different CMS constructs to common semantic objects without flattening platform-specific states?

## Search-engine and machine findability

### IA-20 — Google Search structured-data guidance

- **Citations:** Google Search Central, *Introduction to structured data markup in Google Search*, updated 2025-12-10; *General structured data guidelines*, live page accessed 2026-08-17.
- **URLs:** https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data and https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- **Source type / evidentiary role:** Primary platform documentation.
- **Access:** `direct/read`
- **Scope:** Eligibility and behavior for Google Search structured-data features.
- **Supports:** Structured data provides explicit machine-readable clues about page meaning; Google largely uses Schema.org vocabulary but has platform-specific requirements; required properties, visible-page consistency, validation, and production monitoring matter; correct markup does not guarantee a rich result.
- **Practices/artifacts:** Structured-data mapping, validator result, URL inspection, post-release monitoring, before/after measurement.
- **Limits:** Vendor-specific and mutable. Search appearance and ranking use additional signals; the documentation does not prove general search or user value.
- **Questions:** How should the agent discover when external-search semantics are in scope and keep markup synchronized with visible content and product facts?

### IA-21 — Google crawlable links and site discovery

- **Citation:** Google Search Central, *Link best practices for Google*, live page accessed 2026-08-17.
- **URL:** https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- **Source type / evidentiary role:** Primary platform documentation.
- **Access:** `direct/read`
- **Scope:** Google crawling, internal links, and anchor text.
- **Supports:** Standard crawlable anchors support discovery; contextual internal links and descriptive anchor text help people and Google make sense of pages; pages a publisher cares about should be linked from another page.
- **Practices/artifacts:** Internal-link graph, crawlability check, anchor-text review, orphan-page inventory.
- **Limits:** Search-engine guidance is not a complete navigation or accessibility method and can change. Crawlability does not guarantee indexing or usefulness.
- **Questions:** How should external-search checks coexist with product navigation, permission boundaries, and intentionally unindexed content?

## Repository and agent context delivery

### IA-22 — AGENTS.md

- **Citation:** Agentic AI Foundation, *AGENTS.md*, live specification/guidance accessed 2026-08-17.
- **URL:** https://agents.md/
- **Source type / evidentiary role:** Ecosystem convention stewarded by an LF Projects foundation.
- **Access:** `direct/read`
- **Scope:** Repository instructions for coding agents.
- **Supports:** A predictable Markdown file supplies project context and instructions; nested files can scope subprojects, with the closest file taking precedence; the format is intentionally free-form and living.
- **Practices/artifacts:** Root instruction file, nested scope-specific files, explicit commands and conventions.
- **Limits:** Free-form instructions are not a content model, retrieval index, approval system, or standards-enforced schema. Host support and exact loading behavior vary.
- **Questions:** Which content rules belong in concise scoped instructions versus referenced structured artifacts and runtime retrieval?

### IA-23 — Model Context Protocol 2026-07-28 resources and release

- **Citations:** Model Context Protocol, *Resources*, specification dated 2026-07-28; David Soria Parra and Den Delimarsky, *The 2026-07-28 Specification*, 2026-07-28.
- **URLs:** https://modelcontextprotocol.io/specification/2026-07-28/server/resources and https://blog.modelcontextprotocol.io/posts/2026-07-28/
- **Source type / evidentiary role:** Official protocol specification.
- **Access:** `direct/read`
- **Scope:** Server-provided context resources for AI clients.
- **Supports:** Resources have unique URIs and optional metadata; clients can list, read, template, subscribe to, search/filter, or automatically include resources. The 2026-07-28 revision adds per-request protocol/client metadata, cache hints (`ttlMs`, `cacheScope`) for resource lists and reads, authorization-dependent resource sets, and subscription changes. The release also introduces a stateless core, optional `server/discover`, header routing, authorization hardening, and deprecation of dynamic client registration toward client ID metadata documents.
- **Practices/artifacts:** Resource catalog, stable URI, MIME type, annotations, pagination, cache scope and lifetime, change notification, subscription, per-request credentials, permission filtering.
- **Limits:** MCP deliberately leaves context-selection UX and policy to applications. Cache hints express protocol caching behavior, not evidence freshness or governing applicability. The protocol does not define relevance, truth, approval, or how a model must use a resource. The 2025-06-18 resource behavior is historical compatibility evidence, not the current specification.
- **Questions:** What content-specific metadata, cache invalidation, evidence-freshness checks, and authorization controls must extend generic resources for safe claim-level retrieval?

## Information retrieval and AI-mediated retrieval research

### IA-24 — Retrieval-Augmented Generation

- **Citation:** Patrick Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, NeurIPS 2020.
- **URL:** https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html
- **Source type / evidentiary role:** Peer-reviewed conference paper.
- **Access:** `direct/read` (paper abstract and relevant paper text)
- **Scope:** RAG models evaluated on specified knowledge-intensive NLP tasks using a Wikipedia dense index.
- **Supports:** The paper combines parametric generation with non-parametric retrieved memory and frames updateability and provenance as problems retrieval may help address; reported gains are task- and system-specific.
- **Practices/artifacts:** Retriever/generator separation, explicit corpus, retrieved passages, task evaluation.
- **Limits:** Original 2020 architecture and benchmarks do not establish that RAG guarantees factuality, citation correctness, governing-applicability selection, evidence fitness, or safety in a repository agent.
- **Questions:** How should claim-level governing applicability, evidence fitness, and version state constrain retrieval before generation?

### IA-25 — Dense Passage Retrieval

- **Citation:** Vladimir Karpukhin et al., *Dense Passage Retrieval for Open-Domain Question Answering*, EMNLP 2020.
- **URL:** https://aclanthology.org/2020.emnlp-main.550/
- **Source type / evidentiary role:** Peer-reviewed conference paper.
- **Access:** `direct/read`
- **Scope:** Open-domain factoid question answering on the paper's datasets.
- **Supports:** Learned dense representations can retrieve semantically relevant passages and outperformed the paper's BM25 baseline on its reported top-20 passage retrieval metric.
- **Practices/artifacts:** Query and passage encoders, corpus index, retrieval accuracy measurement, end-to-end QA evaluation.
- **Limits:** Results do not generalize automatically to repositories, exact identifiers, rare entities, multilingual terms, policy documents, or mixed content types.
- **Questions:** What balance of lexical, structural, graph, and dense retrieval works for exact UI strings and semantic design questions?

### IA-26 — BEIR benchmark

- **Citation:** Nandan Thakur et al., *BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models*, NeurIPS 2021 Datasets and Benchmarks Track.
- **URL:** https://arxiv.org/abs/2104.08663
- **Source type / evidentiary role:** Peer-reviewed benchmark paper; arXiv full text reviewed.
- **Access:** `direct/read`
- **Scope:** Eighteen public datasets across varied text-retrieval tasks and domains, evaluating ten retrieval approaches.
- **Supports:** Retrieval performance varies by domain; BM25 was a robust baseline in the reported benchmark, while reranking and late interaction had strong average zero-shot performance at higher cost; dense/sparse learned systems showed generalization limits.
- **Practices/artifacts:** Heterogeneous evaluation suite, multiple retrieval baselines, out-of-domain evaluation, cost/performance comparison.
- **Limits:** The benchmark is not product-content-specific and does not encode governing applicability, evidence fitness, accountable ownership, approval records, freshness, permissions, localization, or task consequence.
- **Questions:** What fixture suite represents repository content across code, design, CMS, policy, analytics, and locale sources?

### IA-27 — Lost in the Middle

- **Citation:** Nelson F. Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*, Transactions of the Association for Computational Linguistics 12 (2024), 157–173; DOI 10.1162/tacl_a_00638.
- **URL:** https://aclanthology.org/2024.tacl-1.9/
- **Source type / evidentiary role:** Peer-reviewed journal article.
- **Access:** `direct/read`
- **Scope:** Controlled multi-document question answering and key-value retrieval experiments across studied language models.
- **Supports:** Performance can change substantially with the location of relevant material, often degrading when it appears in the middle of long contexts; longer available context is not proof of robust use.
- **Practices/artifacts:** Position-controlled retrieval tests, context-length tests, task-specific context selection and reranking evaluation.
- **Limits:** Model results are historically and architecture-specific; the paper does not prescribe one context compiler.
- **Questions:** How should a content agent test context order, truncation, diversity, and omitted evidence under realistic repository workloads?

### IA-28 — TREC evaluation infrastructure

- **Citations:** Ian Soboroff and George Awad, *The 34th Text REtrieval Conference (TREC 2025)*, NIST SP 1348, published 2026-03-24; TREC Complex Answer Retrieval overview, 2018.
- **URLs:** https://www.nist.gov/publications/34th-text-retrieval-conference-trec-2025 and https://trec.nist.gov/pubs/trec27/papers/Overview-CAR.pdf
- **Source type / evidentiary role:** NIST evaluation program and official track overview.
- **Access:** `direct/read`
- **Scope:** Large-scale information-retrieval evaluation; CAR is one historical passage-retrieval track.
- **Supports:** Reusable evaluation infrastructure needs corpora, tasks/topics, relevance judgments, submitted runs, and metrics; common measures capture different properties, including recall, first-hit rank, average precision, and graded ranking quality.
- **Practices/artifacts:** Frozen corpus and queries, human relevance judgments, run files, R-precision/MAP/MRR/nDCG, repeatable comparisons.
- **Limits:** Offline relevance metrics do not directly measure comprehension, action quality, trust, accessibility, or downstream agent correctness.
- **Questions:** Which retrieval metrics correlate with professional content-design decisions, and what relevance grades reflect evidence fitness and governing applicability as well as topical match?

### IA-29 — ARES RAG evaluation

- **Citation:** Jon Saad-Falcon et al., *ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems*, NAACL 2024.
- **URL:** https://aclanthology.org/2024.naacl-long.20/
- **Source type / evidentiary role:** Peer-reviewed conference paper.
- **Access:** `direct/read` (publisher abstract and paper metadata)
- **Scope:** Automated evaluation across eight specified knowledge-intensive tasks, with synthetic training data and a small human-annotated set.
- **Supports:** RAG evaluation should separate context relevance, answer faithfulness, and answer relevance; automated judges can be calibrated with human annotations rather than treated as ground truth.
- **Practices/artifacts:** Component-level metrics, human-labeled calibration set, domain-shift testing, prediction-powered inference.
- **Limits:** One evaluation framework with model-judge and synthetic-data dependencies; it does not cover product content, approvals, citation granularity, or user outcomes completely.
- **Questions:** What human adjudication sample and disagreement process is needed before model-judge results can gate content changes?

### IA-30 — NIST Generative AI Profile

- **Citation:** Chloe Autio et al., *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*, NIST AI 600-1, 2024-07-26; NIST record updated 2026-04-08.
- **URLs:** https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence and https://doi.org/10.6028/NIST.AI.600-1
- **Source type / evidentiary role:** US government voluntary risk-management profile.
- **Access:** `direct/read`
- **Scope:** Cross-sector generative-AI risk management; not product-content-specific and not a mandatory standard.
- **Supports:** Confabulation includes confidently presented false or internally inconsistent output, including fabricated citations; risk increases in consequential and domain-expert contexts; profile actions emphasize governance, testing, monitoring, transparency, and incident handling.
- **Practices/artifacts:** Risk register, predeployment testing, source/citation checks, monitoring, human oversight, incident record.
- **Limits:** Broad risk profile rather than an implementation recipe or guarantee. Jurisdictions and obligations vary.
- **Questions:** Which retrieval and evidence failures require refusal, escalation, rollback, or incident treatment in a content agent?

### IA-31 — OWASP prompt injection and vector/embedding weaknesses

- **Citations:** OWASP GenAI Security Project, *LLM01:2025 Prompt Injection* and *LLM08:2025 Vector and Embedding Weaknesses*.
- **URLs:** https://genai.owasp.org/llmrisk/llm01-prompt-injection/ and https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/
- **Source type / evidentiary role:** Professional security-community guidance, not a formal standard.
- **Access:** `direct/read`
- **Scope:** Common security risks in LLM applications and vector-based retrieval.
- **Supports:** Retrieved or multimodal content can carry indirect instructions; RAG does not eliminate prompt injection; knowledge-base integrity, permission-aware partitioning, source validation, logging, and adversarial testing are material controls.
- **Practices/artifacts:** Trust-boundary model, ingestion validation, access filters, retrieval log, knowledge-base integrity review, adversarial fixtures.
- **Limits:** Threat taxonomy and mitigations evolve; listed controls do not guarantee prevention and need system-specific threat modeling.
- **Questions:** How can the agent preserve source text as untrusted evidence while preventing it from becoming executable instruction?

## Cross-source synthesis and unresolved conflicts

1. **[Cross-source finding] A model has an application and boundary.** Noy and McGuinness explicitly tie ontology design to use and competency questions; GOV.UK restricts its topic taxonomy to the domain it actually publishes. Neither supports a universal ontology of all product content.
2. **[Cross-source finding] Meaning and implementation are related but not identical.** Lovinger treats the content model as a bridge among UX, editorial, and implementation. JSON Schema, OpenAPI, DITA, and Contentful demonstrate executable representations, but none proves that its storage structure is the correct semantic or user model.
3. **[Cross-source finding] Concepts are not labels.** SKOS and the Stanford guide separate stable concepts from synonyms and display names. This matters for terminology, localization, search expansion, and migrations.
4. **[Cross-source finding] Taxonomy is not navigation.** GOV.UK's own practice distinguishes its underlying subject classification from the ways it is surfaced. Navigation also must respect task, state, permissions, device, and accessibility.
5. **[Cross-source finding] Machine validation is necessary but partial.** JSON Schema and SHACL can establish structural conformance. They cannot establish accuracy, evidence fitness, governing applicability, inclusion, comprehensibility, findability, or usefulness.
6. **[Cross-source finding] Retrieval and generation must be evaluated separately.** TREC, BEIR, ARES, and RAG research support distinct tests for retrieval coverage/ranking, context relevance, answer faithfulness, and answer relevance. No single metric establishes end-to-end content quality.
7. **[Research finding] More context is not automatically better.** Long-context research shows position and context volume can affect use. **[Product hypothesis]** A compact, ranked, governing-applicability-aware context pack is therefore a design to test, not a settled universal solution.
8. **[Cross-source finding] Provenance is not truth.** PROV-O can represent derivation and responsibility, while NIST documents confident falsehood and fabricated citations. A traceable source can still be wrong, stale, unauthorized, or inapplicable.
9. **[Cross-source finding] The corpus is an attack surface.** MCP supports discoverable resources and permissions, while OWASP warns that retrieved content can manipulate model behavior. **[Proposal]** Data should remain evidence, not instruction, unless an explicit trust policy classifies it as governing agent instruction.

## Source limits for this workstream

- Most organizational and practitioner material is English-language and weighted toward North American and UK public-service or technology contexts.
- Formal knowledge-organization and semantic-web standards are well represented, but library-science practice using licensed ISO/NISO standards was not directly reviewed where full text was inaccessible.
- CMS evidence uses Contentful as one concrete example; it is not a market comparison or endorsement.
- Search evaluation research is stronger for document/passage retrieval and question answering than for product-content design decisions across UI states.
- No desk source can reveal the tacit negotiation, shortcuts, or failure recovery of practitioners. Artifact walkthroughs and observational studies remain necessary.
- Fast-moving agent, retrieval, search-platform, and security documentation must be rechecked before it becomes a versioned product requirement.
