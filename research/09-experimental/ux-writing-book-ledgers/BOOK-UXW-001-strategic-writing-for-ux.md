---
title: Strategic Writing for UX study ledger
status: study-complete
book_id: BOOK-UXW-001
edition: second
reading_cutoff: Full substantive text through Chapter 10
updated: 2026-08-25
---

# *Strategic Writing for UX*, second edition — study ledger

## Access and scope

- **Author:** Torrey Podmajersky
- **Publisher/year:** O'Reilly Media, 2025
- **Supplied-copy ISBN:** 9781098174330
- **Access:** User-supplied local PDF; exact-copy hash is recorded in the intake receipt.
- **Rights/provenance:** Redistribution authority not established. No book text is stored here; this ledger contains original synthesis and page locators.
- **Read:** Preface (printed pages ix–xii) and Chapters 1–10 (printed pages 1–254).
- **Excluded from substantive claim extraction:** Index (printed pages 255 onward); it was used only as navigation and coverage evidence.

## Author-position records

These records describe this author's framework. They are not universal findings or approved `content.md` behavior.

### `SWUX2-C01` — content design participates across an experience lifecycle

- **Locator:** Preface, printed pages ix–xii; Chapter 1, printed pages 1–10.
- **Documented practitioner position:** UX content includes interface strings and surrounding setup, onboarding, help, alerts, and support content. Its work connects the person's relationship with an experience across awareness, entry, use, disruption, support, and return.
- **Candidate implication:** A UX-writing request should identify journey stage and relationship context rather than accepting only a string type.
- **Boundary:** The lifecycle and commercial framing are the author's model. Different public-service, internal-tool, nonprofit, safety-critical, or noncommercial systems may define goals and stages differently.
- **Promotion status:** `candidate-context-field; not-approved`.

### `SWUX2-C02` — people and organizational goals are separate inputs

- **Locator:** Chapter 1, printed pages 1–6 and 11–15.
- **Documented practitioner position:** Content choices should begin with explicit goals for the people using the experience and for the organization. Effectiveness cannot be judged without a defined purpose.
- **Candidate implication:** Preserve `user_goal`, `organization_goal`, and possible conflict as separate fields; do not collapse them into a single success target.
- **Boundary:** An organizational goal does not justify deception, coercion, accessibility failure, false claims, or unsafe behavior. The repository's hard constraints remain noncompensatory.
- **Promotion status:** `strong-schema-candidate; requires-cross-source-review`.

### `SWUX2-C03` — content choice depends on purposes, opportunities, and constraints

- **Locator:** Chapter 1, printed pages 11–12.
- **Documented practitioner position:** Writing begins with collaboration to identify purposes and constraints, including business strategy, legal/regulatory context, localization resources, languages, devices, use context, technical/display limits, and whether deployed text can be updated.
- **Candidate implication:** Expand the pre-writing packet beyond tone and component type to include fact ownership, regulatory/risk context, locale, device, runtime mutability, display constraints, and cross-channel dependencies.
- **Boundary:** The book identifies categories but does not supply authoritative legal, accessibility, locale, or product facts for a particular adopter.
- **Promotion status:** `strong-schema-candidate; source-authority-required`.

### `SWUX2-C04` — drafting is collaborative, plural, contextual, and iterative

- **Locator:** Chapter 1, printed pages 12–15.
- **Documented practitioner position:** Teams should imagine meaningfully different solutions, draft in the design context, collaborate with domain and exclusion expertise, and test/refine alternatives. Existing products and LLMs may inspire options but lack the specific experience's purpose and constraints.
- **Candidate implication:** Candidate generation should normally return distinct approaches with contextual rationale, not superficial synonym variants. Repository evidence and model output remain inputs, not authority.
- **Boundary:** The author's preferred collaborative process may not be fully available on every team. The system must report missing context or expertise rather than fabricate it.
- **Promotion status:** `candidate-workflow-and-evaluation-requirement; not-approved`.

### `SWUX2-C05` — evaluation is tied to behavior and defined impact

- **Locator:** Chapter 1, printed pages 11–15.
- **Documented practitioner position:** UX writing is an iterative creation-and-measurement process; teams define what good content means for the experience and test candidate solutions.
- **Candidate implication:** Avoid a context-free “quality” score. Evaluation records should state the intended job, observable outcome, method, uncertainty, and noncompensatory constraints.
- **Boundary:** Chapter 1 introduces rather than fully specifies research methods. Detailed method claims must wait for Chapter 7 and independent methodological sources.
- **Promotion status:** `candidate-evaluation-principle; detailed-method-pending`.

### `SWUX2-C06` — a voice chart maps approved product principles to observable language choices

- **Locator:** Chapter 2, printed pages 22–40.
- **Documented practitioner position:** The proposed chart places ratified product principles on one axis and six language aspects on the other: concepts, vocabulary, verbosity, grammar, punctuation, and capitalization. Entries provide decision guidance rather than a single undifferentiated brand adjective.
- **Candidate implication:** The current `VoicePrinciple` model could optionally link principles to separately typed observable behaviors and mechanics. Concepts, preferred vocabulary, verbosity, grammar, punctuation, and capitalization must remain distinguishable because their evaluation methods and locale dependencies differ.
- **Boundary:** Six aspects are this author's operational framework, not a proven exhaustive ontology. Grammar, punctuation, and capitalization are language- and locale-dependent mechanics; vocabulary must remain separate from governed terminology; “concepts” must not authorize unsupported claims or promotional insertions.
- **Promotion status:** `candidate-profile-projection; cross-book-and-locale-review-required`.

### `SWUX2-C07` — voice and tone are related but not interchangeable

- **Locator:** Chapter 2, printed pages 22–23 and 37–40.
- **Documented practitioner position:** Voice provides recognizable continuity across an experience, while tone is intentional variation for moments such as errors, notifications, and celebration. Different principles within one chart may complement or conflict, allowing situational emphasis without replacing the overall voice.
- **Candidate implication:** This supports the repository's existing separation of `OrganizationVoiceProfile`, `VoicePrinciple`, `TonePolicy`, and `MessageContext`. A runtime must resolve which principle or range is salient for an exact message rather than flattening the profile into one prompt.
- **Boundary:** Recognition and trust are goals proposed by the author, not guaranteed outcomes. Situational tone must be evidenced and tested; emotional state must not be inferred from demographic proxies or component names.
- **Promotion status:** `corroborates-existing-separation; no-model-replacement`.

### `SWUX2-C08` — a voice system requires scoped ownership and ratification

- **Locator:** Chapter 2, printed pages 23–26 and 41–45.
- **Documented practitioner position:** Product principles should be developed through organizational research and stakeholder iteration, ratified at an appropriately authoritative level, socialized across teams, and used as an explicit decision reference. The content designer facilitates rather than unilaterally owning organizational principles.
- **Candidate implication:** An inferred or book-derived profile cannot become canon. A profile needs an accountable owner, exact version and scope, decision record, authorized approval, effective period, and supersession path.
- **Boundary:** The author's suggested ceremonies and executive sign-off reflect particular organizational practices. `content.md` must support other legitimate governance structures and must never infer authority from seniority or job title alone.
- **Promotion status:** `strong-governance-corroboration; implementation-shape-still-proposed`.

### `SWUX2-C09` — terminology, mechanics, and voice guidance should not collapse

- **Locator:** Chapter 2, printed pages 28–36.
- **Documented practitioner position:** The voice chart's vocabulary row contains a small set of personality-signaling choices and does not replace a word list or terminology list. Verbosity, grammar, punctuation, and capitalization receive separate guidance and may be omitted when a principle has no meaningful rule for that aspect.
- **Candidate implication:** Preserve `TermLabel`, terminology decisions, locale mechanics, and voice behaviors as different object types. Missing guidance should remain absent or unknown, not become a guessed default.
- **Boundary:** Some examples intentionally trade usability against brand expression. A profile can never waive semantic clarity, accessible names, sufficient instructions, or other applicable hard constraints.
- **Promotion status:** `corroborates-current-ontology; fixture-needed-for-conflict-resolution`.

### `SWUX2-C10` — voice-guided variants can broaden design exploration but not establish effectiveness

- **Locator:** Chapter 2, printed pages 41–44.
- **Documented practitioner position:** Designers can draft separate options by emphasizing different approved principles, then test them or use the ratified chart to structure decision-making when testing is unavailable. The chart may also inform prompts, datasets, or feedback for language models, but generated output requires accuracy checking.
- **Candidate implication:** Candidate generation can deliberately vary the applied voice principle while holding semantic meaning and hard constraints constant. Every candidate should expose its principle/rule trace; selection still requires contextual evaluation or an authorized decision.
- **Boundary:** Alignment to a chart does not prove usability, accessibility, truth, safety, audience response, or outcome improvement. The supplied book's uncertain redistribution provenance also means no book example may be copied into prompts, fixtures, or model-training data.
- **Promotion status:** `candidate-generation-method; training-use-not-authorized`.

### `SWUX2-C11` — conversational describes interaction structure, not casual tone

- **Locator:** Chapter 3, printed pages 47–48.
- **Documented practitioner position:** “Conversational” refers to a recognizable word-mediated interaction with turns and responses, not to a folksy, informal, or casual voice. The method can inform graphical, voice, or physical experiences and is not limited to chatbots.
- **Candidate implication:** Separate `InteractionDialogue` or an equivalent design artifact from `TonePolicy`. A flow may use conversational turn structure while retaining formal, restrained, technical, or high-consequence language.
- **Boundary:** Human conversation is an analogy and design resource, not proof that a product is a person or that human conversational norms transfer unchanged to every interface, language, culture, modality, or assistive-technology journey.
- **Promotion status:** `candidate-artifact-separation; cross-book-review-required`.

### `SWUX2-C12` — conversation-first exploration begins with endpoints, goals, and constraints

- **Locator:** Chapter 3, printed pages 48–53.
- **Documented practitioner position:** Before screens, a group identifies where a person starts, the outcome they seek, the person's goals, the organization's goals, and relevant constraints. Participants then role-play and reorder a possible dialogue, recording topics, useful phrases, terminology questions, and sequence.
- **Candidate implication:** A UX-writing task should be able to produce a pre-interface conversation map containing entry condition, desired outcome, participant roles, separate goals, constraints, proposed turns, topic sequence, terminology questions, and unresolved branches.
- **Boundary:** Role-play participants, personas, and LLM simulations are generative inputs rather than user evidence. They cannot establish actual motivations, comprehension, accessibility, behavior, or representativeness.
- **Promotion status:** `strong-design-artifact-candidate; evidence-label-required`.

### `SWUX2-C13` — dialogue must compile into semantic, behavioral, and surface-specific records

- **Locator:** Chapter 3, printed pages 53–55.
- **Documented practitioner position:** The refined conversation supplies provisional titles, descriptions, controls, options, terminology placement, sequence, and initial visual or voice-interface structure. It can reveal entry points, edge cases, error conditions, and additional paths.
- **Candidate implication:** Do not store the role-play transcript as the canonical content decision. Compile it into participant roles, semantic messages, behavior/state transitions, expression slots, surface constraints, terminology questions, and explicit missing paths while retaining provenance back to the design artifact.
- **Boundary:** A clean happy-path dialogue is incomplete by default. It does not prove the behavior exists, the sequence is technically feasible, the expressions are accessible, or the full state space is covered.
- **Promotion status:** `candidate-compiler-boundary; architecture-review-required`.

### `SWUX2-C14` — conversation maps require branch and adverse-state expansion

- **Locator:** Chapter 3, printed pages 54–56.
- **Documented practitioner position:** An initial path should be widened for different needs and circumstances and pressure-tested with entry points, edge cases, expired credentials, errors, and other disruptions.
- **Candidate implication:** A conversation-first capability needs an explicit coverage report across supported start states, success, cancellation, backtracking, validation, system failure, partial completion, permissions, offline/timeout, recovery, and accessibility-specific journeys where applicable.
- **Boundary:** The book gives a generative design method rather than a complete state taxonomy or conformance test. Required branches must come from actual behavior contracts, repository evidence, domain controls, and qualified review.
- **Promotion status:** `candidate-coverage-gate; taxonomy-and-fixtures-required`.

