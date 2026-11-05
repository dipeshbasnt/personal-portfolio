import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/permissions";
import { AuthProvider } from "@/components/admin/ui/AuthContext";
import AdminShell from "@/components/admin/ui/AdminShell";
import type { AuthUser } from "@/types/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUser: AuthUser | null = user
    ? {
        id: user.id,
        email: user.email ?? "",
        role: user.id === process.env.ADMIN_USER_ID ? "admin" : "user",
        aal: "aal1",
        app_metadata: user.app_metadata ?? {},
        user_metadata: user.user_metadata ?? {},
      }
    : null;

  const isAdmin = isAdminUser(user);

  return (
    <div className="min-h-screen bg-stone-50 relative">
      <AuthProvider user={authUser} isAdmin={isAdmin}>
        <AdminShell>
          {children}
        </AdminShell>
      </AuthProvider>
    </div>
  );
}
