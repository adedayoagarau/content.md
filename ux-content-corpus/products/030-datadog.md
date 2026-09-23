# 030. Datadog

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Observability and monitoring — infrastructure, APM, logs, RUM, synthetics, security (CSPM/SIEM/WAAP), incident response, on-call |
| Primary URL | https://www.datadoghq.com/ |
| Corpus rank | 030 |
| Benchmark strength (source list) | Monitoring alerts and incident context |
| Locale / market observed | en-US (`/ko/` Korean resource cards render inline on the English homepage — see T14; `/ja/`, `/fr/`, `/es/` locales exist) |
| Platform observed | Web (marketing), docs (`docs.datadoghq.com`, every page served as `.md` with an `llms.txt` index), Statuspage status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Nine separately-operated regional instances with independent status pages, including two US government clouds (`ddog-gov.com`, `us2.ddog-gov.com`) and `UK1`; DevSecOps tier tracks "over 15 industry benchmarks including CIS, PCI DSS, SOC 2"; `Sensitive Data Scanner` and `Audit Trail` are billable products; `Data Residency` implied by the regional-instance model rather than stated as a feature flag |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Partial — (a) Datadog has no public help centre distinct from docs, so T11 is docs IA only; (b) the pricing page is ~112K characters across ~30 product panels and was read in extract (nav taxonomy, three infrastructure tiers, and four Common Questions blocks read in full; ~25 other product panels not read); (c) all in-product UI is behind auth, though monitor and incident copy is documented in unusual detail. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.datadoghq.com/ | Hero, nine product cards, rotating resource carousel |
| Pricing | https://www.datadoghq.com/pricing/ | ~30 product panels each with its own tiers and `Common Questions`; read in extract |
| Monitors overview | https://docs.datadoghq.com/monitors/ | Alerting-platform framing, `Alert on what matters` |
| **Configure Monitors** | https://docs.datadoghq.com/monitors/configuration/ | Threshold, aggregation, evaluation-window, no-data, auto-resolve, and grouping vocabulary |
| **Notifications** | https://docs.datadoghq.com/monitors/notify/ | Recipients, `@`-handle grammar, renotify, escalation, presets, test notifications |
| **Variables** | https://docs.datadoghq.com/monitors/notify/variables/ | 23 conditional variables, template variables, dynamic handles — the densest alert-content page in the corpus |
| Monitor Status Page | https://docs.datadoghq.com/monitors/status/ | Redirects to `status_page.md`; investigation framing |
| Incident Management | https://docs.datadoghq.com/incident_response/incident_management/ | Incident search syntax, declaration sources, integrations |
| **Describe an Incident** | https://docs.datadoghq.com/incident_response/incident_management/investigate/describe.md | The four incident status levels with definitions |
| Status page (US1) | https://status.datadoghq.com/ | 39 components, nine-region routing block, one live incident |

---

## T1 Navigation & IA labels `[observed]`

### Pricing IA — eight categories, and it is the clearest statement of what Datadog sells

`AI` · `Infrastructure` · `Applications` · `Data Observability` · `Logs` · `Security` · `Digital Experience` · `Software Delivery` · `Service Management`

Nine groups holding roughly thirty products. Two observations.

**(a) The grouping axis is the *layer of the stack being observed*** — infrastructure, applications, data, logs, digital experience — with `Security`, `Software Delivery`, and `Service Management` as three cross-cutting additions. `AI` was promoted to first position and holds `AI Credits` and `Agent Observability`.

**(b) Products appear in two categories where they genuinely belong to both.** `Serverless Monitoring` is listed under both `Infrastructure` and `Applications`; `Error Tracking` under both `Logs` and `Digital Experience`. Duplicating a nav entry rather than forcing a single home is the right call when the reader's mental model legitimately differs — but it is unusual, and most IA reviews would flag it as an error.

**The availability disclaimer is the notable content decision.** Roughly twenty of the thirty pricing links carry the appended string **`This product is currently unavailable on the US-FED site.`** — concatenated directly into the link text, so the accessible name of the link is `Storage Management This product is currently unavailable on the US-FED site.`

Datadog renders the *entire* product catalogue to a US-Federal visitor and marks each unavailable item in place, rather than hiding them. For a customer in a regulated government context, knowing what they cannot have is as operationally important as knowing what they can. The execution is poor (see T14 — it destroys the link's accessible name), but the principle — **show the whole catalogue and mark the exclusions in place** — is correct for a compliance-segmented product.

### Homepage product cards — nine, each a noun plus a fragment

| Product | Tagline (verbatim) |
|---|---|
| `Infrastructure` | "From overview to deep details, fast" |
| `Log Management` | "Analyze and explore your logs for rapid troubleshooting" |
| `APM` | "Monitor, optimize, and investigate app performance" |
| `Bits AI` | "AI agents that chat, investigate, and remediate issues" |
| `Security` | "Outpace AI-powered attacks with unified security and observability" |
| `Network Monitoring` | "Analyze network traffic patterns across your cloud environments" |
| `Synthetic Monitoring` | "Proactive, AI-driven monitoring of critical application features" |
| `Real User Monitoring` | "Monitor user journeys and frontend performance in one place" |
| `Serverless` | "A comprehensive view of your serverless application" |

Nine taglines, no full stops, six to ten words each. Four are **verb-first imperatives** (`Analyze`, `Monitor`, `Outpace`), five are noun phrases. `From overview to deep details, fast` is the best of them — a range claim plus a one-word speed claim, no verb at all.

`Bits AI` — "AI agents that chat, investigate, and remediate issues" — is the only card whose tagline is a **tricolon of escalating autonomy**: chat (talk), investigate (look), remediate (act). Three verbs ordered by how much the agent does without you, which is exactly the disclosure a buyer needs about an agentic product.

### Docs IA — breadcrumbs as the primary structure

Every docs page carries a `breadcrumbs` front-matter field, and the nesting is deep and explicit:

`Docs > Monitors` · `Docs > Monitors > Notifications` · `Docs > Monitors > Notifications > Variables` ·
`Docs > Monitors > Monitor Status > Monitor Status Page` ·
`Docs > Incident Response > Incident Management` ·
`Docs > Incident Response > Incident Management > Incident Investigation > Describe an Incident`

That last one is **five levels deep**. Datadog's docs IA is genuinely hierarchical rather than flat-plus-search, and the breadcrumb is published as structured metadata on every page — which is why a fetched `.md` file is self-locating even out of context.

The top-level grouping visible from these breadcrumbs: `Monitors`, `Incident Response`, `Integrations`, `Account Management`, `Getting Started`, `Actions`, `Logs`, `Synthetics`, `Internal Developer Portal`, `Security`, `Dashboards`, `Notebooks`, `API`, `Mobile`, `Coterm`.

**`Incident Response` as a top-level docs section** holding `Incident Management`, `On-Call`, `Status Pages`, and `Work Management` is a 2026 consolidation worth recording — Datadog now documents the whole PagerDuty-plus-Statuspage-plus-Jira workflow as one section of its own docs.

Every docs page also opens with the same machine-directed line:
> "For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt)."

### Section-heading grammar inside docs

The monitors overview uses four headings that together form an argument rather than a table of contents:

`Overview` → `Get started` → **`Analyze aggregate data`** → **`Alert on what matters`** → `What's next`

`Alert on what matters` is borrowed from Datadog's own long-running `Monitoring 101` blog series (linked in the page's further reading), and it functions as a principle heading rather than a feature heading. The section under it is about *reducing* alerts: "Reduce alerting fatigue so teams can focus on resolving alerts when it matters." **A documentation section whose purpose is to talk the reader out of alerting more.**

### Status-page routing block — nine regions, each mapped app URL → status URL

Under `About This Site`:

> "The status of Datadog `https://app.datadoghq.com`"
> "If you would like to see the status of third party integrations you might have enabled with Datadog check out `https://datadogintegrations.statuspage.io`"
> "If you are a customer running in another region:"
> - `our EU region app.datadoghq.eu` → `status.datadoghq.eu`
> - `our US3 region app.us3.datadoghq.com` → `status.us3.datadoghq.com`
> - `our US5 region` · `our AP1 region` · `our GovCloud region app.ddog-gov.com` · `our AP2 region` · `our US2 Gov region` · `our UK1 region`

**Nine separate status pages, and the disambiguation key is the URL the customer already has in their browser.** A Datadog user does not necessarily know whether they are on "US5" or "AP2" — but they absolutely know which URL they log into. Routing by the app hostname rather than by a region name the customer may never have seen is the correct affordance, and it is the single smartest piece of wayfinding in this batch.

A tenth link separates **third-party integration status** onto its own page (`datadogintegrations.statuspage.io`) — the same who-owns-the-fault partition Twilio makes structurally (file 027), here made by splitting the page entirely.

## T2 Value proposition & headline patterns `[observed]`

**Hero**

> `AI-Powered Observability and Security`
> "See inside any stack, any app, at any scale, anywhere."

The subhead is the durable asset. **Four `any`-constructions in eight words**, three parallel (`any stack, any app, at any scale`) and a fourth breaking the pattern (`anywhere`) to close. It is also reused verbatim as the `Infrastructure` panel's subheading on the pricing page and as the site's `meta-description`. **One sentence doing hero, product-panel, and search-snippet duty** — which is why it has survived; the homepage's `meta-article:published_time` is `2016-07-14`.

The headline itself is a bare category string with an `AI-Powered` prefix. No verb, no claim, no differentiation — all the work is in the subhead. Compare Sentry's `Code breaks, fix it faster` (file 029), which puts the argument in the headline and the deflation in the subhead. Datadog does the reverse: flat headline, memorable subhead.

CTAs beneath: `Free trial` and `SEE THE PLATFORM` (the second in caps).

**Pricing headline**

> `Pricing`
> `Flexible, transparent pricing designed to scale with your business`
> `Multi-Year/Volume discounts available`

`transparent` is the load-bearing word, and it is doing more work than the page can support — see T10. The third line is a bare fragment offering discounts before any price has been shown.

**Per-product pricing subheadings are benefit sentences, not descriptions:**
`See inside any stack, any app, at any scale, anywhere` (Infrastructure) ·
`Analyze and explore log data in context with flexible retention` (Log Management) ·
`Improve the performance of your cloud-scale  applications end to end, down to a single line of code` (APM — note the **double space** after "cloud-scale") ·
`Reduce time to incident resolution and help teams move faster with AI built for your stack.` (AI Credits) ·
`Track, enforce, and improve test coverage across your entire codebase in one platform` (Code Coverage) ·
`Detect root causes and control releases at scale by connecting every feature flag to real-time telemetry.` (Feature Flags)

Six subheadings, **two with terminal full stops and four without.** A consistency defect repeated across ~30 panels.

