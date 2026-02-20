export interface BundleProduct {
  id: number;
  slug?: string;
  name: string;
  short_description?: string | null;
  product_type?: string;
  price?: string;
  original_price?: string | null;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
}

export interface BundleItem {
  id: number;
  slug: string;
  name: string;
  short_description: string | null;
  price: string;
  original_price: string | null;
  thumbnail: string | null;
  thumbnail_url: string | null;
  bundle_type: string | null;
  is_active: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface BundleDetail extends BundleItem {
  description: string | null;
  images: unknown;
  products: BundleProduct[];
  total_original_price: number;
  discount_percentage: number;
  total_weight: number;
  has_physical_products: boolean;
  has_membership_products: boolean;
  requires_shipping: boolean;
  requires_membership_activation: boolean;
}

export interface BundleListLinks {
  first: string;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface BundleListMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface BundleListResponse {
  data: BundleItem[];
  links: BundleListLinks;
  meta: BundleListMeta;
}

export interface BundleDetailResponse {
  data: BundleDetail;
}

export interface BundleValidateCouponRequest {
  bundle_product_id: string;
  coupon: string;
}

export interface BundleCalculateShippingRequest {
  shipping_address: {
    address: string;
    province_id: number;
    district_id: number;
    sub_district_id: number;
    postal_code: number | string;
  };
}
