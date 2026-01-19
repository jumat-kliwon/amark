export function formatCurrency(value: number, locale: string = "id-ID"): string {
  if (isNaN(value)) return "0";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export function formatDate(
  isoString?: string,
  locale: 'id-ID' | 'en-US' = 'id-ID'
) {

  if(!isoString) return '-';

  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString(locale, { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);

  const hours = String(date.getHours()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${seconds}`;
}

export function formatTimeAgo(isoString: string | null): string {
  if (!isoString) return '-';

  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Baru saja';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'menit' : 'menit'} lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'jam' : 'jam'} lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'hari' : 'hari'} lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'minggu' : 'minggu'} lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'bulan' : 'bulan'} lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'tahun' : 'tahun'} lalu`;
}
