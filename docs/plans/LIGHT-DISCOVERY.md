# Light Discovery — Competitor / Reference-Product Research

> **Status:** Research snapshot — 2026-05-17
> **Branch:** `claude/research-competitor-product-sPy0Y`
> **Subject:** Light (https://light.inc) — AI-native finance platform / "Smart Financial Platform"
> **Why:** Light is the closest existing build to what we want for Afframe. It is **not a
> direct competitor** (Light serves global/US multinationals; Afframe targets Czech
> accounting offices under Czech/EU law) but its **platform model, product surface,
> design, flows, AI architecture and developer story** are a reference blueprint.

---

## 0. How this research was done (and its confidence level)

The session environment egresses through an **allowlist proxy**. `light.inc`, news sites
and the Wayback Machine are all blocked (`HTTP 403 host_not_allowed`), so the live site
and `docs.light.inc` could not be fetched directly. **GitHub is allowlisted**, and Light
publishes a large amount of primary material there.

Most of this document is therefore **primary-source** — read directly from Light's own
public GitHub repositories under the **`light-space`** org:

- **`light-space/help-articles`** — Light's *complete* help center: 162 articles + 20 IFRS
  policy docs, in Markdown. This is the canonical product documentation.
- **`light-space/light-mcp`** — Light's *official* MCP server, published as a Claude Code
  plugin.

Sections drawn from those repos are high-confidence. Company/funding/positioning facts
come from web search of press coverage (second-hand). Visual design specifics still need a
hands-on browser pass (see Section 17).

---

## 1. Executive summary

Light is a Copenhagen-based, AI-native finance platform founded in 2022 by Jonathan
Sanders (CEO, ex-Pleo, founder of Juni) and Filip Kozjak (CTO, ex-Pleo). It has raised
**$43M total** ($13M seed 2024; $30M Series A Sep 2025, led by Balderton, with Atomico,
Cherry Ventures, Seedcamp, Entrée Capital). It reports **$1.2M ARR in 6 months** and
**~30x growth** in 12 months; named customers are AI-native scaleups **Lovable, Sana,
Legora**. Series A is funding a **New York office** and tripling engineering by Q2 2026.

Light's thesis: legacy ERPs (SAP, NetSuite, Business Central, QuickBooks, Xero) were built
for the industrial economy and are slow, clunky and "AI-bolted-on". Light **rebuilt the
general ledger from scratch with AI at the core** and calls the category a **Smart
Financial Platform (SFP)** — and, increasingly, **"the agentic ledger"**.

The product unifies GL, AR, AP, expenses, corporate cards, procurement, budgeting,
bookkeeping, revenue recognition, bank reconciliation, fixed assets and consolidated
reporting in one system. Two architectural ideas stand out:

1. **The immutable ledger** — *accounting documents* are mutable; the *transactions* they
   post to the GL are immutable. Editing a posted document triggers an automatic
   reverse-and-repost. (Section 6.)
2. **LCI — the Light Command Interface** — an MCP-powered, role-aware AI assistant with
   **31 tools** that works identically in the web app, mobile, Slack and Teams; it can
   search, approve bills, generate reports via text-to-SQL, query policy, request cards
   and submit expenses. Light also ships an **official MCP server + Claude Code plugin**
   so external AI agents can drive the platform. (Sections 7–8.)

**Most worth borrowing for Afframe:** the immutable-ledger design; the chat-first/LCI
operating surface; AI pre-accounting from source documents and contracts; the API-first +
MCP + open-docs developer story; and the content/SEO/community growth engine. The single
place Afframe is *already ahead*: tenancy. Light uses shared-DB tenant-ID scoping and
admits roles cannot be scoped to entities; Afframe's Workspace/Organization FORCE-RLS
model is a genuine structural advantage for the accounting-office market. (Sections 11, 18.)

---

## 2. Company snapshot

| Field | Detail |
|---|---|
| Product / site | Light — https://light.inc · app at `app.light.inc` |
| Founded | 2022 (incorporated 2023; exited stealth June 2024) |
| HQ | Copenhagen, Denmark; New York office opening (Series A) |
| Founders | Jonathan Sanders (Co-founder/CEO), Filip Kozjak (Co-founder/CTO) |
| Founder background | Sanders: Credit Suisse → Head of Payments at Pleo → founder of Juni ($280M+ raised) → Light. Kozjak: Asseco SEE, Pleo; MSc CS, Univ. of Zagreb |
| Funding total | ~$43M |
| Seed | $13M / ~€12M, June 2024 — Atomico, Cherry Ventures, Seedcamp, Entrée Capital |
| Series A | $30M / ~€25M, 25 Sep 2025 — led by **Balderton Capital** |
| Angels | Thomas Wolf (Hugging Face co-founder), Charles Songhurst (Meta board) |
| Reported traction | $1.2M ARR in 6 months; ~30x growth in 12 months; customers cut finance-ops time ~84% vs legacy ERP |
| Named customers | Lovable, Sana, Legora |
| Team origin | Engineers from Spotify, Google, Klarna, AWS, Booking.com, Shopify; advised by ex-leaders of Workday, SAP, Oracle, MS Dynamics |
| Series A use of funds | New York office; triple engineering by Q2 2026; "process-optimization workbench"; deployment team |
| Infra / partners | AWS (EU); Auth0; J.P. Morgan, Adyen, BDO; treasury via Atlar; tax via Avalara/AvaTax |

> **Name-collision warnings.** (a) `docs.light.dev` is an *unrelated* billing-API company
> also branded "Light" — ignore it; the ERP's docs are at `docs.light.inc`. (b) "Legora"
> is a separate legal-AI company that is a *customer* of Light, not Light itself.

---

## 3. Positioning & manifesto

From `light.inc/manifesto` and the `1-1-what-is-light` article:

- **"ERP is broken."** ERPs are clunky, slow to implement, poorly supported, dubious ROI.
  They were designed for the **secondary (industrial) sector**; the **tertiary (services)
  sector** has since grown an order of magnitude and is badly served.
- **New category: Smart Financial Platform (SFP)** — software dedicated to accounting,
  bookkeeping, reporting and financial flows for service-sector businesses.
- **AI-native, not AI-bolted-on.** Competitors add AI to decades-old architecture; Light
  rebuilt the GL so the data model and UX are shaped by AI ("organic software").
- **"The agentic ledger."** The CEO's framing has moved from "AI-powered general ledger"
  toward AI agents that *do the work*.
- Self-description: *"an AI-native financial platform built for multinational companies
  and hypergrowth SaaS businesses … that replaces legacy platforms like NetSuite."*
- ICP: multi-entity, multi-currency companies that want to *scale accounting without
  hiring more accountants*.

**Takeaway:** Light leads with category creation, not a feature list. Afframe should pick
its own sharp one-line category claim for the Czech accounting-office market.

---

## 4. Product surface & app information architecture

Light is one platform; the web app's left sidebar (verified from the docs) groups it into
seven areas. Routes are real (`app.light.inc/...`).

| Sidebar group | Items (route) |
|---|---|
| **Personal** | Home `/dashboard`, Tasks `/user-tasks`, Expenses `/expenses`, Cards `/user-cards` |
| **Revenue & Invoicing** | Sales invoices `/invoice-receivables`, Customer credits `/customer-credits`, Contracts `/contracts`, Products `/products`, Customers `/customers` |
| **Spend management** | Bills `/payables`, Credit entries `/credit-entries`, Reimbursements `/reimbursements`, Cards `/cards`, Purchase orders `/procurement/purchase-orders`, Vendors `/vendors` |
| **Accounting** | Releases `/releases`, Transactions `/ledger-transactions`, Journal entries `/journal-entries`, Accounting documents `/accounting-documents`, Bank reconciliation `/bank-reconciliation`, Chart of accounts `/accounting/ledger-accounts`, Accounting periods `/accounting/accounting-periods`, Tax codes `/accounting/ledger-tax-codes` |
| **Planning & Reports** | Reports `/ledger-reports`, Budget `/budget` |
| **Business partners** | Customers, Vendors, Users `/users` |
| **Settings** | API keys, Integrations, Organization settings, Profile, Workflows, Jobs; Records (bank accounts, entities, custom properties, release templates, tax tables, templates); Guardrails (Payables, Policies) |

**Module coverage** (help-center sections 1–16, 162 articles):

- **General Ledger** — multi-entity, multi-currency, immutable (Section 6); FX
  revaluations, intercompany documents, clearing/FX gain-loss/CTA, period & year-end close.
- **Accounts Receivable** — customers/contacts, contracts, products & pricing, invoice
  generation/templates, sending + reminders, payment tracking, customer credits, revenue
  schedules / deferred revenue, multi-entity AR, AR aging.
- **Accounts Payable** — vendors, vendor portal (magic links), bill ingestion, AI invoice
  extraction, bill approval workflows, payment scheduling/execution, multi-currency
  payments, vendor credit notes, employee reimbursements, purchase orders, AP aging.
- **Expense management & cards** — submit via Slack/Teams/email/mobile; AI receipt
  categorization + tax assignment; approval & reimbursement workflows; **Light cards**
  (corporate + virtual, KYC via Adyen, Apple/Google Pay); expense policies & limits.
- **Bank reconciliation** — direct bank feeds, automated reconciliation, automation rules,
  discrepancy resolution, multi-currency, reconciliation reports.
- **Revenue recognition & compliance** — recognition rules, release configuration,
  accruals/prepayments/deferrals/depreciation, multi-currency revenue, ARR tracking,
  e-invoicing compliance, HMRC VAT, AvaTax US, audit-ready records.
- **Reporting & consolidation** — balance sheet, P&L, cash flow, trial balance, pivot
  reports, multi-entity + multi-currency consolidation, custom reports, budget scenarios,
  real-time dashboards/KPIs, ARR & SaaS metrics.
- **Fixed assets** — fixed-asset register.
- **Employee experience** — a separate doc track (24 articles) for non-finance staff:
  expenses/reimbursements, cards, purchase requests, approvals.

---

## 5. Onboarding, sandbox & migration

- **Quick-start checklist**; "go-live readiness / minimum viable setup"; most orgs set up
  "in a few hours".
- **Sandbox environments** exist for testing before go-live.
- **Migration as the wedge** — managed data migration from **NetSuite, QuickBooks, and
  e-conomic**, plus a generic data-import tool and a documented "cutover" procedure.
- Onboarding connects Slack/Teams, HR/CRM, and bank feeds.

---

## 6. The ledger & data architecture (the core idea)

This is Light's most distinctive engineering decision and the most directly reusable.

**Accounting documents (mutable) vs. transactions (immutable).**
- An **accounting document** (bill, sales invoice, bank payment, journal entry, card
  transaction, deferred entry, FX revaluation, year-end closing entry, credit note) is a
  *mutable* record that can be edited at any stage.
- When posted, a document generates **one or many immutable GL transactions** (individual
  debit/credit lines). Posted transactions can never be edited or deleted.
- **Editing a posted document does not edit the ledger.** The "accounting document engine"
  automatically (a) reverses the original transactions, (b) posts new ones — all atomic,
  all preserved for audit. Users never hand-write reversing entries.

**Document lifecycle state machine:** `DRAFT → POSTED → (PARTIALLY_CLEARED) → CLEARED →
ARCHIVED`. Only DRAFT documents are invisible to reports; POSTED+ are live.

**Posting process** (atomic — all-or-nothing): validate required fields & debit=credit
balance → assign unique document **sequence number** (`DOCTYPE/ENTITY/NUMBER`, e.g.
`AP/001/12345`) → expand multi-line documents → calculate tax → FX-convert to local/group
currency → post all lines to the ledger (the docs literally name a `ledger_transaction_line`
table) → flip status to POSTED. Typically 1–5 seconds.

**Other model facts:** documents carry header (entity, posting date, document date,
currency, amount, business partner) + lines (GL account, amount, tax, cost-center/project
allocation, custom properties) + relationships (source PO/contract, cleared/matched docs,
workflow approvals). **Custom properties** ("dimensions") are user-defined tags posted with
every transaction. **Clearing/matching** links documents (bank rec, invoice↔payment,
intercompany) without mutating them.

**Posting-date rules worth noting:** a bill posts on its *invoice date* (must be in an open
period); card transactions can only post once the merchant has *settled* (1–3 days).

**Why it matters for Afframe:** this cleanly separates a friendly, editable UX from a
trustworthy, append-only ledger. It fits our `Money<Currency>` / `numeric(19,4)` model and
gives AI agents a substrate they cannot silently corrupt. Strong ADR candidate.

---

## 7. AI architecture & LCI (the "agentic" layer)

### 7.1 How Light uses AI

- A **unified GenAI framework** routes to **multiple model providers** — OpenAI, Google
  Cloud AI, AWS AI services — chosen per task and per customer config. Internal modules:
  *AI Parsing Module* (document extraction), *AI Commons* (prompts, threads, history).
- AI surfaces: document parsing/extraction (OCR + LLM on PDFs/images), receipt capture +
  categorization + tax-code assignment, invoice/bill processing, data cleaning & anomaly
  detection (duplicates, inconsistent vendor names, outlier amounts), reconciliation
  match-suggestion, and natural-language Q&A.
- **Governance posture (notable):** AI is **advisory / non-decision-making** — every AI
  output is subject to human review. Light **does not train or fine-tune models on
  customer data**; customer data is used for runtime inference only. Light self-classifies
  as **"Limited Risk" under the EU AI Act** and aligns to **OECD AI Principles**.
- Claimed impact: ~80–90% of invoice data entry automated; receipts filled "within
  seconds".

### 7.2 LCI — Light Command Interface

LCI is Light's built-in AI assistant and the heart of the "agentic ledger". Key facts,
verbatim from the docs:

- **One assistant, four surfaces:** web app, mobile, Slack, Microsoft Teams — same
  orchestrator everywhere. It is the engine behind `@Light`.
- **MCP-powered.** "Powered by the Model Context Protocol."
- **31 tools**, grouped: Search (bills, vendors, customers, GL accounts, entities, POs,
  purchase requests, tax codes, users); Bill management (get/approve/reject/submit bills,
  update bill line, approval queue); Reports & query (**create report via text-to-SQL**,
  edit report, query policy, get DB schema); Navigation/help (deep-link to 32 entity
  types, list/read help articles); Expense & card (submit expenses, request vendor card);
  Business process (create journal entry, create PO); Assistant memory (get/update).
- **Orchestrator loop:** user message + user profile (name, roles, entity, currency) +
  role-filtered tool list → model picks tools → execute → model reviews → up to **5 tool
  rounds** → returns text + structured data (entity lists, report tables, nav links).
- **Conversation threads** persist for 1 hour; **file attachments** (≤10 files, ≤10 MB
  each) — e.g. "book these vendor invoices" (PDFs), "import these journal entries" (CSV).
- **Role-scoped.** Tools are filtered by the user's role; LCI refuses actions the role
  can't perform. Personal vs. company scope is inferred from phrasing ("my bills" vs "all
  bills").
- **Assistant memories** — admins set custom parsing instructions per category (contract /
  bill / reimbursement / intake parsing); one per type per company.
- **Slack/Teams depth:** interactive Approve/Deny/Add-Note/Start-Conversation buttons on
  bill notifications; reply-in-thread keeps bill context; proactive DMs (receipt
  processed/failed, reimbursement rejected/paid, missing card receipt); a **receipt
  router** that smart-routes an uploaded receipt to card-match vs reimbursement based on
  the user's roles.

**Takeaway for Afframe (ties to `AI-FINANCIAL-AGENTS-PLAN.md` / AFF-31):** LCI is a
near-complete spec for our AI agent layer. Note the alignment with our CLAUDE.md rule —
LCI passes the *role* to the model as context and filters tools **server-side**; the model
never supplies `organization_id`. That is exactly our "server-side injection only" rule.

---

## 8. The developer-agent story: Light's MCP server

Light ships an **official remote MCP server** and a **Claude Code plugin** (repo
`light-space/light-mcp`, MIT licensed). This is a deliberate "let external AI agents drive
the platform" strategy.

- MCP endpoint: `https://api.light.inc/rest/ext/mcp`; auth `Authorization: Bearer lmcp_…`.
- Tokens: personal, self-service in **Settings → Profile → MCP Tokens**, up to 20/user,
  revocable; MCP must be enabled per account.
- Distributed as a Claude Code plugin marketplace: `/plugin marketplace add
  light-space/light-mcp` → `/plugin install light-mcp@light-mcp`.
- Documented clients: **Claude Code, Claude Desktop, OpenCode, n8n**.
- MCP tools cover bills, vendors, cards, card transactions, expenses, accounts, users,
  tasks, policy, help articles — and **respect the user's existing RBAC roles** (no
  privilege escalation; tool list shrinks to the role).
