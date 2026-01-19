'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Header from '@/components/Header';
import CategorySidebar from '@/components/CategorySidebar';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/data/courses';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useCourses } from '@/hooks/use-course';

export default function CoursePage() {
  const course = useCourses();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = courses.filter((item) => {
    const matchesCategory = course.category
      ? item.category === course.category
      : true;
    const matchesSearch = course.search.trim()
      ? item.title.toLowerCase().includes(course.search.toLowerCase().trim())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [course.category, course.search]);

  const totalPages = Math.ceil(filteredCourses.length / course.limit);
  const startIndex = (currentPage - 1) * course.limit;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + course.limit,
  );

  const clearSearch = () => course.setSearch('');

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6">
        <CategorySidebar
          selectedCategory={course.category}
          onSelectCategory={course.setCategory}
        />

        <section className="flex-1">
          {/* Search Field */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari kursus berdasarkan judul..."
              value={course.search}
              onChange={(e) => course.setSearch(e.target.value)}
              className="pl-10 pr-10"
              maxLength={100}
            />
            {course.search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => course.setSearch('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Results info */}
          {filteredCourses.length > 0 && (
            <p className="mb-4 text-sm text-muted-foreground">
              Menampilkan {startIndex + 1}-
              {Math.min(startIndex + course.limit, filteredCourses.length)} dari{' '}
              {filteredCourses.length} kursus
            </p>
          )}

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {course.loadingCourses ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[280px] bg-zinc-800 rounded-lg animate-pulse"
                />
              ))
            ) : course.courses.data.length ? (
              <>
                {course.courses.data.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    id={course.slug}
                    title={course.title}
                    description={course.title}
                    author={course.instructor.name}
                    thumbnail={course.thumbnail}
                    locked={course.has_access}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))}
              </>
            ) : (
              <div className="h-[280px] rounded-lg col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-center">
                <p className="text-base sm:text-lg text-muted-foreground">
                  Belum ada course pada pencarian Anda
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => goToPage(currentPage - 1)}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => goToPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => goToPage(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </main>
    </div>
  );
}
