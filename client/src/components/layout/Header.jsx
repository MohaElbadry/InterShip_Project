import * as React from "react";
import logo from "../../assets/allianz-logo.svg";
export default function Login() {
  return (
    <>
      <nav className=" w-full border-gray-200 bg-[#005C9E]">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center justify-center  space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} class="h-8 " alt="Flowbite Logo" />
          </a>

          <div className="w-fit sm:inline hidden  " id="navbar-default">
            <ul class="font-medium flex flex-row w-fit  md:p-0 mt-4   rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse     ">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3   rounded md:bg-transparent md:p-0 text-white "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3   rounded md:bg-transparent md:p-0 text-gray-300 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3   rounded md:bg-transparent md:p-0 text-gray-300 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3   rounded md:bg-transparent md:p-0 text-gray-300 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
