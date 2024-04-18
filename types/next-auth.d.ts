import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    userName: string;
    userEmail: string;
  }
  interface Session {
    user: User & {
      userName: string;
      userEmail: string;
    };
    token: {
      userName: string;
      userEmail: string;
    };
  }
}
