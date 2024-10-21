import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import connectDb from "@/lib/connectDb";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        const { email, password } = await credentials;
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        await connectDb();
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }
          const isMatchedPassword = await bcrypt.compare(
            password,
            user.password
          );
          if (!isMatchedPassword) {
            throw new Error("Invalid email or password");
          }
          if (isMatchedPassword) {
            const userData = {
              username: user.username,
              email: user.email,
            };
            return userData;
          }
        } catch (error) {
          console.log(error);
          throw new Error("Server error in authentcaion");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
