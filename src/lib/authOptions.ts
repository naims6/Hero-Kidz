import { loginUser } from "@/actions/server/auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth env vars");
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await loginUser(credentials);

        if (!user || "error" in user) {
          return null;
        }
        return { ...user, id: user._id.toString() };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // is user already exist
      const isExist = await dbConnect(collections.USERS).findOne({
        email: user.email,
      });
      if (isExist) {
        return true;
      }
      // create user
      const newUser = {
        provider: account?.provider,
        name: user.name,
        image: user.image,
        email: user.email,
        role: "user",
      };

      const result = await dbConnect(collections.USERS).insertOne(newUser);

      return result.acknowledged;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token?.role;
        session.user.email = token?.email;
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (!account) return token;

      if (user) {
        if (account.provider == "google") {
          const dbUser = await dbConnect(collections.USERS).findOne({
            email: user.email,
          });
          console.log("db user:", dbUser);
          token.role = dbUser?.role;
          token.email = dbUser?.email ?? undefined;
        } else {
          token.role = user?.role;
          token.email = user?.email ?? undefined;
        }
      }
      return token;
    },
  },
};
