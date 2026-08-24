---
title: Systems, surfaces, standards, landscape, and evaluation source notes
status: working-source-log
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
retrieved: 2026-08-17
---

# Systems, surfaces, standards, landscape, and evaluation source notes

## How to read this log

All sources were accessed on 2026-08-17 unless a source-specific date is stated. “Primary” means a standards body, official project repository, official host documentation, platform documentation, or original research paper. It does not mean every claim has been independently reproduced.

Source types and evidentiary roles used in this log:

- **Normative standard:** defines conformance requirements within a stated scope.
- **Official implementation documentation:** establishes what a project or host currently documents; behavior can still vary by version or surface.
- **Vendor documentation:** establishes vendor-described product behavior, not independent performance or outcome evidence.
- **Original research:** establishes the study's methods/findings within its sample and limitations.
- **Practitioner guidance/case:** useful method evidence, not universal law.

**[Inference]** and **[Proposal]** are canonical synthesis claim labels, not source types; they are never attributed to a source as fact. Other canonical claim labels follow the [research protocol](../00-method/research-protocol.md).

- **[Sourced fact]** Each “Current observation” below records what the linked source states or exposes as of the retrieval date; vendor observations remain vendor-documented rather than independently verified.
- **[Inference]** Notes under “Supports” describe how that evidence may inform this project and do not expand the source's claim.
- **[Proposal]** Recheck host, product, package, and standards sources before turning this working log into a specification because these surfaces can change.

## Agent instruction discovery and packaging

### SYS-001 — AGENTS.md

- URLs:
  - https://agents.md/
  - https://pypi.org/project/agentmd/
- Type: official convention site plus package-registry record for adjacent singular-name prior art.
- Current observation: plural `AGENTS.md` is plain Markdown with no required schema, supports root and nested files, describes closest-file precedence, and says explicit prompt instructions override file guidance. Singular `AGENT.md` is also used by a separate alpha schema-oriented project and is not assumed to be an alias.
- Supports: treating AGENTS.md as a common repository bridge.
- Limitation: the AGENTS.md ecosystem/support list does not prove identical discovery, precedence, or feature behavior across hosts; the singular project's own maturity and compatibility claims also require testing.

### SYS-002 — OpenAI Codex AGENTS.md discovery

- URL: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Type: official host documentation.
- Current observation: global `AGENTS.override.md`/`AGENTS.md`, then project root-to-current-directory chain; at most one file per directory; nearer files occur later; default combined limit 32 KiB; configurable fallback filenames.
- Supports: precise Codex adapter and conformance tests.
- Limitation: a custom fallback such as `CONTENT.md` is not an additive include when a higher-priority recognized file exists in the same directory; sessions must be restarted/reloaded as documented.

### SYS-003 — Claude Code project memory

