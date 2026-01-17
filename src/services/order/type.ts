export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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