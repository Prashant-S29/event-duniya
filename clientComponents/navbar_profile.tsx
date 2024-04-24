"use client";

import React from "react";
import CLICK_EFFECT from "./clickEffect";
import getSessionFromServer from "@/lib/getServerSession";
import NAV_PROFILE from "./navbarProfile";
import { Session } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";

const NAVBAR_PROFILE = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="relative">
        {session?.user ? (
          <NAV_PROFILE />
        ) : (
          <div className="flex items-center ">
            <button
              onClick={() => {
                signIn("google", { callbackUrl: "/" });
              }}
              className="px-5 py-2 rounded-full bg-[#DD5000] text-white font-semibold text-[13px]"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NAVBAR_PROFILE;
