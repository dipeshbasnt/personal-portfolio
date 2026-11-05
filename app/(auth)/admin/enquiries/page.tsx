"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/ui/AdminSidebar";
import AdminHeader from "@/components/admin/ui/AdminHeader";
import AdminStatCard from "@/components/admin/ui/AdminStatCard";
import AdminEnquiriesList from "@/components/admin/ui/AdminEnquiriesList";
import AdminLogoutModal from "@/components/admin/ui/AdminLogoutModal";
import { useEnquiries } from "@/hooks/useEnquiries";
import { enquiriesClientRepository } from "@/services/enquiries/client";
import { signOut } from "@/actions/auth";
import { Mail, TrendingUp, CheckCircle2 } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [stats, setStats] = useState<{ total: number; new: number; read: number } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const { data: enquiries = [], loading } = useEnquiries();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const s = await enquiriesClientRepository.getStats();
        setStats(s);
      } catch (err) {
        if (process.env.NODE_ENV === "development") console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogoutConfirm = async () => {
    setLogoutModalOpen(false);
    await signOut();
  };

  const totalCount = stats?.total ?? (loading ? 0 : enquiries.length);
  const unreadCount = stats?.new ?? enquiries.filter((e) => !e.read).length;
  const readCount = stats?.read ?? enquiries.filter((e) => e.read).length;

  return (
    <div className="min-h-screen bg-stone-50 relative">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      <div className="relative">
        <main className={`transition-margin duration-300 min-h-screen ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
          <AdminHeader
            onMenuToggle={() => setSidebarOpen((prev) => !prev)}
            onLogout={() => setLogoutModalOpen(true)}
          />

          <div className="p-4 lg:p-6 space-y-6 max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
              <AdminStatCard
                label="Total Enquiries"
                value={totalCount}
                icon={TrendingUp}
                variant="default"
              />
              <AdminStatCard
                label="New"
                value={unreadCount}
                icon={Mail}
                variant="new"
              />
              <AdminStatCard
                label="Read"
                value={readCount}
                icon={CheckCircle2}
                variant="read"
              />
            </div>

            <div className="border border-stone-200 rounded-2xl shadow-sm overflow-x-auto">
              <AdminEnquiriesList />
            </div>
          </div>
        </main>
      </div>

      <AdminLogoutModal
        isOpen={logoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}
