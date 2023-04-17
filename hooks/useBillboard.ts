import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/movies/random",
    fetcher
  );
  return { data, error, isLoading, mutate };
};

export default useBillboard;
