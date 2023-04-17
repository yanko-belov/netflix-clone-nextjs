import { FC } from "react";
import { Movie } from "@prisma/client";
import { BsFillPlayFill } from "react-icons/bs";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="col-span group relative h-[12vw] bg-zinc-900">
      <img
        className="duration h-[12vw] w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-300 group-hover:opacity-90 sm:group-hover:opacity-0"
        src={movie.thumbnailUrl}
        alt={movie.title}
      />

      <div className="invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-300 duration-200 group-hover:-translate-x-[2vw] group-hover:-translate-y-[6vw] group-hover:scale-110 group-hover:opacity-100 sm:visible">
        <img
          className="duration h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition"
          src={movie.thumbnailUrl}
          alt={movie.title}
        />
        <div className="absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
          <div className="flex flex-row items-center gap-3">
            <div
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10"
              onClick={() => {}}
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>
          <p className="mt-4 font-semibold text-green-400">
            New <span className="text-white">2023</span>
          </p>

          <div className="mt-4 flex flex-row items-center gap-2">
            <p className="text-[10px] text-white lg:text-sm">
              {movie.duration}
            </p>
          </div>

          <div className="mt-4 flex flex-row items-center gap-2">
            <p className="text-[10px] text-white lg:text-sm">{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