### `SWUX2-C15` — UX-text patterns are starting points, not mandatory containers or universal rules

- **Locator:** Chapter 4, printed pages 57–58.
- **Documented practitioner position:** The chapter offers reusable starting patterns for eleven common interaction types, based on the author's proprietary English-language research and practice. Patterns guide purpose, structure, and drafting but neither prescribe exact wording nor prove that text is the right solution.
- **Candidate implication:** Represent patterns as versioned, sourced, locale-scoped advisory templates attached to semantic and component contracts. Each pattern needs applicability, limitations, counterexamples, and an abstention path.
- **Boundary:** The underlying proprietary studies cannot be independently inspected here, and the author explicitly limits transfer beyond English. Pattern conformance cannot stand in for usability, accessibility, localization, behavior, or outcome evidence.
- **Promotion status:** `pattern-source-admitted-as-practitioner-evidence; no-universal-enforcement`.

### `SWUX2-C16` — titles choose between orientation and task direction

- **Locator:** Chapter 4, printed pages 58–63.
- **Documented practitioner position:** Titles provide high-level context or direct a single task. Context titles name the experience, content, or broader area; task titles use an action phrase. Expected vocabulary and brevity help people scan or listen for orientation.
- **Candidate implication:** A title request should declare `content_job: orient | direct_task`, hierarchy level, route/task context, expected user vocabulary, and accessible heading/title relationships. Page title, visible heading, navigation label, and document metadata must remain separate slots even when their expressions overlap.
- **Boundary:** The proposed English phrase forms and brevity guidance are not universal. A title cannot compensate for incorrect heading structure, misleading navigation, missing programmatic context, or an ambiguous state.
- **Promotion status:** `candidate-pattern-family; semantic-and-accessibility-contract-required`.

### `SWUX2-C17` — action labels express commitment within a behavior contract

- **Locator:** Chapter 4, printed pages 64–68.
- **Documented practitioner position:** Buttons and menu items should make the person's next step recognizable and specific, be designed within their set, and use language that matches the intended action. Icon-only actions still require designed screen-reader text, including rules for dynamic names.
- **Candidate implication:** Button text must bind to trigger, actor, preconditions, effect, timing, reversibility, state, and recovery. Candidate records should distinguish visible label, accessible name, icon description, menu-set membership, action priority, and dynamic variables.
- **Boundary:** One- or two-word English guidance is a heuristic rather than a hard limit. Matching title and button wording cannot override the need to disclose consequential effects, distinguish navigation from mutation, or provide a complete accessible name.
- **Promotion status:** `strong-pattern-and-behavior-candidate; locale-and-risk-review-required`.

### `SWUX2-C18` — descriptions provide optional or necessary context under different reading conditions

- **Locator:** Chapter 4, printed pages 69–76.
- **Documented practitioner position:** Descriptions set expectations, explain operation, support confidence, expose disclosures, and provide additional guidance. The author recommends scannable chunks, salient vocabulary, plain presentation of material qualifications, meaningful link phrases, and progressive access to detail.
- **Candidate implication:** A description slot needs an explicit content job, materiality, dependency on the primary task, disclosure owner, progressive-disclosure path, link purpose, and reading-order/accessibility contract. Required information must not be demoted merely to make the interface visually sparse.
- **Boundary:** Character/line limits and keyword-placement advice derive from English and unavailable proprietary research. Legal sufficiency, informed consent, regulatory notice, and material comprehension require their own applicable authority and evaluation; displaying text does not prove it was understood.
- **Promotion status:** `candidate-description-contract; hard-materiality-review-before-style`.

### `SWUX2-C19` — empty states encode cause, expectation, agency, and next action

- **Locator:** Chapter 4, printed pages 76–80.
- **Documented practitioner position:** Empty-state content should show that absence is intentional, explain how content may appear, and provide a useful action when one exists. The suggested structure varies when the viewer can populate the state, another actor or future event will populate it, or no immediate action is available.
- **Candidate implication:** Empty states require a cause/state enum and evidence: first use, user-cleared, filtered zero results, permission-limited, unavailable dependency, loading/fetch failure, delayed generation, another actor's absence, or truly empty data. The schema should separately capture expected future condition, user agency, recovery/action, and whether the state is blocking.
- **Boundary:** Empty states are not inherently playful brand opportunities. Sensitive absence, denial, failure, or consequential uncertainty should prioritize accurate state and recovery. A disabled future field also needs a valid disabled/read-only semantic and focus/announcement contract.
- **Promotion status:** `strong-state-pattern-candidate; cause-taxonomy-and-fixtures-required`.

### `SWUX2-C20` — labels are compact semantic mappings with variable and locale contracts

- **Locator:** Chapter 4, printed pages 81–85.
- **Documented practitioner position:** Labels identify sections, categories, status, progress, quantity, or units using compact terms. They should be specific, differentiated within their set, research-informed, and designed with all dynamic values, number/date/currency formats, and localization layouts in mind.
- **Candidate implication:** Bind each label to a concept, local semantic role, value type, variable constraints, locale formatter, accessible relationship, and set context. Do not concatenate prepositions or fragments where translation requires reordering. Stable internal locators must remain distinct from translated visible and accessible labels.
- **Boundary:** A noun/number/unit pattern is not sufficient for every language or semantic role. Abbreviations, icon statistics, footnote markers, and inferred AI labels need comprehension, disclosure, and accessibility review.
- **Promotion status:** `strong-content-model-and-locale-candidate; implementation-contract-required`.

### `SWUX2-C21` — control names must make every state intelligible

- **Locator:** Chapter 4, printed pages 85–88.
- **Documented practitioner position:** Controls have a recognizable name and one or more states. The wording must remain meaningful across checked/unchecked, on/off, range endpoints, or other possible states; related controls benefit from clear grouping and parallel construction.
- **Candidate implication:** A control-content contract should carry semantic role, stable control identity, visible label, accessible name, allowed states, state announcements, value labels, group label, disabled/read-only/required/invalid behavior, and help/support terminology. Wording must be checked against every reachable state, not only the default screenshot.
- **Boundary:** Physical-control metaphors and binary state language do not cover every composite widget. Component behavior, keyboard interaction, focus, and state exposure come from native/ARIA and implementation contracts, not from copy patterns.
- **Promotion status:** `strong-component-content-candidate; behavior-and-a11y-contract-required`.

### `SWUX2-C22` — input content coordinates labels, guidance, defaults, and validation

- **Locator:** Chapter 4, printed pages 89–93.
- **Documented practitioner position:** Text inputs may use persistent labels, examples, instructions, success guidance, and reliable prefilled values to help people enter accurate information. The author acknowledges that placeholder-only designs lose context after entry and reduce usability.
- **Candidate implication:** An input-content record should distinguish persistent visible label, programmatic label, example, format/help instruction, initial/default value, user value, generated suggestion, correction guidance, required/optional state, autocomplete/input-purpose metadata, and field/group error relationships. Generated or inferred defaults require provenance, editability, and accuracy review.
- **Boundary:** Placeholder text must not be promoted as a sufficient label. Prefilling is safe only when the value's source, current applicability, privacy boundary, and likelihood of correctness are established; consequential submissions also need review/correction or reversal where applicable.
- **Promotion status:** `strong-form-content-candidate; semantic-a11y-and-data-provenance-contract-required`.

### `SWUX2-C23` — transitional text reports a real in-progress state

- **Locator:** Chapter 4, printed pages 93–97.
- **Documented practitioner position:** Transitional text acknowledges receipt of an action and indicates that processing continues during a delay. It should usually require no additional action and should describe the process specifically enough to reassure the person that the intended request is underway.
- **Candidate implication:** Bind every transitional expression to a verified operation state with start condition, affected object, progress knowledge, cancellation/retry behavior, timeout, safe navigation rules, final states, `busy`/progress semantics, announcement policy, and reduced-motion alternative.
- **Boundary:** Language cannot manufacture progress. Artificial delay for excitement, ellipses that imply brevity, or a present-progress verb are unsafe when duration or operation state is unknown. Repeated live announcements and indefinite waiting require explicit handling.
- **Promotion status:** `strong-runtime-state-candidate; behavior-and-announcement-binding-required`.

### `SWUX2-C24` — completion messages must distinguish effect from acknowledgment

- **Locator:** Chapter 4, printed pages 98–101.
- **Documented practitioner position:** Post-action confirmation messages report that an expected operation or result is complete, often using a verb paired with the preceding transition. They may be omitted when the change itself is sufficiently apparent, including to screen-reader users, and may set expectations for delayed downstream responses.
- **Candidate implication:** Model post-action `completion_feedback` separately from pre-action `intent_confirmation`. A completion message must identify the exact committed effect, persistence level, affected object, downstream pending work, expected response window, undo/recovery path, and visual/assistive announcement behavior.
- **Boundary:** “Saved,” “sent,” “submitted,” “deleted,” or “complete” is a controlled state claim, not stylistic reassurance. UI acknowledgment, local queuing, server receipt, durable commit, external delivery, and business completion are different states and must not share wording without a verified equivalence.
- **Promotion status:** `strong-semantic-state-candidate; false-success-hard-failure`.

### `SWUX2-C25` — notifications are governed interruptions with privacy and delivery constraints

- **Locator:** Chapter 4, printed pages 101–105.
- **Documented practitioner position:** Notifications interrupt attention and should provide timely value, convey the needed action quickly, work across their possible presentation contexts, and be planned as a system to avoid overload. People should have appropriate controls over which notifications they receive.
- **Candidate implication:** A notification contract needs trigger/event, recipient, semantic state, urgency/time sensitivity, delivery surfaces, privacy exposure, lock-screen-safe expression, truncation variants, action/deep link, persistence/dismissal, frequency/bundling, consent/preference, accessible announcement, and fallback channel.
- **Boundary:** Engagement is not sufficient justification for interruption. Curiosity, humor, or obfuscation cannot conceal material state or override privacy, consent, safety, comprehension, or accessibility. Temporary toasts are inappropriate when information or recovery must persist.
- **Promotion status:** `strong-channel-contract-candidate; interruption-and-privacy-review-required`.

### `SWUX2-C26` — error content starts from correct state and viable recovery

- **Locator:** Chapter 4, printed pages 105–111.
- **Documented practitioner position:** Errors should help people continue without blame, identify when progress is impossible, provide useful detail for the audience, and match the degree of interruption. The author groups examples as inline correction, detour with an alternative route, and blocking condition.
- **Candidate implication:** Error records should bind technical cause/evidence, user-visible state, affected operation/object, commitment boundary, consequence, retry safety, correction/recovery/alternative, availability estimate only when supported, diagnostics visibility, field/error association, focus and live-announcement behavior, support route, and resolution event. `inline | detour | blocking` can describe presentation/interruption but must not replace root-cause or state taxonomy.
- **Boundary:** Avoiding blame does not permit hiding responsibility or material cause. “Try again” is unsafe after a possibly committed consequential operation unless idempotency or status verification is established. Brand expression is subordinate to accurate state, recovery, non-disclosure, and accessibility.
- **Promotion status:** `strong-error-contract-candidate; state-and-retry-hard-gates-required`.

### `SWUX2-C27` — pattern completion does not establish product completion

- **Locator:** Chapter 4, printed page 111.
- **Documented practitioner position:** The patterns are intended to overcome the blank page and seed iteration rather than supply the best answer in every circumstance.
- **Candidate implication:** A generated candidate must retain its pattern source and remain `proposed`. Pattern fit cannot set semantic-decision, approval, implementation, release, or evaluation status.
- **Boundary:** Frequency of past use, claimed scale, or familiarity is not proof for a new product, locale, audience, risk class, or assistive-technology journey.
- **Promotion status:** `corroborates-evidence-decision-delivery-separation`.

### `SWUX2-C28` — generated content needs a specific, bounded job

