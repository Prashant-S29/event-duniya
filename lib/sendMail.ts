import emailjs from "@emailjs/browser";
import { env } from "./env";

interface MailResponse {
  status: "success" | "error";
  response?: any;
  error?: any;
}

export const sendMailOTP = async (data: {
  userName: string;
  userEmail: string;
  otp: string;
  emailTemplate: "Account Verification" | "Reset Password";
}): Promise<MailResponse> => {
  let teamplateID = env.NEXT_PUBLIC_TEMPLATE_ID_ACCOUNT_VERIFICATION;

  switch (data.emailTemplate) {
    case "Reset Password":
      teamplateID = env.NEXT_PUBLIC_TEMPLATE_ID_RESET_PASSWORD;
      break;
    case "Account Verification":
      teamplateID = env.NEXT_PUBLIC_TEMPLATE_ID_ACCOUNT_VERIFICATION;
      break;
  }

  try {
    const response = await emailjs.send(
      env.NEXT_PUBLIC_SERVICE_ID,
      teamplateID,
      {
        userName: data.userName,
        userEmail: data.userEmail,
        emailVerificationOTP: data.otp,
      },
      env.NEXT_PUBLIC_PUBLIC_KEY
    );
    return { status: "success", response };
  } catch (error) {
    return { status: "error", error };
  }
};
