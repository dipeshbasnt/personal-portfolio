"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNewEnquiryCount } from "@/hooks/useNewEnquiryCount";
import type { AuthUser } from "@/types/auth";

interface AdminHeaderProps {
  title?: string;
  onMenuToggle: () => void;
  onLogout: () => void;
}

function getPageTitle(pathname: string): string {
  if (pathname === "/admin/enquiries") return "Enquiries";
  if (pathname === "/admin/settings") return "Settings";
  return "Dashboard";
}

function getInitials(user: AuthUser | null): string {
  if (!user) return "?";
  const name =
    (typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : "") || "";
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }
  return (user.email?.charAt(0) ?? "?").toUpperCase();
}

export default function AdminHeader({
  title,
  onMenuToggle,
  onLogout,
}: AdminHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [announceMessage, setAnnounceMessage] = useState("");
  const prevCountRef = useRef<number | null>(null);
  const pathname = usePathname();
  const pageTitle = title ?? getPageTitle(pathname);
  const { user } = useAuth();
  const initials = getInitials(user);
  const { count } = useNewEnquiryCount();
const bellRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  // Announce count increases via aria-live region
  useEffect(() => {
    const prev = prevCountRef.current;
    if (prev !== null && count > prev) {
      setAnnounceMessage(`${count} new notification${count === 1 ? "" : "s"}`);
    } else if (count === 0 && prev !== null && prev > 0) {
      setAnnounceMessage("No new notifications");
    } else {
      setAnnounceMessage("");
    }
    prevCountRef.current = count;
  }, [count]);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
        setLogoutConfirmOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBellOpen(false);
        setUserMenuOpen(false);
        setLogoutConfirmOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const badgeText = count > 9 ? "9+" : String(count);
  const ariaLabel = count === 0 ? "Notifications" : `Notifications, ${count} new`;

  return (
    <header className="h-16 border-b border-stone-200 bg-white/95 backdrop-blur flex items-center justify-between px-4 lg:px-6 z-50">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-lg transition-colors lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} strokeWidth={2} />
        </button>

        <h1 className="text-xl font-bold text-stone-900 tracking-tight lg:text-lg">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Bell */}
        <div ref={bellRef} 
        className="relative">
    <button
            onClick={() => {
              setUserMenuOpen(false);
              setLogoutConfirmOpen(false);
              setBellOpen((prev) => !prev);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors focus:outline-none relative"
            aria-label={ariaLabel}
            aria-haspopup="menu"
            aria-expanded={bellOpen}
          >
            <Bell size={20} strokeWidth={2} />
            {count > 0 && (
              <span
                className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 text-[10px] font-bold text-white bg-red-600 rounded-full border border-white"
              >
                {badgeText}
              </span>
            )}
          </button>

          {bellOpen && (
            <div
              className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-white border border-stone-200 rounded-xl shadow-lg z-50"
            >
              <div className="px-4 py-3">
                {count === 0 ? (
                  <p className="text-sm text-stone-500"> No new notification</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-stone-900">
                      {count} new enquir{count === 1 ? "y" : "ies"}
                    </p>
                    <Link
                      href="/admin/enquiries"
                      onClick={() => setBellOpen(false)}
                      className="mt-2 block px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      View all enquiries
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar + Logout */}
        <div ref={avatarRef} className="relative">
          <button
            onClick={() => {
              setBellOpen(false);
              setLogoutConfirmOpen(false);
              setUserMenuOpen((prev) => !prev);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors focus:outline-none"
            aria-label="User menu"
            aria-haspopup="menu"
            aria-expanded={userMenuOpen || logoutConfirmOpen}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 text-sm font-medium">
                {initials}
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <span className="hidden sm:inline-block text-sm font-medium">
              Admin
            </span>
          </button>

          {userMenuOpen && !logoutConfirmOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-50">
              <button
                onClick={() => setLogoutConfirmOpen(true)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} strokeWidth={2} className="mr-1" />
                Log out
              </button>
            </div>
          )}

          {logoutConfirmOpen && (
  <div
    role="alertdialog"
    aria-labelledby="logout-confirm-title"
    aria-describedby="logout-confirm-desc"
    className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-white border border-stone-200 rounded-xl shadow-lg p-4 z-[60]"
  >
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50">
        <LogOut size={16} strokeWidth={2} className="text-red-600" aria-hidden="true" />
      </div>
      <div>
        <p id="logout-confirm-title" className="text-sm font-semibold text-stone-900">
          Sign out?
        </p>
        <p id="logout-confirm-desc" className="mt-0.5 text-xs leading-relaxed text-stone-500">
          You&apos;ll need to sign in again to access the admin panel.
        </p>
      </div>
    </div>

    <div className="mt-4 flex gap-2">
      <button
        type="button"
        onClick={() => setLogoutConfirmOpen(false)}
        className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={() => {
          setLogoutConfirmOpen(false);
          onLogout();
        }}
        className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        Sign out
      </button>
    </div>
  </div>
)}
        </div>

        {/* Visually hidden aria-live region */}
        <span
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {announceMessage}
        </span>
      </div>
    </header>
  );
}
