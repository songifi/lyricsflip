import React from "react";
import Display from "./Display";

const GameStatsOverview = () => {
  return (
    <div className="grid max-w-3xl lg:max-w-full mx-auto grid-cols-2 lg:grid-cols-5 w-full lg:p-6 xl:gap-8 justify-between rounded-xl  border-[#DBE2E8] bg-white">
      {/* Total Games Played */}
      <div className="order-2 lg:order-1 col-span-1 lg:col-span-1 border-b py-4 lg:py-0 lg:border-r lg:border-b-0  border-gray-200">
        <Display
          text="Total Games Played"
          value={870}
          className="border-r lg:border-r-0  border-gray-200 w-full h-full "
        />
      </div>
      {/* Total Games Won */}
      <div className="order-4 lg:order-2 col-span-1 lg:col-span-1 py-4 lg:py-0  lg:border-r  border-gray-200">
        <Display
          text="Total Games Won"
          value={678}
          className="border-r lg:border-r-0 border-gray-200 w-full h-full"
        />
      </div>

      {/* Total Games Lost */}
      <div className="order-5 lg:order-3 col-span-1 lg:col-span-1 py-4 lg:py-0  lg:border-r  border-gray-200">
        <Display text="Total Games Lost" value={123} />
      </div>

      {/* Total Tokens Earned - this will appear first on mobile */}
      <div className="order-1 lg:order-4 col-span-2 lg:col-span-1 py-4 lg:py-0  border-b lg:border-r lg:border-b-0 border-gray-200">
        <Display text="Total Tokens Earned" value={600} usd={true} />
      </div>

      {/* Ranking */}
      <div className="order-3 lg:order-5 col-span-1 py-4 lg:py-0  lg:col-span-1 border-b lg:border-b-0 ">
        <Display text="Ranking" value={1209} th={true} noBorder={true} />
      </div>
    </div>
  );
};

export default GameStatsOverview;
