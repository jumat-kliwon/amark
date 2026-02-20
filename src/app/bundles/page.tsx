'use client';

import { HeaderLanding } from '@/components/landing/sections/HeaderLanding';
import { Footer } from '@/components/landing/sections/Footer';
import BundleCard from '@/components/BundleCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useBundles } from '@/hooks/use-bundle';

export default function BundlesPage() {
  const { bundles, loadingBundles, page, setPage } = useBundles();

  const currentPage = bundles?.meta?.current_page ?? 1;
  const hasPrevPage = bundles?.links?.prev !== null;
  const hasNextPage = bundles?.links?.next !== null;

  const goToPage = (newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderLanding />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 py-12 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Daftar Bundle</h1>
          <p className="text-muted-foreground mt-1">
            Paket bundling dengan harga spesial
          </p>
        </div>

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

        {(hasPrevPage || hasNextPage) && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                  className={
                    !hasPrevPage
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive className="cursor-default">
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                  className={
                    !hasNextPage
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>

      <Footer />
    </div>
  );
}
