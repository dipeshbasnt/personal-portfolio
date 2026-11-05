import { type User } from "@supabase/supabase-js";
import { type Session } from "@supabase/supabase-js";
import type { AuthUser, AuthSession } from "@/types/auth";
import { ADMIN_USER_ID, toAuthUser, toAuthSession, isAdmin } from "./guards";

export function validateSession(session: Session | null): AuthSession | null {
  if (!session) return null;
  return toAuthSession(session);
}

export function isAdminSession(session: Session | null): boolean {
  if (!session?.user) return false;
  return session.user.id === ADMIN_USER_ID;
}

export function normalizeUser(user: User | null): AuthUser | null {
  return toAuthUser(user);
}

export function checkAdmin(user: User | null): boolean {
  return isAdmin(user);
}
