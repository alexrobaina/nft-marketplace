import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../prisma/prisma';
// import { getUser } from '/server/db/queries'

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(400).json({ statusCode: 400, message: 'Invalid session.' });
    return;
  }
  console.log(session);
  // const user = await prisma.user.findUnique({
  //   where: { id: 1 },
  // });
  //   const userId = session.user.id

  // console.log(user);

  //   const response = await getUser(userId)

  res.json({ user: null });
};
