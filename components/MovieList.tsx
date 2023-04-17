import { FC } from "react";
import { Movie } from "@prisma/client";
import MovieCard from "@/components/MovieCard";

interface MovieListProps {
  movies: Movie[];
  title: string;
}

const MovieList: FC<MovieListProps> = ({ movies, title }) => {
  if (!movies || !movies.length) {
    return null;
  }
  return (
    <div className="mt-4 space-y-8 px-4 md:px-12">
      <div>
        <p className="text-md text-md mb-4 font-semibold md:text-xl lg:text-2xl">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
