'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/ui/AdminSidebar';
import AdminHeader from '@/components/admin/ui/AdminHeader';
import { signOut } from '@/actions/auth';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onCollapse={() => setIsCollapsed((prev) => !prev)}
      />
      <div className="relative">
        <main className={`transition-margin duration-300 min-h-screen ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
          <AdminHeader
            onMenuToggle={() => setSidebarOpen((prev) => !prev)}
            onLogout={() => signOut()}
          />
          <div className="p-4 lg:p-6 space-y-6 max-w-full">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
