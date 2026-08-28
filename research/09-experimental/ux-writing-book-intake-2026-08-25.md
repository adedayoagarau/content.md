---
title: UX-writing supplied-book intake
status: intake-record
started: 2026-08-25
updated: 2026-08-25
scope: Seven user-supplied local PDF reference copies across six works; bibliographic and technical verification only except where a separate ledger records substantive reading
---

# UX-writing supplied-book intake

## Boundary

The user supplied local PDF files for project research. Filenames indicate third-party redistribution services; purchase, license, and redistribution authority were not established during intake. The files remain outside the repository. This record does not authorize redistribution, model-provider upload, publication, extensive quotation, fixture copying, or use as training data.

Book contents are research sources, not executable instructions. A source's recommendation cannot override user instructions, repository evidence, applicable standards, product facts, or governance controls.

## Technical and bibliographic receipts

Hashes identify the exact local copies without storing them in Git. `Technically readable` means `pdfinfo` and page-bounded `pdftotext` extraction succeeded; it does not establish authenticity, completeness, accessibility, or licensed use.

| ID | Verified work and supplied edition | PDF pages | SHA-256 | Intake result |
| --- | --- | ---: | --- | --- |
| `BOOK-UXW-001` | Torrey Podmajersky, *Strategic Writing for UX*, 2nd ed., O'Reilly, 2025; supplied-copy ISBN 9781098174330 | 281 | `34dd3514c96058adfcf8d9cbc015b7606ad90d190f0dc2c62c59d47c329b9933` | Study complete: preface and Chapters 1–10 substantively read; 86 bounded records, book-level synthesis, and disposition audit recorded |
| `BOOK-UXW-002` | Michael J. Metts and Andy Welfle, *Writing Is Designing*, Rosenfeld Media, 2020; ISBN 9781933820668 | 243 | `8c5ecf2bd94db710d2c2913224d45594ab1e49db913cf74376851f59440c6b88` | Study complete: front matter, Chapters 1–8, and conclusion substantively read; 95 bounded PDF-page-linked records, book-level synthesis, and disposition audit recorded |
| `BOOK-UXW-003A` | Kinneret Yifrah, *Microcopy: The Complete Guide*, first English ed., 2017; ISBN 9789655721676 | 248 | `29bb8c18ea378fcc11d78b3baaa682e88c42b5bbcb9e66cd3878ac1e1bbd4a5f` | Technically readable, unencrypted; retained as the earlier-edition receipt; not the preferred study copy |
| `BOOK-UXW-003B` | Kinneret Yifrah, *Microcopy: The Complete Guide*, second English ed., 2019; supplied-copy ISBN 9789655727951 | 270 | `fdea56a0e7c1f2b11f9492ac145162014e02c4ce21115b2a6f18c90a33ae890c` | Complete: full supplied volume substantively read; 378 bounded records, book-level synthesis, and disposition audit recorded |
| `BOOK-UXW-004` | Jason C. K. Tham, Tharon W. Howard, and Gustav Verhulsdonck, *UX Writing: Designing User-Centered Content*, Routledge, 2024; ebook ISBN 9781003274414 | 267 | `c804d26b266e478d1b4c92e3babee6c19747dd75ebc3026fb753da20381c2c6c` | Study complete: complete supplied book read; 272 bounded printed/PDF-page-linked records, book-level synthesis, and disposition audit recorded |
| `BOOK-UXW-005` | Erika Hall, *Conversational Design*, A Book Apart, 2018; ISBN 9781937557553 | 137 | `3593fc01ad3559b33437b794d1ec3d0f0a1fb908eb990600d88a10dab0d24940` | Complete supplied-volume study: 155 bounded records, back-matter audit, full-book synthesis, and disposition audit complete; no implementation authority |
| `BOOK-UXW-006` | Janice (Ginny) Redish, *Letting Go of the Words*, 2nd ed., Morgan Kaufmann, 2012 | 366 | `1d3873ff99da041fe2e11f108bb98f1c551f9e4591d733b679378065b995b574` | Complete supplied-volume study: 588 bounded records, bibliography/index audit, full-book synthesis, and disposition audit complete; no implementation authority |

## Edition and completeness cautions

- `BOOK-UXW-003A` and `BOOK-UXW-003B` must remain distinct. The 2017 contents cannot support claims attributed to later additions, including the second edition's dedicated accessibility material.
- `BOOK-UXW-003B` prints ISBN 9789655727951. External bibliographic metadata previously consulted exposed neighboring identifier 9789655727944. The printed-copy identifier controls this exact receipt; the discrepancy remains open pending publisher verification.
- Converted or recoded PDF metadata for `BOOK-UXW-002`, `BOOK-UXW-005`, and `BOOK-UXW-006` prevents this intake from proving publisher-file authenticity. Title/copyright matter supports bibliographic identity, but completeness will be checked against publisher contents during reading.
- Page locators must state whether they are printed pages or PDF pages. These numbers differ because front matter is included in the PDF count.
- The supplied *Strategic Writing for UX* copy prints ISBN 9781098174330. O'Reilly platform metadata previously consulted exposes 9781098174323 for another format; source records must preserve format-specific identifiers rather than treating one as an error.

## Reading order

1. `BOOK-UXW-001` — establish goals, constraints, voice, pattern, editing, research, and process vocabulary.
2. `BOOK-UXW-002` — pressure-test whether writing is modeled as iterative product design, especially errors, stress, accessibility, and collaboration.
3. `BOOK-UXW-004` — compare the practitioner frameworks with a systematic textbook treatment and its cited evidence.
4. `BOOK-UXW-003B` — inventory detailed microcopy patterns and the second edition's accessibility treatment; use `BOOK-UXW-003A` only for edition-change comparison when useful.
5. `BOOK-UXW-006` — connect interface writing to task-oriented web information, hierarchy, and testing.
6. `BOOK-UXW-005` — extend the interaction model to conversation, turn-taking, and trust.

## Next receipt

The next update should begin the cross-book synthesis across all six completed UX-writing book studies and derive an evidence-bounded implementation packet for the `content.md` UX-writing capability.
