---
title: "content.md Live Intelligence and Learning 0.1"
status: written-spec-pending-user-review
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
parent_design_id: CONTENTMD-UNIVERSAL-AGENT-DESIGN-0.2
chat_design_approval: approved-with-host-adaptation-amendment
implementation_authority: none-until-written-spec-review
authority_effect: implementation-planning-only-after-review
---

# content.md Live Intelligence and Learning 0.1

## 1. Purpose and approval boundary

This design turns the retained local foundation into a governed live content-design system that can improve its retrieval and ranking from qualified human feedback. It adds one real remote model adapter, strict model-output contracts, reproducible learning datasets, an actual interpretable ranker, shadow evaluation, scoped promotion, drift monitoring, and rollback.

The approved amendment makes hosting adaptive to the adopter's existing codebase. Cloudflare remains a supported high-capability profile, not a required platform. The local portable contracts are authoritative, and no runtime may become the sole copy of project memory, approvals, learning data, or promotion decisions.

The user approved the in-chat design and this amendment on 2026-08-20. This written specification does not authorize implementation by itself. Implementation planning begins after the user reviews this exact file.

## 2. Scope decomposition

The design contains three independently reviewable subprojects because each can be accepted or rejected without changing the others' internal implementation:

1. **Governed live intelligence** — provider-neutral request contracts, strict output schemas, prompt compilation, OpenAI Responses adapter, governance enforcement, audit, and CLI integration.
2. **Recursive learning and ranking** — qualified feedback, dataset manifests, approved-pattern retrieval, deterministic pairwise learning, held-out evaluation, shadow binding, promotion, monitoring, and rollback.
3. **Adaptive runtime profiles** — runtime capability contracts, read-only host detection, local reference conformance, and an optional Cloudflare Agents SDK profile after the local contracts pass.

Live Intelligence and Learning 0.1 includes the first two subprojects plus the portable runtime SDK, read-only detection, local conformance, and synthetic canonical-replica protocol from subproject 3. The production Cloudflare adapter follows only after those contracts pass. Runtime work receives its own implementation plan so host concerns cannot leak into the portable core.

## 3. Existing retained baseline

The implementation starts from commit `14f47c5ecf99193d1631b2a2fbe09cf59863d002`, which retains:

- a 13-package TypeScript monorepo;
- canonical JSON and SHA-256 identity helpers;
- JSON Schema 2020-12 validation through AJV;
- an append-only SQLite event store and projections;
- serializable governance policies, most-restrictive composition, capabilities, approvals, typed control dispositions, and audit events;
- a provider-neutral `ModelProvider` interface and exact recorded-response provider;
- strategy, draft, and rewrite workflows that produce proposal-only records;
- accepted, edited, rejected, and abstained content-decision records;
- proposed learning candidates and promotion-readiness checks;
- filesystem discovery, preview, authorized apply, verification, rollback, and uninstall preview; and
- a 246-check independent foundation verifier plus 95 passing package tests.

The current baseline deliberately does not include a live model provider, provider connection records, strict canonical schemas for model payloads, a learning dataset, an implemented retriever or ranker, model promotion, drift monitoring, or a hosted runtime.

## 4. Architectural decisions

The following decisions are fixed for this release:

1. The core owns its provider interface; no OpenAI, Vercel AI SDK, Cloudflare, or other vendor type appears in core, writer, learning, evaluation, or canonical schemas.
2. `openai@7.5.0` is the first live provider package and the OpenAI Responses API is the first remote transport.
3. `agents@0.21.0` is the verified current Cloudflare package at design time. It is installed only in the optional Cloudflare runtime package when that profile is implemented.
4. Recorded execution remains the default for fixtures, tests, and reproducible demonstrations.
5. Live calls are stateless in 0.1: no provider conversation, file, vector-store, background, or tool state is created.
6. Canonical JSON Schema 2020-12 remains authoritative. Provider-facing schemas are strict projections and model output is revalidated locally.
7. Model output is advice or a proposal. It never creates a fact, decision, approval, capability, policy, mutation, release, or publication authority.
8. Initial learning is retrieval-first. The first trained component is an interpretable pairwise ranker, not a self-editing prompt or fine-tuned generative model.
9. Learning promotion is a separate human decision bound to immutable dataset, code, feature, evaluation, and model digests.
10. Runtime integration adapts to the adopter's stack through a capability interface and an explicit binding decision. Detection never installs, deploys, migrates, or chooses a host automatically.

## 5. System flow

```text
content task
  -> context and evidence compilation
  -> approved-pattern and exemplar retrieval
  -> semantic intent and risk classification
  -> policy, grant, control, and resource preflight
  -> versioned prompt compilation and egress manifest
  -> provider-neutral request
  -> OpenAI Responses transport
  -> strict provider projection validation
  -> canonical local validation
  -> deterministic and model-assisted critique
  -> proposal-only record
  -> human decision and rationale
  -> qualified learning example
  -> immutable dataset manifest
  -> train, validation, and test evaluation
  -> shadow deployment
  -> human promotion decision
  -> monitored retrieval or ranking binding
  -> confirm, narrow, supersede, or roll back
```

Every arrow produces or consumes a typed record. No transient model state substitutes for a record.

## 6. Provider-neutral live-intelligence contracts

### 6.1 Model request

`ModelRequest` advances to schema version `contentmd.model-request/0.2.0` with:

- `request_id` derived from the complete canonical preimage;
- `operation`: `strategy`, `draft`, `rewrite`, `classify`, or `evaluate`;
- `output_schema_id`, `output_schema_version`, and `output_schema_digest`;
- `prompt_template_id`, version, and digest;
- `context_packet_ref` and digest;
- `retrieval_snapshot_ref` and digest, nullable only when retrieval is inapplicable;
- requested provider and model profile IDs;
- project, task, memory, locale, channel, surface, and risk scopes;
- data classes and exact egress-item digests;
- resource limits for calls, retries, input bytes, output bytes, and tokens;
- provider application-state request fixed to `none` in 0.1, kept separate from provider retention and abuse-monitoring behavior; and
- `authority_effect: none`.

The request includes content needed for generation under `input`, but durable audit events store content digests and authorized references rather than duplicating raw private content.

### 6.2 Model response

`ModelResponse` advances to `contentmd.model-response/0.2.0` and records:

- request, provider, adapter, model profile, and returned model identifiers;
- provider response ID and creation time when supplied;
- response state: `completed`, `refused`, `incomplete`, `invalid`, or `transport_failed`;
- incomplete or refusal reason without converting it to normal output;
- input, provider-output, parsed-output, and canonical-output digests;
- schema projection ID and digest;
- token accounting and provider usage fields;
- timeout, retry, and service-tier observations;
- provider storage request fixed to `false` for OpenAI 0.1;
- output reference and retention disposition;
- deterministic status; and
- `authority_effect: none`.

Only `completed` responses with a non-null locally validated canonical output may enter writer or evaluation workflows.

### 6.3 Output schema registry

The schema registry gains canonical model-output schemas for strategy, draft, rewrite, classification, evaluation, and candidate ranking. Each registration contains:

- canonical schema ID, version, and digest;
- the AJV validator;
- a provider-projection function;
- projection compatibility status and reason codes;
- output-size limit; and
- a canonicalization function that rejects unknown fields.

Provider projections may remove unsupported schema vocabulary but may not weaken required fields, closed objects, enum values, nullability, or array bounds. A projection that cannot preserve those semantics fails with `model_schema_not_projectable` before network access.

