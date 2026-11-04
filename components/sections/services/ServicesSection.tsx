import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import Eyebrow from "@/components/atoms/Eyebrow";
import { services } from "@/data/portfolio";
import ScrollImageReveal from "@/components/smoothui/ScrollImageReveal";

const ServicesSection = () => (
  <section
    aria-labelledby="services-title"
    className="services-section"
    id="services"
  >
    <Container>
      <header className="services-heading-row">
        <div className="services-heading-label">
          <span aria-hidden="true" className="services-heading-mark" />
          <div className="services-heading-copy">
            <Eyebrow>Services</Eyebrow>
            <h2 className="services-section-title section-title" id="services-title">
              What I design and build
            </h2>
          </div>
        </div>
        <span className="services-count">{services.length} core services</span>
      </header>

      <div className="services-layout">
        <div className="services-intro">
          <h3 className="services-display-title">
            <span>Design.</span>
            <span>Build.</span>
            <span className="services-title-accent">Refine.</span>
          </h3>
          <p className="services-intro-copy">
            From brand foundations and user experiences to production-ready
            React interfaces, I design and build digital products with clarity
            and purpose.
          </p>
          <ul aria-label="What you can expect" className="services-benefits">
            <li><Plus aria-hidden="true" className="services-plus-icon" />Thoughtful design systems</li>
            <li><Plus aria-hidden="true" className="services-plus-icon" />Responsive, reusable interfaces</li>
          </ul>
          <Button className="services-cta" href="#contact" variant="primary">
            <span>Start a Project</span>
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>

        <ul aria-label="Services offered" className="services-list">
          {services.map((service, index) => (
            <li key={service.title}>
              <article className="service-card">







                  <div className="service-card-image-wrap">
                  <ScrollImageReveal
                    mask="wipe"
                    direction="right"
                    once={true}
                    delay={index * 0.2}
                    className="w-full h-full"
                  >
                    <Image
                      alt={service.imageAlt}
                      className="service-card-image"
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 900px) 80vw, 40vw"
                      src={service.image}
                    />
                  </ScrollImageReveal>
                </div>
                <div className="service-card-content">
                  <div className="service-card-meta">
                    <span>{service.category}</span>
                    <span>0{index + 1} / 0{services.length}</span>
                  </div>












                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div aria-hidden="true" className="service-card-markers">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);

export default ServicesSection