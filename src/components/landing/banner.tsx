'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function Banners() {
  const [play, setPlay] = useState(false);
  const router = useRouter();

  return (
    <div className="text-center space-y-3 max-w-4xl pt-20 md:pt-32">
      <h1 className="text-4xl font-bold uppercase">
        Strategi{' '}
        <span className="text-red-600">100K followers & 10jt Pertama</span> dari
        Content Creator dan Product Digital
      </h1>

      <div className="space-y-1">
        <div className="text-base font-semibold text-gray-200">
          Kelas Online Untuk:
        </div>
        <div className="text-gray-400">
          Naikin Followers ➔ Bangun Personal Brand ➔ Dapat Endorse ➔ Jual
          Product Digital
        </div>
      </div>

      <div className="max-w-4xl mx-auto aspect-video relative rounded-xl overflow-hidden">
        {!play ? (
          <button
            onClick={() => setPlay(true)}
            className="w-full h-full relative group"
            type="button"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-full">
              <Image
                src="/images/banner.webp"
                alt="Play Video"
                className="object-cover"
                fill
                priority
                unoptimized
              />
            </div>
          </button>
        ) : (
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/-LCMbbICJjs?autoplay=1&rel=0&controls=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
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
