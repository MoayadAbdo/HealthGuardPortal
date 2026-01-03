import { useQuery } from "@tanstack/react-query";
import { mockFetch } from "@/api";

export function useLogs() {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const res = await mockFetch("/logs");
      return res.json();
    },
  });
}