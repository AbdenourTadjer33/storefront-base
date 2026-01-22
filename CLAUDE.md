# Storefront Base Template

## Overview
This is a base storefront template forked from `medusajs/nextjs-starter-medusa`, designed to serve as a reusable foundation for multiple eCommerce storefronts.

## Current Status
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom configuration
- **Commerce Platform**: Medusa.js
- **Internationalization**: Region-based with country code routing
- **Theming**: Basic light/dark mode with Tailwind presets
- **Homepage Sections**: Hero section and featured products rail

## Quick Reference
- `src/app/[countryCode]/(main)/page.tsx` - Main homepage
- `src/modules/home/components/` - Homepage section components
- `tailwind.config.js` - Theme configuration
- `src/middleware.ts` - Internationalization and region handling
- `src/styles/globals.css` - Global styles and utility classes

## Documentation
Detailed technical documentation is available in `/docs/developer/`:
- `architecture.md` - System architecture and folder structure
- `patterns.md` - Code patterns and conventions
- `features.md` - Feature specifications
- `theming.md` - Theming system and customization
- `i18n.md` - Internationalization setup
- `sections.md` - Homepage sections system
- `components.md` - Component library
- `setup.md` - Development environment setup