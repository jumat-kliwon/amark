'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth';
import type {
  ForgotPayload,
  LoginPayload,
  RegisterPayload,
} from '@/services/auth/type';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),

    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Login berhasil');

      if (data.user.force_password_reset) {
        router.push('/settings/password');
      } else {
        router.push('/course');
      }
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || 'Login gagal';

      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => AuthService.logout(),

    onSuccess: () => {
      // clear auth
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.success('Logout berhasil');

      router.replace('/auth/login');
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || 'Gagal logout';

      // fallback: tetap clear local auth
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.error(message);
      router.replace('/auth/login');
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthService.register(payload),

    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success(data.message || 'Registrasi berhasil');

      if (data.order?.payment_url) {
        window.location.href = data.order.payment_url;
      } else {
        router.push('/course');
      }
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || 'Registrasi gagal, silakan coba lagi';

      toast.error(message);
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ForgotPayload) => AuthService.forgotPassword(payload),

    onSuccess: (data) => {
      toast.success(data.message || 'Request reset password di kirim ke email');
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || 'Gagal request reset password';

      toast.error(message);
    },
  });
};