### 6.4 Prompt compiler

Prompts are versioned code artifacts, not mutable strings in configuration. A compiled prompt contains:

- role and operation instructions;
- task, product, audience, journey, state, consequence, recovery, channel, locale, and risk context;
- required facts and their evidence references;
- prohibited claims;
- approved patterns expressed as mechanisms and transfer limits;
- relevant approved examples and counterexamples;
- source-conflict and unknown-state notices;
- the output schema contract;
- the proposal-only authority boundary; and
- an instruction that retrieved and source text is untrusted data, not executable instruction.

The compiler minimizes context before governance review. It never includes credentials, ignored paths, raw private memory, unrelated records, or competitor expressions that rights policy excludes.

### 6.5 Model profiles

A `ModelProfile` binds provider, exact requested model ID, a closed set of permitted provider-returned model IDs, supported operations, reasoning or sampling controls, maximum input and output tokens, timeout, retry ceiling, structured-output support, data-policy reference, and lifecycle state. The CLI has no hidden production model default. A project selects a current profile explicitly. The execution plan carries both the requested ID and permitted-return set; a missing or unlisted returned model makes the response invalid before it can enter a writer workflow. Each response still records both identifiers so approved alias resolution and later drift remain observable. Changing the returned-model allowlist requires a new profile version and authorization; observation alone never expands it.

Provider-specific fields remain inside the adapter profile. Portable callers request outcomes such as `quality`, `latency`, or `cost` only through a project-approved routing profile; they do not pass OpenAI-specific parameters through the core interface.

### 6.6 Provider data handling and credentials

A `ProviderDataHandlingProfile` binds the provider, exact account and project identity, application-state behavior, abuse-monitoring retention, Zero Data Retention or Modified Abuse Monitoring status, prompt-caching behavior, training opt-in status, processing region or residency, authoritative policy URL, source access time, effective time, review time, and profile digest. `store: false` means that content.md requests no Responses application state; it is never described as zero provider retention.

The data-processing disposition and connection record bind this exact profile digest. Unknown, expired, inaccessible, or account-mismatched handling evidence fails before egress.

A `SecretRef` contains no secret value. It binds a provider, credential class, account and project identity, exact HTTPS origin, endpoint class, permitted authorization-header name, connection-record digest, resolver namespace, status, and revocation reference. Production OpenAI credentials are valid only for `https://api.openai.com` and the Responses endpoint class. A proxy, compatible API, Azure deployment, or custom base URL requires a separate adapter, connection record, data-handling profile, and secret reference.

Every provider adapter also publishes a versioned `RequestHeaderTemplate` under schema `contentmd.request-header-template/0.1.0`. Its canonical-JSON preimage contains the complete set of unique lower-case application-header names sorted by UTF-8 byte order. Literal values must be printable US-ASCII, have leading and trailing SP or HTAB removed, preserve every remaining byte including internal whitespace, and contain no CR, LF, NUL, or duplicate field name. The authorization value appears only as a typed `{kind: "secret_ref", secret_ref_id}` placeholder bound to the exact `SecretRef`; project, organization, feature, idempotency, content-type, and adapter-identification values are literal and digest-bound when present. Destination-derived transport fields such as `host` and `content-length` are separately named and recomputed from the authorized destination and body. No wildcard, caller-supplied, or unlisted header is permitted.

## 7. OpenAI Responses adapter

The new package is `@contentmd/model-provider-openai`. It depends on `@contentmd/model-provider-sdk` and `openai`, but no portable package depends on it.

Its request serializer is pure and performs no credential resolution or network access. The governed executor first asks the adapter to produce the exact request object and canonical wire bytes, obtains authorization bound to those bytes, and then returns the immutable bytes and authenticated plan to the guarded transport. The transport refuses any SDK serialization drift; adapter-version conformance tests lock the serializer behavior.

The adapter:

1. accepts a fully authorized provider execution plan, not an arbitrary prompt;
2. constructs an OpenAI client with `maxRetries: 0` so retry behavior remains visible to content.md governance;
3. resolves the exact authorized `SecretRef` from runtime secret injection or the named environment source without persisting or echoing the value;
4. sends `store: false`, `background: false`, no `previous_response_id`, and no tools;
5. sends the strict provider schema projection as the response text format;
6. uses an exact HTTPS origin and path, disables cross-origin redirects, rejects userinfo and local-address destinations, and applies the operation's timeout and byte/token ceilings;
7. rejects non-completed, refused, missing, unparsable, or over-limit responses;
8. rejects a missing or non-allowlisted provider-returned model ID before proposal creation;
9. validates parsed JSON against the canonical AJV schema;
10. returns a provider-neutral response and separately appendable provider receipt; and
11. supports a separate test transport and test-only secret resolver so no test needs a real API key or internet access and a test transport cannot resolve a production secret.

The adapter does not use OpenAI file search, web search, computer use, shell, MCP, code execution, background mode, stored conversations, vector stores, or fine-tuning in 0.1.

## 8. Governance for live calls

### 8.1 Required operation envelope

Each call is an operation with:

- action `model.generate`;
- exact adapter and model profile;
- project and task resources;
- allowed operations and output schemas;
- input data classes and egress destination;
- call, retry, byte, time, and token limits;
- a current capability grant;
- exactly one disposition for connection authorization, data processing, durable memory, and telemetry;
- a verification plan for schema and record persistence; and
- an append-only audit target.

The most restrictive organization, project, domain, surface, locale, task, provider, and action policies win.

The result is a canonical `ProviderExecutionPlan` containing:

- plan ID, schema version, plan digest, nonce, issued time, expiry, and maximum attempt count;
- exact principal, workload, project, task, adapter, adapter version, provider profile, model profile, and secret-reference bindings;
- HTTP method, HTTPS origin, path, redirect policy, and the exact request-header-template ID, version, and digest;
- the exact serialized request-body SHA-256 digest and byte count;
- prompt, output schema, context, retrieval, and egress-manifest digests;
- policy, capability-grant, connection, data-processing, durable-memory, telemetry, and revocation-checkpoint IDs, versions, and digests;
- calls, attempts, retries, bytes, duration, and token ceilings; and
- the attempt-ledger and outcome-audit stream targets.

A digest alone does not authorize a plan. The plan is authenticated by a signature or MAC whose key is unavailable to arbitrary adapter callers, or it is resolved by ID and digest through an authoritative read-only verifier. The guarded transport, rather than its caller, constructs the complete application-header set from the authenticated template, substitutes only the freshly resolved secret value for the typed placeholder, derives the declared transport fields, and rejects every undeclared or value-mismatched header. It hashes the actual SDK-produced request-body bytes and the redacted canonical header-template preimage immediately before egress and requires an exact plan match. Secret values are compared in memory to the resolved lease and are never written into the plan, digest preimage, logs, receipts, or audit records.

The attempt ledger atomically claims the nonce before connection. Expiry and revocation are rechecked after the claim and immediately before the guarded transport sends bytes. Reuse, a second attempt, body or destination drift, unavailable audit storage, or a changed control denies the call. A transport failure after bytes may have been sent is `provider_outcome_unknown` and is never retried automatically.

### 8.2 Connection and data disclosure

`contentmd connect openai` is a proposed configuration workflow, not a network call. It records the endpoint class, model profile, credential source name, known provider-retention policy reference, intended data classes, and permitted operations. It never stores the credential value.

