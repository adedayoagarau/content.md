# content.md Host-Agnostic Repository Intelligence Design

**Date:** 2026-08-25

**Status:** Approved design, pending final specification review

**Product:** `content.md`

**Repository contract:** `CONTENT.md`

**CLI:** `contentmd`

**First live acceptance repository:** Carter

## 1. Context

`content.md` is intended to work like a content-design counterpart to a repository-level design contract: host-agnostic, locally useful, adaptable to an existing codebase, and installable with one command. It should understand the product before it writes for the product.

The approved product behavior is:

1. inspect the repository, product documentation, implementation surfaces, tests, and declared connected sources;
2. identify the product, users, jobs, journeys, states, information architecture, semantic messages, voice, terminology, constraints, governance, and unresolved questions;
3. perform bounded comparative research when a task requires it;
4. generate and maintain an evidence-linked, product-specific `CONTENT.md` contract;
5. use the current IDE model as the intelligent writer when possible;
6. review model output against product evidence and deterministic rules;
7. default to draft, explain, and request approval; and
8. apply content changes automatically only under narrowly pre-approved deterministic rules.

The first retained implementation proved these concepts only on a synthetic JavaScript web application. A live read-only pilot against Carter exposed the gap between the current fixture and the intended product.

### 1.1 Carter pilot evidence

The pilot ran against a disposable committed snapshot of `/Users/aagarau/Desktop/Carter`; the live Carter working tree was not modified.

The current implementation successfully:

- planned adoption without writing;
- created the starter contract and governance records in the disposable snapshot;
- installed a bounded Claude bridge with an integrity receipt; and
- reported local discovery, drafting, and review as allowed while external publication remained denied.

It then failed or produced materially incorrect results:

- `discover` required a root `package.json`, although Carter is Python-first and declares its project through `pyproject.toml`;
- after a disposable package shim, `discover` required root `DESIGN.md` and `PRODUCT.md`, although Carter keeps product authority across `docs/context/PRODUCT-IDENTITY.md`, `PRD.md`, `ARCHITECTURE.md`, ADRs, pilot documents, and Studio code;
- after disposable document shims, the filesystem adapter scanned zero artifacts and found zero occurrences because it only scans `src/**/*.{ts,tsx,json}` and `public/**/*.html`;
- the compiler stated that Carter's primary audience and job were not established, despite explicit canonical product evidence; and
- the compiler could not represent the conflict and supersession relationship between older draft product statements and current Figma-first/GCH doctrine.

This design closes those gaps without making Carter-specific filenames or PayPal-specific rules part of the portable core.

## 2. Goals

### 2.1 Product goals

- Support ordinary existing repositories without requiring Node, root `package.json`, `PRODUCT.md`, or `DESIGN.md`.
- Detect mixed-stack and nested-workspace repositories.
- Discover product documentation and implementation sources without granting them authority merely because they exist.
- Extract user-facing content with exact file coordinates and semantic context.
- Build a provisional content model whose claims retain evidence, scope, confidence, lifecycle, and conflicts.
- Generate a concise, useful `CONTENT.md` and detailed structured records.
- Give the current IDE model a bounded, verified writing packet rather than a broad repository dump.
- Provide a local task-first visual sidecar for understanding, review, approval, and verification.
- Keep installation, discovery, and deterministic modeling local and network-independent.
- Preserve preview, approval, readback, rollback, and audit boundaries.

### 2.2 First acceptance goals

For Carter, without invented root files, `content.md` must:

- detect a Python/FastAPI root and nested Next/React Studio;
- identify Carter as a Figma-first checkout content-design product;
- identify checkout content designers as its primary users;
- reconstruct the documented Explore → Analyze → Review → Deliver → Track workflow plus Library and Flow;
- distinguish canonical product identity and current ADRs from older drafts and superseded delivery paths;
- inventory Studio routes, visible copy, assistive copy, metadata, catalogs, and relevant tests;
- exclude generated outputs, private data, caches, credentials, and irrelevant corpus artifacts;
- produce an evidence-linked provisional product/content model;
- present provisional voice, persona, journey, and message guidance for review; and
- complete one real, governed Studio content task from context through verified readback.

