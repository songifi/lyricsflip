"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ isOpen, onClose, title, children, className }) {
  const modalRef = useRef(null);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") setShowConfirmClose(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (!modalRef.current?.contains(event.target)) {
      setShowConfirmClose(true);
    }
  };

  const confirmClose = () => {
    setShowConfirmClose(false);
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Main Modal - Always present but conditionally hidden */}
          <motion.div
            key="main-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
              showConfirmClose ? "pointer-events-none opacity-50" : ""
            )}
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
              className={cn(
                "relative w-full max-w-2xl rounded-lg bg-white shadow-lg",
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="flex items-center justify-between py-5 px-10 bg-background-paper text-text-primary rounded-t-lg border-b-2">
                <h2 id="modal-title" className="text-xl font-bold">
                  {title}
                </h2>
                <button
                  onClick={() => setShowConfirmClose(true)}
                  className="absolute top-4 right-4 p-1"
                >
                  <X className="h-7 w-7 text-primary-main transition-transform duration-300 hover:rotate-90" />
                </button>
              </div>
              <div className="py-6 px-10 max-h-[70vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </motion.div>

          {/* Confirmation Modal */}
          {showConfirmClose && (
            <motion.div
              key="confirm-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                className="w-full max-w-sm rounded-lg bg-white shadow-lg p-6 text-center"
              >
                <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
                <p className="text-gray-600 mb-6">
                  Do you really want to close the modal?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={confirmClose}
                  >
                    Yes, Close
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    onClick={() => setShowConfirmClose(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
