import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/server-auth";
import db from "@/lib/prisma-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    await serverAuth(req, res);

    const movies = await db.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(400).json(error);
  }
}
