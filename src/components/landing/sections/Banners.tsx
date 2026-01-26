'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Banners() {
  const [play, setPlay] = useState(false);
  const router = useRouter();

  return (
    <div className="text-center space-y-3 max-w-4xl pt-20 md:pt-32 px-3">
      <h1 className="text-4xl font-bold uppercase">
        <span className="text-blue-600">STRATEGI META ADS</span> dari{' '}
        <span className="text-blue-600">DROPSHIP</span> SAMPAI{' '}
        <span className="text-blue-600">IKLAN BRAND SENDIRI</span> MESKIPUN{' '}
        <span className="text-blue-600">BUDGET DIBAWAH 500K</span> PER HARI!
      </h1>

      <div className="space-y-1">
        <div className="text-base font-semibold text-gray-200">
          Dibimbing dari 0, ditemenin dari basic, dan LIVE MENTORING{' '}
          <u>TIAP HARI</u> kelas mana lagi coba yang Live mentoring tiap hari?
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
            src="https://www.youtube.com/embed/iQQi4tSipxo?autoplay=1&rel=0&controls=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      <div className="pb-10">
        <Button
          className="h-10 w-[180px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-700 text-white text-base"
          onClick={() => router.push('/#join-now')}
        >
          Join Now
        </Button>
      </div>

      <div className="pb-10 text-center">
        <p className="mb-4">
          Kami tahu bahwa kamu pernah mempertimbangkan atau membeli kelas-kelas
          seperti ini sebelumnya.
        </p>
        <p className="mb-4">
          Pasti kalian tidak asing dengan iming-iming copywriting untuk memikat
          hati dan membeli kelas. Tapi kami berbeda, kami akan langsung to the
          point untuk membantu kamu memutuskan apakah kelas ini cocok untukmu.
          Kami menyebutnya{' '}
          <u className="text-blue-600">no bullshit copywriting.</u>
        </p>
        <p className="mb-4">
          Kelas ini akan membimbing dan menemanimu menjadi seorang bisnis owner
          pemilik brand. Akan tetapi, jadi bisnis owner tidak semudah omongan
          motivator. Jalan yang paling cepat untuk memulai adalah dengan menjadi
          dropshiper.
        </p>
        <p>Kenapa dropshiper?</p>
        <p className="mb-4">
          Simpel, bisa pindah-pindah produk jika tidak fit dengan market,
          beriklan bisa untung cepat dan minimum boncos tinggal matikan iklan,
          dan bangun pengalaman jualan sebelum punya brand sendiri. Bandingkan
          dengan langsung punya brand, risiko apa saja yang harus dihadapi?
          Silahkan pertimbangkan dulu di tabel berikut apakah kelas ini cocok
          untukmu? Jangan beli sesuatu yang mubazir
        </p>
      </div>
    </div>
  );
}
