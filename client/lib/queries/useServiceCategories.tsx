
import { useQuery } from "@tanstack/react-query";
import { fetchServiceCategories } from "../api";

export function useServiceCategories() {
  return useQuery({
    queryKey: ["service-categories"],
    queryFn: fetchServiceCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
