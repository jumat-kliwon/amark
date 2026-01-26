'use client';

export function Footer() {
  return (
    <footer className="w-full px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[48px] bg-gradient-to-b from-[#0b2a63] via-[#071a3a] to-black py-12 px-6 text-center">
          <p className="text-white font-semibold mb-3">
            CV. Akademi Marketer Indonesia
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-3">
            <a href="/privacy-policy" className="hover:text-white underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms-condition" className="hover:text-white underline">
              Terms & Condition
            </a>
          </div>

          <p className="text-sm text-gray-400">
            Copyright © 2024 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
