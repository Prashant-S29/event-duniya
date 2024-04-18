"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import SIGNUP_FORM_USER from "@/clientComponents/forms/signup_user";
import { FaRegCircleCheck } from "react-icons/fa6";
import SIGNUP_FORM_ARTIST from "@/clientComponents/forms/siginup_artist";
import { userSignUpOptions } from "@/contant";
import TOAST from "@/ui/toast";
import { useToastNotificationState } from "@/stateStore";

const SIGNUP = () => {
  const [selectedUserType, setSelectedUserType] = useState("");

  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const { desc, status, title } = useToastNotificationState();

  return (
    <>
      <div className="w-full flex items-center select-none">
        <div className="w-[40%] h-screen bg-gray-700" />
        <div className="p-7 flex justify-center items-center h-screen w-[60%] relative ">
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
                <span className="text-[14px] text-gray-400">
                  Please fill the details to create a new account
                </span>
              </div>
            </div>
            <div className="mt-5 w-[370px] flex overflow-hidden">
              <div
                className={`${
                  showSignUpForm ? "-translate-x-[370px]" : "translate-x-[0px]"
                } flex duration-300 ease-in-out`}
              >
                <div className="p-[10px]">
                  <div className="p-4 h-fit w-[350px] mt-3 bg-[#141414] border border-[#2E2E2E] rounded-[18px]">
                    {userSignUpOptions.map((details, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedUserType === details.userType.toLowerCase()
                            ? "border-gray-400"
                            : "border-[#2E2E2E] hover:border-gray-600"
                        } px-5 py-3 bg-[#222222] border relative rounded-[10px] mb-3 last:mb-0  duration-200`}
                        onClick={() => {
                          setSelectedUserType(details.userType.toLowerCase());
                        }}
                      >
                        <div className="size-[12px] rounded-full absolute top-0 right-0  flex justify-center items-center m-3 bg-[#222222] border border-gray-400">
                          {selectedUserType ===
                            details.userType.toLowerCase() && (
                            <div className="size-[7px]   bg-green-400 rounded-full" />
                          )}
                        </div>
                        <div>
                          <span className="text-[13px] font-medium text-white">
                            Sign Up as an {details.userType.toUpperCase()}
                          </span>
                        </div>
                        <div className="leading-tight mt-1 text-[13px] text-gray-400 ">
                          <div>
                            <span>
                              As an{" "}
                              {details.userType.charAt(0).toUpperCase() +
                                details.userType.slice(1)}
                              , you can
                            </span>
                          </div>
                          <ul className="pl-5 mt-2">
                            {details.userTypeDesc.map((desc, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-1 mt-1"
                              >
                                <FaRegCircleCheck className="text-green-400" />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-full" id="form-container">
                  {selectedUserType === "user" ? (
                    <div className="p-[10px] w-full h-full relative">
                      <SIGNUP_FORM_USER />
                    </div>
                  ) : (
                    <div className="p-[10px] w-full relative h-full">
                      <SIGNUP_FORM_ARTIST />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 w-full flex justify-between">
              <button
                disabled={showSignUpForm ? false : true}
                className={`w-fit flex gap-2 items-center  ${
                  showSignUpForm
                    ? "bg-[#141414] text-white"
                    : "text-gray-500 cursor-not-allowed"
                } border border-[#2E2E2E] rounded-[7px] pr-4 pl-3 py-2 duration-200 font-medium text-[13px]`}
                onClick={() => {
                  setShowSignUpForm(false);
                }}
              >
                <FaAngleLeft />
                Previous
              </button>
              <button
                disabled={
                  showSignUpForm || selectedUserType === "" ? true : false
                }
                className={`w-fit flex gap-2 items-center  ${
                  showSignUpForm || selectedUserType === ""
                    ? "text-gray-500 cursor-not-allowed"
                    : "bg-[#141414] text-white"
                } border border-[#2E2E2E] rounded-[7px] pr-4 pl-3 py-2 duration-200 font-medium text-[13px]`}
                onClick={() => {
                  setShowSignUpForm(true);
                }}
              >
                Next
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <TOAST title={title} desc={desc} status={status} />
    </>
  );
};

export default SIGNUP;
