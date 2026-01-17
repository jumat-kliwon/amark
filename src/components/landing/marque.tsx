'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

type RowData = {
  id: number;
  images: string[];
  reverse?: boolean;
};

const rows: RowData[] = [
  {
    id: 1,
    reverse: false, // kiri
    images: [
      '/images/p1.webp',
      '/images/p2.webp',
      '/images/p3.webp',
      '/images/p4.webp',
      '/images/p1.webp',
      '/images/p2.webp',
    ],
  },
  {
    id: 2,
    reverse: true, // kanan
    images: [
      '/images/p5.webp',
      '/images/p6.webp',
      '/images/p7.webp',
      '/images/p8.webp',
      '/images/p9.webp',
      '/images/p10.webp',
    ],
  },
  {
    id: 3,
    reverse: false, // kiri
    images: [
      '/images/p11.webp',
      '/images/p12.webp',
      '/images/p13.webp',
      '/images/p14.webp',
      '/images/p11.webp',
      '/images/p12.webp',
    ],
  },
];

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
          <div
            className="relative h-[40px] md:h-[120px]
                       rounded-xl overflow-hidden"
          >
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

export default function MarqueeRow() {
  return (
    <section className="w-full overflow-hidden py-20 space-y-8">
      {rows.map((row) => (
        <SwiperRow key={row.id} images={row.images} reverse={row.reverse} />
      ))}
    </section>
  );
}
