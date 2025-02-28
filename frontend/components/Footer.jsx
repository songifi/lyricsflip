import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { PiDiscordLogo } from "react-icons/pi";

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-[#490878] dark:bg-black-200  text-white px-10 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-10 md:flex-row justify-between">
          {/* Logo and Description Section */}
          <div className="space-y-4 bg-[#490878] dark:bg-black">
            <h2 className="text-2xl font-bold">
              Lyric<span className="text-primary-light">Flip</span>
            </h2>
            <p className="bg-[#490878] dark:bg-black-200 text-white-200 max-w-2xl dark:bg-black-200">
              Test your lyrical knowledge, flip the cards, and guess the song!
              Discover your favourite genres, wager tokens, and compete for the
              top spot. Let the music challenge begin!
            </p>
          </div>

          {/* Navigation and Social Links */}
          <div className=" bg-[#490878] dark:bg-black-200 flex flex-col md:flex-col gap-5 items-center md:items-end space-y-3 md:space-y-0">
            {/* Navigation Links */}
            <nav className="flex flex-wrap gap-4 text-xs font-[geist]">
              <Link
                href="/play"
                className="hover:text-gray-300 transition-colors"
              >
                Play Game
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-300 bg-teal dark:bg-black transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-300 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
            </nav>

            {/* Social Media Icons */}
            <div className="bg-[#490878] dark:bg-black-200 flex gap-14 md:gap-8">
              {[
                BsEnvelope,
                FaInstagram,
                CiFacebook,
                FaXTwitter,
                PiDiscordLogo,
              ].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="bg-[#490878] dark:bg-black-200 bg-primary-light hover:bg-primary-hover transition-colors p-2 rounded-full"
                >
                  <Icon className="h-5 w-5 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="bg-[#490878] dark:bg-black-200 text-center text-sm text-background-default pt-7 border-t border-background-default">
          &copy; {getCurrentYear()} LyricFlip. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;