"use client";

import { useEffect, useRef } from "react";
import { metricsVendoContent } from "@/data/portfolio";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Briefcase, Code2, Layers } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

interface MetricsVendoProps {
  className?: string;
}

const Counter = ({ value, suffix = "", decimals = 0 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 30, stiffness: 100 });
  const display = useTransform(spring, (current) =>
    current.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const MetricsVendo = ({ className = "" }: MetricsVendoProps) => {
  const [col1, col2, col3] = metricsVendoContent.stats;
  const iconClassName = "h-6 w-6";

  return (
    <section className={`w-full bg-white ${className}`}>
      <div className="w-full bg-white py-[90px] px-6 md:px-12">
        <motion.div
          className="w-full max-w-[1340px] mx-auto bg-white rounded-[32px] border border-black/[0.06] flex flex-col md:flex-row items-stretch overflow-hidden group/bar"
          id="metrics-bar"
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Column 1 — Completed projects */}
          <div className="flex-1 flex flex-col items-center text-center p-10 md:py-16 group hover:bg-gray-50/40 transition-colors duration-300 border-b md:border-b-0 md:border-r border-gray-100">
            <div
              aria-hidden="true"
              className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ea] text-[#111110] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none"
            >
              <Briefcase aria-hidden="true" className={iconClassName} strokeWidth={1.8} />
            </div>

            <h2 className="text-[44px] font-medium text-[#111110] leading-none mb-3.5 font-sans tracking-tight">
              <Counter decimals={col1.decimals} suffix={col1.suffix} value={col1.value} />
            </h2>

            <p className={`text-[17px] leading-[1.6] ${col1.maxWidth} text-gray-400 font-sans`}>
              {col1.caption.line1}
              <br />
              {col1.caption.preHighlight}
              <span className="font-semibold text-[#111110]">
                {col1.caption.highlight}
              </span>
            </p>
          </div>

          {/* Column 2 — Years learning and building */}
          <div className="flex-1 flex flex-col items-center text-center p-10 md:py-16 group hover:bg-gray-50/40 transition-colors duration-300 border-b md:border-b-0 md:border-r border-gray-100">
            <div
              aria-hidden="true"
              className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ea] text-[#111110] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none"
            >
              <Code2 aria-hidden="true" className={iconClassName} strokeWidth={1.8} />
            </div>

            <h2 className="text-[44px] font-medium text-[#111110] leading-none mb-3.5 font-sans tracking-tight">
              <Counter decimals={col2.decimals} suffix={col2.suffix} value={col2.value} />
            </h2>

            <p className={`text-[17px] leading-[1.6] ${col2.maxWidth} text-gray-400 font-sans`}>
              {col2.caption.line1}
              <br />
              {col2.caption.preHighlight}
              <span className="font-semibold text-[#111110]">
                {col2.caption.highlight}
              </span>
            </p>
          </div>

          {/* Column 3 — Technologies and tools */}
          <div className="flex-1 flex flex-col items-center text-center p-10 md:py-16 group hover:bg-gray-50/40 transition-colors duration-300">
            <div
              aria-hidden="true"
              className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f2ea] text-[#111110] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none"
            >
              <Layers aria-hidden="true" className={iconClassName} strokeWidth={1.8} />
            </div>

            <h2 className="text-[44px] font-medium text-[#111110] leading-none mb-3.5 font-sans tracking-tight">
              <Counter decimals={col3.decimals} suffix={col3.suffix} value={col3.value} />
            </h2>

            <p className={`text-[17px] leading-[1.6] ${col3.maxWidth} font-sans`}>
              {col3.caption.line1}
              <br />
              {col3.caption.preHighlight}
              <span className="font-semibold text-[#111110]">
                {col3.caption.highlight}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsVendo;