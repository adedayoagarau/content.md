# 085. Skyscanner

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Flight metasearch / travel search engine (redirect model — takes no booking and no payment) |
| Primary URL | https://www.skyscanner.com/ |
| Corpus rank | 085 |
| Benchmark strength (source list) | Comparison and search labels |
| Locale / market observed | en-US (help centre serves 31 locales from one article ID space; `en-GB` cross-checked incidentally) |
| Platform observed | Help centre (Zendesk, server-rendered). **The product site itself rendered no body text.** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | No regulatory or licensure disclosure observed — consistent with the business model, since Skyscanner is not the merchant of record and does not take payment. `Cookie Policy` · `Privacy Policy` · `Terms of Service` in every footer; `© 2002-2026 Skyscanner Ltd`. Price-transparency commitments are made voluntarily (see T10), not attributed to any regime. |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 attempted / 7 fully readable |
| Harvest completeness | **Partial, but the highest-value surface is fully open.** `skyscanner.com` and `skyscanner.net` are client-rendered SPAs returning title and meta only — no marketing copy, no search-form labels, no results-page strings. The **Zendesk help centre renders articles server-side in full**, so article bodies, dates, breadcrumbs and footer furniture are all observable. Help **category and section pages render only their heading** — the article lists are client-side, so the full article inventory per category is not retrievable. Six articles were read in full; eleven further titles are recorded from search listings and are labelled as such. |

## Pages inspected

| Label | URL | Result |
|---|---|---|
| Homepage (.com) | https://www.skyscanner.com/ | **Empty body** — title + meta only |
| Homepage (.net) | https://www.skyscanner.net/ | **Empty body** |
| Help redirect | https://www.skyscanner.net/help | Empty |
| Help centre home | https://help.skyscanner.net/hc/en-us | **Full** — category tree, model explainer, vertical switcher |
| Category: Searching | https://help.skyscanner.net/hc/en-us/categories/200151281-Searching | Heading only |
| Category: Prices | https://help.skyscanner.net/hc/en-us/categories/200368471-Prices | Heading only |
| Category: Bookings | https://help.skyscanner.net/hc/en-us/categories/200117671-Bookings | Heading only |
| Section: My Bookings | https://help.skyscanner.net/hc/en-us/sections/200350421-My-Bookings | Heading only — **and the `<h1>` is wrong (see T14)** |
| Changes, cancellation and refunds | https://help.skyscanner.net/hc/en-us/articles/201303161-Changes-cancellation-and-refunds | **Full** |
| My booking has been canceled | https://help.skyscanner.net/hc/en-us/articles/201298891-My-booking-has-been-canceled | **Full** |
| What do you include in the prices shown on Skyscanner? | https://help.skyscanner.net/hc/en-us/articles/201208841-What-do-you-include-in-the-prices-shown-on-Skyscanner- | **Full** |
| Why does the price sometimes change when I am redirected to a flight provider? | https://help.skyscanner.net/hc/en-us/articles/202381632-Why-does-the-price-sometimes-change-when-I-am-redirected-to-a-flight-provider | **Full** |
| How do I search for flights on Skyscanner? | https://help.skyscanner.net/hc/en-us/articles/201549211-How-do-I-search-for-flights-on-Skyscanner | **Full** — the only source of search-UI labels |
| How do I set up or cancel email price alerts? | https://help.skyscanner.net/hc/en-us/articles/115002499829-How-do-I-set-up-or-cancel-email-price-alerts | **Full** — per-platform UI strings |
| (en-GB duplicate article ID) | https://help.skyscanner.net/hc/en-us/articles/201300911-… | Empty — ID exists only in the en-GB space |

---

## T1 Navigation & IA labels

**The help centre is the only navigable surface, and its structure is three
concentric rings.**

**Ring 1 — vertical switcher** `[observed]`, under the heading
`Need help with something else?`:

`Flights` · `Stays` · `Car Rental`

Three separate Zendesk instances — `help.skyscanner.net`,
`hotelshelp.skyscanner.net`, `carhirehelp.skyscanner.net`. The flights help centre
is the default and the other two are framed as *something else*, which is an
accurate statement of the product's centre of gravity and unusually honest about
it. Note `Car Rental` is title-cased and singular while `Flights` and `Stays` are
plural (see T14).

**Ring 2 — the model explainer, placed above the category tree** `[observed]`.
This is the most important IA decision on the site:

> **`Got a question about a booking?`**
>
> "Skyscanner is a travel search engine that helps you find the best travel
> options. Once you have found what you're looking for, **you are redirected to the
> airline or travel agent's site where you make your booking directly. They are
> therefore best placed to help with any questions about your booking** — more info
> can be found in this article."

Skyscanner puts an **explanation of what it is not** between the user's arrival
and the article list. Before any category, before any search, the help centre
states that it does not hold the booking and routes the user away. For a company
whose entire support-volume problem is people arriving with questions it
structurally cannot answer, this is the correct and expensive thing to do — it is
the first thing a frustrated user sees.

The heading is the user's own question (`Got a question about a booking?`),
contracted and conversational, and the answer is three sentences ending in the
logical conclusion `They are therefore best placed to help`. Not "we can't help",
but "they are best placed" — the same move Booking makes with "they usually know
best", executed more thoroughly because for Skyscanner it is not a courtesy, it is
the whole model.

**Ring 3 — `Browse articles by topic`: five categories, each with a
`Learn more` affordance** `[observed]`:

| Category | What it covers (inferred from article breadcrumbs) |
|---|---|
| `Searching` | Search mechanics, filters, Explore everywhere |
| `Prices` | Price composition, price changes, price alerts |
| `Bookings` | Changes, cancellations, refunds, partner contact |
| `Traveling` | *(not reached)* |
| `About` | *(not reached — contains a `What is Skyscanner?` section)* |

**`Searching` and `Prices` are separate top-level categories.** Most travel help
centres would fold price questions under booking or under a generic "Pricing and
fees". Skyscanner gives *price behaviour* its own branch, because the single
biggest source of user confusion in metasearch is a price that changes between
the results page and the provider's site. The IA is organised around the product's
known failure mode.

`Bookings` exists even though Skyscanner takes no bookings — because the user has
one, elsewhere, and needs to be routed. The category is named for the user's
object, not for the company's.

**Three-level breadcrumbs** `[observed]`:
`Skyscanner > Bookings > My Bookings` ·
`Skyscanner > Prices > Prices on Skyscanner` ·
`Skyscanner > Searching > How do I search for...?`

The section names are the interesting layer. **`How do I search for...?` is a
section heading written as a truncated question with an ellipsis** — the section
is literally "the questions that begin *How do I search for*", and the label says
so. `Prices on Skyscanner` uses the brand name to distinguish Skyscanner's
displayed price from the provider's price, which is the exact distinction the
section exists to teach.

**Footer furniture** `[observed]`, identical on every help page:
`Cookie Policy` · `Privacy Policy` · `Terms of Service` · `© 2002-2026 Skyscanner Ltd`.

Three policies, no accessibility link, no about link, no contact link (contact is
per-article — see T11). The copyright start year `2002` is carried on every page.

