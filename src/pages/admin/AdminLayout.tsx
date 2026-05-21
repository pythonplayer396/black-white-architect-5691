import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { session, isAdmin, loading } = useAdminAuth();
  const nav = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 px-6">
        <p className="text-foreground">This account is not an admin.</p>
        <Button
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            nav("/admin/login");
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }

  const link = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 text-sm tracking-widest uppercase border-l-2 ${
      isActive ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-60 border-r border-foreground/10 p-6 flex flex-col">
        <div className="mb-10">
          <div className="text-minimal text-muted-foreground">Solis</div>
          <div className="text-architectural text-xl">Admin</div>
        </div>
        <nav className="space-y-1 flex-1">
          <NavLink to="/admin" end className={link}>Dashboard</NavLink>
          <NavLink to="/admin/projects" className={link}>Projects</NavLink>
          <NavLink to="/admin/blog" className={link}>Blog</NavLink>
          <NavLink to="/admin/team" className={link}>Team</NavLink>
          <NavLink to="/admin/settings" className={link}>Settings</NavLink>
        </nav>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await supabase.auth.signOut();
            nav("/admin/login");
          }}
        >
          Sign out
        </Button>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
