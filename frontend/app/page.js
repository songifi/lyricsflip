import Footer from "@/components/Footer";
import Game from "@/components/game/GameSection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowToPlay";
import LeaderBoard from "@/components/LeaderBoard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Game />
      <LeaderBoard />
      <Footer />

    </div>
  );
}