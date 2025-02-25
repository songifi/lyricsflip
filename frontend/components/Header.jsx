
"use client";

import { useEffect, useState } from "react";
import LockBodyScroll from "./LockBodyScroll";
import { WalletModal } from "./WalletModal";
import Navbar from "./Navbar";
import { useUIStore } from "@/store/uiStore";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { connectModalIsOpen, mobileMenuOpen } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full">
      <LockBodyScroll lock={connectModalIsOpen || mobileMenuOpen} />
      
      {/* Show Wallet Modal when mounted */}
      {isMounted && connectModalIsOpen && <WalletModal />}

      {/* Fixed header containing Navbar & Theme Toggle */}
      <div className="fixed w-full z-50">
        <header className="bg-[#040311] w-full flex justify-between items-center p-4">
          <Navbar />
          <ThemeToggleButton />
        </header>
      </div>
    </div>
  );
};

export default Header;






;
