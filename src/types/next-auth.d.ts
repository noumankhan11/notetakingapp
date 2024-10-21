import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    email: string;
    username?: string;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    email: string;
  }
}
