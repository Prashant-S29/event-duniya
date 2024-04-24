"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { sendMailOTP } from "@/lib/sendMail";
import { useToastNotificationState } from "@/stateStore";
import { signIn } from "next-auth/react";

// Form Schema using Zod
const FormSchema = z.object({
  userName: z
    .string()
    .min(1, "User Name is required")
    .max(25, "User Name must be less than 25 characters"),
  userEmail: z.string().min(1, "Email is required").email("Invalid Email"),
  userPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(15, "Password must be less than 15 characters"),
});

const SIGNUP_FORM_ARTIST = () => {
  const { setToastNotification } = useToastNotificationState();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isMailSending, setIsMailSending] = useState(false);
  const [formData, setFormData] = useState<{
    userName: string;
    userEmail: string;
    userPassword: string;
  }>({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const hideToastNotification = (duration: number) => {
    const timeOut = setTimeout(() => {
      setToastNotification("", "", "success");
    }, duration);
    return () => {
      clearTimeout(timeOut);
    };
  };

  const handleFormSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (
    data
  ) => {
    setFormData({
      userEmail: data.userEmail,
      userName: data.userName,
      userPassword: data.userPassword,
    });
    generate_send_OTP({ data });
  };

  const generate_send_OTP = async ({
    data,
  }: {
    data: { userName: string; userEmail: string; userPassword: string };
  }) => {
    // Genetrating OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setVerifyOTP(otp);
    setIsMailSending(true);

    // Send otp to user email
    try {
      const mailResponse = await sendMailOTP({
        userName: data.userName,
        userEmail: data.userEmail,
        otp: otp.toString(),
        emailTemplate: "Account Verification",
      });
      if (mailResponse.status === "success") {
        setToastNotification(
          "OTP sent successfully",
          "Please check the entered email address for Email Verification OTP",
          "success"
        );
        hideToastNotification(5000);
        setShowOtpInput(true);
      } else {
        setToastNotification(
          "Error in sending OTP",
          "Unexpected error occurred. Please try again",
          "error"
        );
        hideToastNotification(5000);
      }
    } catch (error) {
      setToastNotification(
        "Error in sending OTP",
        "Unexpected error occurred. Please try again",
        "error"
      );
      hideToastNotification(5000);
    }
    setIsMailSending(false);
  };

  const verifyEmail = () => {
    if (enteredOTP === verifyOTP) {
      setToastNotification(
        "OTP Matched Successfully",
        "Setting up your dashboard",
        "success"
      );
      hideToastNotification(5000);
      createNewUser();
    } else {
      setToastNotification(
        "OTP does not match",
        "Please check your OTP and try again",
        "error"
      );
      hideToastNotification(5000);
    }
  };

  const createNewUser = async () => {
    setIsFormSubmitting(true);
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
      }),
    });

    if (response.ok) {
      setToastNotification(
        "Successfully Signed Up",
        "Setting up dashboard and user profile",
        "success"
      );
      hideToastNotification(5000);
      // router.push("/");
      signInUser({
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
      });
    } else {
      setToastNotification(
        "Unable to Signup",
        "Unexpected error occurred. Please try again",
        "error"
      );
      hideToastNotification(5000);
      setIsFormSubmitting(false);
    }
  };

  const signInUser: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data
  ) => {
    const signInData = await signIn("credentials", {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.status);
      setToastNotification(
        "Unexpected Error",
        "Unable to setup your dashboard. Please try again",
        "error"
      );
      hideToastNotification(5000);
    } else {
      setToastNotification(
        "Success!!",
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
        <span className="text-white  text-[13px]">Sign Up with Google</span>
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
              {...register("userName")}
              placeholder="Username"
              disabled={showOtpInput}
              className={`w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none ${
                showOtpInput ? "text-gray-500 cursor-not-allowed" : "text-white"
              } ${errors.userName ? "mb-0" : "mb-3"}`}
            />
            {errors.userName && (
              <div className="mb-3">
                <span className="text-red-500 text-[13px]">
                  *{errors.userName.message}
                </span>
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              {...register("userEmail")}
              placeholder="Email"
              disabled={showOtpInput}
              className={`w-[350px] p-2 flex items-center bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none ${
                showOtpInput ? "text-gray-500 cursor-not-allowed" : "text-white"
              } ${errors.userEmail ? "mb-0" : "mb-3"}`}
            />
          </div>
          {errors.userEmail && (
            <div className="mb-3">
              <span className="text-red-500 text-[13px]">
                *{errors.userEmail.message}
              </span>
            </div>
          )}
          <div
            className={`flex items-center ${
              showOtpInput ? "gap-3" : "gap-0"
            } duration-200 w-[350px]`}
          >
            <div
              className={`${
                showOtpInput ? "w-full" : "w-0"
              } overflow-hidden duration-200 mb-3`}
            >
              <input
                type="text"
                disabled={showOtpInput ? false : true}
                defaultValue={enteredOTP}
                onChange={(e) => {
                  setEnteredOTP(e.target.value);
                }}
                name="userOTP"
                placeholder="OTP"
                className={`w-full p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none text-white `}
              />
            </div>

            <div className="w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={showOtpInput}
                  {...register("userPassword")}
                  placeholder="Password"
                  className={`w-full p-2 flex items-center bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none ${
                    showOtpInput
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-white"
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
                <div className="mb-3">
                  <span className="text-red-500 text-[13px]">
                    *{errors.userPassword.message}
                  </span>
                </div>
              )}
            </div>
          </div>
          {showOtpInput ? (
            <div>
              <button
                type="button"
                className={`w-[350px] bg-[#141414] border border-[#2E2E2E] rounded-[7px] px-4 py-2 ${
                  isFormSubmitting
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white"
                } font-medium text-[13px]`}
                disabled={isFormSubmitting}
                onClick={verifyEmail}
              >
                {isFormSubmitting ? "Signing Up..." : "Verify and Continue"}
              </button>
            </div>
          ) : (
            <div>
              <button
                disabled={isMailSending}
                type="button"
                className={`w-[350px] bg-[#141414] border border-[#2E2E2E] rounded-[7px] px-4 py-2 ${
                  isMailSending
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white"
                } font-medium text-[13px]`}
              >
                {isMailSending ? "Processing..." : "Sign Up as an Artist"}
              </button>
            </div>
          )}
          <div className="mt-2">
            <span className="text-[14px] text-gray-400">
              Already have an account ?{" "}
              <Link
                href="/api/auth/signin"
                className="underline underline-offset-1"
              >
                Login here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SIGNUP_FORM_ARTIST;