- **Locator:** Chapter 5, printed pages 113–121.
- **Documented practitioner position:** Designing an LLM-based experience begins by defining the content to generate, its audience, the purpose it serves, and how people will use it. The fictional LitMop example treats copious, individually distinct but structurally repetitive performance narratives as a candidate use case and keeps factual goal data separate from celebratory framing.
- **Candidate implication:** An AI-content proposal should declare the exact content job, affected people, source inputs, intended use, prohibited uses, current alternative, scale/repetition claim, and why deterministic composition or ordinary workflow is insufficient. Facts, inferences, and rhetorical framing must remain separately typed.
- **Boundary:** Repetition and volume do not alone justify generation. LitMop's output informs bonuses, promotion, hiring, and firing, making it a high-impact employment scenario; the fictional example is not evidence that such a system is safe, lawful, fair, or appropriate. Applicable domain governance and qualified human authority must precede implementation.
- **Promotion status:** `strong-problem-definition-candidate; high-impact-use-gate-required`.

### `SWUX2-C29` — model capability selection follows content requirements

- **Locator:** Chapter 5, printed pages 115–119.
- **Documented practitioner position:** Content designers contribute to model selection by specifying the kinds of content and transformations the experience requires, while engineering and product roles consider operating constraints. Training-data applicability and bias, fine-tuning needs, prompt constraints, and task-specific capabilities are relevant to the choice.
- **Candidate implication:** Provider/model selection should be downstream of a versioned capability contract and include intended and prohibited use, input/output types, domain and locale coverage, data sent, retention and region, latency/availability, model-change policy, safety controls, evaluation evidence, fallback, and exit path.
- **Boundary:** The chapter's simplified account of model training, tokens, vectors, and named-entity capability is explanatory and dated technical description, not a runtime guarantee or sufficient procurement record. Current provider documentation and observed evaluation must establish actual behavior.
- **Promotion status:** `candidate-provider-requirements-link; current-primary-evidence-required`.

### `SWUX2-C30` — fluent generation is probabilistic rather than epistemic authority

- **Locator:** Chapter 5, printed pages 115–118 and 128–130.
- **Documented practitioner position:** LLMs generate statistically likely token sequences without knowing whether training material or output is accurate. Human readers may mistake fluent confidence for justified confidence, and disclaimers may not prevent complacency over time.
- **Candidate implication:** Generated prose cannot establish truth, confidence, completion, permission, or a consequential decision. The system needs source/provenance handling, claim verification, uncertainty and abstention behavior, constrained authority, and escalation or human review proportionate to harm.
- **Boundary:** The author's technical analogy and cited examples do not define a complete model-risk framework. The repository must rely on current primary technical, legal, domain, and evaluation evidence for controls; a caveat in the interface is not a substitute for those controls.
- **Promotion status:** `corroborates-probabilistic-output-boundary; hard-authority-gate`.

### `SWUX2-C31` — “good” output is contextual, example-based, and expert-labeled

- **Locator:** Chapter 5, printed pages 121–126.
- **Documented practitioner position:** Teams can audit existing in-product and surrounding content, collect both positive and negative examples, have people with relevant domain expertise label them, and analyze agreed examples for observable attributes. Effectiveness is context-dependent; length is a design constraint rather than proof of quality.
- **Candidate implication:** Evaluation datasets should preserve task and context, inclusion basis, rights/provenance, expert role, independent labels and disagreement, positive and counterexamples, observable criteria, locale, risk class, and dataset/evaluator version. Hard failures must remain separate from softer style dimensions and no single global quality score should erase disagreement.
- **Boundary:** Historical content, competitors' public text, and expert judgment may encode bias or lack authorization for reuse. Domain experts are not substitutes for affected-user research, accessibility evaluation, legal authority, or outcome evidence. Book examples may not be copied into training or fixtures under the supplied copy's uncertain provenance.
- **Promotion status:** `strong-evaluation-artifact-candidate; rights-bias-and-representativeness-review-required`.

### `SWUX2-C32` — generated-content requirements include helpfulness, accuracy, harm, auditability, and sustainability

- **Locator:** Chapter 5, printed pages 127–133.
- **Documented practitioner position:** The author proposes five durable planning concerns: whether content is helpful for a defined purpose, accurate enough for its use, designed to reduce harm, auditable after delivery, and sustainable over its lifecycle. The chapter also calls out bias, human complacency, retention, security, maintenance, drift, processing cost, and environmental resources.
- **Candidate implication:** An AI feature packet should contain separate requirement and evidence records for utility, factuality/bias, harm scenarios, audit events and retention authority, lifecycle/operating cost, monitoring, drift, incident handling, and decommissioning. These dimensions should not compensate for one another.
- **Boundary:** “HAHAS” is this author's organizing device, not a complete compliance or assurance standard. Regulation, liability, environmental accounting, provider economics, and technical mitigations are time- and jurisdiction-sensitive. Current authoritative sources and accountable owners must define each applicable control.
- **Promotion status:** `candidate-risk-review-projection; not-a-compliance-standard`.

### `SWUX2-C33` — input design and incentives are part of generated-output quality

- **Locator:** Chapter 5, printed pages 132–133.
- **Documented practitioner position:** Prompts combine system-controlled instructions with input from a person or another source. Accurate output depends partly on eliciting accurate input through a usable interface and aligned incentives; people may supply unreliable or adversarial input when incentives are ambiguous or opposed.
- **Candidate implication:** Model each input with source, purpose, authority, sensitivity, validation, incentive/conflict analysis, trust boundary, editability, and downstream claim mapping. Treat user, retrieved, repository, and third-party text as untrusted data; constrain tools and output schemas, and define rejection, correction, abstention, and escalation paths.
- **Boundary:** Better microcopy cannot guarantee truthful input or defeat prompt injection. Security controls, data minimization, authorization, validation, sandboxing, and observed adversarial evaluation belong to the implementation and provider contracts.
- **Promotion status:** `strong-input-contract-candidate; security-and-validation-hard-gates-required`.

### `SWUX2-C34` — prompts are versioned design artifacts, not hidden guarantees

- **Locator:** Chapter 5, printed pages 134–139.
- **Documented practitioner position:** A product may combine visible user data with hidden system instructions, structured fields, and examples to shape generated output. Early prompt/completion sketches communicate assumptions across content, design, engineering, and product roles; zero-shot and example-based iterations expose failures before broader testing.
- **Candidate implication:** Treat a prompt as a versioned, reviewable artifact linked to its purpose, inputs, examples, output schema, model/provider configuration, token/context constraints, evaluation run, owner, approval, deployment, and rollback. Preserve which prompt components are visible, disclosed, or system-controlled without assuming secrecy is a security boundary.
- **Boundary:** Clear instructions and examples may improve sampled results but cannot guarantee instruction following, length, factuality, or safety. Prompt content must not embed unlicensed examples or undisclosed sensitive data, and system-prompt confidentiality cannot replace authorization and runtime controls.
- **Promotion status:** `strong-prompt-artifact-candidate; evaluation-and-security-binding-required`.

### `SWUX2-C35` — realistic test inputs include ordinary, degraded, and adversarial cases

- **Locator:** Chapter 5, printed pages 139–143.
- **Documented practitioner position:** A broad input set should reflect actual interaction, motivations, roles, ideal and nonideal data, and deliberately combative attempts. Because outputs vary, teams should sample repeatedly and rerun tests whenever the model, prompt, variables, or tuning changes.
- **Candidate implication:** Evaluation suites need representative task strata, valid and malformed data, boundary values, missing context, locale/accessibility cases, conflicting incentives, abuse and prompt-injection cases, repeated trials, nondeterminism reporting, and explicit rerun triggers keyed to every relevant versioned dependency.
- **Boundary:** Personas or synthetic inputs are hypotheses, not proof of representativeness. A fixed number such as “hundreds” is not a universal sample-size rule; coverage and statistical sufficiency must be justified by the use, output distribution, failure severity, and qualified evaluation method.
- **Promotion status:** `strong-evaluation-suite-candidate; coverage-and-sufficiency-method-required`.

### `SWUX2-C36` — retrieval and tools expand both grounding and authority boundaries

- **Locator:** Chapter 5, printed pages 141–143.
- **Documented practitioner position:** Retrieval can add documents or current internal material to the model context, while APIs and an orchestration layer can add task-specific capabilities and actions. These extensions may improve targeted accuracy or utility but require additional engineering coordination.
- **Candidate implication:** Every retrieved item and tool call should carry source, owner, version/time, tenant, access decision, sensitivity, integrity, citation/claim mapping, and retention policy. Tool use additionally requires allowed actions, least privilege, argument validation, confirmation/approval boundaries, idempotency, execution result, recovery, and audit evidence.
- **Boundary:** Retrieval does not establish truth, authorization, freshness, completeness, or resistance to poisoning. A model must not infer permission to access or act from text. Retrieved and third-party content remains untrusted, and generated text must remain distinct from verified tool execution.
- **Promotion status:** `strong-context-and-tool-contract-candidate; least-authority-hard-gate`.

### `SWUX2-C37` — evaluation data requires separation, provenance, and contamination controls

- **Locator:** Chapter 5, printed pages 143–145.
- **Documented practitioner position:** The author recommends maintaining distinct data for training, development-time testing, and final validation so examples used to improve the system do not also serve as independent evidence of success. Human-produced content can provide a baseline for generated output.
- **Candidate implication:** Dataset records should state source rights, collection purpose, population and exclusions, partition method, deduplication/contamination checks, version, access, labeling protocol, benchmark, intended uses, prohibited uses, and retirement. Release evidence must identify untouched evaluation partitions and prevent training or iterative prompt work from consuming them.
- **Boundary:** The chapter's approximate split and its use of “testing” versus “validation” are illustrative, not a universal statistical protocol. Historical human output is not automatically a desirable or unbiased baseline. Dataset size, partitioning, leakage controls, and inference must be chosen by qualified practitioners for the specific task.
- **Promotion status:** `strong-dataset-governance-candidate; statistical-method-required`.

### `SWUX2-C38` — qualitative criteria and automated metrics answer different questions

- **Locator:** Chapter 5, printed pages 144–148.
- **Documented practitioner position:** Domain experts can label sampled outputs against contextual positive and unacceptable attributes, while automated measures support larger-scale comparison and monitoring. The chapter explains ROUGE and perplexity as limited signals and warns that predictability or textual similarity does not establish useful, accurate, harmless, auditable, or sustainable content.
- **Candidate implication:** An evaluation plan should map each criterion to an appropriate evaluator, method, threshold, uncertainty, disagreement handling, and failure severity. Preserve raw per-example results and slices; do not collapse factuality, safety, usability, accessibility, style, latency, and cost into one compensatory score. Automated judges themselves require versioning, calibration, security review, and human checks.
- **Boundary:** The LitMop checkbox arithmetic and thresholds are fictional illustrations. ROUGE, perplexity, or an LLM judge may be inappropriate for a task and cannot substitute for outcome, affected-user, domain, accessibility, or harm evaluation.
- **Promotion status:** `strong-evaluation-separation-candidate; metric-validity-required`.

### `SWUX2-C39` — tuning and inference controls are changes that require fresh evidence

- **Locator:** Chapter 5, printed pages 148–151.
- **Documented practitioner position:** Teams may adapt outputs through fine-tuning, labeled examples, and model variables that change diversity or predictability. The author emphasizes that probabilistic improvement cannot be precisely predicted and that consequential experiences need feedback from relevant humans and domain experts before shipping.
- **Candidate implication:** Fine-tuning dataset, labeling workforce, base model, method, parameters, inference settings, and resulting model artifact must be versioned with rights, bias, labor, privacy, evaluation, and rollback records. Any change invalidates dependent evidence until required suites and reviews rerun.
- **Boundary:** Lower randomness is not equivalent to factuality or safety, and the book's simplified descriptions of sampling controls are not portable API contracts. Expert feedback informs evidence but does not itself grant legal authority, affected-person consent, product approval, or release status.
- **Promotion status:** `strong-change-control-candidate; fresh-evidence-required`.

### `SWUX2-C40` — shipping begins continuous operation rather than ending evaluation

