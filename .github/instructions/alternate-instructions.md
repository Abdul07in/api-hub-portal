# Copilot Instructions for ICICI Frontend Application

## Project Overview
- This is a React-based frontend for ICICI, supporting two main user flows: **Investor** and **Distributor**.
- The codebase is organized by user type under `src/investor/` and `src/distributor/`, with shared components and utilities in `src/common/`.
- Webpack configs for each flow are in `config/`.

## Key Workflows
- **Start dev server:** `yarn start` (default), or use `yarn investor` / `yarn distributor` for specific flows.
- **Build:**
  - `yarn build-investor`, `yarn build-distributor` for production builds.
  - `yarn build-local-investor`, `yarn build-local-distributor` for local builds.
- **Testing:** `yarn test` (Jest-based, see `config/jest/`).
- **Linting:** `yarn tslint` or `yarn tslint-check`.
- **SVG Icon Generation:** Place SVGs in `src/common/assets/icons/` and run `yarn svg` to generate React components.

## TSLint Rules - CRITICAL
**Must follow these rules to avoid linting errors before PR:**

### 1. No Console Statements (no-console)
- **NEVER use** `console.log()`, `console.error()`, `console.warn()` in production code
- For debugging, use a logger utility with tslint:disable comment:
  ```typescript
  const logError = (message: string, error: any) => {
    if (process.env.NODE_ENV === 'development') {
      // tslint:disable-next-line:no-console
      console.error(message, error)
    }
  }
  ```
- For example files (`.example.tsx`), add at top: `/* tslint:disable:no-console */`
- **In service files:** Remove all console.log statements before committing

### 2. No Lambda Functions in JSX (jsx-no-lambda)
- **NEVER use** arrow functions directly in JSX attributes
- ❌ **Wrong:**
  ```tsx
  <button onClick={() => handleClick(id)}>Click</button>
  <div onClick={() => doSomething()}>Content</div>
  {items.map(item => <Chip onClick={() => handler(item)} />)}
  ```
- ✅ **Correct:**
  ```typescript
  // Create handler factory functions
  const createClickHandler = (id: string) => () => {
    handleClick(id)
  }
  
  // Or extract to separate function
  const handleButtonClick = () => {
    doSomething() 
  }
  
  // Then use in JSX
  <button onClick={createClickHandler(id)}>Click</button>
  <button onClick={handleButtonClick}>Click</button>
  ```

### 3. No Reserved Keywords as Variable Names (variable-name)
- **NEVER use** JavaScript reserved keywords or built-in type names as variable names
- ❌ **Wrong - Reserved Keywords:**
  ```typescript
  const { number, string, boolean } = data  // Reserved type names
  const { interface, class, function } = obj  // Reserved keywords
  const { export, import, default } = config  // Reserved keywords
  ```
- ✅ **Correct - Use Descriptive Names:**
  ```typescript
  const { number: phoneNumber, string: textValue } = data
  const { isd, number: phoneNumber } = userProfile.phone
  ```
- **Common pitfalls:**
  - `number` → use `phoneNumber`, `count`, `value`
  - `string` → use `text`, `message`, `label`
  - `type` → use `itemType`, `dataType`, `category`
  - `name` is allowed but be specific: `userName`, `fileName`

### 4. Pre-Commit Checklist
Before raising PR, always:
1. Run `yarn tslint-check` to verify no linting errors
2. Ensure no `console.*` statements in production code (especially in service files)
3. Ensure no lambda functions in JSX attributes
4. Ensure no reserved keywords used as variable names
5. Fix all errors before committing

## Architecture & Patterns
- **Entry Points:**
  - `src/investor/investorApp.tsx` and `src/distributor/distributorApp.tsx` are the main entry files for each flow.
  - `src/investor/investorIndex.tsx` and `src/distributor/distributorIndex.tsx` are likely used for bootstrapping.
- **Component Structure:**
  - Atoms, molecules, and templates follow a design system approach under `src/common/`.
  - Shared logic (hooks, helpers, enums, interfaces) is in `src/common/` subfolders.
- **Config:**
  - Webpack and environment config in `config/`.
  - App config can be exposed via `.env` (e.g., `PORT`).
- **SVG Icons:** Use `<Icon name="Video" mui {...props} />` for generated icons.

## Conventions & Tips
- **Do not edit build scripts directly;** use the provided yarn commands.
- **Do not eject** unless absolutely necessary (`yarn eject` is irreversible).
- **Follow the folder structure** for new components: atoms/molecules/templates for UI, hooks/helpers for logic.
- **Testing:** Place tests alongside components or in `src/common/pages/` as appropriate.
- **External dependencies:** Uses SVGR for SVGs, Jest for testing, TSLint for linting.

## SCSS Color Variables - MANDATORY
**Always use color variables from `src/common/styles/variable.scss` instead of hardcoded hex values:**

