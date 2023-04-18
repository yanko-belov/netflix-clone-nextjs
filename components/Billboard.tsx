import { useCallback } from "react";
import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import useInfoModal from "@/hooks/useInfoMocal";

const Billboard = () => {
  const { data: movie } = useBillboard();
  const { openModal } = useInfoModal();
  const handleOpenModal = useCallback(
    () => openModal(movie?.id),
    [movie?.id, openModal]
  );

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="h-[56.25vw] w-full object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={movie?.videoUrl}
        poster={movie?.thumbnailUrl}
      />

      <div className="absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
        <p className="text-1xl h-full w-[50%] font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl">
          {movie?.title}
        </p>
        <p className="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
          {movie?.description}
        </p>
        <div className="mt-3 flex flex-row items-center gap-3 md:mt-4">
          <PlayButton movieId={movie?.id} />
          <button
            onClick={handleOpenModal}
            className="flex w-auto flex-row items-center rounded-md bg-white bg-opacity-30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-opacity-20 md:px-4 md:py-2 lg:text-lg"
          >
            <AiOutlineInfoCircle className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
