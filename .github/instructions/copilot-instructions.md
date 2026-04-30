---
description: Master Copilot instructions for the ICICI Prudential API Hub Portal — apply to all code generation, reviews, and Q&A tasks in this repository.
applyTo: "**"
---

# ICICI Prudential API Hub Portal — Copilot Instructions

## Project Overview

**Stack:** React 19 · TypeScript 5 · Vite 7 · TailwindCSS 4 · Redux Toolkit · React Router DOM 7 · TanStack Query · Zod · React Hook Form · shadcn/ui (Radix) · MUI · SCSS (sass-embedded) · Recharts · Lucide React

**Commands (Command Prompt only — PowerShell is disabled):**

```cmd
npm run dev           :: Dev server on port 3000
npm run build         :: Production build
npm run build:dev     :: Development build
npm run lint          :: ESLint check
npm run format        :: Prettier format
```

**Path alias:** `@` → `src/` — always use `@/` for imports.

---

## Project Structure

```
src/
  common/
    assets/           # Static assets (images, icons, fonts)
    atoms/            # Reusable UI atoms (CodeBlock, ConfirmModal, Loader, MethodBadge, SecureCredentialField, StatCard, StatusBanner)
    enums/            # Global TypeScript enums
    helpers/          # Pure utilities & static constants
    interfaces/       # Shared TypeScript interfaces (api.ts, auth.ts)
    styles/           # Theme, SCSS variables (_variables.scss), mixins, global styles
    templates/        # App-wide layouts (AppLayout, Footer, Header, PageShell)
  components/ui/      # shadcn/ui generated — DO NOT hand-edit
  hooks/              # Global custom hooks
  lib/                # Utility helpers (cn() from clsx + tailwind-merge)
  portal/
    components/auth/  # ProtectedRoute, GuestRoute
    pages/            # Route-level page components (orchestration only)
    services/         # API calls, async logic, business rules
    templates/        # Feature UI templates (receive data/callbacks as props)
  store/
    index.ts          # Store config + auth persistence subscriber
    slices/           # One slice per domain (apiCatalogSlice, authSlice)
  router.tsx          # All route definitions
  main.tsx            # Entry point
```

---

## Layered Architecture (MANDATORY)

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Pages** | `src/portal/pages/` | Orchestration only — API calls (TanStack Query), Redux dispatch, data assembly |
| **Templates** | `src/portal/templates/` | Pure UI — receive data/callbacks as props, all JSX lives here, **no API calls** |
| **Atoms** | `src/common/atoms/` | Stateless, generic, no business logic |
| **Services** | `src/portal/services/` | All `fetch`/`axios` calls, async logic, business rules |
| **Store** | `src/store/slices/` | Minimal global client state (auth, catalog metadata) |

> Always check existing atoms, pages, and templates before creating new ones — reuse and extend.

### Service Layer Pattern

Use class-based services with static methods. Type all parameters and return values:

```ts
// src/portal/services/example/example.service.ts
class ExampleService {
  static async fetchItems(id: string): Promise<ItemResponse> {
    const response = await fetch(`/api/items/${id}`)
    if (!response.ok) throw new Error('Failed to fetch items')
    return response.json() as Promise<ItemResponse>
  }
}

export default ExampleService
```

- One service file per domain feature.
- Never call services directly from templates — only from pages via TanStack Query.
- Surface errors via `useQuery`/`useMutation` error state; never swallow silently.

---

## TypeScript

- All files `.ts`/`.tsx` — never `.js`/`.jsx`.
- Explicit types for all props, function signatures, API responses, and state shapes.
- Shared interfaces → `src/common/interfaces/`; feature-specific → co-locate.
- Zod schemas for runtime validation at system boundaries (forms, API responses).
- **No `any`** — use `unknown` with type guards.
- **No reserved keywords or built-in type names as variable names.**

```tsx
// ❌ Bad — reserved type names as destructured variable names
const { number, string, boolean } = data

// ✅ Good — use descriptive names
const { number: phoneNumber, string: labelText, boolean: isActive } = data
```

Common pitfalls: `number` → `phoneNumber`/`count`, `string` → `text`/`label`, `type` → `itemType`/`category`.

### Component Props Pattern

Define props interfaces **outside** the component and use explicit `FC<Props>` typing:

```tsx
interface MyComponentProps {
  title: string
  onSubmit: (value: string) => void
  isLoading?: boolean
}

const MyComponent: FC<MyComponentProps> = ({ title, onSubmit, isLoading = false }) => {
  // ...
}
```

### API Response Typing

Type all API responses with interfaces. Use union types for status fields — never `string`:

```tsx
interface ApiResponse {
  id: string
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | null
  createdAt: string
  updatedAt?: string
}
```

### Import Order

```tsx
// 1. React
import { FC, useState, useEffect } from 'react'
// 2. Third-party libraries
import { useNavigate } from 'react-router-dom'
// 3. Redux / Store
import { useSelector } from 'react-redux'
// 4. Common atoms & components
import { Loader } from '@/common/atoms/loader/Loader'
// 5. Local components
import { MyChild } from './components/MyChild'
// 6. Styles (ALWAYS LAST)
import './MyComponent.scss'
```

---

## SCSS Standards (MANDATORY)

### Use `rem` — NEVER `px`

| px | rem |
|----|-----|
| 8 | 0.5 |
| 12 | 0.75 |
| 16 | 1 |
| 20 | 1.25 |
| 24 | 1.5 |
| 32 | 2 |

### Use Color Variables from `_variables.scss`

