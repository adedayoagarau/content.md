# 194. IFTTT

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Consumer automation platform (smart home + social + productivity connectivity) |
| Primary URL | https://ifttt.com/ |
| Corpus rank | 194 |
| Benchmark strength (source list) | Trigger-action mental model |
| Locale / market observed | en-US (help centre is `/hc/en-us` only) |
| Platform observed | Web marketing and Applet pages, Zendesk help centre, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a — no financial or health regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 fetched successfully |
| Harvest completeness | **Full for the priority sections.** IFTTT publishes a formal `Glossary` article defining sixteen terms, and an Activity-feed article that is in effect a published event/error vocabulary with sixteen named feed items. Live Applet pages are fully public and render the trigger-action sentence as observed UI. T13 and T7 are therefore exceptionally well evidenced. The homepage itself was not fetched; `ifttt.com/explore` carries the same global nav and footer |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Explore | https://ifttt.com/explore | Global nav, search prompt with example queries, Applet card grammar, footer, a live no-results empty state |
| Plans & Pricing | https://ifttt.com/plans | Three tiers, feature bullets, six-question FAQ |
| Help centre home | https://help.ifttt.com/hc/en-us | Four categories with scope lines, plus a pinned `Current outages` link |
| Help category: Applets | https://help.ifttt.com/hc/en-us/categories/4725187873819-Applets | Three sections with descriptions |
| Section: Creating and managing Applets | https://help.ifttt.com/hc/en-us/sections/4725315362715-Creating-and-managing-Applets | 26 article titles |
| Glossary | https://help.ifttt.com/hc/en-us/articles/4411016949403-Glossary | **16 defined terms** — the canonical vocabulary source |
| Activity feed | https://help.ifttt.com/hc/en-us/articles/115004914234-How-to-use-the-IFTTT-Activity-feed | **16 named feed events** with explanations — the state/error vocabulary |
| Common errors and troubleshooting tips | https://help.ifttt.com/hc/en-us/articles/115010194547-Common-errors-and-troubleshooting-tips | Seven remedies, named error strings |
| Why do Applets and connections get disabled? | https://help.ifttt.com/hc/en-us/articles/360014195734 | Auto-disable criteria |
| How do I turn off or archive an Applet? | https://help.ifttt.com/hc/en-us/articles/115010361468 | Four distinct lifecycle operations |
| Live Applet page | https://ifttt.com/applets/PVkgiLYy-automatically-turn-your-lights-on-at-sunset | **Observed** `If` / `Then` structure, trigger and action detail, badges |
| Status page | https://status.ifttt.com/ | Three components, five-state legend, a live incident, an empty state |

---

## T1 Navigation & IA labels

`[observed]`

**The global nav is four items.** `Explore` · `Plans` · `Log in` · `Get started`. That is the entire signed-out navigation of a fifteen-year-old platform with over a thousand integrations. Compare Zapier's five top-level items each opening a multi-column mega-menu.

The economy is deliberate and it works: the product has exactly two public jobs — find something to automate (`Explore`) and decide what to pay (`Plans`) — and the nav says so.

**`Explore` has four sub-tabs** `[observed]`: `All` · `Applets` · `Services` · `Stories`. Three object types plus everything. `Stories` is the editorial content type, and it sits as a peer of the two product objects, which is a real merchandising decision — IFTTT treats its blog-like content as a browsable catalogue alongside its Applets.

**Footer is grouped four ways** `[observed]`:

- `Explore` → `Services` · `Stories` · `Applets` · `IFTTT MCP` · `Help Center` · `Content Map` · `Search` · `Plans` · `Developer docs`
- `Top Integrations` → ten pairwise links, each named as `<Service> and <Service>`: `Discord and Instagram`, `iOS Calendar and Notion`, `Google Calendar and Google Sheets`, `Google Assistant and My Q`, `BotGhost and Spotify`, `SMS and Twitter`, `iOS Reminders and Notion`, `iOS Calendar and Todoist`, `Telegram and Twitter`, `Discord and Twitter`
- `Latest Stories` → ten article titles
- `Company` → `Developers` · `Partner program` · `Careers` · `Contact` · `About` · `Privacy`

**`Top Integrations` as a footer group, naming service *pairs*, is the single most IFTTT-specific IA decision in this file.** The unit of navigation is not a product or a category — it is *two things joined by "and"*. `Discord and Instagram`, `Telegram and Twitter`. The footer is teaching the combinatorial model just by listing its links. A user who never reads a word of documentation learns from the footer that IFTTT's job is joining two named services.

The URL scheme reinforces it: `ifttt.com/connect/discord/instagram`, `ifttt.com/connect/ios_calendar/notion_so`. Two service slugs in one path.

