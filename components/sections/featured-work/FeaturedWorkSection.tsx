import Image from "next/image";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import { featuredWorkContent } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

const FeaturedWorkSection = () => (
  <section
    aria-labelledby="featured-work-title"
    className="featured-work-section"
    id="work"
  >
    <Container>
      <div className="featured-work-surface flex flex-col gap-10">
        {/* Header Section */}
        <div className="featured-work-header-wrap flex flex-col gap-5">
          <Eyebrow>{featuredWorkContent.eyebrow}</Eyebrow>

          <div className="featured-work-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="featured-work-copy flex-1 max-w-[770px] flex flex-col gap-5">
              <Heading
                className="featured-work-title section-title"
                id="featured-work-title"
                size="large"
              >
                {featuredWorkContent.title}
              </Heading>
              
              {/* FIXED LINE: Spans naturally across width without squeezing or adding left border */}
              <p className="featured-work-summary w-full">
                {featuredWorkContent.summary}
              </p>
            </div>

            {/* UNTOUCHED: Original Button structure maintained */}
            <Button
              className="featured-work-cta shrink-0"
              href={featuredWorkContent.ctaUrl}
              size="small"
            >
              <span>{featuredWorkContent.ctaLabel}</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Featured Project Showcase Card */}
        <div className="featured-work-card bg-stone-100 rounded-[24px] p-6 sm:p-10 border border-stone-300 flex flex-col gap-10">
          {/* Media Container */}
          <div className="featured-work-media relative aspect-[1150/599] w-full rounded-[20px] overflow-hidden border border-stone-300 shadow-[0px_4px_16px_0px_rgba(24,35,43,0.03)]">
            <Image
              alt={featuredWorkContent.project.imageAlt}
              className="object-cover object-top"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              src={featuredWorkContent.project.imageSrc}
            />
          </div>

          {/* Details & Accent Footer */}
          <div className="featured-work-details flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="featured-work-meta w-full md:w-72 flex flex-col gap-2 shrink-0">
              <h3 className="featured-project-title text-gray-900">
                {featuredWorkContent.project.title}
              </h3>
              <span className="featured-project-tags text-gray-500 text-xs font-semibold tracking-wider uppercase">
                {featuredWorkContent.project.tags}
              </span>
            </div>

            <div className="featured-work-body flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <p className="type-body featured-project-description text-gray-500">
                {featuredWorkContent.project.description}
              </p>

              <div className="featured-work-badge font-script text-red-500 text-2xl -rotate-[7deg] leading-tight shrink-0">
                Design<br />Build<br />Create
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default FeaturedWorkSection;