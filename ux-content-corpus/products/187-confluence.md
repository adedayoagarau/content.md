# 187. Confluence

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Team wiki and collaboration / knowledge management and document workspace |
| Primary URL | https://www.atlassian.com/software/confluence |
| Corpus rank | 187 |
| Benchmark strength (source list) | Templates and collaborative guidance |
| Locale / market observed | en-US (`English▾` switcher in the atlassian.com footer) |
| Platform observed | Web (marketing — partly rendered), Data Center product documentation on `confluence.atlassian.com`, the Atlassian Design System |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for the product surface. `Notice at Collection` (CCPA) and `Impressum` in the footer; `GDPR guides` linked from the documentation chrome |
| Harvest date | 2026-09-22 |
| Pages inspected | 10 retrieved, 2 blocked |
| Harvest completeness | **Partial.** The Confluence product page and the templates hub **did** render server-side (unlike Jira's, corpus #186), so T2, T3 and the template inventory are well covered. The pricing page body did not render and `support.atlassian.com/confluence-cloud` returns an empty body, so plan pricing, seat definitions and the Cloud help IA are missing. Page-state, template and restriction vocabulary was fully retrievable from Data Center documentation. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Confluence product page | https://www.atlassian.com/software/confluence | **Rendered.** Hero, six content types, Rovo blocks, customer quotes, signup form |
| Templates hub | https://www.atlassian.com/software/confluence/templates | **Rendered.** Category taxonomy, eleven collections, eleven named templates with descriptors |
| Confluence pricing | https://www.atlassian.com/software/confluence/pricing | **Body not rendered.** Metadata only |
| Docs: Drafts | https://confluence.atlassian.com/doc/drafts-149040.html | **`draft` vs `unpublished changes`**, lozenges, `Close`, `Publish`, revert, delete |
| Docs: Page templates | https://confluence.atlassian.com/doc/page-templates-296093785.html | Four template categories, variables, promotion, the "can't apply to an existing page" rule |
| Docs: Blueprints | https://confluence.atlassian.com/doc/blueprints-323982376.html | **The full blueprint inventory**, index pages, promote/disable/reset |
| Docs: Page restrictions | https://confluence.atlassian.com/doc/page-restrictions-139414.html | Restriction model, inheritance, `Who is "everyone"?`, request/grant access |
| ADS: Voice and tone | https://atlassian.design/foundations/content/voice-tone | Shared with #186 |
| ADS: Style, grammar, and punctuation | https://atlassian.design/foundations/content/language-and-grammar | Shared with #186; the rules Confluence's own docs break |
| Atlassian Status | https://status.atlassian.com/ | `Confluence` has its own status page in the hub |
| **BLOCKED** | https://support.atlassian.com/confluence-cloud | Empty body; the Cloud help centre is unreachable |
| **BLOCKED** | https://atlassian.design/content | Empty body; guidance relocated to `/foundations/content/` without a redirect |

---

## T1 Navigation & IA labels

**Confluence runs a product-scoped sub-nav, separate from the Atlassian global nav**
`[observed]`:

`Features` (→ `All Features`, `Rovo in Confluence`) · `Resources` (→ `Guides`,
`Templates`) · `Templates` · `Enterprise` · `Pricing` · `More +`, with
`Get it free` · `Search` · `Sign in`.

**Defect:** `Templates` appears **twice** — once as a top-level nav item and once nested
inside `Resources`, both resolving to the same hub. And `Features` contains `All Features`,
so the parent and the child are the same word plus a quantifier.

**Template taxonomy — the IA that matters for this product** `[observed]`.
Three overlapping classification systems ship on one page:

**(a) Eight browse categories**, used as the tab set:
`Recommended` · `Design` · `Finance & Ops` · `Human Resources` · `Marketing & Sales` ·
`Product Management` · `Project Management` · `Software & IT`

**(b) Eleven named `Template collections`**, each with a count:
`Product management templates` · `Strategic planning templates` ·
`Employee development templates` · `Human resource templates` ·
`Project management templates` · `Templates for remote workers` ·
`Software development templates` · `Design system templates` ·
`IT Service Management templates` · `Marketing strategy templates` ·
`Product development templates` — each with a `View 5 templates →` or
`View 3 templates →` link.

**(c) Six `Additional template categories`**:
`Project Planning` · `Business Strategy` · `Productivity` · `Docs & Reports` ·
`Startup` · `Personal`

**Three taxonomies, twenty-five labels, and they overlap heavily.** `Project Management`
(category a), `Project management templates` (collection b) and `Project Planning`
(category c) are three differently-cased, differently-worded entry points to adjacent
sets. Likewise `Product Management` / `Product management templates` /
`Product development templates`, and `Human Resources` / `Human resource templates`.

**And the casing is inconsistent between the three systems**: (a) and (c) use Title Case
(`Human Resources`, `Business Strategy`); (b) uses sentence case
(`Human resource templates`, `Strategic planning templates`). Both violate the design
system's sentence-case rule in (a) and (c), and both are on one page.

The collection descriptor is a single sentence, unpunctuated:
"See curated templates targeted to help achieve work and collaboration goals".

**Defect:** the rendered page repeats the eleven-collection list **three times** in the
retrieved markup (responsive/carousel variants), and the eleven named template cards
**twice**, so the DOM contains roughly three copies of the entire template taxonomy. A
screen-reader user may encounter the full list three times. Flagged as suspected, since
CSS may hide the duplicates.

**Documentation IA** `[observed]`: the Confluence Data Center documentation is a
Confluence space (`DOC`) rendered through Scroll Viewport, with the same fourteen-version
selector and the same chrome as the Jira space (see #186 T11).

The `Pages and blogs` section contains twenty-three articles — the single most
template-and-authoring-relevant section in the product, listed in T11.

**Footer** `[observed]`: the standard Atlassian footer — `Company` column,
`Products`, `Resources`, `Learn`, and the legal row `Privacy policy` ·
`Notice at Collection` · `Terms` · `Impressum` · `English▾`.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The AI workspace that works with you`
> Subhead: "Confluence is the one place for all your ideas, docs, knowledge, and human+AI teammates."

The headline is a pun on `works` (works = functions / works = labours alongside).
`human+AI teammates` with a literal plus sign is the coined construction and it recurs
("Unlock human+AI teamwork, in one collection").

**Defect:** the design system forbids `&` as unlocalisable and confusing to assistive
technology; `human+AI` raises the identical problem with `+` and is not covered by any
published rule. A screen reader will announce it as "human plus AI" at best.

**The blank-page problem is named explicitly in the product's own marketing** `[observed]`
— this is the direct evidence for the benchmark strength:

> `Put pen to paper. No hassle.`
> "**Beat the blank page** with AI creation and ready-to-use templates. Draft PRDs, social briefs, annual plans, and more in seconds."

`Beat the blank page` is the four-word statement of the entire template proposition, and
it names the *user's emotional obstacle* rather than the feature. Note also the
enumeration — `PRDs, social briefs, annual plans` — one artefact per audience (product,
marketing, leadership) in a five-word list. Naming three concrete outputs beats naming the
capability.

`Put pen to paper. No hassle.` uses an analogue metaphor for a product that has just been
repositioned around AI. Two full stops, two fragments.

**Section headers, in order** `[observed]`:

- `Powering every stage of work` — "See how Confluence connects your teams from ideas to knowledge to impact."
- `Put pen to paper. No hassle.`
- `Transform ideas into action` — "Get to outcomes faster."
- `Get context and answers`
- `Stay in the know, your way`
- `Work faster, smarter, and together with Rovo`
- `Work isn't one-size-fits-all. Neither is Confluence.`
- `Collaboration is at the core of Confluence`
- `Unlock human+AI teamwork, in one collection`
- `Get your team on Confluence`

`Work isn't one-size-fits-all. Neither is Confluence.` is the strongest — a two-sentence
parallel with an elided verb in the second clause, introducing the content-type list. It
is also the only header on the page that makes a claim the page then substantiates with a
concrete inventory.

**The Rovo block repeats verbatim three times** `[observed]`. `Revisualize content,
instantly` / `Answers from anywhere` / `Move work along with agents` / `Turn thoughts into
action` appear three consecutive times in the retrieved markup with identical body copy.
Responsive or carousel duplication, but it means the page's AI pitch is stated three
times within one scroll region.

**Customer quotes are unusually comparative** `[observed]` — two of five name a
competitor:

- "Confluence will be our single source of truth for documentation moving forward."
- "Confluence has been massively easier to use than **Sharepoint**, and it's more consistent and easier to navigate than **Google Docs**."
- "By leveraging Jira and Confluence for automated reporting, we're saving over 800 hours and $500k per year in management consulting costs previously spent on manual reporting."

The Sharepoint/Google Docs quote is doing positioning work Atlassian's own copy never
does directly. Note the misspelling `Sharepoint` (the product is SharePoint) inside a
published quotation.

**Pricing-page metadata** `[observed]`, body not rendered, and it shows the same
three-title defect found on Jira:

| Slot | String |
|---|---|
| `<title>` | `Confluence Pricing: Free and Paid Plans \| Atlassian` |
| `og:title` | `Confluence Pricing: Choose Your Plan \| Atlassian` |
| `meta-description` | "Find the perfect Confluence plan to ignite collaboration and supercharge productivity within your team. Discover your match today!" |
| `og:description` | "Find Confluence pricing and plans that fit your business needs. Compare Cloud, **Server**, and Data Center options." |

Same two defects as Jira: **`Server` is still advertised** in the social-share description
of a live pricing page, and the `<title>` is Title Case in violation of the design system.
The `meta-description` also ends in an **exclamation mark** — "Discover your match today!"
— against the rule "Avoid exclamation marks in UI copy and minimize their use in product
marketing copy."

Plan names were **not** recoverable: unlike Jira's title
(`Free, Standard, Premium, Enterprise`), Confluence's title says only
`Free and Paid Plans`. `[absent]`

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get it free` | Confluence sub-nav, repeated 4× in the rendered markup | |
| `Get Confluence free` | Closing block | **Second variant** |
| `Sign up` | Hero form submit | |
| `See pricing` | Collection block | |
| `Sign in` | Sub-nav | |
| `Search` | Sub-nav | |
| `More +` | Sub-nav overflow | |
| `Skip to content` | First in DOM, rendered twice | Accessibility, present |
| `Explore features` | Content-types block | |
| `Explore whiteboards` / `Explore databases` / `Explore pages` / `Explore videos` | Content-type cards | Destination-named, consistent |
| `Explore Remix` | Rovo block | |
| `Explore Teamwork Graph` | Teamwork Graph block | |
| `Explore Collection` | Collection block | |
| `See all integrations` | Integrations block | |
| `Read all stories` / `Read story` | Customer stories | Singular/plural pair, consistent |
| `View template` | Every template card on the hub | **Used eleven times, identically** |
| `View 5 templates →` / `View 3 templates →` | Collection cards | Count injected into the label |
| `All Atlassian templates` | Cross-product template CTA | A bare noun phrase as a CTA |
| `Create from template` | Documented, Confluence header | |
| `Create` | Documented, create dialog | |
| `Publish` | Documented, editor | |
| `Close` | Documented, editor — **saves without publishing** | See T6 |
| `Show more` | Documented, create dialog | |
| `Promote` / `Disable` / `Reset to default` | Documented, `Space tools > Content Tools` | |
| `Edit` / `Save` | Documented, template editing | |
| `More options` (⋯) | Documented, editor overflow | |
| `View changes` | Documented, editor overflow | |
| `Revert to last published version` | Documented, editor overflow | A six-word destructive action, fully specified |
| `Delete unpublished page` | Documented, editor overflow | Not "Delete draft" — see T13 |
| `Restrictions` | Documented, page header icon and overflow item | |
| `Add` / `Apply` | Documented, restrictions dialog | Two-step commit |
| `No restrictions` | Documented, restrictions dialog | An action labelled as the resulting state |
| `Remove` | Documented, restrictions list | |
| `Inherited Restrictions` | Documented, restrictions dialog | |
| `Request access` | Documented, blocked page | |
| `Grant access` | Documented, email and dialog — **the same label in both** | |
| `Restricted Pages` | Documented, `Space tools > Permissions` | |

**Observation.** The marketing CTA set is unusually disciplined for an Atlassian surface:
`Explore <thing>` used seven times with the destination named every time, `View template`
used eleven times identically, and `Read all stories` / `Read story` correctly inflected.
Compare the Jira marketing pages, which shipped a bare `Read More` in Title Case. **The
Confluence marketing site obeys the "no bare Learn more" principle almost completely.**

The exception is the signup pair: `Get it free` (four instances) vs `Get Confluence free`
(one) — two labels, one action.

**`Close` as the save-without-publishing control is the most consequential label in the
product** and it is discussed in T6. `No restrictions` as a *button* whose label names a
*state* is the second-most interesting: the user clicks the condition they want rather
than the verb that produces it.

## T4 Onboarding & getting-started

**Signup is a one-field form with a constraint stated as a benefit** `[observed]`:

> `Work email*`
> "Use a work email to find teammates and get access to Rovo AI"
> `Sign up` / "Or continue with" `Google`

The asterisk marks the field required; the hint text turns a restriction ("no personal
email addresses") into two payoffs (find teammates, get Rovo). **Reframing a validation
rule as a reason is the reusable move here** — the user is told *why* the constraint
exists before they hit it, so the eventual error is pre-explained.

**The create-content path is the real onboarding, and it is template-first**
`[documented]`:

1. "Choose **Create from template** in the Confluence header"
2. "Select a blueprint from the create dialog"
3. "Hit **Create**"

Then: "The editor will open, and, depending on the blueprint selected, a prompt to enter
information or the page will appear. You can now **follow the instructions built in to the
blueprint** to add content."

**"Instructions built in to the blueprint"** is the key phrase. A Confluence blueprint is
not an empty shape — it ships with in-page guidance the author reads and deletes. That is
the de-risking mechanism the brief asks about, and it is a different mechanism from
Calendly's `Quick answer` or Front's `Before you begin`: **the guidance lives inside the
artefact the user is creating, not beside it.**

**Blueprints also create an index page on first use** `[documented]`:

> "The first time a blueprint is used in a space, Confluence creates an index page and
> adds a shortcut to your sidebar … The index displays a list of pages made with the
> blueprint, and information selected from your blueprint pages. For example, the meeting
> notes index displays a list of all meeting notes pages in the space, who created them,
> and when they were last modified."

Annotated callouts on the index screenshot: `Easy to find`: "notes from all your meetings
are listed here." · `Start a new meeting`: "create a new meeting notes page here."

`Start a new meeting` as the label on a *create page* button is a small, deliberate
elision — the user's real intent is the meeting, not the page.

**The anti-blank-page mechanism is named and its rationale published** `[documented]`:

> "If you're a space administrator, you can choose to **promote** specific templates and
> blueprints in the Create dialog. **Promoting items can help ensure consistency in a
> space by encouraging users to create particular types of content, instead of blank
> pages.** The promoted templates or blueprints will appear at the top, with all other
> content types, including **Blank Page** and **Blog Post** collapsed under them."

So `Blank Page` is a *demotable* option. The blank page is modelled as one content type
among many and can be pushed below a `Show more` link. That is the strongest available
statement of "templates de-risk the blank page" — Confluence lets an admin literally hide
it.

**And there is a self-correcting escape hatch** `[documented]`:
"If you use the **Show more** link in the create dialog more than three times in a single
space, the dialog will show you all templates by default from then on."

**A behavioural override with a published threshold.** Three uses and the product stops
insisting. Very few products publish the number, and publishing it is what makes the
behaviour feel like a policy rather than a glitch. **Directly reusable anywhere a
progressive-disclosure default fights a power user.**

**Hard constraints on templates, stated up front** `[documented]`:

- "You can only use page templates when creating a page. **You can't apply a template to an already-existing page.**"
- "Once a page has been added using a template, the template is no longer linked to the page and you can change the page as desired."
- "Templates are available for pages, so to use one for a blog post, first create a page from a template and then convert it to a blog post."

The second is the important one: **the template is a starting shape, not a binding
schema**, and saying so prevents the user expecting propagation. The third is a documented
workaround for a missing capability, stated without apology.

## T5 Form & field labels

`[documented]` unless noted.

**Signup** `[observed]`: `Work email*` with hint text; `Sign up`; "Or continue with"
`Google`.

**Restrictions dialog — the collaboration-permission vocabulary**

| Label / value | Notes |
|---|---|
| `Restrictions` | The icon and the menu item |
| `Edit` | "limit only who can **Edit**" |
| `View and / or Edit` | The compound option — note the **spaces around the slash** |
| `Viewing and Editing restricted` | The resulting state name, gerund-form |
| `Add` | Adds a named user or group to the list |
| `Apply` | Commits the whole dialog |
| `No restrictions` | Removes everything |
| `Remove` | Removes one entry |
| `Inherited Restrictions` | Shows the ancestor pages imposing restrictions |
| `Restricted Pages` | The space-level audit list, under `Space tools > Permissions` |

**Defect:** `View and / or Edit` (the option) vs `Viewing and Editing restricted` (the
state) vs `Edit` (the other option). Three grammatical forms across one dialog, and
`View and / or Edit` is typeset with spaces either side of the slash, which the design
system's number guidance discourages in an adjacent context ("Use 'of' rather than a
forward slash").

**The three restriction-icon states are documented as a table** `[documented]`, which is
the right artefact for an icon-only control:

| Icon | Meaning (verbatim) |
|---|---|
| grey | "Viewing this page is not restricted. Everyone can see this page (but editing may be restricted)." |
| red, locked | "The page is restricted. Select the icon to see the list of who can view and edit this page." |
| red, unlocked | "The page is inheriting restrictions from another page. Select the icon then select **Inherited Restrictions** to see a list of pages this page is inheriting restrictions from." |

Note the first one's parenthetical — "(but editing may be restricted)" — which admits
that the *default* icon does not mean *unrestricted*. An icon that means "view is open,
edit might not be" cannot be read from the icon alone, and the documentation says so
rather than pretending otherwise.

**Annotated-screenshot callouts are used as micro-guidance** `[documented]`, and they are
written as imperatives with a colon:

- `Speed it up`: "apply the same restriction to multiple people and groups."
- `Watch out`: "restrictions on other pages can affect this one."
- `Be specific`: "choose exactly what each group or person can do."

Three two-or-three-word imperative labels covering efficiency, hazard and precision. A
compact and reusable annotation grammar.

**Template creation** `[documented]`: templates are written "using the Confluence editor";
"You can also add special **variables** to the page, if you want to include fields that
the author will complete when adding the page." — `variable` is the term for an
author-fills-this-in slot.

**Space admin controls** `[documented]`: `Space tools` > `Content Tools`;
`Space Tools` > `Content Tools` (**cased two ways on one page**); `Space tools` >
`Permissions`; `Administration menu ⚙` > `General Configuration` >
`Global Templates and Blueprints`.

**Defect:** Atlassian's design system says "Avoid using a `>` symbol where possible, as it
is read out as 'greater than' by assistive technologies … Use 'then' instead." The
Confluence documentation uses `>` in navigation instructions throughout.

## T6 Status & state language

**Confluence's state model is small, and its central distinction is genuinely subtle.**
`[documented]`

### Two states, precisely distinguished

> "A **draft** is a page you've never published. **Unpublished changes** are edits that
> you've made to a published page, without republishing them."

Two sentences, two definitions, and the difference is **whether a published version
exists underneath**. This is the same shape of problem as Jira's status-vs-resolution: two
things a user would lump together as "not saved yet", separated because their *recovery
paths differ*.

- A `draft` can be deleted — and deleting it deletes the page, because there is nothing underneath: "Because drafts have never been published, you'll be deleting the entire page or blog post."
- `Unpublished changes` cannot be deleted, only **discarded by reverting**: "you can discard all changes by reverting to the last published version of the page."

Two states, two different destructive actions, two different labels:
`Delete unpublished page` and `Revert to last published version`. **Neither action label
uses the state word from the other state**, which is correct and rare.

### The state lozenges

> "Drafts and pages with unpublished changes appear in **Recently worked on** in the
> dashboard. You can easily differentiate between these as they'll have a **'draft'** or
> **'unpublished changes'** lozenge next to their titles."

Two lozenge values, lowercase, quoted in the documentation as `'draft'` and
`'unpublished changes'`. And a visibility rule most products would not bother to state:

> "The 'unpublished changes' lozenge is only visible to people who have contributed to the
> draft or unpublished changes, **so you don't have to worry about it distracting your
> viewers.**"

**A state that is visible only to the people whose state it is.** The reassurance clause
("so you don't have to worry about…") explains why the scoping exists, which is the part
that converts a rule into a relief.

### `Close` — the most consequential label in the product

> "If you're creating or editing, but don't want to publish your changes yet, hit
> **Close** at the bottom-right of the editor. This will save those changes in the editor
> without publishing, and you can return to them at any point."

**`Close` saves.** In a document editor, the word `Close` conventionally means *discard or
exit*, and Confluence has assigned it the meaning *save privately and leave*. There is no
`Save` button. The mental model is coherent once learned — because of autosave, the only
real decision is publish-or-not, and `Close` is "not yet" — but the label does not carry
that model on its own, and the documentation has to spend a paragraph on it.

Compare the alternatives Confluence rejected: `Save draft` (accurate but wrong when
editing a published page, where it is not a draft), `Save and exit` (two verbs),
`Done` (ambiguous with publish). There is no obviously better single word, which is
exactly why this is worth recording: **it is a case where the state model has no good
short label, and the product chose the familiar word over the accurate one.**

### Publishing and shared drafts

> "Drafts in Confluence are **shared**, meaning other people can work on them with you.
> If you delete a draft that other people have worked on, you're deleting their changes
> too."

And, from the revert flow, the pre-emptive check:

> "Before you revert to the last published version you should: Check who else has edited
> the page since last publish — their avatars will be shown at the top of the editor. In
> the editor, go to **More options** > **View changes** to see all changes that have been
> made since last publish. The changes won't be attributed to individual users."

**A two-step "check before you destroy someone else's work" procedure attached to the
destructive action**, with an honest limitation admitted in the same breath
("The changes won't be attributed to individual users"). The product cannot tell you *who*
wrote *what*, and rather than let you discover that at the worst moment it says so in the
instruction.

`Personal drafts` is a named legacy state: "When collaborative editing is turned off,
drafts work a little differently. Instead of a shared draft, you have a **personal draft**
of a page." Plus the archaeology note: "You may see some old personal drafts in the Drafts
page in your profile. These were created when collaborative editing was turned off."

### Other named states

- `Untitled` — "If you didn't enter a page title, the draft will be called '*Untitled*'." A default value published as a documented string.
- `Recently worked on` — the dashboard list where both states surface.
- `Drafts` — a tab on the user's own profile: "only drafts that you created show in your profile".
- Restriction states: unrestricted / restricted / inheriting (see T5).
- "Discarded drafts are **not sent to the trash**." — an explicit statement that a soft-delete does *not* apply here, placed next to the delete action.

### Status page

`[observed]`: `Confluence` has its own Statuspage at `confluence.status.atlassian.com`,
one of twenty-five product status pages in the `status.atlassian.com` hub. The hub showed
`All Systems Operational` and no incidents in the preceding fourteen days at harvest.

## T7 Error, failure & recovery

`[documented]`. No Confluence error string was observable; the design-system error
guidance (quoted in full in corpus #186 T7) governs.

**Confluence's published failure content is about *access*, not about errors**, and it is
the strongest recovery flow in this file.

**`Request access` — a failure state turned into a workflow** `[documented]`:

> "If you navigate to a page that you're not able to view or edit because it has page
> restrictions applied (for example from a link, an invite, or page URL) you may be able
> to request access to the page."

1. "On the restricted page, select **Request access**."
2. "Confluence will send an email to up to 5 people most likely to be able to grant you access."
3. "Wait for an email confirming that access has been granted."

And the granting side uses **the same two words in both surfaces**: "In the request access
email, select **Grant access**. You'll be taken to the restricted page, and a dialog will
appear with the access request. Select **Grant access**."

**The routing logic is published** `[documented]`, which is the unusual part:

> "Confluence will send an email to up to 5 people who are most likely to be able to grant
> access, in the following order: 1. people who have contributed to the page in the past,
> can see the page and have "Restrict" or "Admin" space permission (sorted by last edit
> date) 2. space administrators who can see the page (sorted alphabetically). This means
> that the request should be actioned quickly, as it prioritizes the people who have been
> interacting with the page most recently."

Telling a blocked user *how the system chose whom to ask* converts an opaque wait into a
legible one. And the failure of the failure path is also disclosed:
"**There's no follow up email if none of the 5 people respond**, the user will need to
contact a space administrator directly to ask for access."

**Collision handling in the grant flow** `[documented]`: "(We'll let you know if someone
else got there before you, and has already granted access)" — a race-condition message
described in the documentation, in parentheses, in the first person plural, exactly as the
design system prescribes (`we`, not `you`).

**When the recovery is unavailable, the reasons are enumerated** `[documented]`:

> "If the request access message above doesn't appear, you're not able to request access
> for that particular page. This usually is because the page has inherited view
> restrictions from a parent page, you don't have adequate space permissions, or there is
> no mail server set up."

Three causes, ordered by likelihood, including a systems cause the user cannot fix
("no mail server set up"). **Explaining the absence of an affordance is rarer and harder
than explaining an error**, and Confluence does it here.

**Diagnostic troubleshooting written as a checklist** `[documented]`:

> "If the person you've listed as a viewer or editor can't see the page, check to make
> sure: they have **View** space permission for that space, or there's no view restriction
> on a page higher up the page hierarchy that prevents them seeing any children of that
> page."

**Constraint stated as a flat impossibility** `[documented]`:
"**You can't exclude yourself** — When you apply a restriction, Confluence will
automatically add you to the list. You can't remove yourself from this list."
Bolded label, then the rule, then the consequence. Three clauses, no hedging.

## T8 Empty states

`[documented]` / `[observed]`.

`Untitled` is the published default for an untitled draft — an empty-state *value* rather
than an empty-state message.

`Beat the blank page` (T2) is the marketing framing of the empty state, and the
`Blank Page` content type is the empty state made into a selectable object that admins can
demote (T4). **Confluence is the one product in this batch that treats the empty state as
a first-class, nameable, rankable thing** rather than as a screen you write copy for.

**Observed defect, site-wide**: every page of the Confluence Data Center documentation
renders `Related content` / `No related content found` — twice per page, in the left rail
and again at the article foot — on every article harvested. A permanently unpopulated
module shipping its empty state everywhere. It also renders the literal fallback string
`Unable to load` beneath the `Documentation` heading in the left rail. (Identical to the
Jira space; see #186 T8.)

In-product empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]`.

**Watching and notification are named as a hazard in the copy-a-page guidance**, which is
where the notification model surfaces publicly:

> "When you copy a single page, we don't automatically copy the restrictions. If the page
> contains information that should be private, remember to reapply restrictions in the
> editor **before** you publish, **to avoid notifying people who are watching the space**."

**A notification described as a leak vector.** The warning is not "you will send emails",
it is "publishing is what notifies, and notification is what exposes the content". That
reframing — notification as a *disclosure event* — is a genuinely useful way to write
about watch/subscribe mechanics in any workspace product.

**The access-request email chain** (T7) is the other documented notification flow:
a request email to up to five recipients, a `Grant access` action inside the email, and a
confirmation email to the requester. Three messages, all described, none quoted.

**Product-surface notification claims** `[observed]`:
`Stay in the know, your way` — "Get up-to-date on all the work happening around you with
AI page and comment summaries, audio briefings, and integrations." `audio briefings` is
the notable named format.

**Documentation feedback** `[observed]`: `Was this helpful?` → `Yes` / `No` →
`It wasn't accurate` / `It wasn't clear` / `It wasn't relevant` →
`Provide feedback about this article`. (Same three-way negative taxonomy as Jira; see
#186 T9, where it is discussed as a transferable pattern.)

No toast, flag or banner strings were observable. `[absent]`

## T10 Disclosures, legal & compliance

Thin, because the pricing page body did not render.

**Plan names not recoverable** — the `<title>` says only `Free and Paid Plans`. `[absent]`
No prices, seat definitions, storage limits or cancellation wording. `[absent]`

**Stale deployment option advertised** `[observed]`: the live pricing page's
`og:description` and `twitter:description` both read "Compare Cloud, **Server**, and Data
Center options." Server sales and support ended in February 2024. (Identical defect on the
Jira pricing page — see #186 T2 — so this is a systemic metadata-maintenance failure
across Atlassian product pricing pages, not a one-off.)

**End-of-life disclosure** `[observed]`: the same standing banner as Jira's documentation,
on every Confluence Data Center page:
"Ascend to new heights with Atlassian Cloud. Data Center support ends on March 28, 2029."

**Edition-availability disclosure inside a documentation tip** `[observed]`, and this one
is awkwardly framed:

> "**Looking for new Confluence templates?** A huge range of templates are now available
> in Confluence Cloud. Learn more about templates in Confluence Cloud.
> **These templates are not available for Confluence Data Center.**"

A marketing question-headline (`Looking for new Confluence templates?`) opening what is
actually a *negative* availability disclosure. The reader is invited in by a promise and
exited with a refusal two sentences later. **Leading a capability-exclusion notice with an
enticement is the wrong order** — the bolded final sentence is the message and should be
first.

**Permission prerequisites stated before procedures** `[documented]`:
"To add or remove page restrictions, you'll need to have permissions to edit the page and
"Restrict" or "Admin" permission in the space." · "If you have space administrator
permissions, you can customize blueprint templates for the spaces you are an administrator
of. You must be a Confluence Administrator to customize blueprint templates for a whole
site." · "You need space admin permissions to view the list of restricted pages in a
space."

**Admin-override disclosure** `[documented]`, stated plainly rather than buried:
"Users with "Admin" permissions in a space, or users with the System Administrator global
permission **can remove restrictions from pages, even if the page restriction prevents
them from viewing the page.**" — telling every user that an admin can unlock a page they
cannot see is an honest and slightly uncomfortable disclosure, and it belongs exactly
where it is.

**Scope disclosure for the word `everyone`** `[observed]` — a heading-level definition of
an ambiguous quantifier:

> `Who is "everyone"?`
> "When we say "everyone can view this page" *everyone* means all the people who can view
> the page by default. There are two things that can affect who can view a page — the
> space permissions, and view restrictions on any parent pages that are being inherited.
> **Restrictions don't override a person's space permission.** For example, if you say a
> person "can view" in the restrictions dialog and they don't have "view" permissions for
> the space, they won't be able to see the page."

**This is the best single piece of content design in this file.** A permissions UI says
"everyone"; the documentation asks the question the user is silently asking, in the user's
own words, as an H3; defines the scope; states the overriding rule in bold-worthy plain
language; and gives the worked counter-example. Any product that ships an "everyone",
"all users" or "public" option should write this section.

**Footer legal set** `[observed]`: `Privacy policy` · `Notice at Collection` · `Terms` ·
`Impressum`; documentation footer adds `Terms of Use` and `Security`. No accessibility
statement. `[absent]`

## T11 Help-centre architecture

**`support.atlassian.com/confluence-cloud` returns an empty body** — the Cloud help centre
is unreachable. `[blocked]`

The Data Center documentation space (`DOC`) on `confluence.atlassian.com` is reachable and
its `Pages and blogs` section is the relevant IA.

**Article titles — the casing is a mess, and the version history proves it was noticed**

| Title Case | Sentence case |
|---|---|
| `Create and Edit Pages` | `Blog posts` |
| `Move and Reorder Pages` | `The Editor` (hybrid) |
| `Copy a Page` | `Page restrictions` |
| `Delete or Restore a Page` | `Links` |
| `Add, Remove and Search for Labels` | `Anchors` |
| `Add, Assign, and View Tasks` | `Tables` |
| `Page Layouts, Columns and Sections` | `Drafts` |
| `Create Beautiful and Dynamic Pages` | `Page templates` |
| `Import Content Into Confluence` | `Blueprints` |
| `Undefined Page Links` | `Autocomplete for links, files, macros, mentions and emojis` |
| `View Page Information` | |
| `Page History and Page Comparison Views` | |
| `Confluence Markup` | |

Thirteen Title Case against ten sentence case, in one twenty-three-item list, on a product
whose design system says "Use sentence case in all titles, headings, menu items, labels,
and buttons."

**And the version selector shows the correction in progress.** The `Page templates`
article is titled `Page Templates` in the 8.5 through 9.2 documentation spaces and
`Page templates` from 9.3 onward. **Someone fixed the casing at version 9.3 and did not
fix the twelve neighbouring articles.** That is visible from outside because Atlassian
publishes every historical version's title in the version picker — an accidental but
unusually clear window into a partially-executed content migration.

**Two other design-system violations in the same list**:
`Import Content Into Confluence` capitalises the preposition `Into`, which even Title Case
conventions do not require; `Create Beautiful and Dynamic Pages` is a marketing headline
sitting in a reference-documentation index.

**Sub-article naming inside `Blueprints` is inconsistent with the parent page's own table**
`[observed]` — the left-rail `In this section` list and the `Full list of blueprints`
table on the same page name the same objects differently:

| Left rail (`In this section`) | Full-list table |
|---|---|
| `Decisions Blueprint` | `Decision` |
| `File List Blueprint` | `File list` |
| `Meeting Notes Blueprint` | `Meeting notes` |
| `Product Requirements Blueprint` | `Product requirements` |
| `Shared Links Blueprint` | `Share a link` |
| `Jira Report Blueprint` | `Jira report` |
| `Retrospective Blueprint` | `Retrospective` |
| `How-To Article Blueprint` | `How-to article` |
| `Troubleshooting Article Blueprint` | `Troubleshooting article` |

**Title Case plus a `Blueprint` suffix in one list; sentence case with no suffix in the
other; plural vs singular differs (`Decisions` vs `Decision`); and `Shared Links` vs
`Share a link` is not even the same part of speech.** Nine objects, eighteen names, one
page. This is the clearest single naming defect found across all five products in this
batch.

**Standing furniture** (identical to Jira's space): `On this page:` · `In this section` ·
`Related pages:` · `Related content` / `No related content found` · `Still need help?`
"The Atlassian Community is here for you." `Ask the community` · `Was this helpful?` ·
`Last modified on <date>` · a fourteen-version selector.

`Last modified` dates observed: `Oct 6, 2021` (Drafts **and** Blueprints),
`Feb 3, 2025` (Page restrictions, Page templates). **The canonical draft-state explanation
and the canonical blueprint inventory were last touched in October 2021.**

## T12 FAQs

`[absent]` as a discrete artefact. No FAQ block rendered on the Confluence product page or
templates hub, and the pricing page body was unreachable.

The documentation substitutes **question-form section headings**, and there are two,
both good:

| Question-heading (verbatim) | Where | Why it works |
|---|---|---|
| `Who is "everyone"?` | Page restrictions | Asks the reader's silent question about an ambiguous UI word, in quotation marks, as a heading |
| `How do inherited restrictions work?` | Page restrictions | Names the mechanism the user has just been told exists but not explained |
| `What's a blueprint?` | Blueprints | Defines the coined term at the top of the page that uses it |

Three question-headings, all in the second person or the interrogative, all answering a
definitional rather than a procedural question.

**Note the tension with Atlassian's own guidance**, which says of headings:
"**Reconsider using question marks. Preferably rephrase the heading so it's a statement.**"
By that rule, `Who is "everyone"?` should be "Understanding 'everyone'" — which would be a
gerund, also banned, and materially worse. **This is a case where the product's practice
beats the style guide's rule**, and it is worth recording as such: the question-heading is
the right device precisely when the reader's problem is a definitional gap they can phrase
but not resolve.

## T13 Terminology & glossary

| Term | Confluence's usage | The alternative it rejected |
|---|---|---|
| `space` | The top-level container | "site", "workspace", "wiki", "team" |
| `page` | The core object | "document", "article", "doc" |
| `blog post` | A dated, non-hierarchical page type — "Blog posts don't have parents and can't inherit restrictions" | "news", "update", "announcement" |
| `draft` | "a page you've never published" | |
| `unpublished changes` | "edits that you've made to a published page, without republishing them" | "pending changes", "unsaved", "modified" |
| `personal draft` | The legacy non-collaborative draft | |
| `lozenge` | The status chip. Used in *customer-facing* documentation: "they'll have a 'draft' or 'unpublished changes' lozenge next to their titles" | "badge", "tag", "chip", "label" — see below |
| `blueprint` | **The flagship coined term**: "a set of page templates with added functionality to help you create, manage and organize content in Confluence more easily" | "smart template", "wizard", "app template" |
| `template` | The four-category superset: `Space templates`, `Global page templates`, `Blueprints`, `System templates` | |
| `variable` | An author-fills-this-in slot in a template | "field", "placeholder", "token" |
| `index page` | The auto-created roll-up a blueprint makes on first use | "directory", "list page" |
| `promote` / `demote` | Ranking a template above `Blank Page` in the create dialog | "pin", "feature", "default" |
| `macro` | The embeddable dynamic component | |
| `restriction` | Page-level access control, distinct from `permission` | Confluence maintains **`restriction` (page) vs `permission` (space)** as two separate words for two scopes — a deliberate and well-kept distinction |
| `everyone` | Defined explicitly as "all the people who can view the page by default" — *not* the public | see T10 |
| `Space tools` / `Content Tools` | Admin surfaces | |
| `Recently worked on` | The dashboard list of your in-progress items | "Drafts", "Recent", "Continue" |
| `Live docs` · `Whiteboards` · `Databases` · `Pages` · `Videos` · `Slides` | The six named content types on the 2026 product page | The product is no longer "pages" |
| `Rovo` · `Remix` · `Teamwork Graph` | Atlassian AI and platform brands surfacing inside Confluence | |
| `human+AI teammates` | The coined collective for people and agents | "AI assistants", "bots" |
| `app` | Marketplace extension. Glossed in Confluence's own docs as "apps (also known as **add-ons**, or **plugins**)" | **Renamed twice**; the documentation carries all three names in one parenthetical |

### Three observations

**1. `blueprint` is the most defensible coined term in this batch.** Confluence needed a
word for "a template that also creates an index page, supplies in-page guidance, and can
prompt you for inputs" — i.e. a template with behaviour. `Template` alone would
under-describe it; `wizard` describes only the prompt; `smart template` is marketing.
`Blueprint` carries the right connotation (a plan you build from, not a document you copy)
and it has survived over a decade. The definition Atlassian publishes is one sentence and
leads with the differentiator: "a set of page templates **with added functionality**".

The cost is that Confluence now has a four-member template taxonomy in which one member is
called something else entirely: `Space templates`, `Global page templates`, **`Blueprints`**,
`System templates`. Three are named by *scope*; one is named by *capability*. A user
scanning the list cannot tell what dimension it is sorted on.

**2. `lozenge` has escaped the design system into customer documentation.** It is an
Atlassian Design System component name, and it appears in user-facing Confluence
documentation ("a 'draft' or 'unpublished changes' lozenge") and in Jira admin
documentation ("change their names, descriptions and lozenges" — see #186 T13). No user
outside Atlassian calls a status chip a lozenge. **A design-system component name in
end-user help is a specific and recognisable failure mode**: the internal vocabulary is so
consistent that writers stop noticing it is internal.

**3. `restriction` vs `permission` is kept clean and it should be copied.**
`Permission` is space-scoped and grantable; `restriction` is page-scoped and subtractive.
The documentation never confuses them, and states the precedence explicitly:
"Restrictions don't override a person's space permission." Two words, two scopes, one
precedence rule — a small piece of vocabulary engineering that prevents a whole class of
support ticket.

## T14 Voice, tone & accessibility

**Register.** Marketing is short, punning and AI-forward:
`The AI workspace that works with you`, `Put pen to paper. No hassle.`,
`Beat the blank page`, `Work isn't one-size-fits-all. Neither is Confluence.`
Sentence fragments used as rhythm; two full stops where one would do.

Documentation is procedural and notably **warmer than Jira's**. Contractions throughout
("you don't have to start from scratch", "you'll be deleting", "Don't worry",
"Removing restrictions is easy", "Here's the basics"). Second person for the reader,
`we` for the product in exactly the places the design system prescribes
("we don't automatically copy the restrictions", "We'll let you know if someone else got
there before you").

**Defect:** "Here's the basics" — subject-verb disagreement in the page-restrictions
article.

**Reassurance is used deliberately and sparingly**, always attached to a hazard:
"so you don't have to worry about it distracting your viewers" ·
"Removing restrictions is easy" · "(We'll let you know if someone else got there before
you, and has already granted access)". Three instances across four documentation pages,
each placed at the point of anxiety. This is the design system's `Encourage people along
the path` principle actually executed.

**Tone gradient**: marketing (punning) → documentation (warm-procedural) → state names
(bare: `draft`, `unpublished changes`, `Untitled`). Correct shape, and shallower than
Front's.

**Numbers** `[observed]`: `over 800 hours and $500k per year`, `200%` throughput,
`up to 5 people`, `more than three times`, `March 28, 2029`, `six` content types,
`150+`/`100+` integration counts (the Confluence page says "All the tools you know and
love integrate smoothly" without a figure).

### Does Confluence obey Atlassian's own content guidance?

Same audit as #186, applied to Confluence surfaces. **Verdict: the marketing site is
largely compliant; the Data Center documentation is not.**

| ADS rule | Observed violation | Where |
|---|---|---|
| "Use sentence case in all titles, headings, menu items, labels, and buttons" | 13 of 23 `Pages and blogs` article titles are Title Case; `Human Resources`, `Marketing & Sales`, `Business Strategy`, `Docs & Reports` in the template taxonomy; `Confluence Pricing: Choose Your Plan` in `og:title`; `Space Tools` vs `Space tools` on one page; `Inherited Restrictions`, `Restricted Pages`, `Global Templates and Blueprints` | docs, templates hub, metadata |
| "Don't use … '&'" | `Finance & Ops`, `Marketing & Sales`, `Docs & Reports`, `Channels & Apps` | templates hub, docs nav |
| "Avoid gerunds … Phrase UI and documentation headings with an action verb" | `Viewing and Editing restricted` (a UI state label); documentation section headings are mixed but `Pages and blogs` articles are largely imperative — **this rule is better observed in Confluence docs than in Jira docs** | |
| "Avoid exclamation marks … minimize their use in product marketing copy" | "Discover your match today!" | pricing `meta-description` |
| "Avoid using a `>` symbol … Use 'then' instead" | `Space tools > Content Tools`, `More options > View changes`, `Administration menu > General Configuration > Global Templates and Blueprints` | docs, throughout |
| "Use 'of' rather than a forward slash" (numbers) | `View and / or Edit` — a slash with spaces in a UI option label | restrictions dialog |
| "Reconsider using question marks [in headings]" | `Who is "everyone"?`, `How do inherited restrictions work?`, `What's a blueprint?` | docs — **and here the violation is the better writing** |
| Oxford comma required | `Add, Remove and Search for Labels`; `Page Layouts, Columns and Sections`; `Autocomplete for links, files, macros, mentions and emojis`; "create, manage and organize content" | docs, four instances |
| "Use the full name of features and apps in customer-facing copy" | — (observed compliant) | |

The **Oxford comma** violations are the cleanest evidence, because the rule is
unambiguous and the examples are unambiguous: the design system says
"Use an Oxford (or 'serial') comma to offset the final item in a list" with the worked
example "Jira, Confluence, Loom, and Bitbucket are all Atlassian apps." Four Confluence
documentation titles and body phrases drop it.

**As with Jira: the guidance is obeyed in the product and ignored in the writing about the
product.** The one place Confluence's documentation *beats* the guidance is the
question-heading, which the style guide discourages and which is plainly the right choice
for `Who is "everyone"?`.

### Accessibility content

- `Skip to content` present, first in DOM, rendered twice on the Confluence product page. `[observed]`
- Content-type and marketing images on the product page carry **no alt text** in the retrieved markup; several render as bare `![]()`. `[observed]`
- Documentation screenshots carry **no alt text** throughout; UI chrome images render as `![](<>)` — an empty source inside an empty alt. The restriction-icon table is the exception in spirit: the icons have no alt, but the adjacent table cell states the meaning in full, so the information is available. That is the correct mitigation for an icon legend and it should be noted as such.
- The `>` symbol used in navigation instructions throughout the documentation, against Atlassian's own accessibility-justified rule. `[observed]`
- `human+AI` raises the same assistive-technology issue as `&`, which Atlassian's guidance bans on exactly those grounds. `[observed]`
- **No accessibility statement or VPAT link** in either footer. `[absent]`
- Colour is used as a status signal in the restriction icons (grey / red-locked / red-unlocked) but the icon shape also varies (locked vs unlocked), so the encoding is not colour-alone. Reasonable.

**Negative findings, recorded honestly**

- Nine blueprints, eighteen names, one page (T11) — Title-Case-plus-suffix in the rail, sentence-case-no-suffix in the table, with a plural/singular and a part-of-speech mismatch.
- `Page Templates` → `Page templates` fixed at version 9.3 and not propagated to twelve neighbouring article titles.
- Three overlapping template taxonomies with inconsistent casing between them.
- `Templates` appears twice in the product nav, once nested under `Resources`.
- `Get it free` vs `Get Confluence free`.
- `Space tools` vs `Space Tools` on one documentation page.
- `View and / or Edit` vs `Viewing and Editing restricted` vs `Edit` — three grammatical forms in one dialog.
- `Server` still advertised in the live pricing page's `og:description`; `<title>` and `og:title` differ; `meta-description` ends in an exclamation mark.
- "Here's the basics" — subject-verb disagreement.
- `Sharepoint` misspelled in a published customer quotation.
- `Looking for new Confluence templates?` opens a notice whose actual message is "These templates are not available for Confluence Data Center."
- The Rovo feature block and the eleven-collection template list are each duplicated 2–3× in the rendered DOM.
- `Related content` / `No related content found` and `Unable to load` ship as permanent furniture on every documentation page.
- The canonical `Drafts` and `Blueprints` documentation was last modified **October 2021**.
- `lozenge` — a design-system component name in end-user documentation.

---

## Transferable patterns

1. **Name the two "not saved yet" states separately when their recovery paths differ.**
   `draft` ("a page you've never published") vs `unpublished changes` ("edits that you've
   made to a published page, without republishing them"). One is deleted, the other is
   reverted, and the two action labels — `Delete unpublished page` and
   `Revert to last published version` — share no vocabulary. Applies to any editor,
   form-draft, or configuration-change surface.

2. **Scope the in-progress state badge to the people who caused it, and say why.**
   "The 'unpublished changes' lozenge is only visible to people who have contributed …
   so you don't have to worry about it distracting your viewers." The rule plus the relief,
   in one sentence.

3. **Make the blank page a demotable object.** `Blank Page` is a content type in the create
   dialog that an admin can collapse beneath `Show more`, with the rationale published:
   "Promoting items can help ensure consistency in a space by encouraging users to create
   particular types of content, instead of blank pages." Better than a template gallery
   the user has to choose to open.

4. **Publish the threshold at which the product stops insisting.**
   "If you use the **Show more** link in the create dialog more than three times in a
   single space, the dialog will show you all templates by default from then on." A
   self-cancelling default with a stated number. Reusable for any nudge, coach-mark, or
   progressive-disclosure default.

5. **Define your ambiguous quantifier as an H3, in the user's own words.**
   `Who is "everyone"?` — then the scope, then the overriding rule, then a worked
   counter-example. Any product with an "everyone", "all users", "anyone" or "public"
   option should ship this section. This is the single most reusable artefact in the file.

6. **Publish the routing logic of a request-for-help flow.**
   "Confluence will send an email to up to 5 people who are most likely to be able to grant
   access, in the following order: 1. people who have contributed to the page … (sorted by
   last edit date) 2. space administrators who can see the page (sorted alphabetically)."
   Plus the honest failure case: "There's no follow up email if none of the 5 people
   respond." A blocked user who knows how the ask was routed waits better.

7. **Explain the absence of an affordance, not just the presence of an error.**
   "If the request access message above doesn't appear, you're not able to request access
   … This usually is because [three enumerated causes]." Missing buttons generate more
   support tickets than error messages do, and almost nobody documents them.

8. **Attach a check-before-you-destroy procedure to the destructive action, and admit its
   limits.** "Check who else has edited the page since last publish … **View changes** to
   see all changes … The changes won't be attributed to individual users." Naming the
   thing the tool *cannot* tell you is what makes the check trustworthy.

9. **Keep two words for two scopes of access control.** `permission` (space-level,
   additive) and `restriction` (page-level, subtractive), never confused, with the
   precedence stated once: "Restrictions don't override a person's space permission."

10. **Negative finding worth generalising:** if you rename a family of objects, rename
    them in the navigation *and* the reference table *and* the page titles in the same
    change. Confluence's nine blueprints carry eighteen names on one page, and the version
    picker shows a casing fix applied to exactly one article out of thirteen. Partial
    content migrations are permanently visible from outside.

## Caveats & gaps

- **The pricing page body did not render.** No plan names beyond "Free and Paid", no
  prices, no user tiers, no storage limits, no seat definitions, no cancellation or refund
  wording, no pricing FAQ. T10 and T12 are materially incomplete.
- **`support.atlassian.com/confluence-cloud` returns an empty body.** The Confluence Cloud
  help centre — the primary self-service surface for most Confluence users — is entirely
  unharvested. T11 describes the Data Center documentation instead.
- **All state, template and restriction content is from Confluence Data Center
  documentation**, which the product's own tip explicitly says diverges from Cloud:
  "A huge range of templates are now available in Confluence Cloud … These templates are
  not available for Confluence Data Center." **The blueprint inventory in T11 and T13 is
  the Data Center set and is known not to match Cloud.** Do not use this file as evidence
  of current Confluence Cloud template names.
- **The template hub's actual template inventory was not opened.** Eleven named templates
  with descriptors were captured from the hub page; the eight category tabs and eleven
  collections each lead to pages that were not fetched, so the full template-name inventory
  (likely hundreds) is unharvested. The named eleven are: `Team poster`, `Meet the team`,
  `Job description`, `Experiment plan and results`, `Design sprint`,
  `Customer impact assessment`, `Project status report`, `Free brainstorming`,
  `Business plan`, `AWS architecture diagram`, `Risk assessment matrix`.
- **No in-product Confluence string was observed.** Editor labels, toasts, flags, empty
  states and validation messages are all `[documented]` at best, from documentation prose.
- **Comment content was not harvested.** Confluence's inline-comment / page-comment
  distinction — arguably the core of "collaborative guidance" — has no article in the
  `Pages and blogs` section and was not located elsewhere. This is the most significant
  content gap against the stated benchmark strength. `[absent]`
- **`Create a template` and `Create content from a template`** were identified as child
  articles and not opened; they hold the template-authoring field labels and the
  `variable` syntax.
- **The design-system `Empty state` guidance page** was identified in the nav and not
  opened.
- Template-card descriptor punctuation is inconsistent (`Streamline your process and
  improve your business` with no period; `Identify potential risks, assess their
  likelihood, and handle them accordingly.` with one) — noted but not systematically
  audited across all eleven.
- Only en-US observed.

## Sources

1. https://www.atlassian.com/software/confluence
2. https://www.atlassian.com/software/confluence/templates
3. https://www.atlassian.com/software/confluence/pricing — metadata only, body not rendered
4. https://confluence.atlassian.com/doc/drafts-149040.html
5. https://confluence.atlassian.com/doc/page-templates-296093785.html
6. https://confluence.atlassian.com/doc/blueprints-323982376.html
7. https://confluence.atlassian.com/doc/page-restrictions-139414.html
8. https://atlassian.design/foundations/content/voice-tone
9. https://atlassian.design/foundations/content/language-and-grammar
10. https://status.atlassian.com/
11. https://support.atlassian.com/confluence-cloud — **blocked, empty body**
12. https://atlassian.design/content — **blocked, empty body**
