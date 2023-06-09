import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoMocal";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal onClose={closeModal} visible={isOpen} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList movies={movies} title="Trending Now" />
        <MovieList movies={favorites} title="My List" />
      </div>
    </>
  );
}
