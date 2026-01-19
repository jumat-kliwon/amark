'use client';

import Image from 'next/image';
import clsx from 'clsx';

import { BONUS_LIST } from '@/components/landing/data/bonus';

export function BonusSection() {
  return (
    <section className="relative py-10 text-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center tracking-widest mb-10 text-3xl uppercase font-semibold">
          BONUS YANG KALIAN DAPATKAN
          <br />
          SETELAH BERGABUNG MENJADI MEMBER
        </h2>

        <div className="space-y-10">
          {BONUS_LIST.map((item, i) => {
            const reverse = i % 2 === 1;

            return (
              <div
                key={item.number}
                className={clsx(
                  'grid grid-cols-1 md:grid-cols-2 gap-12 items-center rounded-2xl border border-black shadow-[0_-10px_15px_rgba(105,0,0,0.25),0_2px_3px_rgba(100,0,0,0.2)] p-6',
                )}
              >
                {/* TEXT */}
                <div className={clsx(reverse && 'md:order-2')}>
                  <div className="text-red-600 text-6xl font-bold mb-6">
                    {item.number}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 max-w-md">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 max-w-md mb-6">{item.desc}</p>

                  <span className="inline-block bg-green-500 text-black text-sm font-semibold px-6 py-2 rounded-full">
                    {item.value}
                  </span>
                </div>

                {/* IMAGE */}
                <div className={clsx('relative', !reverse && 'md:order-2')}>
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="object-contain"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-20">
          <Image
            src="https://akademicreator.com/wp-content/uploads/2025/03/Rectangle-Value-1536x557.webp"
            alt="promo"
            width={380}
            height={200}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

