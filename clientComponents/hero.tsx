import React from "react";
import { BsStars } from "react-icons/bs";

import { Lobster } from "next/font/google";
import CLICK_EFFECT from "./clickEffect";
import LIVE_EVENTS from "./liveEvents";
const lobster = Lobster({ weight: "400", subsets: ["cyrillic"] });

const HERO = () => {
  return (
    <>
    <LIVE_EVENTS/>
      <div className="flex justify-center">
        <div className="text-center px-5 py-2 border border-gray-500 bg-gray-700 rounded-full flex items-center gap-2">
          <BsStars />
          <div className="leading-none">
            <span className="text-[12px] font-medium ">
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
        <div className="flex justify-center items-center gap-2 mt-3 ">
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
          <div className="w-[250px] h-[80px] bg-gray-500 rounded-full" />
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-[140px] h-[80px] bg-gray-500 rounded-full" />

          <div>
            <span className="text-[38px] font-bold">for all your</span>
          </div>
          <div>
            <span
              className={`${lobster.className} text-[48px] font-bold text-[#DD5000]`}
            >
              Events !
            </span>
          </div>
        </div>
        <div className="text-center mt-5">
          <span className="text-[15px] font-medium text-gray-300">
            We help you to perfectly host, manage and execute your event with
            all the requierment before hands.
            <br /> Get started with our servises and enjoy the show without
            worries.
          </span>
        </div>
        <div className="flex justify-center mt-5 gap-[30px]">
          <CLICK_EFFECT>
            <button className="px-7 py-4 rounded-full bg-[#DD5000] text-white font-semibold text-[13px]">
              Promote your Event &rarr;
            </button>
          </CLICK_EFFECT>
          <button className="px-7 py-4 rounded-full  text-white font-semibold text-[13px]">
            Book Artists for you Event
          </button>
        </div>
      </div>
    </>
  );
};

export default HERO;
