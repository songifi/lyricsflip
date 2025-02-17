"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Modal({ isOpen, onClose, title, children, className }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget ||
      !modalRef.current?.contains(event.target)
    ) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
      aria-hidden="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          className={cn(
            "relative w-full max-w-2xl rounded-[13px] bg-white shadow-lg",
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="flex items-center justify-between py-5 px-10 bg-[#F5F5F5] text-[#090909] rounded-t-[13px] border-b-[2px] sticky top-0 z-10">
            <h2 id="modal-title" className="text-xl font-bold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-gray-100 border-[1px]"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="py-6 px-10 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
