"use client";

import Link from "next/link";
import AdminEnquiriesList from "@/components/admin/ui/AdminEnquiriesList";

export default function AdminEnquiriesPage() {
  return (
    <>
      <nav className="hidden lg:flex items-center gap-2 text-sm text-stone-500 mb-4">
        <Link
          href="/admin"
          className="text-stone-600 hover:text-red-600 hover:underline"
        >
          Dashboard
        </Link>
        <span className="text-stone-400">/</span>
        <span className="text-stone-900 font-medium">Enquiries</span>
      </nav>
      <div className="lg:hidden flex items-center gap-2 text-sm text-stone-500 mb-4">
        <Link
          href="/admin"
          className="text-stone-600 hover:text-red-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
      <AdminEnquiriesList />
    </>
  );
}