- Privacy framing: "Your AI model runs on your machine. Light only receives the individual
  tool calls … No conversation history or AI output is ever sent to Light."

**Takeaway:** Afframe should plan its own MCP server + an `llms.txt` so customers' (and our
own) coding agents integrate natively. Light has made this table stakes.

---

## 9. Public REST API

From `docs.light.inc` and the `11-12-api-access` article — verified primary source.

- **Base URL:** `https://api.light.inc` (HTTPS only). JSON, **camelCase**. Enums documented
  but explicitly non-exhaustive ("handle unknown enum values gracefully").
- **Auth — two methods:**
  - **API keys** — created in Settings → API Keys; `Authorization: Basic YOUR_API_KEY`.
    Keys carry **roles**, exactly like users.
  - **OAuth 2.0** authorization-code flow (`/oauth/authorize`, `/oauth/token`, refresh
    tokens) for acting on behalf of users; set up via support.
- **Money:** amounts are integers **in cents** (`100000` = $1,000.00).
- **Resources (~25):** Accounting Documents, Attachments, Authorization, Bank Accounts,
  Card Transactions, Cards, Companies, Contracts, Credit Notes, Custom Properties, Customer
  Credits, Customers, Expenses, Invoice Approvals, Invoice Payables, Invoices, Journal
  Entries, Ledger Transactions, Ledger Accounts, Products, Purchase Orders, User Comments,
  Users, Vendors.
- **Querying:** sort `field:direction` (e.g. `documentDate:desc`); filter
  `field:operator:value` with operators `eq, ne, in, not_in, gt, gte, lt, lte` (`in` uses
  `|`); pagination `limit` (default 50, max 200), cursor-based (start cursor `0`).
- **Rate limits:** 300 req/min per key/token; 100,000 req/day per organization; `429` +
  `X-RateLimit-*` / `Retry-After` headers.
- Documented integration recipes: procurement→AP automation, CRM→invoicing,
  reporting-dashboard. Docs ship an `llms.txt` index for coding agents.

---

## 10. Roles & permissions model

12 predefined, **company-wide** roles (RBAC, cumulative permissions):
Admin, Controller, AP Clerk, AP Preparation, Invoice Approver, AR Clerk, Cardholder,
Vendor Management, Reimbursement, Report Viewer, Purchase Requester. Cardholder and
Reimbursement are deliberately independent.

**Important limitation, stated in their own docs:** roles **cannot be scoped to specific
entities** — a role applies across every entity in the company. Light's official
workaround is *"create separate Light companies for each business unit that needs isolated
access."* The same RBAC governs the web app, the API keys, and MCP.

---

## 11. Tenancy / multi-tenant model — and how Afframe differs

From the security architecture doc: *"Each company's data is **logically separated** using
tenant identifiers in a shared database architecture, with application queries scoped by
tenant ID."* I.e. **application-layer tenant scoping**, not database-enforced isolation.

