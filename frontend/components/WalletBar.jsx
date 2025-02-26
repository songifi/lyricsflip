"use client";
import { useAccount, useConnect } from "@starknet-react/core";
import AddressBar from "./AddressBar";
import { useUIStore } from "../store/uiStore";
import { useState } from "react";

const WalletBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { account } = useAccount();
  const { connect } = useConnect();
  const { setConnectModalIsOpen } = useUIStore();

  const handleConnect = () => {
    setConnectModalIsOpen(true);
  };

  return (
    <div className="flex items-center gap-4">
      {account ? (
        <span className="text-white">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="px-6 py-3 bg-gradient-to-r from-primary-light to-[#5ac7ad] text-black rounded-lg 
                   hover:from-[#5ac7ad] hover:to-primary-light transition-all duration-300 
                   shadow-lg hover:shadow-xl hover:scale-105 active:scale-95
                   flex items-center gap-2 group relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Button content */}
          {isConnecting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              Connect Wallet
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default WalletBar;
