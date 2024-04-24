import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma_db } from "./prisma_db";
import { env } from "./env";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma_db),
  secret: env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
  GoogleProvider({
      clientId: env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
};

export { authOptions };
