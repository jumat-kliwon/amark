'use client';

import { useQuery } from '@tanstack/react-query';
import { AddressService } from '@/services/address';

export const useProvinces = (search?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['provinces', search ?? ''],
    queryFn: () => AddressService.getProvinces(search?.trim() || undefined),
  });

  return {
    provinces: data?.data ?? [],
    isLoadingProvinces: isLoading,
  };
};

export const useDistricts = (provinceId: number | null, search?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['districts', provinceId, search ?? ''],
    queryFn: () =>
      provinceId
        ? AddressService.getDistricts({
            provinceId,
            search: search?.trim() || undefined,
          })
        : { data: [] },
    enabled: !!provinceId,
  });

  return {
    districts: data?.data ?? [],
    isLoadingDistricts: isLoading,
  };
};

export const useSubdistricts = (cityId: number | null, search?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['subdistricts', cityId, search ?? ''],
    queryFn: () =>
      cityId
        ? AddressService.getSubdistricts({
            cityId,
            search: search?.trim() || undefined,
          })
        : { data: [] },
    enabled: !!cityId,
  });

  return {
    subdistricts: data?.data ?? [],
    isLoadingSubdistricts: isLoading,
  };
};

export const useVillages = (districtId: number | null, search?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['villages', districtId, search ?? ''],
    queryFn: () =>
      districtId
        ? AddressService.getVillages({
            districtId,
            search: search?.trim() || undefined,
          })
        : { data: [] },
    enabled: !!districtId,
  });

  return {
    villages: data?.data ?? [],
    isLoadingVillages: isLoading,
  };
};
