# content.md regular-user productization plan

Date: 2026-08-27

## Current finding

The filesystem adapter does not split source code into arbitrary words. It discovers strings in content-bearing locations such as JSX text, selected JSX attributes, selected object properties, locale messages, HTML titles, and metadata. Each occurrence retains source location and contextual fields such as component, route, syntax kind, channel, and modality.

That makes the current records **source-bound content token candidates**, not meaningless word tokens. It does not yet make every record a trustworthy **content primitive**. In the UseMissa `apps/web` scan, 13,476 occurrences included useful labels, headings, descriptions, errors, and recovery messages, but also punctuation-only spans, numbers, split JSX fragments, tests, fixtures, and design-system demo copy. The compiler currently creates semantic graph records for every occurrence before proving that it is meaningful.

The product must therefore keep these concepts distinct:

1. **Raw literal** — parser output; never presented as a finding by default.
2. **Content occurrence** — a source-bound string in a content-bearing location.
3. **Content token candidate** — an occurrence or reassembled group that may carry user-facing meaning.
4. **Content primitive** — a qualified, meaningful UX unit with a role, context, intent, source, and confidence.
5. **Semantic message** — the stable meaning that one or more expression versions implement.
6. **Finding** — an evidence-backed issue or opportunity involving qualified primitives.

Examples of primitive roles include label, heading, instruction, description, navigation item, status, error, confirmation, recovery, assistive name, and metadata. Punctuation, interpolation glue, isolated step numbers, source-code constants, and test/demo content must not be silently promoted as primitives.

## Product-content ontology

The system must not treat `microcopy`, `UX copy`, `marketing copy`, and similar practitioner terms as mutually exclusive primitive types. They describe different dimensions: practice, scope, purpose, surface, and format. A single expression can legitimately belong to several classifications. For example, an upgrade button can be an action label, product-interface content, conversion content, and microcopy at the same time.

The canonical model therefore classifies content along independent axes.

### Practice domain

- **Product/UX content** — language that helps someone understand and use a product or service across a journey.
- **Marketing content** — language intended to create awareness, interest, preference, conversion, or retention.
- **Brand content** — language that establishes identity, positioning, promise, narrative, or verbal character.
- **Transactional content** — language communicating a specific account, order, payment, booking, security, or service event.
- **Support content** — language that diagnoses problems, answers questions, or helps someone recover.
- **Instructional content** — language designed to teach a concept, procedure, capability, or correct use.
- **Policy and legal content** — terms, notices, disclosures, consent, rights, obligations, and regulated information.
- **Technical content** — API, developer, implementation, integration, and operational guidance.
- **Editorial content** — articles, stories, updates, reports, and other publication-oriented material.
- **Internal operational content** — language used by staff to operate, moderate, administer, or support the service.

These domains may overlap and must retain evidence for why each label applies.

### Interaction function

- orient;
- identify or label;
- explain;
- instruct;
- prompt an action;
- support a choice;
- set an expectation;
- communicate consequence;
- request permission or consent;
- communicate status or progress;
- confirm an outcome;
- warn;
- identify an error;
- enable recovery;
- build trust or establish provenance;
- persuade or convert;
- retain or re-engage;
- teach;
- provide reference information.

Interaction function is the primary basis for analysis because it connects words to the job they must perform.

### Content scale

- **Token** — a source-level candidate, not yet a meaningful content unit.
- **Primitive** — the smallest independently meaningful unit in context, such as a label, error, title, or status.
- **Composition** — related primitives that work together, such as an error plus recovery action.
- **Block** — a bounded content section, such as onboarding guidance, a pricing-card explanation, or help answer.
- **Document** — a complete page, article, policy, guide, email, or other independently usable work.
- **Journey system** — coordinated content across states, surfaces, and channels over time.

`Microcopy` is a scale-and-context classification: one primitive or a small composition operating at a specific interaction point. It is not a synonym for all UX content and is not defined by a character limit.

### Format and pattern

