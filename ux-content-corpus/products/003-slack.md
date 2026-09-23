# 003. Slack

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Team messaging / channel-based collaboration hub, now positioned as an "AI work platform" with agents |
| Primary URL | https://slack.com/ |
| Corpus rank | 003 |
| Benchmark strength (source list) | Onboarding, notifications, recovery |
| Locale / market observed | en-US (14 locales offered via a "Change Region" modal; help centre localises article slugs too) |
| Platform observed | Web (desktop), help centre (Zendesk-backed), status page, accessibility page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | HIPAA support, e-discovery, legal holds, data residency, Enterprise Key Management, DLP/SIEM, audit logs, information barriers, Discovery APIs; **DORA** ICT-incident notification opt-in named on the status page; SCA (Strong Customer Authentication) for purchases; Salesforce-operated privacy-request flow; CCPA "Your Privacy Choices" control |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Partial — the `/pricing` page HTML exceeded the fetch tool's response limit and only its head was returned, so plan-tier naming and the full feature matrix are **not** captured. Everything else is full; a live incident banner was active during harvest, which enriched T9 considerably |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://slack.com/ | Hero, four-pillar section, "What's new" block, stats, announcement bar |
| Pricing | https://slack.com/pricing | **Truncated by tool output limit** — only `<head>` and nav returned; recorded as blocked-by-size in Caveats |
| Paid vs. Free | https://slack.com/pricing/paid-vs-free | Upgrade framing, two contradictory comparison blocks, 5-question FAQ |
| Help centre home | https://slack.com/help | Six top-level categories with scope tooltips; **live incident banner**; Agentforce-powered search with three seeded queries |
| Help category: Getting started | https://slack.com/help/categories/360000049043 | Four sub-sections, onboarding split by role |
| Help category: Using Slack | https://slack.com/help/categories/200111606 | Eleven sub-sections, ~110 article titles — richest task-phrasing source |
| Help category: Your profile & preferences | https://slack.com/help/categories/360000047906 | Three sub-sections, ~56 titles; the notification and preference vocabulary |
| Help category: Workspace administration | https://slack.com/help/categories/200122103 | Nine sub-sections, ~170 titles; admin/compliance vocabulary |
| Help article: Troubleshoot connection issues | https://slack.com/help/articles/205138367-Troubleshoot-connection-issues | **Highest-value page** — an error-string-to-issue mapping table with five verbatim error messages and their recovery paths |
| Help article: Configure your Slack notifications | https://slack.com/help/articles/201355156-Configure-your-Slack-notifications | The full notification-settings label inventory across three platforms |
| Accessibility | https://slack.com/accessibility | Feature list, 2-question FAQ, a published accessibility changelog |
| Status page | https://slack-status.com/ | Five-level state legend, eleven feature components, published uptime methodology |
| (Article-level feedback module) | present on both help articles above | "Was this article helpful?" flow with four negative-reason options and its own error string |

---

## T1 Navigation & IA labels

**Global nav — label + gloss, grouped under all-caps category headers** `[observed]`

Slack's Features menu is the most heavily structured nav in this five-product set: 24 items across six named groups, and every item carries a short benefit gloss on a second line.

| Group (all-caps header) | Items with glosses |
|---|---|
| `COLLABORATION` | `Channels` "Organize teams and work" · `Slack Connect` "Work with external partners" · `Messaging` "Chat with your team" · `Huddles` "Meet with audio and video" · `Clips` "Record and share updates" |
| `CRM` | `Salesforce in Slack` "Bring Salesforce into the flow of work" · `Slack CRM for Small Business` "Manage customers in Slack with the help of Slackbot" |
| `PROJECT MANAGEMENT` | `Templates` "Start any task, fast" · `Canvas` "Create rich, flexible docs" · `Lists` "Organize, track and manage projects" · `File Sharing` "Bring files to the flow of work" |
| `PLATFORM` | `Agentic Platform` "Customize, extend, and unify your tech stack in Slack" · `Apps & Integrations` "Connect your tools with Slack" · `Workflow Builder` "Automate everyday tasks" |
| `INTELLIGENCE` | `Slack Code` "Write and ship code with agents" · `AI in Slack` "Built-in AI, right where you work" · `Slackbot` "Your AI teammate" · `Agentforce` "Salesforce agents, natively in Slack" · `Enterprise Search` "Search anything. Find everything." |
| `ADMIN & SECURITY` | `Security` "Protect data, ensure compliance" · `Enterprise Key Management` "Monitor and revoke access" · `Slack Atlas` "Discover rich profiles and org charts" |

Two glosses break the pattern in interesting ways. `Enterprise Search` — "Search anything. Find everything." is two sentences and a rhetorical pair rather than a description. `Slackbot` — "Your AI teammate" is a **relationship claim**, not a capability; it is the only gloss that tells you what the thing *is to you*.

`INTELLIGENCE` as a group name is doing work `AI` would not: it houses a code product, an assistant, a Salesforce agent platform and a search product, none of which share a mechanism. Naming the group by the *benefit category* rather than the technology keeps four unlike things coherent.

**"Flow of work" is a house phrase** `[observed]` — it appears in two separate glosses ("Bring Salesforce into the flow of work", "Bring files to the flow of work") and again in the Vercel customer quote. A positioning phrase that has become a template.

**Solutions menu — two orthogonal axes, explicitly labelled** `[observed]`

`BY DEPARTMENT`: `Engineering` · `IT` · `Customer Service` · `Sales` · `Project Management` · `Marketing` · `Human Resources` · `Security`
`BY INDUSTRY`: `Manufacturing, Auto & Energy` · `Technology` · `Media` · `Small Business` · `Financial Services` · `Retail` · `Public Sector` · `Education` · `Health & Life Sciences`

Naming the axis (`BY DEPARTMENT` / `BY INDUSTRY`) rather than letting the reader infer it is the right call for a 17-item menu. `Small Business` filed under industry is the category error — it is a company size, not a sector. And `Education` links to `/solutions/distance-learning`, a slug from a superseded campaign.

**Help centre — six categories, each with a scope sentence in the `title` attribute** `[observed]`

| Category | Scope line (verbatim, from tooltip) |
|---|---|
| `Getting started` | "Everything you need to know to get started and get to work in Slack." |
| `Using Slack` | "From channels to search, learn how Slack works from top to bottom." |
| `Your profile & preferences` | "Adjust your profile and preferences to make Slack work just for you." |
| `Connect tools & automate tasks` | "Connect, simplify, and automate. Discover the power of apps and tools." |
| `Workspace administration` | "Learn how to manage your Slack workspace or Enterprise org." |
| `Tutorials & videos` | "Learning Slack made simple: tutorials, videos, and tips to get up to speed and get work done." |

The pattern is good but the **delivery mechanism is a defect**: these scope sentences live only in `title` attributes, so they surface on mouse hover and are inconsistently announced by screen readers. Compare Wise, which renders the equivalent scope lines as visible text. Slack wrote the copy and then hid it from the users most likely to need it.

Three of six category labels are second-person or possessive (`Your profile & preferences`, `Using Slack`, `Connect tools & automate tasks` as an imperative), and `Workspace administration` is the only bare noun phrase — appropriately, since it is the only one aimed at a role rather than a person.

**Footer — six groups** `[observed]`: `Product` · `Why Slack?` · `Features` · `Solutions` · `Resources` · `Company`.

`Why Slack?` as a footer group label, with a question mark, is unusual and effective — it houses the comparison pages (`Slack vs. Email`, `Slack vs. Teams`) and the segment pages. Naming a nav group with the user's own objection.

`Product` and `Features` are again separate groups (as in Linear), and `Pricing` sits in `Product` while `Security` sits in `Features`. `Contact Us` in the `Company` group links to `/help` — a contact link that resolves to a help centre.

**Status-page footer is a different, older site** `[observed]`. `slack-status.com` ships its own footer with `App Directory` (the retired name for `Slack Marketplace`), `Slack Tips`, `eBooks & Reports`, `Slack Demo`, and a `Blog` link pointing at `slackhq.com` rather than `slack.com/blog`. The status page is a separate property maintained at a different cadence, and its nav vocabulary has drifted from the main site by at least one rename cycle.

**Accessibility furniture** `[observed]`: `Skip to main content` present, first in DOM, on marketing pages (`#main_focusable`) and help pages (`#main`) — two different target IDs across the two site sections.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `All your people and AI agents working together`
> Subhead: "Slack connects your team. Slackbot multiplies what they can do."

The subhead is a **two-clause division of labour**: the product does one thing (connects), the named assistant does another (multiplies). Two sentences, two subjects, two verbs — and the second verb is the differentiator. Notably the headline contains no verb of its own; it is a noun phrase describing a state.

**Announcement bar** `[observed]`

> `Slack at Dreamforce: Slackforce Surfaces, Slackbot, and Slack Code.` → `Check out what's new.` → `Hide announcement`

An event-pegged announcement listing three product names, with a dismissal control labelled with the noun of what is being dismissed (`Hide announcement`) rather than a bare "×". Good practice.

**Rotating hero chips are imperative verb phrases** `[observed]`: `Ask Slackbot` · `Close deals` · `Plan launches` · `Chat with clients` · `Automate tasks`. Five two-word verb-object pairs, each paired with a video. The set spans an assistant action, a sales outcome, a planning task, a communication task and an automation task — deliberately non-parallel in domain so the reader finds themselves in at least one.

**Four-pillar structure — one-word pillar, imperative headline, permission-giving subhead** `[observed]`

| Pillar | Headline | Subhead |
|---|---|---|
| `Knowledge` | `Give everyone instant context` | "Get access to every file, decision, and conversation, so you can build on past work instead of recreating it." |
| `People` | `Let your people connect like people` | "Slack's conversational UI makes collaborating more approachable, whether you're working with a colleague or an agent." |
| `Process` | `Manage all your work from one place` | "Automate daily stand-ups, project updates, and approvals so your team can focus on growth instead of guesswork." |
| `Platform` | `Secure. Scaleable. Silo-free.` | "Our flexible, open platform is purpose-built for bringing the best agents and AI to every business, and can be tailored to fit however your teams work best." |

Two of four subheads end with an **"instead of X" clause** ("instead of recreating it", "instead of guesswork"), naming the waste being eliminated. That construction — benefit, then the named alternative you are escaping — is the most reusable thing in this section.

`Let your people connect like people` is the standout headline: a tautology used as a claim, with `connect` doing double duty as the product verb and the human verb.

