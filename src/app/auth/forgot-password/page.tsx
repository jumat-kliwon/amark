'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForgotPass() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="w-full max-w-md px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Forgot Password
        </h1>

        {/* Username / Email */}
        <div className="mb-5">
          <Label className="text-sm text-muted-foreground">
            Enter your mail address
          </Label>
          <Input
            className="mt-2 h-12 rounded-xl bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:ring-red-600 focus:ring-2"
            placeholder="mail@gmail.com"
          />
        </div>

        {/* Button */}
        <Button
          className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base"
          onClick={() => router.push('auth/reset-password')}
        >
          SEND MAIL
        </Button>

        {/* Links */}
        <div className="text-center text-sm text-zinc-400 mt-10 space-y-3">
          <p>
            Sudah punya akun?{' '}
            <span
              className="text-white underline"
              onClick={() => router.push('/auth/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
