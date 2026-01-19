'use client';

import Image from 'next/image';

import { PROOF_COL_1, PROOF_COL_2, PROOF_COL_3 } from '@/components/landing/data/proof';

function Column({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      {images.map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-[#121212]/40">
          <Image
            src={src}
            alt=""
            width={500}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

export function ProofGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column images={PROOF_COL_1} />
          <Column images={PROOF_COL_2} />
          <Column images={PROOF_COL_3} />
        </div>
      </div>
    </section>
  );
}

