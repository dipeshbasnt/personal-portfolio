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
  const [shouldAnimate, setShouldAnimate] = useState(isLoaded);

  useEffect(() => {
    if (isLoaded) return;

    const fallbackTimer = window.setTimeout(
      () => setShouldAnimate(true),
      500,
    );

    return () => window.clearTimeout(fallbackTimer);
  }, [isLoaded]);

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