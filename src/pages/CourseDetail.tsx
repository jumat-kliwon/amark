import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Star, Users, Clock, Search, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { courses, Lesson } from "@/data/courses";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const course = courses.find((c) => c.id === id);

  // Local state for completed lessons (in real app, this would be stored in database)
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    // Initialize with lessons that are already marked as completed in data
    if (!course) return [];
    return course.curriculum
      .flatMap((week) => week.lessons)
      .filter((lesson) => lesson.completed)
      .map((lesson) => lesson.id);
  });

  // Find current lesson from curriculum
  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.curriculum.flatMap((week) => week.lessons);
  }, [course]);

  const currentLesson = allLessons.find((lesson) => lesson.id === lessonId);
  const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);
  const nextLesson = currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1 
    ? allLessons[currentLessonIndex + 1] 
    : null;

  const isCurrentLessonCompleted = lessonId ? completedLessons.includes(lessonId) : false;

  const handleMarkAsDone = () => {
    if (!lessonId) return;

    if (isCurrentLessonCompleted) {
      // Unmark as done
      setCompletedLessons((prev) => prev.filter((id) => id !== lessonId));
      toast({
        title: "Lesson ditandai belum selesai",
        description: "Progress Anda telah diperbarui.",
      });
    } else {
      // Mark as done
      setCompletedLessons((prev) => [...prev, lessonId]);
      toast({
        title: "Lesson selesai! 🎉",
        description: nextLesson 
          ? "Lanjut ke materi berikutnya?"
          : "Anda telah menyelesaikan semua materi!",
      });
    }
  };

  const handleContinue = () => {
    if (nextLesson) {
      // Mark current as done if not already
      if (lessonId && !completedLessons.includes(lessonId)) {
        setCompletedLessons((prev) => [...prev, lessonId]);
      }
      navigate(`/course/${id}/lesson/${nextLesson.id}`);
    }
  };

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
                to={`/course/${id}`} 
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Course Overview
              </Link>

              {/* Lesson Title with Mark as Done */}
              {currentLesson && (
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isCurrentLessonCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                    <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  </div>
                  
                  <Button
                    onClick={handleMarkAsDone}
                    variant={isCurrentLessonCompleted ? "outline" : "default"}
                    size="sm"
                    className={isCurrentLessonCompleted ? "border-green-500 text-green-500 hover:bg-green-500/10" : ""}
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
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110">
                      <Play className="h-8 w-8 fill-current" />
                    </button>
                  </div>
                  {/* Subtitle overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-md bg-black/80 px-4 py-2 text-sm text-white">
                      {currentLesson?.title || course.description.slice(0, 60)}...
                    </div>
                  </div>
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
                    value="search" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    <Search className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    Gambaran Umum
                  </TabsTrigger>
                  <TabsTrigger 
                    value="qa" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    T&J
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    Catatan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="announcements" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    Pengumuman
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    Ulasan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tools" 
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
                  >
                    Alat pembelajaran
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="py-8">
                  <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">{course.rating}</span>
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">
                        {course.totalRatings.toLocaleString()} peringkat
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">{course.participants.toLocaleString()}</span>
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Peserta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">{course.duration}</span>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="qa" className="py-8">
                  <p className="text-muted-foreground">Belum ada pertanyaan untuk kursus ini.</p>
                </TabsContent>

                <TabsContent value="notes" className="py-8">
                  <p className="text-muted-foreground">Catatan Anda akan muncul di sini.</p>
                </TabsContent>

                <TabsContent value="announcements" className="py-8">
                  <p className="text-muted-foreground">Belum ada pengumuman.</p>
                </TabsContent>

                <TabsContent value="reviews" className="py-8">
                  <p className="text-muted-foreground">Ulasan dari peserta lain akan muncul di sini.</p>
                </TabsContent>

                <TabsContent value="tools" className="py-8">
                  <p className="text-muted-foreground">Alat pembelajaran akan tersedia segera.</p>
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
                <span className="text-sm text-muted-foreground">✨ AI Assistant</span>
              </div>
            </div>

            {/* Progress */}
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {completedLessons.length} / {allLessons.length} selesai
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Chapter List */}
            <div className="p-2">
              <Accordion type="multiple" defaultValue={course.curriculum.map(w => w.id)} className="w-full">
                {course.curriculum.map((week) => (
                  <AccordionItem key={week.id} value={week.id} className="border-0">
                    <AccordionTrigger className="px-3 py-4 hover:bg-card hover:no-underline rounded-lg">
                      <div className="flex-1 text-left">
                        <h4 className="text-sm font-medium leading-tight">
                          {week.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {week.lessons.filter(l => completedLessons.includes(l.id)).length} / {week.lessons.length} lessons
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pl-3">
                      <div className="space-y-1">
                        {week.lessons.map((lesson) => {
                          const isCompleted = completedLessons.includes(lesson.id);
                          const isActive = lesson.id === lessonId;
                          
                          return (
                            <Link
                              key={lesson.id}
                              to={`/course/${id}/lesson/${lesson.id}`}
                              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                                isActive 
                                  ? "bg-primary text-primary-foreground" 
                                  : "hover:bg-card"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className={`h-4 w-4 ${isActive ? "" : "text-green-500"}`} />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                              <span className={isCompleted && !isActive ? "text-muted-foreground" : ""}>
                                {lesson.title}
                              </span>
                              <span className="ml-auto text-xs opacity-70">{lesson.duration}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
