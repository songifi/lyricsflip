
import Footer from "@/components/Footer";
import Game from "@/components/game/GameSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <Game />
      <Footer/>
    </div>
  );
}
