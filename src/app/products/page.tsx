'use client';

import { HeaderLanding } from '@/components/landing/sections/HeaderLanding';
import { Footer } from '@/components/landing/sections/Footer';
import ProductCard from '@/components/ProductCard';
import BundleCard from '@/components/BundleCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCatalog } from '@/hooks/use-catalog';
import { useBundles } from '@/hooks/use-bundle';

export default function ProductsPage() {
  const {
    catalogs,
    loadingCatalogs,
    page: catalogPage,
    setPage: setCatalogPage,
  } = useCatalog();
  const {
    bundles,
    loadingBundles,
    page: bundlePage,
    setPage: setBundlePage,
  } = useBundles();

  const currentCatalogPage = catalogs?.meta?.current_page ?? 1;
  const hasPrevCatalogPage = catalogs?.links?.prev !== null;
  const hasNextCatalogPage = catalogs?.links?.next !== null;

  const currentBundlePage = bundles?.meta?.current_page ?? 1;
  const hasPrevBundlePage = bundles?.links?.prev !== null;
  const hasNextBundlePage = bundles?.links?.next !== null;

  const goToCatalogPage = (newPage: number) => {
    if (newPage >= 1) {
      setCatalogPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToBundlePage = (newPage: number) => {
    if (newPage >= 1) {
      setBundlePage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderLanding />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 py-12 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Daftar Produk</h1>
          <p className="text-muted-foreground mt-1">
            Jelajahi produk dan layanan yang tersedia
          </p>
        </div>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="catalog">Catalog List</TabsTrigger>
            <TabsTrigger value="bundle">Bundle</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {loadingCatalogs ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[280px] bg-zinc-800 rounded-xl animate-pulse"
                  />
                ))
              ) : catalogs?.data?.length ? (
                catalogs.data.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    slug={item.slug}
                    name={item.name}
                    shortDescription={item.short_description}
                    productType={item.product_type}
                    price={item.price}
                    thumbnailUrl={item.thumbnail_url}
                    thumbnail={item.thumbnail}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))
              ) : (
                <div className="h-[280px] rounded-xl col-span-1 sm:col-span-2 xl:col-span-3 flex items-center justify-center border border-dashed border-border">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Belum ada produk tersedia
                  </p>
                </div>
              )}
            </div>

            {(hasPrevCatalogPage || hasNextCatalogPage) && (
              <Pagination className="mt-10">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToCatalogPage(currentCatalogPage - 1)}
                      className={
                        !hasPrevCatalogPage
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive className="cursor-default">
                      {currentCatalogPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToCatalogPage(currentCatalogPage + 1)}
                      className={
                        !hasNextCatalogPage
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>

          <TabsContent value="bundle">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {loadingBundles ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[280px] bg-zinc-800 rounded-xl animate-pulse"
                  />
                ))
              ) : bundles?.data?.length ? (
                bundles.data.map((item, index) => (
                  <BundleCard
                    key={item.id}
                    slug={item.slug}
                    name={item.name}
                    shortDescription={item.short_description}
                    bundleType={item.bundle_type}
                    price={item.price}
                    originalPrice={item.original_price}
                    thumbnailUrl={item.thumbnail_url}
                    thumbnail={item.thumbnail}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))
              ) : (
                <div className="h-[280px] rounded-xl col-span-1 sm:col-span-2 xl:col-span-3 flex items-center justify-center border border-dashed border-border">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Belum ada bundle tersedia
                  </p>
                </div>
              )}
            </div>

            {(hasPrevBundlePage || hasNextBundlePage) && (
              <Pagination className="mt-10">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToBundlePage(currentBundlePage - 1)}
                      className={
                        !hasPrevBundlePage
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive className="cursor-default">
                      {currentBundlePage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToBundlePage(currentBundlePage + 1)}
                      className={
                        !hasNextBundlePage
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
