'use client';

import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';

export const useUserWithMembership = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userWithMembership'],
    queryFn: () => UserService.getUserWithMembership(),
  });

  return {
    user: data?.data?.user,
    membership: data?.data?.membership,
    isLoading,
    error,
  };
};
