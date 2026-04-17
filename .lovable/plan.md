
## ICICI Pru AMC PartnerHub — API Developer Portal

A pre-login developer portal showcasing the API catalog, plus a functional Sandbox tester.

### Stack & Setup
- Install **Material UI v6** (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`) alongside the existing TanStack Start + React 19 setup.
- Create an MUI `ThemeProvider` with the brand palette:
  - Background: `#fffaf6`
  - Primary (accent/CTA): `#e15325`
  - Secondary (deep blue, headings/links): `#155686`
- Roboto font via `@fontsource/roboto`.
- Logo placeholder slot in the header — you'll drop the official logo file in chat and we wire it in.

### Folder Structure (mirrored as closely as the framework allows)
Pages must live under `src/routes/` (TanStack file-based routing requirement), but everything else mirrors your tree:
```
src/
├── routes/                    ← thin route files that import from common/portal templates
│   ├── __root.tsx             ← MUI ThemeProvider + shared Header/Footer
│   ├── index.tsx              ← redirects/renders API Products
│   ├── api-products.tsx
│   ├── contact.tsx
│   ├── faqs.tsx
│   └── sandbox.tsx
├── common/
│   ├── assets/icons/
│   ├── atoms/                 ← reusable MUI-wrapped primitives
│   │   ├── button/ typography/ textField/ dropdown/ accordion/
│   │   ├── tabs/ chip/ tag/ table/ alert/ link/ icon/ image/
│   │   ├── breadcrumb/ search/ loader/ snackbar/ tooltip/
│   │   ├── codeBlock/         ← syntax-highlighted JSON/cURL viewer
│   │   └── methodBadge/       ← GET/POST pill
│   ├── molecules/cards/
│   │   ├── apiEndpointCard/
│   │   └── moduleCard/
│   ├── templates/
│   │   ├── header/  footer/  pageShell/
│   ├── helpers/constant/      ← API catalog data lives here
│   ├── interfaces/            ← TS types for ApiSpec, Module, Field
│   ├── enums/                 ← HttpMethod, FieldType
│   └── utilities/
└── portal/
    ├── pages/
    │   ├── apiProducts/       ← page component + sub-components
    │   ├── contactUs/
    │   ├── faqs/
    │   └── sandbox/
    ├── services/sandboxRunner/  ← mock executor returning canned responses
    └── navigation/
```

### Pages

**1. Header / Footer (global, in `__root.tsx`)**
- Sticky AppBar: logo (left), nav links (API Products, Contact Us, FAQs, Sandbox), "Login" CTA button on right (orange).
- Footer with copyright, social, legal links.
- Mobile: hamburger drawer.

**2. API Products** (`/api-products`)
- Hero band with title + short pitch ("Build with PartnerHub APIs").
- Left rail: searchable list of **Modules** (FATCA Details, Tax Status, KYC Verification, NSDL PAN Verification).
- Right pane: selected module shows
  - Module description
  - Accordion list of APIs in that module. Each accordion expands to show:
    - **Method badge** (GET/POST) + endpoint path
    - Description
    - Tabs: **Overview | Request | Response | Field Specifications**
      - Request tab: headers, sample JSON payload (copy button), cURL snippet
      - Response tab: success + error JSON examples with status codes
      - Field Specs tab: MUI Table — Field name, Type, Required, Description, Example
    - "Try in Sandbox" button → deep-links to Sandbox with that API preselected.

**3. Contact Us** (`/contact`)
- Two-column layout: contact info card (email, phone, office address, support hours) + contact form (Name, Email, Company, Subject, Message) with client-side validation and success snackbar (no backend; mock submit).

**4. FAQs** (`/faqs`)
- Searchable accordion list, grouped by category (Getting Started, Authentication, Modules, Sandbox, Errors & Limits). ~12 seeded Q&As.

**5. Sandbox** (`/sandbox`) — functional, no auth
- Three-pane layout (collapsible on mobile):
  - **Left**: module → API picker
  - **Middle**: Request builder — auto-generated form from each API's field spec (text, dropdown for enums, validation), plus raw JSON editor toggle
  - **Right**: Response viewer with status code, latency, formatted JSON, copy button
- "Send Request" runs a **mock executor** that returns realistic canned responses based on inputs (e.g., valid PAN format → success, malformed → 400). No real network calls.

### API Catalog Data (seeded in `common/helpers/constant/apiCatalog.ts`)
Typed catalog with all 4 modules and 6 endpoints you listed, each containing: method, path, description, request fields (PAN, etc.), response schema, sample request, sample success/error responses.

### Reusable Atoms (MUI-wrapped) — built first
Button, Typography, TextField, Dropdown, Accordion, Tabs, Chip, MethodBadge, Table, CodeBlock (with copy), Alert, Snackbar, Breadcrumb, Search, Loader, PageShell.

### React 18+ Best Practices
- Strict TS typing for all catalog data and props.
- Component composition via atoms → molecules → templates → pages.
- Code-split routes (handled by TanStack Router automatically).
- Per-route `head()` meta with unique title/description for SEO.
- `useMemo`/`useCallback` where appropriate; controlled forms; accessible MUI components.
- No prop drilling — local state only; no global store needed for v1.

### Notes / Trade-offs
- TanStack Start is SSR'd. MUI's Emotion engine works but we'll configure the cache so SSR doesn't FOUC.
- Routing **must** stay in `src/routes/` — page logic lives in `src/portal/pages/` and is imported by the thin route files, preserving your structure intent.
- Logo: I'll insert an `<img src="/logo.png" />` placeholder in the header. Drop the file in chat after implementation and I'll wire it.