**`Go back to skyscanner.com`** `[observed]` is the help centre's escape hatch,
placed top-left in the header. Not "Home", not a logo link — a full sentence
naming the destination by domain. Plausibly because help-centre users arrive from
search engines and have no idea they are on a different host.

**A 31-locale language switcher** `[observed]`, rendered twice in the DOM as a
flat list of endonyms: `العربية` · `Čeština` · `Dansk` · `Deutsch` · `Ελληνικά` ·
`English (United Kingdom)` · `Español` · `Español (Latinoamérica)` · `Suomi` ·
`Français` · `עברית` · `हिंदी` · `Magyar` · `Bahasa Indonesia` · `Italiano` ·
`日本語` · `한국어` · `Nederlands` · `Norsk` · `Polski` · `Português` ·
`Português do Brasil` · `Română` · `Русский` · `Svenska` · `ไทย` · `Türkçe` ·
`Українська` · `Tiếng Việt` · `简体中文` · `繁體中文`, under the heading
`Choose language`.

Every language is named **in its own language**, with regional variants
disambiguated parenthetically (`English (United Kingdom)`,
`Español (Latinoamérica)`, `Português do Brasil`). And the switcher preserves the
current article — the `return_to` parameter carries the **localised slug**
(`/hc/de/articles/201303161-Änderungen-Stornierungen-und-Rückerstattungen`), so
switching language on an article lands on the translated version of *that*
article, not on the help home. Same article ID, 31 localised slugs.

## T2 Value proposition & headline patterns

**`[absent]` on the product site** — `skyscanner.com` and `skyscanner.net` render
no body text. The only proposition strings recoverable are the two page titles and
their meta descriptions, which differ by locale:

- `.com` (en-US): **`Compare Cheap Flights & Book Airline Tickets to Everywhere | Skyscanner`** — "Book and compare the cheapest flights from all major airlines and online travel agents, and find the best plane tickets to all your favorite destinations."
- `.net` (en-GB): same title — "Compare cheap flight prices from all major airlines and travel agents, and find the cheapest tickets to all your favourite destinations. Book online today."

**`to Everywhere` in the `<title>` is the brand's one distinctive claim.**
`Everywhere` is capitalised because it is a *product feature* — the destination-less
search — smuggled into a generic SEO title. It is the only word in either title
that Skyscanner owns.

The two descriptions differ in exactly the ways you would expect
(`favorite`/`favourite`, "Book online today" appended for GB) and in one way you
would not: the US version leads with `Book and compare`, the GB version with
`Compare`. Putting `Book` first on a site that does not take bookings is the
wrong order for a metasearch brand and contradicts everything the help centre
says.

**In-help proposition statements** `[observed]` — Skyscanner restates what it is,
in near-identical language, at the top of at least three separate articles:

> "Skyscanner is a travel search engine that helps you find the best travel
> options." *(help home)*
>
> "Skyscanner is a travel search engine that helps you find the best travel
> options. You'll find **thousands of travel agencies, airlines, hotels, and car
> rental companies** you can book through Skyscanner. **We call them travel
> providers.**" *(Changes, cancellation and refunds)*

**"We call them travel providers." is the best sentence in this file.** A
four-word declarative that coins a term, attributes the coinage to the company,
and does it *inline* at the moment the concept is first needed. Not a glossary
entry, not a parenthetical, not a footnote — a standalone sentence whose only job
is to introduce a word the rest of the article will lean on. Every subsequent
paragraph can then say `travel provider` without ambiguity, and the reader knows
it is Skyscanner's shorthand rather than an industry term they should already know.

The list before it does the definitional work — `travel agencies, airlines,
hotels, and car rental companies` — so `travel providers` arrives already
populated with examples.

**Article opening lines are empathetic restatements of the user's goal** `[observed]`:

> "**We know you're looking for the best prices and maximum flexibility to choose
> the right flight.**" *(How do I search for flights)*
>
> "**Our goal is to make searching for travel as transparent as possible.** That's
> why prices shown on Skyscanner always include…" *(What do you include in the prices)*

Both open with a first-person-plural statement — one about the user's motive, one
about the company's — before any instruction. The second is the stronger
construction: **state the principle, then derive the behaviour from it with
"That's why"**. The policy reads as a consequence of a stated value rather than as
an arbitrary rule.

## T3 CTA inventory

Product CTAs are only observable where help articles quote them.

| CTA / control (verbatim) | Context | Notes |
|---|---|---|
| `Search` | Flights search form | Bolded in the help article |
| `Select` | Results row → provider list | **The metasearch-specific verb** (see below) |
| `Explore everywhere` | Destination-less search | Bolded as a feature name |
| `Track prices` | Desktop results, inside the `Like these flights?` banner | |
| `Get Price Alerts` | Desktop results, top left | **Second label for the same action** |
| `Show all flights` | Mobile app, results | |
| `Stop all alerts` | Foot of the price-alert email | Blunt, total, no granular option |
| `Find partner contact details` | Bolded link, foot of two recovery articles | The recovery CTA |
| `Contact Us` | Foot of every article | Carries `?skyArticle=<ID>` |
| `Yes` / `No` | Under `Was this article helpful?` | |
| `Return to top` | Foot of every article | |
| `Learn more` | After each of the five help categories | Bare generic, ×5 |
| `Go back to skyscanner.com` | Help header | Names the destination |
| `Sign in` | Help header | "Opens a dialog" is appended as the accessible hint |
| `Skip to main content` | First in DOM | |
| `Choose language` | Language switcher heading | |
| `click here` | Inside the search article | **Bare "click here" link** (see T14) |

**`Select` is the metasearch verb and it is exactly right.** From the search
article: "you can click on **Select**, and we'll show you a list of airlines and
travel agencies so that you can book directly with them." Not `Book`, not
`Choose`, not `Continue` — `Select` commits the user to nothing except seeing who
sells it. The label is honest about what the click does, which matters enormously
in a redirect model where the next screen is a list of third parties.

**`Find partner contact details` is the recovery CTA and it is bolded in both
recovery articles** `[observed]`. A verb + object naming exactly what the user
will get. It is the terminal action of the entire support model: Skyscanner's best
possible outcome for a booking question is handing over a phone number.

**Two labels for price alerts.** `Track prices` (inside the banner) and
`Get Price Alerts` (top left) on the same desktop screen, for the same action.
Compounded by the mobile web using a **heart icon** with no label at all, and the
app using a **toggle** plus a **bell**. Four interaction models, three labels, one
feature (see T14).

## T4 Onboarding & getting-started

**`How do I search for flights on Skyscanner?`** `[observed]` is the product's
entire getting-started content, and it is one paragraph of continuous prose with
the UI labels bolded inline:

> "To start your search, **click here** to head back to Skyscanner's search pages.
> Enter the departure country, city or airport in the **From** text field, the
> destination country, city or airport in the **To** text field and your travel
> dates in the **Depart** and **Return** text fields and click **Search.** A list
> of flights will appear.
>
> When you've seen a flight suitable for your needs, you can click on **Select,**
> and we'll show you a list of airlines and travel agencies so that you can book
> directly with them."

Not numbered. Not stepped. A single run-on sentence covering four fields and a
submit, then a second paragraph for the handoff. The bolding carries the structure
that the punctuation does not.