- URL: https://code.claude.com/docs/en/memory
- Type: official host documentation.
- Current observation: `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, user/managed memory, and `.claude/rules`; ancestor and descendant loading differs; imports are supported. The documentation distinguishes context from guaranteed enforcement and points to hooks for deterministic actions.
- Supports: a CLAUDE.md import/bridge and separate deterministic validation.
- Limitation: does not make raw `CONTENT.md` or `AGENTS.md` universally native to Claude Code.

### SYS-004 — Gemini CLI context files

- URLs:
  - https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
  - https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md
- Type: official host documentation/source repository.
- Current observation: hierarchical `GEMINI.md` context, global/root/ancestor/subdirectory behavior, memory diagnostics, and configurable context filenames.
- Supports: configurable CONTENT.md inclusion or a GEMINI.md bridge.
- Limitation: configuration and discovery boundaries must be tested by version.

### SYS-005 — Cursor rules and CLI

- URLs:
  - https://cursor.com/docs/rules
  - https://docs.cursor.com/en/cli/using
- Type: official host documentation.
- Current observation: Cursor rules support `.cursor/rules`, user and team rules, and `AGENTS.md` at the project root or in subdirectories. Nested `AGENTS.md` files apply to their directory and children; parent and nested instructions combine, with more-specific instructions taking precedence. Cursor CLI separately documents root `AGENTS.md` and `CLAUDE.md` alongside rules.
- Supports: scoped AGENTS bridges plus separate IDE/CLI adapters and tests.
- Limitation: the rules page says these rules are for Agent (Chat) and do not affect every Cursor feature, so installation still needs surface-specific verification.

### SYS-006 — VS Code and GitHub Copilot instructions

- URLs:
  - https://code.visualstudio.com/docs/agent-customization/custom-instructions
  - https://docs.github.com/en/copilot/concepts/prompting/response-customization
  - https://docs.github.com/en/copilot/reference/customization-cheat-sheet
- Type: official host documentation.
- Current observation: repository-wide, path-specific, agent, personal, and organization instructions; VS Code supports AGENTS.md and CLAUDE.md with settings and diagnostics; nested AGENTS support is experimental; GitHub documents precedence and varying surface support.
- Supports: native adapters and diagnostics-based verification.
- Limitation: “Copilot support” must be qualified by product surface and version.

### SYS-007 — Agent Skills specification

- URL: https://agentskills.io/specification
- Type: open specification site.
- Current observation: required `SKILL.md`, required name/description metadata, optional scripts/references/assets, and progressive disclosure from metadata to instructions to resources.
- Supports: portable workflow packaging.
- Limitation: does not itself define repository truth, host precedence, activation reliability, or content-design semantics.

### SYS-008 — Google DESIGN.md

- URL: https://github.com/google-labs-code/design.md
- Type: official project repository.
- Current observation: YAML tokens plus Markdown rationale; normative token layer; lint/diff/export commands; JSON and exit codes; DTCG export; alpha status. Its CLI reference documents a Windows collision for the `.md` command and a `designmd` alias.
- Supports: structured artifact plus executable tooling pattern and dot-suffixed CLI naming warning.
- Limitation: does not demonstrate universal automatic DESIGN.md loading by agent hosts.

### SYS-009 — DECISION.md examples

- URLs:
  - https://pypi.org/project/spice-runtime/0.2.0/
  - https://pypi.org/project/agent-spec-vault/
- Type: package/project documentation.
- Current observation: Spice 0.2.0 uses `.spice/decision/decision.md` for objectives, weights, constraints, and trade-off rules and explicitly excludes memory, prompt dump, runbook, and workflow semantics. Agent Spec Vault uses decision-oriented notes for its own project contract.
- Supports: documenting ambiguity.
- Limitation: no evidence here establishes a canonical DECISION.md standard comparable to AGENTS.md.

## Source-code and localization extraction

### SYS-010 — FormatJS CLI

- URL: https://formatjs.github.io/docs/tooling/cli/
- Type: official project documentation.
- Current observation: AST-aware extraction for documented JavaScript-family and related sources; recognized APIs/components; custom wrapper configuration; source-location output; verification; pseudo-locales.
- Supports: adapter registry, structural validation, source coordinates, pseudo-localization.
- Limitation: custom abstractions and runtime-generated text require additional configuration/evidence.

### SYS-011 — Android string resources

- URL: https://developer.android.com/guide/topics/resources/string-resource
- Type: official platform documentation.
- Current observation: XML strings, formatting arguments, styled text, string arrays, and plural resources; plural selection categories vary by language.
- Supports: native resource parser and branch preservation.
- Limitation: resource presence does not prove runtime reachability or rendered correctness.

### SYS-012 — Apple localization

- URL: https://developer.apple.com/localization/
- Type: official platform documentation.
- Current observation: String Catalog discovery/tracking, plurals/device variations, translator comments, export, layout testing, and right-to-left considerations.
- Supports: Xcode-native extraction and visual verification.
- Limitation: project/build configuration and platform versions affect behavior.

### SYS-013 — GNU gettext

- URL: https://www.gnu.org/software/gettext/manual/
- Type: official project manual.
- Current observation: `xgettext` extraction of marked strings into catalogs with source references/comments.
- Supports: gettext adapter and translator-context preservation.
- Limitation: call-site conventions and custom wrappers determine extraction coverage.

## Design, CMS, and localization handoff

### SYS-014 — Figma REST API and node model

- URLs:
  - https://developers.figma.com/docs/rest-api/
  - https://developers.figma.com/docs/rest-api/file-node-types/
- Type: official platform documentation.
- Current observation: file/node JSON, comments, versions, variables, webhooks; text `characters`; node hierarchy/visibility; canvas flow-start metadata.
- Supports: evidence-linked design extraction.
- Limitation: raw node text does not prove that a node is visible, current, reachable, or product-facing.

### SYS-015 — Figma text writes and variables

- URLs:
  - https://developers.figma.com/docs/plugins/api/properties/TextNode-characters/
  - https://developers.figma.com/docs/rest-api/variables-endpoints/
- Type: official platform documentation.
- Current observation: text assignment requires fonts and can reset range styles; variables can carry strings, with access, scope, plan, and endpoint constraints.
- Supports: guarded writes and explicit capability checks.
- Limitation: successful API mutation is not proof of correct layout, variant, prototype, or live implementation.

### SYS-016 — Contentful content model

- URL: https://www.contentful.com/developers/docs/concepts/data-model/
- Type: official vendor documentation.
- Current observation: content types, typed fields, validations, entries, assets, and locales.
- Supports: structured CMS connector and field-level authority mapping.
- Limitation: one CMS example; it does not define a universal CMS schema or product-content workflow.

### SYS-017 — Lokalise Figma workflow

- URLs:
  - https://docs.lokalise.com/en/articles/3732824-figma
  - https://lokalise.com/product/apps/design-tools/figma/
- Type: official vendor documentation.
- Current observation: design-text/key/translation exchange and screenshot context; documentation includes import/export and language-selection cautions.
- Supports: design/localization handoff and overwrite-risk analysis.
- Limitation: capabilities and commercial access were not independently tested.

### SYS-018 — Phrase Figma integration

- URL: https://phrase.com/integrations/figma/
- Type: official vendor documentation.
- Current observation: design/localization integration claims.
- Supports: market evidence for design-to-localization workflows.
- Limitation: public claims were not independently tested.

## Runtime, interchange, locale, and accessibility standards

### SYS-019 — Unicode MessageFormat 2

- URLs:
  - https://messageformat.unicode.org/
  - https://www.unicode.org/reports/tr35/tr35-messageFormat.html
- Type: Unicode standard and official overview.
- Current observation: UTS #35 Part 9, referenced version 48.2; data model, syntax, processing, conformance, variables, selectors, formatting, markup, and custom functions; successor to ICU MessageFormat; MF2 syntax is not backward-compatible with MF1.
- Supports: localizable dynamic-message capability model.
- Limitation: a repository needs runtime/tool support before adopting or migrating syntax.

### SYS-020 — XLIFF 2.2

- URLs:
  - https://docs.oasis-open.org/xliff/xliff-core/v2.2/xliff-core-v2.2-part1.pdf
  - https://docs.oasis-open.org/xliff/xliff-core/v2.2/xliff-extended-v2.2-part2.pdf
- Type: OASIS Committee Specification.
- Current observation: published 13 March 2025; translation interchange among defined agents; extended modules include plural/gender/select; valid 2.0/2.1 documents remain valid 2.2 documents.
- Supports: standardized translation handoff.
- Limitation: interchange does not establish product-content authority or user-journey semantics.

### SYS-021 — BCP 47 language tags

- URL: https://www.rfc-editor.org/rfc/rfc5646
- Type: IETF Best Current Practice/RFC.
- Current observation: syntax and use of language tags.
- Supports: full locale/language identifiers.
- Limitation: a tag does not encode all market, legal, audience, or fallback rules.

### SYS-022 — ITS 2.0

- URL: https://www.w3.org/TR/its20/
- Type: W3C Recommendation.
- Current observation: internationalization/localization metadata categories including translation and terminology-related metadata.
- Supports: interoperability vocabulary and preservation of localization metadata.
- Limitation: adoption and mapping vary by source format/toolchain.

### SYS-023 — WCAG 2.2

- URL: https://www.w3.org/TR/WCAG22/
- Type: W3C Recommendation.
- Current observation used: headings/labels; error identification, instructions, suggestions, and prevention; consistent identification; programmatic name/role/value; status messages; complete pages/processes; reading-level criterion at AAA.
- Supports: accessible content requirements and complete-process evaluation.
- Limitation: conformance cannot be reduced to a copy linter or static text scan.

### SYS-024 — WAI-ARIA and accessible names

- URLs:
  - https://www.w3.org/TR/wai-aria-1.2/
  - https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- Type: W3C Recommendation plus WAI authoring guidance.
- Current observation: roles, states, properties, accessible names/descriptions, status/live-region behavior; guidance prefers visible text as a name source when appropriate.
- Supports: inventory of non-visible content and visible/accessible-name drift checks.
- Limitation: ARIA does not replace native semantics or assistive-technology testing.

### SYS-025 — W3C cognitive accessibility guidance

- URL: https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/
- Type: W3C Working Group Note/supplemental guidance.
- Current observation: recommendations for clear words, direct sentences, unambiguous content, and chunking.
- Supports: contextual clarity rubric.
- Limitation: supplemental guidance is not a WCAG success criterion or universal mechanical gate.

### SYS-026 — ISO plain language

- URL: https://www.iso.org/standard/78907.html
- Type: ISO standard abstract/catalog record.
- Current observation: ISO 24495-1:2023 provides principles/guidelines for plain-language documents across written languages and states intentional scope limits.
- Supports: plain-language reference.
- Limitation: full standard text was not available in this public source; it does not cover all communication types or replace accessibility guidance.

## Evaluation and research methods

### SYS-027 — ISO usability

- URL: https://www.iso.org/standard/63500.html
- Type: ISO standard abstract/catalog record.
- Current observation: ISO 9241-11:2018 frames usability through effectiveness, efficiency, satisfaction for specified users, goals, and context.
- Supports: outcome/context-based evaluation model.
- Limitation: catalog/abstract access; the standard does not prescribe one universal method.

### SYS-028 — NIST usability testing

- URL: https://www.nist.gov/programs-projects/usability-testing
- Type: US government practitioner guidance.
- Current observation: representative users and tasks; quantitative completion/time/errors plus qualitative feedback.
- Supports: mixed-method user evaluation.
- Limitation: general guidance, not a content-agent benchmark specification.

### SYS-029 — GOV.UK service and accessibility testing

- URLs:
  - https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use
  - https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing
  - https://www.gov.uk/service-manual/measuring-success/usability-benchmarking-a-website-or-whole-service
  - https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility
- Type: government service guidance.
- Current observation: test online/offline interaction parts; representative users and realistic tasks; repeatable usability benchmarks; automated and manual accessibility testing both needed.
- Supports: multi-channel, task-based, mixed-method evaluation.
- Limitation: public-service context; transfer to other domains needs judgment.

### SYS-030 — Nielsen Norman Group content methods

- URLs:
  - https://www.nngroup.com/articles/testing-content-websites/
  - https://www.nngroup.com/articles/cloze-test-reading-comprehension/
- Type: practitioner guidance.
- Current observation: representative-user content testing, paraphrase/comprehension questions, contextual tone assessment, and cloze as comprehension rather than readability.
- Supports: method menu.
- Limitation: practitioner thresholds are not universal standards and need audience/task calibration.

### SYS-031 — DfE card-sort case

- URL: https://design-histories.education.gov.uk/deliver-good-services/using-a-card-sort-to-understand-how-users-group-information
- Type: government design-history case.
- Current observation: open card sorting used to form an information-architecture hypothesis, followed by planned tree testing.
- Supports: separating generative IA research from validation.
- Limitation: one case, not general causal evidence.

## AI-authorship detection

### SYS-032 — OpenAI classifier withdrawal

- URL: https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/
- Type: first-party evaluation/retirement notice.
- Current observation: classifier withdrawn on 20 July 2023 for low accuracy; published challenge-set figures were 26% true-positive identification of AI-written text and 9% false-positive labeling of human-written text.
- Supports: prohibition on treating a text-only score as authorship proof.
- Limitation: one retired classifier and one evaluation set; not a theorem that all provenance methods are impossible.

### SYS-033 — Detector robustness research

- URL: https://arxiv.org/abs/2303.11156
- Type: original academic preprint; Sadasivan et al., “Can AI-Generated Text be Reliably Detected?”
- Current observation: stress tests across detector classes; recursive paraphrasing reduced detection rates with limited quality degradation; spoofing risks were demonstrated; theoretical limits are discussed.
- Supports: authorship-attribution caution and adversarial benchmark design.
- Limitation: a 2023 preprint and its tested models/settings; future authenticated provenance or watermark systems require separate evaluation.

## Direct prior art and current products

### SYS-034 — GitCMS CONTENT.md

- URL: https://gitcms.dev/docs/ai-mcp/content-instructions/
- Type: official vendor/project documentation.
- Current observation: exact `CONTENT.md` filename; site-wide writing instructions covering audience, tone, reading level, terms, formatting, examples, and do/don't guidance; explicitly excludes repository configuration and temporary/per-article tasks.
- Supports: exact-name collision and narrow editorial-instruction precedent.
- Limitation: GitCMS-specific flow; not the proposed whole-product content workflow.

### SYS-035 — content-md

- URL: https://contentmd.org/
- Type: draft open specification site.
- Current observation: YAML frontmatter plus Markdown representation of individual web resources for AI agents; explicitly distinct from AGENTS.md and Skills and not aimed at coding-agent instructions.
- Supports: spoken/name/search collision.
- Limitation: different problem and delivery context.

### SYS-036 — VOICE.md

- URL: https://github.com/efeoncepro/voice.md
- Type: official project repository.
- Current observation: structured brand language and surface constraints; lint, lint-string, diff, and export; status alpha.
- Supports: close precedent for voice, terminology, surface rules, and CI.
- Limitation: does not by itself establish complete discovery, IA/journey work, authority resolution, or user evaluation.

### SYS-037 — UX Writing Skill

- URL: https://github.com/content-designer/ux-writing-skill
- Type: maintainer repository.
- Current observation: Agent Skill packaging for systematic UX-writing guidance; maintainer documents Claude/Codex use.
- Supports: evidence of portable UX-writing workflows.
- Limitation: support claims and output quality were not independently benchmarked.

### SYS-038 — ContentRX

- URLs:
  - https://marketplace.visualstudio.com/items?itemName=ContentRX.contentrx
  - https://pypi.org/project/contentrx-cli/
  - https://pypi.org/project/contentrx-mcp/
- Type: vendor marketplace/package documentation.
- Current observation: inline JS/TS-family copy diagnostics for text children and known attributes; arbitrary literals skipped to avoid false positives; API-backed fixes/rationale/overrides; CLI and MCP packages.
- Supports: developer-native content-review demand and bounded extraction precedent.
- Limitation: not independently benchmarked; public documentation does not establish a complete content-design system.

### SYS-039 — Ditto product and developer platform

- URLs:
  - https://www.dittowords.com/
  - https://developer.dittowords.com/introduction
  - https://developer.dittowords.com/agent-setup-package/overview
  - https://developer.dittowords.com/ditto-specs-cli-reference/overview
  - https://developer.dittowords.com/ditto-specs-cli-reference/spec-files
  - https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills
  - https://developer.dittowords.com/additional-tools/github-pr-review-bot
- Type: official vendor documentation.
- Current observation: closest direct overlap found. Vendor documents product-text storage/keys/variants/localization, Figma and developer integrations, MCP, PR review, agent setup, always-on instructions, audit/review skills, and alpha repository-local `.ditto.md` component specifications.
- Supports: competitive baseline and requirement for hands-on comparison.
- Limitation: outcome, coverage, access, security, offline operation, framework support, and commercial claims were not independently verified. Specs are explicitly alpha.

### SYS-040 — Frontitude

- URL: https://www.frontitude.com/
- Type: official vendor documentation.
- Current observation: multilingual UX-content system with copy library, Figma, developer CLI, AI translation/writing, workflow, and handoff claims.
- Supports: product-copy/localization operations landscape.
- Limitation: capabilities and outcomes not independently tested.

### SYS-041 — Vale

- URLs:
  - https://docs.vale.sh/
  - https://vale.sh/docs/styles
  - https://vale.sh/docs/keys/vocab
- Type: official project documentation.
- Current observation: cross-platform prose linting, YAML rules, scopes, severity, vocabularies, and packages; explicitly not a general writing aid.
- Supports: reusable deterministic lint infrastructure.
- Limitation: pattern/style consistency does not establish product behavior, user comprehension, or authorship.

### SYS-042 — textlint

- URLs:
  - https://textlint.org/docs/getting-started/
  - https://textlint.org/docs/plugin/
- Type: official project documentation.
- Current observation: AST parsing, runtime rules, processors/plugins, warnings/errors, custom and fixable rules.
- Supports: alternative/extensible lint infrastructure.
- Limitation: not a source-authority, experience-state, or decision system.

### SYS-043 — alex

- URL: https://github.com/get-alex/alex
- Type: official project repository.
- Current observation: insensitive/inconsiderate-language linter with contextual limitations acknowledged by maintainers.
- Supports: bounded inclusive-language checks.
- Limitation: false positives/context make human review necessary.

### SYS-044 — write-good

- URL: https://github.com/btford/write-good
- Type: official project repository.
- Current observation: maintainer describes it as a naive English prose linter with heuristic rules and configurable checks.
- Supports: example of lightweight linting.
- Limitation: English-centric heuristics are not universal content-quality criteria.

## Source gaps and next verification

- **[Open question]** Hands-on tests are still required for Ditto, ContentRX, VOICE.md, UX Writing Skill, Frontitude, and host adapters.
- **[Open question]** Public package/domain/trademark clearance has not been completed; the current workspace's corporate registry cannot establish public npm availability.
- **[Open question]** Some ISO content is paywalled; only public abstracts/catalog records were used.
- **[Open question]** Host documentation changes quickly. The compatibility matrix needs version-pinned automated checks, not a static claim.
- **[Open question]** No source found in this pass establishes a canonical DECISION.md convention.
