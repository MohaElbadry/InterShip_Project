import React from "react";

export default function SidebarDark() {
  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 z-10">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Main
              </div>
            </div>
          </li>
          <li>
            <a
              href="/admin/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-300 border-l-4 border-transparent hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                🏠
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a
              href="/admin/vehicles"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-300 border-l-4 border-transparent hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                🚗
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Vehicles
              </span>
            </a>
          </li>
          <li>
            <a
              href="/admin/policies"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-300 border-l-4 border-transparent hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                📜
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Policies
              </span>
            </a>
          </li>
          <li>
            <a
              href="/admin/claims"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-300 border-l-4 border-transparent hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                📄
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Claims
              </span>
            </a>
          </li>
          <li>
            <a
              href="/admin/accidents"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-300 border-l-4 border-transparent hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                💥
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Accidents
              </span>
            </a>
          </li>
          <li>
            <a
              href="/admin/users"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-300 border-l-4 border-transparent hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                👥
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Users</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
