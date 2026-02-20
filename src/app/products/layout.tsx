import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar Produk',
  description: 'Jelajahi produk dan layanan yang tersedia',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
