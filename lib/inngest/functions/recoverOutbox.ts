import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { inngestClient } from "@/lib/inngest/client";

const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const MAX_RETRIES = 5;

type OutboxEntry = {
  id: string;
  enquiry_id: string;
  email_status: string;
  retry_count: number;
};

export const recoverOutbox = inngestClient.createFunction(
  {
    id: "recover-email-outbox",
    name: "Recover Email Outbox",
    triggers: { cron: "*/5 * * * *" },
  },
  async () => {
    // Fetch pending outbox entries that haven't exceeded max retries.
    const { data: entries, error } = await supabaseAdmin
      .from("email_outbox")
      .select("id, enquiry_id, email_status, retry_count")
      .or(
        `email_status.eq.pending,email_status.eq.failed`
      )
      .lte("retry_count", MAX_RETRIES)
      .order("created_at", { ascending: true });

    if (error || !entries) {
      throw new Error(`Failed to fetch outbox entries: ${error?.message}`);
    }

    if (entries.length === 0) {
      return { status: "empty", processed: 0 };
    }

    // Enqueue each pending entry as a contact/email.send event.
    for (const entry of entries) {
      // Increment retry count for tracking.
      await supabaseAdmin
        .from("email_outbox")
        .update({ retry_count: entry.retry_count + 1 })
        .eq("id", entry.id);

      // Re-enqueue the email sending event.
      await inngestClient.send({
        name: "contact/email.send",
        data: {
          enquiryId: entry.enquiry_id,
          retryCount: entry.retry_count,
        },
      });
    }

    return {
      status: "processed",
      processed: entries.length,
    };
  }
);
