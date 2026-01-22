# Theming System and Customization

## Overview
The storefront base template implements a comprehensive theming system built on Tailwind CSS with custom configuration. This document details the theming architecture, customization options, and extension points.

## Current Theming Implementation

### Tailwind CSS Configuration
The theme is configured through `tailwind.config.js` with the following key aspects:

1. **Dark Mode Support**
   - Class-based dark mode implementation
   - Preset from `@medusajs/ui-preset`

2. **Color Palette**
   - Custom grey scale (0-90)
   - UI colors from Medusa UI preset
   - Semantic color mappings

3. **Typography**
   - Font family stack with Inter as primary
   - Custom font sizes
   - Responsive typography scaling

4. **Spacing System**
   - Custom screen breakpoints (2xsmall to 2xlarge)
   - Consistent spacing scale
   - Responsive design foundation

5. **Border Radius**
   - Named radius values (none, soft, base, rounded, large, circle)
   - Consistent rounding across components

6. **Animations**
   - Custom keyframes for various interactions
   - Smooth transitions and entrance animations
   - Performance-optimized animations

### Current Limitations
1. Basic light/dark mode with Tailwind presets only
2. Limited customization of design tokens
3. No visual theme editor
4. No theme switching beyond light/dark modes

## Planned Advanced Theming System

### Type-Safe Theme Configuration
Implementation of a comprehensive TypeScript-based theme configuration system:

```typescript
// Example theme configuration interface
interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    neutral: {
      0: string
      5: string
      // ... other neutral shades
    }
    semantic: {
      success: string
      warning: string
      error: string
      info: string
    }
  }
  typography: {
    fonts: {
      heading: string
      body: string
    }
    scales: {
      xs: string
      sm: string
      base: string
      // ... other sizes
    }
  }
  spacing: {
    scales: number[]
  }
  borders: {
    radius: {
      none: string
      small: string
      medium: string
      large: string
      circle: string
    }
    widths: {
      thin: string
      thick: string
    }
  }
  shadows: {
    levels: {
      1: string
      2: string
      3: string
      4: string
    }
  }
  transitions: {
    duration: {
      fast: string
      normal: string
      slow: string
    }
    easing: {
      standard: string
      accelerate: string
      decelerate: string
    }
  }
}
```

### Design Token System
Implementation of a comprehensive design token system:

1. **Color Tokens**
   - Primary, secondary, and accent colors
   - Neutral color palette
   - Semantic colors (success, warning, error, info)
   - Brand color customization

2. **Typography Tokens**
   - Font families (heading, body, monospace)
   - Font sizes and line heights
   - Font weights
   - Letter spacing variations

3. **Spacing Tokens**
   - Consistent spacing scale
   - Padding and margin utilities
   - Gap values for flex/grid layouts

4. **Border Tokens**
   - Border radius values
   - Border width options
   - Border style configurations

5. **Shadow Tokens**
   - Elevation-based shadow system
   - Different shadow intensities
   - Contextual shadow applications

6. **Motion Tokens**
   - Transition durations
   - Easing functions
   - Animation delays

### Theme Switching Capability
Implementation of advanced theme switching beyond light/dark modes:

1. **Multiple Theme Variants**
   - Light theme
   - Dark theme
   - High contrast theme
   - Seasonal themes
   - Brand-specific themes

2. **Theme Provider Component**
   ```typescript
   // Example theme provider
   "use client"

   import { ThemeProvider as NextThemesProvider } from "next-themes"

   export function ThemeProvider({
     children,
     themes,
     defaultTheme,
   }: {
     children: React.ReactNode
     themes: string[]
     defaultTheme: string
   }) {
     return (
       <NextThemesProvider
         themes={themes}
         defaultTheme={defaultTheme}
         enableSystem
         disableTransitionOnChange
       >
         {children}
       </NextThemesProvider>
     )
   }
   ```

3. **Theme Selector Component**
   - UI component for theme selection
   - Persistence of user preference
   - System preference detection

