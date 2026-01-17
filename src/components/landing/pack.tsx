'use client';

import Image from 'next/image';
import clsx from 'clsx';

const BONUS_LIST = [
  {
    number: '01',
    title: 'LIVE MENTORING QNA SESSION & BEDAH AKUN',
    desc: `Fasilitas live QnA dan bedah akun mingguan dengan mentor-mentor alumni
    + bang Ogut (1x). Kamu bisa tanya tentang konten, bisnis, dan bisa minta
    bedah akunmu dari mana yang salah. Sudah konsisten 6 tahun sejak 2019.`,
    value: 'Senilai Rp1.500.000/bln',
    image: '/images/section1.webp',
  },
  {
    number: '02',
    title: 'RESEARCH, TREND, & STUDY CASE',
    desc: `Update trend terbaru yang punya potensi viral. Laporan hasil riset tim
    Akademi Creator dari mulai konten yang works dan cara jualan produk digital
    yang paling works.`,
    value: 'Senilai Rp1.500.000/bln',
    image: '/images/section2.webp',
  },
  {
    number: '03',
    title: 'EXPERT GUEST SPEAKER',
    desc: `Setiap bulan kami akan mengundang beberapa VIP mentor atau expert dari
    berbagai industri. Semua sharing eksklusif dan biasanya berbayar, tapi di
    sini free.`,
    value: 'Senilai Rp1.000.000/bln',
    image: '/images/section3.webp',
  },
  {
    number: '04',
    title: 'EXCLUSIVE LIVE BARENG BANG OGUT UNTUK QNA DAN BEDAH AKUN',
    desc: `Selain live mentoring mingguan, kamu juga akan dibimbing langsung oleh
    Bang Ogut setiap bulannya. Fokus QnA dan bedah akun secara mendalam.`,
    value: 'Senilai Rp30.000.000/bln',
    image: '/images/section4.webp',
  },
];

export default function BonusSection() {
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
