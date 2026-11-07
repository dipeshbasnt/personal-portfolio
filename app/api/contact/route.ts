import { NextResponse } from "next/server";
import { enquiriesService } from "@/services/enquiries";
import { inngestClient } from "@/lib/inngest/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const MAX_MESSAGE_LENGTH = 5000;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
};

// Admin Supabase client for writing to email_outbox when Inngest enqueue fails.
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(request: Request) {
  let body: ContactPayload | null = null;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    body = null;
  }

  if (!body) {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (body.company) {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 120) {
    return NextResponse.json(
      { success: false, error: "Please provide your name." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { success: false, error: "Please provide a message (min. 10 characters)." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // Step 1: Save the enquiry to Supabase first with email_status = 'pending'.
  // This is the source of truth — if this fails, we return an error.
  let enquiryId: string | null = null;
  try {
    const created = await enquiriesService.create({
      name,
      email,
      message,
      emailStatus: "pending",
    });
    enquiryId = created.id;
  } catch (error) {
    const dbError = error instanceof Error ? error : new Error(String(error));
    console.error("Contact form enquiry save failed:", dbError);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save your message. Please try again.",
        debug: process.env.NODE_ENV === "development" ? dbError.message : undefined,
      },
      { status: 500 },
    );
  }

  // Step 2: Try to enqueue the Inngest background email job.
  // If this fails, we fall back to the email_outbox table for recovery.
  let enqueueError: Error | null = null;
  if (enquiryId) {
    try {
      console.log("Enqueuing Inngest email job:", { enquiryId, name, email });
      await inngestClient.send({
        name: "contact/email.send",
        data: {
          enquiryId,
          name,
          email,
          message,
        },
      });
      console.log("Inngest email job enqueued successfully:", { enquiryId });
    } catch (error) {
      enqueueError = error instanceof Error ? error : new Error(String(error));
      console.error("Failed to enqueue Inngest email job:", enqueueError?.message ?? enqueueError);

      // Outbox pattern: persist the delivery request so it can be recovered later.
      try {
        await supabaseAdmin.from("email_outbox").insert({
          enquiry_id: enquiryId,
          email_status: "pending",
          retry_count: 0,
        });
      } catch (outboxError) {
        console.error("Failed to insert into email_outbox:", outboxError);
      }
    }
  }

  // Step 3: Return success immediately — never wait for Gmail SMTP.
  // The email is sent asynchronously by Inngest with retries.
  return NextResponse.json({ success: true });
}
