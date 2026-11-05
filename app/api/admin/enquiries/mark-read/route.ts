import { NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/auth/api/guard";
import { enquiriesService } from "@/services/enquiries";

export const POST = withAdminAuth(async (request) => {
    try {
      const { id } = await request.json();
      await enquiriesService.markRead(id);
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to mark as read." },
        { status: 500 }
      );
    }
  },
);
