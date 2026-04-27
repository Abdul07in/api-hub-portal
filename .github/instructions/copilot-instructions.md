---
description: Master Copilot instructions for the ICICI Prudential API Hub Portal — apply to all code generation, reviews, and Q&A tasks in this repository.
applyTo: "**"
---

# ICICI Prudential API Hub Portal — Copilot Instructions

## Project Overview

**Name:** `icici-prudential-api-hub-portal`
**Stack:** React 19, TypeScript 5, Vite 7, TailwindCSS 4, Redux Toolkit, React Router DOM 7, TanStack Query, Zod, React Hook Form, shadcn/ui (Radix UI primitives), MUI (Material UI), SCSS (sass-embedded), Recharts, Lucide React.

**Key commands (run in Command Prompt — PowerShell is disabled):**

```cmd
npm run dev           :: Start dev server on port 3000
npm run build         :: Production build
npm run build:dev     :: Development build
npm run lint          :: ESLint check
npm run format        :: Prettier format
```

---

## Project Structure

```
src/
  common/             # Shared, app-agnostic code
    assets/           # Static assets (images, icons, fonts)
    atoms/            # Smallest reusable UI components (CodeBlock, Loader, MethodBadge, SecureCredentialField, StatCard)
    enums/            # Global TypeScript enums (index.ts)
    helpers/          # Pure utility functions and static constants (apiCatalog, faqs)
    interfaces/       # Shared TypeScript interfaces (api.ts, auth.ts)
    styles/           # Theme, SCSS variables, mixins, and global styles
    templates/        # App-wide layout components (AppLayout, Footer, Header, PageShell)

  components/ui/      # shadcn/ui generated components — DO NOT hand-edit unless necessary
  hooks/              # Global custom React hooks (e.g., use-mobile.tsx)
  lib/                # Utility helpers (utils.ts — cn() from clsx + tailwind-merge)
  portal/             # Feature/domain code for the portal application
    components/auth/  # Auth guard components (ProtectedRoute, GuestRoute)
    pages/            # Route-level page components (home, login, signup, sandbox, apiProducts, faqs, contactUs, partnerDashboard)
    services/         # Business logic & API service layer (auth, sandboxRunner)
    templates/        # Feature-specific layout templates (apiProducts, auth, contactUs, faqs, home, partnerDashboard, sandbox)
  store/              # Redux Toolkit store
    index.ts          # Store configuration + auth session persistence subscriber
    slices/           # apiCatalogSlice, authSlice
  router.tsx          # React Router DOM browser router definition
  main.tsx            # Application entry point
  styles.css          # Global CSS entry
```

**Path alias:** `@` maps to `src/` — always use `@/` for imports within `src/`.

---

## Coding Guidelines

### 0. Terminal / Shell

- **Do NOT run PowerShell commands** — it is disabled for security. Provide Command Prompt (`cmd`) commands only when shell commands are needed.

### 1. TypeScript

- All new files must be `.ts` or `.tsx`. Never use `.js` or `.jsx`.
- Define explicit types/interfaces for all props, function signatures, API responses, and state shapes.
- Place shared interfaces in `src/common/interfaces/`, feature-specific types close to the feature.
- Use Zod schemas for runtime validation at system boundaries (form inputs, API responses).
- Avoid `any`; use `unknown` with type guards when the type cannot be determined statically.

### 2. Project Structure & File Placement

- **Atoms** (`src/common/atoms/`): stateless, generic, no business logic.
- **Templates** (`src/common/templates/` and `src/portal/templates/`): layout and composition components.
- **Pages** (`src/portal/pages/`): route-level components — thin orchestration only, delegate to templates/services.
- **Services** (`src/portal/services/`): all API calls, async logic, and business rules. Keep components free of `fetch`/`axios` calls.
- **Store slices** (`src/store/slices/`): one slice per domain feature.
- Co-locate component SCSS (`.scss`) with its component file.

### 3. Code Style (ESLint + Prettier)

- Follow the existing ESLint config (`eslint.config.js`) and Prettier config without overriding rules.
- No unused variables, no `console.log` left in committed code.
- Single quotes for strings, trailing commas (ES5), 2-space indentation.

### 4. React Patterns

