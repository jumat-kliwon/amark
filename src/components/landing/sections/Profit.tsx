'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

export function Profit() {
  return (
    <section className="w-full pb-8 pt-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-10">
          <div className="text-blue-600">
            PASTIKAN KELAS INI COCOK UNTUK KAMU
          </div>
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
                'Pemula dari 0 yang ingin mencari tambahan dari jualan online',
                'Dropshiper yang baru mau memulai dan meminimalisir iklan boncos',
                'Brand Owner produk fisik yang mau meningkatkan omset dengan budget iklan',
                'Brand Owner yang stuck ingin berkembang dengan digital marketing',
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
                'Content Creator yang beriklan untuk meningkatkan followers',
                'Brand Owner produk ilegal atau hit and run',
                'Brand / Produk Owner yang tidak mau meningkatkan omset dengan iklan',
                'Orang yang ingin cepat kaya tanpa melalui PROSES',
                'Malas membaca, malas melihat video dan belajar',
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
