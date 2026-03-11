# AGENTS

## Commands

### Development Commands

```bash
# Start development server (runs both web and SSR)
pnpm dev

# Start only web development server
pnpm --filter web dev

# Start only SSR development server
pnpm --filter @afilmory/ssr dev

# Build production version
pnpm build

# Build manifest from storage (generates photo metadata)
pnpm run build:manifest

# Force rebuild all photos and metadata
pnpm run build:manifest -- --force

# Force regenerate thumbnails only
pnpm run build:manifest -- --force-thumbnails

# Force regenerate manifest only
pnpm run build:manifest -- --force-manifest
```

### Code Quality Commands

```bash
# Lint and fix code
pnpm lint

# Format code
pnpm format

# Type check (web app)
pnpm --filter web type-check
```

## Architecture

The project employs a modular architecture that separates concerns across different applications and packages.

### Core Components

The project is divided into two main applications:

1.  **`apps/web` - Standalone Frontend SPA**
    *   **Description**: A pure client-side application built with React, Vite, and TypeScript. It can be deployed independently as a static website and is fully functional on its own.
    *   **UI/Design**: Features a modern, interactive, and user-centric UI. It utilizes a "Glassmorphic Depth Design System" for components like modals, toasts, and floating panels.
    *   **Server Integration**: Functions without a server, using a pre-built `photos-manifest.json` file. It can also be hosted via `apps/ssr`.

2.  **`apps/ssr` - Next.js Wrapper for SEO & Prerendering**
    *   **Description**: A Next.js application that acts as a transparent proxy for the `apps/web` SPA. Its primary role is to enhance the frontend with server-side capabilities for performance and SEO.
    *   **Key Features**:
        *   **OG (Open Graph) Rendering**: Dynamically generates social media preview cards for shared links.
        *   **SEO Metadata Injection**: Injects dynamic SEO tags into the HTML.
        *   **SSR for Shared Pages**: Server-renders specific pages for fast initial load.
        *   **Sitemap & RSS**: Provides dynamic `sitemap.xml` and `feed.xml`.

### Monorepo Structure

- `apps/web/` - Main frontend React application (Vite + React 19 SPA).
- `apps/ssr/` - Next.js 15 application serving as an SPA host and dynamic SEO/OG generator.
- `packages/builder/` - Photo processing and manifest generation tool.
- `packages/webgl-viewer/` - High-performance WebGL-based photo viewer component.
- `packages/data/` - Shared data access layer and PhotoLoader singleton.
- `packages/components/` - Reusable UI components shared across apps.
- `packages/ui/` - Core UI elements and design system components.
- `packages/hooks/` - Shared React hooks.
- `packages/utils/` - Utility functions.

### Next.js as SPA Host & SEO Provider

**Development Mode**: `apps/ssr/src/app/[...all]/route.ts` catches all SPA routes and serves `index.html` with injected manifest data from the static JSON file.
**Production Mode**: Next.js serves pre-built Vite SPA assets while providing dynamic OG image generation and SEO metadata.

### Configuration Architecture

**Two-Layer Configuration System**:

1. **Builder Config** (`builder.config.ts`) - **Infrastructure/Processing Layer**:
   - Controls photo processing, storage connections, and build performance.
2. **Site Config** (`site.config.ts` + `config.json`) - **Presentation/Content Layer**:
   - Controls site branding, author info, social links.
   - Consumed by both SPA and SSR for consistent branding.

### Manifest Generation & Data Flow

**Builder Pipeline** (`packages/builder/src/cli.ts`):
1. **Storage Sync**: Downloads photos from S3/GitHub.
2. **Format Processing**: HEIC→JPEG, TIFF→web formats, Live Photo detection.
3. **EXIF & Metadata Extraction**: Camera settings, GPS, Fujifilm recipes.
4. **Thumbnail Generation**: Multiple sizes with blurhash placeholders.
5. **Manifest Serialization**: Generates `photos-manifest.json`.

**SPA Data Consumption** (`packages/data/src/index.ts`):
- `PhotoLoader` consumes `window.__MANIFEST__` injected via global.

### Key Technologies

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Jotai (state), TanStack Query
- **SSR Layer**: Next.js 15
- **Image Processing**: Sharp, exiftool-vendored, HEIC conversion, blurhash generation
- **Storage**: S3-compatible (AWS/MinIO), GitHub repository storage
- **Build System**: pnpm workspaces

### Code Quality Rules

1. Avoid code duplication - extract common types and components.
2. Keep components focused - use hooks and component composition.
3. Follow React best practices.
4. Use TypeScript strictly.

### i18n Guidelines

- Use flat keys with `.` separation.
- Support pluralization with `_one` and `_other` suffixes.

### Testing Strategy

- Verify builds work with `pnpm build`.
- Test photo processing with `pnpm run build:manifest`.
- Validate types with `pnpm --filter web type-check`.

## Design System

- **`apps/web`**: Contains the "Glassmorphic Depth Design System". See `apps/web/AGENTS.md` for details.
