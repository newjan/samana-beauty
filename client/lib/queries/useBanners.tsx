import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../api";

export function useBanners() {
  return useQuery({ queryKey: ["banners"], queryFn: fetchBanners });
}
