import axios from '@/lib/axios';
import type {
  DistrictResponse,
  ProvinceResponse,
  SubdistrictResponse,
  VillageResponse,
} from './type';

interface GetDistrictsParams {
  provinceId: number;
  search?: string;
}

interface GetSubdistrictsParams {
  cityId: number;
  search?: string;
}

interface GetVillagesParams {
  districtId: number;
  search?: string;
}

export const AddressService = {
  getProvinces: async (search?: string): Promise<ProvinceResponse> => {
    const { data } = await axios.get<ProvinceResponse>('/provinces', {
      params: search ? { search } : undefined,
    });
    return data;
  },

  getDistricts: async ({
    provinceId,
    search,
  }: GetDistrictsParams): Promise<DistrictResponse> => {
    const params: Record<string, string | number> = {
      province_id: provinceId,
    };
    if (search) params.search = search;
    const { data } = await axios.get<DistrictResponse>('/districts', {
      params,
    });
    return data;
  },

  getSubdistricts: async ({
    cityId,
    search,
  }: GetSubdistrictsParams): Promise<SubdistrictResponse> => {
    const params: Record<string, string | number> = {
      city_id: cityId,
    };
    if (search) params.search = search;
    const { data } = await axios.get<SubdistrictResponse>('/subdistricts', {
      params,
    });
    return data;
  },

  getVillages: async ({
    districtId,
    search,
  }: GetVillagesParams): Promise<VillageResponse> => {
    const params: Record<string, string | number> = {
      district_id: districtId,
    };
    if (search) params.search = search;
    const { data } = await axios.get<VillageResponse>('/villages', {
      params,
    });
    return data;
  },
};
