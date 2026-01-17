"use client";

import HeaderLanding from '@/components/landing/headers';
import Footer from '@/components/landing/footer';
import Banners from '@/components/landing/banner';
import Profit from '@/components/landing/profit';
import Increase from '@/components/landing/increase';
import Promote from '@/components/landing/promote';
import Testimoni from '@/components/landing/testi';
import Mentors from '@/components/landing/mentors';
import Materi from '@/components/landing/materi';
import Promote2 from '@/components/landing/promote2';
import BonusSection from '@/components/landing/pack';
import Price from '@/components/landing/price';
import Testi2 from '@/components/landing/testi2';
import MarqueeRow from '@/components/landing/marque';
import ProofGrid from '@/components/landing/grid';
import FAQSection from '@/components/landing/faq';

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
