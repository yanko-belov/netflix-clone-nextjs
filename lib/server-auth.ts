import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";
import db from "@/lib/prisma-db";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  return { currentUser };
};

export default serverAuth;
