import { useQuery } from "@tanstack/react-query";
import { getNews } from "./newsService";

const useGetNews = (filters: { ticker?: string }) => {
  return useQuery({
    queryKey: ["news", filters.ticker],
    queryFn: () => getNews(filters),
  });
};

export { useGetNews };
