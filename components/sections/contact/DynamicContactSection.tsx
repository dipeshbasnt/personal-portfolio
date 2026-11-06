"use client";

import dynamic from "next/dynamic";

// ContactSection is below the fold at the bottom of the page. Lazy-load it
// client-side only (ssr: false) to remove its hydration cost from initial
// page load. Minimal CLS impact since there is no content below it.
const ContactSection = dynamic(
  () => import("@/components/sections/contact/ContactSection"),
  { ssr: false }
);

export default ContactSection;