`Secure. Scaleable. Silo-free.` breaks the pattern (three fragments, alliterative, no verb) and **contains a spelling error** — "Scaleable" should be "Scalable". A misspelling in a three-word headline on the homepage of a Salesforce-owned product is a notable defect.

**Feature sub-headlines are conversational, with two using an ellipsis that spans heading and body** `[observed]`

- `It all starts with a channel.` — "Channels are flexible, transparent spaces for working with your team, AI assistants, and agents."
- `When talking is easier than typing…` — "…hop on a huddle, our built-in video tool. With AI in Slack, your meeting notes write themselves."
- `Bring conversations out of the inbox.` — "Slack Connect lets you chat with clients and vendors in real-time, right from Slack. **Email could never.**"
- `One search to rule them all.` — "AI-powered search puts your company's entire memory at your fingertips."
- `Anyone can automate in Slack.` — "By click or by code, Slack makes it easy for anyone to build time-saving automations of their own."
- `Manage projects and tasks.` — "Track. Approve. Mark as complete. All without leaving the conversation."
- `A simpler way to get started.` — "Project manager's block? Beginning a brief? There's a template for that."
- `From Atlassian to Zoom.` — "Google Drive. ChatGPT. Vercel. Box. Asana. Workday. You name it, it works in Slack."
- `Customize Slack to fit your needs.` · `Work without worry.` — "If it's shared in Slack, it's safe."

**The ellipsis-across-the-fold construction** (`When talking is easier than typing…` / "…hop on a huddle") is the single most distinctive device on this page: the headline is the protasis and the body copy is the apodosis, so the two must be read as one sentence. It only works because the headline and body are visually adjacent, and it fails completely in a screen-reader heading list, where the reader gets a dangling conditional.

**"Email could never."** is an internet-register sentence fragment (the "X could never" meme construction) shipped in enterprise marketing copy. `One search to rule them all.` is a Tolkien reference. `There's a template for that.` is an Apple-ad reference. `Project manager's block?` coins a phrase by analogy to writer's block. This is a deliberately allusive register, and it is concentrated in the mid-page feature copy — the hero and the security copy are plain.

**"From Atlassian to Zoom."** — an A-to-Z construction as a headline for an integrations section, followed by six brand names and "You name it, it works in Slack." Alphabetical bracketing to imply completeness without claiming a number.

**Paid-vs-Free page headline** `[observed]`: `Do more with a paid Slack plan`, with subhead "Why upgrade? With paid Slack plans, there are more features, more connections, and even more collaboration." The subhead **asks the reader's question and then answers it in the same sentence** ("Why upgrade? With paid plans, there are…"). Three parallel "more" clauses, the third escalated with "even".

Section headers on that page: `Investing in teamwork pays off` · `Bring more flexibility to your productivity` · `Work faster with partners using Slack Connect` · `Get more of everything you love about Slack` · `Compare the benefits` · `Check out how other customers use Slack` · `Frequently asked questions`.

`Get more of everything you love about Slack` is the framing that makes an upsell feel like continuity rather than a gate — the paid plan is more of the same thing, not a different thing.

**Accessibility page headline** `[observed]`

> `Accessibility in Slack`
> "A pleasant Slack experience is a 'need to have,' not a 'nice to have.' That's why we're making sure everyone can use Slack, in whatever ways fit them best."

The `need to have` / `nice to have` inversion is the whole argument in nine words, and it is aimed at the internal-prioritisation vocabulary that usually deprioritises accessibility. Best single sentence in this harvest.

**Stats are footnoted individually** `[observed]`: `5 hours` "average time saved weekly with Slackbot¹", `35%` "increase in time saved due to automations for Slack users²", `94%` "of users seeing positive ROI¹", `312%` "ROI over three years³", `$51M` "in collaboration gains³", `1B+` "Messages sent daily⁴", `4M` Slack Connect users weekly⁵, `3M` `Daily Workflows`⁵, `1.7M` apps weekly⁵, "leader in over 290 G2 market reports⁶".

Six numbered footnotes at the page foot, each naming its source and vintage — `Salesforce Internal`, `FY24 Customer Success Metrics. Base: Total n = 247-1,696`, `2026 Forrester Total Economic Impact Study`, `FY26 Earnings Remarks`, `FY25 Slack internal data`, and a G2 report list. Disclosing sample size (`n = 247-1,696`) and the fact that a figure is internal is more rigour than most marketing pages carry. The Paid-vs-Free page goes further with "± 2% margin of error at 95% CI (December 2021)" — though it also **misattributes footnote 1 to two of its four stats that are marked ²**, so the footnote mapping on that page is broken.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Nav (primary), hero, footers, closing blocks | Dominant label; appears with at least eight different `entry_point` query values (`nav_menu`, `home_page`, `help_center`, `page_home`, `page_paid_vs_free`, `pricing_comparison`, `accessibility`, `footer`) — same label, tracked by placement |
| `Get Started` | Homepage mid-page CTA pair | **Title-case variant of the above, on the same page** |
| `Sign in` | Nav | |
| `Sign In` | Help centre nav | Title-case variant |
| `Sign Up For Free` | Help centre nav | Third registration label |
| `Sign Up` | Help centre mobile nav | Fourth |
| `Request a demo` | Nav, closing blocks | |
| `Talk to sales` | Accessibility page nav and closing block | **Different label for the same action as `Request a demo`** |
| `Find your plan` | Hero (secondary) | |
| `Find Your Plan` | Homepage mid-page | Title-case variant |
| `Compare pricing` / `Compare plans` | Paid-vs-Free hero and closing | Two labels, same destination |
| `See full details on our pricing page` | Paid-vs-Free, below the table | Fully specific |
| `Watch demo` | Nav utility strip (three times, once per menu) | |
| `Download Slack` | Nav utility strip (three times) | |
| `See all features` / `See all solutions` / `See all templates` / `See all updates` / `See all customer stories` | Section and menu footers | Consistent `See all X` family |
| `Browse marketplace` | Marketplace menu | |
| `Learn more` | Nav FEATURED slot, homepage resource cards, accessibility resource cards | **Bare `Learn more` at least six times**, three of them in one card row |
| `Learn more about Slackbot` / `Learn about AI-powered search` / `Learn about Slack CRM` / `Learn about channels` / `Learn about huddles` / `Learn about Slack connect` / `Learn about workflows` / `Learn about lists` / `Learn about dev tools` / `Learn about security` / `Learn more about productivity in Slack` / `Learn more about Slack Connect` | Homepage feature cards | The **good** version, used 12 times — object always named |
| `Get the report` / `Watch Now` / `Read more` / `Read More` / `Blog` | Resource cards | Five labels for five card types; `Blog` used as a CTA label is the odd one |
| `Play video` | Customer-story carousel | |
| `Pause animation` / `Play animation` | Beside every autoplaying video, repeatedly | Motion control offered inline rather than in settings — good accessibility practice |
| `Hide announcement` | Announcement bar (twice across pages) | Names the object |
| `Check out what's new` / `See what's new` | Announcement bar, Marketplace menu | |
| `Check Status` | **Live incident banner**, help centre | |
| `Troubleshoot connection issues` | Status page, under "Having trouble?" | CTA text = destination article title |
| `SUBSCRIBE VIA EMAIL` / `SUBSCRIBE TO UPDATES` | Status page | All-caps |
| `SEE HISTORY` | Status page | All-caps |
| `Restart Slack` | **In-product**, below the connection error | Documented in help |
| `Download Logs` | **In-product**, below the connection error | Documented in help |
| `Load new messages` | **In-product**, in the stale-channel banner | Documented in help |
| `Clear Cache and Restart` / `Restart and Collect Net Logs` / `Stop Logging` / `Start Logging to Disk` | In-product Troubleshooting menu | Documented in help |
| `Yes, thanks!` / `Not really` | Help-article feedback control | See T9 |
| `Submit article feedback` | Help-article feedback form | |
| `Change Region` | Locale modal trigger (rendered twice per page) | |
| `Cookie Preferences` / `Your Privacy Choices` | Footer | |
| `submit a help request` | Accessibility page fallback | |
| `Customer Support` | Nav FEATURED slot | Links to `/help/requests/new` |

**Observations.** Slack's CTA layer is the loosest of the five products harvested. Four registration labels (`Get started` / `Get Started` / `Sign Up For Free` / `Sign Up`), two sales labels (`Request a demo` / `Talk to sales`), two pricing labels (`Compare pricing` / `Compare plans`), and **inconsistent title-casing of the same label on the same page** (`Get started` in the hero, `Get Started` mid-page). The marketing site and the help centre are clearly governed separately — the help centre uses Title Case (`Sign In`, `Sign Up For Free`) and the marketing site uses sentence case.

Against that, the `Learn about <feature>` family is applied 12 times with the object always supplied, which is better discipline than either Notion or Linear manages. Bare `Learn more` survives only in the resource-card rows, where the card title is the object — the same defensible-but-weak position Wise occupies.

**`Link may open in new tab` is rendered as visible link text** `[observed]`, prefixed to every resource card and "What's new" entry on the homepage and accessibility page — at least 18 occurrences. This appears to be intended as screen-reader-only text that is leaking into the accessible name and the rendered DOM. The effect is that a screen-reader user hears "Link may open in new tab, Report, AI Agents are the Catalyst for a Limitless Workforce, Get the report" — the warning arrives before the link's identity. Recorded as a defect on a site that otherwise publishes a serious accessibility commitment.

## T4 Onboarding & getting-started

**Onboarding is split by role, then by lifecycle position** `[observed]`

The `Getting started` help category has four sub-sections, and the second and third are the notable pair:

| Sub-section | Articles |
|---|---|
| `Intro to Slack` | `What is Slack?` · `How to use Slack: your quick start guide` · `Understand your actions in Slack` |
| `Getting started for Slack admins` | `Getting started for workspace creators` · `Create a Slack workspace` · `Email template for introducing Slack` |
| `Getting started for new users` | `Getting started for new Slack users` · `Join a Slack workspace` · `Request a new workspace in your Enterprise organization` |
| `Review roles & permissions` | `Types of roles in Slack` · `Understand guest roles in Slack` · `Permissions by role in Slack` |

The admin/new-user split is the same decision Linear makes, and Slack extends it with a third state — the user who needs a workspace that does not exist yet (`Request a new workspace in your Enterprise organization`). Three onboarding entry states: *I am creating it*, *I am joining it*, *I need someone to create it*.

