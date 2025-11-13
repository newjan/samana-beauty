import { useQuery } from "@tanstack/react-query";
import { fetchSalonServices } from "../api";

export function useSalonServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchSalonServices,
    staleTime: 5 * 60 * 1000,
  });
}
