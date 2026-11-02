"use client";

import Container from "@/components/atoms/Container";
import { footerContent } from "@/data/portfolio";
import { ArrowUp, Star } from "lucide-react";
import { FaDribbble, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socialIcons = [FaInstagram, FaDribbble, FaLinkedin, FaXTwitter];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section w-full bg-stone-100 border-t border-stone-300 py-8">
      <Container>
        <div className="footer-surface flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
          
          {/* Brand & Copyright */}
          <div className="footer-brand-wrap flex flex-col items-center lg:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Star aria-hidden="true" className="w-5 h-5 fill-white stroke-white" />
              </div>
              <span className="text-slate-950 text-xl font-bold tracking-tight">
                {footerContent.brand}
              </span>
            </div>
            <p className="text-gray-500 text-xs font-normal">
              {footerContent.copyright}
            </p>
          </div>

          {/* Social Links */}
          <div className="footer-socials flex items-center gap-3">
            {footerContent.socials.map((social, index) => {
              const Icon = socialIcons[index % socialIcons.length];
              return (
                <a
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-stone-300 bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-950 transition-colors"
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Navigation Links & Scroll To Top */}
          <div className="footer-nav-wrap flex flex-wrap items-center justify-center gap-6">
            <nav aria-label="Footer navigation" className="flex items-center gap-6">
              {footerContent.navLinks.map((link) => (
                <a
                  key={link.label}
                  className="text-slate-950 text-base font-normal hover:text-red-500 transition-colors"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              aria-label="Scroll to top"
              className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full shadow-[0px_8px_20px_0px_rgba(254,82,42,0.20)] flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              onClick={scrollToTop}
              type="button"
            >
              <ArrowUp aria-hidden="true" className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;