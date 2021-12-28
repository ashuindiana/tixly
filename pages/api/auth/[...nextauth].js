import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";
import { html, text } from "../../../components/HtmlEmail";
import nodemailer from "nodemailer";
import { verifyPassword, hashPassword } from "../../../utils/auth";
import { dbConnect } from "../../../utils/dbConnect";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        });
      },
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          const { db } = await dbConnect();
          const user = await db.collection("users").findOne({
            email: credentials.email,
          });

          if (!user) {
            const hashedPassword = await hashPassword(credentials.password);

            const result = await db.collection("users").insertOne({
              email: credentials.email,
              password: hashedPassword,
              name: "Guest",
              emailVerified: null,
            });

            throw new Error("Success! Check your email.");
          }

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Bad Credentials");

          if (!user.emailVerified) {
            throw new Error("Success! Check your email.");
          }
          // console.log("Verified", user);
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
    error: "/auth",
    // newUser: "/funds",
  },
  adapter: MongoDBAdapter(clientPromise),
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
  },
});
