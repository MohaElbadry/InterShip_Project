import React from "react";
import img from "../assets/6.png";
const NotFound = () => {
  return (
    <>
      <section className="h-full w-full relative overflow-hidden z-10 bg-[#1d1a1d] min-h-screen">
        <div className="container mx-auto ">
          <div className="-mx-4 flex  h-screen items-center">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-[#c4f9d6]">
                  Oops! That page can’t be found
                </h4>
                <img src={img} alt="404" className="mx-auto scale-110 mb-2" />
                <a
                  href="/"
                  className="inline-block rounded-lg border text-[#FFFFFF] border-black  px-8 py-3 text-center text-base font-semibold bg-[#a09b9b] transition hover:bg-white hover:text-primary"
                >
                  Go To Home
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
