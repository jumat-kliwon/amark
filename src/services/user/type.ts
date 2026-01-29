export interface UserProfile {
  user: {
    id: number;
    name: string;
    email: string;
    username: string | null;
    phone_number: string | null;
    affiliate_code: string;
    commission_rate: string;
    email_verified_at: string | null;
    is_banned: boolean;
    force_password_reset: boolean;
    created_at: string;
    updated_at: string;
    discord_id: string;
    discord_username: string;
  }
}

export interface Membership {
  name: string;
  price: string;
  access_type: string;
  start_date: string;
  end_date: string | null;
}

export interface UserWithMembership {
  user: {
    id: number;
    name: string;
    email: string;
    username: string | null;
    phone_number: string | null;
    affiliate_code: string;
    commission_rate: string;
    email_verified_at: string | null;
    is_banned: boolean;
    force_password_reset: boolean;
    created_at: string;
    updated_at: string;
  };
  membership: Membership | null;
}

export interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface UpdatePasswordResponse {
  message?: string;
  data?: any;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone_number?: string | null;
  username?: string | null;
}

export interface UpdateProfileResponse {
  message?: string;
  data?: any;
}

export interface DiscordResponse {
  url: string;
}