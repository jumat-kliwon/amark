'use client';

import Image from 'next/image';

import { PROMOTE_BENEFITS } from '@/components/landing/data/promote';

export function Promote() {
  return (
    <section className="w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-4xl font-bold text-white mb-14 uppercase">
          Kenapa Akademi Creator?
        </h2>

        <div className="w-full md:max-w-2xl mx-auto gap-6">
          {PROMOTE_BENEFITS.map((item, key) => {
            return (
              <div
                key={key}
                className="rounded-2xl border border-black shadow-[0_-3px_5px_rgba(205,0,0,0.35),0_2px_6px_rgba(80,0,0,0.8)] p-6 relative mb-6"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/2 h-[330px]">
                    <Image
                      src={item.img}
                      alt="img"
                      priority
                      unoptimized
                      fill
                      className="object-contain ml-0 md:-ml-20 z-[99]"
                    />
                  </div>
                  <div className="space-y-4 w-full md:w-1/2">
                    <div className="uppercase font-bold text-xl md:text-2xl text-center md:text-start">
                      {item.title}
                    </div>
                    <div className="text-gray-400 text-sm pt-4">{item.desc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