Before the first session grant, the CLI shows a concise egress manifest containing destination, provider account/project, model, operations, context classes, application-state request, abuse-monitoring and other known retention behavior, ZDR/MAM status, region, maximum calls, maximum tokens, expiry, and audit location. It states explicitly that `store: false` is not zero retention.

When no organization governance exists, a local project controller may issue a short-lived grant only for public or explicitly non-sensitive project data after a recorded attestation. Bootstrap grants cannot cover credentials, personal data, confidential data, regulated data, unpublished sensitive business information, or organizational data whose authority is not established. Those require an externally grounded authorization record.

Session grants default to one operation and 15 minutes and may never exceed 60 minutes under the bootstrap policy. Expiry, revocation uncertainty, scope mismatch, missing controls, missing schema, unknown provider retention, or resource overage fails closed.

### 8.3 Enforcement points

Governance runs in both the orchestrator and the provider adapter. The adapter resolves and authenticates the exact `ProviderExecutionPlan`, atomically claims its nonce, rechecks currentness, and verifies the actual wire request immediately before opening the connection. A caller cannot bypass policy by importing the live package directly, fabricating a digest, replaying a plan, substituting a credential, or passing a raw prompt.

Historical quality, acceptance rate, ranker score, or prior successful calls may influence model selection or review depth. They never issue a grant, waive a control, approve a claim, or widen data scope.

### 8.4 Audit and privacy

Audit events cover connection configuration, grant issuance and denial, data disposition, plan issuance, nonce claim, request authorization, attempt, provider result or unknown outcome, schema result, proposal creation, decision, dataset inclusion, training, evaluation, promotion, shadow use, drift, and rollback.

Audit records contain minimized metadata and content digests. Raw prompts, outputs, source text, and credentials are stored only when an explicit durable-memory decision permits their exact purpose, scope, location, retention, and access.

If the provider returns but the outcome audit cannot be durably appended, the output is quarantined and cannot become a proposal, decision input, or learning example. Recovery may append a verified audit result from the retained provider receipt; it may not regenerate or assume the outcome.

## 9. Qualified feedback and learning records

The learning package adds the following immutable record families:

| Record | Purpose |
| --- | --- |
| `GenerationRunRecord` | Binds task, context, retrieval, prompt, provider, output, critique, and proposal digests. |
| `FeedbackQualificationRecord` | Binds the rubric, reviewer qualification, stable context, presentation method, rationale, conflict, and objective that make feedback admissible. |
| `LearningEligibilityRecord` | States whether a decision may train a named learning objective and why. |
| `PreferenceExampleRecord` | Binds preferred and non-preferred alternatives in the same decision context. |
| `ExemplarRecord` | Stores an approved expression or mechanism with scope and prohibited transfer. |
| `LeakageGroupRecord` | Freezes transitive message, task, template, occurrence, locale, channel, lineage, and near-duplicate groups. |
| `LearningDatasetManifest` | Freezes exact examples, exclusions, splits, permissions, lineage, and digest. |
| `FeatureProfile` | Freezes feature names, order, types, transformations, and code digest. |
| `RankingModelRecord` | Stores algorithm, hyperparameters, coefficients, training statistics, and digest. |
| `LearningEvaluationRun` | Stores baseline and candidate metrics, denominators, failures, and uncertainty. |
| `ShadowEvaluationPlan` | Preregisters the frozen inputs, duration, denominators, slices, metrics, exit rules, and no-influence proof. |
| `ShadowBindingRecord` | Routes a candidate model to observation-only ranking. |
| `LearningPromotionDecision` | Separately approves, rejects, narrows, or supersedes a model for an exact scope. |
| `LearningDeploymentBinding` | Names the current ranker or retriever for an exact project and objective. |
| `LearningDriftReport` | Compares recent qualified examples with the promoted baseline. |
| `LearningRollbackRecord` | Restores a prior binding without deleting history. |

Accepted or edited content does not automatically become training data. Ordinary product decisions remain observational until a `FeedbackQualificationRecord` establishes the exact rubric and version, ranking objective, reviewer role and qualification, stable fact, policy, task and context digests, blinded and randomized presentation order, rationale codes, tie or abstention state, conflicts and adjudication, and whether context changed during review. Eligibility additionally requires current learning-data permission, compatible memory scope, and no unresolved rights, privacy, factual, policy, or incident conflict.

Abstentions are retained as abstentions. Rejections without a selected alternative can train refusal or exclusion behavior but cannot create a pairwise preference unless a valid preferred comparator exists.

One qualified reviewer may support a personal or named-project observational model only. Organization or public promotion requires the reviewer set, independence, qualification, conflict, and adjudication rules declared by the learning policy. A project title, content ownership claim, or prior acceptance history does not establish reviewer qualification by itself.

## 10. Approved-pattern retrieval

The first retriever is local, deterministic, and inspectable. It searches approved evidence, decisions, content patterns, exemplars, and counterexamples using:

1. exact scope filters for project, memory, product area, journey state, channel, locale, market, risk, and lifecycle;
2. deterministic lexical scoring over mechanism, problem, context, outcome, and failure-mode fields;
3. recency and freshness treatment that cannot override scope or approval;
4. evidence-strength and transfer-condition features; and
5. explicit exclusion of expired, revoked, disputed-without-resolution, rights-blocked, or scope-incompatible records.

Retrieval produces a `RetrievalSnapshot` with the query digest, candidate set, exclusions, component scores, ordering, and registry versions. The writer receives abstracted mechanisms and approved project expressions. Competitor expressions remain evidence and are not copied into prompts as reusable wording.

Optional embeddings are outside 0.1. The interface reserves an embedding scorer, but lexical retrieval must remain a functioning fallback.

## 11. Pairwise ranking model

### 11.1 Objective

Version 0.1 implements exactly one immutable `ranking_objective`: `expression_preference`, with `candidate_kind: expression`. It predicts which of two eligible expression alternatives better satisfies the same content task. It reorders generated or approved project expressions; it does not generate text and cannot override hard-rule failures.

Pattern relevance and exemplar relevance are separate future objectives with different labels, features, baselines, datasets, model IDs, evaluations, promotion decisions, and bindings. Version 0.1 keeps pattern and exemplar retrieval deterministic. Every feedback, eligibility, example, dataset, feature, model, evaluation, shadow, promotion, drift, and deployment record carries `ranking_objective` and `candidate_kind`; cross-objective examples or bindings are invalid.

### 11.2 Features

Version `rank-features/0.1.0` uses only inference-time-available features:

- exact project, product area, journey state, channel, locale, and risk matches;
- required-fact reference coverage;
- required recovery-action reference coverage;
- approved terminology match ratio;
- contextual entity and action coverage;
- supporting-evidence reference coverage;
- generic-language hit density from a versioned lexicon;
- distance from an acceptance-criteria length range; and
- a separate applicability/missing indicator for every nullable feature.

Ratios are distinct satisfied or cited items divided by the frozen applicable item set. An empty applicable set yields value `0` with its missing indicator `1`; otherwise the indicator is `0`. Required-fact coverage is applicable only when the frozen task declares at least one required fact. Generic density is frozen-lexicon matches divided by tokens from the embedded Unicode 17.0 word-break tables and clipped to `[0,1]`; an expression with no resulting token or extended grapheme cluster is ineligible rather than assigned a score. Length distance is zero inside the declared extended-grapheme-cluster range and otherwise the distance to the nearest bound divided by the larger bound, clipped to `[0,1]`; when no range exists it is `0` with missing indicator `1`. Contextual entities, actions, aliases, terms, facts, recovery actions, evidence, patterns, lexicon, tokenization, Unicode tables, grapheme segmentation, and acceptance criteria are all digest-bound inputs to the feature profile.

