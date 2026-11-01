import Image from "next/image";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import { aboutContent, aboutPillars } from "@/data/portfolio";
import {
  Briefcase,
  Check,
  Code2,
  Compass,
  GraduationCap,
  Layout,
  MapPin,
  Sparkles,
} from "lucide-react";

const pillarIcons = {
  layout: Layout,
  code: Code2,
  compass: Compass,
} as const;

const AboutSection = () => (
  <section aria-labelledby="about-title" className="about-section" id="about">
    <Container>
      <div className="about-surface">
        <div className="about-content">
          <div className="about-intro-grid">
            <div className="about-copy-column">
              <header className="about-header">
                <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
                <Heading
                  className="about-title"
                  id="about-title"
                  size="large"
                >
                  {aboutContent.titleLead}{" "}
                  <span>{aboutContent.titleAccent}</span>
                </Heading>
              </header>

              <p className="about-summary type-lead">
                {aboutContent.summary.split(/(human-centered)/).map((part, index) =>
                  part === "human-centered" ? (
                    <span className="about-summary-phrase" key={index}>
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </p>

              <div className="about-biography">
                <div className="about-biography-copy type-body">
                  {aboutContent.biography.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <ul aria-label="Career highlights" className="about-highlights">
                  {aboutContent.highlights.map((highlight) => (
                    <li className="about-highlight" key={highlight.value}>
                      <span className="about-highlight-value">
                        {highlight.value}
                      </span>
                      <span className="about-highlight-label">
                        {highlight.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="about-signoff">
                  <span className="about-signature">
                    {aboutContent.signature}
                  </span>
                  <Button
                    className="about-availability-button"
                    href="#contact"
                    size="small"
                  >
                    <span>{aboutContent.availabilityLabel}</span>
                    <span aria-hidden="true" className="about-status-dot" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="about-portrait-column">
              <div className="about-portrait-card">
                <div className="about-portrait-placeholder">
                  <Image
                    alt={aboutContent.portraitAlt}
                    className="about-portrait-image"
                    fill
                    priority={false}
                    sizes="(max-width: 1023px) 90vw, 35vw"
                    src={aboutContent.portraitImage}
                  />
                </div>
                <div className="about-location-badge">
                  <MapPin aria-hidden="true" className="about-icon" />
                  <span>{aboutContent.location}</span>
                </div>
                <div className="about-portrait-caption">
                  <span className="type-caption">
                    {aboutContent.portraitCaption}
                  </span>
                  <span>{aboutContent.portraitNote}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-pillars">
            {aboutPillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon];

              return (
                <article className="about-pillar-card" key={pillar.title}>
                  <div className="about-pillar-main">
                    <div className="about-pillar-meta">
                      <span className="about-pillar-icon">
                        <Icon aria-hidden="true" className="about-icon" />
                      </span>
                      <span className="about-pillar-step">{pillar.step}</span>
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                  <div
                    aria-label={`${pillar.title} skills`}
                    className="about-pillar-skills"
                    role="group"
                  >
                    {pillar.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="about-details-grid">
            <section
              aria-labelledby="about-journey-title"
              className="about-detail-card"
            >
              <div className="about-detail-content">
                <div className="about-detail-header">
                  <div className="about-detail-title-wrap">
                    <span className="about-detail-icon">
                      <Briefcase aria-hidden="true" className="about-icon" />
                    </span>
                    <h3 id="about-journey-title">My Journey</h3>
                  </div>
                  <span className="about-detail-meta">Timeline</span>
                </div>

                <ol className="about-timeline">
                  {aboutContent.journey.map((item) => (
                    <li className="about-timeline-item" key={item.title}>
                      <div className="about-timeline-heading">
                        <h4>{item.title}</h4>
                        <span>{item.period}</span>
                      </div>
                      <p className="about-timeline-organization">
                        {item.organization}
                      </p>
                      <p className="about-timeline-description">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="about-journey-footer">
                <span>Continuous learning &amp; growth</span>
                <span>
                  <GraduationCap aria-hidden="true" className="about-icon" />
                  Degree Verified
                </span>
              </div>
            </section>

            <section
              aria-labelledby="about-skills-title"
              className="about-detail-card"
            >
              <div className="about-detail-content">
                <div className="about-detail-header">
                  <div className="about-detail-title-wrap">
                    <span className="about-detail-icon">
                      <Sparkles aria-hidden="true" className="about-icon" />
                    </span>
                    <h3 id="about-skills-title">Skills &amp; Focus</h3>
                  </div>
                  <span className="about-detail-meta">Toolkit</span>
                </div>

                <div className="about-skill-group">
                  <h4>Core Technologies &amp; Design Tools</h4>
                  <div className="about-skill-chips">
                    {aboutContent.technologies.map((technology) => (
                      <span key={technology}>
                        <Check aria-hidden="true" className="about-icon" />
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="about-skill-group">
                  <h4>Areas of Interest &amp; Exploration</h4>
                  <div className="about-interest-chips">
                    {aboutContent.interests.map((interest) => (
                      <span key={interest}>
                        <span aria-hidden="true" />
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="about-callout">
                <p>&ldquo;{aboutContent.closingQuote}&rdquo;</p>
                <span>Dipesh</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default AboutSection;