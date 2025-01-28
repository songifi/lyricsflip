
import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { PiDiscordLogo } from "react-icons/pi";

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-[#490878] text-white px-10 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-10 md:flex-row justify-between">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Lyric<span className="text-[#70E3C7]">Flip</span>
            </h2>
            <p className="text-gray-300 max-w-2xl">
              Test your lyrical knowledge, flip the cards, and guess the song!
              Discover your favourite genres, wager tokens, and compete for the
              top spot. Let the music challenge begin!
            </p>
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col md:flex-col gap-5 items-center md:items-end space-y-3 md:space-y-0">
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
                className="hover:text-gray-300 transition-colors"
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
                href="/privacy"
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
            <div className="flex gap-14 md:gap-8">
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
                  className="bg-[#70E3C7] hover:bg-[#3CC8B9] transition-colors p-2 rounded-full"
                >
                  <Icon className="h-5 w-5 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-sm text-[#FFFFFF] pt-7 border-t border-[#FFFFFF]">
          &copy; {getCurrentYear()} LyricFlip. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
