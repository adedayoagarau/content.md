---
title: Prior art, adjacent systems, standards, specifications, and naming risk
status: working-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
---

# Prior art, adjacent systems, standards, specifications, and naming risk

## Evidence boundary

This is a current landscape scan, not a purchasing recommendation or proof of product capability. Public documentation can establish declared formats and workflows; vendor feature and outcome claims require hands-on verification, customer evidence, and security/legal review.

- **[Sourced fact]** The exact file name `CONTENT.md` and the name `content-md` are already in active public use for different purposes described below.
- **[Sourced fact]** Ditto now documents an agent setup package, repository-local `.ditto.md` component specs, skills, MCP, code/string integrations, and governance workflows that directly overlap the proposed direction. Sources: [Ditto agent setup](https://developer.dittowords.com/agent-setup-package/overview) and [Ditto Specs](https://developer.dittowords.com/ditto-specs-cli-reference/overview).
- **[Inference]** The opportunity cannot be justified as “content has no agentic or repository-native system.” Several projects already occupy parts of that claim, and Ditto occupies a substantial combined portion.
- **[Proposal]** Define differentiation through tested behavior, openness, evidence/control and decision-rights handling, experience coverage, safe implementation, and evaluation—not through a filename analogy alone.

## Landscape map

| Category | Examples | What the category primarily solves |
|---|---|---|
| Agent instructions | AGENTS.md, CLAUDE.md, GEMINI.md, Copilot instructions | Persistent context and host behavior guidance |
| Structured `.md` specifications | Google DESIGN.md, VOICE.md, Ditto Specs, GitCMS CONTENT.md | Versioned human/machine-readable rules or metadata |
| Agent workflows | Agent Skills, UX Writing Skill, Ditto agent setup | Reusable task procedures, references, scripts, tools |
| Code/content review | ContentRX, Vale, textlint, alex, write-good | Pattern/style diagnostics and editor/CI feedback |
| Product-copy systems | Ditto, Frontitude | Centralize, review, reuse, localize, and hand off product text |
| CMS | Contentful and other headless CMSs | Structured content modeling, storage, publishing, APIs |
| Localization/TMS | Lokalise, Phrase | Translation workflow, locale assets, design/code handoff |
| Runtime message standards | Unicode MessageFormat 2, ICU ecosystem | Localizable dynamic message representation and formatting |
| Translation interchange | XLIFF 2.2 | Exchange of source/target units and localization metadata |
| Accessibility/plain language | WCAG, WAI-ARIA, ISO 24495-1 | Normative or guidance constraints on accessible/clear content |
| Web-for-agent content | content-md | High-fidelity Markdown representation of web resources for agents |

## Direct and near-direct prior art

### Ditto: closest documented overlap

- **[Sourced fact]** Ditto describes itself as a system for product text from draft through design and development, including keys, variables, plurals, file formats, localization, APIs, CLI, MCP, webhooks, Figma, GitHub Action, and PR review. Source: [Ditto developer introduction](https://developer.dittowords.com/introduction).
- **[Sourced fact]** Its current product site says it centralizes standards, strings, and decisions; scans code; applies guidance in Figma, Claude Code, pull requests, and prototypes; tracks changes, approval, live status, and standard performance. These are vendor claims and were not independently exercised in this research. Source: [Ditto product site](https://www.dittowords.com/).
- **[Sourced fact]** The agent setup package bundles an MCP server, always-on instructions, `/ditto-review`, `/ditto-audit`, and component-spec workflows for Claude Code and Cursor. Source: [Ditto agent setup overview](https://developer.dittowords.com/agent-setup-package/overview).
- **[Sourced fact]** Alpha Ditto Specs use a repository-level `workspace.ditto.md` and colocated `*.ditto.md` component files. Specs declare text surfaces, tags, optional maximum lengths, synchronized style/terminology rules, and locale-scoped rules. Agents read them, the CLI syncs rules, and humans review them in pull requests. Sources: [Ditto Specs overview](https://developer.dittowords.com/ditto-specs-cli-reference/overview) and [Ditto Spec Files](https://developer.dittowords.com/ditto-specs-cli-reference/spec-files).
- **[Sourced fact]** Ditto's documented audit skill resolves inline strings, template strings, hardcoded text, i18n values including plural forms, and Ditto IDs; it flags unresolvable dynamic values for manual review. Source: [Ditto Agent Skills](https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills).

What this means:

- **[Inference]** Ditto is not merely a Figma copy library in the 2026 landscape. It is the strongest direct comparison found for repository-native agentic content governance.
- **[Proposal]** Run a hands-on competitive evaluation against the benchmark corpus before committing architecture or positioning. Test installation, host discovery, extraction recall, custom wrappers, states beyond components, CMS/design authority conflicts, decision history, locales, safe writes, offline/private operation, export, and uninstall.
- **[Open question]** Which Ditto capabilities require its hosted platform, paid plans, credentials, or a specific framework, and what can run locally/openly?
- **[Open question]** How far does Ditto extend beyond component copy into content IA, end-to-end journeys, lifecycle channels, domain research, user-research planning, policy evidence, and full experience verification?

### GitCMS CONTENT.md: exact filename collision

- **[Sourced fact]** GitCMS defines `CONTENT.md` as site-wide writing instructions that its AI-assisted writing flows read before writing. It recommends audience, tone, reading level, terminology, formatting, examples, and do/don't rules. Source: [GitCMS, CONTENT.md](https://gitcms.dev/docs/ai-mcp/content-instructions/).
- **[Sourced fact]** GitCMS explicitly excludes secrets, one-off campaigns, temporary tasks, repository configuration, and per-article outlines; it frames the file as an editorial brief for site content. Source: [GitCMS, CONTENT.md](https://gitcms.dev/docs/ai-mcp/content-instructions/).
- **[Inference]** This is a narrow but real prior claim on the exact file name. It is not the proposed full product-content workflow, but incompatible semantics under the same name would confuse users and search results.

### VOICE.md: structured voice and copy rules

- **[Sourced fact]** VOICE.md defines YAML tokens plus Markdown rationale for brand communication: locale/treatment, personality, beliefs, lexicon, audiences, per-surface constraints, tones, formatting, and components. It provides validation, string linting, diffing, prompt/JSON/ESLint export, and labels itself alpha. Source: [efeoncepro/voice.md](https://github.com/efeoncepro/voice.md).
- **[Inference]** VOICE.md is close prior art for the voice, terminology, surface-rule, and CI layer. It does not by itself establish an end-to-end content-design workflow, product/state discovery, content IA, source-authority resolution, or user-outcome evaluation.

### UX Writing Skill: reusable agent workflow

- **[Sourced fact]** The `content-designer/ux-writing-skill` repository packages UX-writing standards and references as an Agent Skill and documents use with Claude and Codex. Source: [UX Writing Skill](https://github.com/content-designer/ux-writing-skill).
- **[Inference]** It demonstrates distribution and progressive workflow context. A generic writing skill still needs product-specific evidence, terminology, authority, state coverage, implementation adapters, and decision memory to become an embedded content designer.

### ContentRX: inline code diagnostics

- **[Sourced fact]** ContentRX's VS Code/Cursor extension documents diagnostics for JSX/TSX/JS/TS text children and known copy attributes such as `alt`, `aria-label`, `label`, `placeholder`, `title`, and `tooltip`. It deliberately skips arbitrary string literals because of false-positive risk and offers fixes, rationale, and false-positive overrides through an API-backed language server. Source: [ContentRX on Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx).
- **[Sourced fact]** ContentRX also publishes a [CLI](https://pypi.org/project/contentrx-cli/) and [MCP package](https://pypi.org/project/contentrx-mcp/).
- **[Inference]** ContentRX validates demand for developer-native content critique and illustrates why source classification matters. Its public extension description does not establish full journey/state discovery, product modeling, or governed multi-system writes.

## Instruction and artifact conventions

### AGENTS.md

- **[Sourced fact]** AGENTS.md is plain Markdown with no mandatory schema, can be nested, and is documented as an instruction file for coding agents. Source: [AGENTS.md](https://agents.md/).
- **[Sourced fact]** A separate alpha project uses singular `AGENT.md` for a schema-validated agent profile. It is adjacent prior art, not evidence that `AGENT.md` and `AGENTS.md` are interchangeable. Source: [agentmd on PyPI](https://pypi.org/project/agentmd/).
- **[Inference]** It is a strong bridge and weak typed data model. A content system can integrate with it without trying to replace it.

### Google DESIGN.md

- **[Sourced fact]** Google DESIGN.md combines normative YAML design tokens with human-readable Markdown rationale and exposes lint, diff, and export commands. The project labels the format alpha. Source: [google-labs-code/design.md](https://github.com/google-labs-code/design.md).
- **[Inference]** It is the clearest formal analogy for a structured `.md` artifact plus executable tooling. It does not prove that agent hosts natively auto-load DESIGN.md.

### Agent Skills

- **[Sourced fact]** Agent Skills standardizes `SKILL.md` packages with metadata, instructions, and optional scripts/references/assets, using progressive disclosure. Source: [Agent Skills specification](https://agentskills.io/specification).
- **[Inference]** Skills are an adoption path for the workflow; they do not settle product-specific contract naming, persistence, precedence, or authority.

### DECISION.md is not one established analogue

- **[Sourced fact]** Spice 0.2.0 uses `.spice/decision/decision.md` for runtime objectives, weights, constraints, and trade-off rules, and explicitly says the file is not memory, a prompt dump, an execution runbook, or agent workflow. Source: [Spice runtime 0.2.0](https://pypi.org/project/spice-runtime/0.2.0/).
- **[Sourced fact]** [agent-spec-vault](https://pypi.org/project/agent-spec-vault/) is another project using decision-oriented Markdown for its own project records.
- **[Inference]** These are examples, not evidence of a canonical DECISION.md standard comparable to AGENTS.md. Any product requirement based on “decision.md behavior” must name the implementation and desired behaviors.

## The `content-md` web specification

- **[Sourced fact]** content-md calls itself a draft open specification for representing individual web resources as YAML frontmatter plus CommonMark/GitHub-Flavored Markdown for AI agents. It explicitly says it does not target coding agents and is different from AGENTS.md and Skills. Source: [content-md](https://contentmd.org/).
- **[Inference]** Its problem and payload differ, but the same spoken/written name creates search, package, documentation, and user-expectation collision.

## Product-copy and localization operations

### Frontitude

- **[Sourced fact]** Frontitude positions itself as a multilingual UX-content platform connecting design, localization, and development, with a copy library, Figma plugin, developer CLI, AI translation, writing assistance, review, and handoff. Source: [Frontitude](https://www.frontitude.com/).
- **[Inference]** It is relevant prior art for workflow and string operations. Public claims need hands-on testing before capability comparison.

### Lokalise and Phrase

- **[Sourced fact]** Lokalise and Phrase document Figma integrations intended to move design text, keys, screenshots/context, and translations between design and localization workflows. Sources: [Lokalise for Figma](https://docs.lokalise.com/en/articles/3732824-figma) and [Phrase Figma integration](https://phrase.com/integrations/figma/).
- **[Inference]** A content agent should integrate with established localization systems and standards rather than build a translation-management system as its first move.

### Contentful and headless CMSs

- **[Sourced fact]** Contentful's content model defines content types, fields, validations, entries, assets, and locales exposed through APIs. Source: [Contentful, Content modeling basics](https://www.contentful.com/developers/docs/concepts/data-model/).
- **[Inference]** CMSs solve structured storage and publication but do not automatically supply product-state understanding, content-design judgment, or repository agent behavior. A CMS may be the designated storage or publication system for particular fields; that designation does not by itself establish governing applicability, accountable ownership, or authorized approval.

## Linters and style infrastructure

### Vale

- **[Sourced fact]** Vale describes itself as a cross-platform prose linter focused on consistency against customizable style guidance rather than a general-purpose writing aid. It supports YAML styles, severity levels, contextual scopes, vocabularies, packages, and structured output. Sources: [Vale introduction](https://docs.vale.sh/), [Vale styles](https://vale.sh/docs/styles), and [Vale vocabularies](https://vale.sh/docs/keys/vocab).
- **[Inference]** Vale is strong infrastructure for deterministic, reviewable rules. It should be reused or interoperated with where appropriate rather than reimplementing every pattern check.

### textlint

- **[Sourced fact]** textlint parses text with AST-based plugins, loads independent rules at runtime, reports errors/warnings, and supports custom processors and fixable rules. Sources: [textlint getting started](https://textlint.org/docs/getting-started/) and [textlint plugins](https://textlint.org/docs/plugin/).
- **[Inference]** textlint is an extensible lint engine, not a product-content source graph or content-design method.

### alex and write-good

- **[Sourced fact]** alex is an open-source linter focused on insensitive or inconsiderate language and cautions that automated findings can be wrong and context matters. Source: [get-alex/alex](https://github.com/get-alex/alex).
- **[Sourced fact]** write-good describes itself as a “naive linter for English prose” and exposes heuristic suggestions such as passive voice and weasel-word findings. Source: [btford/write-good](https://github.com/btford/write-good).
- **[Inference]** These tools can supply bounded checks, but their findings must not be treated as authorship detection, universal clarity rules, or final editorial judgment.

## Standards and specifications to adopt or interoperate with

| Standard or specification | Formal status / access | Relevant role | Boundary |
|---|---|---|---|
| [Unicode MessageFormat 2](https://messageformat.unicode.org/) / [UTS #35 Part 9](https://www.unicode.org/reports/tr35/tr35-messageFormat.html) | Unicode Technical Standard; public specification | Dynamic localizable messages, selectors, formatting, markup | Do not silently migrate projects from existing runtime formats |
| [XLIFF 2.2](https://docs.oasis-open.org/xliff/xliff-core/v2.2/xliff-core-v2.2-part1.pdf) | OASIS Committee Specification, 13 March 2025; public | Translation interchange and unit metadata | Not automatically the canonical content or journey model |
| [BCP 47 / RFC 5646](https://www.rfc-editor.org/rfc/rfc5646) | IETF Best Current Practice / RFC; public | Language and locale tags | Tag alone does not encode all market/product policy |
| [ITS 2.0](https://www.w3.org/TR/its20/) | W3C Recommendation; public | Internationalization/localization metadata | Adoption varies by format and toolchain |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | W3C Recommendation; public | Accessible names, labels, instructions, errors, status, complete processes | Conformance needs rendered/manual evidence, not prose lint alone |
| [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) | W3C Recommendation; public | Programmatic roles, states, properties, names | Native semantics remain preferable where available |
| [ISO 24495-1:2023](https://www.iso.org/standard/78907.html) | Published ISO standard; metadata/abstract public, full text generally licensed/paywalled | Plain-language principles for primarily text-based documents | Not a complete product UX/content standard; this scan used metadata-only access |
| [Agent Skills](https://agentskills.io/specification) | Public ecosystem specification; host support varies | Portable on-demand workflows | Host activation and support still require conformance testing |

- **[Proposal]** The content system should preserve and validate these standards at their boundaries, link to native objects, and avoid creating a proprietary substitute without a demonstrated gap.

## Capability comparison

Legend: `yes` means explicitly documented for the category; `partial` means a bounded portion is documented; `no` means the reviewed system is not intended to provide it; `unknown` means this scan did not establish it. These values indicate evidence presence, not independently benchmarked performance. Vendor documentation remains vendor documentation even when marked `yes`.

| System | Repo-native artifact | Agent workflow | Code discovery/review | Design/localization handoff | IA/journey/state method | Evidence/control distinctions | Open/local-first core |
|---|---:|---:|---:|---:|---:|---:|---:|
| AGENTS.md | yes | no | no | no | no | no | yes |
| Google DESIGN.md | yes | partial | partial | partial | no | partial | yes |
| GitCMS CONTENT.md | yes | partial | no | partial | no | no | partial |
| VOICE.md | yes | partial | partial | partial | partial | partial | yes |
| UX Writing Skill | partial | yes | partial | partial | partial | partial | yes |
| ContentRX | partial | partial | yes | unknown | unknown | partial | unknown |
| Ditto | yes | yes | yes | yes | partial | partial | unknown |
| Frontitude | partial | partial | partial | yes | unknown | partial | no |
| Vale/textlint | yes | no | partial | no | no | partial | yes |

- **[Inference]** No credible positioning follows from this table until the ambiguous cells are tested. In particular, Ditto may already satisfy more of the intended scope than public summary pages reveal.

## Naming and package collision

### Confirmed collisions

1. **`CONTENT.md`** — GitCMS already documents this exact file as an editorial instruction artifact.
2. **`content-md`** — an active draft web-content representation specification uses the same spoken name and a CLI.
3. **`VOICE.md`** — a nearby structured brand-language format occupies part of the conceptual territory.
4. **“content”** — a generic term shared by CMS, documentation, marketing, media, web payloads, and product copy; it is difficult to search and easy to misunderstand.

### Command-name risk

- **[Sourced fact]** Google DESIGN.md documents that its dot-suffixed command can collide with Windows Markdown file associations and provides the `designmd` alias. Source: [DESIGN.md CLI reference](https://github.com/google-labs-code/design.md#cli-reference).
- **[Inference]** A primary CLI command ending in `.md` repeats a known portability problem. Case variants such as `content.md` and `CONTENT.md` can also collide on case-insensitive file systems.
- **[Proposal]** If CONTENT.md remains the installed contract name, give the project, package, and CLI a distinctive dot-free name. Treat the filename as an implementation detail, not the whole brand.

### Clearance still required

- public npm, PyPI, Homebrew, Cargo, GitHub, package-manager, and container registries;
- domains and major social handles;
- relevant trademarks and company/product names by launch jurisdictions;
- similar names in CMS, localization, design systems, developer tools, and AI agents;
- pronunciation, spelling, accessibility, and international-language checks.

- **[Open question]** This research does not establish package, domain, or trademark availability. A corporate npm registry result cannot clear the public npm namespace.

## Differentiation hypotheses to test

These are product hypotheses, not claims of an empty market.

1. **Open repository contract plus portable skill.** Product-specific rules and decisions remain inspectable and versioned without requiring one hosted copy database.
2. **Evidence and control distinctions first.** The system separates evidence sources, governing instruments, accountable owners, approvers, capability grants, implementation, release, and evaluation while preserving conflicts rather than selecting a convenient source.
3. **Whole-experience coverage.** It models IA, journeys, states, accessible representations, lifecycle communication, and non-UI channels—not only component strings.
4. **Greenfield and takeover.** It can establish a system early or reconstruct an existing product without bulk rewriting before understanding it.
5. **Safe multi-source implementation.** It links exact code/resource/design/CMS targets, uses expected-current guards, and verifies round trips and rendered states.
6. **Evaluation as a first-class product.** It ships extraction benchmarks, contextual rubrics, user-research methods, regression tests, uncertainty, and escalation—not only suggestions.
7. **Provider and host neutrality.** Native adapters are tested per host and do not pretend one filename is universally discovered.

- **[Proposal]** Test every hypothesis against Ditto, Frontitude, VOICE.md, UX Writing Skill, ContentRX, and combinations of open tools. The product must be meaningfully better than assembling existing parts for its chosen first user and job.

## Build, adopt, integrate, or defer

| Capability | Initial direction | Reason |
|---|---|---|
| Host instructions | Integrate | Native conventions already exist and differ |
| Agent workflow packaging | Adopt Agent Skills plus adapters | Open packaging exists |
| Prose/terminology lint engine | Integrate or emit Vale/textlint rules | Mature extensible engines exist |
| Runtime localization syntax | Preserve project format; support MF2 | Runtime adoption cannot be imposed safely |
| Translation interchange | Support XLIFF | Established interchange standard |
| TMS/CMS/design storage | Connect | Rebuilding all systems obscures the content-design wedge |
| Evidence/control/content graph | Investigate building | Potential core gap, but compare Ditto first |
| State/journey/IA workflow | Investigate building | Potential differentiation requiring practitioner and user research |
| Text-only AI detector | Do not build as authorship proof | Reliability and attribution limitations |
| Evaluation harness | Build openly | Needed to substantiate every capability claim |

## Immediate competitive research

1. Install/evaluate Ditto agent setup and Specs in a disposable fixture repository; document permissions, generated files, network dependencies, and actual extraction coverage.
2. Exercise VOICE.md lint/diff/export against realistic UI content and locale/state constraints.
3. Run ContentRX on annotated JSX/TSX fixtures and measure documented detection boundaries.
4. Compare the UX Writing Skill workflow against the proposed practitioner workflow and evidence/control and decision-rights model.
5. Test Vale/textlint as the deterministic rule engine instead of designing a new one prematurely.
6. Interview content designers who use Ditto, Frontitude, a TMS, Figma, and code workflows; distinguish product limitations from adoption/process limitations.
7. Perform formal public-name and package clearance only after the product wedge is explicit.

## Gaps

- **[Open question]** What are Ditto's current commercial, security, data-retention, export, and self-hosting boundaries?
- **[Open question]** Are Ditto Specs' framework and surface-discovery claims reproducible across the proposed fixture corpus?
- **[Open question]** Which current products support content IA and multi-channel journey decisions, not just string governance?
- **[Open question]** Which open-source components can form a credible local-first stack without creating an unmaintainable integration bundle?
- **[Open question]** What first user segment has a painful, frequent job that these products do not already solve well?
