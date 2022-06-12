import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../prisma/prisma';
import { userInfo } from 'os';
import { Prisma } from '@prisma/client';

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
    session: async ({ session }: any) => {
      const dataUser: Prisma.UserCreateInput = {
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
      };
      let userCreated;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user === null) {
        console.log(1);
        userCreated = await prisma.user.create({ data: dataUser });
      }

      return Promise.resolve(session);
    },
    createUser: async ({ session }: any) => {
      const dataUser = {
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
      };
      let userCreated;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user === null) {
        console.log(1);
        userCreated = await prisma.user.create({ data: dataUser });
      }

      return true;
    },
  },
  pages: {
    signIn: '/', //Need to define custom login page (if using)
    // async signIn({ user, session }: any) {
    //   const dataUser = {
    //     email: user.email,
    //     name: user.name,
    //     image: user.image,
    //   };
    //   try {
    //     // const userDB = await prisma.user.create({ data: dataUser });
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   return true;
    // },
    // session: async (session: any, user: any) => {
    //   session.user.username = 'saraza';
    //   return Promise.resolve(session);
    // },
  },
};

export default (req: any, res: any) => NextAuth(req, res, options);
