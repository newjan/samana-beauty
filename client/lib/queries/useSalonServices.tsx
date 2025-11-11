import { useQuery } from "@tanstack/react-query";
import { fetchSalonServices } from "../api";

export function useSalonServices() {
  return useQuery({ queryKey: ['services'], queryFn: fetchSalonServices });
}
