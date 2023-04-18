import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

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
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  console.log(movies, "movies");
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList movies={movies} title="Trending Now" />
        <MovieList movies={favorites} title="My List" />
      </div>
    </>
  );
}
