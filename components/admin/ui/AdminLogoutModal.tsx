'use client';

import { useEffect } from 'react';
import { AlertCircle, LogOut } from 'lucide-react';
import Button from '@/components/atoms/Button';

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
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="logout-popup-title"
      aria-describedby="logout-popup-desc"
    >
      {/* Subtle backdrop that dims only the page behind the popup */}
      <div
        className="absolute inset-0 bg-stone-900/10 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Small professional popup dialog */}
      <div
        className="relative w-full max-w-sm mx-4 transform transition-all duration-300 ease-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertCircle size={20} strokeWidth={2.5} className="text-red-600" />
            </div>
            <h2
              id="logout-popup-title"
              className="text-lg font-bold text-stone-900 tracking-tight"
            >
              Confirm Logout
            </h2>
          </div>

          <p
            id="logout-popup-desc"
            className="text-sm text-stone-600 leading-relaxed mb-6 text-center"
          >
            You will be logged out of the admin panel. Any unsaved changes
            may be lost.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 shadow-md"
            >
              <LogOut size={14} strokeWidth={2} className="mr-2" />
              {isLoading ? 'Signing out...' : 'Yes, Logout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
