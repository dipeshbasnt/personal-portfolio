import AboutSection from "@/components/sections/about/AboutSection";
import WorkSection from "@/components/sections/beyond-work/BeyondWorkSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import FeaturedWorkSection from "@/components/sections/featured-work/FeaturedWorkSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import { Contact } from "lucide-react";

const Home = () => (
  <main>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <FeaturedWorkSection />
    <WorkSection />
    <ContactSection />
  </main>
);

export default Home;
