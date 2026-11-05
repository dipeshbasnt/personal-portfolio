'use server';

import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/permissions";
import { requireAuth } from "@/lib/auth/guards";

/**
 * Helper: Ensures the current request is from an authenticated admin user.
 * Throws if not authenticated or not admin.
 */
async function requireAdminAuth(): Promise<{ id: string; email: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  requireAuth(user);

  if (!isAdminUser(user)) {
    throw new Error("Administrator access required");
  }

  return { id: user.id, email: user.email ?? "" };
}

/**
 * Server Action: Delete an enquiry.
 * Requires admin authentication.
 */
export async function deleteEnquiry(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  await requireAdminAuth();

  const supabase = await createClient();

  const { error } = await supabase
    .from("enquiries")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message ?? "Failed to delete enquiry.",
    };
  }

  return { success: true };
}

/**
 * Server Action: Update an enquiry (e.g., mark as read/unread, update notes).
 * Requires admin authentication.
 */
export async function updateEnquiry(
  id: string,
  updates: { read?: boolean; notes?: string }
): Promise<{
  success: boolean;
  error?: string;
}> {
  await requireAdminAuth();

  const supabase = await createClient();

  const { error } = await supabase
    .from("enquiries")
    .update(updates)
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message ?? "Failed to update enquiry.",
    };
  }

  return { success: true };
}

/**
 * Server Action: Export all enquiries as JSON.
 * Requires admin authentication.
 */
export async function exportEnquiries(): Promise<{
  success: boolean;
  data?: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean;
  }>;
  error?: string;
}> {
  await requireAdminAuth();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      success: false,
      error: error.message ?? "Failed to export enquiries.",
    };
  }

  return {
    success: true,
    data: (data ?? []).map((d) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      message: d.message,
      createdAt: d.created_at,
      read: d.read,
    })),
  };
}

/**
 * Server Action: Get admin security status.
 * Returns whether the current user is admin and authenticated.
 */
export async function getAdminSecurityStatus(): Promise<{
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId?: string;
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isAuthenticated: false, isAdmin: false };
  }

  const adminStatus = isAdminUser(user);

  return {
    isAuthenticated: true,
    isAdmin: adminStatus,
    userId: user.id,
  };
}
