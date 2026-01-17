'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function Promote2() {
  const router = useRouter();

  return (
    <div className="w-full md:max-w-1/3 text-center mb-5 flex flex-col justify-center items-center">
      <div className="text-center text-xs w-full md:w-1/3">
        Akademi Creator tidak akan bisa melahirkan creatorpreneur sebanyak ini
        jika Kami tidak komitmen dan disiplin mendeliver kurikulum serta
        fasilitas after-sales service terbaik.
      </div>
      <div className="text-center uppercase text-xl font-semibold my-5">
        Mereka sudah memulai, kamu kapan?
      </div>
      <div className="relative w-[0.5px] h-[100px] md:h-[200px]">
        <Image
          src="/images/arrow.webp"
          alt="separator"
          fill
          priority
          unoptimized
        />
      </div>
      <div className="relative w-full h-[100px] my-3">
        <Image
          src="/images/stat.webp"
          alt="separator"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
      <div className="pb-10">
        <Button
          className="h-10 w-[180px] rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
          onClick={() => router.push('/#join-now')}
        >
          Join Now <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
