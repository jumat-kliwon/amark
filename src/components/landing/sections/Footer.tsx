'use client';

import Image from 'next/image';

export function Footer() {
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
            <p className="text-sm text-gray-400">CV Akademi Creator Indonesia</p>
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
            bervariasi dan bergantung pada banyak faktor penentu, seperti (tetapi
            tidak terbatas pada) latar belakang, pengalaman, dan komitmen Anda.
            Upaya besar dan tindakan nyata diperlukan. Jika Anda tidak bersedia
            menerima hal tersebut, mohon{' '}
            <span className="text-white font-semibold">JANGAN IKUTI PROGRAM INI</span>
            .
          </p>

          <div className="border-t border-gray-800 pt-6">
            <p>
              Any results stated in the webinar & online course are our personal
              results. Please understand our results are not typical, we are not
              implying you will achieve a similar outcome, or even create any
              result for yourself. We are using these references for example
              purposes only. Your results will vary and depend on many deciding
              factors, such as (but not limited to), your background, experience,
              and commitment. Huge effort and action is required. If you're not
              willing to accept that, please{' '}
              <span className="text-white font-semibold">DO NOT JOIN THIS PROGRAM</span>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

