'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        router.replace('/course');
      }
    } catch {
      // ignore
    }
  }, [router]);

  return <>{children}</>;
}
