'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  CheckCircle2,
  Circle,
  BookOpen,
  Trophy,
  Loader2,
} from 'lucide-react';
import { courses } from '@/data/courses';
import Header from '@/components/Header';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLesson } from '@/hooks/use-lesson';
import Image from 'next/image';

export default function CourseOverviewPage() {
  const params = useParams();
  const id = params.id as string;
  const course = useLesson();

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <Link href="/course" className="mt-4 text-primary hover:underline">
              Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalLessons = course.moduleList?.progress.total_lessons;
  const completedLessons = course.moduleList?.progress.completed_lessons;
  const firstUncompletedLesson = course.moduleList?.progress.completed_lessons;

  if (course.loadingModuleList || course.loadingDetailCourse) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Memuat detail course...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section with Cover */}
      <div className="bg-card">
        {/* Content */}
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link
            href="/course"
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
                  <Image
                    src={course.detailCourse?.data.thumbnail_url}
                    alt={course.detailCourse?.data.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    unoptimized
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
              <Badge
                variant="secondary"
                className="mb-4 w-fit bg-primary/20 text-primary border-0"
              >
                {course.detailCourse?.data.category.name.toUpperCase()}
              </Badge>

              <h1 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                {course.detailCourse?.data.title}
              </h1>

              <p className="mb-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {course.detailCourse?.data.short_description}
              </p>

              {/* Stats Grid */}
              <div className="mb-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <div>
                    <span className="font-bold">2</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({course.detailCourse?.data.id.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    {course.detailCourse?.data.id.toLocaleString()} peserta
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-card/50 backdrop-blur-sm px-4 py-3 border border-border/50">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    {course.detailCourse?.data.id}
                  </span>
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
                    <span className="text-sm font-bold text-primary-foreground">
                      A
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dibuat oleh</p>
                    <p className="font-medium">
                      {course.detailCourse?.data.instructor.name}
                    </p>
                  </div>
                </div>

                {firstUncompletedLesson && (
                  <Link
                    href={`/course/${course.detailCourse?.data.slug}/lesson/${firstUncompletedLesson}`}
                  >
                    <Button
                      size="lg"
                      className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {completedLessons > 0
                        ? 'Lanjutkan Belajar'
                        : 'Mulai Belajar'}
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
              {course.moduleList?.data.length} bagian • {totalLessons} materi •{' '}
              {course.detailCourse?.data.id} total
            </p>
          </div>
        </div>

        <Accordion
          type="multiple"
          defaultValue={[String(course.moduleList?.data[0].id)]}
          className="space-y-3"
        >
          {course.moduleList?.data.map((week, weekIndex) => {
            const weekCompletedLessons = week.lessons.filter(
              (l) => l.is_completed,
            ).length;
            const isWeekComplete = weekCompletedLessons === week.lessons.length;

            return (
              <AccordionItem
                key={week.id}
                value={String(week.id)}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/20">
                  <div className="flex flex-1 items-center gap-4 text-left">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isWeekComplete ? 'bg-green-500/20' : 'bg-muted'
                      }`}
                    >
                      {isWeekComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <span className="text-sm font-semibold text-muted-foreground">
                          {weekIndex + 1}
                        </span>
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
                  {week.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/course/${course.detailCourse?.data.slug}/lesson/${lesson.id}`}
                      className="flex items-center gap-4 border-b border-border px-5 py-4 transition-colors hover:bg-muted/30 last:border-b-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center">
                        {lesson.is_completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            lesson.is_completed
                              ? 'text-muted-foreground'
                              : 'font-medium'
                          }`}
                        >
                          {lesson.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          {lesson.id}
                        </span>
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
}
