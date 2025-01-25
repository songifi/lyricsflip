import { GoDotFill } from "react-icons/go";
import { FaMusic } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="" style={{backgroundImage: "url('/img/hero-background.svg')", backgroundRepeat: 'no-repeat', height: '100vh'}}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-24 lg:px-8 lg:py-40 relative">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto relative z-[1]">
          <h1 className="mt-10 text-4xl font-semibold tracking-tight text-pretty text-[#490878] sm:text-7x">
            Sing <FaMusic className="inline text-2xl" /> Guess{" "}
            <FaMusic className="inline text-2xl" /> Earn
          </h1>
          <p className="mt-4 md:mt-8 text-lg pt-4 md:pt-8 font-medium text-black-500 lg:text-white sm:text-2xl/8">
          Test your lyrical knowledge, flip the cards, and guess the song!
          Discover your favorite genres, wager tokens, and compete for the top spot. Let the music challenge begin!
          </p>
        </div>
        <div className="absolute top-32 left-[50%] -translate-x-[50%] lg:relative lg:top-0 lg:left-0 lg:translate-x-0 mt-14 sm:mt-24 lg:mt-20 lg:shrink-0 lg:grow">
          <FaMusic className="text-[300px] md:text-[350px] text-[#70E3C7] animate-customBounce " />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
