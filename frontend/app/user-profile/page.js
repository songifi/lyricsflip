"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <div className="w-full min-h-screen max-w-7xl flex flex-col gap-6 px-[1rem] md:px-[2rem] mx-auto xl:px-[6.3rem] py-20 bg-white">
      {/* <SavingsChartFixed /> */}
      <h1 className="text-xl font-semibold mb-4">My Profile</h1>
      {/* Gradient Background */}
      <div className="relative overflow-hidden flex flex-col gap-6  w-full rounded-2xl  border border-[#DBE2E8] bg-[#F7F8F9] ">
        {/* Gradient Background */}
        <div className="md:h-[12.5rem] h-[6.5rem] bg-gradient-to-r from-[#70E3C7] to-[#F5CFCC] " />

        <div className=" md:mx-10 px-4 gap-6 flex flex-col pb-10">
          {/* Profile Content */}
          <div className=" md:-mt-24 -mt-[50px] flex flex-col items-start gap-3">
            {/* Avatar Section */}
            <div className=" flex justify-between items-end w-full">
              <div className="md:w-40 md:h-40 w-[6.3rem] h-[6.3rem] rounded-full aspect-square">
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
          {/*  */}
        </div>
      </div>
    </div>
  );
}
