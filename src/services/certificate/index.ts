import api from '@/lib/axios';
import type { CertificateListResponse, CertificateDetailResponse } from './type';

interface GetCertificatesParams {
  page?: number;
}

export const CertificateService = {
  getCertificates: async (params?: GetCertificatesParams): Promise<CertificateListResponse> => {
    const { data } = await api.get('/certificates', { params });
    return data;
  },

  getCertificateDetail: async (id: number): Promise<CertificateDetailResponse> => {
    const { data } = await api.get(`/certificates/${id}`);
    return data;
  },
};