**What it gets right:** every field is named with **what may be entered into it** —
"the departure country, city **or airport**" — which pre-empts the most common
search-form failure (users don't know if a city name is valid). And the second
paragraph explains the *result* of `Select` before the user clicks it, so the
redirect is not a surprise.

**What it gets wrong:** the bolded commas are inside the bold
(`click **Search.**`, `click on **Select,**`), the paragraph has no numbered
steps, and it opens with `click here` — a bare, undescriptive link, in the
sentence that is meant to get the user started.

**The feature tour is two sentences at the end** `[observed]`:

> "**Smart search filters**, such as number of stops and departure time, help you
> find the perfect flight. Plus, we've got many tips and tricks to help you save
> more."
>
> "If you're looking for inspiration for your next trip, why not try our
> **Explore everywhere** feature, which helps you see **endless destinations, at
> every price, from thousands of travel sites in one place**?"

`endless destinations, at every price, from thousands of travel sites in one place`
is a **tricolon of scope** — breadth of destination, breadth of price, breadth of
supply — and it is the closest thing to a value proposition anywhere in the
reachable corpus. Delivered inside a rhetorical question ("why not try…?") at the
foot of a how-to, which is an odd place for the brand's best line.

**Price-alert setup is the only per-platform instruction set** `[observed]`, and
it is genuinely three different flows:

> **Desktop website:** "search for a route and specific date as usual. Look out for the **Like these flights?** banner when scrolling through your results and click *Track prices* to create the price alert. Or click *Get Price Alerts* on the top left of the page."
>
> **Mobile website:** "You can save your flight by clicking the *heart icon* next to a flight. **The heart icon will change color to blue.** When you save your flight, we will send you a price alert when the prices change."
>
> **Mobile app:** "Click *Show all flights.* Look out for the **Like these flights?** banner when scrolling through your results and tap *the toggle* to create the price alert. Or *Tap the bell* in the top right corner."

Three platforms, three control types, and Skyscanner documents all three rather
than pretending to a unified experience. The mobile-web entry is the notable one:
**it describes the state change as the confirmation** — "The heart icon will
change color to blue." There is no toast, no message; the colour *is* the
feedback, and the help article has to say so. (It is also a colour-only state
indicator, flagged in T14.)

Also worth noting: on mobile web, `save` and `price alert` are the **same
action**. Hearting a flight subscribes you. The article states this plainly —
"When you save your flight, we will send you a price alert when the prices change."
— rather than hiding the coupling, but it is a genuine dark-pattern risk that the
copy has to work around.

**Authentication gate, stated up front** `[observed]`: "To set up an alert,
**you'll need to be logged in** to your Skyscanner account. If you aren't already
logged in, you'll be prompted to do so when creating a price alert." The
requirement and the moment it bites, both before the instructions.

## T5 Form & field labels

**All labels below are quoted from help-article prose, not observed in the UI**
(the product site did not render). `[documented]`

| Label | Hint given in the article |
|---|---|
| `From` | "the departure country, city or airport" |
| `To` | "the destination country, city or airport" |
| `Depart` | "your travel dates" |
| `Return` | "your travel dates" |
| `Search` | Submit |
| `Select` | Results-row action |

**`From` / `To` / `Depart` / `Return` is the most conventional label set in this
travel group**, and the contrast with its peers is instructive. Airbnb ships
`Where` / `When` / `Who`; Expedia ships `Leaving from` / `Going to`; Skyscanner
ships the bare prepositions. For a metasearch product used at high frequency by
price-sensitive repeat users, terse beats conversational — but the labels alone
do not say what may be entered, which is why the help article has to supply
"country, city **or airport**" for both.

`Depart` and `Return` as **verbs used as noun labels** is the one non-obvious
choice: not "Departure date" / "Return date", not "Dates", but the bare verb stems.
They read as column headers rather than as fields.

**Named filters and features quoted in prose** `[observed]`:
`Smart search filters` (the category name), `number of stops`, `departure time`,
`Explore everywhere`, `Like these flights?` (banner), `heart icon`, `the toggle`,
`the bell`, `Show all flights`, `Track prices`, `Get Price Alerts`,
`Stop all alerts`.

**`Like these flights?` is a banner headline doing CTA work** — a question that
qualifies the user ("do you want to keep an eye on this?") immediately before
offering the control. Placed mid-scroll, "when scrolling through your results",
so it fires after the user has engaged rather than on load.

> **Gap:** the results-page comparison labels — the sort tabs, the fare-type
> labels, the "Cheapest / Best / Fastest" set, the self-transfer and
> protected-transfer warnings, and the provider-row labels — are **not recorded
> here because they were not observed.** Search listings indicate an article
> `How do I find the best prices?` exists which may document them; it was not
> fetched. **No filter or sort label has been inferred.**

## T6 Status & state language — **PRIORITY**

**Skyscanner has almost no booking status vocabulary, and that absence is itself
the finding.** Because it never holds a booking, there is no state machine to
name. The states that exist belong to *someone else's* system, and Skyscanner's
content job is to acknowledge them without claiming visibility into them.

**The core position, stated twice in two articles** `[observed]`:

> "**Skyscanner doesn't have access or visibility to any of your booking
> information.**" *(paraphrased position, Changes article)*
>
> "**Skyscanner doesn't manage bookings or have access to your booking details, so
> we're unable to make changes, arrange alternative travel or process a refund on
> your behalf.**" *(My booking has been canceled)*

The second is the fuller and better version. Note the structure: **one cause, three
named consequences.** Not "we can't help" but a specific enumeration of the three
things the user was probably about to ask for — `make changes`, `arrange
alternative travel`, `process a refund`. Each is the object of a real intent, and
naming all three closes off the follow-up question ("but can you at least…?").

This is the model sentence for any intermediary that must decline a request it
structurally cannot fulfil: *state the limitation, then list what it rules out, in
the user's own words.*

**The only status-like states Skyscanner names belong to the provider** `[observed]`:

| State / event | Verbatim | Who owns it |
|---|---|---|
| booking `canceled` | "If your booking has been canceled, contact the airline or travel provider that manages your booking directly." | Provider |
| `flight schedule has changed` | "If the airline has changed your flight schedule, contact the airline or travel provider that manages your booking to discuss your options." | Airline |
| `duplicate booking` | "If you've accidentally made a duplicate booking, contact the airline or travel provider immediately" | User-caused |
| `booking confirmation` (email) | "Check your booking confirmation email to find the airline or travel provider managing your booking." | Provider-issued |
| price alert (active/removed) | "the easiest way to **remove** a price alert is by scrolling to the bottom of your price alert email" | Skyscanner |
| saved flight (heart, blue) | "The heart icon will change color to blue." | Skyscanner |

**`the airline or travel provider that manages your booking` is the recurring
phrase**, used at least four times across two articles. The relative clause —
`that manages your booking` — is doing the work every time: it identifies the
correct party by **their relationship to the user's object**, not by their type.
The user does not have to know whether they booked with an airline or an OTA; the
phrase resolves either way.

**The options available after a provider-side event are always given as a
three-item list, hedged twice** `[observed]`:

> "**Depending on the circumstances and your booking conditions**, these options
> may include **rebooking or requesting a refund**." *(cancellation)*
>
> "**Depending on the booking conditions**, these may include **accepting the
> change, rebooking or requesting a refund**." *(schedule change)*

Note the difference: a cancellation offers two options; a schedule change offers
three, and the extra one is `accepting the change` — the do-nothing option, named
first. Most copy omits the null option. Naming it tells the user that inaction is
a legitimate choice with a name, not a failure to act.

Both are prefaced with `Depending on…` and softened with `may include`, because
Skyscanner is describing a third party's policy it cannot see. **Double-hedged,
and correctly so** — the alternative would be promising remedies it cannot deliver.

**The one absolute statement about entitlement** `[observed]`, from a
Skyscanner-authored guide *(surfaced in search listings; not directly fetched —
treat as indicative)*:

> "When your flight is cancelled by your airline, you'll have the option to rebook
> or to ask for a full refund. But if you're the one that needs to call it quits,
> you'll only be able to cancel or amend aspects of your booking, and get your
> money back if you purchased flexible airline tickets or flights that offer free
> cancellation."

The `But if you're the one that needs to call it quits` construction draws the
line most travellers get wrong: **entitlement depends on who cancelled.** Airline
cancels → rebook or full refund. You cancel → only what you paid for. One sentence,
one pivot word, the whole asymmetry.

## T7 Error, failure & recovery — **PRIORITY**

Skyscanner's recovery content is shaped by a constraint no other product in this
set has: **it cannot fix anything.** Every recovery path terminates in a handoff.
What is remarkable is how much useful content it builds inside that constraint.

### The structural disclaimer, and where it sits

`[observed]` — in `My booking has been canceled`, the "we can't help" sentence is
**the third paragraph, not the first**:

> 1. "If your booking has been canceled, contact the airline or travel provider that manages your booking directly. **They'll have access to your booking and can explain why it was canceled and what options are available to you.**"
> 2. "Depending on the circumstances and your booking conditions, these options may include rebooking or requesting a refund."
> 3. "Skyscanner doesn't manage bookings or have access to your booking details, so we're unable to make changes, arrange alternative travel or process a refund on your behalf."

**Action first, benefit of the action second, limitation third.** The user gets a
next step and a reason to take it before being told what Skyscanner cannot do.
Paragraph 1 even sells the handoff — "They'll have access to your booking and can
**explain why it was canceled**" — promising the user the one thing they most
want (an explanation) from the party that can give it.

Inverting this order would produce "We can't help you, but try the airline", which
is the same information and a far worse experience. The ordering is the craft.

### The "who did I book with?" problem

Metasearch's signature failure: the user does not know which company holds their
money. **Skyscanner has written a dedicated, numbered diagnostic for it**, and it
appears in both recovery articles in two different registers.

Version 1 `[observed]`, under the heading **`Can't remember who you booked with?`**:

> **Step 1)** Check your email for a booking confirmation - it should have been sent when you made your booking.
> **Step 2)** It's worth checking your junk or spam email if you can't find it.
> **Step 3)** If you can't find your confirmation and you're still not sure, the best thing to do is to **check your bank statement**, which should show you the airline or travel agent's name next to any charge.

