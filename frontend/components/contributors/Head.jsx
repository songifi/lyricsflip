import React from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import MoblieNav from "./MobileNav";

const Head = () => {
  return (
    <div>
      <div className="hidden md:flex items-center justify-between px-8 py-4    text-black ">
        <div className="text-base font-medium">
          <Link href="/" className="hover:bg-green-300 px-2 py-2 rounded-full">
            Home
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center flex-grow">
          Top Public Contributors
        </h1>
      </div>

      {/* mobile */}

      <div className="md:hidden">


      <div className="flex  flex-col text-black gap-y-10 px-8 mt-6 mb-10 ">
        <div className="flex items-center justify-between ">
        <Link href="/#">
        <FaArrowLeftLong className="text-2xl" />
        </Link>
          <h1 className="text-lg font-bold text-center flex-grow">
            Top Public Contributors
          </h1>
        </div>
       <p className="text-base text-pretty">
       Meet the amazing Contributors who have helped make this project
       possible. Click on a profile to learn more about their work
       </p>
      </div>

     <MoblieNav />

      </div>

 



    </div>
  );
};

export default Head;
