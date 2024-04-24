import NAVLINK from "@/clientComponents/navlink";
import Link from "next/link";
import React from "react";
import CLICK_EFFECT from "../clientComponents/clickEffect";
import getSessionFromServer from "@/lib/getServerSession";
import NAV_PROFILE from "@/clientComponents/navbarProfile";
import NAVBAR_PROFILE from "@/clientComponents/navbar_profile";

const NAVBAR = async () => {
  const session = await getSessionFromServer();
  console.log("session", session);

  const handleSignUpWithGoogle = () => {};
  const handleLoginWithGoogle = () => {};

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
              <NAVLINK href="/promote-event" text="Promote your Event" />
            </li>
            <li className="px-5">
              <NAVLINK href="/" text="Contact Us" />
            </li>
          </ul>
        </div>
        {/* <div className="relative">
          {session?.user ? (
            <NAV_PROFILE
              user={
                session.user && {
                  ...session.user,
                  email: session.user.email || "",
                }
              }
            />
          ) : (
            <div className="flex items-center ">
              <CLICK_EFFECT>
                <button
                  onClick={() => {
                    handleSignUpWithGoogle();
                  }}
                  className="px-5 py-2 rounded-full bg-[#DD5000] text-white font-semibold text-[13px]"
                >
                  Sign Up
                </button>
              </CLICK_EFFECT>
              <button
                onClick={() => {
                  handleLoginWithGoogle();
                }}
                className="px-5 py-2 rounded-full  text-white font-semibold text-[13px]"
              >
                Login
              </button>
            </div>
          )}
        </div> */}
        <NAVBAR_PROFILE />
      </nav>
    </>
  );
};

export default NAVBAR;
