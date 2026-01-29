'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Star,
  Users,
  Clock,
  Search,
  CheckCircle2,
  Circle,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { useLesson } from '@/hooks/use-lesson';
import { LessonCompletionModal } from '@/components/course/LessonCompletionModal';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const lessonId = params.lessonId as string;
  const { toast } = useToast();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Use the useLesson hook
  const {
    detailCourse,
    loadingDetailCourse,
    moduleList,
    loadingModuleList,
    lessonDetail,
    loadingLessonDetail,
    setIdLessons,
    markLessonDone,
    loadingMarkDone,
    idLessons,
  } = useLesson();

  // Set lesson ID when lessonId param changes
  useEffect(() => {
    if (lessonId) {
      const lessonIdNum = parseInt(lessonId, 10);
      if (!isNaN(lessonIdNum)) {
        setIdLessons(lessonIdNum);
      }
    }
  }, [lessonId, setIdLessons]);

  const course = detailCourse?.data;
  const modules = moduleList?.data || [];
  const currentLesson = lessonDetail?.data;
  const progress = moduleList?.progress;

  // Flatten all lessons from modules to find next lesson
  const allLessons = useMemo(() => {
    return modules.flatMap((module) => module.lessons);
  }, [modules]);

  const currentLessonIndex = allLessons.findIndex(
    (lesson) => lesson.id === idLessons,
  );
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const isCurrentLessonCompleted = currentLesson?.is_completed || false;

  const handleMarkAsDone = () => {
    if (!idLessons) return;

    markLessonDone(idLessons, {
      onSuccess: () => {
        setShowCompletionModal(true);
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Gagal memperbarui status lesson.',
          variant: 'destructive',
        });
      },
    });
  };

  const handleContinue = () => {
    setShowCompletionModal(false);
    if (nextLesson) {
      router.push(`/course/${id}/lesson/${nextLesson.id}`);
    }
  };

  const handleBackToCourse = () => {
    setShowCompletionModal(false);
    router.push(`/course/${id}`);
  };

  // Loading state
  if (loadingDetailCourse || loadingModuleList) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Memuat data course...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state - course not found
  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <Link
              href={`/course/${id}`}
              className="mt-4 text-primary hover:underline"
            >
              Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading lesson detail
  if (loadingLessonDetail && idLessons) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Memuat lesson...</p>
          </div>
        </div>
      </div>
    );
  }

  // Lesson not found
  if (idLessons && !currentLesson) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lesson not found</h1>
            <Link
              href={`/course/${id}`}
              className="mt-4 text-primary hover:underline"
            >
              Kembali ke Course Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Video Hero Section */}
          <div className="relative bg-card">
            <div className="mx-auto max-w-5xl px-6 py-8">
              <Link
                href={`/course/${id}`}
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Course Overview
              </Link>

              {/* Lesson Title with Mark as Done */}
              {currentLesson && (
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">
                      {currentLesson.title}
                    </h1>
                  </div>

                  <Button
                    onClick={handleMarkAsDone}
                    variant={isCurrentLessonCompleted ? 'outline' : 'default'}
                    size="sm"
                    className={
                      isCurrentLessonCompleted
                        ? 'border-green-500 text-green-500 hover:bg-green-500/10'
                        : ''
                    }
                  >
                    {isCurrentLessonCompleted ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Sudah Selesai
                      </>
                    ) : (
                      <>
                        <Circle className="mr-2 h-4 w-4" />
                        Mark as Done
                      </>
                    )}
                  </Button>
                </div>
              )}

              <div className="grid gap-8">
                {/* Full Width Video Embed */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  {currentLesson?.content && (
                    <div className="mb-8">
                      <div
                        // className="prose prose-invert max-w-none"
                        className="h-full w-full object-cover"
                        dangerouslySetInnerHTML={{
                          __html: currentLesson.content,
                        }}
                      />
                    </div>
                  )}
                  {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110">
                      <Play className="h-8 w-8 fill-current" />
                    </button>
                  </div> */}
                  {/* Subtitle overlay */}
                  {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-md bg-black/80 px-4 py-2 text-sm text-white">
                      {currentLesson?.title ||
                        course.short_description ||
                        course.description?.slice(0, 60) ||
                        ''}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="h-auto w-full justify-start gap-0 rounded-none border-0 bg-transparent p-0">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    Gambaran Umum
                  </TabsTrigger>
                  <TabsTrigger
                    value="discussion"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Diskusi
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="py-8">
                  {currentLesson?.description && (
                    <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                      {currentLesson.description}
                    </p>
                  )}

                  {/* Lesson Content */}
                  {currentLesson?.description && (
                    <div className="mb-8">
                      <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: currentLesson?.description,
                        }}
                      />
                    </div>
                  )}

                  {/* Lesson Info */}
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Tipe Konten:
                      </span>
                      <span className="text-sm font-medium capitalize">
                        {currentLesson?.content_type || 'Video'}
                      </span>
                    </div>
                    {currentLesson?.is_preview && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Preview
                      </span>
                    )}
                    {currentLesson?.viewed_at && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Dilihat:{' '}
                          {new Date(currentLesson.viewed_at).toLocaleDateString(
                            'id-ID',
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="py-8">
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">
                      Fitur Diskusi Segera Hadir!
                    </h3>
                    <p className="max-w-md text-muted-foreground">
                      Kami sedang mengembangkan fitur diskusi untuk membantu
                      Anda berinteraksi dengan instruktur dan peserta lainnya.
                      Nantikan update selanjutnya!
                    </p>
                    <span className="mt-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      Coming Soon
                    </span>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Course Content */}
        <div className="hidden w-96 flex-shrink-0 border-l border-border lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Konten kursus</span>
                <span className="text-sm text-muted-foreground">
                  ✨ AI Assistant
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {progress.completed_lessons} / {allLessons.length} selesai
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${
                      (progress.completed_lessons / allLessons.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Chapter List */}
            <div className="p-2">
              <Accordion
                type="multiple"
                defaultValue={modules.map((m) => m.id.toString())}
                className="w-full"
              >
                {modules.map((module) => {
                  const completedCount = module.lessons.filter(
                    (l) => l.is_completed,
                  ).length;
                  return (
                    <AccordionItem
                      key={module.id}
                      value={module.id.toString()}
                      className="border-0"
                    >
                      <AccordionTrigger className="px-3 py-4 hover:bg-card hover:no-underline rounded-lg">
                        <div className="flex-1 text-left">
                          <h4 className="text-sm font-medium leading-tight">
                            {module.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {completedCount} / {module.lessons.length} lessons
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pl-3">
                        <div className="space-y-1">
                          {module.lessons.map((lesson) => {
                            const isCompleted = lesson.is_completed;
                            const isActive = lesson.id === idLessons;

                            return (
                              <Link
                                key={lesson.id}
                                href={`/course/${id}/lesson/${lesson.id}`}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                                  isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-card'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2
                                    className={`h-4 w-4 ${
                                      isActive ? '' : 'text-green-500'
                                    }`}
                                  />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                                <span
                                  className={
                                    isCompleted && !isActive
                                      ? 'text-muted-foreground'
                                      : ''
                                  }
                                >
                                  {lesson.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      <LessonCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onContinue={handleContinue}
        onBackToCourse={handleBackToCourse}
        hasNextLesson={!!nextLesson}
      />
    </div>
  );
}
