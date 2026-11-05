"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminError() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-600"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Something went wrong</h1>
        <p className="text-sm text-stone-500 mb-8">
          Please try again or return to the dashboard.
        </p>
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors text-sm font-medium mr-3"
        >
          Try again
        </button>
        <Link
          href="/admin"
          className="px-4 py-2.5 border border-stone-200 text-stone-700 rounded-full hover:bg-stone-100 transition-colors text-sm font-medium"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
