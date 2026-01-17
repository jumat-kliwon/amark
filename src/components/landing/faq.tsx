'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    q: 'Bagaimana sistem pembelajarannya?',
    a: 'Kamu akan diberikan akses ke member area. Pada member area, Kamu bisa akses 300+ video pembelajaran. Jadi tidak diberikan lewat Email per hari, atau lewat grup Discord. Kamu bisa pause dan ulang pembelajarannya kapanpun dimanapun.',
  },
  {
    q: 'Apakah bisa diakses lewat HP ?',
    a: 'Kamu bisa akses member area beserta video pembelajarannya lewat browser HP',
  },
  {
    q: 'Saya gaptek & pemula',
    a: 'Kelas ini justru sangat tepat dan relevan bagi Kamu yang masih pemula dan merasa gaptek. Dari pengalaman Bang Ogut saat bangun akun dan membimbing member, ia sudah sangat tahu permasalahan dan solusi yang tepat bagi Kamu yang masih pemula.',
  },
  {
    q: 'Kalau bingung, gimana tanyanya?',
    a: 'Jika ada kebingungan, Kamu bisa bertanya dan konsultasi melalui 2 jalur. Jalur pertama, konsultasi melalui komunitas Discord karena sudah disediakan senior – senior mentor untuk membalas dan berdiskusi pertanyaan – pertanyaan Kamu. Jalur kedua, melalui live rutin setiap minggu di hari Selasa dan Jum’at.',
  },
  {
    q: 'Live rutinnya lewat mana ?',
    a: 'Jika ada kebingungan, Kamu bisa bertanya dan konsultasi melalui 2 jalur. Jalur pertama, konsultasi melalui komunitas Discord karena sudah disediakan senior – senior mentor untuk membalas dan berdiskusi pertanyaan – pertanyaan Kamu. Jalur kedua, melalui live rutin setiap minggu di hari Selasa dan Jum’at.',
  },
  {
    q: 'Apa bedanya Akademi Creator dengan kelas lainnya ?',
    a: 'Akademi Creator tidak hanya mengajarkan Kamu trik-trik grow cepat dengan ngakal-ngakalin algoritma. Modul di dalam berdasarkan dari ilmu psikologi dan Neuroscience. Ilmu tentang otak manusia. ​ Akademi Creator juga ada modul percepatan untuk Kamu bisa ngembangin akun. Modul percepatan dibuat berdasarkan pengalaman dan solusi dari masalah member-member yang sudah join dari tahun 2020 kelasnya Bang Ogut.',
  },
  {
    q: 'Apakah dijamin akan sukses?',
    a: 'Tidak ada jaminan, kami bukan utusan tuhan yang bisa memberi kepastian. Membeli kelas ini artinya kalian meningkatkan probabilitas kesuksesan dibanding tidak membeli kelas. Ingat yang pasti di dunia ini hanya 2. Kematian dan pajak',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

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
      <div className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          FREQUENTLY ASKED <span className="text-red-600">QUESTION</span>
        </h2>

        <div className="space-y-4">
          {FAQS.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden ${
                  isOpen ? 'bg-zinc-800' : 'bg-neutral-900/80'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {item.q}
                  </span>

                  <span className="text-red-600">
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </span>
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-300">{item.a}</p>
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
