# UX Content Corpus — Extraction Schema v1.0

Harvest date basis: 2026-09-21
Corpus: 200 benchmark products across 10 domains
Purpose: feed a `content.md` intelligence layer for UX content design reference

---

## 1. Scope rules

**In scope (public, unauthenticated surfaces only):**

- Primary marketing / product pages (value prop, feature naming, CTA inventory)
- Pricing and plan pages (plan naming, tier language, billing disclosures)
- Help centre / support hub (category IA, article titles, task phrasing)
- FAQ pages and FAQ blocks embedded in marketing pages
- Public product documentation and developer docs
- Public onboarding, signup entry, and "how it works" pages
- Legal, privacy, and disclosure pages where they carry user-facing explanatory copy
- Status pages and public incident communication
- Published content style guides, design systems, or voice-and-tone documentation
- Trust, safety, and community-guideline pages

**Out of scope (do not attempt):**

- Anything behind authentication. No account creation, no sign-in, no credential entry.
- Anything behind a paywall or gated form requiring personal data.
- In-product UI states only reachable after login.

**Consequence:** in-product error states, empty states, and transactional
confirmations are usually *reconstructed from help-centre documentation* rather
than observed directly. Every file must say which is which. Use the
`Evidence type` marker on any section where copy is documented rather than observed:

- `[observed]` — the string appears on a public page as live UI or live content
- `[documented]` — the string is quoted inside a help article or docs page describing the UI
- `[absent]` — looked for, not found publicly

---

## 2. Domain / industry labelling

Two levels, both required.

**Level 1 — Domain** (fixed, one of ten):

| Code | Domain |
|---|---|
| `PROD` | Productivity and collaboration |
| `DEV` | Developer, infrastructure, and security |
| `FIN` | Financial services and insurance |
| `COMM` | Commerce and delivery |
| `TRAV` | Travel and mobility |
| `HLTH` | Health and wellbeing |
| `EDU` | Education and learning |
| `MEDIA` | Entertainment, media, and social |
| `AI` | AI and creator products |
| `SVC` | Customer service, business, and public service |

**Level 2 — Industry / sub-vertical** (free text, specific). Examples:
`neobank`, `cross-border remittance`, `BNPL`, `crypto exchange`,
`robo-advisor`, `P2P payments`, `insurtech`, `grocery delivery`,
`OTA / travel metasearch`, `ride-hailing`, `airline`, `mental health`,
`menstrual health`, `language learning`, `MOOC`, `music streaming`,
`social video`, `LLM assistant`, `e-signature`, `government service`.

**Regulatory posture** (required for FIN, HLTH, and government products):
note the regulators and disclosure regimes visible in the copy
(e.g. FCA, FDIC, SEC/FINRA, HIPAA, GDPR, PCI DSS, state insurance).

---

## 3. Content taxonomy — the categories to extract

Each per-product file uses these fourteen categories. Omit a category only
if genuinely nothing was found, and then mark it `[absent]`.

| # | Category | What counts |
|---|---|---|
| T1 | **Navigation & IA labels** | Global nav, footer groupings, help-centre top-level categories, breadcrumbs |
| T2 | **Value proposition & headline patterns** | Hero headline, subhead, section headers, benefit framing |
| T3 | **CTA inventory** | Every distinct button/link label, with its context and position |
| T4 | **Onboarding & getting-started** | Step names, step counts, progress language, "how it works" sequences |
| T5 | **Form & field labels** | Input labels, placeholders, hint text, validation-requirement text |
| T6 | **Status & state language** | Transaction/order/deployment/trip states and the exact words used |
| T7 | **Error, failure & recovery** | Error titles, explanations, and the recovery action offered |
| T8 | **Empty states** | No-data, no-results, cleared, caught-up, first-run copy |
| T9 | **Notifications & system messages** | Toasts, banners, emails, push copy, alert wording |
| T10 | **Disclosures, legal & compliance** | Fee, rate, risk, eligibility, consent, and regulatory disclosure copy |
| T11 | **Help-centre architecture** | Category tree, article-title grammar, self-service routing |
| T12 | **FAQs** | Question verbatim, answer summarised, plus the FAQ's placement |
| T13 | **Terminology & glossary** | Product-specific coined terms and the words chosen over alternatives |
| T14 | **Voice, tone & accessibility** | Register, person, tense, reading level, alt text, label practices |

---

## 4. Quotation rules

Short functional UI strings are the unit of value here, so quote them exactly.
Longer prose is not.

- **Quote verbatim:** CTAs, nav labels, field labels, status names, error titles,
  empty-state headlines, FAQ questions, category names, coined terms.
  Keep each verbatim quote under roughly 15 words.
- **Summarise, do not quote:** FAQ answers, help-article bodies, marketing
  paragraphs, legal text. Paraphrase the substance in your own words and note
  the structure (length, ordering, what it leads with).
- **Never reproduce** an entire page, article, or policy.
- **Always attribute** a verbatim string to the exact source URL it came from.

---

## 5. Per-product file template

Filename: `products/NNN-<slug>.md` where `NNN` is the corpus number, zero-padded.

```markdown
# NNN. <Product name>

| Field | Value |
|---|---|
| Domain | `<CODE>` — <Domain name> |
| Industry / sub-vertical | <specific> |
| Primary URL | <url> |
| Corpus rank | NNN |
| Benchmark strength (source list) | <verbatim from the brief> |
| Locale / market observed | <e.g. en-US> |
| Platform observed | <web / mobile web / docs> |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | <regulators, or n/a> |
| Harvest date | 2026-09-21 |
| Pages inspected | <count> |
| Harvest completeness | <full / partial / blocked — reason> |

## Pages inspected

| Label | URL | Notes |
|---|---|---|

## T1 Navigation & IA labels
## T2 Value proposition & headline patterns
## T3 CTA inventory
## T4 Onboarding & getting-started
## T5 Form & field labels
## T6 Status & state language
## T7 Error, failure & recovery
## T8 Empty states
## T9 Notifications & system messages
## T10 Disclosures, legal & compliance
## T11 Help-centre architecture
## T12 FAQs
## T13 Terminology & glossary
## T14 Voice, tone & accessibility

## Transferable patterns
<3-6 bullets: what a content designer could reuse, and the condition under which it transfers>

## Caveats & gaps
<what was not reachable, what was inferred, what needs an authenticated pass>

## Sources
<numbered list of every URL used>
```

---

## 6. Quality bar

A file is complete when:

1. At least six of the fourteen taxonomy categories carry real extracted content.
2. Every verbatim string is attributable to a listed source URL.
3. `Harvest completeness` honestly reflects what was reachable.
4. FAQ questions are verbatim; FAQ answers are summarised.
5. Domain code and sub-vertical are both filled.
6. Gaps are stated rather than padded with plausible-sounding invention.

**Invention is the one unacceptable failure.** If a category was not found,
mark it `[absent]`. Never write a string that was not seen.
