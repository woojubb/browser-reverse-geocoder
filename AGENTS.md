# AGENTS.md

You are a frontend/library engineer specializing in geospatial JavaScript libraries. This project is a lightweight, browser-based reverse geocoding library.

## Build & Verify

```bash
npm install          # Install dependencies
npm run build        # Vite build → dist/ (ES + UMD)
npm test             # Run tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run lint         # ESLint check
npm run dev          # Vite dev server
npm run preview      # Preview built output
```

## Project Structure

```
├── src/
│   └── index.js           # Main library: BrowserReverseGeocoder class
├── tests/
│   └── index.test.js      # Vitest unit tests
├── dist/                   # Build output (ES + UMD bundles)
├── specs/                  # Feature specs
│   ├── backlog/            # Backlog items
│   └── done/               # Completed specs
├── tasks/                  # Task tracking
│   └── done/               # Completed tasks
├── .github/workflows/      # CI/CD (GitHub Actions)
├── vite.config.js          # Vite build config (library mode)
├── eslint.config.js        # ESLint flat config
├── jsconfig.json           # JS type checking (checkJs: true)
├── package.json            # npm package config
└── readme.md               # Usage documentation
```

## Architecture

- **BrowserReverseGeocoder** class (`src/index.js`): single entry point
  - `init(source)` — accepts a GeoJSON URL (string) or FeatureCollection object, builds RBush spatial index
  - `reverseGeocode(lon, lat)` — point-in-polygon lookup using RBush + `@turf/boolean-point-in-polygon`
- **Dependencies**: `rbush` (spatial indexing), `@turf/bbox` + `@turf/boolean-point-in-polygon` (geospatial) — all peer + runtime deps, externalized in build
- **Build**: Vite library mode, outputs ES module + UMD, externalizes all dependencies

## Coding Conventions

- Pure JavaScript (ES modules, no TypeScript)
- Class-based API with private fields prefixed `_` (e.g., `_geoData`, `_spatialIndex`)
- `export default` for the main class
- Coordinates order: `(longitude, latitude)` — GeoJSON standard

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`

Examples:
- `feat: add MultiPolygon support`
- `fix: handle fetch timeout gracefully`
- `docs: update API usage examples`
- `chore: upgrade vitest to v4`

## Common Pitfalls

1. Coordinate order is `(lon, lat)`, NOT `(lat, lon)` — GeoJSON/Turf.js convention
2. `rbush`, `@turf/bbox`, `@turf/boolean-point-in-polygon` are externalized — do not bundle them into dist
3. `init()` must be called before `reverseGeocode()` — throws Error if not initialized
4. The library uses `fetch()` for URL sources — browser or fetch-polyfill environment only
5. Never import `@turf/turf` (full bundle ~500KB) — use specific sub-packages only

## Boundaries

- Do not bundle `rbush`, `@turf/bbox`, `@turf/boolean-point-in-polygon` into the library output
- Do not import `@turf/turf` — use specific sub-packages to keep bundle small
- Do not add Node.js-specific APIs — this is a browser-only library
- Do not commit `.env` files or secrets
- Do not change the public API signature (`init`, `reverseGeocode`) without discussion
- Do not add heavy dependencies — keep the library lightweight
