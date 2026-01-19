'use client';

import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

import { MATERI_ITEMS } from '@/components/landing/data/materi';

export function Materi() {
  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-xl font-bold mb-5 bg-gradient-to-r from-red-600 to-red-900 bg-clip-text text-transparent">
          CURRICULUM PROGRAM
        </h2>

        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14 uppercase">
          Materi Pembelajaran ACRE
        </h2>

        <div className="relative">
          <div className="relative z-10">
            {MATERI_ITEMS.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0 py-4 mb-4"
              >
                {/* IMAGE - LEFT */}
                <div className="relative w-full md:w-2/5 h-[220px] shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>

                {/* NUMBER - CENTER */}
                <div className="w-1/5 flex justify-center relative z-20">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-900 text-white rounded-full font-bold text-lg shrink-0">
                    {index + 1}
                  </div>
                </div>

                {/* CONTENT - RIGHT */}
                <div className="w-full md:w-2/5 space-y-2 text-center md:text-left">
                  <div className="text-white font-bold uppercase">
                    {item.title}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                    <PlayCircle className="w-4 h-4" />
                    {item.watch}+ Video Pembelajaran
                  </div>

                  <div className="flex items-start justify-center md:justify-start gap-2 text-gray-400 text-xs">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full border-l border-gray-800 z-0 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}

