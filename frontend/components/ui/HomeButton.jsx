import React from 'react';
import { AiOutlineHome } from "react-icons/ai";

function HomeButton() {
  return (
    <div>
      <a 
        href="#" 
        className="text-[#70E3C7] px-6 py-3 text-center rounded-lg border-2 border-[#70E3C7] hover:bg-[#70E3C7] hover:text-[#490878] transition-colors duration-300 flex items-center space-x-2"
      >
        <AiOutlineHome className="text-2xl" />
        <span>Home</span>
      </a>
    </div>
  );
}

export default HomeButton;