Identity, actor, protected-class, inferred emotion, inferred vulnerability, presentation side/order, provider alternative order, decision, and post-decision outcome fields are not ranking features. A hard-rule fail or prohibited-claim hit makes an item ineligible before learned ranking and is therefore not a compensable feature.

### 11.3 Dataset construction and leakage control

An example contains two alternatives evaluated in the same task context and one preferred side. Edited decisions compare the accepted edit with the original proposal only when the eligibility record confirms that the edit reflects content quality rather than a changed fact or requirement. Explicit pairwise review is preferred.

The split unit is a frozen transitive `LeakageGroupRecord`, not one message ID. Union-find components include semantic-message lineage and supersession, shared task or template families, source occurrences, locale and channel variants, and deterministic near-duplicate expression clusters. Near duplicates use Unicode NFKC, the embedded Unicode 17.0 full default case-folding table bound by digest, all Unicode whitespace collapsed to one ASCII space, and the set of consecutive three-Unicode-scalar sequences. Normalized strings shorter than three scalars cluster only on exact equality; other strings cluster at Jaccard similarity at or above `0.85`. The rule version and every member are stored.

The split preimage is UTF-8 `contentmd.learning-split/0.1.0\0` followed by the leakage-group ID. SHA-256 is interpreted as an unsigned 256-bit big-endian integer; `floor(hash * 100 / 2^256)` assigns buckets `0–79` to training, `80–89` to validation, and `90–99` to test. Every connected member remains in one split. Dataset creation fails if any lineage, content digest, message, task, template, occurrence, locale/channel family, or derived duplicate crosses splits.

Before alternatives are presented, the presentation record freezes a `FeatureSourceCheckpointSet` containing the stream ID, maximum appended sequence, head event digest, checkpoint receipt, and store binding for every feature-source stream. Every feature source must already be appended at or below one of those checkpoints and appear in the frozen feature-source manifest. Caller-supplied occurrence time is descriptive and never proves temporal eligibility. `feature_as_of` binds this checkpoint set and the presentation bundle; a later or backdated append cannot qualify. Acceptance, edits, outcomes, or evidence observed afterward cannot become input features. Learned aggregates are computed from training data only; validation and test features use training-frozen statistics. The test manifest is sealed before candidate fitting, candidate iteration uses only train and validation, and opening the test set consumes that candidate's one final-evaluation attempt. A later promotion requires a new forward temporal holdout rather than reuse of an opened test set.

Training eligibility requires at least 100 pairs, 30 leakage groups, and non-empty validation and test splits with at least 20 pairs and 5 leakage groups each. Below that threshold, data remains useful for retrieval and shadow diagnostics but does not produce a promotable ranker.

### 11.4 Training algorithm

The first model is L2-regularized pairwise logistic regression. Candidate positions `A` and `B` are frozen and randomized before a reviewer sees them; the record stores `y = 1` when `A` is preferred and `y = 0` when `B` is preferred. Candidate order is never rewritten into winner-first form.

```text
P(A > B) = sigmoid(w · (x_A - x_B))
loss = mean(-y * log(p) - (1-y) * log(1-p)) + lambda * ||w||² / 2
```

Training is deterministic:

- examples and features are sorted by stable IDs;
- booleans encode as `0` or `1`, closed enums use a feature-profile-frozen one-hot order, and every nullable feature has a separate missing-value indicator;
- numeric features are standardized from training-only means and population standard deviations using divisor `n`;
- zero-variance features map to zero;
- standardized values are clipped to `[-10, 10]`;
- weights start at zero;
- `lambda = 1.0` and learning rate `0.05`;
- full-batch gradient descent runs at most 2,000 iterations;
- sigmoid uses the overflow-safe positive/negative branch, softplus uses `z + log1p(exp(-z))` for positive `z` and `log1p(exp(z))` otherwise, and loss and gradient terms use Kahan summation in sorted feature/example order;
- every coefficient is regularized and the model has no intercept, preserving `P(A>B) = 1 - P(B>A)`;
- convergence compares the unquantized loss and requires absolute loss change below `1e-9` for 10 consecutive iterations; and
- coefficient identity uses each IEEE-754 binary64 bit pattern encoded as 16 lowercase hexadecimal characters, while human-readable decimals are non-authoritative.

Non-finite input, loss, gradient, coefficient, or score invalidates the run. Training code, feature profile, dataset, and runtime digests are part of model identity. Reproducibility is claimed only for the declared Node `>=24.14.0 <25` runtime and supported platform profiles that pass byte-identical golden dataset, feature, coefficient, prediction, and model-digest fixtures in independent processes.

### 11.5 Evaluation and promotion

The deterministic baseline is a frozen expression-only content-fit score. Applicable components and weights are required facts `0.25`, recovery `0.15`, terminology `0.15`, contextual specificity `0.15`, evidence coverage `0.15`, one minus generic density `0.10`, and one minus length distance `0.05`. Missing components are omitted and the remaining weights are renormalized to sum to one. Required-fact coverage is omitted when the task declares no required facts; generic density is always applicable to an eligible non-empty expression, so the denominator cannot be zero. For alternatives `A` and `B`, `d = score_A - score_B` and the baseline probability that `A` is preferred is `clip(sigmoid(4 * d), 1e-6, 1 - 1e-6)`; an exact score tie yields `0.5`. Candidate probabilities use the same clipping. Both systems must return a finite probability for every qualified decisive pair, so primary coverage is exactly `1.0` or the run is invalid.

The common primary population is every qualified decisive test pair admitted by the sealed manifest. Human ties and abstentions are not converted to labels; they are reported in the qualification denominator and excluded from both systems' decisive-pair metrics. Each pair receives equal primary weight. With the frozen label `y`, pairwise accuracy is one when `p > 0.5` and `y = 1` or when `p < 0.5` and `y = 0`, zero for the opposite direction, and one half when `p = 0.5`. Log loss uses the clipped probability and the same `y`. Reports include overall and declared project, product-area, channel, locale, and risk slices with exact pair and leakage-group denominators.

Promotion requires:

- all data, permission, rights, privacy, and schema checks current;
- every admitted example to satisfy the exact reviewer-set, qualification, independence, conflict, and adjudication policy for the proposed active binding scope; a one-reviewer personal or named-project observational dataset may support diagnostics and shadow evaluation but cannot support an active learned binding;
- no split leakage or duplicate contamination;
- no hard-rule eligibility regression;
- a fixed 10,000-resample paired bootstrap by leakage group;
- a positive lower 95 percent confidence bound for candidate-minus-baseline pairwise accuracy;
- a negative upper 95 percent confidence bound for candidate-minus-baseline log loss;
- every slice required by the preregistered proposed binding to contain at least 20 decisive pairs and 5 leakage groups;
- each required slice to have an accuracy-difference lower bound at or above `-0.05` and a log-loss-difference upper bound at or below `0.05`;
- a completed shadow run; and
- a separate human `LearningPromotionDecision` bound to all exact digests.

A candidate that fails, lacks evidence, or has an unsupported required slice remains unpromoted for that proposed binding. Binding scope and required slices are frozen before the sealed test set is opened. A human may propose a narrower scope only in a new decision made before a new forward temporal holdout is opened; it cannot remove a failed or unsupported slice from the current evaluation. The system never silently lowers the gate because data is scarce.

