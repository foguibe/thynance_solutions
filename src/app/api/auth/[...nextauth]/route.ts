import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "../../../../../dbConnect";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            console.log("❌ No credentials provided");
            return null;
          }

          const { email, password } = credentials as { email: string; password: string };

          if (!email || !password) {
            console.log("❌ Missing email or password");
            return null;
          }

          console.log(`🔍 Attempting authentication for: ${email}`);

          await dbConnect();
          console.log("✅ Database connected");

          // First, check if the user exists *without selecting password*
          const userExists = await User.findOne({ email });
          if (!userExists) {
            console.log(`❌ User not found in database: ${email}`);
            return null;
          }

          console.log(`✅ User found: ${userExists.email}, role: ${userExists.role}`);

          // Now fetch password securely
          const user = await User.findOne({ email }).select("+password role");

          if (!user || !user.password) {
            console.log("❌ Password not found for user (possibly due to select: false in schema)");
            return null;
          }

          console.log("🔑 Password field retrieved, proceeding to validation");

          // Compare passwords
          const isPasswordMatched = await bcrypt.compare(password, user.password);
          if (!isPasswordMatched) {
            console.log("❌ Password mismatch");
            return null;
          }

          console.log("✅ Authentication successful!");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: (user.role as "startup" | "sme" | "enterprise") || "startup",
          };
        } catch (error) {
          console.error("❌ Error in authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(`🔑 Assigning role to token: ${user.role}`);
        token.role = user.role as "startup" | "sme" | "enterprise";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userRole = (token.role as "startup" | "sme" | "enterprise") ?? "startup";
        session.user.role = userRole;
        console.log(`🎯 User session created with role: ${session.user.role}`);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
