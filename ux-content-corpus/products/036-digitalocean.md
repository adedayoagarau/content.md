# 036. DigitalOcean

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Cloud infrastructure (IaaS/PaaS) for SMB and individual developers; now repositioned as AI-native cloud / GPU + inference platform |
| Primary URL | https://www.digitalocean.com/ |
| Corpus rank | 036 |
| Benchmark strength (source list) | Tutorials and task-based navigation |
| Locale / market observed | en-US (single global locale; no locale switcher in nav) |
| Platform observed | Web (marketing), docs site (`docs.digitalocean.com`), community site, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for content purposes. Tax-collection disclosure by country; SLA pages published per product (`/sla/cpu-droplets`, `/sla/gpu-droplets`); `Report Abuse` as a first-class footer link |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — the community tutorial *library index* (`/community/tutorials`) and tag pages render their listings client-side and returned zero tutorial rows in server HTML. Tutorial-title grammar was therefore reconstructed from a tutorial *collection* page, the homepage resource carousel, and search result titles rather than the library index itself. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.digitalocean.com/ | Hero, five-layer platform narrative, customer stat cards, resource carousel with live tutorial titles |
| Pricing | https://www.digitalocean.com/pricing | Per-product price cards, "Platform benefits" inclusions list, 12-question FAQ accordion (answers present in HTML) |
| Docs home | https://docs.digitalocean.com/ | Four "Get Started" entry cards, "Browse by" facets, release-notes river |
| Support home (markdown) | https://docs.digitalocean.com/support/index.html.md | ~250 troubleshooting articles across 27 product-named sections — the single richest source in this file |
| Droplets: Getting Started | https://docs.digitalocean.com/products/droplets/getting-started/ | Left-nav article-type taxonomy; search empty state observed in DOM |
| Droplet Quickstart (markdown) | https://docs.digitalocean.com/products/droplets/getting-started/quickstart/ | Numbered procedure, in-product button labels quoted inside docs |
| Product Lifecycle Stages (markdown) | https://docs.digitalocean.com/platform/product-lifecycle/ | Named maturity states and the retirement-notice commitment |
| Community tutorials index | https://www.digitalocean.com/community/tutorials | Listing client-rendered; only chrome and promo cards in server HTML |
| Community tag page | https://www.digitalocean.com/community/tags/ubuntu | Same — listing client-rendered; identical promo blocks to the index |
| Tutorial collection: Docker | https://www.digitalocean.com/community/tutorial-collections/how-to-install-and-use-docker | OS-and-version matrix of tutorial titles; shows title-grammar drift |
| Status page | https://status.digitalocean.com/ | Component tree, five-state legend, three-stage incident narrative |

---

## T1 Navigation & IA labels

**Global nav — five items, product-first, audience-agnostic** `[observed]`

`Products` · `Solutions` · `Developers` · `Partners` · `Pricing`, with `Log in` / `Sign up` at the right and a thin utility bar above carrying `Blog` · `Docs` · `Careers` · `Get Support` · `Contact Sales`.

Unlike consumer-fintech patterns, there is no `Personal` / `Business` audience split. The split is instead **by job to be done**: `Products` (what you buy), `Solutions` (what you build), `Developers` (how you learn), `Partners` (how you resell).

**`Products` menu groups by infrastructure layer, each with a scope sentence** `[observed]`

| Group label | Scope line (verbatim) |
|---|---|
| `Compute` | "Build, deploy, and scale cloud compute resources" |
| `Containers and Images` | "Safely store and manage containers and backups" |
| `Managed Databases` | "Fully managed resources running popular database engines" |
| `Management and Dev Tools` | "Control infrastructure and gather insights" |
| `Networking` | "Secure and control traffic to apps" |
| `Security` | "Help protect your account and resources with these security features" |
| `Storage` | "Store and access any amount of data reliably in the cloud" |

Six of the seven scope lines are **imperative verb phrases addressed to the user** ("Build…", "Store…", "Secure…"). `Security` breaks the pattern into a third-person description with a trailing demonstrative ("…with these security features") — a small but real inconsistency in an otherwise uniform set.

**`Solutions` menu is named by industry/use case, not by product** `[observed]`

`AI/ML` · `CMS` · `Data and IoT` · `Developer Tools` · `Gaming and Media` · `Hosting` · `Security and Networking` · `Startups and SMBs` · `Web and App Platforms`

**`Developers` menu — four groupings, one of them notably plain** `[observed]`

`Community` · `Documentation` · `Developer Tools` · `Get Involved` · `Utilities and Help`

`Get Involved` is a contribution-oriented label (rare in vendor docs nav), and `Utilities and Help` bundles free tools with support — i.e. support is framed as one of several *utilities* rather than as a separate escalation channel.

**Docs site has its own four-item nav, and it is an article-type taxonomy, not a product tree** `[observed]`

`Platform` · `Products` · `Reference` · `Support`

These recur as the four "Get Started" cards on the docs home, each with a one-sentence scope: `DigitalOcean Platform Overview`, `Product Home`, `Reference Home`, `Support Home`. `Support Home`'s scope line is the only one written as a **question to the reader**: "Looking for technical support for your DigitalOcean account or infrastructure? Browse product topics or open a ticket in the support portal."

**Docs "Browse by" facets** `[observed]`: two facets only — `Product Genre` and `Developer Tools`. "Genre" for a product taxonomy is an unusual and slightly editorial word choice (borrowed from content, not infrastructure).

**Per-product docs left nav is a fixed five-part shape** `[observed]`, seen on Droplets:

`Getting Started` → `How-Tos` → `Reference` → `Concepts` → `Details` → `Support`

This is the most transferable IA artefact on the site: every product uses the same six buckets, so a reader who learns the shape once can navigate any product. Note the ordering — task-first (`How-Tos`) before explanation (`Concepts`), and `Details` (features, pricing, availability, limits, policies) as a distinct bucket from `Reference` (API/CLI).

**Footer groupings** `[observed]`: `Company` · `Products` · `Resources` · `Solutions` · `Contact`. `System Status`, `Report Abuse` and `Share your ideas` all sit under `Contact` as peers of `Support` and `Sales` — i.e. the feedback and abuse channels are given the same weight as sales.

## T2 Value proposition & headline patterns

**Hero is a category claim, not a task** `[observed]`

> Headline: `AI-Native Cloud`
> Subhead: "One integrated platform, silicon to agent, with economics that improve as you scale."

Compare the Wise pattern (headline = the task). DigitalOcean's 2026 hero is a **positioning noun phrase**, with the differentiation compressed into an appositive ("silicon to agent") and a conditional promise ("economics that improve as you scale").

**Rotating hero slides use a two-sentence, fragment-then-negation pattern** `[observed]`

- `Scale inference. Not complexity.` — "Serverless inference, intelligent routing, and 80+ models. No infrastructure to wrangle."
- `Better intelligence per dollar` — "Route every request to the right model, and pay only for the intelligence you use."
- `Kimi K3 on DigitalOcean` — "Live on Serverless Inference and Inference Router"