The bootstrap is reproducible. Its seed is SHA-256 over the dataset, candidate-model, baseline, feature-profile, and evaluation-code digests plus `contentmd.paired-bootstrap/0.1.0`. Each replicate samples the original number of leakage groups with replacement; all pairs in a sampled group follow it, and repeated groups repeat their pairs. Draws use successive SHA-256 counter blocks with rejection sampling, avoiding modulo bias. Confidence limits are the nearest-rank 2.5th and 97.5th percentiles over exactly 10,000 replicate differences. The run record stores the full machine-evaluable predicate, seed preimage digest, group order, replicate count, interval method, evaluation population digest, slice policy, and evaluation-code digest.

### 11.6 Shadow, drift, binding, and rollback

A `ShadowEvaluationPlan` freezes scope, active baseline, candidate, input selection, start and end rules, minimum 50 qualified decisive pairs, minimum 20 leakage groups, minimum 14 calendar days, required slices, metrics, gates, and an assertion that shadow scores cannot affect prompts, candidate visibility, ordering, decisions, or active output. The executor computes active and shadow scores on the same frozen inputs but returns only the active result. Input and output digests prove the no-influence path.

A deployment binding changes through compare-and-swap against the current binding event digest. Promotion or rollback is not current until an independent readback verifies the new binding and its complete lineage. A rollback target is revalidated for current data rights, permission, schema, feature, runtime, objective, candidate kind, and scope. If no prior model remains valid, the system appends a suspension binding to the deterministic baseline.

Drift uses non-overlapping 30-day monitoring periods. A period is statistically evaluable at 50 decisive pairs and 20 leakage groups and closes early at 100 pairs; otherwise it closes at day 30 as `monitoring_insufficient`. Two consecutive evaluable periods with candidate accuracy at least `0.10` below its promotion test accuracy, log loss at least `0.10` above it, or a required-slice statistical gate failure suspend the learned binding pending review. Two consecutive insufficient periods, or 60 continuous days without one evaluable period, also suspend it. Any new hard-rule, copying, rights, privacy, authority, or data-permission failure suspends immediately without waiting for a second window. Source or qualification revocation propagates through example, dataset, model, evaluation, and deployment lineage and immediately suspends affected bindings.

### 11.7 End-to-end writing-effectiveness benchmark

The ranker fixture proves mechanism, not that content.md is a better writer. Effectiveness requires a separately frozen `LIL-WRITE-001` benchmark with exactly 60 tasks across six wholly synthetic products at 10 tasks per product, at least four product domains, web plus one notification channel, two locales, strategy and contextual microcopy tasks, and held-out pattern families. The manifest freezes the exact task count for every product, domain, channel, locale, task type, and their required intersections before execution. Each task has one frozen candidate-expression set generated once under the same provider, returned model ID, model profile, prompt-template version, task/context evidence, number of alternatives, and token budget. Baseline and learned rankers score the exact same candidate digests. Each path selects the highest-scoring hard-eligible expression; an exact score tie resolves to the lexicographically smallest lowercase SHA-256 expression digest. The selected expression ID, digest, score vector, eligibility result, and tie-break trace are frozen before blinding. A missing candidate, differing returned model ID, candidate-set mismatch, or absent deterministic selection trace invalidates the benchmark run rather than merely removing that task. Upstream prompt or retrieval effects require a separate counterbalanced repeated-generation experiment with frozen sampling configuration or recorded responses and are not attributed to this ranker.

Outputs are randomized and blinded. Each task receives two qualified independent reviews under the same rubric. Any hard-result conflict or advisory-score difference greater than one point receives a third independently blinded adjudication; the adjudicated result replaces neither original and is stored separately. Blind preference uses the majority of decisive reviews; an unresolved split is a tie. Abstentions and ties are valid outcomes that remain in denominators but not the decisive preference numerator. Each original reviewer independently accepts the selected expression as-is or records an accepted edit. Normalized edit distance is Levenshtein distance over Unicode 17.0 extended-grapheme-cluster sequences after NFC normalization and LF line-ending normalization, divided by `max(1, selected_cluster_count, accepted_cluster_count)`; case, punctuation, and internal whitespace remain significant. The task edit-effort value is the arithmetic mean of the two original reviewer distances, and the adjudicator never replaces it. A missing required review, changed context, candidate mismatch, model mismatch, or any other invalid task makes the full benchmark `invalid_run`; it cannot pass on the remainder. Acceptance therefore requires `valid_task_count = 60`, exactly 10 valid tasks per product, exact equality with every preregistered slice/intersection count, and `invalidation_rate = 0`.

A sealed `BenchmarkAttemptRecord` binds exactly one inferential attempt to the candidate-model, benchmark-manifest, reviewer-allocation, rubric, randomization, and analysis-code digests before any result is observed. A technical interruption may resume the same run ID without discarding or replacing completed assignments or reviews. Missing work may be completed within the same attempt, but inputs, reviewers, allocations, outcomes, and dispositions cannot be reset. Once the run becomes `invalid_run`, or once a valid run opens its quality-gate result, that candidate's attempt is consumed. It may not rerun against the same manifest under another run ID; another inferential attempt requires a new candidate model and a newly sealed holdout manifest. Sequential testing and alpha-spending are outside 0.1. Every failed or invalid run and task disposition remains recorded.

All confidence intervals use the same deterministic 10,000-replicate hierarchical paired bootstrap, sampling products and then tasks within sampled products; metric-specific reviewer aggregation and missingness rules are frozen in the benchmark manifest. The benchmark reports factual and behavioral accuracy, task and recovery support, comprehension, accessibility, preference with reasons, edit effort, voice/category fit, localization, similarity/copying, every hard failure, and review burden.

The learned path must have zero additional truthfulness, behavioral-accuracy, deception, consent, accessibility, autonomy, safety, or copying failures. For paired rubric scores on the frozen `0–4` scale, the lower 95 percent bound for learned-minus-baseline recovery, comprehension, accessibility-quality, voice/category fit, and localization scores must be at least `-0.10`. For normalized accepted-edit distance, the upper bound for learned-minus-baseline must be at most `0.02`; for review time, the upper bound for the geometric-mean ratio must be at most `1.10`. It must also satisfy at least one preregistered positive utility gate: learned blind-choice probability lower bound above `0.50`, accepted-edit-distance difference upper bound below `0`, or task/recovery-score difference lower bound above `0`. A passed synthetic benchmark supports only bounded release readiness. The product may claim “better over time” only after qualified longitudinal evidence on adopter-controlled tasks shows the same improvement without increased hard failures or review burden.

## 12. Recursive learning lifecycle

The active loop is:

```text
qualified pairwise review or qualified content decision
  -> proposed learning eligibility
  -> rights, privacy, provenance, and scope check
  -> qualified example or explicit exclusion
  -> immutable dataset candidate
  -> offline training and evaluation
  -> shadow binding
  -> review of quality, slices, failures, and drift
  -> scoped human promotion
  -> monitored use
  -> confirm, narrow, supersede, expire, or roll back
```

Promotion changes a deployment binding; it never rewrites past events, source evidence, decisions, policy, or model artifacts. Rollback creates a new event pointing to the prior approved binding and preserves the failed model and its evidence.

Fine-tuning, reinforcement learning, online weight updates, automatic prompt mutation, and cross-organization model training remain outside 0.1. Their future introduction requires a separate design, data decision, evaluation, release, and rollback contract.

