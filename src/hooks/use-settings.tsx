'use client';

import { useQuery } from '@tanstack/react-query';
import { SettingsService } from '@/services/settings';

export function useSettings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: () => SettingsService.getSettings(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return {
    settings: data?.data,
    isLoading,
    error,
  };
}
