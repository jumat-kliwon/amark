import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar Bundle',
  description: 'Paket bundling dengan harga spesial',
};

export default function BundlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
