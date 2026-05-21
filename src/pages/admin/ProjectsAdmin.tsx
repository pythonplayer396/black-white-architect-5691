import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Project = {
  id: string;
  title: string;
  year: string | null;
  description: string | null;
  tags: string[] | null;
  image_url: string | null;
  link: string | null;
  featured: boolean;
  sort_order: number;
};

const empty: Omit<Project, "id"> = {
  title: "",
  year: new Date().getFullYear().toString(),
  description: "",
  tags: [],
  image_url: "",
  link: "",
  featured: false,
  sort_order: 0,
};

export default function ProjectsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  const { data: projects = [] } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  const save = useMutation({
    mutationFn: async (p: Partial<Project>) => {
      const payload = { ...p, tags: p.tags ?? [] };
      if (p.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", p.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public", "projects"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public", "projects"] });
    },
  });

  async function uploadImage(file: File) {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast.error(error.message);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setEditing((p) => ({ ...(p ?? empty), image_url: data.publicUrl }));
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-minimal text-muted-foreground">Manage</div>
          <h1 className="text-architectural text-3xl mt-1">Projects</h1>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>New project</Button>
      </div>

      {editing && (
        <div className="border border-foreground/20 p-6 mb-8 space-y-4">
          <h2 className="text-architectural text-xl">{editing.id ? "Edit" : "New"} project</h2>
          <Input placeholder="Title" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <Input placeholder="Year" value={editing.year ?? ""} onChange={(e) => setEditing({ ...editing, year: e.target.value })} />
          <Textarea placeholder="Description" value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          <Input placeholder="Tags (comma-separated)" value={(editing.tags ?? []).join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
          <Input placeholder="Link URL" value={editing.link ?? ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })} />
          <div className="space-y-2">
            <Input placeholder="Image URL" value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
            <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
            {editing.image_url && <img src={editing.image_url} alt="" className="h-24 object-cover" />}
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-minimal flex items-center gap-2">
              <input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
              Featured (recent)
            </label>
            <Input type="number" className="w-32" placeholder="Sort" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => save.mutate(editing)}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="border-t border-foreground/10">
        {projects.map((p) => (
          <div key={p.id} className="flex items-start justify-between gap-6 py-5 border-b border-foreground/10">
            <div className="flex gap-4 flex-1 min-w-0">
              {p.image_url && <img src={p.image_url} alt="" className="w-20 h-20 object-cover flex-shrink-0" />}
              <div className="min-w-0">
                <div className="text-minimal text-muted-foreground">{p.year} {p.featured && "· Featured"}</div>
                <div className="text-architectural text-lg truncate">{p.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">{p.description}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(p)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => confirm("Delete?") && del.mutate(p.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted-foreground py-8 text-center">No projects yet.</p>}
      </div>
    </div>
  );
}
