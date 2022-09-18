import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { Result } from "postcss";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await fetch("http://localhost:3000/api/user/SignIn", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        if (user?.success) {
          const newUser = {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            image: user?.image,
          };
          return newUser;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
