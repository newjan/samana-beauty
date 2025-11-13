import { useQuery } from "@tanstack/react-query";
import { fetchDashboardContent } from "../api";

export function useDashboardContent() {
  return useQuery({
    queryKey: ["dashboardContent"],
    queryFn: fetchDashboardContent
  });
}
