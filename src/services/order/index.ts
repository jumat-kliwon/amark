// services/course/index.ts
import axios from '@/lib/axios';
import { CheckCouponResponse, MembershipRequest, MembershipResponse, OrderResponse } from './type';

interface GetCoursesParams {
  page?: number;
  limit?: number;
}

export const OrderService = {
  getOrder: async (page: number): Promise<OrderResponse> => {
    const { data } = await axios.get(`/orders?page=${page}`);
    return data;
  },

  getMembership: async (): Promise<MembershipResponse> => {
    const { data } = await axios.get('/memberships');
    return data;
  },

  postOrder: async (dt: MembershipRequest): Promise<MembershipResponse> => {
    const { data } = await axios.post(`/orders`, dt);
    return data;
  },

  checkCoupon: async (dt: MembershipRequest): Promise<CheckCouponResponse> => {
    const { data } = await axios.post(`/orders/validate-coupon`, dt);
    return data;
  },
};