**Contrast with Afframe (per CLAUDE.md / ARCHITECTURE):**

| | Light | Afframe |
|---|---|---|
| Isolation | App-layer `tenant_id` scoping, shared DB | **PostgreSQL FORCE RLS** via `current_setting('app.organization_id')` |
| Tenant tiers | One: "company" | Three: Global / **Workspace (accountant office)** / **Organization (client book)** |
| Entity-scoped roles | **Not possible** — must split into separate companies | Workspace/Organization GUCs + `withWorkspace`/`withOrganization`/`withAdminBypass` |

Afframe's model is a **structural advantage** for the accounting-office market: an
accounting office (Workspace) serving many client books (Organizations) is exactly the
shape Light cannot express — Light would force one separate "company" per client. This is
Afframe's defensible edge; do not regress it to copy Light.

---

## 12. Tax, VAT & e-invoicing (Czech-adaptation relevance)

- **Tax codes** carry: Sales/Purchase type, rate + effective rate, country, structured
  **label convention** (e.g. `P-DK-STD-25-DOM` = Purchase / Denmark / standard / 25% /
  domestic), an optional **EDIFACT** code, a **base report tag**, per-entity assignment,
  and **posting rules** (each rule routes a % of tax to a GL account + report tag).
- **VAT** numbers are configured per company entity.
- **E-invoicing via Peppol** — UBL XML; entities carry an **EAS code** + **e-invoice
  address** (Peppol participant ID); EDIFACT codes on tax codes classify tax treatment in
  e-invoices. Country tax compliance: **HMRC (UK) VAT returns**, **AvaTax (US)** sales tax.
