"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ 
              opacity: 0,
              y: -40,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5,
                restDelta: 0.001
              }
            }}
            exit={{
              opacity: 0,
              y: 20,
              transition: { duration: 0.15 }
            }}
            className={cn(
              "relative w-full max-w-2xl rounded-[13px] bg-white shadow-lg",
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between py-5 px-10 bg-background-paper text-text-primary rounded-t-[13px] border-b-[2px] sticky top-0 z-10">
              <h2 id="modal-title" className="text-xl font-bold">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-primary-main transition-transform duration-300 hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    className="origin-center transition-all duration-500 group-hover:opacity-0"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95z"
                    className="opacity-0 absolute inset-0 transition-all duration-500 group-hover:opacity-100"
                  />
                </svg>
              </button>
            </div>
            <div className="py-6 px-10 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
