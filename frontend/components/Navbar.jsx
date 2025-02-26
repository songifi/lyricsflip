"use client";

import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GameSetupForm } from "./modal/GameSetupForm";
import { Modal } from "./ui/modal";
import WalletBar from "./WalletBar";
import { NotificationModal } from "./NotificationModal"; // 👈 Import the modal here
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "../store/uiStore";

const navigation = [
  { name: "Play Game", href: "#", isScroll: false, isModal: true },
  { name: "How to Play", href: "#howItWorks", isScroll: true },
  { name: "Categories", href: "#", isScroll: false },
  { name: "Leaderboard", href: "leaderboard", isScroll: false },
  { name: "Notification", href: "#", isScroll: false, isNotification: true }, // 👈 Added isNotification key
];

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // 👈 State for notification modal

  const { handleStartGame, isModalOpen, setIsModalOpen } = useGameStore();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const handleScroll = useCallback(
    (e, item) => {
      e.preventDefault();
      if (item.isModal) {
        setIsModalOpen(true);
        setMobileMenuOpen(false);
      } else if (item.isNotification) {
        setIsNotificationOpen(true); // 👈 Open notification modal
        setMobileMenuOpen(false);
      }
    },
    [setIsModalOpen, setIsNotificationOpen, setMobileMenuOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderContent = () => (
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex-none">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">LyricsFlip</span>
          <img
            src="/assets/LyricsFlipLogo.svg"
            alt="LyricFlip Logo"
            width="65"
          />
        </Link>
      </div>

      <div className="flex lg:hidden flex-none">
        <button
          type="button"
          onClick={handleMobileMenuToggle}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 h-12 w-12"
        >
          <span className="sr-only">Open main menu</span>
          <MdOutlineMenu aria-hidden="true" className="size-6 text-[#70E3C7]" />
        </button>
      </div>

      <div className="hidden flex-1 justify-end items-center lg:flex lg:gap-x-12 h-full ml-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleScroll(e, item)}
            className="text-base/6 font-medium text-white hover:text-[#70E3C7] transition-colors py-4"
          >
            {item.name}
          </Link>
        ))}
        <WalletBar />
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title="Guess the song"
        >
          <GameSetupForm onStart={handleStartGame} />
        </Modal>
      )}
    </div>
  );

  return (
    <nav
      aria-label="Global"
      className="w-full flex items-center justify-between h-[100px] bg-[#040311] px-4 sm:px-6 lg:px-8"
      suppressHydrationWarning
    >
      {isMounted ? renderContent() : null}
    </nav>
  );
};

export default Navbar;
