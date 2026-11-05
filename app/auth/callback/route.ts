import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth Callback Handler (Google, etc.)
 * Supabase redirects here after the user authenticates with the provider.
 * We exchange the auth code for a session, then redirect based on admin status.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_no_code", request.url)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_exchange_failed", request.url)
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_no_user", request.url)
    );
  }

  // Check admin authorization: ADMIN_USER_ID + app_metadata.role === "admin"
  const ADMIN_USER_ID = process.env.ADMIN_USER_ID;
  const isAdmin =
    user.id === ADMIN_USER_ID && user.app_metadata?.role === "admin";

  if (!isAdmin) {
    // Signed in but not an administrator — sign out and redirect to login
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/login?error=not_admin", request.url)
    );
  }

  // Authorized admin — redirect to admin dashboard
  return NextResponse.redirect(new URL("/admin", request.url));
}
