'use client';

import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useRegister } from '@/hooks/use-auth';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { formatCurrency } from '@/lib/helpers';
import { OrderService } from '@/services/order';
import { CheckCouponResponse } from '@/services/order/type';

function RegisterContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [voucher, setVoucher] = useState('');
  const [couponResult, setCouponResult] = useState<CheckCouponResponse | null>(
    null,
  );
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const { mutate, isPending } = useRegister();
  const { settings } = useSettingsContext();

  // Get membership by slug, fallback to default if not found
  const membershipSlug = params?.slug as string;
  const membershipBySlug = settings?.memberships?.find(
    (m) => m.slug === membershipSlug,
  );
  const defaultMembership = settings?.memberships?.find(
    (m) => m.is_default,
  );
  
  // Use membership by slug if found, otherwise use default membership
  const activeMembership = membershipBySlug || defaultMembership;

  // Redirect to default membership slug if slug is invalid and we have a default
  useEffect(() => {
    if (
      settings &&
      !membershipBySlug &&
      defaultMembership &&
      membershipSlug !== defaultMembership.slug
    ) {
      router.replace(`/auth/register/${defaultMembership.slug}`);
    }
  }, [settings, membershipBySlug, defaultMembership, membershipSlug, router]);

  const onSubmit = () => {
    if (!activeMembership) return;

    mutate({
      phone_number: `+62${phone}`,
      name: username,
      email,
      password,
      password_confirmation: confirm,
      username,
      terms: agree,
      voucher_code: voucher || undefined,
      membership_id: String(activeMembership.id),
    });
  };

  const { mutate: validateCoupon, isPending: isValidatingCoupon } = useMutation({
    mutationFn: async () => {
      if (!activeMembership) {
        throw new Error('Membership tidak ditemukan');
      }
      const coupon = voucher.trim();
      if (!coupon) {
        throw new Error('Kode promo kosong');
      }
      return await OrderService.checkCoupon({
        coupon,
        membership_id: activeMembership.id,
      });
    },
    onSuccess: (res) => {
      setCouponResult(res);
      setCouponMessage(res.message || 'Kupon valid');
    },
    onError: (error: any) => {
      setCouponResult(null);
      const errorMessage =
        error?.response?.data?.message ||
        'Kode promo tidak valid / tidak dapat digunakan';
      setCouponMessage(errorMessage);
    },
  });

  if (!activeMembership) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="h-16 w-16 rounded-full bg-zinc-800 animate-pulse" />
      </div>
    );
  }

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
                JOIN PROGRAM - {activeMembership.name} INI DENGAN HANYA:
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-lg line-through text-zinc-500">
                  Rp
                  {formatCurrency(
                    Number(activeMembership.original_price ?? activeMembership.price),
                  )}
                </p>
                {couponResult ? (
                  <>
                    <p className="text-lg line-through text-zinc-500">
                      Rp
                      {formatCurrency(Number(activeMembership.price))}
                    </p>
                    <p className="text-4xl font-bold text-red-500">
                      Rp
                      {formatCurrency(Number(couponResult.data.final_price))}
                    </p>
                  </>
                ) : (
                  <p className="text-4xl font-bold text-red-500">
                    Rp
                    {formatCurrency(Number(activeMembership.price))}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-zinc-400 md:text-right uppercase">
              ({activeMembership.access_type_label})
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
                onChange={(e) => {
                  setVoucher(e.target.value);
                  // reset result and message if user edits code
                  if (couponResult) setCouponResult(null);
                  if (couponMessage) setCouponMessage(null);
                }}
                onBlur={() => {
                  const code = voucher.trim();
                  if (!code) {
                    setCouponMessage(null);
                    return;
                  }
                  validateCoupon();
                }}
              />
              {isValidatingCoupon && (
                <p className="text-xs text-zinc-400">Memvalidasi kode promo...</p>
              )}
              {couponMessage && (
                <p
                  className={`text-xs ${
                    couponResult
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {couponMessage}
                  {couponResult && (
                    <span className="block mt-1">
                      Hemat Rp
                      {formatCurrency(Number(couponResult.data.discount_amount))}
                    </span>
                  )}
                </p>
              )}
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
          <div className="text-center mt-10 p-4 bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-zinc-400 mb-2">Harga Normal</p>
            <p className="text-lg line-through text-zinc-500 mb-2">
              Rp
              {formatCurrency(
                Number(activeMembership.original_price ?? activeMembership.price),
              )}
            </p>
            {couponResult ? (
              <>
                <p className="text-xs text-zinc-400 mb-1">Harga Promo</p>
                <p className="text-lg line-through text-zinc-500 mb-2">
                  Rp
                  {formatCurrency(Number(activeMembership.price))}
                </p>
                <p className="text-xs text-green-400 mb-2">
                  Diskon Tambahan Rp
                  {formatCurrency(Number(couponResult.data.discount_amount))}
                </p>
                <p className="text-xs text-zinc-400 mb-1">Harga Setelah Kupon</p>
                <p className="text-3xl font-bold text-red-500">
                  Rp
                  {formatCurrency(Number(couponResult.data.final_price))}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-zinc-400 mb-1">Harga Setelah Diskon</p>
                <p className="text-3xl font-bold text-red-500">
                  Rp
                  {formatCurrency(Number(activeMembership.price))}
                </p>
              </>
            )}
          </div>
        </div>

        <p className="text-center my-5">
          Sudah punya akun?{' '}
          <span
            className="text-red-500 underline cursor-pointer"
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
          <div className="h-16 w-16 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