`down to a single line of code` is the best clause in the set — a scale claim that ends at the smallest possible unit, mirroring the hero's "any scale" in the opposite direction.

**Tier descriptors** (Infrastructure) are capability sentences rather than audience sentences:
- `Free`: "Core collection and visualization features"
- `Pro`: "Centralize your monitoring of systems, services, and serverless functions"
- `Enterprise`: "Advanced features and administrative controls"

`Enterprise` is described as *features plus controls* — the admin/governance half is named explicitly rather than implied, which is honest about what the tier actually buys.

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Free trial` | Homepage hero | Lower case |
| `Free Trial` | Pricing header | Title case — second casing |
| `Start Free Trial` | Pricing, each tier card | Third variant |
| `SEE THE PLATFORM` | Homepage hero | All caps |
| `Get Started` | Homepage nav | Links to the homepage itself — see below |
| `Contact Us` | Pricing header | |
| `Login` | Homepage nav | |
| `Learn more` | Homepage product cards (×9) | Nine identical labels for nine different products |
| `LEARN MORE` | Homepage resource carousel | All caps — second casing of the same label on one page |
| `Get the eBook` | Resource carousel (×3, three clouds) | |
| `Read the full report` · `Learn more` | Analyst cards | |
| `SIGN UP` | Docs enablement callout | All caps inside documentation |
| `Chat` | Pricing page, bare | Unlabelled chat launcher |
| `Subscribe to Updates` / `Subscribe` | Status page | Rendered `Subscribe to UpdatesSubscribe` |
| `Subscribe via Slack` · `Change number` · `Resend OTP` · `Edit number` · `Send OTP` | Status subscription | |
| `Add Mention` · `Add Workflow` · `Add Case` · `Add Incident` · `Add Variable` · `Add Workflow` | In-product, documented | `@ Add Mention` retains a leading `@` in the label |
| `Test Notifications` · `Run Test` | In-product, documented | |
| `Use message template variables` | In-product, documented | A control whose label is an instruction |
| `Edit` · `Clone` · `Export` · `Permissions` · `Delete` | Monitor header, documented | |
| `Not Muted` | Monitor header, documented | **A status that is also a button** — see T6 |
| `Edit Access` · `Restrict Access` · `Restore Full Access` · `Done` | Permissions dialog, documented | |
| `Thread Notifications` | Notification rule setting, documented | |
| `Start From Scratch` · `Blueprint` | Workflow creation, documented | |
| `Remove the non-reporting group after N` | Group-retention control, documented | Label with an embedded variable |

**Observations.** Three casings of the free-trial CTA (`Free trial`, `Free Trial`, `Start Free Trial`) and two of `Learn more` / `LEARN MORE` on a single page. Nine identical `Learn more` links on the homepage product grid — the same accessibility problem flagged in files 027 and 028.

**Defect:** the homepage nav's `Get Started` links to `https://www.datadoghq.com/` — the page the user is already on. A primary conversion CTA that goes nowhere.

The in-product labels are markedly better than the marketing ones. **`Not Muted`** is the standout: the monitor header shows a *state* (`Not Muted`) which is simultaneously the affordance for changing it, documented as "The monitor is not muted, but you can click Not Muted to see options to create a downtimes for this monitor." State-as-button is a compact pattern — it reports and offers in one element — though the alt text quoted here contains its own grammar error ("a downtimes").

**`Use message template variables`** as a control label is an imperative telling the user what the control is for rather than naming the control. In a configuration screen crowded with unfamiliar concepts, a button labelled with its purpose beats one labelled with its noun.

## T4 Onboarding & getting-started `[observed]`

Datadog's onboarding content is unusual in that it routes to a **sandbox learning platform** before it routes to the product.

> "The fastest way to start with Datadog Monitors is with **Monitor templates**. These are a collection of monitors within Datadog that are **preconfigured by Datadog and integration partners**."
> "You can also build your own monitors from scratch **in lab environments in the Learning Center**, or in your application by following the Getting Started with Monitors guide."

Three named entry paths, ordered by decreasing hand-holding:
1. `Monitor templates` — preconfigured, by Datadog and by partners
2. `Learning Center: Build a monitor in a sandbox lab environment` (`learn.datadoghq.com`)
3. `Getting started with Monitors: Guide on how to build a metric based monitor`

**Templates first.** For a product whose core task (writing a correct alert condition) is genuinely hard and whose failure mode (a noisy or silent monitor) is expensive, starting from someone else's known-good configuration is the right default. Naming `integration partners` as co-authors of the templates is a small credibility move.

The link labels follow a **`<Label>: <what you will do>`** colon construction:
`Getting started with Monitors: Guide on how to build a metric based monitor` ·
`Learning Center: Build a monitor in a sandbox lab environment` ·
`Create a monitor from Monitor Types`

`Incident Management requires no installation.` — a four-word onboarding promise opening the Incident Management get-started section, followed by three routes (Learning Center course, guided walkthrough, declare an incident). Leading with the *absence* of a setup step is the fastest possible onboarding sentence for a product that has none.

**The configuration flow is documented as four named stages**, and this is the clearest task decomposition in the file:

> - **Define the search query**: "Construct a query to count events, measure metrics, group by one or several dimensions, and more."
> - **Set alert conditions**: "Define alert and warning thresholds , evaluation time frames, and configure advanced alert options."
> - **Configure notifications and automations**: "Write a custom notification title and message with variables. Choose how notifications are sent to your teams (email, Slack, or PagerDuty). Include workflow automations or cases in the alert notification."
> - **Define permissions and audit notifications**: "Configure granular access controls and designate specific roles and users who can edit a monitor. Enable audit notifications to alert if a monitor is modified."

Four stages mapping to: *what am I watching* → *when is it bad* → *who hears about it* → *who may change this*. The fourth is the one most products omit — **governance of the alert itself as a step in creating the alert**, with `audit notifications to alert if a monitor is modified` (an alert about changes to your alerts).

(Note the stray space before the comma in "evaluation time frames ,".)

**Preview as onboarding content.** Two named preview graphs let a user see the consequences of their configuration before saving:

- `Evaluated Data` — "shows how your monitor **would have evaluated** the data using your current query and thresholds", with four stated benefits: "See historical state transitions (for example, `OK` → `ALERT`)" · "Understand how your monitor would have behaved" · "Preview **who would be notified** (including from notification rules)" · "**Quickly spot misconfigurations before saving.**"
- `Source Data` — "displays the raw timeseries or query output for your monitor, **without any threshold evaluation or alert logic applied**"

Counterfactual past tense throughout (`would have evaluated`, `would have behaved`, `would be notified`). The feature answers "what would this alert have done last week?" and the copy is written entirely in that mood. **Previewing the recipient list, not just the outcome**, is the detail worth stealing — the most common alerting error is paging the wrong team, and it is invisible until it happens.

**Test notifications** close the loop: "After defining your monitor, test the notifications with the **Test Notifications** button at the bottom right of the monitor page." The test's output is itself marked: notifications "indicate who initiated the test in the message body with **`[TEST]`** in notification title." A prefix token so a recipient at 3am can tell a drill from a page — and it names *who ran the drill*, so the recipient knows whom to ask.

The docs then bound the feature honestly: "You can only test states that are available in the monitor's configuration for the thresholds specified in the alerting conditions. **Recovery thresholds are an exception**", and list the thirteen monitor types that support testing. A capability, its limits, and its exception, in one paragraph.

## T5 Form & field labels `[observed] / [documented]`

Datadog's public forms are minimal (Statuspage subscription, a demo-request modal). The documented configuration vocabulary is extensive and is the real T5 artefact.

**Statuspage subscription** — the same template as files 027–029, with one addition: **Datadog is the only one of the four to enable the Microsoft Teams channel**, which carries its own field and a help link:
- `Channel's Webhook URL:` + `Here's where to find the URL of a teams channel`
- Plus the usual `Email address:` · `Enter OTP:` · `Resend OTP in:  seconds` (**double space, empty interpolation**) · `Country code:` · `Phone number:` · `Webhook URL:` with hint `The URL we should send the webhooks to` · optional `Email address:` with hint `We'll send you email if your endpoint fails`

**Defect:** Datadog's Statuspage consent strings **drop the first-party privacy policy entirely.** Where Twilio, Postman, and Sentry all read "By subscribing you agree to our Privacy Policy, the Atlassian Terms of Service, and the Atlassian Privacy Policy", Datadog's reads only "By subscribing you agree to the Atlassian Terms of Service, and the Atlassian Privacy Policy." A user subscribing to Datadog's status updates is shown Atlassian's privacy terms and not Datadog's. Same vendor, same template, one field left unconfigured.

**Documented monitor-configuration labels** `[documented]`:

| Label / option (verbatim) | Notes |
|---|---|
| `Alert threshold (required)` | "The value used to trigger an alert notification." |
| `Warning threshold` | "The value used to trigger a warning notification." |
| `Alert recovery threshold` | "An optional threshold to indicate an additional condition for alert recovery." |
| `Warning recovery threshold` | |
| `average` / `max` / `min` / `sum` | Aggregation methods, each with a behavioural definition |
| `Trigger when the average, max, min, or sum of the metric is` | A **sentence-shaped control** — see below |
| `above, above or equal to, below, or below or equal to the threshold` | Four comparators spelled out in words |
| `during the last 5 minutes, 15 minutes, 1 hour, or custom` | |
| `Current hour` / `Current day` / `Current month` | Cumulative window options |
| `Evaluate as zero` / `Show last known status` / `Show NO DATA` / `Show NO DATA and notify` / `Show OK` | The five missing-data behaviours |
| `[Never], After 1 hour, After 2 hours and so on.` | Auto-resolve options |
| `Remove the non-reporting group after N` | Group retention |
| `Delay the evaluation start by N seconds for new groups` | New group delay |
| `Delay evaluation by N seconds` | Evaluation delay |
| `Simple Alert` / `Multi Alert` | Aggregation modes |
| `Trigger the alert after selected consecutive failures: <NUMBER>` | Check alerts |
| `Resolve the alert after selected consecutive successes: <NUMBER>` | Check alerts |
| `Default` / `Hide Query` / `Hide Handles` / `Hide All` | Notification content presets |
| `stop renotifying after 1 occurrence` | Renotify limit, phrased as a sentence |

**The alert condition is a fill-in-the-blank sentence.** "Trigger when the **[average]** of the metric is **[above]** the threshold during the last **[5 minutes]**" — three dropdowns embedded in one English sentence. The user reads their alert logic as prose while constructing it, which is why the comparators are written out (`above or equal to`) rather than shown as `>=`. For a configuration whose most common failure is a misread inequality, spelling the operator in words is the correct trade against compactness.

**The five missing-data options are each given a status consequence, in a table with the column header `Monitor status & notification`:**

| Option | Consequence (verbatim) |
|---|---|
| `Evaluate as zero` | "Empty result is replaced with zero and is compared to the alert/warning thresholds. For example, if the alert threshold is set to `> 10`, a zero would not trigger that condition, and the monitor status is set to `OK`." |
| `Show last known status` | "The last known status of the group or monitor is set." |
| `Show NO DATA` | "Monitor status is set to `NO DATA`." |
| `Show NO DATA and notify` | "Monitor status is set to `NO DATA` and a notification is sent out." |
| `Show OK` | "Monitor is resolved and status is set to `OK`." |

**The option labels are written as what the monitor will *show*, and the consequence column says what it will *do*.** `Show NO DATA` vs `Show NO DATA and notify` differ by exactly one clause in both the label and the consequence — so the reader can see that the only difference is the page. And `Evaluate as zero` is the one whose consequence is non-obvious, so it gets a worked example with a real threshold.

There is also a **precision note most style guides would miss**: "When entering decimal values for thresholds, if your value is `<1`, add a leading `0` to the number. For example, use `0.5`, not `.5`." A one-sentence input-format rule placed at the field it governs.

## T6 Status & state language `[observed]` — richest category, with T7 and T9

### Two severity vocabularies inside one product

**Metric and query monitors** use: `OK` · `WARN` / `WARNING` · `ALERT` · `NO DATA` · `UNKNOWN`

**Check monitors** use: `OK` · `WARN` · `CRITICAL`

> "Each check run submits a single status of `OK`, `WARN`, or `CRITICAL`."

So a Datadog user learns `ALERT` as the top severity for metric monitors and `CRITICAL` as the top severity for check monitors. The two never appear in the same table, and nothing on the pages read reconciles them. This is almost certainly historical — `CRITICAL` is the Nagios check convention Datadog inherited — but the effect is that **the word for "the bad one" depends on which kind of monitor you opened.** Recorded as the most consequential terminology defect in this file.

Casing is also unstable. Within the variables page alone: `ALERT`, `WARNING`, `UNKNOWN`, `NO DATA` in one table row; `alert`, `warn`, `no data` in the renotify prose; `OK`, `Alert`, `Warn`, and `No Data` given as "Possible values for the status" of a composite sub-monitor; `status:Alert` and `status:log` in the monitor-link parameter examples, with `WARN`, `NO DATA`, and `OK` listed as the alternatives in the same sentence. **Four casings of the same five states across one page.**

`UNKNOWN` deserves a note: it exists as a conditional variable (`{{#is_unknown}}` — "The monitor is in the unknown state") and as a recovery source, but **no page read defines when a monitor becomes `UNKNOWN`** or how it differs from `NO DATA`. A state with a notification hook and no documented entry condition.

### The state machine is documented as *transitions*, not just states

This is Datadog's distinctive contribution and the reason it belongs in this corpus.

The conditional-variable table is effectively a published transition map:

| Variable | Transition it detects |
|---|---|
| `{{#is_alert}}` | into `ALERT` |
| `{{#is_warning}}` | into `WARNING` |
| `{{#is_no_data}}` | "The monitor is triggered for missing data" |
| `{{#is_unknown}}` | into `UNKNOWN` |
| `{{#is_recovery}}` | "The monitor recovers from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA`" |
| `{{#is_warning_recovery}}` | "recovers from `WARNING` to `OK`" |
| `{{#is_alert_recovery}}` | "recovers from `ALERT` to `OK`" |
| `{{#is_alert_to_warning}}` | "transitions from `ALERT` to `WARNING`" |
| `{{#is_no_data_recovery}}` | "recovers from `NO DATA`" |
| `{{#is_renotify}}` | the monitor is repeating itself |
| `{{#is_priority 'value'}}` | priority is `P1`–`P5` |

Each has a negated twin (`{{^is_alert}}` and so on) — 23 variables in total.

**`{{#is_alert_to_warning}}` is the pattern worth isolating.** A transition from `ALERT` to `WARNING` is *partial recovery*: things are better but not fixed. Most alerting systems have no way to express this — the state is still "bad", so either nothing fires or a full recovery fires wrongly. Datadog gives partial recovery its own hook, so a team can send "we're out of the danger zone but still degraded" as its own message.

And the docs flag the exact trap that arises from it:
> "**Note**: For `ALERT` to `WARNING` transitions, `{{#is_alert_recovery}}` recipients receive notifications **without message bodies**. Use `{{#is_alert_to_warning}}` to include messages"

An empty-notification bug, documented in the table cell of the variable that causes it. (The note has no terminal full stop.)

### `{{first_triggered_at}}` vs `{{last_triggered_at}}` — a four-row transition table

The clearest piece of state documentation on any page in this batch. Two timestamp variables whose difference is subtle, disambiguated by tracing one incident through four transitions:

| Transition | `first_triggered_at` | `last_triggered_at` | `triggered_duration_sec` |
|---|---|---|---|
| `OK` → `WARN` | A | A | 0 |
| `WARN` → `ALERT` | A | B | B - A |
| `ALERT` → `NO DATA` | A | C | C - A |
| `NO DATA` → `OK` | A | C | D - A |

With the rule stated above it: "`{{first_triggered_at}}` is set when the monitor group goes from `OK` to a non-`OK` state… `{{last_triggered_at}}` gets set when the monitor group goes to a non-`OK` state **independently from its previous state** (including `WARN` → `ALERT`, `ALERT` → `WARN`)."

And a warning about when the values are *not* what you expect:
> "…reflect the values when a monitor **changes state**, **NOT** when a new monitor event occurs. Renotification events show the same template variable if the monitor state has not changed."

**A worked trace through a state machine, with the variable values at each step and a stated gotcha.** This is the right way to document any pair of similar-sounding timestamps, and the fourth row is the instructive one — after recovery, `last_triggered_at` stays at C (the last bad transition) while `triggered_duration_sec` becomes D − A (the whole incident). Three variables, three different answers to "when", all correct.

### Incident status levels — four, each one sentence, and one is unusual

> The default statuses are **Active**, **Stable**, and **Resolved**. You can add the **Completed** status and customize the description of each status level in the Incident Settings page.

| Status | Definition (verbatim) |
|---|---|
| `Active` | "Incident affecting others." |
| `Stable` | "Incident no longer affecting others, but investigations incomplete." |
| `Resolved` | "Incident no longer affecting others and investigations complete." |
| `Completed` | "All remediation complete." |

**Four states, four definitions, none longer than eight words, and the definitions are built compositionally from two independent facts: *is it still hurting people* and *is the work finished*.**

- `Active` = hurting, work unfinished
- `Stable` = not hurting, work unfinished
- `Resolved` = not hurting, investigation finished
- `Completed` = not hurting, remediation finished

**`Stable` is the finding.** Every incident process has this moment — the bleeding stopped, nobody knows why yet — and most tooling forces a binary choice between "ongoing" (which over-pages) and "resolved" (which is a lie). Naming it `Stable` lets the responder truthfully stand down the customer-facing urgency while keeping the investigation open. It is the incident-management equivalent of Sentry's `Ongoing` (file 029): a name for the state everyone experiences and nobody labels.

The `Resolved` / `Completed` split is the second half of the same idea: *we understand it* and *we have fixed it for good* are different milestones, and the remediation tail usually outlives the incident channel. `Completed` is opt-in, which is honest — most organisations will not track it.

**And the statuses are customisable:** "You can add the `Completed` status and **customize the description of each status level**." The definitions above are defaults a customer can overwrite. Shipping a state machine whose *labels' definitions* are editable is a real product decision — it acknowledges that incident vocabulary is organisationally specific.

### Two priority scales for two objects

- **Monitors**: `P1` through `P5`, "with P1 being the highest priority and the P5 being the lowest" (note the stray `the`). Overridable per-state via `{{override_priority 'Pi'}}`.
- **Incidents**: `SEV-1`, `SEV-2`, … , used in search examples (`severity:SEV-1`, `severity:(SEV-1 OR SEV-2) state:active`).

**A monitor has a `P`-level; an incident has a `SEV`-level.** The distinction is defensible — a monitor's priority is a standing property set at configuration time, while an incident's severity is assessed live — but nothing on the pages read connects them, and a monitor that auto-declares an incident crosses the boundary with no documented mapping. Two five-point scales, two prefixes, one workflow.

The `{{override_priority}}` mechanism is elegant though: the same monitor can page at `P1` when it alerts and `P4` when it merely warns, using the state-conditional blocks:

```
{{#is_alert}}{{override_priority 'P1'}} ... {{/is_alert}}
{{#is_warning}}{{override_priority 'P4'}} ... {{/is_warning}}
```

**Urgency as a function of state rather than a property of the monitor.** That is the right model, and it is expressible in four lines.

### Status-page components — 39, alphabetical, flat

`APM` · `App Builder` · `Application Security Management` · `Application Vulnerability Management` · `Audit Trail` · `Bits AI` · `CI Visibility` · `Cloud Cost Management` · `Cloud Network Monitoring` · `Cloud Security Management` · `Cloud SIEM` · `Code Coverage` · `Code Security` · `Container Registry` · `Continuous Profiler` · `Database Monitoring` · `Data Jobs Monitoring` · `Data Streams Monitoring` · `Error Tracking` · `Incident Response` · `LLM Observability` · `Log Management` · `Metrics and Infra Monitoring` · `Mobile Application` · `Monitors` · `NDM` · `Observability Pipelines` · `Package Repositories` · `Product Analytics` · `RUM` · `Sensitive Data Scanner` · `Serverless` · `Synthetics` · `Test Optimization` · `Universal Service Monitoring` · `Web Application` · `Workflow Automation` · `Workload Protection` · `www.datadoghq.com`

**Flat and alphabetical — no grouping at all**, unlike Twilio's fault-source partition, Sentry's regional ingestion tree, or Postman's US/Europe split. With 39 components this is scannable, and because each regional instance has its own page the region dimension is already factored out. A defensible choice, though it means a customer cannot see at a glance which failures are ingestion-side versus UI-side.

Three naming defects: **`NDM` and `RUM` appear as bare acronyms** while their siblings are spelled out (`Cloud Network Monitoring` is present *and* `NDM` — plausibly Network Device Monitoring — with no expansion). `Metrics and Infra Monitoring` uses the abbreviation `Infra` where the pricing page says `Infrastructure`. And `www.datadoghq.com` appears as a component name in a list otherwise made of product names — correct in substance (the marketing site can be down independently) but jarring in form.

**`Mobile Application` and `Web Application` as separate components** is a good split: the mobile app and the browser UI fail independently, and a user reaching for their phone during an incident needs to know which.

### Meta-observation, recorded because it is instructive rather than as criticism

At harvest, the `Monitors` component read **`Monitors — Degraded Performance`** and the single open incident was titled **`Delayed Monitors Notifications`**:

> **`Investigating`** — "We are investigating delayed evaluations for metric, service check, composite, and SLO monitors in US1 which began at Sep 21, 2026, 9:18 AM UTC."

The alerting product's own alerting was delayed. This is the failure mode unique to monitoring vendors — **when the monitor is down, the customer's detection of everything else is down too** — and the update handles it correctly by naming the four affected monitor types (`metric, service check, composite, and SLO`) and the exact onset time in UTC. A customer can compute whether their own gap in pages is explained by this.

## T7 Error, failure & recovery `[observed]`

Datadog publishes no error-code dictionary. Its failure content is (a) the recovery semantics of the alerting system and (b) its own incident communication.

### The recovery-notification rule, stated as a recommendation

> "If you configure a conditional block for a state transition into `alert` or `warning` conditions with an **@-notifications** handle, Datadog recommends that you configure a corresponding `recovery` condition to send a recovery notification to the handle."

**If you tell someone it broke, tell the same someone it is fixed.** One sentence, and it closes the single most common alerting-content failure: teams write an `is_alert` block with a PagerDuty handle and never write the matching `is_recovery`, so the page never clears and the channel fills with unresolved alarms.

Datadog states the underlying scoping rule immediately after, and it is the sentence that makes the whole templating system comprehensible:

> "**Note**: Any text or notification handle placed **outside** the configured conditional variables is invoked with **every** monitor state transition. Any text or notification handle placed **inside** of configured conditional variables is only invoked if the monitor state transition matches its condition."

Inside the block = conditional; outside the block = always. Two clauses, and a reader now understands recipient scoping for every template they will ever write.

### Recovery thresholds — hysteresis, explained by example

> "Monitors recover automatically based on the alert or warning threshold but additional conditions can be specified… For example, if a monitor alerts when the metric is above `3` and recovery thresholds are not specified, the monitor recovers once the metric value goes back below `3`."

Four threshold fields (`Alert threshold`, `Warning threshold`, `Alert recovery threshold`, `Warning recovery threshold`) let a user set a gap between trigger and clear, which stops a metric oscillating around the line from flapping the channel. The default behaviour is stated with a concrete number before the optional behaviour is introduced.

### `Auto resolve` — a feature documented with advice against using it

> "Auto-resolve works when data is no longer being submitted. Monitors **do not** auto-resolve from an `ALERT` or `WARN` state if data is still reporting."
> "For some metrics that report periodically, it may make sense for triggered alerts to auto-resolve… For example, if you have a counter that reports only when an error is logged, the alert never resolves because the metric never reports `0` as the number of errors."
> "**In most cases this setting is not useful** because you only want an alert to resolve after it is actually fixed. So, in general, it makes sense to leave this as `[Never]` so alerts only resolve when the metric is above or below the set threshold."
> "**Note**: If a monitor auto-resolves and the value of the query does not meet the recovery threshold at the next evaluation, **the monitor triggers an alert again.**"

Four moves in one section: state the precondition, give the one legitimate use case with a concrete example, **tell the reader not to use it**, then warn them what happens if they do anyway (an alert-resolve-alert loop). Documentation arguing against its own feature, with the failure mode named.

This is the same posture as Stripe's "use SMS-based MFA only as a last resort" (file 026). Both are cases where the honest recommendation costs the vendor nothing and buys the reader real protection.

### `Renotify` — reminding is framed as a failure of resolution, not of attention

> "Enable monitor renotification (optional) to **remind your team that a problem is not solved.**"

Not "in case they missed it" — the framing is that the *problem* persists, not that the *reader* was inattentive. And the mechanism is bounded three ways: an interval, a set of states to renotify from ("within `alert`, `no data`, and `warn`"), and an optional cap ("`stop renotifying after 1 occurrence` to receive a single escalation message after the main alert").

The escalation-message guidance is genuinely good advice about repetition:
> "If you use the `{{#is_renotify}}` block, the original notification message is also included in the renotification, so:
> 1. Include **only extra details** in the `{{#is_renotify}}` block and don't repeat the original message details.
> 2. Send the escalation message to a **subset** of groups."

**Don't repeat yourself in the escalation, and escalate to fewer people, not more** — the second is counterintuitive and correct: an escalation that widens the audience each time trains everyone to ignore it.

The worked example shows the inverse construction with `{{^is_renotify}}`, producing three content zones — first-alert-only, always, escalation-only — with the rendered output shown. Documentation that shows the rendered result of a template, not just the template.

### Monitor status page as an investigation surface

> "When a monitor alerts, **the first place to start your investigation** is the monitor status page. This page displays graphs and events to show you **why** your monitor is in an alert status, so you can understand **what is happening around** a monitor alert."

Three stated purposes:
> - "Review all the context you need to start an investigation"
> - "Investigate the possible cause of an alert"
> - "Take action to **escalate, maintain, or resolve** your investigation"

**`escalate, maintain, or resolve`** — three outcomes, and `maintain` is the one that earns its place: sometimes the correct action after triage is to keep watching. Offering "do nothing yet, deliberately" as a named third option rather than forcing escalate-or-close is honest about how triage actually goes.

The resolve semantics are then stated with an explicit caveat about what the button does *not* mean:
> "Resolving from the header resolves all groups in the alert and sets the monitor status to `OK` (all groups). The `resolve` function **temporarily changes the monitor status to `OK` until its next evaluation**, but the next evaluation proceeds as normal based on current data."

Manually resolving does not suppress anything — if the condition is still true, the monitor re-alerts on the next tick. Saying so prevents a responder from believing they have silenced something they have not. **Documenting the limit of a resolve button is more useful than documenting the button.**

`Event details` is scoped to a specific diagnostic question: "Use Event details to troubleshoot **if the monitor is alerting due to recent configuration changes.**" Configuration change as a first-class alert hypothesis.

And the cross-product principle: "You can explore different product areas **while maintaining the same alerting context**, ensuring you view the same timeframe and service parameters as on your monitor's status page. You can take the query to other product areas to troubleshoot and cross reference **without losing context.**" Context preservation across tools, stated twice in one paragraph.

### Incident communication — only two incidents in the window, and they differ in quality

**`Delayed events triggered by emails`** (20 Sep), two updates:

> **`Investigating`** — "We are investigating increased latency processing Events coming from inbound emails. **As a result of this issue, some users may see delays or gaps in the event stream or for event queries on dashboards and for events based workflows such as on-call notifications**"

The subordinate clause is the good part: it translates an internal cause (email-ingestion latency) into **three observable customer symptoms** (event-stream gaps, dashboard query gaps, on-call notification delays). A customer who does not know what "inbound email events" means still learns that their on-call pages may be late. **Translate the cause into the symptoms the customer will actually notice**, in the same sentence.

> **`Resolved`** — "The issue is now resolved. All events from emails are being timely processed and **we went through the backfill.**"

Two-part resolution: real-time processing restored *and* the backlog cleared. The same distinction Sentry draws with "burning our backlog" (file 029), and equally necessary — for a data product, "it's working now" and "the missing data has arrived" are different promises.

**Defects:** the `Investigating` body has **no terminal full stop**; `timely processed` is awkward; and `we went through the backfill` is internal phrasing for a customer-facing sentence.

**The open incident** (`Delayed Monitors Notifications`) is the stronger one — four monitor types named, onset timestamp in UTC — but carries **no next-update commitment**, the same omission as Sentry and Postman. Only Twilio commits to an interval on every update.

**A timestamp inconsistency:** the incident body says the issue "began at Sep 21, 2026, 9:18 AM UTC" while the update itself is stamped `Sep 21, 2026 - 05:44 EDT` (= 09:44 UTC). Two time zones in one entry, and a reader must convert to see that Datadog posted 26 minutes after onset. The maintenance and incident timestamps across the page are EDT; the in-body times are UTC. For a global infrastructure vendor this is a real usability problem, though the in-body UTC is the more defensible of the two.

**Empty-history strings**: `No incidents reported today.` / `No incidents reported.` — the same correct one-word tense distinction as Postman and Sentry. Plus one Datadog-specific string for the open incident: **`Unresolved incident: Delayed Monitors Notifications.`** — a day's entry that is neither an update chain nor an empty state, but a pointer to something still running.

## T8 Empty states `[observed]`

Status page only.

- `No incidents reported today.` (current date, 21 Sep)
- `No incidents reported.` (thirteen closed dates)
- `Unresolved incident: Delayed Monitors Notifications.` — a third variant for a day whose incident has not closed

The three-way split (nothing today so far / nothing that day / something still open) is finer-grained than the two-state version in files 028 and 029, and the third string is the useful addition: it prevents a reader scanning the history from concluding that today was quiet.

**Notably absent:** the uptime graph and its associated empty strings (`No downtime recorded on this day.` / `No data exists for this day.`) do **not** render on Datadog's status page, unlike Twilio's, Postman's, and Sentry's. Datadog's Statuspage instance is configured without the 90-day uptime display, so there is no public uptime history and no `View historical uptime.` link. A deliberate configuration choice with a content consequence: **Datadog publishes current status and incident history, but not an uptime record.**

`Scheduled Maintenance` also does not render — no maintenance was scheduled and no "none scheduled" string appears. Same absent-empty-state as Postman.

All in-product empty states are behind auth. `[absent]`

One `[documented]` near-miss with real substance: the missing-data option table (T5) is an entire **empty-state policy expressed as configuration** — five different things a monitor can display when its query returns nothing, each with a stated status consequence. Most products hard-code one behaviour; Datadog makes "what should this show when there's no data" a user decision, which is the right call when the correct answer genuinely differs by metric.

## T9 Notifications & system messages `[observed]` — the longest category

This is what Datadog is in this corpus for. The `notify` and `variables` pages together constitute the most complete public treatment of alert-message authoring found anywhere in the batch.

### The authoring principles, stated up front

> "This approach helps ensure your monitor titles and messages are **clear, actionable, and tailored to your audience's needs.**"
> - **Unique titles**: "Add a unique title to your monitor (**this is required**). For multi alert monitors, some tags identifying your triggering scope are automatically inserted."
> - **Message field**: supports Markdown and variables; use conditional variables "to **modulate the notification text sent to different contacts**".

`modulate the notification text sent to different contacts` is the thesis of the whole system: one monitor, many audiences, different words.

### The canonical example is a runbook, not a description

The docs' own `Example monitor message` is the clearest statement of what Datadog thinks an alert should contain:

> "A common use-case for the monitor message is to **include a step-by-step way to resolve the problem**"
> ```
> {{#is_alert}}
> Steps to free up disk space on {{host.name}}:
> 1. Remove unused packages
> 2. Clear APT cache
> 3. Uninstall unnecessary applications
> 4. Remove duplicate files
> @slack-incident-response
> {{/is_alert}}
> ```