`Scale inference. Not complexity.` is the cleanest instance of the house device: **assert the thing you get, then name the thing you don't.** It recurs in body copy as "No infrastructure to wrangle", "No cross-vendor hops. No lost context. No egress fees between layers.", and "The complexity of stitching together multiple vendors — gone."

**Section headers are declarative counted claims** `[observed]`

`Five layers. One platform. Open at every layer.` ·
`Performance, economics, and simplicity — together.` ·
`Performance proven in production` ·
`Open models you already trust` ·
`Built for how builders ship` ·
`Economics that compound as you scale`

Two things: the counted-noun header (`Five layers. One platform.`) gives the reader a structure to hold before the detail arrives; and the competitive claim is made by **naming the competitor's shape rather than the competitor** — "Most clouds only cover one or two layers, or fragment all five across 300+ disconnected services."

**Benefit proof is delivered as named-customer stat cards** `[observed]`

`67% / lower cost` (Workato) · `2x / inference throughput` (Character.ai) · `40% / reduction in latency` (Hippocratic AI). Each card gives the number, the unit, a one-sentence mechanism, the customer logo, and a `Learn more` link to a technical deep-dive. The number is the headline and the customer is the attribution — a trust structure rather than a marketing structure.

**The legacy positioning survives only in the community surface** `[observed]`

`The developer cloud` — "Scale up as you grow — whether you're running one virtual machine or ten thousand." This appears as a promo block on `/community/tutorials`, not on the homepage. The old tagline has been demoted to the developer-facing surface while the homepage carries the AI repositioning. **Worth recording as a register split by audience surface**, and as a live inconsistency: the same company describes itself as `AI-Native Cloud` and `The developer cloud` two clicks apart.

**Pricing headline is the sharpest copy on the site** `[observed]`

> `Simple, predictable pricing`
> "Always know what you'll pay with monthly caps and flat pricing."

Adjective pair + mechanism. "Monthly caps" and "flat pricing" are the two mechanisms that substantiate "predictable", named in the subhead rather than deferred to a footnote.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Sign up` | Global nav, homepage foot, docs nav | Primary acquisition; appears three times per page |
| `Log in` | Global nav | |
| `Get started` | Hero, primary button | Lowercase `s` |
| `Get Started` | Pricing hero, primary button | **Title-case variant of the same label on the same site** |
| `Explore products` | Hero, secondary button (repeated on all four hero slides) | Constant secondary across a rotating primary |
| `Start building today` | Hero slide 2 | |
| `Start serving models` | Hero slide 3 | Verb matched to the slide's subject |
| `Access Kimi K3 now` | Hero slide 4 | Only CTA on the site with `now` |
| `Browse all products` | Products mega-menu foot | |
| `See all solutions` | Solutions mega-menu foot | **`Browse` vs `See` for structurally identical "index of everything" links** |
| `View all products` | Community promo block | A third label for the same destination type |
| `Learn more` | Customer stat cards ×3, two docs promo cards | Bare `Learn more`, five instances, destination not named |
| `Read` | Every card in the homepage resource carousel | Single-word CTA; the card title supplies the object |
| `Read the study` | Forrester ROI block | Names the artefact |
| `View pricing` / `View GPU Droplets pricing` / `View Droplet pricing` / `View Load Balancer pricing` | Pricing page, one per product card | **Mostly specific, two bare `View pricing`** (Inference, Cloudways) — the specificity is applied inconsistently |
| `We'll do the math` | Pricing calculator promo | The one playful CTA on the site; note it sits on the *pricing* page, where tone is otherwise flat |
| `Go to bandwidth calculator` | Pricing, bandwidth block | |
| `Contact sales` / `Contact Sales` | Pricing (×3), utility bar | Case varies by surface |
| `Get help from our sales team` | Pricing, above the product cards | Softer framing of the same action, placed *before* the prices |
| `Get Support` | Utility bar | |
| `Give Feedback` | Docs, per-page, top right | Routes to `ideas.digitalocean.com` |
| `Copy page as Markdown` / `View page as Markdown` | Docs, under every page title | Machine-consumer affordance surfaced as a human CTA — see T13 |
| `Subscribe to Updates` | Status page | |
| `Show associated resources` | Droplet destroy flow | `[documented]` — quoted inside docs |
| `Destroy this Droplet and backups` | Droplet destroy confirmation | `[documented]` — see T7 |
| `Learn How To Install and Use Docker on Debian 10` | Tutorial collection cards | Link text = `Learn` + full tutorial title; a deliberate accessible-name expansion (see T14) |

**Observations.** Three different labels for "index of everything" (`Browse all products`, `See all solutions`, `View all products`); `Get started` and `Get Started` on adjacent pages; five bare `Learn more` instances. The CTA layer is the weakest part of DigitalOcean's content system and contrasts sharply with the discipline of the docs IA.

The one genuinely good pattern: **`Get help from our sales team` placed above the price cards rather than after them.** The escape hatch is offered before the reader has a chance to fail at self-service, framed as help rather than as sales.

## T4 Onboarding & getting-started

**Two parallel getting-started systems, deliberately distinguished** `[observed]`

1. `Getting Started` inside product docs — short, control-panel-centric, first-party.
2. `Community Tutorials` — long, terminal-centric, contributor-written, 8,000+ items.

Docs quickstarts are explicitly scoped by a promise about *time and completeness*: `Droplet Quickstart` — "Just the essentials to go from zero to working in a few minutes." The sibling card is `Set up a Production-Ready Droplet` — "Create a new Droplet with our recommended configuration for improved security, reliability, and monitoring."

**This pairing is the strongest onboarding-content decision in the file.** DigitalOcean ships two mutually exclusive first-run paths and names the trade-off in the card copy: *essentials and fast* versus *recommended and production-ready*. Neither is called "basic" or "advanced" — the axis is **disposable versus durable**, which is the axis the user actually cares about. A third card, `Recommended Drivers and Software for GPU Droplets`, extends the same "recommended setup" frame to a hardware class.

**Quickstart step grammar** `[observed]`, from `Droplet Quickstart`:

- Three H2 sections named by verb + object: `Create Droplets` → `Connect to Droplets` → `Destroy Droplets`.
- Nine numbered steps under `Create Droplets`, each an imperative sentence beginning with the UI verb: "From the **Create** menu at the top of the Control Panel, click **Droplet**." · "Choose an image, which can be a Linux distribution, container distribution, one-click app, AI agent, snapshot, or backup." · "Enter a name and click **Create**."
- **Optionality is marked inline and mid-sequence**: step 4 begins "Optionally, add block storage." The steps are not split into required/optional blocks; the reader stays in one numbered list.
- A **branch sentence sits between step 3 and step 4**, not at the end: "The Droplet create screen has a number of options after this, which you can customize now or after creation. To accept the defaults, scroll to the bottom and click **Create**. Otherwise:" — the shortcut out of the flow is offered at the exact point the flow gets long, and the colon carries the reader into the remaining steps.
- Reassurance about cost is embedded in a step rather than a callout: step 7 notes the additional options "come at no additional cost, and are easier to enable now than after creation."

