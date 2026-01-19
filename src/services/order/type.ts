export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  final_price: number;
  membership_type: string;
  membership_period: string | null;
}

export interface PaymentDetail {
  snap_token?: string;
  midtrans_order_id?: string;
  snap_redirect_url?: string;
}

export interface CouponDetail {
  id: number;
  code: string;
  is_active: boolean;
  starts_at: string;
  created_at: string;
  created_by: number;
  expires_at: string | null;
  updated_at: string;
  used_count: number;
  final_price: number;
  usage_limit: number | null;
  discount_type: number;
  discount_value: string;
  original_price: number;
  discount_amount: number;
}

export interface Order {
  id: number;
  status: number;
  status_label: string;
  invoice_number: string;
  transaction_number: string;
  total_amount: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
  method: string;
  payment_detail: PaymentDetail | null;
  paid_at: string | null;
  payment_expires_at: string | null;
  coupons: CouponDetail | CouponDetail[] | [];
}

export interface PaginationLinks {
  first: string;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

export interface OrderResponse {
  data: Order[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

// ======================
// MEMBERSHIP
// ======================
export interface Membership {
  id: number;
  name: string;
  description: string;
  price: string;
  access_type: number;
  access_type_label: string;
  duration: number | null;
  is_active: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  benefit?: string[];
}

// ======================
// PAGINATION LINKS
// ======================
export interface PaginationLinks {
  first: string;
  last: string | null;
  prev: string | null;
  next: string | null;
}

// ======================
// PAGINATION META
// ======================
export interface PaginationMeta {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

// ======================
// API RESPONSE
// ======================
export interface MembershipResponse {
  data: Membership[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface MembershipRequest { 
  membership_id: number;
  coupon: string;
}

export interface CheckCouponResponse {
  message: string;
  data: CouponCalculation;
}
export interface CouponCalculation {
  coupon: Coupon;
  original_price: number;
  discount_amount: number;
  final_price: number;
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: number; // 1 = percentage, 2 = fixed (sesuai backend)
  discount_value: string; // string karena dari API
  usage_limit: number;
  used_count: number;
  starts_at: string; // ISO date
  expires_at: string | null;
  is_active: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}