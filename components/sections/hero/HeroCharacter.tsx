"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroCharacterProps = {
  alt: string;
  isLoaded?: boolean;
  sizes: string;
  src: string;
};

const HeroCharacter = ({
  alt,
  isLoaded = true,
  sizes,
  src,
}: HeroCharacterProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const animationTimer = window.setTimeout(
      () => setShouldAnimate(true),
      60,
    );

    return () => window.clearTimeout(animationTimer);
  }, [isLoaded]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(
      () => setShouldAnimate(true),
      2200,
    );

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="hero-portrait">
      <Image
        alt={alt}
        className={cn(
          "hero-image h-full w-full object-contain object-bottom",
          shouldAnimate && "animate-image-expand",
        )}
        fill
        priority
        sizes={sizes}
        src={src}
      />
    </div>
  );
};

export default HeroCharacter;