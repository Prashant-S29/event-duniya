"use client";

import React, { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaAngleLeft, FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordForm, useToastNotificationState } from "@/stateStore";
import { sendMailOTP } from "@/lib/sendMail";

// Form Schema using Zod
const FormSchema = z
  .object({
    userEmail: z.string().min(1, "Email is required").email("Invalid Email"),
    userNewPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters")
      .max(15, "Password must be less than 15 characters"),
    userConfirmNewPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters")
      .max(15, "Password must be less than 15 characters"),
  })
  .refine((data) => data.userNewPassword === data.userConfirmNewPassword, {
    message: "Passwords does not match",
    path: ["userConfirmNewPassword"],
  });

const RESET_PASSWORD_FORM = () => {
  const { setShowResetPassword } = useResetPasswordForm();
  const router = useRouter();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isMailSending, setIsMailSending] = useState(false);

  const [formData, setFormData] = useState<{
    userEmail: string;
    userNewPassword: string;
  }>({
    userEmail: "",
    userNewPassword: "",
  });

  const [userDetails, setUserDetails] = useState<{
    userEmail: string;
    userName: string;
  }>({
    userEmail: "",
    userName: "",
  });
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

  // Check whether email address exists or not
  const existingUserByEmail: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data
  ) => {
    // console.log(data.userEmail);
    const res: any = await fetch(`/api/user/${data.userEmail}`);
    if (!res) {
      setToastNotification(
        "User not found",
        "User with this email address does not exist. If you are a new user, please sign up",
        "error"
      );
      hideToastNotification(5000);
      return;
    }
    const {
      message: { userEmail, userName },
    } = await res.json();
    // console.log(message);
    // console.log(userName, userEmail);

    setUserDetails({
      userName: userName,
      userEmail: userEmail,
    });
    setFormData({
      userEmail: data.userEmail,
      userNewPassword: data.userNewPassword,
    });

    generate_send_OTP({ userEmail, userName });
  };

  const generate_send_OTP = async ({
    userEmail,
    userName,
  }: {
    userEmail: string;
    userName: string;
  }) => {
    // Genetrating OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setVerifyOTP(otp);
    setIsMailSending(true);

    // Send otp to user email
    try {
      const mailResponse = await sendMailOTP({
        userName: userName,
        userEmail: userEmail,
        otp: otp.toString(),
        emailTemplate: "Reset Password",
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
      updateUserPassword({ userEmail: userDetails.userEmail });
    } else {
      setToastNotification(
        "OTP does not match",
        "Please check your OTP and try again",
        "error"
      );
      hideToastNotification(5000);
    }
  };

  const updateUserPassword = async ({ userEmail }: { userEmail: string }) => {
    // console.log(userEmail);
    setIsFormSubmitting(true);
    const response = await fetch(`/api/user/${userEmail}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        newUserPassword: formData.userNewPassword,
      }),
    });

    if (response.ok) {
      setToastNotification(
        "Password updated successfully",
        "You are now being redirected to login page",
        "success"
      );
      hideToastNotification(5000);
      // router.push("/");
      setShowResetPassword(false);
    } else {
      setToastNotification(
        "Unable to update password",
        "Unexpected error occurred. Please try again",
        "error"
      );
      hideToastNotification(5000);
      setIsFormSubmitting(false);
    }
    router.push("/");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(existingUserByEmail)}>
          <div>
            <input
              type="text"
              {...register("userEmail")}
              disabled={showOtpInput || isSubmitting}
              placeholder="Email"
              className={`w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none  ${
                showOtpInput || isSubmitting
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white"
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
                  disabled={showOtpInput || isSubmitting}
                  {...register("userNewPassword")}
                  placeholder="Password"
                  className={`w-full p-2 flex items-center bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none ${
                    showOtpInput || isSubmitting
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-white"
                  } ${errors.userNewPassword ? "mb-0" : "mb-3"}`}
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

              {errors.userNewPassword && (
                <div className="mb-3">
                  <span className="text-red-500 text-[13px]">
                    *{errors.userNewPassword.message}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <input
              type="password"
              {...register("userConfirmNewPassword")}
              disabled={showOtpInput || isSubmitting}
              placeholder="Confirm Password"
              className={`w-[350px] p-2 bg-[#222222] border border-[#2E2E2E] rounded-[7px] text-[13px] outline-none  ${
                isSubmitting || showOtpInput
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white"
              } ${errors.userConfirmNewPassword ? "mb-0" : "mb-3"}`}
            />
            {errors.userConfirmNewPassword && (
              <div className="mb-3">
                <span className="text-red-500 text-[13px]">
                  *{errors.userConfirmNewPassword.message}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              //   disabled={showSignUpForm ? false : true}
              type="button"
              disabled={showOtpInput}
              className={`w-fit flex gap-2 items-center  border bg-[#141414]  border-[#2E2E2E] rounded-[7px] pr-4 pl-3 py-2 duration-200 font-medium text-[13px]  ${
                showOtpInput ? "text-gray-500 cursor-not-allowed" : "text-white"
              }`}
              onClick={() => {
                setShowResetPassword(false);
              }}
            >
              <FaAngleLeft />
              Back
            </button>
            {showOtpInput ? (
              <button
                type="button"
                className={`w-full bg-[#141414] border border-[#2E2E2E] rounded-[7px] px-4 py-2 ${
                  isFormSubmitting
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white"
                } font-medium text-[13px]`}
                disabled={isFormSubmitting}
                onClick={verifyEmail}
              >
                {isFormSubmitting
                  ? "Updating user data..."
                  : "Verify and Continue"}
              </button>
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className={`w-full bg-[#141414] border border-[#2E2E2E] rounded-[7px] px-4 py-2 ${
                  isSubmitting
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-white"
                } font-medium text-[13px]`}
              >
                {isSubmitting ? "Processing..." : "Reset Password"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default RESET_PASSWORD_FORM;
