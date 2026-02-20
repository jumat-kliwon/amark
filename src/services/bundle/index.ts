import axios from '@/lib/axios';
import type {
  BundleDetailResponse,
  BundleListResponse,
  BundleValidateCouponRequest,
  BundleCalculateShippingRequest,
} from './type';
import type { CheckCouponResponse } from '@/services/order/type';
import type { CalculateShippingResponse } from '@/services/order/type';

export const BundleService = {
  getBundles: async (page?: number) => {
    const params = page ? { page } : {};
    const { data } = await axios.get<BundleListResponse>('/bundles', {
      params,
    });
    return data;
  },

  getBundleDetail: async (slug: string): Promise<BundleDetailResponse> => {
    const { data } = await axios.get<BundleDetailResponse>(`/bundles/${slug}`);
    return data;
  },

  validateCoupon: async (
    payload: BundleValidateCouponRequest
  ): Promise<CheckCouponResponse> => {
    const { data } = await axios.post('/bundle/validate-coupon', payload);
    return data;
  },

  calculateShipping: async (
    slug: string,
    payload: BundleCalculateShippingRequest
  ): Promise<CalculateShippingResponse> => {
    const { data } = await axios.post(
      `/bundle/${slug}/calculate-shipping`,
      payload
    );
    return data;
  },

  orderBundle: async (slug: string) => {
    const { data } = await axios.post(`/bundle/${slug}/order`);
    return data;
  },
};
