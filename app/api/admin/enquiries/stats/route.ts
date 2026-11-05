import { NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/auth/api/guard";
import { enquiriesService } from "@/services/enquiries";

export const GET = withAdminAuth(async () => {
  try {
    const stats = await enquiriesService.getStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ total: 0, new: 0, read: 0 });
  }
});
