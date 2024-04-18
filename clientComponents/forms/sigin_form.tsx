"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { notification } from "@/types/toast_notification";
import { useToastNotificationState } from "@/stateStore";

// Form Schema using Zod
const FormSchema = z.object({
  userEmail: z.string().min(1, "Email is required").email("Invalid Email"),
  userPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(15, "Password must be less than 15 characters"),
});

const SIGIN_FORM = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setToastNotification } = useToastNotificationState();
  const hideToastNotification = (duration: number) => {
    const timeOut = setTimeout(() => {
      setToastNotification("", "", "success");
    }, duration);
    return () => {
      clearTimeout(timeOut);
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleFormSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data
  ) => {
    const signInData = await  signIn("credentials", {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
      redirect: false,
    });
    if (signInData?.error) {
      // console.log(signInData.status);
      setToastNotification(
        "Unable to login",
        "User not found. Please check your credentials and try again",
        "error"
      );
      hideToastNotification(5000);
    } else {
      setToastNotification(
        "Login Successful",
        "You are now being redirected to home page",
        "success"
      );
      hideToastNotification(5000);
      router.push("/");
    }
  };

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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <input
              type="text"
              {...register("userEmail")}
              disabled={isSubmitting}
              placeholder="Email"
              className={`w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none  ${
                isSubmitting ? "text-gray-500 cursor-not-allowed" : "text-white"
              } ${errors.userEmail ? "mb-0" : "mb-3"}`}
            />
            {errors.userEmail && (
              <div className="mb-3">
                <span className="text-red-500 text-[13px]">
                  *{errors.userEmail.message}
                </span>
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("userPassword")}
              disabled={isSubmitting}
              placeholder="Password"
              className={`w-[350px] p-2 flex items-center bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none ${
                isSubmitting ? "text-gray-500 cursor-not-allowed" : "text-white"
              } ${errors.userPassword ? "mb-0" : "mb-3"}`}
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
          {errors.userPassword && (
            <div>
              <span className="text-red-500 text-[13px]">
                *{errors.userPassword.message}
              </span>
            </div>
          )}
          <div className="mb-3">
            <span className="text-gray-300 underline underline-offset-1 text-[13px]">
              Forgot Password?
            </span>
          </div>
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-[350px] bg-[#141414] border border-[#2E2E2E] rounded-[7px] px-4 py-2 ${
                isSubmitting ? "text-gray-500 cursor-not-allowed" : "text-white"
              } font-medium text-[13px]`}
            >
              {isSubmitting ? "Processing..." : "Login"}
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

export default SIGIN_FORM;
