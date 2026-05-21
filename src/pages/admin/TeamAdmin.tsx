import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Role = { id: string; name: string; description: string | null };
type Member = {
  id: string;
  name: string;
  role_id: string | null;
  level: string | null;
  photo_url: string | null;
  bio: string | null;
  sort_order: number;
};

const emptyMember: Partial<Member> = { name: "", role_id: null, level: "", photo_url: "", bio: "", sort_order: 0 };

export default function TeamAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Member> | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  const { data: roles = [] } = useQuery({
    queryKey: ["admin", "roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_roles").select("*").order("name");
      if (error) throw error;
      return data as Role[];
    },
  });

  const { data: members = [] } = useQuery({
    queryKey: ["admin", "members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order");
      if (error) throw error;
      return data as Member[];
    },
  });

  const saveMember = useMutation({
    mutationFn: async (m: Partial<Member>) => {
      if (m.id) {
        const { error } = await supabase.from("team_members").update(m).eq("id", m.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert(m as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "members"] });
      qc.invalidateQueries({ queryKey: ["public", "team"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const delMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "members"] });
      qc.invalidateQueries({ queryKey: ["public", "team"] });
    },
  });

  const addRole = useMutation({
    mutationFn: async () => {
      if (!newRoleName.trim()) throw new Error("Role name required");
      const { error } = await supabase.from("team_roles").insert({ name: newRoleName.trim(), description: newRoleDesc.trim() || null });
      if (error) throw error;
    },
    onSuccess: () => {
      setNewRoleName("");
      setNewRoleDesc("");
      toast.success("Role added");
      qc.invalidateQueries({ queryKey: ["admin", "roles"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const delRole = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_roles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "roles"] });
      qc.invalidateQueries({ queryKey: ["admin", "members"] });
    },
  });

  async function uploadPhoto(file: File) {
    const path = `team/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setEditing((p) => ({ ...(p ?? emptyMember), photo_url: data.publicUrl }));
  }

  const roleName = (id: string | null) => roles.find((r) => r.id === id)?.name ?? "—";

  return (
    <div className="max-w-5xl space-y-12">
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-minimal text-muted-foreground">Manage</div>
            <h1 className="text-architectural text-3xl mt-1">Team</h1>
          </div>
          <Button onClick={() => setEditing({ ...emptyMember })}>Add member</Button>
        </div>

        {editing && (
          <div className="border border-foreground/20 p-6 mb-8 space-y-4">
            <Input placeholder="Name" value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <select
              className="w-full border border-input bg-background px-3 py-2 text-sm"
              value={editing.role_id ?? ""}
              onChange={(e) => setEditing({ ...editing, role_id: e.target.value || null })}
            >
              <option value="">— Select role —</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <Input placeholder="Level (e.g. Senior, Lead, Junior)" value={editing.level ?? ""} onChange={(e) => setEditing({ ...editing, level: e.target.value })} />
            <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
            {editing.photo_url && <img src={editing.photo_url} alt="" className="h-24 w-24 object-cover rounded-full" />}
            <Textarea placeholder="Bio" value={editing.bio ?? ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
            <Input type="number" className="w-32" placeholder="Sort" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
            <div className="flex gap-2">
              <Button onClick={() => saveMember.mutate(editing)}>Save</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="border-t border-foreground/10">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-6 py-5 border-b border-foreground/10">
              <div className="flex items-center gap-4">
                {m.photo_url && <img src={m.photo_url} alt="" className="h-12 w-12 rounded-full object-cover" />}
                <div>
                  <div className="text-architectural text-lg">{m.name}</div>
                  <div className="text-minimal text-muted-foreground">{roleName(m.role_id)} {m.level && `· ${m.level}`}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(m)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => confirm("Delete?") && delMember.mutate(m.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {members.length === 0 && <p className="text-muted-foreground py-8 text-center">No team members yet.</p>}
        </div>
      </div>

      <div>
        <h2 className="text-architectural text-2xl mb-6">Roles</h2>
        <div className="border border-foreground/20 p-6 mb-6 space-y-3">
          <Input placeholder="New role name" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
          <Input placeholder="Description (optional)" value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} />
          <Button onClick={() => addRole.mutate()}>Add role</Button>
        </div>
        <div className="border-t border-foreground/10">
          {roles.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-4 border-b border-foreground/10">
              <div>
                <div className="text-architectural">{r.name}</div>
                {r.description && <div className="text-sm text-muted-foreground">{r.description}</div>}
              </div>
              <Button variant="destructive" size="sm" onClick={() => confirm("Delete role?") && delRole.mutate(r.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
