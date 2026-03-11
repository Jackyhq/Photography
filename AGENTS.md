# AGENTS

## Commands

### Development Commands

```bash
# Start web development server
pnpm dev

# Build production version (SPA)
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

The project is a pure client-side application (SPA) built with React, Vite, and TypeScript.

### Core Components

1.  **`apps/web` - Standalone Frontend SPA**
    *   **Description**: The main user-facing photo gallery. It can be deployed as a static website (e.g., to Vercel, GitHub Pages, or any static host).
    *   **UI/Design**: Features a modern, interactive, and user-centric UI with a "Glassmorphic Depth Design System".
    *   **Sitemap & RSS**: Generated automatically during the build process into the `dist` folder.
    *   **OG Images**: Basic OG tags are injected into the HTML during build.

### Monorepo Structure

- `apps/web/` - Main frontend React application (Vite + React 19 SPA).
- `packages/builder/` - Photo processing and manifest generation tool.
- `packages/webgl-viewer/` - High-performance WebGL-based photo viewer component.
- `packages/data/` - Shared data access layer and PhotoLoader singleton.
- `packages/components/` - Reusable UI components.
- `packages/ui/` - Core UI elements and design system components.
- `packages/hooks/` - Shared React hooks.
- `packages/utils/` - Utility functions.

### Configuration Architecture

1. **Builder Config** (`builder.config.ts`) - Controls photo processing and storage.
2. **Site Config** (`site.config.ts` + `config.json`) - Controls site branding and author info.

### Manifest Generation & Data Flow

**Builder Pipeline**:
1. Downloads photos from storage.
2. Processes images (HEIC→JPEG, etc.).
3. Extracts EXIF metadata.
4. Generates thumbnails and blurhash.
5. Serializes all data into `photos-manifest.json`.

**SPA Data Consumption**:
- `PhotoLoader` consumes the manifest data to provide a searchable, filterable gallery.

### Key Technologies

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Jotai, TanStack Query.
- **Image Processing**: Sharp, exiftool-vendored.
- **Build System**: pnpm workspaces.

### Code Quality Rules

1. Avoid code duplication.
2. Keep components focused.
3. Follow React best practices.
4. Use TypeScript strictly.

## Design System

- **`apps/web`**: See `apps/web/AGENTS.md` for details.
