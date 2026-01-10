import { useState } from "react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("fast-track");

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex gap-6 p-6">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                id={course.id}
                number={course.number}
                title={course.title}
                author={course.author}
                thumbnail={course.thumbnail}
                locked={course.locked}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg text-muted-foreground">
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