**The destroy path is documented as a first-class part of getting started** `[observed]` — `Destroy Droplets` is the third H2 of the quickstart, not a separate teardown article. It opens with the consequence, in one sentence, before any step: "Destroying a Droplet permanently and irreversibly destroys the Droplet, its contents, automated backups, and any associated resources that you have selected to destroy along with the Droplet." Step 1 is then a *preservation* step ("To save one or more of the Droplet's backup images, convert those backups into snapshots before destroying the Droplet") — the recovery option is offered before the destructive one.

**Tutorial structure** `[observed]` — tutorials are grouped into `tutorial-collections`, which present the same task across an **OS × version matrix**: `CentOS 7`, `Debian 10`, `Debian 9`, `Rocky Linux 9`, `Rocky Linux 8`, `Ubuntu 22.04 / 20.04 / 18.04 / 16.04`. The version number is rendered as a large standalone numeral and the title beside it, so the reader selects by environment first and task second. Superseded versions are retained rather than deleted — a content-ops decision that trades index tidiness for not breaking the reader who is genuinely on Ubuntu 16.04.

## T5 Form & field labels

Thin — almost all forms are behind auth. `[observed]` / `[documented]` mix.

**Status-page subscription form** `[observed]`

| Label | Notes |
|---|---|
| `Email address:` | Trailing colon on all four labels |
| `Enter OTP:` | The product-facing string uses the acronym `OTP` unexpanded, twice |
| `Country code:` | |
| `Phone number:` | |
| `Change number` | Inline correction link beside the entered value |
| `Resend OTP in: 30 seconds` | Countdown rendered inside the label |
| `Didn't receive the OTP?` | Pre-emptive failure question placed beside `Resend OTP` |

Two content notes. `Didn't receive the OTP?` is good practice — the failure question sits adjacent to its remedy before the failure is confirmed. But `OTP` unexpanded in a consumer-facing subscribe box is a register slip; DigitalOcean's own docs say "verification code" for the same concept (see T7).

**Control-panel labels quoted inside docs** `[documented]`, from the quickstart and destroy flow: the `Create` menu · `Droplet` · `More` menu · `Destroy` · the `Destroy` page · `Destroy Droplet and backups` section · `Show associated resources` · `Destroy this Droplet and backups` · `Confirm`. Docs render every UI string in bold, consistently, which makes the docs a reliable secondary record of in-product copy.

**Named settings surfaces** `[documented]`: `My Account` page, `Settings` page, `Billing Settings` page, `Feature Preview` page.

**Type-to-confirm is documented, not just implied** `[documented]`: when associated resources are included in a destroy, "it prompts you to enter the Droplet's name into the confirmation window before destroying the Droplet." The friction is proportional to the blast radius — plain `Confirm` for a lone Droplet, name-typing when other resources are attached.

## T6 Status & state language

**Status page uses a five-state legend, ordered by severity** `[observed]`

`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`

Page-level roll-up headline: `All Systems Operational`. Section heading for history: `Past Incidents`, with the per-day empty string `No incidents reported today.` / `No incidents reported.` (see T8).

**The component tree is the notable artefact** `[observed]`. Status is reported at three nesting levels: service → `Global` → datacenter code. Every product row repeats the same region vocabulary (`AMS2`, `AMS3`, `ATL1`, `BLR1`, `FRA1`, `LON1`, `MKC1`, `NYC1`, `NYC2`, `NYC3`, `RIC1`, `SFO1`, `SFO2`, `SFO3`, `SGP1`, `SYD1`, `TOR1`), while App Platform alone reports in **city names** (`Amsterdam`, `Atlanta`, `Bangalore`, `Frankfurt`, `Kansas`, `London`, `New York`, `Richmond`, `San Francisco`, `Singapore`, `Sydney`, `Toronto`) rather than codes. One status page, two naming systems for the same twelve places — a clear defect, and an instructive one: the PaaS product speaks in human place names because its users never see the datacenter code, while IaaS products speak in codes because their users type them.

Newer AI components (`Agent Runtime`, `Inference`, `ADK`, `Knowledge Bases`, `Guardrails`, `Model Services`) each carry a `?` tooltip affordance that the older components do not — newer additions get a definition, older ones assume familiarity.

**Product-maturity states are formally named and tabulated** `[observed]`, from `Product Lifecycle Stages`:

`Private Preview` · `Public Preview` · `General Availability` (abbreviated `GA` after first use) · `Retirement`

The page renders the three live stages as a comparison table with seven rows: `Customer Availability`, `Regions`, `Retirement`, `Support`, `Pricing & Billing`, `SLAs`, `Production ready`. The `Production ready` row takes the values `No` / `Partial` / `Yes` — a three-valued answer to a question most vendors answer binary or not at all, and `Partial` is the honest middle term. The `SLAs` row for public preview reads `Limited; no credits issued`, which states the commercial consequence rather than the technical one.

Release notes then use these states as **status verbs in the past tense**: "is now generally available", "is now in public preview", "are now generally available in all regions". The lifecycle vocabulary and the changelog vocabulary are the same words, so a reader can map a release note onto a support entitlement without translation.

**Operational states named in support content** `[documented]`: `NotReady` (DOKS node), `No Traffic` (load balancer node), `unhealthy` (backend Droplets), `blackholed` (DDoS mitigation), `past due` (team balance), `Read Only mode` (Droplet boot state), `rebalancing/resizing` (database cluster).

`blackholed` deserves a flag: DigitalOcean surfaces a network-operations term to end users and then writes a support article to gloss it — "We temporarily trigger a blackhole when a DDoS attack against a resource reaches a mitigation limit." The choice is to keep the accurate term and explain it, rather than substitute a friendlier inaccurate one.

## T7 Error, failure & recovery

The richest category for this product, almost entirely `[documented]` via the support hub — ~250 articles across 27 product-named sections.

**Five consistent title shapes** `[observed]` (titles are live content on the support hub):

| Shape | Examples |
|---|---|
| `How do I fix the "<literal error string>" error?` | `How do I fix the "Connection Refused" error when connecting to my database?` · `How do I fix the "Out of sort memory" error?` · `How do I fix the "1227" error?` · `How do I fix the DNS error "Primary Name Server Not Listed at Parent"?` |
| `Why <adverse thing happening>?` | `Why was my card declined?` · `Why is SMTP blocked?` · `Why does my domain fail to resolve?` · `Why does my Droplet have high CPU or RAM usage?` · `Why is my cluster rebalancing/resizing?` |
| `I <did / lost / received>` (first person) | `I lost the SSH key for my Droplet` · `I forgot my username or password` · `I lost access to the email I use to log in` · `I don't recognize a charge on my invoice` · `I did not get an email of my Droplet's root password` · `I can't reach a Droplet through my DigitalOcean Load Balancer` |
| `My <thing> <is failing>` (first-person possessive) | `My firewalls are not working correctly` · `My app deployment failed because of a health check` · `My DOCR image failed to upload or timed out` · `My Droplet is sending an outgoing flood or DDoS` · `My PHP app is timing out and throwing 5xx errors` · `My Ubuntu Droplet lost all network connectivity after a software update.` |
| `How to Troubleshoot <subsystem> Issues` (title case) | `How to Troubleshoot SSH Authentication Issues` · `How to Troubleshoot SSH Connectivity Issues` · `How to Troubleshoot SSH Protocol Issues` · `How to Troubleshoot SSH Shell Environment Issues` · `How to Troubleshoot CoreDNS Issues in DOKS Clusters` · `How to Troubleshoot Load Balancer Health Check Issues` |

