import { NextApiRequest, NextApiResponse } from "next";

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
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser);
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
}
