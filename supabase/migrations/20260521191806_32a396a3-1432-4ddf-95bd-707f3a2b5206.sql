ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS challenge text,
  ADD COLUMN IF NOT EXISTS process text,
  ADD COLUMN IF NOT EXISTS results text,
  ADD COLUMN IF NOT EXISTS slug text;

CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_unique ON public.projects (slug) WHERE slug IS NOT NULL;