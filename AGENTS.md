# AGENTS.md

## Framework & Structure
- **Tech Stack**: Nuxt 4 (`nuxt` 4.5.2), Vue 3, Tailwind CSS (`@nuxtjs/tailwindcss`).
- **Directory Layout**: Source code resides in `app/` (`app/pages/`, `app/components/`, `app/assets/`).
- **Data & APIs**: `app/pages/search.vue` and `app/pages/book-[id].vue` fetch data client-side (`server: false`) from `https://semi-library.free.beeceptor.com`. Local mock data is stored in `app/assets/data/sample.json`.

## Commands
- **Dev**: `npm run dev`
- **Build Verification**: `npm run build` (runs Nitro/Vite build for SSR/node-server preset)
- **Static Gen**: `npm run generate`
- **Type Prep**: `npm run postinstall` (runs `nuxt prepare` to populate `.nuxt/` types)

