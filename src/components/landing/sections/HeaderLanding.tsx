'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function HeaderLanding() {
  const router = useRouter();

  return (
    <header className="w-full fixed z-[99] bg-background">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/images/logo.webp"
          alt="ACRE Logo"
          width={140}
          height={32}
          className="object-contain"
          priority
          unoptimized
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            className="h-10 rounded-xl text-base bg-zinc-800 hover:bg-zinc-900"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>

          <Button
            className="h-10 rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
            onClick={() => router.push('/#join-now')}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}

