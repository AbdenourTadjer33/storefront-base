# Code Patterns and Conventions

## Overview
This document outlines the code patterns, conventions, and best practices used throughout the storefront base template. Following these patterns ensures consistency, maintainability, and scalability across all implementations.

## Module-Based Architecture

### Structure
The project follows a module-based architecture where features are organized into self-contained modules:

```
src/
├── modules/
│   ├── account/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   ├── layout/
│   └── products/
```

### Module Composition
Each module contains:
- `components/` - UI components specific to the module
- `templates/` - Page-level components that compose multiple components
- Hooks and utilities relevant to the module's functionality

### Benefits
- Clear separation of concerns
- Independent development and testing
- Easier code navigation and maintenance
- Reduced coupling between features

## Component Patterns

### Server Components
Most components in the storefront are Server Components that fetch data directly from Medusa:

```typescript
// Example Server Component
export default async function ProductRail({ collection, region }) {
  const { response: { products: pricedProducts } } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  // Render component with fetched data
}
```

### Client Components
Components requiring interactivity are marked with `"use client"` directive:

```typescript
// Example Client Component
"use client"

import { useState } from "react"

export default function InteractiveComponent() {
  const [state, setState] = useState(false)

  // Component logic
}
```

### Component Composition Rules
1. Server Components can import other Server Components
2. Client Components can import other Client Components
3. Client Components can import Server Components (but not vice versa)
4. Use composition over inheritance for flexible UI building

## Data Fetching Patterns

### Server-Side Data Fetching
Data is fetched server-side using dedicated utility functions:

```typescript
// In lib/data/products.ts
export async function listProducts(queryParams: QueryParams) {
  const response = await fetch(`${MEDUSA_BACKEND_URL}/store/products`, {
    // ...fetch options
  })
  return response.json()
}
```

### Caching Strategy
Next.js caching is utilized for optimal performance:
- Region data is cached for 1 hour
- Static assets use long-term caching
- Dynamic data uses appropriate revalidation times

## Styling Patterns

### Tailwind CSS
All styling is implemented using Tailwind CSS with the following conventions:

1. Utility-first approach
2. Consistent spacing using the defined scale
3. Responsive design with mobile-first breakpoints
4. Dark mode support using `dark:` variants

### Custom Classes
Custom classes are defined in `src/styles/globals.css` for:
- Utility classes not covered by Tailwind
- Component-specific styles that enhance maintainability
- Animation keyframes and transitions

## Internationalization Patterns

### Route-Based Localization
Internationalization is implemented using route-based localization:
- Country code routing (`/[countryCode]/`)
- Automatic region detection based on IP geolocation
- Medusa region integration for localized pricing

### Content Localization
Content localization follows these patterns:
- Dynamic content fetching based on region
- Currency formatting using region data
- Date/time formatting based on locale

## Error Handling Patterns

### Graceful Degradation
Components gracefully handle missing data:

```typescript
if (!collections || !region) {
  return null
}
```

### Error Boundaries
Client Components implement error boundaries for robust error handling:

```typescript
"use client"

import { ErrorBoundary } from "react-error-boundary"

export default function ComponentWithFallback() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {/* Component content */}
    </ErrorBoundary>
  )
}
```

## Testing Patterns

### Unit Testing
Unit tests focus on:
- Utility functions
- Helper functions
- Pure component logic

### Integration Testing
Integration tests cover:
- Data fetching functions
- Component compositions
- User interaction flows

## Performance Patterns

### Code Splitting
Next.js App Router provides automatic code splitting by:
- Route segments
- Dynamic imports
- Suspense boundaries

### Optimization Techniques
1. Image optimization through Next.js Image component
2. Server-side rendering for initial page load
3. Static asset optimization
4. Bundle size monitoring and optimization

## Security Patterns

### Environment Variables
Sensitive data is managed through environment variables:
- API keys prefixed with `NEXT_PUBLIC_` for client-side access
- Server-only variables for backend services
- Proper `.env` file management

### Input Validation
All user inputs are validated:
- Client-side validation for UX
- Server-side validation for security
- Type checking with TypeScript

## Accessibility Patterns

### WCAG Compliance
Components follow WCAG 2.1 AA guidelines:
- Proper semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility

### Focus Management
Interactive components implement proper focus management:
- Focus trapping in modals
- Skip navigation links
- Logical tab order