"use client";

import { useState, Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const navigation = [
  { name: "Play Now", href: "#game", isScroll: true },
  { name: "Categories", href: "#", isScroll: false },
  { name: "Leaderboard", href: "#", isScroll: false },
  { name: "How to Play", href: "#how-to-play", isScroll: false },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (e, isScroll) => {
    if (!isScroll) return;

    e.preventDefault();
    const element = document.getElementById("game");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      aria-label="Global"
      className="flex items-center justify-between p-3 lg:px-8"
    >
      <div className="flex lg:flex-1">
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
          <MdOutlineMenu aria-hidden="true" className="size-6 text-white" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
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
      
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-b from-[#490878] to-[#2C1854] px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
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
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-[#70E3C7] hover:text-[#70E3C7] transition-colors">
                  <span className="sr-only">Close menu</span>
                  <IoMdClose aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/20">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleScroll(e, item.isScroll)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#490878] hover:bg-white/10 hover:text-[#70E3C7] transition-colors">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="#"
                      className="inline-block rounded-lg px-4 py-2 text-base/7 font-semibold text-[#490878] bg-[#70E3C7] hover:bg-[#5BC7AD] transition-colors">
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </nav>
  );
};

export default Navbar; 