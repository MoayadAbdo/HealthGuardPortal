import { useQuery } from "@tanstack/react-query";

type Stats = {
  totalPatients: number;
  activeAlerts: number;
  resolvedAlerts: number;
  systemStatus: "normal" | "warning" | "critical";
};

const mockStats: Stats = {
  totalPatients: 24,
  activeAlerts: 3,
  resolvedAlerts: 18,
  systemStatus: "warning",
};

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockStats;
    },
  });
}