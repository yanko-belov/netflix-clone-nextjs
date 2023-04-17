import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/prisma-db";
import { compare } from "bcrypt";

export default NextAuth({
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email or password is incorrect");
        }

        const isPasswordMatching = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordMatching) {
          throw new Error("Email or password is incorrect");
        }

        return user;
      },
    }),
  ],
});
