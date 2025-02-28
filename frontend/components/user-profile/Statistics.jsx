import React from "react";
import StatsChart from "./StatsChart";

const Statistics = () => {
  return (
    <div className="flex flex-col items-start gap-[10px]">
      <h1 className="text-[24px] font-inter font-semibold leading-[36px] text-[#090909]">
        Statistics
      </h1>
      <StatsChart />
    </div>
  );
};

export default Statistics;