Examples include navigation label, heading, field label, helper text, placeholder, button, link, menu command, prompt, option, tooltip, empty state, validation message, error, warning, confirmation, status, progress message, notification, banner, modal, onboarding step, search result, metadata, accessible name, alt text, email, SMS, push notification, in-product announcement, landing page, pricing content, case study, article, help answer, procedural guide, policy, disclosure, release note, and API documentation.

Format describes the expression's delivery pattern; it does not establish its purpose by itself.

### Surface and channel

Examples include product interface, public website, checkout, account area, admin interface, help centre, documentation site, email, SMS, push, chatbot, voice interface, social channel, sales material, in-person script, and printed communication.

### Audience and journey context

Every qualified item should bind, where evidence allows, to audience or actor, job, journey, stage, trigger, user state, system state, intended outcome, action, consequence, and recovery. Unknown context remains explicitly unknown rather than being inferred as fact.

### Content classification record

A qualified content unit should contain:

```ts
interface QualifiedContentUnit {
  id: string;
  expression: string;
  scale: "primitive" | "composition" | "block" | "document" | "journey_system";
  practice_domains: PracticeDomain[];
  functions: ContentFunction[];
  formats: ContentFormat[];
  surfaces: ContentSurface[];
  audience_refs: string[];
  journey_ref?: string;
  state_ref?: string;
  semantic_message_ref: string;
  intended_outcome?: string;
  action_ref?: string;
  consequence_ref?: string;
  recovery_ref?: string;
  source_occurrence_refs: string[];
  source_layer: "product" | "api" | "documentation" | "marketing" | "support" | "test" | "fixture" | "demo";
  qualification: "qualified" | "candidate" | "uncertain" | "rejected";
  confidence: number;
  classification_reasons: string[];
}
```

The arrays are intentional. Classification is multi-label: `UX copy`, `transactional copy`, and `microcopy` may all be true of the same payment-recovery composition. The system must show the evidence behind these labels and allow a user to correct them.

## Product promise

A regular user can run `npx contentmd` in a product repository and quickly receive a small, understandable, evidence-backed view of how the product communicates. The first run is safe and preview-only. It explains what it found, distinguishes raw candidates from qualified primitives, and proposes useful next actions without requiring the user to understand the internal graph, governance records, or repository architecture.

## Phase 1 — Prove semantic discovery quality and define the golden path

Define `npx contentmd` and `npx contentmd scan --summary` as the primary entry points. Introduce a qualification pipeline between parsing and semantic graph creation:

- classify occurrences by content role and confidence;
- classify qualified units independently by practice domain, interaction function, scale, format, surface, and journey context;
- reassemble adjacent JSX text/interpolations when they form one message;
- reject or quarantine punctuation-only, numeric-only, and connector fragments;
- separate product UI, tests/fixtures, API messages, design-system examples, and documentation into explicit source layers;
- require role, surface/context, source span, inclusion reason, and confidence before promotion to a content primitive;
- preserve rejected and uncertain candidates for inspection without treating them as product truth;
- report raw occurrence count and qualified primitive count separately.
- preserve multi-label classifications rather than forcing content into one copy category.

Use a stratified, human-reviewed UseMissa sample as the first evaluation set. Measure precision by source layer and primitive role, not only aggregate occurrence count.

Completion checks:

- no punctuation-only or numeric-only record is promoted as a content primitive;
- split messages are reassembled or explicitly related;
- tests, fixtures, and design-system demos are excluded by default or clearly separated;
- at least 95% precision on the agreed reviewed sample before calling discovery production-ready;
- the same source produces deterministic IDs and classifications;
- the system distinguishes microcopy, broader UX content, marketing, brand, transactional, support, instructional, policy/legal, technical, editorial, and internal operational content without treating overlapping labels as contradictions;
- `contentmd scan --summary` works as the regular-user command. **Fix 8.**

## Phase 2 — Make discovery safe and preview-only

Discovery must not write `.contentmd` state by default. The first run builds an in-memory result and shows what would be created. Persistence requires an explicit `--save`, an interactive confirmation, or a subsequent accepted action.

The preview states:

- directories that will be scanned;
- inherited repository context;
- excluded source layers;
- candidate and qualified-primitive counts;
- files that would be created or changed;
- how to cancel or narrow the scan.

Completion checks:

- `contentmd discover` and the golden path leave the repository unchanged by default;
- JSON mode declares whether any write occurred;
- persistence is explicit, idempotent, and tested. **Fix 1.**

## Phase 3 — Add progress, cancellation, and an approachable CLI

Build an interactive CLI around ordinary user questions: what product should be scanned, what is product UI versus supporting material, and whether results should be saved. During work, show the current stage, files considered, files scanned, exclusions, elapsed time, and qualified findings so far.

Completion checks:

- first progress appears within one second for a large repository;
- Ctrl-C stops work promptly and leaves no partial governed state;
- long stages expose enough information to distinguish progress from a hang;
- non-interactive and JSON modes remain deterministic. **Fix 2.**

## Phase 4 — Make setup nearly invisible and monorepo-aware

Automatically identify workspaces and propose relevant product boundaries instead of scanning an entire monorepo indiscriminately. Apply safe default exclusions for dependencies, build output, generated files, snapshots, fixtures, tests, and component-gallery/demo trees. Let a scoped application inherit relevant product documentation and configuration from the repository root without ingesting unrelated workspaces.

Completion checks:

- the CLI detects common npm, pnpm, Yarn, Turborepo, and workspace layouts;
- the user can accept, edit, or override the proposed scope;
- exclusions are visible and reversible;
- UseMissa can select `apps/web` without losing relevant root product documentation;
- generated, fixture, dependency, build, and design-system-demo sources do not dominate default results. **Fixes 3, 4, and 7.**

## Phase 5 — Produce an immediately useful, compact report

Replace multi-megabyte setup output with a one-screen summary. Rank findings by user impact, recurrence, journey importance, confidence, and remediation value. Show the top ten by default, with explicit commands to inspect all qualified primitives, uncertain candidates, or raw occurrences.

The first report answers:

- what the product appears to be;
- which content domains, functions, formats, surfaces, and journey systems were found;
- which surfaces and journeys were found;
- how many raw occurrences became qualified primitives;
- what was excluded or remains uncertain;
- the ten most useful findings and why they matter;
- the safest next action.

Completion checks:

- default terminal output fits an ordinary terminal session and does not emit the graph;
- JSON summary is compact and stable;
- full evidence remains addressable by ID;
- 13,476 raw occurrences never become 13,476 unranked user-facing results. **Fixes 5 and 6.**

## Phase 6 — Support collaborative content improvement

Let a user select a finding, inspect its source and semantic context, draft an improvement, compare the proposed expression with the current one, and export or apply a patch. Keep recommendation, acceptance, and code mutation distinct.

Completion checks:

- every suggestion cites qualified primitives and exact source locations;
- the user can edit or reject a proposal;
- applying a proposal requires explicit authorization;
- generated patches are narrow and reversible.

## Phase 7 — Deliver a real model-assisted experience

Use models for semantic tasks that deterministic parsing cannot reliably solve: fragment grouping, primitive-role classification, semantic-message grouping, ambiguity explanation, and suggestion drafting. Keep deterministic schemas, bounded inputs, provenance, confidence, and fallbacks around model output.

Completion checks:

- the product remains useful without model credentials;
- model-derived claims are labelled and traceable;
- low-confidence classifications remain candidates rather than truth;
- evaluations compare model results with the reviewed corpus.

## Phase 8 — Simplify approval and governance for regular users

Present governance as understandable actions: review, accept, reject, save, apply, and undo. Preserve the richer internal approval and attestation model for organizations that need it, but do not force a solo user to simulate multiple roles.

Completion checks:

- a solo user can complete the golden path without creating fictional reviewers;
- team mode supports named responsibilities and attestations;
- qualification records describe evidence and authority truthfully;
- approval never fabricates review activity.

## Phase 9 — Build the local visual workspace