- **Locator:** Chapter 5, printed pages 151–153.
- **Documented practitioner position:** Integration changes performance, cost, prompt size, and behavior tradeoffs; teams should reassess business and ethical concerns near release and expect unanticipated real-world use. Post-release plans include measurement, adjustment, possible learning from edited output, and continued human oversight.
- **Candidate implication:** A release packet needs exact model/prompt/retrieval/tool versions, pre-release gates, phased rollout, monitoring measures and slices, alert owners, feedback and appeal routes, rollback/fallback, incident handling, data-use authority, drift/revalidation triggers, and decommissioning. User edits or feedback must not silently become training data.
- **Boundary:** Legal/privacy review at the end is too late for high-risk or sensitive-data systems and cannot repair an unjustified use case. Post-release data reuse requires explicit purpose, rights, consent or other lawful authority, minimization, representativeness analysis, and protection against feedback loops and poisoning.
- **Promotion status:** `strong-production-lifecycle-candidate; continuous-governance-required`.

### `SWUX2-C41` — editing is product design, not terminal proofreading

- **Locator:** Chapter 6, printed pages 155–157.
- **Documented practitioner position:** Editing begins with whether interface text fulfills its purpose and may expose naming, disclosure, hierarchy, or interaction problems that require substantial redesign. Grammar and spelling checks come at the end; involving content design during research and design avoids treating approved layouts as immutable constraints.
- **Candidate implication:** An edit request should retain authority to propose semantic, behavioral, hierarchy, component, and flow changes when evidence shows prose-only revision cannot perform the job. Classify each proposed change by layer and route it to the corresponding owner rather than silently altering product meaning.
- **Boundary:** A content designer cannot unilaterally change behavior, legal commitments, domain facts, accessibility semantics, or approved policy. “Edit” does not authorize implementation or approval, and organizational efficiency claims in the chapter are practitioner assertions rather than measured universal effects.
- **Promotion status:** `strong-edit-scope-candidate; typed-change-and-authority-routing-required`.

### `SWUX2-C42` — the four editing passes protect different qualities

- **Locator:** Chapter 6, printed pages 156–157 and 165.
- **Documented practitioner position:** The author's repeatable method checks whether text is purposeful, concise, conversational, and clear, in that order. Purpose work may expand a draft before concision reduces it; later passes restore natural interaction and verify understanding.
- **Candidate implication:** Candidate revision can expose four distinct passes with before/after diffs, preserved requirements, rationale, unresolved questions, and regressions. The system should recheck earlier passes after every edit because concision, voice, or clarity changes can alter purpose and meaning.
- **Boundary:** This sequence is one practitioner's workflow, not an exhaustive or mandatory quality ontology. Truth, safety, accessibility, consent, privacy, localization, terminology, behavior, and legal requirements are independent hard constraints, not a fifth compensable style score.
- **Promotion status:** `candidate-editorial-workflow; hard-constraint-envelope-required`.

### `SWUX2-C43` — purpose is an evidenced message job, not an imagined user state

- **Locator:** Chapter 6, printed pages 157–159.
- **Documented practitioner position:** Before rewriting, the editor identifies what the message must help a person and the organization accomplish, checks assumptions with stakeholders, considers the broader experience, and relates the primary job to a measurable outcome. A message may serve several purposes without including every possible brand concept.
- **Candidate implication:** Each edit should begin from a versioned `content_job`, user goal, organization goal, trigger/state, affected behavior, material facts, desired outcome, measurement plan, and source for every assumption. Conflicts and lower-priority purposes stay explicit instead of being blended into persuasive copy.
- **Boundary:** The chapter's imagined transit-rider scenario is hypothesis generation, not user evidence. Stakeholder agreement cannot prove user motivation, emotional state, accessibility, comprehension, or causal impact. Business and brand goals cannot override accurate state, autonomy, or noncompensatory constraints.
- **Promotion status:** `strong-purpose-pass-candidate; evidence-label-and-conflict-report-required`.

### `SWUX2-C44` — concision preserves the minimum complete meaning within a resilient layout

- **Locator:** Chapter 6, printed pages 159–162.
- **Documented practitioner position:** Concision removes words toward a message's core meaning, experiments with information order, and accounts for limited attention and layout space. The author explicitly rejects the shortest option when it removes necessary context and asks teams to design flexible layouts for shorter and longer translations.
- **Candidate implication:** A concision pass should maintain a semantic invariant containing state, actor/object, action or consequence, material qualification, timing, and recovery as applicable. Validate the candidate in context across supported locales, zoom/reflow, user text spacing, dynamic values, truncation, and assistive-technology reading order rather than enforcing a single character budget.
- **Boundary:** The English scanning, line-count, character-width, memory-position, and expansion heuristics are not universal constraints and cannot justify clipping, abbreviating, or removing required information. Layout must adapt to content; English source text should not be mechanically shortened to reserve a fixed percentage for every language.
- **Promotion status:** `strong-concision-pass-candidate; semantic-and-responsive-validation-required`.

### `SWUX2-C45` — conversational editing evaluates the whole interaction sequence

- **Locator:** Chapter 6, printed pages 162–163.
- **Documented practitioner position:** Conversational editing checks whether product statements and user actions form a recognizable, nonabrupt exchange rather than imposing a casual voice. Reading titles, descriptions, actions, links, and hidden screen-reader text aloud in their logical sequence can expose awkward or incomplete interaction.
- **Candidate implication:** Review the resolved multimodal sequence: visible text, accessible name and description, semantic role/state, focus order, live announcements, user response labels, and subsequent feedback. Preserve alignment between visible action text and accessible naming while allowing additional context where it is necessary and nonconflicting.
- **Boundary:** Reading aloud is a useful authoring check, not an accessibility test or evidence of actual screen-reader behavior. Assistive technologies differ, role announcement order is platform-dependent, and a human-conversation metaphor must not imply personhood, emotion, or unsupported agency.
- **Promotion status:** `strong-interaction-readthrough-candidate; platform-and-user-evaluation-required`.

### `SWUX2-C46` — clarity depends on audience vocabulary, context, and locale

- **Locator:** Chapter 6, printed pages 163–164.
- **Documented practitioner position:** Editors return to the message purpose and use words the intended people can recognize in context, balancing common language with legitimate specialist terminology. Idioms and metaphors need locale-aware alternatives, and translators' culturally natural solutions should be respected.
- **Candidate implication:** A clarity pass should bind terms to audience/domain evidence and governed terminology, flag jargon, ambiguity, idiom, metaphor, negation, and cultural dependence, and route locale-specific adaptation to qualified language owners. Source intent and material facts remain stable while expressions may differ substantially across locales.
- **Boundary:** “Simple” or “common” is audience-, domain-, and language-dependent and cannot be inferred from frequency alone. A fallback source-language phrase or code comment is not a localization workflow; locale records need ownership, context, variables, review, testing, and release status.
- **Promotion status:** `strong-clarity-and-localization-candidate; locale-authority-required`.

### `SWUX2-C47` — candidate options need meaningful differences and decision provenance

- **Locator:** Chapter 6, printed pages 163–165.
- **Documented practitioner position:** The author recommends presenting up to three viable options, ordered by professional preference, with an explanation of their meaningful differences, and testing them when possible. Earlier drafts remain eligible when later iteration does not improve the result.
- **Candidate implication:** Preserve a small candidate set only when each option has the same verified semantic contract and a distinct, declared hypothesis. Record source version, diff, rationale, predicted tradeoff, editor recommendation, evaluation evidence, decision maker, approval, and rejection reason; do not equate recency or edit count with quality.
- **Boundary:** Team preference is a decision, not evidence of effectiveness. Multiple options must not reopen settled facts or hide materially different behaviors inside wording alternatives, and a model-generated ranking cannot grant approval.
- **Promotion status:** `strong-candidate-review-candidate; evidence-decision-separation-required`.

### `SWUX2-C48` — effectiveness requires feedback tied to a defined content job

- **Locator:** Chapter 7, printed pages 167–169 and 206–208.
- **Documented practitioner position:** Content teams should begin from how a product defines success, connect proposed work to observable outcomes where possible, and combine quantitative behavior, qualitative research, and heuristic judgment. The chapter warns against optimizing one target blindly and closes by treating every heuristic conclusion as a hypothesis rather than proof.
- **Candidate implication:** Every effectiveness claim should link a versioned message/change, content job, population, context, construct, operational measure, method, observation window, result, uncertainty, limitations, and decision. Preserve `author-position`, `hypothesis`, `observation`, `causal-estimate`, and `approved-decision` as separate evidence states.
- **Boundary:** Logical influence, confidence, or an agreed business metric does not prove that wording caused an outcome. Unmeasured benefits remain hypotheses; measurable business gains cannot compensate for harm, exclusion, deception, or inaccessible use.
- **Promotion status:** `strong-evidence-chain-candidate; causal-status-required`.

### `SWUX2-C49` — experiments need a preregistered causal and operational contract

- **Locator:** Chapter 7, printed pages 169–171 and 175–176.
- **Documented practitioner position:** The chapter presents A/B testing as a direct way to compare a changed experience with a control, requiring sufficiently similar and large groups, a declared duration, measured behavior, and meaningful minimum difference. It also notes that experiments may be infeasible and do not explain why a variant performed differently.
- **Candidate implication:** A content experiment record should fix before launch the hypothesis and mechanism, unit of assignment and analysis, eligibility/exclusions, variants and exact content versions, exposure event, primary outcome, guardrails, minimum important effect, power/sample plan, duration/stopping rule, segments, interference risks, and decision rule. Validate assignment, exposure, sample ratio, event completeness, novelty, concurrent experiments, and implementation parity before interpreting estimates.
- **Boundary:** “Statistical significance” alone is neither practical importance nor trustworthy causality. The book does not specify randomization, inference model, multiple-testing control, peeking, attrition, sample-ratio mismatch, spillover, or uncertainty intervals; qualified methodological review is required.
- **Promotion status:** `strong-experiment-packet-candidate; statistical-design-authority-required`.

### `SWUX2-C50` — product metrics are operational definitions with competing interpretations

- **Locator:** Chapter 7, printed pages 171–176.
- **Documented practitioner position:** The author illustrates onboarding pace, engagement, retention, completion/abandonment, referrals, and cost reduction as behaviors or business outcomes that content changes might affect. Each metric depends on a locally meaningful definition of activity, completion, time, or cost.
- **Candidate implication:** Metric records need stable identifier/version, construct, numerator/denominator or event formula, unit, source events, actor/object identity, eligibility, window, timezone, attribution, missing/duplicate handling, baseline, segments, owner, and known confounds. Separate leading, primary, secondary, guardrail, accessibility, harm, and operational measures.
- **Boundary:** Opening, clicking, returning, completing, referring, or reducing support contact is not inherently beneficial or evidence of understanding. The chapter's examples are fictional and its assertions about likely content impact require product-specific testing.
- **Promotion status:** `strong-metric-definition-candidate; construct-validity-required`.

### `SWUX2-C51` — optimization requires noncompensatory harm and autonomy guardrails

- **Locator:** Chapter 7, printed pages 172–175.
- **Documented practitioner position:** The chapter explicitly warns that maximizing engagement or retention can produce addiction, attention loss, isolation, debt, and damaged relationships while remaining profitable. It asks teams to decide how much is too much.
- **Candidate implication:** Experiment and release packets must define prohibited mechanisms and guardrails for autonomy, compulsion, privacy, financial loss, unsafe interruption, exclusion, complaints, reversals, and affected-person outcomes as applicable. A guardrail breach blocks rollout rather than being averaged against a primary-metric gain.
- **Boundary:** A generic threshold or dashboard cannot establish acceptable risk. High-impact, vulnerable-population, addictive, financial, health, employment, or civic contexts require domain authority, ethics/privacy review, affected-person research, and ongoing recourse.
- **Promotion status:** `strong-noncompensatory-guardrail-candidate; domain-governance-required`.

### `SWUX2-C52` — qualitative sources reveal context but carry sampling and interpretation limits

