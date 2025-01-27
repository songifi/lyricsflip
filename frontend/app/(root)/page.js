
import Footer from "@/components/Footer";
import Game from "@/components/game/GameSection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowToPlay";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <HowItWorks />
      <Game />
      <Footer/>
    </div>
  );
}
