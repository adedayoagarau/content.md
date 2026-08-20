---
title: Repository and agent integration architecture
status: working-synthesis
started: 2026-08-17
updated: 2026-08-18
evidence_cutoff: 2026-08-17
---

# Repository and agent integration architecture

## Evidence boundary

This document separates documented host behavior from a proposed architecture. Agent instruction discovery is not one interoperable protocol, and a Markdown filename does not create runtime behavior by itself.

- **[Sourced fact]** The AGENTS.md project defines a plain Markdown convention with root and nested files; the closest file in the directory tree takes precedence, and explicit user instructions override file instructions. Source: [AGENTS.md](https://agents.md/).
- **[Sourced fact]** Codex, Claude Code, Gemini CLI, Cursor, VS Code, and GitHub Copilot document different default instruction files, search paths, scopes, precedence, and diagnostics. Sources are linked in the host matrix below.
- **[Inference]** “Works with every native `.md` agent” cannot responsibly mean “drop one CONTENT.md file in the root.” It must mean the installer creates and verifies a minimal adapter for each explicitly supported host.
- **[Proposal]** Treat the content contract, the task workflow, host adapters, source connectors, validators, and decision history as separate layers.

## Proposed system boundary

The repository-native system needs seven cooperating parts.

```text
native host instructions ──┐
agent skill/workflow ──────┼──> content orchestrator
CONTENT contract ──────────┘          │
                                      ├── source/design/CMS/runtime adapters
                                      ├── normalized content graph
                                      ├── deterministic validators and evals
                                      ├── governed change plans and patches
                                      └── decision and verification records
```

| Layer | Responsibility | Should not be confused with |
|---|---|---|
| Repository contract | Product language, evidence/control routing, decision rights, constraints, terms, content model, risk boundaries | A one-off prompt or full inventory dump |
| Agent skill | Discover, research, design, review, implement, verify, and escalate | Automatically loaded repository truth |
| Host adapter | Make the contract and skill discoverable in that agent's native mechanism | A universal standard |
| Connectors | Read evidence from code, runtime, design, CMS, localization, research, and policies | Permission to overwrite those systems or approve their meaning |
| Normalized graph | Link messages, states, surfaces, terms, sources, decisions, and implementations | A new canonical copy store by default |
| Validation/evaluation | Deterministic checks, model critique, human review, user testing, outcome measurement | One “quality score” |
| Decision memory | Preserve rationale, orthogonal evidence dimensions, decision state, accountable owner, approvals, delivery links, evaluation records, and supersession | Hidden model memory or current truth without verification |

- **[Proposal]** Installation should be reversible, diff-first, and non-destructive. It should detect existing instructions and offer a merge/bridge rather than overwrite them.
- **[Proposal]** “Take over content” should mean owning the content-design workflow within granted scope, while preserving product, engineering, legal, accessibility, localization, and business approval boundaries.

## What agents actually discover

### Host behavior matrix as of the evidence cutoff

| Host | Documented automatic sources | Scope and precedence behavior | CONTENT.md implication |
|---|---|---|---|
| Codex | Global and project `AGENTS.override.md` / `AGENTS.md`; configured fallback names | Builds a chain from project root to current directory; closer instructions appear later; one instruction file per directory; default combined limit 32 KiB | Can configure `CONTENT.md` as a fallback, but an existing `AGENTS.md` in the same directory can prevent that fallback from loading. Prefer an AGENTS bridge plus a skill. |
| Claude Code | `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, managed/user memory, `.claude/rules` | Ancestor files load at launch; descendant files load when Claude reads files there; imports are supported | Import `@CONTENT.md` from `CLAUDE.md` or use a symlink/managed rule. Do not assume AGENTS.md or CONTENT.md is native. |
| Gemini CLI | Global, root, ancestor, and subdirectory context files; default `GEMINI.md` | Concatenates hierarchical context; configurable `context.fileName` can contain several names; `/memory show` and refresh provide diagnostics | Installer may add CONTENT.md to configured names or add a pointer in GEMINI.md, then verify loaded context. |
| Cursor IDE | `.cursor/rules`, user and team rules, and `AGENTS.md` at the project root or in subdirectories; legacy `.cursorrules` | Nested `AGENTS.md` applies to files in that directory and its children; parent and nested instructions combine, with the more specific instructions taking precedence | Add an AGENTS bridge at the appropriate scope or a scoped Cursor rule, then verify it in Agent because these rules do not govern every Cursor feature. |
| Cursor CLI | `.cursor/rules`, root `AGENTS.md`, root `CLAUDE.md` | Applies them together; CLI supports non-interactive JSON/text output | Use a native root bridge and test the CLI separately from the IDE. |
| VS Code Copilot | `.github/copilot-instructions.md`, AGENTS.md, CLAUDE.md, conditional `.instructions.md`, user/org sources | Multiple sources can be combined; nested AGENTS is experimental; personal instructions outrank repository and organization instructions | Prefer repository-wide bridge plus optional path-scoped `.instructions.md`; use customization diagnostics to verify. |
| GitHub Copilot on GitHub | Repository-wide, path-specific, agent instructions, skills, custom agents | Support varies by Copilot feature; path-specific instructions precede repository-wide, then agent instructions; PR review reads the head branch | Ship a documented supported-surface matrix and test each promised Copilot surface, not “Copilot” as one behavior. |

Sources:

- [OpenAI, Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [Gemini CLI, Provide context with GEMINI.md files](https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html)
- [Gemini CLI configuration](https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md)
- [Cursor, Rules](https://cursor.com/docs/rules)
- [Cursor, Using Agent in CLI](https://docs.cursor.com/en/cli/using)
- [VS Code, Use custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions)
- [GitHub, About customizing Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization)
- [GitHub, Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

### Consequences for the installer

- **[Sourced fact]** Codex supports `project_doc_fallback_filenames`, but stops after finding one instruction file in a directory. A custom fallback is therefore not an additive include mechanism. Source: [OpenAI, Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
- **[Sourced fact]** Claude's documentation says `CLAUDE.md` provides context, not guaranteed enforcement; it recommends hooks for actions that must happen deterministically. Source: [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory).
- **[Inference]** A self-description such as “I support AGENTS.md” is weaker evidence than a documented path plus a reproducible load trace on the current version.
- **[Proposal]** Maintain a versioned compatibility manifest with host, version range, installed adapter, expected loaded marker, test command, observed result, and date.
- **[Proposal]** Installation is a local mutation, including creating or removing a test marker. Run report-only, static read-only local discovery first under P0-A and a scoped read grant. Then use a separately constructed, task-specific installer/local-write capability profile governed by P0-D, an exact task grant, and mutation/change approval for the repository file targets, operations, base revision/current values, environment, purpose, preview, rollback, and readback. This profile grants no package installation, process execution, network access, credential action, or connector write. A new host/process profile first uses the separately authorized `verify.candidate` route to generate P0-G evidence; independent gate authority alone issues the exact result, and operational host/process verification then requires current P0-G plus a separate exact runtime grant. Any future installer needing package installation or another capability requires a separately defined applicable gate and grant.

### Discovery conformance harness

For each supported host:

1. In a disposable fixture repository where possible, complete a report-only static P0-A scan under a task-specific read grant and show the exact planned marker and bridge changes. Do not start the host, a shell, a browser, or any repository process under P0-A.
2. Record a passing P0-D result and construct a separate installer/local-write grant and mutation/change approval bound to the fixture or enrolled repository, exact marker/bridge paths, operations, base revision/current values, environment, purpose, and expiry.
3. Install a unique, harmless rule marker and an instruction that points to the repository contract; immediately read back the exact changes.
4. Before the first operational claim for a new host-adapter artifact/profile, obtain an authenticated, expiring and revocable verification-candidate authorization plus a separate exact candidate-test grant. Bind the exact candidate/toolchain/build-recipe/artifact digests, gates under test, immutable host-conformance plan, fixture and executor profile, synthetic data, exact tools/actions and filesystem/network/process/credential bounds, evidence sink/schema/retention, resources, cancellation/cleanup, expiry/revocation and independent evaluator.
5. Run the disposable isolated `verify.candidate` test against the exact candidate and preserve the planned/actual trace, captures, evidence-sink receipt/digest, deviations, incidents and cleanup. Candidate output is gate evidence only: it cannot issue P0-A/P0-G results, enter the support matrix, or contribute to product/comparative scores.
6. Have gate authority independent of the implementation author and candidate runtime issue `pass` or `blocked` for the exact artifact/profile. Changed candidate, recipe, toolchain, plan, fixture, executor, evidence contract or bound permission invalidates reuse.
7. Only after the applicable exact P0-A and P0-G results are current, construct a separate operational runtime task grant before starting or attaching to a fresh host session at the project root and at a nested path; bind it to the host executable/tool, immutable arguments or actions, repository/environment, filesystem/network/data/credential boundary, expiry, cancellation, and cleanup.
8. Ask the agent to report the marker, applicable content rules, and their source paths without editing; if this invokes a model or sends fixture content outside the local runtime, also require P0-B and a separate exact model-egress task grant.
9. Where the host provides diagnostics, inspect the loaded-instruction trace rather than relying only on the model's answer.
10. Test conflicting root, nested, user, and explicit prompt instructions.
11. Record pass, fail, partial, unsupported, and unverified by host version and surface, keeping candidate-evidence and operational-run denominators separate.
12. Under the same still-valid exact P0-D-governed removal grant and mutation/change approval, or newly issued replacements bound to the exact removal diff and current values, remove only the temporary marker/installer-owned bridge, read back the result, and confirm the uninstall path.

- **[Proposal]** No host enters the supported matrix until independent gate authority has issued the current exact P0 results and a separately granted operational confirmation has passed. A candidate test or marketing-site compatibility list is evidence input, not a supported-profile claim.

## AGENTS.md, DESIGN.md, skills, and the content layer

### AGENTS.md

- **[Sourced fact]** AGENTS.md has no mandatory fields and is designed as an instruction README for coding agents. Source: [AGENTS.md](https://agents.md/).
- **[Sourced fact]** Singular `AGENT.md` is also used by a separate alpha, schema-oriented project. It is not the same convention and is not treated as an alias in this research. Source: [agentmd on PyPI](https://pypi.org/project/agentmd/).
- **[Inference]** AGENTS.md is the best current common bridge, but it should contain a short routing contract, not the entire content system. Long content guidance competes with engineering instructions and host context limits.

Suggested bridge responsibilities:

- identify the content contract and skill locations;
- require content discovery before adding or changing user-facing content;
- require orthogonal evidence dimensions, separate governing instruments, accountable owners, authorized approvers and approval records, independent decision and delivery states, separate evaluation records, and a content diff for affected messages;
- route high-risk changes to the declared accountable owner and authorized approval path;
- state what the content agent may edit and what requires approval.

### Google DESIGN.md

- **[Sourced fact]** Google’s DESIGN.md project combines normative YAML tokens with explanatory Markdown, and provides `lint`, `diff`, and export commands with structured output and exit codes. Its repository labels the format alpha. Source: [google-labs-code/design.md](https://github.com/google-labs-code/design.md).
- **[Sourced fact]** The README documents that the dot-suffixed `design.md` command can collide with Windows Markdown file associations and supplies a dot-free `designmd` alias. Source: [DESIGN.md CLI reference](https://github.com/google-labs-code/design.md#cli-reference).
- **[Inference]** DESIGN.md demonstrates a useful artifact pattern—normative structured values, human rationale, linting, diffing, export—but does not establish universal agent auto-discovery.
- **[Proposal]** Reuse the pattern, not its assumptions: structured content constraints, prose rationale, stable identifiers, machine-readable lint results, safe extensions, and explicit versioning.

### Agent Skills

- **[Sourced fact]** The Agent Skills specification defines a directory containing required `SKILL.md` plus optional scripts, references, and assets. Name and description are required metadata. Agents can load metadata first, the instructions when relevant, and supporting resources on demand. Source: [Agent Skills specification](https://agentskills.io/specification).
- **[Inference]** A skill is well suited to the reusable workflow and tooling. A repository contract is better suited to product-specific, versioned facts and decisions. One should not impersonate the other.
- **[Proposal]** Distribute both: a portable content-design skill and an installed repository contract, with host-native bridges that activate the skill and point to the contract.

### DECISION.md ambiguity

- **[Sourced fact]** Unlike AGENTS.md, no evidence in this research establishes one canonical, cross-host DECISION.md convention. Spice 0.2.0 uses `.spice/decision/decision.md` for objectives, weights, constraints, and trade-off rules and explicitly says it is not memory, a prompt dump, an execution runbook, or an agent workflow. Source: [Spice runtime 0.2.0](https://pypi.org/project/spice-runtime/0.2.0/).
- **[Sourced fact]** Other packages use similarly named decision notes for project-specific purposes rather than the same contract; one example is [agent-spec-vault](https://pypi.org/project/agent-spec-vault/).
- **[Inference]** “Work like decision.md” is a product analogy that needs a named reference and desired behaviors; it is not evidence of a standard. AGENTS.md is a convention, while Google DESIGN.md and the cited DECISION.md implementations have different maturity and semantics.

## Proposed repository artifact model

The public filename is unresolved because of active collisions documented in the landscape research. The model below uses `CONTENT.md` as a working placeholder.

```text
CONTENT.md                         # concise contract, evidence/control routing, principles
.content/
  manifest.yaml                   # schema version, products, locales, connectors, ownership
  terminology.yaml                # canonical terms, aliases, prohibited meanings, sources
  voice.yaml                      # stable voice dimensions and examples
  tone-contexts.yaml              # state/risk/channel modulation, not personality adjectives alone
  patterns/                       # reusable content patterns and state requirements
  journeys/                       # event and channel maps
  decisions/                      # append-only/superseding decision records
  evaluations/                    # benchmark definitions and approved thresholds
  baselines/                      # generated inventories and accepted findings
  adapters/                       # project-specific extraction mappings; no secrets
```

- **[Proposal]** Keep large generated inventories outside the always-loaded Markdown file. The root contract should be short enough to read, review, and fit alongside other instructions.
- **[Proposal]** Give every structured artifact a `schema_version`, stable IDs, typed evidence-source and governing-instrument links, accountable owner and approval fields where applicable, orthogonal evidence dimensions, independent decision/delivery state references, evaluation links, freshness dates, and an extension mechanism.
- **[Proposal]** Separate durable principles from current product facts. Principles change through governance; product facts can become stale and need freshness checks.

### Minimum root contract

1. Scope: products, repositories, surfaces, locales, and exclusions.
2. Users and jobs, including evidence and uncertainty.
3. Product behavior plus evidence-source, governing-instrument, accountable-owner, and approver map.
4. Voice principles and tone dimensions with positive/negative examples.
5. Terminology and object/action model.
6. State, risk, accessibility, and localization requirements.
7. Workflow: discover → model → draft → review → implement → verify.
8. Decision rights, approvers, escalation, and prohibited autonomous changes.
9. Links to structured files, sources, and validation commands.
10. Version, last verified date, and known gaps.

## Repository discovery and extraction

### Do not use grep as the product model

- **[Sourced fact]** FormatJS extraction is syntax-aware, recognizes specified APIs/components, can emit source locations, and requires configuration for custom wrappers. Its verification can detect missing keys and structural differences. Source: [FormatJS CLI](https://formatjs.github.io/docs/tooling/cli/).
- **[Sourced fact]** Android localizable strings are resources that can include formatting arguments and plurals; plural categories differ by language. Source: [Android, String resources](https://developer.android.com/guide/topics/resources/string-resource).
- **[Sourced fact]** Xcode String Catalogs can discover localizable strings during builds, manage variations, and carry translator comments; Apple recommends testing clipping, truncation, layout, and right-to-left behavior. Source: [Apple localization](https://developer.apple.com/localization/).
- **[Sourced fact]** GNU gettext uses `xgettext` to extract marked source strings into translation catalogs with references and comments. Source: [GNU gettext manual](https://www.gnu.org/software/gettext/manual/).
- **[Inference]** Literal search is useful for reconnaissance but cannot reliably distinguish UI content from tests, logs, internal identifiers, dead code, or generated values, and cannot understand custom localization wrappers without configuration.

### Adapter tiers

| Tier | Evidence source | Method | Typical blind spot |
|---|---|---|---|
| 1 | Declared localization resources | Framework parser or official extractor | Hardcoded visible literals |
| 2 | Source UI literals | Language AST and framework semantics | Runtime-generated or remotely supplied text |
| 3 | Rendered application | Candidate-first conformance evidence under `verify.candidate`, then P0-G-governed operational `verify.runtime`: route/state traversal, DOM and accessibility tree | Unreached permissions, roles, flags, locales |
| 4 | Native app resources | Platform catalogs and build tooling | Server-driven and store metadata |
| 5 | CMS and TMS | API/export with content model and locale metadata | Derived content and unpublished variants |
| 6 | Design and prototype | Node/API/plugin extraction plus rendered evidence | Hidden, stale, detached, or authoring-only text |
| 7 | External communication | Provider templates and APIs for email/SMS/push/docs | Messages managed by another organization |
| 8 | Generated/media content | Template tracing, OCR as a lead, transcripts, asset metadata | False positives and unobservable variants |

- **[Proposal]** Every adapter declares supported versions, syntaxes, fields, confidence, read/write capability, and fixtures. Unsupported wrappers and file types remain explicit gaps.
- **[Proposal]** Preserve stable resource keys and source coordinates. A normalized item should retain file/line, design node, CMS entry, locale, component/route, runtime state, variables/markup, evidence role and provenance, governing applicability, separate accountable-owner IDs/links, separate authorized-approver and approval-record IDs/links where known, and retrieval time.
- **[Proposal]** Static extraction, runtime observation, and design/CMS reads can corroborate one another; none is assumed canonical without property-specific evidence, governing applicability, ownership, and approval routing.

### `verify.candidate` evidence contract

`verify.candidate` is the off-by-default pre-operational route for testing a newly built adapter/profile without circularly assuming the P0-A or P0-G result its evidence is meant to support. It is disposable, isolated, synthetic-data-only and evidence-only. It requires an authenticated expiring verification-candidate authorization plus a separate exact candidate-test grant; neither is an operational task grant.

The bound contract must identify the exact candidate/version/artifact digest; toolchain versions and digests; immutable build recipe and build digest; P0-A/P0-G gates under test; immutable test plan, fixture/manifest and executor-profile digests; exact tools, executables, arguments and actions; filesystem, network, process/child-process, credential and writable-scratch bounds; evidence sink/schema/integrity/access/retention; resource/cost ceilings; cancellation, incident and cleanup behavior; expiry/revocation; and an evaluator independent of the implementation author and candidate runtime. The result preserves those identifiers plus the actual process/browser/network/filesystem/credential trace, captures/redactions, evidence receipt/digest, deviations, incidents, limits and disposal outcome.

Candidate output may establish or falsify conformance evidence but cannot issue P0 `pass`/`blocked`, an operational grant, a supported-profile claim or readiness. It is excluded from product-quality and comparative scores. Only independent gate authority can issue the exact artifact/profile result; operational use then requires that current result and a separate exact task grant.

### `verify.runtime` adapter contract

`verify.runtime` is not a static-discovery adapter and cannot run under P0-A. Before it launches or attaches to a formatter, compiler, test, local server, browser, app, device, emulator, accessibility inspector, or other process, the claimed adapter profile must pass [P0-G](security-privacy-and-trust-boundaries.md#p0-g--before-controlled-runtime-verification) and the trusted control plane must issue an exact least-privilege runtime task grant.

Each adapter profile must declare and enforce:

- supported operating systems, runtimes, browsers/devices, versions, and known blind spots;
- immutable executable and arguments or allowlisted browser/device actions, exact build/revision and environment, working directory, start state, roles, flags, locales, routes, and origins;
- filesystem mounts and writable scratch space, network destinations, child-process policy, data classes, brokered credentials/test identity, captures, redaction, and prohibited effects;
- time, CPU/memory, action, navigation, request/response, output/capture, download, and cost bounds, plus cancellation, teardown, and ephemeral-profile/workspace disposal;
- observed build/environment identifiers, route/state/role/locale/flags, timestamps, action and process/browser/network trace, DOM/accessibility or equivalent evidence, failures, redactions, cleanup result, and limitations.

Package installation is outside P0-G. Prefer attaching to an already built, dedicated test environment; an exact build/test hook or fixed shell wrapper can run only as the enumerated profiled executable with immutable arguments. Personal browser profiles, ambient cookies/password managers/SSH agents, arbitrary browsing, external-protocol launches, persistent services, and source writes are prohibited. A formatter or build that can write runs only against disposable scratch input; its output may become a later typed P0-D/E change transaction but cannot mutate the source of truth as a runtime side effect. If runtime verification also needs model egress, a read connector, local mutation, remote mutation, or enforcement, it separately requires P0-B, P0-D, P0-E, or P0-F as applicable plus exact grants and approvals; D/E mutation remains a separately mediated transaction. A runtime observation is evidence; it cannot assert semantic approval, release, production reachability, or user outcome.

### Safe round trips

Before editing, the adapter must be able to:

- parse and serialize without changing unrelated formatting or ordering;
- preserve variables, markup, selectors, comments, resource keys, and escapes;
- distinguish copy changes from behavior or state-machine changes;
- show a content-only diff and the implementation diff;
- apply expected-current-value guards so stale plans fail closed;
- for a new executable profile, run candidate conformance of repository formatters, compilers, localization checks and tests only through the separately authorized disposable `verify.candidate` route; after independent gate authority issues the exact current result, run operational checks only through a P0-G-eligible `verify.runtime` profile and separate exact runtime task grant, using nonmutating modes or disposable scratch input; any accepted formatter output returns as an exact typed P0-D/E mutation transaction with its own grant and approval, because P0-A and P0-D do not authorize process execution, candidate evidence is not operational authority, and P0-G does not authorize source mutation;
- record what was proposed, approved, patched, built, and observed separately.

- **[Proposal]** If safe round trip is unproven, emit a suggested patch or review artifact rather than modifying the source.

## Localization and message standards

### Unicode MessageFormat 2

- **[Sourced fact]** Unicode MessageFormat 2 is the successor to ICU MessageFormat. UTS #35 Part 9 defines its data model, syntax, processing, and conformance for localizable dynamic messages, including variables, selectors, number/date formatting, markup, and custom functions. The current referenced report is version 48.2. Sources: [MessageFormat 2 overview](https://messageformat.unicode.org/) and [UTS #35 Part 9](https://www.unicode.org/reports/tr35/tr35-messageFormat.html).
- **[Sourced fact]** MessageFormat 2 syntax is not backward-compatible with MessageFormat 1 syntax. Source: [MessageFormat 2 specification](https://www.unicode.org/reports/tr35/tr35-messageFormat.html).
- **[Proposal]** Preserve native project formats; do not silently migrate messages to MF2. Use MF2 as a capability/reference model and only transform through an explicit migration decision with runtime support.

### XLIFF 2.2

- **[Sourced fact]** The OASIS XLIFF Technical Committee approved XLIFF 2.2 as a Committee Specification on 13 March 2025. It defines an interchange format among extraction, writing, modifying, enriching, and merging agents. Version 2.2 adds a module for plural, gender, and select messages, while valid 2.0 and 2.1 documents remain valid 2.2 documents. Sources: [XLIFF 2.2 Core](https://docs.oasis-open.org/xliff/xliff-core/v2.2/xliff-core-v2.2-part1.pdf) and [XLIFF 2.2 Extended](https://docs.oasis-open.org/xliff/xliff-core/v2.2/xliff-extended-v2.2-part2.pdf).
- **[Inference]** XLIFF is a useful translation handoff and state carrier; it is not automatically an applicable governing instrument, an approved content decision, or the product-state model.

### Supporting standards

- **[Sourced fact]** BCP 47 defines language tags used to identify languages and language variations. Source: [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646).
- **[Sourced fact]** ITS 2.0 defines metadata for internationalization and localization workflows, including translatability and terminology. Source: [W3C, Internationalization Tag Set 2.0](https://www.w3.org/TR/its20/).
- **[Sourced fact]** WCAG 2.2 and WAI-ARIA cover user-visible and programmatic names, instructions, errors, status, and interface semantics; they therefore create content requirements beyond rendered prose. Sources: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/).
- **[Proposal]** Store full BCP 47 tags, preserve source locale and fallback policy, and validate message structure before stylistic critique.

## Figma and design handoff

- **[Sourced fact]** Figma's REST API exposes file nodes, comments, versions, variables, and webhooks. A text node exposes `characters`; canvas nodes can expose flow starting points; nodes also expose visibility and hierarchy. Sources: [Figma REST API](https://developers.figma.com/docs/rest-api/) and [Figma file node types](https://developers.figma.com/docs/rest-api/file-node-types/).
- **[Sourced fact]** In the plugin API, setting `TextNode.characters` requires the relevant font to be loaded and can reset per-range character styles. Source: [Figma plugin API, TextNode.characters](https://developers.figma.com/docs/plugins/api/properties/TextNode-characters/).
- **[Sourced fact]** Figma Variables APIs can carry string values, but access, write scopes, plans, and endpoint limitations apply. Source: [Figma Variables endpoints](https://developers.figma.com/docs/rest-api/variables-endpoints/).
- **[Sourced fact]** Lokalise's Figma documentation says it can exchange text, keys, translations, and screenshots; screenshots can include a top-level frame with coordinate markers for context. It also warns that language selection and import/export settings can overwrite content. Source: [Lokalise Figma integration](https://docs.lokalise.com/en/articles/3732824-figma).

Design extraction must retain:

- file, page, section, containing frame, component/instance ancestry, and node ID;
- visible/hidden status, variant properties, flow entry point, screen/state label, and prototype action;
- rendered screenshot or frame evidence, not only raw node text;
- component property or variable binding and localization key if present;
- authoring annotation versus product-visible text;
- source/design/implemented relationship and last verified version.

- **[Inference]** A loaded file or raw text-node match does not prove a message is on a reachable product screen. Hidden variants, discarded explorations, decks, and annotations can produce false inventory.
- **[Proposal]** Reads must be least-privilege and limited to enrolled, explicitly allowlisted files, frames, nodes, properties, branches, and versions needed for the declared task. Writes require a separately granted exact target plus expected-current-text guards, font checks, preview, rollback, and readback. Never bulk-read merely because access exists, and never bulk-write from a stale inventory.

## CMS and localization handoff

- **[Sourced fact]** Contentful models content through content types and fields, with field types, validations, entries, assets, and locales. Source: [Contentful, Content modeling basics](https://www.contentful.com/developers/docs/concepts/data-model/).
- **[Sourced fact]** Ditto describes its product as a product-text system with integrations for Figma, VS Code, GitHub Actions, localization, SDKs, CLI, and MCP; these are vendor claims, not independently verified capability tests. Sources: [Ditto developer documentation](https://developer.dittowords.com/introduction) and [Ditto agent setup](https://developer.dittowords.com/agent-setup-package/overview).

- **[Proposal]** Connector setup must record workspace/project, content model, locale mapping, environment/branch, read/write capability scopes, evidence role, governing-instrument links where applicable, and accountable ownership/approval routing by field or content type.
- **[Proposal]** No credentials, tokens, personal data, or unpublished restricted content belong in the repository contract. Store connector references and required scopes; resolve secrets through the host's credential mechanism.
- **[Proposal]** Sync conflicts should become explicit review records: exact sources and timestamps, evidence observation/challenge/freshness/lineage/epistemic dimensions, governing applicability, accountable owner, required approver, proposed resolution and decision state, delivery implications, and eventual outcome/evaluation links.

## Validation and CI

### Deterministic gates

Run before model critique:

- contract/schema and reference validation;
- broken stable IDs, unresolved links, duplicate keys, and invalid evidence-, decision-, or delivery-state transitions;
- protected/forbidden terminology where rules are precise enough;
- variables, select/plural branches, tags, escapes, and translation structure;
- accessible-name presence and visible-label/name drift where statically testable;
- length or platform constraints that have a verified source;
- stale expected-current values and out-of-scope changed files;
- secret, personal-data, and restricted-source checks;
- for a new build/profile, candidate-first build, type, unit, integration, localization and executable-accessibility conformance evidence only through the separately authorized disposable `verify.candidate` route; after independent gate authority issues the current exact results, operational execution only through a P0-G-eligible `verify.runtime` profile and separate exact runtime task grant; parser-only operational static checks remain under P0-A.

### Advisory checks

Use model or rubric findings for contextual qualities: clarity, usefulness, information order, tone fit, jargon, ambiguity, consequence disclosure, recovery, consistency, and product grounding. Advisory findings need evidence, confidence, and a proposed action; they do not silently block or rewrite.

- **[Proposal]** CI emits stable rule IDs, severity, location, observed evidence, violated rule/source, confidence, suggested action, and—only for explicitly exception-eligible deterministic findings actually classified Medium or Low—a governed exception/appeal path in machine-readable output.
- **[Proposal]** Baseline only eligible Medium/Low deterministic-rule debt explicitly designated as exception-eligible so adoption can prevent regressions without forcing an unsafe repository-wide rewrite. High or Critical findings, failed P0-A–G phase gates, and violations of security, privacy, authorization, provenance, integrity, supply-chain, credential, isolation, or control-plane rules are never baseline-suppressible and never waivable. A scoped exception may apply only to such an eligible below-High deterministic rule after all applicable phase gates pass and, for autonomous enforcement, P0-F exception governance authenticates the reason, scope, owner, mitigation, expiry, visibility, and review path; eligibility never changes an actual High/Critical disposition, and no exception widens a capability grant or changes a gate result.
- **[Proposal]** Re-run extraction and validation after implementation; a clean proposal is not proof that compiled/rendered output is correct.

## Decision memory and control records

Each durable decision record should contain:

- decision ID, title, scope, version, and decision state;
- question, context, and affected message/state/term IDs;
- evidence sources with observation/challenge/freshness/lineage/epistemic dimensions, source type, link, retrieval date, scope, and limitations;
- governing instruments with explicit applicability, version/effective date, jurisdiction, and controlled claim types;
- alternatives and explicit criteria/trade-offs;
- decision, rationale, confidence, assumptions, and unresolved risks;
- accountable decision owner, required approver roles, exact approval records actually obtained, conditions, expiry, and dates;
- implementation links with delivery states, separate verification evaluation records, and observed outcome evidence;
- supersedes/superseded-by relationships and review date.

- **[Proposal]** Use append-only or superseding records for rationale, while keeping current rules in the contract/structured artifacts. An old decision is evidence of history, not proof of present validity.
- **[Proposal]** Preserve conflict rather than choosing by recency alone. Resolve each property through its evidence sources, applicable governing instruments, accountable owner, authorized approver, and decision scope; product behavior, legal/policy, design system, localization, research, and implementation can route differently.
- **[Proposal]** The agent may recommend; it must not fabricate approval or convert a working draft into canonical guidance.

## Install, update, and uninstall behavior

### Install

1. Begin in report-only mode: after P0-A passes, use a task-specific least-privilege read grant to detect the enrolled repository root, monorepo boundaries, languages, frameworks, instruction files, localization systems, and existing content artifacts.
2. Present the read-only inventory, exact planned files/blocks, expected-current values, and rollback before writing.
3. Record a passing P0-D result and construct a separate installer/local-write grant plus mutation/change approval bound to exact repository paths, operations, base revision/current values, environment, purpose, and expiry. This file-only profile excludes package/process/network/credential/connector capabilities; host/process verification separately requires P0-G and an exact runtime grant, and package installation requires a future separately defined capability/gate.
4. Choose supported hosts and create minimal native bridges without overwriting existing instructions.
5. Create the versioned contract and skill lock/manifest, then read back every installer-owned change.
6. Run static parser fixtures for a new artifact first through the authorized `verify.candidate` evidence route; use the same route for candidate host loaded-marker conformance when process execution is required. Independent gate authority alone may issue exact P0-A/P0-G results from that evidence. Any later operational parser or host verification separately requires the current applicable result and exact operational task grant, with marker creation and removal governed by the same exact P0-D profile and mutation/change approval described above.
7. Return to report-only by default; enable future writing only through a separately declared capability phase, passing applicable gate, and task-specific grant per connector, path, and operation.

### Update

- start with report-only P0-A static discovery and a scoped read grant; before any migration or file change, pass P0-D and issue an exact, expiring update/local-write grant plus mutation/change approval bound to the exact diff, target, base values, environment, and purpose;
- migrate schemas through explicit, reversible migrations;
- preserve local extensions and user edits;
- show contract, adapter, and behavior changes;
- rerun compatibility and benchmark suites;
- require review and a new applicable phase gate/grant for changes that broaden scopes or capabilities; the existing operating mode, evidence, approval, or installer grant cannot authorize the expansion.

### Uninstall

- begin with report-only P0-A static discovery and an exact read grant; before removal, pass P0-D and issue an expiring local-write grant plus mutation/change approval for only the exact installer-owned blocks/files identified by markers and current-value guards;
- remove those exact blocks/files with expected-current checks, preview, rollback, and readback;
- retain or export project decisions and inventories when requested;
- disconnect the connector and revoke its credentials through the trusted control plane's P0-B B5/B8-tested `connector.disconnect` path, using an authenticated exact connector/tenant/account/credential task grant or the separately governed pre-authorized incident grant; this control-plane reduction of authority is independent of P0-E publication, requires no content approval, cannot mutate product content, and produces an audit record;
- report residual files and manual cleanup without deleting unrelated work.

## Security and trust boundaries

The dedicated [security, privacy, and trust-boundary study](security-privacy-and-trust-boundaries.md) defines the current capability phases, threat register, least-privilege envelopes, data-processing record, guarded write transaction, supply-chain controls, incident response, and phase-specific P0 release gates. The bullets below are a compact integration summary, not the complete threat model.

- **[Inference]** Connected design, CMS, localization, analytics, and policy systems enlarge the attack and privacy surface. Content operations are not low-risk merely because the output is text.
- **[Inference]** Operating mode, evidence strength, content approval, and delivery state are not authorization. The trusted control plane constructs every task capability grant independently and refuses work when an applicable phase gate fails.
- **[Proposal]** `verify.candidate` is a separate pre-operational evidence route, not a bypass around the phase gate. Its candidate authorization and test grant cannot become an operational task grant; its evidence cannot become a supported-profile/readiness claim until independent gate authority issues the exact result, and candidate outputs remain outside product/comparative scoring.
- **[Proposal]** Default connectors to read-only, least privilege, explicit repository/environment allowlists, and redacted logs.
- **[Proposal]** Treat repository, CMS, design, issue, and web content as untrusted evidence that may contain prompt injection. Data may inform decisions but cannot grant tools, change permissions, or override host/user instructions.
- **[Proposal]** Require an explicit preview and mandatory mutation/change approval bound to the exact write or publication transaction; also require applicable semantic decision approval for releasable governed meaning and a separate release approval when release policy requires residual-risk acceptance. None substitutes for the phase gate or task grant.

## Gaps to research

- **[Open question]** Which exact host/version combinations support Agent Skills, and how do their semantic activation rules differ?
- **[Open question]** Should the repository contract be one Markdown file with embedded structured data or a small Markdown router plus typed sidecars?
- **[Open question]** What framework adapters define the first support boundary, and what fixture corpus proves their recall and safe round trip?
- **[Open question]** How should monorepos compose organization, product, market, and component content rules without exceeding host context limits?
- **[Open question]** Which connector-specific permission, identity, retention, residency, and readback mechanisms can satisfy the proposed security gates in real provider sandboxes?
- **[Open question]** Which portions of the decision log are safe to publish in open-source repositories?
