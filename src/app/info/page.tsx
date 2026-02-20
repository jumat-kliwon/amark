'use client';

import { Ban, MessageCircle } from 'lucide-react';

export default function BannedPage() {
  const whatsappNumber = '6281234567890'; // ganti nomor admin
  const message =
    'Halo Admin, akun saya terkena banned. Mohon dibantu pengecekannya.';

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-xl">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <Ban className="h-10 w-10 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-xl font-semibold text-white">
          Akun Anda Dibanned
        </h1>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-white/70">
          Akun Anda saat ini telah dinonaktifkan karena terdeteksi melanggar
          ketentuan atau aktivitas tidak wajar.
          <br />
          Jika Anda merasa ini adalah kesalahan, silakan hubungi admin untuk
          proses peninjauan.
        </p>

        {/* CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-medium text-white transition hover:bg-green-600"
        >
          <MessageCircle className="h-5 w-5" />
          Hubungi Admin via WhatsApp
        </a>

        {/* Footer note */}
        <p className="mt-4 text-xs text-white/40">
          Sertakan email atau ID akun Anda saat menghubungi admin
        </p>
      </div>
    </div>
  );
}
