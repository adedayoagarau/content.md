# Authored content-design challenges

This track evaluates whether `content.md` can improve realistic English product
content and explain its reasoning. It is separate from the historical generated
10,000-scenario matrix.

Each numbered challenge is self-contained:

```text
<challenge>/
  scenario.json
  SOURCE-NOTES.md
  prompts/
    contentmd-rewrite.md
    independent-review.md
  outputs/
    contentmd/
    claude/
    cursor/
```

## Workflow

1. A project author writes and freezes an original scenario with product facts,
   current content, constraints, and meaning requirements.
2. `content.md` receives only the scenario and writes a proposed replacement
   with a rationale. Its output goes in `outputs/contentmd/`.
3. Claude and Cursor independently review the same frozen scenario and the
   `content.md` candidate. Neither reviewer may open the other review. Their
   outputs go in their respective folders.
4. A qualified content designer compares the reviews, records disagreements,
   and decides whether the scenario and rubric are useful. Model agreement is
   not human gold and does not establish product effectiveness.

## Current scope

- English product content only.
- Locale, translation, and in-market readiness are not evaluated.
- Scenarios are project-authored synthetic fixtures, not observed product
  evidence or approved content.
- Candidates and reviews are proposal-only and never grant approval,
  publication, retrieval, training, or release authority.
- The scenario author, tool under test, external reviewers, and human
  adjudicator remain distinguishable in every artifact.

The scenario/challenge/constraints structure is inspired by the public article
[The Daily UX Writing Challenge, then and now](https://uxcontent.com/the-daily-ux-writing-challenge-then-and-now/).
No scenario, candidate wording, evaluation label, or review from that article is
copied into this track.
