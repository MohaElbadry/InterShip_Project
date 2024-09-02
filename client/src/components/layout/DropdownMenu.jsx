import React from "react";
import Logout from "../../pages/auth/Logout";

const DropdownMenu = ({ closeDropdown, auth }) => (
  <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
    <ul className="list-none p-2">
      {auth?.user?.role === "admin" && (
        <li>
          <a
            href="/admin"
            className="block py-2 px-3 text-black hover:bg-gray-100"
            onClick={closeDropdown}
          >
            Dashboard
          </a>
        </li>
      )}
      {auth?.user?.role === "user" && (
        <li>
          <a
            href="/user"
            className="block py-2 px-3 text-black hover:bg-gray-100"
            onClick={closeDropdown}
          >
            Dashboard
          </a>
        </li>
      )}
      {auth?.user ? (
        <li>
          <Logout style="block py-2 px-3 text-black hover:bg-gray-100" />
        </li>
      ) : (
        <>
          <li>
            <a
              href="/login"
              className="block py-2 px-3 text-black hover:bg-gray-100"
              onClick={closeDropdown}
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="block py-2 px-3 text-black hover:bg-gray-100"
              onClick={closeDropdown}
            >
              SignUp
            </a>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default DropdownMenu;