## 3. Non-goals

- Inferring organizational authority from filenames, repository presence, ownership rosters, or code authorship.
- Claiming that implemented code is deployed or that repository text is observed live.
- Treating competitor wording as a voice source, approved example, prompt label, or reusable expression.
- Uploading or indexing a repository by default.
- Reading credentials, unapproved private data, generated corpus dumps, model secrets, or ignored directories.
- Supporting every programming language in the first release. Unsupported surfaces must be reported, not silently skipped.
- Replacing product managers, content owners, legal review, accessibility specialists, localization review, or release approvers.
- Automatically publishing content or widening learning scope.
- Making the optional sidecar a second source of truth or a hosting dependency.

## 4. Options considered

### 4.1 Carter-specific path and filename rules

Add `pyproject.toml`, Carter documentation paths, and `studio/app` to the current scanner.

**Advantages:** fastest route to a Carter demo.

**Rejected because:** it moves fixture assumptions rather than removing them, does not generalize, and would make every new repository another exception list.

### 4.2 Host-agnostic repository intelligence

Create a deterministic repository inventory, stack detector, source-candidate catalog, adapter federation, evidence-claim layer, contextual authority resolver, and provisional model compiler.

**Advantages:** portable, testable, evidence-preserving, extensible, and aligned with the existing adapter and content-graph architecture.

**Decision:** approved.

### 4.3 Model-first whole-repository interpretation

Send broad repository context to an LLM and ask it to infer the product.

**Advantages:** superficially flexible and fast to prototype.

**Rejected because:** nondeterministic coverage, unsafe context expansion, weak provenance, high leakage risk, provider dependence, and no reliable distinction between source presence and authority.

## 5. Design principles

1. **Inventory before inference.** The system first establishes what it read and what it did not read.
2. **Authority is contextual.** There is no universal ranking in which one filename always wins.
3. **Evidence classes remain separate.** Documented, implemented, tested, observed, and approved are not synonyms.
4. **Provisional by default.** Generated guidance is reviewable and cannot approve itself.
5. **Deterministic core, bounded model assistance.** File selection, parsing, identity, provenance, policy, and verification remain deterministic.
6. **Host-neutral contracts.** Adapters can differ; the evidence and model contracts do not.
7. **No silent omission.** Unsupported or excluded surfaces appear in coverage and warning records.
8. **Small always-loaded contract.** `CONTENT.md` links to structured detail instead of becoming a repository dump.
9. **Task-first value.** Setup is complete only when the system can perform a real governed content task.
10. **One approval cannot imply another.** Local adoption, model egress, mutation, publication, and learning promotion remain separate capabilities.

## 6. Architecture overview

```text
authorized repository root
  -> repository boundary and exclusion policy
  -> deterministic file and manifest inventory
  -> stack/workspace detection
  -> source-candidate classification
  -> stack and document adapters
  -> content occurrences + evidence claims
  -> contextual authority and conflict analysis
  -> provisional content-model records
  -> concise CONTENT.md projection
  -> task packet for the current IDE model
  -> critique, diff, approval, apply, readback
```

The existing `ContentAdapter`, content graph, task packet, prompt compiler, governance, provider, and verification boundaries remain. This work replaces hard-coded project loading and broadens discovery through versioned contracts rather than adding a parallel product model.

## 7. Repository boundary and inventory

### 7.1 Authorized root

Every operation receives an explicit repository root or resolves it from the current VCS/workspace boundary. The resolved root is canonicalized once. Symlinks that escape it are rejected or recorded as excluded.

Discovery never reads a home directory, sibling repository, parent directory, remote origin, credential store, environment file, or connected service unless a separate adapter grant authorizes that exact resource.

### 7.2 Default exclusions

The default local exclusion policy includes:

- VCS metadata contents beyond the minimum repository-boundary check;
- `.env`, credential, key, token, secret, and private-key patterns;
- `node_modules`, virtual environments, build outputs, coverage, caches, temporary files, and dependency stores;
- `data/`, `outputs/`, generated corpora, model caches, browser profiles, and large binary artifacts unless explicitly included for a declared evidence purpose;
- `.contentmd/cache`, `.contentmd/local`, and `.contentmd/runtime`; and
- user-configured ignore patterns.

