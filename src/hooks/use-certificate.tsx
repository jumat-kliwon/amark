'use client';

import { useQuery } from '@tanstack/react-query';
import { CertificateService } from '@/services/certificate';
import { useState } from 'react';

export const useCertificates = (page: number = 1) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['certificates', page],
    queryFn: () => CertificateService.getCertificates({ page }),
  });

  return {
    certificates: data?.data || [],
    pagination: data?.meta,
    links: data?.links,
    isLoading,
    error,
  };
};

export const useCertificateDetail = (id: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['certificate', id],
    queryFn: () => CertificateService.getCertificateDetail(id!),
    enabled: !!id,
  });

  return {
    certificate: data?.data,
    isLoading,
    error,
  };
};
