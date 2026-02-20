'use client';

import { useQuery } from '@tanstack/react-query';
import { CatalogService } from '@/services/catalog';
import { useState } from 'react';

export const useCatalog = () => {
  const [page, setPage] = useState(1);

  const { data: catalogs, isLoading: loadingCatalogs } = useQuery({
    queryKey: ['catalogs', page],
    queryFn: () => CatalogService.getCatalogs(page),
  });

  return {
    catalogs,
    loadingCatalogs,
    page,
    setPage,
  };
};

export const useCatalogDetail = (slug: string | null) => {
  const { data: catalog, isLoading: loadingCatalog } = useQuery({
    queryKey: ['catalog', slug],
    queryFn: () => (slug ? CatalogService.getCatalogDetail(slug) : null),
    enabled: !!slug,
  });

  return {
    catalog,
    loadingCatalog,
  };
};
