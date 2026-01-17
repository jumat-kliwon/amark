'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col space-y-8 items-center justify-center bg-[#121212] text-white">
      <div className="w-full max-w-md px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10">Reset Password</h1>

        {/* Password */}
        <div className="mb-4">
          <Label className="text-sm text-muted-foreground">Password</Label>
          <div className="relative mt-2">
            <Input
              type={showPassword ? 'text' : 'password'}
              className="h-12 rounded-xl bg-zinc-900 border-zinc-800 pr-12 text-white focus:ring-red-600 focus:ring-2"
              placeholder="••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label className="text-sm text-muted-foreground">
            Confirm Password
          </Label>
          <div className="relative mt-2">
            <Input
              type={showPasswordConfirm ? 'text' : 'password'}
              className="h-12 rounded-xl bg-zinc-900 border-zinc-800 pr-12 text-white focus:ring-red-600 focus:ring-2"
              placeholder="••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <Button
          className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base"
          onClick={() => router.push('/member/dashboard')}
        >
          SUBMIT
        </Button>
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
