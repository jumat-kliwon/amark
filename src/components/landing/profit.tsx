'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

export default function Profit() {
  return (
    <section
      className="w-full pb-8 pt-16 px-4"
      style={{
        backgroundImage: 'url("/images/bg-red.webp")',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1000px',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-10">
          <div>Sebelum membeli, pastikan kelas</div>
          <div className="text-red-600">ini cocok dengan kalian</div>
        </h2>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Beli Jika */}
          <div className="rounded-2xl border border-black shadow-[0_-3px_5px_rgba(0,255,0,0.35),0_2px_6px_rgba(0,50,0,0.5)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-semibold text-white">Beli Jika</h3>
              <CheckCircle2 className="text-green-500 w-7 h-7" />
            </div>

            <ul className="space-y-4">
              {[
                'Mau dapet penghasilan tambahan diluar kantor',
                'Mau switch karir full time bisnis digital/creator',
                'Mau punya followers banyak',
                'Expert dalam ilmu tertentu mau monetize',
                'Followers banyak, monetize susah',
                'Mau jualan produk digital yang laku keras',
                'Mau punya banyak waktu untuk keluarga',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/90 border-b border-white/10 pb-4"
                >
                  <CheckCircle2 className="text-green-500 w-5 h-5 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Jangan Beli Jika */}
          <div className="rounded-2xl border border-black shadow-[0_-3px_5px_rgba(255,0,0,0.35),0_2px_6px_rgba(80,0,0,0.5)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Jangan Beli Jika
              </h3>
              <XCircle className="text-red-500 w-7 h-7" />
            </div>

            <ul className="space-y-4">
              {[
                'Mau bikin konten entertainment',
                'Mau bikin konten pamer aurat',
                'Mau jual produk digital hit & run',
                'Bikin konten atau jual produk ilegal',
                'Mau belajar ngiklan jualan produk fisik',
                'Mau dapet followers pakai jalur beli, FLKS',
                'Mau tenar dan kaya mendadak',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/60 border-b border-white/10 pb-4"
                >
                  <XCircle className="text-red-500 w-5 h-5 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
