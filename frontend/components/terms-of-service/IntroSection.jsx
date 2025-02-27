import { Description } from "@headlessui/react";
import React from "react";

export default function IntroSection() {
  const definitions = [
    {
      title: "LyricsFlip",
      Description: "'we', 'us', and 'our' refer to the operators of LyricFlip",
    },
    {
      title: "User",
      Description:
        "'you', and 'your' refer to any individual or entity using our Services",
    },
    {
      title: "Content",
      Description:
        "refers to lyrics, song titles, artist names, and other music-related information displayed in the game.",
    },
    {
      title: "NFT",
      Description:
        "refers to non-fungible tokens issued on the Starknet blockchain.",
    },
    {
      title: "Tokens",
      Description:
        " refers to digital assets used for wagering within the game.",
    },
    {
      title: "Starknet",
      Description:
        "refers to the layer 2 blockchain network on which LyricFlip operates.",
    },
  ];

  return (
    <div className='px-10 bg-gradient-to-r from-primary-main to-[#70E3C7] text-white  py-10'>
      {/* onboarding  */}
      <div className='  py-10'>
        <p className='mb-5 text-[30px]'>Last Updated: February 27, 2025</p>
        <p className='text-[20px]'>
          Welcome to LyricFlip, an on-chain card-based music guessing game built
          on the Starknet ecosystem. <br />
          These Terms of Service ("Terms") govern your access to and use of the
          LyricFlip platform, services, and website (collectively, the
          "Services"). <br />
          By accessing or using our Services, you agree to be bound by these
          Terms. If you do not agree to these Terms, you may not access or use
          the Services.
        </p>
      </div>

      {/* definitions  */}
      <div>
        <h1 className='text-4xl text-white mb-4 font-bold'>Definitions</h1>
        {definitions.map((defn, index) => (
          <div key={index} className='mt flex gap-3 items-center'>
            <h1 className='text-[25px] font-bold text-[#70E3C7] '>
              {defn.title} :
            </h1>
            <p className='text-[20px]'>{defn.Description}</p>
          </div>
        ))}
      </div>

      {/* eligibility  */}
      <div>
        <h1 className='text-4xl mt-10 text-white font-bold'>Eligibility</h1>

        <p className="mt-2 text-xl">
          You must be at least 18 years old or the age of majority in your
          jurisdiction, whichever is higher, to use our Services. <br />
          By using our Services, you represent and warrant that you meet these
          eligibility requirements.
        </p>
      </div>

      {/* account registration  */}
      <div>
        <h1 className='text-4xl mt-10 text-white font-bold'>
          Account Registration
        </h1>

        <p className="mt-2 text-xl">
          To access certain features of our Services, you may need to connect
          your wallet. You are responsible for maintaining the security of your
          wallet and for all activities that occur through your wallet. We are
          not responsible for any loss or damage arising from your failure to
          maintain the security of your wallet.
        </p>
      </div>
    </div>
  );
}
