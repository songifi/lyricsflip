import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import MobileNav from "./MobileNav";

const Head = ({ title }) => {
  return (
    <header>
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 text-black">
        <Link
          href="/"
          className="text-base font-medium hover:bg-green-300 px-2 py-2 rounded-full"
        >
          Home
        </Link>
        <h1 className="text-2xl font-bold text-center flex-grow">{title}</h1>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-8 mt-6 mb-10 text-black">
        <div className="flex items-center justify-between">
          <Link href="/">
            <FaArrowLeftLong className="text-2xl" />
          </Link>
          <h1 className="text-lg font-bold text-center flex-grow">{title}</h1>
        </div>
        <p className="text-base mt-4">
          Meet the amazing contributors who have helped make this project
          possible. Click on a profile to learn more about their work.
        </p>

        <MobileNav />
      </div>
    </header>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
};

Head.defaultProps = {
  title: "Top Public Contributors",
};

export default Head;
