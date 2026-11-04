"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { testimonialsContent } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export interface TestimonialCarouselProps {
  className?: string;
}

const TestimonialCarousel = ({ className }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = testimonialsContent.items;

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);

  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: FaGithub, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: FaTwitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: FaYoutube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: FaLinkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ].filter((item) => Boolean(item.url));

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop Layout */}
      <div className="hidden md:flex relative items-center">
        {/* Featured Avatar Image */}
        <div className="w-[440px] h-[440px] rounded-3xl overflow-hidden bg-stone-200 dark:bg-neutral-800 shrink-0 border border-stone-300 dark:border-stone-800 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              animate={{ opacity: 1 }}
              className="w-full h-full relative"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Image
                fill
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
                draggable={false}
                sizes="440px"
                src={currentTestimonial.imageUrl}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Card Overlay */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 lg:p-10 -ml-20 z-10 max-w-xl flex-1 border border-stone-200 dark:border-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.name}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {currentTestimonial.title}
                </p>
              </div>

              <p className="text-slate-700 dark:text-stone-300 text-base leading-relaxed mb-8">
                &ldquo;{currentTestimonial.description}&rdquo;
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    aria-label={label}
                    className="w-10 h-10 bg-slate-950 dark:bg-stone-100 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                    href={url || "#"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconComponent className="w-4 h-4 text-white dark:text-slate-950" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden max-w-sm mx-auto text-center bg-transparent">
        <div className="w-full aspect-square bg-stone-200 dark:bg-stone-800 rounded-3xl overflow-hidden mb-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.imageUrl}
              animate={{ opacity: 1 }}
              className="w-full h-full relative"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Image
                fill
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
                draggable={false}
                sizes="(max-width: 768px) 100vw, 400px"
                src={currentTestimonial.imageUrl}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.name}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-1">
                {currentTestimonial.name}
              </h3>

              <p className="text-sm font-medium text-red-500 dark:text-red-400 mb-4">
                {currentTestimonial.title}
              </p>

              <p className="text-slate-700 dark:text-stone-300 text-sm leading-relaxed mb-6">
                &ldquo;{currentTestimonial.description}&rdquo;
              </p>

              <div className="flex justify-center space-x-3">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    aria-label={label}
                    className="w-10 h-10 bg-slate-950 dark:bg-stone-100 rounded-full flex items-center justify-center transition-colors hover:bg-slate-800 cursor-pointer"
                    href={url || "#"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconComponent className="w-4 h-4 text-white dark:text-slate-950" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          aria-label="Previous testimonial"
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-800 shadow-md flex items-center justify-center hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          onClick={handlePrevious}
          type="button"
        >
          <ChevronLeft className="w-6 h-6 text-slate-950 dark:text-stone-100" />
        </button>

        {/* Indicator Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to testimonial ${index + 1}`}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                index === currentIndex
                  ? "bg-slate-950 dark:bg-white"
                  : "bg-stone-300 dark:bg-stone-700"
              )}
              onClick={() => setCurrentIndex(index)}
              type="button"
            />
          ))}
        </div>

        <button
          aria-label="Next testimonial"
          className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-800 shadow-md flex items-center justify-center hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight className="w-6 h-6 text-slate-950 dark:text-stone-100" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;