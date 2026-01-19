export type BonusItem = {
  number: string;
  title: string;
  desc: string;
  value: string;
  image: string;
};

export const BONUS_LIST: BonusItem[] = [
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

