import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";
import { NetworkSelector } from "./NetworkSelector";

const navigation = [
  { name: "Home", current: true, to: "/", key: 0 },
  { name: "Accounts", current: false, to: "/accounts", key: 1 },
  { name: "Transactions", current: false, to: "/transactions", key: 2 },
  { name: "Block", current: false, to: "/block", key: 3 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = ({network , onSelect}) => {
  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.2"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.to} key={item.key}>
                        <span
                          key={item.name}
                          onClick={() => setCurrentTab(item.name)}
                          className={classNames(
                            window.location.pathname === item.to
                              ? "bg-gray-900 text-white"
                              : "text-gray-900 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    <NetworkSelector network={network} onSelect={onSelect}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
