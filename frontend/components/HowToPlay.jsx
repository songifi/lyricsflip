"use Client";
import { title } from "process";
import React from "react";

const steps = [
  {
    title: "Connect Wallet",
    text: "Securely connect your wallet to start the game. Don’t have one? No worries, we’ll guide you through the setup.",
  },
  {
    title: "Enter Username",
    text: "Choose a fun and unique username to showcase your identity. This will represent you in challenges and leaderboards. ",
  },
  {
    title: "Choose Category & Play",
    text: "Pick your favourite category and dive into the game! Test your knowledge, beat challenges, and climb the ranks.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="bg-[#490878] px-4 md:py- py-12 md:h-screen"
    >
      <div className="mx-auto max-w-7xl text-center border-red-500 py-[100px]">
        {/* Header Section */}
        <div className="">
          <h2 className="pb-4 text-5xl font-semibold text-[#FFFFFF] md:text-5xl lg:text-6xl">
            How it works
          </h2>
          <p className="text-lg text-[#FFFFFF] md:text-xl">
            Have fun testing your lyrical knowledge in three (3) easy steps 😊
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 my-16">
          {steps.map((step, index) => (
            <div className="space-y-4 my-10">
              <h3
                key={index}
                className="text-2xl font-bold text-[#FFFFFF] lg:text-3xl pb-3"
              >
                {step.title}
              </h3>
              <p className="mx-auto max-w-sm text-[#FFFFFF]"></p>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className=" flex flex-col items-center justify-center gap-4 md:flex-row ">
          <button className="w-full rounded-full bg-[#70E3C7] px-[69px] py-6 font-semibold text-[#090909] transition md:w-auto">
            Play Game
          </button>
          <button className="w-full rounded-full border-2 border-[#70E3C7] px-[51px] py-6  font-semibold text-[#70E3C7] md:w-auto">
            Connect Wallet
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
