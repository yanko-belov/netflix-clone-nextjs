import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const movieId = router.query.movieId as string;
  const { data: movie } = useMovie(movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed z-10 flex w-full flex-row items-center gap-4 bg-black bg-opacity-70 p-4">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="cursor-pointer text-white"
          size={30}
        />
        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-light">Watching:</span>&nbsp;
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
