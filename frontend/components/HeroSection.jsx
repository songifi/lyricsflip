import { GoDotFill } from "react-icons/go";
import { FaMusic } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="" style={{backgroundImage: "url('/img/hero-background.svg')", backgroundRepeat: 'no-repeat'}}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-24 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-[#490878] sm:text-7xl">
            Sing <FaMusic className="inline text-2xl" /> Guess{" "}
            <FaMusic className="inline text-2xl" /> Earn
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
          Test your lyrical knowledge, flip the cards, and guess the song!
          Discover your favorite genres, wager tokens, and compete for the top spot. Let the music challenge begin!
          </p>
        </div>
        <div className="mt-14 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
          <FaMusic className="text-[350px] text-[#70E3C7]" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
