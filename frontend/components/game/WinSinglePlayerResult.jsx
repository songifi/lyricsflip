import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import { theme } from "@/theme";

const WinMultiplayerResult = ({ isOpen, onClose, className, ...props }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 backdrop-blur-[1px] flex justify-center items-center z-50 ${className}`}
      style={{ backgroundColor: `${theme.colors.text.primary}40` }}
      {...props}
    >
      <div
        className="rounded-lg w-full max-w-[1008px] shadow-lg relative"
        style={{ backgroundColor: theme.colors.background.default }}
      >
        {/* Header */}
        <div
          className="px-12 py-6 border-b rounded-xl flex justify-between items-center"
          style={{
            backgroundColor: theme.colors.background.paper,
            borderColor: theme.colors.background.default,
          }}
        >
          <div className="flex flex-col gap-4">
            <div
              className="border rounded-full p-1 pr-3 flex items-center gap-3"
              style={{
                borderColor: theme.colors.background.default,
                backgroundColor: theme.colors.background.default,
              }}
            >
              <div
                className="w-18 h-18 rounded-full flex items-center justify-center p-2 border"
                style={{
                  backgroundColor: theme.colors.status.success + "20",
                  borderColor: theme.colors.status.success,
                }}
              >
                <Image
                  src="/img/argent.svg"
                  alt="badge icon"
                  width={24}
                  height={21}
                />
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: theme.colors.text.primary }}
              >
                00134dyh45yhc...55e1
              </p>
            </div>
            <div className="flex items-center">
              <span
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                Difficulty:
                <strong
                  className="pl-2"
                  style={{ color: theme.colors.text.primary }}
                >
                  Beginner
                </strong>
              </span>
              <div className="w-6 h-6 pl-1">
                <Image
                  src="/img/star.svg"
                  alt="badge icon"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button onClick={onClose} className="hover:text-gray-800">
              <div
                className="w-8 h-8 p-2 rounded-full border"
                style={{ borderColor: theme.colors.background.default }}
              >
                <Image
                  src="/img/close.svg"
                  alt="badge icon"
                  width={24}
                  height={24}
                />
              </div>
            </button>
            <p style={{ color: theme.colors.text.secondary }}>
              Time left:{" "}
              <span
                className="font-bold"
                style={{ color: theme.colors.status.success }}
              >
                05:00
              </span>
            </p>
          </div>
        </div>

        {/* Icon and Result */}
        <div className="text-center flex flex-col items-center my-8 p-8">
          <div className="w-[160px] h-[160px]">
            <Image
              src="/img/cup.svg"
              alt="badge icon"
              width={160}
              height={160}
            />
          </div>
          <h2
            className="text-2xl mt-4 font-bold"
            style={{ color: theme.colors.text.primary }}
          >
            <span style={{ color: theme.colors.primary.light }}>
              368 Points
            </span>{" "}
            - You are amazingggg 🔥
          </h2>
          <p
            className="mt-3 w-full max-w-[620px]"
            style={{ color: theme.colors.text.secondary }}
          >
            Lorem ipsum dolor sit amet. Et laborum itaque qui sunt alias et
            laboriosam facilis et harum harum et laboriosam repellendus. Nam
            quia commodi non voluptatibus maxime et fugiat omnis qui pariatur
            quam eum tempore commodi.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 w-full max-w-[598px] mx-auto mt-[120px] mb-[60px] relative z-[1]">
          <button
            className="px-8 py-6 rounded-full w-full"
            style={{
              backgroundColor: theme.colors.primary.light,
              color: theme.colors.text.primary,
            }}
          >
            Play Again
          </button>
        </div>
        <div className="top-0 left-0 right-0 w-full">
          <Image
            src="/img/confetti.png"
            alt="badge icon"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

// ✅ **Adding PropTypes for Proper Validation**
WinMultiplayerResult.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

WinMultiplayerResult.defaultProps = {
  className: "",
};

export default WinMultiplayerResult;