Repository ignore files inform discovery but do not silently widen it. Explicit content.md exclusions win over an inclusion elsewhere.

### 7.3 Repository inventory

The inventory is a content-addressed local record containing:

- repository identity proposal;
- resolved root;
- detected manifests and workspaces;
- file inventory by safe type and size class;
- adapter candidates;
- exclusions with reason codes;
- unsupported files or surfaces;
- bytes read and resource ceilings;
- inventory digest; and
- authority effect `none`.

The inventory stores paths and digests by default. Raw contents are read only by the selected adapter and are not copied into the inventory.

### 7.4 Project identity

Project identity is not derived exclusively from `package.json` or an absolute filesystem path.

During first adoption, the initializer proposes a portable project slug from, in order:

1. an existing valid `.contentmd` project record;
2. an unambiguous root project manifest name;
3. an unambiguous workspace aggregate name; or
4. the repository directory basename.

The proposed identity is shown in the adoption preview and becomes stable only when the user approves the local adoption transaction. Later path changes do not change the approved project ID.

## 8. Stack and workspace detection

Detection is a registry of small, deterministic detectors. A detector reports evidence and confidence; it does not invoke package managers or execute project code.

Initial detectors include:

- JavaScript/TypeScript: `package.json`, workspace files, Next, React, Vite, and common localization packages;
- Python: `pyproject.toml`, `setup.cfg`, `setup.py`, FastAPI, Flask, Django, Jinja, and common localization layouts;
- static web: HTML and common template files;
- documentation: Markdown, MDX, ADR layouts, YAML, and JSON product/configuration documents; and
- generic repository instructions and content catalogs.

The detector contract supports future Go, Rust, Java/Kotlin, Ruby, Swift, native mobile, CMS, and design-system adapters without changing the core evidence model.

Mixed repositories return multiple stack facts. A nested Next application inside a Python repository is a normal result, not a conflict.

No detector may:

- install dependencies;
- execute scripts;
- import target code;
- access the network;
- read environment values; or
- claim that a detected framework is deployed.

## 9. Source-candidate discovery

### 9.1 Source candidates

The initializer and model workflow no longer load exactly two required files. They create a catalog of source candidates.

Each source candidate records:

- stable source ID;
- repository-relative locator and optional coordinates;
- source type;
- content digest;
- detected status language and document date when present;
- detected owner declaration when present;
- product, service, market, locale, surface, and version scope when present;
- discovery reason;
- adapter ID and version;
- lifecycle proposal;
- evidence class;
- limitations; and
- authority effect `none`.

### 9.2 Candidate source classes

Initial source classes include:

- agent instructions;
- product identity and product brief;
- PRD and version scope;
- architecture and service documentation;
- ADR or decision record;
- design-system guidance;
- policy and governance record;
- voice, terminology, accessibility, or localization guidance;
- journey, IA, flow, and research document;
- source implementation;
- route or navigation definition;
- message/localization catalog;
- schema or API contract;
- test or evaluation artifact;
- generated report;
- historical/superseded document; and
- declared connector metadata.

Filenames help discover a candidate. They do not determine its authority.

## 10. Evidence and authority model

### 10.1 Evidence classes

Every claim uses one or more independent evidence classes:

| Evidence class | What it establishes | What it does not establish |
| --- | --- | --- |
| `documented` | A source states a claim | Implementation, observation, or approval |
| `implemented` | Source code/configuration represents behavior or expression | Deployment or live observation |
| `tested` | A test asserts or exercises behavior | Production use or current approval |
| `observed` | A bounded observation saw behavior at a time and scope | General policy or organization-wide truth |
| `approved` | A qualified approval record authorizes a scoped decision | Broader scope or perpetual validity |
| `historical` | A prior source records past intent or behavior | Current applicability |

The system never collapses these into a single truth flag.

### 10.2 Claim kinds

Authority resolution depends on the claim kind:

