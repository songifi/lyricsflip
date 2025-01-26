"use client";

import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="fixed w-full bg-custom-gradient z-10">
      <header>
        <Navbar />
      </header>
    </div>
  );
};

export default Header;
