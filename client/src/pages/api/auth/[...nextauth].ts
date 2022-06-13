import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    signIn: async ({ user, session }: any) => {
      const userDB = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userDB === null) {
        const userFormat = {
          name: user.name,
          email: user.email,
          image: user.image,
        };
        await prisma.user.create({ data: userFormat });
        return true;
      }

      return true;
    },
    session: async ({ session }: any) => {
      console.log('session', session);
      // console.log('session', session);
      return session;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
