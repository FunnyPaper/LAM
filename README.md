# LAM

A cross-platform desktop application for real-time collaboration and workflow management, built with Tauri, React, and TypeScript. Supports both web and desktop modes.

## Badges

[![GitHub Release](https://img.shields.io/github/v/release/FunnyPaper/LAM?label=release)](https://github.com/FunnyPaper/LAM/releases)
[![GitHub License](https://img.shields.io/github/license/FunnyPaper/LAM)](https://github.com/FunnyPaper/LAM/blob/main/LICENSE)
[![Build](https://github.com/FunnyPaper/LAM/actions/workflows/build.yml/badge.svg)](https://github.com/FunnyPaper/LAM/actions/workflows/build.yml)

## Project Structure

```
├── app/                    # React application source (web/desktop variants)
│   ├── components/         # Reusable UI components
│   ├── events/             # Event handling utilities
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization files
│   ├── resources/          # Application resources
│   ├── shells/             # App shell layouts
│   ├── stores/             # Zustand state stores
│   └── utils/              # Utility functions
├── packages/               # Monorepo packages
│   ├── gscrap/             # GScrap service and core library
│   │   └── service/        # GScrap microservice
│   └── lam/                # LAM core packages
│       ├── backend/        # NestJS backend service
│       └── frontend/       # React UI component library
├── scripts/                # CLI and utility scripts
├── tauri/                  # Tauri desktop app (Rust backend)
├── index.html              # Entry HTML
├── package.json            # Root workspace configuration
└── vite.config.ts          # Vite build configuration
```

## Prerequisites

- [Node.js](https://nodejs.org/) 24.x or later
- [npm](https://www.npmjs.com/) 9.x or later
- [Rust](https://rust-lang.org/) toolchain (for desktop builds)
- [Git](https://git-scm.com/)

## Setup

```bash
# Create web and desktop envs
touch .env.web
touch .env.desktop
echo "VITE_ENTRY=main.web.tsx" > .env.web
echo "VITE_ENTRY=main.desktop.tsx" > .env.desktop

# Clone the repository with submodules
git clone --recursive git@github.com:FunnyPaper/LAM.git
cd LAM

# Install all dependencies (root + packages)
npm install

# Install backend and service dependencies
npm run install:dependencies

# Generate protobuf files
npm run gen:proto
```

## Available Modes & Scripts

### Development

```bash
# Web development mode (hot reload)
npm run dev:web

# Desktop development mode (hot reload)
npm run dev:desktop
```

### Production Build

```bash
# Web production build
npm run build:web

# Desktop production build
npm run build:desktop

# Frontend library build
npm run build:frontend

# Backend executable build
npm run build:backend

# GScrap service build
npm run build:services
```

### Dependency & Tool Commands

```bash
# Build all dependencies (services, backend, frontend)
npm run build:dependencies

# Clean dev dependencies
npm run prune:dev
```

### Tauri Desktop App

```bash
# Open Tauri dev tools / build desktop app
npm run tauri
```

## License

[MIT License](LICENSE)