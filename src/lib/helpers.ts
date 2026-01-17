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
