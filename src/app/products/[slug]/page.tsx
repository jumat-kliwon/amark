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
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCatalogDetail } from '@/hooks/use-catalog';
import { formatPrice } from '@/lib/subscription-utils';

const productTypeLabels: Record<string, string> = {
  physical: 'Fisik',
  digital: 'Digital',
  webinar: 'Webinar',
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { catalog, loadingCatalog } = useCatalogDetail(slug);

  if (loadingCatalog) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <HeaderLanding />
        <div className="flex flex-1 items-center justify-center min-h-[50vh] pt-24">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Memuat detail produk...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!catalog?.data) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <HeaderLanding />
        <div className="flex flex-1 items-center justify-center min-h-[50vh] pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Produk tidak ditemukan</h1>
            <Link
              href="/products"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Kembali ke Daftar Produk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const product = catalog.data;
  const imageSrc =
    product.thumbnail_url ||
    (product.thumbnail
      ? `https://lms.acrehub.lol/storage/${product.thumbnail}`
      : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23222" width="400" height="400"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="16" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E');

  const hasSpecs =
    product.weight != null ||
    product.length != null ||
    product.width != null ||
    product.height != null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderLanding />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 py-6 pt-24">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Produk</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-none">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/30">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>

          <div className="flex flex-col">
            <Badge variant="outline" className="mb-3 w-fit text-xs">
              {productTypeLabels[product.product_type] || product.product_type}
            </Badge>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>

            {product.short_description && (
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {product.short_description}
              </p>
            )}

            {product.product_type === 'physical' &&
              product.stock_quantity != null && (
                <div className="mt-4 flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Stok tersedia:{' '}
                    <span className="font-medium">
                      {product.stock_quantity} unit
                    </span>
                  </span>
                </div>
              )}

            <Separator className="my-6" />

            <Link href={`/auth/register/${product.slug}`} className="mt-auto">
              <Button size="lg" className="w-full sm:w-auto">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Beli Sekarang
              </Button>
            </Link>
          </div>
        </div>

        {(product.description || hasSpecs) && (
          <Card className="mt-10">
            <CardContent className="p-0">
              <Tabs defaultValue="deskripsi" className="w-full">
                <div className="border-b border-border px-6 pt-6">
                  <TabsList className="h-9 w-full sm:w-auto sm:min-w-[200px]">
                    <TabsTrigger value="deskripsi" className="flex-1 sm:flex-initial">
                      Deskripsi
                    </TabsTrigger>
                    {hasSpecs && (
                      <TabsTrigger value="spesifikasi" className="flex-1 sm:flex-initial">
                        Spesifikasi
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>
                <div className="px-6 py-6">
                  <TabsContent value="deskripsi" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                    {product.description ? (
                      <div
                        className="prose prose-invert prose-sm max-w-none text-muted-foreground prose-p:leading-relaxed prose-p:mb-2"
                        dangerouslySetInnerHTML={{
                          __html: product.description.replace(/\n/g, '<br/>'),
                        }}
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Tidak ada deskripsi tersedia.
                      </p>
                    )}
                  </TabsContent>
                  {hasSpecs && (
                    <TabsContent value="spesifikasi" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                      <dl className="grid gap-4 sm:grid-cols-2">
                        {product.weight != null && (
                          <div className="rounded-lg border border-border p-4">
                            <dt className="text-sm text-muted-foreground">Berat</dt>
                            <dd className="mt-1 font-medium">{product.weight} kg</dd>
                          </div>
                        )}
                        {product.length != null && (
                          <div className="rounded-lg border border-border p-4">
                            <dt className="text-sm text-muted-foreground">Panjang</dt>
                            <dd className="mt-1 font-medium">{product.length} cm</dd>
                          </div>
                        )}
                        {product.width != null && (
                          <div className="rounded-lg border border-border p-4">
                            <dt className="text-sm text-muted-foreground">Lebar</dt>
                            <dd className="mt-1 font-medium">{product.width} cm</dd>
                          </div>
                        )}
                        {product.height != null && (
                          <div className="rounded-lg border border-border p-4">
                            <dt className="text-sm text-muted-foreground">Tinggi</dt>
                            <dd className="mt-1 font-medium">{product.height} cm</dd>
                          </div>
                        )}
                      </dl>
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