```scss
@use '@/common/styles/scss/variables' as *;

// Key variables: $primary, $secondary, $tertiary, $text-primary, $text-secondary,
// $text-muted, $border, $surface, $bg-light, $success, $warning, $error, $info,
// $gray-100 through $gray-500
// For colors not in _variables.scss, define at the top of your SCSS file with a descriptive name.
```

### BEM Naming & Best Practices

```scss
.component-name {
  // Layout
  display: flex;
  gap: 1rem;
  // Spacing
  padding: 1.5rem;
  // Visual
  background: $surface;
  border-radius: 0.5rem;

  &__element {
    &--modifier { }
  }
}
```

- Co-locate `.scss` with its component file.
- Use semantic, BEM-style class names — avoid generic `.card`, `.box`.
- Group properties: layout → spacing → visual.

---

## React Patterns

- **Functional components only**, prefer named exports.
- `React.lazy` + `Suspense` for every route-level page.
- Custom hooks in `src/hooks/` (global) or co-located when reused ≥2 times.
- `useMemo`/`useCallback`/`React.memo` only when profiling shows real need.
- **No arrow functions in JSX event handlers** — extract handler functions:

```tsx
// ❌ Bad
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good
const createClickHandler = (id: string) => () => handleClick(id)
<button onClick={createClickHandler(id)}>Click</button>
```

---

## State Management

| Concern | Tool |
|---------|------|
| Local UI state | `useState` / `useReducer` |
| Server/async state | TanStack Query |
| Global client state | Redux Toolkit (minimal) |

- No prop drilling beyond 2 levels — lift state or use context/Redux.
- Never store derived data in Redux; use selectors.

---

## Forms

- React Hook Form + `@hookform/resolvers` + Zod for all form validation.
- Never access `document` directly or use uncontrolled inputs outside RHF.

---

## UI Components

- **Primary:** shadcn/ui from `src/components/ui/`.
- **Fallback:** MUI only where shadcn/ui lacks a required component. Never mix both for the same pattern.
- **Icons:** `lucide-react` (preferred) or `react-icons` — no new icon libraries.
- **Styling priority:** TailwindCSS utilities → co-located SCSS → inline styles (avoid).
- Use `className` for styling — avoid `sx` prop on atom/custom components.

---

## Routing

- All routes in `src/router.tsx`.
- `ProtectedRoute` for authenticated pages, `GuestRoute` for login/signup.
- `PageShell` with appropriate `maxWidth` for consistent page padding.

---

## Code Quality

- Follow ESLint (`eslint.config.js`) + Prettier config — no overrides.
- Single quotes, trailing commas (ES5), 2-space indent.
- **No `console.log`** in committed code.
- **No unused variables.**

---

## Error Handling

- React error boundaries around route subtrees.
- `try/catch` in service functions; surface via TanStack Query error state or Redux — never swallow silently.
- Sentry integration at the boundary in `main.tsx`.

---

## Security

- No hard-coded secrets — use `import.meta.env`.
- Validate/sanitize all user inputs with Zod.
- No `dangerouslySetInnerHTML` unless sanitized with DOMPurify.
- Follow OWASP Top 10 — guard against XSS, CSRF, injection.

---

## Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<button>`, etc.).
- Keyboard-navigable with visible focus indicators.
- `aria-label`/`aria-describedby` where needed; meaningful `alt` on images.

---

## Testing

- **Unit:** Jest + React Testing Library for atoms, hooks, services.
- **Integration:** Full user flows in pages/templates.
- **E2E:** Playwright for critical journeys.
- ≥80% coverage on `src/portal/services/` and `src/store/slices/`.

---

## i18n

- No hard-coded user-visible strings in JSX — centralize in constants or use an i18n solution.
- Design layouts for text expansion.

---

## Git Workflow

- **No `.env` files or secrets** in commits.
- **No `--no-verify`** bypass.
- Branch naming: `feature/`, `bugfix/`, `hotfix/` prefixes.
- Commit format: `<type>: <description>` — types: `feat`, `fix`, `style`, `refactor`, `docs`, `test`, `chore`.

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase `.tsx` | `MyComponent.tsx` |
| Styles | camelCase `.scss` | `myComponent.scss` |
| Utilities | camelCase `.ts` | `constants.ts` |
| Exports | `index.tsx` | `index.tsx` |
| Variables/functions | camelCase | `handleClick` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITEMS` |

---

## Pre-PR Checklist

Before raising a PR, verify:

- [ ] `npm run lint` passes with no errors
- [ ] No `console.log` / `console.error` / `console.warn` in committed code
- [ ] No arrow functions in JSX event handlers (use factory functions)
- [ ] No reserved keywords used as variable names (`number`, `string`, `type`, etc.)
- [ ] No `any` types — `unknown` with type guards where needed
- [ ] All props interfaces defined **outside** the component with explicit `FC<Props>` typing
- [ ] All API responses typed with interfaces (union types for status fields)
- [ ] All SCSS uses `rem` units and `_variables.scss` color variables
- [ ] No unused variables or imports
- [ ] No hard-coded secrets — environment values via `import.meta.env`

---

## Quick Reference

| Concern | Tool / Pattern |
|---------|----------------|
| Type safety | TypeScript + Zod |
| Styling | TailwindCSS + SCSS (`rem`, BEM, `_variables.scss`) |
| UI primitives | shadcn/ui (Radix) |
| Icons | lucide-react |
| Forms | React Hook Form + Zod |
| Server state | TanStack Query |
| Global state | Redux Toolkit |
| Routing | React Router DOM v7 |
| Build | Vite 7 |
| Linting | ESLint + Prettier |
| Testing | Jest + RTL + Playwright |
| Path alias | `@` → `src/` |
