'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type CaseStudyCarouselProps = {
  images: string[];
};

function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full py-3">
      <div className="max-w-7xl mx-auto px-4 relative">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="swiperss bottom-page pb-14"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[200px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`case-study-${index}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev */}
        <button
          ref={prevRef}
          className="case-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-xl w-15 h-15 bg-[#121212]/20 rounded-full cursor-pointer hover:bg-[#121212]/50 font-bold flex items-center justify-center"
          type="button"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Next */}
        <button
          ref={nextRef}
          className="case-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-xl w-15 h-15 bg-[#121212]/20 rounded-full cursor-pointer hover:bg-[#121212]/50 font-bold flex items-center justify-center"
          type="button"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}

export function Increase() {
  const router = useRouter();

  return (
    <section className="w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
          <span className="text-blue-600">Jangan Percaya Kita, Lihat Saja</span>
          Hasil Member VIP Akademi Marketer.
        </h2>

        <div className="space-y-10">
          <CaseStudyCarousel
            images={['/images/increase1.webp', '/images/increase2.webp']}
          />

          <CaseStudyCarousel
            images={[
              '/images/increase3.webp',
              '/images/increase4.webp',
              '/images/increase5.webp',
            ]}
          />
        </div>

        <div className="p-5 flex items-center justify-center">
          <Button
            className="h-10 w-[180px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-700 text-white text-base"
            onClick={() => router.push('/#join-now')}
          >
            Join Now
          </Button>
        </div>
      </div>
    </section>
  );
}
