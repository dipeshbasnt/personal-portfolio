import AboutSection from "@/components/sections/about/AboutSection";
import WorkSection from "@/components/sections/beyond-work/BeyondWorkSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import FeaturedWorkSection from "@/components/sections/featured-work/FeaturedWorkSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import JourneySection from "@/components/sections/journey/JourneySection";
import ProcessSection from "@/components/sections/process/ProcessSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import MetricsVendo from "@/components/sections/stats/MetricsVendo";
const Home = () => (
  <main>
    <HeroSection />
    <AboutSection />

    <FeaturedWorkSection />
    <ServicesSection />
    <WorkSection />
    <ProcessSection />
    <JourneySection />
    <MetricsVendo />
    <ContactSection />
    
  </main>
);

export default Home;
