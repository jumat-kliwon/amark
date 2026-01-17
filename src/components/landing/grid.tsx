'use client';

import Image from 'next/image';

const COL_1 = [
  '/images/testimoni1.webp',
  '/images/testimoni2.webp',
  '/images/testimoni3.webp',
  '/images/testimoni4.webp',
];

const COL_2 = [
  '/images/testimoni5.webp',
  '/images/testimoni6.webp',
  '/images/testimoni7.webp',
  '/images/testimoni8.webp',
];

const COL_3 = [
  '/images/testimoni9.webp',
  '/images/testimoni10.webp',
  '/images/testimoni11.webp',
  '/images/testimoni12.webp',
];

export default function ProofGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column images={COL_1} />
          <Column images={COL_2} />
          <Column images={COL_3} />
        </div>
      </div>
    </section>
  );
}

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
