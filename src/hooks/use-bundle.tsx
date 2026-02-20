'use client';

import { useQuery } from '@tanstack/react-query';
import { BundleService } from '@/services/bundle';
import { useState } from 'react';

export const useBundles = () => {
  const [page, setPage] = useState(1);

  const { data: bundles, isLoading: loadingBundles } = useQuery({
    queryKey: ['bundles', page],
    queryFn: () => BundleService.getBundles(page),
  });

  return {
    bundles,
    loadingBundles,
    page,
    setPage,
  };
};

export const useBundleDetail = (slug: string | null) => {
  const { data: bundle, isLoading: loadingBundle } = useQuery({
    queryKey: ['bundle', slug],
    queryFn: () => (slug ? BundleService.getBundleDetail(slug) : null),
    enabled: !!slug,
  });

  return {
    bundle,
    loadingBundle,
  };
};
