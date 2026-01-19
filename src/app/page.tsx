'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useMembership } from '@/hooks/use-membership';
import { formatCurrency } from '@/lib/helpers';

// HeaderLanding Component
function HeaderLanding() {
  const router = useRouter();
  const membership = useMembership();
  const lifetime = membership.membership?.data?.find(
    (a) => a.access_type === 1,
  );

  return (
    <header className="w-full fixed z-[99] bg-background">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/images/logo.webp"
          alt="ACRE Logo"
          width={140}
          height={32}
          className="object-contain"
          priority
          unoptimized
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            className="h-10 rounded-xl text-base bg-zinc-800 hover:bg-zinc-900"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>
          <Button
            className="h-10 rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
            onClick={() =>
              router.push(`/auth/register?membership=${lifetime?.id}`)
            }
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}

// Banners Component
function Banners() {
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

// Profit Component
function Profit() {
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

// CaseStudyCarousel Component
interface CaseStudyCarouselProps {
  images: string[];
}

function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full py-3">
      <div className="max-w-7xl mx-auto px-4 relative">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="swiperss bottom-page pb-14"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[200px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`case-study-${index}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev */}
        <button className="case-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-xl w-15 h-15 bg-[#121212]/20 rounded-full cursor-pointer hover:bg-[#121212]/50 font-bold flex items-center justify-center">
          <ChevronLeft size={30} />
        </button>

        {/* Next */}
        <button className="case-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-xl w-15 h-15 bg-[#121212]/20 rounded-full cursor-pointer hover:bg-[#121212]/50 font-bold flex items-center justify-center">
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}

// Increase Component
function Increase() {
  return (
    <section className="w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
          <span className="text-red-600">
            Hasil peningkatan followers dan pendapatan
          </span>
          <br />
          alumni dari product digital. Kalian kapan nyusul?
        </h2>

        <div className="space-y-10">
          <CaseStudyCarousel
            images={[
              '/images/increase1.webp',
              '/images/increase2.webp',
              '/images/increase3.webp',
              '/images/increase4.webp',
              '/images/increase5.webp',
              '/images/increase6.webp',
              '/images/increase7.webp',
            ]}
          />

          <CaseStudyCarousel
            images={[
              '/images/increase8.webp',
              '/images/increase9.webp',
              '/images/increase10.webp',
              '/images/increase11.webp',
              '/images/increase12.webp',
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// Promote Component
function Promote() {
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

// Testimoni Component
function Testimoni() {
  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14 uppercase">
          Jangan Percaya Omongan Kita, Lihat Saja Hasilnya
        </h2>
      </div>
      <div className="mb-5">
        <div className="relative w-full h-[200px] md:h-[400px]">
          <Image
            src="/images/testi1.webp"
            alt="banner"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14 mt-4">
          <div className="text-red-600 uppercase">100K Followers</div>
          <div className="uppercase">Pertama</div>
        </h2>
      </div>
      <div className="mb-5">
        <div className="relative w-full h-[200px] md:h-[400px]">
          <Image
            src="/images/testi2.webp"
            alt="banner"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <h2 className="text-right text-3xl md:text-4xl font-bold text-white mb-14 w-full md:max-w-4/5 mt-4 pr-0 md:pr-10">
          <span className="text-red-600 uppercase">penghasilan alumni</span>
          <span className="uppercase">
            {' '}
            dari <br /> endorsement, Adsense, digital <br /> product dan digital
            service
          </span>
        </h2>
      </div>
    </section>
  );
}

// Materi Component
function Materi() {
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
      desc: 'Di modul ini Kamu akan belajar cara untuk "hack" algoritma dari platform Instagram, Youtube, dan TikTok agar konten kalian mendapatkan engagement yang tinggi. Di modul ini kalian juga akan diajari cara membuat Hook yang tepat agar relevan dengan audiens. Melalui modul-modul ini Kamu akan belajar cara untuk grow akun dalam kurun waktu 3 bulan.',
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

// Promote2 Component
function Promote2() {
  const router = useRouter();

  return (
    <div className="w-full md:max-w-1/3 text-center mb-5 flex flex-col justify-center items-center">
      <div className="text-center text-xs w-full md:w-1/3">
        Akademi Creator tidak akan bisa melahirkan creatorpreneur sebanyak ini
        jika Kami tidak komitmen dan disiplin mendeliver kurikulum serta
        fasilitas after-sales service terbaik.
      </div>
      <div className="text-center uppercase text-xl font-semibold my-5">
        Mereka sudah memulai, kamu kapan?
      </div>
      <div className="relative w-[0.5px] h-[100px] md:h-[200px]">
        <Image
          src="/images/arrow.webp"
          alt="separator"
          fill
          priority
          unoptimized
        />
      </div>
      <div className="relative w-full h-[100px] my-3">
        <Image
          src="/images/stat.webp"
          alt="separator"
          fill
          className="object-contain"
          priority
          unoptimized
        />
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

// Mentors Component
const mentors = [
  '/images/mentor1.webp',
  '/images/mentor2.webp',
  '/images/mentor3.webp',
  '/images/mentor4.webp',
  '/images/mentor5.webp',
  '/images/mentor6.webp',
  '/images/mentor7.webp',
  '/images/mentor8.webp',
];

function Mentors() {
  const router = useRouter();
  return (
    <div className="text-center space-y-8 w-full md:max-w-4xl py-10">
      <h1 className="text-5xl font-bold uppercase">Meet the mentors</h1>
      <div className="relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          className="swiperss pb-14"
        >
          {mentors.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-[550px] md:h-[420px]">
                <Image
                  src={item}
                  alt="image"
                  className="mx-auto"
                  fill
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pb-10">
        <Button
          className="h-10 w-[180px] rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
          onClick={() => router.push('/#join-now')}
        >
          Join Now <ArrowDownRight />
        </Button>
      </div>
    </div>
  );
}

// BonusSection Component
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

function BonusSection() {
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

// Price Component
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

function Price() {
  const membership = useMembership();
  const router = useRouter();

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

            {membership.membership?.data ? (
              <div className="text-right">
                <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mb-2">
                  DARI RP
                  {formatCurrency(
                    Number(membership.membership?.data[0]?.price ?? 0) * 10,
                  )}
                </span>
                <div className="text-4xl md:text-5xl font-bold">
                  Rp
                  {formatCurrency(
                    Number(membership.membership?.data[0]?.price ?? 0),
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[100px] w-1/2 bg-zinc-800 rounded-lg animate-pulse mt-10" />
            )}
          </div>

          <hr className="border-white/10 mb-10" />

          {/* Benefit */}
          <h3 className="mb-6 tracking-widest text-sm">BENEFIT</h3>

          {membership.membership?.data ? (
            <ul className="space-y-4 mb-12">
              {membership.membership?.data[0]?.benefit.map((item, i) => {
                return (
                  <li key={i} className="flex gap-3">
                    <div className="bg-green-500 rounded-full flex items-center justify-center h-[20px] w-[20px]">
                      <Check className="text-black font-bold" size={12} />
                    </div>
                    <div className="text-sm text-gray-300 flex-1">{item}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[28px] w-full bg-zinc-800 rounded-lg animate-pulse mb-3"
              />
            ))
          )}

          {/* CTA */}
          {membership.membership?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {membership.membership.data.map((item, key) => (
                <button
                  className={`rounded-xl text-black py-4 font-bold text-lg hover:opacity-90 transition ${
                    key % 2
                      ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                      : 'bg-white'
                  }`}
                  onClick={() =>
                    router.push(`auth/register?membership=${item.id}`)
                  }
                >
                  {item.name}
                  <br />
                  RP{formatCurrency(Number(item.price ?? 0))}
                </button>
              ))}
            </div>
          ) : (
            <div className="h-[100px] w-full bg-zinc-800 rounded-lg animate-pulse mt-10" />
          )}

          <p className="text-center text-xs text-gray-400 mt-6">
            Dapatkan seluruh fasilitasnya baik akses <b>1 TAHUN</b> maupun{' '}
            <b>LIFETIME</b>
          </p>
        </div>
      </div>
    </section>
  );
}

// Testi2 Component
function Testi2() {
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

// MarqueeRow Component
type RowData = {
  id: number;
  images: string[];
  reverse?: boolean;
};

const rows: RowData[] = [
  {
    id: 1,
    reverse: false, // kiri
    images: [
      '/images/p1.webp',
      '/images/p2.webp',
      '/images/p3.webp',
      '/images/p4.webp',
      '/images/p1.webp',
      '/images/p2.webp',
    ],
  },
  {
    id: 2,
    reverse: true, // kanan
    images: [
      '/images/p5.webp',
      '/images/p6.webp',
      '/images/p7.webp',
      '/images/p8.webp',
      '/images/p9.webp',
      '/images/p10.webp',
    ],
  },
  {
    id: 3,
    reverse: false, // kiri
    images: [
      '/images/p11.webp',
      '/images/p12.webp',
      '/images/p13.webp',
      '/images/p14.webp',
      '/images/p11.webp',
      '/images/p12.webp',
    ],
  },
];

function SwiperRow({
  images,
  reverse,
}: {
  images: string[];
  reverse?: boolean;
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      speed={6000}
      slidesPerView={3.5}
      spaceBetween={24}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      breakpoints={{
        768: { slidesPerView: 1.5 },
        1024: { slidesPerView: 4.5 },
      }}
      className="w-full"
    >
      {[...images, ...images].map((img, i) => (
        <SwiperSlide key={i}>
          <div
            className="relative h-[40px] md:h-[120px]
                       rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function MarqueeRow() {
  return (
    <section className="w-full overflow-hidden py-20 space-y-8">
      {rows.map((row) => (
        <SwiperRow key={row.id} images={row.images} reverse={row.reverse} />
      ))}
    </section>
  );
}

// ProofGrid Component
const COL_1 = [
  '/images/testimoni1.webp',
  '/images/testimoni2.webp',
  '/images/testimoni3.webp',
  '/images/testimoni4.webp',
];

const COL_2 = [
  '/images/testimoni5.webp',
  '/images/testimoni6.webp',
  '/images/testimoni7.webp',
  '/images/testimoni8.webp',
];

const COL_3 = [
  '/images/testimoni9.webp',
  '/images/testimoni10.webp',
  '/images/testimoni11.webp',
  '/images/testimoni12.webp',
];

function Column({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      {images.map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-[#121212]/40">
          <Image
            src={src}
            alt=""
            width={500}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

function ProofGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column images={COL_1} />
          <Column images={COL_2} />
          <Column images={COL_3} />
        </div>
      </div>
    </section>
  );
}

// FAQSection Component
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
    a: "Jika ada kebingungan, Kamu bisa bertanya dan konsultasi melalui 2 jalur. Jalur pertama, konsultasi melalui komunitas Discord karena sudah disediakan senior – senior mentor untuk membalas dan berdiskusi pertanyaan – pertanyaan Kamu. Jalur kedua, melalui live rutin setiap minggu di hari Selasa dan Jum'at.",
  },
  {
    q: 'Live rutinnya lewat mana ?',
    a: "Jika ada kebingungan, Kamu bisa bertanya dan konsultasi melalui 2 jalur. Jalur pertama, konsultasi melalui komunitas Discord karena sudah disediakan senior – senior mentor untuk membalas dan berdiskusi pertanyaan – pertanyaan Kamu. Jalur kedua, melalui live rutin setiap minggu di hari Selasa dan Jum'at.",
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

function FAQSection() {
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

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/logo.webp"
              alt="ACRE Logo"
              width={150}
              height={20}
              className="object-contain"
              priority
              unoptimized
            />
            <p className="text-sm text-gray-400">
              CV Akademi Creator Indonesia
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Contact Us</h4>
            <p className="text-sm">support@akademicreator.id</p>
            <p className="text-sm">+62 811-4089-090 (WA Only)</p>
          </div>

          {/* Others */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Others</h4>
            <a href="#" className="block text-sm hover:text-white">
              Privacy & Policy
            </a>
            <a href="#" className="block text-sm hover:text-white">
              Terms & Condition
            </a>
          </div>

          {/* Copyright */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Akademi Creator</h4>
            <p className="text-sm">Copyright © 2024 All rights reserved</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 text-sm text-gray-400 leading-relaxed space-y-6">
          <p>
            Hasil yang disebutkan dalam webinar & kursus online adalah hasil
            pribadi kami. Harap dipahami bahwa hasil kami tidak umum, dan kami
            tidak menyatakan bahwa Anda akan mencapai hasil yang serupa, atau
            bahkan mendapatkan hasil apa pun untuk diri Anda sendiri. Kami
            menggunakan referensi ini hanya untuk tujuan contoh. Hasil Anda akan
            bervariasi dan bergantung pada banyak faktor penentu, seperti
            (tetapi tidak terbatas pada) latar belakang, pengalaman, dan
            komitmen Anda. Upaya besar dan tindakan nyata diperlukan. Jika Anda
            tidak bersedia menerima hal tersebut, mohon{' '}
            <span className="text-white font-semibold">
              JANGAN IKUTI PROGRAM INI
            </span>
            .
          </p>

          <div className="border-t border-gray-800 pt-6">
            <p>
              Any results stated in the webinar & online course are our personal
              results. Please understand our results are not typical, we are not
              implying you will achieve a similar outcome, or even create any
              result for yourself. We are using these references for example
              purposes only. Your results will vary and depend on many deciding
              factors, such as (but not limited to), your background,
              experience, and commitment. Huge effort and action is required. If
              you're not willing to accept that, please{' '}
              <span className="text-white font-semibold">
                DO NOT JOIN THIS PROGRAM
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <HeaderLanding />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        <Banners />
        <Profit />
        <Increase />
        <Promote />
        <Testimoni />
        <Materi />
        <Promote2 />
        <Mentors />
        <BonusSection />
        <Price />
        <Testi2 />
        <MarqueeRow />
        <ProofGrid />
        <FAQSection />
      </div>

      <Footer />
    </div>
  );
}
