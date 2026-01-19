'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

import { useMembership } from '@/hooks/use-membership';
import { formatCurrency } from '@/lib/helpers';

export function Price() {
  const membership = useMembership();
  const router = useRouter();

  return (
    <section className="relative text-white mb-20" id="join-now">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
        JOIN & DAFTAR SEKARANG!
      </h2>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Card */}
        <div className="relative rounded-3xl border border-red-600/40 bg-gradient-to-b from-black to-neutral-900 p-10 md:p-14">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
            <div>
              <div className="space-y-3">
                <Image
                  src="/images/logo-only.webp"
                  alt="ACRE Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                  unoptimized
                />

                <p className="tracking-widest text-sm">
                  DAPATKAN AKSES LIFETIME
                  <br />
                  AKADEMI CREATOR HANYA
                </p>
              </div>
            </div>

            {membership.membership?.data ? (
              <div className="text-right">
                <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mb-2">
                  DARI RP
                  {formatCurrency(
                    Number(membership.membership?.data[0]?.price ?? 0) * 10,
                  )}
                </span>
                <div className="text-4xl md:text-5xl font-bold">
                  Rp
                  {formatCurrency(
                    Number(membership.membership?.data[0]?.price ?? 0),
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[100px] w-1/2 bg-zinc-800 rounded-lg animate-pulse mt-10" />
            )}
          </div>

          <hr className="border-white/10 mb-10" />

          {/* Benefit */}
          <h3 className="mb-6 tracking-widest text-sm">BENEFIT</h3>

          {membership.membership?.data ? (
            <ul className="space-y-4 mb-12">
              {membership.membership?.data[0]?.benefit.map((item, i) => {
                return (
                  <li key={i} className="flex gap-3">
                    <div className="bg-green-500 rounded-full flex items-center justify-center h-[20px] w-[20px]">
                      <Check className="text-black font-bold" size={12} />
                    </div>
                    <div className="text-sm text-gray-300 flex-1">{item}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[28px] w-full bg-zinc-800 rounded-lg animate-pulse mb-3"
              />
            ))
          )}

          {/* CTA */}
          {membership.membership?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {membership.membership.data.map((item, key) => (
                <button
                  key={item.id}
                  className={`rounded-xl text-black py-4 font-bold text-lg hover:opacity-90 transition ${
                    key % 2
                      ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                      : 'bg-white'
                  }`}
                  onClick={() =>
                    router.push(`auth/register?membership=${item.id}`)
                  }
                  type="button"
                >
                  {item.name}
                  <br />
                  RP{formatCurrency(Number(item.price ?? 0))}
                </button>
              ))}
            </div>
          ) : (
            <div className="h-[100px] w-full bg-zinc-800 rounded-lg animate-pulse mt-10" />
          )}

          <p className="text-center text-xs text-gray-400 mt-6">
            Dapatkan seluruh fasilitasnya baik akses <b>1 TAHUN</b> maupun{' '}
            <b>LIFETIME</b>
          </p>
        </div>
      </div>
    </section>
  );
}

