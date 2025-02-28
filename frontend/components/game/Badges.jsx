"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";

const BadgesModal = ({ isOpen, onClose, badges = [] }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-4 px-4">
      {/* Blur overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl p-6 w-full max-w-md my-auto shadow-lg"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 hover:bg-gray-100 rounded-full border-gray-200 border"
        >
          <X className="h-4 w-4 text-gray-800" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-primary">Your Badges</h2>
          <p className="text-gray-600 mt-1 text-sm">
            <span className="text-black font-bold">
              {badges.filter((b) => b.unlocked).length}
            </span>
            /{badges.length} badges unlocked
          </p>
        </div>

        {/* Badges grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                {badge.unlocked ? (
                  <>
                    <div className="w-18 h-18 rounded-full flex items-center justify-center">
                      <Image
                        src="/BadgeUnlockedIcon.svg"
                        alt="badge icon"
                        width={80}
                        height={80}
                      />
                    </div>
                    {badge.count && (
                      <div className="border-gray-400 border absolute -bottom-1 -right-1 bg-white text-black text-xs rounded-full px-2 py-1">
                        {badge.count}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-18 h-18 bg-gray-100 rounded-full flex items-center justify-center p-6 border-gray-400 border">
                    <Image
                      src="/padLockIcon.svg"
                      alt="padlock icon"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
              </div>
              <span className="mt-2 text-xs text-center italic text-text-primary">
                Music Connoisseur
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesModal;
