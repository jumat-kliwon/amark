import { useState } from "react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="flex-1">
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
                Belum ada course di kategori ini
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
