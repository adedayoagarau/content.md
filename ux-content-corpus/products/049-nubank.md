# 049. Nubank

> Portuguese strings are quoted verbatim with an English gloss in brackets. The
> Portuguese is the artefact; the gloss is a reading aid, not a translation of
> record.

| Field | Value |
|---|---|
| Domain | `FIN` — Financial services and insurance |
| Industry / sub-vertical | Neobank / digital credit card + payment account, Brazil (Pix-native) |
| Primary URL | https://nubank.com.br/ |
| Corpus rank | 049 |
| Benchmark strength (source list) | Approachable financial language |
| Locale / market observed | **pt-BR** (Brazil). Sister sites exist at nu.com.mx, nu.com.co, nu.com/us — not harvested. |
| Platform observed | Web (marketing), FAQ hub, security hub |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Legal entity in the site footer: **Nu Pagamentos S.A — Instituição de Pagamento**, CNPJ 18.236.120/0001-58 — i.e. a **payment institution**, not a bank, despite the brand name "Nubank". Regulated by the **Banco Central do Brasil (BACEN)**; a second entity, **Nu Financeira**, issues RDB deposit instruments covered by the **FGC (Fundo Garantidor de Créditos)**. Data handling governed by **LGPD** (Lei Geral de Proteção de Dados). Pix limits are described as a BACEN mandate, not a Nubank policy. Footer publishes a full regulatory-transparency block: `PLD/CFTP` (AML/CFT programme), `SCR` (central credit registry), `Dados abertos` (open data), `PRSAC` (customer-relations policy), `Ouvidoria` (statutory ombudsman) with its own phone line and published procedures, and `PRAJA` (portal for judicial and administrative authorities). Crypto is a separate regime: an FAQ explicitly asks whether crypto is FGC-covered and whether Nubank Cripto is authorised to operate in Brazil. |
| Harvest date | 2026-09-21 |
| Pages inspected | 6 (1 blocked) |
| Harvest completeness | Partial — `nubank.com.br/taxas` (fees) returned empty and is recorded as **blocked**; no consolidated fee schedule was reached, so T10 is built from product-page claims and FAQ answers rather than from a tariff table. FAQ answers on `/perguntas` render as an unstructured concatenated wall without question/answer separation in the fetched markup. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://nubank.com.br/ | Hero, four-segment model, product cards, security block, footer |
| Conta (account) | https://nubank.com.br/nu/conta | Product page + 6 embedded FAQs incl. the FGC/safety answer |
| Cartão de Crédito (card) | https://nubank.com.br/nu/cartao | Product page + 6 embedded FAQs incl. the decline-reasons answer |
| Ajuda e segurança | https://nubank.com.br/ajuda-e-seguranca | Security hub, emergency routing, 5 FAQs |
| Central de Proteção | https://nubank.com.br/ajuda-e-seguranca/central-de-protecao | Named security-tool inventory + ~20 FAQs |
| Perguntas frequentes | https://nubank.com.br/perguntas | Full FAQ index across 13 product areas |
| *(blocked)* | https://nubank.com.br/taxas | Returned empty |

---

## T1 Navigation & IA labels

**Global nav — audience-first, two tiers plus security** `[observed]`

`Para você` [For you] · `Para seu negócio` [For your business] · `Segurança` [Security] · `Saiba Mais` [Learn more] · `Login Empresas` [Business login] · `Quero ser Nubank` [I want to be Nubank]

Two findings here.

**`Segurança` is a top-level nav item, peer to the two audience tiers.** Security is not filed under help or support; it is one of three primary destinations. For a market with Brazil's specific fraud profile — phone theft, *sequestro relâmpago* (express kidnapping), Pix coercion — this is a market-correct IA decision, and it is the structural expression of the whole Nubank security proposition.

**`Quero ser Nubank`** [I want to be Nubank] is the primary acquisition CTA and it is remarkable. Not "abrir conta" [open an account], not "cadastre-se" [sign up] — a **first-person declaration of identity using the brand name as a predicate noun**. The user does not sign up for a product; they state a wish to *become* the brand. Compare the homepage's closing line, `Junte-se aos 130 milhões que já escolheram o Nu.` [Join the 130 million who have already chosen Nu]. The acquisition language is membership language throughout.

**Four-segment product model, named as experiences rather than tiers** `[observed]`

| Segment | Descriptor (verbatim) | Gloss |
|---|---|---|
| `Nubank` | "Controle total da sua vida financeira" | Total control of your financial life |
| `Nubank Croma` | "A experiência que valoriza sua evolução financeira" | The experience that values your financial evolution |
| `Nubank Ultravioleta` | "O melhor cartão para quem ama viajar" | The best card for people who love to travel |
| `Nu Empresas` | "Tudo para gerir seu negócio com facilidade" | Everything to manage your business easily |

The section header is `Para cada momento, um Nubank diferente` [For each moment, a different Nubank]. Tiering is framed as **moments in a life**, not as spend thresholds — even though the qualification is a spend threshold (see T10). `Croma` is named for colour/chroma rather than for metal (Gold/Platinum/Black), deliberately sidestepping the status-metal convention of Brazilian card marketing while still shipping a `Mastercard® Platinum` underneath it.

**Footer — a transparency block that is itself the finding** `[observed]`

`Transparência` [Transparency] contains thirteen links: `Política de privacidade` · `Política de segurança` · `Termos de Uso` · `Ética, Compliance e ESG` · `Contratos` · `Sobre investimentos` · `Relatórios financeiros` · `Convenção de Boletos` · `PLD/CFTP` · `Dados abertos` · `SCR` · `PRSAC` · `Cessão de Créditos (Desenrola)`.

Naming the group **`Transparência`** rather than "Legal" reframes a compliance obligation as a value. Several entries are regulator-facing artefacts published to consumers: `PLD/CFTP` is the anti-money-laundering programme, `SCR` is the central credit registry, `Dados abertos` is open data, `Cessão de Créditos (Desenrola)` refers to a Brazilian government debt-renegotiation programme. Publishing the AML programme in the consumer footer is not standard practice.

`Ouvidoria` [statutory ombudsman] gets its **own footer group**, with its own freephone number, its own hours (`Atendimento em dias úteis das 8h às 18h`), a request form, and a linked PDF of `Procedimentos de Ouvidoria`. The escalation path above normal support is published as a first-class destination rather than buried — and the FAQ explains its purpose in the user's terms (see T11).

**Help IA is thin by comparison.** The `Ajuda` footer group has only three links: `Segurança`, `Perguntas frequentes`, and `Portal de suporte ao falecimento` [bereavement support portal]. The third is notable — a dedicated public portal for handling a deceased customer's account, surfaced at footer level.

