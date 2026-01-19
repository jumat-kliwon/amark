export interface NotificationData {
  title: string;
  body: string;
  type: string;
  order_id?: number;
}

export interface Notification {
  id: string;
  type: string;
  data: NotificationData;
  read_at: string | null;
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

export interface NotificationListResponse {
  data: Notification[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