- **Chart of accounts** — account number/name/status/group/category, per-entity
  availability, FX-revaluation flag; CSV/Excel bulk upload; **account defaults** for
  Rounding, FX gain/loss, FX unrealized, Sales discount, Bank fees, Bank clearing, CTA
  (currency translation adjustment), Elimination.

**For Afframe:** the *mechanism* (structured tax codes, posting rules, per-entity VAT,
account defaults, Peppol/EAS) is a solid model — but the *content* must be Czech: Czech
**DPH** rates, **kontrolní hlášení**, EU VAT/OSS, the Czech statutory chart of accounts and
**České účetní standardy**, and Czech e-invoicing (ISDOC + EU Peppol). Light's HMRC/AvaTax
modules are not reusable; the framework around them is.

---

## 13. Security & compliance

- **Hosting:** AWS, EU region; multi-AZ redundancy; 99.9% uptime target; daily encrypted
  backups; WAF, DDoS protection, intrusion detection.
- **Encryption:** AES-256 at rest; TLS 1.2+ in transit; keys managed separately.
- **Identity:** Auth0 SSO (SAML / OIDC), MFA; API keys + OAuth 2.0.
- **Principles:** defense-in-depth, zero-trust, least-privilege, continuous monitoring.
- **Logging:** all logins, data access/modification, transactions, API calls — retained
  **7 years**, encrypted.
