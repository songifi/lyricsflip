"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import contributorsList from "@/app/data/contributors.json";
import { IoIosArrowDown } from "react-icons/io";
import { PiDotsSixVertical } from "react-icons/pi";
import { Listbox, Dialog } from "@headlessui/react";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCopy } from "react-icons/fa";
import { getContributors } from "@/hooks/contributors";

const Total = () => {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllContributors();
  }, []);

  const getAllContributors = () => {
    getContributors({
      owner: "songifi",
      repo: "lyricsflip",
    })
      .then((contributors) => {
        const sortedContributors = contributors.sort(
          (a, b) => b.contributions - a.contributions
        );
        setContributors(sortedContributors);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const SkeletonRow = ({ isMobile = false }) => (
    <tr className="border-b last:border-b-0">
      {/* Badge Column */}
      <td className={`px-4 py-2 ${!isMobile ? "w-[150px]" : ""} text-center`}>
        <div className="flex items-center justify-between">
          {!isMobile && <PiDotsSixVertical className="text-gray-400" />}
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </td>

      {/* Contributors Column */}
      <td className="flex flex-col gap-y-4 px-4 pt-3 items-center">
        <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </td>

      {/* Action Column */}
      <td className="px-4 py-2 text-center">
        <div className="h-8 bg-gray-200 rounded-full w-24 mx-auto animate-pulse" />
      </td>
    </tr>
  );

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden sm:block container mx-auto p-10 text-black">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Contributors</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={`desktop-skeleton-${index}`} />
              ))
            ) : (
              contributors.map((contributor, index) => (
                <tr
                  key={contributor.id}
                  className="border-b last:border-b-0 hover:bg-[#70E3C7]"
                >
                  <td className="px-4 py-2 w-[150px] text-center">
                    <div className="flex items-center justify-between">
                      <PiDotsSixVertical />
                      {index > 2 ? (
                        <span className="w-12 text-base">{index + 1}</span>
                      ) : (
                        <div className="relative w-10 h-10">
                          <Image
                            src={
                              index === 0
                                ? "/Star.png"
                                : index === 1
                                ? "/Star2.png"
                                : "/Star3.png"
                            }
                            alt={`${contributor.badge} Star`}
                            width={48}
                            height={48}
                            className="absolute top-0 left-0"
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="flex flex-col gap-y-4 px-4 pt-3 items-center">
                    <div className="overflow-hidden">
                      <Image
                        src={contributor.avatar_url}
                        alt="pf"
                        width={32}
                        height={32}
                        className="size-7 rounded-full object-fill"
                      />
                    </div>
                    <span className="flex text-base font-medium">
                      {contributor.login}
                    </span>
                  </td>

                  <td className="px-4 py-2 text-center">
                    <button className="px-10 py-2 rounded-full bg-teal-500 text-black font-normal text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="sm:hidden container mx-auto p-4 text-black">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2 text-sm">Contributors</th>
              <th className="px-4 py-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRow key={`mobile-skeleton-${index}`} isMobile />
              ))
            ) : (
              contributors.map((contributor, index) => (
                <tr
                  key={contributor.id}
                  className="border-b last:border-b-0 hover:bg-[#70E3C7]"
                >
                  <td className="px-1 py-2 text-center">
                    <div className="flex items-center justify-between">
                      {index > 2 ? (
                        <span className="w-9 text-base">{index + 1}</span>
                      ) : (
                        <div className="relative w-10 h-10">
                          <Image
                            src={
                              index === 0
                                ? "/Star.png"
                                : index === 1
                                ? "/Star2.png"
                                : "/Star3.png"
                            }
                            alt={`${contributor.badge} Star`}
                            width={24}
                            height={24}
                            className="absolute top-2 left-2"
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="flex flex-col gap-y-4 px-2 pt-3 items-center">
                    <div className="overflow-hidden">
                      <Image
                        src={contributor.avatar_url}
                        alt="pf"
                        width={24}
                        height={24}
                        className="size-5 rounded-full object-fill"
                      />
                    </div>
                    <span className="flex text-xs font-medium">
                      {contributor.login}
                    </span>
                  </td>

                  <td className="px-1 py-2 text-center">
                    <button className="px-10 py-2 rounded-full bg-teal-500 text-black font-normal text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Total;