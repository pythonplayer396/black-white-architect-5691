import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ADMIN_EMAIL } from "@/hooks/useAdminAuth";

export default function AdminLogin() {
  const [username, setUsername] = useState("rian");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Map the simple "rian" username to the auth email
  const emailFor = (u: string) =>
    u.includes("@") ? u : `${u.trim().toLowerCase()}@solis.local`;

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const email = emailFor(username);
    let { error } = await supabase.auth.signInWithPassword({ email, password });

    // Bootstrap: if the admin account doesn't exist yet, create it on the fly
    if (error && email === ADMIN_EMAIL && password === "rian3030") {
      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (!signUpErr) {
        const retry = await supabase.auth.signInWithPassword({ email, password });
        error = retry.error;
      } else {
        error = signUpErr;
      }
    }

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
    nav("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form onSubmit={signIn} className="w-full max-w-sm space-y-6 border border-foreground/10 p-8">
        <div>
          <div className="text-minimal text-muted-foreground">Solis Institute</div>
          <h1 className="text-architectural text-2xl text-foreground mt-2">Admin</h1>
        </div>
        <div className="space-y-3">
          <label className="text-minimal block">
            <span className="text-muted-foreground">Username</span>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
              autoComplete="username"
              required
            />
          </label>
          <label className="text-minimal block">
            <span className="text-muted-foreground">Password</span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              autoComplete="current-password"
              required
            />
          </label>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
