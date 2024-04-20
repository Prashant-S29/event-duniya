import React from "react";
import { BsStars } from "react-icons/bs";

import { Lobster } from "next/font/google";
import CLICK_EFFECT from "./clickEffect";
import LIVE_EVENTS from "./liveEvents";
import Image from "next/image";
import { imgOne, imgTwo } from "@/public";
import SERVICES from "./bentoLinks";
const lobster = Lobster({ weight: "400", subsets: ["cyrillic"] });

const HERO = () => {
  return (
    <>
      {/* <LIVE_EVENTS /> */}
      <div className="flex justify-center">
        <div className="text-center px-5 py-2 border border-[#2E2E2E] bg-[#222222] rounded-full flex items-center gap-2">
          <BsStars className="text-yellow-500" />
          <div className="leading-none">
            <span className="text-[12px] font-medium text-white ">
              Helping people to find their favourite artists
            </span>
          </div>
        </div>
      </div>
      {/* <div>
        <span>providing exception servises since @2024</span>
      </div> */}
      <div>
        {/* <div className="text-center py-3">
          <span className="text-[14px]">
            Are you planning to host an event? We got you!
          </span>
        </div> */}
        <div className="flex justify-center items-center gap-2 mt-3 text-white">
          <div>
            <span className="text-[38px] font-bold">We provide</span>
          </div>
          <div>
            <span
              className={`${lobster.className} text-[48px] font-bold text-[#DD5000]`}
            >
              Solutions
            </span>
          </div>
          <div className="w-[250px] h-[80px] ">
            <Image
              src={imgOne}
              alt="imgOne"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 text-white">
          <div className="w-[140px] h-[80px] ">
            <Image
              src={imgTwo}
              alt="imgTwo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <span className="text-[38px] font-bold">for all your</span>
          </div>
          <div>
            <span
              className={`${lobster.className} text-[48px] font-bold text-[#DD5000]`}
            >
              Event needs !
            </span>
          </div>
        </div>
        <div className="text-center mt-5">
          <span className="text-[15px]  text-gray-300">
            We help you to perfectly host, manage and execute your event with
            all the requierment before hands.
            <br /> Get started with our services and enjoy the show without
            worries.
          </span>
        </div>
        <div className="flex justify-center my-5 gap-[30px]">
          <CLICK_EFFECT>
            <button className="px-7 py-4 rounded-full bg-[#DD5000] text-white font-semibold text-[13px]">
              Promote your Event
            </button>
          </CLICK_EFFECT>
          <CLICK_EFFECT>
            <button className="px-[27px] py-[15px] rounded-full  text-white border border-[#DD5000] font-medium text-[13px]">
              Book Artists for you Event
            </button>
          </CLICK_EFFECT>
        </div>
        <SERVICES />
      </div>
    </>
  );
};

export default HERO;
