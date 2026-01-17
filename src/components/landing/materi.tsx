'use client';

import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

export default function Materi() {
  const materi = [
    {
      img: '/images/materi1.webp',
      title: 'FAST TRACK CREATOR',
      watch: 24,
      desc: 'Modul ini akan mengajarkan Kamu untuk meningkatkan followers lewat jalan pintas tercepat. Kami akan ajarkan bagaimana dari orang yang gak pede ngomong di depan kamera sampai bisa pede. Kami juga akan ajar dan pilihkan niche yang punya potensi besar untuk akunmu cepat berkembang. Tidak berhenti disitu, Kamu juga akan belajar meskipun Kamu belum expert, tapi bisa membuat konten daging yang dihargai sama calon followersmu. Diakhiri dengan take video dan edit video di platform sosmed dan juga di capcut (semuanya aplikasi gratis).',
    },
    {
      img: '/images/materi2.webp',
      title: 'FUNDAMENTAL CREATOR',
      watch: 70,
      desc: 'Di modul ini Kamu akan belajar pondasi untuk membuat konten apapun diseluruh sosial media manapun. Kami akan ajarkan cara kerja otak manusia saat merespon konten sehingga Kamu bisa menguasai psikologi audience agar engage dan follow. Tidak lupa juga Kamu juga akan belajar The Art of Story Telling, agar audience mu bisa terhanyut mengkonsumsi kontenmu sampai selesai.',
    },
    {
      img: '/images/materi3.webp',
      title: 'INSTAGRAM, TIKTOK, & YOUTUBE HACK',
      watch: 24,
      desc: 'Di modul ini Kamu akan belajar cara untuk “hack” algoritma dari platform Instagram, Youtube, dan TikTok agar konten kalian mendapatkan engagement yang tinggi. Di modul ini kalian juga akan diajari cara membuat Hook yang tepat agar relevan dengan audiens. Melalui modul-modul ini Kamu akan belajar cara untuk grow akun dalam kurun waktu 3 bulan.',
    },
    {
      img: '/images/materi4.webp',
      title: 'Artificial Intelligence',
      watch: 15,
      desc: 'Kamu akan belajar tools-tools yang mempercepat prosesmu membuat konten. Kami juga akan ajarkanmu membuat prompt untuk masing-masing tools. Kamu akan cakap dalam menggunakan AI tools untuk membuat Ide, Script, sampai mengenerate Image untuk kontenmu.',
    },
    {
      img: '/images/materi5.webp',
      title: 'Monetisasi',
      watch: 10,
      desc: 'Modul ini akan mengajarkanmu bagaimana menentukan rate card untuk endorsement, bagiamana negosiasinya, dan bagaimana flow dari mulai penawaran sampai pembayaran. Tidak hanya pembayarannya saja, Kamu juga akan belajar bagaimana membuat dan menghitung pajak sebagai Influencer.',
    },
    {
      img: '/images/materi6.webp',
      title: 'PERSONAL BRANDING',
      watch: 17,
      desc: 'Perjalananmu tidak hanya sampai punya followers banyak saja, tetapi Kamu akan belajar bagaimana membangun personal branding. Saat personal brandingmu terbangun, Audiencemu akan selalu ingat denganmu dan mereka menjadi loyal fans. Efeknya, kekuatan dari influencemu meningkat, sehingga di mata audience dan brand, nilaimu sebagai Influencer akan mahal.',
    },
    {
      img: '/images/materi7.webp',
      title: 'Digital product hack',
      watch: 17,
      desc: 'Modul product digital dari mulai membuat ebook sampai kelas online. Kamu akan tau step by step, sampai bisa menghasilkan uang secara detail dari produk digital. Rasakan cuan dari digital product ini, pasti nagih.',
    },
    {
      img: '/images/materi8.webp',
      title: 'webinar hack',
      watch: 17,
      desc: 'Kamu akan belajar bagaiman membuat webinar yang bikin orang-orang bertekuk lutut untuk membeli produkmu. Modul ini bisa Kamu jadikan untuk jualan webinar itu sendiri atau untuk promosi yang mengarahkan ke produk digital utamamu.',
    },
    {
      img: '/images/materi9.webp',
      title: 'Digital Product Marketing',
      watch: 17,
      desc: 'Modul ini yang bisa membawamu ke 100jt pertama. Setelah punya produk digital, Kamu akan belajar bagaimana memasarkannya dengan budget minim. Saat Kamu sudah memasarkan produk digitalmu lewat digital marketing, Kamu akan makin ketagihan sama cuannya.',
    },
  ];

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-xl font-bold mb-5 bg-gradient-to-r from-red-600 to-red-900 bg-clip-text text-transparent">
          CURRICULUM PROGRAM
        </h2>

        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14 uppercase">
          Materi Pembelajaran ACRE
        </h2>

        <div className="relative">
          <div className="relative z-10">
            {materi.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0 py-4 mb-4"
              >
                {/* IMAGE - LEFT */}
                <div className="relative w-full md:w-2/5 h-[220px] shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>

                {/* NUMBER - CENTER */}
                <div className="w-1/5 flex justify-center relative z-20">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-900 text-white rounded-full font-bold text-lg shrink-0">
                    {index + 1}
                  </div>
                </div>

                {/* CONTENT - RIGHT */}
                <div className="w-full md:w-2/5 space-y-2 text-center md:text-left">
                  <div className="text-white font-bold uppercase">
                    {item.title}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                    <PlayCircle className="w-4 h-4" />
                    {item.watch}+ Video Pembelajaran
                  </div>

                  <div className="flex items-start justify-center md:justify-start gap-2 text-gray-400 text-xs">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full border-l border-gray-800 z-0 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}
