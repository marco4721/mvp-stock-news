import { useQuery } from "@tanstack/react-query";
import { getTickers } from "./tickersService";

const useGetTickers = (filters: { ticker?: string }) => {
  return useQuery({
    queryKey: ["tikers", filters?.ticker],
    queryFn: () => getTickers(filters),
  });
};

export { useGetTickers };
