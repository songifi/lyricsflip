"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); 

  const navItems = [
    {
      href: "/contributors/total",
      count: "112,000",
      label: "Total Contributors",
    },
    {
      href: "/contributors/monthly",
      count: "12,000",
      label: "Monthly Contributors",
    },
    {
      href: "/contributors/weekly",
      count: "3",
      label: "Weekly Contributors",
    },
    {
        href: "/contributors/daily",
        count: "5",
        label: "Daily Contributors",
      },
  ];

  return (
    <div className="flex grow flex-col mt-5  ">
      
      <div className="flex flex-col gap-y-9 px-10">
        <h2 className="font-bold text-3xl">Our Contributors</h2>
        <p className="text-sm text-justify">
          Meet the amazing Contributors who have helped make this project
          possible. Click on a profile to learn more about their work.
        </p>
      </div>

        <div className="flex flex-col mt-20 gap-y-6">
                
      {navItems.map((item) => (
        <div className="pl-10 " key={item.href}>
          <Link href={item.href}>
            <div
              className={`p-5 rounded-l-lg ${
                pathname === item.href
                  ? "bg-white text-black"
                  : "hover:bg-gray-400"
              }`}
            >
              <div className="flex-col gap-7 justify-items-center">
                <h2 className="font-bold text-[32px]">{item.count}</h2>
                <p className="text-base font-bold">{item.label}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
        </div>
    </div>
  );
};

export default Sidebar;
