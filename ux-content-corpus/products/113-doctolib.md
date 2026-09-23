# 113. Doctolib

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | European provider booking and practice software (patient marketplace + practitioner SaaS) |
| Primary URL | https://www.doctolib.fr/ |
| Corpus rank | 113 |
| Benchmark strength (source list) | Appointments and privacy |
| Locale / market observed | **fr-FR throughout.** `meta-og:locale: fr_FR`; help centre at `/hc/fr`; privacy policy `Version : Septembre 2024` in French. German-market evidence is present but indirect (see T14) — every help article carries German search keywords alongside French, confirming FR and DE share one article corpus. **No Italian-locale evidence found.** No language switcher was rendered in any fetched page. |
| Platform observed | Web (marketing, directory, specialty index), Zendesk help centre (patient + practitioner), published PDF privacy policy |
| Auth state | Unauthenticated public surfaces only. No booking, no account creation, no symptom or personal data entered. |
| Regulatory posture | **RGPD (GDPR) + French Loi Informatique et Libertés of 6 Jan 1978 as amended ("LIL")**, both named explicitly in the privacy policy. Health data handled as `Données de santé` under an explicit `secret médical` commitment. **HDS certification (`Hébergeur de Données de Santé`) is claimed for the *host*, not for Doctolib itself** — AWS is named as the HDS-certified host in the help centre; the policy PDF says only `un hébergeur agréé`. Standards bodies named: **ANS** (Agence du Numérique en Santé) and **CNIL**, with the CNIL complaint route published. Encryption keys are held at a separate French provider (Atos). Data residency: France (Paris) and Germany (Frankfurt). Also cited: ISO/IEC 27001, OWASP, EN 301 549 and WCAG 2.1 AA under the European Accessibility Act. Minimum age 15. Professional-register links to the Ordre National des Médecins and Ordre National des Chirurgiens-Dentistes sit in the footer. |
| Harvest date | 2026-09-21 |
| Pages inspected | 42 |
| Harvest completeness | Partial — the consumer site (`doctolib.fr` home, specialty results, `/sante/`) is client-rendered and returned footer and meta only. **All six `doctolib.legal` pages returned empty bodies**, including the official `Règles de référencement`. The privacy policy was recovered as a published PDF; ranking criteria were recovered from the *practitioner* help centre. Search-filter labels are `[documented]` from help articles, never observed live. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.doctolib.fr/ | **Footer only** — body client-rendered |
| Specialty index | https://www.doctolib.fr/specialities | Server-rendered; ~110 specialities + ~20 facility types |
| Help centre home | https://doctolibpatient.zendesk.com/hc/fr | 6 categories with scope lines, `Questions fréquentes` |
| Help categories (5) | `/hc/fr/categories/…` — Mon compte, Mes rendez-vous, Mes données de santé, Mes proches, Sécurité et confidentialité | Full section tree |
| Help sections (13) | `/hc/fr/sections/…` | ~80 article titles |
| Help articles (21) | `/hc/fr/articles/…` | Booking, filters, cancellation, no-show, notifications, phishing, data rights, storage, security, accessibility |
| Practitioner help — ranking | https://doctolib.zendesk.com/hc/fr/articles/24301145743892 | **The ranking-transparency source** |
| Privacy policy (PDF) | https://media.doctolib.com/image/upload/v1727340494/legal/B2C-VDEF-PrivacyPolicy-SEPT24-FR.pdf | **Richest single source** — RGPD, HDS, rights, retention, sub-processors |
| About | https://about.doctolib.fr/ | Meta + one footnote only |
| Video consultation | https://www.doctolib.fr/sante/consultation-video/ | Meta only |
| GP landing + city variant | /medecin-generaliste, /medecin-generaliste/paris | Meta only — results client-rendered |
| Privacy marketing page | https://www.doctolib.fr/sante/confidentialite/ | Meta only; `noindex, nofollow` |
| `doctolib.legal` (6 pages) | CU-B2C-FR, B2C-CU-Website-FR, privacy-policy-B2C-FR, Cookie_Policy_FR_B2C, B2C-legalmentions-FR, Search-transparency_DL_FR | **All blocked** — empty bodies |

---

## T1 Navigation & IA labels

**The footer is the only server-rendered navigation** `[observed]`, and it is unusually dense with regulatory furniture:

`Aide et information` [Help and information] groups the company links. The legal row runs:

`Conditions générales d'utilisation` [General terms of use] · `Conditions d'utilisation du site Doctolib` [Doctolib website terms of use] · `Politique relative à la protection des données personnelles` [Personal data protection policy] · `Politique en matière de cookies` [Cookie policy] · `Gestion des cookies et consentement` [Cookie management and consent] · `Règles de référencement` [Listing/ranking rules] · `Mentions légales` [Legal notice] · `Signaler un contenu illicite` [Report illegal content]

Two things stand out. **`Règles de référencement` is a footer link on every page** — Doctolib treats its search-ranking rules as a standing legal artefact of the same class as the cookie policy. Compare Zocdoc (112), which publishes the same information but as a marketing page about transparency. And `Signaler un contenu illicite` is the EU Digital Services Act notice-and-action route, given persistent footer placement.

Below the legal row sits a second, external row `[observed]`:

`Annuaire des médecins du CNOM` [CNOM directory of doctors] · `Annuaire des chirurgiens-dentistes de l'ONCD` · `Ordre National des Médecins` · `Ordre National des Chirurgiens-Dentistes`

Doctolib links out to the professional registers that could be used to verify — or contradict — its own listings. That is a confidence move a directory only makes if its data is good.

**Help-centre categories are possessive, not functional** `[observed]` — six categories, each written as `Mon`/`Mes` + object, each with a scope line:

| Category | Scope line (verbatim) | Gloss |
|---|---|---|
| `Mon compte Doctolib` | `Lancez-vous rapidement et naviguez sur Doctolib en toute confiance.` | Get started quickly and browse with confidence |
| `Mes rendez-vous` | `Prenez rendez-vous, gérez et préparez vos consultations.` | Book, manage and prepare your consultations |
| `Mes données de santé` | `Stockez, partagez et consultez toutes vos informations de santé.` | Store, share and view all your health information |
| `Mes proches` | `Occupez-vous de vos proches depuis votre compte Doctolib.` | Take care of your relatives from your account |
| `Sécurité et confidentialité` | `Découvrez comment Doctolib protège vos données et garantit des soins fiables.` | Discover how Doctolib protects your data and guarantees reliable care |
| `Doctolib Parents` | `Avancez avec confiance dans les premières années de vie de vos enfants de 0 à 4 ans.` | Move forward with confidence through your children's first years, 0 to 4 |

Five of six categories are first-person possessive. The IA is written in the user's voice — the user reads `Mes rendez-vous`, not "Appointments". The one exception, `Sécurité et confidentialité`, is where Doctolib stops speaking as the user and starts speaking as the company, and its scope line is the only one that names Doctolib.

The scope lines are **imperative verb runs** (`Prenez… gérez… préparez`), mirroring Wise's comma-run pattern (exemplar 041) but in imperative rather than gerund form — a French-register difference worth noting: French help IA tends to imperatives where English tends to gerunds.

`Mes proches` [my relatives / loved ones] as a top-level category is the distinctive one. Booking for someone else — an elderly parent, a child — is modelled as a first-class use case with its own category and two sections, not as a variant of booking for yourself.

**Section names continue the first-person pattern** `[observed]`, including reflexives with elided pronouns: `M'assurer de la sécurité de mon compte` [Make sure my account is secure] · `M'informer sur le contenu sur Doctolib` · `Connaître les soignants sur Doctolib`.

**Help-centre chrome** `[observed]`: `Aller au contenu principal` [Skip to main content] · `Centre d'aide Doctolib` (H1) · `Recherchez des articles pour trouver votre réponse` [Search articles to find your answer] · `Parcourir les rubriques d'aide` [Browse help topics] · `Questions fréquentes` · `Réserver un rendez-vous sur Doctolib` (top-right CTA) · `Voir tous les articles`.

**Live defect** `[observed]`: the "back to site" link renders the literal unsubstituted token `https://doctolib.{country_code}/`, as does the header CTA. A broken locale interpolation, visible in production server HTML.

