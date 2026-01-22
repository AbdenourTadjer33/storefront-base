# System Architecture

## Overview
This storefront template is built with Next.js 15 using the App Router pattern, integrated with Medusa.js as the commerce platform, and styled with Tailwind CSS.

## Folder Structure
```
src/
├── app/                     # Next.js App Router structure
│   ├── [countryCode]/      # Dynamic route for internationalization
│   │   ├── (checkout)/     # Checkout flow routes
│   │   ├── (main)/         # Main application routes
│   │   └── layout.tsx      # Root layout with providers
├── modules/                # Feature modules
│   ├── account/           # Account management
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── collections/       # Product collections
│   ├── common/            # Shared components
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components (header, footer)
│   ├── order/             # Order management
│   ├── products/          # Product display
│   ├── search/            # Search functionality
│   └── wishlist/          # Wishlist features
├── lib/                    # Business logic and utilities
├── styles/                 # Global styles
└── types/                  # TypeScript type definitions
```

## Key Design Decisions

### 1. Next.js App Router
The project uses the modern App Router pattern which provides:
- Server Components for better performance
- Nested layouts for consistent UI
- Streaming and Suspense for improved UX
- Built-in SEO and metadata support

### 2. Module-Based Organization
Features are organized into modules following the principle of separation of concerns:
- Each module contains related components, hooks, and utilities
- Modules can be developed and tested independently
- Clear boundaries between different functional areas

### 3. Region-Based Internationalization
Rather than traditional i18n libraries, the storefront uses:
- Country code routing (`/[countryCode]/`)
- Dynamic region detection based on IP geolocation
- Medusa region integration for localized pricing and availability

### 4. Component Composition
The architecture promotes:
- Reusable UI components in `modules/common/`
- Feature-specific components in respective modules
- Composition over inheritance for flexible UI building

## Data Flow
1. **Middleware** handles region detection and routing
2. **Server Components** fetch data directly from Medusa
3. **Client Components** handle interactivity and state
4. **Context Providers** manage global state (cart, customer)

## Performance Considerations
- Server-side rendering for initial page load
- Static asset optimization
- Image optimization through Next.js Image component
- Code splitting by route segments
- Caching strategies for region data