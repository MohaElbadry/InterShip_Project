import React from "react";
import pic from "../../assets/ir-irapp2.webp";

const Hero = () => {
  return (
    <>
      <div className="relative bg-white pb-[55px] pt-[30px] lg:pt-[50px]">
        <div className="container">
          <div className="mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
                  Allianz achieves record profits in first half of 2024
                </h1>
                <p className="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6">
                  We are delighted that Paris 2024 marked our first experience
                  as the Worldwide Insurance Partner for the full Summer Olympic
                  Games. It has been exhilarating to witness the athletes' hard
                  work and dedication come to fruition in front of enthusiastic,
                  full-capacity crowds.
                </p>

                <div className="clients pt-4">
                  <h6 className="mb-6 flex items-center text-xs font-normal text-body-color dark:text-dark-6">
                    Some Of Our Clients
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                  <div className="flex items-center space-x-4">
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/ayroui.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src={pic}
                    alt="hero"
                    className="max-w-full scale-125 lg:ml-auto"
                  />
                  <span className="absolute -bottom-16 -left-14  z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SECTION_2 */}
      <section className=" px-4 sm:px-6 md:px-8  pb-10 lg:pt-[10px] lg:pb-20 bg-[#f1f9fa] dark:bg-dark">
        <div className="container  mx-auto w-full max-w-[1200px]">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20 mt-4">
                <h2 className=" text-3xl font-bold text-[#003781] sm:text-4xl md:text-[40px] ">
                  Latest news
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-4">
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="w-full mb-5">
                <div className="mb-8 overflow-hidden rounded">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-01.jpg"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-dark rounded bg-primary">
                    Dec 22, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                      Allianz achieves record profits in first half of 2024
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="w-full mb-10">
                <div className="mb-8 overflow-hidden rounded">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-02.jpg"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-dark rounded bg-primary">
                    Mar 15, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                      Allianz SE has decided to expand the total volume of share
                      buy-backs in the financial year 2024
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="w-full mb-10">
                <div className="mb-8 overflow-hidden rounded">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-03.jpg"
                    alt="image"
                    className="w-full"
                  />
                </div>
                <div>
                  <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-dark rounded bg-primary">
                    Jan 05, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="inline-block mb-4 text-xl font-semibold text-dark dark:text-white hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
                    >
                      Allianz pledges long-term commitment to rugby through
                      multi-year RFU partnership
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
