# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build
pnpm generate     # Static site generation
pnpm preview      # Preview production build
```

## Architecture

**Nuxt 4** project using the `app/` directory convention. All source files live under `app/`.

### Stack
- **Nuxt 4** + **Vue 3** (Composition API, `<script setup>`)
- **Tailwind CSS** via `@nuxtjs/tailwindcss`
- **GSAP** + ScrollTrigger for all animations
- **lucide-vue-next** for icons — never use emojis as icons
- **pnpm** as package manager

### Design tokens (tailwind.config.ts)
- `brand-{50–900}` — blue accent palette, primary is `brand-500` (#2254f4)
- `surface` / `surface-2` / `surface-3` / `surface-4` — dark background layers (#18181b → #3f3f46)
- Font: Inter (Google Fonts)

### Global CSS classes (app/assets/css/main.css)
- `.btn-primary` — filled blue button
- `.btn-outline` — bordered ghost button
- `.card` — dark card with border (`bg-surface-2 border border-surface-4 rounded-xl`)

### Animation pattern
GSAP is registered as a client-side plugin (`app/plugins/gsap.client.ts`). Pages import gsap and ScrollTrigger directly:
```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
```
All GSAP calls go inside `onMounted()`. A `useGsap` composable (`app/composables/useGsap.ts`) provides reusable helpers (fadeUp, scrollFadeUp, etc.) for future pages.

### 360° Viewer
- `Product360Viewer.vue` — preloads all frames, auto-plays at 18fps, pauses on hover, supports mouse drag and touch
- `useProductFrames.ts` — generates URL arrays: `folder/frame_001.jpg` (3-digit zero-padded)
- Frames live in `public/hero-urun/` (290 JPG files, 800×450px)

### SiteHeader scroll behavior
The navbar animates on scroll using a plain `window.scroll` listener (not ScrollTrigger):
- **< 150px scrolled**: floating pill (rounded-full, `top: 8px`, side padding)
- **≥ 150px scrolled**: full-width sticky bar (no border-radius, `top: 0`, no padding)
- `containerEl` max-width also animates from `80rem` → `100%`

### Brand identity
- Brand name: **Euro Fil** (with space, never "EuroFil")
- Colors: black/anthracite dark theme
- No emojis anywhere in the UI
- No customer reviews/testimonials section
