// services/order/index.ts
import axios from '@/lib/axios';
import {
  CalculateShippingRequest,
  CalculateShippingResponse,
  CatalogOrderRequest,
  CheckCouponResponse,
  MembershipDtResponse,
  MembershipRequest,
  MembershipResponse,
  OrderDetailResponse,
  OrderResponse,
} from './type';

export const OrderService = {
  getOrder: async (page: number): Promise<OrderResponse> => {
    const { data } = await axios.get(`/orders?page=${page}`);
    return data;
  },

  getOrderById: async (id: number | string): Promise<OrderDetailResponse> => {
    const { data } = await axios.get(`/orders/${id}`);
    return data;
  },

  getMembership: async (): Promise<MembershipResponse> => {
    const { data } = await axios.get('/memberships');
    return data;
  },

  postOrder: async (dt: MembershipRequest): Promise<MembershipDtResponse> => {
    const { data } = await axios.post(`/orders`, dt);
    return data;
  },

  checkCoupon: async (dt: MembershipRequest): Promise<CheckCouponResponse> => {
    const { data } = await axios.post(`/orders/validate-coupon`, dt);
    return data;
  },

  calculateShipping: async (
    payload: CalculateShippingRequest
  ): Promise<CalculateShippingResponse> => {
    const { data } = await axios.post(
      '/orders/calculate-shipping',
      payload
    );
    return data;
  },

  postCatalogOrder: async (
    payload: CatalogOrderRequest
  ): Promise<MembershipDtResponse> => {
    const { data } = await axios.post('/orders', payload);
    return data;
  },
};