- product identity and intended users;
- product/version scope;
- architectural decision;
- organizational policy;
- implemented behavior;
- live behavior;
- content expression;
- voice or terminology guidance;
- approval or publication authority; and
- outcome or research finding.

For example, code is strong evidence for an implementation claim but weak evidence for an organizational policy claim. A current observed UI is strong evidence for a scoped live-expression claim but cannot approve that expression.

### 10.3 Lifecycle and applicability

Sources and claims may be proposed as:

- `canonical`;
- `active`;
- `draft`;
- `historical`;
- `superseded`;
- `rejected`; or
- `unknown`.

The resolver considers explicit status language, dated decisions, supersession links, exact scope, and conflicts. It emits an assessment; it does not rewrite the source.

### 10.4 Conflict handling

When applicable sources disagree, the model records:

- the conflicting claims;
- their source spans and evidence classes;
- their respective scopes and dates;
- any explicit supersession relationship;
- the proposed resolution and confidence; and
- the smallest owner question when resolution is not justified.

Unresolved conflicts remain visible in `CONTENT.md` when material to current work and in structured evidence records in all cases.

### 10.5 Approval boundary

No repository source becomes an approval merely because it says “approved” or “canonical.” Organizational authority requires a configured, qualified approval source or explicit local user decision whose scope is recorded. A canonical document can guide provisional modeling without authorizing mutation or publication.

## 11. Adapter federation

### 11.1 Adapter responsibilities

Adapters receive a bounded list of inventory artifacts. They emit typed artifacts and never independently decide product truth.

Initial adapters are:

1. repository and stack inventory;
2. Markdown/MDX/ADR and structured-document extraction;
3. TypeScript/JavaScript/React/Next content and route extraction;
4. Python/FastAPI/template content and route extraction;
5. HTML and static metadata extraction;
6. JSON/YAML/message-catalog extraction;
7. test and behavioral-evidence extraction; and
8. host-instruction bridge management.

### 11.2 Common output

Every discovery adapter returns:

- adapter identity and version;
- exact scanned artifacts;
- exact skipped artifacts and reasons;
- warnings and unsupported constructs;
- content occurrences;
- source candidates;
- evidence claims;
- route/IA facts when supported;
- resource use; and
- a deterministic result digest.

### 11.3 Content occurrences

The occurrence contract expands beyond the current web-only syntax set. Each occurrence includes:

- exact file coordinates;
- syntax kind and parser identity;
- expression payload or safe reference to a catalog value;
- locale, channel, and modality when established;
- route, component, template, endpoint, or message-key context;
- variable/interpolation structure;
- visibility classification;
- confidence and limitations;
- source digest; and
- authority effect `none`.

Adapters distinguish likely user-facing content from logging, test fixture data, developer diagnostics, comments, internal identifiers, and arbitrary string literals.

### 11.4 Deterministic and model-assisted extraction

Deterministic parsers establish files, coordinates, syntax, references, routes, and explicit metadata.

A model may assist with semantic interpretation only after deterministic inventory. Model-assisted claims must:

- cite existing source IDs and bounded spans;
- use a versioned output schema;
- state confidence and uncertainty;
- remain proposed;
- avoid raw excluded content;
- pass reference and scope validation; and
- never assign approval or publication authority.

When no provider or IDE model is available, deterministic discovery and a partial provisional model still complete, with explicit open questions.

## 12. Provisional content model

### 12.1 Model domains

The compiler projects evidence into versioned records for:

- product, service, actor, audience, affected party, and job;
- journey, stage, event, state, behavior, consequence, and recovery;
- channel, surface, route, component, locale, market, jurisdiction, and risk;
- IA node, information object, navigation relation, and taxonomy;
- semantic message, expression slot, expression version, implementation occurrence, variable, and term;
- voice principle, tone policy, contextual voice profile, and content pattern;
- evidence, conflict, open question, decision, approval, implementation, verification, and outcome; and
- adapter, capability, policy, grant, change transaction, and audit event.

The graph remains a projection over records, not the only persistence format.

### 12.2 Record status

Generated records begin as `proposed`. Users or configured review workflows may transition them to:

