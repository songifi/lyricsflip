"use client";

import { useState, useEffect } from "react";
import LockBodyScroll from "./LockBodyScroll";
import { createPortal } from "react-dom";
import { WalletModal } from "./WalletModal";
import Navbar from "./Navbar";

const Header = () => {
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setConnectModalIsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div>
      {/* Lock body scroll when modal or mobile menu is open */}
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
