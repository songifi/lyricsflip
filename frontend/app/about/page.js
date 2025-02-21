import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/about-us/HeroSection";
import FeatureCards from "@/components/about-us/FeatureCards";
import VisionSection from "@/components/about-us/VisionSection";
import JoinSection from "@/components/about-us/JoinSection";
import StatsSection from "@/components/about-us/StatsSection";


export default function AboutPage() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <FeatureCards />
      <VisionSection />
      <JoinSection />
      <StatsSection />
      <Footer />
    </div>
  );
}