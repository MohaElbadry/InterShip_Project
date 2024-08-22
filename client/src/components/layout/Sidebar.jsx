import React from "react";
import "./index.css";
const Sidebar = () => (
  <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900  h-full text-white transition-all duration-300 border-none z-10 sidebar">
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
            href="/user"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
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
            href="/user/vehicles"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
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
            href="/user/claim"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              📄
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Claim</span>
            <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
              New
            </span>
          </a>
        </li>
        <li>
          <a
            href="/user/accident"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
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
            href="/user/insurance"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              🛡️
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Insurance
            </span>
          </a>
        </li>
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center mt-5 h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              Settings
            </div>
          </div>
        </li>
        <li>
          <a
            href="/user/profile"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              👤
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
