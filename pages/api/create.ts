import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, content } = req.body;

  const result = await prisma.notes.create({
    data: {
      user,
      content,
    },
  });

  res.json(result)
}
