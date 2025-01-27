"use client";
import { useAccount } from "@starknet-react/core";
import AddressBar from "./AddressBar";

function WalletBar({ toggleModal }) {
  const { address } = useAccount();

  return (
    <div className="flex items-center justify-center">
      {address ? (
        <AddressBar />
      ) : (
        <button
          onClick={toggleModal}
          className="text-sm/6 font-semibold text-[#490878] px-3 py-1.5 text-center rounded-lg bg-[#70E3C7]"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default WalletBar;
