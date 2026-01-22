# Component Library

## Overview
This document provides documentation for the component library used in the storefront base template. The library consists of reusable UI components organized by module, following a consistent design system and implementation patterns.

## Component Organization

### Module-Based Structure
Components are organized by functional modules:

```
src/modules/
├── account/
├── cart/
├── checkout/
├── common/
├── home/
├── layout/
├── order/
├── products/
├── shipping/
├── skeletons/
└── store/
```

### Common Components
Shared components used across multiple modules are located in `src/modules/common/`.

## Available Components

### Common Components

#### Button
Basic button component with multiple variants.

**Location:** `src/modules/common/components/button.tsx`

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}
```

**Usage:**
```tsx
import { Button } from "@modules/common/components/button"

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

#### Input
Standard input component with validation support.

**Location:** `src/modules/common/components/input.tsx`

**Props:**
```typescript
interface InputProps {
  label?: string
  error?: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}
```

#### Modal
Overlay modal component for displaying content.

**Location:** `src/modules/common/components/modal.tsx`

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}
```

#### Divider
Horizontal divider with optional text.

**Location:** `src/modules/common/components/divider.tsx`

**Props:**
```typescript
interface DividerProps {
  text?: string
  orientation?: 'horizontal' | 'vertical'
}
```

### Layout Components

#### Header
Main navigation header with search and cart functionality.

**Location:** `src/modules/layout/templates/nav/index.tsx`

**Features:**
- Responsive mobile menu
- Search functionality
- Cart indicator
- Account menu
- Region selector

#### Footer
Comprehensive footer with multiple content areas.

**Location:** `src/modules/layout/templates/footer/index.tsx`

**Features:**
- Multi-column layout
- Navigation links
- Social media integration
- Newsletter signup
- Payment method badges
- Legal links

#### Cart Dropdown
Slide-out cart panel with item management.

**Location:** `src/modules/layout/components/cart-dropdown/index.tsx`

**Features:**
- Item quantity adjustment
- Remove items
- Subtotal calculation
- Checkout button

### Product Components

#### Product Preview
Compact product display for grids and lists.

**Location:** `src/modules/products/components/product-preview/index.tsx`

**Props:**
```typescript
interface ProductPreviewProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isFeatured?: boolean
}
```

**Features:**
- Product image
- Title and price display
- Sale price indication
- Favorite/wishlist button

#### Product Gallery
Image gallery for product detail pages.

**Location:** `src/modules/products/components/image-gallery/index.tsx`

**Features:**
- Main image display
- Thumbnail navigation
- Zoom functionality
- Mobile swipe support

### Cart Components

#### Cart Item
Individual cart item with controls.

**Location:** `src/modules/cart/components/item/index.tsx`

**Features:**
- Product information
- Quantity selector
- Price display
- Remove button

#### Cart Totals
Summary of cart pricing information.

**Location:** `src/modules/common/components/cart-totals/index.tsx`

**Features:**
- Subtotal calculation
- Shipping cost display
- Tax calculation
- Total amount

### Checkout Components

#### Address Form
Form for collecting shipping/billing addresses.

**Location:** `src/modules/checkout/components/shipping-address/index.tsx`

**Features:**
- Field validation
- Country selection
- Postal code lookup
- Save address option

#### Payment Section
Payment method selection and processing.

**Location:** `src/modules/checkout/components/payment/index.tsx`

**Features:**
- Payment method selection
- Card input fields
- Payment processing
- Error handling

### Account Components

#### Login Form
Authentication form for existing customers.

**Location:** `src/modules/account/components/login/index.tsx`

**Features:**
- Email/password fields
- Validation
- Error messaging
- Forgot password link

#### Registration Form
New customer registration form.

**Location:** `src/modules/account/components/register/index.tsx`

**Features:**
- Name, email, password fields
- Terms acceptance
- Validation
- Account creation

### Order Components

#### Order Summary
Display of order details and status.

**Location:** `src/modules/order/components/order-summary/index.tsx`

**Features:**
- Order items list
- Pricing breakdown
- Shipping information
- Status tracking

## Component Development Guidelines

### TypeScript Interfaces
All components should have well-defined TypeScript interfaces for props:

```typescript
interface ComponentProps {
  /** Brief description of prop */
  propName: PropType

  /** Optional prop with default value */
  optionalProp?: PropType
}
```

### Accessibility Standards
Components must meet WCAG 2.1 AA compliance:

1. **Semantic HTML**
   - Proper element usage
   - Correct heading hierarchy
   - Meaningful link text

2. **Keyboard Navigation**
   - Tab order
   - Focus management
   - Keyboard shortcuts

3. **Screen Reader Support**
   - ARIA attributes
   - Label associations
   - Status announcements

### Performance Optimization

#### Lazy Loading
Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'))
```

#### Memoization
Implement `React.memo` for components with stable props:

