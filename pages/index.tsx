import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

// TODO: extract this into middleware
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <h1 className="text-3xl font-bold text-green-500 underline">
        Hello world!
      </h1>
      <p className="text-white">Logged in as {currentUser?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
