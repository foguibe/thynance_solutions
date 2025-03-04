import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "startup" | "sme" | "enterprise";
  }

  interface Session {
    user: User;
  }

  interface JWT {
    role: "startup" | "sme" | "enterprise";
  }
}