Version 2 `[observed]`, under **`Unsure who you booked with?`**, unnumbered and
tighter:

> "Check your booking confirmation email to find the airline or travel provider managing your booking.
> If you can't find your confirmation email, check your spam or junk folder. You can also check your bank or card statement to help identify the company you booked with.
> Once you've identified your airline or travel provider managing your booking, you can use our partner contact list to find their customer support details."

**Step 3 is the genuinely good idea.** When the email is gone, the bank statement
is the only remaining record of *who took the money*, and it is a source the user
already has. Skyscanner has thought past the obvious first answer to the case
where the obvious answer fails, and it names the specific artefact
("the airline or travel agent's name next to any charge") rather than saying
"check your records".

The headings are the user's admission, phrased two ways —
`Can't remember who you booked with?` (colloquial, elided subject) and
`Unsure who you booked with?` (slightly more formal). Both are first-person
confessions in question form, the Wise pattern applied to the one mistake
metasearch users reliably make.

Version 2 adds the closing step version 1 leaves implicit: "**Once you've
identified** your airline or travel provider… you can use our partner contact
list" — the diagnostic and the remedy are joined.

### Named booking situations

`[observed]`, under the heading `Common booking situations` — three H3s, each a
first-person statement of the user's circumstance:

- **`I made a duplicate booking`** — "If you've accidentally made a duplicate booking, contact the airline or travel provider **immediately** to discuss your cancellation and refund options."
- **`My flight schedule has changed`** — "If the airline has changed your flight schedule, contact the airline or travel provider managing your booking to discuss available options. Depending on your booking conditions, you may be able to accept the change, rebook, or request a refund."
- **`I need to change or correct a passenger name`** — "Name changes and corrections are handled by the airline or travel provider and **may be subject to restrictions or additional charges**."

**Two `I …` headings and one `My …` heading, split by fault.** `I made a duplicate
booking` and `I need to change or correct a passenger name` are things the user
did or needs; `My flight schedule has changed` is something done to them. The
possessive vs the first-person-active is a small, consistent grammatical signal of
agency — the same fault-encoding Airbnb uses with `If your host cancels…` vs
`What to do if you accidentally…`.

The duplicate-booking entry carries the only urgency adverb in the article
(`immediately`), correctly: duplicates get cheaper to fix the faster you act.

The name-correction entry is the only one that **warns about cost before the user
calls** — "may be subject to restrictions or additional charges" — which is the
right place for that warning, since the user is about to spend an hour on hold.

### Price-discrepancy recovery

`[observed]`, from `Why does the price sometimes change when I am redirected to a
flight provider?` — the full recovery path for the product's most common
complaint:

> "We make every effort to ensure the information you see on Skyscanner is
> accurate and up to date, **but very occasionally there can be reasons why a price
> change has not updated accurately on the site.** If you see a price difference
> between Skyscanner and a travel provider, please **contact us with all the flight
> details (from, to, dates, departure times, airline and travel agent if
> applicable)** and we will investigate further."

Two things. First, Skyscanner **admits its own data can be wrong** —
"very occasionally there can be reasons why a price change has not updated
accurately on the site" — in the one place where it would be easiest to blame the
provider. Second, the report instruction **enumerates the six fields required**,
in parentheses, in the order they appear on the user's own screen:
`from, to, dates, departure times, airline and travel agent if applicable`.

That parenthetical is the transferable bit. A "contact us" that specifies exactly
what to include converts a useless ticket into a diagnosable one, and it costs six
words. The `if applicable` on the last field handles the airline-direct case
without a second sentence.

The same article opens with the mechanism, so the recovery reads as an exception
rather than the norm:

> "Flight prices and availability change constantly, so we make sure the data is
> updated regularly to reflect this. **When you redirect to a travel provider's
> site, the price is updated again so you can be sure that you will always see the
> best price available from the airline or travel agent at time of booking.**"

**The refresh-on-redirect is reframed as a benefit.** The moment the user
experiences as a bait-and-switch is described as a guarantee of currency —
"so you can be sure that you will always see the best price available … at time of
booking". Whether that lands depends on whether the price went up or down, but the
argument is legitimate and it is made in one clause.

### Related unfetched recovery articles

