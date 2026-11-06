"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import { howItWorksContent } from "@/data/portfolio";
import { Check } from "lucide-react";
import ScrollImageReveal from "@/components/smoothui/ScrollImageReveal";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to sync scroll position with active stepper item
  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

        if (intersectingEntries.length === 0) return;

        // Pick the entry with the highest intersection ratio so that,
        // when multiple cards overlap the activation zone (common with
        // tall mobile cards), the most relevant card wins.
        intersectingEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const entry = intersectingEntries[0];

        const index = Number(entry.target.getAttribute("data-step-index"));
        if (!isNaN(index)) {
          setActiveStep(index);
        }
      },
      {
        rootMargin: isMobileOrTablet
          ? "-10% 0px -60% 0px"
          : "-25% 0px -45% 0px",
        threshold: isMobileOrTablet ? 0.1 : 0.2,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      aria-labelledby="how-it-works-title"
      className="how-it-works-section w-full py-20 bg-stone-100 text-slate-950"
      id="process"
    >
      <Container>
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <Eyebrow>{howItWorksContent.eyebrow}</Eyebrow>
            <Heading
              className="text-slate-950 text-4xl sm:text-5xl font-bold tracking-wide"
              id="how-it-works-title"
              size="large"
            >
              {howItWorksContent.title}
            </Heading>
          </div>

          {/* Compact Mobile Progress Header */}
          <div
            className="lg:hidden sticky top-24 z-20 bg-stone-100/90 backdrop-blur-sm py-4 px-6"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  {howItWorksContent.eyebrow}
                </span>
                <span className="text-xs font-mono font-bold text-slate-950">
                  {activeStep + 1} / {howItWorksContent.steps.length}
                </span>
              </div>
              <div className="w-full h-1 bg-red-500/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{
                    width: `${
                      (activeStep / (howItWorksContent.steps.length - 1)) * 100
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-950 truncate">
                {howItWorksContent.steps[activeStep]?.title}
              </span>
            </div>
          </div>

          {/* Main Layout: Sticky Left Stepper + Right Scrollable Cards */}
          <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            
            {/* Sticky Left Stepper Navigation (desktop only) */}
            <aside className="hidden lg:flex lg:w-64 shrink-0 lg:sticky lg:top-24 lg:self-start z-10 bg-stone-100/90 backdrop-blur-sm py-2">
              <nav
                aria-label="Process navigation"
                className="flex flex-col gap-4 overflow-visible pb-0 scrollbar-none"
              >
                {howItWorksContent.steps.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <button
                      key={step.id}
                      className={`flex items-center gap-4 text-left transition-all duration-300 shrink-0 cursor-pointer group ${
                        isActive ? "opacity-100 scale-[1.02]" : "opacity-60 hover:opacity-90"
                      }`}
                      onClick={() => handleStepClick(index)}
                      type="button"
                    >
                      {/* Circle Indicator */}
                      <div
                        className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-red-500 border-2 border-red-500 shadow-sm"
                            : "bg-red-500/10 border-2 border-red-500"
                        }`}
                      />

                      {/* Step Number */}
                      <span
                        className={`font-mono text-xs font-medium transition-colors ${
                          isActive ? "text-slate-950 font-bold" : "text-ink"
                        }`}
                      >
                        {step.number}
                      </span>

                      {/* Step Title */}
                      <span
                        className={`text-sm transition-colors whitespace-nowrap ${
                          isActive
                            ? "text-slate-950 font-semibold"
                            : "text-ink font-normal"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Right Side Process Cards Column */}
            <div className="flex-1 w-full flex flex-col gap-24">
              {howItWorksContent.steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="step-card-wrapper scroll-mt-32 transition-all duration-500"
                  data-step-index={index}
                >
                  <div
                    className={`flex flex-col-reverse md:flex-row items-center gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-stone-300 shadow-[0px_4px_16px_0px_rgba(24,35,43,0.03)] ${
                      step.align === "left" ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Graphic Container — wipe-mask scroll reveal (image first on mobile) */}
                    <ScrollImageReveal
                      src={step.imageSrc!}
                      alt={step.imageAlt!}
                      mask="wipe"
                      direction={step.align === "left" ? "left" : "right"}
                      once
                      rounded="rounded-xl"
                      sizes="(max-width: 768px) 320px, 380px"
                      className="w-full md:w-[320px] lg:w-[380px] h-[200px] md:h-[240px] object-cover border border-stone-300 shrink-0 shadow-2xs"
                    />

                    {/* Text Details Box */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Step Badge */}
                      <div className="inline-flex items-center justify-center w-fit px-3 py-1 bg-red-500/10 rounded-full border border-red-500/30">
                        <span className="font-mono text-xs font-medium text-accent-strong">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="text-slate-950 text-2xl sm:text-3xl font-medium tracking-tight">
                        {step.title}
                      </h3>

                      <p className="text-slate-950 text-base leading-relaxed">
                        {step.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {step.tags.map((tag) => (
                          <div
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-xl border border-stone-300 text-muted text-xs font-normal"
                          >
                            <Check className="w-3.5 h-3.5 text-red-500" />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;