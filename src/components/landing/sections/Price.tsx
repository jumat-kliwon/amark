'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

import { useSettingsContext } from '@/contexts/SettingsContext';
import { formatCurrency } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import type { Membership } from '@/services/settings/type';

export function Price() {
  const { settings } = useSettingsContext();
  const router = useRouter();

  if (!settings?.memberships?.length) return null;

  const renderCard = (item: Membership) => {
    const priceNum = Number(item.price ?? 0);
    const originalPriceNum = item.original_price ? Number(item.original_price) : 0;
    const hasDiscount = originalPriceNum > priceNum;
    const features = item.benefit ?? [];

    return (
      <article
        key={item.id}
        className="relative flex flex-col rounded-2xl border-2 border-primary bg-neutral-900/80 p-8 md:p-10 h-full"
        aria-labelledby={`price-card-${item.id}`}
      >
        <div className="flex flex-col h-full min-h-[420px] mb-5">
          {/* Header */}
          <div className="mb-4">
            <h2 id={`price-card-${item.id}`} className="text-2xl text-center font-bold text-white">
              {item.name}
            </h2>
            {item.description ? (
              <div
                className="mt-1 text-sm text-center text-neutral-400 [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            ) : null}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6 flex-1">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-white">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-4 w-4 text-primary" />
                </span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

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
          {/* CTA Button */}
          <div className="mt-auto">
            <button
              className="w-full rounded-xl py-4 font-bold text-base transition bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push(`/auth/register/${item.slug}`)}
              type="button"
              aria-label={`Join now ${item.name}`}
            >
              Join Now
            </button>
          </div>
        </div>
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
          {settings.memberships.map((item) => renderCard(item))}
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
