import * as React from "react";
import Header from "../../components/layout/Header";
import logo from "../../assets/allianz-logo-2.svg";

export default function LogIn() {
  return (
    <>
      <Header />
      <div class="overflow-hidden flex justify-center items-center bg-white">
        <div class="p-10  border-[2px] pb-0 mt-0 sm:mt-4 border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <div class="py-8  flex justify-center">
            <img class="-mt-6  sm:w-1/4 w-1/2" src={logo} />
          </div>
          <input
            class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
            placeholder="E-Mail or Phone number"
          />
          <div class="flex flex-col space-y-1">
            <input
              class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Password"
            />
            <p class="font-bold text-[#0070ba]">Forgot password?</p>
          </div>
          <div class="flex flex-col items-center  space-y-5 w-full">
            <button class="w-3/4 sm:w-1/2  bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">
              Log in
            </button>
            <div class="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
              <div class="-mt-1 font-bod bg-white px-5 absolute">Or</div>
            </div>
            <button class="w-3/4 sm:w-1/2  border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200">
              Sign Up
            </button>
          </div>
          <div class="flex space-x-1 p-20 text-sm">
            <p class="hover:underline cursor-pointer">Proximité</p>
            <div class="border-r-[1px] border-r-slate-300"></div>
            <p class="font-bold hover:underline cursor-pointer">Expertise</p>
          </div>
        </div>

        <div class="absolute bottom-0 w-full p-3 bg-[#f7fbff] flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666]">
          <a
            href="https://www.paypal.com/us/smarthelp/contact-us"
            target="_blank"
            class="hover:underline underline-offset-1 cursor-pointer"
          >
            Contact Us
          </a>
          <a
            href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
            target="_blank"
            class="hover:underline underline-offset-1 cursor-pointer"
          >
            Privacy
          </a>
          <a
            href="https://www.paypal.com/de/webapps/mpp/ua/legalhub-full"
            target="_blank"
            class="hover:underline underline-offset-1 cursor-pointer"
          >
            Legal
          </a>
          <a
            href="https://www.paypal.com/de/webapps/mpp/ua/upcoming-policies-full"
            target="_blank"
            class="hover:underline underline-offset-1 cursor-pointer"
          >
            Policy{" "}
          </a>
          <a
            href="https://www.paypal.com/de/webapps/mpp/country-worldwide"
            target="_blank"
            class="hover:underline underline-offset-1 cursor-pointer"
          >
            Worldwide{" "}
          </a>
        </div>
      </div>
    </>
  );
}
