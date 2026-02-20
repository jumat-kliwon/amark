'use client';

import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';

export const useDiscord = (code?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['discord'],
    queryFn: () => UserService.getDiscord(),
  });

  const {
    data: callbackData,
    isLoading: callbackLoading,
    error: callbackError,
  } = useQuery({
    queryKey: ['callback', code],
    queryFn: () => UserService.getDiscordCallback(code),
    enabled: !!code,
  });

  return {
    data,
    isLoading,
    error,
    callbackData,
    callbackLoading,
    callbackError,
  };
};