### Rules:
1. **ALWAYS import variable.scss** at the top of every SCSS file:
   ```scss
   @import '../../../common/styles/variable.scss';
   ```

2. **Use existing color variables** when available:
   - ✅ `color: $dark-blue;` instead of `color: #133359;`
   - ✅ `background: $white;` instead of `background: #ffffff;`
   - ✅ `background: $light-bamboo-bg;` instead of `background: #fff1e2;`

3. **Define custom colors** at the top of file if not in variable.scss:
   ```scss
   @import '../../../common/styles/variable.scss';
   
   // Custom colors for this page (not in variable.scss)
   $text-label-gray: #7c7c7c;
   $bg-card-light-blue: #f9fbfd;
   ```

4. **Common color variables** to use:
   - `$white` (#ffffff)
   - `$dark-blue` (#133359)
   - `$bamboo` (#dc6009)
   - `$light-bamboo-bg` (#fff1e2)
   - `$white-smoke` (#f5f5f5)
   - Check variable.scss for complete list

### Benefits:
- Maintains color consistency across the app
- Easier to update theme colors globally
- Better maintainability and readability

## Component Usage Patterns - MANDATORY
**ALWAYS use Atom components from `src/common/atoms/` instead of MUI components directly:**

### Discovery Process (Before Writing Any Component)
1. **Search for Atom equivalents** in `src/common/atoms/` directory
2. **Read component source** to understand required props and interfaces
3. **Check existing usage** with grep: `grep -r "AtomComponentName" src/`
4. **Never assume MUI is acceptable** - always verify Atom equivalent exists

### Core Component Rules

#### 1. Typography Component
- **NEVER use** `<Typography>` from MUI
- **ALWAYS use** `<AtomTypography>` from `src/common/atoms/typography`
- **Required props**: 
  - `variant` - MUI variant (h1, h2, h3, h4, h5, h6, body1, body2, etc.)
  - `styleType` - 'Reg' or 'Bold' (MANDATORY - will cause error if missing)
- **Optional props**: `className`, `color`, etc.
- **Example:**
  ```tsx
  import AtomTypography from '../../../common/atoms/typography'
  
  <AtomTypography variant="h6" styleType="Bold" className="section-title">
    Title Text
  </AtomTypography>
  
  <AtomTypography variant="body1" styleType="Reg" className="description">
    Regular body text
  </AtomTypography>
  ```

#### 2. Button Component
- **NEVER use** `<Button>` from MUI
- **ALWAYS use** `<AtomButton>` from `src/common/atoms/button`
- **CRITICAL**: AtomButton does NOT accept `sx` prop - use `className` instead
- **Variants**: `contained` (filled), `outlined` (border only), `text`
- **Example:**
  ```tsx
  import AtomButton from '../../../common/atoms/button'
  
  // Primary action - orange filled button
  <AtomButton variant="contained" className="cta-button">
    Continue
  </AtomButton>
  
  // Secondary action - orange border button
  <AtomButton variant="outlined" className="secondary-button">
    Add Another Goal
  </AtomButton>
  ```

#### 3. Form Components
- **NEVER use** `<TextField>` from MUI → Use `<AtomTextField>`
- **NEVER use** `<Autocomplete>` from MUI → Use `<AtomAutoComplete>`
- **NEVER use** `<Checkbox>` from MUI → Use `<AtomCheckbox>`
- **NEVER use** `<Radio>` from MUI → Use `<AtomRadio>`
- **NEVER use** `<Switch>` from MUI → Use `<AtomSwitch>`

#### 4. Other Common Atoms
Search `src/common/atoms/` for these and more:
- `AtomChip` - Chips/tags for selection
- `AtomModal` - Modals/dialogs
- `AtomTooltip` - Tooltips
- `AtomSlider` - Sliders
- `AtomBadge` - Badges
- `AtomAvatar` - User avatars
- `AtomStepper` - Step indicators
- `AtomAccordion` - Expandable sections
- Always check directory for complete list

### Styling Rules for Atom Components
- **NEVER use `sx` prop** on Atom components (will be ignored or cause errors)
- **ALWAYS use `className` prop** and define styles in companion `.scss` file
- **Use semantic class names** with BEM naming convention
- **All measurements in `rem`** (16px = 1rem, 8px = 0.5rem, 24px = 1.5rem)

### Example Pattern:
```tsx
// MyComponent.tsx
import React from 'react'
import AtomTypography from '../../../common/atoms/typography'
import AtomButton from '../../../common/atoms/button'
import './myComponent.scss'

const MyComponent: React.FC = () => {
  return (
    <div className="my-component">
      <AtomTypography variant="h5" styleType="Bold" className="my-component__title">
        Goal Details
      </AtomTypography>
      <AtomButton variant="contained" className="my-component__submit-btn">
        Submit
      </AtomButton>
    </div>
  )
}
```

```scss
// myComponent.scss
@import '../../../common/styles/variable.scss';

.my-component {
  padding: 1.5rem; // 24px
  
  &__title {
    font-size: 1.25rem; // 20px
    line-height: 1.4;
    color: $dark-blue;
    margin-bottom: 1rem; // 16px
  }
  
  &__submit-btn {
    padding: 0.5rem 1.5rem; // 8px 24px
    margin-top: 1rem;
  }
}
```

## SCSS Styling Standards - MANDATORY
**Complete styling guidelines to ensure consistency:**

### 1. Units - ALWAYS Use rem, NEVER px
- **Conversion**: 16px = 1rem (base font size)
- **Common conversions**:
  - 8px = 0.5rem
  - 12px = 0.75rem
  - 16px = 1rem
  - 24px = 1.5rem
  - 32px = 2rem
  - 40px = 2.5rem
- **Why rem?** Responsive, accessible, scales with user preferences

### 2. File Organization
- **SCSS file alongside component**: `ComponentName.tsx` → `componentName.scss`
- **Import variable.scss** at top of every SCSS file
- **BEM naming convention** for class names:
  ```scss
  .block-name {
    &__element {
      // element styles
    }
    
    &__element--modifier {
      // modified element styles
    }
  }
  ```

### 3. Color Usage
- **Use variables** from `variable.scss` (e.g., `$dark-blue`, `$bamboo`, `$white`)
- **Define custom colors** at top of file if needed with descriptive names
- **Never hardcode hex values** inline

### 4. Spacing System
- Use consistent spacing scale: 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 2.5rem, 3rem
- **Padding/Margin pattern**:
  ```scss
  .component {
    padding: 1.5rem; // Consistent spacing
    margin-bottom: 1rem;
    gap: 0.75rem; // For flexbox/grid
  }
  ```

### 5. Complete SCSS Example
```scss
@import '../../../common/styles/variable.scss';

// Custom colors (if not in variable.scss)
$text-muted: #7c7c7c;
$bg-light: #f9fbfd;

.financial-planner-root {
  display: flex;
  flex-direction: column;
  padding: 1.5rem; // 24px
  
  &__header {
    margin-bottom: 1.5rem;
  }
  
  &__title {
    font-size: 1.5rem; // 24px
    line-height: 1.5rem;
    color: $dark-blue;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  &__content-card {
    background: $white;
    border-radius: 0.75rem; // 12px
    padding: 2rem 5.5rem; // 32px 88px
    margin-bottom: 1.5rem;
    box-shadow: 0px 5px 8px 0px $blue-opacity25;
  }
  
  &__button-group {
    display: flex;
    justify-content: flex-end;
    gap: 1rem; // 16px
    margin-top: 1.5rem;
  }
  
  &__action-button {
    padding: 0.5rem 1.375rem; // 8px 22px
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.03125rem; // 0.5px
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 0.25rem; // 4px
    
    &--contained {
      background: $bamboo;
      color: $white;
      
      &:hover {
        background: darken($bamboo, 5%);
      }
    }
    
    &--outlined {
      border: 1px solid $bamboo;
      color: $bamboo;
      background: $white;
      
      &:hover {
        background: rgba(220, 96, 9, 0.04);
      }
    }
  }
}
```

## Advanced SCSS Design System - MANDATORY
**Comprehensive guide to leveraging variable.scss mixins, gradients, and utilities:**

### 1. Mixin Library Reference
**variable.scss provides 50+ mixins for common patterns. ALWAYS use these instead of writing custom CSS:**

#### Layout Mixins (Flexbox Patterns)
```scss
// Common flex patterns - use these for consistent layouts
@include flex-space-bet;        // justify-content: space-between
@include flex-dir-col;           // flex-direction: column
@include flex-center-align;      // align-items: center
@include align-center;           // align-items: center
@include flex-wrap;              // flex-wrap: wrap
@include flex-justify-center;    // justify-content: center
@include flex-align-start;       // align-items: flex-start
@include flex-col-center;        // flex column with centered items

// Example usage
.card-header {
  @include flex-space-bet;
  @include align-center;
  padding: 1rem;
}

.button-group {
  @include flex-justify-center;
  gap: 1rem;
}
```

#### Typography Mixins
```scss
// Font container mixin - for consistent typography
@include font-container($family, $style, $weight, $size, $line-height, $color);

// Example
.section-title {
  @include font-container('Roboto', normal, 700, 1.5rem, 1.5rem, $dark-blue);
}

// Pre-defined typography patterns
@include typography-basic-style;    // Base typography
@include header-dynamic-style;      // Header styles
@include bamboo-tabs;               // Tab styling
```

#### Utility Mixins
```scss
// Text ellipsis with line clamp
@include ellipse(2);  // Show 2 lines, then ellipsis
@include ellipse(3);  // Show 3 lines, then ellipsis

// Border radius
@include border-radius(12);  // 12px border radius

// Word wrapping
@include break-word-wrap;

// Card hover effect (transform + shadow)
@include card-hover;

// Filters
@include filter-bamboo;   // Orange filter
@include filter-orange;   // Orange filter variation

// Size constraints
@include min-max-width(200, 400);   // min-width: 200px, max-width: 400px
@include min-max-height(100, 300);  // min-height: 100px, max-height: 300px
```

### 2. Responsive Design Patterns
**Mobile-first approach with predefined breakpoints:**

#### Breakpoint System
```scss
// Available breakpoints (use mixins, not raw media queries)
$breakpoint-mobile: 360px;          // Mobile devices
$breakpoint-mobile-medium: 375px;   // Medium mobile
$breakpoint-tablet: 600px;          // Tablets
$breakpoint-laptop: 900px;          // Laptops
$breakpoint-desktop: 1200px;        // Desktops
$breakpoint-standard: 1440px;       // Standard screens
$breakpoint-x-large: 1920px;        // Large screens
```

#### Responsive Mixins (Mobile-First)
```scss
// ALWAYS use mobile-first approach
.component {
  // Base styles (mobile)
  padding: 1rem;
  font-size: 0.875rem; // 14px
  
  // Tablet and up
  @include tablet {
    padding: 1.5rem;
    font-size: 1rem; // 16px
  }
  
  // Laptop and up
  @include laptop {
    padding: 2rem;
    font-size: 1.125rem; // 18px
  }
  
  // Desktop and up
  @include desktop {
    padding: 2.5rem;
    font-size: 1.25rem; // 20px
  }
  
  // Extra large screens
  @include desktop-xl {
    padding: 3rem;
    max-width: 1920px;
  }
}
```

### 3. Advanced Color System

#### Opacity Variants
```scss
// Bamboo opacity system (10% to 48%)
$bamboo-opacity1   // rgba(220, 96, 9, 0.1)  - 10% opacity
$bamboo-opacity2   // rgba(220, 96, 9, 0.12) - 12% opacity
$bamboo-opacity3   // rgba(220, 96, 9, 0.16) - 16% opacity
$bamboo-opacity4   // rgba(220, 96, 9, 0.2)  - 20% opacity
$bamboo-opacity48  // rgba(220, 96, 9, 0.48) - 48% opacity

// Blue opacity system (1% to 25%)
$blue-opacity1     // rgba(19, 51, 89, 0.01) - 1% opacity
$blue-opacity25    // rgba(19, 51, 89, 0.25) - 25% opacity

// Usage example
.card {
  background: $white;
  box-shadow: 0px 5px 8px 0px $blue-opacity25;  // Subtle shadow
}

.overlay {
  background: $bamboo-opacity4;  // 20% orange overlay
}

.hover-bg {
  &:hover {
    background: $bamboo-opacity1;  // 10% orange on hover
  }
}
```

#### Gradient System (30+ Predefined)
```scss
// Primary gradients
$gradient-bamboo          // Orange gradient
$gradient-voilet          // Purple gradient
$gradient-button-orange   // Button orange gradient
$orange-gradient          // Orange variation
$blue-gradient            // Blue gradient

// Calculator gradients
$basic-calc              // Basic calculator gradient
$advance-calc            // Advanced calculator gradient

// Special gradients
$btn-gradient            // Standard button gradient
$grey-gradient           // Grey gradient
$gold-gradient           // Gold gradient

// Usage example
.cta-button {
  background: $gradient-button-orange;
  border: none;
  
  &:hover {
    background: $orange-gradient;
  }
}

.premium-card {
  background: $gold-gradient;
}
```

#### Color Utility Functions
```scss
// Tint function - lighten color with alpha
@function tint($color, $percent, $alpha: 1)

// Shade function - darken color with alpha
@function shade($color, $percent, $alpha: 1)

// Usage example
.button {
  background: $bamboo;
  
  &:hover {
    background: shade($bamboo, 10%, 1);  // 10% darker
  }
  
  &:disabled {
    background: tint($bamboo, 30%, 0.5);  // 30% lighter, 50% opacity
  }
}
```

### 4. Shadow System
```scss
// Pre-defined shadows
$grey-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
$card-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
$btn-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 
                 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
                 0 1px 5px 0 rgba(0, 0, 0, 0.12);
$text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

// Usage
.card {
  box-shadow: $card-shadow;
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);  // Elevated
  }
}

.floating-button {
  box-shadow: $btn-box-shadow;
}
```

### 5. Common Layout Patterns

#### Card Layout Pattern
```scss
.goal-card {
  background: $white;
  @include border-radius(12);
  padding: 1.5rem;
  box-shadow: $card-shadow;
  @include card-hover;  // Adds hover effect
  
  &__header {
    @include flex-space-bet;
    @include align-center;
    margin-bottom: 1rem;
  }
  
  &__title {
    @include font-container('Roboto', normal, 700, 1.25rem, 1.5rem, $dark-blue);
    @include ellipse(2);  // Max 2 lines
  }
  
  &__content {
    @include flex-dir-col;
    gap: 1rem;
  }
}
```

#### Stats Grid Pattern
```scss
.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}
```

#### Full-Width Flex Container
```scss
.page-container {
  @include flex-dir-col;
  width: 100%;
  padding: 1.5rem;
  
  @include laptop {
    padding: 2rem 4rem;
  }
  
  @include desktop {
    padding: 2.5rem 6rem;
  }
}
```

### 6. Best Practices Checklist

**Before writing custom CSS, check if variable.scss provides:**
- [ ] Color variable (primary, semantic, opacity)
- [ ] Gradient definition
- [ ] Flex mixin for layout
- [ ] Typography mixin
- [ ] Responsive breakpoint mixin
- [ ] Utility mixin (ellipse, border-radius, card-hover)
- [ ] Shadow definition

**NEVER do this:**
```scss
// ❌ Custom flex without mixin
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// ❌ Hardcoded gradient
.button {
  background: linear-gradient(90deg, #dc6009 0%, #ff8c00 100%);
}

// ❌ Manual media query
@media (min-width: 768px) {
  .component { font-size: 1.2rem; }
}

// ❌ Custom ellipsis
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

**ALWAYS do this:**
```scss
// ✅ Use mixin
.container {
  @include flex-space-bet;
  @include align-center;
}

// ✅ Use predefined gradient
.button {
  background: $gradient-button-orange;
}

// ✅ Use responsive mixin
.component {
  font-size: 1rem;
  
  @include tablet {
    font-size: 1.2rem;
  }
}

// ✅ Use ellipse mixin
.text {
  @include ellipse(2);
}
```

### 7. Complete Real-World Example
```scss
@import '../../../common/styles/variable.scss';

.customer-goal-card {
  // Card container with shadow and hover
  background: $white;
  @include border-radius(16);
  padding: 1.5rem;
  box-shadow: 0px 5px 8px 0px $blue-opacity25;
  @include card-hover;
  
  &__header {
    // Flex layout with space between items
    @include flex-space-bet;
    @include align-center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid $grey-bg;
  }
  
  &__icon {
    width: 2.5rem;
    height: 2.5rem;
    @include border-radius(8);
    background: $light-bamboo-bg;
    @include flex-center-align;
    @include flex-justify-center;
    @include filter-bamboo;
  }
  
  &__title {
    @include font-container('Roboto', normal, 700, 1.25rem, 1.5rem, $dark-blue);
    @include ellipse(2);
    flex: 1;
    margin-left: 1rem;
  }
  
  &__metadata-row {
    @include flex-space-bet;
    @include flex-wrap;
    gap: 1rem;
    padding: 1rem;
    background: $bamboo-opacity1;
    @include border-radius(8);
    
    @include mobile {
      @include flex-dir-col;
      gap: 0.5rem;
    }
  }
  
  &__cost-comparison {
    @include flex-center-align;
    @include flex-justify-center;
    gap: 2rem;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: $gradient-bamboo;
    @include border-radius(12);
    
    @include tablet {
      @include flex-dir-col;
      gap: 1rem;
    }
  }
  
  &__cta-button {
    background: $gradient-button-orange;
    box-shadow: $btn-box-shadow;
    
    &:hover {
      background: $orange-gradient;
    }
    
    &:disabled {
      background: tint($bamboo, 30%, 0.5);
      box-shadow: none;
    }
  }
  
  // Responsive adjustments
  @include laptop {
    padding: 2rem;
  }
  
  @include desktop {
    padding: 2.5rem;
    max-width: 1200px;
  }
}
```

## TypeScript Interface Rules - MANDATORY
**Strong typing is required throughout the codebase:**

### 1. Avoid `any` Type
- **NEVER use** `any` type - prefer specific interfaces
- If type is truly unknown, use `unknown` and narrow with type guards
- **Example:**
  ```typescript
  // ❌ Wrong
  const handleData = (data: any) => { ... }
  
  // ✅ Correct
  interface GoalData {
    goalName: string
    goalType: string
    targetAmount: number
  }
  const handleData = (data: GoalData) => { ... }
  ```

### 2. Use Existing Interfaces
- Import from `src/common/interfaces/` when available
- Check for existing interfaces before creating new ones
- **Common interface locations**:
  - `src/common/interfaces/common/common.ts` - Generic types
  - `src/common/interfaces/questionnaire/questionnaire.ts` - Survey/form types
  - `src/distributor/interfaces/` - Distributor-specific types
  - `src/investor/interfaces/` - Investor-specific types

### 3. Create New Interfaces for Domain Models
- Place in appropriate interfaces directory
- Use descriptive names (e.g., `GoalPlannerDetails`, `AssetAllocation`)
- Export and import where needed
- **Example:**
  ```typescript
  // src/distributor/interfaces/financialPlannerAPI.interface.ts
  export interface Goal {
    goalId: string
    goalName: string
    goalType: 'DREAM_HOME' | 'EDUCATION' | 'RETIREMENT'
    targetAmount: number
    currentSavings: number
    targetYear: number
    inflationRate?: number
    sequenceNo?: number
  }
  
  export interface FinancialPlannerTemplateProps {
    clientOptions: Array<{ label: string; value: string }>
    isLoadingClients: boolean
    errorMessage?: string
    assetAllocationQuestionsData?: any
    demographicData?: DemographicProps[]
  }
  ```

### 4. Component Props Pattern
- Use `React.FC<PropsInterface>` for function components
- Define props interface outside component
- **Example:**
  ```typescript
  interface GoalFormProps {
    goalData: Goal
    onSubmit: (goal: Goal) => void
    onCancel: () => void
    isLoading?: boolean
  }
  
  const GoalForm: React.FC<GoalFormProps> = ({
    goalData,
    onSubmit,
    onCancel,
    isLoading = false
  }) => {
    // Component implementation
  }
  ```

### 5. API Response Typing
- Type all API responses with interfaces
- Handle optional fields with `?` operator
- Use union types for status enums
- **Example:**
  ```typescript
  interface GoalPlannerDetailsResponse {
    planId: string
    planStatus: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED' | null
    goals: Goal[]
    createdAt: string
    lastModified?: string
  }
  ```

## API Integration Patterns - MANDATORY
**Consistent service layer pattern for all API calls:**

### 1. URL Configuration
- **Add endpoint** to `src/common/helpers/constant/url.ts`:
  ```typescript
  export const APIUrl = {
    // ... existing URLs
    fetchGoalPlannerDetails: '/ds/v1/goal-planner/plan/goals/details',
    submitGoalPlannerDetails: '/ds/v1/goal-planner/plan/submit',
  }
  ```

- **Add to private endpoints** in `src/common/services/privateEndpoints.ts`:
  ```typescript
  privateEndpoints: [
    // ... existing endpoints
    APIUrl.fetchGoalPlannerDetails,
    APIUrl.submitGoalPlannerDetails,
  ]
  ```

### 2. Service Layer Pattern
- Create service file in appropriate directory (e.g., `src/distributor/services/`)
- Use class-based services with static methods
- Import `apiCaller` for HTTP requests
- Type all parameters and return types
- **Example structure:**
  ```typescript
  // financialPlanner.service.ts
  import { APIUrl } from '../../../common/helpers/constant/url'
  import { apiCaller } from '../../../common/utilities/apiCaller'
  import { Goal, GoalPlannerDetailsResponse } from '../interfaces/financialPlannerAPI.interface'
  
  class FinancialPlannerService {
    static async fetchGoalPlannerDetails(primaryPan: string): Promise<GoalPlannerDetailsResponse> {
      const response = await apiCaller({
        url: APIUrl.fetchGoalPlannerDetails,
        method: 'POST',
        data: { primaryPan },
      })
      return response.data
    }
    
    static async submitGoalPlannerDetails(payload: {
      clientId: string
      goals: Goal[]
    }): Promise<{ success: boolean; planId: string }> {
      const response = await apiCaller({
        url: APIUrl.submitGoalPlannerDetails,
        method: 'POST',
        data: payload,
      })
      return response.data
    }
  }
  
  export default FinancialPlannerService
  ```

### 3. React Query Integration
- Use `useMutation` for POST/PUT/DELETE operations
- Use `useQuery` for GET operations (if available)
- Handle loading, error, and success states
- **Example:**
  ```typescript
  import { useMutation } from 'react-query'
  import FinancialPlannerService from '../../services/financialPlanner.service'
  
  const MyComponent = () => {
    const submitGoalMutation = useMutation(
      (data: { clientId: string; goals: Goal[] }) =>
        FinancialPlannerService.submitGoalPlannerDetails(data),
      {
        onSuccess: (response) => {
          // Handle success
          console.log('Plan submitted:', response.planId)
        },
        onError: (error: ResponseError) => {
          // Handle error
          console.error('Submission failed:', error)
        },
      }
    )
    
    const handleSubmit = () => {
      submitGoalMutation.mutate({ clientId: 'abc123', goals: [] })
    }
    
    return (
      <AtomButton
        variant="contained"
        onClick={handleSubmit}
        disabled={submitGoalMutation.isLoading}
      >
        {submitGoalMutation.isLoading ? 'Submitting...' : 'Submit'}
      </AtomButton>
    )
  }
  ```

### 4. Error Handling Pattern
- Always handle API errors gracefully
- Show user-friendly error messages
- Log errors for debugging (in development only)
- **Example:**
  ```typescript
  const handleClientChange = async (selectedPan: string) => {
    try {
      const response = await FinancialPlannerService.fetchGoalPlannerDetails(selectedPan)
      
      if (response.planStatus === 'COMPLETED') {
        setShowViewLastPlanButton(true)
      }
      
      // Process goals...
    } catch (error) {
      // Show error to user
      setErrorMessage('Failed to load goal details. Please try again.')
      
      // Log error (development only)
      if (process.env.NODE_ENV === 'development') {
        // tslint:disable-next-line:no-console
        console.error('Failed to fetch goal planner details:', error)
      }
    }
  }
  ```

## State Management Patterns
**Using custom hooks for complex state logic:**

### 1. Custom Hook Pattern
- Create hooks in `src/[investor|distributor]/hooks/` directory
- Export hook function and related types
- Use `useState`, `useEffect`, `useCallback` for state logic
- **Example structure:**
  ```typescript
  // useFinancialPlanner.ts
  import { useState, useCallback } from 'react'
  
  export interface Goal {
    goalId: string
    goalName: string
    goalType: string
    targetAmount: number
    sequenceNo?: number
  }
  
  export const useFinancialPlanner = () => {
    const [goals, setGoals] = useState<Goal[]>([])
    const [activeGoalId, setActiveGoalId] = useState<string | null>(null)
    
    const addGoal = useCallback((goal: Goal) => {
      setGoals(prev => [...prev, { ...goal, goalId: Date.now().toString() }])
    }, [])
    
    const removeGoal = useCallback((goalId: string) => {
      setGoals(prev => prev.filter(g => g.goalId !== goalId))
    }, [])
    
    const updateGoal = useCallback((goalId: string, updates: Partial<Goal>) => {
      setGoals(prev => prev.map(g => 
        g.goalId === goalId ? { ...g, ...updates } : g
      ))
    }, [])
    
    return {
      goals,
      activeGoalId,
      setActiveGoalId,
      addGoal,
      removeGoal,
      updateGoal,
    }
  }
  ```

### 2. Component State Rules
- Use `useState` for local component state
- Use custom hooks for shared/complex state
- Use React Query for server state
- Avoid prop drilling - use context or hooks for deep state

### 3. Conditional Rendering Patterns
- Use plan status to control UI flow
- **Example:**
  ```typescript
  const [planStatus, setPlanStatus] = useState<'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED' | null>(null)
  const [showViewLastPlanButton, setShowViewLastPlanButton] = useState(false)
  
  // Determine button visibility based on plan status
  useEffect(() => {
    if (planStatus === 'COMPLETED') {
      setShowViewLastPlanButton(true)
    } else {
      setShowViewLastPlanButton(false)
    }
  }, [planStatus])
  
  // Conditional rendering
  {showViewLastPlanButton && (
    <AtomButton variant="outlined" className="view-plan-button">
      View Last Created Goal Plan
    </AtomButton>
  )}
  ```

## File Organization Best Practices

### 1. Component File Structure
```
src/distributor/templates/financialPlanner/
├── FinancialPlannerTemplate.tsx        # Main template component
├── financialPlannerTemplate.scss       # Main styles
├── financialPlanner.constants.ts       # Constants
├── components/                         # Sub-components
│   ├── GoalForm.tsx
│   ├── GoalForm.scss
│   ├── GoalAccordion.tsx
│   ├── GoalAccordion.scss
│   ├── ConfirmationModal.tsx
│   └── ConfirmationModal.scss
└── assetAllocationQuestions/          # Feature-specific module
    ├── index.tsx
    ├── constants.ts
    └── assetAllocationQuestions.scss
```

### 2. Import Order Convention
```typescript
// 1. React and third-party libraries
import { Container, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'

// 2. Common atoms from src/common/atoms/
import AtomAutocomplete from '../../../common/atoms/autoComplete'
import AtomButton from '../../../common/atoms/button'
import AtomTypography from '../../../common/atoms/typography'

// 3. Common utilities, helpers, interfaces
import { NUMBER_CONSTANTS } from '../../../common/helpers/constant/constants'
import { ResponseError } from '../../../common/interfaces/common/common'

// 4. Feature-specific hooks and interfaces
import { Goal, useFinancialPlanner } from '../../hooks/useFinancialPlanner'
import { FinancialPlannerTemplateProps } from '../../interfaces/financialPlannerAPI.interface'

// 5. Services
import FinancialPlannerService from '../../services/financialPlanner.service'

// 6. Local components
import GoalForm from './components/GoalForm'
import ConfirmationModal from './components/ConfirmationModal'

// 7. Constants
import { FINANCIAL_PLANNER_CONSTANTS } from './financialPlanner.constants'

// 8. Styles (always last)
import './financialPlannerTemplate.scss'
```

## Business Logic Patterns (Financial Planner Example)

### 1. Plan Status Management
```typescript
// Define status types
type PlanStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED' | null

// Track status
const [planStatus, setPlanStatus] = useState<PlanStatus>(null)

// Status-based logic
const handleClientChange = async (clientPan: string) => {
  const response = await FinancialPlannerService.fetchGoalPlannerDetails(clientPan)
  
  setPlanStatus(response.planStatus)
  
  // Show different UI based on status
  if (response.planStatus === 'COMPLETED') {
    setShowViewLastPlanButton(true)
    setIsReadOnly(true) // Goals are locked
  } else if (response.planStatus === 'DRAFT' || response.planStatus === 'IN_PROGRESS') {
    setShowViewLastPlanButton(false)
    setIsReadOnly(false) // Goals are editable
    loadExistingGoals(response.goals)
  }
}
```

### 2. Sequential Workflow Management
```typescript
// Multi-step flow with stepper
const [activeStep, setActiveStep] = useState(0)

const handleNext = () => {
  if (activeStep === 0) {
    // Validate Stage 1 before proceeding
    if (!isStage1Valid()) {
      showValidationError()
      return
    }
  }
  setActiveStep(prev => prev + 1)
}

const handleBack = () => {
  setActiveStep(prev => prev - 1)
}
```

### 3. Goal Type Mapping
```typescript
// Map API goal types to UI
const goalTypeMapping: Record<string, string> = {
  'Child Education': 'CHILD_EDUCATION',
  'Child Wedding': 'CHILD_WEDDING',
  'Dream Home': 'DREAM_HOME',
  'Education': 'EDUCATION',
  'Marriage': 'MARRIAGE',
  'Wealth Creation': 'WEALTH_CREATION',
  'Retirement': 'RETIREMENT',
  'Holidays': 'HOLIDAYS',
}

// Reverse mapping for display
const displayGoalType = (apiType: string): string => {
  return Object.keys(goalTypeMapping).find(
    key => goalTypeMapping[key] === apiType
  ) || apiType
}
```

## Critical Validation Checklist (Before PR)
**Use this checklist before submitting any code:**

- [ ] **No MUI components used directly** (Typography, Button, TextField, etc.)
- [ ] **All AtomTypography has `styleType` prop** ('Reg' or 'Bold')
- [ ] **No `sx` props on Atom components** (use `className` instead)
- [ ] **All measurements use `rem`**, not `px`
- [ ] **All SCSS files import `variable.scss`**
- [ ] **Semantic class names** assigned with BEM convention
- [ ] **No `console.*` statements** in production code
- [ ] **No lambda functions in JSX** attributes
- [ ] **No reserved keywords** as variable names
- [ ] **All TypeScript types properly defined** (no `any`)
- [ ] **API endpoints added** to url.ts and privateEndpoints.ts
- [ ] **Service methods properly typed** with interfaces
- [ ] **Error handling implemented** for all API calls
- [ ] **Loading states handled** for async operations
- [ ] **Run `yarn tslint-check`** - no errors

## Common Mistakes to Avoid

### ❌ FORBIDDEN Patterns (Will Cause Errors)
```tsx
// ❌ Using MUI Typography directly
import { Typography } from '@mui/material'
<Typography variant="h6">Title</Typography>

// ❌ Missing styleType on AtomTypography
<AtomTypography variant="h6">Title</AtomTypography>

// ❌ Using sx prop on Atom components
<AtomButton sx={{ padding: '8px' }}>Click</AtomButton>

// ❌ Using px units in SCSS
.component {
  padding: 16px;
  font-size: 14px;
}

// ❌ Lambda functions in JSX
<button onClick={() => handleClick(id)}>Click</button>

// ❌ Using any type
const handleData = (data: any) => { ... }

// ❌ Console statements in production
console.log('Debug info')

// ❌ Hardcoded colors
.component {
  background: #dc6009;
}
```

### ✅ CORRECT Patterns (Always Follow)
```tsx
// ✅ Using AtomTypography with styleType
import AtomTypography from '../../../common/atoms/typography'
<AtomTypography variant="h6" styleType="Bold" className="title">
  Title
</AtomTypography>

// ✅ Using className with SCSS
<AtomButton variant="contained" className="submit-btn">
  Click
</AtomButton>

// ✅ Using rem units
.component {
  padding: 1rem; // 16px
  font-size: 0.875rem; // 14px
}

// ✅ Handler factory functions
const createClickHandler = (id: string) => () => handleClick(id)
<button onClick={createClickHandler(id)}>Click</button>

// ✅ Proper TypeScript interfaces
interface DataPayload {
  id: string
  name: string
}
const handleData = (data: DataPayload) => { ... }

// ✅ Using color variables
@import '../../../common/styles/variable.scss';
.component {
  background: $bamboo;
}
```

## References
- See `README.md` for more details on scripts and workflows.
- Example config: `config/env.js`, `config/webpack*.js`.
- Example entry: `src/investor/investorApp.tsx`, `src/distributor/distributorApp.tsx`.

---
For more, see the [Create React App docs](https://facebook.github.io/create-react-app/docs/getting-started).