- `reviewed`;
- `approved`;
- `rejected`; or
- `superseded`.

Status transitions are append-only decisions. Regeneration cannot overwrite an approved record silently; it produces a proposed successor with an explicit diff.

### 12.3 Confidence

Confidence is multi-part rather than one opaque score:

- coverage confidence;
- extraction confidence;
- source applicability confidence;
- conflict status;
- freshness status; and
- authority status.

Low confidence may still be useful guidance, but it is labeled and cannot satisfy a hard evidence or approval requirement.

## 13. Generated `CONTENT.md`

`CONTENT.md` is the concise always-loaded projection. It contains:

- product purpose and scope;
- primary audiences and jobs;
- core journey and content principles;
- short voice and terminology guidance;
- product behavior and content constraints material to common work;
- source and evidence hierarchy;
- operating boundaries;
- approval and specialist-review routes;
- known risks and material unresolved questions; and
- links to structured `.contentmd` records.

It does not contain:

- complete inventories;
- raw research dumps;
- large occurrence lists;
- private context;
- model traces;
- generated reports; or
- claims presented as approved when only proposed.

The initial contract clearly labels provisional sections. Users can review, revise, or lock guidance. When approved structured records change, content.md proposes a `CONTENT.md` update with evidence and diff; it does not silently rewrite approved guidance.

## 14. Voice, tone, persona, and visual guidance

### 14.1 Voice profile

The product may synthesize a provisional voice profile from qualified project-owned evidence, current approved guidance, and representative product expressions. Competitor evidence may inform structural patterns and category expectations but may not define or imitate the product's voice.

Voice is presented as contextual dimensions such as:

- direct ↔ diplomatic;
- concise ↔ explanatory;
- restrained ↔ expressive;
- institutional ↔ conversational;
- reassuring ↔ urgent; and
- literal ↔ evocative.

Each dimension includes:

- context and applicable states;
- evidence refs;
- confidence;
- examples only when rights and authority permit;
- counterconditions;
- status; and
- review/lock controls.

Hard truth, safety, accessibility, autonomy, policy, and product-behavior constraints remain authoritative over voice fit.

### 14.2 Personas

Personas are evidence-based job/context models, not invented demographic stories. A persona card contains:

- actor and job;
- context and trigger;
- goal;
- stakes and consequences;
- knowledge and uncertainty;
- accessibility, language, and cognitive constraints when evidenced;
- relevant journey states;
- evidence and confidence; and
- unresolved questions.

### 14.3 Visual sidecar

The optional local sidecar renders the same records used by CLI and IDE integrations. It does not maintain a private parallel model.

Its default task-first layout is:

| Task and context | Proposal and diff | Evidence and control |
| --- | --- | --- |
| Request, surface, state, constraints, acceptance criteria | Alternatives, recommendation, explanation, exact diff | Sources, voice, confidence, conflicts, approve/revise/reject |

Secondary views expose product understanding, journeys, IA, messages, voice/personas, evidence, decisions, verification, adapters, and governance.

The sidecar must always answer:

- why the system believes something;
- which source or decision supports it;
- what remains uncertain;
- what it proposes to do;
- what would change; and
- what authority is missing.

## 15. IDE-agent handoff

### 15.1 Host bridge

The initializer detects supported instruction hosts and proposes bounded marker blocks for AGENTS-compatible tools, Claude, Codex, Gemini, and Copilot. A bridge:

- instructs the host to load `CONTENT.md` for material content work;
- routes the host to relevant structured records;
- triggers at most one concise reminder per task when the contract is missing;
- states that proposals do not grant mutation or publication authority;
- has an exact preview and receipt;
- does not overwrite surrounding instructions; and
- is independently removable.

### 15.2 Current IDE model as writer

The current IDE model can perform the intelligent writing step without requiring content.md to own a provider credential.

For a material task, the host:

1. asks content.md to prepare a `ContentTaskPacket` and bounded context packet;
2. receives only verified project facts, approved or explicitly provisional guidance, applicable patterns, findings, uncertainty, and task constraints;
3. drafts alternatives in the required output schema;
4. returns them to content.md for deterministic validation and critique;
5. presents evidence, rationale, uncertainty, trade-offs, and a previewable diff; and
6. records the user's approve, revise, reject, or abstain decision.