**The single most transferable pattern here: the literal error string is embedded in the title, in quotes.** DigitalOcean does not write "Resolving database connectivity problems" — it writes the exact bytes the user just pasted into a search box. Confirmed across dozens of titles: `"permission denied for schema public"`, `"JavaScript heap out of memory"`, `"Image or digest not found"`, `"Domain Already Exists"`, `"Record is managed by an App on this account, and cannot be deleted"`, `"1001 DNS Resolution Error"`, `"user does not exist"`, `"invalid dockerfile_path"`, `"Cannot create property _id on string"`, `"DNSHostNotFound Failed to look up service"`, `"could not open extension control file"`, `"permission denied for table pg_authid"`, `"aborting because of server version mismatch"`, `"Couldn't execute FLUSH TABLES Access denied"`, `"Host is Blocked"`, `"Lost Connection"`, `"Unknown Database"`, `"Unknown Host"`, `"No Such File or Directory"`, `"Invalid Parameters and Values"`, `"Connection Timed Out"`, `"Authentication Failed"`, `"Could Not Translate Hostname to Address"`, `"Database Does Not Exist"`, `"The resource you were accessing could not be found"`, `"system not initialized"`. The error catalogue is effectively a **search-term index**, and the search term is the user's, not the writer's.

**HTTP status codes are treated as user-facing vocabulary** `[observed]`: `Why am I receiving 520 status codes from my app?` · `Why does my load balancer respond with a 504 Gateway Timeout error?` · `Why does my load balancer respond with an HTTP 503 error?` · `Why are there multiple 408 errors in App Platform's runtime logs?` · `Why does my function return a 204 response when I call it from Postman or curl?` · `What retry or backoff behavior should I follow for 429 responses from serverless inference?`

The 429 article is the interesting one — it does not explain the error, it **prescribes the client-side protocol** ("Steps to follow for retry and backoff behavior"). For a developer audience the useful answer to a rate limit is a policy, not a cause.

**Deck copy answers the question in one sentence, and often the answer is "no"** `[observed]`. Every support entry carries a one-line deck. A large fraction are flat refusals with no softening:

- `Can I have a refund?` — "We do not offer refunds."
- `Does DigitalOcean support DNSSEC?` — "No, we do not support DNSSEC."
- `Can I use Windows on a Droplet?` — "No, we do not provide Windows images for Droplets or support Windows custom images."
- `Can I prepay for my support plans?` — "No, you cannot prepay for DigitalOcean support plans."
- `Do paid DigitalOcean support plans support multiple teams?` — "No, each team needs their own plan."
- `Why are CPU and memory usage not displayed on Managed Kubernetes Dashboard?` — "Displaying CPU and memory usage in the Kubernetes Dashboard is not supported at this time."

No "unfortunately", no "we're sorry", no "at this time" except where it genuinely signals a roadmap. Where a workaround exists it is appended with `but`: `Can I download a backup or snapshot?` — "You cannot currently download DigitalOcean backups or snapshots, but you can use third-party tools to save your data locally." **The `X is not possible, but Y is` construction is used consistently enough to read as a house rule.** Instances: `Can I import a DNS zone?`, `Can I make my Droplet smaller?`, `Can I choose my Droplet's IP address?`, `Can I attach a volume to multiple Droplets?`, `Can I undo restoring a Droplet from a backup?`, `How do I transfer a domain between teams?`, `How do I back up my app on App Platform?`.

**Irreversibility is stated as a reason, not just a rule** `[observed]`: `Can I downsize a Droplet using a snapshot?` — "You cannot downsize a Droplet from a snapshot. Data is not always stored sequentially in memory, so reducing the size of a disk can result in data loss or corruption." The mechanism is given so the reader stops looking for a workaround.

**Billing failure is routed like a technical failure** `[observed]`. The consequence chain is documented end to end, in the user's voice at each step: `Why am I receiving a forbidden error when making changes to my App Platform app?` ("Your team balance may be past due") → `What if I'm unable to pay my invoice?` ("We do not offer extensions, but we can help you find other solutions") → `I've paid my bill so why aren't my services online?` ("you need to manually turn your resources … back on") → `Why can't I find my app even after paying my past due balance?` ("If your resources have been destroyed due to a prolonged past due balance, you can contact support to request the app spec for deleted apps"). That last article documents recovery **after** irreversible destruction, which most products do not write at all.

**Locked-out recovery is a coherent cluster** `[observed]`: `How do I open a support ticket when I can't log in?` ("Use the Can't Sign In form"), `I forgot my username or password`, `I lost access to the email I use to log in`, `I lost access to the GitHub account I use to sign into DigitalOcean`, `I lost access to the Google account I use to sign into DigitalOcean`, `How do I log in if I lose my two-factor authentication device?`, `What do I do if my account was locked during sign-up?`, `Why didn't I receive a password reset email or verification code?`, `What do I do if I get verification codes for sign-in attempts that weren't me?`.

Two observations. The **third-party dependency is owned rather than deflected** — DigitalOcean writes its own article for "I lost my GitHub account" and routes into GitHub's recovery process. And `What do I do if I get verification codes for sign-in attempts that weren't me?` is a **security-incident article written in the user's colloquial phrasing** ("that weren't me"), which is exactly the sentence a worried user would type.

**A copy defect worth recording** `[observed]`: the deck for `I lost access to the Google account I use to sign into DigitalOcean` reads "Try to restore access to your Google account by following GitHub's account recovery process." — "GitHub's" where it should say Google's, almost certainly a copy-paste from the sibling article. A concrete example of the risk in template-cloned support content.

**Other title-level defects** `[observed]`: trailing full stops on a minority of titles (`My Ubuntu Droplet lost all network connectivity after a software update.` · `I'm getting an error when using the DigitalOcean OAuth API.` · `My container-based app fails to deploy without logs or error codes.` · `I got a Permission Denied error when running a SnapShooter backup.`) where the majority have none; and `Why is my cluster rebalancing/resizing?` using a slash to join two states the system presumably distinguishes.

**Shared articles are duplicated across sections rather than cross-linked** `[observed]`: `How do I fix the "Connection Refused" error when connecting to my database?` appears verbatim under `Kafka`, `MongoDB`, `MySQL`, `Opensearch`, `PostgreSQL`, and `Valkey`. This is a deliberate IA trade — the reader browsing by engine always finds it — at the cost of a duplicated index.

## T8 Empty states

`[observed]` — two, both good, both on the docs/status surfaces:

**Docs search, no results**
> Headline: `We can't find any results for your search.`
> Body: "Try using different keywords or simplifying your search terms."

First person plural, contraction, full stop, no exclamation, **no echo of the query string** — which avoids exactly the empty-quotes interpolation defect seen in the Wise exemplar. The recovery line offers two distinct tactics (change the words / use fewer words) rather than a single generic "try again".

