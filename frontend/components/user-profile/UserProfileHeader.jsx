import React from "react";
import Image from "next/image";

const UserProfileHeader = () => {
  return (
    <div className="  flex flex-col items-start gap-3">
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
          <div className="flex items-center justify-center gap-3 md:px-6 md:py-4 p-3 rounded-lg bg-[#71E3C7]">
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
  );
};

export default UserProfileHeader;
