import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getSession({ req });
  console.log("session.user", session.user);

  if (!session) {
    res.status(400).json({ statusCode: 400, message: "Invalid session." });
    return;
  }
  const user = await prisma.user.create({
    data: session.user,
  });
  console.log(user);
  res.status(200).json({ name: "John Doe" });
}
