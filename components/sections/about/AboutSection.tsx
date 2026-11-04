import Button from "@/components/atoms/Button";
import ScrollImageReveal from "@/components/smoothui/ScrollImageReveal";
import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import Heading from "@/components/atoms/Heading";
import { aboutContent } from "@/data/portfolio";
import { MapPin } from "lucide-react";

// delete the whole `pillarIcons` constant

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
                  className="about-title section-title"
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
                  <ScrollImageReveal
                    alt={aboutContent.portraitAlt}
                    src={aboutContent.portraitImage}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    mask="circle"
                    direction="left"
                    className="w-full h-full"
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

        </div>
      </div>
    </Container>
  </section>
);

export default AboutSection;