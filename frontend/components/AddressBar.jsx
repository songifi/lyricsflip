"use client";

import { useAccount, useDisconnect } from "@starknet-react/core";
import { useState } from "react";

const AddressBar = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [displayAddress, setDisplayAddress] = useState(true);

  return (
    <button
      className="flex  w-[203px] items-center justify-center gap-x-3 rounded-[4px] bg-[#70E3C7] py-[12px] text-center text-base font-medium text-[#490878] disabled:cursor-not-allowed"
      onMouseEnter={() => setDisplayAddress(false)}
      onMouseLeave={() => setDisplayAddress(true)}
      onClick={disconnect}
    >
      {!displayAddress ? (
        "Disconnect Wallet"
      ) : (
        <>
          <img src="/img/argent.svg" className="h-[24px] w-[24px]" alt="" />
          <span>
            {address
              ? address.slice(0, 7).concat("...").concat(address.slice(-4))
              : ""}
          </span>
        </>
      )}
    </button>
  );
};

export default AddressBar;
