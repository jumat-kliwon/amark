'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function RegisterRedirectPage() {
  const router = useRouter();
  const { settings } = useSettingsContext();

  useEffect(() => {
    const defaultMembership = settings?.memberships?.find(
      (m) => m.is_default,
    );

    if (defaultMembership) {
      router.replace(`/auth/register/${defaultMembership.slug}`);
    }
  }, [settings, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="h-16 w-16 rounded-full bg-zinc-800 animate-pulse" />
    </div>
  );
}
