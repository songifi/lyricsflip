"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Listbox } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

const MobileNav = ({ navItems, className, ...props }) => {
  const [selected, setSelected] = useState(navItems[0]);

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div
      className={`flex items-center justify-between px-8 bg-gray-100 ${className}`}
      {...props}
    >
      <button className="px-4 py-2 rounded-full bg-primary-main text-white text-xs">
        {selected.label}
      </button>

      <Listbox value={selected} onChange={handleSelect}>
        <div className="relative">
          <Listbox.Button className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-xs border border-gray-300 text-black">
            See More <IoIosArrowDown className="ml-2 text-xs" />
          </Listbox.Button>
          <Listbox.Options className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
            {navItems.map((item) => (
              <Listbox.Option key={item.href} value={item} as={React.Fragment}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={`block cursor-pointer px-4 py-2 text-sm transition duration-200 ${
                      active
                        ? "bg-primary-main text-white hover:bg-primary-main"
                        : "text-black hover:bg-primary-main hover:text-white"
                    }`}
                  >
                    <div className="flex justify-center">
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

MobileNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      count: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

MobileNav.defaultProps = {
  className: "",
};

export default MobileNav;
