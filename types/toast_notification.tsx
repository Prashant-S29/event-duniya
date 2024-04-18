export type notification = {
  display: boolean;
  title: string;
  desc: string;
  status: "error" | "warning" | "success" | "general";
};