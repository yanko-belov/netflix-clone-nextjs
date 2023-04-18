import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/prisma-db";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, password } = JSON.parse(req.body);
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(422).json({ error: "Email is already used." });
    }

    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
}