Provide a local browser workspace for exploring journeys, primitives, messages, evidence, and proposed changes. The UI and CLI use the same application actions. The read-only WebMCP surface may inspect this workspace, while approval, mutation, release, and publication remain explicit human actions.

Completion checks:

- a non-technical content practitioner can navigate the report without graph terminology;
- selecting a finding reveals source, role, context, confidence, and reasoning;
- CLI, UI, and WebMCP return consistent evidence;
- accessibility and keyboard journeys pass review.

## Phase 10 — Test with real users and repositories

Run task-based studies with content designers, product designers, engineers, and small product teams across several repository shapes. Test setup, comprehension, usefulness, trust, cancellation, scoping, suggestion review, and recovery from mistakes.

Completion checks:

- participants can reach the first useful finding without assistance;
- users correctly understand candidate versus primitive versus finding;
- false-positive and false-negative reports feed the qualification corpus;
- performance and usability budgets are met on small apps and monorepos.

## Phase 11 — Release as npm/npx software

Publish a versioned package with a stable executable, supported Node range, platform checks, package provenance, changelog, upgrade guidance, and smoke tests against a clean temporary project.

Completion checks:

- `npx contentmd` works without a global installation;
- install, first scan, cancellation, preview, save, and uninstall journeys pass on supported platforms;
- the package excludes internal artifacts and contains the required runtime assets;
- release automation verifies package contents before publication.

## Phase 12 — Connect content.md to the world

Add explicit, permissioned adapters for repositories, issue trackers, design sources, localization systems, CI, and publishing workflows. Start read-only, make provenance visible, and introduce mutations one bounded workflow at a time.

Completion checks:

- each connector declares authority, data flow, and mutation boundaries;
- imported evidence remains distinguishable from repository evidence and user instruction;
- integrations degrade safely when unavailable;
- no connector can approve, publish, or release merely because it can read content.

## Execution order

Phases 1–5 are the regular-user viability gate and should be completed before expanding integrations. Phase 6 can begin once qualified primitives and compact reports are reliable. Phase 7 strengthens semantic performance but must not substitute for the qualification model or reviewed evaluation corpus. Phases 8–10 validate trust and usability. Phases 11–12 package and distribute a product whose core behavior has already been proven.

The next implementation slice is therefore Phase 1: build the occurrence-to-primitive qualification boundary and evaluate it against a reviewed UseMissa sample. Preview-only behavior and the summary command should follow immediately because they make repeated evaluation safe and legible.

## Implementation evidence — 2026-08-27

The first Phase 1–2 slice is now implemented:

- `packages/core/src/content-qualification.ts` defines deterministic multi-axis qualification records for practice domain, interaction function, format, source layer, microcopy scope, confidence, and disposition;
- rejected and uncertain occurrences no longer become semantic messages, expression versions, or implementation occurrences in the content graph;
- route presence now describes a surface and no longer automatically turns every expression on that page into a navigation label;
- known punctuation, numeric, connector, test, fixture, generated, dependency, and targeted design-system demo cases are rejected or held uncertain;
- `ProjectModelResult.content_inventory` exposes raw, qualified, uncertain, rejected, and microcopy counts separately;
- `contentmd scan --summary` provides a compact, preview-only report and defaults its root to the current directory;
- invoking `contentmd` with no arguments now enters that same safe summary scan, establishing the intended `npx contentmd` golden path;
- human-readable scans emit immediate workspace-selection and shared inventory/parsing/qualification/graph progress on stderr while JSON stdout stays unchanged;
- SIGINT cancellation propagates through the model and filesystem adapter, is checked between bounded inventory/parser units, writes no preview state, and returns the dedicated `cancelled` status/exit code 130;
- npm, pnpm, and Yarn-style declared workspaces are detected; one application is selected automatically, multiple applications require `--workspace`, and undeclared or outside-repository scopes are rejected;
- a scoped application inherits bounded root `CONTENT.md`, `PRODUCT.md`, `DESIGN.md`, and `README.md` context without scanning sibling workspaces;
- `contentmd discover` is preview-only unless `--save` is explicit;
- a 12-case proposed UseMissa adjudication seed covers meaningful interface labels, page titles, assistive names, API errors, punctuation, connector fragments, table headers, and design-system directions/prototype exclusions;
- direct JSX text and interpolations are reassembled into bounded patterns such as `Page {current} of {total}.`; complex expressions are represented as `{value}` and orphaned static fragments are suppressed;
- the summary ranks at most ten initial evidence-linked review findings for errors without evident recovery, warnings without an evident response, generic action labels, and candidates that need more context.
- `contentmd scan --inspect <number-or-id>` resolves a ranked finding back to its qualified expression, classification, source, component, route, rationale, and evidence IDs;
- `contentmd scan --improve <number-or-id>` creates a deterministic, non-mutating improvement brief containing the missing facts and acceptance criteria; it deliberately does not invent replacement copy while context is missing.
- `--context <json-file> --candidate <text>` binds explicit user-supplied facts to the exact finding, compares the candidate with the current expression, and reports missing facts and rule checks;
- adding `--preview-patch` produces a byte-verified, bounded unified diff only when the comparison is ready and the original source span is still current; it does not persist a transaction, expose rollback bytes, change the file, issue a decision, or grant approval.
- `contentmd serve` now compiles the scoped model in memory, starts the loopback-only workbench without requiring `contentmd model`, and leaves `.contentmd/runtime/model.json` absent;
- the workbench now shows the qualified/microcopy/uncertain/rejected inventory and the same bounded top review findings used by the CLI, while retaining origin isolation, CSP, no-store controls, HTML escaping, and read-only WebMCP authority.
- each visual finding now opens as a native disclosure with source, current expression, rationale, labelled required-fact inputs, candidate entry, live comparison status, and an optional verified patch preview;
- the browser action is same-origin JSON-only, bounded to 64 KiB, reuses the core comparison and agent patch-preview functions, returns no rollback bytes, and never persists or applies a change;
- the proofing-desk UI includes a skip link, main landmark target, sequential headings, native details/summary and form controls, fieldset/legend grouping, labelled inputs, live status output, visible focus states, responsive layout, and AA contrast tests for its principal text palette.
- the npm distribution verifier now clean-installs the four-file package, runs the installed no-argument scan, runs local `npx --offline -- contentmd scan --summary`, verifies qualified counts and `write_effect: none`, confirms discovery state remains absent, and verifies clean uninstall;
- `npm pack ./distribution/contentmd --dry-run --json` confirms the candidate contains only `LICENSE`, `README.md`, `dist/contentmd.cjs`, and `package.json` (about 2.1 MB compressed and 12.7 MB unpacked in the current build).
- `contentmd scan --review-sample <1..500> --review-output <file>` now creates a deterministic, stratified, source-bound packet whose reviewer fields are blank and whose output cannot silently overwrite an existing file;
- `contentmd scan --evaluate-review <file>` verifies the packet digest and current source identities, rejects incomplete review as `blocked_by_evidence`, and reports exact agreement, qualification precision/recall, source-layer metrics, mismatches, and recorded reviewer roles without granting authority;
- core and CLI tests cover deterministic sampling, reviewer-blank output, incomplete review, source-change detection, two-role completed evaluation, non-mutation, and overwrite refusal;
- the clean installed-package smoke test also creates and evaluates a synthetic review packet; its fixture reviewer is explicitly not human-review evidence.
- the solo-user improvement path can now apply only an exact, freshly recomputed preview digest after explicit `--yes`; it atomically replaces one source file, verifies readback, reports `write_effect: local_source_mutation`, and records mode-restricted undo material;
- `contentmd undo --transaction <digest> --yes` restores the exact captured bytes only while the applied source digest is still current, verifies readback, and marks the undo record completed;
- failure to persist the undo record rolls the just-applied source change back, while digest mismatch, missing confirmation, source drift, and repeated undo fail closed;
- source tests and the clean installed-package smoke test both prove preview → denied unconfirmed apply → confirmed apply → verified undo → byte-identical restoration.
- the loopback workbench now exposes the same regular-user compare → exact preview → explicit confirmation → verified apply → verified undo actions through same-origin, JSON-only, 64 KiB-bounded endpoints;
- its apply and undo controls are native buttons with an explicit labelled confirmation checkbox and live status output; unconfirmed apply is rejected and WebMCP remains read-only with no mutation route.
- `pnpm verify:release` now checks the version/tag contract, npm version, Node engine, repository identity, public access, binary, and exact four-file `npm publish --dry-run` payload without publishing;
- `.github/workflows/publish-npm.yml` defines a GitHub-hosted, OIDC/provenance-ready release job with minimal permissions, pinned Node/pnpm versions, the complete test/lint/distribution/release gates, and an `npm-production` environment;
- registry inspection on 2026-08-27 returned 404 for `contentmd`; the name is apparently available but unreserved, and the first authenticated publication remains a required bootstrap before the npm package can bind the trusted-publisher workflow.
- the initial complete release run exposed stale Task 4 resolution digests, native Node tests mis-collected by Vitest, and concurrency-only five-second timeouts. The runner now separates Vitest TypeScript suites from native Node-test files and raises the Vitest timeout to 15 seconds;
- bounded Node 24.19 verification now proves 111 foundational core/evaluation/schema tests, 88 adapter/workbench/writer tests, 191 governance/runtime/provider tests, 91 research tests, and all 69 native tests, plus typecheck, lint, 18 package boundaries, the clean-installed distribution journey, and the npm release dry run;
- four live-listener tests skip only for this managed host's exact `listen EPERM` loopback prohibition and remain mandatory on normal hosts and CI;
- the sealed pairwise learning and Task 6 goldens are intentionally bound to exact Node 24.14.0/V8/ICU runtime-profile digests. This host provides Node 24.19.0 and 25.5.0, so those goldens remain an explicit release gate rather than being silently regenerated as part of productization.

