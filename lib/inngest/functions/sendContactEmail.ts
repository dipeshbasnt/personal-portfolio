import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

import { inngestClient } from "@/lib/inngest/client";

// Admin Supabase client using the service role key.
// Inngest functions run server-side and need to bypass RLS to update
// enquiries and the email_outbox table.
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const EMAIL_TO = process.env.EMAIL_TO ?? "hello@rabbitthedesigner.com";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "no-reply@rabbitthedesigner.com";

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

    // Create a Nodemailer transporter for this attempt.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });

    // Send the email with a timeout so a hung SMTP never hangs the step.
    const timeoutMs = 30000;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error(`SMTP send timed out after ${timeoutMs}ms`)),
        timeoutMs,
      );
    });

    try {
      await Promise.race([
        transporter.sendMail({
          from: EMAIL_FROM,
          to: EMAIL_TO,
          subject: `Portfolio contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          html: `<p>New contact form submission</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>${message}</p>`,
        }),
        timeoutPromise,
      ]);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
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
