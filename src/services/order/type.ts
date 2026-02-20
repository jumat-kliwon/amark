export interface OrderItemAttribute {
  label: string;
  value: string;
}

/** Sub-item inside a bundle order item */
export interface BundleOrderItem {
  name: string;
  price: number;
  weight?: number | string;
  quantity: number;
  product_id: number;
  product_type: "digital" | "membership" | "physical";
}

export interface OrderItem {
  id: string;
  name: string;
  type?: string;
  price: number;
  weight?: string;
  quantity: number;
  product_id?: number;
  final_price: number;
  membership_type?: string;
  membership_period?: string | null;
  /** Product image URL for catalog orders */
  image_url?: string | null;
  /** Product slug for "Buy It Again" link */
  slug?: string | null;
  /** Product attributes (e.g. Size, Category, Weight) */
  attributes?: OrderItemAttribute[] | Record<string, string>;
  /** When type === "bundle", list of products in the bundle */
  items?: BundleOrderItem[];
  has_physical?: boolean;
  has_membership?: boolean;
  bundle_product_id?: number;
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

export interface OrderShippingInfo {
  recipient_name?: string;
  address?: string;
  phone?: string;
}

/** Shipping address from order detail (with region names) */
export interface OrderShippingAddress {
  address: string;
  district_id: number;
  postal_code: string;
  province_id: number;
  district_name?: string;
  province_name?: string;
  recipient_name: string;
  recipient_phone: string;
  sub_district_id: number;
  sub_district_name?: string;
}

export interface Order {
  id: number;
  status: number;
  status_label: string;
  invoice_number: string;
  transaction_number: string;
  total_amount: string;
  currency?: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
  /** @deprecated use payment_method */
  method?: string;
  payment_method?: string;
  payment_detail: PaymentDetail | null;
  paid_at: string | null;
  payment_expires_at: string | null;
  coupons: CouponDetail | CouponDetail[] | [];
  /** Customer note for the order */
  order_note?: string | null;
  /** Shipping information for physical orders (legacy) */
  shipping_info?: OrderShippingInfo | null;
  /** Full shipping address (with region names) */
  shipping_address?: OrderShippingAddress | null;
  shipping_cost?: string | null;
  shipping_method?: string | null;
  shipping_courier?: string | null;
  shipping_service?: string | null;
  tracking_number?: string | null;
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

export interface OrderDetailResponse {
  data: Order;
}

// ======================
// MEMBERSHIP
// ======================
export interface Membership {
  id: number;
  product_id?: number;
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
  product_id: number;
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

export interface MembershipDtResponse {
  data: {
    payment_url: string;
  };
}

// ======================
// CATALOG / PRODUCT ORDER
// ======================
/** Alamat pengiriman tanpa recipient (recipient_name, recipient_phone di root payload) */
export interface ShippingAddress {
  address: string;
  province_id: number;
  district_id: number;
  sub_district_id: number;
  postal_code: string;
}

export interface ShippingOption {
  courier_name: string;
  courier_service_name: string;
}

export interface CatalogOrderRequest {
  product_id: number;
  /** Kode kupon/diskon */
  coupon?: string;
  /** Nama penerima (di root payload) */
  recipient_name?: string;
  /** No. telepon penerima (di root payload) */
  recipient_phone?: string;
  /** Required when product requires_shipping is true */
  shipping_address?: ShippingAddress;
  /** Required when product requires_shipping is true */
  shipping_option?: ShippingOption;
}

export interface CalculateShippingRequest {
  product_id: number;
  quantity: number;
  /** Nama penerima (di root payload) */
  recipient_name?: string;
  /** No. telepon penerima (di root payload) */
  recipient_phone?: string;
  shipping_address: ShippingAddress;
}

export interface ShippingOptionItem {
  label?: string;
  courier_name: string;
  courier_code?: string;
  courier_service_name: string;
  courier_service_code?: string;
  price?: number;
  shipping_fee?: number;
  etd?: string;
}

export interface CalculateShippingResponse {
  message?: string;
  data: ShippingOptionItem[];
}