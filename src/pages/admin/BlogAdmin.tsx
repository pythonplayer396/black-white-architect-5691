import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body: string | null;
  published: boolean;
  published_at: string | null;
};

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const empty: Partial<Post> = { title: "", slug: "", excerpt: "", cover_image_url: "", body: "", published: true };

export default function BlogAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Post> | null>(null);

  const { data: posts = [] } = useQuery({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
  });

  const save = useMutation({
    mutationFn: async (p: Partial<Post>) => {
      const payload = { ...p, slug: p.slug || slugify(p.title ?? "") };
      if (p.id) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", p.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "blog"] });
      qc.invalidateQueries({ queryKey: ["public", "blog"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "blog"] });
      qc.invalidateQueries({ queryKey: ["public", "blog"] });
    },
  });

  async function uploadCover(file: File) {
    const path = `blog/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setEditing((p) => ({ ...(p ?? empty), cover_image_url: data.publicUrl }));
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-minimal text-muted-foreground">Manage</div>
          <h1 className="text-architectural text-3xl mt-1">Blog</h1>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>New post</Button>
      </div>

      {editing && (
        <div className="border border-foreground/20 p-6 mb-8 space-y-4">
          <Input placeholder="Title" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} />
          <Input placeholder="Slug" value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          <Textarea placeholder="Excerpt" value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
          <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
          {editing.cover_image_url && <img src={editing.cover_image_url} alt="" className="h-32 object-cover" />}
          <Textarea rows={12} placeholder="Body (markdown)" value={editing.body ?? ""} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
          <label className="text-minimal flex items-center gap-2">
            <input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
            Published
          </label>
          <div className="flex gap-2">
            <Button onClick={() => save.mutate(editing)}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="border-t border-foreground/10">
        {posts.map((p) => (
          <div key={p.id} className="flex items-start justify-between gap-6 py-5 border-b border-foreground/10">
            <div className="min-w-0">
              <div className="text-minimal text-muted-foreground">{p.published ? "Published" : "Draft"} · /{p.slug}</div>
              <div className="text-architectural text-lg">{p.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(p)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => confirm("Delete?") && del.mutate(p.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground py-8 text-center">No posts yet.</p>}
      </div>
    </div>
  );
}
