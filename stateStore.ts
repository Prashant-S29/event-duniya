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
