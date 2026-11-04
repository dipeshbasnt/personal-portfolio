"use client";

import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import FeatureCarousel, {
  SectionFeatureItem,
} from "@/components/ui/Featuredcard";
import { journeyContent } from "@/data/portfolio";
import {
  Code,
  Coffee,
  Compass,
  Cpu,
  GraduationCap,
  Layers,
  Lightbulb,
  Music,
  PenTool,
  Plane,
  type LucideIcon,
} from "lucide-react";

const { services, journey, education, beyondWork } = journeyContent;

// Icons by id / type.
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "ui-ux-design": PenTool,
  "frontend-development": Code,
  "problem-solving": Lightbulb,
};

const INTEREST_ICONS: Record<string, LucideIcon> = {
  tech: Cpu,
  music: Music,
  travel: Plane,
  coffee: Coffee,
};

const sectionItems: SectionFeatureItem[] = [
  {
    id: "what-i-bring",
    label: "What I Bring",
    icon: Layers,
    category: "Core Skills",
    cards: services.items.map((item) => ({
      id: item.id,
      title: item.title,
      skills: item.skills,
      icon: SERVICE_ICONS[item.id] ?? Layers,
    })),
  },
  {
    id: "my-journey",
    label: "My Journey",
    icon: Compass,
    category: "Background",
    quote: true,
    description: journey.body,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    category: "Academics",
    headline: education.degree,
    status: education.status.replace(/[()]/g, ""),
  },
  {
    id: "beyond-work",
    label: "Beyond Work",
    icon: Coffee,
    category: "Interests",
    description: beyondWork.body,
    tags: beyondWork.interests.map((interest) => ({
      id: interest.type,
      label: interest.label,
      icon: INTEREST_ICONS[interest.type] ?? Compass,
    })),
  },
];

const JourneySection = () => {
  return (
    <section
      aria-labelledby="journey-title"
      className="journey-section w-full bg-stone-100/60 py-16 text-slate-950 sm:py-20"
      id="journey"
    >
      <Container>
        <div className="flex flex-col gap-8">
          <header className="flex max-w-4xl flex-col items-start gap-3 sm:gap-4">
            <Eyebrow>{journey.eyebrow}</Eyebrow>
            <Heading
              id="journey-title"
              className="max-w-3xl"
              size="medium"
            >
              {journey.title}
            </Heading>
          </header>

          <FeatureCarousel features={sectionItems} />
        </div>
      </Container>
    </section>
  );
};

export default JourneySection;