**`Email template for introducing Slack`** is the standout artefact: Slack ships **the announcement email the admin will need to send**, as a help article. Onboarding content aimed not at the product but at the rollout. For a tool whose adoption depends on a team switching together, writing the internal-comms copy for your champion is a high-leverage content decision — and it is directly transferable to any product with a champion-led rollout.

**`Understand your actions in Slack`** sits in the intro section — an article that teaches the user the *verb set* of the product (what "actions" are available) before teaching any individual task. Naming the action vocabulary as a first-run concept.

**Help search is seeded with three example questions, in three different grammars** `[observed]`

> `Hi. How can we help?`
> `How do I add people to a channel?` · `I need to reset my password` · `How can I upgrade my Slack plan?`

These are clickable chips beneath the search field, and they are written as **the user's own utterances** rather than as topic labels. Note the deliberate grammatical variety: a `How do I…?` question, a first-person declarative need (`I need to…`), and a `How can I…?` question. Between them they demonstrate to the user that the search accepts natural language in more than one shape — which matters because the search is labelled `Powered by Agentforce`, i.e. it is an LLM-backed search that rewards a sentence over a keyword.

`I need to reset my password` is the Wise "first-person confession" pattern applied to a search affordance rather than an article title. Seeding the search box with the phrasing you want users to type is a cheap way to retrain query behaviour.

**Greeting is two sentences and a full stop** `[observed]`: `Hi. How can we help?` — compare Notion's `Hi, how can we help you?`. Slack's is shorter, has a hard stop after the greeting, and drops the object pronoun. Both products landed on a first-person-plural question as the help-centre H1.

**`How to use Slack: your quick start guide`** — colon construction with a possessive second half, turning a generic title into an addressed one.

**Product tour lives on a separate domain** `[observed]`: `Product Tour` → `slackdemo.com`. An unauthenticated sandbox, which is the equivalent of Linear's `/demo`.

**Learning ladder named as a product** `[observed]`: `Slack Certified` (`slackcertified.com`), plus `Tutorials & videos` as one of six help categories and a `Learning Slack made simple` scope line. Slack, Notion and Linear all ship a named learning property — Academy, Learn, Certified.

## T5 Form & field labels

**Notification settings — the richest label inventory in this harvest** `[documented]`, from the configuration article

The settings screen is organised into named sections whose headers are **second-person sentence fragments**, not nouns:

| Section header | Contents |
|---|---|
| `How to notify you` | `Desktop notifications` · `Mobile notifications` (checkboxes) |
| `What to notify you about` | `Everything` · `Mentions and direct messages` (dropdown) |
| `Also notify you about` | thread replies you follow · VIP messages while paused or in focus mode · a huddle starting in your channels or DMs |
| `What to show in Activity` | `Channels with notifications set to "All new posts"` · reminders when Later item due dates arrive |
| `Channel keywords` | free-text keyword entry |
| `Sound & appearance` | `Include a preview of the message in each notification` · `Mute all sounds from Slack` · `Show a badge • on Slack's icon to indicate new activity` · per-type sound dropdowns |
| `When I'm not active on desktop` | mobile notification timing |
| `Flash window when a notification is received` | `Always` (Windows) |
| `Other Options` (under `Advanced`) | `Leave app running in notification area when the window is closed` |

**This section-header pattern is the transferable artefact.** `How to notify you` / `What to notify you about` / `Also notify you about` / `What to show in Activity` — four headers, all in the second person, all structured as the *question the setting answers*. A user scanning the page reads a sequence of questions and finds the one that matches their intent. Most notification-settings screens use nouns (`Delivery`, `Scope`, `Sound`) and force the user to infer the mapping.

`When I'm not active on desktop` switches to **first person** for the one setting that describes the user's own state rather than the system's behaviour. A deliberate person-shift inside one settings page, and it reads correctly: the other headers are the product addressing the user, this one is the user describing themselves.

**Option labels are complete phrases, not adjectives** `[documented]`: `Everything` · `Mentions and direct messages` · `Immediately, even if I'm active` · `Always`. The mobile-timing option `Immediately, even if I'm active` names both the timing and the condition being overridden — the user does not have to work out what "immediately" means relative to desktop activity.

**Defaults are stated numerically in prose** `[documented]`: "By default, you'll receive mobile notifications one minute after locking your desktop screen or 10 minutes after Slack stops detecting cursor activity." Two thresholds and two triggers, published. This is the kind of behaviour users normally reverse-engineer from experience.

**Keyword-matching constraints stated at the field** `[documented]`: "Keywords are not case-sensitive, but only exact matches will trigger notifications. Keywords in messages sent in threads won't trigger a notification." Two limitations, in the section where the field is, including one genuinely surprising one (threads are excluded).

**Platform-divergence notes are shipped inline** `[documented]`: "Selecting notification sound and appearance preferences is not available on Huawei devices." A single-vendor exclusion named in help copy. Also OS-specific tabs (`Desktop` / `Mobile` / `iOS` / `Android` / `Mac` / `Windows` / `Linux`) used throughout, with different step counts per platform — so the article's structure encodes the fact that the settings are not the same everywhere.

**Profile and preference field vocabulary** `[documented]`, inferred from article titles: `display name` · `Slack status and availability` · `out of office status` · `time zone preferences` · `language preferences` · `link display preference` · `emoji preferences` · `contact sharing preferences` · `Slack Connect discoverability preference` · `Mark as Read preference` · `channel suggestions` · `search preferences` · `zoom level` · `keyboard layout` · `Enter key preference` · `theme` · `font`.

`Set your Enter key preference` is a real setting with a real help article — whether Enter sends or newlines is contentious enough to warrant a named preference. `Manage your Mark as Read preference` likewise. Both are examples of naming a micro-behaviour so it can be discussed.

**Channel and profile field labels** `[documented]`: `conversation topic` and `channel description` are distinct fields covered by one article (`Set a conversation topic or channel description`); `channel prefixes`; `display name guidelines`; `pronoun and name pronunciation display`.

`Manage pronoun and name pronunciation display for member profiles` — two identity fields, admin-controlled visibility, one article. Name pronunciation as a first-class profile field is worth recording.

**Account-recovery field path** `[documented]`: `Reset your password` · `Locate your Slack URL or ID` · `Set up two-factor authentication` · `Set up a passcode, fingerprint, or facial scan to sign in to Slack` · `Grant Keychain access to Slack`. `Locate your Slack URL or ID` exists because the workspace URL is a credential the user must remember — a product-shape problem solved with a help article.

## T6 Status & state language

**Service state legend — five levels, published as a key** `[observed]`, status page

> `No Issues` · `Maintenance` · `Notice` · `Incident` · `Outage`

A five-level severity ladder rendered as a visible legend above the component table, each with its own icon. Most status pages ship three levels (operational / degraded / down); Slack ships five, and the two extra ones carry real distinctions: `Maintenance` is planned and therefore not a failure, and `Notice` is a known condition that does not yet degrade service. Separating *planned*, *informational*, *partial* and *total* is the right granularity for a tool whose users are trying to decide whether to file a ticket.

`No Issues` (rather than "Operational") is phrased as an **absence of the bad thing** rather than a presence of the good thing — consistent with the aggregate line "We're not aware of any issues".

**Aggregate status** `[observed]`: `Slack is up and running` — colloquial, three words, and notably *not* "All systems operational". Followed immediately by the pre-emptive recovery line:

> "Having trouble? `Troubleshoot connection issues` or email us at feedback@slack.com"

A question the user is already asking, placed directly under the all-clear, with two routes. This is the right place for it: the users reading a green status page are disproportionately the ones for whom it is wrong.

**Eleven feature components, named as user-visible capabilities** `[observed]`

`Login/SSO` · `Connectivity` · `Messaging` · `Files` · `Notifications` · `Huddles` · `Search` · `Apps/Integrations/APIs` · `Workspace/Org Administration` · `Workflows` · `Canvases`

Like Notion's, these are capabilities not services. `Connectivity` as a separate component from `Messaging` is the interesting split — it lets Slack say "you can't connect" independently of "messages aren't sending", which maps onto the two most common user reports.

**Uptime methodology is published, with its limitation** `[observed]`

> "Slack is a distributed platform and during any given incident it is rare for all Slack teams to be affected. For this reason, we report our uptime as an average derived from the number of affected users."

Explaining *how* the number is computed — and conceding that the number is a user-weighted average rather than a binary — is unusually honest for a status page. It also pre-empts the "you said 100% but we were down" complaint. Quarterly figure shown as `100%` at harvest. Paired with a `How is uptime calculated?` disclosure control.

**Billing status has its own disambiguation article** `[documented]`: `The difference between inactive and deactivated billing status`. Two adjacent system states whose names are nearly synonymous in English, requiring a dedicated article — the same class of problem Wise solves with `Why does it say my transfer's complete when the money hasn't arrived yet?`. Worth noting as the canonical symptom that two state names are too close together.

**Member lifecycle states** `[documented]`: `Invited members in Slack` is a named state with its own article, distinct from members and guests. Plus `Deactivate a member's account` / `Reactivate a member's account`, `Deactivate your Slack account` / `Reactivate your Slack account` — deactivation is reversible and both directions are documented. `Understand how credits are generated when a member is deactivated` connects the state change to a billing consequence.

**Presence and availability states** `[documented]`: `Slack status and availability` (two concepts, one setting), `out of office status`, `Do Not Disturb` (with `Set default Do Not Disturb hours` as an admin control), `focus mode`, `Pause your Slack notifications`, `snooze`, `mute`.

Slack runs **five distinct "don't bother me" states** — DND, paused notifications, notification schedule, focus mode, and muted channels — plus `out of office status` as a social signal. This is the largest interruption-state vocabulary in the corpus, and the overlaps are real: `Pause your Slack notifications` and `Set default Do Not Disturb hours` are arguably the same mechanism under two names, with the help centre using "paused" in the user-facing article and "Do Not Disturb" in the admin one.

**Unread and attention states** `[documented]`: `unread messages` · `View all your unread messages` · `Activity` (a numbered badge in the sidebar) · `badge notification` · `Later` items with due dates · `VIP` contacts · `Saved` (the successor to `Starred`). `Get your work done from the Activity view` frames a notification inbox as a work surface rather than a list.

**Approval and request states** `[documented]`: `pending invitations`, `invite links`, `app requests`, `app approval`, `workspace creation requests`, `Slack Connect channel approval settings and invitation requests`, `Require admin approval for invitations to Slack`, `Manage who can upgrade a free workspace`. A whole family of *blocked-pending-someone-else* states, each with a named request object. `Manage workspace creation requests for your Enterprise organization` is the notable one — wanting a workspace is modelled as a request with a queue.

