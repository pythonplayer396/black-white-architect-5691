import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  year: string | null;
  description: string | null;
  tags: string[] | null;
  image_url: string | null;
};

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id,title,year,description,tags,image_url")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setProjects((data as Project[]) ?? []);
        setLoading(false);
      });
  }, []);

  if (loading || projects.length === 0) return null;

  return (
    <section id="work" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">SELECTED WORK</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              Recent projects
            </h3>
          </div>

          <div className="space-y-32">
            {projects.map((project) => (
              <div key={project.id} className="group">
                {project.image_url && (
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}

                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-2xl font-light text-architectural mb-2">
                      {project.title}
                    </h4>
                    {(project.year || (project.tags && project.tags.length > 0)) && (
                      <p className="text-minimal text-muted-foreground">
                        {[project.tags?.join(" · "), project.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>

                  {project.description && (
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
