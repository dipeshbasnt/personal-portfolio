import { type User } from "@supabase/supabase-js";
import { type Session } from "@supabase/supabase-js";
import type { AuthUser, AuthSession } from "@/types/auth";

export const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export function isAdmin(user: User | null): user is User & { id: string } {
  if (!user) return false;
  return user.id === ADMIN_USER_ID;
}

export function requireAuth(user: User | null): asserts user is User {
  if (!user) {
    throw new Error("Authentication required");
  }
}

export function toAuthUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    role: user.id === ADMIN_USER_ID ? "admin" : "user",
    aal: "aal1",
    app_metadata: user.app_metadata ?? {},
    user_metadata: user.user_metadata ?? {},
  };
}

export function toAuthSession(session: Session | null): AuthSession | null {
  if (!session) return null;
  return {
    user: toAuthUser(session.user),
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at ? session.expires_at * 1000 : null,
  };
}
