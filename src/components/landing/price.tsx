'use client';

import clsx from 'clsx';
import Image from 'next/image';

const BENEFITS = [
  'Strategi Meningkatkan Followers Sampai 100K Bahkan Sebelum 3 Bulan, Sudah Terbukti Oleh Ribuan Member Sejak 2020 - Sekarang.',
  'Live Mentoring dan Bedah Akun Mingguan Secara Live Oleh Para Mentor Untuk Mengkoreksi dan Membimbing Kalian Secara Detail',
  'Akses ke 300+ Modul Terlengkap se Indonesia Untuk Meningkatkan Followers dan Membangun Personal Branding Akun Sosial Media Yang Akan Diupdate Terus Setiap Bulannya',
  'Komunitas Super Supportive Untuk Kalian Bertanya Pada Mentor dan Mencari Networking Dengan Sesama Creator Lainnya.',
  'Modul Artificial Intelligence Untuk Membantumu Membuat Prompt AI dan Mempersingkat Waktu Pembuatan Kontenmu Sampai 2x Lipat.',
  '[BONUS] Job Opportunity, Berbagi Job Endorsement Dari Rekanan Akademi Creator',
  '[BONUS] Barter Value, Berbagi Job Barter Barang Dengan Konten Untuk Membangun Portofolio Kerja Sama Brand Akun Sosmedmu',
  '[BONUS] Pasukan Penangkal Haters Untuk Mensupport Kamu Mengatasi Haters-Haters yang Muncul Pada Kontenmu',
  '[BONUS] Riset Independen Hasil A/B Testing Konten, Perkembangan Sosmed, Trend Update, dari Tim Akademi Creator',
];

export default function Price() {
  return (
    <section className="relative text-white mb-20" id="join-now">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
        JOIN & DAFTAR SEKARANG!
      </h2>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Card */}
        <div className="relative rounded-3xl border border-red-600/40 bg-gradient-to-b from-black to-neutral-900 p-10 md:p-14">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
            <div>
              <div className="space-y-3">
                <Image
                  src="/images/logo-only.webp"
                  alt="ACRE Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                  unoptimized
                />

                <p className="tracking-widest text-sm">
                  DAPATKAN AKSES LIFETIME
                  <br />
                  AKADEMI CREATOR HANYA
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mb-2">
                DARI RP37.970.000
              </span>
              <div className="text-4xl md:text-5xl font-bold">Rp3.797.000</div>
            </div>
          </div>

          <hr className="border-white/10 mb-10" />

          {/* Benefit */}
          <h3 className="mb-6 tracking-widest text-sm">BENEFIT</h3>

          <ul className="space-y-4 mb-12">
            {BENEFITS.map((item, i) => {
              const isBonus = item.startsWith('[BONUS]');
              return (
                <li key={i} className="flex gap-3">
                  <span className="text-green-500 mt-1">✔</span>
                  <p
                    className={clsx(
                      'text-sm text-gray-300',
                      isBonus && 'text-green-400',
                    )}
                  >
                    {item}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="rounded-xl bg-white text-black py-4 font-bold text-lg hover:opacity-90 transition">
              AKSES 1 TAHUN
              <br />
              RP. 1.997.000
            </button>

            <button className="rounded-xl bg-gradient-to-r from-red-500 to-red-700 py-4 font-bold text-lg hover:opacity-90 transition">
              AKSES LIFETIME
              <br />
              RP. 3.797.000
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Dapatkan seluruh fasilitasnya baik akses <b>1 TAHUN</b> maupun{' '}
            <b>LIFETIME</b>
          </p>
        </div>
      </div>
    </section>
  );
}
