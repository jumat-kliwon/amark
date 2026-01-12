import { useState } from "react";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory
      ? course.category === selectedCategory
      : true;
    const matchesSearch = searchQuery.trim()
      ? course.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      : true;
    return matchesCategory && matchesSearch;
  });

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="flex-1">
          {/* Search Field */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari kursus berdasarkan judul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              maxLength={100}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                id={course.id}
                number={course.number}
                title={course.title}
                description={course.description}
                author={course.author}
                thumbnail={course.thumbnail}
                locked={course.locked}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
              <p className="text-base sm:text-lg text-muted-foreground">
                {searchQuery
                  ? `Tidak ditemukan kursus dengan judul "${searchQuery}"`
                  : "Belum ada course di kategori ini"}
              </p>
              {searchQuery && (
                <Button variant="link" onClick={clearSearch} className="mt-2">
                  Hapus pencarian
                </Button>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
