# AGENTS.md

## Framework & Structure
- **Tech Stack**: Nuxt 4 (`nuxt`), Vue 3, Tailwind CSS (`@nuxtjs/tailwindcss`).
- **Directory Layout**: Source code resides in `app/` (`app/pages/`, `app/components/`, `app/assets/`).
- **Data & APIs**: Pages fetch data client-side (`server: false`) from `https://semi-library.free.beeceptor.com`. Local mock data is stored in `app/assets/data/sample.json`.

## Commands
- **Dev Server**: `npm run dev`
- **Build / Verification**: `npm run build`
- **Type Prep**: `npm run postinstall` (runs `nuxt prepare`)

