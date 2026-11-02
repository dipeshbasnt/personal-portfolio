
"use client";

import Button from "@/components/atoms/Button";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import Container from "@/components/atoms/Container";
import HeroCharacter from "@/components/sections/hero/HeroCharacter";
import HeroStats from "@/components/sections/hero/HeroStats";
import { characterImage, heroContent } from "@/data/portfolio";

type HeroSectionProps = {
  isLoaded?: boolean;
};

const HeroSection = ({ isLoaded = true }: HeroSectionProps) => {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-stage-shell"
      id="home"
    >
      <div className="hero-artboard-shell">
        <div className="hero-artboard" data-property-1="Variant3">
          <div aria-hidden="true" className="hero-wordmark">
            {heroContent.wordmark}
          </div>

          <HeroCharacter
            alt={heroContent.portraitAlt}
            isLoaded={isLoaded}
            sizes="(max-width: 640px) 90vw, 573px"
            src={characterImage}
          />

          <div className="hero-content-layout">
            <Container className="hero-copy">
              <div className="hero-role">
                <span aria-hidden="true" className="hero-role-line" />
                <Eyebrow className="hero-role-label">
                  {heroContent.role}
                </Eyebrow>
              </div>

              <Heading
                as="h1"
                className="hero-title"
                font="body"
                id="hero-title"
                size="hero"
              >
                {heroContent.titleLines.map((line) => (
                  <span key={line}>
                    {line}{" "}
                    <br className="hero-title-break" />
                  </span>
                ))}
                <span className="hero-title-accent">
                  {heroContent.titleAccent}
                </span>
              </Heading>

              <p className="hero-description">
                {heroContent.description}
              </p>

              <Button className="hero-work-button" href="#work">
                <span>{heroContent.workAction}</span>
                <span aria-hidden="true" className="hero-work-arrow">
                  <svg viewBox="0 0 16 16">
                    <path d="M3 13 13 3M4 3h9v9" />
                  </svg>
                </span>
              </Button>
            </Container>

            <HeroStats />

            <svg
              aria-hidden="true"
              className="hero-star"
              viewBox="0 0 28 28"
            >
              <path d="M14 2v24M2 14h24M5.5 5.5l17 17m0-17-17 17" />
            </svg>

            <a className="focus-ring hero-scroll" href="#about">
              <span>{heroContent.scrollLabel}</span>
              <span
                aria-hidden="true"
                className="hero-scroll-divider"
              />
              <span aria-hidden="true" className="hero-scroll-arrow">
                ↓
              </span>
            </a>
          </div>

          <a
            aria-label={heroContent.talkAction}
            className="focus-ring hero-talk"
            href="#contact"
          >
            <span>{heroContent.talkLineOne}</span>
            <span>{heroContent.talkLineTwo}</span>
            <span aria-hidden="true">→</span>
          </a>

          <svg
            aria-hidden="true"
            className="hero-rays"
            viewBox="0 0 26 26"
          >
            <path
              d="m4 22 5-7M15 11l2-8m7 16-6-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.2"
            />
          </svg>

          <svg
            aria-hidden="true"
            className="hero-connector"
            viewBox="0 0 176 192"
          >
            <path
              d="M50 10C130 50 150 110 80 180"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.4"
            />
          </svg>

          <div aria-hidden="true" className="hero-signature-wrap">
            <p className="hero-signature">{heroContent.signature}</p>
            <svg className="hero-signature-lines" viewBox="0 0 128 36">
              <path
                d="M2 8Q64 2 126 10M12 20Q68 14 116 22"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