**Status page, no incidents**
> `No incidents reported today.` (current day) / `No incidents reported.` (prior days)

The tense shift between today and prior days is deliberate and correct: today is still open, prior days are closed. Two strings where one would have been cheaper.

In-product empty states are behind auth. `[absent]`

## T9 Notifications & system messages

**Incident communication follows a fixed three-stage narrative** `[observed]`, with the stage name as a bolded lead-in on each update: **Investigating** → **Monitoring** → **Resolved**. Updates are stacked newest-first, each timestamped in UTC, so the reader gets the outcome first and the history below.

Structure of the 16 Sep Support Portal incident, as an illustration of the house template:

- *Investigating* — names the symptom, names the cause class ("a third-party service disruption impacting our systems"), enumerates what the customer may be unable to do, **supplies a workaround with a URL**, apologises once, and commits to a next update.
- *Monitoring* — states the fix is applied and verified, names the monitoring window ("the next 2 hours"), restates the workaround for anyone still affected.
- *Resolved* — gives the full impact window with start and end times in UTC ("From 08:06 UTC to 13:41 UTC"), confirms verification, and closes with a conditional escalation ("If you continue to experience problems, please open a ticket").

The **9 Sep ATL1 power incident** shows the same template applied to a partial-impact event, and its *Investigating* note is a small masterclass in bounding: it states what is *not* broken before what is ("Redundant power systems are keeping servers online, and we have not observed any server outages."), then names the residual risk precisely and conditionally ("available power capacity is reduced, which may cause degraded performance for some GPU workloads, particularly during periods of high utilization"). Claim, bound, condition — without downplaying.

Consistent features across both incidents: hedged impact verbs (`may have experienced`, `may cause`), named owning team (`Our Engineering team`, "datacenter and infrastructure teams"), one apology per update and never more, and **a commitment to the next update rather than an ETA for the fix**.

**Alerting products and their naming** `[observed]`: `Uptime` — "Automated endpoint alerts", "Alerts by email and Slack"; `Can I be notified if my bill exceeds a threshold?` → billing alerts. Release notes record a rename: `Spend alerts` "are now generally available for teams and organizations, **replacing billing alerts**", with the notification latency stated as a commitment — "Notifications arrive within an hour of your spend crossing a threshold." Naming a delivery-time bound on a notification, in the changelog, is unusually concrete.

**Subscription channels offered on status** `[observed]`: email, SMS, Slack, X/Twitter (`Follow @DOStatus`), Atom/RSS. The framing sentence names the three events the user will hear about: "Get email notifications whenever DigitalOcean **creates**, **updates** or **resolves** an incident." SMS is explicitly a **narrower** subscription — "whenever DigitalOcean **creates** or **resolves** an incident" — i.e. no interim updates on the highest-interrupt channel. The difference is stated rather than left for the user to discover.

**Outbound support-initiated messages** `[documented]`: `My Droplet is sending an outgoing flood or DDoS` — "Next steps to take if you receive a message from DigitalOcean support because your Droplet is sending an outgoing flood or DDoS." An article written for the recipient of an enforcement message, which pairs the outbound notification with a documented landing place.

## T10 Disclosures, legal & compliance

**Pricing is disclosed with the qualifier attached to the number** `[observed]`

- `Starting at $1.91/GPU/hour*` with the asterisk resolved immediately below, not at page foot: "*Based on multi-month contractual commitment. On-demand pricing from $0.76/GPU/hour." The discounted figure is the headline and the undiscounted figure is in the footnote — recorded as a **dark-pattern-adjacent choice**, mitigated only by the footnote's adjacency.
- `Prices vary*` — "*Billed on candidate and judge tokens" (Evaluations). The billing *unit* is disclosed where the price cannot be.
- Droplets: "Per-sec billing with 60 sec minimum or $0.01, whichever is higher" — the floor rule stated in the bullet rather than in terms.
- `$0/month` used as an explicit price for five products (App Platform, Functions, Container Registry, VPC, Uptime, CSPM) rather than the word "Free". A price of zero is still rendered in the price slot, which keeps the cards structurally comparable.

**Thresholds and overages are written as complete sentences with both sides of the boundary** `[observed]`, e.g. on VPC: "Create unlimited VPCs at no additional cost." · "Ingress data transfer to VPCs is free. Egress data transfer from VPCs to the internet counts against bandwidth quotas." · "Intra-datacenter VPC peering is free. Inter-datacenter VPC peering is $0.01/GiB." · "VPC NAT Gateway: $40.00 per node, includes 100 GiB bandwidth (overage $0.01/GiB), supports up to 500,000 connections."

The free/not-free boundary is stated in adjacent sentence pairs — free thing first, charged thing second. Same shape on backups (percentage-of-Droplet-cost *and* usage-based alternative given together) and on the `Platform benefits` list, which is a twelve-item inventory of **what is included at zero cost**, headed "All the capabilities you need to build and scale your apps, included at no additional cost."

**Payment-mechanics disclosure is unusually granular for a marketing page** `[observed]`. The pre-authorisation hold is explained three times — in the payment-methods FAQ, again in `Am I charged when I enter my credit card?`, and in the support hub — each time with the amount, the purpose, the release, and the bank-side delay: typically $1, "immediately canceled by us", "Depending on your bank, it might take a few days for the charge to clear from the card." Naming the *third party's* latency rather than absorbing the complaint is the transferable move.

**Refusals are unhedged** `[observed]`: `Can I have a refund?` — "We do not offer refunds. If there are extenuating circumstances, contact support." Two sentences: the policy, then the single exception route. No apology, no padding, and the exception is not quantified (which keeps it discretionary).

**Retirement commitments are quantified** `[observed]`, from `Product Lifecycle Stages`: at least 1 month notice for minor retirements, at least 6 months for major features or products; "viable alternatives" and "continued support … until its retirement date" as named commitments. Crucially the page then **bounds its own promise**: it reserves the right to accelerate "in extenuating circumstances, such as essential changes necessary to protect the integrity of our platform or the security of our customers", and for third-party-driven retirements says "the pace of the retirement is out of our control." A commitment plus its stated exceptions, in the same document.

**Document-status disclaimer** `[observed]`, at the foot of the lifecycle page: a note that the terms of service govern use and "This document is not a contract". Marking a policy page as non-contractual, inside the policy page, is a clean pattern for the gap between explanatory and binding copy.

**Tax, eligibility and scope disclosures** `[observed]`: "We're required by law to apply taxes in some countries" routing to a per-country tax doc; support-plan scope stated as an exclusion (`Do DigitalOcean support plans apply to Cloudways or Paperspace?` — "No, support plans apply only to DigitalOcean"); free-credit expiry worked through as a numeric example in the FAQ answer; `Why do I need to enter a payment method?` justified by anti-abuse rather than by billing ("We use payment information to verify your identity, which allows us to keep DigitalOcean safe against spammers and bots").

`Why is SMTP blocked?` is the notable one: a platform restriction that costs the user something is explained by its purpose ("to prevent spam and abuse") and immediately redirected ("Use a third-party email as a service provider instead"). Restriction, reason, alternative.

## T11 Help-centre architecture

