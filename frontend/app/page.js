import Game from "@/components/GameSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <Game />
    </div>
  );
}
