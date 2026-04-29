# Development Guidelines - ICICI Frontend Application

## Table of Contents
1. [SCSS Standards](#scss-standards)
2. [Component Usage](#component-usage)
3. [TypeScript Standards](#typescript-standards)
4. [TSLint Rules](#tslint-rules)
5. [File Structure](#file-structure)
6. [Git Workflow](#git-workflow)

---

## SCSS Standards

### 1. Use `rem` Units - MANDATORY
**NEVER use `px` units. Always use `rem` for all measurements.**

```scss
// ❌ WRONG
.my-component {
  padding: 24px;
  font-size: 16px;
  margin: 8px 16px;
}

// ✅ CORRECT
.my-component {
  padding: 1.5rem; // 24px
  font-size: 1rem; // 16px
  margin: 0.5rem 1rem; // 8px 16px
}
```

**Conversion Reference:**
- Base: 16px = 1rem
- 8px = 0.5rem
- 12px = 0.75rem
- 16px = 1rem
- 20px = 1.25rem
- 24px = 1.5rem
- 28px = 1.75rem
- 32px = 2rem

### 2. Color Variables - MANDATORY
**Always use color variables from `src/common/styles/variable.scss`**

```scss
// ✅ ALWAYS import at the top
@import '../../../common/styles/variable.scss';

// Custom colors for this page (not in variable.scss)
$text-label-gray: #7c7c7c;
$bg-card-light-blue: #f9fbfd;

.my-component {
  // ✅ CORRECT - Use variables
  color: $dark-blue;
  background: $white;
  border-color: $light-bamboo-bg;
  
  // ❌ WRONG - Don't hardcode
  color: #133359;
  background: #ffffff;
}
```

**Common Variables:**
- `$white` (#ffffff)
- `$dark-blue` (#133359)
- `$bamboo` (#dc6009)
- `$light-bamboo-bg` (#fff1e2)
- `$white-smoke` (#f5f5f5)
- `$black` (#000000)
- See `src/common/styles/variable.scss` for complete list

### 3. SCSS Best Practices

```scss
// ✅ Use BEM naming convention
.component-name {
  &__element {
    &--modifier {
      // styles
    }
  }
}

// ✅ Use semantic class names
.customer-goal-analysis-root__content-card { }

// ❌ Avoid generic names
.card { }
.box { }

// ✅ Use nested selectors efficiently
.parent {
  &__child {
    display: flex;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

// ✅ Add comments for sections
// Header Section - Contains title and date
&__header {
  margin-bottom: 1.5rem;
}

// ✅ Group related properties
.my-component {
  // Layout
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  // Spacing
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  // Visual
  background: $white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
}
```

---

## Component Usage

### 1. Typography - AtomTypography
**NEVER use MUI `<Typography>`. ALWAYS use `<AtomTypography>`**

```tsx
// ❌ WRONG
import { Typography } from '@mui/material'
<Typography variant="h6" sx={{ fontWeight: 600 }}>Title</Typography>

// ✅ CORRECT
import AtomTypography from '../../../common/atoms/typography'

<AtomTypography variant="h6" styleType="Bold" className="section-title">
  Title
</AtomTypography>
```

**Required Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3' | 'body4' | 'label1' | 'label2' | 'label3'
- `styleType`: 'Bold' | 'Reg' (ONLY these two, no 'Medium' or others)
- `className`: (optional) For SCSS styling

**Font Weight Customization:**
```scss
// Use SCSS for medium weight
.section-title {
  font-weight: 500; // Medium
}
```

### 2. Buttons - AtomButton
**NEVER use MUI `<Button>`. ALWAYS use `<AtomButton>`**

```tsx
// ❌ WRONG
import { Button } from '@mui/material'
<Button variant="contained" sx={{ padding: '8px 16px' }}>Click</Button>

// ✅ CORRECT
import AtomButton from '../../../common/atoms/button'

<AtomButton variant="contained" className="submit-btn">
  Click Me
</AtomButton>
```

**Important:**
- AtomButton does NOT accept `sx` prop
- Use `className` prop for styling via SCSS

### 3. Form Components

```tsx
// ✅ Use Atom components
import AtomTextField from '../../../common/atoms/textField'
import AtomAutoComplete from '../../../common/atoms/autoComplete'
import AtomCheckbox from '../../../common/atoms/checkbox'

// Search atoms directory before using MUI
// Check: src/common/atoms/[componentName]
```

### 4. Component Discovery Checklist

Before using ANY component:
1. ✅ Search `src/common/atoms/` for Atom equivalent
2. ✅ Read component source to understand props
3. ✅ Look for usage examples: `grep -r "AtomComponentName" src/`
4. ✅ Check interfaces in `src/common/interfaces/`

---

## TypeScript Standards

### 1. Type Safety

```tsx
// ✅ Always define interfaces for props
export interface MyComponentProps {
  title: string
  count?: number
  onAction: () => void
  items: Item[]
}

// ✅ Use FC with typed props
const MyComponent: FC<MyComponentProps> = ({ title, count, onAction }) => {
  // component logic
}

// ✅ Type all variables
const [value, setValue] = useState<string>('')
const items: Item[] = []

// ❌ Avoid 'any' unless absolutely necessary
const data: any = {} // BAD
```

### 2. Import Order

```tsx
// 1. React imports
import { FC, useState, useEffect } from 'react'

// 2. Third-party libraries
import { Grid, Container } from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'

// 3. Redux
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../../common/store/slice/userProfile'

// 4. Common atoms
import AtomTypography from '../../../common/atoms/typography'
import AtomButton from '../../../common/atoms/button'

// 5. Icons
import SvgCopy from '../../../common/atoms/iconComponents/Copy'

// 6. Local components
import MyLocalComponent from './components/MyLocalComponent'

// 7. Styles (ALWAYS LAST)
import './myComponent.scss'
```

### 3. Props Destructuring

```tsx
// ✅ Destructure in function parameters
const MyComponent: FC<MyComponentProps> = ({
  title,
  count = 0,
  items = [],
  onAction,
}) => {
  // Use destructured props directly
}

// ✅ Provide defaults for optional props
```

---

## TSLint Rules

### 1. No Console Statements (no-console) - CRITICAL

```tsx
// ❌ NEVER use console in production
console.log('Debug message')
console.error('Error')

// ✅ Use conditional logging with tslint:disable
const logError = (message: string, error: any) => {
  if (process.env.NODE_ENV === 'development') {
    // tslint:disable-next-line:no-console
    console.error(message, error)
  }
}

// ✅ For example files only
/* tslint:disable:no-console */
```

### 2. No Lambda Functions in JSX (jsx-no-lambda) - CRITICAL

```tsx
// ❌ WRONG - Never use arrow functions in JSX
<button onClick={() => handleClick(id)}>Click</button>
<div onClick={() => doSomething()}>Content</div>
{items.map(item => <Chip onClick={() => handler(item)} />)}

// ✅ CORRECT - Create handler functions
const createClickHandler = (id: string) => () => {
  handleClick(id)
}

const handleButtonClick = () => {
  doSomething()
}

// Use in JSX
<button onClick={createClickHandler(id)}>Click</button>
<button onClick={handleButtonClick}>Click</button>

// ✅ For map operations
const renderItems = () => {
  return items.map((item) => {
    const handleItemClick = () => handler(item)
    return <Chip key={item.id} onClick={handleItemClick} />
  })
}
```

### 3. Pre-Commit Checklist

**Before committing:**
```bash
# 1. Run linting
yarn tslint-check

# 2. Check for issues
# - No console.* statements (except with tslint:disable)
# - No arrow functions in JSX attributes
# - All imports resolved
# - No unused variables

# 3. Fix all errors before committing
```

---

## File Structure

### 1. Template Structure

```
src/distributor/templates/myFeature/
├── MyFeatureTemplate.tsx          # Main template component
├── myFeatureTemplate.scss         # Styles
├── index.tsx                      # Export file
├── components/                    # Local components
│   ├── SubComponent.tsx
│   └── subComponent.scss
└── constants.ts                   # Constants/enums
```

### 2. Page Structure

```
src/distributor/pages/myFeature/
├── MyFeaturePage.tsx              # Page container with Redux
├── index.tsx                      # Export file
└── constants.ts                   # Page-specific constants
```

### 3. Common Components

```
src/common/atoms/myComponent/
├── MyComponent.tsx                # Component logic
├── myComponent.scss               # Component styles
├── index.tsx                      # Export file
└── MyComponent.interface.ts       # TypeScript interfaces (optional)
```

### 4. Naming Conventions

```
// Files
MyComponent.tsx                    # PascalCase for components
myComponent.scss                   # camelCase for styles
constants.ts                       # lowercase for utilities
index.tsx                          # lowercase for exports

// Components
export const MyComponent: FC      // PascalCase

// Variables/Functions
const myVariable = ''             // camelCase
const handleClick = () => {}      // camelCase with 'handle' prefix

// Constants
const MAX_ITEMS = 10              // UPPER_SNAKE_CASE
```

---

## Git Workflow

### 1. Branch Naming

```bash
# Feature branches
feature/customer-goal-analysis
feature/add-new-report

# Bug fixes
bugfix/fix-calculation-error
bugfix/resolve-navigation-issue

# Hotfixes
hotfix/critical-security-patch
```

### 2. Commit Messages

```bash
# Format: <type>: <description>

# Types:
feat: Add new customer goal analysis page
fix: Resolve navigation state issue
style: Convert px to rem in SCSS files
refactor: Extract common card component
docs: Update development guidelines
test: Add unit tests for calculator
chore: Update dependencies

# Examples:
git commit -m "feat: Add client summary section with contact info"
git commit -m "fix: Resolve TypeScript error in PrivateRoute"
git commit -m "style: Replace hardcoded colors with SCSS variables"
```

### 3. Pull Request Checklist

**Before creating PR:**
- ✅ Run `yarn tslint-check` - no errors
- ✅ All tests passing: `yarn test`
- ✅ No console statements in production code
- ✅ No lambda functions in JSX
- ✅ All px converted to rem
- ✅ Using color variables from variable.scss
- ✅ Using Atom components (not MUI directly)
- ✅ Code reviewed locally
- ✅ Meaningful commit messages

---

## Quick Reference Card

### SCSS Checklist
- [ ] Imported `@import '../../../common/styles/variable.scss'`
- [ ] All measurements in `rem` (not `px`)
- [ ] Using color variables (not hex codes)
- [ ] BEM naming convention
- [ ] Semantic class names

### Component Checklist
- [ ] Using `<AtomTypography>` (not `<Typography>`)
- [ ] Using `<AtomButton>` (not `<Button>`)
- [ ] Using `className` (not `sx` prop on Atoms)
- [ ] Checked for existing Atom components
- [ ] Proper TypeScript types

### Code Quality Checklist
- [ ] No `console.log()` statements
- [ ] No arrow functions in JSX attributes
- [ ] Proper import order
- [ ] Strong typing (no `any`)
- [ ] `yarn tslint-check` passes

### Pre-Commit Checklist
- [ ] Linting passes
- [ ] Tests pass
- [ ] Code reviewed
- [ ] No debug code
- [ ] Meaningful commit message

---

## FAQ

**Q: Can I use inline styles with `sx` prop?**
A: No, not on Atom components. Use SCSS with `className` prop.

**Q: What if I need a color not in variable.scss?**
A: Define it at the top of your SCSS file with a descriptive name:
```scss
$text-custom-color: #123456;
```

**Q: Can I use `console.log` for debugging?**
A: Only with `// tslint:disable-next-line:no-console` and remove before committing.

**Q: How do I handle medium font weight in AtomTypography?**
A: Use `styleType="Reg"` or `styleType="Bold"`, then add `font-weight: 500` in SCSS.

**Q: Where do I find available Atom components?**
A: Check `src/common/atoms/` directory or search: `grep -r "Atom" src/common/atoms/`

---

## Resources

- **Project README:** `README.md`
- **Copilot Instructions:** `.github/copilot-instructions.md`
- **SCSS Variables:** `src/common/styles/variable.scss`
- **Common Atoms:** `src/common/atoms/`
- **Common Interfaces:** `src/common/interfaces/`

---