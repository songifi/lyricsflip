import React from "react";

export default function GameRules() {
  const rules = [
    {
      id: 1,
      title: "Gameplay",
      content:
        "LyricFlip is a music guessing game where players are presented with a card showing a snippet of lyrics and must guess the corresponding song title or artist within 15 seconds.",
    },
    {
      id: 2,
      title: "Scoring",
      content:
        "If you guess correctly, you will receive immediate feedback, including visual confirmation (confetti) and potential rewards.  If you fail to guess correctly within the time limit, the card will flip, revealing the correct answer.",
    },
    {
      id: 3,
      title: "Categories",
      content:
        "The game features various categories based on music genres and decades (e.g., 90s R&B). Different categories may have different difficulty levels and reward structures.",
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "NFT Rewards",
      content:
        "The Services may offer NFT rewards for achievements within the game. These NFTs exist on the Starknet blockchain and are subject to the technical limitations and risks associated with blockchain technology.",
    },
    {
      id: 1,
      title: "Ownership",
      content:
        "Any NFTs or tokens earned or purchased through our Services are owned by you, subject to these Terms. However, the underlying content represented by these digital assets may be subject to third-party intellectual property rights.",
    },
  ];

  return (
    <div className='px-10  py-10'>
      <h1 className='text-4xl mt-5  font-bold'>Game Rules and Mechanics</h1>

      {/* rules section  */}
      <div className=' flex flex-1 flex-row gap-5 py-10 '>
        {rules.map((rule, index) => (
          <div
            key={index}
            className=' gap-5 p-5 rounded-md shadow-2xl bg-gradient-to-r from-primary-main to-[#70E3C7] text-white'
          >
            <div>
              <h2 className='text-2xl mt-5 text-white font-bold'>
                {rule.title}
              </h2>
              <p className='mt-2 text-[18px]'>{rule.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* reward section  */}
      <div className='grid grid-cols-2 gap-5'>
        <div>
          {rewards.map((reward, index) => (
            <div
              key={index}
              className=' p-5 mt-5 rounded-md shadow-2xl bg-gradient-to-r from-primary-main to-[#70E3C7] text-white'
            >
              <h1 className='text-2xl  mt-5 text-white font-bold'>
                {reward.title}
              </h1>
              <p className='text-[18px]'>{reward.content}</p>
            </div>
          ))}
        </div>

        <div className=' p-5 mt-5 rounded-md shadow-2xl bg-gradient-to-r from-primary-main to-[#70E3C7] text-white'>
          <h1 className='text-2xl  mt-5 text-white font-bold'>
            Token Wagering
          </h1>
          <p className='mt-5 text-xl'>
            You may have the option to wager tokens on gameplay outcomes. By
            participating in token wagering: <br />
            You acknowledge that wagering tokens carries financial risk <br />{" "}
            You confirm that such activities are legal in your jurisdiction{" "}
            <br /> You understand that the value of tokens can fluctuate and may
            be lost entirely
          </p>
        </div>
      </div>
    </div>
  );
}
