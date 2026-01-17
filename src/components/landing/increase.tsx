'use client';

import CaseStudyCarousel from './carousels';

export default function Increase() {
  return (
    <section className="w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
          <span className="text-red-600">
            Hasil peningkatan followers dan pendapatan
          </span>
          <br />
          alumni dari product digital. Kalian kapan nyusul?
        </h2>

        <div className="space-y-10">
          <CaseStudyCarousel
            images={[
              '/images/increase1.webp',
              '/images/increase2.webp',
              '/images/increase3.webp',
              '/images/increase4.webp',
              '/images/increase5.webp',
              '/images/increase6.webp',
              '/images/increase7.webp',
            ]}
          />

          <CaseStudyCarousel
            images={[
              '/images/increase8.webp',
              '/images/increase9.webp',
              '/images/increase10.webp',
              '/images/increase11.webp',
              '/images/increase12.webp',
            ]}
          />
        </div>
      </div>
    </section>
  );
}
