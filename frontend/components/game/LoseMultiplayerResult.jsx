import Image from "next/image";
import React from "react";

const LoseMultiplayerResult = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#090909]/25 backdrop-blur-[1px] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[1008px] shadow-lg">
        {/* Header */}
        <div className="bg-[#F5F5F5] px-12 py-6 border-b border-[#DBE2E7] rounded-xl flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="border border-[#DBE1E7] bg-white rounded-full p-1 pr-3 flex items-center gap-3">
              <div className="w-18 h-18 rounded-full flex items-center justify-center p-2 border bg-[#EEFCF8] border-[#CBF6EA]">
                <Image
                  src="/img/argent.svg"
                  alt="badge icon"
                  width={24}
                  height={21}
                />
              </div>
              <p className="text-sm font-semibold text-[#090909]">
                00134dyh45yhc...55e1
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-[#666666]">
                Payout if won:{" "}
                <strong className="text-[#090909]">$1,500.00</strong>
              </span>
              <div className="w-6 h-6 pl-1">
                <Image
                  src="/img/star.svg"
                  alt="badge icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800">
              <div className="w-8 h-8 p-2 rounded-full border border-[#DBE1E7]">
                <Image
                  src="/img/pause.svg"
                  alt="badge icon"
                  width={24}
                  height={24}
                />
              </div>
            </button>
            <p className="text-[#666666]">
              Time left: <span className="font-bold text-[#2EAE4E]">05:00</span>
            </p>
          </div>
        </div>

        {/* Icon and Result */}
        <div className="text-center flex flex-col items-center my-8 p-8">
          <div className="w-[160px] h-[160px]">
            <Image
              src="/img/danger.svg"
              alt="badge icon"
              width={160}
              height={160}
            />
          </div>
          <h2 className="text-2xl mt-4 font-bold text-[#090909]">
            <span className="text-[#70E3C7]">368 Points</span> - Oh oo, you
            didn't win o 😔
          </h2>
        </div>

        {/* Challenge Result */}
        <div className="border rounded-lg w-full max-w-[598px] mx-auto">
          <h3 className="font-semibold p-6 text-black border-b border-dashed">
            Challenge Result
          </h3>
          <div className="mt-2 mb-5 pt-5 space-y-6 text-[#666666] px-6">
            <div className="flex justify-between">
              <p>Winner:</p> <p className="font-bold">You</p>
            </div>
            <div className="flex justify-between">
              <p>Second Place:</p>
              <p className="font-bold">the0xneedth (300 Pts)</p>
            </div>
            <div className="flex justify-between">
              <p>Third Place:</p>{" "}
              <p className="font-bold">theXaxxoo (260 Pts)</p>
            </div>
            <div className="flex justify-between">
              <p>Prize Won: </p>
              <p className="text-[#70E3C7] font-bold">$1,500.00</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 w-full max-w-[598px] mx-auto mt-[120px] mb-[60px]">
          <button className="bg-[#70E3C7] text-[#090909] px-8 py-6 rounded-full w-full">
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseMultiplayerResult;
