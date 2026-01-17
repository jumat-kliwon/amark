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
  }
}
