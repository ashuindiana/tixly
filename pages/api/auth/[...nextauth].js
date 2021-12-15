import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "../../../utils/auth";
import { dbConnect } from "../../../utils/dbConnect";

const options = {
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          const { db } = await dbConnect();
          const user = await db.collection("users").findOne({
            email: credentials.email,
          });

          if (!user) throw new Error("Bad Credentials");

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Bad Credentials");

          return {
            _id: user._id,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
