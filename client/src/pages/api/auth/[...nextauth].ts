import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../prisma/prisma';

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
    signIn: async ({ user }: any) => {
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
      const userDB: any = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      session.user.id = userDB.id;
      session.user.profileBio = userDB.profileBio;
      session.user.socialMediaLinks = userDB.socialMediaLinks;
      return Promise.resolve(session);
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
