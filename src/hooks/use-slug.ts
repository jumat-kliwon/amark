'use client';

import { useParams } from 'next/navigation';

export function useSlug(): string | null {
  const params = useParams();

  if (!params?.id) return null;

  return Array.isArray(params.id)
    ? params.id[0]
    : params.id;
}
