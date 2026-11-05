import { NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/auth/api/guard";
import { enquiriesService } from "@/services/enquiries";

export const GET = withAdminAuth(
  async (request) => {
    try {
      const { searchParams } = new URL(request.url);
      const read = searchParams.get("read");
      const search = searchParams.get("search") || undefined;
      const sortBy = searchParams.get("sortBy");
      const sortOrder = searchParams.get("sortOrder");

      const enquiries = await enquiriesService.getAll({
        read: read !== undefined ? read === "true" : undefined,
        search,
        sortBy:
          sortBy === "createdAt" || sortBy === "name" || sortBy === "email"
            ? sortBy
            : undefined,
        sortOrder:
          sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined,
      });

      return NextResponse.json(enquiries);
    } catch {
      return NextResponse.json([]);
    }
  },
);
