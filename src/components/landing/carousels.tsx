'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseStudyCarouselProps {
  images: string[];
}

export default function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
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
            // 🔥 IMPORTANT PART
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
        <button className="case-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-xl w-15 h-15 bg-[#121212]/20 rounded-full cursor-pointer hover:bg-[#121212]/50 font-bold flex items-center justify-center">
          <ChevronLeft size={30} />
        </button>

        {/* Next */}
        <button className="case-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-xl w-15 h-15 bg-[#121212]/20 rounded-full cursor-pointer hover:bg-[#121212]/50 font-bold flex items-center justify-center">
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}
