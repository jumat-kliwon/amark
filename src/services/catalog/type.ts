export interface CatalogItem {
  id: number;
  slug: string;
  name: string;
  short_description: string | null;
  product_type: 'physical' | 'digital' | 'webinar';
  price: string;
  original_price: string | null;
  thumbnail: string | null;
  thumbnail_url: string | null;
  stock_quantity: number | null;
  is_active: boolean;
  is_public: number;
  created_at: string;
  updated_at: string;
}

export interface CatalogDetail extends CatalogItem {
  description: string | null;
  images: unknown;
  weight: string | number | null;
  length: string | number | null;
  width: string | number | null;
  height: string | number | null;
  requires_shipping?: boolean;
  requires_membership_activation?: boolean;
}

export interface CatalogListMeta {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

export interface CatalogListLinks {
  first: string;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface CatalogListResponse {
  data: CatalogItem[];
  links: CatalogListLinks;
  meta: CatalogListMeta;
}

export interface CatalogDetailResponse {
  data: CatalogDetail;
}
