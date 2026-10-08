# AGENTS.md

## Framework & Structure
- **Tech Stack**: Nuxt 4 (`nuxt`), Vue 3 (`vue`), Tailwind CSS (`@nuxtjs/tailwindcss`).
- **Rendering**: Client-side rendering (`ssr: false` in `nuxt.config.ts`).
- **Directory Layout**: Source code in `app/` (`app/pages/`, `app/components/`, `app/composables/`, `app/assets/`).
- **Data & APIs**: Client-side fetching from Beeceptor mock API (`https://semi-library.free.beeceptor.com`) and local JSON/asset data (`app/assets/data/`).

## Commands
- **Install**: `npm install`
- **Dev Server**: `npm run dev`
- **Prepare Types**: `npm run postinstall` (`nuxt prepare`)
- **Build / Static Generation**: `npm run generate` (`nuxt generate`, outputs to `.output/public`)
- **Production Build**: `npm run build`
- **Preview**: `npm run preview`

## Guidelines & Quirks
- **SPA Mode**: Keep in mind that `ssr: false` is configured, so APIs and client composables rely on client-side execution.
- **Styling**: Tailwind CSS classes and custom font assets under `public/fonts/` (Playfair Display).
