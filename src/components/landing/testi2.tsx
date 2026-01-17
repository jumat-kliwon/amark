'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function Testi2() {
  const router = useRouter();
  const [play, setPlay] = useState(false);
  const [playSecond, setPlaySecond] = useState(false);

  return (
    <section className="relative text-white mb-20">
      <div className="text-red-700 text-center text-xl font-bold w-full md:w-2/3 mx-auto mb-6 mt-10">
        TESTIMONIAL
      </div>
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-8 uppercase">
        Dengarkan apa kata mereka
      </h2>
      <div className="text-gray-300 text-center w-full md:w-2/3 mx-auto mb-10">
        Bukan hanya promosi dan janji seperti mayoritas kelas online lainnya,
        tapi Akademi Creator menciptakan alumni yang sudah berhasil berubah
        hidupnya lewat ilmu-ilmu yang Kami berikan.
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="max-w-5xl mx-auto aspect-video relative rounded-xl overflow-hidden">
          <div>
            <div className="flex items-center justify-center">
              <Button
                className="h-10 w-[280px] rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
                onClick={() => router.push('/auth/member')}
              >
                TONTON TESTI
              </Button>
            </div>
            {!play ? (
              <button
                onClick={() => setPlay(true)}
                className="w-full h-[200px] md:h-[400px] relative group cursor-pointer"
                type="button"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/video1.webp"
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
                className="w-full h-[200px] md:h-[400px] rounded-xl"
                src="https://www.youtube.com/embed/Y9WVLFsC1o8?autoplay=1&rel=0&controls=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </div>
        <div className="max-w-5xl mx-auto aspect-video relative rounded-xl overflow-hidden">
          <div>
            {!playSecond ? (
              <button
                onClick={() => setPlaySecond(true)}
                className="w-full h-[200px] md:h-[400px] relative group cursor-pointer"
                type="button"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/video2.webp"
                    alt="Play Videos"
                    className="object-cover"
                    fill
                    priority
                    unoptimized
                  />
                </div>
              </button>
            ) : (
              <iframe
                className="w-full h-[200px] md:h-[400px] rounded-xl"
                src="https://www.youtube.com/embed/xGlgbnPZpDE?autoplay=1&rel=0&controls=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