The task packet includes product behavior, audience/job, journey/state, intended outcome, semantic message, required facts, prohibited claims, consequence, recovery, channel, locale, voice, terminology, risk, evidence, decision status, and acceptance criteria.

The model cannot:

- expand its own context scope;
- treat its draft as evidence;
- approve its output;
- authorize an adapter;
- publish;
- promote learning; or
- weaken a hard constraint.

### 15.3 Provider adapters

Configured direct model providers remain optional. They use the same task packet, context validation, egress policy, output schema, critique, and decision flow as the IDE-model path. This preserves provider neutrality.

## 16. One-command adoption

### 16.1 User experience

```bash
npx contentmd init
```

If `npx` must obtain the content.md distribution from a package registry, that package-manager fetch is a separate, user-invoked installation action. A locally installed, cached, or IDE-bundled distribution runs the same command without network access. Once the content.md process starts, repository inventory, adoption, deterministic modeling, and bridge installation perform no network request.

The interactive command:

1. resolves the authorized repository root;
2. runs deterministic inventory and stack/source detection read-only;
3. shows the proposed project identity, exclusions, authority candidates, starter contract, structured files, and all host-bridge diffs;
4. requests one local adoption approval;
5. writes only the approved `CONTENT.md`, `.contentmd` records, and marker-bounded bridges;
6. records receipts;
7. builds the initial provisional model; and
8. offers to open the local sidecar.

No write occurs before approval. Network access remains disabled unless separately requested and authorized.

### 16.2 Non-interactive use

Non-interactive adoption requires both:

- an explicit approval flag; and
- the exact current adoption-plan digest.

If files or the plan change, the transaction fails and requires a new preview. `--yes` alone must not approve an unseen or changed plan.

### 16.3 Ownership and uninstall

The installer owns only:

- `CONTENT.md` when it created it;
- `.contentmd` managed records and directories; and
- exact marker-bounded host bridge blocks.

Existing product/design documents and surrounding host instructions remain user-owned. Uninstall previews and removes only receipt-backed installer-owned artifacts. User edits or conflicts stop automatic removal and require review.

### 16.4 Existing contracts

If `CONTENT.md` already exists, init does not replace it. The system inventories it as an evidence and contract source, validates compatibility, and proposes additive structured records or a reviewed migration.

## 17. Task lifecycle

The default material-content lifecycle is:

```text
request
  -> classify task and risk
  -> select product context and evidence
  -> surface missing or conflicting facts
  -> create ContentTaskPacket
  -> current IDE model or configured provider drafts
  -> deterministic and specialist critique
  -> alternatives + rationale + uncertainty + diff
  -> human approve / revise / reject / abstain
  -> capability and policy recheck
  -> apply only approved change
  -> independent readback and contextual verification
  -> decision and audit record
  -> optional scoped learning candidate
```

When content.md identifies an issue, its default is draft + explain + approval. Automatic edits are permitted only when a current policy explicitly identifies a deterministic rule, scope, resource, and verification requirement.

## 18. Carter end-to-end acceptance journey

The first live proof uses Carter but does not encode Carter-specific behavior in the core.

### 18.1 Adoption

From Carter root, the user runs `npx contentmd init`.

The preview must show:

- Python project identity from `pyproject.toml`;
- nested Next/React Studio from `studio/package.json` and `studio/app`;
- candidate authority sources including Product Identity, PRD, architecture, ADRs, pilot documents, and agent instructions;
- generated/output/private exclusions;
- proposed `CONTENT.md` and structured records;
- Claude bridge diff; and
- external publication and remote write denied.

### 18.2 Initial model

The provisional model must identify:

- Carter's product purpose;
- checkout content designers as the primary actor;
- lead, product-design, Legal Review, and engineering relationships without conflating their authority;
- the Figma-first workflow;
- Explore, Analyze, Review, Deliver, Track, Library, and Flow surfaces;
- Figma, program knowledge, Legal Review, and GCH boundaries;
- current and superseded doctrine;
- relevant Studio routes and implementation occurrences;
- evidence gaps and conflicts; and
- provisional voice/persona/journey guidance.

