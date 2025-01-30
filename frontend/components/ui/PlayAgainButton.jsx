import React from 'react';
import { IoGameController } from "react-icons/io5";

function PlayAgainButton() {
  return (
    <button className="btn btn-primary bottom-4 right-4 shadow-lg flex items-center gap-2 px-4 py-2">
      <IoGameController className="text-2xl" />
      <span>Play Again</span>
    </button>
  );
}

export default PlayAgainButton;
