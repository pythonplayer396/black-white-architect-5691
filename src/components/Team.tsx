import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type TeamMember = {
  id: string;
  name: string;
  level: string | null;
  bio: string | null;
  photo_url: string | null;
  role_id: string | null;
  team_roles: { name: string } | null;
};

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("team_members")
      .select("id, name, level, bio, photo_url, role_id, team_roles(name)")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setMembers((data as unknown as TeamMember[]) ?? []);
        setLoading(false);
      });
  }, []);

  if (loading || members.length === 0) return null;

  return (
    <section id="team" className="py-32 bg-muted">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">THE PRACTICE</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              The people behind <span className="font-display-italic">Solis</span>.
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {members.map((m) => (
              <article key={m.id} className="group">
                <div className="aspect-[4/5] bg-background overflow-hidden mb-6">
                  {m.photo_url ? (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-foreground/20 font-display-italic text-7xl">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h4 className="text-2xl font-light text-architectural mb-1">{m.name}</h4>
                <p className="text-minimal text-muted-foreground mb-4">
                  {[m.level, m.team_roles?.name].filter(Boolean).join(" · ")}
                </p>
                {m.bio && (
                  <p className="text-muted-foreground leading-relaxed">{m.bio}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