**Three distinct help systems, and the split is the architecture** `[observed]`

| System | URL | Content type | Title grammar |
|---|---|---|---|
| Product docs | `docs.digitalocean.com/products/` | First-party, control-panel, procedural | Title case, verb-first (`Create Droplets`, `Resize Droplets`) |
| Support hub | `docs.digitalocean.com/support/` | Troubleshooting, one-answer | Sentence case, user's voice (`Why was my card declined?`) |
| Community tutorials | `digitalocean.com/community/tutorials` | Contributor-written, terminal-level | `How To <Verb> …` |

**Support hub IA: flat, alphabetical, product-named** `[observed]`. 27 sections, ordered A–Z, each named for a product or subsystem rather than a task: `Accounts` · `API` · `App Platform` · `Backups` · `Bare Metal GPUs` · `Billing` · `Cloudways` · `Container Registry` · `DDoS` · `DNS` · `Droplets` · `Firewalls` · `Functions` · `Inference` · `IPv6` · `Kafka` · `Kubernetes` · `Load Balancers` · `MongoDB` · `Monitoring` · `MySQL` · `Networking` · `Opensearch` · `Paperspace` · `PostgreSQL` · `Reserved IPs` · `SnapShooter` · `Snapshots` · `Spaces` · `Teams` · `Valkey` · `Volumes` · `VPC`.

This is the **opposite** of the Wise pattern (`Where is my money?`). DigitalOcean routes by system, not by feeling — defensible for an audience that already knows which component broke, and which arrives from a search engine with an error string rather than from a homepage with a worry. `DDoS` as a top-level support category, alphabetised between `Container Registry` and `DNS`, is the sharpest instance: an attack class treated as a routine product area.

Above the alphabetical sections sits one `Need Help?` block with exactly two entries — `How to Create a Support Ticket` ("Sign in to the support portal, select a team, then create and submit a request") and `Support Plans` ("Compare plans, response times, and support channels"). Human contact is offered **first and small**, then self-service by product; the inverse of Wise's ordering, and arguably the right inverse for a paid-support product where entitlement is the reader's first question.

**Per-product docs IA is the six-bucket shape** `[observed]`, described in T1. Inside `Details` the buckets are consistently: `Features`, `Pricing`, `Availability`, `Limits`, `Image Deprecation Policy`, `Package Mirrors`, `Droplet Policies`, `Live Migrations`, and links out to per-product SLAs. **`Limits` and `Availability` as standing, named docs sections** is a pattern worth stealing — the two questions most likely to stop a project are given permanent addresses rather than being buried in FAQ.

**Recovery is its own how-to branch** `[observed]`: `Recover Access or Data` → `Boot from Recovery ISO` / `Connect with Recovery Console`. The unhappy path is a named node in the product nav, not an appendix.

**Self-service routing furniture** `[observed]`: `Give Feedback` on every docs page (to `ideas.digitalocean.com/documentation`, a docs-specific feedback board); `In this article...` per-page contents; `Last verified 13 Jul 2026` under the title; `Glossary` as a `Concepts` child (`/glossary/droplets/`) — i.e. a per-product glossary rather than one site-wide one.

**`Last verified <date>`** rather than "Last updated" is a deliberate and better word: it asserts someone checked the content was still true, not merely that bytes changed.

## T12 FAQs

**Placement**: accordion block near the foot of `/pricing`, under `Frequently asked questions`, followed by a `Still have questions?` block routing to `Contact sales`. **Answers are present in server HTML** here (unlike the Wise exemplar), so both questions and answer substance were retrievable.

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | What forms of payment do you accept? | Lists six card/wallet methods; notes Apple Pay needs Safari; routes wire/PO/ACH to sales; then pre-empts the pre-authorisation hold complaint |
| 2 | When will my card be charged? | Monthly cycle, charged on the 1st for the prior month's usage; names the threshold exception with a link; states self-pay is always available |
| 3 | Am I charged when I enter my credit card? | Leads with a one-word `No.`, then re-explains the pre-auth hold, its typical size, and the bank-side clearing delay |
| 4 | Will taxes be included in my monthly invoice? | Legal obligation in some countries; routes to a per-country tax doc |
| 5 | How do I destroy my resources? | Answer is a **link list only** — one destroy doc per resource type, nine links, no prose |
| 6 | Can I be notified if my bill exceeds a threshold? | `Yes`, plus the mechanism (billing alerts) and the channel (email) |
| 7 | How does the $5 free credit work? | Worked numeric example with two scenarios ($3 spend, $10 spend), then the expiry rule |
| 8 | What's the price for the Marketplace 1-Click Apps? | One sentence: you pay for the underlying compute |
| 9 | How do I remove my card from the account? | Click-path with named UI strings (`…` menu, `Delete`, `Confirm Delete Card`), ending with the constraint: you cannot remove the default payment method |
| 10 | Can I prepay for my resources? | Routes to sales rather than answering |
| 11 | Can I have a refund? | "We do not offer refunds." plus the extenuating-circumstances route |

**Structural notes.** Eleven questions, all billing — the pricing FAQ is scoped strictly to money and does not drift into product. Ordering runs: payment methods → timing → the "am I being charged right now?" anxiety → tax → teardown → alerts → credits → marketplace → card removal → prepayment → refunds. **The three anxiety questions are front-loaded** (2, 3 appear before any product question), and the two questions with unwelcome answers (10 prepay, 11 refund) are placed last.

Q1 and Q3 both explain the pre-authorisation hold, at length, in adjacent answers. That is redundant on the page but correct for a reader who lands on one accordion item from search — a legitimate reason to repeat rather than cross-link.

Q5 is the most interesting item: the answer to `How do I destroy my resources?` is nothing but links to nine per-resource destroy docs. The FAQ declines to summarise a destructive procedure and routes to the canonical instruction instead. **Where the action is irreversible, the FAQ becomes a router rather than an answer.**

`Still have questions?` is scoped ("Have a complex setup or additional questions around pricing?") rather than generic, so the reader can tell whether they qualify before clicking.

## T13 Terminology & glossary

