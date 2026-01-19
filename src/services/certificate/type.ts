export interface Certificate {
  id: number;
  certificate_number: string;
  issued_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  membership: {
    id: number;
    name: string;
    slug: string;
  };
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

export interface CertificateListResponse {
  data: Certificate[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface CertificateDetailResponse {
  data: Certificate;
}
