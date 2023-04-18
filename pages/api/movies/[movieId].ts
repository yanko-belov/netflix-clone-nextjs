import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/prisma-db";
import serverAuth from "@/lib/server-auth";

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

    const { movieId } = req.query;

    if (typeof movieId !== "string" || !movieId) {
      throw new Error("Invalid Id");
    }

    const movies = await db.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(400).json(error);
  }
}
