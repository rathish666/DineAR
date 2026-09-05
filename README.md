# DineAR

A mobile-first restaurant menu with 3D dish previews and AR "view on my table," plus a lightweight admin screen for editing the menu.

## What's in this project

```
src/
  components/       Header, FoodCard, CategoryFilter, ModelViewer, DishForm, ErrorBoundary
  pages/            MenuPage, DishPage, AdminPage
  data/dishes.ts     Seed menu data (the source of truth you commit to the repo)
  lib/dishStore.ts   localStorage-backed data layer used by the pages + admin
  lib/adminAuth.ts   Simple password gate for /admin
public/models/       Your .glb 3D models go here
vercel.json          SPA routing + correct headers for .glb files
```

## 1. Local setup

```bash
npm install
cp .env.example .env
```

Open `.env` and set a real password:

```
VITE_ADMIN_PASSWORD=your-own-password
```

Run it:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## 2. Why your Vercel deploy was showing a blank page

Two bugs were causing this, both fixed in this version:

1. **Duplicate `<model-viewer>` registration.** Your `index.html` was loading the 3D viewer from a Google CDN `<script>` tag, while `main.tsx` was *also* importing the same library from npm (`@google/model-viewer`). A custom element can only be registered once — the second registration threw an uncaught error before React ever mounted, which blanked the entire app, not just the 3D viewer. The CDN script tag has been removed; the npm import is now the single source, and it's lazy-loaded only on dish pages so the menu page stays light.
2. **No SPA rewrite rule for Vercel.** This app uses client-side routing (`react-router-dom`). Without telling Vercel to serve `index.html` for every route, refreshing or directly opening a link like `/dish/1` or `/admin` returns a 404/blank page instead of your app. `vercel.json` now rewrites all non-asset routes to `index.html`.

`vercel.json` also explicitly sets `Content-Type: model/gltf-binary` and long-term caching for `.glb` files, since some CDNs mis-serve unfamiliar file extensions.

## 3. Adding your own 3D models

1. Drop `.glb` files into `public/models/` (e.g. `public/models/biryani.glb`).
2. Point a dish at it — either edit `src/data/dishes.ts` directly, or use the admin screen (see below) and export the file.
3. Keep each file under ~10MB for a fast mobile load. If a model is missing or fails to load, the app now shows a friendly "3D model coming soon" placeholder instead of crashing.

## 4. Using the admin screen

Visit `/admin` (e.g. `https://yoursite.vercel.app/admin`) and log in with the password from `VITE_ADMIN_PASSWORD`.

From there you can:
- **Add / edit / delete dishes** — name, price, image URL, description, ingredients, category, veg/non-veg, and the `.glb` model path.
- **Reset** back to the original 8 sample dishes.
- **Export dishes.ts** — downloads a ready-to-commit file.

**Important limitation, please read:** this is a static site with no backend or database. Anything you change in `/admin` is saved to that browser's local storage only — it previews on your device but customers scanning the QR code will **not** see it. To make changes live for everyone:

1. Make your edits in `/admin`.
2. Click **Export**, which downloads `dishes.ts`.
3. Replace `src/data/dishes.ts` in your repo with the downloaded file.
4. Commit and push — Vercel redeploys automatically.

If you want live edits with no redeploy step, that requires adding a real backend (a database + API) — let me know if you want that built next; it's a bigger architectural change than this admin screen.

**On the password:** `VITE_ADMIN_PASSWORD` is baked into the public JavaScript bundle at build time. It's enough to keep casual visitors from finding `/admin`, but anyone who inspects your site's JS can read it. For real protection, add an authentication provider or use a hosting-level password (e.g. Vercel's Password Protection, available on paid plans) in front of `/admin`.

## 5. Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project** -> import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` (both auto-detected -- leave as default).
4. Add an environment variable: `VITE_ADMIN_PASSWORD` = your chosen password.
5. Deploy. `vercel.json` is picked up automatically for routing/headers.
6. Once live, point your restaurant's QR code at the deployed URL.

## 6. Testing AR on a real phone

- **Android:** open the live HTTPS URL in **Chrome**, tap "View on My Table." It hands off to Google's Scene Viewer.
- **iPhone:** open the live HTTPS URL in **Safari** (not Chrome or an in-app browser like Instagram's), tap "View on My Table." It hands off to Apple Quick Look.
- AR requires **HTTPS** -- it will not work on plain `http://` or on `localhost` from a phone (only from the same machine running the dev server).
- If AR isn't supported on a device, the app shows "AR isn't supported on this device. You can still explore the dish in 3D." instead of erroring.

## 7. Adding a brand-new dish manually (without admin)

Add an object to the `dishes` array in `src/data/dishes.ts`:

```ts
{
  id: 9,
  name: "Veg Spring Rolls",
  price: 159,
  image: "https://images.unsplash.com/...",
  description: "Crispy rolls packed with fresh vegetables.",
  ingredients: ["Cabbage", "Carrot", "Spring Onion", "Rice Paper"],
  category: "Starters",
  isVeg: true,
  model: "/models/spring-rolls.glb",
}
```

## 8. Production checklist

- [x] SPA routing fixed for Vercel (`vercel.json`)
- [x] Duplicate model-viewer registration removed (was causing the blank page)
- [x] Model-viewer library lazy-loaded (menu page no longer ships ~1MB it doesn't need)
- [x] Error boundary -- a future crash shows a "Reload" screen instead of a blank page
- [x] `.env` added to `.gitignore` so your admin password isn't committed
- [x] Broken dish images fall back to a placeholder instead of a broken-image icon
- [x] Missing/broken `.glb` files fall back to a friendly message instead of crashing
- [ ] Consider adding real image hosting (e.g. Vercel Blob/Cloudinary) if you don't want to rely on external image URLs
- [ ] Consider a real backend if you want live multi-device menu editing without redeploying
