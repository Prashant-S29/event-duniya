"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { FaAngleDown } from "react-icons/fa";

const SIGN_OUT = ({ userName }: { userName: string }) => {
  return (
    <>
      <div
        className="flex justify-center items-center gap-3"
        // onClick={() => {
        //   signOut();
        // }}
      >
        <div className="size-[30px] rounded-full bg-gray-300" />
        <div>
          <span className="text-[14px]">{userName}</span>
        </div>
        <div>
          <FaAngleDown className="text-[14px]" />
        </div>
      </div>
    </>
  );
};

export default SIGN_OUT;
