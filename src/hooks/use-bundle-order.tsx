'use client';

import { useMutation } from '@tanstack/react-query';
import { BundleService } from '@/services/bundle';
import type { BundleCalculateShippingRequest } from '@/services/bundle/type';
import type { ShippingOptionItem } from '@/services/order/type';
import { toast } from 'sonner';

export const useBundleCalculateShipping = (slug: string | null) => {
  const {
    mutateAsync: calculateShippingAsync,
    isPending: loadingCalculateShipping,
    data: shippingResponse,
  } = useMutation({
    mutationFn: (payload: BundleCalculateShippingRequest) =>
      slug ? BundleService.calculateShipping(slug, payload) : Promise.reject(new Error('No slug')),
    onError: () => {
      toast.error('Gagal menghitung ongkos kirim');
    },
  });

  const shippingOptions: ShippingOptionItem[] = shippingResponse?.data ?? [];

  return {
    calculateShippingAsync,
    loadingCalculateShipping,
    shippingOptions,
  };
};
