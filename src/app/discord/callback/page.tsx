'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function DiscordCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!code) {
      router.replace('/course');
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push('/course');
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, code]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-6 w-6" />
        </div>

        <h1 className="mb-2 text-xl font-semibold">
          Discord Anda sudah terhubung 🎉
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Akun Discord berhasil dikaitkan dengan akun Anda.
        </p>

        <Link
          href="/course"
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Kembali ke Halaman Kursus
        </Link>

        <p className="mt-4 text-xs text-muted-foreground">
          Anda akan diarahkan otomatis dalam{' '}
          <span className="font-semibold text-foreground">{countdown}</span>{' '}
          detik…
        </p>
      </div>
    </div>
  );
}
