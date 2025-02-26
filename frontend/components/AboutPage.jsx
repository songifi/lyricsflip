import FeatureCards from "./about-us/FeatureCards";
import HeroSection from "./about-us/HeroSection";
import JoinSection from "./about-us/JoinSection";
import StatsSection from "./about-us/StatsSection";
import VisionSection from "./about-us/VisionSection";
import Footer from "./Footer";
import Header from "./Header";


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