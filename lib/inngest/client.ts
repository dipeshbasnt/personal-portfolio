import { Inngest } from "inngest";

// Create a single Inngest client for the entire application.
// Never create more than one client in a single process.
export const inngestClient = new Inngest({
  id: "portfolio-contact-form",
  name: "Portfolio Contact Form",
  // The event key is used to verify that events come from your app.
  // Set INNGEST_EVENT_KEY in your environment variables.
  eventKey: process.env.INNGEST_EVENT_KEY,
});
