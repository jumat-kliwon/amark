'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HeaderLanding } from '@/components/landing/sections/HeaderLanding';
import { Banners } from '@/components/landing/sections/Banners';
import { Profit } from '@/components/landing/sections/Profit';
import { Increase } from '@/components/landing/sections/Increase';
import { Promote } from '@/components/landing/sections/Promote';
import { Testimoni } from '@/components/landing/sections/Testimoni';
import { Materi } from '@/components/landing/sections/Materi';
import { Promote2 } from '@/components/landing/sections/Promote2';
import { Mentors } from '@/components/landing/sections/Mentors';
import { BonusSection } from '@/components/landing/sections/BonusSection';
import { Price } from '@/components/landing/sections/Price';
import { Testi2 } from '@/components/landing/sections/Testi2';
import { MarqueeRow } from '@/components/landing/sections/MarqueeRow';
import { ProofGrid } from '@/components/landing/sections/ProofGrid';
import { FAQSection } from '@/components/landing/sections/FAQSection';
import { Footer } from '@/components/landing/sections/Footer';

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
