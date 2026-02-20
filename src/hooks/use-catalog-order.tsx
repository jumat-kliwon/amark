'use client';

import { useMutation } from '@tanstack/react-query';
import { OrderService } from '@/services/order';
import type {
  CalculateShippingRequest,
  CatalogOrderRequest,
  MembershipDtResponse,
} from '@/services/order/type';
import type { ShippingOptionItem } from '@/services/order/type';
import { toast } from 'sonner';

export const useCalculateShipping = () => {
  const {
    mutateAsync: calculateShippingAsync,
    isPending: loadingCalculateShipping,
    data: shippingResponse,
  } = useMutation({
    mutationFn: (payload: CalculateShippingRequest) =>
      OrderService.calculateShipping(payload),
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

export const useCatalogOrder = () => {
  const { mutate: postCatalogOrder, isPending: loadingPostOrder } = useMutation({
    mutationFn: (payload: CatalogOrderRequest) =>
      OrderService.postCatalogOrder(payload),
    onSuccess: (data: MembershipDtResponse) => {
      toast.success('Pesanan berhasil dibuat!');
      if (data.data.payment_url) {
        window.location.href = data.data.payment_url;
      }
    },
    onError: () => {
      toast.error('Pesanan gagal dibuat!');
    },
  });

  return {
    postCatalogOrder,
    loadingPostOrder,
  };
};