| Term | DigitalOcean's usage | The alternative it rejected |
|---|---|---|
| `Droplet` | The core coined noun for a VM; capitalised always, used as a countable object (`Create Droplets`, `Resize Droplets`, `Destroy Droplets`) | "instance", "VM", "virtual server" |
| `GPU Droplets` / `Bare Metal GPUs` | The coined term extended to a new hardware class, with bare metal named separately because it is *not* a Droplet | "GPU instances" |
| `Destroy` | The irreversible delete verb, used consistently in nav, docs, API (`Droplet Actions`) and FAQ | "Delete", "Terminate" |
| `Spaces` | Object storage, glossed on first use as "S3-compatible object storage" | "Buckets" (though `buckets` is used *inside* Spaces) |
| `Volumes` | Block storage, always glossed "Volumes Block Storage" in link text | "Disks", "EBS" |
| `Reserved IP` | A reassignable static address; the docs explicitly contrast it with a "dedicated IP address", which the product does not have | "Floating IP" (the prior DigitalOcean name; no longer visible) |
| `Teams` | The account container; the support hub carries `Why is my account now a team?` to explain the forced concept | "Organizations" (though `organizations` now appears in release notes as a *layer above* teams) |
| `Genre` | The docs facet for grouping products (`Browse by → Product Genre`) | "Category", "Type" |
| `How-Tos` | The docs bucket for procedures, hyphenated and pluralised this way | "Guides", "Tasks" |
| `Details` | The docs bucket for features, pricing, availability, limits, policies | "Specifications", "Reference" (which is used for API/CLI instead) |
| `Last verified` | The per-page freshness stamp | "Last updated" |
| `doctl` | The CLI, always expanded on first use: "doctl Command Line Interface (CLI)" | |
| `DOKS` / `DOCR` | Internal acronyms that leak into public support titles (`Can I resize a DOKS node?`, `My DOCR image failed to upload or timed out`) without expansion in the title | |
| `Clusterlint` | A named first-party tool, glossed in its own article deck as "a non-invasive best practices checker" | |
| `blackhole` / `blackholed` | Network-ops term retained and then glossed | "traffic suspended" |
| `trusted sources` | The database firewall allowlist concept, used consistently across six engine sections | "IP allowlist", "whitelist" |
| `Inference Router` / `Serverless Inference` / `Dedicated Inference` / `Batch Inference` | Four named inference modes, differentiated by adjective | |
| `Open Harness`, `Sandbox`, `Plano`, `Toolbox`, `State` | Five coined Managed Agents product nouns on the homepage, **presented with no gloss at all** — the only product list on the page without descriptions | |
| `Spend alerts` | Renamed from `billing alerts`, with the rename stated in the changelog | |
| `Feature Preview` | The named opt-in surface for public previews | "Beta settings", "Labs" |

**Register split by surface.** Marketing says `AI-Native Cloud`, `intelligence per dollar`, `agent runtimes`; docs say `Droplet`, `volume`, `trusted sources`; support says `Why was my card declined?`. The abstraction level drops monotonically from homepage → docs → support hub, and the support hub is the only surface that uses the user's own words.

**The AI-agent affordance is itself a content artefact** `[observed]`. Every docs page carries, above the H1, a note addressed to a non-human reader: "**For AI agents:** The documentation index is at https://docs.digitalocean.com/llms.txt. Markdown versions of pages use the same URL with `index.html.md` in place of the HTML page." Paired with the visible `Copy page as Markdown` / `View page as Markdown` buttons and an `llms.txt` link in the docs footer. DigitalOcean has added a **second addressee to its documentation** and labelled the block so human readers know it is not for them. As of this harvest this is the clearest instance of agent-readable docs as a first-class content deliverable in the corpus.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout ("Always know what you'll pay", "you can use"); first-person plural for the company, and used freely in adverse copy — "We do not offer refunds", "No, we do not support DNSSEC", "We use payment information to verify your identity", "We temporarily trigger a blackhole", "Our Engineering team has confirmed". The company is a named actor in its own refusals, which is the main reason the refusals read as policy rather than as stonewalling.

**Register gradient across the three surfaces.**

- *Homepage*: compressed, fragmentary, em-dash-heavy, borderline slogan. "Scale inference. Not complexity." · "We own the silicon." · "The complexity of stitching together multiple vendors — gone." · "One CLI. One API. One bill."
- *Docs*: plain procedural, imperative, bold-for-UI, no contractions in instructions.
- *Support hub*: the user's own colloquial phrasing in titles, flat declarative one-sentence answers in decks.

The tone flattens as the stakes rise, the same gradient as Wise, but achieved by **surface separation rather than by modulating one voice**.

**Zero exclamation marks observed** across all eleven pages, including incident updates and the free-credit FAQ. No `Oops!`, no `Great news!`. The single instance of play is the pricing-calculator CTA `We'll do the math` — placed, notably, on the page where every other string is literal.

**Apology discipline in incident copy.** Exactly one apology per update, always paired with an appreciation and always last: "We apologize for any inconvenience and appreciate your patience." · "We apologize for the disruption and appreciate your patience." · "We apologize for the inconvenience and appreciate your patience while we work to resolve the issue." The formula is fixed and the placement is terminal, so it never displaces information at the top of the message.

**Numbers as trust devices** `[observed]`: `8,000+ development and sysadmin tutorials` · `80+ models` / `72 Models` / `Over 70 models` · `20 data centers across 12 regions` · `1B+ queries per day` · `1T+ automation tasks` · `186% return on investment` · `net present value (NPV) of $1.55 million` · `payback … in less than 6 months` · `90,000 GiB-seconds per month for free` · `500,000 connections`.

