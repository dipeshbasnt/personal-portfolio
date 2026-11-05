'use client';

import { useEffect, useRef, useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

interface AdminLogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function AdminLogoutModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
}: AdminLogoutModalProps) {
  const [visible, setVisible] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Enter animation + initial focus
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      setVisible(true);
      cancelRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(id);
      setVisible(false);
    };
  }, [isOpen]);

  // Close on Escape (not while signing out)
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onCancel();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      aria-describedby="logout-desc"
    >
      {/* Light dim, no blur */}
      <div
        className={`absolute inset-0 bg-stone-900/25 transition-opacity duration-200 motion-reduce:transition-none ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => !isLoading && onCancel()}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[380px] rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-12px_rgba(24,35,43,0.25)] transition-all duration-200 ease-out motion-reduce:transition-none ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
        }`}
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/60">
          <LogOut size={20} strokeWidth={2} className="text-red-600" aria-hidden="true" />
        </div>

        <h2
          id="logout-title"
          className="mt-5 text-lg font-semibold tracking-tight text-stone-900"
        >
          Sign out?
        </h2>
        <p id="logout-desc" className="mt-1.5 text-sm leading-relaxed text-stone-500">
          You will need to sign in again to access the admin panel.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Signing out…
              </>
            ) : (
              'Sign out'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}