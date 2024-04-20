
import NAVLINK from "@/clientComponents/navlink";
import Link from "next/link";
import React from "react";
import CLICK_EFFECT from "../clientComponents/clickEffect";
import getSessionFromServer from "@/lib/getServerSession";
import NAV_PROFILE from "@/clientComponents/navbarProfile";
import { useUserProfile } from "@/stateStore";

const NAVBAR = async () => {
  const session = await getSessionFromServer();
  return (
    <>
      <nav className="w-full flex justify-evenly items-center z-[20]  h-[80px] bg-[#141414] text-white sticky top-0 ">
        <div className="flex justify-center items-center gap-2">
          <div>{/* LOGO HERE */}</div>
          <div>
            <span>Event Duniya</span>
          </div>
        </div>
        <div>
          <ul className="flex items-center gap-5 text-[14px] text-white">
            <li className="px-5">
              <NAVLINK href="/" text="Book Artists" />
            </li>
            <li className="px-5">
              <NAVLINK href="/" text="Explore All Events" />
            </li>
            <li className="px-5">
              <NAVLINK href="/" text="Promote your Event" />
            </li>
            <li className="px-5">
              <NAVLINK href="/" text="Contact Us" />
            </li>
          </ul>
        </div>
        <div className="relative">
          {session?.user.userName ? (
            <NAV_PROFILE userName={session.user.userName} />
          ) : (
            <div className="flex items-center ">
              <CLICK_EFFECT>
                <Link prefetch href="/signup">
                  <button className="px-5 py-2 rounded-full bg-[#DD5000] text-white font-semibold text-[13px]">
                    Sign Up
                  </button>
                </Link>
              </CLICK_EFFECT>
              <Link prefetch href="/api/auth/signin">
                <button className="px-5 py-2 rounded-full  text-white font-semibold text-[13px]">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NAVBAR;
