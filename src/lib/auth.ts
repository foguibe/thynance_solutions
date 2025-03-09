import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "../../dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) return null;

        await dbConnect();
        const user = await User.findOne({ email }).select("+password role");
        if (!user || !user.password) return null;

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: (user.role as "startup" | "sme" | "enterprise") ?? "startup", // ✅ Ensure role is always assigned
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user.role as "startup" | "sme" | "enterprise") ?? "startup"; // ✅ Explicit type
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "startup" | "sme" | "enterprise") ?? "startup"; // ✅ Ensure role is valid
      }
      return session;
    },
  },
};
