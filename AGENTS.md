# AGENTS.md

## Framework & Structure
- **Tech Stack**: Nuxt 4 (`nuxt`), Vue 3, Tailwind CSS (`@nuxtjs/tailwindcss`), Nitro.
- **Directory Layout**: Source code resides in `app/` (`app/pages/`, `app/components/`, `app/assets/`).
- **Data & APIs**: Client-side data fetching (`server: false`) from Beeceptor mock API (`https://semi-library.free.beeceptor.com`) and local assets (`app/assets/data/sample.json`).

## Commands
- **Install**: `npm install`
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Type Prep / Prepare**: `npm run postinstall` (`nuxt prepare`)
- **Preview**: `npm run preview`