- **Locator:** Chapter 7, printed pages 176–181 and 207–208.
- **Documented practitioner position:** Existing feedback, interviews, usability tests, codesign, card sorts, “magic wand” prompts, and surveys can reveal vocabulary, expectations, confusion, priorities, and explanations for behavior. The author encourages inclusion of viewpoints absent from the team and warns that questions can introduce bias and that people may misattribute their own behavior.
- **Candidate implication:** A research-evidence record should preserve research question, method, recruitment frame, inclusion/exclusion, participant context, consent and compensation, instrument/protocol, moderator, raw-data authority, coding/analysis, dissenting cases, accessibility accommodations, privacy/retention, limitations, and exact claim scope. User language may become a terminology candidate with provenance, not an automatic canonical term.
- **Boundary:** Reviews, support contacts, social comments, conference recruits, surveys, and a few interviews are self-selected or context-limited and cannot represent all affected people. Codesign participation does not transfer product accountability or turn requests into validated requirements.
- **Promotion status:** `strong-research-provenance-candidate; representativeness-and-ethics-review-required`.

### `SWUX2-C53` — comprehension assessment differs from preference and exposure

- **Locator:** Chapter 7, printed pages 180–181.
- **Documented practitioner position:** The chapter distinguishes surveys about perceptions from assessments intended to determine whether people understood key concepts, especially for privacy, security, healthcare, or advertising content. Questions and answer options must avoid revealing the expected response without actual understanding.
- **Candidate implication:** A comprehension test should identify the material proposition, decisions it enables, acceptable paraphrases or application tasks, distractor rationale, scoring rule, audience/locale, delayed or transfer checks when relevant, and false-positive risk. Measure whether people can apply the information, not merely recognize wording or report confidence.
- **Boundary:** Passing a quiz does not establish informed consent, accessibility, voluntariness, legal sufficiency, durable recall, or safe behavior. High-stakes instruments require validation and qualified domain/research review.
- **Promotion status:** `strong-comprehension-evidence-candidate; instrument-validity-required`.

### `SWUX2-C54` — heuristic review is structured expert judgment, not outcome evidence

- **Locator:** Chapter 7, printed pages 182–186 and 202–208.
- **Documented practitioner position:** The proposed scorecard records user and organizational goals, then comments and subjective ratings across usability and voice criteria for a complete task. The author states that the scale is arbitrary, most values are impressions, and the analysis is chiefly useful for exposing and prioritizing possible improvements.
- **Candidate implication:** Store each heuristic finding separately with criterion/version/source, applicability, observed artifact/state, evaluator and expertise, comment, severity/confidence, affected journey, proposed investigation, and conflict. A numeric display may aid local prioritization but must retain item-level evidence and must never set conformance, outcome, or approval status.
- **Boundary:** The total percentage combines ordinal judgments, unequal constructs, and `N/A` denominators without validated weights. It is not an interval measure, cross-product benchmark, accessibility score, probability of success, or quantified UX quality.
- **Promotion status:** `strong-heuristic-finding-candidate; aggregate-score-non-authoritative`.

### `SWUX2-C55` — content accessibility heuristics are only a partial projection of conformance

- **Locator:** Chapter 7, printed pages 182–191 and 193–200.
- **Documented practitioner position:** The scorecard highlights language availability, reading level, screen-reader text, labels/instructions, meaningful sequence, action purpose, help, error recovery, redundant entry, and consistent identification, referencing selected WCAG 2.2 criteria. The author acknowledges that broader interaction, visual, and code requirements lie outside the scorecard.
- **Candidate implication:** An editorial review may project relevant accessibility questions, but conformance evidence must resolve the full implemented task: semantics, names/descriptions, roles/states/values, keyboard/focus, announcements, contrast, resize/reflow, language metadata, alternatives, errors, authentication, timing, and supported assistive-technology behavior. Findings should cite exact standard versions and implementation evidence.
- **Boundary:** “Every element has text for screen readers” is insufficient and can create noise or incorrect names; decorative content may need no name, while meaningful controls require unique contextual naming and correct behavior. A subjective 0–10 score cannot prove WCAG conformance or accessibility for actual disabled users.
- **Promotion status:** `accessibility-discovery-projection-only; conformance-authority-external`.

### `SWUX2-C56` — readability formulas are weak proxies for interface comprehension

- **Locator:** Chapter 7, printed pages 188–190 and 192–195.
- **Documented practitioner position:** English readability formulas estimate grade level from word and sentence properties, but the author explicitly notes that their use for UX content lacks academic validation. Suggested grade, character, button-word, width, and line thresholds are presented as practical heuristics while accuracy and completeness remain necessary.
- **Candidate implication:** Readability and length outputs should be labeled diagnostic features with language/formula/version, input transformation, sample sufficiency, and known invalid contexts. They may trigger review but cannot pass or fail clarity; comprehension, terminology, sequence, layout, locale, and assistive-technology evaluation carry stronger evidence.
- **Boundary:** Adding punctuation to fragments changes the measured input, short strings destabilize formulas, and grade levels do not transfer across languages or audiences. Fixed length thresholds must not remove material content or substitute for responsive design.
- **Promotion status:** `weak-proxy-only; no-automatic-quality-gate`.

### `SWUX2-C57` — action clarity binds language to observable system effects

- **Locator:** Chapter 7, printed pages 195–200.
- **Documented practitioner position:** Instructions should follow the order in which actions occur; controls and links should let people anticipate their result; completion feedback should expose changed state; help and error content should support different confidence levels; and the same governed term should identify the same concept consistently.
- **Candidate implication:** Evaluate action copy against the behavior contract, including ordered prerequisites, commitment boundary, effect, timing, reversibility, state feedback, recovery, contextual accessible name, and terminology identity. A screenshot-only score is incomplete when runtime behavior or downstream consequence is unknown.
- **Boundary:** Language consistency cannot cure incorrect behavior, and a clear label cannot authorize an undisclosed or unsafe effect. Platform semantics and actual execution evidence control any claim that an action or state is unambiguous.
- **Promotion status:** `corroborates-behavior-bound-content; runtime-evidence-required`.

### `SWUX2-C58` — voice evaluation remains subordinate to usability and hard constraints

- **Locator:** Chapter 7, printed pages 200–206.
- **Documented practitioner position:** Voice criteria derive from the organization's own approved principles and may be intentionally in tension with usability, particularly in games. The scorecard uses that tension to make decisions visible rather than assuming one style is correct everywhere.
- **Candidate implication:** Apply voice only after resolving purpose, state, risk, and applicable hard constraints. Record which principle and observable rule applies to the message, along with any conflict and authorized resolution; never let a weighted total conceal an accessibility, truth, safety, or comprehension failure.
- **Boundary:** Brand recognition primarily serves organizational goals and does not guarantee user benefit. Deliberate challenge in a game does not generalize to payments, consent, healthcare, employment, public services, errors, or other consequential tasks.
- **Promotion status:** `corroborates-hard-before-style-order; context-specific-exception-governance-required`.

### `SWUX2-C59` — interface text must be authored and evaluated in resolved context

- **Locator:** Chapter 8, printed pages 209–214.
- **Documented practitioner position:** UI text participates in a visual, interactive, and sometimes spoken experience rather than a linear document. The author recommends drafting within the design or a sufficiently realistic mockup, preserving whole-screen iterations and annotations so hierarchy, wrapping, neighboring actions, and alternative options remain visible.
- **Candidate implication:** A UX-writing packet should resolve route/task, trigger and state, component tree, semantic roles, visible hierarchy, neighboring expressions, dynamic values, viewport, locale/direction, modality, behavior, and accessible reading/interaction order. Preserve candidate snapshots and rationale while keeping stable identities separate from rendered artifacts.
- **Boundary:** A design canvas or edited screenshot can reveal spatial context but cannot prove runtime behavior, responsive states, keyboard/focus order, accessibility-tree output, localization, personalization, or production parity. Pixel overlays are exploratory artifacts, never canonical strings or implementation evidence.
- **Promotion status:** `strong-contextual-authoring-candidate; runtime-resolution-required`.

### `SWUX2-C60` — iteration history supports reasoning but does not create authority

- **Locator:** Chapter 8, printed pages 210–216.
- **Documented practitioner position:** Copying a complete screen before making meaningful changes preserves alternatives, encourages bolder exploration, and allows annotations to explain the purpose, voice, information, and recommendation behind each option. The best options are shared; weaker drafts may remain available as design history.
- **Candidate implication:** Candidate records should retain parent version, exact semantic contract, expression diff, changed layer, hypothesis, constraints checked, rationale, author/tool provenance, and disposition. History may support audit and learning, while only an explicit decision and approval record can select a candidate.
- **Boundary:** More iterations do not imply greater quality, and retained drafts must not be mistaken for approved or reusable content. Sensitive data, unreleased product material, and book-derived examples require access and retention controls in design history.
- **Promotion status:** `strong-candidate-lineage-candidate; decision-state-separate`.

### `SWUX2-C61` — an LLM can propose expressions but cannot own the content decision

- **Locator:** Chapter 8, printed pages 215–216.
- **Documented practitioner position:** Generative tools can produce options quickly but may make incorrect substitutions, lack the situated understanding needed to select effective UI text, and still require a content designer to formulate context, evaluate results, refine them, and explain a recommendation.
- **Candidate implication:** Model output remains `proposed` with provider/model/prompt/context versions, source boundaries, transformations, generated candidates, evaluator, rejected alternatives, and human-authored rationale. The system should prefer structured repository context and governed patterns over asking a model to invent missing facts.
- **Boundary:** Human review alone does not cure absent evidence, unsafe provider use, privacy leakage, inaccessible output, or unsupported product claims. A model must not fabricate rationale for a candidate whose design reasoning was never recorded.
- **Promotion status:** `corroborates-generated-candidate-boundary; human-authority-and-evidence-required`.

### `SWUX2-C62` — review collects typed concerns without collapsing ownership

- **Locator:** Chapter 8, printed pages 216–219.
- **Documented practitioner position:** Content review brings engineering, research, design, product, legal, marketing, and other perspectives to the proposal while the content designer integrates feedback rather than producing prose by committee. Context, research, rationale, comments, decisions, and unresolved issues should be recorded together.
- **Candidate implication:** Model review as individual findings with reviewer role and authority, scope, category, affected object/version, evidence, requested change, severity, status, resolution, resolver, decision, and timestamp. Distinguish consultation, factual verification, legal/domain approval, accessibility review, localization approval, product decision, and editorial ownership.
- **Boundary:** Meetings and comments are communication channels, not authority. Seniority, volume of comments, consensus, or a content designer's persuasion cannot override the accountable owner or applicable hard constraints. Closing a comment must preserve its resolution evidence.
- **Promotion status:** `strong-review-provenance-candidate; typed-authority-required`.

### `SWUX2-C63` — regulated content requires explicit approval and immutable traceability

- **Locator:** Chapter 8, printed pages 217–219.
- **Documented practitioner position:** Health, privacy, security, and other regulated content may require a separate review record connecting screens, editable strings, contextual documentation, reviewer discussion, and retained history for later regulatory or legal scrutiny.
- **Candidate implication:** A controlled-content record should bind stable message/expression identity, exact text and locale, screen/state/component context, facts and governing sources, risk classification, required reviewer authorities, findings, explicit approvals/rejections, effective period, implementation locator, release, supersession, retention, access, and legal-hold policy. Use hashes or equivalent checks to detect divergence among reviewed, localized, coded, and shipped text.
- **Boundary:** Silence is not approval for regulated, consequential, privacy, security, safety, consent, employment, financial, health, or public-service content. A shared document and its comment history may not satisfy jurisdiction-specific audit, signature, records-management, security, or retention requirements; qualified authority must define the system of record.
- **Promotion status:** `strong-controlled-content-candidate; explicit-approval-hard-gate`.

### `SWUX2-C64` — publication is a traceable transition into implementation and release