Product outcomes remain outcome-memory evidence in 0.1 and do not create training labels or ranking features. Outcome-aware learning requires a future contract for exposure, assignment, treatment, metric windows, denominators, missingness, confounders, provenance, and the causal or otherwise bounded claim that the evidence supports.

## 13. Pattern learning from other products

Other-product research enters learning only through a `ContentPatternRecord` that separates:

- observed product and context;
- the user problem and state;
- the abstract content mechanism;
- minimal evidence examples;
- claimed and observed outcomes;
- counterexamples and failure modes;
- transfer conditions;
- non-transferable product facts, expressions, and brand signals;
- rights and similarity disposition; and
- the current product's candidate implication.

The writer retrieves the mechanism, transfer conditions, and current-product evidence. It may not treat prevalence as quality, import unsupported competitor facts, reproduce distinctive wording, or infer an approved project voice from category examples.

Evaluation includes exact and fuzzy similarity checks against retained competitor expressions. A similarity failure blocks proposal eligibility and learning promotion until reviewed.

## 14. Host-adaptive runtime contracts

### 14.1 Runtime descriptor

`RuntimeDescriptor` declares:

- runtime and adapter IDs and versions;
- integration mode: `embedded`, `sidecar`, or `remote_service`;
- environment family and supported host versions;
- event-store, blob, job, scheduling, approval-pause, real-time, RPC, sync, export, health, and cleanup capabilities;
- consistency and retry semantics;
- data location, retention, encryption, identity, authentication, and telemetry behavior;
- package and infrastructure requirements; and
- unsupported operations and failure codes.

### 14.2 Portable interface

The future `@contentmd/runtime-sdk` exposes focused interfaces rather than one vendor-shaped object:

```ts
interface RuntimeEventStoreFactory {
  open(binding: RuntimeBinding, operation: AuthorizedRuntimeOperation): Promise<AuthorizedAppendOnlyEventStore>;
}

interface RuntimeJobRunner {
  start(job: GovernedJob, operation: AuthorizedRuntimeOperation): Promise<JobReceipt>;
  inspect(jobId: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus>;
  cancel(jobId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus>;
}

interface RuntimeApprovalPause {
  pause(request: ApprovalPauseRequest, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseReceipt>;
  resolve(decision: ApprovalResolution, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseStatus>;
}

interface RuntimeProgressPublisher {
  publish(event: ProgressEvent, operation: AuthorizedRuntimeOperation): Promise<void>;
}

interface RuntimeExporter {
  exportSnapshot(request: ExportRequest, operation: AuthorizedRuntimeOperation): Promise<ExportReceipt>;
}

interface RuntimeBlobStore {
  put(blob: AuthorizedBlob, operation: AuthorizedRuntimeOperation): Promise<BlobReceipt>;
  get(ref: BlobRef, operation: AuthorizedRuntimeOperation): Promise<VerifiedBlob>;
  expire(request: BlobExpiryRequest, operation: AuthorizedRuntimeOperation): Promise<BlobExpiryReceipt>;
}

interface RuntimeScheduler {
  schedule(job: ScheduledGovernedJob, operation: AuthorizedRuntimeOperation): Promise<ScheduleReceipt>;
  inspect(scheduleId: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus>;
  cancel(scheduleId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus>;
}

interface RuntimeIngress {
  authenticate(request: RuntimeIngressRequest): Promise<AuthenticatedRuntimeSession>;
  invoke(session: AuthenticatedRuntimeSession, request: SchemaValidatedRpcRequest, operation: AuthorizedRuntimeOperation): Promise<RpcReceipt>;
  subscribe(session: AuthenticatedRuntimeSession, request: AuthorizedSubscription, operation: AuthorizedRuntimeOperation): Promise<ReadonlyEventChannel>;
}

interface RuntimeSecretResolver {
  resolve(ref: SecretRef, operation: AuthorizedRuntimeOperation): Promise<SecretLease>;
}

interface RuntimeSynchronizer {
  push(batch: EventBatch, operation: AuthorizedRuntimeOperation): Promise<SyncReceipt>;
  pull(cursor: SyncCursor, operation: AuthorizedRuntimeOperation): Promise<VerifiedEventBatch>;
  acknowledge(checkpoint: ReplicaCheckpoint, operation: AuthorizedRuntimeOperation): Promise<ReplicaAck>;
}

interface RuntimeHealth {
  inspect(binding: RuntimeBinding, operation: AuthorizedRuntimeOperation): Promise<RuntimeHealthReport>;
}

interface RuntimeCleanup {
  clean(request: CleanupRequest, operation: AuthorizedRuntimeOperation): Promise<CleanupReceipt>;
}
```

Core workflows depend only on the capability they use. Unsupported capability calls fail with `runtime_capability_unsupported`; they do not downgrade silently.

`AuthorizedRuntimeOperation` is an opaque, signed or authoritative-verifier-resolved capability. It binds tenant, authenticated principal, workload, project, action, exact resource IDs and digests, data classes, policy, capability-grant and applicable control-record IDs/versions/digests, resource limits, issue and expiry times, revocation checkpoint, single-use or declared idempotency nonce, runtime-binding digest, and audit target. `AuthenticatedRuntimeSession` is likewise opaque and binds the ingress authentication result to tenant, principal, workload, connection, expiry, and revocation state; it is necessary but never sufficient without the matching operation capability. `AuthorizedAppendOnlyEventStore` exposes no raw database handle; every read, append, transaction, projection, and close method requires the matching current operation capability and enforces its stream and record scope. Every adapter independently resolves and validates the operation immediately before a read or effect, claims its nonce when applicable, and rejects scope, currentness, binding, resource, or session mismatches. Direct package import never bypasses this check.

A `RuntimeBinding` names exact interface versions, consistency model, transaction boundary, idempotency-key behavior, retry and ambiguous-outcome rules, identity and authentication provider, secret resolver, data locations, retention, encryption, telemetry, health checks, cleanup, export, and every adapter digest. Capability booleans are insufficient. Binding issuance requires conformance evidence for every claimed interface.

### 14.3 Replica and canonicality protocol

Every event has a canonical event ID, stream ID, sequence, predecessor digest, payload digest, event digest, and schema version. Appends are idempotent on event ID plus digest and reject an ID with different bytes. Each runtime maintains an ordered outbox and inbox, content-addressed batch receipts, and monotonic checkpoints. Synchronization records gaps, forks, version conflicts, rejected events, resumption cursors, and independent verification.

An adopter-controlled canonical replica is selected in the runtime binding. Durable project memory is canonical-first: before a hosted profile may persist an event as durable state, the canonical replica must append the event and acknowledge its checkpoint together with the complete transitive artifact closure required to interpret or verify it. Bytes produced on a host before that receipt are an `ephemeral_uncommitted_preview`, may exist only in the bounded workflow response or transport buffer, and are not project memory, an event, an approval, a capability, a learning-dataset member, or a durable hosted record. If the canonical replica is unavailable, persistence and every authority-changing operation pause; the caller may explicitly discard the preview or export it directly to adopter-controlled storage, but the host may not retain the sole durable copy.

That closure is frozen in a `ReplicaArtifactManifest` bound to the event and checkpoint. Each entry records artifact or blob ID, media and schema type, SHA-256 digest, byte count, disposition, export permission, every parent reference, and the expected canonical-store receipt class. The manifest recursively includes referenced payloads, evidence, approvals, policy and grant records, datasets, feature profiles, model artifacts, evaluation inputs, and any permitted raw or derived blobs. The replica acknowledgement binds the manifest digest and per-entry verified storage receipts. It may issue only after the canonical replica has stored and independently rehashed every required byte and proved that no reference is missing. A forbidden, unavailable, unverified, digest-mismatched, or incompletely traversed artifact prevents durable host persistence; the system may not reinterpret a prohibited export as successful replication. After canonical acknowledgement, the host copy is a replaceable replica and host loss followed by restoration from the canonical replica must reproduce the same event, artifact-manifest, checkpoint, and record digests.

