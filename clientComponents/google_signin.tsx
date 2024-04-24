"use client";

import { useToastNotificationState } from "@/stateStore";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const GOOGLE_SIGNIN = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToastNotification } = useToastNotificationState();
  const hideToastNotification = (duration: number) => {
    const timeOut = setTimeout(() => {
      setToastNotification("", "", "success");
    }, duration);
    return () => {
      clearTimeout(timeOut);
    };
  };
  const handleSingInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const res = await signIn("google", {
        callbackUrl: "/",
      });
      if (res?.ok) {
        setToastNotification(
          "Success",
          "You are now beign redirected to home page",
          "success"
        );
      }
      console.log(res);
      // throw new Error();
    } catch (error) {
      console.log(error);
      setToastNotification(
        "Login Failed",
        "Unable to login. Try again",
        "error"
      );
      hideToastNotification(5000);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-[350px]">
        <button
          disabled={isLoading}
          className={`w-full flex bg-[#222222] ${
            isLoading ? "text-gray-400 cursor-not-allowed" : "text-white"
          } border border-[#2E2E2E]  rounded-[7px] px-4 py-2 items-center
          justify-center gap-3`}
          onClick={handleSingInWithGoogle}
        >
          <FcGoogle className={`text-[22px] ${isLoading && "brightness-50"}`} />
          <span className="  text-[13px]">
            {isLoading ? "Processing..." : "Login with Google"}
          </span>
        </button>
      </div>
    </>
  );
};

export default GOOGLE_SIGNIN;