- **Functional components only** — no class components.
- Prefer named exports for components.
- Use React's built-in hooks (`useState`, `useEffect`, `useReducer`, `useCallback`, `useMemo`, `useRef`).
- Create custom hooks in `src/hooks/` (global) or co-located (feature-specific) when logic is reused across ≥2 components.
- Use `React.lazy` + `Suspense` for route-level and heavy component code splitting.
- Wrap expensive computations with `useMemo`/`useCallback` only when profiling shows a real need — avoid premature optimization.
- Use `React.memo` only for components that receive stable props and re-render frequently.

### 5. State Management

- **Local UI state:** `useState` or `useReducer`.
- **Server/async state:** TanStack Query (`@tanstack/react-query`) — for all data fetching, caching, and synchronization.
- **Global client state:** Redux Toolkit — `src/store/slices/`. Keep Redux state minimal (auth session, catalog metadata).
- Avoid prop drilling beyond 2 levels — lift state or use context/Redux.
- Never store derived data in Redux; compute it with selectors.

### 6. Forms

- Use React Hook Form (`react-hook-form`) with `@hookform/resolvers` and Zod schemas for all form validation.
- Never access `document` directly or use uncontrolled inputs outside of RHF.

### 7. UI Components

- Use shadcn/ui components from `src/components/ui/` as the primary UI kit.
- Use MUI (`@mui/material`) only where shadcn/ui lacks a required component.
- Do not mix shadcn and MUI for the same UI pattern — prefer shadcn/ui.
- Icons: use `lucide-react` (preferred) or `react-icons`; do not add new icon libraries.
- Styling order: TailwindCSS utility classes → SCSS modules (co-located `.scss`) → inline styles (avoid).

### 8. Routing

- All routes are defined in `src/router.tsx`. Add new routes there.
- Use `ProtectedRoute` for authenticated pages and `GuestRoute` for unauthenticated-only pages (login, signup).
- Use `PageShell` with an appropriate `maxWidth` for consistent page padding.

### 9. Performance & Code Splitting

- Every new route-level page should be lazy-loaded with `React.lazy`.
- Keep bundle chunks focused; avoid importing entire libraries when tree-shaking is possible (e.g., import individual MUI icons).

### 10. Error Handling

- Wrap route subtrees in React error boundaries to prevent full-page crashes.
- Handle async errors explicitly with `try/catch` in service functions; surface errors via TanStack Query's error state or Redux state — never swallow them silently.
- Integrate error monitoring (e.g., Sentry) at the application boundary in `main.tsx`.

### 11. Accessibility (a11y)

- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<button>`, etc.).
- Every interactive element must be keyboard-navigable and have a visible focus indicator.
- Provide `aria-label` / `aria-describedby` where text is not self-descriptive.
- All images must have meaningful `alt` text.

### 12. Security

- Never hard-code secrets, API keys, or credentials. Use environment variables (`import.meta.env`).
- Validate and sanitize all user inputs with Zod before use.
- Avoid `dangerouslySetInnerHTML`; if unavoidable, sanitize with DOMPurify first.
- Follow OWASP Top 10 guidelines — guard against XSS, CSRF, and injection attacks.

### 13. Testing

- Write unit tests (Jest + React Testing Library) for all atoms, hooks, and service utilities.
- Write integration tests for full user flows in pages and templates.
- E2E tests (Playwright) for critical journeys: login, sandbox execution, API product browsing.
- Aim for ≥80% coverage on business logic in `src/portal/services/` and `src/store/slices/`.

### 14. Internationalization (i18n)

- Do not hard-code user-visible strings directly in JSX. Use an i18n solution or centralize strings in constants when full i18n is not yet wired up.
- Design layouts to accommodate text expansion (common in translations).

### 15. Git & Collaboration

- Do not commit `.env` files or secrets.
- Follow the established branch model; use PR templates and code reviews before merging.
- Do not bypass ESLint/Prettier with `--no-verify`.

---

## Bonus: Quick Reference

| Concern       | Tool / Pattern          |
| ------------- | ----------------------- |
| Type safety   | TypeScript + Zod        |
| Styling       | TailwindCSS + SCSS      |
| UI primitives | shadcn/ui (Radix UI)    |
| Icons         | lucide-react            |
| Forms         | React Hook Form + Zod   |
| Server state  | TanStack Query          |
| Global state  | Redux Toolkit           |
| Routing       | React Router DOM v7     |
| Build         | Vite 7                  |
| Linting       | ESLint + Prettier       |
| Testing       | Jest + RTL + Playwright |
| Path alias    | `@` → `src/`            |