- **Locator:** Chapter 8, printed pages 219–222.
- **Documented practitioner position:** Final UI text enters code through engineering work and code review or through a UI-content management system. Content review in code can detect transcription errors, newly introduced messages, missing context comments, and platform differences; a CMS may improve reuse, localization, delivery, and history.
- **Candidate implication:** Link approved semantic message and locale-specific expression to repository key/resource, component and state, code change, build artifact, test evidence, release, and rollback. Validate variables, escaping, plurals/selectors, formatting, fallback, unused/missing keys, accessibility metadata, and design-to-code parity. Newly discovered errors return to authoring and review rather than bypassing governance.
- **Boundary:** Text is not necessarily stored in one file, and copying from a review document into code is drift-prone. CMS presence does not prove currentness, authority, runtime delivery, tenant correctness, or complete history; production observation remains separate evidence.
- **Promotion status:** `strong-publication-lineage-candidate; build-and-runtime-verification-required`.

### `SWUX2-C65` — work tracking links need, evidence, ownership, and delivery state

- **Locator:** Chapter 8, printed pages 222–224.
- **Documented practitioner position:** Because content work crosses the development lifecycle, the author recommends tracking each task with its definition, problem and success measure, priority, status, supporting artifacts, timestamps, and current assignee in a shared work system.
- **Candidate implication:** A work item should reference rather than duplicate canonical content objects and include request source, content job, scope, risk, dependencies, evidence gaps, owner, required reviewers, decision state, implementation/release state, due rationale, blockers, and immutable event history. Assignment indicates responsibility for a next action, not content authority.
- **Boundary:** Ticket counts, closures, age, or throughput are workload signals rather than UX impact. Separate tracking systems may be necessary, but synchronization and stable identifiers are required to prevent split-brain status.
- **Promotion status:** `strong-work-lineage-candidate; canonical-object-links-required`.

### `SWUX2-C66` — prioritization requires risk and dependency, not urgency alone

- **Locator:** Chapter 8, printed pages 224–226.
- **Documented practitioner position:** The author uses an importance/urgency matrix to do urgent-important work, schedule important nonurgent work, delegate urgent low-importance drafting, and discard low-value disputes. Meaning-changing mechanics remain important, and self-service guidance can support delegated first drafts.
- **Candidate implication:** Prioritization should combine user harm/severity, legal or accessibility obligation, exposure, irreversibility, dependency/unblocking, evidence gap, incident status, time criticality, strategic value, effort, and qualified capacity. Delegation packets must carry the same semantic and hard constraints, with required review proportional to risk.
- **Boundary:** A binary matrix is a planning aid, not a release or risk model. Liability language, active incidents, exclusion, false state, security/privacy defects, and inaccessible critical journeys may be mandatory regardless of perceived organizational importance; “discard” requires recorded rationale when obligations may apply.
- **Promotion status:** `candidate-prioritization-view; risk-and-obligation-model-required`.

### `SWUX2-C67` — a content design system is governed infrastructure

- **Locator:** Chapter 8, printed pages 226–232.
- **Documented practitioner position:** A content design system should be built and maintained as infrastructure that supports change and self-service. The author's organizing model comprises principles, personality, patterns, and practicalities, spanning audience direction, voice/persona, component text patterns, terminology/naming, and mechanical conventions.
- **Candidate implication:** Represent the system as versioned typed objects with owners, scope, locale, evidence, applicability, exceptions, dependencies, approval, effective dates, migrations, tests, adoption telemetry, and retirement. Human-facing guides and design-tool projections should compile from or link to canonical records rather than becoming competing sources of truth.
- **Boundary:** The four-part taxonomy is an authoring view, not a proven exhaustive ontology. Claimed improvements in adoption, support cost, retention, speed, or brand affinity require product-specific evidence; system adoption cannot replace skilled judgment on novel or high-risk work.
- **Promotion status:** `strong-system-governance-candidate; ontology-cross-source-review-required`.

### `SWUX2-C68` — conversational-agent personality must disclose actual system identity and limits

- **Locator:** Chapter 8, printed pages 227–228.
- **Documented practitioner position:** Interactive agents benefit from consistent rules for self-reference, values, boundaries, abuse handling, and synthetic-voice characteristics so their behavior does not vary incoherently across teams.
- **Candidate implication:** An agent profile should define product identity, nonhuman disclosure, capabilities, prohibited claims, data and memory boundaries, tool authority, escalation, refusal, abuse response, locale, voice/audio characteristics, and change governance. Keep this distinct from organization voice and situational tone.
- **Boundary:** A fictional backstory, pronouns, humanlike audio, or consistent personality must not deceive people about personhood, expertise, empathy, consciousness, confidentiality, memory, or authority. Trust should follow verified reliability and transparent limits, not anthropomorphic consistency.
- **Promotion status:** `candidate-agent-profile; transparency-and-nondeception-hard-gates-required`.

### `SWUX2-C69` — component text patterns bind semantics, states, and locale behavior

- **Locator:** Chapter 8, printed pages 228–229.
- **Documented practitioner position:** Product-specific component libraries can combine visual and interaction variants with tailored text patterns, enabling faster and more consistent design than generic templates.
- **Candidate implication:** A component-content pattern needs semantic role, content job, slots, required/optional data, states and transitions, visible and accessible expressions, variable/plural/select behavior, locale constraints, examples/counterexamples, implementation APIs, tests, version, and migration path. Generic book patterns may seed discovery but cannot be copied into canonical product guidance without authority and evaluation.
- **Boundary:** A styled design component does not establish coded parity, keyboard/focus behavior, screen-reader output, runtime states, responsive layout, or localization safety. Pattern reuse cannot silently reuse facts, commitments, or state claims across contexts.
- **Promotion status:** `strong-component-pattern-candidate; design-code-runtime-parity-required`.

### `SWUX2-C70` — terminology and naming are governed concept decisions

- **Locator:** Chapter 8, printed pages 229–231.
- **Documented practitioner position:** A glossary should include only words with special product/domain meaning, recording definition, part of speech, usage, notes, and discouraged alternatives. Naming should use audience and competitive research, explicit criteria, broad exploration, stakeholder input, trademark review, and localization before adoption.
- **Candidate implication:** Preserve concept identity separately from preferred, deprecated, prohibited, localized, and audience-specific labels. A naming decision needs scope, definition, candidate set, collision and ambiguity checks, research evidence, domain/legal/trademark review where applicable, localization review, decision authority, effective version, aliases, migration, and search/discovery impact.
- **Boundary:** Frequency, stakeholder preference, competitor use, or trademark clearance alone does not prove comprehension, distinctiveness, accessibility, cultural fit, or legal availability in every jurisdiction. “Do not use” requires rationale and a usable replacement rather than a bare prohibition.
- **Promotion status:** `strong-terminology-and-naming-candidate; concept-label-separation-required`.

### `SWUX2-C71` — mechanics are locale-scoped rules with supervised automation

- **Locator:** Chapter 8, printed pages 231–232.
- **Documented practitioner position:** Style guides can govern spelling, punctuation, abbreviations, units, dates, and times for consistency, while automated tools may detect or correct deviations but remain fallible and require oversight.
- **Candidate implication:** Mechanical rules should declare language/locale, audience/domain, token type, formatter or linter behavior, exceptions, source authority, version, and tests. Prefer structured values and locale-aware formatters over composing dates, times, numbers, currencies, units, or translated fragments as prose.
- **Boundary:** English editorial guides do not govern other languages, and consistency is not more important than correctness or natural locale expression. Automated correction must not mutate identifiers, governed terms, names, variables, legal text, or meaning without review and traceability.
- **Promotion status:** `strong-locale-mechanics-candidate; supervised-automation-required`.

### `SWUX2-C72` — adoption phases should advance by evidence, not elapsed days

- **Locator:** Chapter 9, printed pages 233–247.
- **Documented practitioner position:** The author organizes first-practitioner work into three approximate phases: learn the experience, audience, organization, and relationships; address urgent work while building foundations; then ratify and operate the strategy sustainably. The author explicitly says 30/60/90 days are estimates rather than rules.
- **Candidate implication:** Replace calendar completion with exit criteria across discovery coverage, inventory confidence, risk triage, workflow operation, ownership, review authority, baseline evidence, governed assets, repository integration, support, adoption, and maintenance. Preserve elapsed time only as planning metadata.
- **Boundary:** One person's experience across three companies and teams of particular sizes does not establish universal sequencing, staffing, or duration. Contractors, distributed organizations, regulated environments, public services, multilingual products, and mature or crisis-state systems may require different phases and controls.
- **Promotion status:** `candidate-capability-adoption-framework; milestone-evidence-required`.

### `SWUX2-C73` — discovery maps stakeholders, authority, evidence, and missing perspectives

- **Locator:** Chapter 9, printed pages 233–237.
- **Documented practitioner position:** Early discovery uses multiple knowledgeable contacts and broader one-to-one conversations to map the organization, product, customers, priorities, channels, reviewers, terminology, existing content, and resources. Rough shared notes make known information and gaps visible for correction.
- **Candidate implication:** A discovery map should separately record people/teams, role, decision authority, expertise, product area, evidence supplied, dependencies, conflicts, access, and missing affected groups. Claims from interviews remain attributed assertions until corroborated by product, research, policy, legal, technical, or runtime evidence.
- **Boundary:** Colleague descriptions of users, motives, bias, allies, or blockers are not user research and can encode organizational politics. Personal profiling should be limited to legitimate collaboration needs; protected traits, inferred psychology, or informal reputation must not become product evidence or automated routing criteria.
- **Promotion status:** `strong-discovery-map-candidate; assertion-authority-separation-required`.

### `SWUX2-C74` — discovery notes and recordings require data governance

- **Locator:** Chapter 9, printed pages 235–237.
- **Documented practitioner position:** The author recommends consolidating meeting notes, links, whiteboard photographs, documents, comments, and sometimes recordings into a shared evolving discovery artifact, while noting a preference for human note-taking as part of analysis.
- **Candidate implication:** Discovery artifacts need purpose, owner, participant notice/consent where required, access, sensitivity, source, timestamp, retention, deletion, correction, and synthesis lineage. AI meeting summaries must retain provider/data-use terms, model/tool provenance, uncertainty, and a link to authorized source evidence.
- **Boundary:** Recording law, workplace policy, confidentiality, privilege, security, and consent vary by jurisdiction and context. A transcript or generated summary is not automatically accurate, complete, shareable, or appropriate for indefinite retention.
- **Promotion status:** `candidate-discovery-evidence-governance; privacy-and-consent-authority-required`.

### `SWUX2-C75` — inventory follows the whole content journey across systems and channels

- **Locator:** Chapter 9, printed pages 235–238 and 240–242.
- **Documented practitioner position:** Teams without content specialists may lack a coherent view of UI strings, help, email, notifications, web, support responses, social channels, repositories, and management systems encountered across an experience lifecycle. Early discovery should locate these sources, access paths, gaps, terminology, and unexamined areas.
- **Candidate implication:** Build an inventory of systems of record and rendered surfaces with content type, journey stage, audience, locale, owner, authority, access, storage/repository locator, delivery path, versioning, update cadence, risk, dependencies, and known coverage. Distinguish discovered references from verified completeness.
- **Boundary:** A commercial acquisition/retention lifecycle is not universal, and finding a folder or CMS does not prove it is canonical, current, deployed, complete, accessible, or authorized for reuse. Authenticated runtime and accountable-owner checks remain necessary.
- **Promotion status:** `strong-content-landscape-candidate; completeness-and-authority-uncertain-by-default`.

### `SWUX2-C76` — early tactical delivery is a controlled learning loop

- **Locator:** Chapter 9, printed pages 239–241.
- **Documented practitioner position:** Small writing requests can begin during discovery to test emerging understanding, demonstrate contextual design and rationale, learn the team's tools and review paths, and expose additional requirements. The author recommends several meaningfully different viable options and asks who else must review them.
- **Candidate implication:** Treat early work as limited pilots with declared scope, assumptions, risk classification, semantic contract, candidate rationale, required reviewers, implementation path, evaluation, and retrospective learning. Feed newly discovered terminology, states, owners, and workflow gaps into foundational records.
- **Boundary:** “Tactical” does not waive truth, accessibility, localization, privacy, security, safety, legal, or explicit approval requirements. Early output must not establish precedent or canonical guidance merely because it shipped or received stakeholder preference.
- **Promotion status:** `strong-pilot-learning-candidate; full-hard-constraint-envelope-required`.

