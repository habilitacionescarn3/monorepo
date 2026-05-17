# Light Discovery — Competitor / Reference-Product Research

> **Status:** Research snapshot — 2026-05-17
> **Branch:** `claude/research-competitor-product-sPy0Y`
> **Subject:** Light (https://light.inc) — AI-native finance platform / "Smart Financial Platform"
> **Why:** Light is the closest existing build to what we want for Afframe. It is **not a
> direct competitor** — Light serves global/US multinationals; Afframe targets Czech
> accounting offices under Czech/EU law — but their **platform model, product surface,
> design, flows, AI architecture and developer story** are a reference blueprint.
>
> **Tracking note:** Per `docs/plans/README.md` the canonical home for this is a Linear
> project (**"Light Discovery"**, team Afframe / `AFF`). The `mcp__linear__*` server is
> **not connected in this session**, so the Linear project + issues could not be created
> automatically. Section 14 below contains the ready-to-create issue backlog; see the
> handoff note at the end of this file.

---

## 1. Executive summary

Light is a Copenhagen-based, AI-native finance platform founded in 2022 by Jonathan
Sanders (CEO, ex-Pleo / founder of Juni) and Filip Kozjak (CTO, ex-Pleo). It has raised
**$43M total** ($13M seed 2024, $30M Series A Sep 2025, led by Balderton; Atomico, Cherry
Ventures, Seedcamp, Entrée Capital). It reports **$1.2M ARR in 6 months** and **~30x
growth** in 12 months. Early customers are AI-native scaleups: **Lovable, Sana, Legora**.

Light's thesis: traditional ERPs (SAP, NetSuite, Business Central, QuickBooks, Xero) were
built for the industrial/secondary sector and are clunky, slow to implement and AI-bolted-on.
Light rebuilt the **general ledger from scratch with AI at the core** and calls the new
category a **Smart Financial Platform (SFP)** — and increasingly an **"agentic ledger"**.
It unifies GL, AR, AP, expenses, corporate cards, procurement, budgeting, bookkeeping,
revenue recognition, bank reconciliation and consolidated reporting in one system, with
**Slack/Teams as a primary interface** and a real public **REST API** (`api.light.inc/v1`).

**What is most worth borrowing for Afframe:** (a) the SFP/"rebuilt ledger" narrative and
category framing; (b) the chat-first (Slack/Teams) operating surface; (c) AI pre-accounting
from source documents/contracts; (d) the immutable, performant ledger; (e) the
content/SEO + community engine (versus-pages, glossary, FinanceHQ, FinHack hackathons);
(f) an API-first, `llms.txt`-friendly developer story. See Section 13.

---

## 2. Company snapshot

| Field | Detail |
|---|---|
| Product / site | Light — https://light.inc · app at `app.light.inc` |
| Founded | 2022 (incorporated 2023; exited stealth June 2024) |
| HQ | Copenhagen, Denmark |
| Founders | Jonathan Sanders (Co-founder/CEO), Filip Kozjak (Co-founder/CTO) |
| Founder background | Sanders: Credit Suisse → Head of Payments at Pleo → founder of Juni (raised $280M+) → Light. Kozjak: Asseco SEE, Pleo; MSc Computer Science, Univ. of Zagreb |
| Funding total | ~$43M |
| Seed | $13M / ~€12M, June 2024 — Atomico, Cherry Ventures, Seedcamp, Entrée Capital |
| Series A | $30M / ~€25M, 25 Sep 2025 — led by **Balderton Capital** |
| Notable angels | Thomas Wolf (Hugging Face co-founder), Charles Songhurst (Meta board) |
| Reported traction | $1.2M ARR in 6 months; ~30x growth in 12 months; customers cut finance-ops time ~84% vs legacy ERP |
| Named customers | Lovable, Sana, Legora (AI-native European scaleups) |
| Team origin | Engineers from Spotify, Google, Klarna, AWS, Booking.com, Shopify; advised by ex-leaders from Workday, SAP, Oracle, MS Dynamics |
| Series A use of funds | New **York office**, triple engineering team by Q2 2026, launch a "process-optimization workbench", build out deployment team |
| Infra partners | JP Morgan, Adyen, BDO; treasury via Atlar; tax via Avalara |

> **US relevance:** Light is EU-built but explicitly opening a New York office and selling a
> multi-tax engine covering **US, UK and Europe**. The product the user found "for the USA"
> is most plausibly Light positioning into the US market. The true US-native direct
> competitors are **Rillet, Campfire, Puzzle, Digits, Everest** (Section 12).

---

## 3. Positioning & manifesto

Light's `/manifesto` page argues for a new software category:

- **"ERP is broken."** ERPs are clunky, take forever to implement, have poor support and
  dubious ROI. They were designed for the **secondary (industrial) sector**; since the
  2000s the **tertiary (services) sector** has grown an order of magnitude faster and is
  badly served by production-era ERP.
- **The new category: Smart Financial Platform (SFP)** — a product category dedicated to
  accounting, bookkeeping, reporting and financial flows for service-sector businesses.
- **AI-native, not AI-bolted-on.** Competitors add AI features to decades-old architecture;
  Light rebuilt the GL from scratch so the database design and UX are themselves shaped by
  AI. Light calls this **"organic software" that evolves and improves over time**.
- **The "agentic ledger".** CEO framing has shifted from "AI-powered general ledger" toward
  **"the agentic ledger"** — AI agents that *do the work*, not just report on it.
- Tagline family seen across the site: *"Run AR, AP, bookkeeping and financial reporting
  automatically across all entities — without the chaos of multiple systems."*

**Takeaway:** Light wins attention with a *category-creation* narrative, not a feature list.
Afframe should decide its own one-line category claim for the Czech accounting-office market.

---

## 4. Product surface (modules)

Light is one platform with native modules (no bolt-on third parties needed):

| Module | What it does |
|---|---|
| **General Ledger** | Central double-entry ledger; AP/AR invoices, payments, journal entries post here as transactions. **Immutable once posted** (audit-proof). Live ledger-impact preview when debits/credits balance. Reconciliation/clearing accounts (AP offset, AR clearing). |
| **Accounts Receivable** (`/products/accounts-receivable`) | Auto-create multi-currency invoices from products; AI extracts billing schedules/terms from contracts; **IFRS 15 / ASC 606 revenue recognition** via pre-built release templates; auto-reconcile AR against bank feed. |
| **Accounts Payable** | AI extracts invoice data, line items and tax codes; approvals routed through Slack/Teams; auto bank reconciliation. |
| **Expenses & reimbursements** (`/products/expenses`) | Receipt capture via Slack/Teams or email; AI categorization; real-time spend tracking; reimbursement approval flow; "My expenses" view in-app. |
| **Corporate / vendor cards** (`/products/virtual-Cards`) | Issue virtual employee & vendor cards (Apple Pay / Google Pay) globally — card issuing powered by **Adyen**; on swipe Light logs + AI-categorizes the txn and pings for a receipt. Limits per transaction/month/year. |
| **Procurement & vendor management** (`/products/vendor-management`) | Purchase orders, approval workflows, invoice reconciliation; subscription/contract lifecycle (renewals, ramp-ups, discounts, up/downgrades); custom tasks & notes. |
| **Budgeting** | Native budgeting that leverages AI; build/iterate reports collaboratively. |
| **Reporting & consolidation** | One-click custom reports on customers/vendors/spend; multi-entity consolidated financials with real-time FX; instant drill-down; real-time carbon-footprint reporting with audit trail. |
| **Bookkeeping** | Automated multi-currency bookkeeping; AI pre-accounting; month-end close. |
| **Multi-tax engine** | Sell & report tax in US, UK, Europe — Avalara for US sales tax + Light's **proprietary VAT engine**. |
| **Light Bank Platform** | 500+ bank connections; uses host-to-host (H2H) bank data for accurate reconciliation. |

**Performance claim:** where legacy systems choke on ~1M records, Light claims **280M
records processed in <1s**, instant balance sheets, "up to 100x faster than NetSuite".

---

## 5. AI architecture & approach

- **AI at the core / "organic software".** AI shapes the platform from database design to
  UX; it's positioned as software that improves as it processes more of *your* data.
- **Immutable ledger** underpins trust: posted GL transactions cannot change → audit-proof
  records, and a reliable substrate for AI to reason over.
- **AI pre-accounting** — AI reads invoices and **contracts**, identifies payment terms,
  amounts, schedules, currencies, tax codes; auto-generates invoices and sets up revenue-
  recognition schedules. (`/help-center/understanding-ai-powered-contract-processing`)
- **Revenue recognition automation** — straight-line, percentage-of-completion,
  point-in-time (+ usage/milestone variants) via accounting-release templates.
- **AI as a teammate (Slackbot).** `@Light` in Slack answers both factual questions
  ("what's our hotel-spend policy?") and strategic business questions, and runs approvals.
- **Agents roadmap.** Light states it is "building AI infrastructure, including agents that
  will change how finance teams work day to day" — the "agentic ledger" direction.
- **Developer-facing AI.** Docs ship an `llms.txt` (`docs.light.inc/llms.txt`) so coding
  agents can be pointed at the API.

**Takeaway for Afframe** (which already has `AI-FINANCIAL-AGENTS-PLAN.md` / AFF-31): the
immutable-ledger + AI-pre-accounting + chat-surface combination is the validated pattern.
Note our CLAUDE.md domain rule — AI tool input schemas must NOT accept `organization_id` /
`user_id` / `role`; server-side injection only. Light's "agent as teammate" UX still has to
be built on top of that tenancy boundary.

---

## 6. UX, flows & channels

- **Chat-first operating surface.** Slack and Teams are not just notifications — they are a
  primary UI. Approvals, receipt upload, reimbursement submission, and Q&A all happen in
  chat (`/help-center/slack`, `/help-center/managing-reimbursements-using-the-slack-app`).
  - AP approval flow: bill submitted in Light → approver gets a Slack DM with key details +
    a link → approve in Slack or jump into Light.
- **Fast onboarding.** "Quick-start checklist"; most orgs complete setup "in a few hours".
  Connect Slack/Teams, HR & CRM (to onboard employees / add customers), and 500+ banks.
- **Migration as a wedge.** "Free, fully-managed NetSuite migration in 3 weeks — matched
  contract, zero downtime"; QuickBooks data migration guide. A dedicated deployment team.
- **Design language:** the public site presents as a modern, minimalist, high-craft SaaS
  marketing site; the product emphasizes "intuitive UX for complex finance ops" and
  one-click reporting with drill-down. *Exact visual system (type, color, motion,
  component patterns) could not be captured in this session — the site blocks automated
  fetching; a manual visual audit is required (see Section 15 / issue LD-12).*

---

## 7. Site architecture & content strategy

Light runs a large content/SEO + community machine. Discovered surface:

**Marketing site (`light.inc`)**
- `/` · `/platform` · `/manifesto` · `/switch` · `/careers` (+ role pages e.g.
  `/careers/infosec-cybersecurity-lead`) · `/partners` · `/security` · `/sox-compliance`
  · `/terms` · `/privacy` · `/dpa` · `/finhack` · `/help-center`
- Product pages: `/products/accounts-receivable`, `/products/expenses`,
  `/products/vendor-management`, `/products/virtual-Cards`
- **Versus / SEO pages:** `/versus/erp`, `/versus/quickbooks`, `/versus/netsuite`,
  `/versus/sap-netsuite`, `/versus/netsuite-business-central`, `/versus/business-central`,
  `/versus/xero`, `/versus/odoo`, `/versus/pe-accounting`
- **Glossary:** `/glossary/*` (accounts-payable, general-ledger, tangible-asset, …) —
  programmatic SEO for finance terms
- **Blog / thought leadership:** `/blog/*` (AP automation, AR/AP bottlenecks, AI
  bookkeeping, CFO tooling, Adyen partnership, "Starsite" culture posts) and a
  `/futureledger/*` editorial series (e.g. "the hidden costs of global expansion")
- Campaign/landing pages: `/lean-finance-operations`, `/can-make-it`, `/cant-make-it`

**Subdomains**
- `app.light.inc` — the product (Auth0-backed login at `/auth/login`)
- `help.light.inc` — knowledge base (getting-started, org setup, user management, expense
  management, AP, AR, GL, reporting, bank reconciliation, revenue-compliance, integrations,
  AI features, security, employee corporate cards)
- `support.light.inc` — customer knowledge base
- `docs.light.inc` — developer API documentation
- `fhq.light.inc` — **FinanceHQ**, an invite-only community

**Community engine**
- **FinanceHQ** — invite-only, free, no-fees community of finance leaders at modern
  multinationals; runs under Chatham House Rule; biannual "Grand Gathering" events.
- **FinHack** — "Light × Lovable" Global Finance Hackathon Tour (co-sponsors include
  QuantumBlack/McKinsey, J.P. Morgan, Abacum, Greenstep). Half/full-day events in
  Stockholm, Berlin, Helsinki, New York; finance people build AI apps, CFOs judge.
- **Starsite** — quarterly company offsites in iconic cities (Lisbon, Valencia, London,
  Copenhagen, Rome) — also used as employer-brand content.

**Takeaway:** the moat here is *distribution*. Programmatic versus/glossary pages + an
owned community + hackathons generate pipeline cheaply. A scoped-down version is very
replicable for Afframe in the Czech market.

---

## 8. Developer / API surface

Light exposes a **real public REST API** — confirmed, not just marketing.

- **Docs:** `docs.light.inc` (e.g. `/getting-started/introduction`,
  `/api-reference/v1--accounting-documents/list-accounting-documents`).
- **Base URL:** `https://api.light.inc/v1/...`
- **Auth:** HTTP Basic — `Authorization: Basic <api_key>`.
- **Conventions:** JSON, **camelCase** fields; some fields are enums (documented as
  non-exhaustive); list endpoints support **sorting** + **filtering**.
- **Example — `GET /v1/accounting-documents`** (list accounting documents):
  - Sort fields observed: `companyEntityId`, `documentSequenceId`, `postingDate`,
    `valuationDate`, `documentDate`, `businessPartnerName`, `status`, `createdBy`,
    `createdAt`, `description`, `documentNumber`, `arDueDate`, `arOpenedAt`,
    `ctPerformedAt`, `ctStatus`, `ctAmount`, `ccAmount`.
  - Filter operators: `eq`, `ne`, `in`, `not_in`, `gt`, `gte`, `lt`, `lte`.
- **AI-friendly:** `docs.light.inc/llms.txt` documentation index for coding agents.
- **Integration model:** native integrations (e.g. Abacum FP&A) + customer-configured
  custom API integrations as a post-launch step.

**Inferred data model** (from API field names — to be verified): core entities are
`CompanyEntity` (legal entity for multi-entity), `BusinessPartner` (customer/vendor),
`AccountingDocument` (with `documentSequenceId` / `documentNumber`, posting vs valuation
vs document dates, status). `ar*` = receivable-side fields, `ct*` likely contract-related,
`cc*` likely corporate-card-related.

> **Caveat:** an earlier search conflated `docs.light.inc` with an unrelated billing
> company at `docs.light.dev`. The `api.light.inc/v1` endpoints above are the **correct**
> light.inc ERP API. Verify the full surface directly against `docs.light.inc/llms.txt`.

---

## 9. Integrations & infrastructure partners

| Area | Partners / detail |
|---|---|
| Workplace chat | Slack, Microsoft Teams (primary UX surface) |
| Banking | 500+ bank connections; **Atlar** for real-time balances/statements/payments + treasury ("native bank–ERP integration") |
| Card issuing | **Adyen** (virtual employee & vendor cards, global) |
| Banking infra | J.P. Morgan |
| Audit / accounting | BDO |
| Tax | Avalara (US sales tax) + Light proprietary VAT engine |
| FP&A | Abacum (native integration) |
| HR & CRM | Generic HR/CRM connectors for employee/customer onboarding |
| Migration sources | NetSuite, QuickBooks (managed migrations) |

---

## 10. Security & compliance

- **SOC 2 Type II** — audited annually by Big-Four firms, 6-month testing window.
- **GDPR** — Data Processing Agreement; 30-day subprocessor notice + right to object;
  EU Standard Contractual Clauses + technical/organizational measures for non-EEA transfer.
- **Hosting** — AWS, servers in the EU; cloud providers must be SOC 2 + ISO 27001;
  backups in multiple locations.
- **Encryption / identity** — SSL in transit; auth handled by **Auth0**; secrets in AWS
  Secrets Manager (PCI + SOC 2).
- Public `/sox-compliance` page — signals enterprise/IPO-track positioning.
- They are hiring an InfoSec / Cybersecurity Lead.

**Note for Afframe:** Light hosts in the EU and is SOC 2 Type II — a relevant bar for a
Czech/EU accounting product. Maps cleanly onto our AWS `eu-central-1` setup (ADR-0007).

---

## 11. Pricing & GTM motion

- **No public pricing.** Pricing is **annual, in EUR, ex-VAT**; obtained via "contact
  sales" / demo. Implies a sales-led, mid-market+ ACV motion.
- GTM wedges: free managed migration off NetSuite/QuickBooks; versus-pages capturing
  switch intent; FinanceHQ community + FinHack hackathons for top-of-funnel; "lean finance
  operations" / headcount-efficiency messaging aimed at CFOs.
- ICP: multi-entity, multi-currency, hypergrowth service/SaaS companies (their own
  customers — Lovable, Sana, Legora — are AI-native scaleups).

---

## 12. Competitive landscape (US-native — the real "for USA" set)

Light is EU-origin. The genuinely US-native AI-ERP wave Afframe should also study:

| Player | Positioning |
|---|---|
| **Rillet** | AI-native ERP for hypergrowth SaaS scaling to IPO; multi-entity consolidation + complex rev-rec. |
| **Campfire** | AI-native ERP for mid-market tech replacing NetSuite; GL + billing + treasury. |
| **Puzzle** | AI-native accounting for startups + their accounting firms; automated txn processing, cash + accrual books in parallel. |
| **Digits** | AI accounting + in-house CPA service (~$350/mo); competes with bookkeeping firms. |
| **Everest Systems** | AI ERP for scaling SaaS; ASC 606 automation, complex billing. |
| Legacy incumbents | NetSuite, SAP S/4HANA, MS Dynamics Business Central, QuickBooks, Xero, Odoo, PE Accounting. |

Light's differentiators vs this set: chat-first UX, the immutable/performant ledger claim,
the SFP/agentic-ledger category narrative, and the community/hackathon distribution engine.

---

## 13. What Afframe can actually use

Mapped to our stack (Czech accounting-office product; tenancy = Workspace [office] /
Organization [client book]; `Money<Currency>` in CZK; `FxRate`; Postgres 18 + FORCE RLS):

**Adopt directly**
1. **Category narrative.** Pick a sharp one-liner for the Czech accounting-office market
   instead of selling a feature checklist. Light's "ERP is broken → SFP" is the template.
2. **Immutable ledger.** Append-only, audit-proof posted transactions. Fits our
   `numeric(19,4)` / `Money` model and gives AI a trustworthy substrate.
3. **AI pre-accounting from source documents.** Extract amounts, dates, tax codes, VAT,
   counterparties from invoices/contracts → draft journal entries for human approval.
4. **Chat-first approvals & Q&A.** A Slack/Teams (or Czech-relevant channel) surface for
   approvals, document upload and natural-language questions over the client book.
5. **Migration-as-a-wedge.** Managed import from the incumbent Czech tools (e.g. Pohoda,
   Money S3, ABRA, Helios) as the primary acquisition path.
6. **API-first + `llms.txt`.** Public REST API with a clean data model and an `llms.txt`
   so our own and customers' coding agents integrate easily.
7. **Content/SEO + community engine.** Versus-pages, a finance/účetnictví glossary, and a
   Czech accountant community/event — cheap, durable distribution.

**Adapt for Czech/EU law (do NOT copy 1:1)**
- Tax engine: Light does US/UK/EU tax. Afframe needs Czech DPH (VAT), kontrolní hlášení,
  EU VAT / OSS, and Czech statutory chart-of-accounts + reporting — a different engine.
- Revenue recognition: IFRS 15 / ASC 606 templates are useful conceptually, but Czech
  statutory accounting (České účetní standardy) is the binding requirement.
- Multi-entity "CompanyEntity" maps to our **Organization** (client book) tier; Light has
  no equivalent of our **Workspace** (accounting-office) tier — that is Afframe's edge,
  and tenancy isolation (FORCE RLS, `current_setting('app.organization_id')`) must hold.

**Watch / decide later**
- Card issuing (Adyen) and treasury (Atlar) are out of initial scope for an
  accounting-office tool — note as possible long-term, not now.
- "Agentic ledger" autonomous posting: keep human-in-the-loop until the immutable ledger
  + approval UX is proven (cf. AFF-31 AI financial agents plan).

---

## 14. Proposed Linear project "Light Discovery" — issue backlog

To be created in Linear team **Afframe (`AFF`)**, new project **"Light Discovery"**.
Suggested epics + issues (priority: P1 = do first):

**Epic LD-A — Deep-dive verification (hands-on)**
- `LD-1` *(P1)* Get a Light demo / trial account; capture real product screenshots & flows.
- `LD-2` *(P1)* Visual/UX audit of `light.inc` + `app.light.inc`: design system, type,
  color, motion, component patterns, IA — what to emulate.
- `LD-3` *(P2)* Full read of `docs.light.inc` + `llms.txt`: map the complete API surface,
  data model, auth, webhooks, rate limits.
- `LD-4` *(P2)* Walk every `help.light.inc` flow; document onboarding, AP/AR, close,
  reporting step-by-step.

**Epic LD-B — Positioning & strategy**
- `LD-5` *(P1)* Draft Afframe's category one-liner + manifesto, modeled on Light's SFP
  framing but for Czech accounting offices.
- `LD-6` *(P2)* Competitive matrix: Light vs Rillet/Campfire/Puzzle/Digits/Everest vs
  Czech incumbents (Pohoda, Money S3, ABRA, Helios) — features, pricing, ICP.
- `LD-7` *(P3)* Pricing-model study: annual/contact-sales vs self-serve for our market.

**Epic LD-C — Product patterns to spec**
- `LD-8` *(P1)* Spec an immutable/append-only ledger for Afframe (`Money`/`numeric(19,4)`,
  posting vs valuation dates, clearing accounts) — ADR candidate.
- `LD-9` *(P1)* Spec AI pre-accounting: document/contract extraction → draft journal
  entries with human approval (ties to AFF-31).
- `LD-10` *(P2)* Spec the chat-first approval & Q&A surface (channel TBD for Czech market).
- `LD-11` *(P2)* Spec managed migration from a Czech incumbent as the acquisition wedge.

**Epic LD-D — Go-to-market patterns**
- `LD-12` *(P3)* Evaluate a content engine: versus-pages + Czech účetnictví glossary.
- `LD-13` *(P3)* Evaluate a community/event play (FinanceHQ / FinHack analog for CZ).

**Epic LD-E — Developer & trust**
- `LD-14` *(P2)* Decide Afframe's public API + `llms.txt` strategy, modeled on Light's.
- `LD-15` *(P3)* Compliance roadmap: SOC 2 Type II + GDPR posture vs Light's bar.

---

## 15. Gaps & open questions (could not be resolved this session)

The environment's network policy **blocks automated fetching** of `light.inc`, news sites
and the Wayback Machine (HTTP 403 / blocked). All findings above come from web-search
summaries, which are second-hand. Before acting on this, verify hands-on:

1. **Visual design** — type system, color tokens, motion, component library, exact
   homepage hero copy. Needs a manual browser visit / screenshots (LD-2).
2. **Full API surface** — only `GET /v1/accounting-documents` was confirmed; webhooks,
   write endpoints, rate limits, OAuth-vs-Basic specifics unverified (LD-3).
3. **Pricing numbers** — none public; needs a sales conversation (LD-7).
4. **In-app flows** — onboarding, close, consolidation walked only via help-center
   summaries, not the live app (LD-1, LD-4).
5. **`docs.light.inc` vs `docs.light.dev`** — confirm there is no remaining conflation
   with the unrelated billing company also branded "Light".

---

## 16. Sources

Company / funding:
- https://light.inc/light-announces-30-million-funding · https://light.inc/light-announces-13-million-funding
- https://techcrunch.com/2024/06/12/let-there-be-light-danish-startup-exits-stealth-with-13m-seed-funding-to-bring-ai-to-general-ledgers/
- https://www.balderton.com/news/light-raises-30m-series-a-to-replace-legacy-finance-systems-with-ai-native-platform/
- https://atomico.com/insights/30m-series-a-for-light-building-the-global-leader-in-modern-erp
- https://seedcamp.com/views/light-secures-13m-scale-the-first-ai-powered-general-ledger-for-automating-global-company-finances/
- https://www.cnbc.com/2025/09/25/ai-finance-startup-light-raises-funding-from-revolut-backer-balderton.html
- https://siliconcanals.com/light-raises-12m/ · https://tracxn.com/d/companies/light

Product / positioning:
- https://light.inc/manifesto · https://light.inc/platform · https://light.inc/versus/erp
- https://light.inc/products/accounts-receivable · /products/expenses · /products/vendor-management · /products/virtual-Cards
- https://help.light.inc/ · https://help.light.inc/general-ledger/understanding-general-ledger
- https://light.inc/help-center/slack · /help-center/understanding-ai-powered-contract-processing

Developer:
- https://docs.light.inc/getting-started/introduction
- https://docs.light.inc/api-reference/v1--accounting-documents/list-accounting-documents
- https://docs.light.inc/llms.txt

Integrations / community / competitors:
- https://www.atlar.com/blog/light-and-atlar-partner-to-create-the-first-end-to-end-ai-native-finance-stack
- https://light.inc/blog/seamless-global-spend-see-the-light-x-adyen-partnership
- https://fhq.light.inc/ · https://light.inc/finhack
- https://www.g2.com/products/light/reviews
- https://puzzle.io/blog/best-ai-accounting-software · https://www.numeric.io/blog/rillet-vs-campfire
