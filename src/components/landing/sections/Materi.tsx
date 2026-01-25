'use client';

import Image from 'next/image';

export function Materi() {
  return (
    <section className="w-full px-4 pb-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full min-h-[900px] md:min-h-[2500px] shrink-0 rounded-xl overflow-hidden">
          <Image
            src="/images/amark-materi.webp"
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
