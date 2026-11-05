'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { AuthUser } from '@/types/auth';

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  user,
  isAdmin,
}: {
  children: ReactNode;
  user: AuthUser | null;
  isAdmin: boolean;
}) {
  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
