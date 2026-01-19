'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import { marqueeRows } from '@/components/landing/data/marquee';

function SwiperRow({
  images,
  reverse,
}: {
  images: string[];
  reverse?: boolean;
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      speed={6000}
      slidesPerView={3.5}
      spaceBetween={24}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      breakpoints={{
        768: { slidesPerView: 1.5 },
        1024: { slidesPerView: 4.5 },
      }}
      className="w-full"
    >
      {[...images, ...images].map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-[40px] md:h-[120px] rounded-xl overflow-hidden">
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export function MarqueeRow() {
  return (
    <section className="w-full overflow-hidden py-20 space-y-8">
      {marqueeRows.map((row) => (
        <SwiperRow key={row.id} images={row.images} reverse={row.reverse} />
      ))}
    </section>
  );
}

