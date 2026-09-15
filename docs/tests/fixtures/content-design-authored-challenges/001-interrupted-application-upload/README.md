# Challenge 001: Interrupted application upload

This challenge asks `content.md` to replace misleading recovery copy shown
after an interrupted application session.

The frozen input is `scenario.json`. Use `prompts/contentmd-rewrite.md` to create
the first candidate. Save the exact, unedited result as
`outputs/contentmd/candidate.json`.

After that file exists, give Claude and Cursor separate copies of
`scenario.json`, `outputs/contentmd/candidate.json`, and
`prompts/independent-review.md`. Save their exact responses in their named
folders. Do not let either reviewer inspect the other response.

This challenge is unreviewed calibration material. It is not a gold example and
does not establish that the proposed rewrite is correct.
