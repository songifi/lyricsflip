"use client";

import Display from "@/components/user-profile/Display";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="w-full min-h-screen max-w-7xl flex flex-col gap-6 px-[1rem] md:px-[2rem] mx-auto xl:px-[6.3rem] py-20 bg-white">
      {/* <SavingsChartFixed /> */}
      <h1 className="text-xl font-semibold mb-4">My Profile</h1>
      {/* Gradient Background */}
      <div className="relative overflow-hidden flex flex-col gap-6  w-full rounded-2xl  border border-[#DBE2E8] bg-[#F7F8F9] ">
        {/* Gradient Background */}
        <div className="sm:h-[12.5rem] h-[6.5rem] bg-gradient-to-r from-[#70E3C7] to-[#F5CFCC] " />

        <div className=" lg:mx-10 mx-4 gap-6 flex flex-col pb-10">
          {/* Profile Content */}
          <div className=" sm:-mt-24 -mt-[50px] flex flex-col items-start gap-3">
            {/* Avatar Section */}
            <div className=" flex justify-between items-end w-full">
              <div className="sm:w-40 sm:h-40 w-[6.3rem] h-[6.3rem] rounded-full aspect-square">
                <Image
                  src="/userprofile-img/profilepic.svg"
                  width={160}
                  height={160}
                  alt="Profile"
                  className=" object-cover "
                />
              </div>

              <div className="flex gap-6">
                <button className="md:flex items-center hidden  justify-center gap-3 px-6 py-4 border border-[#DBE2E8] rounded-lg text-[#71E3C7] text-center text-base font-[160] leading-6">
                  Edit Profile
                </button>
                <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-[#71E3C7]">
                  <span>
                    <Image
                      src="/userprofile-img/layer.svg"
                      width={24}
                      height={21}
                      alt="layer"
                    />
                  </span>
                  00134d...55e1
                </div>
              </div>
            </div>
            <span className="mt-2 font-medium">thetimileyin</span>
          </div>
          <div className="grid max-w-3xl lg:max-w-full mx-auto grid-cols-2 lg:grid-cols-5 w-full lg:p-6 lg:gap-8 justify-between rounded-xl  border-[#DBE2E8] bg-white">
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
            {/* <Display text="Total Games Played" value={870} />
            <Display text="Total Games Played" value={870} />
            <Display text="Total Games Played" value={870} />
            <Display text="Total Games Played" value={870} usd={true} />
            <Display
              text="Total Games Played"
              value={1029}
              noBorder
              th={true}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
