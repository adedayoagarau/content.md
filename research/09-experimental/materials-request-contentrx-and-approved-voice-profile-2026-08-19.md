---
title: Materials request for ContentRX public policies and an approved voice profile
status: working-note
started: 2026-08-19
updated: 2026-08-19
request_status: ready-to-send
authority_effect: none
execution_authority: none
desktop_study_credit: none
source_documents:
  - materials-and-access-register.md
  - public-source-material-acquisition-supplement-2026-08-18.md
  - public-licensed-voice-profile-candidate-govuk-2026-08-19.md
---

# Materials request for ContentRX public policies and an approved voice profile

## Why this request exists

Two evidence gaps now need user-supplied material:

1. The official ContentRX policy pages and DPA cannot be retrieved from the current research environment. A normal request fails certificate validation; a diagnostic request that ignores certificate validation returns HTTP 403 HTML rather than the target material. Search and research-browser access also do not provide the source bodies.
2. The public GOV.UK candidate is suitable for paper pressure tests, but it is not an owner-approved organizational voice and terminology package and cannot support an organizational-fidelity claim.

Supplying either bundle does not authorize installation, account access, model calls, product execution, harness execution, publication, or a desktop study. Received files will first be treated as untrusted research inputs and checked for scope, provenance, rights, personal data, integrity, and conflicts.

## Request A — ContentRX public policy export bundle

Please export the current public material at these exact URLs:

| Requested ID | Source URL | Preferred capture |
| --- | --- | --- |
| `MAT-CRX-PRIVACY` | `https://contentrx.io/privacy` | PDF print or complete saved HTML |
| `MAT-CRX-TERMS` | `https://contentrx.io/terms` | PDF print or complete saved HTML |
| `MAT-CRX-ETHICS` | `https://contentrx.io/ethics` | PDF print or complete saved HTML |
| `MAT-CRX-SECURITY` | `https://contentrx.io/security` | PDF print or complete saved HTML |
| `MAT-CRX-ACCURACY` | `https://contentrx.io/accuracy` | PDF print or complete saved HTML |
| `MAT-CRX-DPA` | `https://contentrx.io/legal/dpa.pdf` | original PDF if the URL serves one; otherwise a PDF print showing what appears |

For each file, please preserve or provide:

- the exact source URL
- the visible title
- the visible effective, updated, or snapshot date, if shown
- the capture timestamp and timezone
- the complete public text, tables, footnotes, and linked-source labels visible on the page
- the original file if the site directly downloads a PDF

### Do not include

- cookies, authentication headers, tokens, API keys, or credentials
- browser history, bookmarks, profile names, extensions, or unrelated tabs
- account navigation, subscriber-only material, or private workspace content
- personal data, private annotations, highlights, comments, or organization-confidential material
- a screenshot that cuts off text when a complete PDF or HTML export is available

If a page is unavailable, access-protected, or replaced by a security/interstitial page, please do not bypass it. Record the URL, timestamp, visible error, and whether the target content was absent.

## Request B — current owner-approved voice and terminology package

Please provide one current package for an organization or product that an authorized owner has approved for the intended research scope. A redacted copy is acceptable if the redaction does not remove the fields below.

### Minimum contents

| Field | What is needed |
| --- | --- |
| Package identity | exact title, organization/product scope, version, effective date and status |
| Authority | approving role or controlled identity reference, approval date, and the scope actually approved |
| Voice | 3 to 5 anchored dimensions with positive and negative descriptions |
| Tone | situational rules for at least ordinary task, error, serious/high-stress, success and support contexts |
| Terminology | preferred, controlled and prohibited terms with reasons or governing sources |
| Examples | at least one positive and one counterexample for each dimension or major rule |
| Exceptions | named exceptions, conflicts, locale or channel overrides, and escalation route |
| Coverage | product surfaces, channels, audiences, locales and excluded contexts |
| Governance | owner, review cadence, change route, supersession or withdrawal process |
| Research permission | confirmation that the supplied material may be used for private research and synthetic evaluation design |

### Acceptable formats

- a PDF or exported document with visible version and approval information
- a repository snapshot or archive with a manifest and the exact approved commit or release
- a set of files plus a separate versioned approval/owner record

A public brand page without an authenticated approval or scope record can still be useful as source evidence, but it will remain a candidate like the GOV.UK profile and will not close this request.

## Receipt and handling

After receipt, the research workflow will:

1. inventory the files without executing embedded code or following private links
2. separate source, evidence, decision and approval records
3. compute local content hashes and record the hashing method
4. check file scope, dates, completeness, conflicts, rights and personal-data exposure
5. preserve disagreements among Privacy, Terms, DPA, provider statements and product claims
6. propose an exact bounded use; no supplied file will automatically become harness authority
7. return a gap report if the material is incomplete or cannot be safely admitted

## Current fallback if the materials are not available

- ContentRX remains `public-source-incomplete`; its documented public clients can inform source-only planning, but no policy-body or runtime claim is upgraded.
- `VP-CAND-GOVUK-PUBLIC-001@candidate-0.1` remains available for paper graph pressure tests only, with organizational-fidelity scoring prohibited.
- Offline simulator design can proceed only after the separately requested design approval; these materials do not provide that approval.