### `SWUX2-C77` — baselines combine observed behavior, research, inventory, and expert findings

- **Locator:** Chapter 9, printed pages 240–242.
- **Documented practitioner position:** Before systemic changes, teams should establish how current content supports user and organizational goals through existing behavior and sentiment data, product use, prior research, instrumentation gaps, journey recordings, screenshots, and heuristic review. Findings should identify strengths, weaknesses, and recommended priorities for later comparison.
- **Candidate implication:** A baseline packet should freeze exact product/content versions and observation windows; record behavioral measures, qualitative sources, accessibility and harm findings, heuristic issues, coverage gaps, data quality, and uncertainty separately; and define which future comparisons are valid. Use production observation where permitted rather than assuming design screenshots reflect the current experience.
- **Boundary:** Heuristic totals, screenshots, personal product use, and sentiment are different evidence types and cannot be merged into one baseline score. Respectful communication is important, but limiting circulation must not conceal known safety, accessibility, legal, or privacy risks from accountable owners.
- **Promotion status:** `strong-baseline-packet-candidate; evidence-types-remain-separate`.

### `SWUX2-C78` — a minimum viable process declares predictable service and authority boundaries

- **Locator:** Chapter 9, printed pages 242–245.
- **Documented practitioner position:** The second phase establishes a repeatable request, drafting, consultation, review, coding, code-review, and release process that fits existing design, engineering, product, legal, and marketing workflows. It clarifies when specialists participate so leaders need not personally inspect every string.
- **Candidate implication:** Define intake, triage, service classes, content and decision owners, required consultations/approvals by risk, authoring and review artifacts, repository handoff, validation gates, release/rollback, exceptions, escalation, support expectations, and operating metrics. Test the process on real work and revise it from participant feedback.
- **Boundary:** A diagram or leader confidence does not prove that the process operates. Liability, brand, accessibility, domain, localization, and release reviews are distinct authorities; one executive reviewer cannot substitute for them, and centralized review of every string may become an unsafe bottleneck.
- **Promotion status:** `strong-operating-model-candidate; observed-operation-required`.

### `SWUX2-C79` — foundational strategy assets need ratification, versioning, and maintenance

- **Locator:** Chapter 9, printed pages 243–245.
- **Documented practitioner position:** Documented goals and priorities, voice, terminology, reviewer scope, content landscape, and tracking make tactical decisions faster and more consistent. These are living artifacts that should be reviewed regularly and updated when the organization changes.
- **Candidate implication:** Each foundational asset needs canonical location, object identity, owner, contributors, source evidence, scope, locale, authorized ratification, version/effective date, dependencies, exceptions, review trigger/cadence, change log, migration, and retirement. Annual review is a maximum only when risk and change rate support it; event-driven review is required when dependencies change.
- **Boundary:** “75% complete,” a presentation, or initial sign-off is not a measurable readiness state. Voice and terminology cannot be ratified solely by visibility or stakeholder participation, and stale strategy must fail closed rather than silently govern new output.
- **Promotion status:** `strong-foundation-governance-candidate; freshness-and-supersession-required`.

### `SWUX2-C80` — sustainable maturity is demonstrated through operating outcomes

- **Locator:** Chapter 9, printed pages 245–247.
- **Documented practitioner position:** The third phase socializes and corrects the strategy, establishes a sustainable request-and-proactive-work rhythm, broadens partnerships, follows field research, and makes strategic content work visible. The desired result is more consistent and effective creation with less reactive repair.
- **Candidate implication:** Capability maturity evidence should cover request coverage and lead time, early-design participation, review/approval integrity, defect and drift detection, localization/accessibility coverage, reuse with correct scope, adoption and exception patterns, research/evaluation outcomes, support health, maintenance load, incident response, and owner sustainability. Measure service quality and user outcomes, not practitioner visibility alone.
- **Boundary:** Invitations, casual requests, leadership recognition, presentations, or personal confidence are adoption signals but do not prove user benefit, quality, safety, or organizational resilience. New automation or industry trends enter through the same evidence, provider, risk, evaluation, and governance gates as any other capability.
- **Promotion status:** `strong-capability-maturity-candidate; outcome-and-control-evidence-required`.

### `SWUX2-C81` — empathy begins with accountable listening, not projection

- **Locator:** Chapter 10, printed pages 249–250.
- **Documented practitioner position:** The author asks practitioners to listen to people describe their experiences, observe behavior, notice recognizable language and emotional associations, and confront differences between participant and team perspectives. Team members' knowledge and constraints also shape the resulting experience.
- **Candidate implication:** Ground audience, vocabulary, concern, and context claims in attributed research evidence with consent, sampling context, method, analysis, dissent, and scope. Preserve participant language as evidence and potential terminology, while allowing qualified interpretation and locale-specific variation.
- **Boundary:** Caring, physiological empathy claims, personal resonance, or believing a story does not establish prevalence, causality, factual accuracy, legal authority, or permission to reuse a person's words. Practitioners should not claim to speak for affected people when direct participation, accessibility expertise, or recourse is available.
- **Promotion status:** `strong-research-posture-candidate; anti-projection-and-provenance-required`.

### `SWUX2-C82` — advocacy frames product problems and accountable outcomes

- **Locator:** Chapter 10, printed pages 250–251 and 254.
- **Documented practitioner position:** Content design should be explained as communication and experience design that helps solve product and user problems, not as choosing, checking, or filling in words. Advocacy connects early collaboration, systematic practice, iteration, and measurement to outcomes.
- **Candidate implication:** A capability proposal should state the unmet content job, affected journeys and populations, current evidence, risks, intervention scope, dependencies, accountable owners, expected user and organizational outcomes, evaluation plan, operating cost, and decision requested. Show where language exposes a deeper design or strategy problem and abstain from copy-only repair.
- **Boundary:** Persuasive framing must not overstate causal impact, savings, revenue, risk reduction, accessibility, inclusion, or emotion. Advocacy is not approval, evidence, budget authority, or permission to bypass domain owners and affected-user research.
- **Promotion status:** `strong-capability-case-candidate; claim-evidence-binding-required`.

### `SWUX2-C83` — professional manifestos are normative artifacts, not findings

- **Locator:** Chapter 10, printed pages 251–254.
- **Documented practitioner position:** The reproduced Content Design Manifesto describes a collective professional identity, desired scope, claimed value, working relationships, inclusion commitments, use of tools, compensation, leadership, career access, and sustainability aspirations. Volunteer signatures and translations indicate community participation.
- **Candidate implication:** Admit manifestos, principles, and community statements as attributed normative sources useful for vocabulary, hypotheses, governance discussion, and stakeholder alignment. Preserve authorship, version, signatory/translation context, and normative status separately from empirical evidence.
- **Boundary:** Signatures, translations, professional consensus, or publication do not validate universal causal, organizational, accessibility, inclusion, labor-market, environmental, or business claims. The manifesto cannot grant role authority inside an adopter organization or establish what affected users need.
- **Promotion status:** `normative-context-only; no-empirical-or-governance-authority`.

### `SWUX2-C84` — content design is shared ownership with explicit role boundaries

- **Locator:** Chapter 10, printed pages 250–253.
- **Documented practitioner position:** The manifesto positions content designers as participants in UX design from concept through launch, working with research, engineering, product, legal, marketing, support, and leadership. It argues that language expertise can contribute to systems, models, governance, research, and terminology, and that leadership should follow the needs of a project rather than one permanent disciplinary hierarchy.
- **Candidate implication:** Define responsibilities per artifact and decision: who researches, authors, verifies facts, owns behavior, reviews accessibility/localization/domain risk, approves meaning, implements, releases, monitors, and handles incidents. Collaborative contribution must preserve one accountable decision owner and escalation path.
- **Boundary:** “Shared ownership” cannot mean unowned outcomes or equal authority in every domain. Content expertise does not confer engineering, legal, clinical, security, accessibility-conformance, localization, research, product, or release authority; reciprocal limits apply to other roles editing governed content.
- **Promotion status:** `strong-role-matrix-candidate; accountable-owner-required`.

### `SWUX2-C85` — inclusion is an operating commitment, not representative rhetoric

- **Locator:** Chapter 10, printed pages 249–253.
- **Documented practitioner position:** The chapter and manifesto call for teams and the profession to reflect and serve broad populations through listening, inclusive content, hiring, mentoring, sponsorship, education, career access, and attention to accessibility and environmental impact.
- **Candidate implication:** Translate inclusion claims into recruitment coverage, accessible participation, compensation, language access, decision influence, disaggregated evaluation, exclusion/harm findings, remediation ownership, career pathways, and accountability measures. Record who remains missing and which claims cannot yet be made.
- **Boundary:** Workforce diversity, inclusive intent, translation count, or accessible wording does not prove equitable access or outcomes. Demographic data and participant stories require minimization and governance, and environmental claims need defined system boundaries and current measurement.
- **Promotion status:** `candidate-operating-commitment; measurable-evidence-and-accountability-required`.

### `SWUX2-C86` — capability support should be measured by outcomes and control health

- **Locator:** Chapter 10, printed pages 250–254.
- **Documented practitioner position:** Advocacy seeks recognition, resourcing, early involvement, leadership opportunity, and strategic focus for content design, with the expectation that systematic practice can improve clarity, meaning, quality, inclusion, discovery, business results, and risk management.
- **Candidate implication:** Sponsorship records should identify decision, resources, scope, accountable sponsor, operating owner, success and guardrail measures, review period, and continuation/exit criteria. Track whether the capability improves user outcomes and governance health, not merely headcount, requests, tool usage, meeting attendance, or manifesto adoption.
- **Boundary:** Sponsorship provides mandate and resources but cannot validate effectiveness or override controls. Professional advancement claims are legitimate organizational goals but remain distinct from evidence that a particular UX-writing intervention helps affected people.
- **Promotion status:** `candidate-sponsorship-and-adoption-contract; outcomes-not-proxies`.

## Book-level synthesis

The complete book contributes a coherent practitioner workflow rather than a validated universal standard:

1. Define separate user and organizational goals, constraints, message purpose, and journey context before drafting.
2. Separate organization voice, situational tone, terminology, mechanics, interaction structure, semantic meaning, and surface expression.
3. Use dialogue, patterns, editing passes, and multiple candidates as discovery and design aids while binding final text to actual behavior, component state, locale, and accessibility semantics.
4. Treat generated content as probabilistic system output requiring problem justification, data and tool boundaries, contextual evaluation, human authority, monitoring, and rollback.
5. Combine behavioral, qualitative, comprehension, accessibility, and heuristic evidence without collapsing them into one quality score or causal claim.
6. Preserve lineage across contextual drafts, findings, decisions, approvals, localized resources, code, builds, releases, runtime observation, and maintenance.
7. Establish the capability through mapped authority, verified inventory, controlled pilots, baselines, an observed operating model, governed foundations, and outcome-based maturity.
8. Advocate through transparent problems, evidence, tradeoffs, and requested decisions rather than professional rhetoric or unsupported promises.

The book's distinctive value is operational: it connects strategic goals to individual strings and connects those strings back to research, collaboration, measurement, and organizational practice. Its principal limitations are reliance on one practitioner's experience, fictional examples, inaccessible proprietary research, English-centric heuristics, arbitrary scoring, commercial-growth framing, simplified and time-sensitive LLM explanations, and professional advocacy claims. These limitations are retained rather than silently normalized.

## Disposition audit

All 86 author-position records are accounted for below. `Retain` means preserve for cross-book synthesis; it does not mean promote into production schemas or behavior.

