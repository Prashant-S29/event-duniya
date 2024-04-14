"use client";

import { heroBentoLinks } from "@/contant";
import React, { useEffect, useState } from "react";

const SERVICES = () => {
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeCard >= heroBentoLinks.length - 1) {
        setActiveCard(0);
      } else {
        setActiveCard((activeCard) => activeCard + 1);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [activeCard, setActiveCard]);

  return (
    <>
      <div className="w-full flex justify-evenly items-center mt-5 px-5 gap-[10px]">
        {heroBentoLinks.map((value, index) => (
          <div
            key={index}
            className={`${
              index === activeCard
                ? "w-[40%] cursor-default"
                : "w-[20%] cursor-pointer"
            } h-[300px] bg-[#222222] border text-white relative flex justify-center overflow-hidden items-end bg-no-repeat bg-cover bg-bottom border-[#2E2E2E] rounded-[40px] duration-500 ease-in-out`}
            style={{ backgroundImage: `url(${value.image.src})` }}
            onClick={() => {
              setActiveCard(index);
            }}
          >
            <div className="absolute left-0 bottom-0 w-full ">
              <div className="w-full h-[60px] bg-gradient-to-t from-[#141414] to-[#14141400]" />
              <div className="w-full bg-[#141414] py-4 px-7 pt-0">
                <div>
                  <span className="text-[15px] font-semibold">
                    {value.link}
                  </span>
                </div>
                <div
                  className={`${
                    index === activeCard ? "h-[40px]" : "h-0"
                  } duration-200 overflow-hidden leading-tight line-clamp-2 ease-in-out`}
                >
                  <span className="text-[13px] text-gray-300">
                    {value.desc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full gap-3 mt-3">
        {heroBentoLinks.map((value, index) => (
          <div
            key={index}
            className={`${
              index === activeCard ? "w-[30px]" : "w-[5px]"
            } h-[5px] bg-gray-500 rounded-full relative  duration-500 overflow-hidden `}
          >
            {index === activeCard && (
              <div className="absolute timeLeft-animation  h-full bg-gray-300 rounded-full ease-linear" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SERVICES;
