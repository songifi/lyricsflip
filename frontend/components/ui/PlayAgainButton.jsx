import React from 'react';
import { IoGameController } from "react-icons/io5";
// import { Modal } from "./ui/modal";


function PlayAgainButton() {
  return (
    <button className=" text-center rounded-lg border-2 border-[#70E3C7] hover:bg-[#70E3C7] hover:text-[#490878] transition-colors duration-300 bottom-4 right-4 shadow-lg flex items-center gap-2 px-4 py-2">
      <IoGameController className="text-2xl" />
      <span className="text-[15px]">Play Game</span>
    </button>
  );
}

export default PlayAgainButton;
