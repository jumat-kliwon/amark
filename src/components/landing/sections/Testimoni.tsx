'use client';

import Image from 'next/image';

export function Testimoni() {
  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14 uppercase">
          Jangan Percaya Omongan Kita, Lihat Saja Hasilnya
        </h2>
      </div>
      <div className="mb-5">
        <div className="relative w-full h-[200px] md:h-[400px]">
          <Image
            src="/images/testi1.webp"
            alt="banner"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14 mt-4">
          <div className="text-red-600 uppercase">100K Followers</div>
          <div className="uppercase">Pertama</div>
        </h2>
      </div>
      <div className="mb-5">
        <div className="relative w-full h-[200px] md:h-[400px]">
          <Image
            src="/images/testi2.webp"
            alt="banner"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <h2 className="text-right text-3xl md:text-4xl font-bold text-white mb-14 w-full md:max-w-4/5 mt-4 pr-0 md:pr-10">
          <span className="text-red-600 uppercase">penghasilan alumni</span>
          <span className="uppercase">
            {' '}
            dari <br /> endorsement, Adsense, digital <br /> product dan digital
            service
          </span>
        </h2>
      </div>
    </section>
  );
}

