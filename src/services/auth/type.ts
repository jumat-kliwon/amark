export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_banned: boolean;
  two_factor_confirmed_at: string | null;
  phone_number: string | null;
  force_password_reset: boolean;
  username: string | null;
  affiliate_code: string;
  commission_rate: string;
  original_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
  token: string;
}

export interface ForgotResponse {
  message: string;
}



import type { ShippingAddress, ShippingOption } from '@/services/order/type';

export interface RegisterPayload {
  phone_number: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  terms: boolean;
  voucher_code?: string;
  product_id?: string;
  bundle_product_id?: string;
  recipient_name?: string;
  recipient_phone?: string;
  shipping_address?: ShippingAddress;
  shipping_option?: ShippingOption;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
    phone_number: string;
    affiliate_code: string;
    commission_rate: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
  order?: {
    payment_url: string;
    token: string;
  };
}

export interface ForgotPayload {
  email: string;
}
