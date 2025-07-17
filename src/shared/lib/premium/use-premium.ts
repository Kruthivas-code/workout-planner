"use client";

import { useQuery } from "@tanstack/react-query";

import type { PremiumStatus, UserSubscription } from "@/shared/types/premium.types";

export function usePremiumStatus() {
  return useQuery({
    queryKey: ["premium-status", "demo"],
    queryFn: async (): Promise<PremiumStatus> => {
      // Demo mode - always return non-premium
      return { isPremium: false };
    },
    enabled: false, // Disable the query
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSubscription() {
  return useQuery({
    queryKey: ["subscription", "demo"],
    queryFn: async (): Promise<UserSubscription> => {
      // Demo mode - always return inactive
      return { isActive: false };
    },
    enabled: false, // Disable the query
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Simple boolean check - most common use case
export function useIsPremium(): boolean {
  const { data: premiumStatus } = usePremiumStatus();
  return premiumStatus?.isPremium ?? false;
}