**The exemplar alert message contains no description of what went wrong at all** — the monitor title and the automatic context supply that. The message body is four numbered remediation steps and a routing handle. Datadog's model of a good alert is: *the machine states the problem, the human-authored text states the fix.*

That division is the single most transferable idea in this file. Alert copy written as "CPU is high on web-03" duplicates what the system already shows; alert copy written as an ordered list of things to try is the part only a human could have written.

The inline annotations in the example (`<-- conditional variable`, `<-- tag variable`, `<-- channel to send notification`) label each construct in place — a teaching device inside the sample.

### The `@`-handle grammar rule, with a Correct/Incorrect table

> "An @notification must have a space between it and the last line character:"

| Correct Format | Incorrect Format |
|---|---|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

**Two cells, one space of difference, and the failure is silent** — without the space the handle does not parse and nobody is paged. A syntax rule whose violation produces no error, documented with a minimal pair.

The same section carries two more silent-failure warnings:
> "Handles that include parentheses `()` are not supported. When a handle with parentheses is used, **the handle is not parsed and no alert is created.**"
> "Email notifications don't support addresses that contain slashes `/`, for example, `@DevOpS/West@example.com`."

Three character-level rules, each stated with the consequence (`no alert is created`) rather than just the prohibition. For a notification system, the class of bug where *nothing happens* is the worst class, and Datadog documents three sources of it in one page.

Integration prefixes are tabulated: `@jira` · `@pagerduty` · `@slack` · `@webhook` · `@teams` · `@servicenow`, with the general form `@<INTEGRATION_NAME>-<VALUES>`.

### Email-delivery failure modes, enumerated

> "An email address associated with a **pending Datadog user invitation** or a **disabled user** is considered inactive and does not receive notifications. **Blocklists, IP or domain filtering, spam filtering, or email security tools** may also cause missing notifications."

Six named causes of a page that never arrives, two internal (pending invite, disabled user) and four external. Written into the recipient documentation rather than into a troubleshooting page, so the reader encounters it while choosing recipients — the moment they can still do something about it.

### Conditional routing — the `is_match` family

Beyond state conditionals, Datadog ships **content-matching** conditionals that route by tag value:

