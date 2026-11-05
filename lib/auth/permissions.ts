import { type User } from "@supabase/supabase-js";
import { ADMIN_USER_ID } from "./guards";

export function isAdminUser(user: User | null): boolean {
  if (!user) return false;

  if (user.id !== ADMIN_USER_ID) return false;

  const role = user.app_metadata?.role;
  if (role !== "admin") return false;

  return true;
}

export function requireAdmin(user: User | null): asserts user is User {
  if (!isAdminUser(user)) {
    throw new Error("Administrator access required");
  }
}