Conflict resolution never uses last-write-wins for decisions or authority. Concurrent proposals coexist; semantic decisions, approvals, policies, grants, learning promotions, and runtime bindings require an explicit conflict record and a new resolving event. Export includes events, checkpoints, receipts, conflicts, blobs permitted for export, and a verification manifest.

### 14.4 Detection and binding

Read-only detection may inspect authorized manifests and configuration for Node, package managers, frameworks, serverless platforms, containers, queues, databases, and existing agent infrastructure. A detection report contains evidence locators, confidence, conflicts, and unknowns.

Detection never proves live deployment from repository configuration alone. It never opens credentials, contacts a control plane, installs a package, edits infrastructure, or creates a binding. `contentmd runtime propose` presents compatible profiles and trade-offs. `contentmd runtime bind` requires a separate exact decision and any applicable connection, data, memory, telemetry, mutation, and release controls.

### 14.5 Profile behavior

| Existing project environment | Default content.md posture |
| --- | --- |
| Local Node or unsupported host | Use the local Node and SQLite reference profile. |
| Existing server application | Propose an embedded adapter only when a tested adapter matches its runtime and storage contracts; otherwise use a sidecar. |
| Existing serverless or edge application | Propose a conforming host adapter when durability and limits are explicit; otherwise keep long work local or in a separately selected service. |
| Existing Cloudflare Workers project | Offer the Cloudflare Agents SDK profile without migrating unrelated project state. |
| No application runtime | Keep the CLI and local runtime fully functional; hosted deployment is optional. |

### 14.6 Cloudflare profile

After portable runtime conformance passes, `@contentmd/runtime-cloudflare` may map:

- workspace shard/instance routing to an Agents SDK Agent instance, kept separate from authenticated human or workload identity;
- projections and synchronized working state to Durable Object SQLite;
- workbench actions to typed callable RPC;
- live status to WebSockets;
- long-running, retryable, or approval-paused operations to Workflows;
- freshness and drift checks to scheduling;
- the workbench to supported React hooks; and
- host interoperability to governed MCP clients and the current stateless `createMcpHandler` server path.

Cloudflare state synchronizes immutable events and approved projections. Project export and local verification remain mandatory. The profile must pass equivalence tests against the local runtime for record identity, ordering, authorization, approval pause, retry, cancellation, export, reconnect, and rollback.

Authentication occurs before instance routing and again on connection. Tenant, principal, workload, project, and instance bindings are exact and current. Client connections are read-only for durable state: direct client `setState` is rejected, and every change enters through a runtime-schema-validated callable method with the same governance envelope as local execution. An instance name is never accepted as authentication or authorization.

The MCP server uses the current stateless handler behind OAuth, exact client and tool scopes, Host and Origin allowlists, and per-tool governance. Absence of a browser `Origin` header is not treated as authentication. Callable RPC validates runtime payloads rather than trusting TypeScript types.

A Workflow approval binds actor, principal, workload, operation, subject and subject digest, scope, expiry, current grant, controls, attempt ledger, and resource budget. Governance is rerun after resume and immediately before any effect. Timeout, rejection, changed subject, expired or revoked authority, unknown currentness, or unknown remote outcome fails closed. Workflow retries consume the original attempt and resource ledgers; an ambiguous provider request or other non-idempotent external effect is never retried automatically.

## 15. CLI experience

The release adds or extends these workflows:

```text
contentmd connect inspect
contentmd connect openai --propose --model <id>
contentmd model authorize --provider openai --operations strategy,draft,rewrite
contentmd strategy --provider openai --grant <record>
contentmd draft --provider openai --grant <record>
contentmd rewrite --provider openai --grant <record>
contentmd learn examples
contentmd learn dataset
contentmd learn train
contentmd learn evaluate
contentmd learn shadow
contentmd learn promote
contentmd learn drift
contentmd learn rollback
contentmd runtime inspect
contentmd runtime propose
contentmd runtime bind --proposal <record> --decision <record>
```

`connect openai --propose` and `runtime propose` are read-only/proposal operations. `runtime bind` validates the exact proposal and separately issued decision, writes only the authorized binding event, and performs independent readback; it cannot create its own decision. Live generation requires a current grant. Promotion and runtime binding require separate decision records. Non-interactive use requires explicit record paths and never assumes approval from a flag such as `--yes`.

Human-readable output explains what was sent, used, learned, excluded, blocked, promoted, or rolled back. Stable JSON output preserves typed reason codes and record references.

## 16. Failure model

Required fail-closed errors include:

- `provider_connection_not_configured`;
- `provider_credential_unavailable`;
- `provider_retention_unknown`;
- `provider_data_handling_profile_stale`;
- `provider_account_mismatch`;
- `provider_destination_not_authorized`;
- `provider_execution_plan_invalid`;
- `provider_execution_plan_replayed`;
- `provider_wire_request_mismatch`;
- `provider_outcome_unknown`;
- `provider_output_quarantined`;
- `provider_returned_model_not_authorized`;
- `model_operation_not_authorized`;
- `model_data_class_not_authorized`;
- `model_schema_not_projectable`;
- `model_response_refused`;
- `model_response_incomplete`;
- `model_output_invalid`;
- `model_resource_limit_exceeded`;
- `learning_data_not_authorized`;
- `feedback_not_qualified`;
- `ranking_objective_mismatch`;
- `learning_example_not_eligible`;
- `learning_dataset_insufficient`;
- `learning_split_leakage`;
- `learning_temporal_leakage`;
- `learning_test_manifest_already_opened`;
- `ranking_training_invalid`;
- `ranking_evaluation_failed`;
- `learning_promotion_not_authorized`;
- `learning_drift_requires_review`;
- `runtime_detection_inconclusive`;
- `runtime_capability_unsupported`;
- `runtime_binding_not_authorized`;
- `runtime_replica_acknowledgement_missing`;
- `runtime_replica_fork_detected`;
- `runtime_canonical_commit_unavailable`;
- `runtime_preview_not_committed`; and
- `runtime_host_persistence_before_canonical_ack`.

Failures preserve safe completed records and identify the smallest next action. They never fall back from live to recorded output, from one provider to another, or from learned to deterministic ranking without recording that route.

## 17. Testing and verification

### 17.1 Live-provider tests

- exact request and response schema tests;
- provider-schema projection positive and negative fixtures;
- injected local HTTP transport proving exact OpenAI request fields;
- no-key, bad-key, timeout, refusal, incomplete, malformed JSON, schema mismatch, oversized output, retry-limit, missing-returned-model, and non-allowlisted-returned-model tests;
- assertions that tools, background mode, stored state, and provider conversation state are absent;
- secret non-persistence and log-redaction tests;
- forged-plan, plan tamper, nonce replay, second attempt, actual-wire mismatch, post-preflight revocation, audit-unavailable, quarantined-output, and unknown-outcome tests;
- malicious base URL, userinfo, local-address, cross-origin redirect, fixture-secret, account/project mismatch, stale data-handling profile, SDK-error-redaction, header-template tamper, undeclared-header, non-secret-header-value drift, secret-placeholder substitution, and project-header mismatch tests;
- governance bypass tests at orchestrator and adapter boundaries;
- connection, data, memory, telemetry, grant, expiry, revocation, limit, and audit tests; and
- recorded-provider regressions proving existing deterministic fixtures remain exact.

