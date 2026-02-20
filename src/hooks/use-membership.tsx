'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '@/services/order';
import {
  CheckCouponResponse,
  MembershipDtResponse,
  MembershipRequest,
  MembershipResponse,
} from '@/services/order/type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useMembership() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [couponValid, setCouponValid] = useState(true);
  const [coupons, setCoupons] = useState<CheckCouponResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: membership, isLoading: loadingMembership } = useQuery({
    queryKey: ['membership'],
    queryFn: () => OrderService.getMembership(),
  });

  const { mutate: newOrder, isPending: loadingNewOrder } = useMutation({
    mutationFn: (dt: MembershipRequest) =>
      OrderService.postOrder({
        product_id: dt.product_id,
        coupon: dt.coupon,
      }),

    onSuccess: (data: MembershipDtResponse) => {
      toast.success('Pesanan berhasil dibuat!');
      if (data.data.payment_url) {
        window.location.href = data.data.payment_url;
      }
      queryClient.invalidateQueries({
        queryKey: ['membership'],
      });
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Pesanan gagal dibuat!');
    },
  });

  const { mutate: checkCoupon, isPending: loadingCheckCoupon } = useMutation({
    mutationFn: (dt: MembershipRequest) =>
      OrderService.checkCoupon({
        product_id: dt.product_id,
        coupon: dt.coupon,
      }),
    onSuccess: (res: CheckCouponResponse) => {
      toast.success('Kupon dapat digunakan!');
      setCoupons(res);
      setCouponValid(true);
    },
    onError: () => {
      toast.error('Kupon tidak dapat digunakan!');
      setCouponValid(false);
      setCoupons(null);
    },
  });

  return {
    membership,
    loadingMembership,
    newOrder,
    loadingNewOrder,
    checkCoupon,
    loadingCheckCoupon,
    couponValid,
    setCouponValid,
    coupons,
    setCoupons,
    isModalOpen,
    setIsModalOpen,
  };
}