**Defects in the footer.** `Search` links to `/explore` (the same destination as `Explore` two lines above, and as the `Search` entry's own parent). `Google Assistant and My Q` renders the service as "My Q" with a space while the URL slug is `myq_devices` and the recommendations list elsewhere on the same page renders it `MyQ`. `Privacy` is the only legal link in the marketing footer; the help centre footer instead offers `Terms & Privacy` as one combined link.

**Help centre is four categories, each with a scope line** `[observed]` — and this is a strikingly small help IA:

| Category | Scope line (verbatim) |
|---|---|
| `Account` | "IFTTT basics and managing your account" |
| `Applets` | "Creating, managing, and troubleshooting Applets" |
| `Services` | "Services on IFTTT and tips on how to troubleshoot" |
| `Getting started guide and tutorials` | "Learn how to get started using IFTTT and view tutorials covering advanced use cases." |

Two of the four scope lines end with troubleshooting (`…and troubleshooting Applets`, `…tips on how to troubleshoot`) — the same Wise pattern of terminating the category description on the unhappy path. Only the fourth scope line is a sentence with a full stop; the other three are fragments. Only the fourth is an imperative.

Beneath the four categories sits a single pinned link, `Current outages`, at the same visual level as the categories. Elevating live incident status to the help-centre landing page, above the fold, is right for a product whose most common complaint is "it stopped working".

**Help-centre header is almost empty** `[observed]`: a logo linking Home, and a single unlabelled link to `ifttt.com/discover`. That link has **no accessible text at all** — it renders as `[](https://ifttt.com/discover)` — and it points at `/discover`, a path that does not appear anywhere in the marketing navigation (which uses `/explore`). A dead-named, unlabelled link is the only navigation out of the help centre back to the product.

**Breadcrumbs are three-level** and consistent: `IFTTT Help Center` → `Applets` → `Creating and managing Applets`.

**IA defect worth recording.** The `Glossary` and `Common errors and troubleshooting tips` articles both live under `Account` → `Basics`, not under `Applets`. The two most important conceptual articles in the product are filed under account management.

## T2 Value proposition & headline patterns

`[observed]`

**The product name is the mental model.** `IFTTT` = "If This Then That". No other product in this corpus has encoded its entire conceptual model into its brand name. Every downstream content decision inherits from it, and the meta-keywords on `/explore` still carry the expansion: `ifthisthenthat`.

**The canonical sentence, stated verbatim on Applet pages** `[observed]`:

> "Create custom workflows effortlessly by selecting triggers, queries, and actions. With IFTTT, it's simple: **"If this" trigger happens, "then that" action follows.** Streamline tasks and save time with automated workflows that work for you."

The middle clause is the whole pedagogy: it takes the brand name, splits it, and **maps each half onto its technical term inline** — *"If this"* → trigger, *"then that"* → action. Quotation marks around the two colloquial halves, plain type for the two technical nouns. One sentence teaches two terms by anchoring them to a phrase the user already knows because it is the company's name.

**The `Explore` page opens with a question, not a claim** `[observed]`:

> `What would you like to automate today?`
> `Start building`
> `Try these examples`
> - "If there's a new Tweet with keyword, add to sheets."
> - "If I miss a phone call, then send myself an email."
> - "If an RSS feed has a new item, send me a notification."

The three example queries are the strongest onboarding content on the site. Each is a **complete if-then sentence in first person**, and they deliberately vary in form: the first drops "then" ("If there's a new Tweet with keyword, add to sheets"), the second keeps it ("If I miss a phone call, then send myself an email"), the third drops it again. The variation teaches that the grammar is flexible while the shape is fixed. Two of the three use `me`/`myself`, so the user is the beneficiary.

They are also **deliberately ungrammatical in a useful way** — "a new Tweet with keyword" has no article, mimicking how a person types into a search box rather than how a sentence is written.

**Headings are conversational questions or direct addresses** `[observed]`: `What would you like to automate today?` · `Explore automations built by the IFTTT community` · `Don't see what you're looking for?` · `Haven't found the right Applet?` · `Find the plan for you` · `Which plan is right for me?` · `Looking for a business solution?` · `What kind of automator are you?`

Four of these are second-person questions. IFTTT's register across the harvest is closer to a person talking to you than any other product in this batch.

**The tagline** `[observed]`, in the sticky upgrade bar: `Automate more, effortlessly.` — two words, a comma, and an adverb. And in the plans FAQ: "we believe **every thing works better together**", with `every thing` as two words. That two-word construction recurs: `Get the tools that help every thing work better together.` It is a deliberate pun on the Internet of Things, and it is easy to read as a typo.

**Story titles are quiz-and-listicle shaped** `[observed]`: `What kind of automator are you?` · `Which generation are you according to your Applets?` · `What your automations say about your aesthetic` · `The best automations for every enneagram type` · `What your desk setup says about your productivity style` · `We tested these 24 Applets so you don't have to` · `Celebrating 15 years of IFTTT` · `The 10 AI tools taking over your feed just joined your workflow`.

That is a consumer-media content strategy attached to an automation platform. `The best automations for every enneagram type` is not a sentence any B2B automation vendor would publish, and it is the clearest signal of the audience difference between IFTTT and Zapier.

**Proof numbers** `[observed]`, and they disagree with each other: `Over 1,000 brands and services` (Explore); `Over 1,000 apps, services, and devices (and millions of their users)` (Applet page); `an ecosystem of 32M users, thousands of developers, and over 1,000 services` (plans FAQ); `Discover our 1000+ services` (Glossary, unformatted); `10M+ Downloads`; `30M+ Automations run`; `4.5 out of 5 stars` App store rating; `App Store Editor's choice`.

`32M users` in the plans FAQ against `10M+ Downloads` on the Applet page is a three-fold gap that is not reconciled anywhere. And `1,000` is variously rendered `1,000`, `1000+`, and `Over 1,000`.

## T3 CTA inventory

`[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav, right-hand slot | |
| `Get started for free` | Applet page footer band | |
| `Start building` | Explore search panel | The one CTA that names the *activity* rather than the transaction |
| `Try it free` | Plans page, Pro and Pro+ cards; sticky upgrade bar | |
| `Try it today` | Plans page, two feature sections | **Near-duplicate of `Try it free` on the same page** |
| `Upgrade` | Plans page, queries-and-filter-code section | |
| `Add more actions` | Plans page, multiple-actions section | **CTA phrased as the user's goal, not as a purchase** — it links to the Pro subscription page |
| `Connect` | **Live Applet page, primary CTA** | See below |
| `connected` | `[documented]` — the post-connection button state you click to disconnect | See T6 |
| `Create your own Applet` | Explore, twice (`Don't see what you're looking for?` and the no-results state) | |
| `Create your own` | Explore, `Haven't found the right Applet?` card | **Truncated variant of the above, same page** |
| `Create your own Applet from scratch` | Explore, inline card | **Third variant, same page** |
| `Set up IFTTT MCP` | Explore, MCP promo card | |
| `Explore services` | Plans page | |
| `Learn more` | Plans page, business-solution card | The one bare instance |
| `See all results` | Explore search dropdown | |
| `View more Applets` | Applet page | |
| `Log in` | Global nav | |
| `Copy` / `Share` | Applet page, above the title | Two bare verbs as sharing affordances |
| `Archive` / `Delete` / `Connect` / `Reconnect` | `[documented]` — Applet and service lifecycle controls | See T6 |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `Resend OTP` | Status-page subscription flow | |
| `Return to top` | Every help article | |
| `How to contact support` | Every help article, immediately above `Return to top` | A link, not a button, placed identically on every article |

**Observation 1.** `Create your own Applet` / `Create your own` / `Create your own Applet from scratch` — **three labels for one destination (`/create`) on one page**, all within the Explore grid.

**Observation 2, and this is the important one.** The primary CTA on a live Applet page is the single word **`Connect`**. Not "Turn on", not "Use this Applet", not "Enable". `Connect` is a relationship verb, and it is also the verb IFTTT uses for linking a *service* to your account. So one word does two jobs: connecting a service and activating an Applet. The Glossary and the help articles both bleed this — `Applets and connections` is used as a compound throughout, and one help article is titled `How to stop Applets or connections that you can't locate from running?`.

That overload has a real cost, documented in T6: the *off* control is the same button in a different state, labelled `connected`.

## T4 Onboarding & getting-started

`[observed]`

**The onboarding surface is the Applet catalogue itself.** IFTTT's answer to "what do I do first" is not a tutorial — it is 40-odd pre-built Applets on `/explore`, each rendered as a complete sentence with an author and an install count.

**The Applet card is the atomic onboarding unit** `[observed]`, and its grammar is fixed:

`<service icon> <service icon> <Applet title as an imperative sentence> <author> <install count>`

Examples, verbatim: `Save new Spotify Discover Weekly songs to an archive` · `Get a 6:00 AM Weather Underground email forecast` · `Email me free Steam game deals from Reddit` · `Set your Android wallpaper to NASA's Image of the Day` · `Mute Android ringtone automatically at bedtime` · `Automatically turn your lights on at sunset` · `Back up new texts you receive on your Android device to a Google Spreadsheet` · `Get an IFTTT notification when you arrive home` · `Track your work hours in iOS Calendar` · `Forward Android SMS to your Email inbox`.

Every title is an **imperative verb phrase describing the outcome**, never the mechanism. Not "Weather Underground sunset trigger → Philips Hue on" but `Automatically turn your lights on at sunset`. The service names appear as icons and as incidental nouns inside the sentence, not as the sentence's subject.

**Install counts are shown on every card** — `133k`, `604k`, `366k`, `191k`, `7.47k`, `27`, `119`. Publishing counts as low as 27 alongside counts of 604k is a real choice: the catalogue is honest about its long tail rather than showing only winners.

**Author attribution is shown and mixes first- and third-party**: `Spotify`, `IFTTT`, `Google`, `Facebook`, `Weather Underground`, `Todoist`, `Monzo`, `ecobee`, `Reddit`, `Webhooks`, alongside individual usernames `thatjimmi`, `maximejonard`, `eguidesservice`. A user can see that both the brand and a stranger can publish, which is the community proposition made visible without a word of explanation.

**The Applet detail page is the real onboarding artefact** `[observed]`. Structure:

1. Service icons of both ends, with alt text naming the trigger and action (`Philips Hue Turn on lights.`, `Weather Underground Sunset.`)
2. `# Automatically turn your lights on at sunset` — the imperative title
3. Author and install count (`Philips Hue`, `133k`)
4. `Connect`
5. `## About this Applet` — "Never be left in the dark. Whenever the sun starts to set, your Philips Hue bulbs will automatically turn on."
6. **`If`** — service icon — `### Sunset` (the trigger, linked to its own page) — a `Polling trigger` badge — the badge's gloss — "This Trigger fires within 15 minutes of the sunset in your location." — `Trigger ingredients` and the ten named ingredient tokens
7. **`Then`** — service icon — `### Turn on lights` (the action, linked) — an `Action` badge — its gloss — "This Action will turn on your hue lights." — `Action fields` and the field name `lights`
8. `## Services used in this Applet`

**`If` and `Then` are rendered as bare structural labels between the two halves.** Not "Trigger" and "Action" as headings — the technical terms appear only in the badges and the ingredient labels. The *layout* teaches the conditional; the *vocabulary* is available on hover.

And the About paragraph leads with a **human benefit sentence before the mechanism**: "Never be left in the dark." Four words, then the explanation. Most product descriptions in this corpus do the reverse.

**The badges are inline glossary entries** `[observed]`, linking to `ift.tt/glossary-polling-trigger` and `ift.tt/glossary-action`:

> `Polling trigger` — "Polling Applets run after IFTTT reaches out to the trigger service and finds a new trigger event. These trigger checks occur every 5 minutes for Pro and Pro+ users, and every hour for Free users."
> `Action` — "An action is the task your Applet carries out after the trigger occurs. It defines what happens as the result of your automation and completes the workflow."

**Putting the latency disclosure inside the trigger badge, on the Applet page, before the user connects anything** is a strong pattern. The user learns that the free tier is an hour behind at the exact moment they are deciding whether this Applet is worth having.

The `Free` plan bullet `30-day onboarding support` `[observed]` is the only time-bounded support promise on the pricing page and is not explained anywhere.

## T5 Form & field labels

`[observed]` for the field taxonomy; `[documented]` for builder labels.

**IFTTT has four named field families, and the Glossary defines each separately** — this is unusually precise field vocabulary:

| Field type | Glossary definition (verbatim or close) | Example given |
|---|---|---|
| `Trigger field` | "a bit like a 'filter' for the data requested from a Trigger" | `Drive folder path`; `Which playlist?` |
| `Query field` | "how we add extra context to queries" | `Calendar`, `Date`, `Album ID` |
| `Action field` | "how we add extra information to Actions" | post title, body, categories, tags |
| `Ingredient` | "individual pieces of data" contained in Triggers and queries | `Text`, `UserName`, `LinkToTweet`, `CreatedAt`, `TweetEmbedCode` |

**The ingredient/field distinction is the core of the data model and it is taught as a sentence** `[observed]`: "These ingredients can be used to fill in an Action's Action fields."

That is the whole mapping concept in eleven words. Zapier calls the same operation "mapping fields"; IFTTT calls it **filling in fields with ingredients**. The cooking metaphor is doing real work — an ingredient is a *thing you have* and a field is a *slot you fill*, which is exactly the right asymmetry, and it makes the direction of data flow intuitive without any arrow diagram.

**Observed ingredient token names** `[observed]`, from the live Applet page's Weather Underground `Sunset` trigger: `SunsetAt` · `TempFahrenheit` · `TempCelsius` · `Condition` · `ConditionImageURL` · `ForecastUrl` · `HighTempFahrenheit` · `HighTempCelsius` · `LowTempFahrenheit` · `LowTempCelsius`.

These are **PascalCase machine tokens shown directly to consumers**, in a product explicitly built for people who cannot code. Note the internal inconsistency: `ConditionImageURL` capitalises URL, `ForecastUrl` does not. Both in one ten-item list on a public page. Other ingredients named in the Glossary: `PublicUrl` and `TemporaryUrl` (with a whole help article devoted to the difference between them), and `Text`, `UserName`, `LinkToTweet`, `CreatedAt`, `TweetEmbedCode`.

**Trigger fields are shown as questions** `[observed]`: the Spotify trigger field is `Which playlist?` — a question with a question mark as a form label. The Google Drive one is `Drive folder path`, a noun phrase. Two adjacent examples in the Glossary, two different label grammars.

**Field-related help titles** `[documented]`: `How to edit a Trigger/Query ingredient for use in an Action field` · `How to Assign a Default or Fallback Featured Image when using an Image Ingredient` · `How date ingredients are formatted in Applets` · `Troubleshooting Missing Options in Dropdown Menus` · `Services with no available Triggers, Queries, or Actions when creating an Applet` · `How do I configure the Google Drive Folder Path?` · `What is the difference between the PublicUrl and TemporaryUrl ingredients?`

**A field-level validation rule stated as troubleshooting advice** `[observed]`: "Verify that the intended Ingredients are being used where and how they should be. For example, don't use a filename ingredient for an image action field." A type-mismatch rule expressed as a negative example, in a help article, because the builder does not enforce it.

**`Applet ID`** `[observed]` is defined as "an 8-character alphanumeric identifier given to each Applet" — and the Glossary's own example is wrong. It says "this Applet's ID is `pc6CeRjs`" while linking to an Applet whose URL is `YfkYtQB2-get-a-notification-when-the-international-space-station-passes-over-your-house`. `pc6CeRjs` is the ID of a different Applet linked two paragraphs earlier. A factual error in the glossary entry whose entire content is one example.

`Action fields` on the live Applet page rendered as the single lowercase word `lights` — a field label that is a bare plural noun, shown to the user with no capitalisation and no explanation.

## T6 Status & state language

**PRIORITY-ADJACENT.** IFTTT's state model is small but its lifecycle vocabulary is unusually tangled, and the tangle is the finding.

### The Applet lifecycle has five operations and they are not parallel

`[observed]`, from `How do I turn off or archive an Applet?`:

| Operation | What it does | Applies to |
|---|---|---|
| **Turn off** | "Select the Applet or connection and click or tap the **connected** button to disconnect the Applet" | Any Applet |
| **Archive** | "you can archive it to remove it from My Applets" — "Archived Applets will no longer count towards your Applet limit" | Applets you created in the composer |
| **Restore** | Find it in `your archive`, click it, then re-enable "by pressing the **Connect** button" | Archived Applets |
| **Delete** | "you'll have the option to delete it instead of archiving it" | Published Applets you *enabled* |
| **Delete (DIY)** | "For now, this is not possible on ifttt.com, but you can permanently delete Applets at `ifttt.com/p/username/applets/private`" | Applets you created |

**Five operations, three verbs, and a rule that depends on provenance.** Whether you can archive or must delete depends on whether you *created* the Applet or *enabled* someone else's. The article states this correctly but never names the distinction as a concept — the reader must infer that "created in the composer" and "enabled a Published Applet" are two different ownership states with different lifecycles.

And the DIY-delete instruction is a **URL you must construct yourself with your own username**, on a page the navigation does not link to, prefaced by "For now, this is not possible on ifttt.com". A permanent destructive action reachable only by hand-editing a URL.

### The on/off control is a state-labelled button and the label is the state

`[observed]` and `[documented]`. On a live Applet page the button reads `Connect`. Once connected, the same button reads `connected` (lowercase in the help article), and **you click the word `connected` to disconnect**.

This is the most interesting state-language decision in the product and also the most problematic. It is a *toggle rendered as a status*: the label tells you the current state, not the action the click will perform. That inverts the normal button contract, where the label is the verb. A user who wants to turn an Applet off has to click a button that says it is on.

The Activity feed then records the result as `Applet turned off`, and the plans and help copy elsewhere call the same thing `disconnect`, `disable`, and `turn off` interchangeably.

### Named Activity-feed events — the state vocabulary

`[observed]`, from `How to use the IFTTT Activity feed`. Sixteen named items in two groups.

**Applet events** (the article heads this section `## Applet errors`, though eight of the nine are not errors):

| Item | Explanation (verbatim or close) |
|---|---|
| `Applet ran` | "Your Applet ran as expected!" — with the caveat "If your Applet has multiple actions, you'll see this item even if only one of those actions successfully ran." |
| `Applet updated` | "You successfully changed the configuration on one of your Applets" |
| `Applet created` | "You made an Applet via ifttt.com/create or the mobile app" — "this only shows up when you build your own Applet, not when you turn just on an Applet" |
| `Applet turned on` | "we'll put this confirmation in your activity feed" |
| `Applet turned off` | "If you see it but don't recall turning off the Applet, expand the item to get a link to some troubleshooting tips." |
| `Applet skipped` | "the trigger ran, but the actions were skipped. **It's not necessarily bad news**" |
| `Applet failed` | "This can happen for a few reasons. Let's break it down:" |
| `Applet published` | "Users and services can publish Applets for others to use" |

**Service events** (headed `## Service errors`):

| Item | Explanation (verbatim or close) |
|---|---|
| `Service connected` | "confirms that you've linked a new app or device" |
| `Service disconnected` | "When you disconnect from a service" |
| `Service edited` | "link a different service account, or update a password and reconnect" |
| `Service is offline` | "**Uh oh!** This usually means one of your apps or devices is no longer properly linked with IFTTT." |
| `Service is online` | "has made a **triumphant return** to online status, we'll give you the good news" |
| `Usage limit exceeded` | "When you hit it and we can't run an Applet, you'll see this item in your feed." |

**The `Applet skipped` entry is the best piece of state writing in this batch.** It opens with the mechanism ("the trigger ran, but the actions were skipped"), immediately reframes ("**It's not necessarily bad news**"), gives a filter-code example, and then enumerates three *other* causes under its own sub-heading `Applets could also skip if:`:

- "We tried to run the action five times and weren't able to make it happen"
- "The time between the trigger and the action attempt times out"
- "The action service is paused"

So `skipped` covers both a deliberate conditional non-run *and* five failed retries. The article is honest about the overload rather than hiding it — but the overload is real, and it is the same defect Zapier has with `Filtered`: **one state name covering "we chose not to" and "we could not".** Two products, same failure, arrived at independently. That makes it a pattern worth naming.

`Service is offline` / `Service is online` as a pair is also notable: the states are written as **predicate sentences about the service** rather than as status labels (`Offline` / `Online`), which reads as narration in a feed and is the right register for a chronological log.

### Service-level states

`[observed]` from the status page and the Activity feed: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance` (the Statuspage legend), plus **`paused`**, which is IFTTT's own coined state for a service temporarily withdrawn: "The action service is paused", "visit the status page to check out which services are currently paused". The live incident at harvest was titled `The Jira service is currently paused`.

`paused` is a well-chosen word — it implies temporary and blameless, and it is distinct from `offline` (which in IFTTT means *your* connection broke) and from `Partial Outage` (which means IFTTT broke). Three different failure owners, three different words. That distinction is maintained consistently across the status page, the Activity feed article, and the incident copy.

### Trigger timing is itself a state concept

`[observed]`: `Realtime Trigger` — "fires after the Trigger service notifies IFTTT... tend to run within a few seconds"; `Polling Trigger` — "fires after IFTTT performs a Trigger check and finds a new Trigger event... usually run within 5 minutes for Pro and Pro+ users, and within one hour for Free users"; `Trigger check`; `Trigger event`; `Applet run`.

Five distinct terms for the firing sequence, each defined. Note that `Trigger check` and `Polling Trigger` give the same interval numbers, and the Applet-page badge gives them a third time — three statements of the same 5-minute / 1-hour figures, all consistent.

## T7 Error, failure & recovery

**PRIORITY SECTION.**

### `Applet failed` is enumerated as five causes, in plain language, with blame attributed

`[observed]`, from the Activity feed article. The entry opens "This can happen for a few reasons. Let's break it down:" and then lists:

1. "If your Applet uses filter code, something might be wrong with the javascript" — *your code*
2. "If you're using a service for your action that has usage limits, the Applet will fail if you've hit those limits (e.g. the SMS service has a limit of 100 messages a month in North America)" — *a stated quota, with a real number*
3. "If one of the services involved is paused — visit the status page to check out which services are currently paused and subscribe for updates" — *third party, with a route*
4. "Our call to the trigger or action service took too long or failed, usually indicating some **(temporary!)** API issues on that app or device's end" — *third party, with reassurance*
5. "An unexpected error could sometimes pop up (**we can't prevent 100% of these, but know that we see them and do our best to investigate them**)" — *us, admitted*

**Five causes, and the blame is correctly and explicitly distributed across the user, the third party, and IFTTT itself.** Cause 5 is the striking one: a vendor publishing, in its own help documentation, that some errors are unpreventable, unclassifiable, and its own fault — and then committing to investigate them. The parenthetical `(temporary!)` in cause 4 is doing emotional work in a single word and an exclamation mark.

### The auto-disable policy is written as a promise not to over-react

`[observed]`, from `Why do Applets and connections get disabled?`, and this is the best-framed failure policy in the batch:

> "IFTTT has several checks in place to make sure things are running smoothly. We know that **nothing on the web has 100% uptime (even us!)**, so we won't just disable an Applet or connection if it failed once or twice. However, if an Applet or connection ends up consistently failing the following checks though, it may be automatically disabled."

The paragraph **leads with the restraint, not the rule**. Before naming a single disable criterion it establishes (a) that failure is normal, (b) that IFTTT fails too, and (c) that one or two failures will not cost you anything. Only then does it state the three criteria:

- "One of the services in the Applet or connection has an authentication failure"
- "The trigger check consistently fails"
- "The action part of the Applet or connection fails to continually run (*note: skips and rate limits do not count towards this*)"

**The parenthetical exclusion is the most useful clause** — it tells the user that the two most common non-error outcomes (`skipped`, `Usage limit exceeded`) will not get their Applet killed. Compare Zapier's "95% of runs in 7 days", which is precise but gives no such reassurance.

Then the recovery framing: "These Applets or connections can be re-enabled at any point, **but they may get disabled again if the underlying issue remains**." Reversible, with the condition on the reversal stated.

**Defect:** "if an Applet or connection ends up consistently failing the following checks **though**, it may be automatically disabled" — a stray "though" mid-sentence after "However" has already opened the clause. Two concessives in one sentence.

### Named error strings and the remediation ladder

`[observed]`, from `Common errors and troubleshooting tips`. Two literal error strings are quoted:

- **`IFTTT Network Error`** — the generic string a user sees in the Activity feed. The remedy is to "refresh your connection to the service", with a four-step path: `ifttt.com/my_services` → locate the service → `⚙︎ Settings` → `Reconnect`.
- **`File Not Found`** — "This likely means that a required field in an Applet is empty or not filled out with the correct ingredient." A *display* error diagnosed as a *configuration* error, which is a genuinely non-obvious mapping and exactly the kind of thing help content should carry. It has its own vanity short link, `ift.tt/fnf`.

The article's seven remedies, in order: refresh your connection → search for service-specific tips → double-check trigger and action fields → check your Activity Feed → reset your IoT device → the File Not Found case → contact the service owner.

**The ordering is diagnostic, not alphabetical**: connection first (most common), then third-party quirks, then your own configuration, then the log, then hardware, then a specific named error, then escalation. And the escalation target is notable — **"please contact the service owner"**, not IFTTT. "Most services on IFTTT have tools to help them diagnose user issues as they come up."

**IFTTT's support strategy is to route failures to the third party**, and it says so twice, with a reusable search string: "You can often locate a service's support info by searching for **[service name] IFTTT help** online." A vendor teaching users a Google query as a support channel is unusual, cheap, and probably effective. It also appears twice in one short article, which suggests it is a deliberate deflection pattern rather than an aside.

The Reddit community (`r/ifttt`) is offered *before* contacting support, in both this article and the auto-disable article.

### Failure-related help titles

`[documented]`: `Why isn't my Applet running?` · `How to troubleshoot errors when editing an Applet` · `Why do Applets and connections get disabled?` · `How to stop Applets or connections that you can't locate from running?` · `Disconnected Applets for inactive users` · `My RSS feed isn't working or updating` · `Why is there a 'File not found' image on my post?` · `Troubleshooting outbound webhooks` · `Troubleshooting Missing Options in Dropdown Menus` · `Why the IFTTT App shows a persistent notification on Android` · `Why does the IFTTT Android app require 'Allow all the time' location permissions?` · `Do Applets run retroactively?` · `What happened to the DO mobile apps?`

Three shapes stand out:

- **`Why isn't my Applet running?`** and **`My RSS feed isn't working or updating`** — the user's first person, present tense, contracted. The Wise confession pattern, applied to system failure.
- **`How to stop Applets or connections that you can't locate from running?`** — a genuinely strange and genuinely necessary title. It documents the case where an Applet is doing something and the user cannot find it. That is a real and frightening failure mode in an automation product, and almost no vendor documents it. (The title is also ungrammatical — it is a `How to` opener with a question mark.)
- **`Why does the IFTTT Android app require 'Allow all the time' location permissions?`** and **`Why the IFTTT App shows a persistent notification on Android`** — two articles explaining *IFTTT's own intrusive behaviour* to users who are suspicious of it. Documenting the thing that makes you look bad is the right call.

**`What happened to the DO mobile apps?`** is a discontinued-product article, still live, still linked from a current section. Like Wise's removed-feature article, it is good practice: the withdrawal is documented rather than silently dropped.

**Defect in the troubleshooting article**: "This will show you are any error messages there that can help you understand what is preventing your connection from running." The sentence is garbled — `show you are any error messages there` — and it is in the paragraph telling users where to find their errors.

**Cross-reference defects.** The Activity-feed article links to "Common Applet errors and troubleshooting tips" using the slug `115010194547-Common-Applet-errors-and-troubleshooting-tips`, while the article's canonical title and slug are `Common errors and troubleshooting tips`. Conversely, the Common-errors article refers to "an [error glossary]" linking to `115004914234-Activity-feed-error-glossary-`, which resolves to `How to use the IFTTT Activity feed`. **Two articles, each linking to the other by a title that no longer exists.** Both renames left stale anchor text in the other article.

## T8 Empty states

`[observed]` — and IFTTT provides one of the few genuinely observed empty states in this whole batch.

**The Explore search no-results state**, rendered in the served HTML:

> `## No results found`
> "We couldn't find an Applet or service that matched your query. Please try again or create your own Applet."
> `Create your own Applet`

Three parts: heading names the outcome, body names both object types that were searched and offers two routes, CTA takes the constructive one. **The second route is to make the thing that does not exist**, which is the correct empty-state move for a catalogue product with a builder. Compare Wise's help-search empty state, which offers nothing.

Two smaller ones on the same page `[observed]`, functioning as pre-empty states in the browse grid rather than after a search:

> `Don't see what you're looking for?` → `Create your own Applet`
> `Haven't found the right Applet?` → `Create your own`

Both are the user's disappointment phrased as a question, and both route to `/create`. Three constructions of one idea on one page (see T3).

**Status-page empty states** `[observed]`: `No incidents reported today.` for the current day and `No incidents reported.` for every prior day. The today-variant adding "today" is a small correct touch — it distinguishes "nothing has happened yet" from "nothing happened".

**A loading state leaking as content** `[observed]`: the Explore page's `Recent` search panel and its results area both render `![Loading-dots icon](...loading-dots.gif "Loading-dots")` in the served HTML, with the alt text `Loading-dots icon` and the title `Loading-dots`. A screen-reader user or a non-JS client encounters the string "Loading-dots icon" twice under a heading reading `Recent`.

## T9 Notifications & system messages

`[observed]` and `[documented]`

**Notifications are a *service* in IFTTT, not a platform feature.** `Notifications` appears in the Related services list as a connectable service with its own icon and page (`ifttt.com/if_notifications`), and Applet titles use it as an action: `Get an IFTTT notification when you arrive home`, `Get IFTTT notification when an astronaut enters space`, `Get IFTTT notification when a stock drops in price`.

This is a distinctive architectural-content decision: **IFTTT's own push notification is modelled as a third-party-equivalent service** that you connect and use as an action, rather than as a setting. The consequence is that notification copy is entirely user-authored — the user writes the message body in an Action field — so IFTTT has no house notification voice to speak of.

Note the missing article in two of the three Applet titles: `Get IFTTT notification when…` (no "an"), against `Get an IFTTT notification when you arrive home`. Two grammars for one construction in the same catalogue.

**Applet run notifications are an explicit, toggleable, mobile-only feature** `[documented]`: the Activity feed lists "Applet run notifications (mobile only)" as one of four things the feed shows, and there is a dedicated article `Enabling and disabling Applet run notifications`. Giving users a control over "tell me every time the automation fires" is necessary in a product that can fire hundreds of times a day.

**The reminder ladder before auto-disable is documented** `[observed]`, in the `Service is offline` entry: "Expand this item and we'll help you reconnect via the service's settings page, so you can get up and running again. **If you don't reconnect, we may give you a reminder a few days later — eventually, if you don't reconnect, we'll automatically disable the service and associated Applets, so we'll try and give you enough time to fix it before we do that.**"

One sentence containing a three-stage escalation (now → a reminder in a few days → automatic disable) plus a statement of intent ("we'll try and give you enough time"). The vagueness is real — "a few days", "eventually", "try and" — and it is the opposite of Zapier's precise "72-hour grace period". IFTTT trades precision for warmth; Zapier trades warmth for precision. Both are defensible; the IFTTT version is harder to act on.

**Usage limits are described as proactively communicated** `[observed]`: "We try and make these as transparent as possible, and let you know when you're approaching a limit and when you've hit it." Two-stage warning, same as Zapier's 80%/100%, but with no numbers.

**Status-page subscription offers four channels** `[observed]`: email, SMS, support-site link, and Atom feed, with the email copy "Get email notifications whenever IFTTT **creates**, **updates** or **resolves** an incident" and the SMS copy "Get text message notifications whenever IFTTT **creates** or **resolves** an incident."

**The two channels are explicitly given different granularity** — SMS omits `updates`. Telling the user which lifecycle events each channel will and will not send, in the subscribe copy, before they subscribe, is a small excellent piece of notification design. The three verbs (`creates`, `updates`, `resolves`) are also the incident lifecycle vocabulary, surfaced at the subscription point.

**Live incident copy** `[observed]`, the only real incident in the visible window:

> Title: `The Jira service is currently paused`
> **Identified** — "The Jira service is paused while we address an API deprecation. Thank you for your patience."
> **Resolved** — "This issue has been resolved. Users are requested to reconnect the service by going to https://ifttt.com/jira/settings and clicking "Reconnect"."

The Identified update is three clauses: state, cause, courtesy. Naming `an API deprecation` as the cause attributes it to Jira without saying so. The Resolved update ends with an **explicit user action required after resolution** — the incident is closed but the user still has work to do, and the exact URL and the exact button label (`"Reconnect"`) are given.

**Defect, and a conspicuous one.** The `Resolved` update is timestamped `Sep 11, 04:34 PDT` and the `Identified` update is timestamped `Sep 15, 11:24 PDT` — the resolution is dated **four days before** the identification, and the incident is filed under Sep 11. The chronology on IFTTT's public incident record is impossible.

## T10 Disclosures, legal & compliance

`[observed]` — commercial only; there is no regulatory disclosure surface.

### Plans, limits and the Applet cap

| Plan | Price | Description | Key limits (verbatim) |
|---|---|---|---|
| Free (unnamed on the card) | `$0.00 / forever` | "Get started with automation." | `2 Applets` · `Standard Applet speeds` · `DIY or use published Applets` · `Unlimited Applet runs` · `Free mobile app access` · `Simple no-code integrations` · `30-day onboarding support` |
| Pro (unnamed on the card) | `$2.99 / month`, `$35.88 billed annually` | "Tools for smart home and productivity." | `20 Applets` · `Fastest Applet speeds` · `Multi-action Applets` · `Webhooks` · `Twitter Applets` · `Increased rate limits` · `Exclusive triggers and actions` · `Customer support` |
| Pro+ (unnamed on the card) | `$8.99 / month`, `$107.88 billed annually` | "Limitless possibilities for small business owners." | `Unlimited Applets` · `Everything in Pro` · `AI services` · `Connect multiple accounts` · `Use queries and filter code` · `Prioritized customer support` |

**Defect: the plan cards do not display plan names.** Each card's heading position renders only the IFTTT logo twice (`IFTTTIFTTT`). The names `Pro` and `Pro+` appear only in the FAQ answers, the URL slugs (`/subscriptions/pro`, `/subscriptions/pro_plus`), and the sticky bar. On the pricing page itself, three unlabelled cards are distinguished only by price and description. In a text-only or screen-reader rendering, the tier names are absent.

**The billing toggle is `Monthly Yearly SAVE 40%`** — and the Pro annual figure ($35.88 = $2.99 × 12) shows **no annual discount at all** relative to the displayed monthly rate. Either the displayed monthly price is already the annualised rate, or the 40% applies to an undisplayed monthly price. The page does not resolve it.

**`Unlimited Applet runs` on the free tier** is the notable disclosure, and it is the inverse of Zapier's model: IFTTT caps the *number of automations* and gives unlimited *executions*; Zapier gives unlimited Zaps and caps *tasks*. Two products, two opposite billing units, both defensible, and the choice determines everything downstream about how each one talks about limits. IFTTT never has to explain an overage; it only has to explain a count.

**The latency tier is sold as a feature**: `Standard Applet speeds` vs `Fastest Applet speeds`, quantified only in the Glossary and the Applet badges as "every 5 minutes for Pro and Pro+ users, and once every hour for Free users". **The pricing page never states the interval.** A free user reading `Standard Applet speeds` has no way to know it means up to an hour; they learn it only on an individual Applet page or in the glossary.

**Archive semantics are a billing disclosure** `[observed]`: "Archived Applets will no longer count towards your Applet limit if you're on the Pro or free plan", and the same for deleted enabled Applets. In a product whose limit is a count, the archive is a quota-management tool, and the help article says so plainly.

**Cancellation** `[observed]`, FAQ: "You can change your plan at any time and you will have access to the Pro or Pro+ features until the end of the active billing cycle." One sentence. No refund policy is stated anywhere on the page.

**Quotas attributed to third parties** `[observed]`: "the SMS service has a limit of 100 messages a month in North America", plus a linked article `IFTTT Service Rate Limits` and the `Usage limit exceeded` feed item. IFTTT discloses other companies' limits as its own operational constraints, which is correct — the user experiences them as IFTTT failures.

**The one code-related disclosure** `[observed]`: "IFTTT was founded as a way to give everyone the ability to use the dynamic power of coding, without having to code. If you want to use code, you can utilize our advanced features in Pro+ to access filter code, conditional logic, and to publish your own API." A no-code product conceding that its advanced tier is a code product, in the answer to `Is coding required to use IFTTT?`.

**Data and privacy** `[observed]`: the marketing footer's only legal link is `Privacy`; the help footer's is `Terms & Privacy` as one item. The Android permission article (`Why does the IFTTT Android app require 'Allow all the time' location permissions?`) is the closest thing to a privacy explainer in the help IA, and `Why the IFTTT App shows a persistent notification on Android` is the second.

**No accessibility statement, no security page, no trust centre, no compliance certifications** were found on any reachable surface. `[absent]`

## T11 Help-centre architecture

`[observed]`

**Four categories, three sections under `Applets`, and roughly 46 visible article titles.** It is a small help centre and it is organised by *object*, not by task: `Account`, `Applets`, `Services`, plus a tutorials bucket.

**Sections under `Applets`** `[observed]`, each with its own description:

| Section | Description (verbatim) | Article count |
|---|---|---|
| `Creating and managing Applets` | "Create, manage, troubleshoot, and publish your Applets" | 26 |
| `Filter code` | (no description shown) | 11 |
| `IFTTT mobile apps` | (no description shown) | 9 |

**`Filter code` as a top-level help section**, with eleven articles, is notable — it is the only section devoted to writing code, in a product whose founding proposition is not writing code. Its article titles are overwhelmingly recipe-shaped rather than reference-shaped: `How to create a Google Calendar event only on weekdays or business hours` · `Can I make my Applets run only at certain times?` · `Example Applets using queries and filter code` · `Filter code generators` · `Parsing JSON body with filter code` · `Building with filter code` · `How to add filter code`.

**`Filter code generators`** is the interesting one — IFTTT ships tooling to write the code for you, and documents it inside the code section, which is the correct placement of an escape hatch.

### Article-title grammar — five shapes

| Shape | Examples |
|---|---|
| `How do I …?` | `How do I edit an Applet?` · `How do I turn off or archive an Applet?` · `How do I manage or add new widgets on my device?` · `How do I configure the Google Drive Folder Path?` |
| `How to <verb>…` | `How to create multi-action Applets` · `How to add a delay to an IFTTT action` · `How to use the IFTTT Activity feed` · `How to store and use variables in your Applets with DataStore` |
| `Can I …?` / `Do …?` / `Why …?` (eligibility and explanation) | `Can I delete an Applet?` · `Do Applets run retroactively?` · `Why isn't my Applet running?` · `Why do Applets and connections get disabled?` · `Why does the IFTTT Android app require 'Allow all the time' location permissions?` |
| `What is X?` / `What is the difference between X and Y?` | `What is a Pro/Pro+ Applet?` · `What is the difference between the PublicUrl and TemporaryUrl ingredients?` · `What is the difference between polling Applets and realtime Applets?` · `What happened to the DO mobile apps?` |
| Bare noun / gerund | `Glossary` · `Applet Publishing Guide` · `Disconnected Applets for inactive users` · `Troubleshooting outbound webhooks` |

**The question-shaped titles dominate**, and roughly half are yes/no or why questions rather than how questions. That is the right distribution for a consumer product where the dominant help need is "is this possible" and "why did this happen", not "give me the steps".

**Two dedicated disambiguation articles** — `What is the difference between the PublicUrl and TemporaryUrl ingredients?` and `What is the difference between polling Applets and realtime Applets?` — both titled as the comparison rather than as either term. Same pattern as Dropbox Sign's `templates vs template links`, and same value.

### Content furniture

Every article carries a **creation date and an `Updated` marker** (`August 19, 2026 17:41` / `Updated`), a `How to contact support` link, a `Return to top` link, and five `Related articles`. **There is no "Was this article helpful?" widget anywhere** — unusual, and it means IFTTT collects no per-article content-quality signal on the public surface, in contrast to Zapier (which publishes the raw ratio) and Dropbox (which offers a three-reason taxonomy).

Related-article links are wrapped in base64-encoded tracking URLs (`/hc/en-us/related/click?data=BAh7Cjob…`), so the destination is opaque in the markup and the link text is the only signal.

### Defects in the help IA

1. **`Glossary` and `Common errors and troubleshooting tips` are filed under `Account` → `Basics`**, not under `Applets`. The two most conceptually important articles in the product are in the account-management bucket, and neither surfaces on the `Applets` category page.
2. **Two articles reference each other by retired titles.** The Activity-feed article links to `Common Applet errors and troubleshooting tips`; the actual title is `Common errors and troubleshooting tips`. The Common-errors article links to `Activity-feed error glossary`; the actual title is `How to use the IFTTT Activity feed`.
3. **Two broken relative links in `How do I turn off or archive an Applet?`** — `My Applets` is linked twice as `https://help.ifttt.com/hc/en-us/articles/ifttt.com/my_applets`, a help-centre path with a bare domain appended. Both instances are broken.
4. **A self-referential anchor**: the `Can I delete an Applet?` link in the same article points to `1500000526422-Can-I-delete-an-Applet-` with a trailing hyphen, while the canonical slug has none.
5. The help-centre header's only product link is unlabelled and points at `/discover`, a path the marketing site does not use.
6. `Applet Publishing Guide` is deep-linked with a URL-encoded fragment `#What%E2%80%99saPublishedApplet?` — a curly apostrophe inside an anchor ID.
7. The `Applets` category page shows six articles per section with a `See all 26 articles` link — so twenty of twenty-six `Creating and managing Applets` articles are invisible at category level.

## T12 FAQs

`[observed]` — one block, on the plans page, under `### Frequently Asked Questions`.

| # | Question (verbatim) |
|---|---|
| 1 | What is IFTTT? |
| 2 | What are Applets? |
| 3 | Is coding required to use IFTTT? |
| 4 | Which plan is right for me? |
| 5 | What are developer tools? |
| 6 | Can I change or cancel my plan? |

**Six questions, and the first two are definitional.** Like Zapier, IFTTT teaches the vocabulary on the pricing page — but it teaches only *two* terms (the company and the Applet) where Zapier teaches five. That difference tracks the difference in the products: IFTTT's model is one object, Zapier's is four.

**Q1's answer is a positioning statement, not a definition** — "IFTTT is a leading connectivity platform that helps millions of people and thousands of businesses turn their products into integrated, connected services. We created a standard, low-code way for the diverse apps and services across the world to communicate." Note `low-code`, which contradicts the Q3 answer's "without having to code" and the site's `Simple no-code integrations` bullet. **`low-code` / `no-code` / `without having to code` — three positions on the same axis, two of them on the same page.**

**Q2 is the best answer in the set** — "An Applet connects two or more apps or devices together **in remarkable, seamless ways**. It enables users, like you, to experience compatibility and customization **that didn't exist before**. Applets are powered by the APIs of your favorite brands and businesses."

Three sentences: what it does, what it gives you, what powers it. "It enables users, like you" is an awkward interpolation, and "remarkable, seamless ways" is unearned adjective, but the third sentence — naming APIs on a consumer pricing page — is a real transparency choice.

**Q4, `Which plan is right for me?`, is the only answer structured as a decision procedure**: free "for anyone wanting to take their first step into the world of automations"; Pro "if you own multiple smart devices, are interested in building with multiple actions, or are looking for faster Applet speeds"; Pro+ "if you want advanced features, like filter code, or access to developer tools." Each branch is a **user situation**, not a feature list. This is the right shape for a plan-selection question and it is better than the plan cards above it, which list features.

**Q5, `What are developer tools?`, does not answer its own question** — "Expose and expand the reach of your API to an ecosystem of 32M users, thousands of developers, and over 1,000 services. Pro+ gives you access to our Platform." A user who did not know what developer tools were still does not. And it introduces `Platform` (capitalised) as a product name that appears nowhere else on the page.

**Q6 conflates change and cancel** — the question asks both, the answer addresses only change: "You can change your plan at any time and you will have access to the Pro or Pro+ features until the end of the active billing cycle." Cancellation mechanics and refunds are absent.

**Absent from the FAQ**, notably: what happens to your Applets if you downgrade below the Applet cap; what `Standard Applet speeds` means in minutes; whether Applets keep running if you stop paying.

## T13 Terminology & glossary

**PRIORITY SECTION.** IFTTT publishes a `Glossary` article defining sixteen terms, plus inline glossary badges on live Applet pages linking to `ift.tt/glossary-*` short URLs.

| Term | IFTTT's definition (verbatim or close) | The alternative it rejected |
|---|---|---|
| **`Applet`** | "An Applet connects two or more services together, enabling them to do things that they wouldn't be able to do alone." Composed of "Triggers, queries, and Actions" | **`Recipe`** — the original term, retired ~2016. See below |
| **`Service`** | "Services are the basic building blocks of IFTTT." Examples: Facebook, Twitter, Fitbit, Gmail | **`Channel`** — the original term, and it survives in live image URLs: `assets.ifttt.com/images/**channels**/1620619676/icons/…`. Also rejected: `app` (Zapier's word) and `integration` |
| **`Trigger`** | "the data that, when changed, prompts an Applet to run" | "event", "if", "when". Note IFTTT defines the trigger as **the data**, not the event — the event is separately named |
| **`Trigger event`** | "the thing that causes a given Trigger to fire" | |
| **`Trigger check`** | "when IFTTT checks for new Trigger events" | "poll" |
| **`Action`** | "the work that IFTTT initiates when a Trigger fires" | "then", "task", "step" |
| **`Query`** | "a way to request additional data if the Trigger doesn't provide it. Queries run immediately after Triggers, but before filter code." | "lookup", "search step" |
| **`Ingredient`** | "Triggers and queries contain ingredients – individual pieces of data" | **"variable", "token", "field value"** — the cooking metaphor is the signature IFTTT coinage |
| **`Trigger field` / `Query field` / `Action field`** | Three separately defined field families | One "field" concept |
| **`Filter code`** | "a bit of JavaScript (TypeScript) code that runs right after a Trigger fires, allowing you to apply conditional logic" | "script", "expression", "conditions" |
| **`Applet run`** | "Every time a new Trigger event is detected, IFTTT will execute the Applet, pushing the data from the Trigger over to the Action(s)" | "execution", "task" |
| **`Applet ID`** | "an 8-character alphanumeric identifier" | |
| **`Polling Trigger`** / **`Realtime Trigger`** | The two firing modes, each with its latency stated | "webhook trigger", "instant trigger" (Zapier's word) |
| **`Connection`** | Not in the Glossary, but used constantly as a near-synonym for Applet: `Applets and connections`, `stop Applets or connections`, `Why do Applets and connections get disabled?` | See the defect note below |
| **`Multi-action Applet`** | A Pro feature; has its own help article | "multi-step" (Zapier's word) |
| **`DataStore`** | Named variable storage, with its own article | |
| **`Button widget` / `Note widget` / `Camera widget`** | Three named device widgets that are also *services* | |
| **`Webhooks`** (as `maker_webhooks`) | A service; the URL slug preserves the retired **`Maker`** brand | `Maker` — a retired term surviving in `ifttt.com/maker_webhooks` |
| **`DO`** | Retired standalone mobile apps, documented in `What happened to the DO mobile apps?` | |
| **`Published Applet`** vs **DIY Applet** | Two provenance classes with different lifecycles | |
| **`paused`** | A service temporarily withdrawn | "outage", "disabled" |
| **`Automations`** / **`workflows`** | Both used as generic synonyms for Applets in marketing copy (`Explore automations built by the IFTTT community`, `Create your own Weather Underground and Philips Hue workflow`) | |

### `Ingredient` is the best coinage in this batch

Zapier calls the same thing a mapped field. Dropbox Sign calls it a merge field. IFTTT calls it an **ingredient**, and the metaphor pays for itself three times over:

- An ingredient is **something you have**, and a field is **a slot you fill** — the asymmetry encodes the direction of data flow without a diagram.
- Ingredients are **countable and listable** — the Applet page just lists them (`SunsetAt TempFahrenheit TempCelsius …`) and the metaphor makes an undifferentiated token list feel like a pantry.
- The metaphor **extends cleanly**: the original term for an Applet was `Recipe`, and triggers/actions were the method. When `Recipe` was retired, `Ingredient` survived — so the product now has an orphaned metaphor whose parent term is gone.

That orphaning is worth flagging as a real content-debt finding: `Ingredient` only makes intuitive sense if you remember that these things used to go into a Recipe. To a new user in 2026 it is an arbitrary word.

### The `Recipe` → `Applet` rename is complete in copy and incomplete in infrastructure

`[observed]`. The word `Recipe` does not appear in any body copy across twelve pages. But:

- The `/explore` page's **meta-keywords still include `recipes`**: `ifttt applets connect connections integrate integration automate automation services recipes trigger action ifthisthenthat free`.
- Image URLs use `channels` for what are now `services`: `assets.ifttt.com/images/**channels**/59109479/icons/…`.
- The Webhooks service slug is `maker_webhooks`, preserving the retired `Maker` brand.
- A live help article documents the retired `DO` apps.

So three generations of naming coexist in the URL and metadata layer while the visible copy is clean. That is the correct priority order — copy first, infrastructure last — but the meta-keywords are a content artefact, not an infrastructure one, and `recipes` sitting in them is a copy miss.

### `Applet` vs `connection` is an unresolved live ambiguity

This is the most significant terminology defect. The Glossary defines `Applet` and does **not** define `connection`. Yet `connection` appears throughout the help centre as a coordinate term:

- `Why do Applets and connections get disabled?`
- `How to stop Applets or connections that you can't locate from running?`
- "Select the Applet or connection and click or tap the connected button"
- "what is preventing your connection from running"
- Explore cards link some items to `/connections/<id>` and others to `/applets/<id>` — for example `Sync Evernote and Todoist` resolves to `ifttt.com/connections/wZNtTHJQ-…` while every other card in the same grid resolves to `/applets/…`

So there are two object types, two URL namespaces, and one of them is undefined in the glossary while being used in article titles. A user cannot tell whether their thing is an Applet or a connection, and the help content addresses both without distinguishing them.

Compounding it, `Connect` is the button, `connected` is the button's other state, `Service connected` is a feed event, and `connection` is an object. Four uses of one root for four different things.

### Vocabulary comparison with Zapier (the same problem, solved differently)

| Concept | IFTTT | Zapier |
|---|---|---|
| The automation | `Applet` | `Zap` / `Zap workflow` |
| The connected app | `Service` | `App` |
| The starting event | `Trigger` | `Trigger` |
| The result | `Action` | `Action` |
| A data item | `Ingredient` | mapped field |
| Conditional logic | `Filter code` (JavaScript) | `Filter` (no-code) + `Paths` |
| One firing | `Applet run` | `Zap run` |
| The billing unit | **the Applet itself** (counted) | **the task** (metered) |
| Extra data lookup | `Query` | search action |
| Instant vs delayed | `Realtime Trigger` / `Polling Trigger` | `Instant` / polling |

The two products agree exactly on `Trigger` and `Action` — the two terms the whole industry inherited from IFTTT — and diverge on everything else. IFTTT's set is smaller (no `step`, no `path`, no `task`, no `filter` as a no-code object) because its model genuinely is simpler: one trigger, optional query, optional filter code, one or more actions, no branching.

## T14 Voice, tone & accessibility

`[observed]`

**Person and tense.** Second person for the user, first-person plural for IFTTT, and the plural is used with unusual warmth and frequency: "we'll put this confirmation in your activity feed", "we'll give you the good news", "we'll try and give you enough time to fix it", "we can't prevent 100% of these, but know that we see them", "We know that nothing on the web has 100% uptime (even us!)".

**IFTTT is the most colloquial product in this batch by a distance.** `Uh oh!` · `triumphant return` · `Let's break it down:` · `It's not necessarily bad news` · `(temporary!)` · `(even us!)` · `Your Applet ran as expected!` · `No problem.` · `Never be left in the dark.` · `Build an automation in seconds!` · `Automate more, effortlessly.`

Six exclamation marks across four help articles — more than every other product in this batch combined. And they are concentrated in the **failure documentation**, which is unusual: `Uh oh!` opens the `Service is offline` entry, `(temporary!)` softens an API failure, `(even us!)` concedes IFTTT's own downtime.

**This inverts the standard tone gradient.** Wise, DocuSign and Zapier all flatten their register as stakes rise. IFTTT gets *chattier* in failure copy. That is defensible for a consumer product where the worst outcome is that a lightbulb did not turn on, and it would be indefensible for a payments product. The condition on transferring any of this is the size of the consequence.

**The warmth is doing structural work in one place.** The `Why do Applets and connections get disabled?` opening — "We know that nothing on the web has 100% uptime (even us!), so we won't just disable an Applet or connection if it failed once or twice" — uses self-deprecation to establish a shared premise before delivering a punitive policy. The joke is the argument.

**Register split by surface.** The Glossary is flat and definitional with zero colloquialism across sixteen entries. The Activity-feed article is chatty throughout. The plans page is corporate-marketing. Three registers in one help centre, and the split tracks the reader's state: defining (flat), diagnosing (warm), buying (promotional).

**Sentence case throughout** for headings, with two exceptions in article titles: `How to Assign a Default or Fallback Featured Image when using an Image Ingredient` and `Troubleshooting Missing Options in Dropdown Menus` are Title Case while every neighbour is sentence case.

**Accessibility content** `[observed]`

- **No `skip to content` link was found** on `ifttt.com/explore`, `/plans`, or the Applet page. Every other product in this batch ships one. `[absent]`
- **No accessibility statement, VPAT, or conformance claim** anywhere. `[absent]`
- **Service icon alt text on the Applet page is genuinely good and context-aware**: the two header icons carry `Philips Hue Turn on lights.` and `Weather Underground Sunset.` — the service name plus *the specific trigger or action this Applet uses it for*. That is more informative than the visual, which is just a logo. Elsewhere on the same page the same icons carry the plain form (`Philips Hue icon`, `Weather Underground icon`), so the enriched version is used exactly where it adds meaning.
- **Explore grid alt text is poor.** Applet cards render as link text of the form `- Spotify Save new Spotify Discover Weekly songs to an archive Spotify 126k` — a leading hyphen (the service-icon placeholder), then a duplicated service name, then the title, then the author, then a bare number. The `126k` has no label, so a screen-reader user hears a number with no indication that it is an install count. Some cards render the placeholder as `*` instead of `-` (`* Weather Underground * Notifications Get the weather forecast…`), so the same component produces two different bullet characters.
- **Loading placeholders are exposed**: `![Loading-dots icon](…)` with title `Loading-dots`, twice on `/explore`.
- **The help-centre header's product link has no accessible name at all** — `[](https://ifttt.com/discover)`.
- The status-page component rows render as `IFTTT.com ?`, `IFTTT mobile apps ?`, `Applet performance ?` — the `?` is a tooltip trigger with no text alternative.
- **Positive**: the status-page subscription flow labels its fields plainly (`Email address:`, `Country code:`, `Phone number:`, `Enter OTP:`) and includes `Didn't receive the OTP?` / `Resend OTP` with a visible countdown — a well-constructed OTP micro-flow, fully labelled.
- App-store badge alt text is descriptive (`Download on the App Store`, `Get it on Google Play`), and the awards images carry `App Store Editor's choice` and `4.5 out of 5 stars`.
- Social icons carry the platform name as both alt and title (`Facebook`/`Facebook`), producing a doubled announcement.

**Negative findings, recorded honestly**

1. **`connection` is used as a coordinate term to `Applet` in article titles and body copy but is never defined in the Glossary**, and the two have separate URL namespaces (`/applets/…` and `/connections/…`) that the Explore grid mixes.
2. `Connect` (button) / `connected` (button's other state, which you click to disconnect) / `Service connected` (event) / `connection` (object) — four uses of one root.
3. The on/off control is labelled with its **current state** rather than its action.
4. `Create your own Applet` / `Create your own` / `Create your own Applet from scratch` — three labels, one destination, one page.
5. `Try it free` and `Try it today` on the same pricing page.
6. **Plan names (`Pro`, `Pro+`) do not appear on the plan cards** — each card's heading renders as `IFTTTIFTTT`.
7. `Monthly Yearly SAVE 40%` toggle, but Pro's annual figure ($35.88) is exactly 12 × the displayed monthly price ($2.99) — no discount visible.
8. `Standard Applet speeds` is sold on the pricing page without ever stating the interval; the "up to one hour" figure appears only in the Glossary and on Applet pages.
9. `low-code` (FAQ Q1) vs `no-code` (Free plan bullet) vs "without having to code" (FAQ Q3).
10. User-count claims disagree: `32M users` (plans FAQ) vs `10M+ Downloads` (Applet page).
11. Service count rendered three ways: `Over 1,000`, `1,000`, `1000+`.
12. **Glossary factual error**: the `Applet ID` entry states an ID (`pc6CeRjs`) that does not match the Applet it links to (`YfkYtQB2`).
13. Ingredient token casing is inconsistent within one list: `ConditionImageURL` vs `ForecastUrl`.
14. `Get IFTTT notification when…` (no article) vs `Get an IFTTT notification when…` in the same catalogue.
15. `every thing` as two words in two places — a pun that reads as a typo.
16. **Status-page chronology is impossible**: the `Resolved` update is timestamped Sep 11, the `Identified` update Sep 15.
17. Two articles link to each other by titles that no longer exist (`Common Applet errors and troubleshooting tips`; `Activity-feed error glossary`).
18. Two broken links in one article: `https://help.ifttt.com/hc/en-us/articles/ifttt.com/my_applets`.
19. "This will show you are any error messages there" — garbled sentence in the troubleshooting article.
20. "if an Applet or connection ends up consistently failing the following checks **though**" — double concessive after "However".
21. "with a maximum of 100 of the most recent items., and they cannot be removed" — stray `.,`.
22. `Glossary` and `Common errors and troubleshooting tips` are filed under `Account`, not `Applets`.
23. Help-centre header link has **no accessible name** and points at `/discover`, a path unused by the marketing site.
24. Footer `Search` and `Explore` link to the same URL.
25. `recipes` still present in the `/explore` meta-keywords; `channels` in live image URLs; `maker_` in the Webhooks slug.
26. Loading placeholders (`Loading-dots icon`) exposed in served HTML.
27. Explore card link text renders an unlabelled install count and inconsistent bullet characters (`-` vs `*`).
28. **No skip link, no accessibility statement, no VPAT, no "was this helpful?" widget.**

---

## Transferable patterns

1. **Encode the mental model in the name, then split the name to teach the terms.** `"If this" trigger happens, "then that" action follows.` One sentence maps a phrase the user already knows onto two technical nouns. Condition: only available if your brand or feature name already carries the structure — but where it does, this is free pedagogy that no competitor can copy.
2. **Render the conditional as layout, not as labels.** The Applet page puts a bare `If` above the trigger block and a bare `Then` above the action block. The words `Trigger` and `Action` appear only in badges. The user reads a sentence; the vocabulary is available on demand.
3. **Put the latency or cost disclosure inside the component badge, at the point of decision.** The `Polling trigger` badge on a public Applet page states "every 5 minutes for Pro and Pro+ users, and every hour for Free users" *before* the user clicks `Connect`. Disclosure attached to the object rather than to a pricing page.
4. **Lead a punitive policy with the restraint, not the rule.** "We know that nothing on the web has 100% uptime (even us!), so we won't just disable an Applet if it failed once or twice." Establish that occasional failure costs nothing, then state the threshold. And name the exclusions (`skips and rate limits do not count towards this`) — that clause does more reassurance work than the threshold itself.
5. **Distribute blame explicitly across the five causes of a failure.** `Applet failed` attributes cause 1 to the user's code, causes 2–4 to third parties, and cause 5 to IFTTT, including the admission "we can't prevent 100% of these". Users tolerate failure they can attribute; they do not tolerate failure that seems to have no owner.
6. **Use three different words for three different failure owners.** `paused` (the third-party service withdrew), `offline` (your connection broke), `Partial Outage` (we broke). Maintained consistently across the status page, the feed vocabulary, and incident copy.
7. **Tell the user which lifecycle events each notification channel will send, at the subscribe point.** Email gets `creates`, `updates`, `resolves`; SMS gets `creates`, `resolves`. Stating the difference before subscription is cheap and prevents the "why didn't you text me" complaint.
8. **Empty state = name the outcome, name what was searched, offer the constructive route.** "We couldn't find an Applet or service that matched your query. Please try again or create your own Applet." Both object types named, both routes offered.
9. **A metaphor that extends is worth more than a precise term — but it dies if you retire its parent.** `Ingredient` beats "mapped field" because it encodes the direction of data flow. It is also now orphaned, because `Recipe` was retired. If you build a metaphor family, do not remove the root.
10. **Watch the state name that covers both "we chose not to" and "we could not".** IFTTT's `Applet skipped` and Zapier's `Filtered` have independently converged on the same defect. Two products, same failure, arrived at separately — audit any state whose name asserts intent.
11. **Label buttons with the verb, not the state.** IFTTT's `Connect` → `connected` toggle is the counter-example: the user must click a label that says the thing is already on in order to turn it off.
12. **Document the thing that makes you look bad.** `Why does the IFTTT Android app require 'Allow all the time' location permissions?` and `Why the IFTTT App shows a persistent notification on Android` both exist because users are suspicious, and the articles address the suspicion rather than the mechanics.

## Caveats & gaps

- **The homepage (`ifttt.com/`) was not fetched.** `/explore` carries the identical global nav and footer and a fuller search panel, so the IA is well evidenced, but the homepage hero headline, hero subhead, and any homepage-only value-proposition copy are **unharvested**.
- **Everything inside the product is `[documented]`, not observed.** The Applet composer, `My Applets`, the Activity feed itself, the archive, the service settings page, error toasts, and every in-product empty state are behind auth. The sixteen Activity-feed items and the `Connect`/`connected` toggle come from help-centre prose describing the UI.
- **Only one live Applet page was harvested.** The `If`/`Then` structure, badge glosses, and ingredient lists in T4/T5/T6 come from a single Philips Hue + Weather Underground Applet. Multi-action Applets, Applets with queries, and Applets with filter code would show additional structure that was not observed.
- **`connections` pages were not harvested.** Explore links some items to `/connections/<id>` rather than `/applets/<id>`, and `connection` is used throughout the help centre as a coordinate term to `Applet`. I did not fetch a `/connections/` page, so I cannot say how its layout or copy differs from an Applet page. The ambiguity recorded in T13 is therefore observed but not resolved.
- **Filter code, developer platform and MCP are unexamined.** `ifttt.com/docs/api_reference`, `ifttt.com/developers`, `ifttt.com/mcp`, and the eleven `Filter code` articles were not opened. The `Building with filter code` article, which is where the conditional-logic teaching for advanced users lives, was not fetched.
- **No email copy.** Reminder emails before auto-disable, Applet-run notifications, and usage-limit warnings are described by their triggers only.
- **No pricing detail beyond the three cards.** There is no feature-comparison matrix on `/plans`; the bullets on each card are the entire specification. Business/enterprise pricing is behind `Learn more` → `/developers`, unharvested.
- **`Current outages` (article 360011692914) was not fetched** — only the status page. The help-centre's own outage article may carry different conventions.
- **Locale is en-US only.** The help centre appears to exist only at `/hc/en-us`; no language switcher was found on any surface.
- **No accessibility statement, security page, trust centre, or compliance page was found.** Recorded as absent rather than as non-existent, but nothing in the footer, help centre, or pricing page points to one.
- **Some Explore-grid strings are link-text reconstructions**, not clean labels. Card text was extracted as concatenated link text (`- Spotify Save new Spotify Discover Weekly songs to an archive Spotify 126k`), so the Applet titles quoted in T4 are confident but the surrounding card furniture (author label, count label) is inferred from position, not from visible labels.

## Sources

1. https://ifttt.com/explore
2. https://ifttt.com/plans
3. https://ifttt.com/applets/PVkgiLYy-automatically-turn-your-lights-on-at-sunset
4. https://help.ifttt.com/hc/en-us
5. https://help.ifttt.com/hc/en-us/categories/4725187873819-Applets
6. https://help.ifttt.com/hc/en-us/sections/4725315362715-Creating-and-managing-Applets
7. https://help.ifttt.com/hc/en-us/articles/4411016949403-Glossary
8. https://help.ifttt.com/hc/en-us/articles/115004914234-How-to-use-the-IFTTT-Activity-feed
9. https://help.ifttt.com/hc/en-us/articles/115010194547-Common-errors-and-troubleshooting-tips
10. https://help.ifttt.com/hc/en-us/articles/360014195734-Why-do-Applets-and-connections-get-disabled
11. https://help.ifttt.com/hc/en-us/articles/115010361468-How-do-I-turn-off-or-archive-an-Applet
12. https://status.ifttt.com/