No automated test calls the public OpenAI endpoint. A separately authorized, one-operation manual smoke test against the exact production origin, account/project, requested model, permitted-return set, schema, data-handling profile, and guarded transport is required before the subsystem may be labelled `production_live_verified`. Without that passing record, the implementation remains `live_endpoint_unverified` even when every offline test passes; offline test determinism never depends on the smoke test.

### 17.2 Learning tests

- decision-to-eligibility and exclusion tests;
- qualification, blinding/order, changed-context, conflict, adjudication, reviewer-scope, tie, and abstention tests;
- dataset permission, scope, rights, provenance, deduplication, and leakage tests;
- transitive leakage-group, temporal feature, training-only aggregate, one-shot sealed test, deterministic split, and canonical manifest-digest tests;
- retriever scope, freshness, transfer, and exclusion tests;
- known-fixture feature-vector tests;
- closed-form or independently calculated gradient and loss checks;
- repeated-training byte-identical model digest tests;
- invalid number and convergence failure tests;
- baseline and candidate metric tests;
- fixed-seed bootstrap reproducibility tests;
- shadow-only and promotion-negative tests;
- no-influence shadow, compare-and-swap binding, consecutive-window drift, lineage revocation, suspension, target revalidation, supersession, and rollback tests;
- frozen `LIL-WRITE-001` baseline-versus-learned blind benchmark tests; and
- competitor-expression similarity and non-copying tests.

### 17.3 Runtime tests

- read-only detection and no-install/no-deploy tests;
- ambiguous and conflicting host evidence tests;
- unsupported-capability fail-closed tests;
- direct-import authorization-bypass tests for event-store access, blob put/get/expiry, sync push/pull/acknowledgement, export, approval resolution, job and schedule inspection/cancellation, progress publication, cleanup, health inspection, secret resolution, RPC invocation, and subscription;
- local event, job, approval, progress, export, cleanup, and recovery conformance;
- blob, scheduler, ingress, identity, secret, synchronization, health, transaction, idempotency, and consistency conformance;
- outbox/inbox, idempotent append, checkpoint, acknowledgement, resume, fork, conflict, canonical-replica-unavailable, transitive-artifact-closure, missing-blob, forbidden-export, corrupt-blob, incomplete-manifest, and host-loss restoration tests;
- pre-ack preview tests proving no hosted event, blob, record, projection, or durable workflow payload exists until canonical closure acknowledgement, including forced host persistence attempts that fail with `runtime_host_persistence_before_canonical_ack`;
- adapter equivalence tests using the same fixture traces; and
- Cloudflare profile tests for guessed instance, cross-tenant access, direct `setState`, malformed RPC, unauthenticated MCP, state, RPC, WebSockets, Workflows, approval replay, post-approval revocation, timeout, duplicate effect, scheduling, MCP, export, reconnect, cancellation, and local equivalence when that profile is implemented.

### 17.4 Release verification

Each subproject must pass clean installation from the lockfile, build, typecheck, package-boundary checks, all package tests, its independent verifier, and the retained foundation verifier. Verification must prove the test set covers the relevant requirements; a green command alone is not release evidence.

## 18. Acceptance criteria

Live Intelligence and Learning 0.1 is accepted only when:

1. a recorded run remains byte-stable and network-free;
2. a locally simulated OpenAI run exercises the exact production adapter and produces a canonical proposal;
3. a separately authorized production-endpoint smoke test passes before the subsystem is accepted or described as `production_live_verified`; without it, the bounded result is only an offline-verified release candidate;
4. unauthorized, over-scope, expired, revoked, or privacy-incomplete calls make no network attempt;
5. provider refusal, incomplete output, schema failure, and returned-model mismatch cannot enter writer workflows;
6. credentials and unauthorized raw content never enter project or audit records;
7. strategy, draft, and rewrite remain proposal-only with no authority effect;
8. qualified decisions create reproducible examples while ineligible decisions remain explicit exclusions;
9. approved patterns can be retrieved across products without copying their expressions or facts;
10. the `expression_preference` pairwise ranker trains deterministically on a qualifying, leakage-safe fixture and beats its declared baseline under the frozen evaluation rule;
11. a failing or under-evidenced model cannot be promoted;
12. no-influence shadow, atomic promotion, drift suspension, lineage revocation, supersession, and rollback preserve immutable history;
13. runtime detection adapts recommendations to existing project evidence without installing or migrating anything;
14. hosted-produced bytes cannot become durable host state until the adopter-controlled canonical replica stores and acknowledges their full transitive closure;
15. the local runtime remains complete without Cloudflare or a hosted account;
16. `LIL-WRITE-001` proves the bounded learned path meets its hard non-inferiority and positive utility gates without supporting a premature longitudinal claim; and
17. all retained foundation behavior and independent verification remain green.

## 19. Explicit exclusions

This release does not include autonomous publication, generative fine-tuning, reinforcement learning, online weight mutation, unsupervised promotion, organization-wide training, private cross-project data pooling, embeddings, provider tool calls, browser research, Figma/CMS writes, a workbench UI, or the production Cloudflare deployment.

Those are later subprojects. Their exclusion does not narrow the universal product objective; it prevents this release from claiming unverified authority or infrastructure.

## 20. Implementation-plan boundary

After written-spec approval, implementation planning is split into:

1. `contentmd-governed-live-intelligence` — schemas, prompt compiler, governed executor, OpenAI adapter, connection/grant CLI, and independent transport/governance verification.
2. `contentmd-recursive-learning-ranking` — eligibility, datasets, retrieval, features, deterministic trainer, evaluation, shadow, promotion, drift, rollback, and independent learning verification.
3. `contentmd-portable-runtime` — runtime SDK, read-only detection, proposal-and-binding CLI, local reference conformance, and the synthetic canonical-replica protocol required by 0.1.
4. `contentmd-runtime-cloudflare` — the optional production Cloudflare Agents SDK adapter, begun only after Plan 3 passes and separately approved for its exact adopter environment.

Plan 1 may begin before Plan 2. Plan 2 uses recorded-provider fixtures until Plan 1 passes. Plan 3 begins after the portable records and workflow semantics used by Plans 1 and 2 are stable, and it is part of Live Intelligence and Learning 0.1. Plan 4 is a later optional deployment profile and is not required to accept 0.1.

## 21. Current primary references

- [OpenAI Responses API](https://github.com/openai/openai-node/blob/main/docs/responses.md)
- [OpenAI structured outputs](https://github.com/openai/openai-node/blob/main/docs/structured-outputs.md)
- [OpenAI client configuration](https://github.com/openai/openai-node/blob/main/docs/configuration.md)
- [OpenAI API data controls](https://platform.openai.com/docs/models/default-usage-policies-by-endpoint)
- [Cloudflare Agents API](https://developers.cloudflare.com/agents/runtime/agents-api/)
- [Cloudflare Workflows](https://developers.cloudflare.com/agents/concepts/workflows/)
- [Cloudflare human-in-the-loop patterns](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/)
- [Cloudflare MCP handler APIs](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/)

These links support implementation choices but do not override the portable content.md schemas, governance rules, or project authority records. Upstream APIs and package versions are rechecked at each adapter implementation lock.
