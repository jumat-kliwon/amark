import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Clock, Users, Star, CheckCircle2, Circle, BookOpen, Trophy } from "lucide-react";
import { courses } from "@/data/courses";
import Header from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CourseOverview = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <Link to="/" className="mt-4 text-primary hover:underline">
              Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalLessons = course.curriculum.reduce((acc, week) => acc + week.lessons.length, 0);
  const completedLessons = course.curriculum.reduce(
    (acc, week) => acc + week.lessons.filter((l) => l.completed).length,
    0,
  );
  const firstUncompletedLesson = course.curriculum.flatMap((week) => week.lessons).find((lesson) => !lesson.completed);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section with Cover */}
      <div className="relative overflow-hidden">
        {/* Background Cover Image */}
        <div className="absolute inset-0">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-6 py-10">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-background/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background/70 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Courses
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Course Cover */}
            <div className="lg:col-span-1">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <div className="aspect-[4/3]">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-7 w-7 fill-primary-foreground text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Course Info */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <Badge variant="secondary" className="mb-4 w-fit bg-primary/20 text-primary border-0">
                {course.category.replace("-", " ").toUpperCase()}
              </Badge>

              <h1 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                {course.number}. {course.title}
              </h1>

              <p className="mb-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* Stats Grid */}
              <div className="mb-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <div>
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({course.totalRatings.toLocaleString()})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">{course.participants.toLocaleString()} peserta</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm">{totalLessons} materi</span>
                </div>
              </div>

              {/* Author & CTA */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                    <span className="text-sm font-bold text-primary-foreground">A</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dibuat oleh</p>
                    <p className="font-medium">{course.author}</p>
                  </div>
                </div>

                {firstUncompletedLesson && (
                  <Link to={`/course/${course.id}/lesson/${firstUncompletedLesson.id}`}>
                    <Button size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                      <Play className="h-4 w-4 mr-2" />
                      {completedLessons > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Kurikulum</h2>
            <p className="text-sm text-muted-foreground">
              {course.curriculum.length} bagian • {totalLessons} materi • {course.duration} total
            </p>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={[course.curriculum[0]?.id]} className="space-y-3">
          {course.curriculum.map((week, weekIndex) => {
            const weekCompletedLessons = week.lessons.filter((l) => l.completed).length;
            const isWeekComplete = weekCompletedLessons === week.lessons.length;

            return (
              <AccordionItem
                key={week.id}
                value={week.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/20">
                  <div className="flex flex-1 items-center gap-4 text-left">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isWeekComplete ? "bg-green-500/20" : "bg-muted"
                      }`}
                    >
                      {isWeekComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <span className="text-sm font-semibold text-muted-foreground">{weekIndex + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{week.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {weekCompletedLessons}/{week.lessons.length} selesai
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t border-border px-0 pb-0">
                  {week.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      to={`/course/${course.id}/lesson/${lesson.id}`}
                      className="flex items-center gap-4 border-b border-border px-5 py-4 transition-colors hover:bg-muted/30 last:border-b-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${lesson.completed ? "text-muted-foreground" : "font-medium"}`}>
                          {lesson.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default CourseOverview;