```typescript
const MemoizedComponent = React.memo(function Component({ prop1, prop2 }) {
  // Component implementation
})
```

#### Bundle Optimization
- Minimize dependencies
- Use tree shaking
- Split large components
- Optimize images

### Styling Guidelines

#### Tailwind CSS
Use Tailwind utility classes for consistent styling:

```tsx
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  {/* Component content */}
</div>
```

#### Responsive Design
Implement mobile-first responsive design:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid layout */}
</div>
```

#### Dark Mode Support
Provide dark mode styling with Tailwind variants:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Component with dark mode support */}
</div>
```

### Error Handling

#### Graceful Degradation
Handle missing data gracefully:

```tsx
if (!data) {
  return <SkeletonComponent />
}

if (error) {
  return <ErrorMessage error={error} />
}

return <ComponentWithData data={data} />
```

#### Error Boundaries
Wrap components that might throw errors:

```tsx
import { ErrorBoundary } from "react-error-boundary"

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <PotentiallyFailingComponent />
</ErrorBoundary>
```

### Testing

#### Unit Tests
Test component rendering and basic functionality:

```tsx
describe('ComponentName', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ComponentName />)
    expect(getByText('Expected text')).toBeInTheDocument()
  })
})
```

#### Integration Tests
Test component interactions and data flow:

```tsx
it('handles user interaction', async () => {
  const mockOnClick = jest.fn()
  const { getByRole } = render(<Button onClick={mockOnClick} />)

  fireEvent.click(getByRole('button'))

  expect(mockOnClick).toHaveBeenCalled()
})
```

## Component Extension Points

### Props System
Design components with extensible props:

```typescript
interface BaseProps {
  className?: string
  children?: React.ReactNode
}

interface ExtendedProps extends BaseProps {
  customVariant?: string
  onCustomEvent?: () => void
}
```

### Slot Pattern
Allow customization of component internals:

```tsx
interface ComponentSlots {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

const ComponentWithSlots = ({ slots }: { slots: ComponentSlots }) => (
  <div>
    <header>{slots.header || <DefaultHeader />}</header>
    <main>{slots.content || <DefaultContent />}</main>
    <footer>{slots.footer || <DefaultFooter />}</footer>
  </div>
)
```

### Render Props
Provide flexible rendering customization:

```tsx
interface ComponentRenderProps {
  renderItem: (item: ItemType) => React.ReactNode
  renderEmpty: () => React.ReactNode
}

const FlexibleListComponent = ({ renderItem, renderEmpty }: ComponentRenderProps) => {
  if (items.length === 0) {
    return renderEmpty()
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
```

## Component Migration Strategy

### Legacy Component Updates
Process for updating existing components:

1. **Audit Current Implementation**
   - Review component structure
   - Identify performance issues
   - Check accessibility compliance
   - Evaluate TypeScript coverage

2. **Incremental Improvements**
   - Add TypeScript interfaces
   - Implement accessibility features
   - Optimize performance
   - Add unit tests

3. **Major Refactors**
   - Restructure component architecture
   - Implement new design patterns
   - Add advanced features
   - Update documentation

### New Component Development
Process for creating new components:

1. **Requirements Analysis**
   - Define component purpose
   - Identify usage patterns
   - Determine props interface
   - Plan accessibility features

2. **Implementation**
   - Create component file
   - Implement core functionality
   - Add TypeScript types
   - Include basic styling

3. **Testing**
   - Write unit tests
   - Implement integration tests
   - Verify accessibility
   - Test responsive behavior

4. **Documentation**
   - Add JSDoc comments
   - Create usage examples
   - Document props interface
   - Include best practices

## Component Performance Monitoring

### Metrics to Track
1. **Bundle Size Impact**
   - Individual component size
   - Dependency overhead
   - Bundle optimization opportunities

2. **Rendering Performance**
   - Mount time
   - Update frequency
   - Memory usage
   - Re-render triggers

3. **User Experience**
   - Interaction latency
   - Perceived performance
   - Error rates
   - Accessibility scores

### Optimization Techniques
1. **Code Splitting**
   - Dynamic imports
   - Route-based splitting
   - Component-level splitting

2. **Caching Strategies**
   - Memoization
   - Context optimization
   - Data caching

3. **Lazy Loading**
   - Intersection Observer
   - Suspense boundaries
   - Progressive enhancement

## Component Versioning

### Breaking Changes
Document breaking changes clearly:
- Removed props
- Changed prop types
- Modified behavior
- Updated dependencies

### Deprecation Process
Gradually phase out deprecated components:
1. Mark as deprecated in documentation
2. Provide migration guides
3. Offer alternative implementations
4. Remove in major versions

### Backward Compatibility
Maintain compatibility when possible:
- Default prop values
- Fallback implementations
- Warning messages
- Gradual migration paths