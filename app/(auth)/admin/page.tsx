"use client";

import { useEffect, useState } from "react";
import AdminStatCard from "@/components/admin/ui/AdminStatCard";
import AdminEnquiriesList from "@/components/admin/ui/AdminEnquiriesList";
import { useEnquiries } from "@/hooks/useEnquiries";
import { enquiriesClientRepository } from "@/services/enquiries/client";
import { TrendingUp, Mail, CheckCircle2 } from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<{ total: number; new: number; read: number } | null>(null);

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

  const totalCount = stats?.total ?? (loading ? 0 : enquiries.length);
  const unreadCount = stats?.new ?? enquiries.filter((e) => !e.read).length;
  const readCount = stats?.read ?? enquiries.filter((e) => e.read).length;

  return (
    <>
      {/* Stats Grid - Responsive */}
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

      {/* Enquiries List - Responsive container (scroll only on mobile) */}
      <AdminEnquiriesList />
    </>
  );
}
