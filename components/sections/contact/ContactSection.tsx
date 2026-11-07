"use client";

import { useState } from "react";
import Container from "@/components/atoms/Container";
import { FloatInput } from "@/components/atoms";
import { contactContent } from "@/data/portfolio";
import { CheckCircle2, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please tell me about your project.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setIsModalOpen(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="contact-title"
      className="contact-section w-full py-20 bg-stone-100"
      id="contact"
    >
      <Container>
        <div className="contact-surface relative flex flex-col items-center gap-16 max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="contact-header flex flex-col items-center gap-4 text-center">
            <h2
              className="contact-title text-slate-950 text-4xl sm:text-5xl font-semibold tracking-tight uppercase leading-tight"
              id="contact-title"
            >
              {contactContent.title}
            </h2>
            <div aria-hidden="true" className="w-12 h-1 bg-red-500" />
          </div>

          {/* Cards Grid */}
          <div className="contact-grid w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Form Card */}
            <form
              noValidate
              className="contact-form relative p-6 sm:p-8 bg-stone-100 rounded-2xl border border-stone-300 flex flex-col justify-between gap-6"
              onSubmit={handleSubmit}
            >
              {!isModalOpen ? (
                <>
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div className="flex flex-col gap-2">
                        <FloatInput
                          error={errors.name}
                          label={contactContent.fields.nameLabel}
                          placeholder={contactContent.fields.namePlaceholder}
                          value={formData.name}
                          onChange={(value) =>
                            setFormData({ ...formData, name: value })
                          }
                        />
                        {errors.name ? (
                          <span className="text-sm text-red-500" role="alert">
                            {errors.name}
                          </span>
                        ) : null}
                      </div>

                      {/* Email Input */}
                      <div className="flex flex-col gap-2">
                        <FloatInput
                          error={errors.email}
                          label={contactContent.fields.emailLabel}
                          placeholder={contactContent.fields.emailPlaceholder}
                          value={formData.email}
                          onChange={(value) =>
                            setFormData({ ...formData, email: value })
                          }
                        />
                        {errors.email ? (
                          <span className="text-sm text-red-500" role="alert">
                            {errors.email}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-slate-950 text-base font-normal"
                        htmlFor="contact-message"
                      >
                        {contactContent.fields.messageLabel}
                      </label>
                      <textarea
                        aria-invalid={errors.message ? true : undefined}
                        className="w-full min-h-[130px] px-4 py-2 bg-white rounded-lg border border-stone-300 text-slate-950 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all resize-y"
                        id="contact-message"
                        name="message"
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder={contactContent.fields.messagePlaceholder}
                        value={formData.message}
                      />
                      {errors.message ? (
                        <span className="text-sm text-red-500" role="alert">
                          {errors.message}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    {submitError ? (
                      <p className="mb-4 text-sm text-red-500 text-center" role="alert">
                        {submitError}
                      </p>
                    ) : null}
                    <button
                      className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white text-base font-medium tracking-wide rounded-full shadow-[0px_6px_16px_0px_rgba(7,17,31,0.12)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={isSubmitting || isModalOpen}
                      type="submit"
                    >
                      {isSubmitting ? "Sending..." : contactContent.submitLabel}
                    </button>
                  </div>
                </>
              ) : (
                /* Success state */
                <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in slide-in-from-top-1">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <CheckCircle2 size={16} strokeWidth={2} className="text-red-600" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-stone-900">
                    Message Sent ✨
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-stone-500 max-w-xs text-center">
                    Thanks for reaching out! I’ve received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </form>

            {/* Dark Callout Banner */}
            <div className="contact-callout relative p-6 sm:p-8 bg-slate-950 rounded-2xl overflow-hidden flex flex-col justify-between gap-8 min-h-[360px]">
              {/* Paperplane Accent Icon */}
              <div
                aria-hidden="true"
                className="absolute top-6 right-6 -rotate-12 text-white/90"
              >
                <Send className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
              </div>

              {/* Callout Body */}
              <div className="flex flex-col gap-4 max-w-sm pt-4">
                <h3 className="text-white text-3xl sm:text-4xl font-semibold leading-tight whitespace-pre-line">
                  {contactContent.cardTitle}
                </h3>
                <p className="text-white/80 text-base leading-relaxed">
                  {contactContent.cardDescription}
                </p>
              </div>

              {/* Callout CTA */}
              <div>
                <a
                  className="inline-flex items-center justify-center h-12 px-6 bg-white hover:bg-stone-200 text-slate-950 text-base font-bold rounded-full shadow-[0px_8px_20px_0px_rgba(0,0,0,0.08)] transition-colors"
                  href="mailto:jane@example.com"
                >
                  {contactContent.ctaLabel}
                </a>
              </div>

              {/* Radial Blur Glow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