### 18.3 First real task

The user selects one bounded Studio content issue, such as an empty, error, or recovery state.

The system must:

1. locate the implemented occurrence and route;
2. establish the applicable product behavior and journey state;
3. retrieve relevant project evidence and approved patterns;
4. create a bounded task packet;
5. use the current IDE model to draft alternatives;
6. critique truth, recovery, accessibility, terminology, voice, and task fit;
7. show explanation, evidence, uncertainty, and exact diff;
8. require approval;
9. apply only the approved target; and
10. independently read back and verify the result.

### 18.4 Pass conditions

- No Carter `outputs/`, `data/`, credentials, caches, or unrelated dirty files are read or changed.
- No network or external connector is used without separate approval.
- No Figma, ECM, GCH, GitHub, Confluence, or publication write occurs.
- Existing Carter instructions remain intact outside the bridge markers.
- Product facts and current doctrine are materially correct and evidence-linked.
- The first content task reaches a human decision and verified local result.
- Uninstall can preview all installer-owned artifacts exactly.

## 19. Failure and refusal behavior

Failures are typed, evidence-preserving, and actionable.

| Failure | Required behavior |
| --- | --- |
| No supported manifest | Propose basename identity, continue bounded generic discovery, report reduced confidence |
| Unsupported language/surface | Record unsupported coverage; do not claim complete inventory |
| Conflicting product sources | Preserve both claims, propose resolution only with evidence, otherwise ask owner |
| Missing product behavior | Stop writing when behavior changes meaning; return `product_behavior_unknown` |
| Missing approval | Permit preview/draft as policy allows; deny apply/publication |
| Source changes after preview | Invalidate plan or diff and require re-preview |
| Model output lacks citations or violates schema | Reject as inadmissible; preserve safe evidence |
| Excluded/private source encountered | Skip, record reason without exposing bytes |
| Resource ceiling reached | Return partial coverage and exact continuation point |
| Adapter parser failure | Record file-level failure; do not silently mark file scanned |
| Sidecar unavailable | Continue through CLI/IDE using the same records |
| No model available | Complete deterministic inventory/model and return bounded open questions |
| Verification fails after apply | Stop, preserve receipt, offer rollback or manual resolution |

The smallest safe next action accompanies every blocked result.

## 20. Security, privacy, and rights

- Repository scanning is local and read-only until a reviewed mutation transaction.
- Ignore and exclusion policy is evaluated before file reads where possible.
- Raw credentials, environment data, private model context, browser profiles, and excluded corpora never enter prompts.
- Prompt egress uses explicit data classes and exact item digests.
- Public comparative research stays structurally abstracted; protected expressions and third-party wording are quarantined from writing context.
- Model output is untrusted data and cannot call tools directly.
- All mutations pass policy and capability checks at orchestration and adapter boundaries.
- Audit records minimize raw content and retain exact scope, decision, and receipt links.
- Memory promotion never widens project, organization, or public scope automatically.

## 21. Determinism and performance

- Inventory, adapter selection, parsing, identity, digests, source classification, exclusions, graph projection, hard rules, diffs, and verification are deterministic.
- Model-assisted semantic claims are separately identified and reproducible from their exact bounded context and model receipt where available.
- Files are cached by path, content digest, adapter version, and policy digest.
- A clean rerun does not reparse unchanged artifacts.
- Partial results remain content-addressed and resumable.
- Large repositories enforce configurable file, byte, time, and occurrence ceilings.
- Results report scanned, skipped, unsupported, failed, and deferred counts.

## 22. Compatibility and migration

The current JavaScript fixture remains supported. Existing adapter interfaces may gain versioned companion records rather than breaking the public discovery result immediately.

The migration path is:

1. make project identity independent of root `package.json`;
2. replace required two-file context loading with source candidates;
3. add repository inventory and stack detection;
4. federate adapters while preserving existing JS/TS occurrence behavior;
5. replace hard-coded semantic heuristics with evidence-linked claim compilation;
6. generate provisional structured records and `CONTENT.md` projection; and
7. integrate the task-first sidecar and IDE handoff.