*(titles surfaced in search listings; not directly fetched, bodies not retrieved)*
`How do I change or cancel my booking?` · `Open return` ·
`Find partner contact details` · `I've found a problem on Skyscanner` ·
`Why was the price different on Skyscanner to the one I was sent in my price alert?`

**`I've found a problem on Skyscanner`** is the notable one — a first-person
bug-report article title, inviting the user to report a defect in the product
itself. Very few companies title an article that way.

## T8 Empty states

`[absent]` on observed surfaces. Help-centre search returned no result region in
server HTML; the product's own no-results states were not reachable.

One near-miss `[observed]`: the section page
`/sections/200350421-My-Bookings` renders its `<h1>` as **`Search results`** —
a template leak, not an empty state, but it means a user landing on that section
sees a heading describing a page they are not on. Recorded in T14.

## T9 Notifications & system messages

**Price alerts are the product's only notification channel and they are
documented thoroughly.** `[observed]`

**The definition leads with the user benefit and names the trigger** `[observed]`:

> "Price alerts allow you to **track price changes for a route and date you're
> interested in booking**. After creating a price alert, we'll send you an email
> **when prices change** – so they can be great for making sure you get the best
> deal."

`when prices change` — not "when prices drop". Skyscanner alerts on movement in
both directions and says so, which is less exciting and more accurate than the
drop-only framing used by Hopper (`the instant there's a deal`) and Expedia
(`automatic alerts when the price drops`). **Of the three, only Skyscanner's
trigger description matches an unbiased price monitor.**

**Unsubscribe is documented as part of the setup article, not hidden** `[observed]`:

> "After you have found the best price and booked your tickets, the easiest way to
> remove a price alert is by scrolling to the bottom of your price alert email and
> clicking the **Stop all alerts** button."

Two things worth noting. The article **assumes the successful outcome** —
"After you have found the best price and booked your tickets" — and treats
unsubscribing as the natural final step of a completed journey rather than as
churn. And the off-switch is `Stop all alerts`: total, immediate, no granular
choice, no "manage preferences" detour. For a monitoring product that is the right
default, and it is placed in the email where an annoyed user will actually find it.

The granular route is then offered as the alternative, with a cross-link to a
dedicated article: `Where can I view and manage the price alerts I have set up?`

**Channel and platform coverage** `[observed]`: email is the stated channel
throughout ("we'll send you an email when prices change"), with the mobile app's
bell and toggle implying push. No push copy, no toast, no in-app message copy was
observed.

**No system-status, incident or maintenance communication** was found. `[absent]`

## T10 Disclosures, legal & compliance — **PRIORITY**

Skyscanner's disclosures are almost entirely about **one thing: what the displayed
price means.** For a metasearch product that is the correct concentration, and the
writing is the best in this domain set at the sentence level.

### What the price includes

`[observed]`, the whole of `What do you include in the prices shown on Skyscanner?`
— four paragraphs, and every one does distinct work:

> **"Our goal is to make searching for travel as transparent as possible. That's
> why prices shown on Skyscanner always include an estimate of all taxes and
> charges, including any fees charged by online travel agencies.**
>
> The final price you pay for your tickets **may change because of additional
> options offered by the provider, such as luggage, seat allocation or travel
> insurance.**
>
> Sometimes a travel provider might charge more for certain payment methods.
> However, **the price shown on Skyscanner should always include a free option
> (usually it's the most popular card in your country). Because you have at least
> one option to avoid any additional fees and it's the most popular payment method
> that's free, this is the price we show in our results.**
>
> If you have any other questions about what's included, please contact the travel
> provider you plan to book with. Alternatively, if you'd like to contact us to
> report something or share any feedback, please use the contact us link below."

**Paragraph 1 — principle, then behaviour.** "Our goal is to make searching for
travel as transparent as possible. **That's why** prices shown on Skyscanner always
include an estimate of all taxes and charges". The `That's why` construction turns
a rule into a consequence of a stated value. And the word `estimate` is left in —
Skyscanner does not claim its all-in price is exact, and the qualifier sits inside
the commitment rather than in a footnote. `including any fees charged by online
travel agencies` names the fee type users most suspect is hidden.

**Paragraph 2 — the bounded exception, with three examples.** `luggage, seat
allocation or travel insurance` are the three upsells a flight buyer will actually
meet, named in the order they appear at checkout.

**Paragraph 3 is the outstanding one.** Payment-method surcharging is a genuinely
hard disclosure problem — the price depends on the card — and Skyscanner solves it
by **publishing its own display rule and the reasoning behind it**:

- The commitment: "the price shown on Skyscanner **should always include a free option**"
- The gloss: "(usually it's the most popular card in your country)"
- The reasoning, stated as a `Because…, this is the price we show` sentence: "Because you have at least one option to avoid any additional fees and it's the most popular payment method that's free, this is the price we show in our results."

Almost no company explains *why* it picked the number it displays. This paragraph
names the selection rule, justifies it on the user's behalf (you can always avoid
the fee), and acknowledges that other, higher numbers exist. `should always`
rather than "always" is the honest hedge on a rule enforced across thousands of
third-party feeds.

**Paragraph 4 splits the two contact routes by purpose** — questions about
inclusions go to the provider; "report something or share any feedback" comes to
Skyscanner. Routing by *who can answer*, stated in one sentence.

### Why the price changes on redirect

`[observed]` — covered in T7 for its recovery path; as a disclosure it does two
things. It **names the cause as market volatility rather than as a trick**
("Flight prices and availability change constantly"), and it **admits the system
can be wrong** ("very occasionally there can be reasons why a price change has not
updated accurately on the site").

Related unfetched disclosure articles *(titles from search listings)* map the rest
of the price-discrepancy surface with unusual granularity:

- `Why does the price change from the calendar, graph or country pages to the next page?`
- `Why does the price change when searching for more than one person?`
- `Why was the price different on Skyscanner to the one I was sent in my price alert?`

**Three separate articles for three separate price-discrepancy causes**, each
naming the *specific surface pair* between which the price changed. Search listings
indicate the first is answered with an `indicative prices only` concept — prices
on calendar and graph pages "are based on recent prices found by other users over
the past 4 days, so they are only estimates" *(indicative, not directly verified —
the article was not fetched and no term or window is asserted here as observed)*.

The pattern worth recording regardless of that article's exact wording: **when a
number differs between two of your own screens, write an article named after that
specific pair of screens.** A single "prices may vary" article would cover all
three and help nobody.

### Model disclosure as a disclosure

`[observed]` — Skyscanner's repeated statement that it is not the merchant is
functionally its most important consumer disclosure, and it appears in at least
three places: the help home's `Got a question about a booking?` block, the opening
of `Changes, cancellation and refunds`, and the third paragraph of
`My booking has been canceled`.

> "Skyscanner is a travel search engine… you are redirected to the airline or
> travel agent's site where **you make your booking directly**."

`directly` is the operative word, repeated across surfaces. The transaction is
between the user and the provider; Skyscanner is not a party to it.

**Legal footer** `[observed]`: `Cookie Policy` · `Privacy Policy` ·
`Terms of Service` · `© 2002-2026 Skyscanner Ltd`. No accessibility statement, no
regulatory registration, no complaints route, no modern-slavery or consumer-rights
link. Consistent with a non-merchant model, but thin against peers.

## T11 Help-centre architecture

