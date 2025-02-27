import React from "react";
import MusicConnoisseurBadge from "./MusicConnoisseurBadge";
const Badges = () => {
  return (
    <div className="flex flex-col items-start gap-[10px] ">
      <h1 className="text-[24px] font-inter font-semibold leading-[36px] text-[#090909]">
        Badges
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-6 p-6 pb-[65px] rounded-[16px] border border-[#DBE2E8] bg-white w-full">
        <MusicConnoisseurBadge showMultiplier={true} />
        <MusicConnoisseurBadge showMultiplier={false} />
        <MusicConnoisseurBadge showMultiplier={true} />
        <MusicConnoisseurBadge showMultiplier={true} />

        <MusicConnoisseurBadge showMultiplier={true} />
        <MusicConnoisseurBadge showMultiplier={false} />
        <MusicConnoisseurBadge showMultiplier={true} />
        <MusicConnoisseurBadge showMultiplier={true} />
        <div className="md:hidden">
          <MusicConnoisseurBadge showMultiplier={true} />
        </div>
      </div>
    </div>
  );
};

export default Badges;
