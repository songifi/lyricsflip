"use client";

import { useState } from "react";
import LockBodyScroll from "./LockBodyScroll";
import { createPortal } from "react-dom";
import { WalletModal } from "./WalletModal";
import Navbar from "./Navbar";

const Header = () => {
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div> {/* Removed unnecessary fragment <> and used a wrapping div */}
      <LockBodyScroll lock={connectModalIsOpen || mobileMenuOpen} />

      {connectModalIsOpen &&
        createPortal(
          <WalletModal setIsOpen={setConnectModalIsOpen} />,
          document.body
        )}

      <div className="fixed w-full bg-custom-gradient z-10">
        <header>
          <Navbar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            connectModalIsOpen={connectModalIsOpen}
            setConnectModalIsOpen={setConnectModalIsOpen}
          />
        </header>
      </div>
    </div>  
  );
};

export default Header;