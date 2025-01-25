import Game from "@/components/game/GameSection";
import HeroSection from "@/components/HeroSection";
import LeaderBoard from "@/components/LeaderBoard";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <Game />
      <LeaderBoard />
    </div>
  );
}
