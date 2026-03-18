# CLAUDE.md

This is a browser-based reverse geocoding JavaScript library built with Vite.

## Quick Reference

- Build: `npm run build`
- Dev: `npm run dev`
- Entry: `src/index.js`
- Output: `dist/` (ES + UMD)

## Key Constraints

- Browser-only library — no Node.js APIs
- Coordinates are always `(longitude, latitude)` order
- `rbush` and `@turf/turf` are external peer dependencies — never bundle them
- Keep the library minimal and focused on reverse geocoding
