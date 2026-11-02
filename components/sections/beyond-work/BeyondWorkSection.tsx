import Image from "next/image";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import { projectsContent } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

const WorkSection = () => (
  <section
    aria-labelledby="work-title"
    className="work-section w-full py-12"
    id="work"
  >
    <Container>
      <div className="work-surface flex flex-col gap-10">
        {/* Header Section */}
        <header className="work-header flex flex-col gap-5">
          <Eyebrow>{projectsContent.eyebrow}</Eyebrow>

          <div className="work-header-row flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="work-header-copy flex-1 max-w-[790px] flex flex-col gap-4">
              <Heading
                className="work-title"
                id="work-title"
                size="large"
              >
                {projectsContent.title}
              </Heading>
              <p className="work-summary text-gray-500 text-base leading-7 w-full max-w-[790px]">
                {projectsContent.summary}
              </p>
            </div>

            <Button
              className="work-cta shrink-0"
              href={projectsContent.viewAllUrl}
              size="small"
            >
              <span>{projectsContent.viewAllLabel}</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </header>

        {/* 3-Column Projects Grid */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsContent.projects.map((project) => (
            <article
              key={project.id}
              className="work-card group flex flex-col gap-5"
            >
              {/* Card Image Container */}
              <div className="work-card-media relative aspect-[410/312] w-full rounded-[20px] overflow-hidden border border-stone-300 shadow-[0px_4px_16px_0px_rgba(24,35,43,0.03)] bg-stone-100">
                <Image
                  alt={project.imageAlt}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={project.imageSrc}
                />
              </div>

              {/* Card Footer Details & Link Button */}
              <div className="work-card-body px-2 flex items-center justify-between gap-3">
                <div className="work-card-info flex-1 flex flex-col gap-1 min-w-0">
                  <h3 className="work-card-title text-gray-900 text-2xl font-bold tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="work-card-description text-gray-900 text-base font-normal line-clamp-2">
                    {project.description}
                  </p>
                  <span className="work-card-tags text-gray-500 text-xs font-semibold tracking-wider uppercase leading-5">
                    {project.tags}
                  </span>
                </div>

                <a
                  aria-label={`View ${project.title} project`}
                  className="work-card-action w-11 h-11 rounded-full border border-stone-300 bg-stone-100 hover:bg-stone-200 flex items-center justify-center shrink-0 transition-colors"
                  href={project.link}
                >
                  <ArrowUpRight
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default WorkSection;