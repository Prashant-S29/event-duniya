import { allSecondaryKeys, keyStrokeBinder } from "@/types/allTypes";
import { useEffect } from "react";

const KeyStrokeBinder = ({
  keyStroke,
  action,
  preventDefaultAction = false,
}: keyStrokeBinder) => {
  useEffect(() => {
    const handleKeyStroke = (e: any) => {
      if (preventDefaultAction) {
        e.preventDefault();
      }
      if (typeof keyStroke === "string") {
        if (e.key.toLowerCase() === keyStroke) {
          action();
        }
      } else {
        if (keyStroke.primaryKey === "ctrlKey") {
          if (
            e.ctrlKey &&
            e.key.toLowerCase() === allSecondaryKeys[keyStroke.secondaryKey]
          ) {
            action();
          }
        } else if (keyStroke.primaryKey === "shiftKey") {
          if (
            e.shiftKey &&
            e.key.toLowerCase() === allSecondaryKeys[keyStroke.secondaryKey]
          ) {
            action();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyStroke);

    return () => {
      window.removeEventListener("keydown", handleKeyStroke);
    };
  }, [keyStroke, action, preventDefaultAction]);
};

export default KeyStrokeBinder;
