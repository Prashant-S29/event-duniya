import emailjs from "@emailjs/browser";
import { env } from "./env";

interface MailResponse {
  status: "success" | "error";
  response?: any;
  error?: any;
}

export const sendMail = async (data: {
  userName: string;
  userEmail: string;
  emailVerificationOTP: string;
}): Promise<MailResponse> => {
  try {
    const response = await emailjs.send(
      env.NEXT_PUBLIC_SERVICE_ID || "",
      env.NEXT_PUBLIC_TEMPLATE_ID || "",
      {
        userName: data.userName,
        userEmail: data.userEmail,
        emailVerificationOTP: data.emailVerificationOTP,
      },
      env.NEXT_PUBLIC_PUBLIC_KEY
    );
    return { status: "success", response };
  } catch (error) {
    return { status: "error", error };
  }
};
