# DineAR

A mobile-first restaurant menu with 3D dish previews and AR "view on my table", plus a lightweight admin screen for editing the menu.

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_ADMIN_PASSWORD` in `.env` before using `/admin`.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/pages/` contains the menu, dish, and admin pages.
- `src/components/` contains the shared UI and 3D model viewer.
- `src/data/dishes.ts` contains the seed menu data.
- `src/lib/dishStore.ts` provides the localStorage-backed admin data layer.
- `public/models/` is where `.glb` models belong.

## Admin limitation

This is a static site. Admin edits are stored only in the current browser. To publish menu changes for everyone, export `dishes.ts`, replace `src/data/dishes.ts`, commit, and push the change.

The password is included in the public build because it uses a Vite environment variable. Use a real authentication provider or hosting-level protection for production security.

## Deployment

Deploy with Vercel using the default Vite settings. Set `VITE_ADMIN_PASSWORD` in the Vercel project environment variables. `vercel.json` provides SPA rewrites and `.glb` asset headers.

AR requires HTTPS on a supported mobile browser. Android uses Chrome and Scene Viewer; iPhone uses Safari and Quick Look.
