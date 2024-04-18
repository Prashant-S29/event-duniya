"use client";

import React from "react";

const TOAST = ({
  title,
  desc,
  status,
}: {
  title: string;
  desc: string;
  status: "error" | "warning" | "success" | "general";
}) => {
  let color = "#ffffff"; // Default color for general status
  // Determine color based on status
  switch (status) {
    case "error":
      color = "#ef4444";
      break;
    case "warning":
      color = "#eab308";
      break;
    case "success":
      color = "#84cc16";
      break;
    default:
      color = "#ffffff";
  }

  return (
    <>
      <div
        className={`absolute ${
          title === "" ? "hidden" : "block"
        } toast-animation w-[300px] px-4 py-3 z-50 top-0 right-0 m-5 border bg-[#181818] border-[#2E2E2E] rounded-[7px] `}
      >
        <div className="leading-none">
          <span
            className={`text-[13px] font-medium`}
            style={{ color: `${color}` }}
          >
            {title}
          </span>
        </div>
        <div className="leading-none mt-1">
          <span className="text-[12px] text-gray-200">{desc}</span>
        </div>
      </div>
    </>
  );
};

export default TOAST;
