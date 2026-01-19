'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '@/services/order';
import { CheckCouponResponse, MembershipRequest } from '@/services/order/type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useMembership() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [couponValid, setCouponValid] = useState(true);
  const [coupons, setCoupons] = useState<CheckCouponResponse | null>(null);

  const { data: membership, isLoading: loadingMembership } = useQuery({
    queryKey: ['membership'],
    queryFn: () => OrderService.getMembership(),
  });

  const { mutate: newOrder, isPending: loadingNewOrder } = useMutation({
    mutationFn: (dt: MembershipRequest) =>
      OrderService.postOrder({
        membership_id: dt.membership_id,
        coupon: dt.coupon,
      }),

    onSuccess: () => {
      toast.success('Pesanan berhasil dibuat!');
      router.push('/member/subscription');
      queryClient.invalidateQueries({
        queryKey: ['membership'],
      });
    },
    onError: () => {
      toast.error('Pesanan gagal dibuat!');
    },
  });

  const { mutate: checkCoupon, isPending: loadingCheckCoupon } = useMutation({
    mutationFn: (dt: MembershipRequest) =>
      OrderService.checkCoupon({
        membership_id: dt.membership_id,
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
  };
}
