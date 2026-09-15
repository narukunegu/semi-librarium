# Semi Librarium

Online OPAC and Library Portal for the Archdiocese of Saigon Seminary Library (Đại Chủng Viện Thánh Giuse Sài Gòn), built with Nuxt 4, Vue 3, and Tailwind CSS.

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3, Vite, Nitro)
- **Styling**: Tailwind CSS (`@nuxtjs/tailwindcss`)
- **Data Source**: Client-side async fetching from Beeceptor mock API (`https://semi-library.free.beeceptor.com`) and local assets.

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview the production build:

```bash
npm run preview
```

## TODO list

- [] Dynamic quick search suggestion
- [] Search autocomplete suggestion
- [x] Make code cleaner and easier to read by divide big page to component
- [x] Make better title of book detail page
