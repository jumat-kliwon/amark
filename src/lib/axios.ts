'use client';

import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://lms.acrehub.lol/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor → inject token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor → handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof window !== 'undefined' &&
      error?.response?.status === 401
    ) {
      // prevent infinite redirect loop
      if (!window.location.pathname.startsWith('/auth/login')) {
        toast.error('Sesi kamu sudah habis. Silakan login kembali.');

        // optional: clear auth data
        localStorage.removeItem('token');

        // delay biar toast kebaca
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1000);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
