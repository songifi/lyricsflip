import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowToPlay";
import Game from "@/components/game/GameSection";
import LeaderBoard from "@/components/LeaderBoard";
import Footer from "@/components/Footer";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ThemeToggleButton />
        <HowItWorks />
        <Game />
        <LeaderBoard />
      </main>
      <Footer />
    </div>
  );
}

