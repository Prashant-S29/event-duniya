"use client";

import React, { ReactElement, useState } from "react";

const CLICK_EFFECT = ({ children }: { children: ReactElement }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    const timeout = setTimeout(() => {
      setIsClicked(false);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`${isClicked ? "scale-95" : "scale-100"} duration-100`}
      >
        {children}
      </div>
    </>
  );
};

export default CLICK_EFFECT;
