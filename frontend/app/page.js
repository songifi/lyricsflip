import Game from "@/components/game/GameSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <Game />
    </div>
  );
}
