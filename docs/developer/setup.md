# Development Environment Setup

## Overview
This document provides comprehensive instructions for setting up the development environment for the storefront base template. Following these steps will ensure you have all necessary tools and configurations to develop, test, and deploy the storefront.

## Prerequisites

### System Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+, CentOS 8+)
- **Memory**: Minimum 8GB RAM (16GB recommended)
- **Storage**: Minimum 20GB free disk space
- **Node.js**: Version 18.x or higher
- **Package Manager**: Yarn 1.22+ or npm 8+

### Required Accounts
1. **GitHub Account** - For repository access and deployment
2. **Vercel Account** - For hosting and deployment (optional but recommended)
3. **Medusa Cloud Account** - For commerce backend (or self-hosted Medusa)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/storefront-base.git
cd storefront-base
```

### 2. Install Dependencies
Using Yarn (recommended):
```bash
yarn install
```

Using npm:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Medusa Backend Configuration
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key

# Region Configuration
NEXT_PUBLIC_DEFAULT_REGION=us

# Authentication
NEXT_PUBLIC_AUTH_PROVIDER=medusa

# Development Settings
NODE_ENV=development
```

### 4. Medusa Backend Setup
You'll need a Medusa backend instance. You can either:

**Option A: Use Medusa Cloud (Recommended for Development)**
1. Sign up at [medusa-commerce.com](https://medusa-commerce.com)
2. Create a new project
3. Obtain your publishable API key
4. Update your `.env.local` with the cloud URL and API key

**Option B: Self-Hosted Medusa**
1. Install Medusa CLI:
   ```bash
   npm install -g @medusajs/medusa-cli
   ```

2. Create a new Medusa project:
   ```bash
   medusa new my-medusa-store
   cd my-medusa-store
   ```

3. Start the Medusa server:
   ```bash
   medusa develop
   ```

4. Update your `.env.local` with your local Medusa URL (typically `http://localhost:9000`)

### 5. Database Configuration
Medusa requires a PostgreSQL database. For development:

**Using Docker (Recommended):**
```bash
docker run -d \
  --name medusa-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=medusa \
  -p 5432:5432 \
  postgres:13
```

Update your Medusa backend configuration to connect to this database.

### 6. Seed Initial Data (Optional)
To populate your Medusa backend with sample data:

```bash
medusa seed -f ./data/seed.json
```

## Development Workflow

### Starting the Development Server
```bash
# Using Yarn
yarn dev

# Using npm
npm run dev
```

The storefront will be available at `http://localhost:3000`

### Building for Production
```bash
# Using Yarn
yarn build

# Using npm
npm run build
```

### Running Tests
```bash
# Run all tests
yarn test

# Run unit tests
yarn test:unit

# Run integration tests
yarn test:integration

# Run end-to-end tests
yarn test:e2e
```

### Linting and Formatting
```bash
# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format
```

## IDE and Tooling Setup

### Recommended IDE: VS Code
Install these extensions for optimal development experience:

1. **ESLint** - JavaScript/TypeScript linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
4. **Auto Rename Tag** - HTML tag renaming
5. **Bracket Pair Colorizer** - Visual bracket matching
6. **GitLens** - Enhanced Git capabilities
7. **Path Intellisense** - Autocomplete filenames
8. **Thunder Client** - API testing (alternative to Postman)

### VS Code Settings
Create `.vscode/settings.json` with these recommended settings:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### Debugging Configuration
Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
</```

## Project Structure Overview

### Key Directories
```
storefront-base/
├── src/
│   ├── app/              # Next.js App Router structure
│   ├── modules/          # Feature modules
│   ├── lib/              # Business logic and utilities
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── docs/                 # Documentation files
├── .github/              # GitHub workflows and templates
└── .vscode/              # VS Code configuration
```

### Configuration Files
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration

## Environment Variables

### Required Variables
```env
MEDUSA_BACKEND_URL=                    # Medusa backend URL
NEXT_PUBLIC_MEDUSA_BACKEND_URL=        # Public Medusa backend URL
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=    # Publishable API key
NEXT_PUBLIC_DEFAULT_REGION=           # Default region code
```

### Optional Variables
```env
VERCEL_URL=                           # Vercel deployment URL
NEXT_PUBLIC_VERCEL_URL=               # Public Vercel URL
NEXT_PUBLIC_SITE_URL=                 # Site base URL
NEXT_PUBLIC_GA_MEASUREMENT_ID=        # Google Analytics ID
NEXT_PUBLIC_FB_PIXEL_ID=              # Facebook Pixel ID
```

## Deployment

### Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment
```bash
# Build the application
yarn build

# Start the production server
yarn start
```

### Docker Deployment
Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
```

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
**Problem**: Environment variables are undefined in the browser
**Solution**: Prefix with `NEXT_PUBLIC_` for client-side access

#### 2. API Connection Errors
**Problem**: Cannot connect to Medusa backend
**Solution**:
- Verify MEDUSA_BACKEND_URL is correct
- Check if Medusa server is running
- Ensure CORS settings allow your frontend origin

#### 3. Build Failures
**Problem**: TypeScript or ESLint errors prevent building
**Solution**:
- Run `yarn lint` to see specific errors
- Fix type mismatches
- Address any ESLint warnings

#### 4. Styling Issues
**Problem**: Tailwind classes not working
**Solution**:
- Check `tailwind.config.js` content paths
- Restart development server
- Verify Tailwind CSS IntelliSense extension

### Development Tips

#### Hot Reloading Optimization
- Use `Fast Refresh` for component updates
- Structure components to minimize re-renders
- Use React DevTools to identify performance bottlenecks

#### Debugging Server Components
- Use `console.log` in server components (appears in terminal)
- Check Network tab for server-side data fetching
- Use Medusa admin panel to verify data

#### Performance Monitoring
- Use Chrome DevTools Performance tab
- Monitor bundle sizes with `@next/bundle-analyzer`
- Implement logging for critical user journeys

## Testing Setup

### Unit Testing
Jest configuration for testing utilities and pure functions:

```bash
# Run unit tests
yarn test:unit
```

### Integration Testing
Test component compositions and data flows:

```bash
# Run integration tests
yarn test:integration
```

### End-to-End Testing
Playwright setup for user journey testing:

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
yarn test:e2e
```

## Contributing Guidelines

### Branch Strategy
- `main` - Production code
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Urgent fixes

### Pull Request Process
1. Create feature branch from `develop`
2. Implement changes with tests
3. Update documentation if needed
4. Create pull request to `develop`
5. Request review from team members

### Code Review Checklist
- [ ] Code follows established patterns
- [ ] TypeScript types are properly defined
- [ ] Components are accessible
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Performance considerations addressed
- [ ] Security implications evaluated

## Maintenance

### Dependency Updates
Regularly update dependencies for security and features:

```bash
# Check for outdated packages
yarn outdated

# Update packages
yarn upgrade-interactive
```

### Security Audits
Monitor for vulnerabilities:

```bash
# Audit dependencies
yarn audit

# Fix vulnerabilities
yarn audit --fix
```

### Performance Monitoring
Set up monitoring for production deployments:

1. **Lighthouse CI** - Automated performance audits
2. **Sentry** - Error tracking and monitoring
3. **LogRocket** - Session replay and performance insights
4. **Google Analytics** - User behavior tracking

## Next Steps

### Immediate Actions
1. ✅ Clone repository
2. ✅ Install dependencies
3. ✅ Configure environment variables
4. ✅ Start development server
5. ✅ Verify Medusa connection

### Short-term Goals
1. Familiarize with component library
2. Understand data fetching patterns
3. Customize theme and styling
4. Implement first feature enhancement

### Long-term Objectives
1. Integrate with CMS for content management
2. Implement advanced personalization
3. Add progressive web app features
4. Optimize for international markets
5. Implement advanced analytics