import * as React from "react";
import logo from "../../assets/allianz-logo.svg";
import Logout from "../../pages/auth/Logout";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { auth } = useAuth(); // Get the auth data from context
  return (
    <>
      <nav className=" w-full border-gray-200 bg-[#003781]">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center justify-center  space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8 " alt="Flowbite Logo" />
          </a>

          <div className="w-fit sm:inline hidden  " id="navbar-default">
            <ul className="font-medium flex flex-row w-fit  md:p-0 mt-4   rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse     ">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3   rounded md:bg-transparent md:p-0 text-white "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              {auth?.user ? (
                <li>
                  <Logout /> {/* Show logout button if user is authenticated */}
                </li>
              ) : (
                <li>
                  <a
                    href="/login"
                    className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-gray-300"
                  >
                    Login
                  </a>
                </li>
              )}
              {auth?.user ? (
                <></>
              ) : (
                <li>
                  <a
                    href="/signup"
                    className="block py-2 px-3 rounded md:bg-transparent md:p-0 text-gray-300"
                  >
                    SignUp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
