import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma_db } from "./prisma_db";
import { compare } from "bcrypt";
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userEmail: {
          label: "Email",
          type: "text",
          placeholder: "me@mail.com",
        },
        userPassword: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userEmail || !credentials?.userPassword) {
          return null;
        }

        // Check if user exists
        const existingUser = await prisma_db.user.findUnique({
          where: { userEmail: credentials?.userEmail },
        });
        if (!existingUser) {
          return null;
        }

        // Check for Password
        // Using 'compare()' function as we have hashed our password
        const isPasswordMatch = await compare(
          credentials.userPassword,
          existingUser.userPassword
        );
        if (!isPasswordMatch) {
          return null;
        }

        return {
          id: `${existingUser.userId}`, // to conver 'id' to string
          userName: existingUser.userName,
          userEmail: existingUser.userEmail,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          userName: user.userName,
          userEmail: user.userEmail
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          userName: token.userName,
          userEmail: token.userEmail
        },
      };
     },
  },
};

export { authOptions };
