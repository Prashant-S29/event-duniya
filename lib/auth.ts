import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma_db } from "./prisma_db";
import { compare, hash } from "bcrypt";
import { env } from "./env";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma_db),
  secret: env.NEXT_PUBLIC_NEXTAUTH_SECRET, // coming from env.ts
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "text",
    //       placeholder: "me@mail.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       return null;
    //     }

    //     // Check if user exists
    //     const existingUser = await prisma_db.user.findUnique({
    //       where: { email: credentials?.email },
    //     });
    //     if (!existingUser) {
    //       return null;
    //     }

    //     // Check for Password
    //     // Using 'compare()' function as we have hashed our password
    //     if (existingUser.password) {
    //       const isPasswordMatch = await compare(
    //         credentials.password,
    //         existingUser.password
    //       );
    //       if (!isPasswordMatch) {
    //         return null;
    //       }
    //     }

    //     return {
    //       id: existingUser.id, // to conver 'id' to string
    //       name: existingUser.name,
    //       email: existingUser.email,
    //     };
    //   },
    // }),
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
