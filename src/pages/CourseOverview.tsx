import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, ChevronDown } from "lucide-react";
import { courses } from "@/data/courses";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseOverview = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link to="/" className="mt-4 text-primary hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
              <span className="text-sm font-bold text-background">A</span>
            </div>
            <span className="text-sm font-semibold">
              AKADEMI<br />
              <span className="text-xs font-medium text-muted-foreground">CREATOR</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/affiliate" className="text-sm text-muted-foreground hover:text-foreground">
            Affiliate
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm">asditap</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-80 flex-shrink-0 border-r border-border bg-muted/30">
          <div className="p-4">
            {/* Course Thumbnail */}
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="aspect-video w-full object-cover"
              />
            </div>

            {/* Course Title & Progress */}
            <h2 className="mb-3 text-lg font-semibold">
              {course.number}. {course.title}
            </h2>
            
            <div className="mb-2">
              <Progress value={course.progress} className="h-2" />
            </div>
            <p className="mb-6 text-sm font-medium text-destructive">
              {course.progress}% COMPLETE
            </p>

            {/* Course Overview Link */}
            <div className="flex items-center gap-3 rounded-lg border-l-4 border-foreground bg-card p-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Course Overview</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-muted/10">
          {/* Warning Banner */}
          <div className="bg-destructive px-6 py-4 text-center text-sm text-destructive-foreground">
            Khusus Fast Track, Kamu Harus Pelajari Berurutan. Setelah Pelajari Klik Complete and Continue, Biar Bisa ke Next Materi.
          </div>

          {/* Curriculum */}
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Course Curriculum</h3>

            <Accordion type="multiple" className="space-y-2">
              {course.curriculum.map((week) => (
                <AccordionItem
                  key={week.id}
                  value={week.id}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                    <span className="text-left text-base">{week.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-border bg-muted/20 px-0 pb-0">
                    {week.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        to={`/course/${course.id}/lesson/${lesson.id}`}
                        className="flex items-center justify-between border-b border-border px-5 py-3 text-sm hover:bg-muted/50 transition-colors last:border-b-0"
                      >
                        <span className={lesson.completed ? "text-muted-foreground line-through" : ""}>
                          {lesson.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseOverview;
