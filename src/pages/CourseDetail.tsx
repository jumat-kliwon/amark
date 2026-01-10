import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Star, Users, Clock, ChevronDown, Search } from "lucide-react";
import { courses } from "@/data/courses";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetail = () => {
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
                to="/" 
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Courses
              </Link>
              
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left: Course Info */}
                <div>
                  <h1 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
                    {course.title}
                  </h1>
                  <ul className="space-y-3">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Right: Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-110">
                      <Play className="h-7 w-7 fill-current" />
                    </button>
                  </div>
                  {/* Subtitle overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-md bg-black/80 px-4 py-2 text-sm text-white">
                      {course.description.slice(0, 60)}...
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

            {/* Chapter List */}
            <div className="p-2">
              <Accordion type="single" collapsible className="w-full">
                {course.chapters.map((chapter, index) => (
                  <AccordionItem key={chapter.id} value={chapter.id} className="border-0">
                    <AccordionTrigger className="px-3 py-4 hover:bg-card hover:no-underline rounded-lg">
                      <div className="flex-1 text-left">
                        <h4 className="text-sm font-medium leading-tight">
                          {chapter.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {chapter.lessonsCompleted} / {chapter.totalLessons} | {chapter.duration}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pl-3">
                      <div className="space-y-2">
                        {Array.from({ length: chapter.totalLessons }).map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-card cursor-pointer transition-colors"
                          >
                            <Play className="h-4 w-4 text-muted-foreground" />
                            <span>Lesson {i + 1}</span>
                          </div>
                        ))}
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
