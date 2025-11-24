
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedServices } from "../api";

export function useFeaturedServices() {
  return useQuery({
    queryKey: ["featured-services"],
    queryFn: fetchFeaturedServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