### Customization Guide

#### Color Customization
To customize the color palette:

1. Update `tailwind.config.js`:
   ```javascript
   theme: {
     extend: {
       colors: {
         brand: {
           primary: '#your-primary-color',
           secondary: '#your-secondary-color',
         }
       }
     }
   }
   ```

2. Use in components:
   ```html
   <div className="bg-brand-primary text-brand-secondary">
     Custom themed content
   </div>
   ```

#### Typography Customization
To customize typography:

1. Update font families in `tailwind.config.js`:
   ```javascript
   theme: {
     extend: {
       fontFamily: {
         heading: ['YourHeadingFont', 'sans-serif'],
         body: ['YourBodyFont', 'sans-serif'],
       }
     }
   }
   ```

2. Add custom font declarations in `globals.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');
   ```

#### Spacing Customization
To customize spacing:

1. Extend the spacing scale in `tailwind.config.js`:
   ```javascript
   theme: {
     extend: {
       spacing: {
         '18': '4.5rem',
         '88': '22rem',
       }
     }
   }
   ```

#### Component-Level Theming
To theme individual components:

1. Use Tailwind's arbitrary values:
   ```html
   <button className="bg-[#custom-color] hover:bg-[#custom-hover-color]">
     Custom themed button
   </button>
   ```

2. Create component-specific CSS:
   ```css
   .product-card {
     @apply bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700;
   }
   ```

### Theme Validation and Type Safety

#### TypeScript Theme Interface
Implementation of strict typing for theme configuration:

```typescript
// types/theme.ts
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: {
    default: string
    surface: string
    overlay: string
  }
  text: {
    primary: string
    secondary: string
    disabled: string
  }
  // ... other color definitions
}

export interface ThemeTypography {
  fonts: {
    heading: string[]
    body: string[]
    mono: string[]
  }
  sizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  // ... other typography definitions
}

export interface ThemeConfiguration {
  colors: ThemeColors
  typography: ThemeTypography
  // ... other theme properties
}
```

#### Runtime Validation
Implementation of runtime validation for theme configurations:

```typescript
// utils/theme-validator.ts
import { ThemeConfiguration } from '@/types/theme'

export function validateTheme(theme: Partial<ThemeConfiguration>): boolean {
  // Validate required color properties
  const requiredColors = ['primary', 'secondary', 'accent']
  const hasRequiredColors = requiredColors.every(color =>
    theme.colors && theme.colors[color as keyof ThemeConfiguration['colors']]
  )

  // Validate typography
  const hasFonts = theme.typography?.fonts?.heading && theme.typography?.fonts?.body

  return hasRequiredColors && !!hasFonts
}
```

### Migration Path

#### From Current Implementation
Steps to migrate from the current basic theming to the advanced system:

1. **Phase 1: Foundation**
   - Implement theme configuration files
   - Add TypeScript interfaces
   - Set up validation utilities

2. **Phase 2: Integration**
   - Replace hardcoded values with theme tokens
   - Integrate theme provider
   - Add theme switching capability

3. **Phase 3: Enhancement**
   - Add visual theme editor
   - Implement multiple theme variants
   - Add theme marketplace support

#### Backward Compatibility
Ensure backward compatibility during migration:

1. Maintain existing Tailwind classes
2. Provide fallback values for new theme properties
3. Support gradual migration of components
4. Document migration steps for developers

### Best Practices

#### Theme Development
1. Define theme contracts with TypeScript interfaces
2. Use semantic naming for design tokens
3. Maintain consistent spacing and sizing scales
4. Document theme customization options
5. Test themes across different components

#### Performance Considerations
1. Minimize CSS bundle size
2. Use CSS variables for dynamic theming
3. Optimize theme switching performance
4. Cache theme configurations
5. Lazy-load theme resources when possible

#### Accessibility
1. Ensure sufficient color contrast ratios
2. Test themes with accessibility tools
3. Provide high contrast theme variants
4. Maintain consistent focus indicators
5. Support reduced motion preferences