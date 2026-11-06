import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";

import { inngestClient } from "@/lib/inngest/client";

// Admin Supabase client using the service role key.
// Inngest functions run server-side and need to bypass RLS to update
// enquiries and the email_outbox table.
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const EMAIL_TO = process.env.EMAIL_TO ?? "hello@rabbitthedesigner.com";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

type SendContactEmailData = {
  enquiryId: string;
  name: string;
  email: string;
  message: string;
  retryCount?: number;
};

export const sendContactEmail = inngestClient.createFunction(
  {
    id: "send-contact-email",
    name: "Send Contact Email",
    triggers: { event: "contact/email.send" },
  },
  async ({ event }: { event: { data: SendContactEmailData } }) => {
    const { enquiryId, name, email, message } = event.data;

    // Idempotency: check if the email was already sent for this enquiry.
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("enquiries")
      .select("id, email_status")
      .eq("id", enquiryId)
      .single();

    if (fetchError || !existing) {
      throw new Error(`Enquiry ${enquiryId} not found`);
    }

    if (existing.email_status === "sent") {
      // Already delivered — skip to ensure idempotency.
      return { status: "skipped", reason: "already_sent", enquiryId };
    }

    let emailError: Error | null = null;

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p>New contact form submission</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>${message}</p>`,
      });
    } catch (error) {
      emailError =
        error instanceof Error ? error : new Error(String(error));
      console.error("Resend send failed:", emailError.message);
    }

    if (emailError) {
      // Mark as failed so recoverOutbox can retry later.
      await supabaseAdmin
        .from("enquiries")
        .update({ email_status: "failed" })
        .eq("id", enquiryId);

      return {
        status: "failed",
        enquiryId,
        error: emailError.message,
      };
    }

    // Mark the enquiry as sent and clean up the outbox entry.
    await supabaseAdmin
      .from("enquiries")
      .update({ email_status: "sent" })
      .eq("id", enquiryId);

    await supabaseAdmin.from("email_outbox").delete().eq("enquiry_id", enquiryId);

    return {
      status: "sent",
      enquiryId,
    };
  }
);
