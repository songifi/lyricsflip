import React from "react";
import UserProfileHeader from "./UserProfileHeader";
import GameStatsOverview from "./GameStatsOverview";
import Badges from "./Badges";
import Statistics from "./Statistics";

const UserProfilePage = () => {
  return (
    <div className="relative overflow-hidden flex flex-col gap-6  w-full rounded-2xl  border border-[#DBE2E8] bg-[#F7F8F9] ">
      {/* Gradient Background */}
      <div className="sm:h-[12.5rem] h-[6.5rem] bg-gradient-to-r from-[#70E3C7] to-[#F5CFCC] " />
      <div className=" lg:mx-10 mx-4 gap-6 sm:-mt-[6.5rem] -mt-[4.2rem] flex flex-col pb-10">
        <UserProfileHeader />
        <GameStatsOverview />
        <div className="grid grid-col-1 lg:grid-cols-2 gap-6">
          <Badges />
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
