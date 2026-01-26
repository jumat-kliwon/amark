'use client';

import Image from 'next/image';

export function BonusSection() {
  return (
    <section className="w-full px-4 pb-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full min-h-[700px] md:min-h-[1900px] shrink-0 rounded-xl overflow-hidden">
          <Image
            src="/images/amark-bonus.webp"
            alt="Akademi marketing lessons"
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
