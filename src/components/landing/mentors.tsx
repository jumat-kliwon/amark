'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '../ui/button';
import { ArrowDownRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const mentors = [
  '/images/mentor1.webp',
  '/images/mentor2.webp',
  '/images/mentor3.webp',
  '/images/mentor4.webp',
  '/images/mentor5.webp',
  '/images/mentor6.webp',
  '/images/mentor7.webp',
  '/images/mentor8.webp',
];

export default function Mentors() {
  const router = useRouter();
  return (
    <div className="text-center space-y-8 w-full md:max-w-4xl py-10">
      <h1 className="text-5xl font-bold uppercase">Meet the mentors</h1>
      <div className="relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          className="swiperss pb-14"
        >
          {mentors.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-[550px] md:h-[420px]">
                <Image
                  src={item}
                  alt="image"
                  className="mx-auto"
                  fill
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pb-10">
        <Button
          className="h-10 w-[180px] rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
          onClick={() => router.push('/#join-now')}
        >
          Join Now <ArrowDownRight />
        </Button>
      </div>
    </div>
  );
}
