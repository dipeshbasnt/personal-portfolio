import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/permissions";

type RouteHandler = (
  request: Request,
  context?: { params: Promise<Record<string, string>> }
) => Response | Promise<Response>;

/**
 * Higher-order wrapper for API routes.
 * Ensures the user is authenticated and is an admin before calling the handler.
 */
export function withAuth(
  handler: RouteHandler
): RouteHandler {
  return async (request, context) => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!isAdminUser(user)) {
      return NextResponse.json(
        { success: false, error: "Administrator access required" },
        { status: 403 }
      );
    }

    return handler(request, context);
  };
}

export async function withAdmin(
  handler: RouteHandler
): Promise<RouteHandler> {
  return withAuth(handler);
}

// Alias for backward compatibility
export const withAdminAuth = withAuth;