The current UseMissa artifact produces this preliminary deterministic baseline:

- 13,476 raw occurrences;
- 3,821 qualified content units;
- 13 uncertain candidates;
- 9,642 rejected candidates, including 9,449 occurrences from explicitly separated demo/prototype layers;
- 3,405 qualified units currently classified as microcopy.

These counts demonstrate separation, not production precision. The proposed 12-case seed currently reports 100% exact disposition agreement, qualification precision, and qualification recall, but it is too small, intentionally stratified, and not a completed independent human review. The review tooling is now executable and tested, but a generated blank packet or synthetic test reviewer cannot prove the 95% production gate. Phase 1 remains incomplete until the adjudicated set is expanded, independently reviewed, false negatives are measured across a representative sample, and precision is reported by source layer and content role.

Verification completed under the repository-supported Node 24.19 runtime:

- workspace TypeScript build/typecheck and lint pass, including all 18 package boundaries;
- core, evaluation, and schemas: 111/111 tests pass;
- filesystem/SDK adapters, workbench, and writer: 88/88 runnable tests pass; three live workbench-listener tests skip on this host's exact loopback prohibition;
- governance, memory, model providers, local runtime, runtime SDK, and web adapter: 191/191 tests pass;
- research: 91/91 tests pass;
- native Node suites: 69/69 tests pass;
- the focused regular-user CLI slice passes 10/10 runnable tests; its one live `serve` listener test skips for the same exact host prohibition;
- the clean installed-package journey and `pnpm verify:release` both pass without publishing.

The complete aggregate suite is not yet truthfully green on this machine. The sealed pairwise learning and Task 6 golden fixtures require the exact Node 24.14.0/V8/ICU tuple, while the available supported runtime is Node 24.19.0. That gate must run in its sealed environment or undergo an explicit governed runtime-profile requalification; it must not be bypassed or described as regular-user evidence.

The host did not expose the accessibility skill's required browser accessibility-tree and keyboard controls. Static semantic, label, landmark, focus-style, same-origin interaction, and contrast checks pass, but live tab-order, focus visibility, screen-reader, zoom, and reflow validation remain open and must not be claimed as completed.
