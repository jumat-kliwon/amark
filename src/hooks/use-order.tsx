'use client';

import { useQuery } from '@tanstack/react-query';
import { OrderService } from '@/services/order';

export const useOrders = (page: number = 1) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => OrderService.getOrder(page),
  });

  return {
    orders: data?.data || [],
    pagination: data?.meta,
    links: data?.links,
    isLoading,
    error,
  };
};

export const useOrder = (id: number | string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => OrderService.getOrderById(id!),
    enabled: !!id,
  });

  return {
    order: data?.data ?? null,
    isLoading,
    error,
  };
};
