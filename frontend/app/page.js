import Footer from "@/components/Footer";
// import Game from "@/components/game/GameSection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowToPlay";
import LeaderBoard from "@/components/LeaderBoard";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <HowItWorks />
      {/* <Game /> */}
      <LeaderBoard />
      <Footer />
    </div>
  );
}
