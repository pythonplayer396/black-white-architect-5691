import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
};

const Work = () => {
  const [activeTag, setActiveTag] = useState<string>("ALL");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["public", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, year, description, tags, image_url, link")
        .order("sort_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  const allTags = Array.from(
    new Set(projects.flatMap((p) => (p.tags ?? []).map((t) => t.toUpperCase())))
  );
  const categories = ["ALL", ...allTags];

  const filtered =
    activeTag === "ALL"
      ? projects
      : projects.filter((p) => (p.tags ?? []).some((t) => t.toUpperCase() === activeTag));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                OUR WORK
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                A selection of projects shipped by Solis Institute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {categories.length > 1 && (
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTag(category)}
                    className={`text-minimal transition-colors duration-300 relative group ${
                      activeTag === category
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                        activeTag === category ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <p className="text-muted-foreground">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground">No projects yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
                {filtered.map((project) => {
                  const Card = (
                    <div className="group cursor-pointer">
                      {project.image_url && (
                        <div className="relative overflow-hidden mb-8">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {project.tags?.[0] && (
                            <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                              <span className="text-minimal text-foreground">{project.tags[0].toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-light text-architectural mb-2 group-hover:text-muted-foreground transition-colors duration-500">
                            {project.title}
                          </h3>
                          {project.year && (
                            <p className="text-minimal text-muted-foreground">{project.year}</p>
                          )}
                        </div>
                        {project.description && (
                          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                        )}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex gap-3 flex-wrap pt-4 border-t border-border">
                            {project.tags.map((t) => (
                              <span key={t} className="text-minimal text-muted-foreground">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                  return project.link ? (
                    <a key={project.id} href={project.link} target="_blank" rel="noreferrer">
                      {Card}
                    </a>
                  ) : (
                    <div key={project.id}>{Card}</div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Got something
              <br />
              you want built?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Tell us about your project — we'll come back within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-block text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
            >
              START A PROJECT
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300"></span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
