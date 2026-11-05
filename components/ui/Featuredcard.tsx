"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ----------------------------- Types ----------------------------- */

export type FeatureCardItem = {
  id: string;
  title: string;
  /** Skills separated by "·", e.g. "Research · Wireframes · Prototypes" */
  skills: string;
  icon: LucideIcon;
};

export type FeatureTagItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type SectionFeatureItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  category: string;
  /** Card-style section: every card becomes its own slide in the stack */
  cards?: FeatureCardItem[];
  /** Statement-style section (everything below is optional) */
  headline?: string;
  description?: string;
  status?: string;
  quote?: boolean;
  tags?: FeatureTagItem[];
};

type Slide = {
  key: string;
  sectionIndex: number;
  localIndex: number;
  section: SectionFeatureItem;
  card?: FeatureCardItem;
};

/* ---------------------------- Constants --------------------------- */

const AUTO_PLAY_INTERVAL = 4500; // ms per slide
const pad = (n: number) => String(n).padStart(2, "0");

/* --------------------------- Component ---------------------------- */

export function FeatureCarousel({ features }: { features: SectionFeatureItem[] }) {
  const reduceMotion = useReducedMotion();

  // A section with cards contributes one slide per card; any other section
  // contributes a single statement slide.
  const slides = useMemo<Slide[]>(
    () =>
      features.flatMap((section, sectionIndex): Slide[] =>
        section.cards?.length
          ? section.cards.map((card, localIndex) => ({
              key: `${section.id}-${card.id}`,
              sectionIndex,
              localIndex,
              section,
              card,
            }))
          : [{ key: section.id, sectionIndex, localIndex: 0, section }]
      ),
    [features]
  );

  const slideCountBySection = useMemo(
    () => features.map((_, i) => slides.filter((s) => s.sectionIndex === i).length),
    [features, slides]
  );
  const firstSlideOfSection = useMemo(
    () => features.map((_, i) => slides.findIndex((s) => s.sectionIndex === i)),
    [features, slides]
  );

  const [step, setStep] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);
  const paused = hoverPaused || focusPaused || userPaused;

  const slideCount = slides.length;
  const autoplay = !reduceMotion && slideCount > 1;
  const currentIndex = ((step % slideCount) + slideCount) % slideCount;
  const current = slides[currentIndex];

  useEffect(() => {
    if (!autoplay || paused) return;

    startedAtRef.current = Date.now();
    const timer = window.setInterval(() => {
      const startedAt = startedAtRef.current;
      if (startedAt === null) return;

      const elapsed = elapsedRef.current + Date.now() - startedAt;
      if (elapsed >= AUTO_PLAY_INTERVAL) {
        elapsedRef.current = 0;
        startedAtRef.current = null;
        setProgress(0);
        setStep((currentStep) => currentStep + 1);
        return;
      }

      setProgress(elapsed / AUTO_PLAY_INTERVAL);
    }, 50);

    return () => {
      if (startedAtRef.current !== null) {
        elapsedRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      window.clearInterval(timer);
    };
  }, [autoplay, paused, step]);

  if (slides.length === 0) return null;

  const resetTimer = () => {
    elapsedRef.current = 0;
    startedAtRef.current = null;
    setProgress(0);
  };

  const handlePrevious = () => {
    resetTimer();
    setStep((currentStep) => currentStep - 1);
  };

  const handleNext = () => {
    resetTimer();
    setStep((currentStep) => currentStep + 1);
  };

  const handleSelect = (sectionIndex: number) => {
    if (sectionIndex === current.sectionIndex) return;
    const target = firstSlideOfSection[sectionIndex];
    const diff = (target - currentIndex + slideCount) % slideCount;
    if (diff > 0) {
      resetTimer();
      setStep((currentStep) => currentStep + diff);
    }
  };

  const getStatus = (index: number) => {
    let d = index - currentIndex;
    if (d > slideCount / 2) d -= slideCount;
    if (d < -slideCount / 2) d += slideCount;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="mx-auto w-full max-w-7xl"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocusCapture={() => setFocusPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocusPaused(false);
          }
        }}
      >
        <div className="grid overflow-hidden lg:min-h-[560px] lg:grid-cols-[5fr_6fr]">
          {/* ------------------ Left: index ------------------ */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
            <ul className="flex flex-col">
              {features.map((feature, index) => {
                const isActive = index === current.sectionIndex;
                const total = slideCountBySection[index];
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.id}
                    className="border-t border-slate-900/10 first:border-t-0"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(index)}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex w-full items-start gap-5 rounded-lg py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      <span
                        className={cn(
                          "pt-2 font-mono text-xs tabular-nums transition-colors duration-300",
                          isActive ? "text-red-500" : "text-slate-400"
                        )}
                      >
                        {pad(index + 1)}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-4">
                          <span
                            className={cn(
                              "text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl",
                              isActive
                                ? "text-slate-900"
                                : "text-slate-400 group-hover:text-slate-700"
                            )}
                          >
                            {feature.label}
                          </span>
                          <Icon
                            size={20}
                            strokeWidth={1.75}
                            className={cn(
                              "shrink-0 transition-[color,transform] duration-500 motion-reduce:transition-none",
                              feature.id === "my-journey" &&
                                "group-hover:rotate-45 group-hover:scale-110 group-focus-visible:rotate-45 group-focus-visible:scale-110",
                              isActive
                                ? "text-red-500"
                                : "text-slate-300 group-hover:text-slate-500"
                            )}
                          />
                        </span>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="block overflow-hidden"
                            >
                              <span className="mt-1.5 block text-sm text-slate-500">
                                {feature.category}
                              </span>

                              {/* progress: one segment per slide in this section */}
                              <span aria-hidden className="mt-4 flex max-w-xs gap-1.5">
                                {Array.from({ length: total }).map((_, i) => {
                                  const done = i < current.localIndex;
                                  const live = i === current.localIndex;
                                  return (
                                    <span
                                      key={i}
                                      className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-slate-900/10"
                                    >
                                      {done && (
                                        <span className="absolute inset-0 bg-red-500" />
                                      )}
                                      {live && (
                                        <span
                                          className="absolute inset-y-0 left-0 origin-left bg-red-500"
                                          style={{
                                            transform: `scaleX(${autoplay ? progress : 1})`,
                                          }}
                                        />
                                      )}
                                    </span>
                                  );
                                })}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ------------------ Right: stage ------------------ */}
          <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden px-4 py-16 sm:min-h-[520px] sm:px-6 lg:min-h-0 lg:py-16">
            <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-6 pt-5 sm:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-label={`Slide ${currentIndex + 1} of ${slideCount}`}
                  className="font-mono text-xs tabular-nums text-slate-700"
                >
                  {pad(currentIndex + 1)} / {pad(slideCount)}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  {autoplay ? (paused ? "Paused" : "Auto play") : "Manual"}
                </span>
              </div>
              <div aria-label="Carousel controls" className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevious}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/20 text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <ChevronLeft aria-hidden="true" size={17} />
                </button>
                {autoplay && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/20 text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  {userPaused ? <Play size={14} /> : <Pause size={14} />}
                </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/20 text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <ChevronRight aria-hidden="true" size={17} />
                </button>
              </div>
            </div>

            <div className="relative aspect-[4/5] w-full max-w-[340px]">
              {slides.map((slide, index) => {
                const status = getStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={slide.key}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      x: isPrev ? -96 : isNext ? 96 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.86 : 0.74,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                      rotate: isPrev ? -4 : isNext ? 4 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.8 }}
                    className="absolute inset-0 origin-center overflow-hidden rounded-[1.75rem] bg-[#F7F3EC] border border-stone-200/50 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                  >
                    {slide.card ? (
                      <ServiceFace
                        slide={slide}
                        total={slideCountBySection[slide.sectionIndex]}
                        isActive={isActive}
                      />
                    ) : (
                      <StatementFace slide={slide} isActive={isActive} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live region announcing the active carousel slide */}
        <span aria-live="polite" aria-atomic="true" className="sr-only">
          {`Slide ${pad(currentIndex + 1)} of ${pad(slideCount)}. ${current?.section.label ?? ""}`}
        </span>
      </div>
    </MotionConfig>
  );
}

/* --------------------------- Card faces --------------------------- */

function ServiceFace({
  slide,
  total,
  isActive,
}: {
  slide: Slide;
  total: number;
  isActive: boolean;
}) {
  const card = slide.card!;
  const Icon = card.icon;
  const skills = card.skills
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="relative flex h-full flex-col justify-between p-6 text-slate-900 sm:p-7">
      <Icon
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 text-slate-900/[0.05] sm:h-40 sm:w-40 lg:h-48 lg:w-48"
      />

      <div className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white">
          <Icon size={22} strokeWidth={2} />
        </span>
        <span className="font-mono text-xs tabular-nums text-slate-400">
          {pad(slide.localIndex + 1)} / {pad(total)}
        </span>
      </div>

      <div className="relative">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {slide.section.category}
        </p>
        <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
          {card.title}
        </h3>
        <ul className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: isActive ? 0.12 + i * 0.06 : 0 }}
              className="rounded-full border border-slate-900/15 px-3 py-1 text-sm text-slate-700"
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatementFace({ slide, isActive }: { slide: Slide; isActive: boolean }) {
  const { section } = slide;
  const Icon = section.icon;

  return (
    <div className="relative flex h-full flex-col justify-between p-6 text-slate-900 sm:p-7">
      <Icon
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 text-slate-900/[0.05] sm:h-40 sm:w-40 lg:h-48 lg:w-48"
      />

      <div className="relative flex items-start justify-between">
        <span className="rounded-full border border-slate-900/15 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
          {section.category}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white">
          <Icon size={22} strokeWidth={2} />
        </span>
      </div>

      <div className="relative flex flex-col gap-5">
        {section.quote && (
          <span
            aria-hidden
            className="h-8 font-serif text-7xl leading-[0.9] text-red-500"
          >
            “
          </span>
        )}

        {section.headline && (
          <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
            {section.headline}
          </h3>
        )}

        {section.status && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-3.5 py-1.5 text-sm text-white">
            <span className="relative flex h-2 w-2">
              {isActive && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            {section.status}
          </span>
        )}

        {section.description && (
          <p
            className={cn(
              "leading-snug",
              section.quote
                ? "text-lg leading-relaxed tracking-tight text-slate-900 sm:text-xl"
                : "text-base text-slate-700"
            )}
          >
            {section.description}
          </p>
        )}

        {section.tags && (
          <ul className="grid grid-cols-2 gap-2">
            {section.tags.map((tag, i) => {
              const TagIcon = tag.icon;
              return (
                <motion.li
                  key={tag.id}
                  initial={false}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: isActive ? 0.12 + i * 0.06 : 0 }}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-900/10 bg-white/60 px-3 py-2.5 text-sm font-medium"
                >
                  <TagIcon size={16} className="text-red-500" />
                  {tag.label}
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FeatureCarousel;