**Zendesk, four levels**: Home → Category → Section → Article. Categories and
sections render their heading server-side but their **article lists client-side**,
so the full inventory per category is not retrievable from this surface.

**Article furniture — identical on every article** `[observed]`, in order:

1. Breadcrumb (three levels)
2. `<h1>` — the article title, verbatim as a question
3. **Timestamp: `<Month DD, YYYY HH:MM> Updated`** — e.g. `June 30, 2026 10:10 Updated`
4. Body
5. `Was this article helpful?` / `Yes` `No`
6. `Contact Us` — with `?skyArticle=<ID>` appended
7. `Return to top`
8. Footer policies + copyright
9. A stray, unlabelled `Reminder`

**The timestamp is precise to the minute and the word order is inverted** —
`June 30, 2026 10:10 Updated`, with `Updated` trailing rather than leading. It
reads as a Zendesk default rather than as authored copy, and minute-level
precision on a help article is false precision. But the **freshness is genuinely
useful and genuinely variable**: the six articles read carry

| Article | Last updated |
|---|---|
| `My booking has been canceled` | August 18, 2026 |
| `Changes, cancellation and refunds` | June 30, 2026 |
| `What do you include in the prices shown on Skyscanner?` | March 26, 2026 |
| `How do I search for flights on Skyscanner?` | March 20, 2026 |
| `How do I set up or cancel email price alerts?` | March 20, 2026 |
| `Why does the price sometimes change when I am redirected to a flight provider?` | **November 19, 2021** |

**Five of six were revised in 2026; one has not been touched since 2021** — and
the stale one is the article explaining the product's single most complained-about
behaviour. The two recovery articles are the freshest, which suggests active
maintenance where it matters. Publishing the date makes this legible to the reader,
which is the point.

**`Contact Us` carries the article ID** `[observed]`:
`/hc/requests/new?skyArticle=201303161`. Every contact form submission arrives
tagged with the article the user was reading when they gave up. That is a
deflection-analytics decision with real content-ops value — it tells the team
exactly which articles fail — and it costs the user nothing.

**Article-title grammar — four shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `How do I …?` | `How do I search for flights on Skyscanner?` · `How do I set up or cancel email price alerts?` · `How do I change or cancel my booking?` · `How do I find the best prices?` · `How do I find the lowest prices across a month?` |
| `Why …?` | `Why does the price sometimes change when I am redirected to a flight provider?` · `Why does the price change when searching for more than one person?` · `Why was the price different on Skyscanner to the one I was sent in my price alert?` |
| `My/I <statement>` | `My booking has been canceled` · `I've found a problem on Skyscanner` |
| Bare noun phrase | `Changes, cancellation and refunds` · `Open return` · `Direct flights` · `Find partner contact details` |

*(Titles not in the Pages table are from search listings; bodies not retrieved.)*

**The `Why …?` cluster is Skyscanner's signature**, and every one of them is about
a price that did not behave as expected. Five of the eleven recorded titles are
price-discrepancy questions. The help centre's shape is a direct map of the
product's trust problem.

**Section names are the most interesting layer** `[observed]`:
`My Bookings` · `Prices on Skyscanner` · `How do I search for...?`

`Prices on Skyscanner` — brand-qualified, because the section exists to
distinguish Skyscanner's price from the provider's. `How do I search for...?` — a
**section named as a truncated question with an ellipsis**, so the section label
is the shared prefix of the questions inside it. Unusual and genuinely useful for
scanning.

**In-body structure** `[observed]`: H1-level headings *inside* the body are used
to split articles into scannable blocks — `Common booking situations`,
`Can't remember who you booked with?`, `Has your flight schedule changed instead?`,
`Unsure who you booked with?`, `Setting up price alerts`.

**`Has your flight schedule changed instead?`** is the best of these. A heading
that anticipates the reader **landed on the wrong article** and redirects them
mid-page, using `instead` to acknowledge the mismatch. It appears inside
`My booking has been canceled` because the two events are easily confused. Building
a mis-navigation escape into the body of the article is cheap and rare.

**Cross-vertical routing** at the help home: `Flights` · `Stays` · `Car Rental`,
three separate help instances, with the flights one as default.

## T12 FAQs

**`[absent]` as a marketing-page component** — the product site did not render.

**The help centre is the FAQ**, and its titles are overwhelmingly interrogative
(T11). Eleven article titles are recorded across this file; five are `Why…?`
questions about price behaviour, five are `How do I…?` tasks, and two are
first-person statements.

**The one in-article FAQ-like block** `[observed]` is the three-H3 set under
`Common booking situations` (T7) — three named scenarios, each answered in one or
two sentences, functioning as an embedded mini-FAQ inside a longer article.

## T13 Terminology & glossary

| Term | Skyscanner's usage | The alternative it rejected |
|---|---|---|
| `travel providers` | **Explicitly coined**: "We call them travel providers." Umbrella for travel agencies, airlines, hotels and car rental companies | "suppliers", "merchants", "partners" |
| `travel search engine` | The self-description, used in three places | "metasearch", "comparison site", "OTA" |
| `the airline or travel provider that manages your booking` | The recurring identifier for the correct contact party | "the merchant", "your booking provider" |
| `partner contact list` / `Find partner contact details` | The directory of provider support numbers — note `partner` here, `travel provider` elsewhere | |
| `Select` | The results-row action | `Book`, `Choose`, `Continue` |
| `Explore everywhere` | The destination-less search feature | "Anywhere", "Inspire me" |
| `Everywhere` | Capitalised in the page `<title>` as a destination | |
| `Smart search filters` | The filter set, named as a category | "Filters" |
| `Price alerts` | The monitoring product | "Fare alerts", "Price watch" |
| `Track prices` / `Get Price Alerts` | **Two CTA labels for creating one alert** | |
| `Stop all alerts` | The total unsubscribe | "Manage preferences", "Unsubscribe" |
| `Like these flights?` | The alert-prompt banner | |
| `booking conditions` | The provider's rules governing remedies | "fare rules", "terms" |
| `accepting the change` | The null option after a schedule change, named | (usually unnamed) |
| `an estimate of all taxes and charges` | The price-inclusion commitment, hedged with `estimate` | "all-in price", "total price" |
| `a free option` | The payment method that attracts no surcharge | "standard payment method" |
| `Stays` | The accommodation vertical | "Hotels" |
| `Car Rental` | The car vertical — **singular and title-cased** against `Flights`/`Stays` | "Car hire" (used in the en-GB variants) |
| `Open return` | A named fare concept with its own article | |
| `Go back to skyscanner.com` | The escape-hatch label | "Home" |