| Record range | Disposition | Book-level reason |
| --- | --- | --- |
| `C01–C05` | Retain as journey, goals, constraint, candidate-generation, and evaluation-context candidates | Strong strategic framing; requires domain-neutral vocabulary and explicit hard constraints. |
| `C06–C10` | Retain as a possible authoring projection over existing voice/tone/terminology/mechanics objects | Useful operational chart; English-specific and not an exhaustive ontology or effectiveness measure. |
| `C11–C14` | Retain as conversation-discovery and compilation candidates | Valuable pre-interface method; role-play is not user evidence, product truth, or complete state coverage. |
| `C15–C27` | Retain as advisory pattern families with semantic, behavior, component, locale, and accessibility bindings | Useful drafting seeds; proprietary/English evidence and no conformance or implementation authority. |
| `C28–C40` | Retain durable LLM problem, evaluation, provider, data, tool, release, and monitoring requirements; exclude dated technical descriptions from runtime contracts | Strong lifecycle pressure; prompts, retrieval, tuning, fluency, and disclaimers cannot guarantee truth or safety. |
| `C41–C47` | Retain as an editorial workflow projection with semantic invariants and candidate provenance | Purpose/concision/conversation/clarity are useful passes; not a complete or compensatory quality model. |
| `C48–C58` | Retain evidence separation, experimentation, research, comprehension, accessibility, behavior, and guardrail requirements; reject aggregate heuristic percentage and readability thresholds as hard gates | Strong mixed-method posture; illustrative statistics and scorecard lack validity for universal inference or conformance. |
| `C59–C71` | Retain contextual authoring, review, approval, publication, work, system, agent, component, terminology, naming, and locale-governance candidates | Strong operating detail; canonical identity and runtime parity must replace screenshot/document/CMS assumptions. |
| `C72–C80` | Retain as evidence-based capability adoption and maturity candidates; reject fixed-day readiness and visibility proxies | Useful phased narrative; capability state must be proven by controls, operation, maintenance, and outcomes. |
| `C81–C86` | Retain research posture, capability-case, role, inclusion, and sponsorship candidates; classify manifesto claims as normative context only | Advocacy can mobilize action but cannot establish affected-user needs, causal value, authority, inclusion, or sustainability. |

### Explicit non-promotions after this book

- No text, example, screenshot, prompt, or fixture from the supplied PDF is authorized for copying, redistribution, training, or provider upload.
- No book pattern, score, length limit, reading grade, voice rule, timeline, approval convention, LLM setting, metric, or organizational claim is a universal default.
- No record changes canonical repository schemas, runtime behavior, provider policy, accessibility conformance, locale support, legal/domain requirements, or release status.
- Cross-book comparison and repository architecture review are required before any candidate becomes a proposed implementation change.

## Initial comparison with current repository

The complete book supports rather than overturns the existing candidate system model: message-in-context identity, distinct user and organizational concerns, explicit risk and locale constraints, multiple candidate expressions, hard-before-style evaluation, separate organization voice and situational tone objects, compilation from design evidence into typed semantic and behavior records, and separation of semantic messages from surface/component expressions. Its most useful pressure is operational: each UX-writing pattern needs a declared content job, semantic/behavior binding, component state, accessible expression, locale contract, evidence scope, and abstention path.

Chapter 2's voice-chart method was compared with the current voice/tone graph and candidate system model. The graph is structurally safer and more expressive because it already separates principles, tone policy, context, mechanics, terminology, evidence, decision, and approval. The chart is therefore best treated as a possible human authoring/projection view over those typed records, not as a replacement data model. No implementation change is authorized by this ledger.

Chapter 3's dialogue method was compared with the current `SemanticMessage`, `MessageContext`, `BehaviorContract`, `Expression`, `SurfaceProfile`, and evidence/decision separations. The method is useful as a collaborative discovery artifact, but the repository model must compile rather than canonize it. A role-play turn cannot by itself become product truth, user evidence, approved meaning, implemented behavior, or released expression.

All eleven Chapter 4 pattern families were compared with primary component and accessibility contracts. The book contributes useful expression heuristics, but implementation evidence is stricter: visible text, accessible name/description, semantic role, keyboard/focus behavior, dynamic state, announcements, retry safety, persistence, and localization belong to one resolved component/behavior contract. Pattern advice is therefore subordinate to, and incomplete without, those bindings.

Chapter 5 was compared with current primary technical guidance on provider review, privacy, prompt injection, structured outputs, evaluation, human review, monitoring, model change, and rollback. The durable content-design sequence—bound the problem, define contextual success and failure examples, design and version prompts, construct realistic and adversarial evaluation sets, separate qualitative and automated measures, and plan the production lifecycle—is useful. Dated model explanations, confident prose, retrieval, tuning, disclaimers, or prompt design cannot replace constrained authority, input/output validation, exact data-handling terms, uncontaminated evaluation, human escalation, production monitoring, rollback, and incident records.

Chapter 6's editing method was compared with current component accessibility and internationalization contracts. Its purpose/concision/conversation/clarity passes are useful as an editorial projection, but an interface string is embedded in semantic role, state, accessible naming and description, focus and announcement sequence, locale/direction, variables, responsive layout, and behavior. An edit is therefore valid only when it preserves the message's verified semantic invariant and passes the applicable component, accessibility, localization, domain, and approval gates.

Chapter 7 was compared with current experimentation and instrumentation guidance. Its combination of direct behavior, qualitative investigation, and heuristic review is directionally sound, but the evidence types must remain separate. A trustworthy experiment additionally needs preregistered metrics and decision rules, verified assignment and exposure, power and minimum-effect reasoning, sample-ratio and event-quality checks, uncertainty, guardrails, and protection against peeking and novelty. Its UX-content percentage is best represented as a list of subjective expert findings; it has no authority to establish causality, accessibility conformance, universal quality, or release approval.

Chapter 8 was compared with current content-lifecycle, design-system, localization, source-control, and release guidance. Its workflow usefully spans contextual iteration, cross-functional review, controlled-content records, publication, tracking, prioritization, and systemization. A safer implementation must replace copied strings and document-only status with stable typed identities and verified links among meaning, expression, review, approval, locale, repository resource, build, release, and runtime. Explicit authority, parity checks, rollback, access/retention rules, and retirement are necessary additions; no design file, ticket, CMS, or review document is automatically canonical.

Chapter 9 was compared with current capability-readiness, ownership, contribution, maintenance, versioning, deprecation, and maturity guidance. Its staged sequence is a useful onboarding narrative, but elapsed days, document completion, invitations, and leader confidence are weak evidence. The safer model uses explicit entry and exit criteria, typed stakeholder authority, privacy-governed discovery, verified inventory, controlled pilots, multi-method baselines, an observed operating process, versioned foundations, and sustained outcome/control evidence.

Chapter 10 was compared with current governance and capability-adoption guidance. Advocacy is strongest when it makes criteria, roles, tradeoffs, evidence, feedback, and requested decisions transparent; affected teams participate without displacing accountable owners. Empathy, professional consensus, sponsorship, visibility, and adoption are inputs or signals, not proof of user need, causal value, inclusion, control effectiveness, or sustainable operation.

## Open questions

1. How should organization goals be represented without allowing business metrics to compensate for truth, safety, accessibility, autonomy, or valid consent?
2. Which constraints can be discovered from a repository and which require an accountable human or connected system?
3. What counts as a meaningfully different candidate approach rather than a lexical variation?
4. How should the packet represent immutable shipped text versus remotely updateable content?
5. Which journey-stage vocabulary is portable across commercial, public-service, internal, nonprofit, and high-risk products?
6. Are the six proposed language aspects sufficient across languages and modalities, or should they be a configurable projection over smaller typed features?
7. How should conflicting voice principles be resolved for a message without turning organizational hierarchy into an implicit universal precedence rule?
8. What evidence is required before a voice-aligned variant may be described as more recognizable, trustworthy, or effective?
9. What minimum typed structure makes a conversation map portable without falsely representing it as a transcript of real users?
10. Which branch classes are universally useful discovery prompts, and which must be derived only from the adopter's behavior model?
11. How should spoken, visual, text, and assistive-technology turn structures share semantic identity without assuming equivalent timing or phrasing?
12. Which pattern fields belong in portable core schemas, and which should be supplied by framework- or design-system-specific adapters?
13. How should the system distinguish a true empty state from zero results, denied access, loading failure, offline data, or delayed generation when repository evidence is incomplete?
14. What evaluation proves that a concise visible label and a longer accessible name remain meaningfully aligned?
15. What canonical state vocabulary distinguishes local acknowledgment, queue acceptance, server receipt, durable commit, downstream delivery, and business completion?
16. How should retry guidance fail closed when the system cannot determine whether a consequential action committed?
17. Which notification properties can be discovered statically, and which require runtime observation or authenticated provider evidence?
18. What evidence threshold should reject an LLM feature when deterministic templates, retrieval, rules, or ordinary workflow can perform the bounded job?
19. Who may define and label “good” when domain experts, affected users, purchasers, and people subject to a consequential decision have conflicting interests?
20. Which generated-content audit events are necessary for accountability, and how should retention, access, deletion, residency, and litigation obligations be resolved without over-collecting sensitive data?
21. How should sustainability claims be measured and versioned across provider, model, region, workload, and system boundary rather than reduced to token length or marketing labels?
22. Which prompt fields may be disclosed for user understanding and audit without exposing secrets, personal data, or exploitable implementation detail?
23. How should repeated probabilistic trials be sized and summarized so rare severe failures are not hidden by average performance?
24. What mechanism proves that retrieved context and tool execution respected the correct tenant, authorization decision, and point-in-time source version?
25. Which release changes invalidate which evaluation evidence, and how should dependency-aware revalidation be encoded?
26. How should affected-person feedback, appeal, correction, and recourse differ from expert labeling and purchaser acceptance in consequential systems?
27. What canonical semantic invariant should an editor preserve for each message type, and which changes require reopening the product or behavior decision?
28. How should the system detect that a shorter candidate has removed a material qualification or recovery path even when it remains grammatically clear?
29. Which resolved interaction representations best support visual, keyboard, screen-reader, voice, and localization readthroughs without claiming modality equivalence?
30. How should locale-specific metaphors and information order preserve intent without forcing lexical correspondence to the source language?
31. Which evidence-state vocabulary prevents teams from presenting a heuristic hypothesis, observational association, or stakeholder belief as an experimental causal estimate?
32. What minimum experiment-integrity checks can be generated from repository instrumentation, and which require analytics-platform or statistical authority?
33. Which autonomy, accessibility, privacy, and harm guardrails should be mandatory for each product-risk class before a content experiment can run?
34. How should qualitative evidence preserve dissent and marginalized viewpoints when aggregation would erase consequential differences?
35. Which content-related accessibility questions belong in the UX-writing workflow while keeping formal conformance with qualified accessibility review?
36. Should arbitrary numeric heuristic totals be omitted entirely from machine output, or retained only as clearly local prioritization metadata?
37. Which resolved-context artifacts can be generated automatically from repository evidence, and which require a running product or authenticated design source?
38. What minimal authority matrix distinguishes editorial ownership, factual verification, legal/domain approval, accessibility review, localization approval, implementation, and release?
39. How should hashes and stable identities prove parity across design, review, localization, code, build, and observed runtime without treating screenshots as canonical?
40. Which content changes qualify for emergency publication, and what retrospective review and rollback obligations follow?
41. How should content-system rules express exceptions and migrations without allowing local teams to silently fork canonical guidance?
42. What discovery-coverage threshold is meaningful when no organization can prove it has found every content source, stakeholder, or affected population?
43. Which capability milestones must be met before self-service or AI-generated UX content is exposed beyond a pilot?
44. How should a maturity model distinguish practitioner visibility, workflow adoption, control effectiveness, content quality, and affected-user outcomes?
45. What freshness policy should apply to voice, terminology, reviewer authority, inventory, and process records when their upstream evidence changes at different rates?
46. How should the capability surface participant language faithfully while protecting privacy, preventing tokenization, and preserving disagreement?
47. Which advocacy claims can be calculated from repository and runtime evidence, and which must remain explicitly unverified until qualified research or financial analysis exists?
48. What governance prevents “shared ownership” from becoming either universal veto power or absence of accountable decision ownership?
