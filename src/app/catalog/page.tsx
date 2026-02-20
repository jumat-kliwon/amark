'use client';

import Header from '@/components/Header';
import CatalogCard from '@/components/CatalogCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useCatalog } from '@/hooks/use-catalog';

export default function CatalogPage() {
  const { catalogs, loadingCatalogs, page, setPage } = useCatalog();

  const currentPage = catalogs?.meta?.current_page ?? 1;
  const hasPrevPage = catalogs?.links?.prev !== null;
  const hasNextPage = catalogs?.links?.next !== null;

  const goToPage = (newPage: number) => {
    if (newPage >= 1) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Catalog</h1>
          <p className="text-muted-foreground">
            Lihat produk dan layanan yang tersedia
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {loadingCatalogs ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] bg-zinc-800 rounded-lg animate-pulse"
              />
            ))
          ) : catalogs?.data?.length ? (
            catalogs.data.map((item, index) => (
              <CatalogCard
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
            <div className="h-[280px] rounded-lg col-span-1 sm:col-span-2 xl:col-span-3 flex items-center justify-center">
              <p className="text-base sm:text-lg text-muted-foreground">
                Belum ada produk
              </p>
            </div>
          )}
        </div>

        {(hasPrevPage || hasNextPage) && (
          <Pagination className="mt-8">
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
    </div>
  );
}
