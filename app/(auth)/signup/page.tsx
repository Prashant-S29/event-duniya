import SIGNUP_FORM from "@/clientComponents/signup_form";
import Link from "next/link";
import React from "react";
import { IoHome } from "react-icons/io5";

const SIGNUP = () => {
  return (
    <>
      <div className="w-full flex items-center select-none">
        <div className="w-[50%] h-screen bg-gray-700" />
        <div className="p-7 flex justify-center items-center h-screen w-[50%] relative ">
          <Link href="/" className="absolute top-0 left-0 m-5">
            <div className=" flex bg-[#222222] border border-[#2E2E2E] rounded-[7px] px-4 py-2 items-center justify-center gap-3">
              <IoHome className="text-[16px] text-white" />
              <span className="text-[12px] font-medium text-gray-400">
                Back to Home
              </span>
            </div>
          </Link>
          <div>
            {/* logo */}
            <div className="flex justify-center">
              <div className="size-[50px] rounded-full bg-gray-700" />
            </div>
            <div className="text-center mt-5">
              <div>
                <span className="text-white text-[15px] font-medium">
                  Lets get you onboard
                </span>
              </div>
              <div className="leading-tight">
                <span className="text-[13px] text-gray-400">
                  Please enter your details to create a new account.
                </span>
              </div>
            </div>
            <div className="mt-5">
              <SIGNUP_FORM />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIGNUP;