**Flagged-content state** `[documented]`: `Review flagged content in Slack`, `Moderate message content in Slack`, `Configure audit log anomaly event responses in Slack`. Moderation states exist and are admin-visible.

## T7 Error, failure & recovery

**This is the strongest category in the file. Slack publishes an error-string-to-cause-to-recovery mapping table.** `[documented, quoting live UI strings]`

From `Troubleshoot connection issues`, a `Common issues` table with two columns — `Issue` and `Error message`:

| Issue (Slack's name for the failure class) | Error message (verbatim UI string) |
|---|---|
| `Connectivity failure` | **"Slack cannot connect."** |
| `Loading trouble` | **"For some reason, Slack couldn't load"** |
| `Server error` | **"Sorry! Something went wrong, but we're looking into it"** |
| `WebSocket trouble` | **"Last updated less than a minute ago…"** (noted as appearing in a grey banner) |
| `Browser errors` | "You'll see an error message in the browser you're using to access Slack." |

**The table itself is the pattern worth stealing.** It gives the user a lookup from the string on their screen to the name of their problem — which is the actual first step of self-service troubleshooting and is almost never provided. A user does not know they have a "WebSocket trouble"; they know their screen says "Last updated less than a minute ago". Slack builds the index in that direction.

Analysis of the five strings:

- **"Slack cannot connect."** — four words, full stop, subject-verb. States the failure without cause or blame. No "Oops". The only error in the set that reads like a clean system report.
- **"For some reason, Slack couldn't load"** — the prefix "For some reason" is doing deliberate work: it *admits Slack does not know why*. Most products would write "Slack couldn't load" and leave the cause implied, or invent one. Conceding ignorance in the error string is honest, and it sets up the multi-cause troubleshooting that follows (extensions, security devices, or "an issue on Slack's end"). It also reads slightly flippant, which is the trade-off. No terminal punctuation.
- **"Sorry! Something went wrong, but we're looking into it"** — apology, generic failure, then **a statement that someone is already working on it**. The "but we're looking into it" clause is the reusable half: it converts a dead end into a wait, and it is the one thing a user actually wants to know when the fault is server-side. Exclamation mark on "Sorry!" is the only exclamation in the set.
- **"Last updated less than a minute ago…"** — the most interesting string here, because **it is not an error message at all.** It is a staleness timestamp, shown in a grey banner beside a `Load new messages` action, and Slack's own help centre classifies it as the symptom of a WebSocket failure. The design decision is to tell the user *the data is old* rather than *the connection is broken* — a truthful, non-alarming, and actionable framing for a failure the user can work around by clicking. The trailing ellipsis signals continuing degradation. This is the best example in the corpus of **naming the user-visible consequence instead of the technical fault.**
- `Browser errors` has no Slack string at all; the row points at the browser's own message and the article shows a Chrome `No internet` screenshot. Declining to wrap a platform error in your own copy, and then documenting the platform's error anyway.

**Recovery is offered as in-error buttons, in escalating cost** `[documented]`

| Affordance | Placement | Cost to user |
|---|---|---|
| `Restart Slack` | Directly below the connection error | One click |
| `Load new messages` | In the staleness banner | One click |
| `Download Logs` | Directly below the connection error | One click, produces a file |
| `Clear Cache and Restart` | `Help` → `Troubleshooting` | Menu dive |
| `Restart and Collect Net Logs` → `Your log is in progress` → `Stop Logging` | `Help` → `Troubleshooting` | Multi-step, requires reproducing the bug |
| `Send us a note` with the file attached | Support form | Human contact |

**Putting `Restart Slack` and `Download Logs` inside the error state** is the key decision: the two things support will ask for are available at the moment of failure, before the user leaves the screen. And the diagnostic-collection flow has its own state copy — `Your log is in progress` (present continuous, in a pop-up) and `Stop Logging` — so a background capture process is made visible and controllable rather than silent.

The Net Logs procedure is documented **per platform in tabbed variants** (Slack desktop app vs Google Chrome vs "a browser that isn't Google Chrome" → contact us), with the full Chrome `chrome://net-export/` route spelled out. Asking a general user to use a Chrome internals page is a high-friction ask; Slack writes it as seven numbered steps including the filename to save (`slackNetlog`).

**Article structure is uniform per error: `The issue` → `Steps to troubleshoot`** `[observed]`, with numbered `Step 1:` / `Step 2:` / `Step 3:` sub-headings in escalating order, and a screenshot of the actual error state with descriptive alt text ("An error message that reads, Slack cannot connect."). Screenshotting the error and describing it in alt text means the lookup works for screen-reader users too.

**Escalation always ends at a human, and the routing is pre-filled** `[documented]`: every path terminates in `Send us a note` or `get in touch with us`, linking to `/help/requests/new?topic_eid=64e8f7e3` — a **pre-selected support topic in the URL**, so the user does not re-triage their own ticket. One link on the page uses a different parameter set (`?aid=205138367&from_hc=1&src=article`), so the topic pre-fill is applied inconsistently within one article.

**Three-way cause attribution** `[documented]`. Each failure explicitly names the possibility that the fault is not Slack's: "your network or any security devices (such as a proxy, firewall, antivirus software, or VPN) are interfering", "browser extensions or a security device may be interfering, **or there could be an issue on Slack's end**". Naming all three loci (user's machine, user's network, Slack) and including their own, rather than defaulting to "check your connection".

**`slack.com/help/test` — a dedicated connection-test endpoint** `[documented]`, referenced as `Step 2: Run the Slack connection test`. A first-party diagnostic URL a user can be sent to. Also three named WebSocket domains (`wss-primary.slack.com`, `wss-backup.slack.com`, `wss-mobile.slack.com`) published for network admins to inspect — the article writes for two audiences, and flags the handoff in a tip at the top: "**Tip:** If you're an IT or a network admin, learn how to `manage connection issues` for your network."

**Recovery and troubleshooting article titles — four grammars** `[observed]`

| Shape | Examples |
|---|---|
| `Troubleshoot X` | `Troubleshoot connection issues` · `Troubleshoot Slack notifications` · `Troubleshoot audio and video issues in Slack` · `Troubleshoot SAML authorization errors` · `Troubleshoot checkout and Billing page errors` · `Troubleshoot Slack in a Citrix environment` · `Troubleshoot Slack notifications on macOS Big Sur` |
| `Trouble <gerund>` | `Trouble receiving emails from Slack` |
| `How to <verb>` | `How to identify an unrecognized Slack charge` · `How to access new features before your plan renews` |
| Question | `Can I upgrade only my account to a paid plan?` |
| Fix/prevent pair | `Fix and prevent duplicate accounts` |

`Fix and prevent duplicate accounts` covers both the remedy and the recurrence in one title — a useful compression for a problem that repeats. `How to identify an unrecognized Slack charge` is a fraud-adjacent article written as a task rather than an alarm.

**Billing failure has its own article set** `[documented]`: `Failed or late payments`, `Troubleshoot checkout and Billing page errors`, `Claim a tax refund for exempt workspaces`, `Understand how credits are generated when a member is deactivated`. Note these sit in the `Get troubleshooting tips` sub-section of `Using Slack` — i.e. **billing errors are filed under troubleshooting, not under billing**, which matches where a user in trouble would look but splits the billing content across two categories.

**The help centre's own feedback widget has an error state** `[observed]`

> `Oops! We're having trouble. Please try again later!`

Rendered in the DOM of both help articles as the failure copy for the article-feedback submission. Two exclamation marks in a ten-word string, `Oops!` as the opener, and "later" as the only guidance. It is markedly worse than any of Slack's own product error strings — a reminder that the peripheral widget on a page is usually written by someone other than the product-content team. Recorded as the negative counter-example to the five good strings above.

## T8 Empty states

`[absent]` for true in-product empty states — all are behind auth, and no help article documents them. Checked all five help category pages and both opened articles.

**Two adjacent artefacts were found** `[observed]`

1. **Help search "no results" scaffolding in the DOM.** Every help centre page ships an unrendered search-results template containing:

   > `Search for "[term]"`
   > `See [n]+ more results →`

   Both strings expose their **interpolation placeholders as literal bracketed tokens** — `[term]` and `[n]` — in the server HTML. In the rendered state these would be substituted, but the presence of `[term]` and `[n]` rather than a templating syntax suggests a client-side string-replace, and it is the same class of exposure as Wise's empty-quotes no-results bug. Worth recording as the observable shape of Slack's search-result copy even though the populated state was not reached.

2. **A ~350-term keyword blob rendered as plain text on every help page** `[observed]`. Each help category and article page contains a single comma-separated run of search keywords in the DOM — `Actions,activity,access logs,accessibility,add,add an app,...,work hours,` — covering the entire help centre's tag vocabulary, including retired product names (`hipchat`, `Stride`, `wunderlist`, `plus plan`, `Slack for Teams`, `windows phone`, `App Directory`, `whitelisting`, `Whitelist`). It is presumably a search-index payload, but it is in the reading order and would be read out in full by a screen reader on every help page.

   As a corpus artefact it is genuinely useful — it is Slack's complete public keyword taxonomy, and the fossils in it (`hipchat`, `Stride`, `wunderlist` are all dead competitors Slack once imported from) date the list to at least 2018. As a content defect it is significant: several hundred comma-separated words with no heading, no landmark, and no way to skip, between the page H1 and the article body.

**Emptiness is addressed indirectly through defaults** `[documented]`: `Set default channels for new members`, `Manage your channel suggestions`, `Use the general channel to share announcements`. Slack's answer to the empty workspace is to pre-populate it rather than to write an empty state — `#general` exists so that a new workspace is never empty. That is a design answer to a content problem, and it is why Slack has less empty-state surface than Notion.

## T9 Notifications & system messages

**A live incident was in progress during harvest, and the two surfaces disagreed.** `[observed]` — the single most valuable finding in this file.

At the moment of harvest, every page in the Slack help centre carried this banner:

> `Slack is experiencing some connectivity issues — please stand by.` `Check Status`

Observed on all five help pages fetched (help home, four category pages). Simultaneously, `slack-status.com` displayed:

> `Slack is up and running`
> "We're not aware of any issues affecting our systems."

with all eleven components showing `No issues` and quarterly uptime at `100%`.

**So the help centre banner told users there was a connectivity incident and directed them to a status page that said there was not.** The banner's own CTA (`Check Status`) routes the user to the contradiction. This is a first-order incident-communication failure: the two surfaces are maintained by different systems, the help-centre banner is presumably set manually or by a separate alerting path, and the status page is the authority the banner defers to.

For a benchmark corpus this is worth more than a well-written banner would be. The banner copy itself is good — "is experiencing some connectivity issues" hedges appropriately with "some", `— please stand by` is calm and asks for patience without promising a time, and the CTA routes to detail. The failure is entirely in the synchronisation. **A content designer's incident-comms plan has to include which surface is canonical and how the others are cleared**, and this is the evidence for why.

(Recording the possibility that the banner was stale — left up after an incident cleared — rather than premature. Either way the two surfaces contradicted each other at one timestamp.)

**Notification architecture, as documented** `[documented]`

- Four delivery channels: desktop, mobile, Slack (in-app), email. Desktop/mobile are default-on.
- Two scope levels: `Everything` vs `Mentions and direct messages`, with per-channel exceptions layered on top.
- Timing: mobile fires "one minute after locking your desktop screen or 10 minutes after Slack stops detecting cursor activity" by default, overridable to `Immediately, even if I'm active`.
- `Activity` is a numbered sidebar badge; DMs, mentions, reactions and thread replies are always included and cannot be excluded; other types are opt-in.
- Badge triggers enumerated: "direct messages, keywords, mentions, app notifications, thread replies, `Slack Connect invitations`, and overdue `reminders`".
- `Channel keywords` highlight in yellow in-channel as well as firing a notification — the notification and the in-context highlight are the same feature.

**Presence-aware delivery is the pattern.** Slack's notification model is built on *where the user is*, not on *what happened*: mobile suppresses while desktop is active, email digests suppress if the in-app notification was read, the Activity badge accumulates what you did not see. The vocabulary follows — `When I'm not active on desktop` is a settings header. Applicable to any multi-surface product: route by presence, and name the setting after the user's state rather than the channel.

**Security notifications are a named category** `[documented]`: `Understand Slack Security notifications` — a help article explaining the notification class to the user. Alongside `Configure audit log anomaly event responses in Slack`, so anomaly detection produces user-facing messages that are documented.

**Join/leave system messages are admin-controllable** `[documented]`: `Manage join and leave messages`. The channel-event system messages ("X has joined the channel") are a configurable class — recognition that system chatter is content with a cost.

**Canvas update messages have their own article** `[documented]`: `Understand canvas update messages` — the notification produced when a document changes, documented as a message type the user needs explained.

**Automated messages are a governed feature** `[documented]`: `Create automated messages in Slack` plus `Manage permissions for automated messages`. Scheduled/automated posting is a capability with an admin permission attached.

**Status-page subscription copy** `[observed]`

> `SUBSCRIBE TO UPDATES`
> "You will receive email notifications whenever Slack **creates** or **updates** an incident."
> Email address: [field] → `SUBSCRIBE VIA EMAIL`

The two trigger verbs (`creates`, `updates`) are bolded inline, so the subscriber knows they will get follow-ups and not just a first alert. Plus `Atom feed` / `RSS feed` alternatives and a named `uptime alerts` help article. And a compliance-specific opt-in: "To opt into notifications for DORA-related ICT incidents, please contact Slack support" — a regulated-incident notification channel offered through a human route with a help article behind it.

**Article feedback flow — a complete micro-interaction, captured verbatim** `[observed]`

> `Was this article helpful?` → `Yes, thanks!` / `Not really`
>
> On yes: `Awesome!` / "Thanks so much for your feedback!"
> On no: `Sorry about that! What did you find most unhelpful?` with four radio options:
> - `This article didn't answer my questions or solve my problem`
> - `I found this article confusing or difficult to read`
> - `I don't like how the feature works`
> - `Other`
>
> `0/600` character counter → `Submit article feedback`
> Then: `Got it!` / "If you'd like a member of our support team to respond to you, please send a note to feedback@slack.com."
> On failure: `Oops! We're having trouble. Please try again later!`

Several things here are genuinely good. The two buttons are `Yes, thanks!` and `Not really` — **the negative option is softened so that clicking it is socially easy**, which is the whole point of a feedback control. The four negative reasons separate three distinct failure modes that products usually conflate: *the content didn't answer me*, *the content was unclear*, and **`I don't like how the feature works`** — an explicit escape hatch for "your documentation is fine, your product isn't". Offering that option is how a help-content team avoids being blamed for product problems, and it routes real product feedback somewhere useful.

The two acknowledgements are register-matched to the answer: `Awesome!` for yes, `Got it!` for no. And both close by telling the user this channel is **not** a support channel and where to go instead — managing the expectation that feedback gets a reply.

## T10 Disclosures, legal & compliance

**The Paid-vs-Free comparison contains three internal contradictions.** `[observed]` This page ships two comparison blocks — a pair of bulleted `Free` / `Paid plans` lists and a formal table — and they do not agree.

| Claim | Bulleted list says | Table says |
|---|---|---|
| Integrations on Free | "Integrations with other tools (**Limited to 3 tools**)" | "**Limited to 10 apps**" |
| Audio/video on Free | "Audio and video conversations with screen sharing (**Limited to 30-min**)" | "**1:1 huddles only**" |
| Messaging on Free | "Messaging (**90-day history**)" | "**90-day history**" |

And a third contradiction with the FAQ on the same page: the comparison says Free has `90-day history`, while the FAQ answer to `Will I be able to see my messages after I upgrade?` says "free teams will have access to the **previous 12 months** of workspace data". Both may be true (retention vs. what is restored on upgrade) but nothing on the page reconciles them, and a prospective buyer reading top to bottom encounters 90 days and 12 months with no explanation.

Two of these are **material limit disclosures on a page whose only job is to state the limits.** 3 vs 10 integrations and 30-minute-cap vs 1:1-only are different products. This is the most consequential defect recorded in this corpus entry, and the likely cause is legible: the bulleted lists appear to be the older asset and the table the newer, with the page updated in one place.

**The bulleted-list construction itself is a reusable pattern**, defect aside: `Feature name (constraint in parentheses)`, with the same feature name appearing in both columns and only the parenthetical changing —

> Free: "Messaging (90-day history)" · Paid: "Messaging (Unlimited)"
> Free: "Integrations with other tools (Limited to 3 tools)" · Paid: "Integrations with other tools (Unlimited)"

Repeating the feature name on both sides rather than showing a tick and a cross means the reader never has to hold a column header in mind. The paid list then continues with five features the free list does not mention at all, so the *absence* is structural rather than marked with a dash.

The table handles absence with a bare `-`, which is less informative than the list's approach of simply not listing it.

**Compliance capability disclosures are named and grouped** `[observed]`, from the table: "Enhanced security" → `SAML-based SSO, SCIM`; "Compliance support" → `Global retention policies, data exports, HIPAA support, and more`. The parenthetical "and more" on a compliance row is a hedge that a regulated buyer cannot act on.

**Named policies** `[documented]`: `Slack's Fair Billing Policy` — a policy given a proper name and its own article, covering (per the title) the principle that you pay only for active members. Naming a billing policy after the fairness principle it embodies is a positioning move as much as a disclosure. Alongside `Usage limits for free workspaces`, `Feature limitations on the free version of Slack`, `Supported billing currencies`, `Supported payment methods`, `Sales tax and VAT`, `Vendor and remittance details for Slack`, `Strong customer authentication for Slack purchases`.

`Vendor and remittance details for Slack` exists so that a customer's accounts-payable department can set Slack up as a supplier — a help article written for a reader who is not the user. Same instinct as the `Email template for introducing Slack`.

**Discount eligibility as application processes** `[documented]`: `Apply for the Slack for Education discount` · `Apply for the Slack for Nonprofits discount`. "Apply for" rather than "Get" — the gate is disclosed in the verb.

**Data-governance vocabulary** `[documented]`: `Customize data retention in Slack` · `Data residency for Slack` · `Create and manage legal holds` · `Slack Enterprise Key Management` · `Slack data loss prevention` · `Audit logs in Slack` · `A guide to Slack's Discovery APIs` · `Create information barriers in Slack` · `Create custom Terms of Service for your Slack Enterprise organization` · `Block file downloads and message copying in Slack` · `Moderate message content in Slack`.

`Create information barriers in Slack` — the financial-services ethical-wall concept, shipped as a named feature. `Create custom Terms of Service for your Slack Enterprise organization` lets a customer inject their own legal text into the product, which is a disclosure surface owned by the customer rather than by Slack.

**AI-specific governance content** `[documented]`, the most current disclosure cluster:

- `Guide to the Slack AI Guardrails`
- `Identify hallucinations in Slackbot responses`
- `Security for AI features in Slack`
- `Manage access to AI features in Slack`
- `Restrict AI access to certain channels, canvases, and lists`
- `Slackbot limits and credit usage`
- `Set up Flex Credits for Slackbot usage`
- `Manage access to the Slack MCP server through your identity provider`

**`Identify hallucinations in Slackbot responses` is the standout.** A vendor shipping a help article that teaches users to detect its own product's errors, with "hallucinations" used as the plain term rather than euphemised ("inaccuracies", "unexpected outputs"). Adopting the honest word and then writing the detection guide is a strong disclosure posture, and it is directly transferable to any product surfacing model output. `Guardrails` as a named, documented user-facing concept is the companion move.

**Metered AI billing named twice** `[documented]`: `Flex Credits` for Slackbot usage plus `Slackbot limits and credit usage`. A consumption unit with a name, as with Notion's credits and Linear's AI credits — all three products landed on credits.

**Footer legal set** `[observed]`: `Privacy` (→ `/trust/privacy/privacy-policy`) · `Terms` (→ `/legal`) · `Cookie Preferences` · `Your Privacy Choices` (with a CCPA icon, routing to **a Salesforce-hosted form**, `salesforce.com/form/other/privacy-request/`). The privacy-request flow leaving the Slack domain for the parent company's form is the clearest surface expression of the acquisition; a user exercising a privacy right ends up on a different brand's page.

Copyright line: "©2026 Slack Technologies, LLC, a Salesforce company. All rights reserved. Various trademarks held by their respective owners." — the parent-company attribution is in the copyright string on every page.

**Locale disclosure** `[observed]`: the `Change Region` modal warns "Selecting a different region will change the language and content of slack.com." — flagging that region changes *content*, not just language. Honest about the fact that the localised sites differ substantively. Fourteen locales across `Americas` / `Europe` / `Asia Pacific`, each labelled in **both** the endonym and the language in parentheses — `Deutschland (Deutsch)`, `日本 (日本語)`, `Latinoamérica (español)`. Territory-plus-language labelling rather than flags.

## T11 Help-centre architecture

**Shape:** two-level, flat and wide. Six categories → named sub-sections → article lists, all on one page per category. No third level, no article-type chips, no "popular articles" ranking, and no `/all` variant — **the category page *is* the complete index**, which is the opposite of Notion's teaser-then-`/all` approach. `Using Slack` renders roughly 110 article titles on a single page; `Workspace administration` renders roughly 170.

**Sub-section names are the real IA.** `[observed]`

`Getting started` (4): `Intro to Slack` · `Getting started for Slack admins` · `Getting started for new users` · `Review roles & permissions`

`Using Slack` (11): `AI` · `Channels` · `Direct messages` · `Format & style messages` · `Message features & tools` · `Share files & conversations` · `Search in Slack` · `Salesforce & Slack` · `Audio & video` · `Keyboard shortcuts & accessibility` · `Get troubleshooting tips`

`Your profile & preferences` (3): `Manage your account` · `Adjust your notifications` · `Change your settings & preferences`

`Workspace administration` (9): `Manage members` · `Manage channels` · `Manage billing, payments & plans` · `Workspace settings & permissions` · `Workspace customization` · `Enterprise settings & permissions` · `Manage apps & workflows` · `Configure access & security` · `Slack data & analytics`

Three observations. `AI` is the **first** sub-section of `Using Slack`, above `Channels` — a positioning decision expressed as list order, given that channels are the product's foundational object. `Keyboard shortcuts & accessibility` pairs the two as one sub-section, which is defensible (keyboard navigation is an accessibility feature) but files accessibility under a shortcut heading. And `Get troubleshooting tips` is the only verb-phrase sub-section in `Using Slack` — the other ten are nouns — which correctly signals that it is a different kind of content, though "tips" undersells a section containing the connection-error index.

The admin category's sub-sections are dominated by `Manage` (four of nine start with it), and the split between `Workspace settings & permissions` and `Enterprise settings & permissions` mirrors the product's two-tier org model. A workspace admin has to know which tier they are in before they can route.

**Article-title grammar — six consistent shapes, overwhelmingly verb-first** `[observed]`

| Shape | Count observed | Examples |
|---|---|---|
| Bare imperative `<Verb> <object>` | Dominant, ~200+ | `Join a channel` · `Create a channel` · `Rename a channel` · `Leave a channel` · `Archive or delete a channel` · `Add people to a channel` · `Remove someone from a channel` · `Convert a channel to private or public` · `Reset your password` · `Sign in to Slack` · `Sign out of Slack` · `Set a reminder` · `Edit your profile` |
| `Manage <object>` | ~50 | `Manage your Slack plan and billing details` · `Manage pending invitations and invite links for your workspace` · `Manage who can notify a channel or workspace` |
| `Understand <object>` | ~6 | `Understand direct messages` · `Understand guest roles in Slack` · `Understand Channel Managers in Slack` · `Understand canvas update messages` · `Understand Slack Security notifications` · `Understand your actions in Slack` |
| `Guide to <object>` | ~10 | `Guide to Slack notifications` · `Guide to Slack channel templates` · `Guide to the Slack AI Guardrails` · `Guide to Model Context Protocol in Slack` · `A guide to Slack's Discovery APIs` |
| `Troubleshoot <object>` | ~7 | see T7 |
| Question | ~3 | `What is Slack?` · `What is a channel?` · `Can I upgrade only my account to a paid plan?` |

**`Manage who can <verb>` is a recurring sub-shape worth isolating** `[observed]`: `Manage who can set channel posting permissions` · `Manage who can upgrade a free workspace` · `Manage who can invite guests in an Enterprise organization` · `Manage who can rename channels in an Enterprise organization` · `Manage who can join Slack Connect channels owned by other organizations` · `Manage who can notify a channel or workspace` · `Manage who can delete profile information`.

Seven articles built on one template. It is exactly right for permission content: the admin's question is never "how do permissions work" but "who is allowed to do this specific thing", and the title answers in the admin's own grammar. **Highly transferable to any permissions or role-management help IA.**

**The `Understand X` shape is reserved for concepts that look like they need no explanation** `[observed]` — direct messages, guest roles, canvas update messages, security notifications, "your actions". Slack uses `Understand` where a user would not think to ask a question, and `Guide to` where a topic is large. The distinction is consistent enough to read as a rule: `Understand` for a misconception, `Guide to` for a domain.

**Colon-subtitled titles for multi-part topics** `[observed]`: `Slack Connect guide: Work with external organizations` · `Slack Connect: Disconnect from an organization` · `Slack Connect: Provide guidelines for members of your organization` · `Slack Connect: Manage your organization's connections` · `FAQ: Import data from one Slack workspace to another` · `How to use Slack: your quick start guide` · `Guide to managing Slack Connect in an Enterprise organization`.

The `Slack Connect: <task>` prefix namespaces a feature's articles so they cluster alphabetically and read unambiguously out of context. Applied inconsistently though — some Slack Connect articles use the prefix, others embed the feature name mid-title (`Use Slack Connect to work with other companies in channels`, `Accept a Slack Connect channel invitation`).

**Routing furniture** `[observed]`: `Hi. How can we help?` → search with three seeded queries (see T4) → `Powered by Agentforce` attribution → the live incident banner → the six-category nav. `Slack Status` is appended as a seventh item in the mobile category list, so the status page is treated as a help destination.

`Powered by Agentforce` under the search box is a **provenance label on an AI feature**, telling the user the search is model-backed before they type. Unusual and arguably good practice — it sets expectations for both the input (natural language) and the output (synthesised, possibly wrong).

The help centre offers **no visible browse-by-role, no article-count indicators, no breadcrumb on category pages** (breadcrumbs appear only on articles: `Slack Help Center` → category → sub-section → article, where the sub-section link resolves to a placeholder `/section` URL — a **broken breadcrumb link** on every article).

**Article-internal structure** `[observed]`: H1 → intro paragraph with inline links → `Note:` or `Tip:` callout → `### How X works` conceptual section → platform-tabbed procedures → `Note:` / `Tip:` callouts → feedback module → `IN THIS ARTICLE` label (a table-of-contents affordance that renders as a bare label in server HTML, as with Notion's `In this help doc`).

Callout discipline is good and consistent: **`Tip:`** carries optional optimisations and audience handoffs ("If you're an IT or a network admin…", "If you only want to receive notifications during certain hours…"), **`Note:`** carries constraints and exclusions ("Keywords are not case-sensitive…", "not available on Huawei devices", "If you're using a browser that isn't Google Chrome…"). Same division Notion uses. `Note` for what you cannot do, `Tip` for what you might additionally do.

## T12 FAQs

**Two FAQ blocks, on two page types, in two registers.**

### Block A — Paid vs. Free page, heading `Frequently asked questions`, 5 questions `[observed]`

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | Can I upgrade Slack just for myself, instead of upgrading everyone in our workspace? | No. Opens with "Unfortunately, no." and justifies it on product grounds — Slack is built for teams and only works if the whole team is on it; the whole workspace upgrades at once |
| 2 | Are there limits to the number of people who can be on my team, or the number of people who can be in a channel? | No. Opens with "Nope!"; Slack scales with the organisation, no member or channel caps |
| 3 | Will I be able to see my messages after I upgrade? | On upgrade to Pro, free teams get access to the previous 12 months of workspace data — files, messages, other content |
| 4 | I'm not sure which plan is right for my team. How can I be certain before I purchase? | Points to the pricing page and offers a human walkthrough |
| 5 | I want to test this out before I decide, do you offer trials? | Yes, with a link to the trial article |

**Structural notes.** Five questions, and the ordering is by *objection strength* rather than topic: the two hardest objections first (can I do this alone; are there hidden caps), then the data-loss fear, then the two decision-support questions. Q1 and Q2 are both answered **no** and **yes** respectively in the first word — `Unfortunately, no.` and `Nope!` — before any explanation. Leading with the verdict, then the reason, is correct for an objection FAQ and it is applied consistently here.

`Nope!` is a striking register choice in a purchasing FAQ; it works because the answer is good news. `Unfortunately, no.` pairs the refusal with an acknowledgement that it is unwelcome, then immediately gives a *product* reason rather than a commercial one ("Slack is built for teams, so it's only effective if your whole team is on board") — reframing a licensing constraint as a design conviction.

Q4 and Q5 are both written as **statement-then-question** in the user's voice: "I'm not sure which plan is right for my team. How can I be certain before I purchase?" and "I want to test this out before I decide, do you offer trials?" The second has a comma splice where a semicolon or full stop belongs. This is the same first-person construction Notion uses in its help FAQ and Slack uses in its search chips — a house pattern, applied here with a punctuation slip.

Q3's answer is the one that contradicts the comparison table on the same page (see T10): 12 months here, 90-day history there. And it names a plan tier — `Pro` — that appears nowhere else on the page.

### Block B — Accessibility page, heading `Frequently asked questions`, 2 questions `[observed]`

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | What accessibility features does Slack offer? | A ten-item bulleted list of supported capabilities (see below), closing with Simplified Layout Mode |
| 2 | Can I use Slack with a screen reader? | **Yes.** — bolded, then names the four supported readers (NVDA, JAWS, VoiceOver desktop; VoiceOver, Talkback mobile), links dedicated docs and audio/video tutorials, and lists four screen-reader-specific features |

Only two questions, but both answered in unusual detail, and **Q2's answer opens with a bolded one-word `Yes.`** before any qualification. For an accessibility question the binary answer is the whole answer; everything after it is supporting evidence. Naming the four specific screen readers, with platform, rather than claiming generic "screen reader support" is what makes the answer usable — a JAWS user can verify themselves in the answer.

Q1's ten-item list is worth recording as a capability vocabulary: keyboard-only navigation on web/desktop; keyboard shortcuts; **up to 200% zoom on all platforms**; captions and transcripts for Clips and Huddles; customisable message readouts for screen-reader users; adding and reading alt text plus **opt-in reminders to add alt text**; native dictation and voice control/voice access on Android and iOS; text size preferences on mobile; reduced motion preferences; and `Simplified Layout Mode`, described as "a fully-featured alternative view of Slack that can be beneficial for people using eye tracking, head mouse, or screen readers, as well as for people seeking to minimize distraction and visual overwhelm".

Two things stand out. **`opt-in reminders to add alt text`** is a nudge feature aimed at the *author* rather than the reader — Slack prompts the person posting an image, so accessibility is produced by users rather than only afforded to them. And `Simplified Layout Mode`'s description names **five distinct beneficiary groups**, two of which are not disability categories at all ("people seeking to minimize distraction and visual overwhelm"). Framing an accessibility feature as also serving a general preference is the curb-cut argument made in product copy.

The block closes with `Didn't find what you need?` → "Please visit the `Help Center` or `submit a help request`."

**`FAQ: Import data from one Slack workspace to another` exists as a standalone help article** `[documented]` — an FAQ promoted to its own article with `FAQ:` as a title prefix, for a migration task complex enough to generate a question cluster. Its contents were not opened.

## T13 Terminology & glossary

| Term | Slack's usage | The alternative it rejected |
|---|---|---|
| `channel` | The foundational object; "It all starts with a channel"; has its own `What is a channel?` article | `room`, `group`, `space`, `thread` (which is a *sub*-object here) |
| `workspace` | The team-level container | `team` — which survives in `Slack for Teams` in the keyword blob, in "free teams" in the FAQ, and in `Use Slack Connect with free teams` |
| `Enterprise organization` / `org` | The multi-workspace tier | `tenant`; also `Enterprise Grid`, the retired name, still in the keyword blob and in `Mobile security for Enterprise Grid` |
| `huddle` | Audio/video call; "hop on a huddle" | `call` — which survives in the keyword blob (`calls`, `voice call`) and in `Manage third-party calling app settings` |
| `Clips` | Recorded audio/video updates | `recordings`, `videos`, `Loom-style` |
| `canvas` | The rich document object | `doc`, `page`, `post` — `posts` is in the keyword blob as a retired object |
| `Lists` | The task/project object | `tasks`, `boards`, `tables` |
| `Slack Connect` | Cross-organisation collaboration | `shared channels` / `external channels` — `shared channel`, `shared channels` both survive in the keyword blob |
| `Slackbot` | The AI assistant, glossed "Your AI teammate"; now carries `Skills`, `Skill Sets`, `Big Mode`, `Deep Research`, `memory` | `assistant`, `copilot`, `agent` (reserved for third-party agents) |
| `Agentforce` | Salesforce's agent platform inside Slack | kept as the parent-company brand rather than renamed |
| `Slackforce Surfaces` | New Dreamforce-announced surface concept | |
| `Slack Code` | Agentic coding in channels | |
| `Workflow Builder` | The no-code automation builder | `automations`, `recipes`, `Zaps` |
| `Slack Atlas` | Profiles and org charts | `directory` — which survives in the keyword blob and in `App Directory` |
| `Slack Marketplace` | The app store | `App Directory` — still live in the status-page footer |
| `Enterprise Search` / `enterprise search` | Cross-app search; capitalised as a product and lowercase as a capability in the same help centre | |
| `Flex Credits` | Metered Slackbot usage unit | `tokens`, `compute` |
| `Guardrails` | Named AI-safety controls | `policies`, `filters` |
| `hallucinations` | Used plainly in a help-article title | `inaccuracies`, `unexpected outputs` |
| `Later` | Saved-for-later items with due dates | `reminders` (which also exists separately), `to-do` |
| `Saved` | The bookmark action | `Starred` — the retired term, still live in `Star channels and direct messages` alongside `Save messages and files for later` |
| `Activity` | The notification feed, framed as a work surface | `Notifications`, `Inbox` |
| `VIP` | Priority contacts whose messages pierce DND | `favourites`, `priority contacts` |
| `focus mode` | A named interruption state (paid only) | `zen mode`, `quiet mode` |
| `Do Not Disturb` | The scheduled quiet state | overlaps with `Pause your Slack notifications` — two names, arguably one mechanism |
| `guest` | External limited-access member, with role sub-types | `external user`, `collaborator` |
| `member` | The billable participant | `user` — avoided in UI-facing copy, present in developer/admin contexts |
| `Channel Managers` | A named channel-level role | `channel admins`, `moderators` |
| `information barriers` | Enforced non-communication between groups | `ethical walls`, `Chinese walls` |
| `Fair Billing Policy` | The named inactive-member billing principle | |
| `Simplified Layout Mode` | Alternative accessible view | `accessible mode`, `basic view` |
| `Today` | A named daily-start surface (`Start your day with Today`) | `Home`, `Digest` |
| `flow of work` | House phrase, used three times | `in context`, `where you work` |

**Terminology fossils are unusually visible here** because the keyword blob (see T8) is published on every help page. It contains `hipchat`, `Stride`, `wunderlist`, `plus plan`, `Slack for Teams`, `windows phone`, `App Directory`, `whitelisting`, `Whitelist`, `posts`, `calls`, `shared channels`, `Enterprise Grid`, `Slack Day`. Four dead competitors, two retired plan names, one retired object type (`posts`), one retired platform, and both `whitelisting` and the term that replaced it (`allowlist`, used in current article titles like `Manage access to Slack with IP allowlists`). A live record of a decade of renames, indexed for search.

**Three renames are visibly incomplete on current pages**: `Starred` → `Saved` (both article titles live, adjacent in the same sub-section), `App Directory` → `Slack Marketplace` (status-page footer still says App Directory), `whitelist` → `allowlist` (both in the keyword index; current titles use allowlist).

**`Slack AI` vs `AI in Slack`** are both live as feature names — the footer says `Slack AI`, the nav gloss says `AI in Slack`, and the help category is just `AI`. Three names for the AI surface, and the shift from `Slack AI` (a product) to `AI in Slack` (a property of the product) looks like a deliberate repositioning caught mid-move.

**The Slackbot expansion is the live coinage cluster**: `Slackbot Skills`, `Slackbot Skill Sets`, `Slackbot Big Mode`, `Slackbot Deep Research`, `Slackbot memory`, `Manage Slackbot preferences`, `Manage Slackbot skills`, `Slackbot limits and credit usage`. A single mascot-turned-assistant name now namespacing eight sub-features. `Big Mode` is the most informal name in the product ("Slackbot just got a full-screen workspace built for deeper work").

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout for the user. First-person plural for the company, used in service, in apology and in refusal: "We're here to help you learn about Slack", "we're looking into it", "Unfortunately, no", "we do not offer", "we report our uptime as an average", "that's why we're making sure everyone can use Slack". The company is a visible actor including in adverse copy — "Sorry! Something went wrong, but **we're** looking into it" puts a subject behind the fix.

**Register gradient — three tiers, split by surface rather than by stakes.**

- *Allusive and colloquial*, in mid-page marketing: "Email could never." · "One search to rule them all." · "There's a template for that." · "Project manager's block?" · "hop on a huddle" · "A little tap can do a lot of things" · "Nope!" · "Awesome!"
- *Plain instructional*, in the help centre: numbered steps, bolded UI labels, `Note:` / `Tip:` callouts, "Use the steps below to customize…".
- *Flat and factual*, in error and status copy: "Slack cannot connect." · "No issues" · "Slack is up and running" · "Last updated less than a minute ago…"

The gradient is coherent within each surface but **not** consistent across them, and the boundary is visible where surfaces meet. The help centre's own feedback widget ships `Oops! We're having trouble. Please try again later!` — marketing-register punctuation on an error state — sitting on the same page as the exemplary "Slack cannot connect." Slack's product-content discipline is strong and its peripheral-widget discipline is not.

**Emoji as a design element rather than in copy** `[observed]`. Unlike Notion, Slack's public copy contains no emoji; instead the accessibility page hero is an illustration of emoji ("A series of emojis relating to the world of accessibility"), and emoji are discussed as a product feature (`Use emoji and reactions`, `Manage your emoji preferences`, `Manage one-click emoji reactions`, `Add custom emoji and aliases`, `Manage animated images and emoji`). The product is famously emoji-centric; the marketing voice is not.

**Numbers are always footnoted.** Every statistic on the homepage and the Paid-vs-Free page carries a superscript resolving to a named source with a date, and two carry sample size and confidence interval. This is the most rigorous quantitative-claim practice in the five-product set. Against that, the footnote *mapping* on Paid-vs-Free is broken (two stats marked ² are given footnote ¹'s text), and the same figure appears with two denominators across pages (40,000 is not used here, but `5 hours` is "average time saved weekly with Slackbot" on one surface and the ROI figures shift between the 2020 and 2026 Forrester studies across the two pages without either being labelled current).

**Casing is inconsistent between site sections.** Marketing uses sentence case for buttons and headings; the help centre uses Title Case (`Sign In`, `Sign Up For Free`); the status page uses ALL CAPS for its three controls (`SUBSCRIBE TO UPDATES`, `SUBSCRIBE VIA EMAIL`, `SEE HISTORY`); nav group headers are ALL CAPS (`COLLABORATION`, `INTELLIGENCE`). Four casing conventions across one property.

**Accessibility content — the most developed of the five products, and the most self-contradicting** `[observed]`

Strengths:
- A dedicated `/accessibility` page, linked from the Features menu *and* the footer *and* the Marketplace menu.
- **A published `Accessibility changelog`** — a running record of accessibility fixes and improvements, announced in its own banner ("Stay up to date with the Slack accessibility changelog"). Shipping a changelog specifically for accessibility work is a commitment device: it makes the cadence public and auditable. No other product in this set does this.
- Seven dedicated help articles: `Accessibility in Slack` · `Use simplified layout mode in Slack` · `Navigate Slack with your keyboard` · `Use Slack with a screen reader` · `Canvas accessibility` · `Accessibility changelog` · `Slack keyboard shortcuts`.
- `Add alt text to images` as a user-facing help article, plus opt-in reminders prompting authors to add it.
- `Pause animation` / `Play animation` controls rendered beside **every** autoplaying video on the marketing pages, inline rather than in a settings panel. Reduced-motion preference also supported at the OS level.
- `Skip to main content` first in DOM on every page.
- Error screenshots carry genuinely descriptive alt text: "An error message that reads, Slack cannot connect." · "An error message that reads, For some reason, Slack couldn't load." · "A Slack channel with a message that reads, Last updated less than a minute ago... Load new messages" · "A browser window with an error message that reads, No internet" · "System preferences showing notifications enabled for Linear" [sic — see below]. Transcribing the error string *into the alt text* means the T7 lookup table works for non-sighted users.
- Homepage product screenshots have scene-level alt: "Slackbot is tagged in a channel and provides a summary of an ongoing incident" · "Slackbot responds to a question about upsell opportunities by pulling from Salesforce, Data 360, Tableau, and upcoming meetings" · "A Slack Connect channel shows a conversation between an internal team and external clients" · "A huddle in Slack shows a presentation for product launch strategy" · "A workflow builder outlines steps to send a message to a channel and add steps."
- `Simplified Layout Mode` described with five named beneficiary groups including non-disability ones.
- Named screen-reader support (NVDA, JAWS, VoiceOver, Talkback) with platform, plus screen-reader-specific shortcuts (replay last messages, summarise workspace activity).

Defects, on the same pages:
- **`filler alt`** shipped as the alt text on **three** images in the `Platform` pillar section of the homepage. A placeholder string in production, on the page that links to the accessibility commitment.
- **Numerous images with entirely empty alt on the homepage** (`![](<>)`), including all six trust-bar customer logos (`GM Logo`, `OpenAI Logo`, etc. have alt, but the pillar images and two customer-quote portraits do not) and the G2 award badges, which do have alt.
- **`Link may open in new tab` rendered as visible, announced link text** on ~18 links across the homepage and accessibility page — the warning precedes the link's identity in the accessible name (see T3).
- **Category scope sentences live only in `title` attributes** (see T1), so the copy written to help users self-route is hidden from keyboard and screen-reader users.
- **The ~350-word keyword blob** (see T8) sits in the reading order of every help page with no heading, landmark, or skip affordance.
- **Broken breadcrumb link** on every help article: the sub-section breadcrumb resolves to a bare `/section` placeholder URL.
- Two different skip-link targets (`#main_focusable` on marketing, `#main` on help).
- Heading structure on help category pages: sub-sections are `##` and the page has no `###` level, so ~170 sibling items sit flat under nine headings.

**Negative findings, recorded honestly**

- **The help-centre incident banner and the status page contradicted each other during harvest** (T9). The most serious finding in this file.
- **`Limited to 3 tools` vs `Limited to 10 apps`** for the same Free-plan limit on one page (T10).
- **`Limited to 30-min` vs `1:1 huddles only`** for the same Free-plan limit on one page.
- **`90-day history` vs "previous 12 months"** across the comparison and the FAQ on one page.
- **"Scaleable"** misspelled in a three-word homepage headline.
- **"Comment-only role for canvasvases just got a safer way to share."** — a garbled "What's new" entry on the homepage. The string appears to have lost a sentence boundary: "…for canvas" + "Canvases just got a safer way to share." A truncation defect in a release-notes feed.
- **`filler alt`** in production alt text, three times.
- **"System preferences showing notifications enabled for Linear."** — alt text on a macOS settings screenshot in Slack's notification article naming a *different product*. Either a copy-paste from another source or a genuinely wrong screenshot description.
- Four registration CTA labels; two sales CTA labels; two pricing CTA labels.
- `Get started` and `Get Started` on the same page.
- Bare `Learn more` at least six times, against 12 correctly-objected `Learn about X` links.
- `Oops! We're having trouble. Please try again later!` as the feedback-widget error, on pages whose own product errors are well written.
- `Education` solution page at `/solutions/distance-learning`; `Small Business` filed under `BY INDUSTRY`.
- Status-page footer nav is a rename cycle behind the main site (`App Directory`).
- Status-page `Privacy policy`-equivalent links absent; its footer omits legal links entirely.
- `Starred` and `Saved` article titles live adjacent in the same help sub-section.
- Broken breadcrumb `/section` link on every article.
- Support-topic pre-fill applied inconsistently within one article (`?topic_eid=64e8f7e3` on five links, a different parameter set on one).
- Footnote markers on the Paid-vs-Free page map two `²` stats to footnote `¹`'s text.
- `Change Region` control and the status-page subscribe controls each render twice per page.

---

## Transferable patterns

1. **Publish an error-string-to-problem lookup table.** Slack's `Common issues` table maps the exact string on the user's screen to the name of their failure class, then to its causes and recovery. Users search with the string, not the diagnosis — build the index in that direction. The single most reusable artefact in this file.
2. **Name the user-visible consequence, not the technical fault.** `Last updated less than a minute ago…` beside `Load new messages`, for a broken WebSocket connection. Truthful, non-alarming, and immediately actionable. Applies to any degraded-sync, stale-data, or partial-failure state.
3. **"For some reason" — concede ignorance in the error string.** Better than implying a cause you do not know, and it sets up genuine multi-cause troubleshooting. Condition: only where the cause really is unknown and the article that follows does the work.
4. **"…but we're looking into it."** Six words that convert a dead end into a wait. The one thing a user wants to know when the fault is server-side.
5. **Put the support-diagnostic action inside the error state.** `Restart Slack` and `Download Logs` sit below the connection error, so the two things support will ask for are available at the moment of failure. Pair with visible capture-state copy (`Your log is in progress` / `Stop Logging`) so background diagnostics are controllable.
6. **Settings section headers as second-person questions.** `How to notify you` / `What to notify you about` / `Also notify you about` / `What to show in Activity`. The user scans a sequence of questions and finds their intent, instead of inferring a mapping from nouns. Then shift to first person (`When I'm not active on desktop`) for the one setting that describes the user's own state.
7. **`Manage who can <verb>` as a permissions-article template.** Seven articles on one template, answering the admin's actual question ("who is allowed to do this specific thing") in the admin's own grammar. Directly transferable to any role or permission help IA.
8. **Seed the search box with the phrasings you want typed.** Three chips in three grammars — `How do I add people to a channel?`, `I need to reset my password`, `How can I upgrade my Slack plan?` — demonstrate that natural language works, and retrain query behaviour for an LLM-backed search. Label the search's provenance (`Powered by Agentforce`) so expectations match.
9. **Ship the rollout content, not just the product content.** `Email template for introducing Slack` and `Vendor and remittance details for Slack` are help articles written for the champion and the finance department. High leverage for any product whose adoption depends on someone else persuading a team.
10. **A five-level status legend, with `Maintenance` and `Notice` separated from failure.** Planned work is not an incident and a known condition is not a degradation. Plus: publish the uptime *methodology* and concede its limitation ("an average derived from the number of affected users").
11. **Make the negative feedback option socially easy, and give the user somewhere to blame the product.** `Not really` rather than "No", and `I don't like how the feature works` as one of four negative reasons — separating content failure from clarity failure from product failure. Route each somewhere different.
12. **Adopt the honest word for your product's failure mode, then write the detection guide.** `Identify hallucinations in Slackbot responses`, alongside `Guide to the Slack AI Guardrails`. Applies to any product surfacing model output.
13. **`Need to have, not nice to have`** — frame accessibility in the internal-prioritisation vocabulary that usually deprioritises it. And ship an **accessibility changelog** as a public commitment device.
14. **Repeat the feature name on both sides of a plan comparison,** with only the parenthetical constraint changing (`Messaging (90-day history)` / `Messaging (Unlimited)`). The reader never has to hold a column header in mind. Then keep the two comparison assets in sync — Slack did not, and the result is the most consequential defect in this file.

## Caveats & gaps

- **The `/pricing` page was not captured.** Its HTML exceeded the fetch tool's response limit (~77KB) and only the `<head>`, meta tags and nav were returned. Consequently **plan-tier names, per-seat prices, and the full feature matrix are absent from this file.** Only `Pro` is attested, from a single Paid-vs-Free FAQ answer; `Business+` and `Enterprise+` were *not* observed and are deliberately not written here. Any plan-naming claim for Slack must be re-harvested. Recorded per the brief as a size-blocked rather than domain-blocked fetch.
- **A live incident banner was active throughout the harvest** and contradicted the status page. This is reported as observed at one timestamp; it is possible the banner was stale rather than the status page wrong. Either reading is a synchronisation failure, but the direction of the failure is not determinable from static fetches.
- **In-product error strings are `[documented]`, quoted from help articles that describe and screenshot the UI.** They are high-confidence (the article reproduces them as bolded strings in a table and shows screenshots whose alt text transcribes them) but they were not observed live.
- **Empty states are genuinely absent** (T8), not merely unharvested. The two artefacts recorded are search-template scaffolding and a keyword blob, neither of which is an empty state. An authenticated pass or a session on `slackdemo.com` would be needed.
- **Help-article bodies were opened for only two articles** (`Troubleshoot connection issues`, `Configure your Slack notifications`), chosen for T7 and T5/T9 density. Roughly 340 titles were captured across four category pages; titles are high-signal for IA and task phrasing but say nothing about answer structure.
- **Two of six help categories unharvested**: `Connect tools & automate tasks` and `Tutorials & videos`. The former would carry app-approval and workflow vocabulary; the latter is the learning-content index.
- **`slack.com/trust/security`, `slack.com/trust`, `brand.slackhq.com`, `slack.design`, `api.slack.com` all unharvested.** `brand.slackhq.com` is the likely home of any published voice-and-tone guidance and was not reached — so, as with Notion and Linear, **no content style guide was located**, and all T14 voice findings are inferred from copy rather than read off a stated standard. Slack's design blog (`slack.design`) is linked from the accessibility page and would be the next place to look.
- **No feature-page harvest.** The 24 Features nav destinations (`/features/channels`, `/features/huddles`, `/features/ai`, etc.) were not fetched; they are the destinations of the 12 `Learn about X` links and would carry feature-level headline and state vocabulary.
- **Status-page incident *history* (`/calendar`) not fetched.** It would contain past incident narratives — the actual incident-communication copy — which is the main T9 gap given that the live incident produced only a banner.
- **Localisation not sampled.** Fourteen locales exist and the `Change Region` modal explicitly warns that content differs by region, so some patterns here may be en-US-only. Help-article slugs are localised (e.g. `205138367-Behebung-von-Verbindungsfehlern`), indicating genuinely translated rather than machine-proxied help content.
- **Mobile app copy not harvested** — out of the public web surface — though the notifications article documents mobile-specific labels (`Notify Me on Mobile`, `System settings`, `Sound`) which are recorded in T5.
- **The keyword blob's retired terms are dated by inference**, not by evidence — `hipchat`, `Stride` and `wunderlist` are known dead products, but the blob carries no timestamps.

## Sources

1. https://slack.com/
2. https://slack.com/pricing *(truncated — head and nav only)*
3. https://slack.com/pricing/paid-vs-free
4. https://slack.com/help
5. https://slack.com/help/categories/360000049043 *(Getting started)*
6. https://slack.com/help/categories/200111606 *(Using Slack)*
7. https://slack.com/help/categories/360000047906 *(Your profile & preferences)*
8. https://slack.com/help/categories/200122103 *(Workspace administration)*
9. https://slack.com/help/articles/205138367-Troubleshoot-connection-issues
10. https://slack.com/help/articles/201355156-Configure-your-Slack-notifications
11. https://slack.com/accessibility
12. https://slack-status.com/
