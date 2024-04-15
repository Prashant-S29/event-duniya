"use client";

import React, { useState } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

const LIVE_EVENTS = () => {
  const [showLiveEventList, setShowLiveEventList] = useState(false);

  return (
    <>
      <div
        className="flex bg-[#DD5000] fixed z-30 right-0 rounded-l-full px-2 cursor-pointer"
        onClick={() => {
          setShowLiveEventList(true);
        }}
      >
        <div className="size-[70px] rounded-full bg-[#DD5000] flex justify-center items-center">
          <FaAnglesLeft className="text-white" />
        </div>
        <div className="py-3 bg-[#DD5000] flex items-center">
          <span className="text-[14px] font-semibold text-white">
            Live Events
          </span>
        </div>
      </div>

      <div
        className={`flex fixed top-0  z-40 duration-300 ${
          showLiveEventList ? "right-0" : "-right-[100%]"
        }`}
        onClick={() => {
          setShowLiveEventList(false);
        }}
      >
        <div className="w-[200px] h-screen bg-gradient-to-r from-[#14141400] to-[#141414] flex justify-end items-center">
          <FaAnglesRight className="text-white" />
        </div>
        <div className="w-[400px] h-screen bg-[#141414] p-5 overflow-y-scroll">
          {Array(10)
            .fill(" ")
            .map((value, index) => (
              <div
                key={index}
                className="w-full h-[200px] my-3 bg-[#222222] border border-[#2E2E2E] rounded-[40px]"
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default LIVE_EVENTS;