**`travel providers` is the single most instructive terminology decision in this
domain set**, for three reasons. It is **coined out loud** ("We call them travel
providers"), so the reader knows it is house vocabulary. It is **defined by
enumeration first** ("thousands of travel agencies, airlines, hotels, and car
rental companies"), so it arrives populated. And it is **functionally necessary** —
Skyscanner genuinely needs one word for "whoever you actually bought from", because
in a redirect model that party varies and the user often does not know which type
it was.

Compare the alternatives the domain uses: Booking says `property` (supply-type
specific), Expedia says `partner` (relationship-specific), Airbnb says `host`
(role-specific). Only Skyscanner needed a term that covers *any* counterparty, and
only Skyscanner coined one and announced it.

**The one inconsistency**: the term is `travel provider` in prose but
`partner contact list` / `Find partner contact details` in the CTA. Two words for
one concept, with the CTA using the *internal* word (partners are who Skyscanner
has commercial deals with) rather than the *user-facing* one.

**`Select` deserves a second mention** as a terminology choice: in a model where
the next click leaves the site, a verb that promises only selection — not purchase
— is the honest label, and it is one syllable.

**Register** is plain, second-person, mildly formal, with contractions used
throughout (`you're`, `They'll`, `we're unable`, `it's`, `Can't remember`).
Skyscanner is `we`; the user is `you`; the third party is always named by its
relationship to the user's booking rather than by a pronoun. No exclamation marks
were found in any article. No colloquialism beyond `why not try` and
`call it quits`.

## T14 Voice, tone & accessibility

**Person.** Consistently second person to the traveller, first-person plural for
the company ("We know you're looking for…", "Our goal is to…", "we'll send you an
email", "we will investigate further", "we're unable to make changes"). The third
party is never "they" without a prior noun — it is always
`the airline or travel provider that manages your booking`, spelled out, every
time. Repetitive on the page, unambiguous in the ear.

**Register.** Calm, plain, slightly formal. No jokes, no exclamation marks, no
urgency devices, no apology language. Where a peer would write "Oops!" or
"We're sorry to hear that", Skyscanner writes "If your booking has been canceled,
contact the airline or travel provider that manages your booking directly."
**The absence of apology is deliberate and correct** — Skyscanner did not cancel
the booking, and pretending to share the blame would muddy the routing message.

**Hedging is systematic and honest.** `may include` · `Depending on the
circumstances and your booking conditions` · `should always include` ·
`may be subject to restrictions or additional charges` · `very occasionally` ·
`an estimate of` · `usually it's the most popular card in your country` ·
`if applicable`. Every claim about a third party's behaviour is hedged; every
claim about Skyscanner's own behaviour is not.

**`That's why` and `Because…` are the two reasoning connectives**, and both are
used to derive a rule from a principle rather than assert it
("Our goal is… **That's why** prices shown on Skyscanner always include…";
"**Because** you have at least one option to avoid any additional fees…, this is
the price we show in our results.").

**Punctuation is inconsistent.** `Step 1)` `Step 2)` `Step 3)` uses a
half-parenthesis; bold runs swallow their trailing punctuation
(`click **Search.**`, `click on **Select,**`); an en-dash appears spaced in
"when prices change – so they can be great for…" and a hyphen appears where an
en-dash belongs in "Check your email for a booking confirmation - it should have
been sent…"; and italic and bold are used interchangeably for UI labels within one
article (`*Track prices*` vs `**Like these flights?**`).

**Spelling is locale-mixed.** The en-US help centre carries `canceled` in the
article title `My booking has been canceled` but `cancellation` (double-l)
throughout the bodies, and the en-GB variant of the same article ID is
`My-booking-has-been-cancelled`. The US/GB split is handled at the URL level and
the body text is not fully reconciled.

**No numbers are used as trust devices.** Skyscanner makes no scale claims
(no "X million travellers", no "Y airlines compared") anywhere in the reachable
corpus — unusual for the category, and possibly because the marketing site, where
those claims would live, did not render.

### Accessibility content

- **`Skip to main content`** is first in DOM on every help page. `[observed]`
- **`Sign in` carries the accessible hint `"Opens a dialog"`** in its title attribute — a genuinely good practice: the control warns that it will open a modal rather than navigate. `[observed]`
- **Language endonyms** are rendered in their own scripts with `lang`-appropriate markup implied by the Zendesk template; regional variants are parenthetically disambiguated. `[observed]`
- **The logo carries `Skyscanner Help Center home page`** as its alt text and `Home` as its title — describing the destination rather than the image. `[observed]`
- **No accessibility statement was found** on any reachable Skyscanner property. Footer policies are Cookie / Privacy / Terms only. **This is a gap in the harvest, not a confirmed absence** — the marketing site did not render and may carry one.
- **Colour-only state indication, documented in the help copy** `[observed]`: "You can save your flight by clicking the *heart icon* next to a flight. **The heart icon will change color to blue.**" The article describes colour as the sole confirmation of a state change. If the UI provides no other cue, this is a WCAG 1.4.1 (Use of Colour) issue; the copy is the evidence, not the proof.
- **One decorative GIF with no alt text** `[observed]`: an `animation_test__1_.gif` embedded mid-article in `Changes, cancellation and refunds`, served from the **en-GB** article-attachments path on an en-US page, with an empty alt. The filename `animation_test` suggests it was never intended for production.

### Negative findings, recorded honestly

- **`skyscanner.com` and `skyscanner.net` render no body text.** No marketing copy, no search-form labels, no results-page strings, no filter or sort labels. **For a product whose benchmark strength is "comparison and search labels", the comparison and search labels are not observable.**
- **The `<h1>` on `/sections/200350421-My-Bookings` is `Search results`** — a template leak. Users landing on the My Bookings section see a heading for a page they are not on. Every other page correctly renders `How can we help?`.
- **`Reminder`** — a stray, unlabelled, context-free word renders at the foot of every help page, after the copyright line.
- **A bare `click here` link** in the first instruction of the getting-started article: "To start your search, **click here** to head back to Skyscanner's search pages."
- **`Why does the price sometimes change when I am redirected to a flight provider?` was last updated November 19, 2021** — the article covering the product's most common complaint is nearly five years stale while its neighbours were revised in 2026.
- **Two CTA labels for one action**: `Track prices` (banner) and `Get Price Alerts` (top left), on the same desktop screen.
- **Four interaction models for price alerts** across three platforms — button, button, unlabelled heart icon, toggle, bell — documented rather than reconciled.
- **`heart icon` couples "save" and "subscribe"** on mobile web: saving a flight silently creates a price alert. The article discloses it; the UI apparently does not label it.
- **`Car Rental` (singular, title case) vs `Flights` / `Stays` (plural)** in the same three-item vertical switcher.
- **`travel providers` (prose) vs `partner contact list` / `Find partner contact details` (CTA)** — two words for one concept.
- **A title/slug mismatch**: `…/articles/201152372-Can-I-check-prices-in-different-currencies-` renders with the title `How do I change my currency?`. The article was retitled and the slug was not, so the URL and the heading ask different questions.
- **A colon-free but ellipsis-bearing section name** — `How do I search for...?` — uses three periods rather than a true ellipsis character.
- **Two versions of the same diagnostic** (`Can't remember who you booked with?` numbered with `Step N)`; `Unsure who you booked with?` unnumbered) in two articles, with different headings, different step counts and different wording for the same three-step process.
- **Bold runs include trailing punctuation** (`**Search.**`, `**Select,**`), and italic/bold are used inconsistently for UI labels within one article.
- **An en-GB image asset embedded in an en-US article**, with an empty alt and a filename reading `animation_test`.
- **`canceled` (title) vs `cancellation` (body)** within one en-US article.
- **Minute-level precision on article timestamps** (`June 30, 2026 10:10 Updated`) with the word order inverted.
- **Help category and section pages render no article lists** to a non-JS client, so the help centre is not browsable without JavaScript even though every article is.

---

## Transferable patterns

1. **Coin your umbrella term out loud, and enumerate before you name.** "You'll find thousands of travel agencies, airlines, hotels, and car rental companies you can book through Skyscanner. **We call them travel providers.**" Examples first, then the four-word coinage sentence. Every later paragraph can then use the term without ambiguity, and the reader knows it is house vocabulary rather than jargon they should already know.
2. **State one limitation, then enumerate the three things it rules out — in the user's words.** "Skyscanner doesn't manage bookings or have access to your booking details, so we're unable to **make changes, arrange alternative travel or process a refund** on your behalf." The list closes off the "but can you at least…?" follow-up. The model sentence for any intermediary declining a request it structurally cannot fulfil.
3. **Put the action before the limitation.** In `My booking has been canceled`, "contact the provider — they can explain why" is paragraph one and "we can't help" is paragraph three. Same information, opposite experience. Ordering is the craft.
4. **Sell the handoff.** "They'll have access to your booking and can **explain why it was canceled** and what options are available to you." Name what the other party can give the user that you cannot, rather than just naming your own limits.
5. **Write a diagnostic for "who am I even dealing with?", and think past the obvious answer.** Email → spam folder → **bank statement**. The third step is the one that works when the first two have failed, and it names the exact artefact to look for ("the airline or travel agent's name next to any charge").
6. **Name the null option.** After a schedule change the options "may include **accepting the change**, rebooking or requesting a refund." Telling the user that doing nothing is a named, legitimate choice is a small kindness almost no product extends.
7. **Publish the rule you use to pick the number you display, and the reason.** "the price shown on Skyscanner should always include a free option (usually it's the most popular card in your country). **Because** you have at least one option to avoid any additional fees and it's the most popular payment method that's free, **this is the price we show in our results.**" Directly applicable to any surface where the price depends on the payment instrument.
8. **Derive rules from stated principles with "That's why".** "Our goal is to make searching for travel as transparent as possible. **That's why** prices shown on Skyscanner always include an estimate of all taxes and charges." The rule reads as a consequence of a value rather than as an arbitrary policy.
9. **Write one article per discrepancy *pair*, named after the two screens.** `Why does the price change from the calendar, graph or country pages to the next page?` beats a generic "prices may vary". If a number differs between two of your own surfaces, name both surfaces in the title.
10. **Enumerate the fields required in a bug report, inline, in screen order.** "please contact us with all the flight details **(from, to, dates, departure times, airline and travel agent if applicable)**". Six words that turn a useless ticket into a diagnosable one.
11. **Build a mis-navigation escape into the body.** `Has your flight schedule changed instead?` as a mid-article H1, in the article about cancellations, because the two are easily confused. Cheap, rare, and it saves a search.
12. **Describe the trigger accurately, even when it is less exciting.** "we'll send you an email **when prices change**" — not "when prices drop". Of the three price-monitoring products in this set, only Skyscanner's trigger description matches what the system actually does.
13. **Make the off-switch total and put it where the annoyance is.** `Stop all alerts`, at the foot of the alert email, introduced by an assumption of success ("After you have found the best price and booked your tickets…"). Granular management is offered second, via a separate article.
14. **Tag your contact form with the article the user gave up on.** `?skyArticle=201303161` on every `Contact Us`. Free content-ops telemetry, zero user cost.
15. **Choose a click verb that describes only what the click does.** `Select` — not `Book` — where the next screen is a list of third parties.

## Caveats & gaps

- **The product surface is entirely unreadable.** `skyscanner.com` and `skyscanner.net` are client-rendered SPAs returning `<title>` and `<meta>` only. **No results-page string, no filter label, no sort label, no fare-type label, no self-transfer or protected-transfer warning, no price-history chart label, and no `Explore everywhere` map copy was observed.** Skyscanner's benchmark strength is *comparison and search labels*, and the comparison and search labels are the one thing this harvest could not reach. The six form and results labels reported in T5 and T3 are **quoted from help-article prose describing the UI**, not seen in it, and are marked `[documented]`.
- **Help category and section pages render no article lists.** Only the category heading is server-side. **The complete article inventory for `Searching`, `Prices`, `Bookings`, `Traveling` and `About` is therefore unknown**, and the eleven article titles recorded beyond the six read in full come from search listings. Those are labelled inline and **their bodies were not retrieved; no content is reported from them**, with two exceptions that are explicitly flagged as *indicative, not verified*.
- **`Traveling` and `About` categories were not opened.** The `About` category contains a `What is Skyscanner?` section which would likely carry the clearest statement of the model; it was not fetched.
- **The `Stays` and `Car Rental` help centres** (`hotelshelp.skyscanner.net`, `carhirehelp.skyscanner.net`) were identified but not harvested, so the multi-vertical register comparison is absent.
- **No marketing, pricing, about, careers, newsroom, partner or developer surface was reachable.** `skyscanner.net/news` (the Travel Blog) is referenced from a help article and was not fetched.
- **No accessibility statement was found.** Gap in the harvest, not a confirmed absence.
- **No empty states, no in-product notifications, no validation copy, no error titles, no toast or banner copy.** `[absent]`.
- **No supply-side or partner-facing surface** was harvested. Skyscanner is not multi-audience in the way Airbnb, Booking and Expedia are — it has no host or property-partner consumer product — but it does run a partner programme that was not reached.
- **Two quotations are marked *indicative, not directly verified*** (the `flight cancelled by your airline` entitlement sentence, and the `indicative prices only` / four-day window concept). Both come from search-engine summaries of Skyscanner pages not retrieved in this pass. **No term, window or percentage from either is asserted as observed, and nothing in this file has been invented.**
- **Mobile app copy** is out of the public web surface.

## Sources

**Fully readable:**
1. https://help.skyscanner.net/hc/en-us
2. https://help.skyscanner.net/hc/en-us/articles/201303161-Changes-cancellation-and-refunds
3. https://help.skyscanner.net/hc/en-us/articles/201298891-My-booking-has-been-canceled
4. https://help.skyscanner.net/hc/en-us/articles/201208841-What-do-you-include-in-the-prices-shown-on-Skyscanner-
5. https://help.skyscanner.net/hc/en-us/articles/202381632-Why-does-the-price-sometimes-change-when-I-am-redirected-to-a-flight-provider
6. https://help.skyscanner.net/hc/en-us/articles/201549211-How-do-I-search-for-flights-on-Skyscanner
7. https://help.skyscanner.net/hc/en-us/articles/115002499829-How-do-I-set-up-or-cancel-email-price-alerts

**Heading only (article lists client-rendered):**
8. https://help.skyscanner.net/hc/en-us/categories/200151281-Searching
9. https://help.skyscanner.net/hc/en-us/categories/200368471-Prices
10. https://help.skyscanner.net/hc/en-us/categories/200117671-Bookings
11. https://help.skyscanner.net/hc/en-us/sections/200350421-My-Bookings

**Attempted, empty body (recorded as blocked):**
12. https://www.skyscanner.com/
13. https://www.skyscanner.net/
14. https://www.skyscanner.net/help
15. https://help.skyscanner.net/hc/en-us/articles/201300911-… *(en-GB-only article ID)*