**Specialty index IA** `[observed]`: H1 `Toutes les spécialités`, with a sub-grouping heading `Établissements de santé` [Health establishments] separating ~20 facility types (`Centre de santé`, `Hôpital public`, `Hôpital privé`, `Maison de naissance` [birth centre], `Maison des femmes` [women's centre], `Centre Gratuit d'Information, de Dépistage et de Diagnostic (CeGIDD)`) from ~110 practitioner specialities. Naming `Maison des femmes` and `CeGIDD` (free sexual-health testing centres) in a public index is a deliberate access decision — these are the services people are least likely to ask a GP about.

## T2 Value proposition & headline patterns

**Hero copy is client-rendered and was not retrievable.** What follows is published title/meta copy, which is real Doctolib copy `[observed]`:

- Homepage title: `Doctolib : Prenez rendez-vous en ligne chez un soignant` [Doctolib: book an appointment online with a caregiver]
- Homepage meta: `Trouvez rapidement un spécialiste près de chez vous et prenez rendez-vous gratuitement en ligne en quelques clics` [Quickly find a specialist near you and book free online in a few clicks]
- GP landing meta: `Trouvez rapidement un médecin généraliste près de chez vous… et prenez rendez-vous gratuitement en ligne en quelques clics` — the city variant swaps `près de chez vous` [near you] → `à Paris`.

The three proposition claims are **speed** (`rapidement`, `en quelques clics`), **proximity** (`près de chez vous`), and **price** (`gratuitement`). No quality claim, no volume claim. In a market where seeing a doctor is a rationed good, access is the entire value proposition.

**The privacy page carries the strongest headline copy on the site** `[observed]`, https://www.doctolib.fr/sante/confidentialite/:

> `Vos données personnelles sont précieuses. Doctolib les protège avec des standards de sécurité européens, un chiffrement systématique et vous donne un contrôle total pour ajuster vos choix. Transparence, confiance et confidentialité à chaque étape.`
> [Your personal data is precious. Doctolib protects it with European security standards, systematic encryption, and gives you full control to adjust your choices. Transparency, trust and confidentiality at every step.]

`précieuses` [precious] rather than "sensitive" or "important". `standards de sécurité européens` is doing geopolitical work — European, therefore not American, therefore not subject to the CLOUD Act, without saying any of that. The three-noun closer (`Transparence, confiance et confidentialité`) is a rhythmic device Doctolib uses repeatedly.

**The privacy policy opens with an argument, not a definition** `[observed]`, PDF introduction:

> `Les informations qui touchent à notre santé sont personnelles. À ce titre, elles doivent être protégées avec le plus grand soin.`
> [Information touching our health is personal. As such, it must be protected with the utmost care.]

Two short declarative sentences, first-person plural (`notre santé` — *our* health, including Doctolib's own staff), establishing a premise before any legal text. Followed by:

> `Le respect de la vie privée est un droit fondamental et l'une des valeurs essentielles de Doctolib.`
> [Respect for privacy is a fundamental right and one of Doctolib's core values.]

Naming privacy as a *fundamental right* first and a *company value* second is the correct ordering, and it is the opposite of how most privacy policies open.

**Mission line** `[observed]`, about.doctolib.fr meta: `Construisons ensemble le système de santé dont nous rêvons tous, aux côtés des soignants et des patients.` [Let's build together the healthcare system we all dream of, alongside caregivers and patients.] — note `Construisons ensemble`, the first-person-plural imperative that recurs throughout the help centre (see T14).

## T3 CTA inventory

**Site and help-centre chrome** `[observed]`:

| CTA | Gloss | Context |
|---|---|---|
| `Réserver un rendez-vous sur Doctolib` | Book an appointment on Doctolib | Help-centre header |
| `Ouvrir le Centre d'aide` | Open the Help Centre | Site footer |
| `Contactez-nous` | Contact us | Foot of every article, after `Vous n'avez pas trouvé votre réponse? / Laissez-nous vous aider` [Didn't find your answer? / Let us help you] |
| `Voir tous les articles` | See all articles | Category cards |
| `Copier le lien de l'article` → `Copié !` | Copy article link → Copied! | Article header |
| `Avez-vous trouvé cet article utile ?` `Oui` / `Non` → `Merci de votre retour` | Was this article useful? Yes/No → Thanks for your feedback | Article foot, with a counter: `18309 utilisateurs ont trouvé cet article utile` |
| `Signaler un contenu illicite` | Report illegal content | Footer |

**Product CTAs, quoted in help articles** `[documented]`:

| CTA | Gloss | Note |
|---|---|---|
| `Prendre rendez-vous` | Book an appointment | Profile primary CTA — the everyday verb |
| `Rechercher` | Search | Search submit |
| `Autour de moi` | Around me | Geolocation chip in the "where" field |
| `Filtres` → `Afficher les résultats` | Filters → Show results | Filter sheet open/apply |
| `Sélectionner un secteur` → `Enregistrer` | Select a sector → Save | Sub-sheet |
| `Confirmer le rendez-vous` / `Confirmer ce rendez-vous` | Confirm the / this appointment | **Two labels for one action** |
| `Je n'ai pas de préférence` | I have no preference | Optional-choice escape hatch, used for BOTH location and practitioner |
| `J'ai lu et j'accepte les consignes` | I have read and accept the instructions | Pre-booking acknowledgement |
| `Annuler le RDV` → `Continuer` → `Confirmer l'annulation` | Cancel the appt → Continue → Confirm cancellation | Three-step cancel |
| `Prendre rendez-vous plus tôt ?` | Book earlier? | Waiting-list opt-in, worded as a question |
| `Voir plus` | See more | Expands the `Accessibilité` profile block |
| `Envoyer ma demande` | Send my request | Support form |
| `Supprimer mon compte` → `Supprimer` | Delete my account → Delete | |
| `Activer les notifications` / `Ignorer` | Enable notifications / Skip | First-run permission prompt |

**Two observations.** `Réserver` (header CTA, formal "reserve") versus `Prendre rendez-vous` (profile CTA, the everyday French phrase) is a register split by surface — the marketing chrome is formal, the in-task control uses the words a French speaker actually says. Second, `Annuler le RDV` is the **only** place the abbreviation `RDV` appears; everywhere else the noun is spelled out. Abbreviating in the destructive-action button is an odd place to save characters.

**`Je n'ai pas de préférence` is the best CTA in the file.** It appears in two different funnel steps and it gives the user permission to decline a choice they cannot make. A patient booking at a multi-site practice frequently has no idea which site is better; a patient booking a first appointment has no view on which practitioner. Most booking flows force the choice. Doctolib names indifference as a valid answer.

## T4 Onboarding & getting-started

There is no `Comment ça marche` page in server HTML. `[absent]`

**The booking sequence, documented as eleven steps** `[documented]`, article 360025316194:

`Accueil` → `Rechercher` → name in the `barre de recherche` → `Prendre rendez-vous` → `Indiquez si vous prenez rendez-vous pour vous ou un proche` [say whether the appointment is for you or a relative] → `La spécialité` / `Le lieu de consultation` / `Le type de consultation` → `Sélectionnez le motif de consultation` → `Choisissez la date de consultation` → `J'ai lu et j'accepte les consignes` → `Indiquez si vous avez déjà consulté ce soignant` [say whether you have already seen this caregiver] → `Confirmer le rendez-vous`

Two steps are worth pulling out. The **"for you or a relative" fork sits at step 5, before any clinical input** — the identity question is resolved before the medical one. And **"have you seen this caregiver before" is asked at step 10, immediately before confirmation** — because in the French system, whether you are an existing patient can determine whether you may book at all (see T6).

**The slot-hold copy is a model of its kind** `[documented]`:

> `Après avoir sélectionné un créneau de rendez-vous, il est réservé pour vous pendant 15 minutes. Confirmez-le. Passé ce délai, le créneau redevient disponible pour tous les patients.`
> [Once you select a slot it is held for you for 15 minutes. Confirm it. After that the slot becomes available to all patients again.]

Three sentences: the fact, the instruction, the consequence. The consequence is framed as *other patients* getting the slot, not as "your session will expire" — the same other-patients justification Zocdoc uses for its no-show policy. And the middle sentence is a bare two-word imperative, `Confirmez-le.`, which is unusually blunt for Doctolib's otherwise warm register. It is blunt because it needs to be.

**Teleconsultation is documented as five named stages** `[documented]`, article 360013356699: `Prise de rendez-vous` → `Préparation du rendez-vous` (including `rejoignez la salle d'attente virtuelle` [join the virtual waiting room]) → `Déroulement de la consultation vidéo` → `Réception de vos documents médicaux et de votre ordonnance` [receipt of your medical documents and prescription] → `Paiement et remboursement` [payment and reimbursement].

Stages 4 and 5 are the interesting ones. The journey does not end at the consultation — it ends when you have your prescription and have been reimbursed. Modelling the *administrative aftermath* as part of the journey is correct for a healthcare system where reimbursement is the user's final unresolved question.

**Help-article scaffolding recurs on nearly every article** `[observed]`: `Ce qu'il faut savoir` [What you need to know] · `Prérequis` [Prerequisites] · `Pour aller plus loin...` [To go further] · platform tabs `Depuis l'application mobile` / `Depuis un site web` / `Sur votre ordinateur`. Success confirmations are always prefixed `✅`.

Stock openers: `Suivez ces étapes simples pour y parvenir !` [Follow these simple steps to do it!] and the collaborative `Découvrons ensemble…` / `Voyons ensemble…` / `Suivons ensemble…` [Let's discover/see/follow together]. See T14.

**Live defect** `[observed]`: the platform tab for the same surface is labelled five different ways across articles — `Depuis un site web`, `Sur un site web`, `Sur le site internet`, `Sur votre ordinateur`, `Depuis un ordinateur`.

## T5 Form & field labels

**Caveat stated plainly.** The live results page renders its filter bar client-side and returned an empty body. Everything in this section is `[documented]` — quoted in bold from Doctolib's own help articles describing that exact UI. No label here is inferred.

### The two search fields are unlabelled `[documented]`

Doctolib does not label either field. Help copy calls both `la barre de recherche` and distinguishes them only by what you type into them:

- "What/who": `Saisissez le nom du soignant ou établissement de santé de votre choix dans la barre de recherche` [Enter the name of the caregiver or health establishment of your choice in the search bar]; alternatively `Commencez par saisir la spécialité de votre choix` [Start by entering the speciality of your choice]
- "Where": `Saisissez la ville de votre choix dans la barre de recherche` [Enter the city of your choice], with the adjacent geolocation control `Autour de moi` [Around me]
- Submit: `Rechercher`

Two input modes are named in the help copy: `Une recherche directe via son nom` [a direct search by name] versus `Une recherche par mots-clés via la spécialité, la sous-spécialité ou les motifs de consultation recherchés` [a keyword search via the speciality, sub-speciality or consultation reasons sought].

The unlabelled-field pattern is identical to Zocdoc's `Search` problem (112): a single input accepting four semantic types, with the help centre doing the work the label does not.

### The filter set is exactly three `[documented]`

Article 360025469213 states it verbatim: `Vous pouvez filtrer votre recherche par : Disponibilités ; Secteurs de conventionnement ; Langues parlées.` [You can filter your search by: Availability; Coverage sectors; Languages spoken.]

**Filter 1 — `Disponibilités` [Availability]**, four options, verbatim:

- `Aujourd'hui` [Today] — glossed in the article as `pour trouver des soignants proposant des rendez-vous le jour-même` [to find caregivers offering same-day appointments]
- `Dans les 3 prochains jours` [In the next 3 days]
- `Dans les 7 prochains jours` [In the next 7 days]
- `Dans les 14 prochains jours` [In the next 14 days]

Not a date picker — four horizon buckets. The user is not asked *when* they want an appointment; they are asked *how long they can wait*. In a system where GP waits can run to weeks, that is the right question, and it inverts the usual booking-calendar metaphor.

**Filter 2 — `Secteur de conventionnement` [Fee/convention sector]**. Entry control `Sélectionner un secteur` → sub-sheet → `Enregistrer`. The individual option strings were **NOT FOUND** in the filter article. The sector vocabulary itself is published at profile level (see T13) but must not be assumed to be the filter labels.

This filter has no equivalent outside France. `Conventionnement` determines whether a practitioner charges the regulated tariff (`Secteur 1`), may charge above it (`Secteur 2`), or is outside the system entirely (`Non conventionné`) — and therefore how much of the fee the user gets back. It is the French analogue of Zocdoc's in-network filter, and Doctolib ships it as one of only three filters, which tells you how load-bearing cost-recovery is in this market.

**Filter 3 — `Langues parlées` [Languages spoken]**, multi-select. Instruction: `cochez la ou les langues que vous parlez` [tick the language(s) *you* speak]. Individual language options **NOT FOUND**.

Note the phrasing: the filter is about the language *the patient* speaks, not the language the practitioner offers. That framing puts the user at the centre of a matching problem rather than treating language as a practitioner attribute.

Apply action: `Afficher les résultats`.

### Filters that do NOT exist — recorded so nothing is over-claimed

`[absent]` as search filters: consultation type (cabinet/domicile/vidéo), `Carte Vitale`, `tiers payant`, accessibility / `accès handicapé`, new-patient status, `motif de consultation`, and **any sort control at all**.

That last one is significant. Doctolib exposes **no sort options**. Ordering is algorithmic, rotates hourly, and the user cannot change it (see T10). Compare Zocdoc, which at minimum exposes `sort_type` in its URL. Removing sort control is defensible here precisely *because* the ordering is rotated for fairness — but it means the user has no way to say "cheapest first" or "nearest first".

### Booking-funnel fields `[documented]`

`La spécialité` (if several) · `Le lieu de consultation` (if several, else `Je n'ai pas de préférence`) · `Le type de consultation` — with exactly two options, **`En vidéo`** [By video] and **`Au cabinet`** [At the practice] · `Sélectionnez le motif de consultation pour lequel vous prenez rendez-vous` · `Choisissez la date de consultation`.

There is no `À domicile` [home visit] option in the consultation-type list. Home visits are a separate request flow (`Envoyer une demande de visite à domicile`), not a bookable type.

### Practitioner-profile blocks `[documented]`

`Accessibilité` — with `Voir plus` to expand. The article describing it lists what appears: `place de parking PMR à proximité, accès sans marche (ou avec rampe), ascenseur, portes automatiques` [nearby disabled parking space, step-free access (or ramp), lift, automatic doors]. Framed as: `Ces informations vous permettent de savoir si le lieu de consultation est adapté à vos besoins, en particulier en cas de mobilité réduite.` [This information lets you know whether the consultation venue suits your needs, particularly in cases of reduced mobility.]

Concrete physical facts rather than a binary "accessible: yes/no" badge — the right call, because "accessible" means different things to a wheelchair user and someone who cannot manage stairs. The weakness is that it is a profile block you must open each result to read, not a filter.

`Horaires et coordonnées` [Opening hours and contact details]. The cancellation window is also disclosed at profile level (see T6).

### Support contact form — two separate consent checkboxes `[documented]`

Fields: `Pourquoi nous contactez-vous ?` (dropdown) · `Objet de votre demande` · `Prénom et NOM DE FAMILLE` (note the enforced caps convention on the surname — a French administrative norm) · `Adresse e-mail` · `Numéro de téléphone` · `Date de naissance` · `Nom du soignant` · `Spécialité du soignant` · `Date du rendez-vous` · `Heure du rendez-vous` · `Message`. Required-field note: `Les champs marqués d'une astérisque * sont obligatoires.`

The consent design is the artefact — **two checkboxes, not one**:

1. `Afin que Doctolib puisse répondre à ma demande d'aide, j'accepte que Doctolib traite ces informations.` [So that Doctolib can respond to my help request, I agree that Doctolib may process this information.]
2. `J'accepte que mes données de santé soient traitées dans le cadre de ma demande` [I agree that my health data may be processed as part of my request]

Ordinary personal data and **health data are consented to separately**. That is GDPR Article 9 done properly in UI rather than in a policy: special-category data gets its own explicit consent, granted separately, so a user can seek help without volunteering clinical information. The first checkbox also carries an inline link, `En savoir plus sur les droits et la confidentialité des données`.

## T6 Status & state language

### Appointment states `[documented]` unless noted

| State | French | Note |
|---|---|---|
| Confirmed | `confirmé` | Confirmation is explicitly the **patient's** act: `Lorsque vous prenez rendez-vous, c'est à vous de le confirmer.` [When you book, it's up to you to confirm it.] |
| Upcoming | `À venir` | Literal mobile tab label; desktop nav says `Rendez-vous à venir` |
| Past | `historique de mes rendez-vous` | Gated behind an opt-in: `vous devez dans un premier temps activer les Services personnalisés` |
| Cancelled | `annulé` | `Confirmer l'annulation`; `e-mail d'annulation` |
| Moved | `déplacé` | **Doctolib says `déplacer` [move], never `reporter` [postpone].** `reporté` is `[absent]` |
| Honoured / not | `honoré` / `n'a pas honoré` | Used in both directions — including `Mon soignant n'a pas honoré mon rendez-vous, que faire ?` |
| Missed (patient) | `Rendez-vous manqué` | The automated email subject, quoted verbatim: `Important - Rendez-vous manqué` |
| Locum | `remplaçant` | `Mon rendez-vous est assuré par un remplaçant` |

`[absent]`: `en attente` [pending] as an appointment status. `lapin` — the colloquial French for standing someone up — is not used; the help-article search tags instead carry `oubli de rdv`, `oublie de rendez-vous` [forgetting an appointment], which is a notably gentler framing of the same behaviour.

**`déplacer` over `reporter` is the sharpest lexical choice in the file.** `Reporter` means to postpone — it implies delay and carries a whiff of the user's fault. `Déplacer` means to move — spatially neutral, no implied direction, no implied blame. The appointment is an object being relocated, not a commitment being deferred. A user who needs an earlier slot is doing the same operation as a user who needs a later one, and only `déplacer` covers both without editorialising.

**`honoré` cuts both ways**, and that is the second-sharpest choice. The same verb governs the patient who did not attend and the practitioner who did not. There is a dedicated article titled `Mon soignant n'a pas honoré mon rendez-vous, que faire ?` [My caregiver did not honour my appointment, what should I do?]. Most booking platforms have a no-show concept that only points at the customer. Doctolib's points both ways, in the same word.

### The waiting list is an alert, not a queue `[documented]`

`liste d'attente` exists — `M'inscrire à la liste d'attente` / `Me désinscrire de la liste d'attente` — but the semantics are precise and the help centre is careful about them. It does **not** get you an appointment where none exists: `Elle ne permet pas d'obtenir un rendez-vous lorsqu'aucune disponibilité n'est proposée en ligne` [It doesn't get you an appointment when no availability is offered online]. And: `Puis-je m'inscrire à la liste d'attente si je n'ai pas encore de rendez-vous ?` → **No.** It only brings forward an appointment you already hold.

The in-product control reflects this and is worded as a question, not a feature name: **`Prendre rendez-vous plus tôt ?`** [Book earlier?] with a toggle.

Naming the control by the user's goal (`book earlier`) rather than by the mechanism (`waiting list`) prevents exactly the misunderstanding the FAQ has to correct. The mechanism name survives in the help IA; the goal name is what ships in the UI. That split is deliberate and worth copying.

Alert copy: `vous êtes prévenu par e-mail et via une notification push ou un SMS qu'un créneau s'est libéré` [you are notified… that a slot has freed up].

### Availability language `[documented]`

- `Prochaines disponibilités` [Next availabilities] — **plural and capitalised** on result cards. The singular is not used.
- `créneau` [slot] is the consistent unit noun: `le créneau redevient disponible`, `un créneau s'est libéré`.
- `Aujourd'hui` as a filter option. `demain` [tomorrow] is `[absent]`.
- No-availability phrasings, all attested but none a clean UI string: `La réservation n'est pas disponible` [Booking is not available] — quoted as a literal profile mention; `n'a pas de disponibilité en ligne` — used in prose. The exact strings `Aucune disponibilité en ligne` and `aucun résultat` are `[absent]`.

### The highest-value state string in this file `[documented]`

Quoted identically in the patient help centre and the practitioner help centre:

> `Ce soignant réserve la prise de rendez-vous en ligne aux patients déjà suivis`
> [This caregiver reserves online booking for existing patients]

The practitioner-side version renders with a full stop inside guillemets: `« Ce soignant réserve la prise de rendez-vous en ligne aux patients déjà suivis. »`

This is the restricted-booking badge, and it solves a hard problem elegantly. The practitioner is not refusing you; they are *reserving* for a group you are not in. `réserve` frames it as a positive allocation rather than an exclusion. `patients déjà suivis` [patients already being followed] describes an ongoing care relationship — the French clinical concept of *suivi* — rather than a transactional "existing customer". Neither the practitioner nor the patient is made to look bad by the string.

There is a companion help article, `Trouver un soignant qui accepte les nouveaux patients sur Doctolib`, so the negative state has a positive-path article attached to it.

### Motif confidentiality is a named state `[documented]`

> `Si vous avez pris rendez-vous chez votre soignant pour un motif utilisé en interne, votre rendez-vous s'affiche bien dans votre compte, mais le motif de consultation reste confidentiel et n'est pas visible de votre côté.`
> [If you booked for an internally-used reason, the appointment shows in your account but the consultation reason stays confidential and is not visible on your side.]

A deliberate information asymmetry, explained rather than hidden. A practice may book a patient under an internal clinical code the patient should not see on their own screen — for instance where the reason would be visible to a household member. Doctolib documents that the field will look empty and why, which converts a suspicious blank into an understood one.

## T7 Error, failure & recovery

**The dominant error-article grammar is first-person problem + `, que faire ?`** `[observed]` — [what should I do?]:

- `J'ai oublié mon mot de passe, que faire ?`
- `Je ne parviens pas à confirmer mon rendez-vous sur Doctolib, que faire ?`
- `Je n'arrive pas à accéder à un rendez-vous confirmé, que faire ?`
- `Je ne parviens pas à déplacer ou annuler mon rendez-vous avec l'Assistant téléphonique, que faire ?`
- `J'ai un problème de micro, son et/ou caméra, que faire ?`
- `Un message d'alerte apparaît et me dit que mon mot de passe a expiré, que faire ?`
- `Mon adresse e-mail ou mon numéro de téléphone est associé à un compte existant, que faire ?`
- `Je reçois des notifications pour des rendez-vous qui ne sont pas les miens ou ceux de mes proches, que faire ?`
- `J'ai reçu une demande de paiement, que faire ?`
- Variant ending in `, pourquoi ?`: `Ma consultation vidéo a été interrompue, pourquoi ?`

This is the direct French analogue of Wise's first-person confession titles (exemplar 041), with one structural improvement: the `, que faire ?` suffix **attaches the user's question to the user's statement in a single title**. Wise writes `I sent the wrong amount`; Doctolib writes the equivalent plus "what should I do?". The title therefore promises an action, not just a diagnosis. For a panicking user scanning a list, the suffix is the signal that this article will help rather than merely explain.

The `, pourquoi ?` variant is used where the answer is genuinely an explanation and no action is available — an honest distinction between the two suffixes.

**Live defects** `[observed]`: `parviens` and `arrive` are used interchangeably for identical failure semantics. Two published titles are missing the space before `?` that French typography requires: `…que faire?` and `Comment signaler un email de phishing?`.

**Recovery actions route to the phone, often** `[documented]`:

- Past the cancellation window: `Passé le délai d'annulation, contactez au plus vite votre cabinet par téléphone pour annuler le rendez-vous.`
- Cannot cancel online: `Si vous ne parvenez pas à annuler un rendez-vous en ligne, c'est que seule votre équipe soignante peut le faire. Appelez le cabinet…` [only your care team can do it. Call the practice.]
- Wrongly flagged as absent: `contactez l'établissement de santé par téléphone pour demander d'effacer l'absence.` [call the establishment to ask for the absence to be erased.]

Note the construction `c'est que…` [it's because…] — the error is explained as a *system rule*, not a failure. "You can't cancel online" becomes "the reason is that only your care team can do that", which reattributes the block from the user's competence to the practice's configuration.

**The phishing article is the most substantial error content on the site** `[observed]`, article 360016664299, titled `Je pense avoir été victime d'un acte de cyber malveillance, que faire ?` [I think I've been the victim of a cybercrime, what should I do?].

Its sub-headings are all user questions: `Comment vérifier qu'un message reçu provient bien de Doctolib ?` · `Que faire en cas de réception d'un message frauduleux ?` · `Que dois-je faire si j'ai fourni des informations accidentellement sur une fausse page ?` · `Être victime d'une cyber malveillance signifie-t-il que la base de données de Doctolib a été piratée ?` · `Qu'est-ce que le phishing ?`

Four things it does well:

1. **A concrete, checkable authenticity rule** rather than generic vigilance advice: `Les SMS Doctolib sont quant à eux toujours envoyés depuis l'émetteur réglementé "Doctolib" et jamais depuis un 06 xx xx xx xx.` [Doctolib SMS are always sent from the regulated sender "Doctolib" and never from an 06 number.] A French user can apply that test in one second.
2. **It names where the check does not work**: `certains fournisseurs de messagerie, comme Orange Mail ou Outlook ne proposent pas cette fonctionnalité` — naming specific providers whose UI lacks the authentication badge.
3. **It pre-empts the wrong inference, explicitly**: `Si vous recevez un mail ou SMS de phishing, cela ne signifie aucunement que Doctolib a été piraté.` [Receiving a phishing message in no way means Doctolib has been hacked.] Answering the question the user has not yet asked but is about to.
4. **It routes outward** to `cybermalveillance.gouv.fr`, the French state service, alongside its own `phishing@doctolib.com` reporting address.

One tell about register: Doctolib leads with the English `phishing` and glosses the French in scare quotes — `il s'agit peut-être d'une tentative de phishing (ou tentative "d'hameçonnage")`. The borrowed term is treated as the primary one because that is what users have actually encountered. The article title, however, uses the official French `cyber malveillance`. `[observed]` defect: the title spells it as two words, the body as one.

## T8 Empty states

Consumer empty-state strings live in the client bundle and were not observable. `[absent]` for exact strings.

What is attested `[documented]` / `[observed]`:

- `La réservation n'est pas disponible` [Booking is not available] — quoted as a literal profile mention
- `Ce soignant réserve la prise de rendez-vous en ligne aux patients déjà suivis` — the restricted-booking state on a result card (T6)
- `Je ne trouve pas mon rendez-vous, que faire ?` — an accordion heading treating "my data isn't there" as a supported question
- `Je ne vois pas l'encart "Prendre rendez-vous plus tôt", pourquoi ?` [I don't see the "Book earlier" panel, why?] — a **missing-UI** empty state, explained: APHP appointments and practice-booked appointments aren't eligible
- `Mon soignant n'a pas de disponibilité en ligne ou n'est pas sur Doctolib, que faire ?` — the no-availability state promoted to a homepage `Questions fréquentes` entry

That last one is the notable structural decision. The single most likely dead end in the product — *the doctor I want isn't bookable here* — is given a slot on the help-centre homepage, not buried. Doctolib treats "we cannot help you" as a first-class supported journey.

`Je ne vois pas l'encart…, pourquoi ?` is the rarer pattern: an article explaining why a *feature* is absent for you. Most products leave the user to conclude they are looking in the wrong place.

## T9 Notifications & system messages

**The full cadence is published** `[documented]`, article 360025317614:

Confirmation: `Dans les dix minutes suivant la confirmation de votre rendez-vous, vous recevez un e-mail de confirmation de rendez-vous.` [Within ten minutes of confirming, you receive a confirmation email.] Sent `au titulaire du compte Doctolib` [to the account holder].

Reminders:
- `Deux e-mails de rappel` — `Le premier e-mail est envoyé 7 jours avant la date de votre rendez-vous` ; `Le second e-mail est envoyé 24h avant`
- `Un premier SMS ou notification push est envoyée 24h ou 48h avant la date du rendez-vous`
- `Une notification push est envoyée 2h avant le rendez-vous.`

Three suppression and fallback rules, all published:

- `Si vous avez activé les notifications push, vous ne recevez pas de SMS` [push replaces SMS]
- `Si vous avez pris rendez-vous moins de 48h avant la date du rendez-vous, alors vous ne recevez pas de notifications de rappel` [no reminders for short-notice bookings]
- `Si vous cliquez sur Ignorer, vous recevrez, par défaut, des SMS de rappel sur une période de 30 jours.` [If you tap Skip, you'll get reminder SMS by default for 30 days.]

The third is the one to study. When a user declines the push-notification permission prompt, Doctolib tells them — **in the help centre, in advance** — what the consequence is: they will get SMS instead, for a bounded 30-day period. Most products either silently fall back or silently stop notifying. Publishing the fallback, with its duration, means a user can make an informed choice at a permission dialogue that offers no such explanation.

`[observed]` defect: `Un premier SMS ou notification push est **envoyée**` — feminine agreement with a masculine subject, in production.

**The OS permission prompt is quoted verbatim** `[documented]`: `"Autorisez-vous "Doctolib" à vous envoyer des notifications ?"` → `Autoriser`.

**Practitioner-cancellation notifications**: `Un e-mail à l'adresse renseignée sur votre compte Doctolib ; Un SMS ou une notification push.` Plus a re-schedule case: `Si votre soignant a annulé votre rendez-vous et l'a replanifié, alors vous recevrez une notification push vous informant de la nouvelle date.`

**No-show email subject, verbatim** `[documented]`: `Important - Rendez-vous manqué` [Important – Missed appointment]. Notably neutral — no "You missed", no accusation, no exclamation.

**Missing-notification checklist** `[documented]`: `Vérifiez vos Spams ou courriers indésirables` — with both the borrowed `Spams` and the official French `courriers indésirables`, because users' mail clients use one or the other.

**Notification article titles** `[observed]`, including a preference-management one framed positively: `Personnaliser mes notifications pour recevoir des conseils de prévention et suivre les nouveautés Doctolib` [Personalise my notifications to receive prevention advice and follow Doctolib news], and an opt-out one framed in the user's voice: `Je ne souhaite plus recevoir de notifications de rendez-vous, que faire ?`.

## T10 Disclosures, legal & compliance

Primary source: the published privacy-policy PDF, `Politique de protection des Données à caractère personnel / Patients / Version : Septembre 2024`. All `[observed]` in that document or the named help article.

### Section headings are questions, in the second person `[observed]`

`2. QUEL EST L'OBJECTIF DE LA POLITIQUE?` · `3. QUEL EST LE RÔLE DE DOCTOLIB SUR VOS [Données personnelles]` · `5. QUELLES SONT LES CONDITIONS RELATIVES À L'UTILISATION DE VOS DONNÉES PERSONNELLES ?` · `8. A QUI DOCTOLIB TRANSMET-ELLE VOS DONNÉES PERSONNELLES?` · `9. QUELS SONT VOS DROITS SUR VOS DONNÉES PERSONNELLES?` · `10. COMMENT DOCTOLIB PROTÈGE-T-ELLE VOS DONNÉES ?` · `11. ET CONCERNANT LES COOKIES?` · `12. QUI PEUT UTILISER DOCTOLIB? EST-CE QUE LES MINEURS PEUVENT UTILISER DOCTOLIB?` · `14. COMMENT CONTACTER DOCTOLIB POUR DES QUESTIONS LIÉES AU DONNÉES PERSONNELLES?` · `Annexe 1: Liste des Sous-traitants`

**Every heading is a question the user would ask, addressed to them as `vous`.** `ET CONCERNANT LES COOKIES?` [And what about cookies?] even opens with a conjunction, as if continuing a conversation. This is a privacy policy structured as an FAQ, which is the single most reusable structural decision in the document — a user scanning for "how long do you keep this" finds a question, not a noun phrase.

Even the processing table uses question-form column headers: `Sur quelle base légale les Données personnelles sont-elles traitées ?` and `Combien de temps les Données personnelles sont-elles conservées ?` [How long is personal data kept?]. The conventional noun phrase `durée de conservation` is **NOT FOUND** — Doctolib asks the question instead.

### RGPD and health data `[observed]`

> `Doctolib s'engage à respecter la réglementation française et européenne sur la protection des Données personnelles, en particulier le Règlement (UE) général sur la protection des données du 27 avril 2016 ("RGPD") et la Loi Informatique et Libertés du 6 janvier 1978 modifiée ("LIL").`
> [Doctolib undertakes to comply with French and European personal-data regulation, in particular the GDPR of 27 April 2016 and the amended French Data Protection Act of 6 January 1978.]

The defined term is `Données à caractère personnel` ("Données personnelles"), capitalised throughout. Health data is `Données de santé`, used as a defined category.

**`catégories particulières de données`** — the GDPR Article 9 phrase — is **NOT FOUND**. Doctolib does not use the regulation's own term for special-category data. It relies instead on `Données de santé` plus the `secret médical` framing, which are the terms a French patient recognises. That is a reasonable trade, and it is visible in the UI too: the support form's second consent checkbox says `mes données de santé`, not "special category data".

### HDS — `Hébergeur de Données de Santé` `[observed]`

**Two sources, and the difference between them matters.**

Privacy policy PDF, introduction:

> `Les données sont stockées en France (Paris) et en Allemagne (Francfort) chez un hébergeur agréé. Cet hébergeur est certifié par le label français "HDS" ("Hébergeur de Données de Santé") conformément à la loi et aux normes établies par l'ANS ("Agence du Numérique en Santé"), en concertation avec la CNIL ("Commission nationale de l'informatique et des libertés"), l'autorité française de protection des données.`
> [Data is stored in France (Paris) and Germany (Frankfurt) with an approved host. This host is certified with the French "HDS" ("Health Data Host") label in accordance with the law and standards set by the ANS, in consultation with the CNIL, the French data-protection authority.]

Help article 4404181466002, `Où sont stockées mes données personnelles ?`, names the host:

> `En France, AWS est certifié Hébergeur de Données de Santé (HDS), conformément aux exigences de l'Agence du Numérique en Santé et de la Commission nationale de l'informatique et des libertés (CNIL).`
> [In France, AWS is certified as a Health Data Host (HDS), in accordance with the requirements of the ANS and the CNIL.]

**Doctolib says the *host* is HDS-certified. It does not claim HDS certification for itself.** In the policy the host is anonymous (`un hébergeur agréé`); in the help centre it is `AWS (Amazon Web Services)`. The sub-processor annex confirms the split: `AWS EMEA — Maison mère : Etats-Unis / Entité contractante : Irlande — France - Allemagne — Hébergement` and, separately, `Atos France — France — Hébergement — Hébergement de la clé de chiffrement de Doctolib` [hosting of Doctolib's encryption key].

That architecture is then converted into a plain-language security claim `[observed]`, help article 4404181480594:

> `les clés principales sont hébergées chez ATOS, offrant une protection supplémentaire en garantissant que même notre hébergeur ne peut accéder à vos données`
> [the master keys are hosted at ATOS, providing additional protection by guaranteeing that **even our host cannot access your data**]

This is the key content move. Doctolib has a defensive problem — it stores French health data on infrastructure whose parent company is American — and it answers it not with reassurance but with an *architectural fact stated as a consequence for the user*: the keys live somewhere else, therefore the host cannot read your data. The user does not need to know what the CLOUD Act is for that sentence to work.

**No HDS certificate number and no certifying body is given.** Do not assert one.

### Encryption — read the hedge carefully `[observed]`

> `Nous investissons continuellement dans des technologies de sécurité innovantes comme le chiffrement de bout en bout ou le chiffrement côté serveur.`
> [We invest continuously in innovative security technologies such as **end-to-end encryption** or server-side encryption.]

`chiffrement de bout en bout` [end-to-end encryption] is present — but as something Doctolib **invests in**, not as a deployed guarantee. This must not be upgraded into a claim that Doctolib offers E2E encryption. Recorded here precisely because it is the kind of sentence that gets misquoted.

Firmer claims that *are* made `[observed]`: `nous utilisons le protocole TLS… Ce protocole se termine exclusivement sur des serveurs européens` [TLS terminates exclusively on European servers] · `Une authentification à 2 facteurs activée par défaut pour les comptes des patients et des soignants` [2FA on by default] · `Une gestion des accès basée sur les rôles` · `standards de l'Open Web Application Security Project (OWASP)` · `nos experts vérifient chaque nouvelle ligne de code avant sa mise en production, selon le principe des 4 yeux` [four-eyes principle] · `Une équipe de sécurité disponible 24h/24 et 7j/7` · Cloudflare named as the WAF · `Une équipe d'experts techniques et juridiques basée à Paris et Berlin`.

The four-eyes code-review claim is unusual to publish to patients. It works because it is a *process* fact they can picture, unlike a certification acronym.

### Data-subject rights `[observed]`

Section 9, `QUELS SONT VOS DROITS SUR VOS DONNÉES PERSONNELLES?`, sub-heading `1. Vos droits`. Each right is named with its GDPR article in brackets and then glossed in plain French:

- `Droit d'accès (article 15 RGPD)` — `vous pouvez à tout moment accéder aux informations personnelles vous concernant et détenues par Doctolib.`
- `Droit de rectification (article 16 RGPD), et droit d'effacement (article 17 du RGPD)` — **merged into one bullet**
- `Droit à la limitation du traitement (article 18 RGPD)` — with the four qualifying situations enumerated `(i)… (ii)…`
- `Droit à la portabilité des données (article 20 RGPD)` — `pour un usage personnel ou pour les transmettre à un tiers de votre choix`
- `Droit d'opposition (article 21 RGPD)`
- `Droit de définir le sort des Données à caractère personnel après votre mort et de choisir à qui Doctolib devra communiquer (ou non) vos Données à caractère personnel` [Right to determine the fate of your personal data after your death…]

The last has **no GDPR equivalent** — it is the French *directives post-mortem* right under the LIL. Its presence is a reminder that GDPR is a floor, not a ceiling, and that a pan-EU privacy policy that ships only the six GDPR rights is under-serving French users.

Pairing `(article 15 RGPD)` with a second-person gloss is the right pattern: the citation makes it auditable, the gloss makes it usable.

### How to exercise rights — the controller/processor split is load-bearing `[observed]`

Section `2. Comment exercer vos droits` splits by Doctolib's legal role:

- `2.1. Pour toutes les demandes concernant des Données personnelles pour lesquelles Doctolib agit en tant que Responsable de traitement :` → `Doctolib – DPO, 54 quai Charles Pasqua, 92300 Levallois-Perret ou par mail à contact.dataprivacy@doctolib.com.`
- `2.2. …pour lesquelles Doctolib agit en tant que Sous-traitant` → `Vous pouvez contacter votre Professionnel de santé qui agit comme Responsable de traitement.`

**For anything where Doctolib is only a processor, it routes you to the practitioner, not to itself.** Legally correct, and operationally honest — but it places a classification task on a patient who has no way to know which of their data sits in which bucket. This is the structural weak point of the whole privacy content set: the split is explained but not made navigable.

The help centre softens it usefully `[observed]`, article 9841213956892, by splitting on *capability* instead of legal role: `Dans certains cas, exercer vos droits de manière autonome ; Dans d'autres cas, exercer vos droits en effectuant une demande auprès de Doctolib.` [In some cases exercise your rights autonomously; in others by making a request to Doctolib.] And it says which is which: erasure is self-serve via account deletion (`En supprimant votre compte patient Doctolib, les données associées le seront aussi`), whereas **export is explicitly not** (`L'export de vos données personnelles ne peut pas se faire de manière autonome sur Doctolib`), arriving `par e-mail au format ZIP dans les meilleurs délais`.

Identity proof is required for the request route: `en veillant à joindre une copie de votre pièce d'identité`.

`[observed]` defect: the DPO email domain differs between sources — `contact.dataprivacy@doctolib.com` (policy PDF) versus `contact.dataprivacy@doctolib.fr` (help article).

**`délégué à la protection des données` spelled out is NOT FOUND** — Doctolib uses only the acronym `DPO`, and only inside a postal address line. No named individual, no dedicated DPO form.

### CNIL complaint route `[observed]`

> `Vous avez également le droit d'introduire une réclamation auprès d'une autorité de contrôle, et notamment de la CNIL (https://www.cnil.fr/fr/plaintes).`

With a direct deep link to the CNIL's complaints page, not its homepage. CNIL is expanded on first use and described as `l'autorité française de protection des données`.

### Retention — published, and partly out of Doctolib's hands `[observed]`

Policy values: `Pour les logs : 1 an à compter du dernier rendez-vous pris.` · `Pour l'adresse IP : 1 an à compter de son enregistrement.` · `Obligation légale — 5 ans à compter de la demande.` · `Pièce d'identité : conservée le temps nécessaire à la vérification d'identité.`

Notably, `Données de recherche (motif de consultation, sp…)` is listed in the data inventory — **the reason you searched for is logged as personal data**, and Doctolib says so.

The patient-facing retention article (4420080879250, `Visualiser le délai de suppression des données de mes rendez-vous`) is the better artefact `[observed]`:

- `Par défaut, le délai de suppression est fixé à 5 ans`
- `La durée de visibilité des données de vos rendez-vous peut varier de 1 an à 20 ans.` — and crucially, it `dépend du délai paramétré par vos soignants` [depends on the period set by your caregivers]
- Exactly what is deleted: `La date du rendez-vous est supprimée ; L'heure du rendez-vous est supprimée ; Le nom du patient pour qui le rendez-vous a été pris est supprimé.`
- What survives: `Les documents partagés à vos soignants ou par vos soignants restent accessibles…`
- **An in-product string quoted verbatim**: `"Les rendez-vous de cet établissement sont supprimés après 5 ans (ce rendez-vous sera supprimé le 12.03.30)."` [Appointments at this establishment are deleted after 5 years (this appointment will be deleted on 12.03.30).]

That last string is the strongest retention UX in the corpus so far. It states the policy, then **resolves it to a specific date for this specific record**. Abstract retention periods are unusable; "this one goes on 12 March 2030" is a fact the user can hold. The pattern — *rule, then the rule applied to the object in front of you* — transfers directly to data-deletion, dormancy and archival copy anywhere.

It also honestly surfaces that the period is **set by the practitioner, not by Doctolib**, and varies from 1 to 20 years. The user is told the platform is not the decision-maker.

### Commercial use — note the qualifier `[observed]`

Section 8 carries an all-caps banner line:

> `VOS DONNÉES PERSONNELLES NE SONT PAS TRANSMISES À DES ACTEURS COMMERCIAUX OU PUBLICITAIRES SANS CONSENTEMENT`
> [YOUR PERSONAL DATA IS NOT PASSED TO COMMERCIAL OR ADVERTISING ACTORS WITHOUT CONSENT]

`SANS CONSENTEMENT` [without consent] is the qualifier that turns an apparent prohibition into a conditional one. The all-caps treatment reads as an absolute promise; the final two words are not. A companion help article exists — `Est-ce que Doctolib utilise mes données à des fins commerciales ?` — but the banner itself is a small piece of typographic overclaiming worth recording as a negative example.

### Medical secrecy `[observed]`

Once, prominently, in the policy introduction: `…dans le strict respect du secret médical.` [in strict compliance with medical confidentiality.]

And enforced in the UI `[documented]`: when cancelling, the free-text box carries the guardrail `Veillez à ne pas : Saisir des données sensibles sur votre santé` [Take care not to: enter sensitive health data]. The cancellation note is explicitly **not** a clinical channel, and the user is told so at the point of typing rather than after.

The full guardrail list is three items: `Saisir des données sensibles sur votre santé ; Inscrire des propos insultants et diffamatoires ; Demander une mise en contact urgente avec votre soignant.` [enter sensitive health data; write insulting or defamatory remarks; **request urgent contact with your caregiver**.] The third is the one that matters most — it tells a user who is deteriorating that this box will not reach anyone in time.

### Cancellation and no-show — the consequence is restriction, not a fee `[documented]`

Norm framing is **social**, not contractual:

> `Par respect pour votre soignant, si vous ne pouvez pas honorer votre rendez-vous, annulez-le ou déplacez-le au plus vite pour permettre à un autre patient de réserver le créneau libéré.`
> [Out of respect for your caregiver, if you can't honour your appointment, cancel or move it as soon as possible so another patient can book the freed slot.]

Both beneficiaries are named — the caregiver (`par respect`) and the next patient (`permettre à un autre patient`). Compare Zocdoc, which names only other patients, and Peloton, which names nobody.

Window: `Les délais d'annulation sont fixés par le soignant, ils peuvent varier de 30 minutes à 16 heures avant le rendez-vous.` — set by the practitioner, disclosed on the profile, ranging across a 32× spread. Doctolib publishes the range rather than pretending there is a platform rule.

Reason capture is framed as transparency, not enforcement: `Par transparence pour votre soignant, sélectionnez la raison de votre annulation, puis saisissez votre message si vous le souhaitez` [For transparency towards your caregiver…].

**The consequence:**

> `Lorsque vous ne vous présentez pas à un rendez-vous sans prévenir en amont ou que vous l'annulez à la dernière minute à plusieurs reprises, votre soignant a la possibilité de vous empêcher de prendre rendez-vous avec lui`
> [When you repeatedly fail to attend without notice, or cancel at the last minute, your caregiver has the option of preventing you from booking with them.]

**A cancellation or no-show FEE is NOT FOUND anywhere.** The only disclosed consequence is practitioner-side booking restriction, and it is the practitioner's decision, not Doctolib's.

But here is the content failure: **there is no notification that you have been blocked.** The help centre tells the user to infer it from a failed confirmation:

> `Si vous pouvez confirmer votre rendez-vous, c'est que votre soignant ne vous empêche pas de prendre rendez-vous avec lui ; Si vous ne pouvez pas confirmer votre rendez-vous, c'est que votre soignant vous empêche de prendre rendez-vous avec lui.`

A sanction detectable only by attempting the action and failing, with no explanatory state, is the weakest piece of content design in this file. Compare Zocdoc's locked-account article, which names the cause and offers `we'll figure this out together`. Doctolib names the cause in a help article the blocked user has no reason to visit.

Recovery for a wrongly recorded absence exists but is off-platform: `contactez l'établissement de santé par téléphone pour demander d'effacer l'absence.`

### Search-ranking transparency `[observed]`

The footer link `Règles de référencement` points to `doctolib.legal`, which returned an empty body. The same logic is published in the **practitioner** help centre, which was readable in full, and is attributed there.

- **Anti-favouritism rotation**: `Pour garantir une recherche équitable, l'ordre des praticiens change automatiquement toutes les heures.` [To guarantee a fair search, the order of practitioners changes automatically every hour.]
- **Availability privileged**: `L'affichage des profils avec des disponibilités est privilégié… Les praticiens sans créneaux disponibles apparaissent en fin de liste`
- **Three result groups**, in order: `Premier groupe : les praticiens situés dans la ville recherchée` → `Deuxième groupe : la recherche est élargie à un rayon de 30 kilomètres` (distance-sorted) → `Troisième groupe : les praticiens présents dans l'annuaire de la ville recherchée`, and within that third group `leur affichage se fait aléatoirement` [displayed randomly].
- **Which slot is shown**: `l'algorithme affiche uniquement les disponibilités associées à un seul motif de consultation`, selected by three fallback methods in order — most-booked-by-new-patients over four months; a standard motif keyed to the search term (worked example: `pour la recherche « médecin généraliste », le motif de consultation standard sera « Première consultation de médecine générale »`); else the first motif of the first category.
- **Index freshness**: `ces dernières seront visibles dans la recherche dès le lendemain, après la mise à jour nocturne.`
- **Cross-speciality substitution**, published as a table: `Médecin généraliste` → `Pharmacies avec téléconsultation` · `Pédiatre` → `Médecins généralistes spécialisés en pédiatrie` · `Ophtalmologue` → `Orthoptistes, Opticiens avec téléconsultation` · `ORL` → `Audioprothésistes avec téléconsultation`.

**Hourly rotation is the standout.** Doctolib has engineered *deliberate instability* into its ordering so that no practitioner can hold a top slot, and it publishes the fact as a fairness guarantee. It also explains why there is no sort control: a user-controlled sort would defeat the rotation. This is a rare case of a product publishing an anti-optimisation measure.

**No paid placement is mentioned anywhere.** Whether the legal page discloses a paid-ranking prohibition is `[absent]` — the page was unreadable.

The consumer-facing counterpart is far weaker `[documented]`: `Les créneaux disponibles sont automatiquement mis en avant grâce à notre système intelligent qui sélectionne le motif de consultation le plus adapté à votre besoin.` [Available slots are automatically highlighted thanks to our intelligent system…]. `notre système intelligent` is the only gesture at the algorithm a patient gets. **The detailed transparency is written for practitioners; patients get a marketing phrase.** That asymmetry is the finding — the audience with a commercial interest in the ranking is told how it works; the audience whose care depends on it is told it is intelligent.

## T11 Help-centre architecture

```
Centre d'aide Doctolib
├── Mon compte Doctolib
│   ├── Créer et accéder à mon compte
│   ├── Comprendre comment fonctionne Doctolib
│   └── Gérer mes paramètres et mes préférences
├── Mes rendez-vous
│   ├── Trouver et prendre un rendez-vous
│   ├── Préparer mon rendez-vous
│   ├── Modifier ou annuler un rendez-vous
│   ├── Gérer mes rendez-vous de consultation vidéo
│   ├── Gérer mes démarches après mon rendez-vous
│   └── Comprendre les notifications reçues
├── Mes données de santé
│   ├── Gérer mes documents
│   ├── Configurer et utiliser Santé
│   └── Communiquer avec mes soignants
├── Mes proches
│   ├── Ajouter et gérer mes proches
│   └── Gérer les rendez-vous de mes proches
├── Sécurité et confidentialité
│   ├── Gérer mes données personnelles
│   ├── M'assurer de la sécurité de mon compte
│   ├── Connaître les soignants sur Doctolib
│   └── M'informer sur le contenu sur Doctolib
└── Doctolib Parents
```

**`Mes rendez-vous` is sequenced as a journey, not an alphabet**: find → prepare → modify/cancel → video → after → notifications. The section order follows the appointment's own lifecycle, including the aftermath (`Gérer mes démarches après mon rendez-vous` — manage my formalities after my appointment). Most booking help centres stop at "manage your booking".

**`Connaître les soignants sur Doctolib` is the most interesting section in the tree.** Its scope line: `S'informer sur les pratiques de soins non conventionnelles proposées par certains soignants.` [Learn about non-conventional care practices offered by some caregivers.] Fifteen articles, including:

`Qui peut dispenser des soins en France ?` [Who may provide care in France?] · `Comment vérifions-nous l'identité et le droit d'exercer des soignants ?` [How do we verify caregivers' identity and right to practise?] · `Quelles sont les différences entre la médecine conventionnelle et les pratiques non conventionnelles ?` · `Pourquoi puis-je trouver des soignants proposant des pratiques de soins non conventionnelles sur Doctolib ?` · `Comment la profession d'ostéopathe est-elle encadrée ?` (and the same for psychothérapeute, ergothérapeute, masseur-kinésithérapeute, chiropracteur) · **`M'informer sur les dérives sectaires en santé`** [Informing myself about cult-like abuses in healthcare]

This is a platform writing patient-safety education about the risks of its own supply side. `Pourquoi puis-je trouver des soignants proposant des pratiques de soins non conventionnelles sur Doctolib ?` asks the hostile question on Doctolib's behalf — why are these people on your platform? — and answers it. `dérives sectaires` is a hard, non-euphemistic French term for cult exploitation, and publishing an article under it, in the help centre, is a serious editorial commitment.

Five per-profession regulatory explainers (`Comment la profession de X est-elle encadrée ?`) give the user the means to judge for themselves what an osteopath or psychotherapist is legally permitted to do. That is the structural answer to the problem: rather than removing ambiguous practitioners or vouching for them, Doctolib arms the patient with the regulatory frame.

**Article-title grammar — six patterns, all first-person** `[observed]`:

| Pattern | Examples |
|---|---|
| Bare infinitive task | `Prendre rendez-vous sur Doctolib` · `Annuler mon rendez-vous` · `Supprimer mon compte Doctolib` |
| Reflexive infinitive, elided pronoun | `M'inscrire à la liste d'attente` · `M'informer sur la téléconsultation` · `M'assurer de la sécurité de mon compte` |
| Problem + `, que faire ?` | see T7 |
| Direct question | `Où sont stockées mes données personnelles ?` · `Qui peut dispenser des soins en France ?` |
| `Comprendre …` | `Comprendre les notifications de confirmation et de rappel` · `Comprendre et exercer mes droits au sujet de mes données personnelles` |
| Paired toggles | `Activer ou désactiver les paiements…` · `Afficher ou masquer l'historique de mes rendez-vous` |

The `Activer ou désactiver` / `Afficher ou masquer` pairing is a small, good habit: one article covers both directions of a reversible setting, so a user looking to undo something finds the same article as the user looking to do it.

**Migration evidence in the URLs** `[observed]`: legacy slugs still say *praticien* while rendered titles say *soignant* — `.../360025315234-Comment-chercher-un-praticien-sur-Doctolib` resolves to an article titled `Je souhaite prendre un rendez-vous, comment chercher un soignant sur Doctolib ?`. Doctolib actively renamed *praticien* → *soignant* on the consumer side and the old slugs are the fossil record. See T13.

**Live defect** `[observed]`: one article ships untranslated in the French help centre — `Choose the language and location of my Doctolib account`.

## T12 FAQs

FAQs appear in two places: a `Questions fréquentes` block on the help-centre homepage (six entries), and accordion blocks inside articles. All `[observed]` as headings; answers summarised.

**Homepage `Questions fréquentes`** — the six questions Doctolib judges most urgent:

`J'ai oublié mon mot de passe, que faire ?` · `M'informer sur l'Assistant téléphonique` · `Mon soignant n'a pas de disponibilité en ligne ou n'est pas sur Doctolib, que faire ?` · `Préparer mon prochain rendez-vous avec mon soignant` · `Je pense avoir été victime d'un acte de cyber malveillance, que faire ?` · `Découvrir Doctolib Parents…`

Two of six are failure states, one is a fraud state. Putting phishing on the help-centre front page is a judgement that impersonation is a top-six patient problem — which, for a brand whose SMS carry appointment details, it is.

**Selected in-article FAQs, verbatim:**

| Question | Gloss | Answer (one line) |
|---|---|---|
| `J'ai reçu un e-mail m'indiquant avoir manqué mon rendez-vous, pourquoi ?` | Why did I get a missed-appointment email? | Either you didn't attend without warning, or you cancelled too late |
| `Puis-je de nouveau réserver un rendez-vous si je ne me suis pas présenté au rendez-vous/si j'ai annulé à la dernière minute ?` | Can I book again after a no-show or last-minute cancellation? | Possibly not — repeat offenders can be blocked, detectable only by a failed confirm |
| `Il s'agit d'une erreur, que faire ?` | It's a mistake, what do I do? | Phone the establishment to have the absence erased |
| `Je ne peux pas annuler mon rendez-vous, que faire ?` | I can't cancel my appointment | Only the care team can; phone the practice |
| `Je ne trouve pas mon rendez-vous, que faire ?` | I can't find my appointment | It was never confirmed; redo the booking to the confirmation page |
| `Puis-je m'inscrire à la liste d'attente si je n'ai pas encore de rendez-vous ?` | Can I join the waiting list without an appointment? | No — it only brings an existing appointment forward |
| `La consultation vidéo est-elle adaptée à toutes les situations ?` | Is video consultation suitable for every situation? | No — some cases require physical examination |
| `Les documents partagés dans le rendez-vous vont-ils disparaître en même temps que mes données de rendez-vous ?` | Will shared documents disappear with my appointment data? | No — documents remain in Documents |
| `La page profil de mon soignant a changé d'apparence, est-ce normal ?` | Has my caregiver's profile changed appearance, is that normal? | Yes — a redesign is rolling out, booking steps unchanged |

Three observations. **`La consultation vidéo est-elle adaptée à toutes les situations ?` answered "no"** is a product de-selling its own feature on clinical grounds, in its own FAQ. **`La page profil… est-ce normal ?`** is a release-note written as reassurance — the user's real question when an interface changes is "is something wrong", and the answer leads with `Yes` and then says booking is unchanged. And `Il s'agit d'une erreur, que faire ?` is a four-word heading that presumes the user's innocence.

**The yes/no answer formula is distinctive** `[observed]`: answers open **`La réponse est oui.`** / **`La réponse est non.`** [The answer is yes / The answer is no.] A full declarative sentence before any explanation. It guarantees the answer is in the first line, which is the one thing a scanning user reads.

## T13 Terminology & glossary

### `soignant` over `médecin` and over `praticien` — the central lexical decision

| Surface | Term | Evidence |
|---|---|---|
| Patient help centre | `soignant` | `mon soignant`, `chercher un soignant`, `Quels sont les soignants accessibles sur Doctolib ?`, `Connaître les soignants sur Doctolib` |
| Practitioner help centre | `praticien` | `le référencement des praticiens`, `l'ordre des praticiens change` |
| Legal / administrative | `médecin` | `médecin généraliste`, `médecin traitant`, `Ordre National des Médecins` |
| Formal register | `professionnel de santé` | `Professionnel de santé qui agit comme Responsable de traitement` |

`Soignant` is a participle-turned-noun meaning *one who cares for*. It is broader than `médecin` (doctor), warmer than `praticien` (practitioner), and less bureaucratic than `professionnel de santé`. It covers nurses, midwives, physiotherapists, psychologists and osteopaths without ranking them, which matters for a platform whose supply includes all of those.

**The word choice is directional and recent** — the URL slugs prove Doctolib migrated *away from* `praticien` on the consumer side while keeping it professional-side. The audience split is deliberate: practitioners are addressed as practitioners; patients are told about people who care for them.

`établissement de santé` is always paired with it: `le soignant ou établissement de santé` — person or institution, never assuming which.

### `consultation vidéo` over `téléconsultation` — a division of labour

- `consultation vidéo` is the **product/UI** term: section `Gérer mes rendez-vous de consultation vidéo`, funnel option `En vidéo`, 11 of 13 article titles in that section.
- `téléconsultation` is the **regulatory/context** term: `M'informer sur la téléconsultation`, and the only verb form, `Téléconsultez pour accéder à votre professionnel de santé plus rapidement`.

The plain compound describes what the user will do (a consultation, by video); the technical term carries the reimbursement and regulatory baggage. One article mixes them — `Déplacer mon rendez-vous de téléconsultation à une autre date` — which is the seam showing.

### French healthcare-finance vocabulary, published in full `[documented]`

`Secteur 1` · `Secteur 2 sans OPTAM` · `Secteur 2 avec OPTAM et OPTAM-ACO` · `Conventionné (dentiste)` · `Conventionné (auxiliaire médical)` · `Conventionné (sages-femmes)` · `Non conventionné`

Supporting glossary: `dépassements d'honoraires` [fee overruns] · `tarifs de base` · `tarifs libres` [free pricing] · `parcours de soins (coordonnés)` [coordinated care pathway] · `médecin traitant` [registered GP] · `participation forfaitaire` · `mutuelle` / `complémentaire santé` · `feuille de soins` · `télétransmission` · `OPTAM` (glossed as having replaced `CAS (Contrat d'Accès aux Soins)` on 1 Jan 2017).

The article carrying this is titled `Conventionnement et remboursement : comment bien choisir son professionnel de santé ?` — a cost-literacy explainer framed as a choosing question. It is Doctolib's direct equivalent of Zocdoc's in-network education problem (112), and it is solved the same way: teach the vocabulary at the point where the user must act on it.

`Carte Vitale` (capital C and V) with states `Carte Vitale acceptée` / `Carte Vitale non acceptée`, plus the coinage `Appli carte Vitale (ApCv)` and `carte Vitale dématérialisée` — note the lower-case `c` in those two, an inconsistency.

`tiers payant` [third-party payment] in two published variants: `Tiers payant partie Sécurité sociale` and `Tiers payant partie Sécurité sociale et mutuelle`.

### Other coinages `[observed]`

| Term | Gloss / note |
|---|---|
| `Assistant téléphonique` | Own-branded phone-booking feature, capital A, 4 dedicated articles |
| `Doctolib Parents` | Named sub-product, 0–4 years |
| `Santé` | Capitalised as the health-records space (`votre espace Santé`), distinct from `santé` the common noun |
| `Services personnalisés` | The opt-in gating past-appointment history |
| `motif de consultation` | The core booking primitive — also a ranking input and a privacy-sensitive logged field |
| `créneau` | Slot |
| `proches` | Relatives / loved ones — warmer than "dependants" |
| `remplaçant` | Locum |
| `pratiques de soins non conventionnelles` | The neutral term for alternative medicine |
| `dérives sectaires en santé` | Its hard-edged companion — cult-like abuses in healthcare |
| `Responsable de traitement` / `Sous-traitant` | Controller / Processor, capitalised defined terms |

**`Doctolib Pro` is NOT FOUND.** The practitioner surface is `pro.doctolib.fr` and the help centre calls the product simply `Doctolib`; the paywall notice reads `Le contenu de cet article s'applique uniquement aux versions payantes.` Do not assert a "Doctolib Pro" brand.

## T14 Voice, tone & accessibility

### Register: vouvoiement throughout, no exceptions found

Evidence `[observed]`: `Vous pouvez filtrer votre recherche par :` · `Avez-vous trouvé cet article utile ?` · `Vous n'avez pas trouvé votre réponse?` · `vous pouvez à tout moment accéder aux informations personnelles vous concernant`. All imperatives take `-ez`: `Saisissez`, `Cliquez`, `Cochez`, `Vérifiez`, `Consultez`.

**No tutoiement instance was found anywhere**, including in Doctolib Parents, which addresses parents of under-fours and is the most obvious candidate for informality. For a health product this is the correct and unsurprising choice; recording it matters because the absence of exceptions is itself the finding — there is no register gradient by topic.

### Person: a three-way alternation

1. **Article titles are first-person singular, in the user's voice**: `mon`, `mes`, `je`, `m'` — `Annuler mon rendez-vous`, `M'inscrire à la liste d'attente`, `J'ai oublié mon mot de passe`. The IA is written as the user talking.
2. **Body copy switches to `vous`** to address that same user.
3. **Doctolib speaks as `nous`, and repeatedly as `nous… ensemble`**: `Découvrons ensemble quels sont vos droits au sujet de vos données personnelles et comment les exercer !` · `Vous souhaitez supprimer votre compte Doctolib ? Voyons ensemble comment y parvenir !` · `Suivons ensemble les étapes` · `ajoutons ensemble le rendez-vous à votre agenda`.

**The `ensemble` construction is the strongest tonal signature in this file.** The first-person-plural imperative — *let's see together how to do this* — positions Doctolib as accompanying the user through the task rather than instructing them. Note the second example: it is used for **account deletion**, the one action where a company has every commercial incentive to be unhelpful. `Voyons ensemble comment y parvenir !` on a delete-my-account article is a genuine tonal commitment.

The same voice carries into policy: `Chez nous, la protection de vos données personnelles est une priorité.` · `Nous investissons continuellement…` · `Nous avons conscience qu'il subsiste des défauts d'accessibilité…`

**Known inconsistency** `[observed]`: `Comment réagir en cas de doute sur la sécurité de votre compte ?` uses `votre` where house style gives `mon` — the one title that breaks the first-person IA rule.

### Tone markers `[observed]`

- Exclamation marks used freely in help copy: `Suivez ces étapes simples pour y parvenir !` · `Consultez cet article !`
- `✅` as the success glyph on every completed procedure
- Formulaic emphatic answers: `La réponse est oui.` / `La réponse est non.`
- Reassurance formulae built on `en toute…`: `en toute sérénité` [in complete peace of mind] · `en toute confiance` · `en toute sécurité`
- Obligation framed as courtesy: `Par respect pour votre soignant…` · `Par transparence pour votre soignant…`
- SLA hedge, used repeatedly instead of a committed time: `dans les meilleurs délais` [as soon as possible]

The `Par respect / Par transparence pour votre soignant` construction is worth isolating. Both introduce a request that is really a platform requirement (cancel promptly; give a reason), but they attribute the requirement to a relationship the user values rather than to the platform's operational need. It is more effective than "please" and more honest than pretending the field is optional.

### Accessibility — a statement that admits it is failing

`[observed]`, article `Nos initiatives en matière d'accessibilité` [Our accessibility initiatives], structured as `Notre engagement` / `Notre objectif` / `Notre approche` / `Nos réalisations` / `Nous contacter`.

- Commitment: `nous nous engageons à améliorer l'accessibilité de nos services pour les patients en situation de handicap et à communiquer en continu sur nos avancées.` [we commit to improving accessibility for patients with disabilities and to communicating continuously on our progress]
- Standards named: `les normes européennes EN 301 549 et les règles internationales du WCAG 2.1 AA`, with the deadline `d'ici au 28 juin 2025`, tied to `l'Acte législatif européen sur l'accessibilité` [European Accessibility Act]
- Assistive technologies named specifically: `quelle que soit la solution d'assistance (lecteur d'écran, plage braille, loupe numérique etc.)` [screen reader, braille display, digital magnifier]
- External auditor named: `notre partenaire Temesis, spécialisé dans l'accessibilité numérique`
- **The candid admission**: `Nous avons conscience qu'il subsiste des défauts d'accessibilité sur notre site internet, mais nous travaillons sans relâche pour les corriger.` [We are aware that accessibility defects remain on our website, but we work tirelessly to correct them.]

**This is the best accessibility statement in the corpus so far** on one specific count: it admits current non-conformance in plain language. Compare Peloton (111), which cites WCAG 2.1 AA as a "guide to rebuild" without a conformance claim, and Zocdoc (112), which "strives to maintain" conformance. Doctolib names a standard, names a legal deadline, names an external auditor, and says the site does not yet meet it. `il subsiste des défauts` [defects remain] is the sentence the other two avoid.

It also names a **regulatory forcing function** (the European Accessibility Act) and a date, which converts a commitment into a testable claim.

**Two failures against it, both `[observed]`:**

1. **Stale content.** The article is dated `Dernière modification le 25 juin 2026` yet the body still says `Au 29/08/2023, nous sommes en train de mettre à jour nos lignes directrices…` and projects the June-2025 deadline in the future tense. A statement whose whole credibility rests on `communiquer en continu sur nos avancées` has not been updated in three years.

2. **Alt text contradicts the statement.** The help centre is full of icon-token leakage rather than authored alt: `Name=calendar-day.png`, `Name=chevron-right.png`, `icon=user gear.png`, `icon=toggle on.jpg`. Raw filenames: `Email authentique.png`, `Capture d'écran 2025-03-21 124630.png`, and a bare GUID `969f01d5-7dc5-4b19-bd74-e56a798485e6`. Many images carry empty alt entirely, including the category hero on every category page. Good alt exists only in the marketing footer (`Télécharger dans l'App Store`, `Disponible sur Google Play`).

**Net: the accessibility statement is the strongest in the corpus and the accessibility execution is the weakest.** That gap is itself the most useful benchmark finding here — a well-written commitment does not survive contact with a third-party help-centre CMS whose image workflow nobody owns.

Separately, venue accessibility is a product feature: `Consulter les informations d'accessibilité d'un cabinet sur le profil d'un soignant`, framed `en particulier en cas de mobilité réduite`.

### Locale architecture — visible in the seams

`[absent]` as a UI control: no DE/IT/EN switcher was rendered in any fetched page.

Indirect evidence `[observed]`:

- The unsubstituted template token `https://doctolib.{country_code}/` in two live help-centre links — a broken locale interpolation in production HTML.
- **Every article carries German search keywords alongside French ones**: `Termin stornieren`, `absagen`, `Termin löschen`, `Warteliste`, `Bestätigungsmail`, `Datenschutz`, `persönliche Daten`, `Konto löschen`, `Suchergebnisse filtern`, `Nach einem Arzt suchen`, `Bestandspatient`, `Keine Termine zur Verfügung`, `Vergangene Termine`. Plus locale tags `no-contact-fr` / `no-contact-de`. **The FR and DE help centres share one article corpus.** No Italian tags appeared in anything fetched.
- One article ships untranslated in English — `Choose the language and location of my Doctolib account` — whose existence confirms an in-product language/location setting that could not be reached.
- Platform tags `platform_desktop` / `platform_mobile` on every article confirm the two-surface content model driving the `Depuis l'application mobile` / `Depuis un site web` tab pattern.

The German keyword list is a useful artefact in itself: `Bestandspatient` [existing patient] is the German equivalent of the `patients déjà suivis` state, and `Keine Termine zur Verfügung` [no appointments available] is the German empty state whose French equivalent could not be found.

Data residency (France + Germany) matches the FR/DE-primary footprint.

---

## Transferable patterns

1. **Write the privacy policy as questions in the second person.** Every section heading in Doctolib's policy is a question the user would ask (`COMMENT DOCTOLIB PROTÈGE-T-ELLE VOS DONNÉES ?`), including the table column headers (`Combien de temps les Données personnelles sont-elles conservées ?` instead of the noun phrase `durée de conservation`). A user scanning for an answer finds a question, not a legal category. Directly transferable to any policy, terms or disclosure document.
2. **Resolve an abstract retention rule to a concrete date for this record.** `"Les rendez-vous de cet établissement sont supprimés après 5 ans (ce rendez-vous sera supprimé le 12.03.30)."` — rule, then rule-applied-to-the-object-in-front-of-you. Applies to data deletion, dormancy, statement archives, card expiry, and anywhere a policy period needs to become actionable.
3. **Split consent for special-category data into its own checkbox.** The support form asks separately for permission to process personal data and to process health data. GDPR Article 9 done in UI rather than in a policy, and it lets a user get help without volunteering clinical detail.
4. **Answer the architectural objection with a consequence, not a reassurance.** `les clés principales sont hébergées chez ATOS… garantissant que même notre hébergeur ne peut accéder à vos données` — the user does not need to know what the CLOUD Act is for that sentence to work. Applies wherever the trust question is about who *could* access data, not who *should*.
5. **Name the control by the user's goal, keep the mechanism name in help.** The waiting list ships as `Prendre rendez-vous plus tôt ?` [Book earlier?]. The mechanism name survives in the IA; the goal name is what the user sees, and it pre-empts the misunderstanding the FAQ otherwise has to correct.
6. **Choose the blame-neutral verb.** `déplacer` [move] over `reporter` [postpone] for rescheduling; `honoré` applied to both patient and practitioner; `skipped` rather than "missed". Where a state can be reached by fault or by circumstance, pick the word that does not decide which.
7. **Frame a restriction as a reservation for someone else.** `Ce soignant réserve la prise de rendez-vous en ligne aux patients déjà suivis` — nobody is refused, a group is served. Applies to eligibility gates, waitlists, beta access and tiered features.
8. **Attribute a platform requirement to a relationship the user values.** `Par respect pour votre soignant…` and `Par transparence pour votre soignant…` are more persuasive than "please" and more honest than making the field optional.
9. **Use the first-person-plural imperative on the hardest task.** `Voyons ensemble comment y parvenir !` on the *delete my account* article. If the collaborative voice survives the churn flow, it is real.
10. **Admit current non-conformance in the accessibility statement.** `il subsiste des défauts d'accessibilité` plus a named standard, a named legal deadline and a named auditor. Stronger than any "strives to" formulation — but only if the statement is kept current, which Doctolib's is not.
11. **Negative pattern: a sanction with no state.** A user blocked by a practitioner learns it by attempting to confirm and failing. Never ship a restriction whose only signal is a failed action.
12. **Negative pattern: transparency written for the wrong audience.** The full ranking algorithm is published for practitioners; patients get `notre système intelligent`. If you disclose an algorithm, disclose it to the people it affects.

## Caveats & gaps

- **The entire consumer site body is client-rendered and was not retrievable.** `doctolib.fr` home, specialty results, `/sante/`, `/medecin-generaliste`, and the video-consultation page returned footer and meta only. Hero headlines, value-prop copy, result cards, filter chrome and all empty states are `[absent]` as observed strings.
- **All six `doctolib.legal` pages returned empty bodies**, including the official `Règles de référencement`. The ranking criteria in T10 come from the *practitioner* help centre and are attributed there, not to the legal page. Whether the legal page discloses a paid-placement prohibition is unknown.
- **The privacy policy was recovered as a PDF**, `Version : Septembre 2024`, found linked from a help article. It may not be the currently-served version at `doctolib.legal/privacy-policy-B2C-FR`, which was unreadable. Two policy section numbers (1 and 4) did not surface in extraction — treat the heading list as near-complete, not complete.
- **Filter labels are `[documented]`, never observed.** The three filter names and the four availability options come from one help article that quotes them in bold. Individual `Secteur` option strings and individual language options were not found and must not be assumed.
- **HDS: the claim is about the host, not about Doctolib.** No certificate number, no certifying body. Do not upgrade this.
- **`chiffrement de bout en bout` is framed as something Doctolib invests in, not as a deployed guarantee.** Do not cite Doctolib as offering end-to-end encryption.
- **No cancellation or no-show fee was found.** The only disclosed consequence is practitioner-side booking restriction. Do not assert a charge.
- **Locale: fr-FR only.** German-market evidence is indirect (shared help corpus, German keyword tags). No Italian evidence at all. No language switcher observed. Any DE or IT claim needs a separate geolocated pass.
- **The practitioner surface (`pro.doctolib.fr`, `info.doctolib.fr`) was harvested only for the ranking article.** The practitioner-side vocabulary and the practice-software product copy are otherwise unexplored.
- **All in-product strings are `[documented]`** — quoted inside help articles describing the UI. The one exception is the retention string, which the help article quotes verbatim in quotation marks.

## Sources

1. https://www.doctolib.fr/ — footer only
2. https://www.doctolib.fr/specialities
3. https://www.doctolib.fr/medecin-generaliste — meta only
4. https://www.doctolib.fr/medecin-generaliste/paris — meta only
5. https://www.doctolib.fr/sante/ — meta only
6. https://www.doctolib.fr/sante/consultation-video/ — meta only
7. https://www.doctolib.fr/sante/confidentialite/ — meta only
8. https://about.doctolib.fr/ — meta only
9. https://media.doctolib.com/image/upload/v1727340494/legal/B2C-VDEF-PrivacyPolicy-SEPT24-FR.pdf
10. https://doctolibpatient.zendesk.com/hc/fr
11–15. Help categories: `/hc/fr/categories/` 4413305890834 (Mon compte Doctolib) · 4413305897618 (Mes rendez-vous) · 28443789273116 (Mes données de santé) · 8565668035740 (Mes proches) · 4413301608082 (Sécurité et confidentialité)
16–28. Help sections: `/hc/fr/sections/` 4415219310738 · 4415205351698 · 4415219145106 · 28444604032924 · 28444340305052 · 360004646934 · 4415218954514 · 28440588122012 · 28440747367452 · 4415205399698 · 4415205408530 · 26309878925340
29–41. Help articles: `/hc/fr/articles/` 360025469213 (filters) · 360025315234 (search) · 360025316194 (booking) · 360025313014 (cancel) · 360008041799 (missed appointment) · 360025317614 (notifications) · 360025470173 (waiting list) · 360025466373 (find my appointment) · 19217340918812 · 20024247176348 · 28714801992860 (venue accessibility) · 360025316254 · 360016664299 (phishing) · 4404181466002 (data storage / HDS) · 4404181480594 (security) · 9841213956892 (data rights) · 4420080879250 (retention) · 360025317334 · 360025526513 (conventionnement) · 10221416570780 (accessibility statement) · 360013356699 (teleconsultation)
42. https://doctolib.zendesk.com/hc/fr/articles/24301145743892 — practitioner ranking rules
43–48. **Blocked:** https://doctolib.legal/privacy-policy-B2C-FR · /CU-B2C-FR · /B2C-CU-Website-FR · /Cookie_Policy_FR_B2C · /B2C-legalmentions-FR · /Search-transparency_DL_FR
