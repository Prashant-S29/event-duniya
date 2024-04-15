"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

// Form Schema using Zod
const formSchema = z
  .object({
    userName: z
      .string()
      .min(1, "User Name is required")
      .max(25, "User Name must be less than 25 characters"),
    userEmail: z.string().min(1, "Email is required").email("Invalid Email"),
    userPassword: z
      .string()
      .min(1, "Password is required")
      .max(15, "Password must be less than 15 characters"),
    userConfirmPassword: z
      .string()
      .min(1, "Password is required")
      .max(15, "Password must be less than 15 characters"),
  })
  .refine((data) => data.userPassword === data.userConfirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const LOGIN_FORM = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      userConfirmPassword: "",
    },
  });

  return (
    <>
      <div
        className="w-[350px] flex bg-[#222222] border border-[#2E2E2E] rounded-[7px] px-4 py-2 items-center
       justify-center gap-3"
      >
        <FcGoogle className="text-[22px]" />
        <span className="text-white  text-[13px]">Login with Google</span>
      </div>
      <div className="flex justify-center gap-3 items-center my-3">
        <div className="w-[150px] h-[0.5px] bg-gray-500 rounded-full" />
        <div className="leading-none">
          <span className="text-[14px] text-gray-500">or</span>
        </div>
        <div className="w-[150px] h-[0.5px] bg-gray-500 rounded-full" />
      </div>
      <div>
        <form>
          {/* <div>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              className="w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none text-white mb-3"
            />
          </div> */}
          <div>
            <input
              type="text"
              name="userEmail"
              placeholder="Email"
              className="w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none text-white mb-3"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="userPassword"
              placeholder="Password"
              className="w-[350px] p-2 flex items-center bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none text-white mb-3"
            />
            <div
              className="absolute right-0 top-[50%] -translate-y-[50%] mr-2 cursor-pointer "
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <FaEyeSlash className="text-white text-[14px]" />
              ) : (
                <FaEye className="text-white text-[14px]" />
              )}
            </div>
          </div>

          {/* <div>
            <input
              type="password"
              name="userConfirmPassword"
              placeholder="Confirm Password"
              className="w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none text-white mb-3"
            />
          </div> */}
          <div className="w-[350px] flex justify-between items-center px-2 mb-2">
            <div>
              <Link href="" className="underline text-[12px]  text-gray-400">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="w-[350px]  bg-[#141414] border border-[#2E2E2E] rounded-[7px] px-4 py-2 text-white font-medium text-[13px]"
            >
              Login Up
            </button>
          </div>
          <div className="mt-2">
            <span className="text-[14px] text-gray-400">
              Don{"'"}t have an account ?{" "}
              <Link href="/signup" className="underline underline-offset-1">
                Sign Up here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default LOGIN_FORM;
