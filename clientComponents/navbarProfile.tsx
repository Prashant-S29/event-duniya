"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import KeyStrokeBinder from "@/lib/keyStrokeBinder";
import { useUserProfile } from "@/stateStore";
import Link from "next/link";
import { User } from "@prisma/client";
import Image from "next/image";

const NAV_PROFILE = () => {
  const { data: session } = useSession();

  const { showUserProfile, setShowUserProfile } = useUserProfile();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const handleShowProfile = () => {
    setShowUserProfile(!showUserProfile);
  };
  KeyStrokeBinder({
    keyStroke: "escape",
    action: handleShowProfile,
  });

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const data = await signOut();
    if (data) {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-center select-none relative items-center gap-3 cursor-pointer"
        onClick={() => {
          setShowUserProfile(!showUserProfile);
        }}
      >
        {isSigningOut ? (
          <div>
            <span className="text-gray-400 text-[14px]">Processing...</span>
          </div>
        ) : (
          <>
            {/* <div className="size-[30px] rounded-full bg-gray-300" /> */}
            {session?.user.image && (
              <div>
                <Image
                  src={session.user.image}
                  alt={`${session?.user.name}`}
                  className="size-[30px] rounded-full"
                  width={30}
                  height={30}
                />
              </div>
            )}
            <div className="text-ellipsis w-[100px] overflow-hidden whitespace-nowrap">
              <span className="text-[14px]">{session?.user.name}</span>
            </div>
          </>
        )}
        <div
          className={`${
            showUserProfile ? "rotate-180" : "rotate-0"
          } duration-200`}
        >
          <FaAngleDown className="text-[14px]" />
        </div>
      </div>
      <div
        className={`absolute z-50 w-full mt-2 top-[100%] ${
          showUserProfile
            ? "h-[200px] opacity-100 scale-100"
            : "h-0 opacity-0 scale-95"
        } overflow-hidden duration-200 select-none`}
      >
        <div className=" rounded-[10px] border border-[#2E2E2E] bg-[#222222]">
          <Link
            href="/user-profile"
            className="px-4 py-3 flex items-center gap-2 bg-[#222222] hover:bg-[#2E2E2E] rounded-t-[9px] duration-200 cursor-pointer"
            onClick={() => {
              setShowUserProfile(false);
            }}
          >
            <CgProfile />
            <div className="leading-none">
              <span className="text-[13px] text-white">Profile</span>
            </div>
          </Link>
          <Link
            href=""
            className="px-4 py-3  bg-[#222222] flex items-center gap-2 hover:bg-[#2E2E2E] duration-200 cursor-pointer"
            onClick={() => {
              setShowUserProfile(false);
            }}
          >
            <IoIosSettings />
            <div className="leading-none">
              <span className="text-[13px] text-white">Settings</span>
            </div>
          </Link>
          <button
            disabled={isSigningOut}
            className={`px-4 w-full py-3  flex items-center  gap-2 bg-[#222222] hover:bg-[#2E2E2E] rounded-b-[9px] duration-200 cursor-pointer ${
              isSigningOut ? "text-gray-400 cursor-not-allowed" : "text-white"
            }`}
            onClick={() => {
              handleSignOut();
              setShowUserProfile(false);
            }}
          >
            <PiSignOutBold />
            <div className="leading-none">
              <span className="text-[13px] ">
                {isSigningOut ? "Processing..." : "Sign Out"}
              </span>
            </div>
          </button>
          <div className="p-1 m-1 float-end flex">
            <span className="text-[10px] text-gray-400">
              <span className="px-[6px] py-[2px] text-white  bg-[#2E2E2E] rounded-[3px]">
                Esc
              </span>{" "}
              to toggle
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NAV_PROFILE;
