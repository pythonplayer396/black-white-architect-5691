import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  year: string | null;
  description: string | null;
  tags: string[] | null;
  image_url: string | null;
  link: string | null;
  challenge: string | null;
  process: string | null;
  results: string | null;
  slug: string | null;
};

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ["public", "project", id],
    queryFn: async () => {
      if (!id) return null;
      // Try slug first, fall back to id (UUID)
      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const query = supabase
        .from("projects")
        .select(
          "id, title, year, description, tags, image_url, link, challenge, process, results, slug"
        )
        .limit(1);
      const { data, error } = isUuid
        ? await query.eq("id", id)
        : await query.eq("slug", id);
      if (error) throw error;
      return (data?.[0] as Project) ?? null;
    },
    enabled: !!id,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/work"
              className="text-minimal text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to work
            </Link>

            {isLoading && (
              <p className="text-muted-foreground mt-16">Loading…</p>
            )}

            {!isLoading && !project && (
              <p className="text-muted-foreground mt-16">Case study not found.</p>
            )}

            {project && (
              <header className="mt-12 mb-16">
                {project.tags?.[0] && (
                  <p className="text-minimal text-muted-foreground mb-6">
                    {project.tags[0].toUpperCase()}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                )}
                <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                    {project.description}
                  </p>
                )}
              </header>
            )}
          </div>
        </div>
      </section>

      {project?.image_url && (
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {project && (
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto space-y-20">
              {[
                { label: "01 — Challenge", body: project.challenge },
                { label: "02 — Process", body: project.process },
                { label: "03 — Results", body: project.results },
              ].map((block) =>
                block.body ? (
                  <div key={block.label} className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-3">
                      <p className="text-minimal text-muted-foreground">
                        {block.label}
                      </p>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-lg md:text-xl text-foreground leading-relaxed whitespace-pre-line">
                        {block.body}
                      </p>
                    </div>
                  </div>
                ) : null
              )}

              {!project.challenge && !project.process && !project.results && (
                <p className="text-muted-foreground">
                  Detailed case study coming soon.
                </p>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="pt-12 border-t border-border flex flex-wrap gap-4">
                  {project.tags.map((t) => (
                    <span key={t} className="text-minimal text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-minimal text-foreground border-b border-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                >
                  VISIT LIVE PROJECT →
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CaseStudy;
