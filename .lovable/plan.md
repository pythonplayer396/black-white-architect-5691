# Admin Panel + Content Management

## Overview
Build a protected `/admin` panel where you (rian) can manage site content. To do this securely and have content persist across visits/devices, the site needs a backend — I'll enable **Lovable Cloud** (database + auth + storage, no external account needed).

## Auth
- Enable Lovable Cloud
- Create one admin account with email `rian@solis.local` and password `rian3030` (Supabase auth requires an email format; you'll log in with that email + your password — or I can use `rian` as a display username with a hidden email mapping)
- `/admin` route is protected — redirects to `/admin/login` if not signed in
- Uses a `user_roles` table with an `admin` role (secure, server-checked)

## Admin Panel Sections

### 1. Projects
- List all projects from DB
- Add / edit / delete projects (title, year, description, tags, image, link)
- Set a "featured / recent" flag
- Set "number of projects shipped" counter (site stat)

### 2. Blog
- List posts, create new, edit, delete
- Fields: title, slug, excerpt, cover image, markdown body, published date
- Image upload via Cloud storage

### 3. Team (new)
- List team members with name, role, level, photo, bio
- Add / edit / delete members
- **Roles management**: create new roles, delete roles, assign role + level to members

### 4. Site Stats
- Edit the "40+" / "..." projects-shipped number used on the homepage

## Frontend Wiring
- Homepage Portfolio, Blog page, About/Team section read from DB instead of hardcoded arrays
- Public pages stay fast (cached queries via react-query, already installed)

## Performance Fix (slow tab navigation)
- Convert page imports in `src/App.tsx` to `React.lazy` + `Suspense` so each route loads independently instead of one giant bundle
- Add route-level prefetch on nav hover
- This is what's causing the lag when switching tabs

## Tech / Files

**New tables** (via Cloud migration):
- `projects`, `blog_posts`, `team_members`, `team_roles`, `site_settings`, `user_roles` (+ `app_role` enum), `has_role()` security-definer function, RLS policies

**New files**:
- `src/pages/admin/Login.tsx`
- `src/pages/admin/AdminLayout.tsx`
- `src/pages/admin/Dashboard.tsx`
- `src/pages/admin/ProjectsAdmin.tsx`
- `src/pages/admin/BlogAdmin.tsx`
- `src/pages/admin/TeamAdmin.tsx`
- `src/pages/admin/SettingsAdmin.tsx`
- `src/hooks/useAdminAuth.ts`

**Modified**:
- `src/App.tsx` — lazy routes + admin routes
- `src/components/Portfolio.tsx`, `src/pages/Blog.tsx`, `src/components/About.tsx` — read from DB

## One thing to confirm
Supabase auth needs an email. Two options:
- **A)** Login with `rian@solis.local` + `rian3030` (recommended, standard)
- **B)** Login form accepts `rian` as username and I map it to a hidden email internally

Which do you prefer? (I'll default to **A** if you just say "go".)
