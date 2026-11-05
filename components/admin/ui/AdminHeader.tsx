'use client';

import { useState } from 'react';
import { LogOut, User, Menu } from 'lucide-react';

interface AdminHeaderProps {
  onMenuToggle: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  onMenuToggle,
  onLogout,
}: AdminHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors focus:outline-none"
            aria-label="User menu"
          >
            <User size={20} strokeWidth={2} />
            <span className="hidden sm:inline-block text-sm font-medium">
              Admin
            </span>
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} strokeWidth={2} className="mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