- **Compliance:** **SOC 2 Type II** (renewal audit in progress); **GDPR** with customer
  DPA + published subprocessor list (30-day subprocessor notice); **PCI DSS 4.0.1
  in progress** (SAQ-D Service Provider, audit closing **2026-05-21**); public
  `/sox-compliance` page.
- **Incident response:** customers notified in writing **within 36 hours** of a suspected
  personal-data breach; annual third-party pen-tests.

For Afframe (AWS `eu-central-1`, ADR-0007): Light's posture is the bar to match for a
Czech/EU accounting product — EU hosting + SOC 2 Type II + GDPR DPA.

---

## 14. Integrations

| Area | Integrations |
|---|---|
| Bank feeds | Plaid, GoCardless, Stripe, Airwallex; treasury/H2H via **Atlar** |
| Card issuing | **Adyen** (corporate + virtual cards, Apple/Google Pay) |
| CRM | Salesforce, HubSpot |
| Workplace chat | Slack, Microsoft Teams (primary UX surface) |
| Payroll / HR | Finch (employee data sync) |
| Tax | Avalara / AvaTax (US), HMRC (UK) |
| FP&A | Abacum |
| Email | Gmail |
| Migration | NetSuite, QuickBooks, e-conomic |
| Banking infra / audit | J.P. Morgan, BDO |
| Developer | REST API, OAuth apps, official MCP server |

---

## 15. Site, content & community engine — incl. a notable content-ops pattern

- **Marketing site** (`light.inc`): `/`, `/platform`, `/manifesto`, `/switch`, `/careers`
  (+ role pages), `/partners`, `/security`, `/sox-compliance`, `/terms`, `/privacy`,
  `/dpa`, `/finhack`; product pages `/products/{expenses,vendor-management,virtual-Cards,
  accounts-receivable}`.
- **Programmatic SEO:** `/versus/*` pages (quickbooks, netsuite, sap-netsuite,
  business-central, netsuite-business-central, xero, odoo, pe-accounting, erp) and a
  `/glossary/*` of finance terms; blog + a `/futureledger` editorial series.
- **Subdomains:** `app.` (product, Auth0 login), `help.` (knowledge base), `support.`
  (customer KB), `docs.` (API docs), `fhq.` (FinanceHQ community).
- **FinanceHQ** — invite-only, free community of finance leaders; Chatham House Rule;
  biannual "Grand Gathering" events.
- **FinHack** — "Light × Lovable" global finance-hackathon tour (co-sponsors QuantumBlack/
  McKinsey, J.P. Morgan, Abacum, Greenstep): Stockholm, Berlin, Helsinki, New York.
- **Starsite** — quarterly company offsites used as employer-brand content.
- **Content ops via Claude (notable):** the entire `help-articles` repo is **open source on
  GitHub** and maintained by **Claude** — a GitHub Action (`anthropics/claude-code-action`)
  runs whenever someone comments `@claude` on an issue/PR; Claude finds the right article,
  edits it, and pushes to `main`. Their repo `CLAUDE.md` codifies sidebar labels, button
  naming, status-badge colors and style so edits stay consistent. A docs site then syncs
  from the repo (`sync-to-cms.yml`).

