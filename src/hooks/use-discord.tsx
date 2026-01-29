'use client';

import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';

export const useDiscord = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['discord'],
    queryFn: () => UserService.getDiscord(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
