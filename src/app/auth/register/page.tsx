'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/use-auth';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [voucher, setVoucher] = useState('');

  const router = useRouter();
  const { mutate, isPending } = useRegister();

  const onSubmit = () => {
    mutate({
      phone_number: `+62${phone}`,
      name: username,
      email,
      password,
      password_confirmation: confirm,
      username,
      terms: agree,
      voucher_code: voucher || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col space-y-8 items-center justify-center py-16">
      <div className="w-full max-w-3xl px-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-2">
          Dapatkan <span className="font-extrabold">Akses</span>
        </h1>
        <h2 className="text-4xl font-bold text-center mb-6">
          Akademi Creator Pro
        </h2>

        <div className="border-b border-zinc-700 mb-8" />

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8">
          {/* Price */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-widest text-zinc-400 mb-2">
                JOIN PROGRAM INI DENGAN HANYA (PAKET PRO):
              </p>
              <p className="text-4xl font-bold">Rp3.797.000</p>
            </div>
            <p className="text-sm text-zinc-400 md:text-right">
              SEHARGA MAKAN PER HARI SELAMA 3 BULAN
              <br />
              (LIFETIME AKSES)
            </p>
          </div>

          <div className="border-b border-dashed border-zinc-700 mb-8" />

          {/* Form */}
          <div className="space-y-5">
            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone*</Label>
              <div className="flex gap-2">
                <Input
                  className="w-20 bg-zinc-900 h-12 border-zinc-800 focus:ring-red-600 focus:ring-2"
                  value="+62"
                  disabled
                />
                <Input
                  className="flex-1 bg-zinc-900 h-12 border-zinc-800 focus:ring-red-600 focus:ring-2"
                  placeholder="812-345-678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label>Username*</Label>
              <Input
                className="bg-zinc-900 h-12 border-zinc-800 focus:ring-red-600 focus:ring-2"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email*</Label>
              <Input
                type="email"
                className="bg-zinc-900 h-12 border-zinc-800 focus:ring-red-600 focus:ring-2"
                placeholder="yourmail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password*</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="bg-zinc-900 h-12 border-zinc-800 pr-12 focus:ring-red-600 focus:ring-2"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label>Password Confirmation*</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  className="bg-zinc-900 h-12 border-zinc-800 pr-12 focus:ring-red-600 focus:ring-2"
                  placeholder="Masukkan Password Kembali"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Promo */}
            <div className="space-y-2">
              <Label>Masukkan Kode Promo (Jika Ada)</Label>
              <Input
                className="bg-zinc-900 h-12 border-zinc-800 focus:ring-red-600 focus:ring-2"
                placeholder="Masukkan Kode Promo"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-2 text-sm">
              <Checkbox
                id="agree"
                checked={agree}
                onCheckedChange={(v) => setAgree(Boolean(v))}
                className="border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white"
              />
              <Label htmlFor="agree" className="leading-relaxed">
                Dengan mendaftar, saya menerima{' '}
                <span className="text-red-500 underline">
                  terms & privacy policy
                </span>{' '}
                di akademi creator
              </Label>
            </div>

            {/* Button */}
            <Button
              disabled={!agree || isPending}
              className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base"
              onClick={onSubmit}
            >
              REGISTER NOW
            </Button>
          </div>

          {/* Price Bottom */}
          <div className="text-center mt-10">
            <p className="text-sm line-through text-zinc-500">Rp37.970.000</p>
            <p className="text-3xl font-bold">Rp3.797.000</p>
          </div>
        </div>

        <p className="text-center my-5">
          Sudah punya akun?{' '}
          <span
            className="text-red-500 underline"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </span>
        </p>
      </div>
      <Button
        variant="secondary"
        className="flex items-center gap-5"
        onClick={() => router.push('/')}
      >
        <ChevronLeft />
        Back to Home
      </Button>
    </div>
  );
}
