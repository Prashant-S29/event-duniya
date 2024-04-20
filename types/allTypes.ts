export type notification = {
  display: boolean;
  title: string;
  desc: string;
  status: "error" | "warning" | "success" | "general";
};

export const allSecondaryKeys = {
  a: "a",
  b: "b",
  c: "c",
  d: "d",
  e: "e",
  f: "f",
  g: "g",
  h: "h",
  i: "i",
  j: "j",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "p",
  q: "q",
  r: "r",
  s: "s",
  t: "t",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  y: "y",
  z: "z",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  space: " ",
  escape: "Escape",
};

export type keyStrokeBinder = {
  keyStroke:
    | keyof typeof allSecondaryKeys
    | {
        primaryKey: "ctrlKey" | "shiftKey";
        secondaryKey: keyof typeof allSecondaryKeys;
      };
  action: () => void;
  preventDefaultAction?: boolean;
};

export type userType = {
  userId: number;
  userEmail: string;
  userName: string;
  userPassword: string;
  userCreatedAt: Date;
  userUpdatedAt: Date;
};