**Acessibilidade** appears once, as `Canal de atendimento em libras` [Libras service channel] — a video-relay channel in Brazilian Sign Language, listed under contact channels rather than under an accessibility heading. See T14.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `Somos incansáveis para você não precisar ser`
> [We are tireless so that you don't have to be]
> Sub-CTA: `Peça seu Cartão de Crédito e sua Conta do Nubank` [Request your Credit Card and your Nubank Account]
> Field: `Digite seu CPF` [Enter your CPF] → `Continuar` [Continue]

**This is the single most transferable line in the Nubank file, and it is worth unpacking.**

The headline is a **transfer-of-effort promise**, not a feature claim, not a price claim, and not a superlative. It is a sentence about the relationship between two parties: we do the tiring work; you are released from it. `Incansável` [tireless, unwearying] is a slightly literary word in Portuguese — not everyday register, not corporate register either. And the construction `para você não precisar ser` [so that you don't need to be] leaves the adjective implied rather than repeated, so the sentence ends on the user rather than on the company.

Compare the other heroes in this batch: Wise names the task (`International money transfers`), Chime asserts a rank (`America's #1 Choice for Banking`), PayPal lists verbs (`Pay, send, and save smarter`), Kuda names the audience (`The digital bank built for Nigerians`). Nubank alone makes a claim about **what using the product will feel like**, and it does so without a number, a superlative or a product noun.

Note also the site's `<title>` uses the contracted spoken form — `Somos incansáveis **pra** você não precisar ser` — while the H1 uses the formal `para`. The page title is more colloquial than the headline it describes.

**The hero form asks for a CPF before anything else.** `Digite seu CPF` is the first field a visitor sees, above the fold, on the homepage. The CPF is Brazil's universal taxpayer ID; entering it is how eligibility is checked. Nubank front-loads the identity gate into the hero rather than deferring it to a signup flow — a market convention, but an aggressive one, and it means the first interaction is a personal-data entry with no explanation of what will be done with it.

**Product headlines — benefit clause plus negation of a market practice** `[observed]`

Card page: `Sem anuidade, sem tarifas abusivas e o mais completo em crédito.`
[No annual fee, no abusive charges, and the most complete in credit.]

**`tarifas abusivas`** [abusive charges] is the key phrase. Nubank does not say "no hidden fees" or "low fees" — it uses a **morally loaded adjective about the incumbent banking sector**. The claim is not that Nubank is cheap; it is that other banks are exploitative. That framing runs through the brand's origin story too, which the FAQ states directly: "O Nubank nasceu para combater a complexidade do mercado financeiro e devolver às pessoas o controle sobre seu dinheiro" [Nubank was born to fight the complexity of the financial market and give people back control over their money].

Account page: `Conta grátis, completa e com rendimento diário de 100% do CDI.`
[Free account, complete, with daily yield of 100% of the CDI.]

Three claims in eight words, the third quantified against a national benchmark rate (CDI). Brazilian consumers read CDI percentages fluently; the claim is checkable.

**Benefit-block headings are user-outcome sentences, not feature nouns** `[observed]`

| Heading | Gloss |
|---|---|
| `Quem escolhe a Conta do Nu tem o melhor rendimento` | Those who choose the Nu Account get the best yield |
| `Grátis e sem tarifas escondidas` | Free and with no hidden charges |
| `Pix do seu jeito` | Pix your way |
| `Movimente com segurança` | Move money securely |
| `Guarde dinheiro com rendimento turbinado` | Save money with turbocharged yield |
| `Fatura no controle, do seu jeito` | Your bill under control, your way |
| `Entenda e acompanhe seu limite` | Understand and follow your limit |
| `Saiba como conquistar mais limite` | Learn how to earn more limit |
| `Um app para tudo. E tudo no app` | One app for everything. And everything in the app |
| `Seja qual for sua necessidade, o Nubank tem uma solução` | Whatever your need, Nubank has a solution |

**`do seu jeito`** [your way] appears twice as a heading suffix. `Entenda e acompanhe seu limite` [Understand and follow your limit] is notable: the promised benefit is **comprehension**, not capability. Nubank markets *understanding your own credit limit* as a feature, which is an accurate read of what Brazilian consumers actually lack.

`rendimento turbinado` [turbocharged yield] and `Caixinha Turbo` are the one place the register goes consumer-electronics. `Caixinha` itself is a diminutive — literally "little box" — for a savings pot.

**Scale claim with a human frame** `[observed]`: `Junte-se aos 130 milhões que já escolheram o Nu.` [Join the 130 million who have already chosen Nu.] The number is delivered as a **social invitation** with the verb `escolheram` [chose] rather than "use" or "have accounts" — a choice implies alternatives were rejected.

Note an internal inconsistency: the homepage says `130 milhões`; the FAQ history answer says "mais de 100 milhões de clientes no Brasil, México e Colômbia" [more than 100 million across Brazil, Mexico and Colombia]. Two scale figures, one page apart in the IA.

## T3 CTA inventory

| CTA (verbatim) | Gloss | Context |
|---|---|---|
| `Quero ser Nubank` | I want to be Nubank | Global nav, hero — the primary acquisition CTA |
| `Digite seu CPF` / `Continuar` | Enter your CPF / Continue | Hero form |
| `Conheça` | Get to know / Discover | Product cards ×4 — **bare, object-less** |
| `Conheça Nubank` / `Conheça Nubank Croma` / `Conheça Nubank Ultravioleta` / `Conheça Nu Empresas` | Discover <product> | Segment cards — object-bearing variants of the same verb |
| `Conheça o Cartão Nubank` | Discover the Nubank Card | Card block |
| `Conheça o Pix do Nubank` | Discover Nubank's Pix | Account page |
| `Conheça nossas soluções` | Discover our solutions | Security block |
| `Saiba Mais` / `Saiba mais` | Learn more | Nav and several blocks — **two capitalisations** |
| `Mais informações` | More information | Feature cards ×5 |
| `Leia aqui` | Read here | Every blog card, ~12 instances per page |
| `Abra sua Conta do Nubank` | Open your Nubank Account | Account page |
| `Peça seu Cartão Nubank` | Request your Nubank Card | Card page |
| `Abra sua conta e peça seu cartão` | Open your account and request your card | Central de Proteção |
| `Fale com a gente` | Talk to us | Account page — informal "a gente" rather than "nós" |
| `Todos os Canais de atendimento` | All service channels | Footer |
| `Confira perguntas frequentes` / `Confira as perguntas frequentes` | Check the FAQs | Two variants on two pages |
| `Ir para o Blog do Nu` | Go to Nu's blog | Blog blocks |
| `Ver mais` | See more | Security tool grid |
| `Me Roubaram` | I was robbed | Security hub — see below |
| `Canal de Denúncias` | Reporting channel | Security hub |
| `Central de Proteção` | Protection Centre | Security hub |
| `Sair de tudo` / `Desconectar Todos` / `Desconectar tudo` | Log out of everything / Disconnect all | `[documented]` — **three variants of one control** |
| `Recebi o Cartão` | I received the card | `[documented]` — card activation |
| `Ativar Crédito` | Activate credit | `[documented]` |
| `Reativar conta` | Reactivate account | `[documented]` |
| `Estou sem celular` | I don't have my phone | `[documented]` — web-app login path |
| `Ativar Modo Rua` / `Desligar Modo Rua` | Activate/Turn off Street Mode | `[documented]` |
| `Ok, entendi` | OK, got it | `[documented]` — acknowledgement dialog |
| `Pronto` | Done | `[documented]` — flow completion |

### `Me Roubaram` — the standout CTA in the whole corpus batch

**`Me Roubaram`** [They robbed me / I was robbed] is a link on the homepage, on the security hub, and in the Central de Proteção. It is described as: "Central para bloquear o cartão do Nubank e desconectar a conta do celular em casos de perda, roubo ou furto" [Centre to block the Nubank card and disconnect the account from the phone in cases of loss, robbery or theft].

Three things make it exceptional:

1. **It is written in the first person, past tense, as the sentence a victim would say.** Not "Perda e roubo" [Loss and theft], not "Bloquear cartão" [Block card], not "Segurança do dispositivo". It is the words out of the user's mouth at the worst moment.
2. **It is on the homepage**, not buried in help. A robbery victim on a borrowed phone can reach it from the site root.
3. **It has its own subdomain path** (`app.nubank.com.br/roubo`) reachable without the app, with the login described as CPF + 8-digit password — i.e. **it works when your phone is gone.**

This is the direct analogue of Wise's `I sent money to the wrong person` confession titles, applied to an emergency rather than a mistake, and promoted from help-article title to primary navigation. It is the best single piece of UX content found across all five products in this batch.

The first action inside it is equally well-named: `Sair de tudo` [Get out of everything] — a plain, physical phrasing for global session termination.

**Observations on the wider CTA set.**

- `Conheça` is shipped **both bare and object-bearing on the same page** — four bare `Conheça` on the homepage product cards and four `Conheça <product>` on the segment cards. Same verb, same page, two treatments.
- `Saiba Mais` / `Saiba mais`, `Confira perguntas frequentes` / `Confira as perguntas frequentes` — capitalisation and article inconsistencies.
- **`Sair de tudo` vs `Desconectar Todos` vs `Desconectar tudo`** for the same "log out everywhere" action, across three FAQ answers. In an emergency flow, three names for one control is a real risk: a panicking user following instructions from one article will not find the button named in another.
- `Leia aqui` [Read here] appears roughly twelve times per page on blog carousels. In a screen-reader link list, that is twelve identical entries — the same defect as Chime's seven `Learn More`, at higher volume.

## T4 Onboarding & getting-started

`[observed]` — Nubank's public onboarding is compressed to a **single field**.

The hero, the account page and the card page all present the same two-element form: `Digite seu CPF` → `Continuar`. There is no stepped "how it works" narrative, no numbered sequence, no progress language on any public page. The CPF is the whole of the public funnel.

What substitutes for onboarding content is **eligibility and decision explanation in the FAQ**, and it is unusually good.

**`Como é feita a análise para ter o cartão de crédito?`** [How is the analysis for getting the credit card done?] `[observed]`

The answer's structure is worth recording because it is doing emotional work that most credit-decision copy does not attempt:

1. States the binary plainly: "Nós analisamos todos os pedidos, que podem ser aprovados ou não" [We analyse every request, which may be approved or not].
2. **Immediately decouples rejection from moral judgment**: "Ter um pedido reprovado não significa que você tenha alguma pendência em seu nome" [Having a request rejected does not mean you have any outstanding debt in your name].
3. Explains the mechanism: cross-referencing public consumption, credit and payment data, multiple bureaus, to prevent fraud and default.
4. **Reframes the most likely cause as absence rather than fault**: "a maioria dos pedidos recusados não acontecem por problemas encontrados nas finanças das pessoas, mas sim por simples falta de informações públicas disponíveis sobre quem está solicitando o cartão" [most rejected requests do not happen because of problems found in people's finances, but rather from a simple lack of available public information about the applicant].

Point 4 is the move. In a market where `nome sujo` [dirty name — being on a default register] carries heavy social stigma, telling a rejected applicant that the most likely reason is **thin file, not bad file** is a deliberate, humane content decision. It is also checkable and non-patronising: it does not say "don't worry", it says what the statistics are.

A parallel answer covers the same ground for the zero-limit case: `Por que recebi um cartão com R$0,00 (zero reais) de limite?` [Why did I receive a card with R$0.00 limit?] — the product ships the card and explains the number rather than declining outright.

**Card activation is split by prior state** `[documented]`, with distinct instructions and distinct button names:
- Existing debit card holder: tap `Ativar Crédito` [Activate credit] and enter the last 4 digits — "A função crédito será habilitada no mesmo cartão" [the credit function will be enabled on the same card].
- First card: tap `Recebi o Cartão` [I received the card] and enter the last 4 digits.

`Recebi o Cartão` is another first-person, past-tense button — the same grammar as `Me Roubaram`. Nubank labels state-confirmation actions with **what the user has done**, not with what the system will do.

**Progressive credit onboarding is a named product** `[observed]`: `Cartão para Construir Limite` [Card for Building Limit] paired with `Nu Limite Garantido` [Nu Guaranteed Limit]. The FAQ explains it with a worked example — deposit R$200, get R$200 of limit, the money keeps earning 100% of the CDI while serving as collateral, cap R$5,000. The example uses a small, realistic figure and states that the money continues to earn, which is the objection a user would raise.

`NuScore` is a named, navigable concept (`nubank.com.br/nu/cartao/nuscore`) — Nubank publishes its own internal scoring signal as a user-facing feature, framed in the heading `Entenda e acompanhe seu limite` [Understand and follow your limit].

## T5 Form & field labels

Public form surface is a single field. `[documented]` in-app labels recovered from FAQ instructions:

| Label | Gloss | Context |
|---|---|---|
| `Digite seu CPF` | Enter your CPF | The only public field |
| `senha de 4 dígitos` | 4-digit password | Transaction authorisation |
| `senha de 8 dígitos` | 8-digit password | App/web login |
| `Área Pix` | Pix Area | Home-screen entry point, "logo abaixo do saldo" [just below the balance] |
| `Configurar Pix` | Configure Pix | |
| `Meus limites Pix` | My Pix limits | |
| `Editar` | Edit | Limit adjustment |
| `Modo Rua` | Street Mode | See T13 |
| `Ajustes de Segurança` | Security adjustments | |
| `Central de Proteção` | Protection Centre | Shield icon, top right |
| `Me ajuda` | Help me | In-app help section |
| `Meus cartões` | My cards | |
| `Meus Dados` | My data | |
| `Editar dados do Perfil` | Edit profile data | |
| `Acesso pelo Site` | Website access | QR-code web login |
| `Seu salário` | Your salary | Account sub-section |
| `Portabilidade de salário` | Salary portability | |
| `Saldo Separado` | Separated balance | A ring-fenced sub-balance |
| `Consultar senha de 4 dígitos` | Check your 4-digit password | See below |
| `Esqueci minha senha` | I forgot my password | |
| `Perdi o acesso ao meu e-mail` | I lost access to my email | Recovery sub-path |

**Two password lengths as two named credentials.** `senha de 4 dígitos` and `senha de 8 dígitos` are referred to by their length, consistently, in every article. The user is never asked to remember which is "the PIN" and which is "the password" — the label *is* the distinguishing property. Simple and effective.

**`Consultar senha de 4 dígitos`** [Check your 4-digit password] is a genuinely unusual control. The FAQ `Como recuperar a senha de 4 dígitos?` explains: "Para sua segurança, ela não pode ser alterada" [For your security, it cannot be changed] — so instead of a reset flow, Nubank offers a **retrieval** flow behind identity confirmation. An immutable credential that you can look up rather than change is a distinctive security model, and the label names the actual action (`consultar` = consult/look up) rather than borrowing "reset".

**`Me ajuda`** [Help me] as the in-app help section name is first-person imperative — the user's request, not the company's offer. Consistent with `Me Roubaram` and `Recebi o Cartão`.

**`Perdi o acesso ao meu e-mail`** [I lost access to my email] is a first-person recovery sub-path *inside* the forgotten-password flow, for the case where the recovery channel itself is compromised. Naming that branch, in the user's voice, at the point of failure, is the Wise confession-title pattern applied to a flow step rather than an article.

## T6 Status & state language

Nubank's public state vocabulary is thinner than PayPal's because the product is app-first and the fee/status pages were not reachable. What is recoverable is `[documented]`:

| State / concept | Gloss | Notes |
|---|---|---|
| `pendente` | pending | Crypto transfers — an FAQ exists specifically to define it: `O que significa o status "pendente" em uma transferência?` — note the status word is **quoted inside the title**, the same device Venmo uses |
| `em análise` | under analysis | Loan applications |
| `negada` | denied | Card purchases |
| `recusado` / `reprovado` | refused / rejected | Limit increases and card applications — **two words for adjacent concepts** |
| `em atraso` | overdue | Instalments, invoices |
| `rotativo` | revolving | Revolving credit balance |
| `bloqueio judicial` | judicial block | Court-ordered account freeze, with its own FAQ on release |
| `Reativada com sucesso` | Reactivated successfully | Account reactivation outcome |
| `Impossibilitado de reativar` | Unable to reactivate | Second reactivation outcome |
| `Atualização de dados` | Data update required | Third reactivation outcome |
| `modo de descanso` | rest mode | Modo Rua when on a trusted Wi-Fi — see T13 |

**The three-outcome reactivation model** `[documented]` is the best-structured state set on the public pages. `Como reativar minha conta?` enumerates all three possible results of tapping `Reativar conta`, each with its own next step:

- `Reativada com sucesso` — "você já pode acessar e movimentar sua conta normalmente" [you can now access and move money normally]
- `Impossibilitado de reativar` — "você pode tentar mais tarde ou entrar em contato para entender o que aconteceu" [you can try later or get in touch to understand what happened]
- `Atualização de dados` — data confirmation required, then re-analysis, with a contact fallback

Publishing all three branch outcomes **before** the user acts removes the ambiguity of a single "we'll review it" response. The middle outcome is honest about not explaining itself and routes to a human.

**Timing language inventory** `[observed]` / `[documented]`, consistently absolute and business-day-qualified:
`entre 24 e 48 horas` (Pix limit increase) · `imediatamente` (Pix limit decrease) · `em até 5 dias úteis` (security-team response) · `em até 2 dias úteis` (email-change analysis) · `em até 1h` (device disconnection) · `até 10 dias úteis ou 15 dias corridos` (salary portability) · `no 31º dia após o depósito` (yield activation) · `em todos os dias úteis` (daily yield) · `até 50 dias` (card update window).

Two patterns worth noting. First, **`dias úteis` vs `dias corridos`** [business days vs calendar days] are distinguished explicitly, and one answer gives both — "até 10 dias úteis ou 15 dias corridos". Brazilian consumers read this distinction as material; giving both removes the arithmetic.

Second, the **asymmetric timing of Pix limit changes** is a security decision expressed as a timing rule and explained as such: increases take 24–48 hours "por questões de segurança" [for security reasons]; decreases are immediate. The user is told *why* the two directions differ. Making a protection always fast and a relaxation always slow, and saying so, is a clean pattern.

**Retroactive yield is the most complex state explained** `[observed]`. `Como funciona o rendimento automático retroativo da Conta do Nubank?` explains that money earns 100% of CDI only after 30 days, and that on day 31 the full retroactive yield for the first 30 days is credited: "É como se o seu dinheiro estivesse rendendo desde o primeiro dia em que foi depositado" [It is as if your money had been earning since the first day it was deposited].

`É como se…` [It is as if…] is the device. Rather than explaining the accounting, the answer gives the user the **experiential equivalent**. That is analogy-as-disclosure, and it is the clearest instance of Nubank's "approachable financial language" benchmark in a technical context.

## T7 Error, failure & recovery — PRIORITY

Nubank's unhappy-path content is organised around **crime rather than system failure**, which is the correct emphasis for the market and is the defining difference between this file and the three US files.

### Decline reasons — enumerated, split by channel, with a limit stated `[observed]`

`Por que minha compra feita com o cartão Nubank foi negada?` [Why was my purchase with the Nubank card declined?] splits into two labelled lists:

**`Para compras online:`** [For online purchases]
- `Limite indisponível` [Limit unavailable]
- `Dados do cartão incorretos ou incompletos` [Card details incorrect or incomplete]
- `Oscilação na loja virtual durante a tentativa da compra` [Instability at the online store during the attempt]
- `Cartão bloqueado no aplicativo` [Card blocked in the app]
- `Ausência de resposta diante da notificação de segurança recebida dentro deste aplicativo` [No response to the security notification received in the app]

**`Para compras presenciais:`** [For in-person purchases]
- `Limite indisponível`
- `Oscilação da maquininha durante a tentativa da compra` [Card-machine instability]
- `Erro na leitura do chip` [Chip read error]
- `Erro no envio de senha` [Error sending the PIN]
- `Cartão bloqueado no aplicativo`
- `Cartão cancelado` [Card cancelled]
- `Compras por aproximação desativada no aplicativo` [Contactless disabled in the app]

Eleven causes across two channels, each a short noun phrase. **Splitting by channel is the right structure** — an in-person decline and an online decline have almost disjoint cause sets, and a merged list would force the user to filter.

Three of the causes are **things the user themselves turned off** (card blocked, contactless disabled, card cancelled). Listing self-inflicted causes alongside system causes, without comment, lets the user check their own settings first.

The answer then discloses the categorical exclusions plainly: "Não aprovamos transações de sites ou aplicativos classificados pela Mastercard como apostas e jogos de azar, nem transações efetuadas na plataforma Masterpass" [We do not approve transactions from sites or apps classified by Mastercard as betting and gambling, nor transactions made on the Masterpass platform]. Naming the third party that does the classifying (Mastercard) rather than owning the judgment is a precise attribution.

And the anti-fraud system is admitted as a cause: "Também temos uma ferramenta anti-fraude que pode realizar bloqueios de segurança" [We also have an anti-fraud tool that can carry out security blocks]. Acknowledging that your own system may be the reason, in a list otherwise full of external causes, is honest.

### Theft and robbery — a three-stage recovery model `[observed]`

`Tive o celular roubado/furtado. O que fazer?` [My phone was robbed/stolen. What to do?]

Note the title distinguishes **`roubado`** (taken with violence or threat) from **`furtado`** (taken without confrontation) — a legal distinction in Brazilian law that determines the police report category. Nubank uses both words rather than collapsing them, because the user will need the right one for the *boletim de ocorrência*.

The sequence:

1. **Disconnect first, from any browser**: access `Me Roubaram`, log in with CPF and 8-digit password, tap `Sair de tudo`.
2. **Secure the adjacent account**: "Verifique se você ainda tem acesso ao seu e-mail cadastrado e troque a senha do e-mail, pois ele pode ter sido invadido" [Check whether you still have access to your registered email and change the email password, as it may have been compromised]. Telling the victim to secure a *third-party* account they may not have thought about is good threat modelling.
3. **Report, with a stated evidence list**: date and value of unrecognised transactions, a brief account of what happened, and the *Boletim de Ocorrência* (police report).

Then the response commitment: "nosso time de segurança analisará seu caso e entrará em contato por e-mail em até 5 dias úteis" [our security team will analyse your case and get in touch by email within 5 business days]. A named team, a channel, and a bounded time.

The security hub adds a standing instruction with a reason: `Faça seu boletim de ocorrência` — "Mesmo depois de avisar a gente, não deixe de fazer o boletim de ocorrência no site da Secretaria de Segurança Pública do seu Estado" [Even after telling us, do not fail to file the police report on your State Public Security Secretariat's website]. It also repeatedly tells users how to find the online option: "pesquisar por 'delegacia eletrônica' + 'nome do seu estado'" [search for "electronic police station" + your state's name]. **Publishing the search string** is the same pattern as Chime telling users what to type into the NMLS registry.

### The express-kidnapping answer — the most striking safety content in this batch `[observed]`

`O Modo Rua irá me proteger contra sequestro e sequestro relâmpago?` [Will Street Mode protect me against kidnapping and express kidnapping?]

The answer begins by **conceding that the security feature will fail**: "Caso você seja vítima de sequestro ou sequestro relâmpago e esteja com o celular, você pode ser coagido a desativar o Modo Rua" [If you are the victim of kidnapping or express kidnapping and you have your phone, you may be coerced into deactivating Street Mode].

Then, before any product instruction:

> "É muito importante que neste momento **você não reaja e preze pela sua segurança acima de tudo**."
> [It is very important that in this moment you do not react and that you value your safety above all else.]

**A financial product telling a user to comply with their attacker and let the money go.** Physical safety is placed explicitly above the money, in bold-equivalent emphasis, before the recovery procedure. Only then does the answer explain what to do afterwards, "quando estiver em segurança" [when you are safe].

There is nothing comparable in the US files. It is market-specific content that could not be written by a team not embedded in the market, and it is the clearest demonstration in this corpus that safety content has to be written from the actual threat model rather than from a generic fraud template.

### Scam-victim recovery, with the limits stated `[observed]`

`Fui vítima de um golpe de um cliente Nubank. O que fazer?` [I was the victim of a scam by a Nubank customer. What to do?]

Two things are told to the user that most products avoid:

1. **Route correctly and don't duplicate**: the victim must contest with *their own* bank, which will then contact Nubank. "Não é necessário entrar em contato conosco para abrir uma contestação por aqui também" [It is not necessary to contact us to open a dispute here as well]. Preventing a duplicate, futile contact.
2. **State the honest probability**: "Lembramos ainda que **não é possível garantir que o valor total ou parcial da transação vai ser recuperado**, pois a movimentação nestes casos pode ocorrer rapidamente" [We remind you that it is not possible to guarantee that all or part of the transaction will be recovered, because the money in these cases can move quickly].

No false hope, and the reason given (speed of onward movement) is the real one.

The related `MED` (Mecanismo Especial de Devolução — Brazil's Pix special return mechanism) has two FAQs: `O que é MED?` and, separately, **`O MED garante a devolução do Pix?`** [Does MED guarantee the Pix will be returned?]. Writing a dedicated article to answer "no" to the question the mechanism's name invites is exactly the Wise pattern of documenting the gap between a system's name and its reality.

Also present: `Fiz um Pix para a pessoa errada. E agora?` [I sent a Pix to the wrong person. And now?] — first person, past tense, with the colloquial `E agora?` [And now?] standing in for "what do I do". This is a Wise-style confession title in Brazilian Portuguese, and the `E agora?` suffix is more panicked and more human than "What should I do?".

### Loss of access — four separate compromised-channel scenarios `[observed]`

- `Minha senha e biometria estão corretas, mas ainda não consigo entrar no app. O que eu faço?` [My password and biometrics are correct but I still can't get into the app]
- `Está com problema de acesso com biometria? Saiba o que fazer` [Having biometric access problems? Here's what to do]
- `O que fazer quando o código de autenticação não chegou no meu e-mail ou aparece como inválido?` [What to do when the authentication code didn't arrive or shows as invalid]
- `Não reconheço alteração de e-mail realizada no meu aplicativo. O que fazer?` [I don't recognise an email change made in my app]
- `O que fazer em caso de alerta de acesso à conta de celular desconhecido?` [What to do about an access alert from an unknown phone]

The first title is the most precise piece of troubleshooting writing on the site: it **states what the user has already verified** ("my password and biometrics are correct") before asking the question. Most help titles assume the user hasn't checked the obvious thing; this one starts after the obvious thing.

The email-change article handles the case where the recovery channel itself has been taken over, including the sub-path when the user is logged out — and gives a stated review time ("A análise é feita em até 2 dias úteis") plus the failure case ("Caso não receba a confirmação, será necessário realizar o procedimento novamente").

### Debt and arrears — a distinct, non-euphemistic register `[observed]`

`Como negociar e pagar minha dívida do Cartão Nubank?` [How do I negotiate and pay my Nubank Card debt?]

The word used is `dívida` [debt], not "pendência" [outstanding item] or "saldo devedor" [debit balance]. The answer links a dedicated page, `nubank.com.br/negociar-dividas`, and frames the purpose as "retomar o controle da sua vida financeira" [regain control of your financial life] — the same `controle` [control] that appears in the top-level product descriptor.

Related titles handle the consequences without softening: `Posso ficar com o nome sujo e CPF apontado caso atrase meu empréstimo?` [Can I get a dirty name and a flagged CPF if I'm late with my loan?] uses the **colloquial stigma term `nome sujo`** rather than the formal "negativação" or "inadimplência". Asking the question in the words the borrower would actually use — including the shameful ones — is the register decision that makes the answer findable.

`A Renegociação de Pendências bloqueia meu cartão ou diminui o meu limite de crédito?` [Does renegotiation block my card or reduce my limit?] anticipates the fear that seeking help makes things worse — a barrier to hardship engagement that is rarely addressed in content.

### Anti-phishing promises, stated as absolutes `[observed]`

- "O Nubank **nunca** liga ou envia mensagem solicitando que você instale algo no seu celular" [Nubank never calls or messages asking you to install something]
- "Se alguém entrou em contato com você se passando pela Central de Atendimento e te pediu para baixar algum app… **é golpe**" [If someone contacted you pretending to be the call centre and asked you to download an app… it's a scam]
- "A única forma de contratação de um empréstimo com o Nubank é pelo aplicativo oficial. Não solicitaremos cobrança por boleto, Pix e nem outros meios" [The only way to take a loan with Nubank is through the official app. We will not request payment by boleto, Pix or any other means]
- "a conta do Nubank está confirmada por um **selo verde de verificação**" [the Nubank account is confirmed by a green verification badge]

The construction `é golpe` [it's a scam] is a **flat, two-word verdict**. Not "may be fraudulent", not "should be treated with caution" — a declarative classification the user can apply as a rule. Brazilian anti-fraud copy generally uses this directness, and it is far more actionable than hedged Anglo-American equivalents.

The green-badge reference is a concrete, checkable verification instruction rather than an abstract "verify the sender".

**`Como confirmar que um convite de pesquisa é mesmo do Nubank?`** [How to confirm a research invitation is really from Nubank?] extends the same treatment to **user-research recruitment** — a channel almost no company defends. It establishes a `código de pesquisa` [research code] as the verification token, names which channels partners may use, and states the absolutes: "Você **nunca** precisará pagar para participar" and "Nunca pediremos para você informar qualquer senha pessoal". Nubank recognised that its own research operation is a phishing vector and wrote the defence.

## T8 Empty states

`[absent]` — all empty states sit behind authentication. No no-data, no-results or first-run strings were reachable on public surfaces. The FAQ page's search control renders as `O que você procura?` [What are you looking for?] with no retrievable results state.

## T9 Notifications & system messages

`[documented]`:

- **Risk warning at the moment of transfer** — `Por que recebi um aviso de risco ao tentar fazer uma transferência?` [Why did I get a risk warning when trying to make a transfer?]. The answer is a model of proportionate warning copy:
  > "Isso não quer dizer que a pessoa responsável pela conta tenha realizado alguma irregularidade, mas prezamos pela sua segurança e optamos por informar. Dessa forma, **você pode decidir se quer ou não seguir com a transação**."
  > [This does not mean the person responsible for the account has done anything irregular, but we value your safety and chose to inform you. This way, you can decide whether or not to proceed.]

  Three moves in three sentences: **disclaim the accusation** (protecting the flagged party from defamation), **state the motive**, **hand the decision back**. A warning that explicitly says "this may mean nothing" and then lets the user proceed is far better calibrated than a blocking modal, and it also solves the legal problem of implying wrongdoing by a third party. Best notification copy in this file.

- `Alerta de Golpe` [Scam Alert] is the named feature behind it: "Pode avisar o cliente quando ele está prestes a fazer uma transação para uma conta potencialmente suspeita" [May warn the customer when they are about to make a transaction to a potentially suspicious account]. Note the hedges — `pode avisar` [may warn] and `potencialmente suspeita` [potentially suspicious]. The feature description itself declines to overpromise.

- **Call-authenticity confirmation** — `Como funciona a confirmação de identidade ao ligar para o Nubank?` describes an inverted authentication flow: when you phone Nubank and enter your CPF, **a notification appears in your app asking you to confirm the call**. "Se não foi você que ligou, basta clicar no botão para recusar a chamada. Seus dados e sua conta permanecem em segurança" [If it wasn't you who called, just tap the button to refuse the call. Your data and account remain safe]. This defends against a caller impersonating the customer, and the copy tells the *non*-caller what the notification means for them.

- `Alô Protegido` [Protected Hello] blocks incoming calls impersonating the call centre. Its permission-request copy is exemplary (see T10).

- Limit-change confirmation: "Pronto! Vamos te avisar assim que a mudança for realizada" [Done! We'll let you know as soon as the change is made].

- Reactivation acknowledgement: `Ok, entendi` [OK, got it].

## T10 Disclosures, legal & compliance — PRIORITY

**The fee page (`nubank.com.br/taxas`) returned empty and is recorded as blocked.** No consolidated tariff schedule was reached. Everything below is from product pages, FAQs and the footer.

### FGC coverage — a two-instrument explanation `[observed]`

`É seguro colocar meu dinheiro na Conta do Nubank?` [Is it safe to put my money in the Nubank Account?] is the most important disclosure on the public site, and it is placed as an **FAQ on the account product page**, not in a legal document.

The answer distinguishes two deposit types and gives each a protection basis:

> "Você pode ter dois tipos de depósito na Conta: em **RDB** (Recibo de Depósito Bancário) ou **Conta de pagamentos**.
> O RDB é um título de renda fixa privado emitido por uma instituição financeira. Os RDBs emitidos pela **Nu Financeira**… são considerados um investimento de baixo risco já que têm a cobertura do **FGC (Fundo Garantidor de Créditos)**. Os depósitos em Conta de Pagamentos também são considerados seguros, por serem **vinculados e garantidos por títulos públicos do Governo Federal**."
> [You can have two deposit types in the Account: RDB (Bank Deposit Receipt) or Payment Account. The RDB is a private fixed-income instrument issued by a financial institution. RDBs issued by Nu Financeira… are considered low-risk since they have FGC coverage. Payment Account deposits are also considered safe, because they are linked to and backed by Federal Government securities.]

Then: "Acesse a legislação detalhada no site do Banco Central do Brasil" [Access the detailed legislation on the Central Bank of Brazil's website], with a link to a specific BACEN notice.

**Structural assessment.** The answer does three things well: it names both instruments, it gives each a *different* protection mechanism (FGC vs. government-securities backing), and it links the regulator's own page as the authority. Linking BACEN rather than a Nubank-authored explainer is the same instinct as Chime citing the FDIC's depositor-facts page.

What it does **not** do — and this is the honest finding — is state the FGC coverage limit, or say plainly that the entity the user signs up with (`Nu Pagamentos S.A — Instituição de Pagamento`) is a payment institution rather than a bank. Compare Chime's "Chime is not FDIC-insured" and Wise's "not an FDIC-insured bank": both lead with the negation. Nubank never publishes an equivalent negation on the pages harvested. The corporate form appears only in the **copyright line of the footer**, in the smallest type, as `© 2026 Nu Pagamentos S.A - Instituição de Pagamento`.

So the disclosure is accurate and well-sourced, but the *brand name says "bank"* and the *legal form says "payment institution"*, and no page harvested reconciles the two for the user. In a market where the distinction is real, that is a gap worth recording.

Three further FGC-scoped FAQs exist and are correctly separated by product:
- `O Resgate Planejado tem garantia do FGC?` [Does Planned Withdrawal have FGC cover?]
- `Criptoativos são cobertos pelo Fundo Garantidor de Crédito (FGC)?` [Are crypto assets covered by the FGC?]
- `O Nubank Cripto é autorizado a operar no Brasil?` [Is Nubank Cripto authorised to operate in Brazil?]

Asking the authorisation question about your own product, in your own FAQ, is a transparency move.

### Pricing and conditionality `[observed]`

**Nubank Croma monthly fee, with the waiver conditions stated first:**

> "Clientes que concentram seus gastos no Nubank e atingem ao menos **R$ 4 mil por mês** na fatura do cartão de crédito, ou que mantêm **R$ 30 mil** investidos ou guardados no Nubank terão isenção da mensalidade… Para aqueles que não atenderem a esses critérios, será cobrado **R$ 39 por mês**."
> [Customers who concentrate their spending on Nubank and reach at least R$4,000 per month on the credit card bill, or who keep R$30,000 invested or saved with Nubank, will have the monthly fee waived… For those who do not meet these criteria, R$39 per month will be charged.]

Waiver-then-price is the right order for a fee the user can avoid, and both thresholds are concrete. Note the tension with the segment's marketing descriptor — `A experiência que valoriza sua evolução financeira` [The experience that values your financial evolution] — which frames a spend threshold as personal growth.

**Cashback rates given with a dual unit:** "0,8% de cashback (1.4 pontos por dólar)" and "5% de cashback (9 pontos por dólar)". Percentage and points-per-dollar in the same breath. Note the **decimal-separator inconsistency within one sentence** — `0,8%` uses the Brazilian comma, `1.4 pontos` uses a point. Same for `5%` / `9 pontos`. A number-formatting defect in a rewards disclosure.

**Yield claims are conditional and the condition is stated** `[observed]`: `rendimento diário de 100% do CDI` is qualified in the FAQ — money earns only after 30 days in the account, then daily on business days, with the first 30 days credited retroactively on day 31. The marketing says "daily yield"; the FAQ says "after 30 days, then daily". The qualification is in the FAQ on the same page, but not in the headline.

`Ganhe até 30% a mais que na poupança` [Earn up to 30% more than the savings account] is a comparative claim against Brazil's default savings product, using `até` [up to].

`Caixinha Turbo` rates are tiered by segment (115% / 120% of CDI) with a deposit cap (R$10,000 for Croma) and an annual cycle — all stated in the FAQ.

### The permissions disclosure — best-in-batch `[observed]`

`O que são as permissões solicitadas no Alô Protegido?` [What are the permissions requested by Protected Hello?]

The answer names each Android permission, **translates it into what it enables**, and then states the boundary:

> "- Gerenciamento de chamadas (Telefone): permite o bloqueio inteligente de números suspeitos e falsas centrais;
> - Histórico de ligações (Registro de Chamadas): permite que identifiquemos ligações recebidas ou realizadas para números suspeitos.
> **Nenhuma dessas permissões autoriza que o conteúdo das suas conversas seja acessado pelo Nubank.** Todos os dados coletados são utilizados apenas para aumentar a sua segurança no app."
> [- Call management (Phone): enables intelligent blocking of suspicious numbers and fake call centres; - Call history (Call log): lets us identify calls received from or made to suspicious numbers. None of these permissions authorises Nubank to access the content of your conversations. All data collected is used only to increase your security in the app.]

**Permission name → capability granted → explicit negation of the scariest inference.** A user granting call-log access will immediately wonder whether Nubank can hear their calls; the answer addresses that specific fear in a dedicated sentence rather than leaving it to a privacy policy. This is the cleanest permission-consent copy in the corpus batch.

The same pattern recurs for location: `Como o Nubank usa meus dados de Wi-Fi e GPS?` — purpose stated ("para identificar se há proximidade ou não da sua rede segura"), benefit stated (no manual toggling), and LGPD compliance named.

### LGPD as a named, recurring authority `[observed]`

LGPD is invoked in at least four separate FAQ answers — facial-recognition data storage, Wi-Fi/GPS collection, Open Finance data sharing, and user-research participation. In each case the pattern is the same: state what is collected, state the purpose, name the law.

Facial recognition: "Informações, documentos e fotos serão armazenadas de forma criptografada e seguindo todas as exigências da Lei Geral de Proteção de Dados" [Information, documents and photos will be stored encrypted and following all the requirements of the LGPD].

User research: the `Termo de Consentimento` is explained as a document, with alternative names given ("também chamado de Termo de Confidencialidade ou Termo de Participação"), its purpose stated, the signing platform named (Docusign), and the anonymisation commitment made ("mantê-los anonimizados, ou seja, sem identificação pessoal, nos relatórios finais" [keep them anonymised, that is, without personal identification, in the final reports]).

**`ou seja`** [that is] is Nubank's standard gloss connector — used to define a term immediately after using it, inline. It appears repeatedly: "anonimizados, ou seja, sem identificação pessoal"; "o valor determinado como limite não é por transação, e sim o total…". Glossing in-line rather than footnoting is the core mechanism of the "approachable financial language" benchmark.

### Open Finance — optionality stated first `[observed]`

`O compartilhamento de dados via Open Finance é obrigatório?` [Is data sharing via Open Finance mandatory?]

> "O compartilhamento de dados é **opcional**, só acontece com a autorização específica de cada cliente e **pode ser cancelado a qualquer momento**. É importante reforçar que todo o processo é regulamentado e acompanhado pelo Banco Central."
> [Data sharing is optional, only happens with each customer's specific authorisation, and can be cancelled at any time. It is important to reinforce that the whole process is regulated and monitored by the Central Bank.]

Optional → consent-based → revocable → regulated. Four properties in two sentences, in the order a suspicious user would want them.

Nubank also documents **the direction it cannot control**: `Como enviar dados do Nubank para outras instituições via Open Finance?` explains that outbound sharing must be initiated in the *other* institution's app, and adds "a disponibilização do Nubank no aplicativo de outras instituições financeiras é responsabilidade da própria instituição" [making Nubank available in other institutions' apps is the responsibility of that institution]. Boundary of responsibility stated clearly.

And `A instituição que desejo trazer meus dados via Open Finance para o Nubank não está na lista. O que fazer?` handles the missing-institution case by routing the user to **BACEN's own participant list** first, then offering a spelling check.

### Pix limits attributed to the regulator, not to Nubank `[observed]`

`Qual é a diferença do Modo Rua para o limite Pix?` draws the line explicitly:

> "Os limites Pix fazem parte de uma **medida do Banco Central** para todas as instituições financeiras… Já o Modo Rua é uma funcionalidade que **o Nubank criou**…"
> [Pix limits are part of a Central Bank measure applying to all financial institutions… Street Mode, on the other hand, is a feature Nubank created…]

Separating "the regulator requires this" from "we built this" in a single comparative answer is good practice: it prevents the user attributing a mandated restriction to the company, and it lets the company claim credit where credit is due. The answer also gives the regulator's actual time windows — `período diurno (das 6h às 19h59)` and `noturno (das 20h às 5h59)` — and states the scope: "se aplicam a todas as transações, incluindo os pagamentos por QR code, chave Pix, Pix copia e cola e dados bancários".

### Bereavement and judicial process `[observed]`

Two disclosure surfaces most products omit entirely:
- `Portal de suporte ao falecimento` [Bereavement support portal] — footer-level, alongside `espólio` [estate] in the URL.
- `Portal de Relacionamento com Autoridades Judiciais e Administrativas` (PRAJA) — a published channel for courts and authorities, and a separate FAQ `Como liberar o bloqueio judicial?` [How to release a judicial block?] telling a customer what to do when a court has frozen their account.

Documenting court-ordered freezes for the affected customer, publicly, is unusual.

## T11 Help-centre architecture

**There is no help centre in the conventional sense.** Nubank has an FAQ hub (`/perguntas`) and a security hub (`/ajuda-e-seguranca`), with FAQ blocks embedded at the foot of each product page. Article-level pages were not observed; answers live inline in accordions.

**FAQ hub structure — 13 product-area groupings** `[observed]`

`O Nubank` · `Login no app Nubank` · `Segurança no Nubank` · `Conta do Nubank` · `Nubank Ultravioleta` · `Nubank Croma` · `Pix no Nubank` · `Cartão de Crédito Nubank` · `Empréstimos Nubank` · `NuCel` · `Seguros Nubank` · `Investimentos no Nubank` · `NuPay` · `Criptomoedas no Nubank` · `Shopping do Nu`

Above them, a four-way segment filter: `Nubank` · `Nubank Croma` · `Ultravioleta` · `Nu Empresas`, with the prompt `O que você procura?` [What are you looking for?].

**The grouping convention is `<Concept> no/do Nubank`** — `Pix no Nubank`, `Segurança no Nubank`, `Conta do Nubank`, `Empréstimos Nubank`, `Investimentos no Nubank`, `Shopping do Nu`. Preposition and article use is inconsistent across the set (`no` / `do` / bare / `do Nu`), but the brand name appears in nearly every category label, which reinforces that these are Nubank's versions of familiar Brazilian financial concepts rather than generic topics.

**Volume is extreme and unevenly distributed.** `NuPay` alone carries ~40 questions; `Nubank Ultravioleta` carries ~45, many of them about a cinema, an art lab, a lounge, an IRONMAN sponsorship and a toll tag. `Criptomoedas` carries 9. The FAQ is functioning as the catch-all for every product, partnership and physical venue the company operates, with no editorial tiering by user need.

**Question grammar — five shapes, and the first-person shapes are the notable ones**

| Shape | Example | Gloss |
|---|---|---|
| `Como + verb?` | `Como fazer um Pix no crédito com chave Pix?` | How to make a credit Pix with a Pix key? |
| `Por que…?` | `Por que meu limite está negativo?` | Why is my limit negative? |
| `O que é…?` / `O que são…?` | `O que é uma chave Pix?` | What is a Pix key? |
| **First-person statement + `O que fazer?` / `E agora?`** | `Fiz um Pix para a pessoa errada. E agora?` · `Tive o celular roubado/furtado. O que fazer?` · `Fui vítima de um golpe… O que fazer?` · `Meu CDB venceu. E agora?` | — |
| `Posso…?` | `Posso cancelar um Pix Programado já agendado?` | Can I cancel an already-scheduled Pix? |

The fourth shape is the Nubank signature: **a statement of what has happened, a full stop, then a two-word plea.** `E agora?` [And now?] is markedly more distressed than `O que fazer?` [What to do?], and Nubank uses both — the more panicked form on the more panicked situations (wrong-person Pix, matured CDB). That is register matched to stakes at the title level.

`Por que meu limite está negativo?` [Why is my limit negative?] and `Minha oferta de empréstimo sumiu. O que pode ter acontecido?` [My loan offer disappeared. What might have happened?] are both written from the position of someone confused by the product's own behaviour. `sumiu` [vanished] is colloquial.

**Routing furniture** `[observed]`. The security hub's contact block is ordered: app chat (24h) → capital-city phone → other-region phone → **Libras channel** → all channels. The FAQ hub's `Como entro em contato com o Nubank?` answer adds a fourth route and then **explicitly recommends self-service**: "muitos clientes acham mais fácil resolver suas dúvidas com as perguntas e respostas que preparamos para te ajudar a economizar tempo" [many customers find it easier to resolve their questions with the Q&As we prepared to help you save time].

**The Ouvidoria answer defines the escalation precondition** `[observed]`:

> "A Ouvidoria do Nubank é um canal que dedicamos para atender todos os clientes que **já tiveram uma resposta do nosso time mas não ficaram satisfeitos com a resolução**. Por isso, antes de entrar em contato com a Ouvidoria, é importante buscar nossos canais de atendimento."
> [Nubank's Ombudsman is a channel we dedicate to customers who have already had a response from our team but were not satisfied with the resolution. So before contacting the Ombudsman, it is important to try our service channels.]

Explaining a statutory escalation body in terms of **the user's situation** ("you already got an answer and it wasn't good enough"), rather than in terms of its regulatory function, is the right translation. It also correctly gates the channel without gatekeeping it.

## T12 FAQs

FAQs are Nubank's primary content form. They appear in three places with different curation:

**1. Product-page FAQ blocks** — 6 questions each, under `Ficou com alguma dúvida?` [Still have a doubt?] or `Ficou alguma dúvida?`. Two phrasings of the same heading across two pages.

*Conta page:*

| # | Question (verbatim) | Gloss | Answer, summarised |
|---|---|---|---|
| 1 | É seguro colocar meu dinheiro na Conta do Nubank? | Is it safe to put my money in the Nubank Account? | Two deposit instruments, FGC for RDB, federal securities for payment balances, BACEN link. |
| 2 | Como fazer portabilidade de salário para o Nubank? | How to transfer salary to Nubank? | Defines portability, lists what the user needs and where to find it, three in-app steps, 10 business days / 15 calendar days. |
| 3 | Quanto rende a Conta do Nubank? | How much does the account earn? | 100% CDI after 30 days, retroactive credit on day 31, then daily on business days. |
| 4 | A Conta do Nubank tem rendimento diário? | Does it earn daily? | Restates Q3 with the `Saldo Separado` included. |
| 5 | Como reativar minha conta? | How to reactivate my account? | Three-outcome model (see T6). |
| 6 | Como mudar a senha de acesso ao aplicativo? | How to change the app password? | Split by CPF (facial recognition) vs CNPJ (email link), plus three caveats. |

**Q1 in the first slot** is the finding. The account page's lead FAQ is not about rates or features — it is `Is it safe?`. Answering the trust objection before the product objection, on the product page itself, is the correct priority for a payment institution with a bank-like name.

Q3 and Q4 are near-duplicates ("how much does it earn" / "does it earn daily") answered with overlapping text, an SEO artefact that costs a slot in a six-question block.

*Cartão page:* leads with `Como é feita a análise para ter o cartão de crédito?` [How is the analysis done?] — again, the anxiety question first, ahead of features. Then debt negotiation, activation, bill payment, the secured-limit product, and due-date changes. **Two of six slots are about credit refusal and debt** on a card marketing page.

**2. Security-hub FAQ blocks** — 5 on `/ajuda-e-seguranca`, ~20 on `/ajuda-e-seguranca/central-de-protecao`, all security-scoped, heavily weighted to `Modo Rua`.

**3. The full FAQ hub** — hundreds of questions across 13 areas.

**Structural note on the harvest:** `/perguntas` returns as a single concatenated text block with no markup separating questions from answers. Questions and answers run together (`O NubankComo entro em contato com o Nubank?A área de suporte…`). Only the first group's answers are expanded; the remaining twelve groups return **titles only**. So the FAQ hub's question inventory is retrievable but its answer bodies largely are not — the same accordion problem as Wise, and a rendering defect for any non-JS client.

## T13 Terminology & glossary

| Term | Gloss | Nubank's usage | The alternative it rejected |
|---|---|---|---|
| `Modo Rua` | Street Mode | Geofenced transaction limiting when off a trusted Wi-Fi | "Modo seguro", "Travel mode", "Location lock" |
| `modo de descanso` | rest mode | What Modo Rua enters on a trusted network | "disabled", "inactive", "paused" |
| `Caixinha` / `Caixinha Turbo` | little box / turbo box | Savings pot | "cofrinho" [piggy bank], "objetivo", "reserva" |
| `Me Roubaram` | They robbed me | Emergency lockdown destination | "Perda e roubo", "Bloquear conta" |
| `Alô Protegido` | Protected Hello | Blocks calls impersonating the call centre | "Proteção contra chamadas" |
| `Defesas Inteligentes` | Intelligent Defences | Behavioural anomaly blocking | "Sistema antifraude" |
| `Alerta de Golpe` | Scam Alert | Pre-transaction warning on suspicious destinations | "Aviso de risco" (which is what the FAQ calls the resulting warning) |
| `Lista de confiança` | Trust list | Named people allowed above BACEN limits | "Beneficiários", "Contatos autorizados" |
| `Pack de Proteção` | Protection Pack | The bundle of security features | "Security suite" |
| `Central de Proteção` | Protection Centre | The in-app hub, entered via a shield icon | "Configurações de segurança" |
| `Proteção de acesso` | Access protection | Additional login layer | "2FA", "MFA" |
| `Teste de Prova de Vida` | Proof-of-Life Test | Liveness check in facial recognition | "liveness detection" |
| `Passa Tudo no Crédito` | Everything goes on credit | Using card limit for Pix and bills | "Crédito para pagamentos" |
| `Limite Adicional` / `limite extra` | Additional / extra limit | Supplementary credit for specific uses | — |
| `NuScore` | — | Nubank's own credit signal, shown to the user | "score interno" |
| `Nu Limite Garantido` | Nu Guaranteed Limit | Collateralised limit | "cartão pré-pago", "secured card" |
| `Saldo Separado` | Separated balance | Ring-fenced portion of the account balance | "reservado", "bloqueado" |
| `Quero ser Nubank` | I want to be Nubank | Primary signup CTA | "Abrir conta", "Cadastre-se" |
| `Me ajuda` | Help me | In-app help section | "Ajuda", "Suporte" |
| `nome sujo` | dirty name | Default-register status, used in an FAQ title | "negativação", "inadimplência" |
| `tarifas abusivas` | abusive charges | What Nubank does not charge | "taxas", "tarifas" |
| `é golpe` | it's a scam | Flat verdict in anti-fraud copy | "pode ser fraudulento" |
| `E agora?` | And now? | FAQ title suffix on panic situations | "O que fazer?" |
| `ou seja` | that is | Inline gloss connector, used throughout | footnotes, glossary links |
| `Nubank Croma` | — | Mid-tier segment (renamed from `Nubank+`) | "Gold", "Platinum", "Premium" |
| `NuTag` / `NuCel` / `NuPay` / `NuViagens` / `Nu Cine Copan` | — | `Nu`-prefix as a universal product morpheme | — |

### `Modo Rua` — the best coined term in this batch

`Modo Rua` [Street Mode] deserves individual attention. The feature limits Pix, TED and boleto payments when the phone is not on a registered Wi-Fi network, with facial recognition required to exceed the limit.

Why the name works:
- **`Rua` [street] names the threat location, not the mechanism.** Every Brazilian user knows what "being on the street" means for phone safety. Compare the alternatives the industry uses — "geofencing", "location-based limits", "travel mode" — none of which carry the lived meaning.
- It is **two short words** and it is guessable from the name alone.
- Its complement is equally well-named: on a trusted network the feature enters **`modo de descanso`** [rest mode] — a personified, non-technical state name that tells the user the protection has not been turned off, only relaxed. "Disabled" would have implied the opposite.

The `Lista de confiança` [trust list] extends the metaphor: named people you trust may receive above-limit transfers. Not "whitelist", not "approved beneficiaries" — a list of people you trust.

### Terminology problems recorded

- **`Sair de tudo` / `Desconectar Todos` / `Desconectar tudo`** — three names for the global-logout control across three FAQ answers, in an emergency flow.
- **`Segurança` vs `Central de Proteção`** — the FAQ instructions hedge repeatedly: "clique no símbolo de engrenagem e em 'Segurança' **ou em 'Central de Proteção', se ela já aparecer para você**" [click the gear and then "Security" or "Protection Centre", if it already appears for you]. Nubank is mid-rollout and the help copy carries the conditional. Honest, but it means every security instruction has a branch.
- **`Nubank+` → `Nubank Croma`** rename is in flight; a dedicated FAQ explains what changed, but `Qual é a mensalidade do Nubank+?` and `O que é o alerta inteligente oferecido pelo Nubank+?` still appear in the live FAQ index under the old name.
- **`Alerta de Golpe`** (feature name) vs **`aviso de risco`** (what the FAQ calls the resulting warning). Two names, one thing.
- **`recusado` / `reprovado` / `negado`** used across adjacent rejection contexts without a governing distinction.
- Decimal separator mixed within one sentence (`0,8%` and `1.4 pontos`).
- Typos observed in FAQ answers: `Será necesário` (missing `s`), `disponbilização` (missing `i`), `insituição` ×2 (missing `t`), `varios` (missing accent), `questionario` (missing accent), `Quais compras… geram Milhas` with inconsistent capitalisation. Several appear in the same Open Finance answer.
- `Nubank Croma` FAQ answer contains an orphaned bracket: "acumula automaticamente 0,8% de cashback (1.4 pontos por dólar em compras no cartão de crédito" — parenthesis never closed, same defect class as PayPal's payment-methods FAQ.

## T14 Voice, tone & accessibility

**Person and tense.** Second person singular `você` throughout, with the informal Brazilian object pronoun `te` used freely (`te ajudar`, `te avisar`, `te dar suporte`, `te colocam no controle`). Company voice is first-person plural, and frequently the colloquial **`a gente`** rather than `nós` — `Fale com a gente` [Talk to us], `avisar a gente` [tell us], "as perguntas e respostas que preparamos". `A gente` is markedly more informal than `nós` and is the single clearest register marker in the Portuguese.

**Register.** Warm, direct, contraction-friendly, and it **does not flatten as much as it should** as stakes rise. `Pronto!` [Done!] with an exclamation mark appears in transaction-limit flows. The Ultravioleta and Croma benefit copy is aspirational ("aproveitar o melhor da vida" [enjoy the best of life]).

But the security content **does** shift register correctly: the kidnapping answer, the scam-victim answer and the debt answers are flat, unexclaimed and direct. So the gradient exists where it matters most, even if the middle of the range is uniformly warm.

**`É como se…`** [It is as if…] as an explanation device (retroactive yield) and **`ou seja`** [that is] as an inline gloss connector are the two mechanisms that produce the "approachable financial language" this product is benchmarked for. Both work by **translating a mechanism into an experience** at the moment the mechanism is introduced, rather than by simplifying away the mechanism.

**Numbers as trust devices**: `130 milhões` (homepage) / `mais de 100 milhões` (FAQ) — inconsistent; `100% do CDI`; `120% do CDI`; `até 30% a mais que na poupança`; `R$ 15 mil` (Ultravioleta default Modo Rua limit); `R$ 5 mil` (Nu Limite Garantido cap). Awards are cited by body rather than by rank: Time's 100 Most Influential Companies, Fast Company's Most Innovative, Forbes' World's Best Banks.

**No `Oops!` equivalent.** No `Ops!` observed anywhere.

**Accessibility** `[observed]`

- **No accessibility statement was found** on any nubank.com.br page harvested. `[absent]` There is no WCAG reference, conformance claim, testing statement or accessibility contact route.
- **`Canal de atendimento em libras`** [Libras service channel] — a Brazilian Sign Language video-relay channel at `acessibilidade.nubank.callvideo.io`, linked from the footer and from the security hub's contact block. The FAQ `O Nubank tem atendimento em Libras?` gives its hours: Monday–Friday, excluding national holidays, 08:00–20:00. This is a substantive accessibility service, and the subdomain is literally `acessibilidade`. It is, however, **filed under contact channels rather than under any accessibility heading**, and its hours are narrower than the 24-hour chat.
- **`NuBraille`** — a named accessible-card programme "voltada para pessoas cegas ou com baixa visão" [aimed at blind and low-vision people]. It is surfaced at the foot of the card page with a `Saiba mais` linking to a **blog post**, not to a product or accessibility page. The alt text of the accompanying image describes the physical feature: "nome do proprietário do cartão escrito e também em braille" [the cardholder's name written and also in Braille]. A real inclusive-design programme documented only in editorial content.
- **Alt text is exceptionally detailed** — the best in this five-product batch. Examples: "Mulher negra de cabelos cacheados e grisalhos sentada em um sofá e sorrindo, segurando com a mão esquerda um celular em direção a um homem negro, careca, com barba grisalha, sentado ao seu lado no chão…" [Black woman with curly greying hair seated on a sofa, smiling, holding a phone in her left hand towards a bald Black man with a greying beard seated beside her on the floor…]. Descriptions name race, hair, clothing, posture, setting and action. For decorative marketing photography this is arguably **over-described** — a screen-reader user gets a 40-word scene description for an image that carries no information — but it reflects a deliberate, well-resourced practice and it consistently describes people of colour rather than defaulting.
- **Defect: alt text `kalkalkalka`** appears on a homepage image in the "130 million" scrolling band — placeholder keyboard-mash shipped to production.
- **Defect: the "130 milhões" band is duplicated ~15 times in the DOM** (marquee/responsive repetition). A screen-reader user encounters `Junte-se aos` / `130 milhões` / `que já escolheram` / `o Nu.` fifteen times consecutively, each with a full scene description attached. Same defect class as Chime's badge carousel, at greater length.
- **Defect: blog carousels duplicate their entire six-card set** on every page, so each blog headline and each `Leia aqui` appears twice.
- Several links render with the **raw URL as the link text** (`https://app.nubank.com.br/roubo/`, `https://denunciargolpes.nubank.com.br/…`, social links in the footer) — URLs read aloud character by character instead of a label.
- `Ver mais` [See more] and `Leia aqui` [Read here] as repeated, object-less link text.

**Negative findings, recorded honestly**

1. **No accessibility statement.** A Libras channel and a Braille card programme exist but are undocumented as an accessibility commitment.
2. **The legal form (`Instituição de Pagamento`) is never reconciled with the brand name ("Nubank")** on any page harvested. It appears only in the footer copyright line. No "we are not a bank" equivalent to Chime's or Wise's disclosure.
3. **FGC coverage limit not stated** in the safety FAQ.
4. `130 milhões` (homepage) vs `mais de 100 milhões` (FAQ) — two scale figures.
5. Three names for the global-logout control in an emergency flow.
6. `Segurança` / `Central de Proteção` mid-rename, with the ambiguity shipped into every security instruction as a conditional.
7. `Nubank+` still present in live FAQ titles after the `Croma` rename.
8. `Conheça` shipped both bare and object-bearing on one page; `Saiba Mais`/`Saiba mais` and `Confira (as) perguntas frequentes` capitalisation/article drift.
9. Decimal separator mixed within a single cashback sentence.
10. Unclosed parenthesis in the Croma cashback answer.
11. Multiple spelling errors in FAQ answers (`necesário`, `disponbilização`, `insituição` ×2).
12. `kalkalkalka` placeholder alt text in production.
13. "130 million" band duplicated ~15× in the DOM with full alt descriptions.
14. Raw URLs used as link text in the footer and security hub.
15. `/perguntas` returns as an undifferentiated text wall with only the first group's answers expanded.
16. `/taxas` returned empty — no consolidated fee schedule reachable.

---

## Transferable patterns

1. **Name the emergency destination in the victim's own words, and put it on the homepage.** `Me Roubaram` [I was robbed] — first person, past tense, reachable without the app, first action named `Sair de tudo` [Get out of everything]. The strongest single UX-content decision in this batch. Condition: only works if the destination genuinely functions without the lost device.
2. **Coin the safety feature after the threat's *location*, not its mechanism.** `Modo Rua` [Street Mode], with `modo de descanso` [rest mode] as its complement. Users cannot reason about "geofenced transaction limits"; they can reason about being on the street.
3. **Put safety above the money, explicitly, in the copy.** "você não reaja e preze pela sua segurança acima de tudo" [do not react and value your safety above all else] — stated before the recovery procedure in the express-kidnapping answer. Any product operating where coercion is a real threat should say this out loud.
4. **Decouple rejection from moral judgment, with a statistic.** "a maioria dos pedidos recusados não acontecem por problemas… mas sim por simples falta de informações públicas disponíveis" [most rejections are not from problems but from a simple lack of available public information]. Directly applicable to any credit or verification decline.
5. **Warning copy that disclaims the accusation and hands back the decision.** "Isso não quer dizer que a pessoa… tenha realizado alguma irregularidade… Dessa forma, você pode decidir se quer ou não seguir." Protects the flagged third party, states the motive, and does not block. The best risk-warning construction in this corpus.
6. **Permission copy: name → capability → negate the scariest inference.** "Nenhuma dessas permissões autoriza que o conteúdo das suas conversas seja acessado pelo Nubank." Address the specific fear, not the general policy.
7. **Gloss inline with `ou seja` and explain by equivalence with `é como se`.** "anonimizados, ou seja, sem identificação pessoal" · "É como se o seu dinheiro estivesse rendendo desde o primeiro dia." Approachability comes from translating at the point of use, not from removing the concept.
8. **Separate "the regulator requires this" from "we built this"** in one comparative answer (`Modo Rua` vs `limite Pix`). Prevents misattribution of mandated restrictions and lets you claim genuine credit.
9. **Publish all branch outcomes before the user acts.** The three reactivation results, each with its own next step, remove the ambiguity of a single "we'll review it".
10. **Write the defence for your own research recruitment.** `Como confirmar que um convite de pesquisa é mesmo do Nubank?` with a verification code. Almost no company treats its research ops as a phishing surface.
11. **Negative pattern — do not let a security-feature rename ship as a conditional.** "clique em 'Segurança' ou em 'Central de Proteção', se ela já aparecer para você" appears in multiple emergency instructions. Every branch in safety copy is a place a panicking user stops.

## Caveats & gaps

- **`nubank.com.br/taxas` returned empty and is recorded as blocked.** No consolidated fee or tariff schedule was reached. T10 is assembled from product-page claims and FAQ answers, so the fee-disclosure analysis in this file is materially less complete than for Venmo, PayPal, Chime or Kuda. A repeat pass should target `/taxas`, `/contratos` and the `Convenção de Boletos` PDF.
- **`/perguntas` renders as an undifferentiated concatenated block.** Only the first group (`O Nubank`) returned expanded answers; the remaining twelve groups returned question titles only. Hundreds of question titles are therefore captured but their answers are not. Where an answer is quoted in this file it came from a product-page or security-page FAQ block, not from the hub.
- **All in-product strings are `[documented]`, not observed.** Button names (`Sair de tudo`, `Recebi o Cartão`, `Ativar Modo Rua`, `Pronto`), screen names and state labels are reconstructed from FAQ prose. The three-way divergence on the logout control is direct evidence that this prose has drifted from the product.
- **Empty states entirely unreachable.** `[absent]`
- **No accessibility statement exists to harvest.** The Libras channel and NuBraille are recorded from a footer link and a blog link respectively.
- **NuBraille documented only via a blog post**, which was not fetched; the programme is named here from the card page's link text and image alt text.
- **Nu Empresas, Ultravioleta, Croma, NuCel, NuPay, Seguros, Investimentos and Cripto product pages unharvested.** FAQ titles for these areas are captured; their content is not.
- **English glosses in this file are working translations for a non-Portuguese reader.** They are not Nubank's own English strings and should not be treated as approved terminology. Nubank's actual English-language copy lives at nu.com/us and nu.com/global, neither of which was harvested.
- **Brazilian-market context is load-bearing.** `Pix`, `CPF`, `CDI`, `boleto`, `TED`, `FGC`, `BACEN`, `LGPD`, `nome sujo`, `boletim de ocorrência`, `sequestro relâmpago` and `Ouvidoria` are all local institutions or instruments. Patterns from this file transfer as *structural* moves, not as strings — the effectiveness of `Modo Rua` depends on a threat environment that does not exist identically elsewhere.
- **Mobile app copy out of scope**; Nubank is app-first and the great majority of its interface was not observable.

## Sources

1. https://nubank.com.br/
2. https://nubank.com.br/nu/conta
3. https://nubank.com.br/nu/cartao
4. https://nubank.com.br/ajuda-e-seguranca
5. https://nubank.com.br/ajuda-e-seguranca/central-de-protecao
6. https://nubank.com.br/perguntas
7. https://nubank.com.br/taxas — **blocked, returned empty**
