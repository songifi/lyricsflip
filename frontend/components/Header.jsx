"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import WalletBar from "./WalletBar";
import LockBodyScroll from "./LockBodyScroll";
import { createPortal } from "react-dom";
import { WalletModal } from "./WalletModal";
import { Modal } from "./ui/modal";
import { GameSetupForm } from "./modal/GameSetupForm";

const navigation = [
  { name: "Categories", href: "#", isScroll: false },
  { name: "Leaderboard", href: "#", isScroll: false },
  { name: "How to Play", href: "#", isScroll: false },
];

const handleScroll = (e, isScroll) => {
  if (!isScroll) return;

  e.preventDefault();
  const element = document.getElementById("game");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }
};
import LockBodyScroll from "./LockBodyScroll";
import { createPortal } from "react-dom";
import { WalletModal } from "./WalletModal";
import Navbar from "./Navbar";


const Header = () => {
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStartGame = () => {
    console.log("Starting game...");
    setIsModalOpen(false);
  };

  return (
    <>
      <LockBodyScroll lock={connectModalIsOpen || mobileMenuOpen} />

      {connectModalIsOpen &&
        createPortal(
          <WalletModal setIsOpen={setConnectModalIsOpen} />,
          document.body
        )}
      <div className="fixed w-full bg-custom-gradient z-10">
        <header className="">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-3 lg:px-8"
          >
            <div className="flex">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">LyricsFlip</span>
                <Image
                  alt=""
                  src="/img/LyricsFlipLogo.png"
                  className="h-14 w-[50px]"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <MdOutlineMenu aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <button
                className="text-sm/6 font-semibold text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Play Game
              </button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Guess the song"
              >
                <GameSetupForm onStart={handleStartGame} />
              </Modal>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.isScroll)}
                  className="text-sm/6 font-semibold text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <WalletBar
              toggleModal={() => setConnectModalIsOpen((prev) => !prev)}
            />
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <IoMdClose aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Play Game
                    </button>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>

        <header>
          <Navbar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            connectModalIsOpen={connectModalIsOpen}
            setConnectModalIsOpen={setConnectModalIsOpen}
          />

        </header>
      </div>
    </>
  );
};

export default Header;
