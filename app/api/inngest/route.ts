import { serve } from "inngest/next";
import { inngestClient } from "@/lib/inngest/client";
import { sendContactEmail } from "@/lib/inngest/functions/sendContactEmail";
import { recoverOutbox } from "@/lib/inngest/functions/recoverOutbox";

// Inngest HTTP handler for Next.js App Router.
// This endpoint receives events and triggers the corresponding functions.
export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [sendContactEmail, recoverOutbox],
});