**Takeaway:** the growth moat is *distribution* — programmatic versus/glossary pages, an
owned community, hackathons — plus a near-zero-cost, AI-run docs pipeline. All of this is
replicable at smaller scale for the Czech market.

---

## 16. Pricing, GTM & competitive landscape

- **Pricing:** no public numbers; billed **annually, in EUR, ex-VAT**; "contact sales" /
  demo — a sales-led, mid-market+ motion.
- **GTM wedges:** free managed migration off NetSuite/QuickBooks; versus-pages capturing
  switch intent; FinanceHQ + FinHack for top-of-funnel; "run finance leaner" CFO messaging.
- **US-native direct competitors** (the real "for USA" set Afframe should also study):
  **Rillet** (AI ERP for hypergrowth SaaS to IPO), **Campfire** (AI ERP replacing NetSuite
  for mid-market tech), **Puzzle** (AI accounting for startups + their accountants),
  **Digits** (AI accounting + in-house CPA at ~$350/mo), **Everest** (AI ERP for scaling
  SaaS). Legacy incumbents: NetSuite, SAP S/4HANA, MS Dynamics Business Central,
  QuickBooks, Xero, Odoo, PE Accounting.

---

## 17. What Afframe can actually use

Mapped to our stack (Czech accounting-office product; tenancy = Workspace [office] /
Organization [client book]; `Money<Currency>` in CZK; `FxRate`; Postgres 18 + FORCE RLS;
existing `AI-FINANCIAL-AGENTS-PLAN.md`).

**Adopt directly**
1. **Immutable ledger pattern** — mutable accounting documents + immutable transactions +
   automatic reverse-and-repost engine; `DOCTYPE/ENTITY/NUMBER` sequences; atomic posting.
   Strong ADR candidate (Section 6).
2. **The LCI model** — a single role-aware AI assistant across web + chat, MCP-powered,
   bounded tool-call loop, text-to-SQL reporting, conversation threads, "assistant
   memories" for custom parsing rules (Section 7). Direct input to AFF-31.
3. **AI pre-accounting** — OCR+LLM extraction from invoices/receipts/contracts → draft
   accounting documents for human approval; advisory-only governance; no training on
   customer data; explicit EU AI Act risk classification.
4. **API-first + MCP + open docs** — public REST API (resources, OAuth+keys, cents,
   sort/filter, rate limits), an official MCP server, an `llms.txt`, and AI-maintained
   open-source help docs.
5. **Chat-first approvals & Q&A** — DM-based bill/reimbursement approval with interactive
   buttons, proactive notifications, receipt smart-routing (channel TBD for the CZ market).
6. **Migration-as-a-wedge** — managed import from the incumbent CZ tools (Pohoda, Money S3,
   ABRA, Helios) as the primary acquisition path; sandbox environments for safe go-live.
7. **Tax/CoA framework** — structured tax codes with posting rules, per-entity VAT,
   account defaults, Peppol/EAS fields (Section 12) — framework yes, content Czech.
8. **Content/SEO + community engine** — versus-pages, a Czech účetnictví glossary, an
   AI-run open-docs pipeline, and a Czech finance/accountant community or events.

**Adapt for Czech/EU law — do NOT copy 1:1**
- Tax & statutory: Czech DPH, kontrolní hlášení, EU VAT/OSS, Czech statutory chart of
  accounts, České účetní standardy, ISDOC e-invoicing. Light's HMRC/AvaTax modules don't
  transfer; IFRS 15/16 templates are conceptually useful only.

**Keep Afframe's edge — do not regress**
- **Tenancy.** Light = shared-DB app-layer `tenant_id`; roles can't be entity-scoped.
  Afframe's FORCE-RLS Workspace/Organization model *is* the accounting-office product and
  is strictly stronger. The accounting-office tier has no Light equivalent.

**Watch / later, not now**
- Card issuing (Adyen) and treasury (Atlar) are out of initial scope for an
  accounting-office tool.
- Fully autonomous posting: keep human-in-the-loop, mirroring Light's advisory-only stance.

---

## 18. Proposed Linear project "Light Discovery" — issue backlog

To be created in Linear team **Afframe (`AFF`)**, new project **"Light Discovery"**.
Epics + issues (P1 = do first):

