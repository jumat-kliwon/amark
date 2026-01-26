'use client';

import { useRouter } from 'next/navigation';

import { useSettingsContext } from '@/contexts/SettingsContext';
import { formatCurrency } from '@/lib/helpers';

export function Price() {
  const { settings } = useSettingsContext();
  const router = useRouter();

  if (!settings?.memberships?.length) return null;

  return (
    <section className="relative text-white mb-20" id="join-now">
      <div className="relative max-w-6xl mx-auto px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.memberships.map((item) => (
            <div
              key={item.id}
              className="relative rounded-3xl border border-blue-600/40 bg-gradient-to-b from-black to-neutral-900 p-10 md:p-14"
            >
              {/* Header */}
              <div className="text-center text-xl uppercase mb-4 font-bold">
                {item.name}
              </div>

              <hr className="border-white/10 mb-8" />

              {/* Benefit */}
              <h3 className="mb-2 tracking-widest text-sm text-center font-bold">
                VIP Akses
              </h3>
              <div className="mb-6 tracking-widest text-sm text-center text-gray-200">
                {item.access_type_label}
              </div>

              {/* Price */}
              <div className="mt-5 mb-6 text-center">
                Rp{' '}
                <span className="text-3xl font-bold">
                  {formatCurrency(Number(item.price ?? 0))}
                </span>
              </div>

              <button
                className="w-full rounded-xl py-4 font-bold text-lg hover:opacity-90 transition bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                onClick={() => router.push(`/auth/register/${item.slug}`)}
                type="button"
              >
                JOIN NOW
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 mt-10">
        <div className="text-center">
          Materi sudah dapat diakses saat Kamu join. Materi berupa video rekaman
          yang dapat diakses kapanpun dimanapaun. Untuk pertanyaan dan bimbingan
          dilakukan pada
        </div>
        <div className="text-center">
          komunitas discord dan live bimbingan rutin.
        </div>
        <div className="text-center">T&C Applied</div>
      </div>
    </section>
  );
}
