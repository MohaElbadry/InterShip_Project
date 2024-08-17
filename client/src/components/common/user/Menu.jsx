import React from "react";
import { useAuth } from "../../../context/AuthContext";
import Logout from "../../../pages/auth/Logout";

export default function Menu() {
  const { auth } = useAuth();
  return (
    <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 border-none">
        <a href="/user/profile">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
          src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
          alt="Avatar"
          />
          </a>
        <span className="hidden md:block">{auth.user.name}</span>
      </div>
      <div className="flex flex-row-reverse justify-between h-14 bg-blue-800 header-right">
        <ul className="flex items-center">
          <li>
            <Logout style="flex items-center mr-4 hover:text-blue-100" />
          </li>
        </ul>
      </div>
    </div>
  );
}
