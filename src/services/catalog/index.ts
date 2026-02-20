import axios from '@/lib/axios';
import type { CatalogDetailResponse, CatalogListResponse } from './type';

export const CatalogService = {
  getCatalogs: async (page?: number) => {
    const params = page ? { page } : {};
    const { data } = await axios.get<CatalogListResponse>('/catalogs', {
      params,
    });
    return data;
  },

  getCatalogDetail: async (slug: string): Promise<CatalogDetailResponse> => {
    const { data } = await axios.get<CatalogDetailResponse>(`/catalogs/${slug}`);
    return data;
  },
};
