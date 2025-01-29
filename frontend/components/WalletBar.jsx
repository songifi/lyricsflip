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
          className="text-sm/6 font-semibold lg:text-[#490878] text-[#70E3C7] px-3 py-1.5 text-center rounded-lg lg:bg-[#70E3C7] bg-[#490878]"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default WalletBar;
