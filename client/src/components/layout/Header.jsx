import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import Logout from "../../pages/auth/Logout";
import logo from "../../assets/allianz-logo.svg";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const headerContainerRef = useRef(null);
  const { auth } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const portalContent = headerContainerRef.current
    ? ReactDOM.createPortal(
        isDropdownOpen ? (
          <DropdownMenu auth={auth} closeDropdown={closeDropdown} />
        ) : null,
        headerContainerRef.current
      )
    : null;

  return (
    <header className="relative bg-[#003781] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a
          href="/"
          className="flex items-center justify-center  space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8 " alt="Flowbite Logo" />
        </a>
        <nav className="hidden md:flex space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          {auth?.user?.role === "admin" && (
            <a href="/admin" className="hover:underline">
              Dashboard
            </a>
          )}
          {auth?.user?.role === "user" && (
            <a href="/user" className="hover:underline">
              Dashboard
            </a>
          )}
          {auth?.user ? (
            <Logout style="flex items-center text-white mr-4 hover:text-gray-300" />
          ) : (
            <>
              <a href="/login" className="hover:underline">
                Login
              </a>
              <a href="/signup" className="hover:underline">
                SignUp
              </a>
            </>
          )}
        </nav>

        <div className="relative block sm:hidden">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 10l6 6 6-6"
              />
            </svg>
          </button>
          <div ref={headerContainerRef}></div>
        </div>
      </div>
      {portalContent}
    </header>
  );
};

export default Header;