```
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

With `{{else}}` support, multi-string matching (`"db" "database"`), negation (`{{^is_match}}`), and an exact variant (`{{#is_exact_match}}`) that also matches numeric values and — usefully — **the empty string**, "to check if the attribute or tag is empty or does not exist."

So one monitor can page the database team when the failing host is a database and a different channel otherwise, from a single template. **Audience selection as a property of the failing entity, not of the monitor.**

### Dynamic handles — and the honest warning about them

> ```
> @slack-{{service.name}} There is an ongoing issue with {{service.name}}.
> ```
> "If your monitor starts failing on the `service:ad-server` group, the notification is sent to the `#ad-server` Slack channel"

Constructing the recipient from the data. Then the failure mode, stated plainly:

> "When building dynamic handles with attributes that **might not always be present**, you may encounter issues with notification delivery. If an attribute is missing, the variable renders empty in the notification message, **resulting in an invalid handle.**"
> "To avoid missed notifications when using dynamic handles with these variables, make sure to **add a fallback handle**"

With the fallback pattern shown using `is_exact_match` against an empty string. **Ship the clever feature and the failure it causes and the mitigation, in that order, on the same page.** The equivalent warning appears again in the attribute-variable section: "To prevent missing notifications, **avoid using these variables for routing notifications** with `{{#is_match}}` handles."

### Slack threading, defined by a named unit

> "When threading is enabled, all monitor alerts for a given **alert cycle** are grouped under a single Slack thread, with the top-level message reflecting the **latest status** of the monitor."
> "**Note**: An **alert cycle** is defined as starting from a non-recovered state to a recovered state."

A coined unit (`alert cycle`) with a one-sentence definition, used to bound a noise-reduction feature. The top-level message updating to the latest status means a channel scroller sees current state without opening the thread — the thread holds the history, the parent holds the truth.

### Notification content presets — four levels of "show less"

`Default` ("No content is hidden") · `Hide Query` · `Hide Handles` · `Hide All` ("Notification message does not include query, handles, any snapshots… or additional links in footers")

Four settings whose entire purpose is **removing machine-generated content from the alert**, so the human-authored runbook is not buried. This is the structural counterpart to the runbook-as-message principle above: if the message body is the valuable part, the surrounding metadata must be suppressible.

`Hide Handles` deserves a note — it removes the `@`-mentions from the *displayed* message while presumably still routing on them. Useful when a page forwards to a customer-visible channel and the internal routing should not travel with it.

### Bulk `@`-handle editing, with three named use cases

> - **Swap a handle**: "Replace one handle with another across multiple monitors. For example, change `@pagerduty-sre` to `@oncall-sre`." Plus one-to-many: "replacing `@pagerduty-sre` with both `@pagerduty-sre` and `@oncall-sre`, to support **dual paging** or expanded alerting coverage."
> - **Add a handle**: "add `@slack-infra-leads` to all selected monitors."
> - **Remove a handle**: "remove `@webhook-my-legacy-event-intake`."

Three operations, three realistic examples using plausible handle names. The `dual paging` case — running the old and new destinations in parallel during a migration — is the one a team actually needs when changing on-call tooling, and naming it means the reader recognises their own situation.

This is **content operations as a product feature**: alert text is code that lives in thousands of places, and Datadog ships a find-and-replace for the routing tokens inside it.

### Escalation to incidents and work items

> "Incidents can be automatically created from a monitor when the monitor transitions to an `alert`, `warn`, or **`no data`** status."

`no data` as an incident-declaring transition is the notable inclusion — the absence of signal treated as seriously as a bad signal.

> "When an incident is created from a monitor, the incident's field values are **automatically populated based on the monitor's tags**. For example, if your monitor has a tag `service:payments`, the incident's service field will be set to 'payments'."

Metadata propagation across the alert→incident boundary, with a worked example. Then the trap:

> "**Note**: Incident notification rules are configured **separately** from monitor notification rules and need to be set up **independently**."

**Two notification systems that do not share configuration**, flagged in bold at the point where a reader would assume otherwise. Exactly the kind of cross-product seam that generates silent failures, and Datadog names it.

### Notification rules as the recommended pattern

> "Datadog **recommends** using monitor notification rules to manage monitor notifications. With notification rules you can **automate which notification recipients are added to a monitor based on predefined sets of conditions.** Create different rules to route monitor alerts based on the tags of the monitor notification **so you don't have to manually set up recipients nor notification routing logic for each individual monitor.**"

Routing as org-level policy rather than per-monitor configuration. The justification is stated as labour saved, and the recommendation is explicit — Datadog tells you not to do the thing the rest of the page teaches you to do, because it does not scale.

### Reserved attributes and explorer links

Six monitor types get reserved-attribute tables (`{{log.key}}`, `{{span.key}}`, `{{rum.key}}`, `{{event.key}}`, `{{cipipeline.key}}`, `{{citest.key}}`), each listing its first-level attributes. **Every one of the six includes `link`**:

> "Use `{{log.link}}`, `{{span.link}}`, `{{rum.link}}`, and `{{issue.link}}` to enrich the notification with a link to the Log Explorer, Trace Explorer, RUM Explorer, or Error Tracking, **scoped on the events matching the query**."

**A deep link into the investigation, pre-filtered to the matching events, as a one-token variable.** The recipient clicks from the page into the exact query that fired it. Combined with the dynamic-dashboard-link recipes (which use `{{eval "last_triggered_at_epoch-10*60*1000"}}` to build a ±10-minute window around the trigger), the alert can carry a link to a dashboard scoped to the incident's own time range.

That is the highest-value notification content pattern here: **the alert should contain a link that reconstructs the moment it fired.**

### Two rendering rules that prevent broken links

> "Variable content is **HTML-encoded by default**. To output raw, unencoded content, use triple curly braces."

| Syntax | Output |
|---|---|
| `{{variable}}` | HTML-encoded (default) |
| `{{{variable}}}` | Raw, unencoded |

> "This is particularly relevant when `{{check_message}}` contains auto-generated URLs with query parameters… The `&` characters in those URLs are HTML-encoded by default, **which can break clickable links in notifications.**"

An encoding default, its visible symptom (`&amp;` in a URL), and the two-character fix. Plus `{{ urlencode "<variable>"}}` for the opposite case, `{{{{raw}}}}` for emitting literal braces, and `{{!-- comment --}}` for non-rendering notes in a template.

### Time-zone localisation inside an alert

> `{{local_time 'last_triggered_at' 'Asia/Tokyo'}}` → `2021-05-31 23:43:27+09:00`

A function that renders a timestamp in a named IANA zone, output in ISO 8601 with offset. For a distributed on-call rotation, the ability to put the trigger time in *the recipient's* zone inside the message — rather than expecting them to convert at 3am — is a small feature with a large error-reduction effect. The docs link the tz database list and specify "particularly the TZ database name column".

### Test-notification events

> "Test notifications produce events that can be searched within the event explorer. These notifications **indicate who initiated the test** in the message body with `[TEST]` in notification title."

Two disclosures inside a drill: a title prefix so nobody responds, and attribution so the recipients know whose test it was. Plus a documented limitation: "**Tag variables are only populated in the text of Datadog child events.** The parent event only displays an aggregation summary." — the drill will not look exactly like the real thing, and the docs say how it differs.

### Status-page subscription channels

Five channels here (`email`, `sms`, `slack`, `teams`, `webhook`) — Datadog is the only product in this batch with **Microsoft Teams enabled**. Event sets are the standard Statuspage differentiation analysed in file 028: email gets `creates`/`updates`/`resolves`, SMS gets `creates`/`resolves`, webhook adds `changes a component status`, Slack and Teams are described rather than enumerated.

## T10 Disclosures, legal & compliance `[observed]`

### Per-product pricing panels, each with its own tiers and its own FAQ

Datadog's pricing page is roughly thirty independent panels, one per product, each carrying: a benefit subheading, two to four tier cards, a feature comparison, `Support Plans & Post Sales Services`, and a `Common Questions` block scoped to that product.

**This is the correct architecture for a thirty-SKU product** and it is unusual: rather than one global FAQ, the reader gets the questions that pertain to the thing they are currently pricing. See T12.

**Infrastructure tiers** (read in full):

| Tier | Price | Qualifier | Included highlights | Disclosure |
|---|---|---|---|---|
| `Free` | `$ 0` | "Core collection and visualization features" | "1-day metric retention", "Up to 5 hosts" | — |
| `Pro` | `$ 15` `Per host, per month*` | "Centralize your monitoring of systems, services, and serverless functions" | "1,000+ integrations", "Out-of-the-box dashboards", "15-month metric retention" | `*Billed annually or $18 on-demand` |
| `Enterprise` | `$ 23` `Per host, per month*` | "Advanced features and administrative controls" | "Machine learning-based alerts", "Live Processes", "Governance Console" | `*Billed annually or $27 on-demand` |

**The dual-price asterisk is the good disclosure.** `$15` annual and `$18` on-demand appear in the same card, so the headline price and the no-commitment price are visible together. Most vendors show the annual price and reveal the monthly premium at checkout. The 20% delta is stated, not hidden.

`Starting At` prefixes every price — an honest hedge for a product where the host price is only one line of a bill that will also include custom metrics, containers, and events.

**`1-day metric retention` on the Free tier** is the most important number in the Free card, and it is listed first. Retention is the real constraint on a free observability tier, and Datadog leads with it rather than with the host count.

### Additive metering, disclosed in FAQ answers rather than in the tier cards

The Infrastructure `Common Questions` block is where the actual cost model lives:

- **Containers**: "you can monitor 5 or 10 containers free for each host license. Additional containers will be billed at **$0.002 per container per hour**. In addition, you can purchase prepaid containers at **$1 per container per month** or **$1.50 per container per month for DevSecOps Containers.**" — three different prices for one unit, depending on commitment and product.
- **Custom metrics**: "100 custom metrics for every host monitored with Infrastructure Pro, or 200… with Infrastructure Enterprise." And the metering method, which is the part that matters: "Custom metrics are counted **hourly and averaged monthly across your entire account, not on a per-host basis.**"
- **Custom events**: "500 custom events for every host… or 1000 for enterprise… Beyond this limit, Datadog charges **$2 for 100 000 custom events** (billed annually or $3 on-demand), **although it is rare for our customers to exceed the allotted volume.**"

Three observations. **(a) The allotment is per-host but the metering is account-wide and time-averaged** — a distinction that changes the bill materially and that a reader would never infer from "100 per host". Stating it is genuinely transparent. **(b) `$2 for 100 000 custom events`** uses a space as the thousands separator where the rest of the page uses commas (`1,000+ integrations`) — a localisation artefact. **(c) "although it is rare for our customers to exceed the allotted volume"** is a reassurance appended to an overage price. It may well be true, and it may equally be the sentence a customer remembers when their bill arrives. Recorded as a soft claim inside a pricing disclosure.

**`How do you define a host?`** is answered in one sentence — "A host is any physical or virtual OS instance that you monitor with Datadog. It could be a server, VM, or node (in the case of Kubernetes)." — which is the single most consequential definition on the page, since it is the billing unit. Defining the billing unit plainly, at the top of the FAQ, is correct.

The tension with `Flexible, transparent pricing` is real though: the headline says transparent, and the actual cost of a Kubernetes fleet requires reading a host definition, a container overage rate, three container purchase modes, a custom-metric allotment, an account-wide averaging rule, and an events overage rate — spread across a tier card and six FAQ answers. **Transparent in the sense of *disclosed*, not in the sense of *predictable*.**

### Compliance surfaced as a product capability

> **`What compliance frameworks does DevSecOps support?`** — "DevSecOps Pro and Enterprise allow you to track conformance to requirements of **over 15 industry benchmarks including CIS, PCI DSS, SOC 2**, and more."

Note what is being claimed: Datadog helps you *track your own* conformance. This is a product feature, not a vendor certification. The distinction is correct and Datadog draws it accurately — but it means the pricing page's compliance content says nothing about Datadog's own posture.

> **`How can I be sure my data is secure?`** — "**Security is our top priority.** This includes, universal HTTPS, strong TLS configuration, and HTTP Strict Transport Security. **Our Agent is open-source, which means it can be reviewed to ensure it meets your security requirements.**"

The first sentence is a non-claim of the kind flagged in file 029. The third is the substantive one: **the collection agent — the component that runs inside the customer's infrastructure and sees everything — is open source and auditable.** For an observability vendor that is the single most reassuring fact available, and it is buried as the last clause of a FAQ answer. (There is also a stray comma: "This includes, universal HTTPS".)

Regulatory posture is mostly expressed *structurally* rather than in prose: nine separately-operated regional instances with independent status pages, two of them US government clouds, plus `Sensitive Data Scanner` and `Audit Trail` as billable products and a `Governance Console` in the Enterprise tier.

### Billing flexibility and support tiering

`Multi-Year/Volume discounts available` (pricing header) · "Annual, monthly and hourly plans are available. We can customize billing plans to meet your needs." · A `Support Plans & Post Sales Services` block repeated in every product panel.

**Hourly billing** is an unusual disclosure for an enterprise product and a genuine differentiator for ephemeral infrastructure.

### Consent and legal furniture

Footer: `Terms` · `Privacy` · `Cookies`. Demo modal: "I'd like Datadog to share the latest news about Datadog services and related offerings with me…" — a **first-person opt-in**, same construction as Sentry's newsletter (file 029).

Plus the Statuspage consent defect noted in T5: Datadog's own privacy policy is missing from all four subscription-channel consent strings, leaving only Atlassian's.

## T11 Help-centre architecture `[absent] / [observed]`

**Datadog operates no public help centre distinct from its documentation.** The status page's support link reads `Visit our support site.` and points at `http://docs.datadoghq.com` — documentation *is* the support surface. (Note the link is `http://`, not `https://`, on a page otherwise fully secure.)

What exists instead is a four-surface learning estate, each named and scoped:

| Surface | Role |
|---|---|
| `docs.datadoghq.com` | Reference and how-to, breadcrumbed five levels deep |
| `learn.datadoghq.com` (`Learning Center`) | Courses and **sandbox lab environments** — "Build a monitor in a sandbox lab environment" |
| `Foundation Enablement sessions` / `technical-enablement` | Live webinars, promoted in a docs callout |
| `datadoghq.com/blog` | Long-form, and **cited as documentation** |

Two things are notable.

**(a) The blog is treated as a documentation dependency.** The Monitors overview's `Further reading` links `Monitoring 101: Alerting on what matters`, `How to audit and clean up monitors effectively`, and `Route your monitor alerts with Datadog monitor notification rules` alongside the API reference. The `Alert on what matters` section heading is itself taken from that blog series. Datadog's conceptual guidance lives on the blog and the docs point at it — which means the *principles* are editorially owned and the *reference* is product-owned. A defensible split, and unusual to see stated so openly.

**(b) Live enablement is promoted inside documentation.** A callout at the top of the Incident Management page:
> `Join an enablement webinar session`
> "Explore and register for Foundation Enablement sessions. Learn how Datadog Incident Management enables DevOps teams and SREs to more effectively manage their incident response workflows from start to finish, **saving time and reducing frustration when it matters most.**"
> `SIGN UP`

A marketing CTA at the top of a reference page. The closing clause ("reducing frustration when it matters most") is marketing register inside docs, and `SIGN UP` is all-caps. Defensible as a service to a reader who is clearly new to the topic; jarring above a reference page.

`Further reading` appears on every docs page as a consistent closing section, mixing docs links, Learning Center courses, blog posts, and — on several pages — a login-gated release-notes link: `Check out the latest Datadog Alerting releases! (App login required).` **The only exclamation mark found in Datadog's documentation**, and it is attached to a link the reader may not be able to open.

`[absent]`: article-title grammar, support-centre category tree, self-service routing furniture, escalation paths. Datadog has no such surface publicly.

## T12 FAQs `[observed]`

**FAQs are scoped per product, not per site**, under the heading `Common Questions` — one block per pricing panel, roughly thirty blocks.

**This is the architecture finding.** A reader pricing Log Management sees twelve log-specific questions; a reader pricing Feature Flags sees ten flag-specific ones. Neither wades through the other's. For a company selling thirty metered products with thirty different billing units, a single global FAQ would be unusable, and Datadog's answer is to make the FAQ a property of the product panel.

| Product | Representative questions (verbatim) |
|---|---|
| `AI Credits` | `What is an AI Credit?` · `Do unused credits roll over?` · `What happens if I run out of AI Credits?` · `How is AI Credits billed?` |
| `Code Coverage` | `How is Code Coverage priced?` · `Do I need to pay separately if I already use Test Optimization or Code Security?` · `How do you define a committer?` · `What CI providers does Code Coverage support?` · `What languages does Code Coverage support for tests?` |
| `Log Management` | `I know my consumption in GB/day: how do I convert it into millions of log events?` · `What is the difference between Standard Indexing and Flex Logs?` · `When should I store logs in Standard Indexing vs Flex Logs?` · `What happens if I send an unexpectedly high volume of logs?` · `Do I have to choose only one type of retention between Standard Indexing and Flex Logs?` · `How is Rehydration billed?` · `How are log-based metrics billed?` |
| `Feature Flags` | `What is a feature flag?` · `How is Datadog Feature Flags billed?` · `Do Feature Flags require APM?` · `How reliable are Datadog Feature Flags?` · `Which SDK languages are supported?` · `Is this available in all regions?` |
| `Infrastructure` | `How do you define a host?` · `How do I monitor containers?` · `What is a custom metric?` · `How many custom metrics are allotted per host?` · `How do I get charged for additional custom metrics?` · `How does Datadog count and meter custom metrics?` · `What is a custom event?` · `How many events are allotted per host?` · `How can I send custom metrics and events?` · `What compliance frameworks does DevSecOps support?` · `How can I be sure my data is secure?` · `Are there other billing options?` · `Do you have special offerings for partners?` |

**Four recurring question shapes**, and each does a different job:

1. **`How do you define a <billing unit>?`** — `host`, `committer`, `custom metric`, `custom event`, `feature flag`. Every metered product defines its unit in the FAQ. This is the most important shape on the page: **you cannot forecast a bill for a unit you cannot identify.**
2. **`What happens if I <exceed / run out / send too much>?`** — `What happens if I run out of AI Credits?`, `What happens if I send an unexpectedly high volume of logs?`. The overage anxiety, asked in the reader's own catastrophising voice.
3. **`Do I need to pay separately if I already use X?`** / `Do Feature Flags require APM?` — the **bundle-overlap question**, unavoidable in a thirty-SKU portfolio and rarely answered this directly.
4. **`When should I use X vs Y?`** — `When should I store logs in Standard Indexing vs Flex Logs?`, `What do the different compute sizes in Flex Logs mean? Which one is appropriate for me?`. **Advisory questions inside a pricing FAQ**, where the answer is a recommendation rather than a fact.

Shape 4 is the one worth copying. `Which one is appropriate for me?` appended as a second sentence to a definitional question turns a glossary entry into guidance, and it is the question a reader actually has.

`I know my consumption in GB/day: how do I convert it into millions of log events?` is the best-constructed question in the set — it states the reader's starting knowledge before asking for the conversion, which is how a person with a real spreadsheet would phrase it.

`How reliable are Datadog Feature Flags?` is a reliability question inside a *pricing* FAQ — a reader evaluating a flag system in the critical request path wants an availability answer before a price, and Datadog puts it there.

**Answer register** (from the Infrastructure block, read in full): two to five sentences, plain, no marketing adjectives, frequently ending in a link to deeper documentation or a named contact (`Sales`, `Customer Success`). The `What is a custom metric?` answer is the longest and is the one that drifts into marketing ("Many customers find these metrics invaluable") — the only such drift observed in the block.

## T13 Terminology & glossary `[observed]`

No consolidated glossary page was found. A `Getting Started > Tagging` page and an `Internal Developer Portal > Catalog > Entity Model` page are referenced as definitional sources for tags and services respectively.

| Term | Datadog's usage | The alternative it rejected |
|---|---|---|
| `Monitor` | The standing evaluation object — the thing you configure | "alert", "alarm", "rule", "check" |
| `Alert` | The *event* a monitor produces, and also a monitor *state* | — the word does double duty |
| `Alerting platform` | The umbrella noun for the whole subsystem | "notifications", "monitoring" |
| `Check` | A monitor type with its own `OK`/`WARN`/`CRITICAL` vocabulary | (inherited from Nagios) |
| `Composite monitor` | A monitor over other monitors, with `{{a.status}}` sub-references | "compound alert", "meta-alert" |
| `Simple Alert` / `Multi Alert` | The two notification-grouping modes | "aggregated" / "per-entity" |
| `Sub Groups` | Non-aggregated dimensions in Multi Alert mode | |
| `alert cycle` | "starting from a non-recovered state to a recovered state" | "incident", "episode" |
| `Downtime` | A scheduled mute window | "maintenance window", "silence", "snooze" |
| `Muted` / `Not Muted` | The suppression state, rendered as a button | "silenced", "paused" |
| `Renotify` | Repeat the alert while unresolved | "reminder", "nag", "re-alert" |
| `Escalation message` | The distinct text sent on renotification | |
| `Group retention time` | How long a silent group stays in the status | "TTL", "stale group timeout" |
| `New group delay` | Grace period before a new entity can alert | "warm-up", "grace period" |
| `Evaluation delay` | Wait before evaluating, for backfilled sources | "lag tolerance" |
| `Evaluation window` / `Evaluation frequency` | Two separate, independently configured concepts | often conflated as "interval" |
| `Cumulative` vs `Rolling` time windows | Two named window shapes with a diagram | "fixed" / "sliding" |
| `Recovery threshold` | The hysteresis value | "clear threshold", "reset value" |
| `Evaluated Data` / `Source Data` / `Transitions` | Three named graphs on one surface | "preview", "raw", "history" |
| `Conditional variable` / `Template variable` / `Tag variable` / `Attribute variable` | **Four named variable classes**, each with its own table | one merged "variable" concept |
| `Dynamic handles` / `Dynamic links` | Recipient and URL construction from data | |
| `Notification rules` | Org-level routing policy, distinct from per-monitor recipients | |
| `Work item` / `Case` / `project handle` | The ticketing objects | |
| `Incident commander` | The named response role | "owner", "lead" |
| `responder` / `custom responder roles` | | |
| `Detection method` | An incident property — *how you found out* | |
| `Root Cause Category` | An incident property, searchable (`Root\ Cause\ Category:Bug`) | |
| `Time To Repair (hours)` | A facet on the incident list | "MTTR" |
| `Active` / `Stable` / `Resolved` / `Completed` | Incident statuses | "open"/"mitigated"/"closed" |
| `SEV-1`…`SEV-n` vs `P1`…`P5` | Incident severity vs monitor priority | one shared scale |
| `Bits AI` | The AI agent family | |
| `Datadog Teams` | The ownership object, `@team-handle` addressable | |
| `Tag policies` | Required-tag governance | |
| `allotment` / `allotted` | The included-usage noun, with its own `/pricing/allotments` page | "included", "quota", "entitlement" |
| `Flex Logs` / `Standard Indexing` / `Rehydration` | Three log-storage tiers | "hot"/"cold"/"restore" |
| `DevSecOps Pro` / `DevSecOps Enterprise` | Security-bundled tier variants | |
| `Governance Console` | An Enterprise admin surface | |

**`Detection method` as a first-class incident property** is the one worth flagging. Recording *how* an incident was found — monitor, customer report, engineer noticing — is the metric that tells an organisation whether its monitoring works. Most incident tools track time-to-resolve; tracking detection method is what surfaces the incidents your alerting missed entirely.

**`Root Cause Category`** appears in a search example as `Root\ Cause\ Category:Bug` — a space-containing custom field requiring backslash escaping in the query language. The docs show the escape rather than hiding the problem.

**`allotment`** is a slightly archaic word for included usage, and Datadog commits to it hard enough to give it a dedicated page (`/pricing/allotments`) linked from inside FAQ question text. The links render badly (see T14) but the vocabulary is consistent.

**The terminology defects**, collected: `ALERT` vs `CRITICAL` for the top severity depending on monitor type (T6); four casings of the state names; `P` vs `SEV` scales; `NDM` and `RUM` unexpanded on the status page; `Infra` vs `Infrastructure`; and `Alert` used simultaneously as an event, a state, and a noun in `Simple Alert` / `Multi Alert` (where it means "notification", not "state").

### Machine-readable docs

Every docs page opens with `> For the complete documentation index, see llms.txt`, and every page is served as Markdown at its `.md` URL. Datadog's docs also use a custom component syntax in the raw Markdown (`{% image %}`, `{% tab %}`, `{% collapsible-section %}`, `{% alert level="info" %}`, `{% dl %}`) — so the machine-readable version carries **structural semantics**, including the alert *levels*: `info` and `danger` were both observed. A downstream consumer can distinguish a note from a warning.

This is a different approach from Postman's clean-Markdown (file 028) and Sentry's (file 029): Datadog exposes the authoring components rather than flattening them. Richer, and noisier.

## T14 Voice, tone & accessibility `[observed]`

**No published content style guide or voice-and-tone documentation was found.** `[absent]`. Observations are inferred from shipped copy.

### Register

**Documentation is the strongest surface and marketing is the weakest** — the inverse of Sentry (file 029) and unusual generally.

The monitors and incident docs are: second person throughout, present tense, imperative for instructions, declarative for behaviour, **heavily annotated with `Note:` and `Example:` blocks**, and consistently willing to state limits, exceptions, and recommendations against use. Contractions appear ("don't have to", "doesn't", "you'll") but sparingly. No jokes. No exclamation marks (save the one release-notes link).

Marketing copy is generic by comparison: `AI-Powered Observability and Security`, `Flexible, transparent pricing designed to scale with your business`, `Security is our top priority`. The one durable line — "See inside any stack, any app, at any scale, anywhere" — dates from 2016 and outclasses everything written around it since.

**Person.** Second person for the reader, consistently. `Datadog` in the third person as the actor ("Datadog recommends", "Datadog offers", "Datadog charges", "Datadog automatically shortens") rather than `we` — a more distant register than Sentry's or Twilio's. `we` appears only in incident updates ("We are investigating", "we went through the backfill") and in a few FAQ answers ("We can customize billing plans").

**Hedging in the diagnostic copy** follows the same discipline as Sentry: `possible cause`, `may see delays or gaps`, `might not always be present`, `it may make sense`, `in most cases this setting is not useful`. Recommendations are marked as recommendations.

**The house habit is the bolded caveat.** `**Note**:` appears ~20 times across the four monitor pages, and the notes carry the highest-value content on the page — the silent-failure warnings, the metering rules, the cross-product seams. A reader who read only the bolded notes would learn most of what can go wrong.

### Defects

**Typography and punctuation:**
- Double space in `cloud-scale  applications` (pricing subheading) and in `Resend OTP in:  seconds`
- Stray space before comma: "Define alert and warning thresholds , evaluation time frames"
- Stray comma: "This includes, universal HTTPS"
- Missing terminal full stops on two incident `Investigating` bodies and several `Note:` blocks
- Inconsistent terminal punctuation across ~30 pricing subheadings
- `$ 0`, `$ 15`, `$ 23` — a space between the currency symbol and the figure, on every tier card
- `100 000` (space separator) against `1,000+` (comma separator) in the same FAQ block
- `the P5` — stray article in "with P1 being the highest priority and the P5 being the lowest"

**Broken or incomplete rendering:**
- **An unpopulated tier template renders on the Infrastructure panel**: `Starting At` / `---` / `*Billed annually or $ on-demand` with no price, no tier name, and no CTA — an empty fourth card leaking a template with an unfilled `$` placeholder.
- `[How many custom metrics are](#...)[](https://www.datadoghq.com/pricing/allotments) allotted per host?` — the FAQ question is **split across two links, the second with empty link text**, because the word `allotted` is hyperlinked mid-question. The accessible name of the second link is empty. This pattern repeats on at least four questions.
- `{{ Add Variable` — an unclosed brace in a docs alert box ("at the bottom of your notification configuration click {{ Add Variable and select from the expanded menu options").
- The alert-box text itself contains the literal `{{` that the surrounding documentation is teaching readers to escape.

**Localisation leak:** the English homepage's rotating resource carousel includes **two Korean-language cards** rendered inline among the English ones:
> `데이터독 플랫폼 데이터시트` — "클라우드 통합 모니터링 플랫폼으로 매트릭스, 트레이스, 로그 등 다양한 대규모 데이터를 통합하세요." with CTA `더 알아보기`
> `DevSecOps 성숙도 모델` — with CTA `더 알아보기`

Two untranslated cards with Korean CTAs, in a carousel on `www.datadoghq.com` with `og:locale: en_US`. A content-operations failure in the highest-traffic rotating slot on the site.

**Terminology:** `ALERT`/`CRITICAL`, four state casings, `P` vs `SEV`, `NDM`/`RUM` unexpanded — all catalogued in T6 and T13.

### Accessibility content

**Strong:**
- **Image alt text in documentation is genuinely descriptive of the diagram's content**, which for technical diagrams is the hard case and the one most vendors skip:
  - "Two graphs showing cumulative vs. rolling time windows. **Cumulative time windows continue to expand as time goes on. Rolling time windows cover particular moments in time.**"
  - "Showing four transitions with timestamps **A: 1419 OK to WARN, B: 1427 WARN to ALERT, C: 1445 ALERT to NO DATA, D: 1449 NO DATA to OK**"
  - "Screenshot of how a cumulative window is configured in the Datadog interface. The user has searched for `aws.sqs.number_of_messages_received`. The options are set to evaluate the SUM of the query over the CURRENT MONTH."
  - "View of policy tag configuration. Underneath 'Policy tags' are three example tags, `cost_center`, `product_id`, and `env`, next to a 'Select value' dropdown."
  - "Two views in the Datadog Mobile App: one showing an incidents list with high-level details about each incident, and one showing a detailed panel for a single incident"

  The second of these is the standout: **the state-transition diagram's alt text contains the complete data the diagram encodes** — four labelled transitions with their timestamps — so a non-sighted reader can follow the four-row table that references it. Alt text carrying the diagram's actual information rather than describing its appearance.
- The `{% alert level="info" %}` / `level="danger"` component syntax means severity is structural in the source, not colour-only.
- Docs prose names UI controls in text with their location (`at the bottom right of the monitor page`, `in the upper right corner`, `on the left`) rather than relying on screenshots.
- `Skip to main content` — **not found** on the marketing pages examined. See below.

**Defects:**
- **The `US-FED` unavailability string is concatenated into ~20 pricing nav link names**, producing accessible names like `Storage Management This product is currently unavailable on the US-FED site.` A screen-reader user navigating the product list hears a 12-word disclaimer after each of twenty items. The disclosure is correct; the implementation makes the nav unusable non-visually.
- **Empty-link-text FAQ questions** (the `allotted` hyperlink pattern) — at least four questions split across a labelled link and an unlabelled one.
- **Nine identical `Learn more` links** on the homepage product grid; `Learn more` and `LEARN MORE` both present.
- **~6 status components render a bare `?`** as tooltip-trigger text (`APM ?`, `Data Streams Monitoring ?`, `NDM ?`, `RUM ?`, `Serverless ?`, `Synthetics ?`, `www.datadoghq.com ?`) — the shared Statuspage defect, though Datadog has the fewest instances of the four.
- `Subscribe to UpdatesSubscribe` — doubled accessible name.
- `Resend OTP in:  seconds` — visible empty interpolation.
- `Chat` rendered as a bare string on the pricing page — an unlabelled chat launcher.
- The status page's support link uses `http://` rather than `https://`.
- Two Korean-language links (`더 알아보기`) in an `en_US` page with no `lang` distinction visible in the extraction.
- No `Skip to main content` link was observed on `www.datadoghq.com` or the pricing page, where Postman, Sentry, and Twilio all ship one.

---

## Transferable patterns

1. **Write the alert body as a runbook, not as a description.** Datadog's own canonical example contains zero description of the failure and four numbered remediation steps plus a routing handle — the machine supplies "what broke", the human supplies "what to do". Then ship a way to suppress the machine-generated furniture (`Default` / `Hide Query` / `Hide Handles` / `Hide All`) so the authored part is not buried. Condition: only works if your alert automatically carries the diagnostic context; otherwise the description is still load-bearing.

2. **Condition notification text on the *transition*, not just the state.** `{{#is_alert_to_warning}}` lets a team say "better but not fixed" — a message most alerting systems cannot express at all, because partial recovery is still a bad state. Also `{{#is_alert_recovery}}` vs `{{#is_warning_recovery}}` vs `{{#is_no_data_recovery}}`. Wherever a state machine has meaningful edges, the edge is a better hook for copy than the node.

3. **Define incident statuses compositionally from two independent facts.** `Active` (hurting, unfinished) / `Stable` (not hurting, unfinished) / `Resolved` (not hurting, investigation done) / `Completed` (remediation done) — four states, four sentences, built from *is it still affecting people* × *is the work finished*. `Stable` is the state every incident process has and most tooling refuses to name. Bonus: Datadog lets customers edit the definitions, acknowledging that incident vocabulary is organisationally specific.

4. **Pair the alert notification with a link that reconstructs the moment it fired.** `{{log.link}}`, `{{span.link}}`, `{{rum.link}}` are pre-scoped to the matching events, and `{{eval "last_triggered_at_epoch-10*60*1000"}}` builds a ±10-minute dashboard window around the trigger. One token in the template; a responder lands in the exact query, at the exact time, from their phone.

5. **Document silent failures with a minimal pair.** The `@`-handle spacing table — `Disk space is low @ops-team@company.com` (correct) against `Disk space is low@ops-team@company.com` (incorrect) — differs by one space, and the consequence is that nobody is paged. Everywhere a syntax error produces *nothing* rather than an error, show the two strings side by side and state the consequence ("no alert is created"), not just the rule.

6. **Say "don't use this" about your own feature, and name the loop it creates.** Auto-resolve gets a legitimate use case, an explicit "in most cases this setting is not useful", and a warning that misuse produces an alert-resolve-alert cycle. Same posture as Stripe on SMS MFA. Costs the vendor nothing; saves the reader a production incident.

7. **Disambiguate similar-sounding values by tracing one scenario through the whole state machine.** The `first_triggered_at` / `last_triggered_at` / `triggered_duration_sec` table walks four transitions and shows all three values at each step, with the fourth row (post-recovery) being the one nobody would guess. For any pair of similar variables, timestamps, or statuses, a worked trace beats a definition.

8. **Scope the FAQ to the product panel, and always define the billing unit.** Thirty products, thirty `Common Questions` blocks, and every metered product answers `How do you define a <host / committer / custom metric / feature flag>?`. Add the advisory shape — `When should I store logs in Standard Indexing vs Flex Logs?`, `Which one is appropriate for me?` — which turns a glossary entry into guidance.

9. **Route a multi-region status page by the URL the customer already has.** Datadog lists nine regions as `our US5 region app.us5.datadoghq.com` → `status.us5.datadoghq.com`. Customers rarely know their region's internal name; they always know the URL they log into. And split third-party integration status onto its own page so "is it you or them?" is answered by which page is red.

10. **Preview the *recipients*, not just the outcome.** The `Evaluated Data` graph shows historical state transitions, who would have been notified (including from org-level notification rules), and lets the user "quickly spot misconfigurations before saving". The most expensive alerting error is paging the wrong team, and it is invisible until it happens at 3am.

11. **Mark drills unmistakably and attributably.** `[TEST]` in the notification title plus "who initiated the test" in the body, plus a documented statement of how the test differs from the real thing ("Tag variables are only populated in the text of Datadog child events"). Any system that can fire a real page needs a drill mode that cannot be mistaken for one.

12. **The anti-pattern: two severity vocabularies for one concept.** `ALERT` for metric monitors and `CRITICAL` for check monitors, with four casings of the state names across one page, and `P1–P5` for monitors against `SEV-1…` for incidents. All four are historically explicable and none is reconciled in the docs. A user's mental model of "how bad is it" should not depend on which object they happen to be looking at.

## Caveats & gaps

- **The pricing page was read in extract, not in full.** It is ~112,000 characters across ~30 product panels. I read in full: the nine-category product nav, the page header, the three Infrastructure tier cards, and four `Common Questions` blocks (AI Credits, Code Coverage, Log Management, Feature Flags — questions only) plus the Infrastructure block (questions *and* answers). Roughly **25 product panels were not read**, so any per-product price, tier name, or feature claim beyond Infrastructure should be re-verified. The FAQ question shapes in T12 are drawn from five blocks and generalised; the generalisation may not hold across all thirty.
- **No public help centre exists**, so T11 is documentation IA only. I have recorded this as a genuine structural finding (docs *are* the support surface) rather than a retrieval failure, but it means article-title grammar, self-service routing, and escalation furniture — normally the richest T11 material — are `[absent]` for this product.
- **`learn.datadoghq.com` was not fetched.** The Learning Center is repeatedly named as the primary onboarding surface ("build a monitor in a sandbox lab environment") and its course titles and lab copy are unexamined. This is the most obvious next harvest step for Datadog.
- **`docs.datadoghq.com/monitors/status/` redirects to `status_page.md`**, so the parent `Monitor Status` section (which would contain the canonical state list and the `Status Events` page) was not read directly. **The monitor state vocabulary in T6 is therefore assembled from the conditional-variable table, the composite-monitor note, the missing-data table, and the monitor-link parameter examples** — four secondary sources on two pages. I am confident in the state *names*; I did not find a single authoritative state table and have not invented one. In particular, `UNKNOWN` has a notification hook and no entry condition I could locate.
- **Incident severity levels are recorded only as they appear in search examples** (`severity:SEV-1`, `severity:(SEV-1 OR SEV-2)`). I have **not** stated the full range (SEV-1 to SEV-3? to SEV-5?) because I did not see it enumerated. The `setup_and_configuration/property_fields.md` page, which presumably defines it, was not fetched.
- **All in-product UI is unobserved.** Monitor configuration screens, the Issues/Incidents lists, notification previews, and every empty state and toast are behind auth. Where in-product copy appears here (option labels, button names, preset names) it is `[documented]` from the docs and marked as such. Datadog's documentation is unusually literal about UI strings, so the coverage is better than an unauthenticated pass would normally yield — but it is still second-hand.
- **T8 is nearly empty.** Only three status-page strings. Notably, Datadog's Statuspage instance is configured **without** the 90-day uptime graph that Twilio, Postman, and Sentry all display, so even the shared vendor empty states (`No downtime recorded on this day.` etc.) are absent here. Recorded as an observed configuration difference.
- **Only two incidents were in the visible window** (one resolved, one open), so my characterisation of Datadog's incident-update style rests on **three update bodies**. The `/history` page was not fetched. Treat the incident-communication findings as indicative, not established.
- **Statuspage-supplied strings are shared with files 027–029.** The subscription form, severity legend, and `Resend OTP in:  seconds` defect are vendor copy, analysed once in file 028. Two Datadog-specific configuration differences are recorded here: Microsoft Teams enabled, and the first-party privacy policy missing from all consent strings.
- **`datadogintegrations.statuspage.io`** — the third-party integration status page — was noted but not fetched. It is plausibly a rich source of vendor-name vocabulary.
- **No published content style guide or voice-and-tone documentation found.** Searched docs, marketing, and the developer-facing surfaces. All T14 findings are inferred from shipped copy.
- **No glossary page found.** T13's table is inferred from consistent usage across six docs pages. Datadog references a `Getting Started > Tagging` page and an `Entity Model` page as definitional sources; neither was fetched.
- **Locale:** en-US, with the two Korean carousel cards recorded as an observed defect on the English page. `/ja/`, `/fr/`, `/es/`, `/ko/` locales exist and were not harvested.
- The homepage was fetched in full but is heavily JavaScript-composed; the nine product cards, hero, and carousel were recovered, but any below-the-fold interactive content may not have rendered into the extraction.

## Sources

1. https://www.datadoghq.com/
2. https://www.datadoghq.com/pricing/ — read in extract (see Caveats)
3. https://docs.datadoghq.com/monitors/
4. https://docs.datadoghq.com/monitors/configuration/
5. https://docs.datadoghq.com/monitors/notify/
6. https://docs.datadoghq.com/monitors/notify/variables/
7. https://docs.datadoghq.com/monitors/status/ — redirects to `/monitors/status/status_page.md`
8. https://docs.datadoghq.com/incident_response/incident_management/
9. https://docs.datadoghq.com/incident_response/incident_management/investigate/describe.md
10. https://status.datadoghq.com/
