# AGENTS.md

## Framework & Structure
- **Tech Stack**: Nuxt 4 (`nuxt`), Vue 3, Tailwind CSS (`@nuxtjs/tailwindcss`), Nitro.
- **Directory Layout**: Source code in `app/` (`app/pages/`, `app/components/`, `app/composables/`, `app/assets/`).
- **Data & APIs**: Client-side data fetching from Beeceptor mock API (`https://semi-library.free.beeceptor.com`) and local assets (`app/assets/data/`).

## Commands
- **Install**: `npm install`
- **Dev Server**: `npm run dev`
- **Build / Static Generation**: `npm run generate` (`nuxt generate`, outputs to `.output/public`)
- **Prepare Types**: `npm run postinstall` (`nuxt prepare`)
- **Preview**: `npm run preview`
- **Production Build**: `npm run build`
