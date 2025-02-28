"use client";

import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import Link from "next/link";
import { NotificationModal } from "./NotificationModal";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GameSetupForm } from "./modal/GameSetupForm";
import { Modal } from "./ui/modal";
import WalletBar from "./WalletBar";
import GeniusService from "@/services/geniusService";
import { useGameStore } from "@/store/gameStore";
import { useUIStore } from "../store/uiStore";

const navigation = [
  { name: "Play Game", href: "#", isScroll: false, isModal: true },
  { name: "How to Play", href: "#howItWorks", isScroll: true },
  { name: "Contributors", href: "/contributors/total", isScroll: false },
  { name: "Leaderboard", href: "leaderboard", isScroll: false },
  { name: "Notification", href: "#", isScroll: false },
];

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { handleStartGame, isModalOpen, setIsModalOpen } = useGameStore();

  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  // Remove these duplicate state declarations
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const handleScroll = useCallback(
    (e, item) => {
      if (item.isModal) {
        e.preventDefault();
        setIsModalOpen(true);
        setMobileMenuOpen(false);
      } else if (item.isScroll) {
        const sectionId = item.href.replace("#", "");
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          // In case the section isn't loaded yet
          window.location.href = item.href;
        }
        setMobileMenuOpen(false);
      }
    },
    [setIsModalOpen, setMobileMenuOpen]
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
          <MdOutlineMenu
            aria-hidden="true"
            className="size-6 text-primary-light"
          />
        </button>
      </div>

      <div className="hidden flex-1 justify-end items-center lg:flex lg:gap-x-12 h-full ml-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleScroll(e, item)}
            className="text-base/6 font-medium text-white hover:text-primary-light transition-colors py-4"
          >
            {item.name}
          </Link>
        ))}
        <WalletBar />
      </div>

      {mobileMenuOpen && (
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-[#040311] px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                <img
                  src="/assets/LyricsFlipLogo.svg"
                  alt="LyricFlip Logo"
                  width="30"
                />
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-primary-light"
              >
                <span className="sr-only">Close menu</span>
                <IoMdClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        handleScroll(e, item);
                        setMobileMenuOpen(false);
                      }}
                      className="block px-3 py-2 text-base font-semibold text-white hover:bg-primary-light/20"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <WalletBar />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}

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
