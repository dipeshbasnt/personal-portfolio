import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/auth/guards";

export const config = {
  matcher: ["/admin/:path*", "/login", "/auth/callback", "/auth/verify-otp", "/auth/admin/:path*"],
};

export default async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll: async (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from Server Component — cookie changes are not possible here.
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");
  const isAuthCallback = request.nextUrl.pathname.startsWith("/auth/callback");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isOtpRoute = request.nextUrl.pathname.startsWith("/auth/verify-otp");

  // Allow auth routes and callback without authentication
  if (isAuthRoute || isAuthCallback) {
    return NextResponse.next();
  }

  // Allow OTP route if user is authenticated (they need to verify OTP)
  if (isOtpRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If OTP is already verified, redirect to admin dashboard
    // This prevents back-navigation loop from /admin to /verify-otp
    const otpVerified = cookieStore.get("portfolio_otp_verified")?.value === "true";
    if (otpVerified) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  // Protect all admin routes
  if (isAdminRoute) {
    // Must be authenticated
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Must be the designated administrator
    if (!isAdmin(user)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Must have verified OTP
    const otpVerified = cookieStore.get("portfolio_otp_verified")?.value === "true";
    if (!otpVerified) {
      return NextResponse.redirect(new URL("/auth/verify-otp", request.url));
    }
  }

  return NextResponse.next();
}
