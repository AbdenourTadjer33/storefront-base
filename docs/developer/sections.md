# Homepage Sections System

## Overview
The homepage sections system provides a modular, extensible architecture for building dynamic and customizable homepage experiences. This document details the current implementation and planned enhancements for the section management system.

## Current Implementation

### Existing Sections

#### Hero Section
Located at `src/modules/home/components/hero/index.tsx`:
- Full-width banner component
- Static content with heading and description
- Call-to-action button linking to GitHub
- Basic styling with Medusa UI components

#### Featured Products Rail
Located at `src/modules/home/components/featured-products/`:
- Dynamic product showcase organized by collections
- Automatic collection listing from Medusa
- Product previews with pricing information
- "View all" links to collection pages
- Responsive grid layout

### Component Structure
```
src/modules/home/components/
├── hero/
│   └── index.tsx
└── featured-products/
    ├── index.tsx
    └── product-rail/
        └── index.tsx
```

### Current Limitations
1. Hardcoded section components
2. No CMS integration
3. Limited customization options
4. No drag-and-drop arrangement
5. No section-level theming overrides
6. No responsive behavior controls

## Planned Enhanced Sections System

### Modular Section Architecture

#### Section Types
Implementation of various section types with consistent interfaces:

1. **Hero Sections**
   - Image-based heroes
   - Video heroes
   - Carousel heroes
   - Animated heroes

2. **Product Sections**
   - Featured products
   - New arrivals
   - Bestsellers
   - Curated product lists

3. **Category/Collection Sections**
   - Category showcases
   - Collection highlights
   - Brand spotlights

4. **Content Sections**
   - Rich text content
   - Image galleries
   - Call-to-action blocks
   - Testimonial sections

5. **Custom Sections**
   - Newsletter signup
   - Promotional banners
   - Social media feeds
   - Custom HTML blocks

#### Section Interface
```typescript
// types/sections.ts
export interface BaseSection {
  id: string
  type: string
  order: number
  isVisible: boolean
  settings: Record<string, any>
}

export interface HeroSection extends BaseSection {
  type: 'hero'
  settings: {
    title: string
    subtitle: string
    backgroundImage: string
    ctaText: string
    ctaLink: string
    variant: 'image' | 'video' | 'carousel'
  }
}

export interface ProductSection extends BaseSection {
  type: 'product'
  settings: {
    title: string
    collectionId: string
    productId: string
    displayCount: number
    layout: 'grid' | 'carousel'
  }
}

export interface ContentSection extends BaseSection {
  type: 'content'
  settings: {
    title: string
    content: string
    image: string
    ctaText: string
    ctaLink: string
    layout: 'left' | 'right' | 'center'
  }
}
```

### Section Management System

#### Configuration Schema
Implementation of a flexible configuration system:

```typescript
// lib/sections/config.ts
export interface SectionConfig {
  sections: Array<BaseSection>
  breakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
  themeOverrides: {
    [sectionId: string]: Record<string, any>
  }
}

export const defaultSectionConfig: SectionConfig = {
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      order: 0,
      isVisible: true,
      settings: {
        title: 'Welcome to Our Store',
        subtitle: 'Discover amazing products',
        ctaText: 'Shop Now',
        ctaLink: '/products',
        variant: 'image'
      }
    },
    {
      id: 'featured-1',
      type: 'product',
      order: 1,
      isVisible: true,
      settings: {
        title: 'Featured Products',
        collectionId: 'featured-collection',
        displayCount: 6,
        layout: 'grid'
      }
    }
  ],
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
  },
  themeOverrides: {}
}
```

#### Section Renderer Component
```tsx
// components/section-renderer.tsx
"use client"

import { HeroSection } from "./sections/hero"
import { ProductSection } from "./sections/product"
import { ContentSection } from "./sections/content"

export function SectionRenderer({ sections }: { sections: BaseSection[] }) {
  return (
    <div className="homepage-sections">
      {sections
        .filter(section => section.isVisible)
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          switch (section.type) {
            case 'hero':
              return <HeroSection key={section.id} {...section} />
            case 'product':
              return <ProductSection key={section.id} {...section} />
            case 'content':
              return <ContentSection key={section.id} {...section} />
            default:
              return null
          }
        })}
    </div>
  )
}
```

### CMS-Ready Structure

#### API Integration
Implementation of CMS-compatible data structures:

```typescript
// lib/cms/sections.ts
export async function getHomepageSections(pageId: string) {
  // Fetch sections from CMS
  const response = await fetch(`/api/cms/pages/${pageId}/sections`)
  const sections = await response.json()

  // Validate and normalize data
  return sections.map(normalizeSection)
}

function normalizeSection(section: any): BaseSection {
  // Ensure section has required properties
  return {
    id: section.id || Math.random().toString(36),
    type: section.type,
    order: section.order || 0,
    isVisible: section.isVisible !== false,
    settings: section.settings || {}
  }
}
```

