'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/use-auth';
import { useMembership } from '@/hooks/use-membership';
import { Membership } from '@/services/order/type';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const membership = useMembership();
  const lifetime = membership.membership.data.find((a) => a.access_type === 1);
  const { mutate, isPending } = useLogin();

  const onSubmit = () => {
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col space-y-8 items-center justify-center bg-[#121212] text-white">
      <div className="w-full max-w-md px-6">
        <h1 className="text-4xl font-bold text-center mb-10">Login</h1>

        {/* Email */}
        <div className="mb-5">
          <Label className="text-sm text-muted-foreground">
            Username atau Email
          </Label>
          <Input
            className="mt-2 h-12 rounded-xl bg-zinc-900 border-zinc-800 text-white focus:ring-red-600 focus:ring-2"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label className="text-sm text-muted-foreground">Password</Label>
          <div className="relative mt-2">
            <Input
              type={showPassword ? 'text' : 'password'}
              className="h-12 rounded-xl bg-zinc-900 border-zinc-800 pr-12 text-white focus:ring-red-600 focus:ring-2"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember */}
        <div className="flex items-center gap-2 mb-8">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(v) => setRemember(Boolean(v))}
            className="border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white"
          />
          <Label htmlFor="remember" className="text-sm">
            Remember Me
          </Label>
        </div>

        {/* Button */}
        <Button
          className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base"
          onClick={onSubmit}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'LOG IN'}
        </Button>

        {/* Links */}
        <div className="text-center text-sm text-zinc-400 mt-10 space-y-3">
          <p>
            Lupa atau tidak tahu password?{' '}
            <span
              className="text-white underline cursor-pointer"
              onClick={() => router.push('/auth/forgot-password')}
            >
              Atur Password Disini
            </span>
          </p>
          <p>
            Belum memiliki akun?{' '}
            <span
              className="text-white underline cursor-pointer"
              onClick={() =>
                router.push(`/auth/register?membership=${lifetime.id}`)
              }
            >
              Register sekarang
            </span>
          </p>
        </div>
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
