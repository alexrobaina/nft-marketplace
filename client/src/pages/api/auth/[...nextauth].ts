import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../prisma/prisma";

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      const dataUser = {
        email: user.email,
        name: user.name,
        image: user.image,
      };

      try {
        await prisma.user.create({ data: dataUser });
      } catch (error) {
        console.log(error);
      }

      return true;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
