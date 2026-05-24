# Get My IP

A free, fast, one-page micro-SaaS that instantly shows your public IP address along with detailed network information — city, region, country, ISP, timezone, postal code, and an interactive OpenStreetMap.

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 24.x | [nodejs.org](https://nodejs.org) |
| pnpm | 10.x | `npm install -g pnpm` |

> **Important:** This workspace enforces pnpm. Running `npm install` or `yarn` at the root will be blocked by a preinstall guard.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies

Run this once from the repo root. pnpm will install all workspace packages together.

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm --filter @workspace/ip-finder run dev
```

The app will be available at **http://localhost:5173** (or the next available port printed in the terminal).

---

## Project Structure

```
.
├── artifacts/
│   ├── ip-finder/          # React + Vite frontend (the main app)
│   └── api-server/         # Express API server (optional backend)
├── lib/                    # Shared TypeScript libraries
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # Workspace config, catalog pins, security overrides
├── tsconfig.base.json      # Shared TypeScript base config
└── package.json            # Root-level orchestration scripts
```

---

## Available Commands

### Root-level (run from repo root)

| Command | Description |
|---------|-------------|
| `pnpm run typecheck` | Full TypeScript check across all packages |
| `pnpm run build` | Typecheck + build all packages |

### ip-finder app (run from repo root with `--filter`)

| Command | Description |
|---------|-------------|
| `pnpm --filter @workspace/ip-finder run dev` | Start local dev server with hot reload |
| `pnpm --filter @workspace/ip-finder run build` | Production build (outputs to `artifacts/ip-finder/dist/`) |
| `pnpm --filter @workspace/ip-finder run serve` | Preview the production build locally |
| `pnpm --filter @workspace/ip-finder run typecheck` | TypeScript check for the frontend only |

---

## Environment Variables

The frontend fetches IP data entirely from public third-party APIs — no API keys or `.env` files are required to run locally.

| Variable | Used by | Purpose |
|----------|---------|---------|
| `PORT` | Dev server | Port to bind to (defaults to Vite's standard port if unset) |
| `BASE_PATH` | Dev server | Base path prefix when served behind a reverse proxy |

---

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Routing:** Wouter
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Map:** react-leaflet + OpenStreetMap tiles (no API key needed)
- **IP data:** [ipify.org](https://www.ipify.org) + [ipapi.co](https://ipapi.co)
- **Icons:** Lucide React
- **Package manager:** pnpm workspaces

---

## Building for Production

```bash
pnpm --filter @workspace/ip-finder run build
```

The compiled output lands in `artifacts/ip-finder/dist/`. You can serve it with any static host (Nginx, Vercel, Netlify, Cloudflare Pages, etc.).

---

## Licence

MIT
