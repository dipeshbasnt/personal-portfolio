'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Mail,
  Settings,
  ChevronRight,
  ChevronsLeft,
  ShieldCheck,
  X,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({
  isOpen,
  onClose,
  isCollapsed = false,
  onCollapse,
}: {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onCollapse?: (next: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar (always visible on lg+) */}
      <aside
      className={`hidden lg:flex lg:flex-col fixed left-0 top-0 h-full bg-white border-r border-stone-200 z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}      >
<div className={`flex items-center h-16 border-b border-stone-100 bg-white/95 backdrop-blur ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
          <div className={`items-center gap-2 ${isCollapsed ? 'hidden' : 'flex'}`}>
  <ShieldCheck size={20} strokeWidth={2} className="text-red-600" />
            <span className={`font-bold text-stone-900 tracking-tight text-lg ${isCollapsed ? 'hidden' : 'block'}`}>
              Admin
            </span>
          </div>
          <button
            onClick={() => onCollapse?.(!isCollapsed)}
            className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <nav className="mt-4 px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-700 shadow-sm border border-red-100'
                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon size={18} strokeWidth={2} />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-stone-100 bg-white/95 backdrop-blur">
          <button
  className={`w-full flex items-center gap-3 py-3 rounded-xl text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
  onClick={() => onCollapse?.(!isCollapsed)}
  aria-label="Collapse sidebar"
>
            <ChevronsLeft size={18} strokeWidth={2} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            <span className={`text-sm font-medium ${isCollapsed ? 'hidden' : 'block'}`}>
              Collapse
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      {isOpen && (
        <aside
          className="fixed left-0 top-0 h-full w-72 bg-white border-r border-stone-200 z-[50] transform transition-transform duration-300 ease-in-out translate-x-0 lg:hidden"
          aria-label="Admin navigation"
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-stone-100 bg-white/95 backdrop-blur">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} strokeWidth={2} className="text-red-600" />
              <span className="font-bold text-stone-900 tracking-tight text-lg">
                Admin
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <nav className="mt-4 px-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-red-700 shadow-sm border border-red-100'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </aside>
      )}
    </>
  );
}
