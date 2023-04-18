import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

const Profiles = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-white md:text-6xl">
          Who is watching?
        </h1>
        <div className="mt-10 flex items-center justify-center gap-8">
          <div onClick={() => router.push("/")}>
            <div className="group mx-auto w-44 flex-row">
              <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
                <Image
                  src="/images/default-blue.png"
                  width={176}
                  height={176}
                  alt="User"
                />
              </div>

              <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
                {currentUser?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
