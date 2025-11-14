import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { Product } from "../api";

export function useProducts(isFeatured: boolean = false) {
  return useQuery<Product[]>({
    queryKey: ["products", isFeatured ? "featured" : "all"],
    queryFn: () => fetchProducts(isFeatured),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
