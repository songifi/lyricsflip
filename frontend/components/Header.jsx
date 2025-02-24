"use client";

import { useEffect, useState } from "react";
import LockBodyScroll from "./LockBodyScroll";
import { WalletModal } from "./WalletModal";
import Navbar from "./Navbar";
import { useUIStore } from "@/store/uiStore";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { connectModalIsOpen, mobileMenuOpen } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full">
      <LockBodyScroll lock={connectModalIsOpen || mobileMenuOpen} />

      {/* Render WalletModal with accessibility improvements */}
      {connectModalIsOpen &&
        createPortal(
          <WalletModal
            setIsOpen={setConnectModalIsOpen}
            aria-labelledby="wallet-modal-title"
            aria-hidden={!connectModalIsOpen}
          />,
          document.body
        )}

      <div className="fixed w-full bg-custom-gradient z-10">
        <header role="banner">
          <Navbar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            connectModalIsOpen={connectModalIsOpen}
            setConnectModalIsOpen={setConnectModalIsOpen}
            aria-label="Main navigation"
          />
        </header>
      </div>
    </div>
  );
};

export default Header;