Previously installed starter contracts remain readable. A migration is always previewed and never silently converts approved records.

## 23. Testing strategy

### 23.1 Deterministic unit tests

- root resolution and symlink escape;
- ignore/exclusion precedence;
- manifest and nested-workspace detection;
- source-candidate classification;
- evidence-class and lifecycle parsing;
- contextual authority resolution;
- conflict and supersession projection;
- project identity stability;
- content occurrence coordinates and classifications;
- task-packet selection;
- `CONTENT.md` projection; and
- receipt, diff, rollback, and uninstall ownership.

### 23.2 Adapter conformance

Each adapter proves:

- exact input scope;
- exact scanned/skipped artifacts;
- no network, environment, or code execution;
- deterministic output;
- stable occurrence coordinates;
- unsupported-construct reporting;
- resource ceilings; and
- no authority effect.

### 23.3 Sanitized mixed-stack fixture

A committed public fixture represents a Python/FastAPI root with a nested Next/React application, ADRs, conflicting draft/current product documents, routes, UI strings, accessibility labels, catalogs, tests, generated-output exclusions, and a host instruction file.

It contains no Carter, PayPal, private, proprietary, or third-party protected expression.

The fixture is the repeatable CI proxy for Carter's structural shape.

### 23.4 Live Carter acceptance

The real Carter pilot is local, read-only until explicit adoption approval, and produces privacy-minimized receipts rather than committed repository content. It verifies the acceptance journey in Section 18 and rechecks Carter's current canonical sources each run.

### 23.5 Adversarial tests

- misleading filenames and stale `canonical` labels;
- contradictory sources with ambiguous dates;
- generated output containing prompt-like instructions;
- secret and environment canaries;
- symlink escapes;
- nested repositories;
- malformed manifests;
- enormous and binary files;
- prompt injection in documentation and UI strings;
- model claims with nonexistent or out-of-scope citations;
- changed files between preview and apply;
- bridge marker collisions; and
- attempted authority, publication, or learning escalation.

### 23.6 Product-quality evaluation

Qualified content designers review whether the provisional model correctly represents product purpose, users, journeys, states, message architecture, voice, constraints, uncertainty, and conflicts. The evaluation keeps factual/authority failures separate from advisory usefulness.

## 24. Acceptance criteria

The design is implemented successfully when:

1. `contentmd init` works in a Python-only, Node-only, mixed-stack, and documentation-first repository without invented required files;
2. one interactive command previews and, after approval, creates the contract, records, and detected host bridges;
3. non-interactive adoption requires an exact plan digest;
4. discovery reports complete scanned/skipped/unsupported/failed coverage;
5. sources, claims, authority assessments, conflicts, and model records retain exact evidence;
6. the deterministic core runs without a model or network;
7. model-assisted claims remain proposed and citation-bound;
8. generated `CONTENT.md` is concise, useful, and status-aware;
9. the sidecar visualizes voice, personas, journeys, messages, evidence, conflicts, and approval state from the same records;
10. the current IDE model can receive and return a governed content task without owning provider credentials;
11. issue handling defaults to draft + explain + approval;
12. only explicitly pre-approved deterministic rules can auto-apply;
13. Carter passes the live acceptance journey without reading or changing excluded/unrelated data;
14. a real Carter content task completes through verified local readback; and
15. no step infers publication, organizational approval, live deployment, or learning authority.

## 25. Delivery boundary

This specification authorizes implementation planning, not implementation itself.

The implementation plan must:

- preserve existing public contracts unless it defines a reviewed migration;
- use test-driven development;
- begin with the sanitized mixed-stack fixture and exact Carter pilot failures;
- separate deterministic inventory from model-assisted interpretation;
- keep Carter-specific doctrine out of portable source code;
- avoid touching unrelated corpus, taxonomy, research, or generated-output work;
- define an independent verification pass before the live Carter pilot; and
- stop before any Carter mutation until its exact adoption plan is separately approved.