#### Section Editor Component
```tsx
// components/section-editor.tsx
"use client"

import { useState } from "react"

export function SectionEditor({ initialSections }: { initialSections: BaseSection[] }) {
  const [sections, setSections] = useState(initialSections)

  const addSection = (type: string) => {
    const newSection: BaseSection = {
      id: `section-${Date.now()}`,
      type,
      order: sections.length,
      isVisible: true,
      settings: getDefaultSettings(type)
    }
    setSections([...sections, newSection])
  }

  const updateSection = (id: string, updates: Partial<BaseSection>) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    ))
  }

  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id))
  }

  return (
    <div className="section-editor">
      {/* Section management UI */}
      <div className="sections-list">
        {sections.map(section => (
          <SectionItem
            key={section.id}
            section={section}
            onUpdate={updateSection}
            onRemove={removeSection}
          />
        ))}
      </div>
      <div className="add-section-controls">
        <button onClick={() => addSection('hero')}>Add Hero</button>
        <button onClick={() => addSection('product')}>Add Product</button>
        <button onClick={() => addSection('content')}>Add Content</button>
      </div>
    </div>
  )
}
```

### Responsive Behavior Controls

#### Breakpoint Configuration
Implementation of responsive section behavior:

```typescript
// types/responsive.ts
export interface ResponsiveSettings {
  mobile: {
    isVisible: boolean
    settings: Record<string, any>
  }
  tablet: {
    isVisible: boolean
    settings: Record<string, any>
  }
  desktop: {
    isVisible: boolean
    settings: Record<string, any>
  }
}

export interface ResponsiveSection extends BaseSection {
  responsive: ResponsiveSettings
}
```

#### Responsive Section Component
```tsx
// components/responsive-section.tsx
"use client"

import { useBreakpoint } from "@/hooks/use-breakpoint"

export function ResponsiveSection({ section }: { section: ResponsiveSection }) {
  const { breakpoint } = useBreakpoint()

  // Determine which settings to use based on current breakpoint
  const currentSettings = section.responsive?.[breakpoint]?.settings || section.settings
  const isVisible = section.responsive?.[breakpoint]?.isVisible ?? section.isVisible

  if (!isVisible) return null

  // Render appropriate section component with current settings
  return renderSectionComponent(section.type, currentSettings)
}
```

### Section-Level Theming Overrides

#### Theme Override System
Implementation of per-section theme customization:

```typescript
// types/theme.ts
export interface SectionThemeOverride {
  colors?: {
    background?: string
    text?: string
    accent?: string
  }
  spacing?: {
    padding?: string
    margin?: string
  }
  typography?: {
    headingSize?: string
    bodySize?: string
  }
}

export interface ThemedSection extends BaseSection {
  themeOverrides?: SectionThemeOverride
}
```

#### Styled Section Wrapper
```tsx
// components/styled-section-wrapper.tsx
"use client"

import { css } from "@emotion/react"

export function StyledSectionWrapper({
  section,
  children
}: {
  section: ThemedSection,
  children: React.ReactNode
}) {
  const themeStyles = section.themeOverrides ? css`
    ${section.themeOverrides.colors?.background &&
      `background-color: ${section.themeOverrides.colors.background};`}
    ${section.themeOverrides.colors?.text &&
      `color: ${section.themeOverrides.colors.text};`}
    ${section.themeOverrides.spacing?.padding &&
      `padding: ${section.themeOverrides.spacing.padding};`}
    ${section.themeOverrides.spacing?.margin &&
      `margin: ${section.themeOverrides.spacing.margin};`}
  ` : ''

  return (
    <section css={themeStyles}>
      {children}
    </section>
  )
}
```

### Migration Path

#### From Current Implementation
Steps to migrate from the current hardcoded sections to the enhanced system:

1. **Phase 1: Foundation**
   - Implement section configuration schema
   - Create section renderer component
   - Refactor existing sections to new interface

2. **Phase 2: Management**
   - Add section management UI
   - Implement CMS integration
   - Add responsive behavior controls

3. **Phase 3: Enhancement**
   - Add theme override capabilities
   - Implement advanced section types
   - Add drag-and-drop arrangement

#### Backward Compatibility
Ensure backward compatibility during migration:

1. Maintain existing section components
2. Provide migration utilities for existing content
3. Support gradual adoption of new features
4. Document migration steps for developers

### Best Practices

#### Section Development
1. Use consistent component interfaces
2. Implement proper error boundaries
3. Optimize for performance
4. Ensure accessibility compliance
5. Provide clear configuration options

#### Performance Considerations
1. Lazy-load section components
2. Implement proper code splitting
3. Optimize image loading in sections
4. Use Suspense boundaries appropriately
5. Cache section data effectively

#### Extensibility
1. Design sections as independent modules
2. Provide clear extension points
3. Document customization options
4. Follow consistent naming conventions
5. Implement proper type definitions

#### Testing
1. Test sections in isolation
2. Verify responsive behavior
3. Check accessibility compliance
4. Validate CMS integration
5. Test theme override functionality