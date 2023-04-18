import { FC, useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();

  const isFavorite = useMemo(
    () => currentUser?.favoriteIds.includes(movieId),
    [currentUser, movieId]
  );

  const toggleFavorite = useCallback(async () => {
    try {
      const response = await fetch(`/api/movies/favorite/${movieId}`, {
        method: isFavorite ? "DELETE" : "POST",
      });

      const data = await response.json();
      await mutateCurrentUser({
        ...currentUser,
        favoriteIds: data?.favoriteIds || [],
      });
      await mutateFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, isFavorite, movieId, mutateCurrentUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineMinus : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorite}
      className="group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