**A quantitative inconsistency worth flagging**: the model count appears as `80+ models` (hero slide), `Over 70 models` (Inference Engine layer copy), and `72 Models or Bring Your Own Model` (same layer's product list) — three different figures on one page. The Forrester ROI figures are, to their credit, fully attributed and given as a three-year benefit-versus-cost comparison rather than a bare percentage.

**Accessibility content** `[observed]`

- **Link-text expansion on tutorial cards**: the card shows the title, and the link is labelled `Learn How To Install and Use Docker on Debian 10` — the full title prefixed with `Learn`. This gives a self-describing accessible name for every card link instead of a repeated "Read more", and is applied uniformly across the collection. The cleanest accessibility-content pattern in this file.
- Docs pages carry an `In this article...` in-page contents block and a `Copy page as Markdown` alternative format.
- Self-referential link defect: the docs `In this article...` block on `Getting Started with Droplets` contains a single link whose text is the page's own title and whose target is the page itself — a contents list of one item pointing at the current page. Harmless but noise for a screen-reader user.
- The homepage duplicates its entire customer-logo strip **three times** in the DOM (carousel clones). Screen-reader users may encounter the eight logos three times depending on how the clones are hidden — flagged as suspected, not confirmed, since CSS/aria handling was not inspected.
- Homepage decorative images (`cityscape`, gradient CTAs, layer illustrations) carry empty alt — correct practice. But the customer-logo images use the bare company name as alt (`RadixArk`, `character.ai`, `Ace Studio`), which loses the "customer of DigitalOcean" relationship for a non-sighted reader; only `Bandwidth graphic` and `Laptop graphic` on the pricing page carry descriptive-but-useless alt of the "graphic" variety.
- Status page: the subscribe panel exposes raw anchor targets as link text in the extracted DOM (`#updates-dropdown-email`, `#updates-dropdown-sms`, …) — these are the tab controls, and if those fragments are the accessible names, the tab set is unlabelled. Flagged as suspected. Also `x` as the dismiss control's entire label.
- No `Skip to content` link found in the server HTML of the marketing pages. `[absent]`
- No published accessibility statement found in the footer. `[absent]`
- **No published content style guide or design system found.** DigitalOcean open-sources heavily (`Open-Source Software` docs page) but nothing voice-and-tone or design-system was reachable. `[absent]`

**The headline negative finding for this product.** DigitalOcean's benchmark strength is "tutorials and task-based navigation", and the historic `How To <Verb> <Thing> on <OS> <Version>` grammar is genuinely a model of task-based titling — still visible in `How To Install and Use Docker on Debian 10`, `How To Install and Use Docker on Ubuntu 18.04`, `How To Install Nginx on Ubuntu 20.04 [Quickstart]` (note the bracketed length-signal suffix). But the grammar is **actively eroding**, and the erosion is visible inside a single collection page:

- `How To Install and Use Docker on Ubuntu 16.04` — original grammar
- `How To Install and Use Docker on Ubuntu` — version stripped
- `How to Install Docker on Ubuntu – Step-by-Step Guide` — case changed, verb dropped, SEO suffix added
- `Install and Use Docker on Rocky Linux: Tutorial` — `How To` dropped entirely, colon-suffixed

Four title shapes for one task in one list. And the tutorial titles promoted on the homepage in September 2026 have abandoned task grammar altogether in favour of essayistic and interrogative headlines: `Speculative Decoding's Hidden Cost: The KV Cache Capacity You Give Up, and Where Throughput Turns Negative` · `Why DeepSeek V4.1 Flash Splits Reading From Writing` · `The Agent Never Sees the Key: Proving Credential Brokering in DigitalOcean Action Gateway` · `Fault-Tolerant Training on Spot GPU Droplets: Checkpoint, Resume, and Keep Your Run Alive` · `Why Your Best Model Is Two Models: Routing Between Kimi K3 and Claude` · `What Is an Agent Harness? Architecture and Setup in 2026` · `What Is SGLang? 2026 Guide to the LLM Serving Framework` · `DigitalOcean vs OpenRouter in 2026: AI Routing Comparison`.

These are competent headlines but they are *articles*, not tasks — and they now occupy the same `/community/tutorials/` namespace and the same `Tutorial` label as the how-tos. The library is drifting from "8,000 things you can do" toward "a technical blog", with the two content types undifferentiated in the IA. **The task-based grammar that made this product a benchmark now survives most reliably in the support hub, not in the tutorial library.**

---

## Transferable patterns

1. **Put the literal error string in the title, in quotes.** DigitalOcean's support hub is a search-term index: `How do I fix the "Connection Refused" error when connecting to my database?` matches the bytes the user pasted. Condition: works where users see machine-generated strings. Directly transferable to any developer or API-facing error catalogue; for consumer products the equivalent is the user's spoken phrasing, not the system's code.
2. **Two named first-run paths on a disposable/durable axis.** `Droplet Quickstart` ("just the essentials … in a few minutes") beside `Set up a Production-Ready Droplet` ("our recommended configuration for improved security, reliability, and monitoring"). Naming the trade-off in the card copy beats "Basic" / "Advanced", which tells the reader nothing about which one they are.
3. **`X is not possible, but Y is` as a house construction for refusals.** Stated as a flat fact, no apology, workaround appended with `but`, mechanism supplied when it stops the reader hunting ("reducing the size of a disk can result in data loss or corruption"). Condition: only defensible when the workaround is real; without the `but` clause it reads as stonewalling.
4. **Document the recovery path that exists after the irreversible thing.** `Why can't I find my app even after paying my past due balance?` tells a user whose resources were destroyed how to get their app spec back. Most products write nothing past the point of no return. High transferability to account closure, dispute loss, and data-deletion flows.
5. **Friction proportional to blast radius.** Plain `Confirm` to destroy one Droplet; type the Droplet's name when associated resources are included. The confirmation cost scales with what is at stake rather than being uniform.
6. **Name the maturity state, tabulate its consequences, and reuse the words in the changelog.** `Private Preview` / `Public Preview` / `General Availability` with a `Production ready: No / Partial / Yes` row, and release notes that say "is now in public preview" using the same term. Lets a reader map a feature announcement onto a support entitlement without translation. `Partial` is the honest value most vendors omit.
7. **Incident updates commit to the next update, not to a fix time**, and state what is *not* broken before what is ("Redundant power systems are keeping servers online, and we have not observed any server outages"). One apology per update, always last.
8. **`Last verified <date>`, not "Last updated".** A freshness stamp that asserts someone checked the content is still true.
9. **Where the action is irreversible, let the FAQ route instead of answer.** `How do I destroy my resources?` answers with nine links to canonical destroy docs and no prose.
10. **A labelled block addressed to machine readers.** The `**For AI agents:**` note plus `View page as Markdown` and `llms.txt` treats agents as a second audience with declared affordances, while labelling the block so humans can skip it.

## Caveats & gaps

- **The tutorial library index is not in server HTML.** `/community/tutorials` and `/community/tags/ubuntu` both returned only page chrome and three identical promo cards; no tutorial rows, no category facets, no sort controls, no result counts. The flagged strength for this product — task-based navigation of the tutorial library — was therefore assessed from a *collection* page, the homepage resource carousel, and search-result titles. **The library's own navigation labels, filters and facet names are unharvested** and would need a browser-rendered pass.
- Tutorial *titles* quoted in T14 come from three sources of differing strength: the tutorial-collection page (directly observed), the homepage carousel (directly observed), and a web search whose result titles I did not open (`How To Install Nginx on Ubuntu 20.04 [Quickstart]`, `How To Install LAMP Stack (Apache, MySQL, PHP) on Ubuntu`). The last group is search-index metadata, not an observed page, and is marked accordingly.
- **Tutorial bodies were not opened.** The internal grammar of a DigitalOcean tutorial — `Prerequisites`, `Step 1 — …`, `Conclusion` — is well known but was not observed in this harvest and is deliberately not recorded.
- **All in-product copy is `[documented]`, not observed.** Control-panel buttons, destroy confirmations, validation messages, toasts, and every authenticated empty state are quoted from docs prose. Docs bold every UI string consistently, which makes them a reliable but second-hand record.
- Docs home HTML exceeded the fetch limit and was analysed from a saved copy; the release-notes river on that page was sampled, not read in full.
- **Not harvested**: `/security`, `/trust` (Trust Platform), `/legal/*`, `/products/identity-access-management`, `/products/cloud-security-posture-management`, the pricing calculator, `ideas.digitalocean.com`, `/community/questions` (the Q&A surface, which would be the best source of user-voice phrasing), and the API reference's own error-response documentation. An error-*code* reference in the API docs may exist and was not located; the support hub's error catalogue was harvested instead, and **no invented error codes appear in this file**.
- Only en-US observed; no locale switcher was present to test.
- Accessibility findings on DOM-level link text and carousel duplication are **suspected, not confirmed** — no ARIA attributes or CSS were inspected, and the extraction may not reflect the accessible name computation.

## Sources

1. https://www.digitalocean.com/
2. https://www.digitalocean.com/pricing
3. https://docs.digitalocean.com/
4. https://docs.digitalocean.com/support/index.html.md
5. https://docs.digitalocean.com/products/droplets/getting-started/
6. https://docs.digitalocean.com/products/droplets/getting-started/quickstart/index.html.md
7. https://docs.digitalocean.com/platform/product-lifecycle/index.html.md
8. https://www.digitalocean.com/community/tutorials
9. https://www.digitalocean.com/community/tags/ubuntu
10. https://www.digitalocean.com/community/tutorial-collections/how-to-install-and-use-docker
11. https://status.digitalocean.com/
