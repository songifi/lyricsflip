"use Client";
import { title } from "process";
import React from "react";

const steps = [
  {
    title: "Connect Wallet",
    text: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class ",
  },
  {
    title: "Connect Wallet",
    text: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class ",
  },
  {
    title: "Connect Wallet",
    text: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class ",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-purple-900 px-4 py-16 md:py-24 h-screen">
      <div className="mx-auto max-w-7xl text-center md:my-28">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-5xl font-bold text-white md:text-5xl lg:text-6xl">
            How it works
          </h2>
          <p className="text-lg text-white/90 md:text-xl">
            lorem ipsum forem sit amet adipistyd humat thyu lemama strova loci
            😊
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div className="space-y-4">
              <h3
                key={step.title}
                className="text-2xl font-bold text-white md:text-3xl"
              >
                {step.title}
              </h3>
              <p className="mx-auto max-w-sm text-white/80"></p>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
          <button className="w-full rounded-full bg-[#70E3C7] px-14 py-4 font-semibold text-gray-900 transition md:w-auto">
            Play Game
          </button>
          <button className="w-full rounded-full border-2 border-[#70E3C7] px-8 py-4 font-semibold text-[#70E3C7] md:w-auto">
            Connect Wallet
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
