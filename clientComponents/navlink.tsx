"use client";

import Link from "next/link";
import React, { useState } from "react";

const NAVLINK = ({
  text,
  href,
  textStyle,
  lineStyle,
}: {
  text: string;
  href: string;
  textStyle?: string;
  lineStyle?: string;
}) => {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => {
          setIsLinkHovered(true);
        }}
        onMouseLeave={() => {
          setIsLinkHovered(false);
        }}
      >
        <div>
          <Link prefetch href={href} className={`${textStyle}`}>
            {text}
          </Link>
        </div>
        <div
          className={`flex ${isLinkHovered ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`${
              isLinkHovered ? "w-full" : "w-0"
            } duration-200 h-[0.5px] bg-white rounded-full ${lineStyle}`}
          />
        </div>
      </div>
    </>
  );
};

export default NAVLINK;
