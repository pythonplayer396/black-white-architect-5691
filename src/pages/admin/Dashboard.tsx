import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const [p, b, t] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("team_members").select("*", { count: "exact", head: true }),
      ]);
      return { projects: p.count ?? 0, posts: b.count ?? 0, team: t.count ?? 0 };
    },
  });

  const card = "border border-foreground/10 p-6 hover:border-foreground/40 transition-colors";

  return (
    <div className="max-w-4xl">
      <div className="text-minimal text-muted-foreground">Overview</div>
      <h1 className="text-architectural text-3xl mt-2 mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/projects" className={card}>
          <div className="text-minimal text-muted-foreground">Projects</div>
          <div className="text-architectural text-4xl mt-2">{data?.projects ?? "—"}</div>
        </Link>
        <Link to="/admin/blog" className={card}>
          <div className="text-minimal text-muted-foreground">Blog posts</div>
          <div className="text-architectural text-4xl mt-2">{data?.posts ?? "—"}</div>
        </Link>
        <Link to="/admin/team" className={card}>
          <div className="text-minimal text-muted-foreground">Team</div>
          <div className="text-architectural text-4xl mt-2">{data?.team ?? "—"}</div>
        </Link>
      </div>
    </div>
  );
}
