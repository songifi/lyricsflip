"use client";

import { useState } from "react";
import { useConnect, Connector } from "@starknet-react/core";
import Image from "next/image";

const walletDetails = {
  argentX: {
    name: "Argent",
    subtext: "WEBSITE",
    icon: "/img/argent.svg",
  },
  webwallet: {
    name: "Argent",
    subtext: "MOBILE",
    icon: "/img/argent.svg",
  },
  braavos: {
    name: "Braavos",
    subtext: "WEBSITE",
    icon: "/img/braavos.svg",
  },
};

export function WalletModal({ setIsOpen }) {
  const { connect, connectors } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState(undefined);

  const handleConnect = async () => {
    if (selectedConnector) {
      connect({ connector: selectedConnector });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div className="w-full md:w-[610px] bg-[#70E3C7] bg-opacity-80 text-[#490878] rounded-3xl py-12 px-6 relative text-center">
        <h3 className="text-xl font-semibold">Connect Wallet</h3>
        <p className=" mt-2 mb-7 text-base">
          Choose a wallet you want to use to connect
        </p>
        {/* Wallet Options */}
        <div className="space-y-4 flex flex-col items-center">
          {connectors.map((connector) => {
            const details = walletDetails[connector.id] || {
              name: connector.id,
              subtext: "WEBSITE",
              icon: "/assets/wallets/argent.svg",
            };

            const isSelected = selectedConnector?.id === connector.id;

            return (
              <button
                key={connector.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConnector(connector);
                }}
                className={`w-[full] sm:w-[264px] h-[57px] flex items-center p-5 justify-center rounded-[8px] border gap-5
                    ${isSelected ? "border-blue-500" : "border-[#2C3356]"}
                    hover:border-blue-500 transition-colors`}
              >
                <Image
                  src={details.icon}
                  alt={details.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex flex-col items-start">
                  <span className=" text-base leading-[22px] font-medium">
                    {details.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Continue Button */}
        <button
          className={`w-[264px] sm:w-[264px] mt-7 block py-5 rounded-[8px] disabled:cursor-not-allowed
              ${
                selectedConnector
                  ? "bg-[#70E3C7] hover:bg-opacity-80"
                  : "bg-slate-500"
              }
              text-[#F9F9F9] text-base font-semibold mx-auto transition-colors`}
          onClick={handleConnect}
          disabled={!selectedConnector}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
