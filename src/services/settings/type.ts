// ======================
// SITE SETTINGS TYPES
// ======================

export interface OGSettings {
  title: string;
  description: string;
  image: string;
  type: string;
}

export interface TwitterSettings {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
}

export interface AnalyticsSettings {
  google_analytics_id: string;
}

export interface VerificationSettings {
  google: string;
  bing: string;
}

export interface SitemapSettings {
  enabled: boolean;
}

export interface SiteSettings {
  site_title: string;
  site_description: string;
  meta_keywords: string;
  site_url: string;
  canonical_url: string;
  og: OGSettings;
  twitter: TwitterSettings;
  analytics: AnalyticsSettings;
  verification: VerificationSettings;
  sitemap: SitemapSettings;
}

export interface Membership {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  benefit: string[];
  access_type: number;
  access_type_label: string;
  duration: number | null;
  is_active: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  is_default: boolean;
}

export interface SettingsData {
  memberships: Membership[];
  site: SiteSettings;
}

export interface SettingsResponse {
  data: SettingsData;
}
