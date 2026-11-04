"use client";

import { useState } from "react";
import Container from "@/components/atoms/Container";
import { FloatInput } from "@/components/atoms";
import { contactContent } from "@/data/portfolio";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add custom submit logic or API endpoint integration here
  };

  return (
    <section
      aria-labelledby="contact-title"
      className="contact-section w-full py-20 bg-stone-100"
      id="contact"
    >
      <Container>
        <div className="contact-surface flex flex-col items-center gap-16 max-w-[1100px] mx-auto">
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
              className="contact-form p-6 sm:p-8 bg-stone-100 rounded-2xl border border-stone-300 flex flex-col justify-between gap-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <FloatInput
                      label={contactContent.fields.nameLabel}
                      placeholder={contactContent.fields.namePlaceholder}
                      value={formData.name}
                      onChange={(value) =>
                        setFormData({ ...formData, name: value })
                      }
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <FloatInput
                      label={contactContent.fields.emailLabel}
                      placeholder={contactContent.fields.emailPlaceholder}
                      value={formData.email}
                      onChange={(value) =>
                        setFormData({ ...formData, email: value })
                      }
                    />
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
                    className="w-full min-h-[130px] px-4 py-2 bg-white rounded-lg border border-stone-300 text-slate-950 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all resize-y"
                    id="contact-message"
                    name="message"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={contactContent.fields.messagePlaceholder}
                    value={formData.message}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white text-base font-medium tracking-wide rounded-full shadow-[0px_6px_16px_0px_rgba(7,17,31,0.12)] transition-colors cursor-pointer"
                  type="submit"
                >
                  {contactContent.submitLabel}
                </button>
              </div>
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