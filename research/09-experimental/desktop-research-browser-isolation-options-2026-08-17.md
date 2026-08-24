---
title: Desktop research browser isolation options for B0
status: working-note
started: 2026-08-17
updated: 2026-08-19
evidence_cutoff: 2026-08-17
research_mode: official-public-documentation-read-only
execution_status: a1-a2-rehearsals-run-no-candidate-certified
operational_status_as_of: 2026-08-19
scope: Privacy-safe temporary desktop-browser options for two reproducible B0 public-source runs
---

# Desktop research browser isolation options for B0

## Result and evidence boundary

This paper compares browser-isolation options for the public, signed-out B0 desktop-study run defined in the [product desktop study protocol](product-desktop-study-protocol.md#first-batch-script-protocol-defined-execution-gated). It is based on current official Google, Chromium, Apple, and OpenAI documentation reviewed on **17 August 2026, America/Los_Angeles**.

At the 17 August evidence cutoff, no browser was opened or controlled for this official-source comparison. Later, separately scoped operational records tested [A1](desktop-observations/2026-08-18-a1-built-in-browser-rehearsal.md#result) and [A2](desktop-observations/2026-08-19-a2-chrome-guest-rehearsal.md#result) without external navigation. A1 was not targetable. A2 produced two clean Guest start states, but Computer Use saw Chrome's personal-profile picker after Guest exit; a revised attempt later attached to a non-Guest Chrome window when another Chrome window existed. The window-selection and cleanup/capture boundaries therefore failed closed. Those later observations do not refresh the official-source evidence cutoff and do not certify an option or make B0 ready.

Use these claim labels throughout:

- **[Sourced fact]** — a bounded statement directly supported by the linked official documentation.
- **[Inference]** — an interpretation of one or more sourced facts for this study.
- **[Proposal]** — a candidate control, sequence, decision, or approval scope that has not been executed.
- **[Open question]** — a fact the reviewed official sources do not settle and that requires a named check.

Official product documentation describes intended behavior. It does not prove the current managed Mac configuration, Computer Use attachment behavior, absence of residual files, absence of background network traffic, or deletion completeness.

## Decision the paper supports

**[Proposal]** Select the least-invasive environment that can plausibly support two signed-out, public-read-only B0 runs while keeping personal browser information out of visible UI and captures. The selected option must still pass an action-time preflight and the B0 authorization gates before navigation begins.

The existing B0 contract requires:

1. no personal account, tabs, bookmarks, history, extensions, passwords, or unrelated content in the research surface or capture;
2. two separately clean starts with the same allowed routes and comparable browser state;
3. exact public-route constraints, redirects recorded, and no login, form submission, download, upload, install, token, connector, payment, or product execution;
4. a known capture boundary for screenshots, rendered state, accessibility information, and any data processed by Computer Use;
5. a bounded cleanup path that does not delete personal data;
6. documented or explicitly unknown sync, extension, telemetry, security-service, retention, and residual-data behavior; and
7. demonstrated Computer Use operability in the selected isolated surface.

## Two different allowlists

**[Inference]** The protocol must not use one phrase, “allowed origins,” for two different controls:

- A **navigation allowlist** limits the top-level routes the operator may open and requires the operator to stop on an unexpected redirect.
- A **network-egress allowlist** limits every browser, page, extension, security-service, telemetry, DNS, and platform request.

**[Sourced fact]** Chrome documents Safe Browsing requests to Google or a privacy server under standard protection and more extensive URL/page-content sharing under enhanced protection. Chrome also documents optional usage, crash, and URL metrics ([Safe Browsing](https://support.google.com/chrome/answer/13844634?co=GENIE.Platform%3DDesktop), [usage statistics and crash reports](https://support.google.com/chrome/answer/14746339)).

**[Sourced fact]** Apple documents that Safari may send information derived from a website address to Google Safe Browsing and Apple, and that optional Safari features can send searches, addresses, or page content to Apple ([Safari & Privacy](https://www.apple.com/legal/privacy/data/en/safari/)).

**[Open question]** The reviewed OpenAI browser documentation does not enumerate every browser or platform network destination, telemetry event, or retention period for the built-in browser.

**[Inference]** None of the consumer options below establishes an exact network-egress allowlist from documentation alone. A B0 approval can safely describe exact **navigation** routes, but it must either separately authorize documented browser/platform service traffic, instrument and verify the egress boundary, or keep network confinement unverified. Disabling browser security protection merely to make the route list look closed is not recommended.

## Official-source findings

### 1. Chrome named profile

- **[Sourced fact]** Google says Chrome profiles keep bookmarks, history, passwords, and other settings separate. A user can create a profile without choosing to sign in to a Google Account ([manage Chrome profiles](https://support.google.com/chrome/answer/2364824)).
- **[Sourced fact]** Removing a Chrome profile erases that profile's bookmarks, history, passwords, and other settings from the computer. Google also warns that a person with device access can switch to another Chrome profile and see its information ([manage Chrome profiles](https://support.google.com/chrome/answer/2364824)).
- **[Inference]** A dedicated signed-out profile separates stored profile data, but it remains inside the same profile-switching product surface as personal profiles. A capture-safe result therefore depends on the visible browser chrome, profile chooser, managed policies, and Computer Use attachment behavior—not on storage separation alone.
- **[Open question]** Official consumer documentation does not establish that a new profile on this managed Mac starts without force-installed extensions, inherited enterprise policies, Chrome-level telemetry settings, or visible references to other profiles.

### 2. Chrome Guest

- **[Sourced fact]** Google says Guest mode cannot find or change another Chrome profile's information. When Guest mode exits, browsing history, cookies, and site data are deleted from the computer ([browse as a guest](https://support.google.com/chrome/answer/6130773?co=GENIE.Platform%3DDesktop)).
- **[Sourced fact]** Google's enterprise comparison says Guest mode does not use Chrome Sync, does not use extensions, and does not save browsing history; browser session data is not written to local disk. Enterprise policy may disable Guest mode ([private-browsing comparison](https://support.google.com/chrome/a/answer/9302896)).
- **[Sourced fact]** Chrome does not allow adding extensions while browsing as Guest, and Guest availability can be controlled by a managed-browser policy ([extensions](https://support.google.com/chrome/answer/2664769), [Chrome policies](https://support.google.com/chrome/a/answer/2657289)).
- **[Inference]** Guest is the strongest documented no-profile-mixing Chrome mode and does not require creating a persistent Chrome profile. It is a plausible minimal fallback only if a live, non-capturing preflight confirms that the managed browser exposes Guest mode, shows no personal browser chrome, and can be operated through OS-level Computer Use without relying on a Chrome extension.
- **[Open question]** The reviewed documents do not establish an auditable deletion receipt, exact cache/residual inventory, route-level allowlist for Guest, or mode-specific telemetry inheritance. The 19 August A2 rehearsal established that Computer Use can target a Guest start state on this Mac, but not that app-level targeting selects Guest when another Chrome window exists; its observed close path also exposed the personal-profile picker.

### 3. Chrome Incognito

- **[Sourced fact]** Incognito creates a separate browsing session and removes its cookies and site data after all Incognito windows are closed. It does not automatically sign the user into accounts ([Incognito](https://support.google.com/chrome/answer/95464)).
- **[Sourced fact]** Incognito retains downloaded files and bookmarks after the session. Google says sites and network operators can still observe activity, and data collection by sites and services is not changed merely by being signed out ([Incognito](https://support.google.com/chrome/answer/95464)).
- **[Sourced fact]** Google's private-browsing comparison says Incognito can use extensions that a user has individually enabled for Incognito, while the normal and Incognito windows can coexist. Google separately documents that a user can switch between regular and Incognito windows ([private-browsing comparison](https://support.google.com/chrome/a/answer/9302896), [Incognito](https://support.google.com/chrome/answer/95464)).
- **[Inference]** Incognito reduces local session persistence but does not create a clean browser identity or eliminate personal-profile UI/capture risk. It does not meet the B0 no-personal-chrome requirement in the current study design and should not be retried as the primary isolation control.

### 4. Chrome with a custom `--user-data-dir`

- **[Sourced fact]** Chromium documents that the user data directory contains history, bookmarks, cookies, and per-installation local state, and that individual profiles live inside it ([user data directory](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md)).
- **[Sourced fact]** Chromium documents the `--user-data-dir` command-line flag on most platforms and a macOS wrapper that launches Chrome with a custom directory. A separate Chromium guide describes separate data directories for parallel browser instances and says an empty directory causes initial profile data to be created ([user data directory](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md), [creating and using profiles](https://www.chromium.org/developers/creating-and-using-profiles/)).
- **[Sourced fact]** On macOS, Chromium documents that the cache directory may be derived separately when a profile is under `Library/Application Support`; otherwise the cache directory is the profile directory ([user data directory](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md)).
- **[Sourced fact]** The Chromium profile guide describes clearing a test profile by closing Chrome and deleting the contents of the custom profile folder, but its platform-specific clearing example is written for Windows; its macOS profile instructions are incomplete ([creating and using profiles](https://www.chromium.org/developers/creating-and-using-profiles/)).
- **[Inference]** A fresh operator-selected custom directory per run can provide a more inspectable clean-start and cleanup target than an in-product named profile. The official documentation establishes a custom data-directory mechanism, not an automatically ephemeral one. “Ephemeral `--user-data-dir`” is therefore a proposed lifecycle—create an exact isolated directory, launch against it, close the process, inspect the exact target, and delete only that target—not a documented Chrome mode.
- **[Open question]** A rehearsal must establish whether the installed managed Chrome build opens a genuinely separate instance, whether enterprise policies or force-installed extensions still apply, whether all cache/crash/update artifacts stay inside the approved target, and whether Computer Use attaches to the intended instance rather than a personal Chrome window.

### 5. Chrome enterprise-only controls

- **[Sourced fact]** Google documents enterprise policies for Incognito allowed and blocked URL patterns. When an Incognito allowlist is configured and its blocklist is empty, unmatched URLs are blocked. The same policy documentation describes forced ephemeral mode and browser-data lifetime controls ([Chrome policies](https://support.google.com/chrome/a/answer/2657289)).
- **[Sourced fact]** Google's separate private-browsing comparison says forced ephemeral mode requires administrator policy and can still use Chrome Sync when the user signs in ([private-browsing comparison](https://support.google.com/chrome/a/answer/9302896)).
- **[Inference]** These controls prove that managed URL restriction and ephemeral-profile features exist; they do not make them an appropriate B0 option. Changing organization-managed policy could affect personal browser use and is materially broader than a temporary public-source study.
- **[Proposal]** Do not request enterprise-policy changes for B0. Treat them as a later environment-engineering option only if an accountable device administrator supplies a dedicated research device or managed test tenant.

### 6. Safari named profile

- **[Sourced fact]** Safari 17 and later profiles separate history, cookies, website data, Tab Groups, and favorites-folder views. New-profile extensions are off by default, but installed Safari extensions remain available to all profiles and are enabled separately ([Safari profiles](https://support.apple.com/en-us/105100)).
- **[Sourced fact]** Apple says AutoFill information, Passwords information, Security settings, Websites settings, Privacy settings, and the overall Bookmarks menu/sidebar are shared across profiles. Profiles automatically sync to other devices when the same Apple Account uses Safari in iCloud ([Safari profiles](https://support.apple.com/en-us/105100)).
- **[Sourced fact]** Deleting a Safari profile deletes its history, cookies, and other website data, but favorites and other bookmarks are kept. The default profile cannot be deleted ([Safari profiles](https://support.apple.com/en-us/105100)).
- **[Inference]** A Safari research profile does not satisfy “no personal browser data” by itself because passwords, AutoFill, bookmarks, and some settings cross the profile boundary, and profile sync can create an external residual. It should not be the primary B0 environment.

### 7. Safari Private Browsing

- **[Sourced fact]** Safari Private Browsing does not save visited pages, AutoFill information, recent searches, open tabs to iCloud, or cookie/website-data changes. Downloads remain on the computer, and non-private Safari windows can remain open at the same time ([Safari Private Browsing](https://support.apple.com/guide/safari/browse-privately-ibrw1069/mac)).
- **[Sourced fact]** Apple documents that private windows use the Favorites bar of the default profile ([Safari profiles](https://support.apple.com/en-us/105100)).
- **[Inference]** Safari Private Browsing reduces persistence but does not establish a separate capture-safe browser identity. Its default-profile favorites relationship and coexistence with non-private windows make it unsuitable as the primary B0 isolation control.
- **[Open question]** Official OpenAI documentation does not establish Safari-specific Computer Use behavior, capture granularity, or a route allowlist. These would require a non-capturing, no-navigation rehearsal.

### 8. ChatGPT desktop built-in browser used by Codex

- **[Sourced fact]** OpenAI documents that the desktop built-in browser uses a profile separate from the user's regular browser and does not automatically share existing tabs or browser session. It keeps its own profile and browsing history, which can be searched or cleared in Browser settings when the organization permits it ([Browser](https://learn.chatgpt.com/docs/browser)).
- **[Sourced fact]** OpenAI documents that Computer Use can let ChatGPT Work or Codex open pages, click, type, inspect rendered state, take screenshots, and verify results in the built-in browser. The browser asks before accessing a website unless it has already been allowed; allowed and blocked sites are managed in Browser settings ([Browser](https://learn.chatgpt.com/docs/browser)).
- **[Sourced fact]** The documented permission is site-oriented, and the page does not state that a path-exact route allowlist is enforced. Downloads go to the system Downloads folder by default. Full Chrome DevTools Protocol access is an optional, separately approved developer setting that can expose sensitive browser internals ([Browser](https://learn.chatgpt.com/docs/browser)).
- **[Sourced fact]** OpenAI says Computer Use on macOS needs Screen Recording and Accessibility permissions. It can view target-app content, take screenshots, and interact with window, menu, keyboard-input, and clipboard state; screenshots processed through Computer Use are subject to the user's ChatGPT data controls ([Computer Use](https://learn.chatgpt.com/docs/computer-use)).
- **[Inference]** The built-in browser has the best documented combination of separation from personal Chrome and direct Computer Use support. It is not automatically ephemeral: its own history persists until cleared, downloads leave the browser boundary, website permissions are not documented as route-exact, and clearing local browser data does not by itself establish deletion of task messages or screenshots processed through ChatGPT.
- **[Open question]** An action-time check must establish whether the Browser capability is enabled for this task, whether its current profile contains unrelated history or imported data, which data categories “Clear browsing data” removes, whether organization policy permits cleanup, and what current ChatGPT workspace data-control and retention rules apply to the B0 capture class.

### Adjacent OpenAI cloud browser

- **[Sourced fact]** OpenAI documents a cloud-operated browser for ChatGPT Work that runs separately from the browser on the device, supports public signed-out websites, keeps separate cookies/data, and lets the user clear all cloud-browser data. It cannot use local tabs, extensions, saved passwords, or browser history ([Browser](https://learn.chatgpt.com/docs/browser)).
- **[Inference]** This can be a public-source research fallback, but it is not evidence of the requested local end-to-end desktop workflow or the installed product's behavior under desktop Computer Use. Do not substitute it for B0 desktop evidence without changing the study question and protocol.

## Decision table

Legend: **Meets** means official documentation directly supports the criterion in scope; **Conditional** requires a bounded action-time check or external protocol control; **Does not meet** conflicts with the criterion; **Unknown** is not established in the reviewed sources.

| Option | No personal browser data in research surface | Two reproducible clean starts | Exact route constraint | Capture boundary | Cleanup/deletion | Extensions and sync | Telemetry and retention | Computer Use operability | B0 disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ChatGPT desktop built-in browser | **Conditional.** Separate from regular browser, but existing in-app history/import state must be checked without exposing it | **Conditional.** Clear before each run; no documented atomic reset or deletion receipt | **Conditional.** Site permissions plus protocol route list; path-exact enforcement not documented | **Meets for visibility, not retention.** Shared browser view; screenshots/rendered state can be processed; full CDP stays off | **Conditional.** Browser data can be cleared; task/screenshot retention is separate | **Conditional.** No regular-browser sharing; extension/import behavior beyond documented profile separation is not fully specified | Browser history persistence is known; exact platform telemetry, cleared-data residuals, and capture retention require workspace data-control review | **Meets.** Explicitly supported in desktop Browser with Computer Use | **Preferred preflight candidate if already enabled and empty or safely resettable; not ready until checks pass** |
| Chrome Guest | **Meets in documented browser-data scope.** Cannot see/change other profiles | **Conditional.** Exit deletes local browsing activity; repeatability and residuals need rehearsal | **Conditional.** Operator route list; no consumer route enforcement documented | **Conditional.** Computer Use can see the Chrome app; Guest-specific attachment and visible chrome must be rehearsed | **Meets for documented history/cookies/site data.** No deletion receipt; downloads remain prohibited | **Meets.** No Sync or extensions in documented Guest mode | Chrome metrics/Safe Browsing may still operate; Guest inheritance and server retention are unknown | **Conditional.** General Chrome control is documented; Guest cannot use an extension and needs OS-level rehearsal | **Least-persistent Chrome fallback; fail closed if managed Guest is unavailable or any private chrome appears** |
| Fresh custom Chrome `--user-data-dir` per run | **Conditional.** Separate data directory; managed policy/forced-extension and window-selection risks remain | **Conditional but strongest inspectability.** Empty exact directory per run and scoped deletion proposed, not yet rehearsed | **Conditional.** Protocol routes; no consumer route enforcement | **Conditional.** Target Chrome instance must be uniquely identified; screenshots are ChatGPT-processed data | **Conditional.** Exact directory is removable; macOS cache/residual map and safe deletion require rehearsal | **Conditional.** Empty user state, but machine policy and metrics may remain | Chrome metrics/Safe Browsing documented; exact per-directory inheritance and remote retention unknown | **Conditional.** Chrome is supported; attachment to the intended parallel instance unverified | **Auditable fallback after explicit launch/delete approval; not an official ephemeral mode** |
| Dedicated signed-out Chrome named profile | **Conditional.** Stored data separate, but profile switching and visible managed chrome remain | **Conditional.** Delete/recreate or clear; persistent profile makes reset evidence weaker | **Conditional.** Protocol routes; enterprise policy would be a separate admin action | **Conditional.** Same Chrome app can expose other profiles/windows | **Conditional.** Profile deletion erases its local data but is destructive and has no residual receipt | **Conditional.** Can remain signed out; extensions/policies must be audited | Chrome metrics/Safe Browsing documented; profile-specific settings and retention unknown | **Conditional.** General Chrome use documented; exact-profile targeting needs rehearsal | **Not first choice; more persistent and more coupled to personal Chrome than Guest/custom directory** |
| Chrome Incognito from personal Chrome | **Does not meet.** Coexists with and can switch to the regular profile; existing Incognito-enabled extensions may run | **Partial only.** Cookies/site data clear after all Incognito windows close; bookmarks/downloads persist | **Conditional.** Enterprise Incognito URL policy exists but is outside consumer B0 scope | **Does not meet current risk boundary.** Personal Chrome UI/window context can enter capture | **Partial.** Session data clears; bookmarks/downloads persist | **Does not meet.** Incognito-enabled extensions can run; profile chrome remains | Chrome metrics/Safe Browsing and site/network visibility remain | **Conditional.** Operable as Chrome, but isolation failed the study requirement | **Reject as primary B0 isolation** |
| Safari named research profile | **Does not meet.** Passwords, AutoFill, bookmarks, and several settings are shared | **Conditional.** Profile data can be deleted, but bookmarks remain and iCloud sync may create residuals | **Unknown.** No path-exact allowlist found | **Conditional.** Same Safari app includes personal profiles and shared data surfaces | **Does not fully meet.** History/cookies/site data delete; bookmarks persist; default profile cannot be deleted | **Does not meet.** Profiles can sync; installed extensions exist across profiles though new-profile use is off by default | Safari security/service traffic is documented; exact session telemetry and retention remain unresolved | **Unknown.** No Safari-specific control contract found | **Reject as primary B0 isolation** |
| Safari Private Browsing | **Does not meet.** Private windows use default-profile Favorites and can coexist with non-private windows | **Partial only.** Page/search/cookie changes are not saved; downloads remain | **Unknown.** No path-exact allowlist found | **Does not meet current risk boundary.** Same app can expose non-private windows/default favorites | **Partial.** Close all private windows; downloads must be deleted separately | **Does not establish separation.** Default-profile relationship remains | Safari security/service traffic is documented; exact session telemetry and retention remain unresolved | **Unknown.** No Safari-private Computer Use contract found | **Reject as primary B0 isolation** |
| ChatGPT Work cloud browser | **Meets for device-browser separation** | **Conditional.** Cloud data can be cleared; later-chat continuity is not guaranteed | **Conditional.** Site permissions, not path-exact enforcement | Cloud screenshots/replay are inspectable but are not local desktop captures | Cloud browser data can be cleared; exact evidence/task retention is separate | Does not use device tabs, extensions, passwords, or local history | Platform processing/retention still requires workspace review | **Does not meet the local-desktop study question** | **Public-source fallback only; exclude from B0 desktop claims** |

## Least-invasive recommendation

**[Proposal]** Use a staged, fail-closed selection rather than creating a Chrome profile immediately:

1. **First candidate — ChatGPT desktop built-in browser, only if already enabled and its separate profile is empty or contains only deletable study data.** It is officially documented as separate from the regular browser and directly operable by Computer Use. Keep Developer mode/full CDP off, keep website access on “Always ask,” prohibit downloads and sign-in, and clear only data known to have been created by the study between the two runs and after close.
2. **Second candidate — Chrome Guest, if the built-in browser is unavailable or cannot be safely reset.** Guest has the strongest official Chrome statement against access to other profiles and no extension/Sync surface, but the local rehearsal showed that app-level targeting may select a different Chrome window. Do not attach unless the user immediately confirms every personal Chrome window is closed and the runtime can bind to the exact Guest window without reading another window. Computer Use must inspect only the Guest surface, record its final in-Guest state, and detach before the user closes Guest. The user's close confirmation is a separate, explicitly user-reported cleanup receipt; the next separately prepared Guest start checks for study-state residuals. Computer Use must not reattach to Chrome merely to observe closure, because the observed close path returns to the personal-profile picker.
3. **Third candidate — a new exact custom Chrome user-data directory for each run.** Use this only after the operator has explicit permission to launch Chrome against the named isolated directory and to delete that exact directory after the process closes. It is more auditable than a persistent named profile but requires a controlled launch, target verification, residual scan, and safe cleanup.
4. Do not use Chrome Incognito, a Safari profile, or Safari Private Browsing as the primary B0 boundary. Do not request enterprise browser-policy changes for this batch.

**[Inference]** “Least invasive” here means least contact with personal browser state and least persistent device mutation, not the fewest clicks. The built-in browser is preferred only conditionally; if it already contains unrelated data, clearing it would be destructive to user data and the option must be rejected or separately approved.

This recommendation does not resolve the protocol's independent SEC-P0 result/grant requirements, capture retention, background network boundary, or the need to prove two clean starts.

`A1` is a **non-navigating isolation rehearsal only**. The current B0 runtime manifest is explicitly bound to Chrome and `B0-DEDICATED-SIGNED-OUT`; an `A1` success neither satisfies that manifest nor creates a SEC-P0-G/SEC-P0-B result, grant, control record, or authorization. Using the built-in Browser for a later B0 route requires a new versioned runtime and external-research manifest/profile package, fresh matching gate evaluations, exact grants, capture/retention controls, and separate approval before navigation. Without that package, select an approved Chrome candidate or keep B0 `blocked-access`.

## Action-time approval packet

The following packet is a **proposal for the exact approval request**, not an approval and not permission to proceed.

### A. Decision requested

Choose exactly one candidate for a **non-navigating isolation rehearsal**:

- `A1`: ChatGPT desktop built-in browser already enabled; inspect only its blank/start state and Browser settings relevant to site permissions, history state, downloads, and Developer mode. This rehearsal cannot satisfy the current Chrome-bound B0 manifest.
- `A2`: Chrome Guest; after the user has closed or withheld personal Chrome windows, inspect only the Guest start state. Record the final in-Guest state, detach Computer Use, ask the user to close every Guest window, and record the reply as a user-reported cleanup receipt. Do not reattach to observe the close. A later separately prepared Guest start is the residual-state check.
- `A3`: Custom Chrome user-data directory; create one exact temporary research directory, launch one signed-out Chrome instance against it, inspect only the start state, close it, and delete only that exact directory after a scoped residual check.

If the selected candidate is unavailable, nonempty with unrelated data, managed beyond the approved boundary, or not controllable without a new install/permission/policy change, stop and return `blocked-access`. Do not silently fall through to another candidate.

### B. Rehearsal scope

| Field | Proposed exact value |
| --- | --- |
| Purpose | Establish isolation and Computer Use targeting only; no B0 product research |
| Allowed apps | ChatGPT desktop built-in Browser for `A1`, or Google Chrome for `A2`/`A3`; no other app |
| Allowed pages | Browser blank/start page and the minimum settings/status surface required to verify the selected option; no external website navigation |
| Accounts | None; remain signed out; do not import a profile or sign in |
| Actions | Open selected isolated surface, read visible start state, verify no private content, and verify Computer Use can target it. For A2, Computer Use records the final in-Guest state and detaches; the user closes Guest and reports completion. A later separately prepared Guest start checks for study-state residuals without exposing the profile picker |
| Captures | Ephemeral inspection only by default; persist no screenshot if any private or unrelated content appears |
| Prohibited | Login, search, external navigation, form submission, download, upload, extension, Developer mode/full CDP, profile import, Sync, password/AutoFill access, clipboard use, policy change, install, browser security reduction |
| Stop conditions | Any private content, wrong window, unrelated history, existing study-unsafe data, new permission/install prompt, managed restriction, unknown deletion target, or unexpected network/page transition |
| Cleanup | Close the selected surface; clear only study-created in-app data for `A1`; for `A2`, detach Computer Use while Guest is still visible, then have the user close every Guest window and provide a separate cleanup confirmation; close the custom instance and delete only the predeclared exact directory for `A3` |
| Success evidence | Two blank-state rehearsals from separately clean starts; no private content in any Computer Use state; correct target selected each time; no prohibited action; a final clean in-candidate state; candidate-specific cleanup receipt; and the later clean start contains no prior study state. An A2 user receipt records reported closure but is not an independent deletion receipt |

### C. Separate B0 approval after rehearsal

Only after the isolation rehearsal passes, request a second approval for:

1. the exact B0 run ID and both current control-result/grant bindings;
2. the exact route list from the protocol and a hostname/path mapping;
3. “Always ask” site approval or equivalent per-origin operator check;
4. public page data only, with no login, downloads, uploads, forms, credentials, installs, or product actions;
5. the exact screenshot/accessibility capture classes, storage location, redaction rule, retention, and deletion date;
6. an explicit disposition for ChatGPT task/screenshot retention distinct from local browser cleanup;
7. an explicit statement that the route list is a navigation allowlist, plus the approved or unverified disposition of browser/security/platform background traffic;
8. two full runs from separately clean starts, with the selected environment reset and checked between runs; and
9. a named stop owner and cleanup owner.

For Frontitude, the route package must name `https://www.frontitude.com/` as the scheduled route and may predeclare only the exact root-to-root `https://frontitude.com/` ↔ `https://www.frontitude.com/` top-level canonicalization pair. Every other new top-level origin or route stops. This does not authorize, observe, or prove asset, CDN, security-service, telemetry, DNS, or platform background egress; that boundary remains explicitly unverified unless separately instrumented and approved.

## Evidence still required before selection can become ready

- **[Open question]** Is the built-in Browser already enabled for this Codex task, and can its state be inspected without exposing unrelated history or imported data?
- **[Open question]** Does the applicable ChatGPT workspace allow clearing Browser data, and what does that action remove versus preserve?
- **[Open question]** What retention and training/data-control rules apply to screenshots, accessibility-derived content, task messages, and browser replay in the user's current workspace and plan?
- **[Documented practice]** Chrome Guest is available under the currently observed managed-browser configuration, and OS-level Computer Use targeted two Guest start states without a Chrome extension. It later attached to a non-Guest Chrome window when another window existed, and the close path exposed the profile picker. A2 remains blocked until exact Guest-window selection and a detach-before-user-close plus later clean-start residual procedure both pass.
- **[Open question]** Does the installed Chrome build apply managed extensions, policies, metrics settings, or other local state to a custom user-data directory?
- **[Open question]** Which local files, caches, crash data, update data, and logs are created by each candidate during a blank-state rehearsal?
- **[Open question]** The current B0 route package now constrains top-level navigation only and records background egress as unverified. If a later study requires an exact network-egress claim, what approved instrumentation, endpoint inventory, retention boundary, and revised manifest will prove it?
- **[Open question]** Can two resets reproduce the same safe start-state evidence without deleting any pre-existing user data?

Until these questions are resolved with direct, scoped evidence, the environment remains `not-ready`; the existing B0 `not-started` disposition should not change.

## Official source register

| Publisher | Source | Used for | Evidence limitation |
| --- | --- | --- | --- |
| Google Chrome Help | [Manage Chrome with multiple profiles](https://support.google.com/chrome/answer/2364824) | Profile separation, switching risk, local profile deletion | Consumer behavior, not current managed-device evidence |
| Google Chrome Help | [Browse Chrome as a guest](https://support.google.com/chrome/answer/6130773?co=GENIE.Platform%3DDesktop) | Other-profile boundary and exit cleanup | Does not specify residual audit, telemetry, or Computer Use |
| Google Chrome Help | [Browse in Incognito mode](https://support.google.com/chrome/answer/95464) | Session boundary and persistence limitations | Does not certify capture isolation |
| Google Chrome Help | [Install and manage extensions](https://support.google.com/chrome/answer/2664769) | Guest/Incognito extension-install boundary | Does not inventory managed or pre-enabled extensions |
| Chrome Enterprise Help | [Allow private browsing](https://support.google.com/chrome/a/answer/9302896) | Guest, Incognito, and forced-ephemeral comparison | Enterprise policy context; not proof of local policy state |
| Chrome Enterprise Help | [Set Chrome policies](https://support.google.com/chrome/a/answer/2657289) | Incognito URL restrictions, Guest availability, forced ephemeral mode | Large mutable policy catalog; applying policy is outside scope |
| Chromium project | [User data directory](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md) | Custom directory and macOS cache mapping | Developer documentation; not an automatic ephemeral contract |
| Chromium project | [Creating and using profiles](https://www.chromium.org/developers/creating-and-using-profiles/) | Separate data directories and manual clear concept | Mac-specific create/clear instructions are incomplete |
| Google Chrome Help | [Usage statistics and crash reports](https://support.google.com/chrome/answer/14746339) | Metrics, URL sharing, crash content, default setting | Does not give a full per-mode retention/egress inventory |
| Google Chrome Help | [Safe Browsing](https://support.google.com/chrome/answer/13844634?co=GENIE.Platform%3DDesktop) | Browser security-service traffic | Does not enumerate every endpoint or retention period |
| Apple Support | [Use profiles in Safari on Mac](https://support.apple.com/en-us/105100) | Separate and shared profile data, extensions, sync, deletion | Intended Safari behavior; not local Computer Use evidence |
| Apple Support | [Browse privately in Safari on Mac](https://support.apple.com/guide/safari/browse-privately-ibrw1069/mac) | Private-session storage and download boundary | Does not establish separate identity or route control |
| Apple Legal | [Safari & Privacy](https://www.apple.com/legal/privacy/data/en/safari/) | Safari service traffic and retention examples | Feature-specific notice, not a complete packet trace |
| OpenAI Docs | [Browser](https://learn.chatgpt.com/docs/browser) | Built-in/cloud browser separation, history, permissions, screenshots, cleanup | Does not specify exact route enforcement or complete telemetry/retention |
| OpenAI Docs | [Computer Use](https://learn.chatgpt.com/docs/computer-use) | macOS permissions, visible/captured data boundary, approvals, data controls | Does not certify a particular local browser session or deletion outcome |
