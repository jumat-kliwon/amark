'use client';

import Image from 'next/image';

export default function Promote() {
  const benefit = [
    {
      img: '/images/promote1.webp',
      title:
        'Bukan cuma kelas ngonten dan naikin followers. Tapi dibimbing sampai monetisasi.',
      desc: 'Punya followers banyak itu mudah, tapi buat apa kalau gak bisa hasilin duit. Tujuan utamanya escape the rat race, butuh uang. Kalian akan dibimbing sampai berhasil untuk buka lebih dari 1 sumber penghasilan Internet Money. Contoh: Endorse, adsense, jual ebook, webinar, workshop, kelas online, dll.',
    },
    {
      img: '/images/promote2.webp',
      title: 'Dibimbing hingga dapat 100k followers pertamamu',
      desc: 'Setelah monetisasi berhasil, baru kamu dibimbing meningkatkan fame agar lebih banyak lagi orang yang kenal kamu. Uangpun makin banyak. Kamu akan dimibing sampai berhasil mendapatkan 100K followers pertama lewat 500+ video pembelajaran yang sudah terbukti berhasil untuk jenis konten apapun di sosial media manapun.',
    },
    {
      img: '/images/promote3.webp',
      title: 'After Sales Service Kelas Dunia dan Paling Konsisten Sejak 2019.',
      desc: 'Paling tidak enak itu praktek sendiri, makanya Akademi Creator (Acre) sudah konsisten 6 tahun sejak 2019 melayani dan membimbing para member lewat komunitas, chat QnA, Live rutin, bedah akun. Acrea tidak akan bisa melahirkan alumni sukses sebanyak ini jika tidak berkomintmen penuh memberikan materi dan bimbingan terbaik dibanding pesaing lainnya.',
    },
    {
      img: '/images/promote4.webp',
      title: 'Komunitas eksklusif yang saling support dan berbagi insight.',
      desc: 'Kalian akan punya keluarga baru disini, perkumpulan yang saling support dan bisa berpotensi jadi teman seperjuangan dalam bisnis atau bahkan partner dalam bisnis. Kita juga sering mengadakan acara komunitas offline bagi para member.',
    },
  ];

  return (
    <section className="w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-4xl font-bold text-white mb-14 uppercase">
          Kenapa Akademi Creator?
        </h2>

        <div className="w-full md:max-w-2xl mx-auto gap-6">
          {benefit.map((item, key) => {
            return (
              <div
                key={key}
                className="rounded-2xl border border-black shadow-[0_-3px_5px_rgba(205,0,0,0.35),0_2px_6px_rgba(80,0,0,0.8)] p-6 relative mb-6"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/2 h-[330px]">
                    <Image
                      src={item.img}
                      alt="img"
                      priority
                      unoptimized
                      fill
                      className="object-contain ml-0 md:-ml-20 z-[99]"
                    />
                  </div>
                  <div className="space-y-4 w-full md:w-1/2">
                    <div className="uppercase font-bold text-xl md:text-2xl text-center md:text-start">
                      {item.title}
                    </div>
                    <div className="text-gray-400 text-sm pt-4">
                      {item.desc}
                    </div>
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
