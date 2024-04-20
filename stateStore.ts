import { create } from "zustand";

type ToastNotificationState = {
  title: string;
  desc: string;
  status: "error" | "warning" | "success" | "general";
  setToastNotification: (
    title: string,
    desc: string,
    status: "error" | "warning" | "success" | "general"
  ) => void;
};

export const useToastNotificationState = create<ToastNotificationState>()(
  (set) => ({
    title: "",
    desc: "",
    status: "general",
    setToastNotification: (
      title: string,
      desc: string,
      status: "error" | "warning" | "success" | "general"
    ) => set({ title, desc, status }),
  })
);

type ShowUserProfile = {
  showUserProfile: boolean;
  setShowUserProfile: (showUserProfile: boolean) => void;
};

export const useUserProfile = create<ShowUserProfile>()((set) => ({
  showUserProfile: false,
  setShowUserProfile: (showUserProfile: boolean) => set({ showUserProfile }),
}));

type ShowResetPasswordForm = {
  showResetPassword: boolean;
  setShowResetPassword: (showResetPassword: boolean) => void;
};
export const useResetPasswordForm = create<ShowResetPasswordForm>()((set) => ({
  showResetPassword: false,
  setShowResetPassword: (showResetPassword: boolean) =>
    set({ showResetPassword }),
}));
