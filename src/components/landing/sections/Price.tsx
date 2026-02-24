'use client';

import { useRouter } from 'next/navigation';
import { Check, Zap } from 'lucide-react';

import { useSettingsContext } from '@/contexts/SettingsContext';
import { formatCurrency } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import type { Membership } from '@/services/settings/type';

export function Price() {
  const { settings } = useSettingsContext();
  const router = useRouter();

  if (!settings?.memberships?.length) return null;

  const renderCard = (item: Membership, isRecommended: boolean) => {
    const priceNum = Number(item.price ?? 0);
    const originalPriceNum = item.original_price ? Number(item.original_price) : 0;
    const hasDiscount = originalPriceNum > priceNum;
    const features = item.benefit ?? [];

    const innerContent = (
      <div className="flex flex-col h-full min-h-[420px]">
        {/* Badge REKOMENDASI UTAMA */}
        {isRecommended ? (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            }}
            role="status"
            aria-label="Rekomendasi utama"
          >
            REKOMENDASI UTAMA
          </div>
        ) : null}

        {/* Header */}
        <div className="mb-4">
          <h3 id={`price-card-${item.id}`} className="text-xl font-bold text-white">
            {item.name}
          </h3>
          {item.description ? (
            <div
              className="mt-1 text-sm text-neutral-400 [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          ) : null}
        </div>

        {/* Price */}
        <div className="mb-6">
          {hasDiscount ? (
            <div className="text-sm text-neutral-500 line-through">
              Rp {formatCurrency(originalPriceNum)}
            </div>
          ) : null}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-bold text-white">
              Rp {formatCurrency(priceNum)}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-white">
              {isRecommended ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <Zap className="h-4 w-4 text-green-400" />
                </span>
              ) : (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                  <Check className="h-4 w-4 text-blue-400" />
                </span>
              )}
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="space-y-2 mt-auto">
          <button
            className="w-full rounded-xl py-4 font-bold text-base transition bg-brand-blue text-white hover:bg-brand-blue/90"
            onClick={() => router.push(`/auth/register/${item.slug}`)}
            type="button"
            aria-label={isRecommended ? 'Daftar Bootcamp Sekarang' : `Beli paket ${item.name}`}
          >
            {isRecommended ? 'Daftar Bootcamp Sekarang' : 'Beli Paket'}
          </button>
          {isRecommended ? (
            <p className="text-center text-xs font-bold text-white">
              SISA 5 SLOT BATCH INI!
            </p>
          ) : null}
        </div>
      </div>
    );

    if (isRecommended) {
      return (
        <article
          key={item.id}
          className="relative flex flex-col rounded-2xl p-[2px] bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] h-full"
          aria-labelledby={`price-card-${item.id}`}
        >
          <div className="relative flex flex-col rounded-2xl bg-neutral-900 p-8 md:p-10 h-full">
            {innerContent}
          </div>
        </article>
      );
    }

    return (
      <article
        key={item.id}
        className="relative flex flex-col rounded-2xl border border-neutral-600/50 bg-neutral-900/80 p-8 md:p-10 h-full"
        aria-labelledby={`price-card-${item.id}`}
      >
        {innerContent}
      </article>
    );
  };

  return (
    <section
      className="relative text-white mb-20"
      id="join-now"
      aria-labelledby="price-section-heading"
    >
      <div className="relative max-w-6xl mx-auto px-3">
        <h2 id="price-section-heading" className="text-center text-2xl md:text-3xl font-bold mb-12">
          Pilih Paket Belajarmu
        </h2>

        <div
          className={cn(
            'grid grid-cols-1 gap-6 md:gap-8 items-stretch',
            settings.memberships.length === 2 && 'md:grid-cols-2',
            settings.memberships.length >= 3 && 'md:grid-cols-3'
          )}
        >
          {settings.memberships.map((item) =>
            renderCard(item, Boolean(item.is_default))
          )}
        </div>
      </div>

      <div className="space-y-4 mt-10">
        <div className="text-center text-neutral-400 text-sm">
          Materi sudah dapat diakses saat Kamu join. Materi berupa video rekaman
          yang dapat diakses kapanpun dimanapun. Untuk pertanyaan dan bimbingan
          dilakukan pada komunitas discord dan live bimbingan rutin.
        </div>
        <div className="text-center text-neutral-500 text-xs">T&C Applied</div>
      </div>
    </section>
  );
}
