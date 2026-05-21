import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SettingsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      return Object.fromEntries(data.map((r: any) => [r.key, r.value])) as Record<string, string>;
    },
  });

  const [shipped, setShipped] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (data) {
      setShipped(data.projects_shipped ?? "");
      setYear(data.established_year ?? "");
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const rows = [
        { key: "projects_shipped", value: shipped },
        { key: "established_year", value: year },
      ];
      const { error } = await supabase.from("site_settings").upsert(rows);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin", "settings"] });
      qc.invalidateQueries({ queryKey: ["public", "settings"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="max-w-2xl">
      <div className="text-minimal text-muted-foreground">Manage</div>
      <h1 className="text-architectural text-3xl mt-1 mb-8">Site Settings</h1>

      <div className="space-y-6">
        <label className="block">
          <span className="text-minimal text-muted-foreground">Projects shipped (homepage stat)</span>
          <Input className="mt-2" value={shipped} onChange={(e) => setShipped(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-minimal text-muted-foreground">Established year</span>
          <Input className="mt-2" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <Button onClick={() => save.mutate()}>Save</Button>
      </div>
    </div>
  );
}
