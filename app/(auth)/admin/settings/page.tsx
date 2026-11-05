"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
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
        <span className="text-stone-900 font-medium">Settings</span>
      </nav>
      <div className="lg:hidden flex items-center gap-2 text-sm text-stone-500 mb-4">
        <Link
          href="/admin"
          className="text-stone-600 hover:text-red-600 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
      <div className="border border-stone-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-6">
          <Settings size={20} className="mr-2" />
          Settings
        </h2>
        <p className="text-stone-500 text-sm">
          Admin settings will be available here.
        </p>
      </div>
    </>
  );
}
