'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ShoppingCart, Package } from 'lucide-react';
import { HeaderLanding } from '@/components/landing/sections/HeaderLanding';
import { Footer } from '@/components/landing/sections/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useBundleDetail } from '@/hooks/use-bundle';
import { formatPrice } from '@/lib/subscription-utils';

const bundleTypeLabels: Record<string, string> = {
  starter: 'Starter',
  premium: 'Premium',
  ultimate: 'Ultimate',
};

const productTypeLabels: Record<string, string> = {
  physical: 'Fisik',
  digital: 'Digital',
  webinar: 'Webinar',
};

export default function BundleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { bundle, loadingBundle } = useBundleDetail(slug);

  if (loadingBundle) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <HeaderLanding />
        <div className="flex flex-1 items-center justify-center min-h-[50vh] pt-24">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Memuat detail bundle...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bundle?.data) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <HeaderLanding />
        <div className="flex flex-1 items-center justify-center min-h-[50vh] pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Bundle tidak ditemukan</h1>
            <Link
              href="/bundles"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Kembali ke Daftar Bundle
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const bundleData = bundle.data;
  const imageSrc =
    bundleData.thumbnail_url ||
    (bundleData.thumbnail
      ? `https://lms.acrehub.lol/storage/${bundleData.thumbnail}`
      : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23222" width="400" height="400"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="16" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EBundle%3C/text%3E%3C/svg%3E');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderLanding />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 py-6 pt-24">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/bundles">Bundle</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-none">
                {bundleData.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/30">
            <Image
              src={imageSrc}
              alt={bundleData.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>

          <div className="flex flex-col">
            {bundleData.bundle_type && (
              <Badge variant="outline" className="mb-3 w-fit text-xs">
                {bundleTypeLabels[bundleData.bundle_type] ?? bundleData.bundle_type}
              </Badge>
            )}

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {bundleData.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(bundleData.price)}
              </span>
              {bundleData.original_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(bundleData.original_price)}
                </span>
              )}
            </div>

            {bundleData.short_description && (
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {bundleData.short_description}
              </p>
            )}

            {bundleData.discount_percentage != null && bundleData.discount_percentage > 0 && (
              <p className="mt-2 text-sm text-green-500 font-medium">
                Hemat {bundleData.discount_percentage}%
              </p>
            )}

            <div className="mt-auto pt-6">
              <Link href={`/auth/register/bundle/${bundleData.slug}`}>
                <Button size="lg" className="w-full sm:w-auto">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Daftar produk dalam bundle */}
        {bundleData.products && bundleData.products.length > 0 && (
          <Card className="mt-10">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produk dalam Bundle
              </h2>
              <ul className="space-y-4">
                {bundleData.products.map((product, index) => (
                  <li
                    key={product.id}
                    className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      {product.slug ? (
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-medium hover:text-primary hover:underline"
                        >
                          {product.name}
                        </Link>
                      ) : (
                        <span className="font-medium">{product.name}</span>
                      )}
                      {product.short_description && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {product.short_description}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {product.product_type && (
                          <Badge variant="secondary" className="text-xs">
                            {productTypeLabels[product.product_type] ?? product.product_type}
                          </Badge>
                        )}
                        {product.price && (
                          <span className="text-sm font-medium text-primary">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {bundleData.description && (
          <Card className="mt-10">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Deskripsi</h2>
              <div
                className="prose prose-invert prose-sm max-w-none text-muted-foreground prose-p:leading-relaxed prose-p:mb-2"
                dangerouslySetInnerHTML={{
                  __html: bundleData.description.replace(/\n/g, '<br/>'),
                }}
              />
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