**Epic LD-A — Deep-dive verification**
- `LD-1` *(P1)* Get a Light demo/trial; capture real screenshots & in-app flows.
- `LD-2` *(P1)* Visual/UX audit of `light.inc` + `app.light.inc` — design system, type,
  color, motion, components, IA (could not be captured: site blocks automated fetch).
- `LD-3` *(P2)* Read the full `docs.light.inc` + `llms.txt`; produce the complete API +
  data-model map (this doc covers the resource list and the `11-12-api-access` article).
- `LD-4` *(P3)* Mine `light-space/help-articles` further — 162 articles; pull patterns for
  bank rec, revenue recognition, consolidation, workflow automation.

**Epic LD-B — Positioning & strategy**
- `LD-5` *(P1)* Draft Afframe's category one-liner + manifesto (model: Light's SFP framing,
  market: Czech accounting offices).
- `LD-6` *(P2)* Competitive matrix: Light vs Rillet/Campfire/Puzzle/Digits/Everest vs
  Czech incumbents (Pohoda, Money S3, ABRA, Helios).
- `LD-7` *(P3)* Pricing-model study: annual/contact-sales vs self-serve for CZ.

**Epic LD-C — Product patterns to spec**
- `LD-8` *(P1)* ADR: immutable ledger for Afframe — mutable accounting documents +
  immutable transactions + auto reverse/repost; sequences; atomic posting (Section 6).
- `LD-9` *(P1)* Spec the Afframe AI assistant modeled on LCI — role-aware tools, bounded
  tool loop, text-to-SQL reporting, threads, assistant memories (ties to AFF-31).
- `LD-10` *(P2)* Spec AI pre-accounting: document/contract extraction → draft documents
  with human approval; advisory-only governance + EU AI Act classification.
- `LD-11` *(P2)* Decide Afframe's public API + `llms.txt` + MCP-server strategy.
- `LD-12` *(P2)* Spec the chat-first approval & Q&A surface (CZ-appropriate channel).
- `LD-13` *(P3)* Spec managed migration from a Czech incumbent + sandbox environments.

**Epic LD-D — Go-to-market & trust**
- `LD-14` *(P3)* Evaluate the content engine: versus-pages + Czech glossary + AI-run
  open-source docs pipeline (à la `light-space/help-articles` + `claude-code-action`).
- `LD-15` *(P3)* Evaluate a CZ finance community/event play (FinanceHQ / FinHack analog).
- `LD-16` *(P2)* Compliance roadmap: SOC 2 Type II + GDPR DPA posture vs Light's bar.

---

## 19. Gaps & open questions

1. **Visual design** — type, color, motion, component library, live homepage copy. The
   site blocks automated fetching; needs a manual browser pass (LD-2).
2. **Pricing numbers** — none public; needs a sales conversation (LD-7).
3. **In-app flows** — documented from the help center, not walked in the live app (LD-1).
4. **API write-side detail** — endpoint-by-endpoint schemas/webhooks beyond the resource
   list need a full `docs.light.inc` read (LD-3).

---

## 20. Sources

**Primary (Light's own public GitHub — `light-space` org):**
- `light-space/help-articles` — 162 help articles + 20 IFRS policy docs; `help-article-hierarchy.md`; repo `CLAUDE.md`; `.github/workflows/{claude,sync-to-cms}.yml`
- `light-space/light-mcp` — official MCP server / Claude Code plugin
- API: `https://docs.light.inc` · `https://api.light.inc` · `https://docs.light.inc/llms.txt`

**Secondary (press / web search):**
- https://light.inc/manifesto · /platform · /careers · /finhack
- https://www.balderton.com/news/light-raises-30m-series-a-to-replace-legacy-finance-systems-with-ai-native-platform/
- https://techcrunch.com/2024/06/12/let-there-be-light-danish-startup-exits-stealth-with-13m-seed-funding-to-bring-ai-to-general-ledgers/
- https://atomico.com/insights/30m-series-a-for-light-building-the-global-leader-in-modern-erp
- https://seedcamp.com/views/light-secures-13m-scale-the-first-ai-powered-general-ledger-for-automating-global-company-finances/
- https://www.g2.com/products/light/reviews
- https://puzzle.io/blog/best-ai-accounting-software · https://www.numeric.io/blog/rillet-vs-campfire
