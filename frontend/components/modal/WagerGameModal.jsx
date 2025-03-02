import { useState } from "react";
import Vector from "../../public/assets/gamewagervec.svg"
import codecopy from "../../public/assets/codecopy.svg"
import Image from "next/image";

export default function WagerModal({ isOpen, onClose }) {
  const [modalStep, setModalStep] = useState(1);
  const [wagerCode] = useState("LF34567QW"); // Simulated wager code

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center pt-20 justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-2 rounded-lg sm:w-auto"  style={{ backgroundColor: "#F5F5F5", }}>
          <h2 className="text-lg font-semibold sm:w-auto">Wager Game Mode</h2>
          <div className="flex d-flex sm:w-auto">
            <div style={{background: '#FFFFFF', display: 'flex', marginRight: '15px', borderRadius: '10px'}}>
                <div style={{borderRadius: "50px", backgroundColor: '#EEFCF8', marginRight: '5px'}}>
                    <Image src={Vector} alt="newimage" />
                </div>
                <span>00134dyh45yhhc ...55e1</span>
            </div>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✖
          </button>
          </div>
        </div>

        {modalStep === 1 && (
          // First Modal (Form)
          <div className="p-6">
            {/* Tabs */}
            <div className="flex flex-wrap border-b mt-3">
              <button className="px-4 py-2 text-green-600 border-b-2 border-green-600 sm:w-auto">
                Create a Challenge
              </button>
              <button className="px-4 py-2 text-gray-500 hover:text-green-600 sm:w-auto">
                Join a Challenge
              </button>
            </div>

            {/* Form */}
            <div className="mt-4">
              <h3 className="text-md font-semibold font-inter text-left">Create a wager challenge</h3>
              <p className="text-sm text-gray-500 text-left mb-4 font-inter">
                Fill in the form below to create a wager challenge.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="text-left">
                <span className="font-geist text-left">Number of Players</span>
                <select className="border p-2 rounded w-[100%]">
                  <option></option>
                  <option>2</option>
                  <option>4</option>
                  <option>6</option>
                </select>
                </div>
               <div className="text-left">
               <span className="text-left font-geist">Wager Amount</span>
               <input
                  type="number"
                  className="border p-2 rounded font-geist w-[100%] h-[36px]"
                />
               </div>
                <div className="text-left">
                <span>Difficulty Level</span>
                <select className="border p-2 rounded font-geist w-[100%]">
                  <option></option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                </div>
                <div className="text-left">
                <span>Duration</span>
                <select className="border p-2 rounded font-geist w-[100%]">
                  <option></option>
                  <option>5 min</option>
                  <option>10 min</option>
                  <option>15 min</option>
                </select>
                </div>   
              </div>

              <button
                className="bg-[#70E3C7] text-black w-[50%] py-2 font-geist mt-10"
                style={{ color: "#090909", borderRadius:'30px' }}
                onClick={() => setModalStep(2)}
              >
                Create Challenge
              </button>
            </div>
          </div>
        )}   
        {/* Step 2: Challenge Created */}
        {modalStep === 2 && (
          // Second Modal (Challenge Created)
          <div className="text-center mt-6">
            <h3 className="text-md font-semibold font-inter pt-10" style={{color: '#000000'}}>Your wager challenge has been created</h3>
            <p className="text-sm text-gray-500 mb-4 font-inter" style={{color: '#666666'}}>
              Share the code below for others to join in
            </p>

            <div className="flex justify-center items-center space-x-2 p-3 mb-20  rounded-md w-fit mx-auto">
              <span className="text-xl font-bold">{wagerCode}</span>
              <button
                onClick={() => navigator.clipboard.writeText(wagerCode)}
                className="text-green-500 hover:text-green-700"
              >
                <Image src={codecopy} alt="newimage" />
              </button>
            </div>

            <div className="flex justify-center gap-4 mt-5 mb-10">
              <button className="border px-6 py-2 text-gray-400 font-geist" style={{borderRadius: '1000px'}}>
                Share Code
              </button>
              <button className="bg-[#70E3C7] text-black px-6 py-2 rounded-md font-geist" style={{borderRadius: '1000px'}}
               onClick={() => setModalStep(3)}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
                {/* Step 3: Waiting for Opponents */}
                {modalStep === 3 && (
          <div className="text-center mt-20 mb-20">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-600"></div>
            </div>
            <h3 className="text-md font-semibold mt-4 font-inter" style={{color: "#000000"}}>Waiting for opponents...</h3>
            <p className="text-sm mt-2 font-inter" style={{color: "#666666"}}>1 joined, 1 left</p>
          </div>
        )}
      </div>
       </div>
  );
}
