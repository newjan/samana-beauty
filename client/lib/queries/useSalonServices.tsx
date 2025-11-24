import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSalonServices } from "../api";

export function useSalonServices(filters: { search?: string; category?: string; ordering?: string; }) {
  return useInfiniteQuery({
    queryKey: ["services", filters],
    queryFn: fetchSalonServices,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page") ? Number(url.searchParams.get("page")) : undefined;
      }
      return undefined;
    },
  });
}
